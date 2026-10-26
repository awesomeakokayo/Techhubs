'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const pricingPage = fs.readFileSync(
  path.join(__dirname, '../app/(marketing)/pricing/page.tsx'),
  'utf8',
)
const pricingDisplay = fs.readFileSync(
  path.join(__dirname, '../lib/commercial/pricing-display.ts'),
  'utf8',
)

test('pricing page defines four distinct, responsive plan cards', () => {
  assert.match(pricingPage, /grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4/)
  assert.match(pricingPage, /<h2[^>]*>Free<\/h2>/)
  assert.match(pricingPage, /Single Guided Path Pass/)
  assert.match(pricingPage, /id: 'PRO_MONTHLY'/)
  assert.match(pricingPage, /id: 'PRO_ANNUAL'/)
  assert.doesNotMatch(pricingPage, /id: 'PRO_QUARTERLY'/)
})

test('pricing cards show approved Nigerian prices while keeping unavailable checkout disabled', () => {
  assert.match(pricingPage, /resolvePublicPricingPriceDisplay/)
  assert.match(pricingPage, /trackPassPriceDisplay\.offerNotice/)
  assert.match(pricingPage, /disabled=\{!ready\}/)
  assert.match(pricingPage, /Approved Nigerian prices are displayed for planning/)
})

test('the Founding Learner banner only renders for a truly active promotional price', () => {
  assert.match(pricingPage, /const showFoundingOffer = trackPassPriceDisplay\.isPromotional/)
  assert.match(pricingPage, /showFoundingOffer && campaign\.startsAt && campaign\.endsAt && trackPassBasePrice/)
  assert.match(pricingDisplay, /campaign\.active &&\s*checkoutReady/)
  assert.match(pricingDisplay, /Planned Founding Learner offer: ₦3,000/)
  assert.match(pricingDisplay, /checkout is not open yet/i)
})
