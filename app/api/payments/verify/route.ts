import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { SubscriptionStatus } from '@prisma/client'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  if (!subscription || !subscription.paystackSubscriptionCode) {
    return NextResponse.json({
      status: subscription?.status || 'NONE',
      plan: subscription?.plan || null,
      currentPeriodEnd: subscription?.currentPeriodEnd?.toISOString() ?? null,
    })
  }

  const response = await fetch(
    `https://api.paystack.co/subscription/${subscription.paystackSubscriptionCode}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  )

  const data = await response.json()

  if (data.status && data.data) {
    const paystackStatus = data.data.status
    const statusMap: Record<string, SubscriptionStatus> = {
      active: 'ACTIVE',
      cancelled: 'CANCELLED',
      paused: 'PAST_DUE',
      expired: 'EXPIRED',
    }
    const newStatus: SubscriptionStatus = statusMap[paystackStatus] || 'NONE'

    await prisma.subscription.update({
      where: { userId: session.user.id },
      data: {
        status: newStatus,
        currentPeriodEnd: data.data.next_payment_date
          ? new Date(data.data.next_payment_date)
          : undefined,
      },
    })

    return NextResponse.json({
      status: newStatus,
      plan: subscription.plan,
      currentPeriodEnd: data.data.next_payment_date ?? null,
    })
  }

  return NextResponse.json({
    status: subscription.status,
    plan: subscription.plan,
    currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
  })
}
