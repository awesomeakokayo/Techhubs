'use client'

import Link from 'next/link'
import Image from 'next/image'
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

// Free Pexels stock photos. Images are illustrative and do not depict TechSkillHub learners or imply endorsement.
const DIRECTION_VISUALS: Record<string, { image: string; alt: string }> = {
  build: {
    image: 'https://images.pexels.com/photos/3880924/pexels-photo-3880924.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Black professional concentrating while working on a laptop',
  },
  design: {
    image: 'https://images.pexels.com/photos/7971542/pexels-photo-7971542.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Black woman focused on work at a laptop in a modern office',
  },
  analyze: {
    image: 'https://images.pexels.com/photos/8204353/pexels-photo-8204353.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Black woman concentrating while working at a computer',
  },
  grow: {
    image: 'https://images.pexels.com/photos/9430884/pexels-photo-9430884.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Black colleagues discussing a project around a table',
  },
  ai: {
    image: 'https://images.pexels.com/photos/6974804/pexels-photo-6974804.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Black professional working thoughtfully on a laptop',
  },
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
                  className="landing-tab group overflow-hidden rounded-[14px] p-0 text-left last:col-span-2 sm:last:col-span-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand">
                    <Image
                      src={DIRECTION_VISUALS[direction.id]?.image ?? DIRECTION_VISUALS.build.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 18vw"
                      quality={55}
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <span className="absolute left-3 top-3 font-mono text-[0.6rem] tracking-[0.12em] text-white/90">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 font-display text-base font-semibold tracking-tight text-white">
                      {direction.label}
                    </span>
                  </div>
                  <span className="flex items-center justify-between gap-3 px-3.5 py-3">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink/70">
                      {direction.count} {direction.count === 1 ? 'path' : 'paths'}
                    </span>
                    <ArrowUpRight size={13} className="shrink-0 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                    <div
                      aria-hidden="true"
                      className="relative -mx-6 -mt-6 mb-5 h-36 overflow-hidden bg-brand md:h-44"
                    >
                      <Image
                        src={DIRECTION_VISUALS[direction.id]?.image ?? DIRECTION_VISUALS.build.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        quality={58}
                        loading="lazy"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                    </div>
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
