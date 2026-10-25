const test = require('node:test')
const assert = require('node:assert/strict')
const {
  computeRetention,
  computePathFunnel,
  daysBetween,
  shiftDayKey,
  toDayKey,
} = require('../.test-dist/retention.js')

const now = new Date('2026-10-10T12:00:00.000Z')

test('day key helpers convert and shift calendar days', () => {
  assert.equal(toDayKey(new Date('2026-10-10T23:30:00.000Z')), '2026-10-10')
  assert.equal(toDayKey('2026-01-01T00:00:00.000Z'), '2026-01-01')
  assert.equal(shiftDayKey('2026-10-10', -1), '2026-10-09')
  assert.equal(shiftDayKey('2026-03-01', 1), '2026-03-02')
  assert.equal(daysBetween('2026-10-01', '2026-10-08'), 7)
})

test('retention derives activation and D1/D7/D30 with cohort eligibility', () => {
  const metrics = computeRetention(
    10,
    ['u1', 'u2', 'u3'],
    [
      { userId: 'u1', day: '2026-10-01' },
      { userId: 'u1', day: '2026-10-02' },
      { userId: 'u2', day: '2026-10-08' },
      { userId: 'u2', day: '2026-10-09' },
      { userId: 'u3', day: '2026-10-01' },
      { userId: 'u4', day: '2026-10-10' },
    ],
    now,
  )

  assert.equal(metrics.signups, 10)
  assert.equal(metrics.onboarded, 3)
  assert.equal(metrics.activated, 4)
  assert.equal(metrics.activationRate, 40)

  assert.equal(metrics.d1.eligible, 3)
  assert.equal(metrics.d1.returned, 2)
  assert.equal(metrics.d1.rate, 67)

  assert.equal(metrics.d7.eligible, 2)
  assert.equal(metrics.d7.returned, 1)
  assert.equal(metrics.d7.rate, 50)

  assert.equal(metrics.d30.eligible, 0)
  assert.equal(metrics.d30.returned, 0)
  assert.equal(metrics.d30.rate, 0)
})

test('retention does not bias D7/D30 with learners who have not had time to return', () => {
  const metrics = computeRetention(
    2,
    [],
    [{ userId: 'u1', day: '2026-10-10' }],
    now,
  )

  assert.equal(metrics.activated, 1)
  assert.equal(metrics.d1.eligible, 0)
  assert.equal(metrics.d7.eligible, 0)
  assert.equal(metrics.d30.eligible, 0)
})

test('retention ignores empty activity records and duplicate same-day activity', () => {
  const metrics = computeRetention(
    3,
    [],
    [
      { userId: 'u1', day: '2026-10-01' },
      { userId: 'u1', day: '2026-10-01' },
      { userId: '', day: '2026-10-01' },
      { userId: 'u2', day: '' },
    ],
    now,
  )

  assert.equal(metrics.activated, 1)
  assert.equal(metrics.d1.returned, 0)
})

test('path funnel thresholds progress from started through completion', () => {
  const funnel = computePathFunnel([
    { currentStepIndex: 0, totalSteps: 8 },
    { currentStepIndex: 2, totalSteps: 8 },
    { currentStepIndex: 4, totalSteps: 8 },
    { currentStepIndex: 6, totalSteps: 8 },
    { currentStepIndex: 8, totalSteps: 8 },
    { currentStepIndex: 3, totalSteps: 0 },
  ])

  assert.equal(funnel.started, 4)
  assert.equal(funnel.reached25, 4)
  assert.equal(funnel.reached50, 3)
  assert.equal(funnel.reached75, 2)
  assert.equal(funnel.completed, 1)
})
