'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionRail } from './SectionRail'

export interface DirectionTrack {
  id: string
  name: string
  slug: string
  tagline: string
  difficultyLabel: string
  stageCount: number
}

export interface Direction {
  id: string
  label: string
  description: string
  count: number
  tracks: DirectionTrack[]
}

/**
 * Five directions, one panel. Uses a real tablist with roving focus so the
 * interaction works with a keyboard and does not depend on hover.
 */
export function DirectionExplorer({ directions }: { directions: Direction[] }) {
  const [active, setActive] = useState(directions[0]?.id ?? 'build')
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()

    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % directions.length
    if (event.key === 'ArrowLeft') next = (index - 1 + directions.length) % directions.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = directions.length - 1

    const nextId = directions[next].id
    setActive(nextId)
    tabRefs.current[nextId]?.focus()
  }

  return (
    <section className="border-b border-hairline">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <SectionRail
            index="03"
            label="Five directions"
            note="You do not have to choose a career today. Choose a direction worth exploring."
          />

          <div className="md:col-span-9">
            <h2 className="landing-display max-w-2xl text-[clamp(2rem,4vw,3.4rem)]">
              Start where your <span className="landing-serif text-brand">curiosity</span>&nbsp;is.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              Each direction is a different way of working with technology. Open one to see
              the paths inside it, or use the quiz if you want a recommendation.
            </p>

            <div
              role="tablist"
              aria-label="Learning directions"
              className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            >
              {directions.map((direction, index) => (
                <button
                  key={direction.id}
                  ref={(node) => {
                    tabRefs.current[direction.id] = node
                  }}
                  type="button"
                  role="tab"
                  id={`direction-tab-${direction.id}`}
                  aria-selected={active === direction.id}
                  aria-controls={`direction-panel-${direction.id}`}
                  tabIndex={active === direction.id ? 0 : -1}
                  onClick={() => setActive(direction.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="landing-tab flex flex-col items-start rounded-[14px] px-4 py-3 text-left last:col-span-2 sm:last:col-span-1"
                >
                  <span className="landing-tab-index font-mono text-[0.6rem] tracking-[0.12em] text-ink/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-2 font-display text-sm font-semibold tracking-tight">
                    {direction.label}
                  </span>
                  <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] opacity-75">
                    {direction.count} {direction.count === 1 ? 'path' : 'paths'}
                  </span>
                </button>
              ))}
            </div>

            {directions.map((direction) => (
              <div
                key={direction.id}
                role="tabpanel"
                id={`direction-panel-${direction.id}`}
                aria-labelledby={`direction-tab-${direction.id}`}
                hidden={active !== direction.id}
                className="landing-module mt-4 overflow-hidden animate-fade-in"
              >
                <div className="grid md:grid-cols-12">
                  <div className="border-b border-hairline p-6 md:col-span-5 md:border-b-0 md:border-r">
                    <p className="landing-index">Direction / {direction.label}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                      {direction.description}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-ink/70">
                      {direction.count} learning {direction.count === 1 ? 'path' : 'paths'} in
                      this direction. Every path is sequenced into stages, resources and
                      projects.
                    </p>
                    <Link href={`/paths/${direction.id}`} className="landing-arrow mt-8">
                      Explore {direction.label}{' '}
                      <ArrowUpRight size={14} className="shrink-0" />
                    </Link>
                  </div>

                  <ul className="md:col-span-7">
                    {direction.tracks.map((track) => (
                      <li key={track.id} className="border-b border-hairline last:border-b-0">
                        <Link
                          href={`/tracks/${track.slug}`}
                          className="group flex items-start justify-between gap-4 p-5 no-underline transition-colors hover:bg-void"
                        >
                          <span className="min-w-0">
                            <span className="block font-display text-base font-semibold text-ink transition-colors group-hover:text-brand">
                              {track.name}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-ink/70">
                              {track.tagline}
                            </span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink/70">
                              {track.difficultyLabel}
                            </span>
                            <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink/70">
                              {track.stageCount} stages
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
