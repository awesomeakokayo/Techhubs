'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const PHASES = [
  {
    number: '01',
    title: 'Structured Learning Infrastructure',
    status: 'In progress',
    statusColor: 'badge-teal',
    description: 'Roadmaps, tracks, resources, and the core learning experience.',
  },
  {
    number: '02',
    title: 'Projects + Portfolios',
    status: 'In progress',
    statusColor: 'badge-teal',
    description: 'Practical projects and portfolio development for every learning path.',
  },
  {
    number: '03',
    title: 'AI-Assisted Personalization',
    status: 'Planned',
    statusColor: 'badge-amber',
    description: 'AI tools that personalize the learning journey and provide contextual support.',
  },
  {
    number: '04',
    title: 'Skills Assessment',
    status: 'Planned',
    statusColor: 'badge-amber',
    description: 'Assessment tools that validate competence and readiness for opportunities.',
  },
  {
    number: '05',
    title: 'Employer Connections',
    status: 'Planned',
    statusColor: 'badge-amber',
    description: 'Connecting career-ready learners with employers and opportunities.',
  },
  {
    number: '06',
    title: 'Institutional Partnerships',
    status: 'Planned',
    statusColor: 'badge-amber',
    description: 'University and organization partnerships for structured learning programs.',
  },
  {
    number: '07',
    title: 'Pan-African Expansion',
    status: 'Planned',
    statusColor: 'badge-amber',
    description: 'Scaling across the continent with localized content and regional partnerships.',
  },
]

export function RoadmapSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Roadmap</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Building toward{' '}
              <span className="italic text-teal">infrastructure for technology skills.</span>
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <ol className="space-y-0">
              {PHASES.map((phase, i) => (
                <li key={phase.number} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < PHASES.length - 1 && (
                    <span
                      className="absolute left-[17px] top-12 h-[calc(100%-1rem)] w-px"
                      style={{ background: 'var(--border-default)' }}
                    />
                  )}
                  <span className="relative z-10">
                    <span
                      className={`path-node ${
                        phase.status === 'In progress' ? 'is-active' : ''
                      }`}
                    >
                      {phase.number}
                    </span>
                  </span>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-text-primary">{phase.title}</h3>
                      <span className={`badge ${phase.statusColor}`}>{phase.status}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-text-secondary">{phase.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
