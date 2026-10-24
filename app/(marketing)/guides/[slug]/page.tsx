import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { GUIDE_CONTENT } from '@/lib/seo/guides'
import { getPageMetadata } from '@/lib/seo/utils'
import { ArticleLayout } from '@/components/seo/ArticleLayout'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import type { BreadcrumbItem } from '@/lib/seo/utils'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(GUIDE_CONTENT).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = GUIDE_CONTENT[params.slug]
  if (!guide) return { title: 'Guide Not Found' }
  return getPageMetadata({
    title: guide.seoTitle,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: [`learn ${guide.slug.replaceAll('-', ' ')}`],
    type: 'article',
    publishedTime: guide.publishedTime,
    modifiedTime: guide.modifiedTime,
  })
}

export default function GuidePage({ params }: Props) {
  const guide = GUIDE_CONTENT[params.slug]
  if (!guide) notFound()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Guides', path: '/guides' },
    { label: guide.title },
  ]

  return (
    <>
      <PageViewTracker path={`/guides/${guide.slug}`} eventName="guide_page_open" />
      <ArticleLayout page={guide} kind="Guide" path={`/guides/${guide.slug}`} breadcrumbs={breadcrumbs} />
    </>
  )
}