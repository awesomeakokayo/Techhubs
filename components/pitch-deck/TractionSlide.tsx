'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { getProductStats } from '@/lib/tracks'

export function TractionSlide() {
  const stats = getProductStats()

  const milestones = [
    { label: 'Product launched', detail: 'Full platform live at techskillhub.cv' },
    { label: '22 learning tracks', detail: 'Across Build, Design, Analyze, and Grow categories' },
    { label: '17 career roadmaps', detail: 'Structured paths from beginner to career-ready' },
    { label: '96 portfolio projects', detail: 'Practical, demonstrable skill-building exercises' },
    { label: `${stats.resourceCount} curated resources`, detail: 'Vetted learning materials with a focus on free resources' },
    { label: '11 learning guides', detail: 'In-depth career and learning guidance content' },
    { label: 'AI-assisted learning', detail: 'AI tools integrated into the learning experience' },
    { label: 'Payment infrastructure', detail: 'Paystack integration for future monetization' },
  ]

  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Traction &amp; progress</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              A live product with{' '}
              <span className="italic text-teal">real content and infrastructure.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 divide-y divide-border-subtle border-y border-border-default sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-14 max-w-3xl">
            <h3 className="mb-6 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Verified product milestones
            </h3>
            <div className="space-y-3">
              {milestones.map((m) => (
                <div
                  key={m.label}
                  className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[0.6rem] font-bold text-text-inverse">
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{m.label}</p>
                    <p className="mt-0.5 text-sm text-text-secondary">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            All metrics are derived from the live product catalogue. No fabricated traction data.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
