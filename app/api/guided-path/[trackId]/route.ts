import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { buildGuidedPath, requiredCorrectFor, toPublicStep, expectedPathVersion } from '@/lib/guided-path'
import { getTrackById } from '@/lib/tracks'
import type { GuidedStep } from '@/lib/guided-path'
import { migrateEnrollmentIfNeeded, acknowledgePathUpdate } from '@/lib/path-enrollment'
import type { PathUpdateNotice } from '@/lib/path-compat'
import { buildAIWorldClassPath } from '@/lib/ai-guided-path'
import { hasTrackAccess } from '@/lib/access'
import { deriveGuidedPathProgress, derivePortfolioReadiness } from '@/lib/learning-progress'
import { toPublicContract } from '@/lib/project-verification/contract'
import { resolveStepAssessment } from '@/lib/section-mastery'
import { getSubmission, type StoredSubmission } from '@/lib/project-verification/store'
import {
  calculateLearningRhythm,
  DEFAULT_LEARNER_TIME_ZONE,
  getLearningMilestones,
} from '@/lib/learning-rhythm'
import { recordLearningEvent } from '@/lib/event-recorder'
import { STAGE_LEARNING_PLANS_EXTENDED } from '@/lib/curriculum-extended'
import {
  publicQuizFeedback,
  readQuizAttemptState,
  serialiseQuizAttemptState,
  QuizAttemptError,
  validAttemptId,
  hasLegacyGrandfather,
} from '@/lib/quiz-attempts'
import {
  lockEnrollmentRow,
  storedTrackData,
  prepareQuizAttempt,
  markQuizAttemptCommitted,
  recordLegacyQuizGrandfathers,
} from '@/lib/guided-path-quiz'
import type { LearningEventName } from '@/lib/learning-events'

export const dynamic = 'force-dynamic'

/**
 * Tracks whose path gained authored practice/knowledge-check steps (and, for
 * three of them, restructured stages). Only these re-key, so unrelated learner
 * journeys are never disturbed.
 */
const EXTENDED_TRACK_IDS = new Set(Object.keys(STAGE_LEARNING_PLANS_EXTENDED))

function getSteps(trackId: string) {
  return trackId.startsWith('ai-') ? buildAIWorldClassPath(trackId) : buildGuidedPath(trackId)
}

export interface PathUpdateNoticeResponse {
  fromVersion: number
  toVersion: number
  strategy: PathUpdateNotice['strategy']
  message: string
}

async function ensureEnrollment(
  userId: string,
  trackId: string,
  steps: ReturnType<typeof getSteps>,
): Promise<{ enrollment: { currentStepIndex: number }; pathUpdate: PathUpdateNoticeResponse | null }> {
  let enrollment = await prisma.guidedPathEnrollment.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
  if (!enrollment) {
    try {
      enrollment = await prisma.guidedPathEnrollment.create({ data: { userId, trackId } })
      await recordLearningEvent({
        userId,
        eventName: 'path_started',
        trackId,
        metadata: { startedAt: enrollment.startedAt.toISOString() },
      })
    } catch (error) {
      // A concurrent first request may have created the enrollment already; the
      // unique constraint guarantees only one row, so re-read it.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        enrollment = await prisma.guidedPathEnrollment.findUnique({
          where: { userId_trackId: { userId, trackId } },
        })
      } else {
        throw error
      }
    }
  }
  if (!enrollment) throw new Error('ENROLLMENT_UNAVAILABLE')

  const expectedVersion = expectedPathVersion(trackId, EXTENDED_TRACK_IDS.has(trackId))
  const migration = await migrateEnrollmentIfNeeded(prisma, {
    userId,
    trackId,
    steps,
    expectedVersion,
  })

  // A legacy completion is preserved by the path remap. Record it explicitly
  // (without inventing a score or answers) so it is never mistaken for a pass
  // on the current quiz version. This is idempotent and skips stages that have
  // durable attempts, so current work is never labelled legacy.
  await recordLegacyQuizGrandfathers(prisma, userId, trackId)

  // The path changed shape. The learner's position was remapped to the correct
  // equivalent step (see `lib/path-compat.ts`) — never restarted — so all their
  // completed work still counts and they can carry on from where they were. The
  // notice is persisted and stays until dismissed, so a reload or a duplicate
  // request cannot lose it.
  const pathUpdate = migration.pathUpdate

  return { enrollment: { ...enrollment, currentStepIndex: migration.currentStepIndex ?? enrollment.currentStepIndex }, pathUpdate }
}

