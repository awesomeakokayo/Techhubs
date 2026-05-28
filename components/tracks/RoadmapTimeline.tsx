'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Stage } from '@/lib/tracks'
import { toggleStage, getTrackProgress } from '@/lib/progress'

interface RoadmapTimelineProps {
  trackId: string
  stages: Stage[]
  colorHex: string
  onProgressChange?: () => void
}

export function RoadmapTimeline({ trackId, stages, colorHex, onProgressChange }: RoadmapTimelineProps) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const progress = getTrackProgress(trackId)

  const handleToggle = (stageId: number) => {
    toggleStage(trackId, stageId, stages.length)
    onProgressChange?.()
  }

  return (
    <ol className="relative space-y-0">
      {stages.map((stage, index) => {
        const done = progress.completedStages.includes(stage.id)
        const isExpanded = expanded === stage.id
        const isLast = index === stages.length - 1

        return (
          <li key={stage.id} className="relative flex gap-6 pb-8">
            {!isLast && (
              <div
                className="absolute left-[11px] top-6 h-[calc(100%-8px)] w-0.5"
                style={{
                  background: done
                    ? colorHex
                    : 'repeating-linear-gradient(to bottom, var(--border-default) 0, var(--border-default) 6px, transparent 6px, transparent 12px)',
                }}
                aria-hidden
              />
            )}
            <button
              type="button"
              onClick={() => handleToggle(stage.id)}
              className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
              style={{
                borderColor: done ? colorHex : 'var(--border-default)',
                backgroundColor: done ? colorHex : 'var(--bg-deep)',
              }}
              aria-label={done ? `Mark stage ${stage.id} incomplete` : `Mark stage ${stage.id} complete`}
            >
              {done && <Check size={12} className="text-text-inverse" strokeWidth={3} />}
            </button>

            <article
              className="card flex-1"
              style={{
                borderLeftWidth: 3,
                borderLeftStyle: 'solid',
                borderLeftColor: done ? colorHex : 'var(--border-default)',
                backgroundColor: done ? `${colorHex}08` : undefined,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                      Stage {stage.id}
                    </span>
                    <span className="badge badge-teal">{stage.duration}</span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold">{stage.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : stage.id)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-text-secondary hover:text-teal"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? 'Collapse stage' : 'Expand stage'}
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <ul className="mt-4 space-y-1">
                {stage.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-teal" aria-hidden>•</span>
                    {topic}
                  </li>
                ))}
              </ul>

              {isExpanded && (
                <p className="mt-4 border-t border-border-subtle pt-4 text-sm text-text-secondary">
                  {stage.description}
                </p>
              )}
            </article>
          </li>
        )
      })}
    </ol>
  )
}
