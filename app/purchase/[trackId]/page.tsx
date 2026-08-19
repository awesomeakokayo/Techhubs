import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { auth } from '@/auth'
import { getTrackById } from '@/lib/tracks'
import { detectRegion } from '@/lib/pricing'
import { hasTrackAccess, getTrackEntitlements } from '@/lib/access'
import { PurchaseClient } from './PurchaseClient'

export const dynamic = 'force-dynamic'

export default async function PurchasePage({ params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect(`/login?next=/purchase/${params.trackId}`)
  }

  const track = getTrackById(params.trackId)
  if (!track) notFound()

  const region = detectRegion(headers() as unknown as Headers)

  const hasAccess = await hasTrackAccess(session.user.id, params.trackId)
  const entitlements = await getTrackEntitlements(session.user.id)

  return (
    <PurchaseClient
      trackId={track.id}
      trackName={track.name}
      trackSlug={track.slug}
      region={region}
      hasAccess={hasAccess}
      grandfathered={entitlements.grandfathered}
    />
  )
}