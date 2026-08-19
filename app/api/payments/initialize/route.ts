import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@/auth'
import {
  PRICING,
  PLAN_KEYS,
  PLAN_LABEL,
  detectRegion,
  getTier,
} from '@/lib/pricing'
import type { PlanKey } from '@/lib/pricing'
import { getTrackById } from '@/lib/tracks'

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

  if (!body.plan || !(PLAN_KEYS as string[]).includes(body.plan)) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 })
  }
  if (!body.trackId) {
    return NextResponse.json({ error: 'Missing course.' }, { status: 400 })
  }

  const plan = body.plan as PlanKey
  const trackId = body.trackId
  const track = getTrackById(trackId)

  const region = detectRegion(req.headers)
  const regionCfg = PRICING[region]
  const tier = getTier(region, plan)
  const amount = tier.price

  if (regionCfg.provider === 'PAYSTACK') {
    const paystackKey = process.env.PAYSTACK_SECRET_KEY
    if (!paystackKey) {
      console.error('payments:initialize: PAYSTACK_SECRET_KEY is not set')
      return NextResponse.json(
        { error: 'Purchases are temporarily unavailable.' },
        { status: 500 }
      )
    }

    const reference = `tsh_${session.user.id.slice(0, 8)}_${crypto.randomUUID()}`

    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${paystackKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          amount: String(amount),
          currency: 'NGN',
          reference,
          callback_url: `${baseUrl}/account?purchased=true&reference=${reference}`,
          metadata: {
            userId: session.user.id,
            trackId,
            plan,
            provider: 'PAYSTACK',
          },
        }),
      })

      const data = await response.json()
      const authUrl = data?.data?.authorization_url
      if (!data.status || !authUrl) {
        console.error('payments:initialize: Paystack error', data)
        return NextResponse.json(
          { error: 'We could not start your payment. Please try again.' },
          { status: 502 }
        )
      }
      return NextResponse.json({ authorizationUrl: authUrl, provider: 'PAYSTACK' })
    } catch (err) {
      console.error('payments:initialize: Paystack request failed', err)
      return NextResponse.json(
        { error: 'We could not reach the payment provider. Please try again.' },
        { status: 502 }
      )
    }
  }

  // Stripe checkout session
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    console.error('payments:initialize: STRIPE_SECRET_KEY is not set')
    return NextResponse.json(
      { error: 'Purchases are temporarily unavailable.' },
      { status: 500 }
    )
  }

  const productName = track ? `${track.name} — ${PLAN_LABEL[plan]}` : `${trackId} — ${PLAN_LABEL[plan]}`
  const params = new URLSearchParams({
    mode: 'payment',
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': 'usd',
    'line_items[0][price_data][unit_amount]': String(amount),
    'line_items[0][price_data][product_data][name]': productName,
    customer_email: session.user.email,
    client_reference_id: session.user.id,
    'metadata[userId]': session.user.id,
    'metadata[trackId]': trackId,
    'metadata[plan]': plan,
    'metadata[provider]': 'STRIPE',
    success_url: `${baseUrl}/account?purchased=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/purchase/${trackId}?cancelled=true`,
    'payment_method_types[0]': 'card',
  })

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await res.json()
    if (!data.url || data.error) {
      console.error('payments:initialize: Stripe error', data)
      return NextResponse.json(
        { error: 'We could not start your payment. Please try again.' },
        { status: 502 }
      )
    }
    return NextResponse.json({ authorizationUrl: data.url, provider: 'STRIPE' })
  } catch (err) {
    console.error('payments:initialize: Stripe request failed', err)
    return NextResponse.json(
      { error: 'We could not reach the payment provider. Please try again.' },
      { status: 502 }
    )
  }
}