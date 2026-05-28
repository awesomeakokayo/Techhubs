import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { ROADMAPS } from '@/lib/roadmaps'
import { PageHeader } from '@/components/ui/PageHeader'
import { AnimateIn } from '@/components/ui/AnimateIn'

export default function RoadmapsPage() {
  return (
    <div className="section pt-28">
      <div className="container">
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
                        <span className="text-text-muted shrink-0" aria-hidden>→</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-border-subtle pt-4">
                  <a
                    href={rm.roadmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-teal hover:underline"
                  >
                    View Full Roadmap <ExternalLink size={14} />
                  </a>
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
