import { notFound } from 'next/navigation'
import { getTrackBySlug, TRACKS } from '@/lib/tracks'
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
  return getPageMetadata({
    title: `${track.name}: Path, Roadmap & Resources`,
    description: `${track.tagline} Follow the ${track.name.toLowerCase()} roadmap with curated free resources, projects and career guidance.`,
    path: `/tracks/${track.slug}`,
    keywords: [`${track.name.toLowerCase()} roadmap`, `${track.name.toLowerCase()} learning path`],
    type: 'article',
  })
}

export function generateStaticParams(): { slug: string }[] {
  return TRACKS.map((t) => ({ slug: t.slug }))
}

export default async function TrackPage({ params }: Props) {
  const track = getTrackBySlug(params.slug)
  if (!track) notFound()

  return (
    <>
      <PageViewTracker path={`/tracks/${track.slug}`} eventName="track_page_open" />
      <TrackPageView track={track} />
    </>
  )
}
