'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const TECH_PROVIDERS = [
  { label: 'Paystack', description: 'Payment processing for future monetization.' },
  { label: 'Vercel', description: 'Hosting and deployment infrastructure.' },
  { label: 'Google OAuth', description: 'Authentication provider.' },
]

const STRATEGIC_PARTNERS = [
  { label: 'Universities', description: 'Supplement curricula with structured, practical learning paths and provide students with career-ready skills.' },
  { label: 'Employers', description: 'Access a pipeline of career-ready technology professionals with demonstrable competence.' },
  { label: 'NGOs & Foundations', description: 'Scale digital skills programs with structured, accessible content for workforce development.' },
  { label: 'Developer Communities', description: 'Provide members with structured learning resources, project ideas, and career guidance.' },
  { label: 'Government & Education Orgs', description: 'Support national digital skills development initiatives with platform infrastructure.' },
]

export function PartnershipSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Partnership ecosystem</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Current technology providers{' '}
              <span className="italic text-teal">and potential strategic partners.</span>
            </h2>
          </div>
        </AnimateIn>

        {/* Current Technology Providers */}
        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <h3 className="mb-4 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Current technology providers
            </h3>
            <div className="flex flex-wrap gap-2">
              {TECH_PROVIDERS.map((p) => (
                <div
                  key={p.label}
                  className="rounded-[var(--radius-md)] border border-border-default bg-surface px-4 py-3"
                >
                  <p className="text-sm font-semibold text-text-primary">{p.label}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{p.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[0.6rem] text-text-muted">
              These are service providers, not partnerships.
            </p>
          </div>
        </AnimateIn>

        {/* Strategic Partnership Targets */}
        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-10 max-w-3xl">
            <h3 className="mb-4 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Potential strategic partners
            </h3>
            <div className="space-y-3">
              {STRATEGIC_PARTNERS.map((p) => (
                <div
                  key={p.label}
                  className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[0.6rem] font-bold text-text-inverse">
                    →
                  </span>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{p.label}</p>
                    <p className="mt-0.5 text-sm text-text-secondary">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            No existing partnerships are implied unless publicly confirmed. Technology
            providers are distinguished from strategic partnership targets.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
