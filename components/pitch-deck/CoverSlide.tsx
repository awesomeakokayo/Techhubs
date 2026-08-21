'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function CoverSlide() {
  return (
    <section
      className="relative overflow-hidden bg-void"
      style={{
        backgroundImage:
          'radial-gradient(78% 72% at 50% 42%, transparent 30%, var(--bg-void) 92%)',
      }}
    >
      <div className="container relative flex min-h-[90vh] flex-col items-center justify-center py-24 text-center md:min-h-screen md:py-32">
        <AnimateIn>
          <p className="section-label justify-center whitespace-nowrap text-teal">
            <span aria-hidden className="hidden h-px w-5 bg-teal sm:inline-block" />
            Pitch Deck
            <span aria-hidden className="hidden h-px w-5 bg-teal sm:inline-block" />
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <h1 className="mt-8 font-editorial text-display-xl text-text-primary">
            Tech<span className="text-teal">Skill</span>Hub
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className="mt-6 font-editorial text-display-md italic text-teal">
            Learn. Build. Become.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="lead mx-auto mt-6 max-w-xl text-center text-text-secondary">
            Structured, practical technology education built for Africa.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.4}>
          <div className="mt-12 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/"
              className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              Explore TechSkillHub <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.5}>
          <p className="mt-16 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
            techskillhub.cv/pitch-deck
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
