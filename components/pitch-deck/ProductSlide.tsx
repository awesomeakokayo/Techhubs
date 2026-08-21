'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { getProductStats } from '@/lib/tracks'
import { Map, BookOpen, FolderKanban, Briefcase, Compass, Rocket } from 'lucide-react'

const CAPABILITIES = [
  {
    icon: Map,
    title: 'Structured Learning Tracks',
    description: '22 career-oriented learning paths across four categories: Build, Design, Analyze, and Grow.',
  },
  {
    icon: BookOpen,
    title: 'Curated Resources',
    description: '300+ vetted learning resources, with a strong preference for free materials.',
  },
  {
    icon: FolderKanban,
    title: 'Practical Projects',
    description: '96 portfolio projects designed to build demonstrable, career-relevant competence.',
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    description: 'Career path guides, salary insights, and job-title mapping for each track.',
  },
  {
    icon: Compass,
    title: 'Career Roadmaps',
    description: '17 visual roadmaps showing the complete journey from beginner to career-ready.',
  },
  {
    icon: Rocket,
    title: 'AI-Assisted Learning',
    description: 'AI tools that help learners navigate resources and deepen understanding.',
  },
]

export function ProductSlide() {
  const stats = getProductStats()

  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">The product</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              A complete platform for{' '}
              <span className="italic text-teal">structured technology learning.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 divide-y divide-border-subtle border-y border-border-default sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: String(stats.trackCount), label: 'learning tracks' },
              { value: String(stats.resourceCount), label: 'curated resources' },
              { value: String(stats.projectCount), label: 'projects' },
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
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
              >
                <cap.icon size={20} className="text-teal" aria-hidden />
                <h3 className="mt-3 text-sm font-bold text-text-primary">{cap.title}</h3>
                <p className="mt-1.5 text-sm leading-snug text-text-secondary">{cap.description}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-mono text-xs text-text-muted">
            Every metric is derived from the live catalogue. Nothing inflated.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
