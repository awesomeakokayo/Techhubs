import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Retired legacy subscription checkout. Current commerce uses
 * POST /api/billing/checkout, which enforces launch-readiness and pricing flags.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'This legacy checkout endpoint has been retired. Use the Pricing page for current plan availability.' },
    { status: 410, headers: { 'Cache-Control': 'no-store, max-age=0' } },
  )
}
