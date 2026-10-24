/**
 * TechSkillHub — race-safe monthly AI-assessment credit accounting.
 *
 * Why this exists
 * ---------------
 * The previous allowance check read the month's usage and only then decided
 * whether another assessment was allowed. Under concurrency two requests could
 * both observe spare capacity and both proceed, exceeding the learner's
 * allowance. That check-then-act is replaced here with a database-backed
 * reservation ledger.
 *
 * Invariant (enforced under concurrency):
 *
 *     consumed credits + active (unexpired) reservations <= monthly limit
 *
 * How the invariant is guaranteed
 * -------------------------------
 * `reserveAssessmentCredit` runs inside a single interactive transaction that
 * takes a row lock (`SELECT ... FOR UPDATE`) on the per-(user, UTC-month)
 * `AssessmentCreditBucket` row before it counts usage. Every capacity decision
 * for the same user and month is therefore serialized across all workers and
 * processes: a second transaction blocks until the first commits, then observes
 * the committed reservation. Different users and different months use different
 * bucket rows, so they never contend.
 *
 * Durability, idempotency and crash recovery
 * ------------------------------------------
 *  - One durable `AssessmentCreditReservation` row per logical request, keyed by
 *    `userId + requestId` (unique). Duplicate HTTP requests and retries reuse the
 *    same row, so one assessment can never consume two credits.
 *  - The model call happens OUTSIDE any transaction; the credit is consumed (or
 *    released) in a short transaction afterwards.
 *  - Consuming the credit writes the `assessment_credit_used` audit event in the
 *    SAME transaction, so a reservation can never be CONSUMED without its
 *    completion signal.
 *  - A reservation carries `expiresAt` (TTL). An un-resolved reservation past its
 *    TTL no longer counts against capacity, so a crashed worker cannot
 *    permanently exhaust a learner's allowance. `reconcileStaleReservations`
 *    finalizes those rows: if a completion signal exists it becomes CONSUMED,
 *    otherwise EXPIRED (returned to the learner). Unresolved stale reservations
 *    are therefore recorded, not silently discarded.
 */

import crypto from 'node:crypto'
import { Prisma, type PrismaClient } from '@prisma/client'
import { monthBounds } from './entitlements'

/** How long a reservation may hold capacity before it is considered stale. */
export const ASSESSMENT_RESERVATION_TTL_MS = 20 * 60 * 1000

/** Reasons a reservation is released without consuming a credit. */
export type ReleaseReason =
  | 'deterministic_rejection'
  | 'reused_assessment'
  | 'provider_error'
  | 'timeout'
  | 'exception'
  | 'expired_unresolved'

export type ReserveOutcome = 'reserved' | 'consumed' | 'in_flight' | 'exhausted'

export interface ReserveInput {
  userId: string
  requestId: string
  tier: string
  allowance: number
  trackId?: string | null
  stepId?: string | null
  now?: Date
  ttlMs?: number
}

export interface ReserveResult {
  outcome: ReserveOutcome
  reservationId: string | null
  tier: string
  allowance: number
  consumed: number
  reserved: number
  remaining: number
  periodStart: Date
}

export interface ReservationUsage {
  periodStart: Date
  consumed: number
  reserved: number
}

type Tx = Prisma.TransactionClient

/**
 * Normalize an optional client-supplied idempotency key. Rejects anything that
 * is not a bounded, safe token so a client cannot inject arbitrary ids.
 */
export function normalizeClientRequestKey(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length < 8 || trimmed.length > 200) return null
  return /^[A-Za-z0-9._:-]+$/.test(trimmed) ? trimmed : null
}

/**
 * Derive the stable idempotency key for one logical assessment request.
 *
 * A client-supplied key is honoured when valid (so a client can dedupe true
 * retries). Otherwise the key is derived from the exact evidence being assessed,
 * so re-sending the identical submission cannot consume a second credit while a
 * genuinely changed submission (new fingerprint) is a new billable request.
 */
export function deriveAssessmentRequestId(input: {
  userId: string
  trackId: string
  projectId: string
  evidenceFingerprint: string
  rubricVersion: string
  clientKey?: string | null
}): string {
  const explicit = normalizeClientRequestKey(input.clientKey)
  if (explicit) return explicit
  return crypto
    .createHash('sha256')
    .update(
      [
        input.userId,
        input.trackId,
        input.projectId,
        input.evidenceFingerprint,
        input.rubricVersion,
      ].join('\u0000'),
    )
    .digest('hex')
}

function toDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value)
}

