'use client'

interface ProgressBarProps {
  percent: number
  label?: string
  showPercent?: boolean
}

export function ProgressBar({ percent, label, showPercent = true }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent))
  return (
    <div>
      {(label || showPercent) && (
        <div className="mb-2 flex justify-between text-sm">
          {label && <span className="text-text-secondary">{label}</span>}
          {showPercent && (
            <span className="font-mono text-teal" aria-live="polite">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className="progress-bar-container"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}
