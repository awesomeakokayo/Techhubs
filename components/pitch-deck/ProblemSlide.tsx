'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const FRAGMENTED = [
  'YouTube',
  'Documentation',
  'Online courses',
  'Random tutorials',
  'Unclear project choices',
  'Little career guidance',
]

const OUTCOMES = [
  'Confusion about what to learn',
  'Incomplete learning',
  'Weak portfolios',
  'Difficulty getting opportunities',
]

export function ProblemSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">The problem</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              There is no shortage of information.{' '}
              <span className="italic text-teal">
                There is a shortage of direction, practical experience, proof of skill, and
                clear pathways to opportunity.
              </span>
            </h2>
          </div>
        </AnimateIn>

        {/* The fragmented current experience */}
        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl">
            <h3 className="mb-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              The current fragmented experience
            </h3>
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-2">
                {FRAGMENTED.map((item, i) => (
                  <span
                    key={item}
                    className="rounded-[var(--radius-full)] border border-border-default bg-surface px-4 py-1.5 text-sm text-text-secondary"
                  >
                    {item}
                    {i < FRAGMENTED.length - 1 && <span className="ml-2 text-text-muted">+</span>}
                  </span>
                ))}
              </div>

              <span className="my-2 text-2xl text-text-muted" aria-hidden>↓</span>

              <div className="flex flex-col items-center gap-2">
                {OUTCOMES.map((outcome, i) => (
                  <span
                    key={outcome}
                    className="rounded-[var(--radius-md)] border border-amber bg-amber/5 px-5 py-2 text-sm font-semibold text-amber"
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <p className="lead text-text-secondary">
              The result is a generation of talented individuals who{' '}
              <strong className="text-text-primary">want to learn</strong> but struggle to find a
              clear, structured path from curiosity to competence.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
