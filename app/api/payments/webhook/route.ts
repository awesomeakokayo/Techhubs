import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { fulfillOrder } from '@/lib/payments'
import { paymentLog, paymentLogError } from '@/lib/payment-log'

export const dynamic = 'force-dynamic'

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    paymentLogError('payment_webhook_received', 'PAYSTACK_SECRET_KEY not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const hash = crypto.createHmac('sha512', secretKey).update(body, 'utf8').digest('hex')
  if (!signature || !timingSafeEqual(hash, signature)) {
    paymentLogError('payment_webhook_received', 'invalid signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  paymentLog('payment_webhook_received', { event: event.event })

  switch (event.event) {
    case 'charge.success': {
      const data = event.data
      const metadata = data?.metadata ?? {}
      const reference = data?.reference

      // Per-course purchase: reference-based fulfillment, idempotent and replay-safe.
      // Unknown/legacy references resolve to no order and are safely rejected.
      if (reference && metadata?.track_id) {
        await fulfillOrder(reference)
        break
      }

      // Legacy site-wide subscription path (grandfathered flows).
      const { customer, plan } = data
      let userId = metadata?.userId

      if (!userId) {
        const existing = await prisma.subscription.findFirst({
          where: { paystackCustomerCode: customer.customer_code },
        })
        userId = existing?.userId
      }

      if (!userId) break

      const periodDays = metadata?.plan === 'yearly' ? 365 : metadata?.plan === 'threeMonths' ? 90 : 30
      const planEnum = metadata?.plan === 'yearly' ? 'YEARLY' as const : metadata?.plan === 'threeMonths' ? 'THREE_MONTHS' as const : 'MONTHLY' as const
      const base = new Date(Date.now())
      const existingSub = await prisma.subscription.findUnique({ where: { userId } })

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          status: 'ACTIVE',
          plan: planEnum,
          paystackCustomerCode: customer.customer_code,
          paystackPlanCode: plan?.plan_code,
          currentPeriodEnd: existingSub?.currentPeriodEnd && existingSub.currentPeriodEnd > base
            ? new Date(existingSub.currentPeriodEnd.getTime() + periodDays * 24 * 60 * 60 * 1000)
            : new Date(base.getTime() + periodDays * 24 * 60 * 60 * 1000),
        },
        create: {
          userId,
          status: 'ACTIVE',
          plan: planEnum,
          paystackCustomerCode: customer.customer_code,
          paystackPlanCode: plan?.plan_code,
          currentPeriodEnd: new Date(base.getTime() + periodDays * 24 * 60 * 60 * 1000),
        },
      })
      break
    }

    case 'subscription.create': {
      const { subscription_code, customer } = event.data
      if (!customer?.customer_code) break
      await prisma.subscription.updateMany({
        where: { paystackCustomerCode: customer.customer_code },
        data: { paystackSubscriptionCode: subscription_code, status: 'ACTIVE' },
      })
      break
    }

    case 'invoice.payment_failed': {
      const { customer } = event.data
      if (!customer?.customer_code) break
      await prisma.subscription.updateMany({
        where: { paystackCustomerCode: customer.customer_code },
        data: { status: 'PAST_DUE' },
      })
      break
    }

    case 'subscription.disable': {
      const { customer } = event.data
      if (!customer?.customer_code) break
      await prisma.subscription.updateMany({
        where: { paystackCustomerCode: customer.customer_code },
        data: { status: 'CANCELLED' },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}