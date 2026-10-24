export function toDayKey(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function shiftDayKey(key: string, days: number): string {
  const [year, month, day] = key.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + days))
  return toDayKey(date)
}

export function daysBetween(from: string, to: string): number {
  const [fromYear, fromMonth, fromDay] = from.split('-').map(Number)
  const [toYear, toMonth, toDay] = to.split('-').map(Number)
  return Math.round((Date.UTC(toYear, toMonth - 1, toDay) - Date.UTC(fromYear, fromMonth - 1, fromDay)) / 86400000)
}

export interface RetentionActivity {
  userId: string
  day: string
}

export interface RetentionWindow {
  returned: number
  eligible: number
  rate: number
}

export interface RetentionMetrics {
  signups: number
  onboarded: number
  activated: number
  activationRate: number
  d1: RetentionWindow
  d7: RetentionWindow
  d30: RetentionWindow
}

/**
 * Derives activation and D1/D7/D30 retention from completed-activity dates.
 * Activation is the learner's first completed activity day; a "return" is any
 * activity on a strictly later day. Each window only counts learners whose
 * activation day is at least that many days in the past, so the rate is not
 * biased by learners who have not yet had a chance to return.
 */
export function computeRetention(
  signups: number,
  onboardedUserIds: string[],
  activities: RetentionActivity[],
  now = new Date(),
): RetentionMetrics {
  const nowDay = toDayKey(now)

  const daysByUser = new Map<string, Set<string>>()
  for (const activity of activities) {
    if (!activity.userId || !activity.day) continue
    let days = daysByUser.get(activity.userId)
    if (!days) {
      days = new Set<string>()
      daysByUser.set(activity.userId, days)
    }
    days.add(activity.day)
  }

  const windows: Record<'d1' | 'd7' | 'd30', { limit: number; returned: number; eligible: number }> = {
    d1: { limit: 1, returned: 0, eligible: 0 },
    d7: { limit: 7, returned: 0, eligible: 0 },
    d30: { limit: 30, returned: 0, eligible: 0 },
  }

  daysByUser.forEach((days) => {
    const sorted = Array.from(days).sort()
    const activationDay = sorted[0]
    const later = sorted.filter((day) => day > activationDay)

    for (const key of ['d1', 'd7', 'd30'] as const) {
      const { limit } = windows[key]
      const eligibleDay = shiftDayKey(nowDay, -limit)
      if (activationDay <= eligibleDay) {
        windows[key].eligible += 1
        if (later.some((day) => daysBetween(activationDay, day) <= limit)) {
          windows[key].returned += 1
        }
      }
    }
  })

  const toWindow = (window: { returned: number; eligible: number }): RetentionWindow => ({
    returned: window.returned,
    eligible: window.eligible,
    rate: window.eligible ? Math.round((window.returned / window.eligible) * 100) : 0,
  })

  return {
    signups,
    onboarded: new Set(onboardedUserIds).size,
    activated: daysByUser.size,
    activationRate: signups ? Math.round((daysByUser.size / signups) * 100) : 0,
    d1: toWindow(windows.d1),
    d7: toWindow(windows.d7),
    d30: toWindow(windows.d30),
  }
}

export interface PathEnrollment {
  currentStepIndex: number
  totalSteps: number
}

export interface PathFunnel {
  started: number
  reached25: number
  reached50: number
  reached75: number
  completed: number
}

export function computePathFunnel(enrollments: PathEnrollment[]): PathFunnel {
  const funnel: PathFunnel = { started: 0, reached25: 0, reached50: 0, reached75: 0, completed: 0 }
  for (const enrollment of enrollments) {
    if (enrollment.totalSteps <= 0) continue
    const ratio = enrollment.currentStepIndex / enrollment.totalSteps
    if (enrollment.currentStepIndex >= 1) funnel.started += 1
    if (ratio >= 0.25) funnel.reached25 += 1
    if (ratio >= 0.5) funnel.reached50 += 1
    if (ratio >= 0.75) funnel.reached75 += 1
    if (enrollment.currentStepIndex >= enrollment.totalSteps) funnel.completed += 1
  }
  return funnel
}
