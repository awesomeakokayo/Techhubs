import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { TrackedLink } from '@/components/ui/tracked-link'
import { SectionRail } from './SectionRail'

export interface StageDetail {
  id: number
  title: string
  duration: string
  topics: string[]
  description: string
}

export interface StageResource {
  id: string
  title: string
  source: string
  type: string
  url: string
}

export interface StageProject {
  title: string
  description: string
  techTags: string[]
  level: string
}

interface StageSectionProps {
  trackName: string
  trackSlug: string
  stage: StageDetail
  stageCount: number
  resources: StageResource[]
  project: StageProject
  resourceCount: number
}

export function StageSection({
  trackName,
  trackSlug,
  stage,
  stageCount,
  resources,
  project,
  resourceCount,
}: StageSectionProps) {
  return (
    <section className="border-b border-hairline bg-white">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <SectionRail
            index="04"
            label="Inside a stage"
            note="A stage is not a playlist. It is a topic set, a set of resources and something to build."
          />

          <div className="md:col-span-9">
            <h2 className="landing-display max-w-3xl text-[clamp(2rem,4vw,3.4rem)]">
              Every stage tells you what to learn —{' '}
              <span className="landing-serif text-brand">and what to build.</span>
            </h2>

            <div className="mt-10 grid gap-4 lg:grid-cols-12">
              <div className="landing-module p-6 lg:col-span-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="landing-chip landing-chip-aqua">
                    Stage {String(stage.id).padStart(2, '0')}
                  </span>
                  <span className="landing-index">{stage.duration}</span>
                </div>

                <div className="mt-4 flex items-center gap-1" aria-hidden>
                  {Array.from({ length: stageCount }).map((_, index) => (
                    <span
                      key={index}
                      className={[
                        'h-1 flex-1 rounded-full',
                        index === stage.id - 1 ? 'bg-brand' : 'bg-hairline',
                      ].join(' ')}
                    />
                  ))}
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/70">
                  {stage.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {stage.topics.map((topic) => (
                    <span key={topic} className="landing-chip">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-hairline pt-5">
                  <div>
                    <p className="landing-index">Topics</p>
                    <p className="mt-1 font-display text-sm font-semibold text-ink">
                      {stage.topics.length}
                    </p>
                  </div>
                  <div>
                    <p className="landing-index">Time</p>
                    <p className="mt-1 font-display text-sm font-semibold text-ink">
                      {stage.duration}
                    </p>
                  </div>
                  <div>
                    <p className="landing-index">Practice</p>
                    <p className="mt-1 font-display text-sm font-semibold text-ink">1 build</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-hairline pt-5">
                  <p className="landing-index">From the {trackName} roadmap</p>
                  <Link href={`/tracks/${trackSlug}`} className="landing-arrow mt-3">
                    Open the full roadmap{' '}
                    <ArrowUpRight size={14} className="shrink-0" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 lg:col-span-5">
                <div className="landing-module p-6">
                  <p className="landing-index">Resources / selected</p>
                  <ul className="mt-4 divide-y divide-hairline">
                    {resources.map((resource) => (
                      <li key={resource.id} className="py-3 first:pt-0 last:pb-0">
                        <TrackedLink
                          href={resource.url}
                          path="/"
                          resourceTitle={resource.title}
                          resourceType={resource.type}
                          className="group flex items-start justify-between gap-3 no-underline"
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-ink transition-colors group-hover:text-brand">
                              {resource.title}
                            </span>
                            <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink/70">
                              {resource.source} · {resource.type}
                            </span>
                          </span>
                          <ArrowUpRight
                            size={13}
                            className="mt-1 shrink-0 text-ink/60 transition-colors group-hover:text-brand"
                          />
                        </TrackedLink>
                      </li>
                    ))}
                  </ul>
                  <Link href="/resources" className="landing-arrow mt-5">
                    Browse all {resourceCount} resources{' '}
                    <ArrowRight size={14} className="shrink-0" />
                  </Link>
                </div>

                <div className="landing-module landing-module-aqua p-6">
                  <p className="landing-index">Build it</p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techTags.map((tag) => (
                      <span key={tag} className="landing-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/projects/${project.level}`} className="landing-arrow mt-5">
                    See {project.level} projects{' '}
                    <ArrowUpRight size={14} className="shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
