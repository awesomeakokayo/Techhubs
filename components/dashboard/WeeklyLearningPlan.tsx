'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarCheck, Check, Loader2, Save } from 'lucide-react'
import { WEEKDAY_LABELS } from '@/lib/learning-rhythm'

interface WeekDay {
  key: string
  label: string
  active: boolean
  isToday: boolean
}

export function WeeklyLearningPlan({
  initialDays,
  currentWeekDays,
  todayWeekday,
}: {
  initialDays: number[]
  currentWeekDays: WeekDay[]
  todayWeekday: number
}) {
  const router = useRouter()
  const [days, setDays] = useState<number[]>(initialDays)
  const [savedDays, setSavedDays] = useState<number[]>(initialDays)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const selectedSoFar = days.filter((day) => day <= todayWeekday)
  const completedSoFar = selectedSoFar.filter((day) => currentWeekDays[day - 1]?.active)
  const adherence = selectedSoFar.length
    ? Math.round((completedSoFar.length / selectedSoFar.length) * 100)
    : 100
  const dirty = days.length !== savedDays.length || days.some((day) => !savedDays.includes(day))

  function toggleDay(day: number) {
    setNotice('')
    setError('')
    setDays((current) => {
      if (current.includes(day)) {
        if (current.length === 1) {
          setError('Keep at least one planned learning day.')
          return current
        }
        return current.filter((item) => item !== day)
      }
      return [...current, day].sort((a, b) => a - b)
    })
  }

  async function savePlan() {
    if (!dirty || saving) return
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch('/api/learner-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plannedStudyDays: days }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(data?.error || 'Your weekly plan could not be saved.')
      const nextDays = Array.isArray(data?.profile?.plannedStudyDays)
        ? data.profile.plannedStudyDays as number[]
        : days
      setDays(nextDays)
      setSavedDays(nextDays)
      setNotice('Weekly plan saved.')
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Your weekly plan could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
            <CalendarCheck size={19} />
          </div>
          <div>
            <p className="section-label">WEEKLY LEARNING PLAN</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">Make room for learning.</h2>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-border-default px-2.5 py-1 text-xs text-text-muted">
          {days.length} {days.length === 1 ? 'day' : 'days'} / week
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-text-secondary">
        Pick the days that realistically fit your week. You can change this plan whenever your schedule changes.
      </p>

      <div className="mt-5" aria-label="Select your planned learning days">
        <div className="grid grid-cols-7 gap-1.5">
          {WEEKDAY_LABELS.map((label, index) => {
            const day = index + 1
            const selected = days.includes(day)
            const recordedActivity = Boolean(currentWeekDays[index]?.active)
            const today = day === todayWeekday
            return (
              <button
                key={label}
                type="button"
                aria-pressed={selected}
                aria-label={label + (selected ? ', planned learning day' : ', not scheduled')}
                disabled={saving}
                onClick={() => toggleDay(day)}
                className={
                  'relative flex min-h-[66px] flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 text-xs transition-colors disabled:opacity-60 ' +
                  (selected
                    ? 'border-teal bg-teal/10 text-teal'
                    : 'border-border-subtle text-text-muted hover:border-teal/50 hover:text-text-primary')
                }
              >
                <span className={today ? 'font-semibold underline underline-offset-4' : ''}>{label}</span>
                {selected
                  ? <Check size={14} aria-hidden />
                  : <span className="h-[14px] w-[14px]" aria-hidden />}
                {recordedActivity && (
                  <span
                    className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--color-success)]"
                    aria-label="Activity recorded"
                  />
                )}
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-xs leading-5 text-text-muted">
          A marked day is part of your plan. The small dot means learning activity has already been recorded this week.
        </p>
      </div>

      <div className="mt-5 rounded-lg border border-border-subtle bg-elevated/40 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">Plan progress so far</p>
            <p className="mt-1 text-sm font-semibold text-text-primary">
              {completedSoFar.length} of {selectedSoFar.length} planned {selectedSoFar.length === 1 ? 'day' : 'days'}
            </p>
          </div>
          <span className="font-mono text-sm text-text-secondary">{adherence}%</span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-border-subtle"
          role="progressbar"
          aria-label="Weekly plan progress so far"
          aria-valuemin={0}
          aria-valuemax={selectedSoFar.length || 1}
          aria-valuenow={completedSoFar.length}
        >
          <div className="h-full rounded-full bg-teal transition-all" style={{ width: adherence + '%' }} />
        </div>
        <p className="mt-2 text-xs leading-5 text-text-muted">
          A completed day means at least one guided-path activity was completed on that local calendar day.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-text-muted">Choose consistency you can sustain, not a perfect week.</p>
        <button
          type="button"
          className="btn btn-primary inline-flex min-h-10 items-center justify-center gap-2"
          disabled={!dirty || saving}
          onClick={() => void savePlan()}
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          {saving ? 'Saving plan' : 'Save weekly plan'}
        </button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-[var(--color-error)]">{error}</p>}
      {notice && <p role="status" className="mt-3 text-sm text-[var(--color-success)]">{notice}</p>}
    </section>
  )
}
