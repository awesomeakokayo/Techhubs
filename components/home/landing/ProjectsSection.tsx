import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionRail } from './SectionRail'

export interface ProjectCard {
  level: string
  trackName: string
  title: string
  description: string
  techTags: string[]
  href: string
}

const VARIANTS = ['light', 'aqua', 'grape'] as const

const PROJECT_VISUALS: Record<string, { image: string; label: string }> = {
  'Personal Portfolio': {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=75',
    label: 'Interface design',
  },
  'URL Shortener': {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=75',
    label: 'APIs and systems',
  },
  'E-commerce Platform': {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=75',
    label: 'Storefront experience',
  },
}

export function ProjectsSection({
  projects,
  projectCount,
}: {
  projects: ProjectCard[]
  projectCount: number
}) {
  return (
    <section className="border-b border-hairline">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <SectionRail
            index="05"
            label="Proof of work"
            note="Illustrative thumbnails. These are project briefs from the catalogue, not learner submissions."
          />

          <div className="md:col-span-9">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="landing-display max-w-2xl text-[clamp(2rem,4vw,3.4rem)]">
                Knowledge matters. What you can{' '}
                <span className="landing-serif text-brand">build</span> matters more.
              </h2>
              <Link href="/projects" className="landing-arrow pb-1">
                All {projectCount} projects{' '}
                <ArrowUpRight size={14} className="shrink-0" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {projects.map((project, index) => {
                const variant = VARIANTS[index % VARIANTS.length]
                const isDark = variant === 'grape'
                return (
                  <Link
                    key={`${project.trackName}-${project.title}`}
                    href={project.href}
                    className={[
                      'group flex flex-col overflow-hidden rounded-[20px] border no-underline transition-transform duration-200 hover:-translate-y-1',
                      variant === 'grape'
                        ? 'landing-module-grape'
                        : variant === 'aqua'
                          ? 'landing-module landing-module-aqua'
                          : 'landing-module bg-white',
                    ].join(' ')}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand">
                      <Image
                        src={(PROJECT_VISUALS[project.title] ?? PROJECT_VISUALS['Personal Portfolio']).image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
                        quality={58}
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-ink/40 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                        Illustrative preview
                      </span>
                      <span className="absolute bottom-4 left-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white">
                        {(PROJECT_VISUALS[project.title] ?? PROJECT_VISUALS['Personal Portfolio']).label}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={
                          isDark
                            ? 'landing-chip landing-chip-light'
                            : 'landing-chip'
                        }
                      >
                        {project.level}
                      </span>
                      <span
                        className={
                          isDark
                            ? 'landing-index landing-index-light'
                            : 'landing-index'
                        }
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3
                      className={[
                        'mt-8 font-display text-xl font-semibold tracking-tight',
                        isDark ? 'text-white' : 'text-ink',
                      ].join(' ')}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={[
                        'mt-2 flex-1 text-sm leading-relaxed',
                        isDark ? 'text-white/70' : 'text-ink/70',
                      ].join(' ')}
                    >
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.techTags.map((tag) => (
                        <span
                          key={tag}
                          className={
                            isDark ? 'landing-chip landing-chip-light' : 'landing-chip'
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className={[
                        'mt-6 flex items-center justify-between gap-3 border-t pt-4',
                        isDark ? 'border-white/15' : 'border-hairline',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'font-mono text-[0.6rem] uppercase tracking-[0.1em]',
                          isDark ? 'text-white/70' : 'text-ink/70',
                        ].join(' ')}
                      >
                        {project.trackName}
                      </span>
                      <ArrowUpRight
                        size={15}
                        className={
                          isDark
                            ? 'text-aqua transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                            : 'text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }
                      />
                    </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink/70">
              Beginner → intermediate → advanced. Build the proof, not just the notes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
