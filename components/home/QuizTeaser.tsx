'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Zap } from 'lucide-react'

const QUIZ_OPTIONS = ['Frontend Dev', 'Data Science', 'UI/UX Design', 'Backend Dev']

export function QuizTeaser() {
  const router = useRouter()

  return (
    <section className="container py-10 md:py-14">
      <div className="relative overflow-hidden rounded-2xl border border-teal/20 bg-teal/[0.04] px-8 py-10 md:px-12 md:py-12">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: 'var(--color-teal)' }}
          aria-hidden
        />

        <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left md:gap-12 md:items-center">
          {/* Left */}
          <div className="flex-1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal/15 border border-teal/25 px-4 py-1.5 text-sm font-semibold text-teal">
              <Zap size={13} />
              2-minute quiz
            </div>
            <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
              Not sure where to start?
            </h2>
            <p className="mt-2 text-text-secondary max-w-md">
              Answer a few quick questions about your goals — we&apos;ll point you to
              the exact track that fits.
            </p>
            <button
              onClick={() => router.push('/start-here')}
              className="btn btn-primary mt-6 inline-flex items-center gap-2"
            >
              Find my track <ArrowRight size={16} />
            </button>
          </div>

          {/* Right — sample track pills */}
          <div className="flex flex-wrap justify-center gap-2 md:flex-col md:items-start md:gap-3 md:justify-start shrink-0" aria-hidden>
            {QUIZ_OPTIONS.map((opt, i) => (
              <span
                key={opt}
                className="rounded-xl border border-border-subtle bg-surface px-4 py-2 text-sm font-medium text-text-secondary"
                style={{ opacity: 1 - i * 0.18 }}
              >
                {opt}
              </span>
            ))}
            <span className="rounded-xl border border-teal/30 bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
              + more →
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
