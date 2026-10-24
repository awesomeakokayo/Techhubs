/**
 * TechSkillHub — provider/currency keyed prices with per-product approval.
 *
 * COMMERCE_PRICES_APPROVED is the publication/checkout master switch. It does
 * not approve every catalogue entry: each price must also be marked approved.
 * This lets the owner launch a confirmed Nigerian Track Pass without silently
 * publishing provisional international Pro prices.
 */
import type { PlanId } from './plans'
import type { ProviderId } from './providers'

export const COMMERCIAL_PRICING_VERSION = 'TSH-COMMERCE-2026-10-TRACKPASS-3M-NGN6000'

export interface PlanPrice {
  planId: PlanId
  provider: ProviderId
  /** ISO 4217 currency code. */
  currency: string
  /** Integer minor units: kobo for NGN, cents for USD. */
  amountMinor: number
  /** ISO 8601 duration for subscriptions, if applicable. */
  interval: 'P1M' | 'P1Y' | null
  /** Owner-confirmed for this specific plan/provider/currency. */
  approved: boolean
}

/**
 * Internal price catalogue. The existing USD values remain provisional. The
 * only owner-approved price here is ₦6,000 for a three-calendar-month Track Pass
 * through Paystack. Publication and checkout still require their master flags.
 */
export const PRICE_CATALOGUE: Partial<Record<ProviderId, Partial<Record<PlanId, PlanPrice>>>> = {
  lemonsqueezy: {
    TRACK_PASS: { planId: 'TRACK_PASS', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 900, interval: null, approved: false },
    PRO_MONTHLY: { planId: 'PRO_MONTHLY', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 1200, interval: 'P1M', approved: false },
    PRO_ANNUAL: { planId: 'PRO_ANNUAL', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 9600, interval: 'P1Y', approved: false },
  },
  paystack: {
    TRACK_PASS: { planId: 'TRACK_PASS', provider: 'paystack', currency: 'NGN', amountMinor: 600000, interval: null, approved: true },
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
