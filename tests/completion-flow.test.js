'use strict'
/**
 * Completion-flow contract assertions.
 *
 * These lock in the properties that make routine completion fast and safe:
 * authoritative continuation, reconciliation of lost responses, retryable
 * failures, and reduced redundant work on the server.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const route = fs.readFileSync(path.join(root, 'app', 'api', 'guided-path', '[trackId]', 'route.ts'), 'utf8')
const client = fs.readFileSync(path.join(root, 'app', '(app)', 'guided-path', '[trackId]', 'GuidedPathClient.tsx'), 'utf8')

test('the completion endpoint returns authoritative progress and readiness', () => {
  assert.match(route, /currentStepIndex: stepIndex \+ 1/)
  assert.match(route, /readiness \? \{ \.\.\.outcome, readiness \} : outcome/)
})

test('audit events are written concurrently, not sequentially', () => {
  assert.match(route, /Promise\.all\(/)
  assert.match(route, /events\.map\(/)
})

test('milestone queries are skipped for orientation and repeat steps', () => {
  // The activity bookkeeping only runs inside the non-orientation, new-activity branch.
  assert.match(route, /if \(!isOrientation\) \{[\s\S]*?const isNewActivity = !existing \|\| existing\.status !== 'COMPLETED'/)
  assert.match(route, /if \(isNewActivity\) \{[\s\S]*?previousActivityCount/)
})

test('the completion response keeps server-side gating intact', () => {
  assert.match(route, /claimed\.count !== 1/)
  assert.match(route, /STEP_ALREADY_ADVANCED/)
  assert.match(route, /stored\.status !== 'passed'/)
})

test('the client reconciles ambiguous or lost responses against the server', () => {
  assert.match(client, /async function reconcileProgress/)
  assert.match(client, /response\.status === 409/)
  assert.match(client, /currentStepIndex > stepIndex/)
})

test('the client never claims success before the server confirms, and offers retry', () => {
  assert.match(client, /applyConfirmedProgress/)
  assert.match(client, /if \(!data \|\| typeof data\.currentStepIndex !== 'number'\)/)
  assert.match(client, /saveErrored \? 'Retry'/)
})

test('the client shows an accessible, non-blocking save indicator', () => {
  assert.match(client, /role="status" aria-live="polite"/)
  assert.match(client, /Progress saved/)
  assert.match(client, /Saving your progress/)
})

test('the client no longer performs a second full path request after advancing', () => {
  assert.doesNotMatch(client, /refreshed\?\.readiness/)
  assert.doesNotMatch(client, /const refreshed = await fetch/)
})
