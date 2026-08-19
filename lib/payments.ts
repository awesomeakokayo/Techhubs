import { prisma } from './prisma'
import { PLAN_DAYS } from './pricing'
import type { PlanKey } from './pricing'
import { evaluatePaymentRisk } from './risk'
import { paymentLog, paymentLogError } from './payment-log'
import type { PaymentOrder } from '@prisma/client'

export type FulfillResult =
  | { status: 'fulfilled'; trackId: string }
  | { status: 'already_fulfilled'; trackId: string }
  | { status: 'not_found' }
  | { status: 'verification_failed' }
  | { status: 'mismatch'; reason: string }
  | { status: 'unpaid'; txnStatus: string }

export interface PaystackTransactionShape {
  status?: string
  reference?: string
  amount?: number | string
  currency?: string
  customer?: { risk_action?: string | null }
  authorization?: { country_code?: string | null }
}

export function planKeyToEnum(planKey: PlanKey): 'MONTHLY' | 'THREE_MONTHS' | 'YEARLY' {
  return planKey === 'yearly' ? 'YEARLY' : planKey === 'threeMonths' ? 'THREE_MONTHS' : 'MONTHLY'
}

export function planEnumToDays(plan: 'MONTHLY' | 'THREE_MONTHS' | 'YEARLY'): number {
  return plan === 'YEARLY' ? PLAN_DAYS.yearly : plan === 'THREE_MONTHS' ? PLAN_DAYS.threeMonths : PLAN_DAYS.monthly
}

/** Trusted IP-country signal provided by the hosting platform (Vercel). */
export function getIpCountryFromHeaders(
  headers: Headers | Record<string, string | null | undefined>
): string | null {
  const get = (name: string) =>
    typeof headers.get === 'function' ? headers.get(name) : headers[name as never] ?? null
  return get('x-vercel-ip-country')
}

/**
 * Pure comparison between a Paystack verify payload and the internal order.
 * Exact subunit integer comparison — a mismatch must never fulfill.
 */
export function transactionMatchesOrder(
  txn: PaystackTransactionShape,
  order: Pick<PaymentOrder, 'reference' | 'currency' | 'amount'>
): { matches: boolean; reason?: string } {
  if (txn.status !== 'success') return { matches: false, reason: `txn_status:${txn.status}` }
  if (txn.reference !== order.reference) return { matches: false, reason: 'reference_mismatch' }
  if ((txn.currency ?? '').toUpperCase() !== order.currency) {
    return { matches: false, reason: `currency_mismatch:${txn.currency}!=${order.currency}` }
  }
  if (Number(txn.amount) !== order.amount) {
    return { matches: false, reason: `amount_mismatch:${String(txn.amount)}!=${order.amount}` }
  }
  return { matches: true }
}

