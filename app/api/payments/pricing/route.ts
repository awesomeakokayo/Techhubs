import { NextResponse } from 'next/server'
import { PRICING, PLAN_KEYS, resolvePricingContext } from '@/lib/pricing'
import type { PlanKey } from '@/lib/pricing'
import { getIpCountryFromHeaders } from '@/lib/payments'

export const dynamic = 'force-dynamic'

/**
 * Server-resolved pricing for the current visitor. Returns only presentation
 * values (currency, amounts). Internal signals (source IP, confidence) are
 * never exposed. Not cached because it is region-personalized.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const plan = url.searchParams.get('plan')
  const planKey: PlanKey = plan && (PLAN_KEYS as string[]).includes(plan) ? (plan as PlanKey) : 'monthly'

  const ctx = resolvePricingContext({ ipCountry: getIpCountryFromHeaders(req.headers) })
  const region = PRICING[ctx.region]

  const res = NextResponse.json({
    region: ctx.region,
    regionLabel: ctx.regionLabel,
    currency: region.currency,
    plan: planKey,
    tiers: region.tiers,
    baseline: getTierFor(region.key, planKey),
  })
  res.headers.set('Cache-Control', 'no-store, private, max-age=0')
  return res
}

function getTierFor(regionKey: 'NG' | 'INTERNATIONAL', plan: PlanKey) {
  return PRICING[regionKey].tiers.find((t) => t.key === plan) ?? PRICING[regionKey].tiers[0]
}