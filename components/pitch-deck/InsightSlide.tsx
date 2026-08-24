'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const FLOW_STEPS = [
  { label: 'Confusion', muted: true },
  { label: 'Structured Roadmap', accent: true },
  { label: 'Learning' },
  { label: 'Practice' },
  { label: 'Projects' },
  { label: 'Portfolio' },
  { label: 'Career Readiness' },
  { label: 'Opportunity', accent: true },
]

export function InsightSlide() {
  return (
    <section id="insight" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">The insight</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              The problem isn&apos;t a lack of information.
              <br />
              <span className="italic text-teal">
                It&apos;s a lack of direction, structure, practice, and connection to real-world
                outcomes.
              </span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="mx-auto mt-16 max-w-3xl">
            <ol className="flex flex-col items-stretch" role="list">
              {FLOW_STEPS.map((step, i) => (
                <li key={step.label} className="flex items-center gap-4">
                  <span className="flex flex-col items-center">
                    <span
                      className={`path-node ${
                        step.accent ? 'is-active' : step.muted ? '' : 'is-complete'
                      }`}
                    >
                      {step.accent ? '→' : step.muted ? '!' : '✓'}
                    </span>
                    {i < FLOW_STEPS.length - 1 && (
                      <span
                        className="h-8 w-px"
                        style={{
                          background: step.accent
                            ? 'var(--accent-primary)'
                            : 'var(--border-default)',
                        }}
                      />
                    )}
                  </span>
                  <span
                    className={`font-body text-base ${
                      step.accent
                        ? 'font-semibold text-teal'
                        : step.muted
                          ? 'text-text-muted'
                          : 'text-text-secondary'
                    }`}
                  >
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.25}>
          <p className="mx-auto mt-12 max-w-2xl text-center font-mono text-xs text-text-muted">
            TechSkillHub bridges the gap between &ldquo;I want to learn tech&rdquo; and &ldquo;I
            can demonstrate my skills and pursue opportunities.&rdquo;
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
