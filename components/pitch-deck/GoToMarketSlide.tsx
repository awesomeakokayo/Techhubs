'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'
import { GraduationCap, Hash, Video, Search, Users, Handshake, Megaphone, Globe } from 'lucide-react'

const CHANNELS = [
  {
    icon: GraduationCap,
    title: 'University Communities',
    description: 'Direct outreach to computer science and tech student communities at universities.',
    priority: 'High',
  },
  {
    icon: Hash,
    title: 'Developer Communities',
    description: 'Engagement with tech communities on X, Discord, and local developer meetups.',
    priority: 'High',
  },
  {
    icon: Video,
    title: 'TikTok & Instagram',
    description: 'Short-form educational content showcasing learning paths and project outcomes.',
    priority: 'High',
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Organic search traffic through guides, roadmaps, and career-focused content.',
    priority: 'High',
  },
  {
    icon: Users,
    title: 'Ambassador Program',
    description: 'Student ambassadors at universities promoting TechSkillHub within their communities.',
    priority: 'Medium',
  },
  {
    icon: Handshake,
    title: 'Partnerships',
    description: 'Strategic partnerships with universities, tech companies, and NGOs.',
    priority: 'Medium',
  },
  {
    icon: Megaphone,
    title: 'YouTube',
    description: 'Long-form educational content and project walkthroughs.',
    priority: 'Medium',
  },
  {
    icon: Globe,
    title: 'Referral Programs',
    description: 'Word-of-mouth growth through learner referrals and shared learning paths.',
    priority: 'Medium',
  },
]

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

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {CHANNELS.map((ch) => (
              <div
                key={ch.title}
                className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-default bg-surface p-5"
              >
                <ch.icon size={20} className="mt-0.5 shrink-0 text-teal" aria-hidden />
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
                  <p className="mt-1 text-sm text-text-secondary">{ch.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
