import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackEntitlements } from '@/lib/access'
import type { SubscriptionStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  // Keep the legacy Paystack subscription-status sync for grandfathered subscribers.
  if (subscription?.paystackSubscriptionCode) {
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
      const statusMap: Record<string, SubscriptionStatus> = {
        active: 'ACTIVE',
        non_renewing: 'ACTIVE',
        complete: 'ACTIVE',
        cancelled: 'CANCELLED',
        paused: 'PAST_DUE',
        expired: 'EXPIRED',
        incomplete: 'PAST_DUE',
        processing: 'PAST_DUE',
      }
      const newStatus: SubscriptionStatus = statusMap[data.data.status] ?? subscription.status as SubscriptionStatus

      await prisma.subscription.update({
        where: { userId: session.user.id },
        data: {
          status: newStatus,
          currentPeriodEnd: data.data.next_payment_date
            ? new Date(data.data.next_payment_date)
            : undefined,
        },
      })
    }
  }

  const refreshed = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })
  const entitlements = await getTrackEntitlements(session.user.id)

  return NextResponse.json({
    subscription: refreshed
      ? {
          status: refreshed.status,
          plan: refreshed.plan,
          currentPeriodEnd: refreshed.currentPeriodEnd?.toISOString() ?? null,
          paystackSubscriptionCode: refreshed.paystackSubscriptionCode,
        }
      : null,
    entitlements: entitlements.owned.map((o) => ({
      trackId: o.trackId,
      status: o.status,
      expiresAt: o.expiresAt?.toISOString() ?? null,
      source: o.source,
      provider: o.provider,
      plan: o.plan,
    })),
    grandfathered: entitlements.grandfathered,
  })
}