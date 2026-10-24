/**
 * TechSkillHub — fail-closed launch readiness.
 *
 * Checkout is evaluated for the exact plan/provider requested. An approved NGN
 * Track Pass must not implicitly approve the provisional USD products.
 */
import { PLAN_IDS, premiumTrackConfigIssues, premiumTrackIds, type PlanId } from './plans'
import { hasApprovedPrice, pricesApprovedForPublication, isPriceApproved, resolveProviderPrice } from './pricing'
import { availableProviders, type ProviderId } from './providers'

export interface LaunchReadiness {
  ready: boolean
  blockers: string[]
}

export function launchReadiness(
  env: Record<string, string | undefined> = process.env,
  requestedPlanId?: PlanId,
  requestedProvider?: ProviderId | null,
): LaunchReadiness {
  const blockers: string[] = []

  if (env.COMMERCE_ENTITLEMENTS_ENFORCED !== 'true') blockers.push('entitlements_not_enforced')
  if (!pricesApprovedForPublication(env)) blockers.push('prices_not_approved')
  if (premiumTrackIds(env).length === 0) blockers.push('no_premium_tracks_selected')
  if (premiumTrackConfigIssues(env).length > 0) blockers.push('premium_allowlist_invalid')

  const pricePlanIds = requestedPlanId ? [requestedPlanId] : [...PLAN_IDS]
  for (const planId of pricePlanIds) {
    if (requestedPlanId && requestedProvider) {
      if (!isPriceApproved(resolveProviderPrice(requestedProvider, planId), env)) {
        blockers.push(`price_not_approved:${requestedProvider}:${planId}`)
      }
    } else if (!hasApprovedPrice(planId, env)) {
      blockers.push(`price_not_approved:${planId}`)
    }
  }

  const providerReady = requestedPlanId
    ? Boolean(requestedProvider && availableProviders(requestedPlanId, env).includes(requestedProvider))
    : PLAN_IDS.every((planId) => availableProviders(planId, env).some((provider) =>
        isPriceApproved(resolveProviderPrice(provider, planId), env),
      ))
  if (!providerReady) blockers.push('no_provider_configured')

  return { ready: blockers.length === 0, blockers }
}

/** True only when the relevant plan/provider prerequisites are satisfied. */
export function checkoutAllowedToStart(
  env: Record<string, string | undefined> = process.env,
  planId?: PlanId,
  provider?: ProviderId | null,
): boolean {
  return launchReadiness(env, planId, provider).ready
}
