'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { Check } from 'lucide-react'

const TIERS = [
  {
    tier: 'Free',
    purpose: 'User acquisition & distribution',
    features: [
      'Structured roadmaps',
      'Curated learning resources',
      'Project ideas and descriptions',
      'Guides and career pages',
      'Basic learning experience',
    ],
    status: 'Available',
  },
  {
    tier: 'Pro',
    purpose: 'Premium learning & career features',
    badge: 'Planned',
    features: [
      'AI-assisted learning tools',
      'Advanced career preparation',
      'Deeper assessment and feedback',
      'Priority access to new features',
      'Enhanced project guidance',
    ],
    status: 'Planned',
  },
  {
    tier: 'Institutional',
    purpose: 'Universities, NGOs, workforce programs',
    badge: 'Planned',
    features: [
      'University partnerships',
      'Workforce development programs',
      'Custom content and analytics',
      'Organizational dashboards',
      'Employer-sponsored paths',
    ],
    status: 'Planned',
  },
  {
    tier: 'Employer',
    purpose: 'Talent & hiring partnerships',
    badge: 'Planned',
    features: [
      'Skills-verified talent pipeline',
      'Hiring partnerships',
      'Workforce readiness data',
      'Custom learning paths for teams',
    ],
    status: 'Planned',
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
              Free access drives distribution.{' '}
              <span className="italic text-teal">Premium and institutional products create monetization.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl">
            {/* Flywheel */}
            <div className="mb-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-0">
              {['Free', 'Pro', 'Institutional', 'Employer'].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="rounded-[var(--radius-md)] border border-border-default bg-surface px-4 py-2 font-mono text-xs font-semibold text-text-primary">
                    {label}
                  </span>
                  {i < 3 && (
                    <span className="hidden text-lg text-text-muted sm:inline">→</span>
                  )}
                  {i < 3 && (
                    <span className="text-lg text-text-muted sm:hidden">↓</span>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TIERS.map((model) => (
                <div
                  key={model.tier}
                  className={`rounded-[var(--radius-md)] border bg-surface p-5 ${
                    model.tier === 'Free'
                      ? 'border-teal'
                      : 'border-border-default'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-xl text-text-primary">{model.tier}</h3>
                    {model.badge && (
                      <span className="badge badge-amber">{model.badge}</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-text-muted">{model.purpose}</p>
                  <ul className="mt-4 space-y-2">
                    {model.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          size={13}
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
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            Free tier is live. Pro and Institutional features are planned for future development.
            No revenue is currently being generated.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
