/**
 * TechSkillHub — commercial pricing configuration (server-controlled).
 *
 * Prices are kept completely separate from internal plan identifiers and from
 * entitlement logic, so a currency or provider change never touches access rules.
 *
 * IMPORTANT: the values below are PROVISIONAL configuration values that have NOT
 * been approved for publication. They are never rendered publicly unless
 * `pricesApprovedForPublication(env)` is explicitly enabled by an operator.
 *
 * No Nigerian naira prices are defined here: none have been calculated or
 * approved, and inventing them is prohibited.
 */

import type { PlanId } from './plans'
import type { ProviderId } from './providers'

/** Stamped on every internal order so transactions trace to a price set. */
export const COMMERCIAL_PRICING_VERSION = 'TSH-COMMERCE-2026-10'

export interface PlanPrice {
  planId: PlanId
  provider: ProviderId
  /** ISO 4217 currency code. */
  currency: string
  /** Minor units (cents). */
  amountMinor: number
  /** ISO 8601 duration for subscriptions, if applicable. */
  interval: 'P1M' | 'P1Y' | null
}

/**
 * Provisional international prices (USD). These are configuration placeholders
 * only — do not publish, advertise or charge without explicit approval.
 */
export const PROVISIONAL_PRICES: Partial<Record<ProviderId, Partial<Record<PlanId, PlanPrice>>>> = {
  lemonsqueezy: {
    TRACK_PASS: { planId: 'TRACK_PASS', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 900, interval: null },
    PRO_MONTHLY: { planId: 'PRO_MONTHLY', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 1200, interval: 'P1M' },
    PRO_ANNUAL: { planId: 'PRO_ANNUAL', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 9600, interval: 'P1Y' },
  },
  // Paystack (Nigerian) prices are intentionally undefined until the merchant is
  // approved and the owner supplies approved NGN values. Do NOT compute these.
  paystack: {},
}

/** Whether prices may be shown to the public. Default: false (unapproved). */
export function pricesApprovedForPublication(env: Record<string, string | undefined> = process.env): boolean {
  return env.COMMERCE_PRICES_APPROVED === 'true'
}

/** Resolve the configured price for a provider + plan, or null if not configured. */
export function resolveProviderPrice(provider: ProviderId, planId: PlanId): PlanPrice | null {
  return PROVISIONAL_PRICES[provider]?.[planId] ?? null
}

/** True when any price exists for the given plan on any provider. */
export function hasAnyPrice(planId: PlanId): boolean {
  return Object.values(PROVISIONAL_PRICES).some((byPlan) => Boolean(byPlan?.[planId]))
}

/**
 * Format a price for display from minor units. Returns e.g. "$9.00".
 * Used only when publication has been approved.
 */
export function formatPrice(price: PlanPrice): string {
  const major = price.amountMinor / 100
  const formatted = major.toFixed(2)
  const symbol: Record<string, string> = { USD: '$', GBP: '£', EUR: '€' }
  return `${symbol[price.currency] ?? `${price.currency} `}${formatted}`
}
