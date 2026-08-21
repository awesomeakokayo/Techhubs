'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { Handshake, GraduationCap, Briefcase, Users, Lightbulb, TrendingUp } from 'lucide-react'

const OPPORTUNITIES = [
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    description:
      'We are looking for strategic partners who share our vision of making practical technology education more accessible across Africa.',
  },
  {
    icon: GraduationCap,
    title: 'University Partnerships',
    description:
      'Collaborate with universities to supplement curricula with structured, practical learning paths.',
  },
  {
    icon: Briefcase,
    title: 'Employer Partnerships',
    description:
      'Connect with employers who want access to career-ready technology professionals with demonstrable skills.',
  },
  {
    icon: Users,
    title: 'Mentors & Advisors',
    description:
      'We welcome advisors and mentors with experience in education, technology, and scaling platforms across Africa.',
  },
  {
    icon: Lightbulb,
    title: 'Investors',
    description:
      'Investors who believe in the opportunity to build infrastructure for technology skills development on the continent.',
  },
  {
    icon: TrendingUp,
    title: 'Organizations',
    description:
      'NGOs, foundations, and government organizations seeking structured digital skills solutions for workforce development.',
  },
]

export function TheAskSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">The ask</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              We&apos;re building the future of{' '}
              <span className="italic text-teal">technology skills development</span> in Africa.
            </h2>
            <p className="lead mx-auto mt-4">
              We&apos;re looking for strategic partners who share our vision of making practical
              technology education more accessible across Africa.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OPPORTUNITIES.map((opp) => (
              <div
                key={opp.title}
                className="rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
              >
                <opp.icon size={20} className="text-teal" aria-hidden />
                <h3 className="mt-3 text-sm font-bold text-text-primary">{opp.title}</h3>
                <p className="mt-1.5 text-sm leading-snug text-text-secondary">{opp.description}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
