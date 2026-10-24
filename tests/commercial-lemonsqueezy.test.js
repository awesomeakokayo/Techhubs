'use strict'
/** Lemon Squeezy checkout payload builder and response parsing (pure). */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  buildLemonSqueezyCheckoutPayload,
  lemonSqueezyCheckoutUrl,
} = require('../.test-dist/commercial/lemonsqueezy.js')

test('checkout payload embeds store, variant, redirect and custom data', () => {
  const payload = buildLemonSqueezyCheckoutPayload({
    storeId: '123',
    variantId: '456',
    redirectUrl: 'https://example.com/billing/success?reference=TSH_REF',
    email: 'learner@example.com',
    name: 'Learner',
    custom: { order_ref: 'TSH_REF', plan_id: 'PRO_MONTHLY', track_id: '', user_id: 'u1' },
  })
  assert.equal(payload.data.type, 'checkouts')
  assert.equal(payload.data.relationships.store.data.id, '123')
  assert.equal(payload.data.relationships.variant.data.id, '456')
  assert.equal(payload.data.attributes.product_options.redirect_url, 'https://example.com/billing/success?reference=TSH_REF')
  assert.deepEqual(payload.data.attributes.checkout_data.custom.order_ref, 'TSH_REF')
  assert.equal(payload.data.attributes.checkout_data.email, 'learner@example.com')
})

test('checkout payload omits email/name when not provided', () => {
  const payload = buildLemonSqueezyCheckoutPayload({ storeId: '1', variantId: '2', redirectUrl: 'https://e.test', custom: { order_ref: 'r' } })
  assert.equal('email' in payload.data.attributes.checkout_data, false)
  assert.equal('name' in payload.data.attributes.checkout_data, false)
})

test('lemonSqueezyCheckoutUrl extracts only https checkout urls', () => {
  assert.equal(lemonSqueezyCheckoutUrl({ data: { attributes: { url: 'https://store.lemonsqueezy.com/checkout/buy/x' } } }), 'https://store.lemonsqueezy.com/checkout/buy/x')
  assert.equal(lemonSqueezyCheckoutUrl({ data: { attributes: { url: 'javascript:alert(1)' } } }), null)
  assert.equal(lemonSqueezyCheckoutUrl({}), null)
  assert.equal(lemonSqueezyCheckoutUrl(null), null)
})

test('checkout defaults to live mode and only requests test mode when explicitly asked', () => {
  const base = { storeId: '1', variantId: '2', redirectUrl: 'https://e.test', custom: { order_ref: 'r' } }
  assert.equal(buildLemonSqueezyCheckoutPayload(base).data.attributes.test_mode, false)
  assert.equal(buildLemonSqueezyCheckoutPayload({ ...base, testMode: false }).data.attributes.test_mode, false)
  assert.equal(buildLemonSqueezyCheckoutPayload({ ...base, testMode: true }).data.attributes.test_mode, true)
})

test('providerTestMode is false unless explicitly enabled', () => {
  const { providerTestMode } = require('../.test-dist/commercial/providers.js')
  assert.equal(providerTestMode({}), false)
  assert.equal(providerTestMode({ COMMERCE_PROVIDER_TEST_MODE: 'false' }), false)
  assert.equal(providerTestMode({ COMMERCE_PROVIDER_TEST_MODE: 'true' }), true)
})
