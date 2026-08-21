'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

export function MarketSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Market opportunity</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Africa&apos;s digital economy is growing.{' '}
              <span className="italic text-teal">
                The demand for practical tech skills is accelerating.
              </span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-6 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  TAM
                </p>
                <p className="mt-2 font-editorial text-3xl text-text-primary">
                  Africa&apos;s Digital Skills Market
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  The total addressable market includes all individuals and institutions across Africa
                  seeking structured technology education and digital skills development.
                </p>
              </div>

              <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-6 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  SAM
                </p>
                <p className="mt-2 font-editorial text-3xl text-text-primary">
                  Self-Directed Learners
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  The serviceable market focuses on independent, self-directed learners who prefer
                  structured, online, self-paced learning over traditional bootcamps or university
                  programs.
                </p>
              </div>

              <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-6 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  SOM
                </p>
                <p className="mt-2 font-editorial text-3xl text-text-primary">
                  African Learners Online
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  The obtainable market centers on English-speaking African learners actively
                  seeking free or affordable online tech education, accessible through digital
                  channels.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-5">
              <h3 className="text-sm font-bold text-text-primary">Growing Digital Economy</h3>
              <p className="mt-1 text-sm text-text-secondary">
                Africa has one of the world&apos;s youngest and fastest-growing populations, with
                increasing internet penetration and mobile connectivity driving demand for digital
                skills.
              </p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-5">
              <h3 className="text-sm font-bold text-text-primary">Remote Work Opportunity</h3>
              <p className="mt-1 text-sm text-text-secondary">
                The global shift toward remote work has created unprecedented opportunities for
                African technology professionals to work for international companies.
              </p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-5">
              <h3 className="text-sm font-bold text-text-primary">Skills Gap</h3>
              <p className="mt-1 text-sm text-text-secondary">
                The gap between the demand for technology talent and the supply of job-ready
                professionals remains significant, creating a clear opportunity for practical
                skills development platforms.
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            Market analysis based on publicly available data on Africa&apos;s digital economy and
            technology education landscape. No fabricated statistics.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
