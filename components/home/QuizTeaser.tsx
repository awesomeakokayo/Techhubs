import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function QuizTeaser() {
  return (
    <section className="section">
      <div className="container">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-2xl border border-border-default bg-elevated p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">Not sure where to start?</h2>
                <p className="mt-3 text-text-secondary max-w-none">
                  Answer 3 quick questions and we&apos;ll point you to the right track.
                </p>
                <Link href="/start-here#quiz" className="btn btn-primary mt-8">
                  Take the Quiz →
                </Link>
              </div>

              <div className="flex justify-center" aria-hidden>
                <svg viewBox="0 0 200 160" className="h-40 w-full max-w-[240px] text-teal/40" fill="none">
                  <circle cx="100" cy="20" r="12" stroke="currentColor" strokeWidth="2" fill="var(--bg-surface)" />
                  <text x="100" y="24" textAnchor="middle" fill="var(--accent-primary)" fontSize="8" fontFamily="monospace">?</text>
                  <line x1="100" y1="32" x2="50" y2="70" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="100" y1="32" x2="150" y2="70" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="50" y1="70" x2="30" y2="120" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="50" y1="70" x2="70" y2="120" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="150" y1="70" x2="130" y2="120" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="150" y1="70" x2="170" y2="120" stroke="currentColor" strokeWidth="1.5" />
                  {[30, 70, 130, 170].map((x) => (
                    <circle key={x} cx={x} cy="120" r="10" stroke="var(--accent-primary)" strokeWidth="1.5" fill="var(--bg-elevated)" opacity="0.6" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
