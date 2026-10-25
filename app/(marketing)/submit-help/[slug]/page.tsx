import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SUBMISSION_GUIDE_CONTENT } from '@/lib/seo/submission-guides'
import { getPageMetadata } from '@/lib/seo/utils'
import { ArticleLayout } from '@/components/seo/ArticleLayout'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import type { BreadcrumbItem } from '@/lib/seo/utils'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(SUBMISSION_GUIDE_CONTENT).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = SUBMISSION_GUIDE_CONTENT[params.slug]
  if (!guide) return { title: 'Guide Not Found' }
  return getPageMetadata({
    title: guide.seoTitle,
    description: guide.description,
    path: `/submit-help/${guide.slug}`,
    keywords: [`submit project ${guide.slug.replaceAll('-', ' ')}`],
    type: 'article',
    publishedTime: guide.publishedTime,
    modifiedTime: guide.modifiedTime,
  })
}

export default function SubmissionGuidePage({ params }: Props) {
  const guide = SUBMISSION_GUIDE_CONTENT[params.slug]
  if (!guide) notFound()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Project Submission Help', path: '/submit-help' },
    { label: guide.title },
  ]

  return (
    <>
      <PageViewTracker path={`/submit-help/${guide.slug}`} eventName="submit_help_guide_open" />
      <ArticleLayout page={guide} kind="Guide" path={`/submit-help/${guide.slug}`} breadcrumbs={breadcrumbs} />
    </>
  )
}
