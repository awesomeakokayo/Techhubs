import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTrackById } from '@/lib/tracks'
import { PurchaseClient } from './PurchaseClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Free Learning | TechSkillHub',
  robots: { index: false, follow: false },
}

export default function PurchasePage({ params }: { params: { trackId: string } }) {
  const track = getTrackById(params.trackId)
  if (!track) notFound()

  return (
    <PurchaseClient
      trackId={track.id}
      trackName={track.name}
      trackSlug={track.slug}
    />
  )
}
