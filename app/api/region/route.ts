import { NextResponse } from 'next/server'
import { REGION_COOKIE } from '@/lib/pricing'
import type { RegionKey } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: { region?: string } = {}
  try {
    body = await req.json()
  } catch {
    // empty body is fine
  }

  const region = body.region === 'ng' || body.region === 'intl' ? (body.region as RegionKey) : null
  if (!region) {
    return NextResponse.json({ error: 'Invalid region' }, { status: 400 })
  }

  const res = NextResponse.json({ ok: true, region })
  res.cookies.set(REGION_COOKIE, region, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  })
  return res
}