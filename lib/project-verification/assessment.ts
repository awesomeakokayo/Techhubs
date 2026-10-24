/**
 * Assessment pipeline: deterministic validation → evidence extraction → AI
 * evaluation → strict validation → deterministic decision.
 *
 * The AI never decides progression. Any provider failure returns a
 * service-unavailable status and never a pass. Every outcome carries a typed
 * `code` so the UI can render an accurate, actionable message.
 */

import type { SubmissionContract } from './contract'
import { collectEvidence, type EvidenceDeps, type SubmittedArtifact } from './evidence'
import { isServiceFailureCode, type SubmissionCode } from './diagnostics'
import { ASSESSMENT_VERSION, SYSTEM_PROMPT, buildUserPrompt } from './prompt'
import { ProviderError, providerFromFailure, type AssessmentProvider } from './provider'
import { decideAssessment, parseAssessmentResponse, type CriterionResult, type AssessmentDecision } from './schema'

export type SubmissionStatus =
  | 'invalid'
  | 'incomplete'
  | 'unable_to_verify'
  | 'changes_required'
  | 'passed'
  | 'service_unavailable'

export interface AssessmentResult {
  status: SubmissionStatus
  code: SubmissionCode
  reason?: string
  helpGuideId?: string
  reviewSummary?: string
  criteria?: CriterionResult[]
  decision?: AssessmentDecision
  warnings: string[]
  minWords?: number
  wordCount?: number
  evidenceFingerprint: string
  rubricVersion: string
  assessmentVersion: string
  provider?: string
  model?: string
  /**
   * True only when the model produced a parsable response that was used to make
   * a decision. Deterministic rejections and provider failures are not billed as
   * assessment credits. Used by the commercial assessment-allowance accounting.
   */
  creditConsumed: boolean
}

export interface AssessInput {
  contract: SubmissionContract
  artifacts: SubmittedArtifact[]
  explanation: string
  provider: AssessmentProvider
  deps?: EvidenceDeps
}

/** Criteria that require inspecting the artifact's actual contents. */
const CONTENT_CRITERIA = new Set(['implementation-present', 'content-present', 'editing-evidence', 'design-rationale'])

export async function assessSubmission(input: AssessInput): Promise<AssessmentResult> {
  const { contract, provider } = input
  const base = {
    evidenceFingerprint: '',
    rubricVersion: contract.rubricVersion,
    assessmentVersion: ASSESSMENT_VERSION,
    provider: provider.name,
    model: provider.model,
    creditConsumed: false,
  }

  const { package: evidence } = await collectEvidence({
    contract,
    artifacts: input.artifacts,
    explanation: input.explanation,
    deps: input.deps,
  })

  if (evidence.rejected) {
    return {
      ...base,
      status: evidence.rejected.status,
      code: evidence.rejected.code,
      reason: evidence.rejected.reason,
      helpGuideId: evidence.rejected.helpGuideId,
      minWords: evidence.rejected.minWords,
      wordCount: evidence.rejected.wordCount,
      warnings: evidence.warnings,
    }
  }
  if (!evidence.ready) {
    return { ...base, status: 'unable_to_verify', code: 'evidence_insufficient', reason: 'We could not prepare your evidence for assessment. Please retry.', warnings: evidence.warnings }
  }

  const deterministicNotes = evidence.warnings.slice(0, 6)
  const userPrompt = buildUserPrompt({ contract, evidence, explanation: input.explanation, deterministicNotes })

  // The provider is called at most twice: a second, bounded attempt recovers from
  // an empty or malformed model response (a known occasional JSON-mode issue).
  let parsed: ReturnType<typeof parseAssessmentResponse> | null = null
  for (let attempt = 0; attempt < 2; attempt += 1) {
    let raw: string
    try {
      raw = await provider.assess({ systemPrompt: SYSTEM_PROMPT, userPrompt, maxOutputTokens: 3000, temperature: 0.1 })
    } catch (error) {
      // A provider failure never describes the project. It describes the service.
      const failure = providerFromFailure(error)
      const code: SubmissionCode =
        failure === 'timeout'
          ? 'assessment_timeout'
          : failure === 'rate_limited'
            ? 'assessment_rate_limited'
            : failure === 'not_configured'
              ? 'assessment_not_configured'
              : 'assessment_service_unavailable'
      const reason = error instanceof ProviderError ? error.message : 'The assessment service could not be reached.'
      return { ...base, status: 'service_unavailable', code, reason, warnings: evidence.warnings }
    }
    parsed = parseAssessmentResponse(raw, contract.rubric)
    if (parsed.ok) break
  }

  if (!parsed || !parsed.ok) {
    // The model returned invalid/malformed output: this is a service problem, not a project failure.
    return {
      ...base,
      status: 'service_unavailable',
      code: 'assessment_invalid_response',
      reason: 'We could not complete the automated assessment because the assessment service returned an invalid response. Your submission has been saved and has not been marked as failed. Please retry later.',
      warnings: evidence.warnings,
    }
  }

  const decision = decideAssessment(contract, parsed.value.criteria)
  const failedIds = new Set(decision.failedCriteria)
  const unableIds = new Set(decision.unableCriteria)

  let status: SubmissionStatus
  let code: SubmissionCode
  if (decision.outcome === 'passed') {
    status = 'passed'
    code = 'passed'
  } else if (decision.outcome === 'unable_to_verify') {
    status = 'unable_to_verify'
    code = Array.from(unableIds).some((id) => CONTENT_CRITERIA.has(id)) ? 'limited_inspection' : 'evidence_insufficient'
  } else {
    status = 'changes_required'
    const unrelated = Array.from(failedIds).some((id) => id === 'implementation-present' || id === 'content-present')
    code = unrelated ? 'artifact_unrelated' : 'changes_required'
  }

  return {
    ...base,
    status,
    code,
    reviewSummary: parsed.value.reviewSummary,
    criteria: parsed.value.criteria,
    decision,
    warnings: evidence.warnings,
    evidenceFingerprint: evidence.fingerprint,
    creditConsumed: true,
  }
}

export { isServiceFailureCode }
