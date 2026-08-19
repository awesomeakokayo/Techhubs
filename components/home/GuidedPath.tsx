'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ArrowRight, Check } from 'lucide-react'

const FREE_FEATURES = [
  'All 22 tracks, roadmaps and resources',
  'Projects with step-by-step leveling',
  'Progress saved on your device',
  'No account, no signup required',
]

const GUIDED_FEATURES = [
  'A sequenced, step-by-step course per track',
  'Quizzes and checkpoints that test you',
  'Progress synced across all your devices',
  'Guided projects from concept to finish',
]

export function GuidedPath() {
  const { data: session } = useSession()
  const isAuthenticated = !!session
  const ctaHref = isAuthenticated ? '/tracks' : '/login?next=/tracks'

  return (
    <section className="section bg-elevated">
      <div className="container">
        <div className="max-w-2xl">
          <p className="section-label">Guided Path</p>
          <h2 className="font-editorial text-display-lg">
            The knowledge is free. The structure can go further.
          </h2>
          <p className="lead mt-4">
            Everything you need to learn is free, forever. Guided Path is for when you want
            the same material delivered as a sequenced, tracked, hands-on course.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-border-default bg-border-default lg:grid-cols-2">
          {/* Free */}
          <div className="flex flex-col bg-surface p-8 md:p-10">
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
              Free · The knowledge
            </p>
            <ul className="mt-6 flex-1 space-y-3.5">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-text-primary">
                  <Check size={16} className="mt-0.5 shrink-0 text-teal" strokeWidth={2.5} aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/tracks" className="btn btn-secondary mt-8 w-fit inline-flex items-center gap-2">
              Start for free <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>

          {/* Guided Path */}
          <div className="flex flex-col bg-surface p-8 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-teal">
                Guided Path · The experience
              </p>
              <span className="badge badge-teal">Per course &#183; from $4.99 / &#8358;2,450</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3.5">
              {GUIDED_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-text-primary">
                  <Check size={16} className="mt-0.5 shrink-0 text-teal" strokeWidth={2.5} aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={ctaHref} className="btn btn-primary mt-8 w-fit inline-flex items-center gap-2">
              Try Guided Path <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}