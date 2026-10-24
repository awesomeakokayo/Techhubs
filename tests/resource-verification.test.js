'use strict'
/**
 * External resource verification and stage-resource resolution.
 *
 * These tests prove the CORRECTED evidence model:
 *  - HTTP status, a page title and metadata are level-2 evidence only; they are
 *    never sufficient for content verification (level 3);
 *  - level 3 requires actual extracted content evidence (`contentEvidence`);
 *  - a video/interactive resource cannot be claimed as playback-verified (level
 *    4) without real playback evidence;
 *  - a paywalled or unavailable primary resource cannot satisfy the free-access
 *    requirement;
 *  - content whose vocabulary has no overlap with the mapped objective is
 *    flagged rather than quietly accepted;
 *  - the served path and the audit resolve resources through one function, so
 *    they cannot drift;
 *  - removing a resource mapping or a probe changes the verification result.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  MIN_RESOURCE_VERIFICATION_LEVEL,
  getAuthoredVerification,
  classifyResource,
  isResourceVerified,
  textOverlapScore,
} = require('../.test-dist/resource-verification.js')
const { resolveStageResources, resolveStageResourceVerification, normalizeUrl } = require('../.test-dist/stage-resources.js')
const { getStageWorkedExample } = require('../.test-dist/stage-worked-examples.js')
const { TRACKS } = require('../.test-dist/tracks.js')

const TODAY = '2026-10-17'
/** A reachable page with a title but NO extracted content — metadata only. */
const metadataOnly = (title) => ({ status: 200, title: title ?? 'Page title', description: 'desc', checkedAt: TODAY })
/** A reachable page with real extracted content (level-3 evidence). */
const withContent = (chars = 2000) => ({
  status: 200,
  title: 'A real article',
  checkedAt: TODAY,
  contentChars: chars,
  excerpt: 'This is the extracted main content that was actually inspected.',
  contentHash: 'abc123',
  terms: ['components', 'layout', 'constraints'],
})

// ── classifyResource: metadata is NOT content verification ──────────────────

test('a 2xx probe with only a page title is destination-verified (level 2), never level 3', () => {
  const v = classifyResource('fe-1', 'https://example.com/a', metadataOnly())
  assert.equal(v.level, 2)
  assert.equal(v.method, 'http-probe')
  assert.equal(isResourceVerified(v), false, 'metadata alone must not satisfy content verification')
})

test('level 3 requires actual extracted content evidence', () => {
  const v = classifyResource('fe-1', 'https://example.com/a', withContent())
  assert.equal(v.level, 3)
  assert.equal(v.method, 'content-inspection')
  assert.ok(v.contentEvidence, 'a level-3 record must carry contentEvidence')
  assert.ok(v.contentEvidence.contentChars >= 600)
  assert.equal(isResourceVerified(v), true)
})

test('a level-3 claim without contentEvidence is rejected by isResourceVerified', () => {
  assert.equal(isResourceVerified({ level: 3 }), false)
  assert.equal(isResourceVerified({ level: 3, contentEvidence: { contentChars: 0, excerpt: '', contentHash: '' } }), false)
  assert.equal(isResourceVerified({ level: 3, contentEvidence: { contentChars: 900, excerpt: 'text', contentHash: 'h' } }), true)
  assert.equal(isResourceVerified({ level: 4, contentEvidence: { contentChars: 900, excerpt: 'text', contentHash: 'h' } }), true)
})

test('a video page (no extractable text) can never be content- or playback-verified here', () => {
  const v = classifyResource('fe-1', 'https://www.youtube.com/watch?v=abcdefghijk', {
    status: 200,
    title: 'Some tutorial',
    kind: 'video',
    contentChars: 0,
    checkedAt: TODAY,
  })
  assert.equal(v.level, 2)
  assert.notEqual(v.level, 4)
  assert.equal(isResourceVerified(v), false)
})

