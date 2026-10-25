import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { getTrackIcon } from '@/lib/icons'
import type { GuidedPathSummary } from '@/lib/learner-overview'

function actionLabel(summary: GuidedPathSummary): string {
  if (summary.isComplete) return 'Review path'
  return summary.completedSteps > 0 ? 'Continue' : 'Start'
}

/**
 * Presentational card for a learner's guided path. Shows genuine guided-path
 * progress only (never checklist state).
 */
export function PathSummaryCard({ summary }: { summary: GuidedPathSummary }) {
  const Icon = getTrackIcon(summary.icon)
  const action = actionLabel(summary)

  return (
    <article className="card flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: summary.colorHex + '18', color: summary.colorHex }}
        >
          <Icon size={19} aria-hidden />
        </span>
        <span className={summary.isComplete ? 'badge badge-green' : 'badge badge-teal'}>
          {summary.isComplete ? 'Completed' : 'In progress'}
        </span>
      </div>

      <h3 className="mt-4 font-display font-semibold text-text-primary">{summary.name}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-6 text-text-secondary">
        {summary.nextStepTitle ? `Next: ${summary.nextStepTitle}` : 'Ready to begin.'}
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>{summary.percent}% complete</span>
          <span>
            {summary.completedSteps}/{summary.totalSteps} steps
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border-subtle">
          <div
            className="h-full rounded-full"
            style={{ width: summary.percent + '%', backgroundColor: summary.colorHex }}
          />
        </div>
      </div>

      <Link
        href={'/guided-path/' + summary.trackId}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-grape no-underline hover:text-grape-bright"
      >
        {action}
        <ArrowRight size={14} />
      </Link>
    </article>
  )
}

export function CompletedPathRow({ summary }: { summary: GuidedPathSummary }) {
  const Icon = getTrackIcon(summary.icon)
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border-subtle p-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: summary.colorHex + '18', color: summary.colorHex }}
      >
        <Icon size={18} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{summary.name}</p>
        <p className="inline-flex items-center gap-1.5 text-xs text-text-muted">
          <CheckCircle2 size={12} aria-hidden /> Completed
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link href={`/certificate/${summary.trackId}`} className="btn btn-secondary text-xs">
          Certificate
        </Link>
        <Link href={`/guided-path/${summary.trackId}`} className="btn btn-ghost text-xs">
          Review
        </Link>
      </div>
    </div>
  )
}
