'use strict'
/**
 * The client-facing progress endpoint must never let a learner write
 * progression-authoritative state. The guided-path route unlocks a project step
 * when `UserTrackProgress.data.projectSubmissions[id].status === 'passed'`, so a
 * forgeable `projectSubmissions` map is a direct mastery bypass.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const {
  SERVER_OWNED_PROGRESS_KEYS,
  isPlainObject,
  protectedProgressKeysPresent,
  mergeClientProgress,
} = require('../.test-dist/server-progress.js')

const routeSource = fs.readFileSync(
  path.join(__dirname, '..', 'app', 'api', 'progress', 'route.ts'),
  'utf8',
)

test('every progression-authoritative field is protected', () => {
  for (const key of ['projectSubmissions', 'projectSubmissionHistory', 'guidedPathVersion', 'aiGuidedPathVersion', 'pathCompatibility', 'quizAttempts']) {
    assert.ok(SERVER_OWNED_PROGRESS_KEYS.includes(key), `${key} must be server-owned`)
  }
})

test('a forged quiz attempt is detected and refused', () => {
  const forged = {
    quizAttempts: {
      schemaVersion: 1,
      attempts: {
        forged: { attemptId: 'forged', passed: true, score: 100 },
      },
    },
  }
  assert.deepEqual(protectedProgressKeysPresent(forged), ['quizAttempts'])
})

test('a forged project pass is detected and refused', () => {
  const forged = { projectSubmissions: { 'fe-p1': { status: 'passed' } } }
  assert.deepEqual(protectedProgressKeysPresent(forged), ['projectSubmissions'])

  // The route must reject before writing anything.
  assert.match(routeSource, /protectedProgressKeysPresent/)
  assert.match(routeSource, /fields: protectedKeys/)
  assert.match(routeSource, /status: 400/)
})

test('rewriting the path version is refused', () => {
  assert.deepEqual(protectedProgressKeysPresent({ guidedPathVersion: 999 }), ['guidedPathVersion'])
  assert.deepEqual(protectedProgressKeysPresent({ aiGuidedPathVersion: 0 }), ['aiGuidedPathVersion'])
})

test('benign client keys are not treated as protected', () => {
  assert.deepEqual(protectedProgressKeysPresent({ bookmarks: ['a'], lastVisited: 'x' }), [])
  assert.deepEqual(protectedProgressKeysPresent({}), [])
})

test('non-object payloads expose no protected keys', () => {
  for (const value of [null, undefined, 42, 'x', [], true]) {
    assert.deepEqual(protectedProgressKeysPresent(value), [])
  }
})

test('merging preserves server-owned state and never lets the client write it', () => {
  const existing = {
    guidedPathVersion: 4,
    projectSubmissions: { 'fe-p1': { status: 'passed', evidenceFingerprint: 'ev1' } },
    bookmarks: ['old'],
  }
  const incoming = {
    bookmarks: ['new'],
    note: 'hello',
    // A malicious payload that slipped past the route-level check must still not
    // overwrite server-owned state.
    projectSubmissions: { 'fe-p1': { status: 'passed' } },
    guidedPathVersion: 1,
  }
  const merged = mergeClientProgress(existing, incoming)
  assert.deepEqual(merged.bookmarks, ['new'])
  assert.equal(merged.note, 'hello')
  // Server-owned values are preserved verbatim.
  assert.deepEqual(merged.projectSubmissions, { 'fe-p1': { status: 'passed', evidenceFingerprint: 'ev1' } })
  assert.equal(merged.guidedPathVersion, 4)
})

test('merging into an empty store still refuses server-owned keys', () => {
  const merged = mergeClientProgress(undefined, { projectSubmissions: { x: 1 }, bookmarks: [] })
  assert.equal('projectSubmissions' in merged, false)
  assert.deepEqual(merged.bookmarks, [])
})

test('plain-object detection is strict', () => {
  assert.equal(isPlainObject({}), true)
  assert.equal(isPlainObject([]), false)
  assert.equal(isPlainObject(null), false)
  assert.equal(isPlainObject('x'), false)
})
