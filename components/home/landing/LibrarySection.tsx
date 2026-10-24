import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Compass, Sparkles } from 'lucide-react'
import { SectionRail } from './SectionRail'

export interface GuideLink {
  href: string
  title: string
}

interface LibrarySectionProps {
  resourceCount: number
  resourceTypes: { label: string; count: number }[]
  guides: GuideLink[]
}

export function LibrarySection({
  resourceCount,
  resourceTypes,
  guides,
}: LibrarySectionProps) {
  return (
    <section className="border-b border-hairline bg-white">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <SectionRail
            index="06"
            label="The library"
            note="Roadmaps are the spine. Resources, guides and career context fill them out."
          />

          <div className="md:col-span-9">
            <h2 className="landing-display max-w-2xl text-[clamp(2rem,4vw,3.4rem)]">
              Everything around{' '}
              <span className="landing-serif text-brand">the roadmap.</span>
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-12">
              <div className="landing-module landing-module-grape flex flex-col p-6 md:col-span-6 md:row-span-2 md:p-8">
                <p className="landing-index landing-index-light">Curated resources</p>
                <p className="mt-6 font-display text-6xl font-semibold tracking-tight text-white md:text-7xl">
                  {resourceCount}
                </p>
                <p className="mt-2 text-sm text-white/75">
                  free resources, attached to learning paths.
                </p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
                  Videos, documentation, books and practice sites — selected to support a
                  stage, not dumped into an endless list.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/15 pt-5">
                  {resourceTypes.map((type) => (
                    <div
                      key={type.label}
                      className="flex items-baseline justify-between gap-2"
                    >
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white/75">
                        {type.label}
                      </span>
                      <span className="font-display text-sm font-semibold text-white">
                        {type.count}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/resources"
                  className="landing-arrow landing-arrow-light mt-auto pt-8"
                >
                  Browse the library <ArrowUpRight size={14} className="shrink-0" />
                </Link>
              </div>

              <div className="landing-module flex flex-col p-6 md:col-span-6">
                <p className="landing-index">Beginner guides</p>
                <ul className="mt-4 divide-y divide-hairline">
                  {guides.map((guide) => (
                    <li key={guide.href}>
                      <Link
                        href={guide.href}
                        className="group flex items-start justify-between gap-3 py-3 no-underline"
                      >
                        <span className="text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand">
                          {guide.title}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="mt-0.5 shrink-0 text-ink/60 transition-colors group-hover:text-brand"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/guides" className="landing-arrow mt-auto pt-4">
                  All guides <ArrowRight size={14} className="shrink-0" />
                </Link>
              </div>

              <div className="landing-module landing-module-aqua flex flex-col p-6 md:col-span-3">
                <Compass size={18} className="text-brand" aria-hidden />
                <p className="landing-index mt-4">Career</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  Know the role before you chase it.
                </h3>
                <Link href="/career" className="landing-arrow mt-auto pt-6">
                  Career prep <ArrowUpRight size={14} className="shrink-0" />
                </Link>
              </div>

              <div className="landing-module landing-module-ink flex flex-col p-6 md:col-span-3">
                <Sparkles size={18} className="text-aqua" aria-hidden />
                <p className="landing-index landing-index-light mt-4">AI</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  Use AI without outsourcing your thinking.
                </h3>
                <Link href="/ai" className="landing-arrow landing-arrow-light mt-auto pt-6">
                  AI paths <ArrowUpRight size={14} className="shrink-0" />
                </Link>
              </div>

              <div className="landing-module landing-module-paper flex flex-col p-6 md:col-span-6">
                <p className="landing-index">Self-paced by design</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  No cohort. No timetable. No waiting for the next lesson.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  Start where you are, move when you can, and keep your place when life gets
                  busy.
                </p>
              </div>

              <div className="landing-module flex flex-col p-6 md:col-span-6">
                <p className="landing-index">First week</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  Not sure what to do first? Start here.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  A short guide to choosing a direction, setting up, and building your first
                  small thing.
                </p>
                <Link href="/start-here" className="landing-arrow mt-auto pt-6">
                  Start here <ArrowRight size={14} className="shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
