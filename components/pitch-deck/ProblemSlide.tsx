'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { AlertTriangle, BookOpen, Briefcase, DollarSign, HelpCircle, Layers, Users, Zap } from 'lucide-react'

const PROBLEMS = [
  { icon: Layers, text: 'Information overload with no clear starting point' },
  { icon: BookOpen, text: 'Too many disconnected tutorials and courses' },
  { icon: HelpCircle, text: 'Difficulty knowing what skills actually matter' },
  { icon: Zap, text: 'Lack of practical, project-based experience' },
  { icon: Briefcase, text: 'Weak portfolios that do not demonstrate competence' },
  { icon: Users, text: 'Limited mentorship and guidance' },
  { icon: AlertTriangle, text: 'Hard to translate learning into employment' },
  { icon: DollarSign, text: 'Cost barriers to quality learning resources' },
]

export function ProblemSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">The problem</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Many aspiring tech professionals in Africa{' '}
              <span className="italic text-teal">want to enter the industry</span> but face real
              barriers.
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {PROBLEMS.map((problem) => (
              <div
                key={problem.text}
                className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
              >
                <problem.icon
                  size={20}
                  className="mt-0.5 shrink-0 text-amber"
                  aria-hidden
                />
                <p className="text-sm leading-snug text-text-secondary">{problem.text}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <p className="lead text-text-secondary">
              The result is a generation of talented individuals who{' '}
              <strong className="text-text-primary">want to learn</strong> but struggle to find a
              clear, structured path from curiosity to competence.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
