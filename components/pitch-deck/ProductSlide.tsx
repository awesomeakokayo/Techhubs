'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { getProductStats } from '@/lib/tracks'
import { Map, BookOpen, FolderKanban, Briefcase, Compass, Rocket } from 'lucide-react'

const CAPABILITIES = [
  {
    icon: Map,
    title: 'Learning Tracks',
    value: '22 tracks',
    annotation: 'Removes learning-path confusion',
  },
  {
    icon: Compass,
    title: 'Career Roadmaps',
    value: '17 roadmaps',
    annotation: 'Shows the complete beginner-to-career journey',
  },
  {
    icon: FolderKanban,
    title: 'Portfolio Projects',
    value: '96 projects',
    annotation: 'Turns knowledge into evidence',
  },
  {
    icon: BookOpen,
    title: 'Curated Resources',
    value: 'resources',
    annotation: 'Quality materials with free-first approach',
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    value: '5 career paths',
    annotation: 'Connects learning to employability',
  },
  {
    icon: Rocket,
    title: 'AI-Assisted Learning',
    value: 'AI tools',
    annotation: 'Supports the journey without replacing the effort',
  },
]

export function ProductSlide() {
  const stats = getProductStats()

  // Update the resources value dynamically
  CAPABILITIES[3].value = `${stats.resourceCount} resources`

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
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
                >
                  <cap.icon size={20} className="text-teal" aria-hidden />
                  <h3 className="mt-3 text-sm font-bold text-text-primary">{cap.title}</h3>
                  <p className="mt-1 font-mono text-xs text-teal">{cap.value}</p>
                  <p className="mt-1.5 text-sm leading-snug text-text-secondary">{cap.annotation}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-mono text-xs text-text-muted">
            Every metric is derived from the live catalogue. Nothing inflated.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
