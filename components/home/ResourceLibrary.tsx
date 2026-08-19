import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, Layout, Monitor, PenTool, Hammer } from 'lucide-react'
import { getProductStats, getTrackById } from '@/lib/tracks'

const TYPES = [
  { label: 'Docs', icon: FileText },
  { label: 'Videos', icon: Monitor },
  { label: 'Practice', icon: Hammer },
  { label: 'Books', icon: BookOpen },
  { label: 'Tools', icon: Layout },
  { label: 'Community', icon: PenTool },
]

export function ResourceLibrary() {
  const stats = getProductStats()
  const track = getTrackById('frontend')
  const sample = track?.resources.slice(0, 4) ?? []

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-label">The resource library</p>
            <h2 className="font-editorial text-display-lg">
              Curated. Not collected.
            </h2>
            <p className="lead mt-5 max-w-none">
              Anyone can dump a hundred links. Tech Skill Hub organizes {stats.resourceCount} resources
              into the right type, mapped to the right stage of the right track — so you spend
              time learning, not link-hopping.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {TYPES.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-elevated px-3 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-secondary"
                >
                  <Icon size={12} className="text-teal" aria-hidden />
                  {label}
                </span>
              ))}
            </div>

            <Link
              href="/resources"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
            >
              Explore the resource library <ArrowRight size={14} className="shrink-0" />
            </Link>
          </div>

          <ul className="divide-y divide-border-subtle border-y border-border-default">
            {sample.map((resource) => (
              <li key={resource.id}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-6 py-5 no-underline"
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-[15px] font-semibold text-text-primary">{resource.title}</span>
                      {resource.free ? (
                        <span className="badge badge-green">Free</span>
                      ) : (
                        <span className="badge badge-amber">Paid</span>
                      )}
                    </span>
                    <span className="mt-1 block truncate font-mono text-xs text-text-muted">{resource.source}</span>
                  </span>
                  <ArrowRight
                    size={14}
                    className="hidden shrink-0 text-text-muted transition-all group-hover:translate-x-1 group-hover:text-teal sm:block"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}