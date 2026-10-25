'use strict'
/**
 * Staged rollout + shadow evaluation. The safety property under test is that
 * nothing is restricted unless enforcement is explicitly on (globally or for a
 * pilot cohort), that cohorts are deterministic, and that shadow mode can never
 * change access.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  rolloutPhase,
  shadowEvaluationEnabled,
  pilotEnabled,
  isPilotUser,
  cohortBucket,
  entitlementsEnforcedForUser,
} = require('../.test-dist/commercial/rollout.js')
const { decideTrackAccess, redactId } = require('../.test-dist/commercial/shadow.js')
const { deriveSnapshot } = require('../.test-dist/commercial/entitlements.js')

const NOW = new Date('2026-10-15T12:00:00.000Z')
const free = deriveSnapshot({ subscription: null, trackAccess: [] }, NOW)
const passFrontend = deriveSnapshot(
  { subscription: null, trackAccess: [{ trackId: 'frontend', status: 'ACTIVE', expiresAt: new Date('2027-01-01') }] },
  NOW,
)
const PREMIUM = ['frontend']

test('default configuration is phase 0 and enforces nothing', () => {
  const env = {}
  assert.equal(rolloutPhase(env), 0)
  assert.equal(shadowEvaluationEnabled(env), false)
  assert.equal(pilotEnabled(env), false)
  assert.equal(entitlementsEnforcedForUser('user-1', env), false)
})

test('the global flag enforces for everyone (phase 4)', () => {
  const env = { COMMERCE_ENTITLEMENTS_ENFORCED: 'true' }
  assert.equal(entitlementsEnforcedForUser('user-1', env), true)
  assert.equal(rolloutPhase(env), 4)
})

test('a pilot cohort enforces only for its members and is deterministic', () => {
  const env = { COMMERCE_PILOT_ENABLED: 'true', COMMERCE_PILOT_USER_IDS: 'user-1,user-2' }
  assert.equal(entitlementsEnforcedForUser('user-1', env), true)
  assert.equal(entitlementsEnforcedForUser('user-9', env), false)
  // Repeated calls never change a user's cohort.
  assert.equal(isPilotUser('user-1', env), isPilotUser('user-1', env))
  assert.equal(cohortBucket('user-1'), cohortBucket('user-1'))
  // Pilot off => nobody.
  assert.equal(entitlementsEnforcedForUser('user-1', { COMMERCE_PILOT_USER_IDS: 'user-1' }), false)
})

test('a percentage cohort is stable and bounded', () => {
  const zero = { COMMERCE_PILOT_ENABLED: 'true', COMMERCE_PILOT_PERCENT: '0' }
  const hundred = { COMMERCE_PILOT_ENABLED: 'true', COMMERCE_PILOT_PERCENT: '100' }
  assert.equal(isPilotUser('user-1', zero), false)
  assert.equal(isPilotUser('user-1', hundred), true)
  // Roughly the configured share, and stable per user.
  const fifty = { COMMERCE_PILOT_ENABLED: 'true', COMMERCE_PILOT_PERCENT: '50' }
  let included = 0
  for (let i = 0; i < 1000; i += 1) if (isPilotUser(`member-${i}`, fifty)) included += 1
  assert.ok(included > 400 && included < 600, `expected ~50% inclusion, got ${included}`)
})

test('an explicit phase overrides derivation', () => {
  assert.equal(rolloutPhase({ COMMERCE_ROLLOUT_PHASE: '2' }), 2)
  assert.equal(rolloutPhase({ COMMERCE_ROLLOUT_PHASE: '9' }), 0) // invalid -> safest
})

test('shadow mode computes the proposed decision but never denies access', () => {
  // Free learner, premium track: the proposal is "deny", but access stays true.
  const shadowFree = decideTrackAccess({ enforced: false, shadow: true, snapshot: free, trackId: 'frontend', premiumIds: PREMIUM })
  assert.equal(shadowFree.allowed, true)
  assert.equal(shadowFree.enforcement, 'shadow')
  assert.equal(shadowFree.proposedAllowed, false)
  assert.equal(shadowFree.wouldChange, true)

  // Enforced: the same decision now actually denies.
  const enforcedFree = decideTrackAccess({ enforced: true, shadow: false, snapshot: free, trackId: 'frontend', premiumIds: PREMIUM })
  assert.equal(enforcedFree.allowed, false)

  // A pass for the track is allowed in both modes.
  const shadowPass = decideTrackAccess({ enforced: false, shadow: true, snapshot: passFrontend, trackId: 'frontend', premiumIds: PREMIUM })
  assert.equal(shadowPass.allowed, true)
  assert.equal(shadowPass.proposedAllowed, true)
  assert.equal(shadowPass.wouldChange, false)

  // Non-premium track is never a mismatch.
  const shadowFreeTrack = decideTrackAccess({ enforced: false, shadow: true, snapshot: free, trackId: 'datascience', premiumIds: PREMIUM })
  assert.equal(shadowFreeTrack.wouldChange, false)
})

test('enforcement off ignores the premium set entirely', () => {
  const off = decideTrackAccess({ enforced: false, shadow: false, snapshot: free, trackId: 'frontend', premiumIds: PREMIUM })
  assert.equal(off.allowed, true)
  assert.equal(off.enforcement, 'off')
})

test('ids are redacted for diagnostics', () => {
  const redacted = redactId('user-123')
  assert.ok(redacted.startsWith('u_'))
  assert.equal(redacted.includes('user-123'), false)
  assert.equal(redactId(null), null)
})
