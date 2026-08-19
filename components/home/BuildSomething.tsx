import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getTrackById } from '@/lib/tracks'

const FEATURED = ['fe-p1', 'fe-p4', 'fe-p8']

export function BuildSomething() {
  const track = getTrackById('frontend')
  const projects = track?.projects ?? []

  return (
    <section className="section">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="section-label">Build something</p>
            <h2 className="font-editorial text-display-lg">
              Don&apos;t just consume. Build.
            </h2>
            <p className="lead mt-5 max-w-none">
              Watching tutorials feels productive. Building is what actually teaches.
              Every path in this catalogue ends in real, presentable work — not toy
              exercises.
            </p>
            <Link
              href="/projects"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
            >
              Browse all projects <ArrowRight size={14} className="shrink-0" />
            </Link>
          </div>

          <ol className="divide-y divide-border-subtle border-y border-border-default">
            {projects
              .filter((p) => FEATURED.includes(p.id))
              .map((project, i) => (
                <li key={project.id}>
                  <Link
                    href="/projects"
                    className="group grid items-baseline gap-x-6 gap-y-2 py-6 no-underline sm:grid-cols-[auto_1fr_auto]"
                  >
                    <span className="font-mono text-sm text-text-muted" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-editorial text-xl text-text-primary">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-sm text-text-secondary">{project.description}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {project.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border-subtle bg-elevated px-2 py-0.5 font-mono text-[0.65rem] text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="hidden shrink-0 text-text-muted transition-all group-hover:translate-x-1 group-hover:text-teal sm:block"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </section>
  )
}