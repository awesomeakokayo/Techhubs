/**
 * TechSkillHub — provider/currency keyed prices with per-product approval.
 *
 * COMMERCE_PRICES_APPROVED is the publication/checkout master switch.
 * It does not approve every catalogue entry: each price must also be marked
 * approved. Approved NGN prices may be shown before checkout release; only
 * provider-ready plans may be charged. International prices remain provisional.
 */
import type { PlanId } from './plans'
import type { ProviderId } from './providers'
import {
  FOUNDING_LEARNER_CAMPAIGN_ID,
  getFoundingLearnerCampaign,
} from './campaign'

export const COMMERCIAL_PRICING_VERSION = 'TSH-COMMERCE-2026-10-NGN-APPROVED-PRICING-V1'
export const FOUNDING_LEARNER_PRICING_VERSION = 'TSH-COMMERCE-2026-10-FOUNDING-LEARNER-3M-NGN3000'

export interface PlanPrice {
  planId: PlanId
  provider: ProviderId
  /** ISO 4217 currency code. */
  currency: string
  /** Integer minor units: kobo for NGN, cents for USD. */
  amountMinor: number
  /** ISO 8601 duration for subscriptions, if applicable. */
  interval: 'P1M' | 'P3M' | 'P1Y' | null
  /** Owner-confirmed for this specific plan/provider/currency. */
  approved: boolean
}

/**
 * Approved Nigerian pricing. Pro billing remains disabled for checkout until
 * Paystack subscription plan codes and sandbox verification are configured.
 * USD variants remain provisional and are never inferred from NGN pricing.
 */
export const PRICE_CATALOGUE: Partial<Record<ProviderId, Partial<Record<PlanId, PlanPrice>>>> = {
  lemonsqueezy: {
    TRACK_PASS: { planId: 'TRACK_PASS', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 900, interval: null, approved: false },
    PRO_MONTHLY: { planId: 'PRO_MONTHLY', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 1200, interval: 'P1M', approved: false },
    PRO_ANNUAL: { planId: 'PRO_ANNUAL', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 9600, interval: 'P1Y', approved: false },
  },
  paystack: {
    TRACK_PASS: { planId: 'TRACK_PASS', provider: 'paystack', currency: 'NGN', amountMinor: 600000, interval: null, approved: true },
    PRO_MONTHLY: { planId: 'PRO_MONTHLY', provider: 'paystack', currency: 'NGN', amountMinor: 450000, interval: 'P1M', approved: true },
    PRO_QUARTERLY: { planId: 'PRO_QUARTERLY', provider: 'paystack', currency: 'NGN', amountMinor: 1100000, interval: 'P3M', approved: true },
    PRO_ANNUAL: { planId: 'PRO_ANNUAL', provider: 'paystack', currency: 'NGN', amountMinor: 3600000, interval: 'P1Y', approved: true },
  },
}

/** Backwards-compatible name used by earlier tests and internal tooling. */
export const PROVISIONAL_PRICES = PRICE_CATALOGUE

/** Master switch for publishing prices. Default: false. */
export function pricesApprovedForPublication(env: Record<string, string | undefined> = process.env): boolean {
  return env.COMMERCE_PRICES_APPROVED === 'true'
}

/** Both the master switch and the individual price approval must pass. */
export function isPriceApproved(
  price: PlanPrice | null | undefined,
  env: Record<string, string | undefined> = process.env,
): boolean {
  return Boolean(price?.approved && pricesApprovedForPublication(env))
}

/** Resolve the configured price for a provider + plan, approved or not. */
export function resolveProviderPrice(provider: ProviderId, planId: PlanId): PlanPrice | null {
  return PRICE_CATALOGUE[provider]?.[planId] ?? null
}

/**
 * Resolve the authoritative price for display or a new order. The promotion is
 * server-time-gated, only applies to the Nigerian one-time Track Pass, and never
 * changes Pro subscription prices.
 */
export interface ResolvedCommercialPrice {
  price: PlanPrice
  pricingVersion: string
  campaignId: string | null
}

export function resolveCommercialPrice(
  provider: ProviderId,
  planId: PlanId,
  now: Date = new Date(),
  env: Record<string, string | undefined> = process.env,
): ResolvedCommercialPrice | null {
  const base = resolveProviderPrice(provider, planId)
  if (!base) return null

  const campaign = getFoundingLearnerCampaign(env, now)
  if (
    provider === 'paystack' &&
    planId === 'TRACK_PASS' &&
    base.approved &&
    campaign.active
  ) {
    return {
      price: { ...base, amountMinor: campaign.promotionalPriceMinor },
      pricingVersion: FOUNDING_LEARNER_PRICING_VERSION,
      campaignId: FOUNDING_LEARNER_CAMPAIGN_ID,
    }
  }

  return { price: base, pricingVersion: COMMERCIAL_PRICING_VERSION, campaignId: null }
}

/** True when any provider has a configured price for the plan. */
export function hasAnyPrice(planId: PlanId): boolean {
  return Object.values(PRICE_CATALOGUE).some((byPlan) => Boolean(byPlan?.[planId]))
}

/** True when at least one price for the plan is owner-approved and published. */
export function hasApprovedPrice(
  planId: PlanId,
  env: Record<string, string | undefined> = process.env,
): boolean {
  return Object.values(PRICE_CATALOGUE).some((byPlan) => isPriceApproved(byPlan?.[planId], env))
}

/** Format minor units without assuming every currency has two decimal places. */
export function formatPrice(price: PlanPrice): string {
  const major = price.amountMinor / 100
  if (price.currency === 'NGN') {
    return `₦${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(major)}`
  }
  const formatted = major.toFixed(2)
  const symbol: Record<string, string> = { USD: '$', GBP: '£', EUR: '€' }
  return `${symbol[price.currency] ?? `${price.currency} `}${formatted}`
}