export async function GET(_req: Request, { params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  if (!getTrackById(params.trackId)) return NextResponse.json({ error: 'Track not found' }, { status: 404 })
  if (!(await hasTrackAccess(session.user.id, params.trackId))) return NextResponse.json({ error: 'Course access required' }, { status: 403 })

  const steps = getSteps(params.trackId)
  const { enrollment, pathUpdate } = await ensureEnrollment(session.user.id, params.trackId, steps)

  const trackProgress = await prisma.userTrackProgress.findUnique({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
    select: { data: true },
  })
  const storedData = trackProgress?.data && typeof trackProgress.data === 'object' && !Array.isArray(trackProgress.data)
    ? (trackProgress.data as Record<string, unknown>)
    : {}
  const quizState = readQuizAttemptState(storedData)
  const submissions = storedData.projectSubmissions && typeof storedData.projectSubmissions === 'object' && !Array.isArray(storedData.projectSubmissions)
    ? (storedData.projectSubmissions as Record<string, { status?: string } | null>)
    : {}

  const progress = deriveGuidedPathProgress(enrollment, steps.length)
  const readiness = derivePortfolioReadiness(
    progress.completedSteps,
    steps.map((step) => ({ type: step.type, projectId: step.projectId, isPortfolio: step.isPortfolio })),
    submissions,
  )

  const submissionMap = submissions as Record<string, StoredSubmission | null>
  const publicSteps = steps.map((step) => {
    const pub = step.type === 'quiz' && hasLegacyGrandfather(quizState, step.stageId ?? 0)
      ? { ...toPublicStep(step), legacyGrandfathered: true }
      : toPublicStep(step)
    if (step.type !== 'project') return pub

    // Resolve the assessment server-side (a mapped project brief, or the section
    // mastery contract for AI build steps). This must not depend on a
    // client-supplied or AI-path-specific `projectBrief` field.
    const assessment = resolveStepAssessment(params.trackId, step)
    if (!assessment) return pub

    const stored = submissionMap[assessment.projectId] ?? null
    return {
      ...pub,
      submissionContract: toPublicContract(assessment.contract),
      submission: stored
        ? {
            status: stored.status,
            code: stored.code ?? null,
            reviewSummary: stored.reviewSummary ?? null,
            criteria: stored.criteria ?? null,
            decision: stored.decision ?? null,
            warnings: stored.warnings ?? [],
            reason: stored.reason ?? null,
            helpGuideId: stored.helpGuideId ?? null,
            evidenceFingerprint: stored.evidenceFingerprint ?? null,
            attemptCount: stored.attemptCount ?? 0,
            minWords: stored.minWords ?? null,
            wordCount: stored.wordCount ?? null,
            artifacts: stored.artifacts ?? [],
            explanation: stored.explanation ?? '',
          }
        : null,
    }
  })

  return NextResponse.json({
    steps: publicSteps,
    currentStepIndex: Math.min(enrollment.currentStepIndex, steps.length),
    readiness,
    pathUpdate,
  })
}

/* --------------------------------------------------------------------------
 * Quiz-attempt persistence and shared progression transition
 * ------------------------------------------------------------------------ */

/**
 * The single progression transition used by every step type. The quiz path
 * calls it only after the attempt record is durably written and the attempt has
 * passed; every other path calls it exactly as before.
 */
async function advanceWithinTransaction(
  tx: Prisma.TransactionClient,
  input: {
    userId: string
    trackId: string
    stepIndex: number
    completedStep: GuidedStep
    stepsLength: number
    isOrientation: boolean
    completedAt: Date
    historyStart: Date
  },
): Promise<{ currentStepIndex: number; milestones: ReturnType<typeof getLearningMilestones> }> {
  const { userId, trackId, stepIndex, completedStep, stepsLength, isOrientation, completedAt, historyStart } = input

  // Compare-and-swap the unlocked step index so a double click or duplicate
  // request cannot advance the same guided path twice.
  const claimed = await tx.guidedPathEnrollment.updateMany({
    where: { userId, trackId, currentStepIndex: stepIndex },
    data: { currentStepIndex: stepIndex + 1 },
  })
  if (claimed.count !== 1) throw new Error('STEP_ALREADY_ADVANCED')

  const progressResourceId =
    completedStep.resourceId || completedStep.projectId || `step-${completedStep.type}-${completedStep.stageId}`

  let milestones: ReturnType<typeof getLearningMilestones> = []

  // Orientation (stage introduction) steps advance the enrollment but are not
  // recorded as completed activities, so they skip all activity bookkeeping.
  if (!isOrientation) {
    const existing = await tx.userProgress.findFirst({
      where: {
        userId,
        trackId,
        itemType: completedStep.type === 'project' ? 'project' : 'stage',
        stageId: completedStep.stageId ?? undefined,
        resourceId: progressResourceId,
      },
    })

    const isNewActivity = !existing || existing.status !== 'COMPLETED'
    if (isNewActivity) {
      const previousActivityCount = await tx.userProgress.count({
        where: { userId, status: 'COMPLETED' },
      })
      const recentActivityRecords = await tx.userProgress.findMany({
        where: { userId, status: 'COMPLETED', completedAt: { gte: historyStart } },
        select: { completedAt: true },
      })
      const profile = await tx.learnerProfile.findUnique({
        where: { userId },
        select: { timeZone: true },
      })
      const timeZone = profile?.timeZone || DEFAULT_LEARNER_TIME_ZONE

      if (!existing) {
        await tx.userProgress.create({
          data: {
            userId,
            trackId,
            itemType: completedStep.type === 'project' ? 'project' : 'stage',
            stageId: completedStep.stageId,
            resourceId: progressResourceId,
            status: 'COMPLETED',
            completedAt,
          },
        })
      } else {
        await tx.userProgress.update({
          where: { id: existing.id },
          data: { status: 'COMPLETED', completedAt },
        })
      }

      const previousRhythm = calculateLearningRhythm(
        recentActivityRecords.map((activity) => activity.completedAt),
        completedAt,
        timeZone,
      )
      const nextRhythm = calculateLearningRhythm(
        [...recentActivityRecords.map((activity) => activity.completedAt), completedAt],
        completedAt,
        timeZone,
      )
      milestones = getLearningMilestones(
        previousActivityCount,
        previousActivityCount + 1,
        previousRhythm,
        nextRhythm,
      )
    }
  }

  if (stepIndex === stepsLength - 1) {
    await tx.courseCompletion.upsert({
      where: { userId_trackId: { userId, trackId } },
      create: { userId, trackId, completedAt },
      update: { completedAt },
    })
  }

  return { currentStepIndex: stepIndex + 1, milestones }
}

export async function POST(req: Request, { params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  if (!getTrackById(params.trackId)) return NextResponse.json({ error: 'Track not found' }, { status: 404 })
  if (!(await hasTrackAccess(session.user.id, params.trackId))) return NextResponse.json({ error: 'Course access required' }, { status: 403 })

  const body = await req.json().catch(() => null)

  // Dismissing the path-update notice is not a step completion and must not
  // affect progression, so it is handled before any step validation.
  if (body?.acknowledgePathUpdate === true) {
    await acknowledgePathUpdate(prisma, { userId: session.user.id, trackId: params.trackId })
    return NextResponse.json({ acknowledged: true })
  }

  const stepIndex = typeof body?.stepIndex === 'number' ? body.stepIndex : -1
  if (stepIndex < 0) return NextResponse.json({ error: 'Invalid stepIndex' }, { status: 400 })

  const steps = getSteps(params.trackId)
  if (stepIndex >= steps.length) return NextResponse.json({ error: 'Step index out of range' }, { status: 400 })

  const enrollment = (await ensureEnrollment(session.user.id, params.trackId, steps)).enrollment
  const completedStep = steps[stepIndex]
  if (!completedStep) return NextResponse.json({ error: 'Step not found' }, { status: 404 })

  const isQuiz = completedStep.type === 'quiz'
  const attemptId = typeof body?.attemptId === 'string' ? body.attemptId : ''
  if (isQuiz && !validAttemptId(attemptId)) {
    return NextResponse.json({ error: 'A valid attemptId is required for a knowledge check.' }, { status: 400 })
  }

  if (stepIndex !== enrollment.currentStepIndex) {
    // A replayed quiz request can arrive after the first request advanced the
    // path. Let the transaction recognise the committed attempt and return the
    // same successful outcome. A forward jump is always rejected.
    const replayCandidate = isQuiz && stepIndex < enrollment.currentStepIndex
    if (!replayCandidate) {
      return NextResponse.json({ error: 'Complete the currently unlocked step before continuing.' }, { status: 409 })
    }
  }

  const userId = session.user.id
  const isOrientation = completedStep.type === 'concept'
  const pathVersion = expectedPathVersion(params.trackId, EXTENDED_TRACK_IDS.has(params.trackId))
  const completedAt = new Date()
  const historyStart = new Date(completedAt)
  historyStart.setDate(historyStart.getDate() - 400)

  // A project step may only advance when the server already holds a passing
  // assessment for that project from the verification pipeline. The client
  // cannot send evidence, scores or a pass flag to bypass this.
  if (completedStep.type === 'project') {
    const assessment = resolveStepAssessment(params.trackId, completedStep)
    if (!assessment) {
      return NextResponse.json(
        { error: 'This project step has no configured assessment.', code: 'PROJECT_CONTRACT_MISSING' },
        { status: 400 },
      )
    }
    const stored = await getSubmission(prisma, userId, params.trackId, assessment.projectId)
    if (!stored || stored.status !== 'passed') {
      return NextResponse.json(
        {
          error: 'This section must pass automated verification before you can continue.',
          code: 'PROJECT_NOT_PASSED',
          status: stored?.status ?? 'incomplete',
          reason: stored?.reason ?? null,
        },
        { status: 422 },
      )
    }
  }

  try {
    const outcome = await prisma.$transaction(async (tx) => {
      if (isQuiz) {
        const currentStepIndex = await lockEnrollmentRow(tx, userId, params.trackId)
        const prepared = await prepareQuizAttempt(tx, {
          userId,
          trackId: params.trackId,
          stepIndex,
          step: completedStep,
          pathVersion: String(pathVersion),
          attemptId,
          answers: body?.answers,
          validateOnly: body?.validateOnly === true,
          requiredCorrect: requiredCorrectFor(params.trackId, completedStep.quizQuestions?.length ?? 0),
          currentStepIndex,
        })

        // A duplicate request for an attempt that already advanced must be a
        // no-op success, not a second advancement and not a 500 from the CAS.
        if (prepared.attempt.committed) {
          return {
            currentStepIndex,
            milestones: [],
            quizAttempt: prepared.attempt,
            advanced: true,
            replayed: true,
          }
        }

        if (currentStepIndex !== stepIndex) {
          throw new QuizAttemptError(
            'STEP_ALREADY_ADVANCED',
            'This step is already complete. Reload the guided path to continue from your current step.',
            409,
          )
        }

        // A validation attempt is durable but does not advance. A failed attempt
        // is also durable and returns feedback without releasing the key.
        if (body?.validateOnly === true || !prepared.attempt.passed) {
          return { currentStepIndex: stepIndex, milestones: [], quizAttempt: prepared.attempt, advanced: false, replayed: false }
        }

        const advanced = await advanceWithinTransaction(tx, {
          userId,
          trackId: params.trackId,
          stepIndex,
          completedStep,
          stepsLength: steps.length,
          isOrientation,
          completedAt,
          historyStart,
        })
        await markQuizAttemptCommitted(tx, userId, params.trackId, prepared.attempt.attemptId, completedAt)
        return { ...advanced, quizAttempt: prepared.attempt, advanced: true, replayed: false }
      }

      // A project step is checked before the transaction; reaching here means
      // its stored assessment already passed.
      const advanced = await advanceWithinTransaction(tx, {
        userId,
        trackId: params.trackId,
        stepIndex,
        completedStep,
        stepsLength: steps.length,
        isOrientation,
        completedAt,
        historyStart,
      })
      return { ...advanced, quizAttempt: null, advanced: true, replayed: false }
    })

    if (isQuiz && outcome.quizAttempt) {
      const quiz = publicQuizFeedback(outcome.quizAttempt)
      if (!outcome.advanced) {
        if (body?.validateOnly === true) {
          return NextResponse.json({ validateOnly: true, ...quiz })
        }
        return NextResponse.json(
          {
            error: `Not passed yet. You scored ${quiz.score}%. You need at least ${Math.round(
              (quiz.requiredCorrect / quiz.totalQuestions) * 100,
            )}%. Review the stage lesson and try again.`,
            ...quiz,
          },
          { status: 422 },
        )
      }

      const stepMetadata = {
        stepType: completedStep.type,
        stepTitle: completedStep.title,
        stageId: completedStep.stageId,
        attemptId: quiz.attemptId,
      }
      if (!outcome.replayed) {
        const events: { eventName: LearningEventName; metadata?: Record<string, unknown> }[] = [
          { eventName: 'quiz_passed', metadata: stepMetadata },
        ]
        if (stepIndex === steps.length - 1) events.push({ eventName: 'course_completed' })
        for (const milestone of outcome.milestones) {
          events.push({ eventName: 'milestone_reached', metadata: { code: milestone.code, title: milestone.title, category: milestone.category } })
        }
        await Promise.all(
          events.map((event) =>
            recordLearningEvent({
              userId,
              eventName: event.eventName,
              trackId: params.trackId,
              stepId: String(stepIndex),
              metadata: event.metadata,
            }),
          ),
        )
      }

      return NextResponse.json({ ...outcome, quiz })
    }

    const stepMetadata = {
      stepType: completedStep.type,
      stepTitle: completedStep.title,
      stageId: completedStep.stageId,
      ...(completedStep.resourceId ? { resourceId: completedStep.resourceId } : {}),
      ...(completedStep.projectId ? { projectId: completedStep.projectId } : {}),
    }

    const events: { eventName: LearningEventName; metadata?: Record<string, unknown> }[] = [
      { eventName: isOrientation ? 'learning_step_started' : 'learning_step_completed', metadata: stepMetadata },
    ]
    if (completedStep.type === 'project') {
      events.push({ eventName: 'project_completed', metadata: { stepTitle: completedStep.title, projectId: completedStep.projectId ?? null } })
    }
    if (stepIndex === steps.length - 1) events.push({ eventName: 'course_completed' })
    for (const milestone of outcome.milestones) {
      events.push({ eventName: 'milestone_reached', metadata: { code: milestone.code, title: milestone.title, category: milestone.category } })
    }
    await Promise.all(
      events.map((event) =>
        recordLearningEvent({
          userId,
          eventName: event.eventName,
          trackId: params.trackId,
          stepId: String(stepIndex),
          metadata: event.metadata,
        }),
      ),
    )

    // Returning authoritative progress at the final step lets the client render
    // the completion screen without a second full path request.
    let readiness: ReturnType<typeof derivePortfolioReadiness> | undefined
    if (stepIndex === steps.length - 1) {
      const trackProgress = await prisma.userTrackProgress.findUnique({
        where: { userId_trackId: { userId, trackId: params.trackId } },
        select: { data: true },
      })
      const storedData = storedTrackData(trackProgress?.data ?? null)
      const submissions = storedData.projectSubmissions && typeof storedData.projectSubmissions === 'object' && !Array.isArray(storedData.projectSubmissions)
        ? (storedData.projectSubmissions as Record<string, { status?: string } | null>)
        : {}
      const progress = deriveGuidedPathProgress({ currentStepIndex: outcome.currentStepIndex }, steps.length)
      readiness = derivePortfolioReadiness(
        progress.completedSteps,
        steps.map((step) => ({ type: step.type, projectId: step.projectId, isPortfolio: step.isPortfolio })),
        submissions,
      )
    }

    return NextResponse.json(readiness ? { ...outcome, readiness } : outcome)
  } catch (error) {
    if (error instanceof QuizAttemptError) {
      const retryAfter = error.details?.retryAfterSeconds
      return NextResponse.json(
        { error: error.message, code: error.code, ...(error.details ?? {}) },
        {
          status: error.status,
          ...(typeof retryAfter === 'number' ? { headers: { 'Retry-After': String(retryAfter) } } : {}),
        },
      )
    }
    if (error instanceof Error && error.message === 'STEP_ALREADY_ADVANCED') {
      return NextResponse.json(
        { error: 'This step has already been completed. Refresh your path to continue.' },
        { status: 409 },
      )
    }
    throw error
  }
}
