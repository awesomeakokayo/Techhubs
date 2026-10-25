'use strict'
/**
 * Catalogue integrity — canonical ids, slugs and cross-references.
 *
 * These checks protect learner records (keyed by track id) and routing (keyed by
 * slug). A duplicated slug makes one track unreachable; a broken project/resource
 * reference makes a stage unpassable or resource-less.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { TRACKS, getTrackById, getTrackBySlug } = require('../.test-dist/tracks.js')
const {
  STAGE_PROJECT_MAP,
  PORTFOLIO_PROJECT,
  STAGE_LEARNING_PLANS,
} = require('../.test-dist/curriculum.js')
const { RESOURCE_STAGE_MAP } = require('../.test-dist/guided-path.js')
const { getExtraProjects } = require('../.test-dist/curriculum-extended-projects.js')
const { ROADMAPS } = require('../.test-dist/roadmaps.js')
const { AI_RESOURCE_EXTENSIONS, AI_RESOURCE_STAGE_MAP, AI_STAGE_CHECKPOINTS } = require('../.test-dist/ai-curriculum.js')

test('track ids are unique', () => {
  const ids = TRACKS.map((t) => t.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('track slugs are unique', () => {
  const bySlug = new Map()
  for (const track of TRACKS) {
    if (bySlug.has(track.slug)) {
      assert.fail(`slug "${track.slug}" is shared by "${bySlug.get(track.slug)}" and "${track.id}"`)
    }
    bySlug.set(track.slug, track.id)
  }
})

test('every track slug resolves back to its own track', () => {
  for (const track of TRACKS) {
    assert.equal(getTrackBySlug(track.slug)?.id, track.id, `slug ${track.slug}`)
  }
})

test('every roadmap trackSlug and trackId resolves to a real track', () => {
  for (const roadmap of ROADMAPS) {
    if (roadmap.trackSlug) {
      const track = getTrackBySlug(roadmap.trackSlug)
      assert.ok(track, `roadmap ${roadmap.id} trackSlug "${roadmap.trackSlug}" does not resolve`)
      if (roadmap.trackId) {
        assert.equal(track.id, roadmap.trackId, `roadmap ${roadmap.id} trackSlug/trackId disagree`)
      }
    }
    if (roadmap.trackId) {
      assert.ok(getTrackById(roadmap.trackId), `roadmap ${roadmap.id} trackId "${roadmap.trackId}" does not resolve`)
    }
  }
})

test('every stage project reference points at a real project on that track', () => {
  for (const [trackId, stages] of Object.entries(STAGE_PROJECT_MAP)) {
    const track = getTrackById(trackId)
    assert.ok(track, `STAGE_PROJECT_MAP key "${trackId}" is not a track`)
    for (const [stageId, projectId] of Object.entries(stages)) {
      const numericStage = Number(stageId)
      assert.ok(
        track.roadmap.some((s) => s.id === numericStage),
        `${trackId} stage ${stageId} is not in the roadmap`,
      )
      assert.ok(
        [...(track.projects ?? []), ...getExtraProjects(trackId)].some((p) => p.id === projectId),
        `${trackId} stage ${stageId} references missing project "${projectId}"`,
      )
    }
  }
})

test('every portfolio project reference points at a real project on that track', () => {
  for (const [trackId, projectId] of Object.entries(PORTFOLIO_PROJECT)) {
    const track = getTrackById(trackId)
    assert.ok(track, `PORTFOLIO_PROJECT key "${trackId}" is not a track`)
    assert.ok(
      [...(track.projects ?? []), ...getExtraProjects(trackId)].some((p) => p.id === projectId),
      `${trackId} portfolio references missing project "${projectId}"`,
    )
  }
})

test('every resource stage mapping points at a real resource on that track', () => {
  for (const [trackId, map] of Object.entries(RESOURCE_STAGE_MAP)) {
    const track = getTrackById(trackId)
    assert.ok(track, `RESOURCE_STAGE_MAP key "${trackId}" is not a track`)
    for (const [resourceId, stageId] of Object.entries(map)) {
      assert.ok(
        (track.resources ?? []).some((r) => r.id === resourceId),
        `${trackId} maps missing resource "${resourceId}"`,
      )
      assert.ok(
        track.roadmap.some((s) => s.id === stageId),
        `${trackId} resource "${resourceId}" maps to missing stage ${stageId}`,
      )
    }
  }
})

test('authored learning-plan keys are real tracks', () => {
  for (const trackId of Object.keys(STAGE_LEARNING_PLANS)) {
    assert.ok(getTrackById(trackId), `STAGE_LEARNING_PLANS key "${trackId}" is not a track`)
  }
})

test('AI resource extensions and stage maps reference real tracks and stages', () => {
  for (const [trackId, resources] of Object.entries(AI_RESOURCE_EXTENSIONS)) {
    const track = getTrackById(trackId)
    assert.ok(track, `AI_RESOURCE_EXTENSIONS key "${trackId}" is not a track`)
    const map = AI_RESOURCE_STAGE_MAP[trackId] ?? {}
    for (const resource of resources) {
      assert.ok(map[resource.id], `AI resource "${resource.id}" on ${trackId} has no stage mapping`)
      assert.ok(
        track.roadmap.some((s) => s.id === map[resource.id]),
        `AI resource "${resource.id}" on ${trackId} maps to missing stage ${map[resource.id]}`,
      )
    }
  }
})

test('AI stage checkpoints belong to real stages', () => {
  for (const [trackId, stages] of Object.entries(AI_STAGE_CHECKPOINTS)) {
    const track = getTrackById(trackId)
    assert.ok(track, `AI_STAGE_CHECKPOINTS key "${trackId}" is not a track`)
    for (const stageId of Object.keys(stages)) {
      assert.ok(
        track.roadmap.some((s) => s.id === Number(stageId)),
        `${trackId} checkpoint stage ${stageId} is not in the roadmap`,
      )
    }
  }
})