test('a paywalled page cannot satisfy the free-access requirement', () => {
  const v = classifyResource('fe-1', 'https://example.com/paid', {
    status: 200,
    title: 'Subscriber article',
    checkedAt: TODAY,
    contentChars: 5000,
    excerpt: 'gated',
    paywalled: true,
  })
  assert.equal(v.level, 2)
  assert.equal(v.paymentRequired, true)
  assert.equal(v.access, 'paid')
  assert.equal(isResourceVerified(v), false)
})

test('a blocked (403/429) destination is level 2, not level 3', () => {
  assert.equal(classifyResource('fe-1', 'https://example.com/a', { status: 403, checkedAt: TODAY }).level, 2)
  assert.equal(classifyResource('fe-1', 'https://example.com/a', { status: 429, checkedAt: TODAY }).level, 2)
})

test('a 404 is URL-discovered only (level 1)', () => {
  assert.equal(classifyResource('fe-1', 'https://example.com/gone', { status: 404, checkedAt: TODAY }).level, 1)
})

test('no probe means no evidence (null) — a recorded objective is not a level', () => {
  assert.equal(classifyResource('fe-1', 'https://example.com/a', null), null)
  assert.equal(MIN_RESOURCE_VERIFICATION_LEVEL, 3)
})

// ── Authored metadata never claims content verification ─────────────────────

test('a curated AI registry resource carries identity metadata at level 2, not level 3', () => {
  const v = getAuthoredVerification('ai-f1-ms-generative-ai')
  assert.ok(v)
  assert.equal(v.level, 2)
  assert.equal(v.method, 'publisher-documentation')
  assert.equal(isResourceVerified(v), false)
})

test('a researched AI stage resource is level 2 without a probe and level 3 with content evidence', () => {
  const meta = getAuthoredVerification('ai-x-agents-5')
  assert.ok(meta)
  assert.equal(meta.level, 2)
  const probed = classifyResource('ai-x-agents-5', 'https://docs.langchain.com/oss/python/langchain/retrieval', withContent(4000))
  assert.equal(probed.level, 3)
  assert.ok(probed.objectives && probed.objectives.length > 0, 'the authored objective is retained as metadata')
})

// ── Objective relevance ─────────────────────────────────────────────────────

test('objective relevance flags content that shares no vocabulary with the objective', () => {
  const matched = textOverlapScore('Use Figma components, variants and auto layout', ['components', 'layout', 'constraints'])
  assert.ok(matched >= 2)
  const mismatched = textOverlapScore('Bake a sourdough loaf', ['components', 'layout', 'constraints'])
  assert.equal(mismatched, 0)
})

// ── URL normalisation ───────────────────────────────────────────────────────

test('normaliseUrl ignores the fragment and a trailing slash', () => {
  assert.equal(normalizeUrl('https://a.example/x/#frag'), normalizeUrl('https://a.example/x'))
})

// ── Unified resolver (served path + audit agree) ────────────────────────────

test('every stage in the catalogue resolves at least one learning resource', () => {
  const missing = []
  for (const track of TRACKS) {
    for (const stage of track.roadmap) {
      if (resolveStageResources(track.id, stage.id).length === 0) missing.push(`${track.id}:${stage.id}`)
    }
  }
  assert.deepEqual(missing, [], `stages with no mapped resource: ${missing.join(', ')}`)
})

test('the previously reported resource gaps are closed with content-verified alternatives', () => {
  // crypto stage 6 (DeFi risks) and dart stage 2 (OOP) were the non-AI gaps.
  assert.ok(resolveStageResources('crypto', 6).some((r) => r.resource.id === 'cr-23'))
  assert.ok(resolveStageResources('dart', 2).some((r) => r.resource.id === 'dart-12'))
  // a researched AI stage resource is present.
  assert.ok(resolveStageResources('ai-automation', 1).some((r) => r.resource.id === 'ai-x-automation-1'))
})

