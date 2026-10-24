'use strict'
/**
 * Portfolio readiness counts *verified* project work. The project-verification
 * pipeline records `status: 'passed'` on a rubric pass (see
 * lib/project-verification/assessment.ts); readiness must recognise that status,
 * not an unreachable `'submitted'` literal, or readiness is permanently false.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { derivePortfolioReadiness } = require('../.test-dist/learning-progress.js')

const steps = [
  { type: 'concept' },
  { type: 'resource' },
  { type: 'practice' },
  { type: 'quiz' },
  { type: 'project', projectId: 'p1' },
  { type: 'concept' },
  { type: 'quiz' },
  { type: 'project', projectId: 'p2', isPortfolio: true },
]

test('empty progress reports zeros and is not ready', () => {
  const r = derivePortfolioReadiness(0, steps, null)
  assert.equal(r.knowledgeChecksTotal, 2)
  assert.equal(r.knowledgeChecksPassed, 0)
  assert.equal(r.projectsTotal, 2)
  assert.equal(r.projectsSubmitted, 0)
  assert.equal(r.portfolioArtifacts, 0)
  assert.equal(r.ready, false)
})

test('counts only steps that are actually completed', () => {
  const r = derivePortfolioReadiness(4, steps, { p1: { status: 'passed' } })
  assert.equal(r.knowledgeChecksPassed, 1)
  assert.equal(r.projectsSubmitted, 0, 'p1 project step is not completed yet (index 4, completedSteps 4)')
})

test('a passed project only counts once its step is completed', () => {
  const r = derivePortfolioReadiness(5, steps, { p1: { status: 'passed' } })
  assert.equal(r.projectsSubmitted, 1)
  assert.equal(r.portfolioArtifacts, 0)
})

test('ready requires all steps, all checks and all verified projects', () => {
  const r = derivePortfolioReadiness(8, steps, {
    p1: { status: 'passed' },
    p2: { status: 'passed' },
  })
  assert.equal(r.ready, true)
  assert.equal(r.portfolioArtifacts, 1)
  assert.equal(r.knowledgeChecksPassed, 2)
})

test('a project that did not pass does not count toward readiness', () => {
  for (const status of ['started', 'in_progress', 'changes_required', 'invalid', 'incomplete', 'unable_to_verify', 'service_unavailable']) {
    const r = derivePortfolioReadiness(8, steps, { p1: { status }, p2: { status: 'passed' } })
    assert.equal(r.projectsSubmitted, 1, `${status} must not count as verified evidence`)
    assert.equal(r.ready, false)
  }
})

test('the legacy `submitted` alias still counts for historical records', () => {
  const r = derivePortfolioReadiness(8, steps, { p1: { status: 'submitted' }, p2: { status: 'submitted' } })
  assert.equal(r.projectsSubmitted, 2)
  assert.equal(r.ready, true)
})

test('completedSteps is clamped to the number of steps', () => {
  const r = derivePortfolioReadiness(99, steps, { p1: { status: 'passed' }, p2: { status: 'passed' } })
  assert.equal(r.stepsCompleted, steps.length)
  assert.equal(r.ready, true)
})

test('no steps means never ready', () => {
  const r = derivePortfolioReadiness(0, [], {})
  assert.equal(r.ready, false)
  assert.equal(r.stepsTotal, 0)
})
