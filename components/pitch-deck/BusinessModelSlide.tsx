'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { Check } from 'lucide-react'

const MODELS = [
  {
    tier: 'Free',
    tagline: 'Core learning experience',
    features: [
      'Structured roadmaps',
      'Curated learning resources',
      'Project ideas and descriptions',
      'Basic learning experience',
      'Access to guides and career pages',
    ],
  },
  {
    tier: 'Pro',
    tagline: 'Enhanced learning tools',
    badge: 'Planned',
    features: [
      'AI-assisted learning tools',
      'Advanced career preparation features',
      'Deeper assessment and feedback tools',
      'Priority access to new features',
      'Enhanced project guidance',
    ],
  },
  {
    tier: 'B2B / Institutional',
    tagline: 'Organizational partnerships',
    badge: 'Planned',
    features: [
      'University and college partnerships',
      'Workforce development programs',
      'Employer-sponsored learning paths',
      'Custom content and analytics',
      'Organizational dashboards',
    ],
  },
]

export function BusinessModelSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Business model</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Keeping the core learning experience{' '}
              <span className="italic text-teal">accessible.</span>
            </h2>
            <p className="lead mt-4">
              TechSkillHub is designed to remain accessible to learners while generating revenue
              through premium features and institutional partnerships.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {MODELS.map((model) => (
              <div
                key={model.tier}
                className={`rounded-[var(--radius-md)] border bg-surface p-6 ${
                  model.tier === 'Free'
                    ? 'border-teal'
                    : 'border-border-default'
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-editorial text-2xl text-text-primary">{model.tier}</h3>
                  {model.badge && (
                    <span className="badge badge-amber">{model.badge}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-text-secondary">{model.tagline}</p>
                <ul className="mt-5 space-y-2.5">
                  {model.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0 text-teal"
                        strokeWidth={2.5}
                      />
                      <span className="text-sm text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            Free tier provides a complete learning experience. Pro and B2B features are planned for
            future development.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
