'use strict'
/**
 * Structural guarantees for the guided-path curriculum.
 *
 * These tests run against the compiled catalogue (`lib/tracks.ts`) and the
 * guided-path builder (`lib/guided-path.ts`) so they fail if a future change
 * removes assessments, disconnects projects, renumbers stages incorrectly, or
 * introduces invalid resources.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const { TRACKS } = require('../.test-dist/tracks.js')
const { buildGuidedPath, requiredCorrectFor, RESOURCE_STAGE_MAP } = require('../.test-dist/guided-path.js')
const { STAGE_LEARNING_PLANS, STAGE_PROJECT_MAP, PORTFOLIO_PROJECT } = require('../.test-dist/curriculum.js')
const { getExtraProjects } = require('../.test-dist/curriculum-extended-projects.js')

const root = path.resolve(__dirname, '..')

function isHttpUrl(value) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function nonAITracks() {
  return TRACKS.filter((track) => !track.id.startsWith('ai-'))
}

test('every catalogue track produces a non-empty guided path', () => {
  for (const track of TRACKS) {
    assert.ok(buildGuidedPath(track.id).length > 0, `${track.id} has no guided steps`)
  }
})

test('every resource URL in the catalogue is a valid http(s) URL', () => {
  for (const track of TRACKS) {
    for (const resource of track.resources) {
      assert.ok(isHttpUrl(resource.url), `${track.id}/${resource.id} has an invalid URL: ${resource.url}`)
    }
  }
})

test('no track links the same resource URL twice', () => {
  for (const track of TRACKS) {
    const seen = new Set()
    for (const resource of track.resources) {
      assert.equal(seen.has(resource.url), false, `${track.id} duplicates resource URL ${resource.url}`)
      seen.add(resource.url)
    }
  }
})

test('every knowledge check is well formed', () => {
  for (const track of TRACKS) {
    const steps = buildGuidedPath(track.id)
    for (const step of steps.filter((s) => s.type === 'quiz')) {
      assert.ok(step.quizQuestions && step.quizQuestions.length >= 2, `${track.id} quiz has too few questions`)
      const seen = new Set()
      for (const question of step.quizQuestions) {
        assert.ok(question.options.length >= 2, `${track.id} question has too few options`)
        assert.ok(question.correctIndex >= 0 && question.correctIndex < question.options.length, `${track.id} has an out-of-range correctIndex`)
        assert.ok(question.explanation && question.explanation.trim().length > 10, `${track.id} question is missing an explanation`)
        assert.equal(new Set(question.options).size, question.options.length, `${track.id} has duplicate options in a question`)
        assert.equal(seen.has(question.question), false, `${track.id} repeats a question within a check`)
        seen.add(question.question)
      }
    }
  }
})

test('EVERY non-AI track embeds a knowledge check and a practice step for every stage', () => {
  for (const track of nonAITracks()) {
    const steps = buildGuidedPath(track.id)
    const stageIds = track.roadmap.map((s) => s.id)
    const quizStages = new Set(steps.filter((s) => s.type === 'quiz').map((s) => s.stageId))
    const practiceStages = new Set(steps.filter((s) => s.type === 'practice').map((s) => s.stageId))
    for (const stageId of stageIds) {
      assert.ok(quizStages.has(stageId), `${track.id} stage ${stageId} has no authored knowledge check`)
      assert.ok(practiceStages.has(stageId), `${track.id} stage ${stageId} has no practice step`)
    }
    assert.equal(steps.filter((s) => s.type === 'quiz').length, stageIds.length, `${track.id} knowledge-check count does not match stage count`)
  }
})

test('every stage has an authored learning plan with all required parts', () => {
  for (const track of nonAITracks()) {
    const plans = STAGE_LEARNING_PLANS[track.id]
    assert.ok(plans, `${track.id} has no authored plans`)
    for (const stage of track.roadmap) {
      const plan = plans[stage.id]
      assert.ok(plan, `${track.id} stage ${stage.id} has no plan`)
      assert.ok(plan.objective && plan.objective.trim().length > 10, `${track.id} stage ${stage.id} objective is thin`)
      assert.ok(plan.successCriteria.length >= 2, `${track.id} stage ${stage.id} needs success criteria`)
      assert.ok(plan.exercise && plan.exercise.trim().length > 20, `${track.id} stage ${stage.id} needs an exercise`)
      assert.ok(plan.commonMistakes.length >= 1, `${track.id} stage ${stage.id} needs common mistakes`)
      assert.ok(plan.knowledgeCheck.length >= 2, `${track.id} stage ${stage.id} needs a knowledge check`)
    }
  }
})

test('every non-AI track embeds at least one project and ends with the portfolio project', () => {
  for (const track of nonAITracks()) {
    const steps = buildGuidedPath(track.id)
    const projects = steps.filter((s) => s.type === 'project')
    assert.ok(projects.length >= 1, `${track.id} has no project step in its path`)
    const last = steps[steps.length - 1]
    assert.equal(last.type, 'project', `${track.id} does not end with a project`)
    assert.equal(last.isPortfolio, true, `${track.id} final project is not the portfolio project`)
    assert.equal(last.projectId, PORTFOLIO_PROJECT[track.id], `${track.id} portfolio project mismatch`)
  }
})

test('stage ids are unique, contiguous and ordered 1..N (validates stage splits)', () => {
  for (const track of TRACKS) {
    const ids = track.roadmap.map((s) => s.id)
    assert.equal(new Set(ids).size, ids.length, `${track.id} has duplicate stage ids`)
    for (let i = 0; i < ids.length; i += 1) {
      assert.equal(ids[i], i + 1, `${track.id} stage ids are not contiguous/ordered at position ${i}: ${ids.join(',')}`)
    }
  }
})

test('every stage project embedding references a real stage and project', () => {
  for (const [trackId, map] of Object.entries(STAGE_PROJECT_MAP)) {
    const track = TRACKS.find((t) => t.id === trackId)
    assert.ok(track, `STAGE_PROJECT_MAP references unknown track ${trackId}`)
    const stageIds = new Set(track.roadmap.map((s) => s.id))
    const projectIds = new Set([...track.projects.map((p) => p.id), ...getExtraProjects(trackId).map((p) => p.id)])
    for (const [stageId, projectId] of Object.entries(map)) {
      assert.ok(stageIds.has(Number(stageId)), `${trackId} stage project map references unknown stage ${stageId}`)
      assert.ok(projectIds.has(projectId), `${trackId} stage project map references unknown project ${projectId}`)
    }
  }
})

test('resource-to-stage maps reference real resources and real stages', () => {
  for (const [trackId, map] of Object.entries(RESOURCE_STAGE_MAP)) {
    const track = TRACKS.find((t) => t.id === trackId)
    assert.ok(track, `RESOURCE_STAGE_MAP references unknown track ${trackId}`)
    const resourceIds = new Set(track.resources.map((r) => r.id))
    const stageIds = new Set(track.roadmap.map((s) => s.id))
    for (const [resourceId, stageId] of Object.entries(map)) {
      assert.ok(resourceIds.has(resourceId), `${trackId} stage map references unknown resource ${resourceId}`)
      assert.ok(stageIds.has(stageId), `${trackId} resource ${resourceId} maps to unknown stage ${stageId}`)
    }
    // No resource may be left unmapped on a track that has a map.
    for (const resource of track.resources) {
      assert.ok(resource.id in map, `${trackId} resource ${resource.id} is not mapped to a stage`)
    }
  }
})

test('project steps always carry a real catalogue project and a structured brief', () => {
  for (const track of TRACKS) {
    const ids = new Set([...track.projects.map((p) => p.id), ...getExtraProjects(track.id).map((p) => p.id)])
    for (const step of buildGuidedPath(track.id).filter((s) => s.type === 'project')) {
      assert.ok(step.projectId && ids.has(step.projectId), `${track.id} project step references an unknown project`)
      assert.ok(step.projectBrief, `${track.id} project step has no brief`)
      assert.ok(step.projectBrief.acceptanceCriteria.length >= 3, `${track.id} project brief lacks acceptance criteria`)
      assert.ok(step.projectBrief.evidence.length >= 1, `${track.id} project brief lacks evidence requirements`)
      assert.ok(Array.isArray(step.projectBrief.prerequisites) && step.projectBrief.prerequisites.length >= 1, `${track.id} project brief lacks prerequisites`)
      assert.ok(Array.isArray(step.projectBrief.commonFailureCases) && step.projectBrief.commonFailureCases.length >= 1, `${track.id} project brief lacks common failure cases`)
    }
  }
})

test('concept steps for authored tracks expose objective, success criteria and mistakes', () => {
  for (const trackId of Object.keys(STAGE_LEARNING_PLANS)) {
    for (const step of buildGuidedPath(trackId).filter((s) => s.type === 'concept')) {
      assert.match(step.description, /OBJECTIVE/)
      assert.match(step.description, /SUCCESS CRITERIA/)
      assert.match(step.description, /COMMON MISTAKES/)
    }
  }
})

test('requiredCorrectFor allows one miss on short authored checks and 80% for AI', () => {
  assert.equal(requiredCorrectFor('frontend', 3), 2)
  assert.equal(requiredCorrectFor('frontend', 5), 4)
  assert.equal(requiredCorrectFor('ai-foundations', 5), 4)
  assert.equal(requiredCorrectFor('ai-agents', 3), 3)
  assert.equal(requiredCorrectFor('frontend', 0), 0)
  assert.equal(requiredCorrectFor('frontend', 1), 1)
})

test('the obsolete publisher-trivia quiz bank is gone and not referenced', () => {
  assert.equal(fs.existsSync(path.join(root, 'lib', 'quiz-data.ts')), false, 'lib/quiz-data.ts should be removed')
  assert.equal(fs.existsSync(path.join(root, 'scripts', 'generate-quiz-data.mjs')), false, 'the quiz generator should be removed')

  const dirs = ['lib', 'app', 'components', 'scripts', 'hooks']
  const offenders = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) {
        const text = fs.readFileSync(full, 'utf8')
        if (/QUIZ_DATA|from ['"].*quiz-data['"]/.test(text)) offenders.push(path.relative(root, full))
      }
    }
  }
  for (const dir of dirs) {
    const full = path.join(root, dir)
    if (fs.existsSync(full)) walk(full)
  }
  assert.deepEqual(offenders, [], `legacy quiz bank still referenced: ${offenders.join(', ')}`)
})