async function ensureBucket(
  tx: Tx,
  userId: string,
  periodStart: Date,
  tier: string,
  allowance: number,
): Promise<void> {
  const id = crypto.randomUUID()
  await tx.$executeRaw`
    INSERT INTO "AssessmentCreditBucket"
      ("id", "userId", "periodStart", "tier", "allowance", "createdAt", "updatedAt")
    VALUES
      (${id}, ${userId}, ${periodStart}, ${tier}, ${allowance}, now(), now())
    ON CONFLICT ("userId", "periodStart")
    DO UPDATE SET
      "tier" = EXCLUDED."tier",
      "allowance" = EXCLUDED."allowance",
      "updatedAt" = now()
  `
}

/**
 * Take the per-(user, month) capacity lock. Blocks until any concurrent
 * transaction for the same bucket commits or rolls back.
 */
async function lockBucket(tx: Tx, userId: string, periodStart: Date): Promise<void> {
  await tx.$queryRaw`
    SELECT "id" FROM "AssessmentCreditBucket"
    WHERE "userId" = ${userId} AND "periodStart" = ${periodStart}
    FOR UPDATE
  `
}

async function countUsage(
  tx: Tx,
  userId: string,
  periodStart: Date,
  now: Date,
): Promise<ReservationUsage> {
  // Sequential on purpose: an interactive transaction runs on a single
  // connection, so queries must not be issued in parallel.
  const consumed = await tx.assessmentCreditReservation.count({
    where: { userId, periodStart, status: 'CONSUMED' },
  })
  const reserved = await tx.assessmentCreditReservation.count({
    where: { userId, periodStart, status: 'RESERVED', expiresAt: { gt: now } },
  })
  return { periodStart, consumed, reserved }
}

/**
 * Atomically reserve one credit for a logical assessment request.
 *
 * Idempotent: the same `requestId` reuses its reservation. A request that was
 * already consumed returns `consumed` (the caller should reuse the stored
 * result); a request that is genuinely still in flight returns `in_flight`.
 */
export async function reserveAssessmentCredit(
  prisma: PrismaClient,
  input: ReserveInput,
): Promise<ReserveResult> {
  const now = input.now ?? new Date()
  const ttlMs = input.ttlMs ?? ASSESSMENT_RESERVATION_TTL_MS
  const { start: periodStart } = monthBounds(now)
  const expiresAt = new Date(now.getTime() + ttlMs)
  const allowance = Number.isFinite(input.allowance) ? Math.max(0, Math.floor(input.allowance)) : 0

  return prisma.$transaction(async (tx) => {
    await ensureBucket(tx, input.userId, periodStart, input.tier, allowance)
    await lockBucket(tx, input.userId, periodStart)

    const existing = await tx.assessmentCreditReservation.findUnique({
      where: { userId_requestId: { userId: input.userId, requestId: input.requestId } },
      select: { id: true, status: true, expiresAt: true },
    })

    if (existing) {
      if (existing.status === 'CONSUMED') {
        const usage = await countUsage(tx, input.userId, periodStart, now)
        return result('consumed', existing.id, input.tier, allowance, usage)
      }
      if (existing.status === 'RESERVED' && toDate(existing.expiresAt).getTime() > now.getTime()) {
        const usage = await countUsage(tx, input.userId, periodStart, now)
        return result('in_flight', existing.id, input.tier, allowance, usage)
      }
      // RELEASED / EXPIRED / stale RESERVED: fall through and re-arm below.
    }

    // Reclaim stale reservations for this bucket so they never block capacity.
    await tx.assessmentCreditReservation.updateMany({
      where: { userId: input.userId, periodStart, status: 'RESERVED', expiresAt: { lte: now } },
      data: { status: 'EXPIRED', releasedAt: now, releaseReason: 'expired_unresolved' },
    })

    const usage = await countUsage(tx, input.userId, periodStart, now)
    if (usage.consumed + usage.reserved >= allowance) {
      return result('exhausted', existing?.id ?? null, input.tier, allowance, usage)
    }

    const reservation = await tx.assessmentCreditReservation.upsert({
      where: { userId_requestId: { userId: input.userId, requestId: input.requestId } },
      create: {
        userId: input.userId,
        requestId: input.requestId,
        periodStart,
        status: 'RESERVED',
        credits: 1,
        tier: input.tier,
        allowance,
        trackId: input.trackId ?? null,
        stepId: input.stepId ?? null,
        expiresAt,
      },
      update: {
        periodStart,
        status: 'RESERVED',
        tier: input.tier,
        allowance,
        trackId: input.trackId ?? null,
        stepId: input.stepId ?? null,
        expiresAt,
        consumedAt: null,
        releasedAt: null,
        releaseReason: null,
      },
      select: { id: true },
    })

    const after = await countUsage(tx, input.userId, periodStart, now)
    return result('reserved', reservation.id, input.tier, allowance, after)
  }, { maxWait: 15000, timeout: 15000 })
}

