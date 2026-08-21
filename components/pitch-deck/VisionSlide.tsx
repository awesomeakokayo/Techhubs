'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const JOURNEY_STEPS = [
  { word: 'Learn', description: 'Structured paths that eliminate confusion.' },
  { word: 'Build', description: 'Projects that develop real competence.' },
  { word: 'Prove', description: 'A portfolio that demonstrates your skills.' },
  { word: 'Connect', description: 'Links to opportunities and the ecosystem.' },
  { word: 'Work', description: 'Career readiness and employer connections.' },
  { word: 'Grow', description: 'Continuous learning and skill development.' },
]

export function VisionSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">Long-term vision</p>
            <h2 className="font-editorial text-display-xl text-text-primary">
              Our long-term goal is to become infrastructure for{' '}
              <span className="italic text-teal">technology skills development</span> in Africa.
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {JOURNEY_STEPS.map((step, i) => (
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

        <AnimateIn delay={0.25}>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="font-editorial text-display-md text-text-primary">
              TechSkillHub is more than a learning website.
            </p>
            <p className="lead mt-4">
              It is a structured bridge between wanting to learn technology and being able to
              demonstrate real competence, pursue opportunities, and build a career. Our goal is
              to make this bridge available to every African learner who needs it.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
