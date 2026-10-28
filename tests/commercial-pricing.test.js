'use strict'
/** Per-plan commercial price approvals, provider/currency mapping and formatting. */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  PRICE_CATALOGUE,
  resolveProviderPrice,
  hasAnyPrice,
  hasApprovedPrice,
  pricesApprovedForPublication,
  isPriceApproved,
  formatPrice,
  COMMERCIAL_PRICING_VERSION,
} = require('../.test-dist/commercial/pricing.js')

test('the publication master switch is off by default', () => {
  assert.equal(pricesApprovedForPublication({}), false)
  assert.equal(pricesApprovedForPublication({ COMMERCE_PRICES_APPROVED: 'true' }), true)
  assert.equal(pricesApprovedForPublication({ COMMERCE_PRICES_APPROVED: 'false' }), false)
})

test('international prices remain unapproved until explicitly reviewed', () => {
  assert.equal(resolveProviderPrice('lemonsqueezy', 'TRACK_PASS').amountMinor, 900)
  assert.equal(resolveProviderPrice('lemonsqueezy', 'PRO_MONTHLY').amountMinor, 1200)
  assert.equal(resolveProviderPrice('lemonsqueezy', 'PRO_ANNUAL').amountMinor, 9600)
  const env = { COMMERCE_PRICES_APPROVED: 'true' }
  assert.equal(isPriceApproved(resolveProviderPrice('lemonsqueezy', 'TRACK_PASS'), env), false)
  assert.equal(hasApprovedPrice('PRO_MONTHLY', env), false)
  assert.ok(COMMERCIAL_PRICING_VERSION.includes('TRACKPASS-TRACK-TERMS-NGN6000'))
})

test('the configured Nigerian Track Pass amount remains NGN 6,000 while its term is track-specific', () => {
  const price = resolveProviderPrice('paystack', 'TRACK_PASS')
  assert.equal(price.amountMinor, 600000)
  assert.equal(price.currency, 'NGN')
  assert.equal(price.approved, true)
  assert.equal(price.interval, null)
  assert.equal(resolveProviderPrice('paystack', 'PRO_MONTHLY'), null)
  assert.equal(resolveProviderPrice('paystack', 'PRO_ANNUAL'), null)
  assert.deepEqual(Object.keys(PRICE_CATALOGUE.paystack), ['TRACK_PASS'])
  assert.equal(isPriceApproved(price, { COMMERCE_PRICES_APPROVED: 'true' }), true)
  assert.equal(isPriceApproved(price, {}), false)
  assert.equal(hasApprovedPrice('TRACK_PASS', { COMMERCE_PRICES_APPROVED: 'true' }), true)
})

test('hasAnyPrice reflects configured prices, not plan names', () => {
  assert.equal(hasAnyPrice('TRACK_PASS'), true)
  assert.equal(hasAnyPrice('UNKNOWN'), false)
})

test('price formatting respects NGN whole-naira and USD minor units', () => {
  assert.equal(formatPrice(resolveProviderPrice('paystack', 'TRACK_PASS')), '₦6,000')
  assert.equal(formatPrice(resolveProviderPrice('lemonsqueezy', 'TRACK_PASS')), '$9.00')
})
