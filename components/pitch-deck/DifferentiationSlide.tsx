'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const JOURNEY_WORDS = [
  { word: 'Learn', description: 'Structured paths that eliminate confusion.' },
  { word: 'Build', description: 'Projects that develop real competence.' },
  { word: 'Prove', description: 'A portfolio that demonstrates your skills.' },
  { word: 'Connect', description: 'Links to opportunities and the ecosystem.' },
  { word: 'Work', description: 'Career readiness and employer connections.' },
  { word: 'Grow', description: 'Continuous learning and skill development.' },
]

export function DifferentiationSlide() {
  return (
    <section id="differentiation" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">Why TechSkillHub is different</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Not another course platform.
              <br />
              <span className="italic text-teal">
                A structured path from learning to demonstrable competence.
              </span>
            </h2>
          </div>
        </AnimateIn>

        {/* The Journey */}
        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {JOURNEY_WORDS.map((step, i) => (
                <div key={step.word} className="text-center">
                  <span className="path-node is-complete mx-auto mb-3 flex h-12 w-12 items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <p className="font-editorial text-xl text-text-primary">{step.word}</p>
                  <p className="mt-1 text-xs text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Key Differentiators */}
        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            {[
              { label: 'Structured instead of fragmented', description: 'Clear learning paths, not random tutorials.' },
              { label: 'Practical instead of theoretical', description: 'Projects and practice at every stage.' },
              { label: 'Career-oriented instead of course-oriented', description: 'Designed around demonstrable competence, not course completion.' },
              { label: 'Built with African learners in mind', description: 'Accessible, relevant, and affordable for the target market.' },
              { label: 'Portfolio-driven', description: 'Build work that proves what you can do — not just what you watched.' },
            ].map((d) => (
              <div
                key={d.label}
                className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[0.65rem] font-bold text-text-inverse">
                  ●
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{d.label}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="lead text-text-secondary">
              TechSkillHub reduces the distance between{' '}
              <strong className="text-text-primary">&ldquo;I want to learn tech&rdquo;</strong> and{' '}
              <strong className="text-text-primary">&ldquo;I can demonstrate what I know and pursue
              real opportunities.&rdquo;</strong>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
