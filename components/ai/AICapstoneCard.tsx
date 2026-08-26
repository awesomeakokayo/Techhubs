import Link from 'next/link'
import { ArrowRight, CheckCircle2, FlaskConical, ShieldCheck, Wrench } from 'lucide-react'
import { AI_SYSTEMS_CAPSTONE } from '@/lib/ai-capstone'

export function AICapstoneCard() {
  return (
    <section className="rounded-2xl border border-border-default bg-elevated p-7 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="section-label text-teal">AI SYSTEMS CAPSTONE</p>
          <h2 className="mt-3 font-editorial text-4xl text-text-primary">{AI_SYSTEMS_CAPSTONE.title}</h2>
          <p className="mt-4 max-w-2xl text-text-secondary">{AI_SYSTEMS_CAPSTONE.purpose}</p>
          <div className="mt-6 rounded-xl border border-border-subtle bg-deep p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">The problem</p>
            <p className="mt-3 text-sm leading-7 text-text-secondary">{AI_SYSTEMS_CAPSTONE.problem}</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            [FlaskConical, 'Research', 'Build an evidence trail, not a generated answer.'],
            [Wrench, 'Build & automate', 'Choose where AI belongs and where deterministic controls are better.'],
            [ShieldCheck, 'Evaluate', 'Test failures, measure improvement, and keep consequential actions controlled.'],
          ].map(([Icon, title, text]) => {
            const CapIcon = Icon as typeof FlaskConical
            return (
              <div key={String(title)} className="rounded-xl border border-border-subtle bg-deep p-5">
                <CapIcon size={18} className="text-teal" aria-hidden />
                <h3 className="mt-3 font-display font-semibold text-text-primary">{String(title)}</h3>
                <p className="mt-1 text-sm leading-6 text-text-secondary">{String(text)}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-display font-semibold text-text-primary">Required evidence</h3>
          <ul className="mt-3 space-y-2">
            {AI_SYSTEMS_CAPSTONE.evidence.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-text-secondary"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-teal" />{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-text-primary">Acceptance standard</h3>
          <ul className="mt-3 space-y-2">
            {AI_SYSTEMS_CAPSTONE.acceptanceCriteria.slice(0, 5).map((item) => (
              <li key={item} className="flex gap-2 text-sm text-text-secondary"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-teal" />{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/tracks/ai-engineering" className="btn btn-primary inline-flex items-center gap-2">
          Build through AI Engineering <ArrowRight size={16} />
        </Link>
        <p className="text-xs text-text-muted">Recommended after completing at least one AI pathway. Free/local tooling is acceptable.</p>
      </div>
    </section>
  )
}
