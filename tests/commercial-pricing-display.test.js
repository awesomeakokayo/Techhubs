'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { resolvePublicPricingPriceDisplay } = require('../.test-dist/commercial/pricing-display.js')

const activeCampaign = {
  COMMERCE_FOUNDING_OFFER_ENABLED: 'true',
  COMMERCE_FOUNDING_OFFER_STARTS_AT: '2026-11-01T00:00:00+01:00',
  COMMERCE_FOUNDING_OFFER_ENDS_AT: '2026-11-15T00:00:00+01:00',
}
const nowDuringCampaign = new Date('2026-11-02T12:00:00Z')

test('approved NGN prices remain visible while checkout publication is gated', () => {
  const trackPass = resolvePublicPricingPriceDisplay({
    provider: 'paystack', planId: 'TRACK_PASS', country: 'NG',
    checkoutReady: false, now: new Date('2026-10-26T12:00:00Z'), env: {},
  })
  const monthly = resolvePublicPricingPriceDisplay({
    provider: 'paystack', planId: 'PRO_MONTHLY', country: 'NG',
    checkoutReady: false, env: {},
  })
  const annual = resolvePublicPricingPriceDisplay({
    provider: 'paystack', planId: 'PRO_ANNUAL', country: 'NG',
    checkoutReady: false, env: {},
  })

  assert.equal(trackPass.priceLabel, '₦3,000')
  assert.equal(trackPass.regularPriceLabel, '₦6,000')
  assert.equal(monthly.priceLabel, '₦4,500')
  assert.equal(annual.priceLabel, '₦36,000')
  assert.match(trackPass.offerNotice, /₦3,000/)
  assert.equal(trackPass.isPromotional, false)
})

test('Founding Learner amount is the displayed price only inside the valid window with ready checkout', () => {
  const display = resolvePublicPricingPriceDisplay({
    provider: 'paystack', planId: 'TRACK_PASS', country: 'ng',
    checkoutReady: true, now: nowDuringCampaign, env: activeCampaign,
  })

  assert.equal(display.priceLabel, '₦3,000')
  assert.equal(display.regularPriceLabel, '₦6,000')
  assert.equal(display.isPromotional, true)
  assert.equal(display.pricingVersion, 'TSH-COMMERCE-2026-10-FOUNDING-LEARNER-3M-NGN3000')
  assert.equal(display.campaignId, 'FOUNDING_LEARNER_OFFER')
  assert.equal(display.offerNotice, null)
})

test('active promotion is not presented as available while checkout is not ready', () => {
  const display = resolvePublicPricingPriceDisplay({
    provider: 'paystack', planId: 'TRACK_PASS', country: 'NG',
    checkoutReady: false, now: nowDuringCampaign, env: activeCampaign,
  })

  assert.equal(display.priceLabel, '₦3,000')
  assert.equal(display.regularPriceLabel, '₦6,000')
  assert.equal(display.isPromotional, false)
  assert.match(display.offerNotice, /₦3,000/)
  assert.match(display.offerNotice, /checkout is not open yet/i)
  assert.equal(display.pricingVersion, 'TSH-COMMERCE-2026-10-NGN-APPROVED-PRICING-V1')
})

test('unapproved USD prices are not published as customer-facing prices', () => {
  const display = resolvePublicPricingPriceDisplay({
    provider: 'lemonsqueezy', planId: 'TRACK_PASS', country: 'US',
    checkoutReady: false, env: {},
  })

  assert.equal(display.priceLabel, 'Not available in your region yet')
  assert.equal(display.regularPriceLabel, null)
  assert.equal(display.offerNotice, null)
})

test('Founding Learner promotion never changes Pro monthly or annual prices', () => {
  for (const [planId, expected] of [['PRO_MONTHLY', '₦4,500'], ['PRO_ANNUAL', '₦36,000']]) {
    const display = resolvePublicPricingPriceDisplay({
      provider: 'paystack', planId, country: 'NG',
      checkoutReady: true, now: nowDuringCampaign, env: activeCampaign,
    })
    assert.equal(display.priceLabel, expected)
    assert.equal(display.isPromotional, false)
    assert.equal(display.campaignId, null)
  }
})

test('campaign dates in the future are explanatory, not prematurely discounted', () => {
  const display = resolvePublicPricingPriceDisplay({
    provider: 'paystack', planId: 'TRACK_PASS', country: 'NG',
    checkoutReady: true, now: new Date('2026-10-27T12:00:00Z'), env: activeCampaign,
  })

  assert.equal(display.priceLabel, '₦6,000')
  assert.equal(display.isPromotional, false)
  assert.match(display.offerNotice, /from/)
  assert.match(display.offerNotice, /Africa\/Lagos/)
})
