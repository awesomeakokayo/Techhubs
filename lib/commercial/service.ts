/**
 * TechSkillHub — canonical entitlement service (database).
 *
 * This is the ONE place that maps verified provider events onto internal
 * subscription / track-access state, and the ONE place the app reads a learner's
 * plan from. Both providers (Lemon Squeezy, Paystack) flow through it, so access
 * rules can never diverge per provider.
 *
 * Payment evidence discipline:
 *   - only signature-verified webhook events reach `applyBillingEvent`;
 *   - a browser redirect never calls this;
 *   - processing is idempotent via a unique providerEventId on EntitlementEvent;
 *   - test-mode events never grant live entitlement.
 */

import { Prisma, type PrismaClient } from '@prisma/client'
import {
  deriveSnapshot,
  grandfatheringUntil,
  monthBounds,
  withinAssessmentAllowance,
  type EntitlementInput,
  type EntitlementSnapshot,
} from './entitlements'
import type { NormalizedBillingEvent } from './webhooks'
import { getPlan, type PlanId } from './plans'
import { assessmentAllowanceEnforced, providerProductId, type ProviderId } from './providers'
import { countReservationUsage } from './assessment-credits'
import { validatePaymentMatch } from './payments'
import { computeTrackPassPeriod, getTrackPassTermMonths, laterExpiry, trackPassActive } from './track-pass'

/** A Prisma transaction client (interactive transactions). */
type Db = Prisma.TransactionClient

/** Sentinel stored in PaymentOrder.trackId for non-track (Pro) orders. */
export const PRO_ORDER_TRACK = 'PRO'

type SubscriptionStatusValue = 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'EXPIRED' | 'NONE'

function providerEnum(provider: ProviderId): 'PAYSTACK' | 'LEMON_SQUEEZY' {
  return provider === 'paystack' ? 'PAYSTACK' : 'LEMON_SQUEEZY'
}

function planEnum(planId: PlanId): 'TRACK_PASS' | 'MONTHLY' | 'YEARLY' | 'THREE_MONTHS' {
  if (planId === 'TRACK_PASS') return 'TRACK_PASS'
  if (planId === 'PRO_ANNUAL') return 'YEARLY'
  return 'MONTHLY'
}

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function periodEndForPlan(planId: PlanId | null, from: Date): Date {
  const date = new Date(from)
  if (planId === 'PRO_ANNUAL') date.setUTCFullYear(date.getUTCFullYear() + 1)
  else date.setUTCMonth(date.getUTCMonth() + 1)
  return date
}

function mapProviderStatus(status: string | null): SubscriptionStatusValue {
  switch ((status ?? '').toLowerCase()) {
    case 'active':
    case 'on_trial':
      return 'ACTIVE'
    case 'cancelled':
    case 'canceled':
      return 'CANCELLED'
    case 'paused':
    case 'past_due':
    case 'unpaid':
      return 'PAST_DUE'
    case 'expired':
      return 'EXPIRED'
    default:
      return 'ACTIVE'
  }
}

/* ------------------------------------------------------------------ */
/* Reads                                                               */
/* ------------------------------------------------------------------ */

/** Authoritative entitlement snapshot for a learner. */
export async function getEntitlementSnapshot(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<EntitlementSnapshot> {
  const [subscription, trackAccess, user] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId } }),
    prisma.trackAccess.findMany({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { createdAt: true } }),
  ])

  const input: EntitlementInput = {
    subscription: subscription
      ? {
          status: subscription.status,
          plan: subscription.productCode ?? subscription.plan ?? null,
          currentPeriodEnd: subscription.currentPeriodEnd,
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        }
      : null,
    trackAccess: trackAccess.map((row) => ({ trackId: row.trackId, status: row.status, expiresAt: row.expiresAt })),
    grandfatheredUntil: grandfatheringUntil(user?.createdAt ?? null, process.env, now),
  }

  return deriveSnapshot(input, now)
}

/**
 * Legacy event-based usage count. Retained for historical/observability queries
 * only. Authoritative allowance accounting now lives in the reservation ledger
 * (`countReservationUsage`); the two are kept in step because consuming a credit
 * writes the `assessment_credit_used` event in the same transaction.
 */
