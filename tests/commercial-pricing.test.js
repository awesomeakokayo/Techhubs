'use strict'
/**
 * Commercial pricing: provisional, provider/currency keyed, never published by
 * default, and never inventing NGN prices.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  PROVISIONAL_PRICES,
  resolveProviderPrice,
  hasAnyPrice,
  pricesApprovedForPublication,
  formatPrice,
  COMMERCIAL_PRICING_VERSION,
} = require('../.test-dist/commercial/pricing.js')

test('prices are NOT approved for publication by default', () => {
  assert.equal(pricesApprovedForPublication({}), false)
  assert.equal(pricesApprovedForPublication({ COMMERCE_PRICES_APPROVED: 'true' }), true)
  assert.equal(pricesApprovedForPublication({ COMMERCE_PRICES_APPROVED: 'false' }), false)
})

test('provisional international prices exist for all three products', () => {
  assert.equal(resolveProviderPrice('lemonsqueezy', 'TRACK_PASS').amountMinor, 900)
  assert.equal(resolveProviderPrice('lemonsqueezy', 'PRO_MONTHLY').amountMinor, 1200)
  assert.equal(resolveProviderPrice('lemonsqueezy', 'PRO_ANNUAL').amountMinor, 9600)
  assert.ok(COMMERCIAL_PRICING_VERSION.length > 0)
})

test('no Nigerian (Paystack) prices are invented', () => {
  assert.equal(resolveProviderPrice('paystack', 'TRACK_PASS'), null)
  assert.equal(resolveProviderPrice('paystack', 'PRO_MONTHLY'), null)
  assert.deepEqual(PROVISIONAL_PRICES.paystack, {})
})

test('hasAnyPrice reflects configuration', () => {
  assert.equal(hasAnyPrice('TRACK_PASS'), true)
  assert.equal(hasAnyPrice('UNKNOWN'), false)
})

test('formatPrice renders minor units', () => {
  assert.equal(formatPrice({ planId: 'TRACK_PASS', provider: 'lemonsqueezy', currency: 'USD', amountMinor: 900, interval: null }), '$9.00')
})
