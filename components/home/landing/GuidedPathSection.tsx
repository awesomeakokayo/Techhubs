import Link from 'next/link'
import { ArrowRight, Asterisk, Award, Check, LayoutDashboard, Sparkles, Trophy } from 'lucide-react'

const BENEFITS = [
  'A dashboard that always shows the next step',
  'Projects checked against the brief',
  'Milestones and certificates that mark real progress',
]

const WORKSPACE_FEATURES = [
  {
    icon: LayoutDashboard,
    title: 'A dashboard, not a content dump',
    description:
      "Your active path, today's goal, weekly plan and progress in one place — so you never reopen a course wondering where you stopped.",
  },
  {
    icon: Sparkles,
    title: 'AI-assisted project checks',
    description:
      'Submit a public repo or live URL plus a short explanation. Checks run against the project brief and rubric. Automated, not human review.',
  },
  {
    icon: Trophy,
    title: 'Achievements that mean something',
    description:
      'Milestones earned from real learning activity, with a streak that makes consistency visible. No vanity badges.',
  },
  {
    icon: Award,
    title: 'A certificate when you finish',
    description:
      'Complete every step of a guided path to unlock a downloadable PDF certificate you can keep.',
  },
]

export interface GuidedStage {
  id: number
  title: string
  duration: string
}

export function GuidedPathSection({
  trackName,
  stages,
}: {
  trackName: string
  stages: GuidedStage[]
}) {
  return (
    <section className="relative overflow-hidden bg-brand">
      <Asterisk
        aria-hidden
        size={360}
        strokeWidth={0.6}
        className="pointer-events-none absolute -right-20 -top-24 text-white/[0.07]"
      />

      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-6">
            <p className="landing-eyebrow landing-eyebrow-light">Guided Path / The workspace</p>
            <h2 className="landing-display mt-5 max-w-xl text-[clamp(2rem,4vw,3.4rem)] text-white">
              Prefer more structure?{' '}
              <span className="landing-serif text-aqua">Take the guided route.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75">
              Guided Path turns a roadmap into a workspace: your next step, project checks,
              milestones and certificates in one place. The public roadmaps, resources and
              projects stay free to explore.
            </p>

            <ul className="mt-6 space-y-2.5">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check size={15} className="mt-0.5 shrink-0 text-aqua" aria-hidden />
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              href="/guided-path"
              className="btn btn-light mt-8 inline-flex items-center gap-2"
            >
              Explore Guided Path <ArrowRight size={16} className="shrink-0" />
            </Link>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/75">
              The public catalogue stays free to explore.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="rounded-[20px] border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm md:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/75">
                  Workspace / Preview
                </span>
                <span className="landing-chip landing-chip-light">Sample plan</span>
              </div>

              <p className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                {trackName}
              </p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/75">
                {stages.length} stages · One clear next step
              </p>

              <ol className="mt-5 space-y-2">
                {stages.map((stage, index) => (
                  <li
                    key={stage.id}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-3 py-3',
                      index === 1
                        ? 'border-aqua bg-white/10'
                        : 'border-white/10 bg-white/[0.03]',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem] font-medium',
                        index === 1
                          ? 'bg-aqua text-ink'
                          : 'border border-white/20 text-white/75',
                      ].join(' ')}
                    >
                      {String(stage.id).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-white">{stage.title}</span>
                      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white/90">
                        {stage.duration}
                      </span>
                    </span>
                    {index === 1 ? (
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white">
                        Focus
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/75">
                  Dashboard · Project checks · Milestones · Certificates
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="landing-eyebrow landing-eyebrow-light">Inside the workspace</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="landing-display max-w-xl text-[clamp(1.5rem,2.6vw,2.2rem)] text-white">
              More than a reading list.
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-white/75">
              The product around the roadmap — built to keep the next step visible and the
              work you finish on the record.
            </p>
          </div>

          <div className="mt-6 grid gap-px overflow-hidden rounded-[20px] border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {WORKSPACE_FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-brand p-5">
                <Icon size={19} className="text-aqua" aria-hidden />
                <h4 className="mt-4 font-display text-base font-semibold tracking-tight text-white">
                  {title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{description}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/75">
            Workspace features are rolling out with Guided Path. The public catalogue stays free.
          </p>
        </div>
      </div>
    </section>
  )
}
