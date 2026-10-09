const test = require('node:test')
const assert = require('node:assert/strict')
const {
  calculateLearningRhythm,
  getLearningMilestones,
  getLocalWeekday,
  isDailyGoalSteps,
  isPlannedStudyDays,
  isValidTimeZone,
} = require('../.test-dist/learning-rhythm.js')

const now = new Date('2026-10-09T12:00:00.000Z')

test('learning rhythm calculates an active streak and current-week learning days', () => {
  const rhythm = calculateLearningRhythm([
    '2026-10-07T12:00:00.000Z',
    '2026-10-08T12:00:00.000Z',
    '2026-10-09T12:00:00.000Z',
  ], now, 'Africa/Lagos')

  assert.equal(rhythm.activitiesToday, 1)
  assert.equal(rhythm.activitiesThisWeek, 3)
  assert.equal(rhythm.currentStreakDays, 3)
  assert.equal(rhythm.activeDaysThisWeek, 3)
  assert.equal(rhythm.activeToday, true)
  assert.equal(rhythm.currentWeekDays.length, 7)
  assert.deepEqual(rhythm.currentWeekDays.filter((day) => day.active).map((day) => day.label), ['Wed', 'Thu', 'Fri'])
})

test('learning rhythm treats an activity around UTC midnight as the correct Lagos local day', () => {
  const localNow = new Date('2026-10-09T00:30:00.000Z')
  const rhythm = calculateLearningRhythm([
    '2026-10-08T23:30:00.000Z',
  ], localNow, 'Africa/Lagos')

  assert.equal(rhythm.activitiesToday, 1)
  assert.equal(rhythm.currentStreakDays, 1)
  assert.equal(rhythm.activeToday, true)
})

test('milestones unlock when activity totals and streaks cross thresholds', () => {
  const previous = calculateLearningRhythm([
    '2026-10-07T12:00:00.000Z',
    '2026-10-08T12:00:00.000Z',
  ], now, 'Africa/Lagos')
  const next = calculateLearningRhythm([
    '2026-10-07T12:00:00.000Z',
    '2026-10-08T12:00:00.000Z',
    now,
  ], now, 'Africa/Lagos')

  const milestones = getLearningMilestones(4, 5, previous, next)
  assert.deepEqual(milestones.map((item) => item.code), ['activities-5', 'streak-3'])
  assert.equal(milestones[0].title, 'Building momentum')
  assert.equal(milestones[1].title, 'Three-day streak')
})

test('milestones are not repeatedly awarded for the same day streak', () => {
  const beforeMoreActivity = calculateLearningRhythm([
    '2026-10-07T12:00:00.000Z',
    '2026-10-08T12:00:00.000Z',
    now,
  ], now, 'Africa/Lagos')
  const afterMoreActivity = calculateLearningRhythm([
    '2026-10-07T12:00:00.000Z',
    '2026-10-08T12:00:00.000Z',
    now,
    '2026-10-09T13:00:00.000Z',
  ], now, 'Africa/Lagos')

  const milestones = getLearningMilestones(5, 6, beforeMoreActivity, afterMoreActivity)
  assert.equal(milestones.some((item) => item.category === 'streak'), false)
})

test('daily goal and time zone validators reject unsupported values', () => {
  assert.equal(isDailyGoalSteps(1), true)
  assert.equal(isDailyGoalSteps(2), true)
  assert.equal(isDailyGoalSteps(3), true)
  assert.equal(isDailyGoalSteps(0), false)
  assert.equal(isDailyGoalSteps('2'), false)
  assert.equal(isValidTimeZone('Africa/Lagos'), true)
  assert.equal(isValidTimeZone('Not/AReal_TimeZone'), false)
})

test('weekly learning schedule accepts unique ISO weekdays only', () => {
  assert.equal(isPlannedStudyDays([1]), true)
  assert.equal(isPlannedStudyDays([1, 2, 3, 4, 5]), true)
  assert.equal(isPlannedStudyDays([6, 7]), true)
  assert.equal(isPlannedStudyDays([]), false)
  assert.equal(isPlannedStudyDays([1, 1]), false)
  assert.equal(isPlannedStudyDays([0, 2]), false)
  assert.equal(isPlannedStudyDays([1, 2, 3, 4, 5, 6, 7, 1]), false)
  assert.equal(isPlannedStudyDays('1,2,3'), false)
})

test('local weekday uses ISO weekday numbering in the learner time zone', () => {
  const fridayUtc = new Date('2026-10-09T12:00:00.000Z')
  assert.equal(getLocalWeekday(fridayUtc, 'Africa/Lagos'), 5)
  assert.equal(getLocalWeekday(new Date('2026-10-10T00:30:00.000Z'), 'America/Los_Angeles'), 5)
  assert.equal(getLocalWeekday(new Date('2026-10-10T12:00:00.000Z'), 'Africa/Lagos'), 6)
})