function result(
  outcome: ReserveOutcome,
  reservationId: string | null,
  tier: string,
  allowance: number,
  usage: ReservationUsage,
): ReserveResult {
  return {
    outcome,
    reservationId,
    tier,
    allowance,
    consumed: usage.consumed,
    reserved: usage.reserved,
    remaining: Math.max(0, allowance - usage.consumed - usage.reserved),
    periodStart: usage.periodStart,
  }
}

/**
 * Consume a reservation exactly once. Idempotent: a second call (or a call after
 * the reservation was released) does nothing. The completion audit event is
 * written in the same transaction, so the two can never diverge.
 */
export async function consumeAssessmentCredit(
  prisma: PrismaClient,
  input: {
    userId: string
    requestId: string
    trackId?: string | null
    stepId?: string | null
    metadata?: Record<string, unknown> | null
    now?: Date
  },
): Promise<{ consumed: boolean }> {
  const now = input.now ?? new Date()
  return prisma.$transaction(async (tx) => {
    const updated = await tx.assessmentCreditReservation.updateMany({
      where: { userId: input.userId, requestId: input.requestId, status: 'RESERVED' },
      data: { status: 'CONSUMED', consumedAt: now },
    })
    if (updated.count === 1) {
      await tx.learningEvent.create({
        data: {
          userId: input.userId,
          eventName: 'assessment_credit_used',
          trackId: input.trackId ?? null,
          stepId: input.stepId ?? null,
          metadata: {
            requestId: input.requestId,
            ...(input.metadata ?? {}),
          } as Prisma.InputJsonValue,
        },
      })
    }
    return { consumed: updated.count === 1 }
  })
}

/**
 * Release a reservation (non-billable outcome). Idempotent, and can never fire
 * after the same reservation has been consumed.
 */
export async function releaseAssessmentCredit(
  prisma: PrismaClient,
  input: { userId: string; requestId: string; reason: ReleaseReason | string; now?: Date },
): Promise<{ released: boolean }> {
  const now = input.now ?? new Date()
  const updated = await prisma.assessmentCreditReservation.updateMany({
    where: { userId: input.userId, requestId: input.requestId, status: 'RESERVED' },
    data: { status: 'RELEASED', releasedAt: now, releaseReason: input.reason },
  })
  return { released: updated.count === 1 }
}

/** Read the ledger-backed usage for a user's current UTC month. */
export async function countReservationUsage(
  prisma: PrismaClient,
  userId: string,
  now: Date = new Date(),
): Promise<ReservationUsage> {
  const { start: periodStart } = monthBounds(now)
  const consumed = await prisma.assessmentCreditReservation.count({
    where: { userId, periodStart, status: 'CONSUMED' },
  })
  const reserved = await prisma.assessmentCreditReservation.count({
    where: { userId, periodStart, status: 'RESERVED', expiresAt: { gt: now } },
  })
  return { periodStart, consumed, reserved }
}

/**
 * Finalize stale reservations. Rows that recorded a completion become CONSUMED;
 * the rest are EXPIRED (the credit returns to the learner). Returns a small
 * report so an operator can see whether anything was left unresolved.
 */
export async function reconcileStaleReservations(
  prisma: PrismaClient,
  options: { now?: Date; userId?: string; limit?: number } = {},
): Promise<{ expired: number; reconciledConsumed: number; inspected: number }> {
  const now = options.now ?? new Date()
  const limit = options.limit ?? 500
  const stale = await prisma.assessmentCreditReservation.findMany({
    where: {
      ...(options.userId ? { userId: options.userId } : {}),
      status: 'RESERVED',
      expiresAt: { lte: now },
    },
    select: { id: true, userId: true, requestId: true },
    take: limit,
    orderBy: { createdAt: 'asc' },
  })

  let expired = 0
  let reconciledConsumed = 0
  for (const row of stale) {
    const completion = await prisma.learningEvent.findFirst({
      where: {
        userId: row.userId,
        eventName: 'assessment_credit_used',
        metadata: { path: ['requestId'], equals: row.requestId },
      },
      select: { id: true },
    })
    const updated = await prisma.assessmentCreditReservation.updateMany({
      where: { id: row.id, status: 'RESERVED' },
      data: completion
        ? { status: 'CONSUMED', consumedAt: now, releaseReason: 'reconciled_from_completion' }
        : { status: 'EXPIRED', releasedAt: now, releaseReason: 'expired_unresolved' },
    })
    if (updated.count === 1) {
      if (completion) reconciledConsumed += 1
      else expired += 1
    }
  }
  return { expired, reconciledConsumed, inspected: stale.length }
}
