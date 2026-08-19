import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getTrackById } from '@/lib/tracks'
import { CheckpointNode } from '@/components/ui/path'

const STAGES = ['Foundations', 'Core skills', 'Tools', 'Projects', 'Portfolio', 'Career']

export function RoadmapPreview() {
  const track = getTrackById('frontend')

  return (
    <section className="section bg-void">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Editorial copy */}
          <div>
            <p className="section-label">The roadmap</p>
            <h2 className="font-editorial text-display-lg">
              Structure you can see before you start.
            </h2>
            <p className="lead mt-5 max-w-none">
              A tutorial gives you a lesson. A roadmap gives you a path — each stage
              building on the last, with a clear end state. That is the difference
              between collecting knowledge and building competence.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2" aria-hidden>
              {STAGES.map((label, i) => (
                <div key={label} className="contents">
                  {i > 0 && (
                    <span
                      className="hidden sm:block h-px flex-1 min-w-[1rem]"
                      style={{ background: i <= 1 ? 'var(--accent-primary)' : 'var(--border-default)' }}
                    />
                  )}
                  <span
                    className={
                      'font-mono text-[0.6rem] uppercase tracking-widest ' +
                      (i <= 1 ? 'text-teal' : 'text-text-muted')
                    }
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/roadmaps"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
            >
              Browse all roadmaps <ArrowRight size={14} className="shrink-0" />
            </Link>
          </div>

          {/* Real roadmap — drawn from the catalogue */}
          <div className="panel !p-0 !border-0" aria-label="Example roadmap">
            <div className="border border-border-default bg-surface overflow-hidden" style={{ borderRadius: 'var(--radius-md)' }}>
              <div className="flex items-center justify-between border-b border-border-subtle px-4 sm:px-6 py-4">
                <span className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
                  Frontend Development
                </span>
                <Link
                  href="/tracks/frontend-development"
                  className="inline-flex items-center gap-1 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-teal no-underline hover:text-teal-bright"
                >
                  view whole path <ArrowRight size={12} className="shrink-0" />
                </Link>
              </div>

              <ol className="relative px-4 sm:px-6 py-6">
                {track?.roadmap.map((stage, i) => (
                  <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < track.roadmap.length - 1 && (
                      <span
                        className="absolute left-[13px] top-8 h-[calc(100%-1rem)] w-px"
                        style={{
                          background: i < 2 ? 'var(--accent-primary)' : 'var(--border-default)',
                        }}
                      />
                    )}
                    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6rem] font-semibold"
                      style={
                        i < 2
                          ? { borderColor: 'var(--accent-primary)', color: '#fff', background: 'var(--accent-primary)' }
                          : i === 2
                            ? { borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)', background: 'var(--bg-surface)' }
                            : {}
                      }
                    >
                      {i < 2 ? '✓' : i === 2 ? '03' : String(stage.id).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <p className="font-display text-sm font-semibold text-text-primary">{stage.title}</p>
                        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">
                          {stage.duration}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {stage.topics.length} topics · {stage.topics[0]}
                        {stage.topics[1] ? ` · ${stage.topics[1]}` : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}