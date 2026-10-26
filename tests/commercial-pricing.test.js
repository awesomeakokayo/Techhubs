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
  FOUNDING_LEARNER_PRICING_VERSION,
  resolveCommercialPrice,
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
  assert.ok(COMMERCIAL_PRICING_VERSION.includes('NGN-APPROVED'))
})

test('approved Nigerian catalogue contains the final Track Pass and Pro prices', () => {
  const trackPass = resolveProviderPrice('paystack', 'TRACK_PASS')
  assert.equal(trackPass.amountMinor, 600000)
  assert.equal(trackPass.currency, 'NGN')
  assert.equal(trackPass.approved, true)
  assert.equal(trackPass.interval, null)

  assert.equal(resolveProviderPrice('paystack', 'PRO_MONTHLY').amountMinor, 450000)
  assert.equal(resolveProviderPrice('paystack', 'PRO_MONTHLY').interval, 'P1M')
  assert.equal(resolveProviderPrice('paystack', 'PRO_QUARTERLY').amountMinor, 1100000)
  assert.equal(resolveProviderPrice('paystack', 'PRO_QUARTERLY').interval, 'P3M')
  assert.equal(resolveProviderPrice('paystack', 'PRO_ANNUAL').amountMinor, 3600000)
  assert.equal(resolveProviderPrice('paystack', 'PRO_ANNUAL').interval, 'P1Y')
  assert.deepEqual(Object.keys(PRICE_CATALOGUE.paystack).sort(), ['PRO_ANNUAL', 'PRO_MONTHLY', 'PRO_QUARTERLY', 'TRACK_PASS'])
  assert.equal(isPriceApproved(trackPass, { COMMERCE_PRICES_APPROVED: 'true' }), true)
  assert.equal(isPriceApproved(trackPass, {}), false)
  assert.equal(hasApprovedPrice('PRO_QUARTERLY', { COMMERCE_PRICES_APPROVED: 'true' }), true)
})

test('the Founding Learner price is fixed-window, server-resolved and never modifies Pro', () => {
  const env = {
    COMMERCE_FOUNDING_OFFER_ENABLED: 'true',
    COMMERCE_FOUNDING_OFFER_STARTS_AT: '2026-11-01T00:00:00+01:00',
    COMMERCE_FOUNDING_OFFER_ENDS_AT: '2026-11-15T00:00:00+01:00',
  }
  const active = resolveCommercialPrice('paystack', 'TRACK_PASS', new Date('2026-11-02T12:00:00Z'), env)
  assert.equal(active.price.amountMinor, 300000)
  assert.equal(active.campaignId, 'FOUNDING_LEARNER_OFFER')
  assert.equal(active.pricingVersion, FOUNDING_LEARNER_PRICING_VERSION)

  const expired = resolveCommercialPrice('paystack', 'TRACK_PASS', new Date('2026-11-15T00:00:00Z'), env)
  assert.equal(expired.price.amountMinor, 600000)
  assert.equal(expired.campaignId, null)

  const pro = resolveCommercialPrice('paystack', 'PRO_QUARTERLY', new Date('2026-11-02T12:00:00Z'), env)
  assert.equal(pro.price.amountMinor, 1100000)
  assert.equal(pro.campaignId, null)
})

test('hasAnyPrice reflects configured prices, not plan names', () => {
  assert.equal(hasAnyPrice('TRACK_PASS'), true)
  assert.equal(hasAnyPrice('UNKNOWN'), false)
})

test('price formatting respects NGN whole-naira and USD minor units', () => {
  assert.equal(formatPrice(resolveProviderPrice('paystack', 'TRACK_PASS')), '₦6,000')
  assert.equal(formatPrice(resolveProviderPrice('paystack', 'PRO_MONTHLY')), '₦4,500')
  assert.equal(formatPrice(resolveProviderPrice('paystack', 'PRO_QUARTERLY')), '₦11,000')
  assert.equal(formatPrice(resolveProviderPrice('paystack', 'PRO_ANNUAL')), '₦36,000')
  assert.equal(formatPrice(resolveProviderPrice('lemonsqueezy', 'TRACK_PASS')), '$9.00')
})
