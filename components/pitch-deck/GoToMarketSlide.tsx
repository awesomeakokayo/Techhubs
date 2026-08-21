'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { GraduationCap, Hash, Video, Search, Users, Handshake, Megaphone, Globe } from 'lucide-react'

const CHANNELS = [
  {
    icon: GraduationCap,
    title: 'University Communities',
    description: 'Direct outreach to CS and tech student communities.',
    priority: 'High',
  },
  {
    icon: Users,
    title: 'Student Ambassadors',
    description: 'Campus representatives promoting TechSkillHub locally.',
    priority: 'High',
  },
  {
    icon: Video,
    title: 'TikTok & Instagram',
    description: 'Short-form content showcasing learning paths and project outcomes.',
    priority: 'High',
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Organic traffic through guides, roadmaps, and career content.',
    priority: 'High',
  },
  {
    icon: Hash,
    title: 'Developer Communities',
    description: 'Engagement on X, Discord, and local meetups.',
    priority: 'Medium',
  },
  {
    icon: Megaphone,
    title: 'YouTube',
    description: 'Long-form educational content and project walkthroughs.',
    priority: 'Medium',
  },
  {
    icon: Handshake,
    title: 'Strategic Partnerships',
    description: 'University, company, and NGO partnerships.',
    priority: 'Medium',
  },
  {
    icon: Globe,
    title: 'Referrals',
    description: 'Word-of-mouth through shared learning paths.',
    priority: 'Medium',
  },
]

const FLYWHEEL = ['Content', 'Learners', 'Projects', 'Success Stories', 'Community', 'Referrals']

export function GoToMarketSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Go-to-market</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Reaching learners{' '}
              <span className="italic text-teal">where they already are.</span>
            </h2>
          </div>
        </AnimateIn>

        {/* Flywheel */}
        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl">
            <h3 className="mb-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Growth flywheel
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
              {FLYWHEEL.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-[var(--radius-full)] border border-teal bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal">
                    {step}
                  </span>
                  {i < FLYWHEEL.length - 1 && (
                    <span className="text-text-muted">→</span>
                  )}
                </span>
              ))}
              <span className="flex items-center gap-2">
                <span className="text-text-muted">→</span>
                <span className="rounded-[var(--radius-full)] border border-teal bg-teal px-4 py-1.5 text-sm font-semibold text-text-inverse">
                  More learners
                </span>
              </span>
            </div>
          </div>
        </AnimateIn>

        {/* Channels */}
        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHANNELS.map((ch) => (
                <div
                  key={ch.title}
                  className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-4"
                >
                  <ch.icon size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-text-primary">{ch.title}</h3>
                      <span
                        className={`badge ${
                          ch.priority === 'High' ? 'badge-teal' : 'badge-amber'
                        }`}
                      >
                        {ch.priority}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-text-secondary">{ch.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            Distribution strategy is based on channels accessible to an early-stage company
            with limited resources. No large-scale growth is implied.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
