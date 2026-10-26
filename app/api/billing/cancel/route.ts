import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { LEMONSQUEEZY_API_BASE } from '@/lib/commercial/lemonsqueezy'
import { recordEntitlementEvent } from '@/lib/commercial/service'
import { paymentLog, paymentLogError } from '@/lib/payment-log'

export const dynamic = 'force-dynamic'

/**
 * Cancel the learner's recurring subscription at the provider, then reflect the
 * change locally. Cancellation keeps access until the paid period ends
 * (cancelAtPeriodEnd), matching the configured policy.
 */
export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({ where: { userId: session.user.id } })
  if (!subscription || (subscription.status !== 'ACTIVE' && subscription.status !== 'PAST_DUE')) {
    return NextResponse.json({ error: 'No active subscription to cancel' }, { status: 400 })
  }

  const provider = subscription.provider ?? (subscription.paystackSubscriptionCode ? 'PAYSTACK' : null)

  if (provider === 'LEMON_SQUEEZY') {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY
    const subscriptionId = subscription.providerSubscriptionId
    if (!apiKey || !subscriptionId) {
      return NextResponse.json({ error: 'Cancellation is not available for this subscription yet.' }, { status: 503 })
    }
    const response = await fetch(`${LEMONSQUEEZY_API_BASE}/subscriptions/${encodeURIComponent(subscriptionId)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/vnd.api+json' },
    })
    if (!response.ok && response.status !== 404) {
      paymentLogError('payment_error', 'lemonsqueezy cancel failed', { userId: session.user.id, httpStatus: response.status })
      return NextResponse.json({ error: 'We could not cancel your subscription. Please try again.' }, { status: 502 })
    }
  } else if (provider === 'PAYSTACK' && (subscription.providerSubscriptionId || subscription.paystackSubscriptionCode)) {
    const secretKey = process.env.PAYSTACK_SECRET_KEY
    const paystackSubscriptionCode = subscription.providerSubscriptionId ?? subscription.paystackSubscriptionCode
    if (!secretKey || !paystackSubscriptionCode) {
      return NextResponse.json({ error: 'Cancellation is not available for this subscription yet.' }, { status: 503 })
    }
    const subRes = await fetch(`https://api.paystack.co/subscription/${encodeURIComponent(paystackSubscriptionCode)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
      cache: 'no-store',
    })
    const subData = await subRes.json().catch(() => null)
    const emailToken = subData?.data?.email_token
    if (!subRes.ok || !emailToken) {
      paymentLogError('payment_error', 'paystack cancel token lookup failed', { userId: session.user.id, httpStatus: subRes.status })
      return NextResponse.json({ error: 'Could not retrieve cancellation token from the provider.' }, { status: 502 })
    }
    const disable = await fetch(`https://api.paystack.co/subscription/${encodeURIComponent(paystackSubscriptionCode)}/manage/disable`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: paystackSubscriptionCode, token: emailToken }),
    })
    const disableData = await disable.json()
    if (!disableData?.status) {
      return NextResponse.json({ error: 'We could not cancel your subscription. Please try again.' }, { status: 502 })
    }
  } else {
    return NextResponse.json({ error: 'Cancellation is not available for this subscription yet.' }, { status: 503 })
  }

  await prisma.subscription.update({
    where: { userId: session.user.id },
    data: { status: 'CANCELLED', cancelAtPeriodEnd: true },
  })
  await recordEntitlementEvent(prisma, {
    userId: session.user.id,
    provider: provider === 'LEMON_SQUEEZY' ? 'lemonsqueezy' : 'paystack',
    type: 'subscription_cancelled',
    source: 'user',
    metadata: { initiatedBy: 'user' },
  })
  paymentLog('payment_verified', { userId: session.user.id, event: 'subscription_cancelled_by_user' })

  return NextResponse.json({ status: 'CANCELLED', cancelAtPeriodEnd: true })
}
