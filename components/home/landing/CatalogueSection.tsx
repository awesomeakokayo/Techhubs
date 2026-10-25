import { SectionRail } from './SectionRail'

export interface CatalogueStats {
  trackCount: number
  stageCount: number
  resourceCount: number
  projectCount: number
}

export function CatalogueSection({ stats }: { stats: CatalogueStats }) {
  const metrics = [
    { value: stats.trackCount, label: 'learning paths' },
    { value: stats.stageCount, label: 'sequenced stages' },
    { value: stats.resourceCount, label: 'free resources' },
    { value: stats.projectCount, label: 'practical projects' },
  ]

  return (
    <section className="border-b border-hairline bg-white">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <SectionRail
            index="07"
            label="The catalogue"
            note="Evidence over adjectives. These numbers come from the same data the product uses."
          />

          <div className="md:col-span-9">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="landing-display max-w-2xl text-[clamp(2rem,4vw,3.4rem)]">
                <span className="block">A catalogue,</span>
                <span className="landing-serif block text-brand">not a content dump.</span>
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-ink/70">
                Every figure is computed from the live catalogue — not a marketing estimate.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px border-y border-hairline bg-hairline md:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-white px-4 py-8 md:px-6 md:py-10">
                  <dd className="font-display text-5xl font-semibold tracking-tight text-brand md:text-6xl">
                    {metric.value}
                  </dd>
                  <dt className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink/70">
                    {metric.label}
                  </dt>
                </div>
              ))}
            </dl>

            <p className="mt-5 font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.1em] text-ink/70">
              No learner counts, testimonials or outcome claims are shown because they are
              not verified.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
