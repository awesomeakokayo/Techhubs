import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { TypewriterIllustration } from '@/components/ui/TypewriterIllustration'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata = {
  title: 'Guided Path | Tech Skill Hub',
  description: 'A more deliberate, structured learning experience when you want help staying on course.',
}

const BENEFITS = [
  'A sequenced, step-by-step course per track',
  'Quizzes and checkpoints that test what you learned',
  'Progress synced across all your devices',
  'Guided projects from concept to finish',
]

export default function GuidedPathOverviewPage() {
  return (
    <div className="section pt-16">
      <PageViewTracker path="/guided-path" eventName="guided_path_overview_open" />

      <div className="relative overflow-hidden bg-deep">
        <div className="container relative">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-8 select-none opacity-[0.06]">
            <TypewriterIllustration className="h-60 w-64 text-teal" />
          </div>
          <PageHeader
            title="Guided Path"
            subtitle="Everything you need to learn is free, forever. Guided Path is for when you want help staying on course."
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Guided Path' }]}
          />
        </div>
      </div>

      <div className="container max-w-3xl">
        <p className="lead text-text-secondary">
          You have a direction. You know the stages. Guided Path hands you the same
          roadmap as a deliberate, tracked experience — so your learning keeps moving.
        </p>

        <ul className="mt-12 grid gap-3">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 border border-border-default bg-surface p-5" style={{ borderRadius: 'var(--radius-md)' }}>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal" aria-hidden>
                <Check size={14} strokeWidth={2.5} />
              </span>
              <p className="text-sm text-text-primary">{benefit}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center">
          <Link href="/find-your-path" className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
            Start on your path <ArrowRight size={16} className="shrink-0" />
          </Link>
          <Link href="/paths" className="btn btn-secondary inline-flex w-full items-center justify-center sm:w-auto">
            Explore paths
          </Link>
        </div>

        <p className="mt-6 font-mono text-xs text-text-muted">
          Guided Path unlocks from any free track. See one in action.
        </p>
        <Link
          href="/guided-path/frontend"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
        >
          Try the Frontend Guided Path <ArrowUpRight size={14} className="shrink-0" />
        </Link>
      </div>
    </div>
  )
}