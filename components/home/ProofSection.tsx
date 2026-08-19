import { getProductStats } from '@/lib/tracks'

/**
 * ProofSection — Section 08 · restrained, real proof.
 *
 * Real catalogue-derived numbers only. No fabricated testimonials,
 * no inflated stats. A quiet row, not a stats dashboard.
 */
export function ProofSection() {
  const stats = getProductStats()

  const metrics = [
    { value: String(stats.trackCount), label: 'learning paths' },
    { value: String(stats.resourceCount), label: 'curated resources' },
    { value: String(stats.projectCount), label: 'projects to build' },
  ]

  return (
    <section>
      <div className="container py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label justify-center">The catalogue</p>
          <h2 className="font-editorial text-display-lg text-text-primary">
            Learners are already exploring their paths.
          </h2>
        </div>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 divide-y divide-border-subtle border-y border-border-default sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="px-8 py-10 text-center">
              <dt className="order-2 mt-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
                {metric.label}
              </dt>
              <dd className="order-1 font-editorial text-5xl text-text-primary">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-center font-mono text-xs text-text-muted">
          Every number is derived from the live catalogue. Nothing inflated.
        </p>
      </div>
    </section>
  )
}