/**
 * Structured assessment parsing and the deterministic grading policy.
 *
 * The model never grants progression. It only produces per-criterion results,
 * which are strictly validated here and then turned into a decision by
 * `decideAssessment` using the server-supplied rubric and pass threshold.
 */

import type { SubmissionContract, RubricCriterion } from './contract'

export type CriterionStatus = 'met' | 'partially_met' | 'not_met' | 'unable_to_verify'

export interface CriterionResult {
  criterionId: string
  status: CriterionStatus
  evidence: string
  feedback: string
  suggestedFix?: string
  confidence: number
}

export interface ValidatedAssessment {
  criteria: CriterionResult[]
  reviewSummary: string
}

const STATUSES: CriterionStatus[] = ['met', 'partially_met', 'not_met', 'unable_to_verify']
const ALLOWED_KEYS = new Set(['criterionId', 'status', 'evidence', 'feedback', 'suggestedFix', 'confidence'])
const MAX_TEXT = 1500

/**
 * Normalise the many ways a model may phrase a status ("not met", "Not Met",
 * "unable to verify", "partially met", "failed"…) to the canonical four values.
 * Unknown values still fail validation — this only tolerates formatting drift.
 */
const STATUS_ALIASES: Record<string, CriterionStatus> = {
  met: 'met',
  meets: 'met',
  pass: 'met',
  passed: 'met',
  satisfied: 'met',
  partially_met: 'partially_met',
  partial: 'partially_met',
  partially: 'partially_met',
  partly_met: 'partially_met',
  not_met: 'not_met',
  unmet: 'not_met',
  fail: 'not_met',
  failed: 'not_met',
  not_satisfied: 'not_met',
  unable_to_verify: 'unable_to_verify',
  cannot_verify: 'unable_to_verify',
  unverified: 'unable_to_verify',
  unknown: 'unable_to_verify',
  insufficient_evidence: 'unable_to_verify',
}

export function normalizeStatus(value: unknown): CriterionStatus | null {
  if (typeof value !== 'string') return null
  const key = value.trim().toLowerCase().replace(/[-\s]+/g, '_')
  if ((STATUSES as string[]).includes(key)) return key as CriterionStatus
  return STATUS_ALIASES[key] ?? null
}

export type ParseResult = { ok: true; value: ValidatedAssessment } | { ok: false; reason: string }

function stripCodeFence(raw: string): string {
  const trimmed = raw.trim()
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i)
  return fence ? fence[1] : trimmed
}

/**
 * Strictly validate a model response against the server rubric. Rejects missing
 * criteria, duplicate ids, unknown ids, invalid statuses, unexpected fields and
 * ungrounded evidence.
 */