/** Verify a reference with Paystack. Returns the raw verify payload on success. */
export async function verifyPaystackTransaction(reference: string): Promise<{
  ok: boolean
  txn?: PaystackTransactionShape
  error?: string
}> {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) return { ok: false, error: 'PAYSTACK_SECRET_KEY not configured' }

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${key}` } }
    )
    const body: any = await res.json()
    if (!body?.status || !body?.data) return { ok: false, error: body?.message ?? 'verify_failed' }
    return { ok: true, txn: body.data as PaystackTransactionShape }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'network_error' }
  }
}

/**
 * Fulfill an order referenced by a Paystack transaction reference.
 *
 * Idempotent + replay-safe: only the first fulfillment flags the order as paid
 * (atomic guarded update); the TrackAccess row is keyed by the same unique
 * providerRef, so webhook and browser-confirm racing to the same reference
 * cannot double-grant.
 */
export async function fulfillOrder(reference: string): Promise<FulfillResult> {
  const order = await prisma.paymentOrder.findUnique({ where: { reference } })
  if (!order) {
    paymentLogError('payment_rejected', 'unknown reference', { reference })
    return { status: 'not_found' }
  }

  if (order.status === 'PAID') {
    paymentLog('payment_already_fulfilled', {
      reference,
      orderId: order.id,
      userId: order.userId,
    })
    return { status: 'already_fulfilled', trackId: order.trackId }
  }

  const verified = await verifyPaystackTransaction(reference)
  if (!verified.ok || !verified.txn) {
    paymentLogError('payment_verified', 'verification failed', {
      reference,
      orderId: order.id,
      error: verified.error,
    })
    return { status: 'verification_failed' }
  }

  const txn = verified.txn

  if (txn.status !== 'success') {
    return { status: 'unpaid', txnStatus: txn.status ?? 'unknown' }
  }

  const match = transactionMatchesOrder(txn, order)
  if (!match.matches) {
    paymentLogError('payment_mismatch', match.reason ?? 'mismatch', {
      reference,
      orderId: order.id,
      userId: order.userId,
      expectedCurrency: order.currency,
      expectedAmount: order.amount,
    })
    return { status: 'mismatch', reason: match.reason ?? 'mismatch' }
  }

  const cardCountry = txn.authorization?.country_code ?? null
  const paystackRiskAction = txn.customer?.risk_action ?? null
  const risk = evaluatePaymentRisk({
    ipCountry: order.ipCountry,
    pricingRegion: order.region === 'NIGERIA' ? 'NG' : 'INTERNATIONAL',
    transactionCurrency: order.currency as 'NGN' | 'USD',
    cardCountry,
    paystackRiskAction,
    userId: order.userId,
  })

  if (risk.reasons.length) {
    paymentLog('payment_risk_review', {
      reference,
      orderId: order.id,
      userId: order.userId,
      reasons: risk.reasons,
    })
  }

  const paidAt = new Date()

  // Extend from the later of now or the current expiry so renewals stack.
  const existingAccess = await prisma.trackAccess.findUnique({
    where: { userId_trackId: { userId: order.userId, trackId: order.trackId } },
    select: { expiresAt: true },
  })
  const base = existingAccess && existingAccess.expiresAt > paidAt ? existingAccess.expiresAt : paidAt
  const expiresAt = new Date(base.getTime() + planEnumToDays(order.plan) * 24 * 60 * 60 * 1000)

  const flipped = await prisma.$transaction([
    prisma.paymentOrder.updateMany({
      where: { id: order.id, status: 'PENDING' },
      data: {
        status: 'PAID',
        cardCountry: cardCountry ?? undefined,
        riskOutcome: risk.outcome,
        paystackVerifiedAt: paidAt,
      },
    }),
    prisma.trackAccess.upsert({
      where: { userId_trackId: { userId: order.userId, trackId: order.trackId } },
      create: {
        userId: order.userId,
        trackId: order.trackId,
        status: 'ACTIVE',
        source: 'PURCHASED',
        provider: 'PAYSTACK',
        plan: order.plan,
        grantedAt: paidAt,
        expiresAt,
        providerRef: reference,
      },
      update: {
        status: 'ACTIVE',
        source: 'PURCHASED',
        provider: 'PAYSTACK',
        plan: order.plan,
        grantedAt: paidAt,
        expiresAt,
        providerRef: reference,
      },
    }),
  ])

  if (flipped[0].count === 0) {
    paymentLog('payment_already_fulfilled', {
      reference,
      orderId: order.id,
      userId: order.userId,
      reason: 'order already PAID',
    })
    return { status: 'already_fulfilled', trackId: order.trackId }
  }

  paymentLog('payment_fulfilled', {
    reference,
    orderId: order.id,
    userId: order.userId,
    trackId: order.trackId,
    currency: order.currency,
    amount: order.amount,
    region: order.region,
    pricingVersion: order.pricingVersion,
    riskOutcome: risk.outcome,
  })

  return { status: 'fulfilled', trackId: order.trackId }
}