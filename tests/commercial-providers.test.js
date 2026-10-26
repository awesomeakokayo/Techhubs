'use strict'
/**
 * Provider capabilities and safety switches. Checkout and enforcement MUST be
 * off unless explicitly configured, and no provider is "available" without its
 * credentials present.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  checkoutEnabled,
  entitlementsEnforced,
  lemonSqueezyConfigured,
  paystackConfigured,
  providerCapabilities,
  availableProviders,
  selectProvider,
  providerProductId,
  PROVIDER_IDS,
} = require('../.test-dist/commercial/providers.js')

const FULL_LS_ENV = {
  LEMONSQUEEZY_API_KEY: 'k',
  LEMONSQUEEZY_STORE_ID: '1',
  LEMONSQUEEZY_WEBHOOK_SECRET: 's',
  LEMONSQUEEZY_VARIANT_TRACK_PASS: '11',
  LEMONSQUEEZY_VARIANT_PRO_MONTHLY: '12',
  LEMONSQUEEZY_VARIANT_PRO_ANNUAL: '13',
}

test('checkout and entitlement enforcement are disabled by default', () => {
  assert.equal(checkoutEnabled({}), false)
  assert.equal(entitlementsEnforced({}), false)
  assert.equal(checkoutEnabled({ COMMERCE_CHECKOUT_ENABLED: 'true' }), true)
  assert.equal(entitlementsEnforced({ COMMERCE_ENTITLEMENTS_ENFORCED: 'true' }), true)
  // Any value other than the exact string 'true' is treated as disabled.
  assert.equal(checkoutEnabled({ COMMERCE_CHECKOUT_ENABLED: '1' }), false)
})

test('a provider is not configured without full credentials', () => {
  assert.equal(lemonSqueezyConfigured({}), false)
  assert.equal(paystackConfigured({}), false)
  assert.equal(lemonSqueezyConfigured(FULL_LS_ENV), true)
  assert.equal(paystackConfigured({ PAYSTACK_SECRET_KEY: 'sk' }), true)
})

test('no provider is available and no selection can be made without configuration', () => {
  for (const id of PROVIDER_IDS) {
    assert.equal(providerCapabilities(id, {}).configured, false)
  }
  assert.deepEqual(availableProviders('PRO_MONTHLY', {}), [])
  assert.equal(selectProvider('PRO_MONTHLY', null, {}), null)
  assert.equal(selectProvider('TRACK_PASS', 'paystack', {}), null)
})

test('Lemon Squeezy is available for configured products with a known price', () => {
  assert.deepEqual(availableProviders('TRACK_PASS', FULL_LS_ENV), ['lemonsqueezy'])
  assert.equal(selectProvider('PRO_ANNUAL', null, FULL_LS_ENV), 'lemonsqueezy')
  assert.equal(selectProvider('PRO_ANNUAL', 'paystack', FULL_LS_ENV), null)
  assert.equal(selectProvider('PRO_ANNUAL', null, FULL_LS_ENV), 'lemonsqueezy')
  assert.equal(providerProductId('lemonsqueezy', 'PRO_MONTHLY', FULL_LS_ENV), '12')
})

test('Paystack Pro subscriptions remain blocked until explicit plan codes and release flag are present', () => {
  const base = { PAYSTACK_SECRET_KEY: 'sk' }
  assert.deepEqual(availableProviders('TRACK_PASS', base), ['paystack'])
  assert.equal(selectProvider('TRACK_PASS', 'paystack', base), 'paystack')
  assert.deepEqual(availableProviders('PRO_MONTHLY', base), [])
  assert.deepEqual(availableProviders('PRO_QUARTERLY', base), [])
  assert.deepEqual(availableProviders('PRO_ANNUAL', base), [])

  const recurring = {
    ...base,
    COMMERCE_PAYSTACK_PRO_SUBSCRIPTIONS_ENABLED: 'true',
    PAYSTACK_PLAN_CODE_PRO_MONTHLY: 'PLN_month',
    PAYSTACK_PLAN_CODE_PRO_QUARTERLY: 'PLN_quarter',
    PAYSTACK_PLAN_CODE_PRO_ANNUAL: 'PLN_year',
  }
  assert.equal(selectProvider('PRO_MONTHLY', 'paystack', recurring), 'paystack')
  assert.equal(selectProvider('PRO_QUARTERLY', 'paystack', recurring), 'paystack')
  assert.equal(selectProvider('PRO_ANNUAL', 'paystack', recurring), 'paystack')
  assert.equal(providerProductId('paystack', 'PRO_QUARTERLY', recurring), 'PLN_quarter')
  assert.equal(providerProductId('paystack', 'TRACK_PASS', recurring), null)
})
