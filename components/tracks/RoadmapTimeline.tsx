'use client'

import { Check, Loader2 } from 'lucide-react'
import { Stage, Resource } from '@/lib/tracks'
import { trackEvent, trackRoadmapCompletion } from '@/lib/analytics'
import { ResourceItem } from './ResourceItem'

interface RoadmapTimelineProps {
  trackSlug: string
  stages: Stage[]
  colorHex: string
  resourcesByStage: Record<number, Resource[]>
  completedStages: ReadonlySet<number>
  pending: ReadonlySet<string>
  ready: boolean
  onToggleStage: (stageId: number) => void
}

/**
 * RoadmapTimeline — vertical step timeline.
 *
 * Stage completion is supplied by the parent (authoritative checklist state);
 * this component never reads local storage during render.
 */
export function RoadmapTimeline({
  trackSlug,
  stages,
  colorHex,
  resourcesByStage,
  completedStages,
  pending,
  ready,
  onToggleStage,
}: RoadmapTimelineProps) {
  const handleToggle = (stageId: number) => {
    if (!ready) return
    const stage = stages.find((item) => item.id === stageId)
    const isCompleted = completedStages.has(stageId)
    onToggleStage(stageId)
    if (!isCompleted) {
      const label = stage ? stage.title : `Stage ${stageId}`
      trackEvent({ event_name: 'stage_complete', track_slug: trackSlug, roadmap_stage: label })
      trackEvent({ event_name: 'roadmap_stage_complete', track_slug: trackSlug, roadmap_stage: label })
      trackRoadmapCompletion({ track_slug: trackSlug, roadmap_stage: label })
    }
  }

  return (
    <ol className="relative">
      {stages.map((stage, index) => {
        const done = completedStages.has(stage.id)
        const isPending = pending.has(`STAGE:${stage.id}`)
        const isLast = index === stages.length - 1
        const resources = resourcesByStage[stage.id] ?? []

        return (
          <li key={stage.id} className="relative flex gap-4 pb-10 sm:gap-6">
            {/* Rail: node + connector */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleToggle(stage.id)}
                disabled={!ready || isPending}
                className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors disabled:opacity-60"
                style={{
                  borderColor: done ? colorHex : 'var(--border-default)',
                  backgroundColor: done ? colorHex : 'var(--bg-deep)',
                }}
                aria-pressed={done}
                aria-label={done ? `Mark step ${stage.id} incomplete` : `Mark step ${stage.id} complete`}
              >
                {isPending ? (
                  <Loader2 size={15} className="animate-spin text-text-secondary" aria-hidden />
                ) : done ? (
                  <Check size={16} className="text-text-inverse" strokeWidth={3} />
                ) : (
                  <span className="font-mono text-xs font-semibold text-text-secondary">{stage.id}</span>
                )}
              </button>
              {!isLast && (
                <span
                  className="mt-1 w-px flex-1"
                  style={{
                    background: done
                      ? colorHex
                      : 'repeating-linear-gradient(to bottom, var(--border-default) 0, var(--border-default) 5px, transparent 5px, transparent 10px)',
                  }}
                  aria-hidden
                />
              )}
            </div>

            {/* Step content */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Step {stage.id}
                </span>
                <span className="badge badge-teal">{stage.duration}</span>
                {done && <span className="badge badge-green">Completed</span>}
              </div>

              <h3 className="mt-1.5 font-display text-xl font-semibold text-text-primary">
                {stage.title}
              </h3>
              <p className="mt-2 max-w-none text-sm leading-6 text-text-secondary">{stage.description}</p>

              {stage.topics?.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {stage.topics.map((topic) => (
                    <li key={topic} className="badge border border-border-default text-text-muted">
                      {topic}
                    </li>
                  ))}
                </ul>
              )}

              {resources.length > 0 && (
                <div className="mt-5 rounded-xl border border-border-subtle bg-elevated/40 p-4">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                    Resources for this step
                  </p>
                  <div className="mt-3 space-y-3">
                    {resources.map((resource) => (
                      <ResourceItem
                        key={resource.id}
                        resource={resource}
                        trackSlug={trackSlug}
                        path={`/tracks/${trackSlug}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleToggle(stage.id)}
                disabled={!ready || isPending}
                className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-grape hover:text-grape-bright disabled:opacity-60"
              >
                {isPending ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Check size={15} aria-hidden />}
                {isPending ? 'Saving…' : done ? 'Mark step incomplete' : 'Mark step complete'}
              </button>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
