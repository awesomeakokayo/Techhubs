import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { TRACKS } from '@/lib/tracks'
import { getAIEnrichedTrack } from '@/lib/ai-track'
import { ResourcesClient } from './ResourcesClient'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata: Metadata = getPageMetadata({
  title: 'Curated Tech Learning Resources',
  description:
    'Search a curated index of learning resources across technology tracks, including documentation, videos, practice tools, books and communities.',
  path: '/resources',
  keywords: ['tech learning resources', 'free learning resources', 'curated technology resources'],
})

export default function ResourcesPage() {
  // Build the catalog on the server. The browser receives only the fields the
  // resource index renders, not the full curriculum and quiz-bearing Track data.
  const tracks = TRACKS.map(getAIEnrichedTrack)
  const trackOptions = tracks.map(({ id, name }) => ({ id, name }))
  const resources = tracks.flatMap((track) =>
    track.resources.map((resource) => ({
      ...resource,
      trackName: track.name,
      trackId: track.id,
    })),
  )

  return (
    <>
      <PageViewTracker path="/resources" eventName="resources_page_open" />
      <ResourcesClient resources={resources} tracks={trackOptions} />
    </>
  )
}
