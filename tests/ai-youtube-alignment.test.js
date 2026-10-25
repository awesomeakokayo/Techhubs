'use strict'
/**
 * Regression contract for the ai-youtube 4-9 alignment repair.
 *
 * The package shipped objectives, practice prompts, mastery criteria and some
 * questions for a displaced sequence. The canonical stage titles and topics are
 * stable, so the repair restores the objective that belongs to each title. This
 * test fails if the old displacement returns, if question IDs are replaced, or
 * if a mismatched resource is selected again.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { TRACKS } = require('../.test-dist/tracks.js')
const {
  PACKAGE_STAGE_CONTENT,
} = require('../.test-dist/curriculum-package/stage-content.generated.js')
const {
  PACKAGE_SELECTED_RESOURCES,
} = require('../.test-dist/curriculum-package/resources.generated.js')

const track = TRACKS.find((entry) => entry.id === 'ai-youtube')
const stage = (id) => PACKAGE_STAGE_CONTENT[`ai-youtube:${id}`]

const expected = {
  4: { title: 'AI Voice & Audio', terms: /audio|narration|voice/i, artifact: /audio|voice|narration/i },
  5: { title: 'AI Visual Production', terms: /visual|b-roll|image|screen recording/i, artifact: /visual|asset|storyboard/i },
  6: { title: 'Editing', terms: /edit|caption|continuity/i, artifact: /edit|export|caption/i },
  7: { title: 'Thumbnails & Packaging', terms: /thumbnail|title|packaging|promise/i, artifact: /thumbnail|title|packaging/i },
  8: { title: 'Publishing', terms: /publish|metadata|schedul|promotion/i, artifact: /publish|upload|checklist/i },
  9: { title: 'Analytics', terms: /analytics|retention|impression|ctr/i, artifact: /analytics|experiment|diagnos/i },
}

const displacedObjectives = {
  4: /Align thumbnails, titles, openings/i,
  5: /Understand originality and platform-quality/i,
  6: /Apply current disclosure expectations/i,
  7: /Use analytics to diagnose/i,
  8: /Edit for retention without sacrificing clarity/i,
  9: /Keep audience understanding, originality, fact-checking/i,
}

for (const [rawId, expect] of Object.entries(expected)) {
  const id = Number(rawId)

  test(`ai-youtube:${id} title, objective, practice and mastery describe ${expect.title}`, () => {
    const canonical = track.roadmap.find((entry) => entry.id === id)
    const content = stage(id)
    assert.ok(canonical, 'canonical stage exists')
    assert.ok(content, 'generated stage content exists')
    assert.equal(canonical.title, expect.title)
    assert.equal(content.stageTitle, canonical.title)

    assert.match(content.objective, expect.terms)
    assert.doesNotMatch(content.objective, displacedObjectives[id], 'old displaced objective must not return')
    assert.ok(content.targetOutcomes.length >= 3)
    assert.ok(content.workedExample.length > 40)
    assert.ok(content.practice, 'practice exists')
    assert.match(content.practice.instructions, expect.terms)
    assert.match(content.practice.expectedOutput, expect.artifact)

    assert.ok(content.mastery, 'mastery contract exists')
    assert.match(content.mastery.prompt, new RegExp(canonical.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))
    assert.equal(content.mastery.criteria.length, 5)
    assert.equal(content.mastery.criteria.reduce((sum, criterion) => sum + criterion.weight, 0), 100)
    assert.ok(content.mastery.criteria.some((criterion) => criterion.mandatory), 'policy criterion is mandatory')
    assert.equal(content.mastery.passThreshold, 80)
  })

  test(`ai-youtube:${id} keeps five answerable 20-point questions in the corrected topic`, () => {
    const content = stage(id)
    assert.equal(content.quiz.length, 5)
    assert.equal(content.quiz.reduce((sum, question) => sum + question.points, 0), 100)
    assert.equal(new Set(content.quiz.map((question) => question.id)).size, 5)
    for (const [index, question] of content.quiz.entries()) {
      assert.equal(question.id, `ai-youtube-${id}-q${index + 1}`)
      assert.equal(question.points, 20)
      assert.equal(question.options.length, 4)
      assert.ok(question.correctIndex >= 0 && question.correctIndex < question.options.length)
      assert.ok(question.explanation.length > 20, `${question.id} has a rationale`)
      assert.ok(question.feedbackOnIncorrect.length > 20, `${question.id} has remediation feedback`)
      assert.doesNotMatch(question.question, displacedObjectives[id], `${question.id} stem is not displaced`)
      assert.doesNotMatch(question.objective ?? '', displacedObjectives[id], `${question.id} objective is not displaced`)
    }
    assert.match(content.quiz.map((question) => question.question).join(' '), expect.terms)
  })
}

test('ai-youtube:5 does not fall back to the displaced originality resource', () => {
  const selected = PACKAGE_SELECTED_RESOURCES['ai-youtube:5']
  if (selected) {
    assert.notEqual(selected.url, 'https://support.google.com/youtube/answer/1311392')
    assert.match(`${selected.title} ${selected.description}`, /visual|b-roll|image|screen recording/i)
  }
})

test('ai-youtube:8 selects the publishing workflow, not a retention-edit page', () => {
  const selected = PACKAGE_SELECTED_RESOURCES['ai-youtube:8']
  assert.ok(selected, 'publishing stage has a selected resource')
  assert.match(`${selected.title} ${selected.description}`, /upload|publish|metadata|schedul/i)
  assert.doesNotMatch(`${selected.title} ${selected.description}`, /retention edit|edit for retention/i)
})
