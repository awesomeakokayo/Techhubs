'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  deriveGuidedPathProgress,
  deriveChecklistProgress,
  deriveTrackProgress,
} = require('../.test-dist/learning-progress.js')

/* ---------------- Guided-path progress ---------------- */

test('guided: initial enrollment with no steps completed', () => {
  const r = deriveGuidedPathProgress({ currentStepIndex: 0 }, 5)
  assert.deepEqual(r, {
    started: true,
    totalSteps: 5,
    completedSteps: 0,
    nextStepIndex: 0,
    percent: 0,
    isComplete: false,
  })
})

test('guided: not enrolled (no enrollment record)', () => {
  const r = deriveGuidedPathProgress(null, 5)
  assert.equal(r.started, false)
  assert.equal(r.completedSteps, 0)
  assert.equal(r.nextStepIndex, 0)
  assert.equal(r.percent, 0)
  assert.equal(r.isComplete, false)
})

test('guided: partially complete', () => {
  const r = deriveGuidedPathProgress({ currentStepIndex: 2 }, 5)
  assert.equal(r.completedSteps, 2)
  assert.equal(r.nextStepIndex, 2)
  assert.equal(r.percent, 40)
  assert.equal(r.isComplete, false)
})

test('guided: completing the last step marks the path complete (off-by-one guard)', () => {
  const penultimate = deriveGuidedPathProgress({ currentStepIndex: 4 }, 5)
  assert.equal(penultimate.completedSteps, 4)
  assert.equal(penultimate.nextStepIndex, 4)
  assert.equal(penultimate.isComplete, false)

  const final = deriveGuidedPathProgress({ currentStepIndex: 5 }, 5)
  assert.equal(final.completedSteps, 5)
  assert.equal(final.nextStepIndex, null)
  assert.equal(final.percent, 100)
  assert.equal(final.isComplete, true)
})

test('guided: percent rounding to whole numbers', () => {
  assert.equal(deriveGuidedPathProgress({ currentStepIndex: 1 }, 3).percent, 33)
  assert.equal(deriveGuidedPathProgress({ currentStepIndex: 2 }, 3).percent, 67)
  assert.equal(deriveGuidedPathProgress({ currentStepIndex: 1 }, 6).percent, 17)
})

test('guided: over-counted index is clamped and treated as complete', () => {
  const r = deriveGuidedPathProgress({ currentStepIndex: 9 }, 5)
  assert.equal(r.completedSteps, 5)
  assert.equal(r.nextStepIndex, null)
  assert.equal(r.percent, 100)
  assert.equal(r.isComplete, true)
})

test('guided: negative and non-integer indices are sanitised', () => {
  assert.equal(deriveGuidedPathProgress({ currentStepIndex: -3 }, 5).completedSteps, 0)
  assert.equal(deriveGuidedPathProgress({ currentStepIndex: 2.9 }, 5).completedSteps, 2)
  assert.equal(deriveGuidedPathProgress({ currentStepIndex: 2.9 }, 5).percent, 40)
})

test('guided: empty path never reports progress or completion', () => {
  const withEnrollment = deriveGuidedPathProgress({ currentStepIndex: 0 }, 0)
  assert.deepEqual(withEnrollment, {
    started: true,
    totalSteps: 0,
    completedSteps: 0,
    nextStepIndex: null,
    percent: 0,
    isComplete: false,
  })
  const notEnrolled = deriveGuidedPathProgress(null, 0)
  assert.equal(notEnrolled.isComplete, false)
  assert.equal(notEnrolled.nextStepIndex, null)
})

test('guided: single-step path transitions cleanly', () => {
  const before = deriveGuidedPathProgress(null, 1)
  assert.equal(before.nextStepIndex, 0)
  assert.equal(before.percent, 0)
  const after = deriveGuidedPathProgress({ currentStepIndex: 1 }, 1)
  assert.equal(after.percent, 100)
  assert.equal(after.isComplete, true)
  assert.equal(after.nextStepIndex, null)
})

test('guided: invalid total step counts are treated as empty', () => {
  assert.equal(deriveGuidedPathProgress(null, undefined).totalSteps, 0)
  assert.equal(deriveGuidedPathProgress(null, Number.NaN).totalSteps, 0)
  assert.equal(deriveGuidedPathProgress(null, -4).totalSteps, 0)
})

/* ---------------- Checklist progress ---------------- */

test('checklist: empty track has no activity and never completes', () => {
  const r = deriveChecklistProgress({
    completedStageIds: [],
    completedProjectIds: [],
    totalStages: 0,
    totalProjects: 0,
  })
  assert.deepEqual(r, {
    completedStages: 0,
    totalStages: 0,
    completedProjects: 0,
    totalProjects: 0,
    hasActivity: false,
    isComplete: false,
  })
})

