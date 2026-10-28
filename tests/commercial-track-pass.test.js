'use strict'
/**
 * Track Pass term arithmetic: per-track calendar months in UTC, with
 * deterministic month-end and leap-year handling.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  TRACK_PASS_TERM_MONTHS_BY_TRACK,
  LEGACY_THREE_MONTH_TRACK_PASS_PRICING_VERSION,
  getTrackPassTermMonths,
  daysInUtcMonth,
  addCalendarMonthsUtc,
  computeTrackPassPeriod,
  trackPassActive,
  laterExpiry,
} = require('../.test-dist/commercial/track-pass.js')

const iso = (d) => d.toISOString()

test('new terms match published estimates and legacy pending orders keep their original term', () => {
  assert.deepEqual(TRACK_PASS_TERM_MONTHS_BY_TRACK, { frontend: 6, backend: 8, python: 5 })
  assert.equal(getTrackPassTermMonths('frontend'), 6)
  assert.equal(getTrackPassTermMonths('backend'), 8)
  assert.equal(getTrackPassTermMonths('python'), 5)
  assert.equal(getTrackPassTermMonths('frontend', LEGACY_THREE_MONTH_TRACK_PASS_PRICING_VERSION), 3)
  assert.equal(getTrackPassTermMonths('backend', LEGACY_THREE_MONTH_TRACK_PASS_PRICING_VERSION), 3)
  assert.equal(getTrackPassTermMonths('python', LEGACY_THREE_MONTH_TRACK_PASS_PRICING_VERSION), 3)
  assert.equal(getTrackPassTermMonths('ai-agents'), null)
  assert.equal(getTrackPassTermMonths('not-a-track'), null)
})

test('calendar arithmetic is not a fixed day count', () => {
  const start = new Date('2026-02-15T09:30:00.000Z')
  const end = addCalendarMonthsUtc(start, 3)
  assert.equal(iso(end), '2026-05-15T09:30:00.000Z')
  assert.notEqual(iso(end), iso(new Date(start.getTime() + 90 * 86400000)))
})

test('month-end clamps to the last valid day of the target month', () => {
  assert.equal(iso(addCalendarMonthsUtc(new Date('2026-08-31T00:00:00.000Z'), 6)), '2027-02-28T00:00:00.000Z')
  assert.equal(iso(addCalendarMonthsUtc(new Date('2028-08-31T00:00:00.000Z'), 6)), '2029-02-28T00:00:00.000Z')
  assert.equal(iso(addCalendarMonthsUtc(new Date('2026-01-31T12:00:00.000Z'), 1)), '2026-02-28T12:00:00.000Z')
})

test('leap-year boundaries are handled', () => {
  assert.equal(daysInUtcMonth(2028, 1), 29)
  assert.equal(daysInUtcMonth(2027, 1), 28)
  assert.equal(daysInUtcMonth(2000, 1), 29)
  assert.equal(daysInUtcMonth(1900, 1), 28)
  assert.equal(iso(addCalendarMonthsUtc(new Date('2027-08-31T00:00:00.000Z'), 6)), '2028-02-29T00:00:00.000Z')
})

test('Frontend receives six calendar months from the verified payment instant', () => {
  const paidAt = new Date('2026-08-31T14:05:06.789Z')
  const period = computeTrackPassPeriod(paidAt, getTrackPassTermMonths('frontend'))
  assert.equal(iso(period.startedAt), '2026-08-31T14:05:06.789Z')
  assert.equal(iso(period.expiresAt), '2027-02-28T14:05:06.789Z')
  assert.equal(iso(paidAt), '2026-08-31T14:05:06.789Z')
})

test('Backend receives eight calendar months and Python receives five', () => {
  const paidAt = new Date('2026-10-17T14:05:06.789Z')
  assert.equal(iso(computeTrackPassPeriod(paidAt, getTrackPassTermMonths('backend')).expiresAt), '2027-06-17T14:05:06.789Z')
  assert.equal(iso(computeTrackPassPeriod(paidAt, getTrackPassTermMonths('python')).expiresAt), '2027-03-17T14:05:06.789Z')
})

test('an invalid or unmapped duration cannot silently become a paid term', () => {
  assert.throws(() => computeTrackPassPeriod(new Date('2026-01-01T00:00:00.000Z'), 0), RangeError)
  assert.throws(() => computeTrackPassPeriod(new Date('2026-01-01T00:00:00.000Z'), 1.5), RangeError)
})

test('the expiry calculation is deterministic and timezone independent', () => {
  const a = addCalendarMonthsUtc(new Date('2026-03-15T23:59:59.000Z'), 6)
  const b = addCalendarMonthsUtc(new Date('2026-03-15T23:59:59.000Z'), 6)
  assert.equal(iso(a), '2026-09-15T23:59:59.000Z')
  assert.equal(iso(a), iso(b))
})

test('trackPassActive is strictly future-dated', () => {
  const now = new Date('2026-10-17T00:00:00.000Z')
  assert.equal(trackPassActive('2026-10-17T00:00:01.000Z', now), true)
  assert.equal(trackPassActive('2026-10-16T23:59:59.000Z', now), false)
  assert.equal(trackPassActive('2026-10-17T00:00:00.000Z', now), false)
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
