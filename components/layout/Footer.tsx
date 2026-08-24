import { Fragment } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CheckpointNode, PathConnector } from '@/components/ui/path'
import { TypewriterIllustration } from '@/components/ui/TypewriterIllustration'

type NavLink = { href: string; label: string }

const EXPLORE: NavLink[] = [
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/guides', label: 'Guides' },
  { href: '/careers', label: 'Careers' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
]

const LEARN: NavLink[] = [
  { href: '/start', label: 'Start Learning' },
  { href: '/find-your-path', label: 'Find Your Path' },
  { href: '/paths', label: 'Paths' },
  { href: '/guided-path', label: 'Guided Path' },
  { href: '/career', label: 'Career Prep' },
]

const COMPANY: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/ai-guide', label: 'AI Guide' },
  { href: '/pitch-deck', label: 'Pitch Deck' },
]

const STAGES = [
  { index: 1, label: 'Choose a direction' },
  { index: 2, label: 'Follow the roadmap' },
  { index: 3, label: 'Build real projects' },
  { index: 4, label: 'Show the work' },
]

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-void">
      <div className="container px-4 py-16 sm:px-6 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + statement */}
          <div className="relative max-w-sm">
            <Link href="/" className="flex items-baseline gap-1.5 no-underline">
              <span className="font-editorial text-2xl text-text-primary">Tech</span>
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-text-primary">Skill Hub</span>
            </Link>
            <p className="mt-4 font-editorial text-2xl leading-snug text-text-primary">
              Your guide for
              <br />
              independent learning.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Know where to start, what to learn next, and where the path leads.
            </p>
            <Link href="/find-your-path" className="btn btn-primary mt-8 inline-flex items-center gap-2">
              Find Your Path <ArrowRight size={15} className="shrink-0" />
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            <nav aria-label="Explore">
              <p className="section-label mt-2">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {EXPLORE.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text-secondary transition-colors hover:text-teal no-underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Start learning">
              <p className="section-label mt-2">Start learning</p>
              <ul className="mt-4 space-y-2.5">
                {LEARN.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text-secondary transition-colors hover:text-teal no-underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="TechSkillHub">
              <p className="section-label mt-2">TechSkillHub</p>
              <ul className="mt-4 space-y-2.5">
                {COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text-secondary transition-colors hover:text-teal no-underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* The PATH — brand motif */}
        <div aria-hidden className="mt-14 border-t border-border-subtle pt-10">
          <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
            {STAGES.map((stage, i) => (
              <Fragment key={stage.index}>
                {i > 0 && (
                  <div className="hidden min-w-6 flex-1 md:block">
                    <PathConnector active={i <= 1} tone="var(--accent-primary)" />
                  </div>
                )}
                <div className="flex w-20 flex-col items-center gap-3 text-center">
                  <CheckpointNode step={{ index: stage.index, state: i < 2 ? 'done' : 'current' }} size="sm" />
                  <span className="font-display text-xs font-semibold leading-snug text-text-secondary">
                    {stage.label}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <p className="mt-10 text-center font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
            One system. Every path.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
          <p className="text-xs text-text-muted">© 2026 Tech Skill Hub. All rights reserved.</p>
          <div className="flex items-center gap-3 text-text-muted">
            <TypewriterIllustration className="h-5 w-6 text-teal/60" />
            <span className="text-xs">Calm confidence.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}