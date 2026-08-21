'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { Check } from 'lucide-react'

const DIFFERENTIATORS = [
  { label: 'Structured instead of fragmented', description: 'Clear learning paths, not random tutorials.' },
  { label: 'Practical instead of theoretical', description: 'Projects and practice at every stage.' },
  { label: 'Career-oriented instead of course-oriented', description: 'Designed around demonstrable competence.' },
  { label: 'Built with African learners in mind', description: 'Accessible, relevant, and affordable.' },
  { label: 'Project-driven portfolio development', description: 'Build work that proves what you can do.' },
  { label: 'AI-assisted without replacing learning', description: 'AI supports the journey, not the effort.' },
  { label: 'Designed around demonstrable competence', description: 'From learning to proving to opportunity.' },
]

export function DifferentiationSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Why TechSkillHub is different</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Not just another course platform.{' '}
              <span className="italic text-teal">A structured path to competence.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.label}
                className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[0.65rem] font-bold text-text-inverse">
                  <Check size={12} strokeWidth={3} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{d.label}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
