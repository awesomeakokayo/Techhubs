import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  normalizeLemonSqueezyEvent,
  safeJsonParse,
  verifyLemonSqueezySignature,
  webhookContentHash,
} from '@/lib/commercial/webhooks'
import { applyBillingEvent } from '@/lib/commercial/service'
import { recordLearningEvent } from '@/lib/event-recorder'
import { isPlanId } from '@/lib/commercial/plans'
import { paymentLog, paymentLogError } from '@/lib/payment-log'

export const dynamic = 'force-dynamic'

/**
 * Lemon Squeezy webhook receiver.
 *
 * - Verifies the HMAC-SHA256 `X-Signature` before doing anything else.
 * - Normalizes the event and applies it through the canonical entitlement
 *   service, which is idempotent on the provider event id.
 * - Never returns entitlement data; a success-page redirect is never trusted.
 *
 * Disabled (503) until `LEMONSQUEEZY_WEBHOOK_SECRET` is configured.
 */
export async function POST(req: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) {
    paymentLogError('payment_webhook_received', 'LEMONSQUEEZY_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get('x-signature')
  if (!verifyLemonSqueezySignature(rawBody, signature, secret)) {
    paymentLogError('payment_webhook_received', 'invalid lemonsqueezy signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const payload = safeJsonParse(rawBody)
  if (!payload) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const event = normalizeLemonSqueezyEvent(payload)
  const providerEventId = `lemonsqueezy:${req.headers.get('x-event-id') ?? webhookContentHash(rawBody)}`

  try {
    const order = event.orderReference
      ? await prisma.paymentOrder.findUnique({
          where: { reference: event.orderReference },
          select: { productCode: true, campaignId: true, pricingVersion: true, amount: true, currency: true },
        })
      : null
    const result = await applyBillingEvent(prisma, event, providerEventId)

    // Revenue/conversion events are written only after the canonical service
    // accepts the verified webhook. Redirects and test-mode deliveries never
    // create a successful purchase event.
    if (result.applied && result.userId) {
      const planId = isPlanId(order?.productCode) ? order.productCode : isPlanId(event.productCode) ? event.productCode : null
      if (event.type === 'payment_succeeded') {
        const isRenewal = event.rawType.startsWith('subscription_payment')
        await recordLearningEvent({
          userId: result.userId,
          eventName: 'purchase_succeeded',
          metadata: {
            planId,
            amountMinor: event.amountMinor ?? order?.amount ?? null,
            currency: event.currency ?? order?.currency ?? null,
            pricingVersion: order?.pricingVersion ?? null,
            campaignId: order?.campaignId ?? null,
            purchaseType: isRenewal ? 'renewal' : 'initial',
            provider: 'lemonsqueezy',
            occurredAt: event.occurredAt,
          },
        })
        if (planId && planId !== 'TRACK_PASS' && isRenewal) {
          await recordLearningEvent({
            userId: result.userId,
            eventName: 'subscription_renewed',
            metadata: { planId, amountMinor: event.amountMinor, currency: event.currency, occurredAt: event.occurredAt },
          })
        } else if (planId && planId !== 'TRACK_PASS' && event.rawType === 'order_created') {
          await recordLearningEvent({
            userId: result.userId,
            eventName: 'subscription_started',
            metadata: { planId, amountMinor: event.amountMinor, currency: event.currency, occurredAt: event.occurredAt },
          })
        }
      } else if (event.type === 'payment_failed' || event.type === 'subscription_payment_failed') {
        await recordLearningEvent({
          userId: result.userId,
          eventName: 'purchase_failed',
          metadata: { planId, amountMinor: event.amountMinor, currency: event.currency, billingEvent: event.rawType },
        })
      } else if (event.type === 'subscription_cancelled') {
        await recordLearningEvent({
          userId: result.userId,
          eventName: 'subscription_cancelled',
          metadata: { planId, cancelAtPeriodEnd: true },
        })
      } else if (event.type === 'subscription_expired') {
        await recordLearningEvent({
          userId: result.userId,
          eventName: 'paid_access_expired',
          metadata: { planId },
        })
      }
    }

    paymentLog('payment_webhook_received', { provider: 'lemonsqueezy', event: event.rawType, applied: result.applied, reason: result.reason })
    return NextResponse.json({ received: true, applied: result.applied, reason: result.reason })
  } catch (error) {
    paymentLogError('payment_webhook_received', 'lemonsqueezy apply failed', {
      event: event.rawType,
      error: error instanceof Error ? error.message : 'unknown',
    })
    // Non-2xx asks the provider to retry; the audit/idempotency guard makes retries safe.
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
