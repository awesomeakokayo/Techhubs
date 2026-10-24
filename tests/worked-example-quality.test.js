'use strict'
/**
 * Worked-example and AI-lesson quality.
 *
 * A worked example is only useful if it actually demonstrates the stage's skill.
 * These checks reject examples that are missing, too thin, not step-by-step,
 * duplicated across stages, leak a graded answer, or share no vocabulary with
 * the stage they are attached to. They are mechanical guards, not a substitute
 * for human pedagogical review — that remains an outstanding review item.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { STAGE_WORKED_EXAMPLES, getStageWorkedExample } = require('../.test-dist/stage-worked-examples.js')
const { getAIStageLesson } = require('../.test-dist/ai-stage-lessons.js')
const { getAIStageObjective } = require('../.test-dist/ai-stage-objectives.js')
const { getStageLearningPlan } = require('../.test-dist/curriculum.js')
const { TRACKS } = require('../.test-dist/tracks.js')

const MIN_EXAMPLE_CHARS = 120
const MIN_STEPS = 3

const STOP = new Set(
  ('the a an and or but if then than that this these those of to in on at for with from by as is are was were be it its into over under about after before while you your we our they their not no do does did done can could should would may might must will shall have has had how what when where which who why all any each few more most other some such only own same so too very just step steps example use used using make makes made get gets got one two new like via etc stage').split(' '),
)
const terms = (text) => new Set((String(text).toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g) || []).filter((w) => !STOP.has(w)))
/** Crude stem so "testing"/"test" and "distributions"/"distribution" compare equal. */
const stems = (set) => new Set([...set].map((w) => w.slice(0, 4)))

test('every non-AI stage has a substantial, step-by-step, unique worked example', () => {
  const problems = []
  const seen = new Map()
  for (const track of TRACKS) {
    if (track.id.startsWith('ai-')) continue
    for (const stage of track.roadmap) {
      const example = getStageWorkedExample(track.id, stage.id)
      if (!example) {
        problems.push(`${track.id}:${stage.id} missing`)
        continue
      }
      if (example.length < MIN_EXAMPLE_CHARS) problems.push(`${track.id}:${stage.id} too short (${example.length})`)
      const steps = (example.match(/Step \d/g) || []).length
      if (steps < MIN_STEPS) problems.push(`${track.id}:${stage.id} not step-by-step (${steps} steps)`)
      if (/the (?:correct )?answer is|choose option/i.test(example)) problems.push(`${track.id}:${stage.id} leaks a graded answer`)
      const fingerprint = example.slice(0, 90).toLowerCase()
      if (seen.has(fingerprint)) problems.push(`${track.id}:${stage.id} duplicates ${seen.get(fingerprint)}`)
      seen.set(fingerprint, `${track.id}:${stage.id}`)
    }
  }
  assert.deepEqual(problems, [], `worked-example problems: ${problems.join('; ')}`)
})

test('each worked example shares vocabulary with its stage (it is not generic filler)', () => {
  const problems = []
  for (const track of TRACKS) {
    if (track.id.startsWith('ai-')) continue
    for (const stage of track.roadmap) {
      const example = getStageWorkedExample(track.id, stage.id)
      if (!example) continue
      const plan = getStageLearningPlan(track.id, stage.id)
      const haystack = [
        stage.title,
        ...(stage.topics || []),
        plan?.objective || '',
        plan?.exercise || '',
      ].join(' ')
      const stageTerms = stems(terms(haystack))
      const exampleTerms = stems(terms(example))
      let overlap = 0
      for (const t of exampleTerms) if (stageTerms.has(t)) overlap += 1
      if (overlap === 0) problems.push(`${track.id}:${stage.id}`)
    }
  }
  assert.deepEqual(problems, [], `worked examples with no stage vocabulary: ${problems.join(', ')}`)
})

test('every AI stage has a substantial authored lesson', () => {
  const problems = []
  for (const track of TRACKS) {
    if (!track.id.startsWith('ai-')) continue
    for (const stage of track.roadmap) {
      const objective = getAIStageObjective(track.id, stage.id)
      const lesson = getAIStageLesson(track.id, stage.id, stage.title, objective?.objective ?? '', objective?.successCriteria ?? [])
      if (!lesson) problems.push(`${track.id}:${stage.id} missing`)
      else if (JSON.stringify(lesson).length < 400) problems.push(`${track.id}:${stage.id} too thin`)
    }
  }
  assert.deepEqual(problems, [], `AI lessons missing/thin: ${problems.join(', ')}`)
})
