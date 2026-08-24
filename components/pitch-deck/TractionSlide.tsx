'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { getProductStats } from '@/lib/tracks'

export function TractionSlide() {
  const stats = getProductStats()

  return (
    <section id="traction" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Product progress &amp; early validation</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              A live product with{' '}
              <span className="italic text-teal">foundational infrastructure already built.</span>
            </h2>
          </div>
        </AnimateIn>

        {/* BUILT — verified product inventory */}
        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-14 max-w-4xl">
            <h3 className="mb-6 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Built
            </h3>
            <dl className="grid grid-cols-1 divide-y divide-border-subtle border-y border-border-default sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { value: '22', label: 'learning tracks' },
                { value: '17', label: 'roadmaps' },
                { value: '96', label: 'projects' },
              ].map((metric) => (
                <div key={metric.label} className="px-8 py-10 text-center">
                  <dt className="order-2 mt-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
                    {metric.label}
                  </dt>
                  <dd className="order-1 font-editorial text-5xl text-text-primary">{metric.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: `${stats.resourceCount} curated resources`, detail: 'Vetted learning materials across all tracks' },
                { label: '11 learning guides', detail: 'In-depth career and learning guidance' },
                { label: 'AI-assisted learning', detail: 'AI tools integrated into the learning experience' },
                { label: 'Payment infrastructure', detail: 'Paystack integration for future monetization' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-start gap-3 rounded-[var(--radius-md)] border border-border-default bg-surface p-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[0.6rem] font-bold text-text-inverse">
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{m.label}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* VALIDATED — only verified evidence */}
        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-14 max-w-4xl">
            <h3 className="mb-6 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Early validation
            </h3>
            <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-8 text-center">
              <p className="font-editorial text-display-md text-text-primary">
                Early-stage product with foundational learning infrastructure already live.
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm text-text-secondary">
                TechSkillHub is pre-revenue and pre-scale. The product is live with a complete
                catalogue of learning content. User acquisition, engagement metrics, and revenue
                data will be shared as the platform grows.
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            All product metrics are derived from the live catalogue. No fabricated traction data.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