test('stages that previously relied on videos/JS shells now map a content-inspectable text resource', () => {
  const expected = [
    ['python', 3, 'py-9'],
    ['uiux', 3, 'ux-13'],
    ['data', 1, 'da-11'],
    ['data', 3, 'da-12'],
    ['data', 4, 'da-13'],
    ['data', 5, 'da-14'],
    ['datascience', 3, 'ds-11'],
    ['devops', 3, 'dv-11'],
    ['cyber', 1, 'cy-11'],
    ['crypto', 7, 'cr-24'],
    ['productmgmt', 1, 'prd-14'],
    ['productmgmt', 2, 'prd-16'],
    ['productmgmt', 3, 'prd-17'],
    ['sonic', 1, 'son-14'],
    ['sonic', 4, 'son-12'],
    ['sonic', 5, 'son-13'],
    ['ai', 1, 'ai-7'],
  ]
  for (const [trackId, stageId, resourceId] of expected) {
    assert.ok(
      resolveStageResources(trackId, stageId).some((r) => r.resource.id === resourceId),
      `${trackId}:${stageId} should map ${resourceId}`,
    )
  }
})

test('resource ids are unique across every source on a track', () => {
  const duplicates = []
  for (const track of TRACKS) {
    const ids = []
    for (const stage of track.roadmap) {
      for (const entry of resolveStageResources(track.id, stage.id)) ids.push(entry.resource.id)
    }
    const seen = new Set()
    for (const id of ids) {
      if (seen.has(id)) duplicates.push(`${track.id}:${id}`)
      seen.add(id)
    }
  }
  assert.deepEqual(duplicates, [], `duplicate resource ids: ${duplicates.join(', ')}`)
})

test('resources are de-duplicated by URL across sources', () => {
  const resolved = resolveStageResources('ai-foundations', 1)
  const urls = resolved.map((r) => normalizeUrl(r.resource.url))
  assert.equal(new Set(urls).size, urls.length)
})

test('with no probe data, curated resources do NOT verify (evidence is required)', () => {
  const resolved = resolveStageResourceVerification('ai-agents', 5, {})
  const target = resolved.find((r) => r.resource.id === 'ai-x-agents-5')
  assert.ok(target)
  assert.equal(target.verification, null)
  assert.equal(isResourceVerified(target.verification), false)
})

test('a content probe promotes a curated resource to the gate', () => {
  const resolved = resolveStageResources('ai-agents', 5)
  const target = resolved.find((r) => r.resource.id === 'ai-x-agents-5')
  const probes = { [normalizeUrl(target.resource.url)]: withContent(3000) }
  const verified = resolveStageResourceVerification('ai-agents', 5, probes).find((r) => r.resource.id === 'ai-x-agents-5')
  assert.equal(verified.verification.level, 3)
  assert.equal(isResourceVerified(verified.verification), true)
})

test('a defective (404) probe downgrades an uncurated resource below the gate', () => {
  // fe-1 is a base catalogue resource with no authored verification.
  const url = resolveStageResources('frontend', 1).find((r) => r.source === 'base')
  assert.ok(url, 'expected at least one base resource')
  const probes = { [normalizeUrl(url.resource.url)]: { status: 404, checkedAt: TODAY } }
  const resolved = resolveStageResourceVerification('frontend', 1, probes)
  const entry = resolved.find((r) => r.resource.id === url.resource.id)
  assert.equal(entry.verification.level, 1)
  assert.equal(isResourceVerified(entry.verification), false)
})

// ── Worked examples ─────────────────────────────────────────────────────────

test('every non-AI stage has an authored worked example', () => {
  const missing = []
  for (const track of TRACKS) {
    if (track.id.startsWith('ai-')) continue
    for (const stage of track.roadmap) {
      if (!getStageWorkedExample(track.id, stage.id)) missing.push(`${track.id}:${stage.id}`)
    }
  }
  assert.deepEqual(missing, [], `stages without a worked example: ${missing.join(', ')}`)
})
