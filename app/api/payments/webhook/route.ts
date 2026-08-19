import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { grantTrackAccess } from '@/lib/access'
import { PLAN_DAYS } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

/** Grant a per-course purchase from Paystack metadata (idempotent by reference). */
async function handleChargeSuccess(data: any) {
  const metadata = data?.metadata ?? {}
  const reference = data.reference
  const trackId = metadata.trackId

  const userId = metadata.userId ?? null
  if (!userId || !trackId || !reference) {
    return { handled: false, reason: 'missing-link' }
  }

  const plan = metadata.plan === 'yearly' ? 'YEARLY' : metadata.plan === 'threeMonths' ? 'THREE_MONTHS' : 'MONTHLY' as const

  const existing = await prisma.trackAccess.findUnique({ where: { providerRef: reference } })
  if (existing) return { handled: true, reason: 'duplicate' }

  const days = PLAN_DAYS[plan as keyof typeof PLAN_DAYS]
  await grantTrackAccess({ userId, trackId, plan, provider: 'PAYSTACK', reference, days })
  return { handled: true, reason: 'granted' }
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try { event = JSON.parse(body) }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  switch (event.event) {
    case 'charge.success': {
      const data = event.data
      const metadata = data?.metadata ?? {}

      // Per-course purchase path
      if (metadata.trackId) {
        await handleChargeSuccess(data)
        break
      }

      // Legacy site-wide subscription path (grandfathered flows)
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