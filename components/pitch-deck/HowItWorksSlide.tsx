'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const STEPS = [
  { number: '01', title: 'Discover', description: 'Find a career or technology path that fits your goals.' },
  { number: '02', title: 'Assess', description: 'Take an onboarding flow to understand your starting point.' },
  { number: '03', title: 'Follow the Roadmap', description: 'Walk through a structured, sequenced learning path.' },
  { number: '04', title: 'Learn', description: 'Study through curated resources selected for each stage.' },
  { number: '05', title: 'Practice', description: 'Apply what you learn with hands-on exercises.' },
  { number: '06', title: 'Build Projects', description: 'Create real projects that demonstrate your competence.' },
  { number: '07', title: 'Document', description: 'Organize your work into a portfolio that shows what you can do.' },
  { number: '08', title: 'Prepare', description: 'Get ready for opportunities with career-focused guidance.' },
  { number: '09', title: 'Improve', description: 'Continue learning and refining your skills over time.' },
]

export function HowItWorksSlide() {
  return (
    <section id="how-it-works" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">How it works</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              You always know <span className="italic text-teal">what comes next.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-16 max-w-3xl">
            <ol className="space-y-0">
              {STEPS.map((step, i) => (
                <li key={step.number} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span
                      className="absolute left-[17px] top-12 h-[calc(100%-1rem)] w-px"
                      style={{ background: 'var(--border-default)' }}
                    />
                  )}
                  <span className="relative z-10">
                    <span className="path-node is-complete">{step.number}</span>
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-sm font-bold text-text-primary">{step.title}</h3>
                    <p className="mt-0.5 text-sm text-text-secondary">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
