'use strict'
/** Fail-closed launch readiness is evaluated for the selected plan/provider. */
const test = require('node:test')
const assert = require('node:assert/strict')

const { launchReadiness, checkoutAllowedToStart } = require('../.test-dist/commercial/launch.js')

const BASE = {
  COMMERCE_ENTITLEMENTS_ENFORCED: 'true',
  COMMERCE_PRICES_APPROVED: 'true',
  COMMERCE_PREMIUM_TRACK_IDS: 'frontend',
}
const PAYSTACK_TRACK_PASS = { ...BASE, PAYSTACK_SECRET_KEY: 'sk_test_example' }
const FULL_LS = {
  ...BASE,
  LEMONSQUEEZY_API_KEY: 'k',
  LEMONSQUEEZY_STORE_ID: '1',
  LEMONSQUEEZY_WEBHOOK_SECRET: 's',
  LEMONSQUEEZY_VARIANT_TRACK_PASS: '11',
  LEMONSQUEEZY_VARIANT_PRO_MONTHLY: '12',
  LEMONSQUEEZY_VARIANT_PRO_ANNUAL: '13',
}

test('no configuration fails closed with actionable blockers', () => {
  const { ready, blockers } = launchReadiness({})
  assert.equal(ready, false)
  assert.ok(blockers.includes('entitlements_not_enforced'))
  assert.ok(blockers.includes('prices_not_approved'))
  assert.ok(blockers.includes('no_provider_configured'))
  assert.equal(blockers.includes('no_premium_tracks_selected'), false)
  assert.ok(launchReadiness({ COMMERCE_PREMIUM_TRACK_IDS: '' }).blockers.includes('no_premium_tracks_selected'))
  assert.equal(checkoutAllowedToStart({}), false)
})

test('an invalid premium allowlist blocks a course purchase', () => {
  const { blockers } = launchReadiness(
    { ...PAYSTACK_TRACK_PASS, COMMERCE_PREMIUM_TRACK_IDS: 'frontend,not-a-real-track' },
    'TRACK_PASS',
    'paystack',
  )
  assert.ok(blockers.includes('premium_allowlist_invalid'))
  assert.equal(checkoutAllowedToStart(
    { ...PAYSTACK_TRACK_PASS, COMMERCE_PREMIUM_TRACK_IDS: 'not-a-real-track' },
    'TRACK_PASS',
    'paystack',
  ), false)
})

test('the approved Nigerian Track Pass can be ready independently of provisional Pro prices', () => {
  const { ready, blockers } = launchReadiness(PAYSTACK_TRACK_PASS, 'TRACK_PASS', 'paystack')
  assert.deepEqual(blockers, [])
  assert.equal(ready, true)
  assert.equal(checkoutAllowedToStart(PAYSTACK_TRACK_PASS, 'TRACK_PASS', 'paystack'), true)
})

test('provisional Lemon Squeezy prices cannot be charged', () => {
  const { ready, blockers } = launchReadiness(FULL_LS, 'PRO_MONTHLY', 'lemonsqueezy')
  assert.equal(ready, false)
  assert.ok(blockers.includes('price_not_approved:lemonsqueezy:PRO_MONTHLY'))
  assert.equal(checkoutAllowedToStart(FULL_LS, 'PRO_MONTHLY', 'lemonsqueezy'), false)
})

test('every master prerequisite is enforced for the selected plan', () => {
  const cases = [
    ['COMMERCE_ENTITLEMENTS_ENFORCED', 'entitlements_not_enforced'],
    ['COMMERCE_PRICES_APPROVED', 'prices_not_approved'],
    ['PAYSTACK_SECRET_KEY', 'no_provider_configured'],
  ]
  for (const [key, blocker] of cases) {
    const env = { ...PAYSTACK_TRACK_PASS }
    delete env[key]
    const { blockers } = launchReadiness(env, 'TRACK_PASS', 'paystack')
    assert.ok(blockers.includes(blocker), `expected ${blocker} when ${key} removed; got ${blockers.join(',')}`)
  }
})
