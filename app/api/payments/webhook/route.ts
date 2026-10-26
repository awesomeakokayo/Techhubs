import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { fulfillOrder } from '@/lib/payments'
import { paymentLog, paymentLogError } from '@/lib/payment-log'
import { isPlanId } from '@/lib/commercial/plans'
import { normalizePaystackEvent, webhookContentHash } from '@/lib/commercial/webhooks'
import { applyBillingEvent } from '@/lib/commercial/service'
import { recordLearningEvent } from '@/lib/event-recorder'

export const dynamic = 'force-dynamic'

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    paymentLogError('payment_webhook_received', 'PAYSTACK_SECRET_KEY not set')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const hash = crypto.createHmac('sha512', secretKey).update(body, 'utf8').digest('hex')
  if (!signature || !timingSafeEqual(hash, signature)) {
    paymentLogError('payment_webhook_received', 'invalid signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  paymentLog('payment_webhook_received', { event: event.event })

  switch (event.event) {
    case 'charge.success': {
      const data = event.data
      const metadata = data?.metadata ?? {}
      const reference = data?.reference

      // Commercial Track Pass and Pro checkout create a trusted PaymentOrder first.
      // Pro orders deliberately have no track_id, so route by the internal plan id
      // as well as by the order's server-created productCode.
      const order = reference
        ? await prisma.paymentOrder.findUnique({
            where: { reference },
            select: { productCode: true, userId: true, campaignId: true, amount: true, currency: true, pricingVersion: true },
          })
        : null
      const orderPlanId = isPlanId(order?.productCode) ? order.productCode : null
      const normalized = normalizePaystackEvent(event)

      if (reference && orderPlanId) {
        const result = await applyBillingEvent(
          prisma,
          { ...normalized, productCode: orderPlanId, userId: order!.userId },
          `paystack:${webhookContentHash(body)}`,
        )
        if (result.applied && result.userId) {
          await recordLearningEvent({
            userId: result.userId,
            eventName: 'purchase_succeeded',
            metadata: {
              planId: orderPlanId,
              amountMinor: normalized.amountMinor,
              currency: normalized.currency,
              pricingVersion: order!.pricingVersion,
              campaignId: order!.campaignId,
              purchaseType: 'initial',
            },
          })
          if (orderPlanId !== 'TRACK_PASS') {
            await recordLearningEvent({
              userId: result.userId,
              eventName: 'subscription_started',
              metadata: { planId: orderPlanId, amountMinor: normalized.amountMinor, currency: normalized.currency },
            })
          }
        }
        break
      }

      // Renewal charges have no new internal checkout order. They may only update
      // a subscription already linked by verified provider subscription/customer ids.
      if (normalized.providerSubscriptionId || normalized.providerCustomerId) {
        const linked = await prisma.subscription.findFirst({
          where: {
            OR: [
              ...(normalized.providerSubscriptionId
                ? [{ providerSubscriptionId: normalized.providerSubscriptionId }, { paystackSubscriptionCode: normalized.providerSubscriptionId }]
                : []),
              ...(normalized.providerCustomerId
                ? [{ providerCustomerId: normalized.providerCustomerId }, { paystackCustomerCode: normalized.providerCustomerId }]
                : []),
            ],
          },
          select: { userId: true, productCode: true },
        })
        if (linked && isPlanId(linked.productCode) && linked.productCode !== 'TRACK_PASS') {
          const result = await applyBillingEvent(
            prisma,
            { ...normalized, productCode: linked.productCode, userId: linked.userId, orderReference: null },
            `paystack:${webhookContentHash(body)}`,
          )
          if (result.applied && result.userId) {
            await recordLearningEvent({
              userId: result.userId,
              eventName: 'purchase_succeeded',
              metadata: { planId: linked.productCode, amountMinor: normalized.amountMinor, currency: normalized.currency, purchaseType: 'renewal' },
            })
            await recordLearningEvent({
              userId: result.userId,
              eventName: 'subscription_renewed',
              metadata: { planId: linked.productCode, amountMinor: normalized.amountMinor, currency: normalized.currency },
            })
          }
          break
        }
      }

      // Never interpret an unlinked commercial plan claim as a legacy subscription.
      if (isPlanId(metadata?.plan_id)) break

      // Legacy per-course purchase path: do not route to the new plan service.
      if (reference && metadata?.track_id) {
        await fulfillOrder(reference)
        break
      }

      // Legacy site-wide subscription path (grandfathered flows).
      const { customer, plan } = data
      let userId = metadata?.userId

      if (!userId) {
        const existing = await prisma.subscription.findFirst({
          where: { paystackCustomerCode: customer.customer_code },
        })
        userId = existing?.userId
      }

      if (!userId) break

      const periodDays = metadata?.plan === 'yearly' ? 365 : metadata?.plan === 'threeMonths' ? 90 : 30
      const planEnum = metadata?.plan === 'yearly' ? 'YEARLY' as const : metadata?.plan === 'threeMonths' ? 'THREE_MONTHS' as const : 'MONTHLY' as const
      const base = new Date(Date.now())
      const existingSub = await prisma.subscription.findUnique({ where: { userId } })

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          status: 'ACTIVE',
          plan: planEnum,
          paystackCustomerCode: customer.customer_code,
          paystackPlanCode: plan?.plan_code,
          currentPeriodEnd: existingSub?.currentPeriodEnd && existingSub.currentPeriodEnd > base
            ? new Date(existingSub.currentPeriodEnd.getTime() + periodDays * 24 * 60 * 60 * 1000)
            : new Date(base.getTime() + periodDays * 24 * 60 * 60 * 1000),
        },
        create: {
          userId,
          status: 'ACTIVE',
          plan: planEnum,
          paystackCustomerCode: customer.customer_code,
          paystackPlanCode: plan?.plan_code,
          currentPeriodEnd: new Date(base.getTime() + periodDays * 24 * 60 * 60 * 1000),
        },
      })
      break
    }

    case 'charge.failed': {
      const reference = event.data?.reference
      if (!reference) break
      const order = await prisma.paymentOrder.findUnique({
        where: { reference },
        select: { productCode: true, userId: true, amount: true, currency: true, pricingVersion: true },
      })
      if (!order || !isPlanId(order.productCode)) break
      const normalized = normalizePaystackEvent(event)
      const result = await applyBillingEvent(
        prisma,
        { ...normalized, productCode: order.productCode, userId: order.userId },
        `paystack:${webhookContentHash(body)}`,
      )
      if (result.applied) {
        await recordLearningEvent({
          userId: order.userId,
          eventName: 'purchase_failed',
          metadata: { planId: order.productCode, pricingVersion: order.pricingVersion, campaignId: null, providerStatus: normalized.status },
        })
      }
      break
    }

    case 'subscription.create':
    case 'subscription.not_renew':
    case 'subscription.disable':
    case 'invoice.payment_failed': {
      const normalized = normalizePaystackEvent(event)
      const data = event.data ?? {}
      const subscriptionCode = data.subscription_code ?? data.subscription?.subscription_code ?? data.plan?.subscription
      const customerCode = data.customer?.customer_code
      const linked = await prisma.subscription.findFirst({
        where: {
          OR: [
            ...(subscriptionCode ? [{ providerSubscriptionId: String(subscriptionCode) }, { paystackSubscriptionCode: String(subscriptionCode) }] : []),
            ...(customerCode ? [{ providerCustomerId: String(customerCode) }, { paystackCustomerCode: String(customerCode) }] : []),
          ],
        },
        select: { userId: true, productCode: true, providerSubscriptionId: true, paystackSubscriptionCode: true },
      })
      const knownPlan = isPlanId(data.metadata?.plan_id)
        ? data.metadata.plan_id
        : isPlanId(linked?.productCode)
          ? linked.productCode
          : null

      if (linked && knownPlan) {
        // Canonical entitlement processing handles cancellation-at-period-end,
        // failed invoice grace and expiry; provider event IDs are idempotent.
        const applied = await applyBillingEvent(
          prisma,
          {
            ...normalized,
            productCode: knownPlan,
            userId: linked.userId,
            providerSubscriptionId: normalized.providerSubscriptionId ?? linked.providerSubscriptionId ?? linked.paystackSubscriptionCode,
          },
          `paystack:${webhookContentHash(body)}`,
        )
        if (applied.applied && applied.userId) {
          if (normalized.type === 'subscription_cancelled') {
            await recordLearningEvent({ userId: applied.userId, eventName: 'subscription_cancelled', metadata: { planId: knownPlan, cancelAtPeriodEnd: true } })
          } else if (normalized.type === 'subscription_expired') {
            await recordLearningEvent({ userId: applied.userId, eventName: 'paid_access_expired', metadata: { planId: knownPlan } })
          } else if (normalized.type === 'subscription_payment_failed') {
            await recordLearningEvent({ userId: applied.userId, eventName: 'purchase_failed', metadata: { planId: knownPlan, billingEvent: normalized.rawType } })
          }
        }
      } else if (event.event === 'subscription.create' && customerCode) {
        // Legacy subscriptions are kept compatible; new Pro products never fall
        // through this branch because their order carries the canonical plan id.
        await prisma.subscription.updateMany({
          where: { paystackCustomerCode: customerCode },
          data: {
            paystackSubscriptionCode: subscriptionCode ? String(subscriptionCode) : undefined,
            status: 'ACTIVE',
          },
        })
      } else if (event.event === 'invoice.payment_failed' && customerCode) {
        await prisma.subscription.updateMany({
          where: { paystackCustomerCode: customerCode },
          data: { status: 'PAST_DUE' },
        })
      } else if (event.event === 'subscription.disable' && customerCode) {
        await prisma.subscription.updateMany({
          where: { paystackCustomerCode: customerCode },
          data: { status: 'EXPIRED', currentPeriodEnd: new Date() },
        })
      } else if (event.event === 'subscription.not_renew' && customerCode) {
        await prisma.subscription.updateMany({
          where: { paystackCustomerCode: customerCode },
          data: { status: 'CANCELLED', cancelAtPeriodEnd: true },
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}