import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { hasTrackAccess } from '@/lib/access'
import { getTrackById } from '@/lib/tracks'
import { getTrackSteps } from '@/lib/learner-overview'
import { recordLearningEvent } from '@/lib/event-recorder'
import type { ArtifactKind } from '@/lib/project-verification/contract'
import { resolveStepAssessment } from '@/lib/section-mastery'
import { computeEvidenceFingerprint } from '@/lib/project-verification/evidence'
import { artifactKindSet, missingRequiredArtifacts, parseArtifacts } from '@/lib/project-verification/artifacts'
import { assessSubmission } from '@/lib/project-verification/assessment'
import { createDeepSeekProvider } from '@/lib/project-verification/provider'
import { checkAssessmentBudget, getSubmission, isReusablePass, saveSubmission, type StoredSubmission } from '@/lib/project-verification/store'
import { getEntitlementSnapshot } from '@/lib/commercial/service'
import {
  consumeAssessmentCredit,
  deriveAssessmentRequestId,
  releaseAssessmentCredit,
  reserveAssessmentCredit,
} from '@/lib/commercial/assessment-credits'

export const dynamic = 'force-dynamic'

const PROVIDER = createDeepSeekProvider()

export async function POST(req: Request, { params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  const userId = session.user.id
  // Entitlement is decided server-side from verified state. A learner without
  // access to this track can never obtain an assessment credit here.
  if (!(await hasTrackAccess(userId, params.trackId))) return NextResponse.json({ error: 'Course access required' }, { status: 403 })

  if (!getTrackById(params.trackId)) return NextResponse.json({ error: 'Unknown track' }, { status: 404 })

  const body = await req.json().catch(() => null)
  const stepIndex = typeof body?.stepIndex === 'number' ? body.stepIndex : -1
  if (stepIndex < 0) return NextResponse.json({ error: 'Invalid stepIndex' }, { status: 400 })

  const steps = getTrackSteps(params.trackId)
  const step = steps[stepIndex]
  if (!step) return NextResponse.json({ error: 'Step not found' }, { status: 404 })

  // Resolve the assessment contract through the single shared resolver: a mapped
  // project (base track or AI project extension) uses its brief, and a build step
  // with no mapped project uses the section-mastery contract derived from the
  // section's authored objective.
  const assessment = resolveStepAssessment(params.trackId, step)
  if (!assessment) {
    return NextResponse.json({ error: 'This step has no configured assessment.' }, { status: 400 })
  }
  const contract = assessment.contract
  const assessmentId = assessment.projectId

  // Only the currently unlocked step may be assessed.
  const enrollment = await prisma.guidedPathEnrollment.findUnique({ where: { userId_trackId: { userId, trackId: params.trackId } } })
  if (!enrollment || enrollment.currentStepIndex !== stepIndex) {
    return NextResponse.json({ error: 'Complete the currently unlocked step first.' }, { status: 409 })
  }

  if (body?.acknowledged !== true) {
    return NextResponse.json({ error: 'Confirm that the submitted work is your own before assessment.' }, { status: 422 })
  }

  const parsedArtifacts = parseArtifacts(body?.artifacts)
  if (!parsedArtifacts.ok) {
    return NextResponse.json(
      { error: parsedArtifacts.error, code: parsedArtifacts.code, unsupportedKind: parsedArtifacts.kind },
      { status: 422 },
    )
  }
  const artifacts = parsedArtifacts.artifacts

  // Reject artifacts the contract does not accept, and deterministic missing
  // required artifacts, before any credit is reserved or model call is made.
  const allowedKinds = new Set<ArtifactKind>([
    ...Array.from(artifactKindSet(contract.requiredArtifacts)),
    ...Array.from(artifactKindSet(contract.optionalArtifacts)),
  ])
  const unsupported = artifacts.filter((artifact) => !allowedKinds.has(artifact.kind))
  if (unsupported.length) {
    return NextResponse.json(
      {
        error: `This project does not accept: ${unsupported.map((artifact) => artifact.kind).join(', ')}.`,
        code: 'ARTIFACT_KIND_NOT_ALLOWED',
        unsupportedKinds: unsupported.map((artifact) => artifact.kind),
      },
      { status: 422 },
    )
  }
  const missing = missingRequiredArtifacts(contract, artifacts)
  if (missing.length) {
    return NextResponse.json(
      {
        error: `Add the required evidence: ${missing.map((requirement) => requirement.kind).join(', ')}.`,
        code: 'ARTIFACT_REQUIRED_MISSING',
        missingKinds: missing.map((requirement) => requirement.kind),
      },
      { status: 422 },
    )
  }

  const explanation = typeof body?.explanation === 'string' ? body.explanation.trim() : ''

  // Reuse a valid prior pass for identical evidence + rubric without a new AI call
  // and without consuming a credit.
  const fingerprint = computeEvidenceFingerprint(artifacts, contract.rubricVersion)
  const existing = await getSubmission(prisma, userId, params.trackId, assessmentId)
  if (isReusablePass(existing, fingerprint, contract.rubricVersion)) {
    return NextResponse.json({ status: 'passed', reused: true, reviewSummary: existing?.reviewSummary, criteria: existing?.criteria, decision: existing?.decision, warnings: existing?.warnings ?? [] })
  }

  const budget = await checkAssessmentBudget(prisma, userId)
  if (!budget.allowed) {
    return NextResponse.json({ error: budget.reason, status: 'service_unavailable' }, { status: 429 })
  }

  // Plan + allowance come from trusted server-side entitlement state, never the
  // browser. The monthly allowance (Free 20 / Track Pass 30 / Pro 150) is enforced
  // through an atomic, durable reservation taken BEFORE the billable model call.
  const snapshot = await getEntitlementSnapshot(prisma, userId)
  const requestId = deriveAssessmentRequestId({
    userId,
    trackId: params.trackId,
    projectId: assessmentId,
    evidenceFingerprint: fingerprint,
    rubricVersion: contract.rubricVersion,
    clientKey: typeof body?.requestId === 'string' ? body.requestId : null,
  })

  const reservation = await reserveAssessmentCredit(prisma, {
    userId,
    requestId,
    tier: snapshot.tier,
    allowance: snapshot.assessmentAllowance,
    trackId: params.trackId,
    stepId: String(stepIndex),
  })

  if (reservation.outcome === 'exhausted') {
    return NextResponse.json(
      {
        error: `You have used all ${snapshot.assessmentAllowance} AI project assessments included in your plan this month.`,
        status: 'allowance_exhausted',
        used: reservation.consumed + reservation.reserved,
        allowance: reservation.allowance,
        remaining: reservation.remaining,
      },
      { status: 429 },
    )
  }
  if (reservation.outcome === 'in_flight') {
    return NextResponse.json(
      { error: 'An assessment for this exact submission is already running. Please wait for it to finish.', status: 'assessment_in_progress' },
      { status: 409 },
    )
  }
  if (reservation.outcome === 'consumed') {
    // Duplicate of an already-billed request (retry of the same logical
    // assessment): return the stored outcome without a second model call or
    // credit.
    return NextResponse.json({
      status: existing?.status ?? 'passed',
      reused: true,
      code: existing?.code,
      reviewSummary: existing?.reviewSummary,
      criteria: existing?.criteria,
      decision: existing?.decision,
      warnings: existing?.warnings ?? [],
      reason: existing?.reason,
      helpGuideId: existing?.helpGuideId,
      rubricVersion: contract.rubricVersion,
      evidenceFingerprint: fingerprint,
    })
  }

  // Preserve the learner's submission before any network/AI work.
  const priorAttempts = existing?.attemptCount ?? 0
  const draft: StoredSubmission = {
    projectId: assessmentId,
    status: 'in_progress' as StoredSubmission['status'],
    artifacts,
    explanation,
    evidenceFingerprint: fingerprint,
    rubricVersion: contract.rubricVersion,
    assessmentVersion: 'pending',
    attemptCount: priorAttempts + 1,
    submittedAt: new Date().toISOString(),
  }
  await saveSubmission(prisma, userId, params.trackId, draft)

  let result
  try {
    // The model call is deliberately OUTSIDE any database transaction.
    result = await assessSubmission({
      contract,
      artifacts,
      explanation,
      provider: PROVIDER,
      deps: { githubToken: process.env.GITHUB_TOKEN },
    })
  } catch (error) {
    // A thrown error is a non-billable outcome; return the reserved credit.
    await releaseAssessmentCredit(prisma, { userId, requestId, reason: 'exception' })
    throw error
  }

  await saveSubmission(prisma, userId, params.trackId, {
    ...draft,
    status: result.status,
    code: result.code,
    evidenceFingerprint: result.evidenceFingerprint || fingerprint,
    assessmentVersion: result.assessmentVersion,
    provider: result.provider,
    model: result.model,
    criteria: result.criteria,
    decision: result.decision,
    reviewSummary: result.reviewSummary,
    reason: result.reason,
    helpGuideId: result.helpGuideId,
    minWords: result.minWords,
    wordCount: result.wordCount,
    warnings: result.warnings,
    assessedAt: new Date().toISOString(),
  })

  await recordLearningEvent({
    userId,
    eventName: result.status === 'service_unavailable' ? 'project_assessment_failed' : 'project_assessed',
    trackId: params.trackId,
    stepId: String(stepIndex),
    // Redacted diagnostics only: never log submitted content or credentials.
    metadata: { projectId: assessmentId, status: result.status, code: result.code, provider: result.provider },
  })

  // Consume the credit exactly once when the model produced a usable decision.
  // Deterministic rejections and provider failures release the reservation
  // instead. Consuming also writes the `assessment_credit_used` audit event in
  // the same transaction. Both operations are idempotent and can never run twice
  // for the same reservation.
  if (result.creditConsumed) {
    await consumeAssessmentCredit(prisma, {
      userId,
      requestId,
      trackId: params.trackId,
      stepId: String(stepIndex),
      metadata: { projectId: assessmentId, provider: result.provider },
    })
  } else {
    await releaseAssessmentCredit(prisma, {
      userId,
      requestId,
      reason: result.status === 'service_unavailable' ? 'provider_error' : 'deterministic_rejection',
    })
  }

  return NextResponse.json({
    status: result.status,
    code: result.code,
    reviewSummary: result.reviewSummary,
    criteria: result.criteria,
    decision: result.decision,
    warnings: result.warnings,
    reason: result.reason,
    helpGuideId: result.helpGuideId,
    minWords: result.minWords,
    wordCount: result.wordCount,
    rubricVersion: result.rubricVersion,
    evidenceFingerprint: result.evidenceFingerprint || fingerprint,
  })
}
