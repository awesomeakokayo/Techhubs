/**
 * TechSkillHub — Track Pass term arithmetic (pure).
 *
 * A Track Pass is a ONE-TIME payment that grants access to one premium track for
 * three calendar months. The period is computed in UTC from the authoritative
 * verified-payment instant and is deliberately deterministic: it must not depend
 * on the server's or the learner's local timezone, and it must handle month-end
 * and leap-year boundaries predictably.
 *
 * Three calendar months is not a fixed 90 days. Month-end dates are clamped to
 * the final valid day of the target month (e.g. 2026-08-31 + 3 months ->
 * 2026-11-30). Month-overflow rollover is explicitly prevented.
 *
 * No database or provider coupling lives here: the rules are exhaustively
 * unit-testable.
 */

/** Length of a Track Pass in whole calendar months. */
export const TRACK_PASS_TERM_MONTHS = 3

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function isUtcLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/** Number of days in a UTC calendar month (0 = January). */
export function daysInUtcMonth(year: number, monthIndex0: number): number {
  if (monthIndex0 === 1) return isUtcLeapYear(year) ? 29 : 28
  return DAYS_IN_MONTH[monthIndex0]
}

/**
 * Add whole calendar months to an instant, in UTC, clamping the day-of-month to
 * the target month's last valid day. Time-of-day is preserved.
 */
export function addCalendarMonthsUtc(from: Date, months: number): Date {
  const year = from.getUTCFullYear()
  const month = from.getUTCMonth()
  const day = from.getUTCDate()

  const absolute = month + months
  const targetYear = year + Math.floor(absolute / 12)
  const targetMonth = ((absolute % 12) + 12) % 12
  const targetDay = Math.min(day, daysInUtcMonth(targetYear, targetMonth))

  return new Date(
    Date.UTC(
      targetYear,
      targetMonth,
      targetDay,
      from.getUTCHours(),
      from.getUTCMinutes(),
      from.getUTCSeconds(),
      from.getUTCMilliseconds(),
    ),
  )
}

export interface TrackPassPeriod {
  /** Authoritative period start: the verified payment instant. */
  startedAt: Date
  /** startedAt + three calendar months, computed in UTC. */
  expiresAt: Date
}

/** Compute the three-month access period for a verified payment instant. */
export function computeTrackPassPeriod(
  paymentAt: Date,
  months: number = TRACK_PASS_TERM_MONTHS,
): TrackPassPeriod {
  return {
    startedAt: new Date(paymentAt.getTime()),
    expiresAt: addCalendarMonthsUtc(paymentAt, months),
  }
}

/** Whether a pass that expires at `expiresAt` still grants access at `now`. */
export function trackPassActive(expiresAt: Date | string | null | undefined, now: Date = new Date()): boolean {
  if (!expiresAt) return false
  const date = expiresAt instanceof Date ? expiresAt : new Date(expiresAt)
  return !Number.isNaN(date.getTime()) && date.getTime() > now.getTime()
}

/** The later of two expiry instants, treating null as "absent". */
export function laterExpiry(a: Date | null | undefined, b: Date): Date {
  if (!a) return b
  return a.getTime() > b.getTime() ? a : b
}
