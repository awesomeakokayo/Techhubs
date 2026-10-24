'use strict'
/**
 * Pure helpers for assessment-credit idempotency. The database concurrency
 * behaviour is covered separately in assessment-credits.integration.test.js
 * (real PostgreSQL); these tests pin the deterministic key derivation.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  deriveAssessmentRequestId,
  normalizeClientRequestKey,
  ASSESSMENT_RESERVATION_TTL_MS,
} = require('../.test-dist/commercial/assessment-credits.js')

const base = {
  userId: 'user-1',
  trackId: 'frontend',
  projectId: 'fe-p3',
  evidenceFingerprint: 'fp-abc',
  rubricVersion: 'r1',
}

test('the same logical request always derives the same id', () => {
  assert.equal(deriveAssessmentRequestId(base), deriveAssessmentRequestId({ ...base }))
})

test('changed evidence, track or user derives a different id', () => {
  const id = deriveAssessmentRequestId(base)
  assert.notEqual(id, deriveAssessmentRequestId({ ...base, evidenceFingerprint: 'fp-def' }))
  assert.notEqual(id, deriveAssessmentRequestId({ ...base, trackId: 'backend' }))
  assert.notEqual(id, deriveAssessmentRequestId({ ...base, userId: 'user-2' }))
  assert.notEqual(id, deriveAssessmentRequestId({ ...base, rubricVersion: 'r2' }))
})

test('a valid client key is honoured so true retries dedupe', () => {
  const key = 'attempt-12345678'
  assert.equal(deriveAssessmentRequestId({ ...base, clientKey: key }), key)
  assert.equal(deriveAssessmentRequestId({ ...base, clientKey: `  ${key}  ` }), key)
})

test('an invalid client key is ignored and the derived id is used', () => {
  const derived = deriveAssessmentRequestId(base)
  for (const bad of ['', '   ', 'short', 'has spaces', 'semi;colon', 'x'.repeat(201), 42, null, undefined, {}]) {
    assert.equal(deriveAssessmentRequestId({ ...base, clientKey: bad }), derived)
  }
})

test('client keys are validated to a bounded safe alphabet', () => {
  assert.equal(normalizeClientRequestKey('abc-123_ok:x.y'), 'abc-123_ok:x.y')
  assert.equal(normalizeClientRequestKey('1234567'), null) // too short
  assert.equal(normalizeClientRequestKey('bad key with spaces'), null)
})

test('the reservation TTL is a sane, bounded window', () => {
  assert.ok(ASSESSMENT_RESERVATION_TTL_MS >= 5 * 60 * 1000)
  assert.ok(ASSESSMENT_RESERVATION_TTL_MS <= 60 * 60 * 1000)
})
