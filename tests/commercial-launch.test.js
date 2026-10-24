'use strict'
/**
 * Fail-closed launch readiness: paid checkout must not be startable unless every
 * prerequisite is satisfied.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { launchReadiness, checkoutAllowedToStart } = require('../.test-dist/commercial/launch.js')

const FULL = {
  COMMERCE_ENTITLEMENTS_ENFORCED: 'true',
  COMMERCE_PRICES_APPROVED: 'true',
  COMMERCE_PREMIUM_TRACK_IDS: 'frontend',
  LEMONSQUEEZY_API_KEY: 'k',
  LEMONSQUEEZY_STORE_ID: '1',
  LEMONSQUEEZY_WEBHOOK_SECRET: 's',
  LEMONSQUEEZY_VARIANT_TRACK_PASS: '11',
  LEMONSQUEEZY_VARIANT_PRO_MONTHLY: '12',
  LEMONSQUEEZY_VARIANT_PRO_ANNUAL: '13',
}

test('with no configuration, checkout is not ready and lists every blocker', () => {
  const { ready, blockers } = launchReadiness({})
  assert.equal(ready, false)
  assert.ok(blockers.includes('entitlements_not_enforced'))
  assert.ok(blockers.includes('prices_not_approved'))
  assert.ok(blockers.includes('no_provider_configured'))
  // The tracked manifest supplies premium tracks, so the allowlist blocker is
  // raised only when the allowlist is explicitly emptied.
  assert.equal(blockers.includes('no_premium_tracks_selected'), false)
  assert.ok(launchReadiness({ COMMERCE_PREMIUM_TRACK_IDS: '' }).blockers.includes('no_premium_tracks_selected'))
  assert.equal(checkoutAllowedToStart({}), false)
})

test('an invalid premium allowlist blocks checkout', () => {
  const { blockers } = launchReadiness({ ...FULL, COMMERCE_PREMIUM_TRACK_IDS: 'frontend,not-a-real-track' })
  assert.ok(blockers.includes('premium_allowlist_invalid'))
  assert.equal(checkoutAllowedToStart({ ...FULL, COMMERCE_PREMIUM_TRACK_IDS: 'not-a-real-track' }), false)
})

test('with full configuration, checkout is ready', () => {
  const { ready, blockers } = launchReadiness(FULL)
  assert.deepEqual(blockers, [])
  assert.equal(ready, true)
  assert.equal(checkoutAllowedToStart(FULL), true)
})

test('each missing prerequisite is reported individually', () => {
  const cases = [
    ['COMMERCE_ENTITLEMENTS_ENFORCED', 'entitlements_not_enforced'],
    ['COMMERCE_PRICES_APPROVED', 'prices_not_approved'],
    ['LEMONSQUEEZY_API_KEY', 'no_provider_configured'],
  ]
  for (const [key, blocker] of cases) {
    const env = { ...FULL }
    delete env[key]
    const { blockers } = launchReadiness(env)
    assert.ok(blockers.includes(blocker), `expected ${blocker} when ${key} removed, got ${blockers.join(',')}`)
  }
  // Explicitly emptying the allowlist is reported as no premium tracks.
  const emptied = launchReadiness({ ...FULL, COMMERCE_PREMIUM_TRACK_IDS: '' })
  assert.ok(emptied.blockers.includes('no_premium_tracks_selected'))
})
