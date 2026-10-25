/**
 * TechSkillHub — pure entitlement derivation.
 *
 * Turns stored subscription / track-access rows into one canonical snapshot that
 * the whole app (access checks, assessment allowance, billing UI) consumes. No
 * database or provider coupling lives here, so the rules are exhaustively
 * unit-testable.
 */

import type { EntitlementTier } from './plans'
import { allowanceForTier, isPremiumTrackIn, premiumTrackIds } from './plans'

export interface SubscriptionLike {
  status: string
  plan?: string | null
  currentPeriodEnd?: Date | string | null
  cancelAtPeriodEnd?: boolean | null
}

export interface TrackAccessLike {
  trackId: string
  status: string
  expiresAt?: Date | string | null
}

export interface EntitlementInput {
  subscription: SubscriptionLike | null
  trackAccess: TrackAccessLike[]
  /** Grandfathering cut-over: access retained while now < grandfatheredUntil. */
  grandfatheredUntil?: Date | string | null
}

export interface EntitlementSnapshot {
  tier: EntitlementTier
  hasAllPremiumTracks: boolean
  ownedTrackIds: string[]
  assessmentAllowance: number
  grandfathered: boolean
  grandfatheredUntil: string | null
  subscriptionStatus: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

function toDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function isFuture(value: Date | string | null | undefined, now: Date): boolean {
  const date = toDate(value)
  return Boolean(date && date.getTime() > now.getTime())
}

/**
 * Whether a subscription currently grants Pro.
 *
 * - ACTIVE → grants (the provider states the subscription is live).
 * - PAST_DUE / CANCELLED → grant only until the paid period ends (grace period),
 *   matching the configured cancellation policy (access continues to period end).
 * - EXPIRED / NONE / anything else → does not grant.
 */
export function subscriptionGrantsPro(sub: SubscriptionLike | null, now: Date = new Date()): boolean {
  if (!sub) return false
  if (sub.status === 'ACTIVE') return true
  if (sub.status === 'PAST_DUE' || sub.status === 'CANCELLED') return isFuture(sub.currentPeriodEnd, now)
  return false
}

export function deriveSnapshot(input: EntitlementInput, now: Date = new Date()): EntitlementSnapshot {
  const grandfathered = isFuture(input.grandfatheredUntil, now)
  const pro = grandfathered || subscriptionGrantsPro(input.subscription, now)

  const ownedTrackIds = input.trackAccess
    .filter((access) => access.status === 'ACTIVE' && (!toDate(access.expiresAt) || isFuture(access.expiresAt, now)))
    .map((access) => access.trackId)

  const tier: EntitlementTier = pro ? 'PRO' : ownedTrackIds.length > 0 ? 'PASS' : 'FREE'

  return {
    tier,
    hasAllPremiumTracks: pro,
    ownedTrackIds,
    assessmentAllowance: allowanceForTier(tier),
    grandfathered,
    grandfatheredUntil: toDate(input.grandfatheredUntil)?.toISOString() ?? null,
    subscriptionStatus: input.subscription?.status ?? null,
    currentPeriodEnd: toDate(input.subscription?.currentPeriodEnd)?.toISOString() ?? null,
    cancelAtPeriodEnd: Boolean(input.subscription?.cancelAtPeriodEnd),
  }
}

/** Server-side access decision for a track given a snapshot. */
export function canAccessTrack(
  snapshot: EntitlementSnapshot,
  trackId: string,
  premiumIds: readonly string[] = premiumTrackIds(),
): boolean {
  if (snapshot.hasAllPremiumTracks) return true
  if (!isPremiumTrackIn(trackId, premiumIds)) return true
  return snapshot.ownedTrackIds.includes(trackId)
}

/** First instant of the current calendar month (UTC) and the next month. */
export function monthBounds(now: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0))
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0))
  return { start, end }
}

/** Whether another assessment is permitted within the monthly allowance. */
export function withinAssessmentAllowance(usedThisPeriod: number, allowance: number): boolean {
  if (!Number.isFinite(allowance) || allowance <= 0) return false
  return usedThisPeriod < allowance
}

/**
 * Config-gated grandfathering.
 *
 * Returns the instant until which a learner keeps full access, or null. It only
 * ever returns a value when an operator explicitly sets
 * `COMMERCE_GRANDFATHERING_UNTIL`. Users created on/after
 * `COMMERCE_GRANDFATHERING_CUTOFF` (when set) are excluded. This exists so the
 * transition policy can be enabled later without a schema change; it is OFF
 * unless configured.
 */
export function grandfatheringUntil(
  userCreatedAt: Date | string | null | undefined,
  env: Record<string, string | undefined>,
  now: Date = new Date(),
): Date | null {
  const raw = env.COMMERCE_GRANDFATHERING_UNTIL
  if (!raw) return null
  const until = toDate(raw)
  if (!until || until.getTime() <= now.getTime()) return null

  const cutoffRaw = env.COMMERCE_GRANDFATHERING_CUTOFF
  if (cutoffRaw) {
    const cutoff = toDate(cutoffRaw)
    const created = toDate(userCreatedAt)
    if (cutoff && (!created || created.getTime() >= cutoff.getTime())) return null
  }
  return until
}
