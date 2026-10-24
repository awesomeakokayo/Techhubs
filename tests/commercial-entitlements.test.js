'use strict'
/**
 * Entitlement derivation: Free / Track Pass / Pro, grace on cancellation,
 * grandfathering, access decisions and the monthly assessment window.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  subscriptionGrantsPro,
  deriveSnapshot,
  canAccessTrack,
  monthBounds,
  withinAssessmentAllowance,
  grandfatheringUntil,
} = require('../.test-dist/commercial/entitlements.js')
const { ASSESSMENT_ALLOWANCES } = require('../.test-dist/commercial/plans.js')

const NOW = new Date('2026-10-15T12:00:00.000Z')
const future = (days) => new Date(NOW.getTime() + days * 86400000)
const past = (days) => new Date(NOW.getTime() - days * 86400000)

test('subscriptionGrantsPro honours active, grace and terminal states', () => {
  assert.equal(subscriptionGrantsPro(null, NOW), false)
  assert.equal(subscriptionGrantsPro({ status: 'ACTIVE', currentPeriodEnd: future(5) }, NOW), true)
  assert.equal(subscriptionGrantsPro({ status: 'CANCELLED', currentPeriodEnd: future(3) }, NOW), true)
  assert.equal(subscriptionGrantsPro({ status: 'CANCELLED', currentPeriodEnd: past(1) }, NOW), false)
  assert.equal(subscriptionGrantsPro({ status: 'PAST_DUE', currentPeriodEnd: past(1) }, NOW), false)
  assert.equal(subscriptionGrantsPro({ status: 'EXPIRED' }, NOW), false)
  assert.equal(subscriptionGrantsPro({ status: 'NONE' }, NOW), false)
})

test('free learner snapshot is FREE with the free allowance', () => {
  const snapshot = deriveSnapshot({ subscription: null, trackAccess: [] }, NOW)
  assert.equal(snapshot.tier, 'FREE')
  assert.equal(snapshot.hasAllPremiumTracks, false)
  assert.equal(snapshot.assessmentAllowance, ASSESSMENT_ALLOWANCES.FREE)
})

test('active Track Pass yields PASS with owned tracks only', () => {
  const snapshot = deriveSnapshot(
    { subscription: null, trackAccess: [{ trackId: 'frontend', status: 'ACTIVE', expiresAt: future(3650) }] },
    NOW,
  )
  assert.equal(snapshot.tier, 'PASS')
  assert.deepEqual(snapshot.ownedTrackIds, ['frontend'])
  assert.equal(snapshot.assessmentAllowance, ASSESSMENT_ALLOWANCES.PASS)
})

test('expired Track Pass does not grant PASS', () => {
  const snapshot = deriveSnapshot(
    { subscription: null, trackAccess: [{ trackId: 'frontend', status: 'ACTIVE', expiresAt: past(1) }] },
    NOW,
  )
  assert.equal(snapshot.tier, 'FREE')
  assert.deepEqual(snapshot.ownedTrackIds, [])
})

test('Pro subscription yields PRO and all-track access', () => {
  const snapshot = deriveSnapshot(
    { subscription: { status: 'ACTIVE', currentPeriodEnd: future(20) }, trackAccess: [] },
    NOW,
  )
  assert.equal(snapshot.tier, 'PRO')
  assert.equal(snapshot.hasAllPremiumTracks, true)
  assert.equal(snapshot.assessmentAllowance, ASSESSMENT_ALLOWANCES.PRO)
  assert.equal(snapshot.cancelAtPeriodEnd, false)
})

test('cancelled Pro keeps access until the period end (grace)', () => {
  const snapshot = deriveSnapshot(
    { subscription: { status: 'CANCELLED', currentPeriodEnd: future(3), cancelAtPeriodEnd: true }, trackAccess: [] },
    NOW,
  )
  assert.equal(snapshot.tier, 'PRO')
  assert.equal(snapshot.cancelAtPeriodEnd, true)
})

test('grandfathering grants full access while active, then lapses', () => {
  const active = deriveSnapshot({ subscription: null, trackAccess: [], grandfatheredUntil: future(10) }, NOW)
  assert.equal(active.tier, 'PRO')
  assert.equal(active.grandfathered, true)
  const lapsed = deriveSnapshot({ subscription: null, trackAccess: [], grandfatheredUntil: past(1) }, NOW)
  assert.equal(lapsed.tier, 'FREE')
})

test('canAccessTrack: non-premium always allowed; premium needs entitlement', () => {
  const free = deriveSnapshot({ subscription: null, trackAccess: [] }, NOW)
  const pro = deriveSnapshot({ subscription: { status: 'ACTIVE' }, trackAccess: [] }, NOW)
  const pass = deriveSnapshot({ subscription: null, trackAccess: [{ trackId: 'frontend', status: 'ACTIVE', expiresAt: future(10) }] }, NOW)
  // With no premium tracks configured, everyone keeps access:
  assert.equal(canAccessTrack(free, 'frontend', []), true)
  assert.equal(canAccessTrack(pro, 'anything', []), true)
  assert.equal(canAccessTrack(pass, 'frontend', []), true)
  // Under the tracked first-wave manifest, a Free learner is not entitled to a
  // premium track, while Pro and a pass for that exact track are.
  assert.equal(canAccessTrack(free, 'frontend'), false)
  assert.equal(canAccessTrack(pro, 'frontend'), true)
  assert.equal(canAccessTrack(pass, 'frontend'), true)
  // A non-premium catalogue track is always accessible.
  assert.equal(canAccessTrack(free, 'datascience'), true)
})

test('premium content is denied without the correct entitlement (explicit premium set)', () => {
  const premium = ['frontend']
  const free = deriveSnapshot({ subscription: null, trackAccess: [] }, NOW)
  const passOther = deriveSnapshot({ subscription: null, trackAccess: [{ trackId: 'backend', status: 'ACTIVE', expiresAt: future(10) }] }, NOW)
  const passFrontend = deriveSnapshot({ subscription: null, trackAccess: [{ trackId: 'frontend', status: 'ACTIVE', expiresAt: future(10) }] }, NOW)
  const pro = deriveSnapshot({ subscription: { status: 'ACTIVE' }, trackAccess: [] }, NOW)

  assert.equal(canAccessTrack(free, 'frontend', premium), false) // denied
  assert.equal(canAccessTrack(free, 'backend', premium), true) // free track stays free
  assert.equal(canAccessTrack(passOther, 'frontend', premium), false) // a pass for another track grants nothing here
  assert.equal(canAccessTrack(passFrontend, 'frontend', premium), true)
  assert.equal(canAccessTrack(pro, 'frontend', premium), true)
})

test('monthBounds returns UTC calendar month and allowance is finite', () => {
  const { start, end } = monthBounds(NOW)
  assert.equal(start.toISOString(), '2026-10-01T00:00:00.000Z')
  assert.equal(end.toISOString(), '2026-11-01T00:00:00.000Z')
  assert.equal(withinAssessmentAllowance(19, 20), true)
  assert.equal(withinAssessmentAllowance(20, 20), false)
  assert.equal(withinAssessmentAllowance(0, 0), false)
})

test('grandfatheringUntil is config-gated and cutoff-aware', () => {
  const created = new Date('2026-01-01T00:00:00.000Z')
  assert.equal(grandfatheringUntil(created, {}, NOW), null)
  const until = grandfatheringUntil(created, { COMMERCE_GRANDFATHERING_UNTIL: '2027-01-01T00:00:00.000Z' }, NOW)
  assert.equal(until.toISOString(), '2027-01-01T00:00:00.000Z')
  // Users created after the cutoff are excluded.
  assert.equal(
    grandfatheringUntil(created, { COMMERCE_GRANDFATHERING_UNTIL: '2027-01-01T00:00:00.000Z', COMMERCE_GRANDFATHERING_CUTOFF: '2025-01-01T00:00:00.000Z' }, NOW),
    null,
  )
  // A lapsed/elapsed date yields null.
  assert.equal(grandfatheringUntil(created, { COMMERCE_GRANDFATHERING_UNTIL: '2026-01-01T00:00:00.000Z' }, NOW), null)
})
