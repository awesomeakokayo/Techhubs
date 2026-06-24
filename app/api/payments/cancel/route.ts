import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  if (!subscription || subscription.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'No active subscription to cancel' }, { status: 400 })
  }

  if (subscription.paystackSubscriptionCode) {
    const secretKey = process.env.PAYSTACK_SECRET_KEY!

    // Fetch current subscription details from Paystack to get the email_token
    const subRes = await fetch(
      `https://api.paystack.co/subscription/${subscription.paystackSubscriptionCode}`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    )
    const subData = await subRes.json()
    const emailToken = subData?.data?.email_token

    if (!emailToken) {
      return NextResponse.json({ error: 'Could not retrieve email token for cancellation' }, { status: 400 })
    }

    const response = await fetch(
      `https://api.paystack.co/subscription/${subscription.paystackSubscriptionCode}/manage/disable`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: subscription.paystackSubscriptionCode, token: emailToken }),
      }
    )

    const data = await response.json()
    if (!data.status) {
      return NextResponse.json({ error: `Paystack: ${data.message}` }, { status: 400 })
    }
  }

  await prisma.subscription.update({
    where: { userId: session.user.id },
    data: { status: 'CANCELLED' },
  })

  return NextResponse.json({ status: 'CANCELLED' })
}
