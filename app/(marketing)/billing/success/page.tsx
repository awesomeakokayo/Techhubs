import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, Clock } from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getEntitlementSnapshot, getOrderByReference, getTrackPasses } from '@/lib/commercial/service'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Payment status',
  robots: { index: false, follow: false },
}

/**
 * Post-checkout landing page.
 *
 * It does NOT grant access and does not trust the redirect. It looks up the
 * internal order and the learner's server-derived entitlement. If the provider
 * webhook has not arrived yet, it shows a "confirming" state; the entitlement
 * appears once verified.
 */
export default async function BillingSuccessPage({ searchParams }: { searchParams: { reference?: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?next=/pricing')

  const reference = typeof searchParams?.reference === 'string' ? searchParams.reference : null
  const order = reference ? await getOrderByReference(prisma, reference) : null
  // Only the owner may view their order.
  const ownedOrder = order && order.userId === session.user.id ? order : null
  const snapshot = await getEntitlementSnapshot(prisma, session.user.id)
  const passes = await getTrackPasses(prisma, session.user.id)
  const activePass = passes.find((pass) => pass.active) ?? null

  const paid = ownedOrder?.status === 'PAID'
  const pending = ownedOrder?.status === 'PENDING'

  return (
    <div className="section pt-16">
      <div className="container max-w-xl">
        <PageViewTracker path="/billing/success" eventName="billing_success_open" />
        <div className="card text-center">
          {paid ? (
            <>
              <CheckCircle2 size={32} className="mx-auto text-teal" />
              <h1 className="mt-4 font-display text-2xl font-semibold text-text-primary">Payment confirmed</h1>
              <p className="mt-2 text-sm text-text-secondary">Your purchase is verified and your access has been updated.</p>
            </>
          ) : (
            <>
              <Clock size={32} className="mx-auto text-amber-500" />
              <h1 className="mt-4 font-display text-2xl font-semibold text-text-primary">{pending ? 'Confirming your payment' : 'Checking your payment'}</h1>
              <p className="mt-2 text-sm text-text-secondary">
                Your payment is being verified with the provider. This usually takes a few moments. Access is granted only after verification — never by this page.
              </p>
            </>
          )}

          <div className="mt-6 rounded-md border border-border-subtle p-3 text-left text-sm">
            <p className="text-text-muted text-xs uppercase tracking-wide">Your plan</p>
            <p className="mt-1 text-text-primary font-medium">{snapshot.tier === 'PRO' ? 'TechSkillHub Pro' : snapshot.tier === 'PASS' ? 'Track Pass' : 'Free'}</p>
            {activePass && (
              <p className="mt-1 text-xs text-text-secondary">
                Track Pass access to <span className="text-text-primary">{activePass.trackId}</span> until{' '}
                <span className="font-mono">{activePass.expiresAt.slice(0, 10)}</span> (UTC). No automatic renewal.
              </p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              Assessments this month: <span className="font-mono">{snapshot.assessmentAllowance}</span> included
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/account" className="btn btn-primary text-sm">Go to your account</Link>
            <Link href="/tracks" className="btn btn-secondary text-sm">Browse tracks</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
