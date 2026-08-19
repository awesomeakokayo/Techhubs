import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { fulfillOrder } from '@/lib/payments'
import { paymentLog, paymentLogError } from '@/lib/payment-log'
import { trackEvent } from '@/lib/analytics'

export const dynamic = 'force-dynamic'

/**
 * Browser callback after a Paystack redirect. The reference must match a
 * PENDING order created by this user; fulfillment is server-verified against
 * Paystack and idempotent (webhook + confirm racing safely collapse).
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 })
  }

  let body: { reference?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const reference = body.reference
  if (!reference) {
    return NextResponse.json({ error: 'Missing payment reference.' }, { status: 400 })
  }

  const order = await prisma.paymentOrder.findUnique({ where: { reference } })
  if (!order || order.userId !== session.user.id) {
    paymentLogError('payment_rejected', 'reference does not belong to user', {
      reference,
      userId: session.user.id,
    })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const result = await fulfillOrder(reference)

  paymentLog('payment_verified', {
    reference,
    orderId: order.id,
    userId: session.user.id,
    result: result.status,
  })

  switch (result.status) {
    case 'fulfilled':
    case 'already_fulfilled':
      trackEvent({ event_name: 'payment_success', path: '/account' })
      return NextResponse.json({ ok: true, trackId: result.trackId })
    case 'not_found':
    case 'verification_failed':
      trackEvent({ event_name: 'payment_failed', path: '/account' })
      return NextResponse.json(
        { ok: false, status: 'verification_failed', error: 'We could not confirm your payment yet.' },
        { status: 502 }
      )
    case 'mismatch':
      trackEvent({ event_name: 'payment_rejected', path: '/account' })
      return NextResponse.json(
        { ok: false, status: 'mismatch', error: 'Payment details did not match. Please contact support.' },
        { status: 400 }
      )
    case 'unpaid':
      trackEvent({ event_name: 'payment_abandoned', path: '/account' })
      return NextResponse.json(
        { ok: false, status: result.txnStatus, error: 'Payment not confirmed yet.' },
        { status: 400 }
      )
  }
}