import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ExternalLink, Check } from 'lucide-react'
import { RESOURCE_PAGE_CONTENT } from '@/lib/seo/resource-pages'
import { getPageMetadata } from '@/lib/seo/utils'
import { ArticleLayout } from '@/components/seo/ArticleLayout'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { TrackedLink } from '@/components/ui/tracked-link'
import type { BreadcrumbItem } from '@/lib/seo/utils'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(RESOURCE_PAGE_CONTENT).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = RESOURCE_PAGE_CONTENT[params.slug]
  if (!page) return { title: 'Resource Not Found' }
  return getPageMetadata({
    title: page.seoTitle,
    description: page.description,
    path: `/resources/${page.slug}`,
    keywords: [page.title],
    type: 'article',
    publishedTime: page.publishedTime,
    modifiedTime: page.modifiedTime,
  })
}

export default function ResourcePage({ params }: Props) {
  const page = RESOURCE_PAGE_CONTENT[params.slug]
  if (!page) notFound()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Resources', path: '/resources' },
    { label: page.title },
  ]

  return (
    <>
      <PageViewTracker path={`/resources/${page.slug}`} eventName="resource_page_open" />
      <ArticleLayout
        page={page}
        kind="Resource"
        path={`/resources/${page.slug}`}
        breadcrumbs={breadcrumbs}
        afterCta={
          <section>
            <h2 className="font-editorial text-display-md mb-4">The curated list</h2>
            <ul className="space-y-3">
              {page.links.map((link) => (
                <li key={link.url} className="panel">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg text-text-primary">{link.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary">{link.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className={`badge ${link.free ? 'badge-green' : 'badge-amber'}`}>
                        {link.free ? 'Free' : 'Paid'}
                      </span>
                      <TrackedLink
                        href={link.url}
                        path={`/resources/${page.slug}`}
                        resourceTitle={link.title}
                        resourceType={link.kind}
                        className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
                      >
                        Visit <ExternalLink size={13} />
                      </TrackedLink>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        }
      />
    </>
  )
}