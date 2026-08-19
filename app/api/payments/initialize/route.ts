import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import {
  PRICING,
  PLAN_KEYS,
  PLAN_DAYS,
  PLAN_LABEL,
  detectRegion,
  getTier,
} from '@/lib/pricing'
import type { PlanKey } from '@/lib/pricing'
import { getTrackById } from '@/lib/tracks'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const paystackKey = process.env.PAYSTACK_SECRET_KEY
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!paystackKey || !stripeKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const baseUrl = process.env.NEXTAUTH_URL || new URL(req.url).origin
    if (!baseUrl) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })

    let body: { plan?: string; trackId?: string }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    if (!body.plan || !(PLAN_KEYS as string[]).includes(body.plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }
    if (!body.trackId) {
      return NextResponse.json({ error: 'Missing track' }, { status: 400 })
    }

    const plan = body.plan as PlanKey
    const trackId = body.trackId
    const track = getTrackById(trackId)

    const region = detectRegion(req.headers)
    const regionCfg = PRICING[region]
    const tier = getTier(region, plan)
    const amount = tier.price

    if (regionCfg.provider === 'PAYSTACK') {
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
          callback_url: `${baseUrl}/account?purchased=true`,
          metadata: {
            userId: session.user.id,
            trackId,
            plan,
            provider: 'PAYSTACK',
          },
        }),
      })

      const data = await response.json()
      if (!data.status) {
        return NextResponse.json({ error: `Paystack: ${data.message}` }, { status: 400 })
      }
      const authUrl = data.data?.authorization_url
      if (!authUrl) {
        return NextResponse.json({ error: 'No authorization URL returned' }, { status: 502 })
      }
      return NextResponse.json({ authorizationUrl: authUrl, provider: 'PAYSTACK' })
    }

    // Stripe checkout session
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
      success_url: `${baseUrl}/account?purchased=true`,
      cancel_url: `${baseUrl}/purchase/${trackId}?cancelled=true`,
      'payment_method_types[0]': 'card',
    })

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await res.json()
    if (data.error) {
      return NextResponse.json({ error: `Stripe: ${data.error.message}` }, { status: 400 })
    }
    if (!data.url) {
      return NextResponse.json({ error: 'No Stripe checkout URL returned' }, { status: 502 })
    }
    return NextResponse.json({ authorizationUrl: data.url, provider: 'STRIPE' })
  } catch {
    return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 })
  }
}