import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { TRACKS } from '@/lib/tracks'
import { getTrackEntitlements } from '@/lib/access'
import { getGuidedPathSummaries } from '@/lib/learner-overview'
import { getChecklistItems } from '@/lib/checklist-store'
import { AccountClient } from './AccountClient'
import { BillingStatusCard } from '@/components/commercial/BillingStatusCard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Account | TechSkillHub',
  description: 'Manage your profile, courses, and learning progress.',
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const userId = session.user.id

  const [subscription, entitlements, completions, guidedPaths, checklistItems] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId } }),
    getTrackEntitlements(userId),
    prisma.courseCompletion.findMany({
      where: { userId },
      select: { trackId: true },
    }),
    getGuidedPathSummaries(prisma, userId),
    getChecklistItems(prisma, userId),
  ])

  const checklistSummary = {
    stages: checklistItems.filter((item) => item.kind === 'STAGE' && item.isCompleted).length,
    projects: checklistItems.filter((item) => item.kind === 'PROJECT' && item.isCompleted).length,
  }

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
      completedTrackIds={completions.map((c) => c.trackId)}
      guidedPaths={guidedPaths}
      checklistSummary={checklistSummary}
      billingSlot={<BillingStatusCard />}
    />
  )
}
