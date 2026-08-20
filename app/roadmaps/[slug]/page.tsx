import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTrackBySlug, TRACKS } from '@/lib/tracks'
import { EXTRA_ROADMAPS, ROADMAP_SLUG_ALIASES, resolveRoadmapSlug } from '@/lib/seo/roadmaps'
import { getPageMetadata } from '@/lib/seo/utils'
import { RoadmapLayout, trackToRoadmap, customRoadmapToLayout } from '@/components/seo/RoadmapLayout'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import type { BreadcrumbItem } from '@/lib/seo/utils'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  const slugs = new Set<string>()
  for (const track of TRACKS) slugs.add(track.slug)
  for (const rm of Object.values(EXTRA_ROADMAPS)) slugs.add(rm.slug)
  for (const alias of Object.keys(ROADMAP_SLUG_ALIASES)) slugs.add(alias)
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = resolveRoadmapSlug(params.slug)
  const track = getTrackBySlug(slug)
  const custom = EXTRA_ROADMAPS[slug]

  if (track) {
    const title = `${track.name} Roadmap for Beginners: Learn ${track.name} Step by Step`
    return getPageMetadata({
      title,
      description: `${track.overview.description} Follow the ${track.name.toLowerCase()} roadmap with curated free resources and projects.`,
      path: `/roadmaps/${params.slug}`,
      keywords: [`${track.name.toLowerCase()} roadmap`, 'roadmap for beginners'],
      type: 'article',
    })
  }

  if (custom) {
    return getPageMetadata({
      title: custom.seoTitle,
      description: custom.description,
      path: `/roadmaps/${params.slug}`,
      keywords: [`${custom.slug} roadmap`, 'roadmap for beginners'],
      type: 'article',
      publishedTime: custom.publishedTime,
      modifiedTime: custom.modifiedTime,
    })
  }

  return { title: 'Roadmap Not Found' }
}

export default function RoadmapPage({ params }: Props) {
  const slug = resolveRoadmapSlug(params.slug)
  const track = getTrackBySlug(slug)
  const custom = EXTRA_ROADMAPS[slug]
  if (!track && !custom) notFound()

  const label = track ? track.name : custom!.title
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Roadmaps', path: '/roadmaps' },
    { label },
  ]

  const shared = {
    path: `/roadmaps/${params.slug}`,
    breadcrumbs,
    ctaHref: track ? `/tracks/${track.slug}` : `/start`,
  }

  return (
    <>
      <PageViewTracker path={`/roadmaps/${params.slug}`} eventName="roadmap_page_open" />
      <RoadmapLayout
        {...shared}
        journeySlug={slug}
        {...(track ? trackToRoadmap(track) : customRoadmapToLayout(custom!))}
      />
    </>
  )
}