'use strict'
/**
 * Section-level AI-verified mastery.
 *
 * Every progression-bearing AI section embeds a "Build" step. Most have no
 * mapped portfolio project, so previously they were unassessable and the learner
 * was permanently blocked (HTTP 400 at the guided-path route). These tests prove
 * the section is now assessable through a mastery contract, that its rubric is
 * versioned to the section's own outcomes, and that it stays fail-closed.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  stageMasteryProjectId,
  isStageMasteryProjectId,
  deriveStageMasteryContract,
  computeRubricVersion,
} = require('../.test-dist/project-verification/contract.js')
const { resolveSectionMastery, resolveStepAssessment } = require('../.test-dist/section-mastery.js')
const { TRACKS } = require('../.test-dist/tracks.js')

test('the synthetic stage id is stable and recognisable', () => {
  assert.equal(stageMasteryProjectId('ai-foundations', 3), 'stage:ai-foundations:3')
  assert.equal(isStageMasteryProjectId('stage:ai-foundations:3'), true)
  assert.equal(isStageMasteryProjectId('fe-p1'), false)
})

test('a mastery contract is mandatory-criteria based and needs no public artifact', () => {
  const contract = deriveStageMasteryContract({
    trackId: 'ai-foundations',
    stageId: 2,
    stageTitle: 'Prompting',
    objective: 'Write prompts that produce a verifiable result.',
    successCriteria: ['States the expected output', 'Checks the result'],
  })
  assert.equal(contract.projectId, 'stage:ai-foundations:2')
  assert.equal(contract.requiredArtifacts.length, 0, 'no mandatory public artifact')
  const mandatory = contract.rubric.filter((c) => c.mandatory)
  assert.ok(mandatory.length >= 1)
  assert.ok(mandatory.some((c) => c.id === 'objective-demonstrated'))
  assert.ok(contract.passThreshold >= 0.8)
  // The section's success criteria become assessable rubric criteria.
  assert.equal(contract.rubric.filter((c) => c.id.startsWith('sc-')).length, 2)
})

test('the rubric version changes when the section objective changes', () => {
  const base = { trackId: 'ai-foundations', stageId: 1, stageTitle: 'S', successCriteria: ['a'] }
  const a = deriveStageMasteryContract({ ...base, objective: 'Learn X' })
  const b = deriveStageMasteryContract({ ...base, objective: 'Learn Y' })
  assert.notEqual(a.rubricVersion, b.rubricVersion, 'editing the outcome must re-version the rubric')
  // Stable for identical input.
  assert.equal(a.rubricVersion, deriveStageMasteryContract({ ...base, objective: 'Learn X' }).rubricVersion)
})

test('the mastery rubric version is distinct from the project rubric namespace', () => {
  // A stage contract and a project contract must never collide on version.
  const stage = deriveStageMasteryContract({ trackId: 'frontend', stageId: 1, stageTitle: 'S', objective: 'Do X', successCriteria: [] })
  assert.match(stage.rubricVersion, /^sm-/)
  const project = computeRubricVersion([{ id: 'x', label: 'X', weight: 1, mandatory: true }])
  assert.match(project, /^r/)
})

test('resolveSectionMastery returns a contract for an authored AI stage', () => {
  const mastery = resolveSectionMastery('ai-foundations', 1)
  assert.ok(mastery, 'ai-foundations stage 1 has an authored objective')
  assert.equal(mastery.projectId, 'stage:ai-foundations:1')
  assert.ok(mastery.contract.rubric.length > 0)
})

test('resolveSectionMastery never fabricates a rubric for an unauthored stage', () => {
  assert.equal(resolveSectionMastery('frontend', 999), null)
  assert.equal(resolveSectionMastery('not-a-track', 1), null)
})

test('resolveStepAssessment: every AI build step is now assessable (no dead ends)', () => {
  const aiTracks = TRACKS.filter((t) => t.id.startsWith('ai-'))
  let checked = 0
  for (const track of aiTracks) {
    for (const stage of track.roadmap) {
      const assessment = resolveStepAssessment(track.id, { type: 'project', projectId: null, stageId: stage.id })
      assert.ok(assessment, `${track.id} stage ${stage.id} must be assessable`)
      assert.ok(isStageMasteryProjectId(assessment.projectId))
      assert.ok(assessment.contract.rubric.some((c) => c.mandatory))
      checked += 1
    }
  }
  assert.ok(checked > 50, `checked ${checked} AI build steps`)
})

test('resolveStepAssessment: a mapped project step resolves to the project contract', () => {
  const track = TRACKS.find((t) => t.id === 'frontend')
  const project = track.projects[0]
  const assessment = resolveStepAssessment('frontend', { type: 'project', projectId: project.id, stageId: 1 })
  assert.ok(assessment)
  assert.equal(assessment.projectId, project.id)
  assert.equal(isStageMasteryProjectId(assessment.projectId), false)
})

test('resolveStepAssessment: an unknown project id is not assessable', () => {
  assert.equal(resolveStepAssessment('frontend', { type: 'project', projectId: 'does-not-exist', stageId: 1 }), null)
})

test('resolveStepAssessment: non-project steps are never assessable', () => {
  for (const type of ['concept', 'quiz', 'resource', 'practice']) {
    assert.equal(resolveStepAssessment('frontend', { type, projectId: 'fe-p1', stageId: 1 }), null)
  }
})

test('a mastery contract with no artifacts still requires a written demonstration', () => {
  const contract = deriveStageMasteryContract({ trackId: 'ai-work', stageId: 1, stageTitle: 'S', objective: 'Do X', successCriteria: [] })
  assert.ok(contract.writtenExplanation.minWords >= 60, 'a written explanation is required')
  assert.ok(contract.writtenExplanation.prompts.length >= 3)
})
