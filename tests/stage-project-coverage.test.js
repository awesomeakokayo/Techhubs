'use strict'
/**
 * Stage-project coverage and path-version safety.
 *
 * Proves the 41 reported project gaps are closed (every non-AI stage embeds a
 * project whose mastery contract carries at least one mandatory rubric
 * criterion) and that every track whose path changed carries a bumped version,
 * so existing learners are migrated by the established policy rather than
 * silently mis-mapped.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  buildGuidedPath,
  expectedPathVersion,
  GUIDED_PATH_VERSION,
  AI_GUIDED_PATH_VERSION,
  CONTENT_STEP_PATH_VERSION,
  CONTENT_STEP_TRACK_IDS,
} = require('../.test-dist/guided-path.js')
const { resolveStepAssessment } = require('../.test-dist/section-mastery.js')
const { TRACKS } = require('../.test-dist/tracks.js')

test('every non-AI stage embeds an AI-assessable project with mandatory criteria', () => {
  const missing = []
  for (const track of TRACKS) {
    if (track.id.startsWith('ai-')) continue
    const steps = buildGuidedPath(track.id)
    for (const stage of track.roadmap) {
      const projectStep = steps.find((step) => step.stageId === stage.id && step.type === 'project')
      const assessment = projectStep ? resolveStepAssessment(track.id, projectStep) : null
      const mandatory = assessment ? assessment.contract.rubric.filter((c) => c.mandatory).length : 0
      if (!assessment || mandatory === 0) missing.push(`${track.id}:${stage.id}`)
    }
  }
  assert.deepEqual(missing, [], `stages without an assessable stage project: ${missing.join(', ')}`)
})

test('the previously reported project-gap tracks all gained projects', () => {
  for (const trackId of ['crypto', 'productmgmt', 'projectmgmt', 'sonic', 'youtube', 'writing', 'dart', 'fullstack', 'datascience', 'devops', 'ai']) {
    assert.ok(CONTENT_STEP_TRACK_IDS.has(trackId), `${trackId} should carry the content-step path version`)
    assert.equal(expectedPathVersion(trackId, false), CONTENT_STEP_PATH_VERSION)
  }
})

test('tracks that gained content-verified resources carry the content-step path version', () => {
  for (const trackId of ['python', 'uiux', 'data', 'cyber']) {
    assert.ok(CONTENT_STEP_TRACK_IDS.has(trackId), `${trackId} should carry the content-step path version`)
    assert.equal(expectedPathVersion(trackId, false), CONTENT_STEP_PATH_VERSION)
  }
})

test('tracks that did not change their path shape keep their version', () => {
  assert.equal(expectedPathVersion('frontend', false), GUIDED_PATH_VERSION)
  assert.equal(expectedPathVersion('ai-foundations', false), AI_GUIDED_PATH_VERSION)
})

test('crypto portfolio project resolves through the extra-project catalogue', () => {
  const steps = buildGuidedPath('crypto')
  const portfolio = steps.find((step) => step.isPortfolio)
  assert.ok(portfolio, 'crypto should have a portfolio step')
  assert.equal(portfolio.projectId, 'cr-pf')
  const assessment = resolveStepAssessment('crypto', portfolio)
  assert.ok(assessment)
  assert.ok(assessment.contract.rubric.some((c) => c.mandatory))
})
