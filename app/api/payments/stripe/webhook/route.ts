import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { grantTrackAccess } from '@/lib/access'
import { PLAN_DAYS, PLAN_KEYS } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

async function handleCheckoutCompleted(data: any) {
  const ref = data.id
  const userId = data.metadata?.userId
  const trackId = data.metadata?.trackId
  const plan = data.metadata?.plan as string | undefined

  const paid =
    data.payment_status === 'paid' ||
    (data.payment_status === 'no_payment_required' && !!data.amount_total)

  if (!userId || !trackId || !ref || !paid) {
    return { handled: false, reason: 'missing-or-unpaid' }
  }
  if (!(PLAN_KEYS as string[]).includes(plan ?? '')) {
    return { handled: false, reason: 'invalid-plan' }
  }

  const existing = await prisma.trackAccess.findUnique({ where: { providerRef: ref } })
  if (existing) return { handled: true, reason: 'duplicate' }

  const asPlan = plan === 'yearly' ? 'YEARLY' : plan === 'threeMonths' ? 'THREE_MONTHS' : 'MONTHLY' as const
  const days = PLAN_DAYS[plan as keyof typeof PLAN_DAYS]

  await grantTrackAccess({
    userId,
    trackId,
    plan: asPlan,
    provider: 'STRIPE',
    reference: ref,
    days,
  })

  return { handled: true, reason: 'granted' }
}

export async function POST(req: Request) {
  const body = await req.text()
  const header = req.headers.get('stripe-signature') ?? ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

  const t = header.split(',').find((p) => p.startsWith('t='))
  const s = header.split(',').find((p) => p.startsWith('v1='))
  if (!t || !s) return NextResponse.json({ error: 'Malformed signature' }, { status: 400 })

  const timestamp = t.slice(2)
  const signature = s.slice(3)
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${body}`)
    .digest('hex')

  if (!timingSafeEqual(expected, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(Number(timestamp)) || age > 300) {
    return NextResponse.json({ error: 'Stale signature' }, { status: 400 })
  }

  let event: any
  try { event = JSON.parse(body) }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data?.object)
      break
    case 'charge.refunded':
      break
    default:
      break
  }

  return NextResponse.json({ received: true })
}