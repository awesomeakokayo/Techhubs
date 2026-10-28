/**
 * TechSkillHub — Track Pass term arithmetic (pure).
 *
 * Track Pass is a one-time payment. Its calendar-month term is matched to the
 * published maximum duration of the selected eligible premium track:
 * Frontend 4–6 months => 6; Backend 5–8 months => 8; Python 3–5 months => 5.
 *
 * Keep this allowlist aligned with the current premium first-wave catalogue.
 * A track without an explicit duration is not eligible for a Track Pass: fail
 * closed so a new premium track cannot silently inherit the wrong term.
 *
 * Dates are computed in UTC from the authoritative verified-payment instant.
 * Month-end dates are clamped to the final valid day (e.g. Aug 31 + 6 months
 * => Feb 28/29). This module has no database or provider coupling.
 */

/** Calendar-month duration for the currently eligible Track Pass tracks. */
export const TRACK_PASS_TERM_MONTHS_BY_TRACK = {
  frontend: 6,
  backend: 8,
  python: 5,
} as const

export type TrackPassTrackId = keyof typeof TRACK_PASS_TERM_MONTHS_BY_TRACK

/**
 * Return the configured pass term, or null when a track is not explicitly
 * eligible. Callers must not substitute a generic term for an unmapped track.
 */
export function getTrackPassTermMonths(trackId: string): number | null {
  return Object.prototype.hasOwnProperty.call(TRACK_PASS_TERM_MONTHS_BY_TRACK, trackId)
    ? TRACK_PASS_TERM_MONTHS_BY_TRACK[trackId as TrackPassTrackId]
    : null
}

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
  /** startedAt plus this track's configured calendar-month term, computed in UTC. */
  expiresAt: Date
}

/** Compute a track-specific access period for a verified payment instant. */
export function computeTrackPassPeriod(
  paymentAt: Date,
  months: number,
): TrackPassPeriod {
  if (!Number.isInteger(months) || months < 1 || months > 24) {
    throw new RangeError('Track Pass duration must be a whole number from 1 to 24 calendar months.')
  }
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
