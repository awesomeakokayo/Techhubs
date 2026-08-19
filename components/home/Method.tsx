import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CheckpointNode } from '@/components/ui/path'

const MOVES = [
  {
    index: 1,
    title: 'Choose',
    caption: 'Find the right direction for your goals — before you invest months in the wrong one.',
    cta: { label: 'Take the quiz', href: '/start-here' },
  },
  {
    index: 2,
    title: 'Learn',
    caption: 'Follow a structured roadmap: foundations first, then the tools professionals actually use.',
    cta: { label: 'View a roadmap', href: '/roadmaps' },
  },
  {
    index: 3,
    title: 'Build',
    caption: 'Turn knowledge into projects you can show. This is where learning becomes evidence.',
    cta: { label: 'Browse projects', href: '/projects' },
  },
  {
    index: 4,
    title: 'Move forward',
    caption: 'Turn projects into a portfolio, a freelance practice, or a career in technology.',
    cta: { label: 'Career preparation', href: '/career' },
  },
]

export function Method() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="section-label">The method</p>
            <h2 className="font-editorial text-display-lg">Four moves. One direction.</h2>
            <p className="lead mt-5">
              Independent learning fails when it has no sequence. The method solves that:
              choose a direction, follow a path, build the work, move forward.
            </p>
            <div className="mt-6 hidden items-center gap-2 lg:flex" aria-hidden>
              <CheckpointNode
                step={{ index: 1, state: 'done' }}
              />
              <span className="path-connector !min-w-0" style={{ width: '2.5rem' }} />
              <CheckpointNode
                step={{ index: 4, state: 'current' }}
              />
              <span className="ml-2 font-mono text-xs uppercase tracking-widest text-text-muted">
                repeat with the next path
              </span>
            </div>
          </div>

          <ol className="relative border-l border-border-default pl-0">
            {MOVES.map((move) => (
              <li key={move.index} className="relative pb-12 last:pb-0 pl-12">
                <span className="absolute left-[-1.125rem] top-0">
                  <CheckpointNode step={{ index: move.index, state: 'current' }} />
                </span>
                <h3 className="font-editorial text-2xl">{move.title}</h3>
                <p className="mt-2 max-w-none text-text-secondary">{move.caption}</p>
                <Link
                  href={move.cta.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
                >
                  {move.cta.label} <ArrowRight size={14} className="shrink-0" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}