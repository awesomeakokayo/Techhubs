'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Briefcase, Compass, FolderKanban, Map } from 'lucide-react'
import {
  LearningJourney,
  JourneyKind,
  getJourneySteps,
} from '@/lib/seo/journeys'
import { trackNextStepClick } from '@/lib/analytics'

const KIND_META: Record<JourneyKind, { label: string; icon: typeof BookOpen }> = {
  guide: { label: 'Guide', icon: BookOpen },
  roadmap: { label: 'Roadmap', icon: Map },
  project: { label: 'Project', icon: FolderKanban },
  career: { label: 'Career', icon: Briefcase },
  resource: { label: 'Resources', icon: BookOpen },
  start: { label: 'Start', icon: Compass },
}

interface LearningFunnelProps {
  journey: LearningJourney
  /** The currently-visited page's path — highlighted in the funnel. */
  currentHref: string
  trackingPath: string
}

/**
 * Contextual next-step system rendered structurally: the learner sees the
 * full journey (guide → roadmap → project → career → next skill) and can
 * advance one step. Each advance fires `next_step_click`.
 */
export function LearningFunnel({ journey, currentHref, trackingPath }: LearningFunnelProps) {
  const steps = getJourneySteps(journey)
  const currentIndex = steps.findIndex((s) => s.href === currentHref)

  return (
    <section className="panel mt-10 border-teal" aria-label="Your learning path">
      <h2 className="font-display text-2xl font-bold text-text-primary">
        Keep learning
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        Golden path to your goal: {journey.goal.toLowerCase()}.
      </p>

      <ol className="mt-5 space-y-3">
        {steps.map((step, i) => {
          const meta = KIND_META[step.kind] ?? KIND_META.guide
          const Icon = meta.icon
          const isCurrent = step.href === currentHref
          const isDone = currentIndex >= 0 && i < currentIndex

          return (
            <li key={step.href}>
              {isCurrent ? (
                <div
                  aria-current="step"
                  className="flex items-start gap-3 rounded-md border border-teal bg-teal-50 px-4 py-3"
                >
                  <span className="path-node is-active mt-0.5 shrink-0">{i + 1}</span>
                  <span className="mt-1 text-teal" aria-hidden>
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
                      {meta.label} · you are here
                    </span>
                    <span className="font-display text-base text-text-primary">{step.label}</span>
                    <span className="mt-0.5 block text-sm text-text-secondary">{step.description}</span>
                  </span>
                </div>
              ) : (
                <Link
                  href={step.href}
                  onClick={() =>
                    trackNextStepClick({
                      path: trackingPath,
                      step_label: step.label,
                      step_href: step.href,
                      step_kind: step.kind,
                    })
                  }
                  className="group flex items-start gap-3 rounded-md border border-border-default px-4 py-3 no-underline transition-colors hover:border-teal"
                >
                  <span className="path-node mt-0.5 shrink-0">{i + 1}</span>
                  <span className="mt-1 text-text-muted transition-colors group-hover:text-teal" aria-hidden>
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
                      {isDone ? `${meta.label} · done` : `Next: ${meta.label.toLowerCase()}`}
                    </span>
                    <span className="font-display text-base text-text-primary group-hover:text-teal">
                      {step.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-text-secondary">{step.description}</span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="mt-4 shrink-0 text-text-muted transition-transform group-hover:-rotate-45 group-hover:text-teal"
                  />
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}