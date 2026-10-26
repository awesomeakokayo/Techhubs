/**
 * TechSkillHub — payment provider capabilities (server-controlled).
 *
 * Pure and credential-free: this module only ever reads whether configuration
 * is *present* (booleans), never the secret values themselves. It is the single
 * place that maps internal plans to provider product/variant identifiers.
 */

import type { PlanId } from './plans'
import { PLAN_IDS } from './plans'
import { resolveProviderPrice } from './pricing'

export type ProviderId = 'paystack' | 'lemonsqueezy'

export const PROVIDER_IDS: readonly ProviderId[] = ['lemonsqueezy', 'paystack'] as const

export interface ProviderCapabilities {
  id: ProviderId
  label: string
  /** Plans this provider can sell. */
  supports: readonly PlanId[]
  /** Currencies this provider is used for (Paystack NGN only where verified). */
  currencies: readonly string[]
  /** True when the minimum server configuration is present. */
  configured: boolean
}

export const PROVIDER_LABELS: Record<ProviderId, string> = {
  lemonsqueezy: 'Card / international (Lemon Squeezy)',
  paystack: 'Nigeria (Paystack)',
}

/** Environment variable that holds the provider variant/product id for a plan. */
export const PROVIDER_PRODUCT_ENV: Record<ProviderId, Partial<Record<PlanId, string>>> = {
  lemonsqueezy: {
    TRACK_PASS: 'LEMONSQUEEZY_VARIANT_TRACK_PASS',
    PRO_MONTHLY: 'LEMONSQUEEZY_VARIANT_PRO_MONTHLY',
    PRO_QUARTERLY: 'LEMONSQUEEZY_VARIANT_PRO_QUARTERLY',
    PRO_ANNUAL: 'LEMONSQUEEZY_VARIANT_PRO_ANNUAL',
  },
  // Paystack transactions do not require a provider-side plan/product id.
  paystack: {
    PRO_MONTHLY: 'PAYSTACK_PLAN_CODE_PRO_MONTHLY',
    PRO_QUARTERLY: 'PAYSTACK_PLAN_CODE_PRO_QUARTERLY',
    PRO_ANNUAL: 'PAYSTACK_PLAN_CODE_PRO_ANNUAL',
  },
}

type Env = Record<string, string | undefined>

function present(env: Env, key: string): boolean {
  const value = env[key]
  return typeof value === 'string' && value.trim().length > 0
}

/** Global checkout switch. Disabled by default — a missing/false value is safe. */
export function checkoutEnabled(env: Env = process.env): boolean {
  return env.COMMERCE_CHECKOUT_ENABLED === 'true'
}

/** Entitlement enforcement switch. Disabled by default so no learner is reduced. */
export function entitlementsEnforced(env: Env = process.env): boolean {
  return env.COMMERCE_ENTITLEMENTS_ENFORCED === 'true'
}

/**
 * Provider test-mode switch for sandbox verification. Default false (live).
 * When true, a checkout is created in the provider's test mode; test-mode
 * deliveries are ignored for entitlement (see `lib/commercial/webhooks.ts`), so
 * enabling this can never grant paid access.
 */
export function providerTestMode(env: Env = process.env): boolean {
  return env.COMMERCE_PROVIDER_TEST_MODE === 'true'
}

/**
 * Monthly AI-assessment allowance enforcement.
 *
 * ON by default: the allowance is a finite cost control (Free 20 / Pass 30 /
 * Pro 150 per month, from `lib/commercial/plans.ts`) that must be authoritative
 * to keep AI spend bounded and to make the reservation ledger meaningful. It is
 * an additional limit on top of the existing hourly abuse budget, never a
 * replacement for it. Only an explicit 'false' disables it.
 */
export function assessmentAllowanceEnforced(env: Env = process.env): boolean {
  return env.COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED !== 'false'
}

export function lemonSqueezyConfigured(env: Env = process.env): boolean {
  return (
    present(env, 'LEMONSQUEEZY_API_KEY') &&
    present(env, 'LEMONSQUEEZY_STORE_ID') &&
    present(env, 'LEMONSQUEEZY_WEBHOOK_SECRET') &&
    present(env, 'LEMONSQUEEZY_VARIANT_TRACK_PASS') &&
    present(env, 'LEMONSQUEEZY_VARIANT_PRO_MONTHLY') &&
    present(env, 'LEMONSQUEEZY_VARIANT_PRO_ANNUAL')
  )
}

export function paystackConfigured(env: Env = process.env): boolean {
  return present(env, 'PAYSTACK_SECRET_KEY')
}

export function providerCapabilities(provider: ProviderId, env: Env = process.env): ProviderCapabilities {
  if (provider === 'lemonsqueezy') {
    return {
      id: 'lemonsqueezy',
      label: PROVIDER_LABELS.lemonsqueezy,
      supports: PLAN_IDS,
      currencies: ['USD'],
      configured: lemonSqueezyConfigured(env),
    }
  }
  const paystackSupports: PlanId[] = ['TRACK_PASS']
  const proSubscriptionsEnabled = env.COMMERCE_PAYSTACK_PRO_SUBSCRIPTIONS_ENABLED === 'true'
  if (proSubscriptionsEnabled && paystackConfigured(env)) {
    for (const planId of ['PRO_MONTHLY', 'PRO_QUARTERLY', 'PRO_ANNUAL'] as const) {
      const planCodeEnv = PROVIDER_PRODUCT_ENV.paystack[planId]
      if (planCodeEnv && present(env, planCodeEnv)) paystackSupports.push(planId)
    }
  }

  return {
    id: 'paystack',
    label: PROVIDER_LABELS.paystack,
    // Track Pass is one-time. Pro plans require explicit opt-in plus a verified
    // provider-side recurring plan code for the matching billing interval.
    supports: paystackSupports,
    currencies: ['NGN'],
    configured: paystackConfigured(env),
  }
}

/** Providers that can currently sell a plan (configured and supporting it). */
export function availableProviders(planId: PlanId, env: Env = process.env): ProviderId[] {
  return PROVIDER_IDS.filter((id) => {
    const caps = providerCapabilities(id, env)
    return caps.configured && caps.supports.includes(planId) && resolveProviderPrice(id, planId) !== null
  })
}

/**
 * Resolve the provider for a checkout.
 *
 * A preferred provider represents the server-derived market/currency decision.
 * Never fall back across providers when that preference is unavailable: doing so
 * could silently charge a Nigerian learner in USD or an international learner in
 * NGN. Returns null when the provider for that market cannot fulfil the plan.
 */
export function selectProvider(
  planId: PlanId,
  preferred: ProviderId | null | undefined,
  env: Env = process.env,
): ProviderId | null {
  const available = availableProviders(planId, env)
  if (available.length === 0) return null
  if (preferred) return available.includes(preferred) ? preferred : null
  return available[0]
}

/** The configured provider product/variant id for a plan, or null. */
export function providerProductId(provider: ProviderId, planId: PlanId, env: Env = process.env): string | null {
  const key = PROVIDER_PRODUCT_ENV[provider]?.[planId]
  if (!key) return null
  const value = env[key]
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null
}
