'use strict'
/**
 * Legacy-user transition policy + dry-run classification. The overriding safety
 * property: nothing is ever revoked while enforcement is off, and ambiguous
 * legacy accounts are retained (reported as uncertain), never guessed away.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  resolveTransitionPolicy,
  retainedLegacyAccess,
  classifyLegacyUser,
  summarizeTransition,
} = require('../.test-dist/commercial/transition.js')

const NOW = new Date('2026-10-15T12:00:00.000Z')
const days = (n) => new Date(NOW.getTime() + n * 86400000)

const blank = {
  userId: 'u1',
  createdAt: days(-100),
  hasLegacyAccess: false,
  hasEnrollment: false,
  hasProgress: false,
  hasSubmission: false,
  hasCompletion: false,
  hasCertificate: false,
}

// A policy whose announced window has closed, so post-window rules apply.
const windowClosed = () =>
  resolveTransitionPolicy({
    COMMERCE_TRANSITION_MODE: 'ENFORCED',
    COMMERCE_GRANDFATHERING_UNTIL: days(-5).toISOString(),
    COMMERCE_GRANDFATHERING_CUTOFF: days(-30).toISOString(),
  })

test('defaults to OPEN: nothing is affected', () => {
  const policy = resolveTransitionPolicy({})
  assert.equal(policy.mode, 'OPEN')
  assert.equal(policy.grandfatheredUntil, null)
  const decision = classifyLegacyUser(blank, policy, NOW)
  assert.equal(decision.action, 'retain')
  assert.deepEqual(decision.reasons, ['enforcement_disabled'])
})

test('a transition mode without a cohort or deadline falls back to OPEN', () => {
  assert.equal(resolveTransitionPolicy({ COMMERCE_TRANSITION_MODE: 'ENFORCED' }).mode, 'OPEN')
})

test('the announced grandfathering window retains everyone until it closes', () => {
  const policy = resolveTransitionPolicy(
    { COMMERCE_TRANSITION_MODE: 'ENFORCED', COMMERCE_GRANDFATHERING_UNTIL: days(5).toISOString() },
  )
  assert.equal(retainedLegacyAccess(policy, NOW), true)
  assert.equal(classifyLegacyUser({ ...blank, hasProgress: true }, policy, NOW).action, 'retain')
  assert.equal(retainedLegacyAccess(policy, days(6)), false)
})

test('a learner with recorded activity is retained even after the window', () => {
  const policy = windowClosed()
  for (const signal of ['hasProgress', 'hasEnrollment', 'hasSubmission', 'hasCompletion', 'hasCertificate']) {
    const decision = classifyLegacyUser({ ...blank, [signal]: true, createdAt: days(-1) }, policy, NOW)
    assert.equal(decision.action, 'retain', `${signal} should retain access`)
  }
})

test('a legacy access record alone is retained and flagged', () => {
  const policy = windowClosed()
  const decision = classifyLegacyUser({ ...blank, hasLegacyAccess: true, createdAt: days(-1) }, policy, NOW)
  assert.equal(decision.action, 'retain')
  assert.ok(decision.reasons.includes('legacy_access_record'))
})

test('an ambiguous pre-cutover account with no activity is retained, not revoked', () => {
  const policy = windowClosed()
  const decision = classifyLegacyUser({ ...blank, createdAt: days(-200) }, policy, NOW)
  assert.equal(decision.action, 'uncertain')
  assert.ok(decision.reasons.includes('no_activity_ambiguous'))
})

test('only an unambiguously post-cutover account with no activity is a transition candidate', () => {
  const policy = windowClosed()
  const decision = classifyLegacyUser({ ...blank, createdAt: days(-1) }, policy, NOW)
  assert.equal(decision.action, 'transition')
})

test('an untrusted creation date is treated as ambiguous', () => {
  const policy = windowClosed()
  const decision = classifyLegacyUser({ ...blank, createdAt: null }, policy, NOW)
  assert.equal(decision.action, 'uncertain')
})

test('a grace period keeps access after the announced deadline', () => {
  const policy = resolveTransitionPolicy({
    COMMERCE_TRANSITION_MODE: 'ENFORCED',
    COMMERCE_GRANDFATHERING_UNTIL: days(-1).toISOString(),
    COMMERCE_TRANSITION_GRACE_DAYS: '14',
  })
  assert.equal(policy.mode, 'ENFORCED')
  assert.equal(retainedLegacyAccess(policy, NOW), true)
  assert.equal(retainedLegacyAccess(policy, days(20)), false)
})

test('summarize aggregates the dry-run, breaking out the uncertain cases', () => {
  const policy = resolveTransitionPolicy({})
  const decisions = [
    classifyLegacyUser({ ...blank, userId: 'a' }, policy, NOW),
    classifyLegacyUser({ ...blank, userId: 'b' }, policy, NOW),
  ]
  assert.deepEqual(summarizeTransition(decisions, policy.mode), {
    total: 2,
    retain: 2,
    uncertain: 0,
    transition: 0,
    mode: 'OPEN',
  })
})
