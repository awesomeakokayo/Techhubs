import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

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

  const event = JSON.parse(body)

  switch (event.event) {
    case 'charge.success': {
      const { metadata, customer, plan } = event.data
      let userId = metadata?.userId

      if (!userId) {
        const existing = await prisma.subscription.findFirst({
          where: { paystackCustomerCode: customer.customer_code },
        })
        userId = existing?.userId
      }

      if (!userId) break

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          status: 'ACTIVE',
          plan: metadata?.plan === 'yearly' ? 'YEARLY' : 'MONTHLY',
          paystackCustomerCode: customer.customer_code,
          paystackPlanCode: plan?.plan_code,
          currentPeriodEnd: new Date(
            Date.now() + (metadata?.plan === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000
          ),
        },
        create: {
          userId,
          status: 'ACTIVE',
          plan: metadata?.plan === 'yearly' ? 'YEARLY' : 'MONTHLY',
          paystackCustomerCode: customer.customer_code,
          paystackPlanCode: plan?.plan_code,
          currentPeriodEnd: new Date(
            Date.now() + (metadata?.plan === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000
          ),
        },
      })
      break
    }

    case 'subscription.create': {
      const { subscription_code, customer } = event.data
      await prisma.subscription.updateMany({
        where: { paystackCustomerCode: customer.customer_code },
        data: { paystackSubscriptionCode: subscription_code, status: 'ACTIVE' },
      })
      break
    }

    case 'invoice.payment_failed': {
      const { customer } = event.data
      await prisma.subscription.updateMany({
        where: { paystackCustomerCode: customer.customer_code },
        data: { status: 'PAST_DUE' },
      })
      break
    }

    case 'subscription.disable': {
      const { customer } = event.data
      await prisma.subscription.updateMany({
        where: { paystackCustomerCode: customer.customer_code },
        data: { status: 'CANCELLED' },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
