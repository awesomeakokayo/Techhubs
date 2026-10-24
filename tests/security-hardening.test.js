'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..')
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')

test('debug diagnostics never expose session identifiers or cookie details', () => {
  const source = read('app/api/debug/route.ts')
  assert.match(source, /NODE_ENV === 'production'/)
  assert.match(source, /status: 404/)
  assert.doesNotMatch(source, /cookies\(\)|sessionCookie|sessionCookieValue|allCookieNames|sessionId\s*:/)
  assert.match(source, /Do not expose session identifiers/)
})

test('legacy payment initialization cannot bypass the guarded commerce checkout', () => {
  const source = read('app/api/payments/initialize/route.ts')
  assert.match(source, /status: 410/)
  assert.doesNotMatch(source, /api\.paystack\.co\/transaction\/initialize|PAYSTACK_SECRET_KEY|prisma\.paymentOrder/)
})

test('legacy pricing endpoint no longer exposes draft pricing data', () => {
  const source = read('app/api/payments/pricing/route.ts')
  assert.match(source, /status: 410/)
  assert.doesNotMatch(source, /PRICING|PLAN_KEYS|resolvePricingContext|PAYSTACK_SECRET_KEY/)
})

test('resource index and global search use the same enriched track catalogue', () => {
  const resources = read('app/(marketing)/resources/ResourcesClient.tsx')
  const search = read('lib/search.ts')
  const enrichment = read('lib/ai-track.ts')
  assert.match(resources, /getAIEnrichedTracks/)
  assert.match(search, /getAIEnrichedTracks/)
  assert.match(enrichment, /export function getAIEnrichedTracks/)
  assert.doesNotMatch(resources, /trackOptions\.slice\(0,\s*6\)/)
})

test('guided-path API validates track IDs before enrollment or progression writes', () => {
  const source = read('app/api/guided-path/[trackId]/route.ts')
  assert.match(source, /import \{ getTrackById \} from '@\/lib\/tracks'/)
  assert.equal((source.match(/if \(!getTrackById\(params\.trackId\)\).*status: 404/g) ?? []).length, 2)
})
