import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/** The old pricing API is retired; current plan availability is served by the guarded Pricing flow. */
export async function GET() {
  return NextResponse.json(
    { error: 'This legacy pricing endpoint has been retired. Visit the Pricing page for current plan availability.' },
    { status: 410, headers: { 'Cache-Control': 'no-store, private, max-age=0' } },
  )
}
