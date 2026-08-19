import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PRICING, PLAN_KEYS, PLAN_DAYS, getTier } from '@/lib/pricing'
import type { PlanKey } from '@/lib/pricing'
import { grantTrackAccess, getTrackAccess } from '@/lib/access'
import type { PaymentProvider, SubscriptionPlan } from '@prisma/client'

export const dynamic = 'force-dynamic'

function toPlanEnum(plan: PlanKey): SubscriptionPlan {
  return plan === 'yearly' ? 'YEARLY' : plan === 'threeMonths' ? 'THREE_MONTHS' : 'MONTHLY'
}

/**
 * Confirms a payment the browser just completed (via Paystack or Stripe
 * redirect callback) and grants per-course access idempotently. This is the
 * dev-friendly path that works without a reachable webhook, and also a
 * safety net in production.
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 })
  }

  let body: { reference?: string; sessionId?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // --- Paystack ---------------------------------------------------------
  if (body.reference) {
    const paystackKey = process.env.PAYSTACK_SECRET_KEY
    if (!paystackKey) {
      return NextResponse.json({ error: 'Purchases are temporarily unavailable.' }, { status: 500 })
    }

    let data: any
    try {
      const res = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(body.reference)}`,
        { headers: { Authorization: `Bearer ${paystackKey}` } }
      )
      data = await res.json()
    } catch {
      return NextResponse.json({ error: 'We could not verify your payment. Please try again.' }, { status: 502 })
    }

    if (!data.status || data.data?.status !== 'success') {
      return NextResponse.json({ error: 'Payment not confirmed yet.' }, { status: 400 })
    }

    const txn = data.data
    const metadata = txn.metadata ?? {}
    if (metadata.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    if (metadata.provider !== 'PAYSTACK' || !metadata.trackId) {
      return NextResponse.json({ error: 'Invalid payment details.' }, { status: 400 })
    }
    if (!(PLAN_KEYS as string[]).includes(metadata.plan)) {
      return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 })
    }

    const plan = metadata.plan as PlanKey
    const expectedAmount = [PRICING.ng, PRICING.intl]
      .some((r) => getTier(r.key, plan).price === Number(txn.amount))
    if (!expectedAmount || txn.currency !== 'NGN') {
      return NextResponse.json({ error: 'Payment amount mismatch.' }, { status: 400 })
    }

    const existing = await getTrackAccess(session.user.id, metadata.trackId)
    if (existing?.providerRef === body.reference) {
      return NextResponse.json({ ok: true, trackId: metadata.trackId })
    }

    await grantTrackAccess({
      userId: session.user.id,
      trackId: metadata.trackId,
      plan: toPlanEnum(plan),
      provider: 'PAYSTACK' as PaymentProvider,
      reference: body.reference,
      days: PLAN_DAYS[plan],
    })

    return NextResponse.json({ ok: true, trackId: metadata.trackId })
  }

  // --- Stripe -----------------------------------------------------------
  if (body.sessionId) {
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({ error: 'Purchases are temporarily unavailable.' }, { status: 500 })
    }

    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(body.sessionId)}`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    )

    if (!res.ok) {
      console.error('payments:confirm: Stripe session lookup failed', await res.text())
      return NextResponse.json({ error: 'We could not verify your payment.' }, { status: 502 })
    }

    const sessionData = await res.json()
    if (sessionData.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not confirmed yet.' }, { status: 400 })
    }

    const userId = sessionData.client_reference_id || sessionData.metadata?.userId
    const metadata = sessionData.metadata ?? {}
    if (userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    if (metadata.provider !== 'STRIPE' || !metadata.trackId) {
      return NextResponse.json({ error: 'Invalid payment details.' }, { status: 400 })
    }
    if (!(PLAN_KEYS as string[]).includes(metadata.plan)) {
      return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 })
    }

    const plan = metadata.plan as PlanKey
    const expectedAmount = getTier('intl', plan).price
    if (Number(sessionData.amount_total) !== expectedAmount || sessionData.currency !== 'usd') {
      return NextResponse.json({ error: 'Payment amount mismatch.' }, { status: 400 })
    }

    const existing = await getTrackAccess(session.user.id, metadata.trackId)
    if (existing?.providerRef === body.sessionId) {
      return NextResponse.json({ ok: true, trackId: metadata.trackId })
    }

    await grantTrackAccess({
      userId: session.user.id,
      trackId: metadata.trackId,
      plan: toPlanEnum(plan),
      provider: 'STRIPE' as PaymentProvider,
      reference: body.sessionId,
      days: PLAN_DAYS[plan],
    })

    return NextResponse.json({ ok: true, trackId: metadata.trackId })
  }

  return NextResponse.json({ error: 'Missing payment reference.' }, { status: 400 })
}