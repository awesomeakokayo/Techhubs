import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { auth } from '@/auth'
import { getTrackById } from '@/lib/tracks'
import { PRICING, resolvePricingContext } from '@/lib/pricing'
import type { RegionKey } from '@/lib/pricing'
import { getTrackEntitlements } from '@/lib/access'
import { getIpCountryFromHeaders } from '@/lib/payments'
import { PurchaseClient } from './PurchaseClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Purchase | TechSkillHub',
  robots: { index: false, follow: false },
}

export default async function PurchasePage({ params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect(`/login?next=/purchase/${params.trackId}`)
  }

  const track = getTrackById(params.trackId)
  if (!track) notFound()

  const ctx = resolvePricingContext({ ipCountry: getIpCountryFromHeaders(headers() as unknown as Headers) })
  const region: RegionKey = ctx.region

  const entitlements = await getTrackEntitlements(session.user.id)
  const owned = entitlements.owned.find(
    (o) =>
      o.trackId === params.trackId &&
      o.status === 'ACTIVE' &&
      (!o.expiresAt || o.expiresAt > new Date())
  )
  const hasAccess = entitlements.grandfathered || !!owned

  return (
    <PurchaseClient
      trackId={track.id}
      trackName={track.name}
      trackSlug={track.slug}
      region={region}
      regionLabel={ctx.regionLabel}
      currency={PRICING[region].currency}
      hasAccess={hasAccess}
      grandfathered={entitlements.grandfathered}
    />
  )
}