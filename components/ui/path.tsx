import type { CSSProperties } from 'react'

/* ============================================================
   The PATH — the recurring visual language of Tech Skill Hub.
   Numbered checkpoints, directional connectors, milestones.
   ============================================================ */

export interface PathStep {
  index: number
  label?: string
  caption?: string
  state?: 'upcoming' | 'current' | 'done' | 'locked'
  tone?: string
}

export function CheckpointNode({ step, size = 'md' }: { step: PathStep; size?: 'sm' | 'md' }) {
  const done = step.state === 'done'
  const current = step.state === 'current'
  const locked = step.state === 'locked'
  const tone = step.tone
  const style: CSSProperties | undefined = tone
    ? {
        borderColor: done || current ? tone : undefined,
        color: done ? undefined : tone,
        background: done ? tone : current ? undefined : undefined,
      }
    : undefined

  return (
    <span
      className={
        'path-node ' +
        (done ? 'is-complete ' : current ? 'is-active ' : locked ? 'is-locked ' : '') +
        (size === 'sm' ? ' !h-7 !w-7 !text-[0.65rem]' : '')
      }
      style={style}
      aria-hidden
    >
      {done ? '✓' : locked ? '🔒' : String(step.index).padStart(2, '0')}
    </span>
  )
}

export function PathConnector({ tone, active }: { tone?: string; active?: boolean }) {
  return (
    <span
      className={'path-connector ' + (active ? 'is-active' : '')}
      style={tone && active ? { background: tone } : undefined}
      aria-hidden
    />
  )
}

interface PathRowProps {
  steps: PathStep[]
  className?: string
  size?: 'sm' | 'md'
  /** Render without connectors (e.g. for stacked mobile layouts) */
  connectors?: boolean
}

/**
 * Horizontal PATH: numbered checkpoints joined by directional lines.
 */
export function PathRow({ steps, className = '', size = 'md', connectors = true }: PathRowProps) {
  return (
    <div className={`flex items-start ${className}`}>
      {steps.map((step, i) => (
        <div key={step.index} className="contents">
          {i > 0 && connectors && (
            <PathConnector tone={step.tone} active={step.state === 'done' || step.state === 'current'} />
          )}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
            <CheckpointNode step={step} size={size} />
            {step.label && (
              <span className="font-display text-sm font-semibold text-text-primary">{step.label}</span>
            )}
            {step.caption && <span className="max-w-[9rem] text-xs leading-snug text-text-muted">{step.caption}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}