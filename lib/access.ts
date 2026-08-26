import { prisma } from '@/lib/prisma'
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
 * TechSkillHub learning is now fully free and open-source.
 *
 * The existing purchase/subscription tables remain available for historical
 * compatibility, but access to tracks and guided paths no longer depends on
 * payment state.
 */
export async function hasTrackAccess(_userId: string, _trackId: string): Promise<boolean> {
  return true
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
