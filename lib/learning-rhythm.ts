export const DEFAULT_LEARNER_TIME_ZONE = 'Africa/Lagos'
export const DAILY_GOAL_OPTIONS = [1, 2, 3] as const
export const WEEKLY_ACTIVE_DAY_GOAL = 5
export const DEFAULT_PLANNED_STUDY_DAYS = [1, 2, 3, 4, 5] as const
export const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export interface LearningDay {
  key: string
  label: string
  active: boolean
  isToday: boolean
}

export interface LearningRhythm {
  todayKey: string
  activitiesToday: number
  activitiesThisWeek: number
  currentStreakDays: number
  activeDaysThisWeek: number
  activeToday: boolean
  currentWeekDays: LearningDay[]
}

function dateKey(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? ''
  return part('year') + '-' + part('month') + '-' + part('day')
}

function shiftDateKey(key: string, days: number): string {
  const [year, month, day] = key.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + days))
  return date.getUTCFullYear().toString().padStart(4, '0') + '-' +
    (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' +
    date.getUTCDate().toString().padStart(2, '0')
}

function weekdayIndex(key: string): number {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

function startOfWeekKey(key: string): string {
  const day = weekdayIndex(key)
  const daysSinceMonday = (day + 6) % 7
  return shiftDateKey(key, -daysSinceMonday)
}

function dayLabel(key: string): string {
  const [year, month, day] = key.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day, 12)))
}

export function isValidTimeZone(value: unknown): value is string {
  if (typeof value !== 'string' || value.length < 1 || value.length > 64) return false
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value })
    return true
  } catch {
    return false
  }
}

export function isDailyGoalSteps(value: unknown): value is (typeof DAILY_GOAL_OPTIONS)[number] {
  return typeof value === 'number' && DAILY_GOAL_OPTIONS.includes(value as (typeof DAILY_GOAL_OPTIONS)[number])
}

export function isPlannedStudyDays(value: unknown): value is number[] {
  return Array.isArray(value) &&
    value.length >= 1 &&
    value.length <= 7 &&
    value.every((day) => Number.isInteger(day) && day >= 1 && day <= 7) &&
    new Set(value).size === value.length
}

export function getLocalWeekday(
  date = new Date(),
  timeZone = DEFAULT_LEARNER_TIME_ZONE,
): number {
  const localKey = dateKey(date, timeZone)
  return ((weekdayIndex(localKey) + 6) % 7) + 1
}

export function calculateLearningRhythm(
  activityDates: Array<Date | string | null>,
  now = new Date(),
  timeZone = DEFAULT_LEARNER_TIME_ZONE,
): LearningRhythm {
  const dates = activityDates
    .filter((value): value is Date | string => value !== null)
    .map((value) => value instanceof Date ? value : new Date(value))
    .filter((value) => !Number.isNaN(value.getTime()))

  const keyedActivities = dates.map((date) => ({ date, key: dateKey(date, timeZone) }))
  const keys = new Set(keyedActivities.map((item) => item.key))
  const todayKey = dateKey(now, timeZone)
  const yesterdayKey = shiftDateKey(todayKey, -1)
  const activeToday = keys.has(todayKey)

  let streakCursor = activeToday ? todayKey : keys.has(yesterdayKey) ? yesterdayKey : ''
  let currentStreakDays = 0
  while (streakCursor && keys.has(streakCursor) && currentStreakDays < 400) {
    currentStreakDays += 1
    streakCursor = shiftDateKey(streakCursor, -1)
  }

  const weekStart = startOfWeekKey(todayKey)
  const activeDaysThisWeek = new Set(
    Array.from(keys).filter((key) => key >= weekStart && key <= todayKey),
  ).size
  const activitiesThisWeek = keyedActivities.filter(({ key }) => key >= weekStart && key <= todayKey).length
  const activitiesToday = keyedActivities.filter(({ key }) => key === todayKey).length

  const currentWeekDays = Array.from({ length: 7 }, (_, index) => {
    const key = shiftDateKey(weekStart, index)
    return {
      key,
      label: dayLabel(key),
      active: key <= todayKey && keys.has(key),
      isToday: key === todayKey,
    }
  })

  return {
    todayKey,
    activitiesToday,
    activitiesThisWeek,
    currentStreakDays,
    activeDaysThisWeek,
    activeToday,
    currentWeekDays,
  }
}

export interface LearningMilestone {
  code: string
  title: string
  description: string
  category: 'activity' | 'streak'
}

const ACTIVITY_MILESTONES: Array<{ count: number; title: string; description: string }> = [
  { count: 1, title: 'First step taken', description: 'You have completed your first learning activity.' },
  { count: 5, title: 'Building momentum', description: 'Five learning activities completed. Keep building on that progress.' },
  { count: 10, title: 'Learning in action', description: 'Ten learning activities completed. You are turning intention into practice.' },
  { count: 25, title: 'Committed builder', description: 'Twenty-five learning activities completed. Your consistency is adding up.' },
  { count: 50, title: 'Skill builder', description: 'Fifty learning activities completed. Keep turning knowledge into evidence.' },
  { count: 100, title: 'Learning champion', description: 'One hundred learning activities completed. A serious body of work is taking shape.' },
]

const STREAK_MILESTONES = [
  { days: 3, title: 'Three-day streak', description: 'You have returned to learning three days in a row.' },
  { days: 7, title: 'One-week streak', description: 'A full week of consistent learning. Keep the rhythm realistic and sustainable.' },
  { days: 14, title: 'Two-week streak', description: 'Two weeks of consistency. Your learning habit is taking shape.' },
  { days: 30, title: 'Thirty-day streak', description: 'Thirty days of consistency. That is a meaningful learning habit.' },
]

export function getLearningMilestones(
  previousActivityCount: number,
  nextActivityCount: number,
  previousRhythm: LearningRhythm,
  nextRhythm: LearningRhythm,
): LearningMilestone[] {
  const unlocked: LearningMilestone[] = []

  for (const milestone of ACTIVITY_MILESTONES) {
    if (previousActivityCount < milestone.count && nextActivityCount >= milestone.count) {
      unlocked.push({
        code: 'activities-' + milestone.count,
        title: milestone.title,
        description: milestone.description,
        category: 'activity',
      })
    }
  }

  const streakMilestone = STREAK_MILESTONES.find((milestone) =>
    previousRhythm.currentStreakDays < milestone.days &&
    nextRhythm.currentStreakDays >= milestone.days &&
    !previousRhythm.activeToday &&
    nextRhythm.activeToday,
  )
  if (streakMilestone) {
    unlocked.push({
      code: 'streak-' + streakMilestone.days,
      title: streakMilestone.title,
      description: streakMilestone.description,
      category: 'streak',
    })
  }

  return unlocked
}
