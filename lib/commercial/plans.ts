/**
 * TechSkillHub — canonical commercial catalogue (server-controlled).
 *
 * This is the single internal source of truth for what plans exist, what each
 * grants, and how many AI assessments each includes. It is deliberately
 * independent of any payment provider, currency or display price:
 *
 *   - internal plan identifiers here (e.g. `PRO_MONTHLY`) are NOT display text;
 *   - prices live in `lib/commercial/pricing.ts` and are provider/currency keyed;
 *   - provider-specific product/variant mappings live in `lib/commercial/providers.ts`.
 *
 * No price, product id or credential appears in this file.
 */

import { FIRST_WAVE_TRACK_IDS, resolvePremiumConfig } from './premium'

export type PlanId = 'TRACK_PASS' | 'PRO_MONTHLY' | 'PRO_ANNUAL'
export type PlanKind = 'ONE_TIME' | 'SUBSCRIPTION'
export type BillingInterval = 'NONE' | 'MONTH' | 'YEAR'
export type EntitlementTier = 'FREE' | 'PASS' | 'PRO'

export interface PlanDefinition {
  id: PlanId
  /** The tier this plan elevates a learner to. */
  tier: Exclude<EntitlementTier, 'FREE'>
  kind: PlanKind
  interval: BillingInterval
  /** Human label for UI. Never includes a price. */
  displayName: string
  /** Short comparison copy for the pricing page. */
  summary: string
  /** Feature bullets for the plan-comparison page. */
  features: string[]
  /** True when the plan grants every premium track. */
  grantsAllPremiumTracks: boolean
  /** Number of premium tracks granted when not all. `1` for a Track Pass. */
  grantsTrackCount: number
}

export const PLAN_IDS: readonly PlanId[] = ['TRACK_PASS', 'PRO_MONTHLY', 'PRO_ANNUAL'] as const

export const PLANS: Record<PlanId, PlanDefinition> = {
  TRACK_PASS: {
    id: 'TRACK_PASS',
    tier: 'PASS',
    kind: 'ONE_TIME',
    interval: 'NONE',
    displayName: 'Track Pass',
    // NOTE: copy must never imply lifetime/permanent access, auto-renewal, or a
    // price (prices are gated behind `COMMERCE_PRICES_APPROVED`).
    summary: 'One-time purchase for three calendar months of access to one premium track you choose.',
    features: [
      'Three months of access to one premium track you choose',
      'Includes the track\x27s AI project assessments',
      'No automatic renewal — nothing is charged when the term ends',
      'Your progress, submissions and certificates are kept when the term ends',
    ],
    grantsAllPremiumTracks: false,
    grantsTrackCount: 1,
  },
  PRO_MONTHLY: {
    id: 'PRO_MONTHLY',
    tier: 'PRO',
    kind: 'SUBSCRIPTION',
    interval: 'MONTH',
    displayName: 'TechSkillHub Pro — Monthly',
    summary: 'Recurring monthly access to every premium track and the Pro assessment allowance.',
    features: [
      'Every premium track',
      'Pro AI assessment allowance each month',
      'Priority assessment capacity',
      'Cancel any time; access continues to period end',
    ],
    grantsAllPremiumTracks: true,
    grantsTrackCount: Number.POSITIVE_INFINITY,
  },
  PRO_ANNUAL: {
    id: 'PRO_ANNUAL',
    tier: 'PRO',
    kind: 'SUBSCRIPTION',
    interval: 'YEAR',
    displayName: 'TechSkillHub Pro — Annual',
    summary: 'Annual Pro access at a discounted effective monthly price.',
    features: [
      'Everything in Pro Monthly',
      'Billed once a year',
      'Discounted effective monthly price',
    ],
    grantsAllPremiumTracks: true,
    grantsTrackCount: Number.POSITIVE_INFINITY,
  },
}

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === 'string' && (PLAN_IDS as readonly string[]).includes(value)
}

export function getPlan(value: unknown): PlanDefinition | null {
  return isPlanId(value) ? PLANS[value] : null
}

/**
 * Premium tracks require a Track Pass or Pro.
 *
 * The code-level default is the tracked, documented first-wave manifest
 * (`PREMIUM_WAVE_1` in `./premium`), which is scored and validated against the
 * real catalogue. Selecting them here does NOT change anyone's access: access is
 * decided by `hasTrackAccess`, which stays open for every learner until
 * entitlement enforcement (or a server-side pilot cohort) is enabled, and
 * checkout stays fail-closed in `./launch`.
 *
 * An operator can override the set with `COMMERCE_PREMIUM_TRACK_IDS`
 * (comma-separated); unknown ids are dropped so a typo can never make an
 * unintended track premium or turn the whole catalogue premium.
 */
export const PREMIUM_TRACK_IDS: readonly string[] = FIRST_WAVE_TRACK_IDS

/** Effective premium set (manifest default, env override, always validated). */
export function premiumTrackIds(env: Record<string, string | undefined> = process.env): string[] {
  return resolvePremiumConfig(env).trackIds
}

/** Configuration problems in the premium allowlist, for surfacing/logging. */
export function premiumTrackConfigIssues(env: Record<string, string | undefined> = process.env): string[] {
  return resolvePremiumConfig(env).issues
}

/** Pure membership test against an explicit premium set (unit-testable). */
export function isPremiumTrackIn(trackId: string, premiumIds: readonly string[]): boolean {
  return premiumIds.includes(trackId)
}

export function isPremiumTrack(trackId: string, env: Record<string, string | undefined> = process.env): boolean {
  return isPremiumTrackIn(trackId, premiumTrackIds(env))
}

/**
 * Monthly AI-assessment allowances by tier. Free is a defined allowance (never
 * unlimited). Values are provisional configuration, not published figures.
 */
export const ASSESSMENT_ALLOWANCES: Record<EntitlementTier, number> = {
  FREE: 20,
  PASS: 30,
  PRO: 150,
}

export function allowanceForTier(tier: EntitlementTier): number {
  return ASSESSMENT_ALLOWANCES[tier] ?? ASSESSMENT_ALLOWANCES.FREE
}

/** Does this plan grant access to the given track? */
export function planGrantsTrack(
  plan: PlanDefinition,
  trackId: string,
  env: Record<string, string | undefined> = process.env,
): boolean {
  if (plan.grantsAllPremiumTracks) return true
  return isPremiumTrack(trackId, env)
}

/** Plan ids that are one-time purchases. */
export function oneTimePlanIds(): PlanId[] {
  return PLAN_IDS.filter((id) => PLANS[id].kind === 'ONE_TIME')
}

/** Plan ids that are recurring subscriptions. */
export function subscriptionPlanIds(): PlanId[] {
  return PLAN_IDS.filter((id) => PLANS[id].kind === 'SUBSCRIPTION')
}
