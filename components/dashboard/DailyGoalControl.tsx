'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2, Target } from 'lucide-react'
import { DAILY_GOAL_OPTIONS } from '@/lib/learning-rhythm'

export function DailyGoalControl({
  initialGoal,
  activitiesToday,
}: {
  initialGoal: number
  activitiesToday: number
}) {
  const router = useRouter()
  const [goal, setGoal] = useState(initialGoal)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function updateGoal(nextGoal: number) {
    if (saving || nextGoal === goal) return
    setSaving(true)
    setError('')
    try {
      const response = await fetch('/api/learner-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dailyGoalSteps: nextGoal }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(data?.error || 'Your goal could not be saved.')
      setGoal(nextGoal)
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Your goal could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  const completed = Math.min(activitiesToday, goal)
  const percent = Math.round((completed / goal) * 100)
  const isComplete = activitiesToday >= goal

  return (
    <section className="card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Target size={19} />
          </div>
          <div>
            <p className="section-label">DAILY ACTIVITY GOAL</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">
              {isComplete ? 'Goal complete for today' : 'One step at a time'}
            </h2>
          </div>
        </div>
        {isComplete && <Check size={18} className="mt-1 shrink-0 text-teal" aria-label="Daily goal complete" />}
      </div>

      <p className="mt-4 text-sm leading-6 text-text-secondary">
        Aim for a small, achievable amount of learning. Count a completed guided-path activity, not time spent with a page open.
      </p>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-text-secondary">Today&apos;s progress</span>
          <span className="font-mono text-xs text-text-muted">{completed} of {goal}</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-border-subtle"
          role="progressbar"
          aria-label="Daily learning goal progress"
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-valuenow={completed}
        >
          <div
            className="h-full rounded-full bg-teal transition-all duration-300"
            style={{ width: percent + '%' }}
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-text-muted">Set your daily target</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {DAILY_GOAL_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              disabled={saving}
              aria-pressed={goal === option}
              onClick={() => void updateGoal(option)}
              className={
                'flex min-h-11 items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ' +
                (goal === option
                  ? 'border-teal bg-teal/10 text-teal'
                  : 'border-border-default text-text-secondary hover:border-teal/50 hover:text-text-primary')
              }
            >
              {saving && goal !== option ? null : goal === option ? <Check size={14} /> : null}
              {option} {option === 1 ? 'activity' : 'activities'}
            </button>
          ))}
        </div>
        {saving && <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-text-muted"><Loader2 size={13} className="animate-spin" />Saving your goal</p>}
        {error && <p role="alert" className="mt-2 text-xs text-[var(--color-error)]">{error}</p>}
      </div>
    </section>
  )
}
