import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import {
  checkAssessmentAllowance,
  getEntitlementSnapshot,
  getTrackPasses,
} from '@/lib/commercial/service'
import { checkoutEnabled } from '@/lib/commercial/providers'
import { pricesApprovedForPublication } from '@/lib/commercial/pricing'

export const dynamic = 'force-dynamic'

/**
 * The learner's own plan, entitlement and assessment-usage status. Server-derived
 * only: the client can never assert its own entitlement.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const [snapshot, allowance, trackPasses] = await Promise.all([
    getEntitlementSnapshot(prisma, session.user.id),
    checkAssessmentAllowance(prisma, session.user.id),
    // Server-derived purchase periods (start/expiry). Read-only for display.
    getTrackPasses(prisma, session.user.id),
  ])

  return NextResponse.json({
    tier: snapshot.tier,
    hasAllPremiumTracks: snapshot.hasAllPremiumTracks,
    ownedTrackIds: snapshot.ownedTrackIds,
    grandfathered: snapshot.grandfathered,
    grandfatheredUntil: snapshot.grandfatheredUntil,
    subscriptionStatus: snapshot.subscriptionStatus,
    currentPeriodEnd: snapshot.currentPeriodEnd,
    cancelAtPeriodEnd: snapshot.cancelAtPeriodEnd,
    trackPasses,
    assessments: {
      // used = consumed + active reservations, from the durable ledger.
      used: allowance.used,
      reserved: allowance.reserved,
      remaining: allowance.remaining,
      allowance: snapshot.assessmentAllowance,
      enforced: allowance.enforced,
    },
    // Presentation-only flags. Neither enables access.
    checkoutEnabled: checkoutEnabled(),
    pricesApproved: pricesApprovedForPublication(),
  })
}
