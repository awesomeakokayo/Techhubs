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

test('pricing page keeps four distinct, responsive plan cards', () => {
  assert.match(pricingPage, /grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4/)
  assert.match(pricingPage, /<h2[^>]*>Free<\/h2>/)
  assert.match(pricingPage, /Single Guided Path Pass/)
  assert.match(pricingPage, /id: 'PRO_MONTHLY'/)
  assert.match(pricingPage, /id: 'PRO_ANNUAL'/)
  assert.doesNotMatch(pricingPage, /id: 'PRO_QUARTERLY'/)
})

test('pricing cards use public price display rules and keep checkout gated', () => {
  assert.match(pricingPage, /resolvePublicPricingPriceDisplay/)
  assert.match(pricingPage, /trackPassPriceDisplay\.offerNotice/)
  assert.match(pricingPage, /disabled={!ready}/)
  assert.match(pricingPage, /Approved Nigerian prices are displayed for planning/)
})

test('pricing copy does not present the founding offer as active before its launch gates', () => {
  assert.match(pricingPage, /showFoundingOffer = trackPassPriceDisplay\.isPromotional/)
  assert.match(pricingPage, /Until then, the planned offer is disclosed without presenting it as an active sale/)
  assert.doesNotMatch(pricingPage, /FoundingLearnerBanner[^]*campaign\.active/)
})
