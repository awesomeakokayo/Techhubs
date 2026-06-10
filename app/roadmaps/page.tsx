import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { ROADMAPS } from '@/lib/roadmaps'
import { PageHeader } from '@/components/ui/PageHeader'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { TrackedLink } from '@/components/ui/tracked-link'

export default function RoadmapsPage() {
  return (
    <div className="section pt-28">
      <div className="container">
        <PageViewTracker path="/roadmaps" eventName="roadmap_page_open" />
        <PageHeader
          title="Visual Roadmaps"
          subtitle="Where you're going before you start walking."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Roadmaps' }]}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROADMAPS.map((rm, i) => (
            <AnimateIn key={rm.id} delay={i * 0.04}>
              <article className="card flex h-full flex-col">
                <h2 className="font-display text-lg font-bold">{rm.title}</h2>
                <p className="mt-2 flex-1 text-sm text-text-secondary">{rm.description}</p>

                <div className="mt-6 flex items-center gap-2">
                  {rm.stages.map((stage, si) => (
                    <div key={stage} className="flex items-center gap-2 flex-1 min-w-0">
                      <span
                        className="truncate rounded-full px-2 py-1 text-[0.65rem] font-mono uppercase"
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

                <div className="mt-6 flex flex-wrap gap-3 border-t border-border-subtle pt-4">
                  <TrackedLink
                    href={rm.roadmapUrl}
                    className="inline-flex items-center gap-1 text-sm text-teal hover:underline"
                    path="/roadmaps"
                    trackSlug={rm.trackSlug}
                    resourceTitle={rm.title}
                    resourceType="roadmap"
                  >
                    View Full Roadmap <ExternalLink size={14} />
                  </TrackedLink>
                  {rm.trackSlug && (
                    <Link
                      href={`/tracks/${rm.trackSlug}`}
                      className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-teal"
                    >
                      Explore Track <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  )
}
