'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { TrendingUp, Handshake, Megaphone } from 'lucide-react'

const PATHS = [
  {
    icon: TrendingUp,
    title: 'Invest',
    description: 'Support product development and market expansion as TechSkillHub scales across Africa.',
  },
  {
    icon: Handshake,
    title: 'Partner',
    description: 'Universities, organizations, employers, and communities seeking structured digital skills solutions.',
  },
  {
    icon: Megaphone,
    title: 'Amplify',
    description: 'Mentors, creators, and ecosystem partners who can help TechSkillHub reach more learners.',
  },
]

export function TheAskSlide() {
  return (
    <section id="the-ask" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">Partner with TechSkillHub</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              We&apos;re looking for partners who share our vision of{' '}
              <span className="italic text-teal">
                making practical technology education more accessible.
              </span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
            {PATHS.map((path) => (
              <div
                key={path.title}
                className="rounded-[var(--radius-md)] border border-border-default bg-surface p-6 text-center"
              >
                <path.icon size={24} className="mx-auto text-teal" aria-hidden />
                <h3 className="mt-4 font-editorial text-2xl text-text-primary">{path.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{path.description}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-text-secondary">
            No specific fundraising target is being publicly disclosed at this stage.
            We are open to conversations with aligned investors, partners, and ecosystem
            participants.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
