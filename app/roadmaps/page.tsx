import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { ROADMAPS } from '@/lib/roadmaps'
import { getPageMetadata, itemListJsonLd } from '@/lib/seo/utils'
import { PageHeader } from '@/components/ui/PageHeader'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { StructuredData } from '@/components/seo/StructuredData'
import { RelatedContent } from '@/components/seo/RelatedContent'

export const metadata: Metadata = getPageMetadata({
  title: 'Tech Roadmaps: Learn Skills in the Right Order',
  description:
    'Structured technology roadmaps for frontend, backend, full-stack, Python, JavaScript, data, AI and more — with curated free resources and projects at every stage.',
  path: '/roadmaps',
  keywords: ['tech roadmap', 'programming roadmap', 'web development roadmap', 'developer roadmap'],
})

export default function RoadmapsPage() {
  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/roadmaps" eventName="roadmap_page_open" />
        <StructuredData
          blocks={[
            itemListJsonLd(
              ROADMAPS.map((rm) => ({ name: rm.title, path: `/roadmaps/${rm.trackSlug ?? rm.id}` }))
            ),
          ]}
        />
        <PageHeader
          title="Technology Roadmaps"
          subtitle="Know exactly what to learn next. Every roadmap sequences the skills, curates free resources and ends in projects you can build."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Roadmaps' }]}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAPS.map((rm, i) => (
            <article key={rm.id} className="card flex h-full flex-col">
              <Link href={`/roadmaps/${rm.trackSlug ?? rm.id}`} className="no-underline">
                <h2 className="font-display text-lg font-bold text-text-primary hover:text-teal">
                  {rm.title}
                </h2>
              </Link>
              <p className="mt-2 flex-1 text-sm text-text-secondary">{rm.description}</p>

              <div className="mt-6 flex items-center gap-2">
                {rm.stages.map((stage, si) => (
                  <div key={stage} className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className="truncate rounded-md px-2 py-1 text-[0.65rem] font-mono uppercase"
                      style={{
                        backgroundColor: si === rm.stages.length - 1 ? `${rm.colorHex}25` : 'var(--bg-overlay)',
                        color: si === rm.stages.length - 1 ? rm.colorHex : 'var(--text-muted)',
                      }}
                    >
                      {stage}
                    </span>
                    {si < rm.stages.length - 1 && (
                      <ArrowRight size={12} className="text-text-muted shrink-0" aria-hidden />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-4">
                <Link
                  href={`/roadmaps/${rm.trackSlug ?? rm.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
                >
                  View Roadmap <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-border-subtle pt-12">
          <RelatedContent
            title="Start learning"
            links={[
              { title: 'Not sure where to start?', href: '/start', description: 'Answer a few questions and get a recommended path.' },
              { title: 'Learning guides', href: '/guides', description: 'Direct answers to the questions every learner asks.' },
              { title: 'Build real projects', href: '/projects', description: 'Turn every roadmap into evidence of skill.' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}