'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { Map, BookOpen, Wrench, TrendingUp, FolderKanban, Target, Sparkles, Users } from 'lucide-react'

const FEATURES = [
  {
    icon: Map,
    title: 'Structured Roadmaps',
    description: 'Clear, sequenced learning paths that show exactly what to learn and in what order.',
  },
  {
    icon: BookOpen,
    title: 'Curated Resources',
    description: 'Quality learning materials, with a strong preference for free, vetted resources.',
  },
  {
    icon: Wrench,
    title: 'Practical Projects',
    description: 'Hands-on projects at every stage to build demonstrable, portfolio-worthy skills.',
  },
  {
    icon: TrendingUp,
    title: 'Skill Progression',
    description: 'A structured journey from foundations to advanced competence in your chosen field.',
  },
  {
    icon: FolderKanban,
    title: 'Portfolio Development',
    description: 'Build a portfolio of real work that demonstrates what you can actually do.',
  },
  {
    icon: Target,
    title: 'Career Preparation',
    description: 'Guidance on translating skills into employment opportunities and career growth.',
  },
  {
    icon: Sparkles,
    title: 'AI-Assisted Learning',
    description: 'AI tools that support learning without replacing the actual learning process.',
  },
  {
    icon: Users,
    title: 'Community & Discovery',
    description: 'Access to a growing ecosystem of learners, resources, and opportunities.',
  },
]

export function SolutionSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">The solution</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              TechSkillHub provides{' '}
              <span className="italic text-teal">
                structured technology learning paths
              </span>{' '}
              that guide users from uncertainty toward practical, demonstrable skills.
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
              >
                <feature.icon
                  size={20}
                  className="mt-0.5 shrink-0 text-teal"
                  aria-hidden
                />
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
