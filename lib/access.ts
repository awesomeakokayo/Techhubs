import { prisma } from '@/lib/prisma'
import { entitlementsEnforcedForUser, shadowEvaluationEnabled } from '@/lib/commercial/rollout'
import { premiumTrackIds } from '@/lib/commercial/plans'
import { decideTrackAccess, logShadowDecision } from '@/lib/commercial/shadow'
import { getEntitlementSnapshot } from '@/lib/commercial/service'
import type {
  AccessSource,
  PaymentProvider,
  SubscriptionPlan,
} from '@prisma/client'

export interface GrantInput {
  userId: string
  trackId: string
  plan: SubscriptionPlan
  provider: PaymentProvider
  reference: string
  source?: AccessSource
  days?: number
}

/**
 * Server-side access check for a track.
 *
 * Enforcement is DISABLED by default: neither `COMMERCE_ENTITLEMENTS_ENFORCED`
 * nor a pilot cohort is set, so this returns `true` and every learner keeps
 * exactly the access they have today. When (and only when) the commercial
 * transition and grandfathering rules are approved and enforcement is enabled —
 * globally or for a server-side pilot cohort — Premium tracks require a verified
 * Track Pass or Pro entitlement, derived server-side from provider-verified
 * state.
 *
 * When shadow evaluation is enabled (`COMMERCE_SHADOW_EVAL=true`) while
 * enforcement is off, the proposed premium decision is computed and a redacted
 * diagnostic is logged, but the returned value is still `true`: shadow mode can
 * never change access.
 *
 * A client-provided flag, badge or query parameter can never influence this.
 */
export async function hasTrackAccess(userId: string, trackId: string): Promise<boolean> {
  const enforced = entitlementsEnforcedForUser(userId)
  const shadow = !enforced && shadowEvaluationEnabled()
  if (!enforced && !shadow) return true

  const snapshot = await getEntitlementSnapshot(prisma, userId)
  const decision = decideTrackAccess({
    enforced,
    shadow,
    snapshot,
    trackId,
    premiumIds: premiumTrackIds(),
  })
  if (shadow) logShadowDecision(decision, { userId, trackId })
  return decision.allowed
}

/** Grant or extend per-course access for legacy compatibility. New learning
 * access does not require this function; it is retained so historical payment
 * records and account migrations do not break. */
export async function grantTrackAccess(input: GrantInput) {
  const days = input.days ?? 30
  const now = new Date()

  const existing = await prisma.trackAccess.findUnique({
    where: { userId_trackId: { userId: input.userId, trackId: input.trackId } },
    select: { expiresAt: true },
  })

  const base = existing && existing.expiresAt > now ? existing.expiresAt : now
  const expiresAt = new Date(base.getTime() + days * 24 * 60 * 60 * 1000)

  return prisma.trackAccess.upsert({
    where: { userId_trackId: { userId: input.userId, trackId: input.trackId } },
    create: {
      userId: input.userId,
      trackId: input.trackId,
      status: 'ACTIVE',
      source: input.source ?? 'PURCHASED',
      provider: input.provider,
      plan: input.plan,
      grantedAt: now,
      expiresAt,
      providerRef: input.reference,
    },
    update: {
      status: 'ACTIVE',
      source: input.source ?? 'PURCHASED',
      provider: input.provider,
      plan: input.plan,
      grantedAt: now,
      expiresAt,
      providerRef: input.reference,
    },
  })
}

export interface OwnedCourse {
  trackId: string
  status: string
  expiresAt: Date | null
  source: AccessSource
  provider: PaymentProvider
  plan: SubscriptionPlan
}

export interface TrackEntitlements {
  grandfathered: boolean
  grandfatheredUntil: Date | null
  owned: OwnedCourse[]
}

/** Legacy account entitlement data. Learning access is no longer paywalled. */
export async function getTrackEntitlements(userId: string): Promise<TrackEntitlements> {
  const now = new Date()

  const [sub, owned] = await Promise.all([
    prisma.subscription.findUnique({
      where: { userId },
      select: { status: true, currentPeriodEnd: true },
    }),
    prisma.trackAccess.findMany({
      where: { userId },
      orderBy: { expiresAt: 'desc' },
    }),
  ])

  const grandfathered =
    sub?.status === 'ACTIVE' &&
    !!sub.currentPeriodEnd &&
    sub.currentPeriodEnd > now

  return {
    grandfathered,
    grandfatheredUntil: sub?.currentPeriodEnd ?? null,
    owned: owned.map((a) => ({
      trackId: a.trackId,
      status: a.status,
      expiresAt: a.expiresAt,
      source: a.source,
      provider: a.provider,
      plan: a.plan,
    })),
  }
}

/** Only checks the legacy per-course TrackAccess row (used for historical UI). */
export async function getTrackAccess(userId: string, trackId: string) {
  return prisma.trackAccess.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
}
