import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/tracks'

/**
 * PathChoice — Section 05 · Where do you want to go?
 *
 * Four directions, four subpages. Calm, autonomous, user-led.
 * The path can be seen branching as the user makes their choice.
 */
export function PathChoice() {
  return (
    <section>
      <div className="container py-28 md:py-40">
        <div className="text-center">
          <p className="section-label justify-center">Your choice</p>
          <h2 className="font-editorial text-display-lg text-text-primary">
            Where do you want to go?
          </h2>
          <p className="lead mx-auto mt-5 max-w-xl">
            There is no single correct path. Pick the direction that pulls you.
          </p>
        </div>

        {/* Branching motif */}
        <div aria-hidden className="mx-auto mt-16 max-w-xs">
          <svg viewBox="0 0 220 120" className="mx-auto h-24 w-auto text-text-muted" fill="none" stroke="currentColor" strokeWidth={1.25}>
            <path d="M 68 8 V 56" />
            <path d="M 68 56 H 110 V 88" strokeDasharray="2 4" opacity={0.6} />
            <path d="M 110 88 C 92 96 74 98 52 106" />
            <path d="M 110 88 C 130 96 150 96 172 106" />
            <path d="M 68 56 C 40 86 24 96 8 112" />
            <path d="M 68 56 C 30 78 6 78 -14 62" strokeDasharray="2 4" opacity={0.4} />
          </svg>
        </div>

        {/* Four directions */}
        <ul className="mx-auto mt-8 max-w-3xl divide-y divide-border-subtle border-y border-border-default">
          {CATEGORIES.map((cat, i) => (
            <li key={cat.id}>
              <Link
                href={`/paths/${cat.id}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-1 py-7 no-underline sm:grid-cols-[auto_auto_1fr_auto]"
              >
                <span className="font-mono text-sm text-text-muted" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="hidden h-2.5 w-2.5 shrink-0 rounded-full sm:block" style={{ background: cat.color }} aria-hidden />
                <span className="min-w-0">
                  <span className="font-editorial text-3xl text-text-primary">{cat.label}</span>
                  <span className="block text-sm text-text-secondary">{cat.description}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-teal" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}