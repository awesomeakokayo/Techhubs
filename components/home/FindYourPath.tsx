import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import { CATEGORIES, getTracksByCategory } from '@/lib/tracks'
import { TrackCard } from '@/components/tracks/TrackCard'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function FindYourPath() {
  return (
    <section className="section" id="tracks">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-label">Find your path</p>
            <h2 className="font-editorial text-display-lg">Find your direction.</h2>
            <p className="lead mt-4">
              Four families of work. Pick the one that pulls you. You can always change
              direction — the structure travels with you.
            </p>
          </div>
          <Link
            href="/start-here"
            className="inline-flex items-center gap-2 rounded-md border border-border-default px-4 py-2.5 text-sm font-semibold text-text-primary no-underline transition-colors hover:border-teal hover:text-teal"
          >
            <Compass size={16} className="shrink-0" />
            Not sure where to start?
            <ArrowRight size={14} className="shrink-0" />
          </Link>
        </div>

        <div className="mt-16 space-y-16">
          {CATEGORIES.map((category, catIndex) => {
            const tracks = getTracksByCategory(category.id)
            return (
              <AnimateIn key={category.id} delay={catIndex * 0.05}>
                <article className="border-t border-border-default pt-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-text-muted" aria-hidden>
                        {String(catIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="h-2.5 w-2.5 shrink-0 translate-y-[-2px] rounded-full" style={{ background: category.color }} aria-hidden />
                      <h3 className="font-editorial text-3xl">
                        {category.label.toLowerCase()}
                      </h3>
                      <span className="font-mono text-xs text-text-muted">{tracks.length} tracks</span>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-text-secondary">{category.description}</p>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {tracks.map((track) => (
                      <TrackCard key={track.id} track={track} />
                    ))}
                  </div>
                </article>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}