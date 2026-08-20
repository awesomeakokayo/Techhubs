import { ArrowRight } from 'lucide-react'
import { SeoPage, ContentBlock } from '@/lib/seo/content-types'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { StructuredData } from './StructuredData'
import { RelatedContent } from './RelatedContent'
import { ContentFeedback } from './ContentFeedback'
import { LearningFunnel } from './LearningFunnel'
import { CtaLink } from './CtaLink'
import { ContentViewTracker } from './ContentViewTracker'
import { getJourneyForSlug } from '@/lib/seo/journeys'
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  BreadcrumbItem,
} from '@/lib/seo/utils'

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case 'paragraph':
      return <p>{block.text}</p>
    case 'callout':
      return (
        <div className="rounded-r-md border-l-4 border-l-teal bg-teal-50 px-5 py-4">
          <p className="text-text-primary">{block.text}</p>
        </div>
      )
    case 'list':
      return (
        <ul className="list-disc space-y-2 pl-5 text-text-secondary">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'numbered':
      return (
        <ol className="list-decimal space-y-2 pl-5 text-text-secondary">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )
    case 'steps':
      return (
        <ol className="space-y-5">
          {block.items.map((item, i) => (
            <li key={i} className="panel">
              <div className="flex items-start gap-4">
                <span className="path-node is-active mt-0.5 shrink-0">{i + 1}</span>
                <div>
                  <h4 className="font-display text-lg text-text-primary">{item.title}</h4>
                  <p className="mt-1">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )
    default:
      return null
  }
}

interface ArticleLayoutProps {
  page: SeoPage
  kind: 'Guide' | 'Career Path' | 'Resource'
  path: string
  breadcrumbs: BreadcrumbItem[]
  extraJsonLd?: string[]
  afterCta?: React.ReactNode
}

export function ArticleLayout({
  page,
  kind,
  path,
  breadcrumbs,
  extraJsonLd = [],
  afterCta,
}: ArticleLayoutProps) {
  const journey = getJourneyForSlug(page.slug)
  return (
    <article className="section pt-16">
      <div className="container">
        <ContentViewTracker path={path} contentType={kind === 'Guide' ? 'guide' : kind === 'Career Path' ? 'career' : 'resource'} />
        <StructuredData
          blocks={[
            articleJsonLd({
              title: page.title,
              description: page.description,
              path,
              publishedTime: page.publishedTime,
              modifiedTime: page.modifiedTime,
            }),
            breadcrumbJsonLd(breadcrumbs),
            faqJsonLd(page.faqs),
            ...extraJsonLd,
          ]}
        />

        <Breadcrumbs
          items={breadcrumbs.map((b) => ({ label: b.label, href: b.path }))}
        />

        <header className="mb-10">
          <span className="section-label">{kind}</span>
          <h1 className="font-editorial text-display-xl max-w-3xl">{page.title}</h1>
          {page.audiences.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {page.audiences.map((aud) => (
                <span key={aud} className="badge badge-teal">
                  {aud}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="panel mb-8 border-l-teal">
          <p className="lead font-medium text-text-primary">{page.openingAnswer}</p>
        </div>

        <p className="lead mb-10 max-w-3xl">{page.intro}</p>

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-editorial text-display-md mb-4">{section.heading}</h2>
                <div className="space-y-4">
                  {section.blocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {page.faqs.length > 0 && (
              <section>
                <h2 className="font-editorial text-display-md mb-4">Frequently asked questions</h2>
                <div className="space-y-4">
                  {page.faqs.map((faq) => (
                    <details key={faq.question} className="panel group open:border-teal">
                      <summary className="cursor-pointer list-none text-text-primary font-medium">
                        <span className="flex items-center justify-between gap-4">
                          {faq.question}
                          <ArrowRight size={16} className="shrink-0 rotate-90 text-text-muted transition-transform group-open:rotate-0" />
                        </span>
                      </summary>
                      <p className="mt-3">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {page.cta && (
              <div className="panel border-teal">
                <p className="font-display text-xl text-text-primary">
                  Ready to start? Follow the TechSkillHub roadmap.
                </p>
                <CtaLink
                  href={page.cta.href}
                  label={page.cta.label}
                  trackingPath={path}
                  className="btn btn-primary mt-4 inline-flex items-center gap-2"
                />
              </div>
            )}

            {afterCta}

            {journey && <LearningFunnel journey={journey} currentHref={path} trackingPath={path} />}

            <div className="border-t border-border-subtle pt-8 text-sm text-text-muted">
              <p>Last reviewed: {page.modifiedTime.slice(0, 10)}</p>
              <p className="mt-1">Written by TechSkillHub</p>
            </div>

            <ContentFeedback path={path} contentType={kind.toLowerCase()} />
          </div>

          <aside className="hidden lg:block overflow-hidden">
            <RelatedContent title="Related" links={page.related} sidebar />
          </aside>
        </div>

        <div className="lg:hidden">
          <RelatedContent links={page.related} />
        </div>
      </div>
    </article>
  )
}