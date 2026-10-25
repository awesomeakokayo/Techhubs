import { getTrackById } from '@/lib/tracks'
import { GuidedPathClient, type TrackMeta } from './GuidedPathClient'

/**
 * Server wrapper: resolves lightweight track metadata so the client lesson
 * component never bundles the full track catalogue.
 */
export default function GuidedPathPage({ params }: { params: { trackId: string } }) {
  const track = getTrackById(params.trackId)
  const trackMeta: TrackMeta | null = track
    ? {
        id: track.id,
        name: track.name,
        slug: track.slug,
        icon: track.icon,
        colorHex: track.colorHex,
        category: track.category,
        stages: track.roadmap.map((stage) => ({ id: stage.id, title: stage.title })),
      }
    : null

  return <GuidedPathClient trackId={params.trackId} trackMeta={trackMeta} />
}
