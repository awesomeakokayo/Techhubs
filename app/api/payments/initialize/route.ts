import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import {
  PLAN_KEYS,
  PLAN_LABEL,
  PAYMENT_PROVIDER,
  PRICING_VERSION,
  resolveCheckoutPricing,
} from '@/lib/pricing'
import type { PlanKey } from '@/lib/pricing'
import { planKeyToEnum, getIpCountryFromHeaders, friendlyPaystackInitError } from '@/lib/payments'
import { paymentLog, paymentLogError } from '@/lib/payment-log'
import { trackEvent } from '@/lib/analytics'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const baseUrl = new URL(req.url).origin

  const session = await auth()
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 })
  }

  let body: { plan?: string; trackId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Only plan + trackId are accepted from the client. Currency and amount are
  // always derived server-side; anything else is ignored.
  if (!body.plan || !(PLAN_KEYS as string[]).includes(body.plan)) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 })
  }
  if (!body.trackId) {
    return NextResponse.json({ error: 'Missing course.' }, { status: 400 })
  }

  const plan = body.plan as PlanKey
  const trackId = body.trackId

  const ipCountry = getIpCountryFromHeaders(req.headers)
  const price = resolveCheckoutPricing({ ipCountry, plan })

  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    paymentLogError('checkout_initialized', 'PAYSTACK_SECRET_KEY not set', { userId: session.user.id })
    return NextResponse.json(
      { error: 'Purchases are temporarily unavailable.' },
      { status: 500 }
    )
  }

  const reference = `TSH_${session.user.id.slice(0, 8)}_${crypto.randomUUID()}`

  let order
  try {
    order = await prisma.paymentOrder.create({
      data: {
        userId: session.user.id,
        trackId,
        plan: planKeyToEnum(plan),
        region: price.region === 'NG' ? 'NIGERIA' : 'INTERNATIONAL',
        currency: price.currency,
        amount: price.amount,
        amountMajor: price.amountMajor,
        pricingVersion: PRICING_VERSION,
        status: 'PENDING',
        reference,
        ipCountry: ipCountry ?? undefined,
      },
    })
  } catch (err) {
    paymentLogError('checkout_initialized', 'order create failed', {
      userId: session.user.id,
      trackId,
      error: err instanceof Error ? err.message : 'unknown',
    })
    return NextResponse.json({ error: 'We could not start your payment. Please try again.' }, { status: 500 })
  }

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        amount: String(price.amount),
        currency: price.currency,
        reference,
        callback_url: `${baseUrl}/account?purchased=true&reference=${reference}`,
        metadata: {
          plan: planKeyToEnum(plan),
          internal_order_id: order.id,
          user_id: session.user.id,
          track_id: trackId,
          pricing_region: price.region,
          pricing_currency: price.currency,
          pricing_version: PRICING_VERSION,
          provider: PAYMENT_PROVIDER,
        },
      }),
    })

    const data = await response.json()
    const authUrl = data?.data?.authorization_url
    if (!data.status || !authUrl) {
      await prisma.paymentOrder.update({
        where: { id: order.id },
        data: { status: 'FAILED' },
      })
      paymentLogError('checkout_initialized', 'Paystack initialize error', {
        reference,
        orderId: order.id,
        userId: session.user.id,
        currency: price.currency,
        region: price.region,
        httpStatus: response.status,
        paystackMessage: data?.message ?? 'no_authorization_url',
      })
      return NextResponse.json(
        { error: friendlyPaystackInitError({ message: data?.message, status: data?.status }) },
        { status: 502 }
      )
    }

    paymentLog('payment_redirected', {
      reference,
      orderId: order.id,
      userId: session.user.id,
      trackId,
      plan,
      currency: price.currency,
      amount: price.amount,
      region: price.region,
    })

    trackEvent({
      event_name: 'payment_initialized',
      path: `/purchase/${trackId}`,
    })

    return NextResponse.json({
      authorizationUrl: authUrl,
      provider: PAYMENT_PROVIDER,
      currency: price.currency,
      amountMajor: price.amountMajor,
      priceLabel: price.priceLabel,
      planLabel: PLAN_LABEL[plan],
    })
  } catch (err) {
    await prisma.paymentOrder
      .update({ where: { id: order.id }, data: { status: 'FAILED' } })
      .catch(() => {})
    paymentLogError('checkout_initialized', 'Paystack request failed', {
      reference,
      orderId: order.id,
      userId: session.user.id,
      error: err instanceof Error ? err.message : 'network_error',
    })
    return NextResponse.json(
      { error: 'We could not reach the payment provider. Please try again.' },
      { status: 502 }
    )
  }
}