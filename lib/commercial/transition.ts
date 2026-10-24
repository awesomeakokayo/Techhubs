/**
 * TechSkillHub — legacy-user transition policy and dry-run analysis (pure).
 *
 * TechSkillHub was historically open: learners could reach tracks they had not
 * started, so the absence of progress does NOT prove a learner never had access
 * or does not expect to continue. This module makes the transition decision
 * explicit, auditable and fail-safe:
 *
 *   - while enforcement is off, EVERYONE is retained (mode `OPEN`);
 *   - a learner in the legacy cohort, or with any recorded activity, legacy
 *     access record, submission, completion or certificate, is retained;
 *   - an ambiguous legacy account (no activity but created before the cohort
 *     cutoff) is retained and reported as `uncertain`, never silently revoked;
 *   - only a learner who is unambiguously post-cutover with no recorded activity
 *     is a candidate for the normal Free/premium rules.
 *
 * Nothing here reads or writes data, so it can be dry-run safely.
 */

export type TransitionMode = 'OPEN' | 'GRANDFATHERED' | 'ENFORCED'

export interface TransitionPolicy {
  mode: TransitionMode
  /** Accounts created strictly before this instant are the legacy cohort. */
  cohortCutoff: Date | null
  /** Full access is retained until this instant. */
  grandfatheredUntil: Date | null
  /** Extra days of grace applied after `grandfatheredUntil`. */
  graceDays: number
  /** Advance notice window an operator intends to give (documentation only). */
  noticeDays: number
}

export interface LegacySignals {
  userId: string
  createdAt: Date | string | null
  /** Any legacy TrackAccess row exists (NOT equivalent to a Track Pass). */
  hasLegacyAccess: boolean
  hasEnrollment: boolean
  hasProgress: boolean
  hasSubmission: boolean
  hasCompletion: boolean
  hasCertificate: boolean
}

export type TransitionAction = 'retain' | 'uncertain' | 'transition'

export interface TransitionDecision {
  userId: string
  action: TransitionAction
  reasons: string[]
}

export interface TransitionSummary {
  total: number
  retain: number
  uncertain: number
  transition: number
  mode: TransitionMode
}

type Env = Record<string, string | undefined>

function toDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function parseDays(raw: string | undefined): number {
  if (typeof raw !== 'string') return 0
  const value = Number.parseInt(raw.trim(), 10)
  return Number.isFinite(value) && value > 0 ? value : 0
}

/**
 * Resolve the transition policy. Defaults are the safest possible: `OPEN` mode
 * (nobody is affected) with no cutoff and no grandfathering deadline.
 */
export function resolveTransitionPolicy(env: Env = process.env): TransitionPolicy {
  const rawMode = (env.COMMERCE_TRANSITION_MODE ?? '').trim().toUpperCase()
  let mode: TransitionMode =
    rawMode === 'GRANDFATHERED' || rawMode === 'ENFORCED' ? (rawMode as TransitionMode) : 'OPEN'

  const cohortCutoff = toDate(env.COMMERCE_GRANDFATHERING_CUTOFF)
  const grandfatheredUntil = toDate(env.COMMERCE_GRANDFATHERING_UNTIL)
  const graceDays = parseDays(env.COMMERCE_TRANSITION_GRACE_DAYS)
  const noticeDays = parseDays(env.COMMERCE_TRANSITION_NOTICE_DAYS)

  // Fail-safe: a transition mode without a cohort cutoff or a grandfathering
  // deadline cannot make a safe decision, so it stays OPEN until configured.
  if (mode !== 'OPEN' && !grandfatheredUntil && !cohortCutoff) mode = 'OPEN'

  return { mode, cohortCutoff, grandfatheredUntil, graceDays, noticeDays }
}

/** Is the learner inside the retained legacy cohort right now? */
export function retainedLegacyAccess(policy: TransitionPolicy, now: Date): boolean {
  if (policy.mode === 'OPEN') return true
  const deadline = policy.grandfatheredUntil
  if (!deadline) return true
  const graceMs = policy.graceDays * 24 * 60 * 60 * 1000
  return now.getTime() < deadline.getTime() + graceMs
}

/**
 * Classify one learner. Conservative by construction: it only ever returns
 * `transition` when the learner is unambiguously outside the legacy cohort and
 * has no recorded activity of any kind.
 */
export function classifyLegacyUser(
  signals: LegacySignals,
  policy: TransitionPolicy,
  now: Date = new Date(),
): TransitionDecision {
  const reasons: string[] = []

  if (policy.mode === 'OPEN') return { userId: signals.userId, action: 'retain', reasons: ['enforcement_disabled'] }

  if (retainedLegacyAccess(policy, now)) {
    reasons.push('within_grandfathering_window')
  }

  const recordedActivity =
    signals.hasEnrollment ||
    signals.hasProgress ||
    signals.hasSubmission ||
    signals.hasCompletion ||
    signals.hasCertificate
  if (recordedActivity) reasons.push('recorded_activity')
  if (signals.hasLegacyAccess) reasons.push('legacy_access_record')

  const created = toDate(signals.createdAt)
  const beforeCutoff =
    policy.cohortCutoff === null ||
    (created !== null && created.getTime() < policy.cohortCutoff.getTime())
  if (beforeCutoff) reasons.push('legacy_cohort')

  // Retain for any of: grandfathered window, recorded activity, legacy access.
  if (reasons.some((r) => r === 'within_grandfathering_window' || r === 'recorded_activity' || r === 'legacy_access_record')) {
    return { userId: signals.userId, action: 'retain', reasons }
  }

  // No activity recorded: ambiguous. A pre-cutover account (or an account whose
  // creation date we cannot trust) keeps access pending review — never guess.
  if (beforeCutoff || created === null) {
    return { userId: signals.userId, action: 'uncertain', reasons: [...reasons, 'no_activity_ambiguous'] }
  }

  return { userId: signals.userId, action: 'transition', reasons: ['post_cutover_no_activity'] }
}

/** Aggregate a dry-run classification into privacy-conscious counts. */
export function summarizeTransition(
  decisions: readonly TransitionDecision[],
  mode: TransitionMode,
): TransitionSummary {
  const summary: TransitionSummary = { total: decisions.length, retain: 0, uncertain: 0, transition: 0, mode }
  for (const decision of decisions) {
    if (decision.action === 'retain') summary.retain += 1
    else if (decision.action === 'uncertain') summary.uncertain += 1
    else summary.transition += 1
  }
  return summary
}
