import { notFound } from 'next/navigation'
import { getTrackBySlug, getTrackSlugs } from '@/lib/tracks'
import { TrackPageView } from '@/components/tracks/TrackPageView'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getTrackSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = getTrackBySlug(params.slug)
  if (!track) return { title: 'Track Not Found' }
  return {
    title: `${track.name} Roadmap & Resources | Tech Skills Hub`,
    description: track.tagline,
  }
}

export default function TrackPage({ params }: Props) {
  const track = getTrackBySlug(params.slug)
  if (!track) notFound()
  return <TrackPageView track={track} />
}
