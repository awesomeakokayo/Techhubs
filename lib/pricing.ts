export type PlanKey = 'monthly' | 'threeMonths' | 'yearly'
export type RegionKey = 'ng' | 'intl'
export type ProviderKey = 'PAYSTACK' | 'STRIPE'

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
  currency: 'NGN' | 'USD'
  provider: ProviderKey
  label: string
  tiers: PriceTier[]
}

export const REGION_COOKIE = 'tsh-region'

/** Countries that use Paystack + NGN. Nigeria only (confirmed). */
export const PAYSTACK_COUNTRY_CODES = new Set(['NG'])

/**
 * Pricing is applied per course. The NGN base monthly price (₦2,450) defines
 * the tier multipliers: 3-month = 2.1×, yearly = 6×.
 * USD base monthly is $4.99; 3-month rounded to $9.99; yearly rounded to $29.99.
 */
export const PRICING: Record<RegionKey, PricingRegion> = {
  ng: {
    key: 'ng',
    currency: 'NGN',
    provider: 'PAYSTACK',
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
  intl: {
    key: 'intl',
    currency: 'USD',
    provider: 'STRIPE',
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

export function isPaystackCountry(countryCode?: string | null): boolean {
  return !!countryCode && PAYSTACK_COUNTRY_CODES.has(countryCode.trim().toUpperCase())
}

export function getRegionForCountry(countryCode?: string | null): RegionKey {
  if (isPaystackCountry(countryCode)) return 'ng'
  return 'intl'
}

export function readRegionCookie(cookieHeader?: string | null): RegionKey | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${REGION_COOKIE}=(ng|intl)`)
  )
  return match ? (match[1] as RegionKey) : null
}

/** Client-side region read (cookie only). Falls back to the default. */
export function detectRegionClient(): RegionKey {
  if (typeof document === 'undefined') return 'ng'
  return readRegionCookie(document.cookie) ?? 'ng'
}

/**
 * Region for a server request: manual override cookie wins, then the
 * Vercel-provided country header, then a default of NGN/Paystack (home market).
 */
export function detectRegion(
  headers: Headers | Record<string, string | null | undefined>
): RegionKey {
  const get = (name: string) =>
    typeof headers.get === 'function' ? headers.get(name) : headers[name as never] ?? null

  const cookie = readRegionCookie(get('cookie'))
  if (cookie) return cookie

  const country = get('x-vercel-ip-country')
  if (country) return getRegionForCountry(country)

  return 'ng'
}

export function getTier(region: RegionKey, tier: PlanKey): PriceTier {
  return PRICING[region].tiers.find((t) => t.key === tier) ?? PRICING[region].tiers[0]
}

export function formatCurrency(region: RegionKey, amountLabel: string): string {
  return amountLabel
}