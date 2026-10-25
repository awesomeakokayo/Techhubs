'use strict'
/**
 * First-wave premium manifest: the tracked shortlist must be real, complete and
 * fail-safe. Selecting premium tracks must never restrict access on its own (that
 * is decided by `hasTrackAccess` under enforcement), so these tests only validate
 * configuration, not access.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { TRACKS, getTrackBySlug, getTrackById } = require('../.test-dist/tracks.js')
const { buildGuidedPath } = require('../.test-dist/guided-path.js')
const { trackAssessmentCoverage } = require('../.test-dist/curriculum.js')
const {
  PREMIUM_WAVE_1,
  FIRST_WAVE_TRACK_IDS,
  ALL_TRACK_IDS,
  parsePremiumAllowlist,
  premiumAllowlistUnknown,
  resolvePremiumConfig,
} = require('../.test-dist/commercial/premium.js')

test('the first wave is exactly three tracks', () => {
  assert.equal(PREMIUM_WAVE_1.length, 3)
  assert.deepEqual([...FIRST_WAVE_TRACK_IDS], ['frontend', 'backend', 'python'])
})

test('every selected track exists with the documented id, slug and title', () => {
  for (const entry of PREMIUM_WAVE_1) {
    const byId = getTrackById(entry.trackId)
    const bySlug = getTrackBySlug(entry.slug)
    assert.ok(byId, `unknown track id ${entry.trackId}`)
    assert.ok(bySlug, `unknown slug ${entry.slug}`)
    assert.equal(byId.slug, entry.slug, `slug mismatch for ${entry.trackId}`)
    assert.equal(byId.name, entry.title, `title mismatch for ${entry.trackId}`)
    assert.equal(bySlug.id, entry.trackId)
  }
})

test('every selected track has real learning content', () => {
  for (const entry of PREMIUM_WAVE_1) {
    const track = getTrackById(entry.trackId)
    assert.ok(track.roadmap.length >= 4, `${entry.trackId} needs at least 4 stages`)
    assert.ok(track.projects.length >= 4, `${entry.trackId} needs real projects`)
    assert.ok(track.resources.length >= 8, `${entry.trackId} needs learning resources`)
    const steps = buildGuidedPath(entry.trackId)
    assert.ok(steps.length >= 20, `${entry.trackId} needs a full guided path`)
    assert.equal(steps.filter((s) => !s.title || !s.description).length, 0, `${entry.trackId} has an empty step`)
    const projects = steps.filter((s) => s.type === 'project')
    assert.ok(projects.length >= 3, `${entry.trackId} must embed project work in the guided path`)
    const coverage = trackAssessmentCoverage(entry.trackId, track.roadmap.map((s) => s.id))
    assert.equal(coverage.authored, coverage.total, `${entry.trackId} must have authored knowledge checks for every stage`)
  }
})

test('the allowlist is catalogued-validated and fail-safe', () => {
  // Unknown ids are dropped.
  assert.deepEqual(parsePremiumAllowlist('frontend,bogus', ALL_TRACK_IDS), ['frontend'])
  assert.deepEqual(premiumAllowlistUnknown('frontend,bogus', ALL_TRACK_IDS), ['bogus'])
  // Never "all tracks".
  const allCatalogue = ALL_TRACK_IDS.join(',')
  const resolved = resolvePremiumConfig({ COMMERCE_PREMIUM_TRACK_IDS: allCatalogue })
  assert.equal(resolved.trackIds.length, ALL_TRACK_IDS.length) // an explicit, validated full list is allowed
  // A malformed value can never make every track premium.
  const malformed = resolvePremiumConfig({ COMMERCE_PREMIUM_TRACK_IDS: '* , ' })
  assert.deepEqual(malformed.trackIds, [])
  assert.deepEqual(malformed.source, 'none')
})

test('an unset allowlist uses the manifest; an empty one disables premium', () => {
  const manifest = resolvePremiumConfig({})
  assert.deepEqual(manifest.trackIds, ['frontend', 'backend', 'python'])
  assert.equal(manifest.source, 'manifest')
  assert.deepEqual(manifest.issues, [])

  const empty = resolvePremiumConfig({ COMMERCE_PREMIUM_TRACK_IDS: '' })
  assert.deepEqual(empty.trackIds, [])
  assert.equal(empty.source, 'none')

  const withUnknown = resolvePremiumConfig({ COMMERCE_PREMIUM_TRACK_IDS: 'frontend,ghost' })
  assert.deepEqual(withUnknown.trackIds, ['frontend'])
  assert.ok(withUnknown.issues.some((issue) => issue.includes('ghost')))
})

test('the manifest never includes every catalogue track', () => {
  assert.ok(ALL_TRACK_IDS.length > 3)
  assert.ok(FIRST_WAVE_TRACK_IDS.length < ALL_TRACK_IDS.length)
  for (const id of FIRST_WAVE_TRACK_IDS) {
    assert.ok(ALL_TRACK_IDS.includes(id))
  }
})

test('manifest ids are still real catalogue ids', () => {
  // Guards the config against a catalogue rename silently breaking premium.
  for (const id of FIRST_WAVE_TRACK_IDS) {
    assert.equal(TRACKS.some((t) => t.id === id), true, `${id} is not a catalogue track`)
  }
})
