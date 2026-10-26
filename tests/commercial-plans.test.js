'use strict'
/**
 * Commercial catalogue: internal plan ids, kinds, intervals and entitlements.
 * These guard the canonical product definition against drift.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  PLAN_IDS,
  PLANS,
  ASSESSMENT_ALLOWANCES,
  isPlanId,
  getPlan,
  planGrantsTrack,
  allowanceForTier,
  isPremiumTrack,
  isPremiumTrackIn,
  premiumTrackIds,
  PREMIUM_TRACK_IDS,
  oneTimePlanIds,
  subscriptionPlanIds,
} = require('../.test-dist/commercial/plans.js')

test('the canonical catalogue defines exactly the four commercial products', () => {
  assert.deepEqual([...PLAN_IDS].sort(), ['PRO_ANNUAL', 'PRO_MONTHLY', 'PRO_QUARTERLY', 'TRACK_PASS'])
  assert.equal(oneTimePlanIds().length, 1)
  assert.deepEqual(oneTimePlanIds(), ['TRACK_PASS'])
  assert.deepEqual(subscriptionPlanIds().sort(), ['PRO_ANNUAL', 'PRO_MONTHLY', 'PRO_QUARTERLY'])
})

test('plan identifiers validate and resolve', () => {
  assert.equal(isPlanId('PRO_MONTHLY'), true)
  assert.equal(isPlanId('pro_monthly'), false)
  assert.equal(isPlanId(''), false)
  assert.equal(getPlan('TRACK_PASS').tier, 'PASS')
  assert.equal(getPlan('PRO_ANNUAL').kind, 'SUBSCRIPTION')
  assert.equal(getPlan('PRO_QUARTERLY').interval, 'QUARTER')
  assert.equal(getPlan('nope'), null)
})

test('Pro grants every track; a Track Pass grants premium tracks only', () => {
  const pass = getPlan('TRACK_PASS')
  const pro = getPlan('PRO_MONTHLY')
  // A Track Pass statically applies to premium tracks, not to free ones.
  assert.equal(planGrantsTrack(pass, 'frontend', {}), true)
  assert.equal(planGrantsTrack(pass, 'datascience', {}), false)
  // Pro always grants.
  assert.equal(planGrantsTrack(pro, 'frontend', {}), true)
  assert.equal(planGrantsTrack(pro, 'anything', {}), true)
  // An explicit empty allowlist means nothing is premium.
  assert.equal(planGrantsTrack(pass, 'frontend', { COMMERCE_PREMIUM_TRACK_IDS: '' }), false)
})

test('the tracked first-wave manifest is the default premium set', () => {
  assert.deepEqual([...PREMIUM_TRACK_IDS], ['frontend', 'backend', 'python'])
  assert.equal(isPremiumTrack('frontend', {}), true)
  // A non-premium catalogue track is never premium by default.
  assert.equal(isPremiumTrack('datascience', {}), false)
})

test('premium allowlist resolves from the manifest and is always validated', () => {
  assert.deepEqual(premiumTrackIds({}).sort(), ['backend', 'frontend', 'python'])
  // Operator override (normalized + de-duplicated).
  assert.deepEqual(premiumTrackIds({ COMMERCE_PREMIUM_TRACK_IDS: ' frontend,backend ,frontend ' }).sort(), ['backend', 'frontend'])
  // Unknown ids are dropped (fail-safe): never all tracks, never a bogus track.
  assert.deepEqual(premiumTrackIds({ COMMERCE_PREMIUM_TRACK_IDS: 'frontend,totally-made-up,*' }).sort(), ['frontend'])
  // An explicit empty value disables premium entirely.
  assert.deepEqual(premiumTrackIds({ COMMERCE_PREMIUM_TRACK_IDS: '' }), [])
  assert.equal(isPremiumTrackIn('frontend', ['frontend']), true)
  assert.equal(isPremiumTrackIn('frontend', []), false)
  assert.equal(isPremiumTrack('frontend', { COMMERCE_PREMIUM_TRACK_IDS: 'frontend' }), true)
  assert.equal(isPremiumTrack('frontend', { COMMERCE_PREMIUM_TRACK_IDS: '' }), false)
})

test('assessment allowances are finite and tiered (never unlimited)', () => {
  for (const tier of ['FREE', 'PASS', 'PRO']) {
    assert.ok(Number.isFinite(ASSESSMENT_ALLOWANCES[tier]))
    assert.ok(ASSESSMENT_ALLOWANCES[tier] > 0)
  }
  assert.ok(ASSESSMENT_ALLOWANCES.PASS >= ASSESSMENT_ALLOWANCES.FREE)
  assert.ok(ASSESSMENT_ALLOWANCES.PRO > ASSESSMENT_ALLOWANCES.FREE)
  assert.equal(ASSESSMENT_ALLOWANCES.FREE, 2)
  assert.equal(allowanceForTier('FREE'), 2)
  assert.equal(allowanceForTier('unknown'), ASSESSMENT_ALLOWANCES.FREE)
})


test('Track Pass copy clearly states a three-calendar-month one-time term', () => {
  const pass = getPlan('TRACK_PASS')
  assert.match(pass.summary, /three calendar months/i)
  assert.ok(pass.features.some((feature) => /three months/i.test(feature)))
})
