import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { TRACKS } from '@/lib/tracks'
import { getTrackEntitlements } from '@/lib/access'
import { AccountClient } from './AccountClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Account | Tech Skill Hub',
  description: 'Manage your profile, courses, and learning progress.',
}

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [subscription, entitlements] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId: session.user.id } }),
    getTrackEntitlements(session.user.id),
  ])

  const serialized = subscription
    ? {
        status: subscription.status,
        plan: subscription.plan,
        currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
        paystackSubscriptionCode: subscription.paystackSubscriptionCode,
      }
    : null

  const owned = entitlements.owned.map((o) => ({
    trackId: o.trackId,
    status: o.status,
    expiresAt: o.expiresAt?.toISOString() ?? null,
    source: o.source,
    provider: o.provider,
    plan: o.plan,
  }))

  return (
    <AccountClient
      subscription={serialized}
      user={session.user}
      tracks={TRACKS}
      owned={owned}
      grandfathered={entitlements.grandfathered}
      grandfatheredUntil={entitlements.grandfatheredUntil?.toISOString() ?? null}
    />
  )
}