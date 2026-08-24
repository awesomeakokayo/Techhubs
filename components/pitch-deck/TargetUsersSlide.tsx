'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { GraduationCap, User, ArrowRightLeft, TrendingUp, Building2, Briefcase, Globe, Heart } from 'lucide-react'

const USERS = [
  { icon: GraduationCap, title: 'Students', description: 'University and college students building practical tech skills.' },
  { icon: User, title: 'Beginners', description: 'People entering technology for the first time who need a clear starting point.' },
  { icon: ArrowRightLeft, title: 'Career Switchers', description: 'Professionals transitioning into technology from other fields.' },
  { icon: TrendingUp, title: 'Self-Taught Developers', description: 'Independent learners who want structure and a path forward.' },
]

const BUYERS = [
  { icon: Building2, title: 'Universities', description: 'Institutions seeking structured supplementary tech education for students.' },
  { icon: Briefcase, title: 'Employers', description: 'Organizations wanting to upskill teams or find talent with demonstrable competence.' },
  { icon: Heart, title: 'NGOs & Foundations', description: 'Digital skills organizations and workforce development programs.' },
  { icon: Globe, title: 'Communities', description: 'Developer communities and tech clubs looking for structured learning resources.' },
]

export function TargetUsersSlide() {
  return (
    <section id="target-users" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Target users</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Built for learners.{' '}
              <span className="italic text-teal">Designed for the ecosystem around them.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl">
            <h3 className="mb-4 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Users — who learns
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {USERS.map((user) => (
                <div
                  key={user.title}
                  className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
                >
                  <user.icon size={20} className="mt-0.5 shrink-0 text-teal" aria-hidden />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{user.title}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{user.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-10 max-w-4xl">
            <h3 className="mb-4 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Economic buyers &amp; strategic partners — who pays or amplifies
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BUYERS.map((buyer) => (
                <div
                  key={buyer.title}
                  className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
                >
                  <buyer.icon size={20} className="mt-0.5 shrink-0 text-amber" aria-hidden />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">{buyer.title}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{buyer.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
