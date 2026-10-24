/**
 * TechSkillHub — fail-closed launch readiness (pure).
 *
 * Paid checkout must never be activatable while the paid model is incomplete.
 * Even if an operator flips `COMMERCE_CHECKOUT_ENABLED=true` by mistake, the
 * checkout route refuses to create a session until every prerequisite below is
 * satisfied. Each blocker is a concrete, actionable configuration gap.
 */

import { PLAN_IDS, premiumTrackConfigIssues, premiumTrackIds } from './plans'
import { hasAnyPrice, pricesApprovedForPublication } from './pricing'
import { PROVIDER_IDS, availableProviders } from './providers'

export interface LaunchReadiness {
  ready: boolean
  blockers: string[]
}

export function launchReadiness(env: Record<string, string | undefined> = process.env): LaunchReadiness {
  const blockers: string[] = []

  if (env.COMMERCE_ENTITLEMENTS_ENFORCED !== 'true') blockers.push('entitlements_not_enforced')
  if (!pricesApprovedForPublication(env)) blockers.push('prices_not_approved')
  if (premiumTrackIds(env).length === 0) blockers.push('no_premium_tracks_selected')
  // A valid premium allowlist is required: an unknown/empty set would silently
  // change which tracks are sellable, so it blocks checkout until corrected.
  if (premiumTrackConfigIssues(env).length > 0) blockers.push('premium_allowlist_invalid')
  if (PLAN_IDS.some((planId) => !hasAnyPrice(planId))) blockers.push('missing_plan_prices')

  const canSellEveryProduct = PLAN_IDS.every((planId) => availableProviders(planId, env).length > 0)
  if (!canSellEveryProduct) blockers.push('no_provider_configured')

  return { ready: blockers.length === 0, blockers }
}

/** True only when checkout may create a paid session. Checkout-off is handled separately. */
export function checkoutAllowedToStart(env: Record<string, string | undefined> = process.env): boolean {
  return launchReadiness(env).ready
}
