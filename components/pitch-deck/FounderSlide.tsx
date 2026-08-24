'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

export function FounderSlide() {
  return (
    <section id="founder" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">The founder</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Built by someone who{' '}
              <span className="italic text-teal">understands the problem firsthand.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-[var(--radius-md)] border border-border-default bg-surface p-8">
              <h3 className="font-editorial text-2xl text-text-primary">Awesome Akokayo</h3>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                Founder &amp; Builder
              </p>

              <div className="mt-6 space-y-4">
                <p className="text-sm text-text-secondary">
                  Awesome is a software engineer and technology product builder with a background
                  in Computer Science. He has experience building technology products and
                  understands the challenges of learning technology skills independently.
                </p>
                <p className="text-sm text-text-secondary">
                  TechSkillHub was born from a personal understanding of the problem: the gap
                  between wanting to learn technology and knowing what to learn, how to practice,
                  and how to demonstrate competence.
                </p>
                <p className="text-sm text-text-secondary">
                  The platform reflects a belief that structured, practical learning paths can
                  make technology education more accessible and effective for African learners
                  and independent learners everywhere.
                </p>
              </div>

              <div className="mt-6 rounded-[var(--radius-md)] bg-elevated p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  Why this founder?
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  <strong className="text-text-primary">Founder-market-product fit:</strong>{' '}
                  Awesome experienced the exact problem TechSkillHub solves — the confusion of
                  learning technology independently — and built the solution he wished existed.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