test('checklist: partial completion reports activity but not completion', () => {
  const r = deriveChecklistProgress({
    completedStageIds: [1, 2],
    completedProjectIds: ['p1'],
    totalStages: 4,
    totalProjects: 3,
  })
  assert.equal(r.completedStages, 2)
  assert.equal(r.completedProjects, 1)
  assert.equal(r.hasActivity, true)
  assert.equal(r.isComplete, false)
})

test('checklist: full completion', () => {
  const r = deriveChecklistProgress({
    completedStageIds: [1, 2, 3, 4],
    completedProjectIds: ['p1', 'p2', 'p3'],
    totalStages: 4,
    totalProjects: 3,
  })
  assert.equal(r.isComplete, true)
  assert.equal(r.hasActivity, true)
})

test('checklist: duplicate ids are de-duplicated', () => {
  const r = deriveChecklistProgress({
    completedStageIds: [1, 1, 2],
    completedProjectIds: ['p1', 'p1'],
    totalStages: 3,
    totalProjects: 3,
  })
  assert.equal(r.completedStages, 2)
  assert.equal(r.completedProjects, 1)
})

test('checklist: out-of-range ids are clamped to the catalogue totals', () => {
  const r = deriveChecklistProgress({
    completedStageIds: [1, 2, 3, 4, 5],
    completedProjectIds: ['p1', 'p2', 'p3', 'p4'],
    totalStages: 3,
    totalProjects: 2,
  })
  assert.equal(r.completedStages, 3)
  assert.equal(r.completedProjects, 2)
})

test('checklist: a category with zero items is vacuously satisfied', () => {
  const stagesOnly = deriveChecklistProgress({
    completedStageIds: [1],
    completedProjectIds: [],
    totalStages: 1,
    totalProjects: 0,
  })
  assert.equal(stagesOnly.isComplete, true)

  const projectsOnly = deriveChecklistProgress({
    completedStageIds: [],
    completedProjectIds: ['p1'],
    totalStages: 0,
    totalProjects: 1,
  })
  assert.equal(projectsOnly.isComplete, true)
})

test('checklist: completions with zero totals do not fabricate progress', () => {
  const r = deriveChecklistProgress({
    completedStageIds: [1],
    completedProjectIds: ['p1'],
    totalStages: 0,
    totalProjects: 0,
  })
  assert.equal(r.completedStages, 0)
  assert.equal(r.completedProjects, 0)
  assert.equal(r.hasActivity, false)
  assert.equal(r.isComplete, false)
})

test('checklist: missing id arrays are tolerated', () => {
  const r = deriveChecklistProgress({ totalStages: 2, totalProjects: 1 })
  assert.equal(r.completedStages, 0)
  assert.equal(r.completedProjects, 0)
  assert.equal(r.hasActivity, false)
})

/* ---------------- Combined, but not blended ---------------- */

test('track: guided and checklist progress stay distinct and unblended', () => {
  const r = deriveTrackProgress({
    enrollment: { currentStepIndex: 3 },
    totalSteps: 12,
    completedStageIds: [1, 2],
    completedProjectIds: ['p1', 'p2', 'p3', 'p4'],
    totalStages: 4,
    totalProjects: 4,
  })

  assert.equal(r.guided.percent, 25)
  assert.equal(r.checklist.completedStages, 2)
  assert.equal(r.checklist.completedProjects, 4)
  assert.equal(r.checklist.isComplete, false)

  // No combined percentage is produced anywhere.
  assert.equal(Object.prototype.hasOwnProperty.call(r, 'percent'), false)
  assert.equal(Object.prototype.hasOwnProperty.call(r.checklist, 'percent'), false)
})

test('track: checklist completion does not imply guided-path completion', () => {
  const r = deriveTrackProgress({
    enrollment: { currentStepIndex: 0 },
    totalSteps: 6,
    completedStageIds: [1, 2],
    completedProjectIds: ['p1'],
    totalStages: 2,
    totalProjects: 1,
  })
  assert.equal(r.checklist.isComplete, true)
  assert.equal(r.guided.isComplete, false)
})

test('track: guided-path completion does not imply checklist completion', () => {
  const r = deriveTrackProgress({
    enrollment: { currentStepIndex: 6 },
    totalSteps: 6,
    completedStageIds: [],
    completedProjectIds: [],
    totalStages: 3,
    totalProjects: 2,
  })
  assert.equal(r.guided.isComplete, true)
  assert.equal(r.checklist.isComplete, false)
  assert.equal(r.checklist.hasActivity, false)
})
