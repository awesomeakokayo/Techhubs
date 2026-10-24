import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CAREER_CONTENT } from '@/lib/seo/careers'
import { getPageMetadata } from '@/lib/seo/utils'
import { ArticleLayout } from '@/components/seo/ArticleLayout'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import type { BreadcrumbItem } from '@/lib/seo/utils'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(CAREER_CONTENT).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const career = CAREER_CONTENT[params.slug]
  if (!career) return { title: 'Career Guide Not Found' }
  return getPageMetadata({
    title: career.seoTitle,
    description: career.description,
    path: `/careers/${career.slug}`,
    keywords: [`${career.slug.replaceAll('-', ' ')} career`],
    type: 'article',
    publishedTime: career.publishedTime,
    modifiedTime: career.modifiedTime,
  })
}

export default function CareerPage({ params }: Props) {
  const career = CAREER_CONTENT[params.slug]
  if (!career) notFound()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Careers', path: '/careers' },
    { label: career.title },
  ]

  return (
    <>
      <PageViewTracker path={`/careers/${career.slug}`} eventName="career_page_open" />
      <ArticleLayout
        page={career}
        kind="Career Path"
        path={`/careers/${career.slug}`}
        breadcrumbs={breadcrumbs}
      />
    </>
  )
}