const test = require('node:test')
const assert = require('node:assert/strict')
const {
  CLIENT_RECORDABLE_EVENTS,
  isClientRecordableEvent,
  isLearningEventName,
  isLearningEventPayload,
  sanitizeLearningEventPayload,
} = require('../.test-dist/learning-events.js')

test('learning event names accept the canonical taxonomy only', () => {
  assert.equal(isLearningEventName('path_started'), true)
  assert.equal(isLearningEventName('learning_step_completed'), true)
  assert.equal(isLearningEventName('course_completed'), true)
  assert.equal(isLearningEventName('quiz_passed'), true)
  assert.equal(isLearningEventName('quiz_failed'), true)
  assert.equal(isLearningEventName('milestone_reached'), true)
  assert.equal(isLearningEventName('random_thing'), false)
  assert.equal(isLearningEventName(''), false)
  assert.equal(isLearningEventName(42), false)
  assert.equal(isLearningEventName(null), false)
})

test('client recordable events are a strict subset of the taxonomy', () => {
  assert.equal(CLIENT_RECORDABLE_EVENTS.includes('resource_opened'), true)
  assert.equal(CLIENT_RECORDABLE_EVENTS.includes('session_returned'), true)
  assert.equal(isClientRecordableEvent('resource_opened'), true)
  assert.equal(isClientRecordableEvent('learning_step_started'), true)
  assert.equal(isClientRecordableEvent('onboarding_completed'), false)
  assert.equal(isClientRecordableEvent('path_recommended'), false)
})

test('event payload validation enforces required fields and shapes', () => {
  assert.equal(isLearningEventPayload({ userId: 'u1', eventName: 'path_started' }), true)
  assert.equal(isLearningEventPayload({ userId: 'u1', eventName: 'path_started', trackId: 'frontend' }), true)
  assert.equal(isLearningEventPayload({ userId: 'u1', eventName: 'path_started', metadata: { step: 1 } }), true)
  assert.equal(isLearningEventPayload({ userId: 'u1', eventName: 'path_started', metadata: null }), true)
  assert.equal(isLearningEventPayload({ eventName: 'path_started' }), false)
  assert.equal(isLearningEventPayload({ userId: '', eventName: 'path_started' }), false)
  assert.equal(isLearningEventPayload({ userId: 'u1', eventName: 'bad_event' }), false)
  assert.equal(isLearningEventPayload({ userId: 'u1', eventName: 'path_started', trackId: 1 }), false)
  assert.equal(isLearningEventPayload({ userId: 'u1', eventName: 'path_started', metadata: [] }), false)
  assert.equal(isLearningEventPayload(null), false)
})

test('payload sanitizer drops empty strings and non-object metadata', () => {
  const sanitized = sanitizeLearningEventPayload({
    userId: 'u1',
    eventName: 'path_started',
    trackId: 'frontend',
    stepId: '',
    metadata: 'nope',
  })
  assert.equal(sanitized.userId, 'u1')
  assert.equal(sanitized.eventName, 'path_started')
  assert.equal(sanitized.trackId, 'frontend')
  assert.equal(sanitized.stepId, null)
  assert.equal(sanitized.metadata, null)

  const withMetadata = sanitizeLearningEventPayload({
    userId: 'u2',
    eventName: 'quiz_passed',
    metadata: { score: 100 },
  })
  assert.deepEqual(withMetadata.metadata, { score: 100 })
})
