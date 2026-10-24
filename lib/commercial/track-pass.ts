/**
 * TechSkillHub — Track Pass term arithmetic (pure).
 *
 * A Track Pass is a ONE-TIME payment that grants access to one premium track for
 * SIX CALENDAR MONTHS. The period is computed in UTC from the authoritative
 * verified-payment instant and is deliberately deterministic: it must not depend
 * on the server's or the learner's local timezone, and it must handle month-end
 * and leap-year boundaries predictably.
 *
 * "Six calendar months" is not 180 days. 2026-08-31 + 6 months is 2027-02-28
 * (clamped to the last day of a shorter target month); 2027-02-28 + 6 months is
 * 2027-08-28. Month-overflow rollover (e.g. JS Date's 2026-08-31 -> 2027-03-03)
 * is explicitly prevented.
 *
 * No database or provider coupling lives here: the rules are exhaustively
 * unit-testable.
 */

/** Length of a Track Pass in whole calendar months. */
export const TRACK_PASS_TERM_MONTHS = 6

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
  /** startedAt + six calendar months, computed in UTC. */
  expiresAt: Date
}

/** Compute the six-month access period for a verified payment instant. */
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
