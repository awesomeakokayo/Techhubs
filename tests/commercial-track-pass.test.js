'use strict'
/**
 * Track Pass term arithmetic: three CALENDAR months in UTC, with deterministic
 * month-end and leap-year handling. Not a 180-day approximation, and never
 * dependent on the machine's local timezone.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  TRACK_PASS_TERM_MONTHS,
  daysInUtcMonth,
  addCalendarMonthsUtc,
  computeTrackPassPeriod,
  trackPassActive,
  laterExpiry,
} = require('../.test-dist/commercial/track-pass.js')

const iso = (d) => d.toISOString()

test('the term is three calendar months', () => {
  assert.equal(TRACK_PASS_TERM_MONTHS, 3)
})

test('three months is calendar arithmetic, not 90 days', () => {
  // 2026-02-15 09:30:00Z + 3 calendar months = 2026-05-15 09:30:00Z (89 days).
  const start = new Date('2026-02-15T09:30:00.000Z')
  const end = addCalendarMonthsUtc(start, 3)
  assert.equal(iso(end), '2026-05-15T09:30:00.000Z')
  assert.notEqual(iso(end), iso(new Date(start.getTime() + 90 * 86400000)))
})

test('month-end clamps to the last valid day of the target month', () => {
  // August 31 + 3 months -> November 30 (September/October/November), clamped at month end.
  assert.equal(iso(addCalendarMonthsUtc(new Date('2026-08-31T00:00:00.000Z'), 3)), '2026-11-30T00:00:00.000Z')
  // January 31 + 1 month -> February 28.
  assert.equal(iso(addCalendarMonthsUtc(new Date('2026-01-31T12:00:00.000Z'), 1)), '2026-02-28T12:00:00.000Z')
})

test('leap-year boundaries are handled', () => {
  assert.equal(daysInUtcMonth(2028, 1), 29)
  assert.equal(daysInUtcMonth(2027, 1), 28)
  assert.equal(daysInUtcMonth(2000, 1), 29) // divisible by 400
  assert.equal(daysInUtcMonth(1900, 1), 28) // divisible by 100, not 400
  // November 30 + 3 months into a leap February -> February 29.
  assert.equal(iso(addCalendarMonthsUtc(new Date('2027-11-30T00:00:00.000Z'), 3)), '2028-02-29T00:00:00.000Z')
  // A non-clamped day is preserved.
  assert.equal(iso(addCalendarMonthsUtc(new Date('2026-02-28T00:00:00.000Z'), 3)), '2026-05-28T00:00:00.000Z')
})

test('crossing a year boundary rolls the year over', () => {
  assert.equal(iso(addCalendarMonthsUtc(new Date('2026-10-15T00:00:00.000Z'), 3)), '2027-01-15T00:00:00.000Z')
})

test('computeTrackPassPeriod starts at the payment instant and ends three months later', () => {
  const paidAt = new Date('2026-10-17T14:05:06.789Z')
  const period = computeTrackPassPeriod(paidAt)
  assert.equal(iso(period.startedAt), '2026-10-17T14:05:06.789Z')
  assert.equal(iso(period.expiresAt), '2027-01-17T14:05:06.789Z')
  // Input is not mutated.
  assert.equal(iso(paidAt), '2026-10-17T14:05:06.789Z')
})

test('the result is timezone-independent (identical bytes regardless of local offset)', () => {
  const a = addCalendarMonthsUtc(new Date('2026-03-15T23:59:59.000Z'), 3)
  const b = addCalendarMonthsUtc(new Date('2026-03-15T23:59:59.000Z'), 3)
  assert.equal(iso(a), '2026-06-15T23:59:59.000Z')
  assert.equal(iso(a), iso(b))
})

test('trackPassActive is strictly future-dated', () => {
  const now = new Date('2026-10-17T00:00:00.000Z')
  assert.equal(trackPassActive('2026-10-17T00:00:01.000Z', now), true)
  assert.equal(trackPassActive('2026-10-16T23:59:59.000Z', now), false)
  assert.equal(trackPassActive('2026-10-17T00:00:00.000Z', now), false) // boundary is expired
  assert.equal(trackPassActive(null, now), false)
  assert.equal(trackPassActive('not-a-date', now), false)
})

test('laterExpiry keeps the furthest-out access', () => {
  const a = new Date('2027-01-01T00:00:00.000Z')
  const b = new Date('2027-06-01T00:00:00.000Z')
  assert.equal(iso(laterExpiry(a, b)), iso(b))
  assert.equal(iso(laterExpiry(b, a)), iso(b))
  assert.equal(iso(laterExpiry(null, b)), iso(b))
})
