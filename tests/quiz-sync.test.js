'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const { buildLearnerProfilePayload, decideProfileUpdate } = require('../.test-dist/quiz-sync.js')

test('buildLearnerProfilePayload maps a complete quiz result', () => {
  const payload = buildLearnerProfilePayload({
    completed: true,
    recommendations: ['frontend', 'backend'],
    level: 'beginner',
    weeklyHours: 5,
    goal: 'Get a job at a tech company',
    updatedAt: '2026-01-01T00:00:00.000Z',
  })
  assert.deepEqual(payload, {
    primaryGoal: 'Get a job at a tech company',
    experienceLevel: 'beginner',
    weeklyHours: 5,
    recommendedTrackId: 'frontend',
    clientUpdatedAt: '2026-01-01T00:00:00.000Z',
  })
})

test('buildLearnerProfilePayload rejects incomplete or invalid results', () => {
  assert.equal(buildLearnerProfilePayload(null), null)
  assert.equal(buildLearnerProfilePayload(undefined), null)
  assert.equal(buildLearnerProfilePayload({ completed: false }), null)
  assert.equal(buildLearnerProfilePayload({ completed: true, recommendations: ['frontend'], level: 'beginner', weeklyHours: 5 }), null)
  assert.equal(buildLearnerProfilePayload({ completed: true, recommendations: ['frontend'], level: 'wizard', weeklyHours: 5, goal: 'g' }), null)
  assert.equal(buildLearnerProfilePayload({ completed: true, recommendations: ['frontend'], level: 'beginner', weeklyHours: 99, goal: 'g' }), null)
  assert.equal(buildLearnerProfilePayload({ completed: true, recommendations: [], level: 'beginner', weeklyHours: 5, goal: 'g' }), null)
  assert.equal(buildLearnerProfilePayload({ completed: true, recommendations: ['frontend'], level: 'beginner', weeklyHours: 5, goal: '   ' }), null)
})

test('decideProfileUpdate creates, updates and rejects stale results', () => {
  assert.equal(decideProfileUpdate(null), 'create')
  assert.equal(decideProfileUpdate(undefined), 'create')
  assert.equal(decideProfileUpdate(new Date('2026-01-01T00:00:00Z'), undefined), 'update')
  assert.equal(decideProfileUpdate(new Date('2026-01-01T00:00:00Z'), '2026-02-01T00:00:00Z'), 'update')
  assert.equal(decideProfileUpdate(new Date('2026-02-01T00:00:00Z'), '2026-01-01T00:00:00Z'), 'stale')
  assert.equal(decideProfileUpdate(new Date('2026-02-01T00:00:00Z'), 'not-a-date'), 'update')
})
