'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { CheckpointNode, PathConnector } from '@/components/ui/path'

const STAKEHOLDERS = [
  { label: 'Learners', description: 'Access structured learning paths, projects, and career guidance.' },
  { label: 'Universities', description: 'Supplement curricula with practical, industry-aligned learning paths.' },
  { label: 'Tech Communities', description: 'Provide members with structured learning resources and project ideas.' },
  { label: 'Mentors', description: 'Guide learners through structured roadmaps and provide career advice.' },
  { label: 'Tech Companies', description: 'Find talent with demonstrable competence and support workforce development.' },
  { label: 'Employers', description: 'Access a pipeline of career-ready technology professionals.' },
  { label: 'NGOs', description: 'Scale digital skills programs with structured, accessible content.' },
  { label: 'Government', description: 'Support national digital skills development initiatives.' },
]

export function PartnershipSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">Partnership ecosystem</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              A platform that creates value{' '}
              <span className="italic text-teal">across the ecosystem.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-16 max-w-4xl">
            <ol className="space-y-0">
              {STAKEHOLDERS.map((s, i) => (
                <li key={s.label} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < STAKEHOLDERS.length - 1 && (
                    <span
                      className="absolute left-[17px] top-12 h-[calc(100%-1rem)] w-px"
                      style={{ background: 'var(--border-default)' }}
                    />
                  )}
                  <span className="relative z-10">
                    <CheckpointNode
                      step={{ index: i + 1, state: 'current', tone: 'var(--accent-primary)' }}
                    />
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-sm font-bold text-text-primary">{s.label}</h3>
                    <p className="mt-0.5 text-sm text-text-secondary">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            Current technology providers are distinguished from potential strategic partners.
            No existing partnerships are implied unless publicly confirmed.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
