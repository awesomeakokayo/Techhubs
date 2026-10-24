import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { getPlan, isPlanId, isPremiumTrack } from '@/lib/commercial/plans'
import { COMMERCIAL_PRICING_VERSION, resolveProviderPrice } from '@/lib/commercial/pricing'
import {
  checkoutEnabled,
  providerProductId,
  providerTestMode,
  selectProvider,
  type ProviderId,
} from '@/lib/commercial/providers'
import { createPendingOrder, getActiveTrackPass } from '@/lib/commercial/service'
import { launchReadiness } from '@/lib/commercial/launch'
import { createLemonSqueezyCheckout } from '@/lib/commercial/lemonsqueezy'
import { paymentLog, paymentLogError } from '@/lib/payment-log'

export const dynamic = 'force-dynamic'

/**
 * Create a checkout session on the server.
 *
 * Disabled by default (`COMMERCE_CHECKOUT_ENABLED`). Prices, eligible plans and
 * track ids all come from trusted server configuration — never from the client.
 * A pending internal order is written before redirect. Checkout never grants
 * access; only a verified webhook (or server-side provider verification) does.
 */
export async function POST(req: Request) {
  if (!checkoutEnabled()) {
    return NextResponse.json({ error: 'Checkout is not available yet.' }, { status: 503 })
  }

  // Fail-closed launch guard: even if checkout was switched on by mistake, refuse
  // to create a paid session until the paid model (enforcement + limits + premium
  // tracks + approved prices + configured provider) is actually complete.
  const guard = launchReadiness(process.env)
  if (!guard.ready) {
    paymentLogError('checkout_initialized', 'launch guard blocked checkout', { blockers: guard.blockers })
    return NextResponse.json({ error: 'Checkout is not available yet.' }, { status: 503 })
  }

  const session = await auth()
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'Please sign in to continue.' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const planId = body?.planId
  if (!isPlanId(planId)) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 })
  }
  const plan = getPlan(planId)!

  let trackId: string | null = null
  if (plan.kind === 'ONE_TIME') {
    const requested = typeof body?.trackId === 'string' ? body.trackId : ''
    if (!getTrackById(requested)) {
      return NextResponse.json({ error: 'Choose a valid track for your Track Pass.' }, { status: 400 })
    }
    if (!isPremiumTrack(requested)) {
      return NextResponse.json({ error: 'This track is already included in the free plan.' }, { status: 400 })
    }
    // Prevent accidental duplicate purchases while a pass for this track is
    // still active: show the current status/expiry instead of charging again.
    const activePass = await getActiveTrackPass(prisma, session.user.id, requested)
    if (activePass) {
      return NextResponse.json(
        {
          error: 'You already have an active Track Pass for this track.',
          trackId: requested,
          expiresAt: activePass.expiresAt.toISOString(),
        },
        { status: 409 },
      )
    }
    trackId = requested
  }

  const preferred = body?.provider === 'paystack' || body?.provider === 'lemonsqueezy' ? (body.provider as ProviderId) : null
  const provider = selectProvider(planId, preferred)
  if (!provider) {
    return NextResponse.json({ error: 'No payment method is currently available.' }, { status: 503 })
  }

  const price = resolveProviderPrice(provider, planId)
  if (!price) {
    return NextResponse.json({ error: 'This plan is not available at the moment.' }, { status: 503 })
  }

  const reference = `TSH_${session.user.id.slice(0, 8)}_${crypto.randomUUID()}`
  const baseUrl = new URL(req.url).origin

  try {
    await createPendingOrder(prisma, {
      userId: session.user.id,
      planId,
      provider,
      trackId,
      currency: price.currency,
      amountMinor: price.amountMinor,
      reference,
      pricingVersion: COMMERCIAL_PRICING_VERSION,
    })
  } catch (error) {
    paymentLogError('checkout_initialized', 'order create failed', {
      userId: session.user.id,
      planId,
      error: error instanceof Error ? error.message : 'unknown',
    })
    return NextResponse.json({ error: 'We could not start your payment. Please try again.' }, { status: 500 })
  }

  if (provider === 'lemonsqueezy') {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY
    const storeId = process.env.LEMONSQUEEZY_STORE_ID
    const variantId = providerProductId('lemonsqueezy', planId)
    if (!apiKey || !storeId || !variantId) {
      return NextResponse.json({ error: 'This plan is not available at the moment.' }, { status: 503 })
    }
    const result = await createLemonSqueezyCheckout({
      apiKey,
      storeId,
      variantId,
      redirectUrl: `${baseUrl}/billing/success?reference=${encodeURIComponent(reference)}`,
      email: session.user.email,
      name: session.user.name ?? undefined,
      custom: { order_ref: reference, plan_id: planId, track_id: trackId ?? '', user_id: session.user.id },
      testMode: providerTestMode(),
    })
    if (!result.ok) {
      paymentLogError('checkout_initialized', 'lemonsqueezy checkout failed', { reference, userId: session.user.id, error: result.error })
      return NextResponse.json({ error: 'We could not start checkout. Please try again.' }, { status: 502 })
    }
    paymentLog('payment_redirected', { reference, userId: session.user.id, provider, planId })
    return NextResponse.json({ provider, url: result.url, reference })
  }

  // Paystack (Nigeria). Only reachable when an approved NGN price exists.
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'This plan is not available at the moment.' }, { status: 503 })
  }
  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: session.user.email,
        amount: String(price.amountMinor),
        currency: price.currency,
        reference,
        callback_url: `${baseUrl}/billing/success?reference=${encodeURIComponent(reference)}`,
        metadata: {
          plan_id: planId,
          track_id: trackId ?? '',
          user_id: session.user.id,
          pricing_version: COMMERCIAL_PRICING_VERSION,
          provider: 'PAYSTACK',
        },
      }),
    })
    const data = await response.json()
    const url = data?.data?.authorization_url
    if (!data?.status || !url) {
      paymentLogError('checkout_initialized', 'paystack initialize error', { reference, userId: session.user.id })
      return NextResponse.json({ error: 'We could not start your payment. Please try again.' }, { status: 502 })
    }
    paymentLog('payment_redirected', { reference, userId: session.user.id, provider, planId })
    return NextResponse.json({ provider, url, reference })
  } catch {
    return NextResponse.json({ error: 'We could not reach the payment provider. Please try again.' }, { status: 502 })
  }
}
