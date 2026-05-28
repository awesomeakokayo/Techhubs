import { CATEGORIES, getTracksByCategory } from '@/lib/tracks'
import { TrackCard } from '@/components/tracks/TrackCard'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function TrackCategories() {
  return (
    <section className="section" id="tracks">
      <div className="container">
        <AnimateIn>
          <p className="section-label">Learning paths</p>
          <h2 className="font-display text-display-md font-bold">Choose Your Path</h2>
          <p className="mt-3 max-w-2xl text-lg text-text-secondary">
            Pick the area that excites you. Every path leads somewhere real.
          </p>
        </AnimateIn>

        <div className="mt-16 space-y-16">
          {CATEGORIES.map((category, catIndex) => {
            const tracks = getTracksByCategory(category.id)
            return (
              <AnimateIn key={category.id} delay={catIndex * 0.05}>
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="h-1 w-8 rounded-full"
                      style={{ backgroundColor: category.color }}
                      aria-hidden
                    />
                    <h3
                      className="font-mono text-sm font-medium tracking-widest"
                      style={{ color: category.color }}
                    >
                      {category.label}
                    </h3>
                    <span className="text-sm text-text-muted">— {category.description}</span>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tracks.map((track) => (
                      <TrackCard key={track.id} track={track} />
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
