export const REMINDER_WINDOWS = ['morning', 'afternoon', 'evening'] as const
export type ReminderWindow = (typeof REMINDER_WINDOWS)[number]

export const DEFAULT_REMINDER_WINDOW: ReminderWindow = 'evening'
export const DEFAULT_INACTIVE_DAYS = 3
export const DEFAULT_TIME_ZONE = 'Africa/Lagos'

export const REMINDER_WINDOW_HOURS: Record<ReminderWindow, [number, number]> = {
  morning: [8, 11],
  afternoon: [12, 16],
  evening: [17, 20],
}

export function isReminderWindow(value: unknown): value is ReminderWindow {
  return typeof value === 'string' && REMINDER_WINDOWS.includes(value as ReminderWindow)
}

export function isQuietHour(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 23
}

export function getLocalHour(date: Date, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', hourCycle: 'h23' })
  const parts = formatter.formatToParts(date)
  const hour = parts.find((part) => part.type === 'hour')?.value ?? '00'
  return Number(hour)
}

export function daysSinceLastActivity(lastActivityAt: Date | string | null, now = new Date()): number | null {
  if (!lastActivityAt) return null
  const date = lastActivityAt instanceof Date ? lastActivityAt : new Date(lastActivityAt)
  if (Number.isNaN(date.getTime())) return null
  return Math.floor((now.getTime() - date.getTime()) / 86400000)
}

export function isWithinReminderWindow(localHour: number, window: ReminderWindow): boolean {
  const [start, end] = REMINDER_WINDOW_HOURS[window]
  return localHour >= start && localHour <= end
}

export function isWithinQuietHours(localHour: number, start: number | null, end: number | null): boolean {
  if (start === null || end === null) return false
  if (start === end) return false
  if (start < end) return localHour >= start && localHour < end
  return localHour >= start || localHour < end
}

export interface ReminderDueInput {
  lastActivityAt: Date | string | null
  now?: Date
  timeZone?: string
  reminderWindow?: ReminderWindow
  quietStartHour?: number | null
  quietEndHour?: number | null
  inactiveDays?: number
}

export function isDueForReminder(input: ReminderDueInput): boolean {
  const now = input.now ?? new Date()
  const days = daysSinceLastActivity(input.lastActivityAt, now)
  if (days === null) return false

  const threshold = input.inactiveDays ?? DEFAULT_INACTIVE_DAYS
  if (days < threshold) return false

  const timeZone = input.timeZone ?? DEFAULT_TIME_ZONE
  const window = input.reminderWindow ?? DEFAULT_REMINDER_WINDOW
  const localHour = getLocalHour(now, timeZone)
  if (!isWithinReminderWindow(localHour, window)) return false
  if (isWithinQuietHours(localHour, input.quietStartHour ?? null, input.quietEndHour ?? null)) return false

  return true
}
