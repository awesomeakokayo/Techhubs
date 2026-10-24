const test = require('node:test')
const assert = require('node:assert/strict')
const {
  daysSinceLastActivity,
  getLocalHour,
  isDueForReminder,
  isQuietHour,
  isReminderWindow,
  isWithinQuietHours,
  isWithinReminderWindow,
} = require('../.test-dist/re-engagement.js')

test('reminder window and quiet hour validators reject unsupported values', () => {
  assert.equal(isReminderWindow('morning'), true)
  assert.equal(isReminderWindow('afternoon'), true)
  assert.equal(isReminderWindow('evening'), true)
  assert.equal(isReminderWindow('midday'), false)
  assert.equal(isReminderWindow(1), false)

  assert.equal(isQuietHour(0), true)
  assert.equal(isQuietHour(23), true)
  assert.equal(isQuietHour(24), false)
  assert.equal(isQuietHour(-1), false)
  assert.equal(isQuietHour(1.5), false)
})

test('days since last activity returns whole elapsed days or null', () => {
  const now = new Date('2026-10-10T12:00:00.000Z')
  assert.equal(daysSinceLastActivity('2026-10-07T12:00:00.000Z', now), 3)
  assert.equal(daysSinceLastActivity('2026-10-09T23:00:00.000Z', now), 0)
  assert.equal(daysSinceLastActivity(null, now), null)
  assert.equal(daysSinceLastActivity('not-a-date', now), null)
})

test('reminder window and quiet hours use local hour boundaries', () => {
  assert.equal(isWithinReminderWindow(9, 'morning'), true)
  assert.equal(isWithinReminderWindow(14, 'morning'), false)
  assert.equal(isWithinReminderWindow(18, 'evening'), true)

  assert.equal(isWithinQuietHours(23, 22, 7), true)
  assert.equal(isWithinQuietHours(2, 22, 7), true)
  assert.equal(isWithinQuietHours(12, 22, 7), false)
  assert.equal(isWithinQuietHours(23, null, null), false)
})

test('local hour is computed in the learner time zone', () => {
  const utcNoon = new Date('2026-10-10T12:00:00.000Z')
  assert.equal(getLocalHour(utcNoon, 'Africa/Lagos'), 13)
  assert.equal(getLocalHour(utcNoon, 'America/Los_Angeles'), 5)
})

test('a learner is due for a reminder only after inactivity within their window', () => {
  const now = new Date('2026-10-10T18:00:00.000Z')

  assert.equal(isDueForReminder({
    lastActivityAt: '2026-10-05T12:00:00.000Z',
    now,
    timeZone: 'Africa/Lagos',
    reminderWindow: 'evening',
  }), true)

  assert.equal(isDueForReminder({
    lastActivityAt: '2026-10-09T12:00:00.000Z',
    now,
    timeZone: 'Africa/Lagos',
    reminderWindow: 'evening',
  }), false)

  assert.equal(isDueForReminder({
    lastActivityAt: '2026-10-05T12:00:00.000Z',
    now,
    timeZone: 'Africa/Lagos',
    reminderWindow: 'morning',
  }), false)

  assert.equal(isDueForReminder({
    lastActivityAt: '2026-10-05T12:00:00.000Z',
    now,
    timeZone: 'Africa/Lagos',
    reminderWindow: 'evening',
    quietStartHour: 17,
    quietEndHour: 21,
  }), false)
})