export function parseAssessmentResponse(raw: string, rubric: RubricCriterion[]): ParseResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(stripCodeFence(raw))
  } catch {
    return { ok: false, reason: 'The assessment response was not valid JSON.' }
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, reason: 'The assessment response was not an object.' }
  }
  const record = parsed as Record<string, unknown>
  const criteriaRaw = record.criteria
  if (!Array.isArray(criteriaRaw)) return { ok: false, reason: 'The assessment response had no criteria array.' }

  const rubricIds = new Set(rubric.map((c) => c.id))
  const seen = new Set<string>()
  const criteria: CriterionResult[] = []

  for (const item of criteriaRaw) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return { ok: false, reason: 'A criterion entry was malformed.' }
    const entry = item as Record<string, unknown>
    for (const key of Object.keys(entry)) {
      if (!ALLOWED_KEYS.has(key)) return { ok: false, reason: `Unexpected field in criterion: ${key}.` }
    }
    const criterionId = typeof entry.criterionId === 'string' ? entry.criterionId.trim() : ''
    if (!rubricIds.has(criterionId)) return { ok: false, reason: `Unknown criterion id: ${criterionId || '(missing)'}.` }
    if (seen.has(criterionId)) return { ok: false, reason: `Duplicate criterion id: ${criterionId}.` }
    seen.add(criterionId)
    const status = normalizeStatus(entry.status)
    if (!status) {
      return { ok: false, reason: `Invalid status for ${criterionId}: ${String(entry.status).slice(0, 40)}.` }
    }
    const evidence = typeof entry.evidence === 'string' ? entry.evidence.trim().slice(0, MAX_TEXT) : ''
    const feedback = typeof entry.feedback === 'string' ? entry.feedback.trim().slice(0, MAX_TEXT) : ''
    if (!evidence || !feedback) return { ok: false, reason: `Criterion ${criterionId} is missing evidence or feedback.` }
    const suggestedFix = typeof entry.suggestedFix === 'string' ? entry.suggestedFix.trim().slice(0, MAX_TEXT) : undefined
    const rawConfidence = typeof entry.confidence === 'string' ? Number(entry.confidence) : entry.confidence
    const confidence = typeof rawConfidence === 'number' && rawConfidence >= 0 && rawConfidence <= 1 ? rawConfidence : 0.5
    criteria.push({ criterionId, status, evidence, feedback, suggestedFix, confidence })
  }

  const missing = rubric.filter((c) => !seen.has(c.id)).map((c) => c.id)
  if (missing.length) return { ok: false, reason: `The assessment omitted criteria: ${missing.join(', ')}.` }

  const reviewSummary = typeof record.reviewSummary === 'string' ? record.reviewSummary.trim().slice(0, MAX_TEXT) : ''
  if (!reviewSummary) return { ok: false, reason: 'The assessment response had no review summary.' }

  return { ok: true, value: { criteria, reviewSummary } }
}

export type AssessmentOutcome = 'passed' | 'changes_required' | 'unable_to_verify'

export interface AssessmentDecision {
  outcome: AssessmentOutcome
  score: number
  decisionReason: string
  failedCriteria: string[]
  unableCriteria: string[]
}

const STATUS_VALUE: Record<CriterionStatus, number> = {
  met: 1,
  partially_met: 0.5,
  not_met: 0,
  unable_to_verify: 0,
}

/**
 * Deterministic grading policy. A pass requires: no mandatory criterion failed or
 * unverifiable, and the weighted score at or above the contract threshold.
 */
export function decideAssessment(contract: SubmissionContract, results: CriterionResult[]): AssessmentDecision {
  const byId = new Map(results.map((r) => [r.criterionId, r]))
  const totalWeight = contract.rubric.reduce((sum, c) => sum + c.weight, 0) || 1
  let weighted = 0
  const failedCriteria: string[] = []
  const unableCriteria: string[] = []

  for (const criterion of contract.rubric) {
    const result = byId.get(criterion.id)
    if (!result) {
      failedCriteria.push(criterion.id)
      continue
    }
    weighted += criterion.weight * STATUS_VALUE[result.status]
    if (criterion.mandatory && result.status === 'unable_to_verify') unableCriteria.push(criterion.id)
    if (criterion.mandatory && result.status === 'not_met') failedCriteria.push(criterion.id)
  }

  const score = Math.round((weighted / totalWeight) * 100) / 100

  if (unableCriteria.length) {
    return {
      outcome: 'unable_to_verify',
      score,
      decisionReason: `Some required evidence could not be verified: ${unableCriteria.join(', ')}.`,
      failedCriteria,
      unableCriteria,
    }
  }
  if (failedCriteria.length) {
    return {
      outcome: 'changes_required',
      score,
      decisionReason: `Required criteria were not met: ${failedCriteria.join(', ')}.`,
      failedCriteria,
      unableCriteria,
    }
  }
  if (score < contract.passThreshold) {
    return {
      outcome: 'changes_required',
      score,
      decisionReason: `The submission scored ${Math.round(score * 100)}%, below the required ${Math.round(contract.passThreshold * 100)}%.`,
      failedCriteria: results.filter((r) => r.status !== 'met').map((r) => r.criterionId),
      unableCriteria,
    }
  }
  return { outcome: 'passed', score, decisionReason: 'All required criteria were met.', failedCriteria, unableCriteria }
}
