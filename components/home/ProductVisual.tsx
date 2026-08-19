import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { getTrackById } from '@/lib/tracks'

/**
 * ProductVisual — Section 06 · Show, don't explain.
 *
 * One strong product visual (a live roadmap, drawn from the catalogue)
 * beneath an almost-rhythmic heading. Almost no copy.
 */
export function ProductVisual() {
  const track = getTrackById('frontend')
  const stages = track?.roadmap ?? []
  const shown = stages.slice(0, 4)

  return (
    <section className="border-t border-border-subtle bg-deep">
      <div className="container py-36 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label justify-center">How it works</p>
          <h2 className="font-editorial text-display-lg text-text-primary">
            You always know <span className="italic text-teal">what comes next.</span>
          </h2>
        </div>

        {/* Real product visual — a live roadmap stage list */}
        <div className="panel mt-16 !p-0 !border-0" aria-label="Example roadmap">
          <div
            className="overflow-hidden border border-border-default bg-surface"
            style={{ borderRadius: 'var(--radius-lg)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-6 py-4 sm:px-8">
              <span className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
                {track?.name ?? 'Learning track'}
              </span>
              <Link
                href={`/tracks/${track?.slug ?? ''}`}
                className="inline-flex items-center gap-1 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-teal no-underline hover:text-teal-bright"
              >
                view whole path <ArrowRight size={12} className="shrink-0" />
              </Link>
            </div>

            <ol className="px-6 py-6 sm:px-8">
              {shown.map((stage, i) => (
                <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0">
                  {i < shown.length - 1 && (
                    <span
                      className="absolute left-[15px] top-9 h-[calc(100%-1.25rem)] w-px"
                      style={{ background: 'var(--border-default)' }}
                    />
                  )}
                  <span
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[0.65rem] font-semibold"
                    style={{
                      borderColor: i < 2 ? 'var(--accent-primary)' : 'var(--border-default)',
                      color: i < 2 ? 'var(--text-inverse)' : 'var(--text-secondary)',
                      background: i < 2 ? 'var(--accent-primary)' : 'var(--bg-surface)',
                    }}
                  >
                    {i < 2 ? <Check size={14} strokeWidth={2.5} /> : String(stage.id).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-display text-sm font-semibold text-text-primary">{stage.title}</p>
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

        <p className="mt-8 text-center font-mono text-xs text-text-muted">
          No guessing which tutorial comes next. The path decides.
        </p>
      </div>
    </section>
  )
}