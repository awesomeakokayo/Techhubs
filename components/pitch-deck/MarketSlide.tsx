'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { getProductStats } from '@/lib/tracks'

export function MarketSlide() {
  const stats = getProductStats()

  return (
    <section id="market" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Market opportunity</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Africa&apos;s digital skills gap is a{' '}
              <span className="italic text-teal">structural opportunity.</span>
            </h2>
          </div>
        </AnimateIn>

        {/* TAM / SAM / SOM */}
        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-6 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  TAM
                </p>
                <p className="mt-2 font-editorial text-3xl text-text-primary">
                  Africa&apos;s Digital Learning Market
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  All individuals and institutions across Africa seeking technology education
                  and digital skills development.
                </p>
                <p className="mt-3 font-mono text-[0.6rem] text-text-muted">
                  Assumption: Broad Africa digital education market
                </p>
              </div>

              <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-6 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  SAM
                </p>
                <p className="mt-2 font-editorial text-3xl text-text-primary">
                  Self-Directed Online Learners
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Independent learners who prefer structured, online, self-paced learning over
                  bootcamps or university programs.
                </p>
                <p className="mt-3 font-mono text-[0.6rem] text-text-muted">
                  Assumption: English-speaking, digitally connected
                </p>
              </div>

              <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-6 text-center">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  SOM
                </p>
                <p className="mt-2 font-editorial text-3xl text-text-primary">
                  Initial Target Segment
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  African learners actively seeking free or affordable tech education,
                  reachable through digital channels and university communities.
                </p>
                <p className="mt-3 font-mono text-[0.6rem] text-text-muted">
                  Assumption: Early-stage penetration, organic growth
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Why Now */}
        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-14 max-w-3xl">
            <h3 className="mb-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Why now
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Rapid digitization',
                  detail: 'Africa has one of the world\'s youngest and fastest-growing populations, with increasing internet penetration driving demand for digital skills.',
                },
                {
                  title: 'Remote work opportunity',
                  detail: 'The global shift toward remote work has created unprecedented opportunities for African technology professionals to work for international companies.',
                },
                {
                  title: 'Skills gap persists',
                  detail: 'The gap between demand for technology talent and supply of job-ready professionals remains significant — creating clear opportunity for practical skills platforms.',
                },
                {
                  title: 'Learning-to-employment mismatch',
                  detail: 'Many learners complete courses but cannot demonstrate competence. The market is shifting toward outcomes, portfolios, and demonstrable skill.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
                >
                  <h4 className="text-sm font-bold text-text-primary">{item.title}</h4>
                  <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            Market sizing is directional and based on publicly available data on Africa&apos;s
            digital economy. Specific market size figures require dedicated research.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
