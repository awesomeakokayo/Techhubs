import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react'
import { LogoMark } from '@/components/brand/Logo'
import { CtaLink } from './CtaLink'

export interface HeroStage {
  id: number
  title: string
  duration: string
  topics: string[]
}

export interface HeroTrack {
  name: string
  slug: string
  difficultyLabel: string
  timeEstimate: string
  resourceCount: number
  stages: HeroStage[]
}

interface LandingHeroProps {
  track: HeroTrack
  stats: {
    trackCount: number
    stageCount: number
    resourceCount: number
    projectCount: number
  }
}

export function LandingHero({ track, stats }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* Restrained brand motif — an aqua asterisk, not a decorative blob. */}
      <Asterisk
        aria-hidden
        size={92}
        strokeWidth={1}
        className="pointer-events-none absolute right-10 top-28 hidden text-aqua lg:block"
      />

      <div className="landing-container pb-0 pt-10 md:pt-14">
        <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
          <span className="landing-eyebrow landing-hero-in">A clearer way to learn technology</span>
          <span className="landing-index hidden sm:block">Independent learning / Est. 2026</span>
        </div>

        <h1 id="landing-hero-title" className="landing-display landing-hero-title mt-10 md:mt-14">
          <span className="landing-hero-in block" style={{ animationDelay: '0.05s' }}>
            You don&apos;t need
          </span>
          <span className="landing-hero-in line-2 block" style={{ animationDelay: '0.14s' }}>
            another course.
          </span>
          <span className="landing-hero-in block" style={{ animationDelay: '0.23s' }}>
            You need a{' '}
            <span className="landing-serif landing-underline text-brand">
              path
              <svg viewBox="0 0 300 18" fill="none" aria-hidden preserveAspectRatio="none">
                <path
                  d="M4 12C74 5 168 4 296 10"
                  stroke="var(--aqua)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </span>
        </h1>

        <div className="mt-10 grid gap-10 border-t border-hairline pt-8 md:mt-14 md:grid-cols-12 md:gap-8 md:pt-10">
          <div className="md:col-span-5">
            <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink/75 md:text-lg">
              TechSkillHub helps you move from not knowing where to start to building
              practical technology skills you can demonstrate. Choose a direction, follow
              a clear roadmap, learn with curated resources, and build projects at your
              own pace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink
                href="/find-your-path"
                label="Find Your Path"
                className="btn btn-primary w-full justify-center sm:w-auto"
              >
                Find Your Path <ArrowRight size={16} className="shrink-0" />
              </CtaLink>
              <CtaLink
                href="/paths"
                label="Explore Learning Paths"
                className="btn btn-secondary w-full justify-center sm:w-auto"
              >
                Explore Learning Paths
              </CtaLink>
            </div>

            <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/70">
              Beginner-friendly · Self-paced · Free resources
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="relative pb-2">
              <div className="relative h-36 overflow-hidden rounded-[20px] bg-brand md:h-48">
                <img
                  src="https://images.pexels.com/photos/3880924/pexels-photo-3880924.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Black professional concentrating while working on a laptop"
                  width={1000}
                  height={667}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/65 via-ink/10 to-transparent p-4 md:p-6">
                  <span className="rounded-full border border-white/30 bg-ink/45 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    One clear next step at a time
                  </span>
                </div>
              </div>
              <div className="landing-module relative z-10 mx-2 -mt-10 overflow-hidden shadow-[0_18px_50px_rgba(53,56,79,0.10)] md:mx-5 md:-mt-12">
              <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4 md:px-6">
                <div className="flex items-center gap-2.5">
                  <LogoMark size={22} />
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/70">
                    Sample roadmap
                  </span>
                </div>
                <span className="landing-chip landing-chip-aqua">
                  {track.stages.length} stages
                </span>
              </div>

              <div className="px-5 md:px-6">
                <div className="flex items-end justify-between gap-4 border-b border-hairline py-4">
                  <div>
                    <p className="landing-index">Build / Frontend</p>
                    <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                      {track.name}
                    </h2>
                  </div>
                  <p className="hidden text-right font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] text-ink/70 sm:block">
                    {track.difficultyLabel}
                    <br />
                    {track.timeEstimate}
                  </p>
                </div>

                <ol className="py-1">
                  {track.stages.map((stage, index) => (
                    <li key={stage.id} className="landing-stage-row">
                      <span
                        className={
                          index === 0
                            ? 'landing-node landing-node-grape'
                            : index === 1
                              ? 'landing-node landing-node-aqua'
                              : 'landing-node'
                        }
                      >
                        {String(stage.id).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="truncate font-display text-sm font-semibold text-ink">
                            {stage.title}
                          </p>
                          <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink/70">
                            {stage.duration}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xs text-ink/70">
                          {stage.topics.slice(0, 3).join(' · ')}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-hairline px-5 py-4 md:px-6">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink/70">
                  {track.resourceCount} resources linked
                </span>
                <Link href={`/tracks/${track.slug}`} className="landing-arrow">
                  Open roadmap <ArrowUpRight size={14} className="shrink-0" />
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-container mt-12 border-t border-hairline py-4">
        <div className="landing-strip">
          <span>
            <strong className="font-semibold text-ink">{stats.trackCount}</strong> learning paths
          </span>
          <span className="sep" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{stats.stageCount}</strong> stages
          </span>
          <span className="sep" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{stats.resourceCount}</strong> free resources
          </span>
          <span className="sep" aria-hidden />
          <span>
            <strong className="font-semibold text-ink">{stats.projectCount}</strong> projects
          </span>
          <span className="ml-auto hidden text-ink/70 md:inline">Read live from the catalogue</span>
        </div>
      </div>
    </section>
  )
}
