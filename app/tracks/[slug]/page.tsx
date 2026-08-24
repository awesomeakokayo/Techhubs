import { notFound } from 'next/navigation'
import { getTrackBySlug, TRACKS } from '@/lib/tracks'
import { getAIEnrichedTrack } from '@/lib/ai-track'
import { TrackPageView } from '@/components/tracks/TrackPageView'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = getTrackBySlug(params.slug)
  if (!track) return { title: 'Track Not Found' }
  const enrichedTrack = getAIEnrichedTrack(track)
  return getPageMetadata({
    title: `${enrichedTrack.name}: Path, Roadmap & Resources`,
    description: `${enrichedTrack.tagline} Follow the ${enrichedTrack.name.toLowerCase()} roadmap with curated free resources, projects and career guidance.`,
    path: `/tracks/${enrichedTrack.slug}`,
    keywords: [`${enrichedTrack.name.toLowerCase()} roadmap`, `${enrichedTrack.name.toLowerCase()} learning path`],
    type: 'article',
  })
}

export function generateStaticParams(): { slug: string }[] {
  return TRACKS.map((t) => ({ slug: t.slug }))
}

export default async function TrackPage({ params }: Props) {
  const track = getTrackBySlug(params.slug)
  if (!track) notFound()
  const enrichedTrack = getAIEnrichedTrack(track)

  return (
    <>
      <PageViewTracker path={`/tracks/${enrichedTrack.slug}`} eventName="track_page_open" />
      <TrackPageView track={enrichedTrack} />
    </>
  )
}