export async function countAssessmentCreditsThisMonth(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<number> {
  const { start, end } = monthBounds(now)
  return prisma.learningEvent.count({
    where: { userId, eventName: 'assessment_credit_used', createdAt: { gte: start, lt: end } },
  })
}

export interface AllowanceDecision {
  /** True while the monthly limit is actually applied. */
  enforced: boolean
  allowed: boolean
  used: number
  allowance: number
  tier: string
  /** Active (unexpired) reservations, i.e. capacity currently held. */
  reserved: number
  remaining: number
  reason?: string
}

/**
 * Monthly AI-assessment allowance snapshot.
 *
 * Usage is read from the durable reservation ledger, so `used` is
 * `consumed + active reservations`. The monthly limit is enforced
 * (`COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED`, on by default) so AI spend stays
 * bounded; it is never unlimited because every tier has a finite allowance.
 * This function is read-only — the atomic reservation happens in
 * `reserveAssessmentCredit`, which is the only thing that may grant capacity.
 */
export async function checkAssessmentAllowance(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<AllowanceDecision> {
  const snapshot = await getEntitlementSnapshot(prisma, userId, now)
  const usage = await countReservationUsage(prisma, userId, now)
  const used = usage.consumed + usage.reserved
  const enforced = assessmentAllowanceEnforced(process.env)
  const allowance = snapshot.assessmentAllowance

  if (!enforced) {
    return {
      enforced: false,
      allowed: true,
      used,
      allowance,
      tier: snapshot.tier,
      reserved: usage.reserved,
      remaining: Math.max(0, allowance - used),
    }
  }
  const allowed = withinAssessmentAllowance(used, allowance)
  return {
    enforced: true,
    allowed,
    used,
    allowance,
    tier: snapshot.tier,
    reserved: usage.reserved,
    remaining: Math.max(0, allowance - used),
    reason: allowed
      ? undefined
      : `You have used all ${allowance} AI project assessments included in your plan this month.`,
  }
}

/* ------------------------------------------------------------------ */
/* Audit trail (idempotency)                                           */
/* ------------------------------------------------------------------ */

export interface RecordEntitlementEventInput {
  userId: string
  provider?: ProviderId | null
  providerEventId?: string | null
  type: string
  planId?: string | null
  trackId?: string | null
  source: string
  metadata?: Prisma.InputJsonValue
}

/** Insert an audit row. Returns recorded=false when the event id already exists. */
export async function recordEntitlementEvent(
  prisma: PrismaClient,
  input: RecordEntitlementEventInput,
): Promise<{ recorded: boolean }> {
  try {
    await prisma.entitlementEvent.create({
      data: {
        userId: input.userId,
        provider: input.provider ?? null,
        providerEventId: input.providerEventId ?? null,
        type: input.type,
        planId: input.planId ?? null,
        trackId: input.trackId ?? null,
        source: input.source,
        metadata: input.metadata,
      },
    })
    return { recorded: true }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { recorded: false }
    }
    throw error
  }
}

/* ------------------------------------------------------------------ */
/* Orders                                                              */
/* ------------------------------------------------------------------ */

export interface CreateOrderInput {
  userId: string
  planId: PlanId
  provider: ProviderId
  trackId: string | null
  currency: string
  amountMinor: number
  reference: string
  pricingVersion: string
}

export async function createPendingOrder(prisma: PrismaClient, input: CreateOrderInput) {
  const region = input.currency.toUpperCase() === 'NGN' ? 'NIGERIA' : 'INTERNATIONAL'
  return prisma.paymentOrder.create({
    data: {
      userId: input.userId,
      trackId: input.trackId ?? PRO_ORDER_TRACK,
      plan: planEnum(input.planId),
      region,
      currency: input.currency,
      amount: input.amountMinor,
      amountMajor: Math.round(input.amountMinor / 100),
      pricingVersion: input.pricingVersion,
      status: 'PENDING',
      reference: input.reference,
      provider: providerEnum(input.provider),
      productCode: input.planId,
    },
  })
}

export async function getOrderByReference(prisma: PrismaClient, reference: string) {
  return prisma.paymentOrder.findUnique({ where: { reference } })
}

/* ------------------------------------------------------------------ */
/* Applying verified provider events                                   */
/* ------------------------------------------------------------------ */

export interface ApplyResult {
  applied: boolean
  reason: string
  userId: string | null
}

async function resolveUserId(
  prisma: PrismaClient,
  event: NormalizedBillingEvent,
  order: Awaited<ReturnType<typeof getOrderByReference>>,
): Promise<string | null> {
  // The internal order created before redirect is the authoritative owner of a
  // purchase. This prevents a mismatched/spoofed metadata user id from attributing
  // a payment to the wrong account.
  if (order?.userId) return order.userId
  if (event.userId) return event.userId
  if (event.providerSubscriptionId) {
    const sub = await prisma.subscription.findFirst({
      where: { OR: [{ providerSubscriptionId: event.providerSubscriptionId }, { paystackSubscriptionCode: event.providerSubscriptionId }] },
      select: { userId: true },
    })
    if (sub) return sub.userId
  }
  return null
}

async function upsertSubscription(
  tx: Db,
  args: {
    userId: string
    planId: PlanId | null
    event: NormalizedBillingEvent
    now: Date
    status?: SubscriptionStatusValue
    cancelAtPeriodEnd?: boolean
    occurredAt: Date | null
  },
) {
  const { userId, planId, event, now, occurredAt } = args
  const existing = await tx.subscription.findUnique({ where: { userId } })

  // Stale-event guard: an older provider event must never overwrite newer state
  // (e.g. a late "active" update resurrecting an expired/cancelled subscription).
  if (existing?.providerUpdatedAt && occurredAt && existing.providerUpdatedAt.getTime() > occurredAt.getTime()) {
    return { skipped: true as const }
  }

  const status = args.status ?? mapProviderStatus(event.status)
  const periodEnd = parseDate(event.currentPeriodEnd) ?? periodEndForPlan(planId, now)
  const plan = planId ? planEnum(planId) : undefined
  const providerUpdatedAt = occurredAt ?? now

  await tx.subscription.upsert({
    where: { userId },
    create: {
      userId,
      status,
      plan,
      productCode: planId ?? undefined,
      provider: providerEnum(event.provider),
      providerCustomerId: event.providerCustomerId ?? undefined,
      providerSubscriptionId: event.providerSubscriptionId ?? undefined,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: args.cancelAtPeriodEnd ?? status === 'CANCELLED',
      providerUpdatedAt,
    },
    update: {
      status,
      ...(plan ? { plan } : {}),
      ...(planId ? { productCode: planId } : {}),
      provider: providerEnum(event.provider),
      ...(event.providerCustomerId ? { providerCustomerId: event.providerCustomerId } : {}),
      ...(event.providerSubscriptionId ? { providerSubscriptionId: event.providerSubscriptionId } : {}),
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: args.cancelAtPeriodEnd ?? status === 'CANCELLED',
      providerUpdatedAt,
    },
  })
  return { skipped: false as const }
}

type OrderRow = NonNullable<Awaited<ReturnType<typeof getOrderByReference>>>

async function grantTrackPass(
  tx: Db,
  args: { userId: string; trackId: string; order: OrderRow; event: NormalizedBillingEvent; now: Date },
) {
  const { userId, trackId, order, event, now } = args

  // Authoritative period start: the provider's verified payment instant when it
  // supplies one, otherwise the server's verified processing time. Never the
  // instant a checkout session was merely created.
  const paymentAt = parseDate(event.occurredAt) ?? now
  const termMonths = getTrackPassTermMonths(trackId)
  if (termMonths === null) throw new Error(`TRACK_PASS_TERM_NOT_CONFIGURED:${trackId}`)
  const period = computeTrackPassPeriod(paymentAt, termMonths)

  // One verified payment → exactly one purchase-period row. The unique
  // orderReference makes this idempotent across webhook retries and duplicate
  // deliveries, so one payment can never create two periods.
  const existing = await tx.trackPassPurchase.findUnique({ where: { orderReference: order.reference } })
  if (!existing) {
    await tx.trackPassPurchase.create({
      data: {
        userId,
        trackId,
        provider: providerEnum(event.provider),
        status: 'ACTIVE',
        startedAt: period.startedAt,
        expiresAt: period.expiresAt,
        amount: order.amount,
        currency: order.currency,
        pricingVersion: order.pricingVersion,
        providerPaymentId: event.providerOrderId ?? null,
        orderReference: order.reference,
      },
    })
  }

  // Enforce access through the canonical TrackAccess row. Extend from any
  // remaining paid time so an early repurchase never shortens access; an expired
  // pass starts fresh from the new verified payment.
  const current = await tx.trackAccess.findUnique({
    where: { userId_trackId: { userId, trackId } },
    select: { expiresAt: true },
  })
  const baseExpiry = current && current.expiresAt.getTime() > now.getTime() ? current.expiresAt : null
  const effectiveExpiry = laterExpiry(baseExpiry, period.expiresAt)

  await tx.trackAccess.upsert({
    where: { userId_trackId: { userId, trackId } },
    create: {
      userId,
      trackId,
      status: 'ACTIVE',
      source: 'PURCHASED',
      provider: providerEnum(event.provider),
      plan: 'TRACK_PASS',
      grantedAt: period.startedAt,
      expiresAt: period.expiresAt,
      providerRef: order.reference,
    },
    update: {
      status: 'ACTIVE',
      provider: providerEnum(event.provider),
      plan: 'TRACK_PASS',
      grantedAt: period.startedAt,
      expiresAt: effectiveExpiry,
    },
  })
}

export interface TrackPassView {
  trackId: string
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED'
  startedAt: string | null
  expiresAt: string
  /** True only while the period is unexpired and not revoked. */
  active: boolean
  amountMinor: number
  currency: string
}

/**
 * The learner's Track Pass purchase periods, newest expiry first. Read-only: the
 * UI shows server-derived status and never mutates it.
 */
export async function getTrackPasses(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<TrackPassView[]> {
  const rows = await prisma.trackPassPurchase.findMany({
    where: { userId },
    orderBy: { expiresAt: 'desc' },
  })
  return rows.map((row) => ({
    trackId: row.trackId,
    status: row.status,
    startedAt: row.startedAt.toISOString(),
    expiresAt: row.expiresAt.toISOString(),
    active: row.status === 'ACTIVE' && trackPassActive(row.expiresAt, now),
    amountMinor: row.amount,
    currency: row.currency,
  }))
}

/**
 * The active (unexpired, unrevoked) Track Pass period for one track, if any.
 * Used to prevent accidental duplicate purchases while a pass is already active.
 */
export async function getActiveTrackPass(
  prisma: PrismaClient,
  userId: string,
  trackId: string,
  now: Date = new Date(),
) {
  return prisma.trackPassPurchase.findFirst({
    where: { userId, trackId, status: 'ACTIVE', expiresAt: { gt: now } },
    orderBy: { expiresAt: 'desc' },
  })
}

/**
 * Apply a verified, normalized provider event. Idempotent and safe to retry.
 *
 * The audit row and the resulting state change happen in ONE transaction:
 *   - a duplicate delivery hits the unique providerEventId and is ignored;
 *   - if a state change fails, the audit row rolls back too, so the provider's
 *     retry is not silently swallowed as a duplicate.
 */
export async function applyBillingEvent(
  prisma: PrismaClient,
  event: NormalizedBillingEvent,
  providerEventId: string,
  now: Date = new Date(),
): Promise<ApplyResult> {
  if (event.type === 'ignored') return { applied: false, reason: 'ignored', userId: event.userId }

  const order = event.orderReference ? await getOrderByReference(prisma, event.orderReference) : null
  const userId = await resolveUserId(prisma, event, order)
  if (!userId) return { applied: false, reason: 'unresolved_user', userId: null }

  const planId = ((event.productCode ?? order?.productCode) as PlanId | null) ?? null
  const trackId = event.trackId ?? (order && order.trackId !== PRO_ORDER_TRACK ? order.trackId : null)
  const plan = planId ? getPlan(planId) : null
  const occurredAt = parseDate(event.occurredAt)

  return prisma.$transaction(async (tx): Promise<ApplyResult> => {
    // Idempotency gate + audit, in the same transaction as the state mutation.
    try {
      await tx.entitlementEvent.create({
        data: {
          userId,
          provider: event.provider,
          providerEventId,
          type: event.type,
          planId,
          trackId,
          source: 'webhook',
          metadata: {
            rawType: event.rawType,
            status: event.status,
            testMode: event.testMode,
            amountMinor: event.amountMinor,
            currency: event.currency,
            productId: event.productId,
            occurredAt: event.occurredAt,
          },
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return { applied: false, reason: 'duplicate', userId }
      }
      throw error
    }

    // Test-mode deliveries must never grant live entitlement (audited, but no grant).
    if (event.testMode) return { applied: false, reason: 'test_mode', userId }

    // Monetary + product matching against the trusted internal order/config.
    const expectedProductId = planId ? providerProductId(event.provider, planId, process.env) : null
    const match = validatePaymentMatch(
      { type: event.type, amountMinor: event.amountMinor, currency: event.currency, productId: event.productId },
      order ? { amount: order.amount, currency: order.currency, productCode: order.productCode } : null,
      expectedProductId,
      { requiresOrder: event.type === 'payment_succeeded' && plan?.kind === 'ONE_TIME' },
    )
    if (!match.matches) return { applied: false, reason: `mismatch:${match.reason}`, userId }

    switch (event.type) {
      case 'payment_succeeded': {
        if (order) {
          await tx.paymentOrder.updateMany({
            where: { id: order.id, status: { not: 'PAID' } },
            data: { status: 'PAID', providerPaymentId: event.providerOrderId ?? undefined },
          })
        }
        if (plan?.kind === 'ONE_TIME') {
          if (order && trackId) {
            await grantTrackPass(tx, { userId, trackId, order, event, now })
          }
        } else {
          await upsertSubscription(tx, { userId, planId, event, now, status: 'ACTIVE', cancelAtPeriodEnd: false, occurredAt })
        }
        break
      }
      case 'subscription_created':
      case 'subscription_updated': {
        await upsertSubscription(tx, { userId, planId, event, now, occurredAt })
        break
      }
      case 'subscription_cancelled': {
        await upsertSubscription(tx, { userId, planId, event, now, status: 'CANCELLED', cancelAtPeriodEnd: true, occurredAt })
        break
      }
      case 'subscription_expired': {
        await upsertSubscription(tx, { userId, planId, event, now, status: 'EXPIRED', occurredAt })
        break
      }
      case 'subscription_payment_failed': {
        await upsertSubscription(tx, { userId, planId, event, now, status: 'PAST_DUE', occurredAt })
        break
      }
      case 'payment_failed': {
        if (order) {
          await tx.paymentOrder.updateMany({ where: { id: order.id, status: 'PENDING' }, data: { status: 'FAILED' } })
        }
        break
      }
      case 'refunded': {
        if (order) {
          await tx.paymentOrder.updateMany({ where: { id: order.id }, data: { status: 'REFUNDED' } })
          if (plan?.kind === 'ONE_TIME' && trackId) {
            // Revoke only the refunded purchase period; if the learner still owns
            // another valid period for this track, keep that access intact.
            await tx.trackPassPurchase.updateMany({
              where: { orderReference: order.reference },
              data: { status: 'REVOKED' },
            })
            const remaining = await tx.trackPassPurchase.findFirst({
              where: { userId, trackId, status: 'ACTIVE', orderReference: { not: order.reference }, expiresAt: { gt: now } },
              orderBy: { expiresAt: 'desc' },
              select: { expiresAt: true },
            })
            if (remaining) {
              await tx.trackAccess.updateMany({
                where: { userId, trackId },
                data: { status: 'ACTIVE', expiresAt: remaining.expiresAt },
              })
            } else {
              await tx.trackAccess.updateMany({
                where: { userId, trackId },
                data: { status: 'EXPIRED', expiresAt: now },
              })
            }
          }
        }
        if (plan?.kind === 'SUBSCRIPTION' || event.providerSubscriptionId) {
          await upsertSubscription(tx, { userId, planId, event, now, status: 'EXPIRED', occurredAt })
        }
        break
      }
    }

    return { applied: true, reason: event.type, userId }
  })
}
