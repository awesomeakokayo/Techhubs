import { getProductStats } from '@/lib/tracks'

export function Proof() {
  const stats = getProductStats()

  const metrics = [
    { value: String(stats.trackCount), label: 'learning tracks' },
    { value: String(stats.resourceCount), label: 'curated resources' },
    { value: String(stats.projectCount), label: 'projects' },
    { value: String(stats.stageCount), label: 'roadmap stages' },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="border-t border-border-default pt-10">
          <p className="section-label">Proof</p>
          <h2 className="font-editorial text-display-lg">The catalogue, measured.</h2>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border-default bg-border-default lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-surface p-8">
                <p className="font-editorial text-4xl md:text-5xl">{metric.value}</p>
                <p className="mt-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 font-mono text-xs text-text-muted">
            Every number on this page is derived directly from the live catalogue — nothing
            inflated, nothing estimated.
          </p>
        </div>
      </div>
    </section>
  )
}