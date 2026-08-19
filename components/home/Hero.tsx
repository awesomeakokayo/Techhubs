import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getProductStats } from '@/lib/tracks'

const ROUTE = [
  { index: 1, label: 'Choose your direction', caption: 'Pick a track you can commit to.' },
  { index: 2, label: 'Follow the roadmap', caption: 'A clear sequence — no guessing.' },
  { index: 3, label: 'Build real projects', caption: 'Turn knowledge into evidence.' },
  { index: 4, label: 'Show the work', caption: 'Portfolio, career, the next step.' },
]

export function Hero() {
  const stats = getProductStats()

  return (
    <section className="border-b border-border-subtle bg-deep">
      <div className="container grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ── Editorial copy ── */}
        <div>
          <p className="section-label">Independent learning system</p>
          <h1 className="font-editorial text-display-xl">
            Learn <span className="italic">independently.</span>
          </h1>
          <p className="lead mt-6 max-w-xl">
            A structured path for people building real skills in technology — without
            bootcamp schedules, classroom pacing, or endless searching for the next
            tutorial.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/start-here" className="btn btn-primary inline-flex items-center gap-2">
              Find your path <ArrowRight size={16} className="shrink-0" />
            </Link>
            <Link href="/tracks" className="btn btn-secondary">
              Explore tracks
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-text-muted">
            <span className="text-text-primary">{stats.trackCount} tracks</span>
            <span aria-hidden className="h-3 w-px bg-border-default" />
            <span>{stats.resourceCount} curated resources</span>
            <span aria-hidden className="h-3 w-px bg-border-default" />
            <span>100% free</span>
          </div>
        </div>

        {/* ── The PATH visual ── */}
        <div className="panel !px-0 !py-0 !border-0" aria-hidden>
          <div className="border border-border-default bg-surface" style={{ borderRadius: 'var(--radius-md)' }}>
            <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
              <span className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
                Your path
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent-primary)' }} />
                direction
              </span>
            </div>

            <ol className="px-6 py-6">
              {ROUTE.map((step, i) => (
                <li key={step.index} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < ROUTE.length - 1 && (
                    <span
                      className="absolute left-[13px] top-8 h-[calc(100%-1rem)] w-px"
                      style={{ background: 'var(--border-default)' }}
                    />
                  )}
                  <span
                    className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.65rem] font-semibold"
                    style={{
                      borderColor: 'var(--accent-primary)',
                      color: 'var(--accent-primary)',
                      background: 'var(--bg-surface)',
                    }}
                  >
                    {String(step.index).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-display text-sm font-semibold text-text-primary">{step.label}</p>
                    <p className="text-xs leading-snug text-text-muted">{step.caption}</p>
                    {i === 3 && (
                      <span className="mt-2 inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-widest text-teal">
                        career <ArrowUpRight size={12} className="shrink-0" />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}