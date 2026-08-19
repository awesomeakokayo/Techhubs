export type PlanKey = 'monthly' | 'threeMonths' | 'yearly'
export type RegionKey = 'NG' | 'INTERNATIONAL'
export type Currency = 'NGN' | 'USD'
export type CountrySource = 'ip' | 'profile' | 'verified-card' | 'fallback'
export type PricingConfidence = 'high' | 'medium' | 'low'

export interface PriceTier {
  key: PlanKey
  label: string
  /** price in minor units (kobo when NGN, cents when USD) */
  price: number
  priceLabel: string
  /** optional anchor "regular" price in minor units, shown struck-through */
  regular?: number
  regularLabel?: string
  /** short offer label shown as a badge / next to the price */
  discount?: string
  badge?: string
}

export interface PricingRegion {
  key: RegionKey
  currency: Currency
  label: string
  tiers: PriceTier[]
}

/** The single provider for this checkout flow. Stripe is not used. */
export const PAYMENT_PROVIDER = 'PAYSTACK'

/**
 * Pricing version stamped on every internal order. Bump when prices change so
 * older transactions stay traceable to the price set that existed at checkout.
 */
export const PRICING_VERSION = 'TSH-PRO-2026-08'

/**
 * Pricing is applied per course. The NGN base monthly price (₦2,450) defines
 * the tier multipliers: 3-month = 2.1×, yearly = 6×.
 * USD base monthly is $4.99; 3-month rounded to $9.99; yearly rounded to $29.99.
 *
 * Paystack is the ONLY provider; Nigeria pays NGN, everyone else pays USD.
 */
export const PRICING: Record<RegionKey, PricingRegion> = {
  NG: {
    key: 'NG',
    currency: 'NGN',
    label: 'Nigeria — Naira',
    tiers: [
      { key: 'monthly', label: 'Monthly', price: 245000, priceLabel: '₦2,450' },
      {
        key: 'threeMonths',
        label: '3 Months',
        price: 514500,
        priceLabel: '₦5,145',
        regular: 735000,
        regularLabel: '₦7,350',
        discount: '30% off',
        badge: '30% OFF',
      },
      {
        key: 'yearly',
        label: 'Yearly',
        price: 1470000,
        priceLabel: '₦14,700',
        regular: 2940000,
        regularLabel: '₦29,400',
        discount: '50% off',
        badge: 'BEST VALUE',
      },
    ],
  },
  INTERNATIONAL: {
    key: 'INTERNATIONAL',
    currency: 'USD',
    label: 'International — US Dollar',
    tiers: [
      {
        key: 'monthly',
        label: 'Monthly',
        price: 499,
        priceLabel: '$4.99',
        regular: 799,
        regularLabel: '$7.99',
        discount: '38% off',
        badge: '38% OFF',
      },
      {
        key: 'threeMonths',
        label: '3 Months',
        price: 999,
        priceLabel: '$9.99',
        regular: 1497,
        regularLabel: '$14.97',
        discount: '33% off',
        badge: '33% OFF',
      },
      {
        key: 'yearly',
        label: 'Yearly',
        price: 2999,
        priceLabel: '$29.99',
        regular: 5988,
        regularLabel: '$59.88',
        discount: '50% off',
        badge: 'BEST VALUE',
      },
    ],
  },
}

export const PLAN_KEYS: PlanKey[] = ['monthly', 'threeMonths', 'yearly']

/** Days granted per tier — mirrors the webhook duration logic. */
export const PLAN_DAYS: Record<PlanKey, number> = {
  monthly: 30,
  threeMonths: 90,
  yearly: 365,
}

export const PLAN_LABEL: Record<PlanKey, string> = {
  monthly: 'Monthly',
  threeMonths: '3 Months',
  yearly: 'Yearly',
}

export function getRegionForCountry(countryCode?: string | null): RegionKey {
  return countryCode?.trim().toUpperCase() === 'NG' ? 'NG' : 'INTERNATIONAL'
}

/**
 * Resolve the pricing context for a server request. The country comes only
 * from trusted proxy headers (Vercel provides x-vercel-ip-country) — never
 * from cookies, query params or the browser.
 *
 * Fallback policy is conservative: when the location is unknown we default to
 * INTERNATIONAL (USD) so a lookup failure can never grant the cheaper NGN price.
 */
export function resolvePricingContext(input: {
  ipCountry?: string | null
  profileCountry?: string | null
}): {
  region: RegionKey
  regionLabel: string
  currency: Currency
  countrySource: CountrySource
  confidence: PricingConfidence
} {
  const ip = input.ipCountry?.trim().toUpperCase()
  const ipRegion = ip ? getRegionForCountry(ip) : null

  if (ipRegion === 'NG') {
    return {
      region: 'NG',
      regionLabel: PRICING.NG.label,
      currency: 'NGN',
      countrySource: 'ip',
      confidence: input.profileCountry === 'NG' ? 'high' : 'medium',
    }
  }

  if (ipRegion === 'INTERNATIONAL') {
    return {
      region: 'INTERNATIONAL',
      regionLabel: PRICING.INTERNATIONAL.label,
      currency: 'USD',
      countrySource: 'ip',
      confidence: 'medium',
    }
  }

  return {
    region: 'INTERNATIONAL',
    regionLabel: PRICING.INTERNATIONAL.label,
    currency: 'USD',
    countrySource: 'fallback',
    confidence: 'low',
  }
}

/** Full server-side price for a plan + region, in the authoritative subunits. */
export function resolveCheckoutPricing(input: {
  ipCountry?: string | null
  profileCountry?: string | null
  plan: PlanKey
}): {
  region: RegionKey
  regionLabel: string
  currency: Currency
  countrySource: CountrySource
  confidence: PricingConfidence
  amount: number
  amountMajor: number
  priceLabel: string
} {
  const ctx = resolvePricingContext(input)
  const tier = getTier(ctx.region, input.plan)
  return { ...ctx, amount: tier.price, amountMajor: tier.price / 100, priceLabel: tier.priceLabel }
}

export function getTier(region: RegionKey, tier: PlanKey): PriceTier {
  return PRICING[region].tiers.find((t) => t.key === tier) ?? PRICING[region].tiers[0]
}

export function formatCurrency(region: RegionKey, amountLabel: string): string {
  return amountLabel
}