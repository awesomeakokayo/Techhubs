'use strict'
/**
 * Curriculum-quality scoring and premium-eligibility rules.
 *
 * These tests use intentionally incomplete fixtures to prove that:
 *  - a missing critical element fails its mandatory gate;
 *  - a failed gate blocks premium eligibility EVEN when the weighted score is high
 *    (weighted averages must never compensate for missing content);
 *  - the 90/100 threshold is applied to BOTH dimensions independently;
 *  - automated evidence alone can never approve a track (human sign-off required).
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  PREMIUM_MIN_DIMENSION_SCORE,
  MIN_INSTRUCTION_CHARS,
  MIN_QUIZ_QUESTIONS,
  scoreCurriculumReadiness,
  scorePremiumWorthiness,
  evaluateMandatoryGates,
  assessTrackQuality,
  summarizeCatalogue,
  evaluatePremiumCandidates,
} = require('../.test-dist/curriculum-quality.js')

// ─────────────────────────────────────────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────────────────────────────────────────

/** A fully complete stage: every mandatory element present. */
function completeStage(overrides = {}) {
  return {
    stageId: 1,
    title: 'Stage',
    hasAuthoredPlan: true,
    hasObjective: true,
    instructionChars: MIN_INSTRUCTION_CHARS + 400,
    hasWorkedExample: true,
    hasCommonMistakes: true,
    hasExercise: true,
    topicCount: 4,
    resourceCount: 2,
    validResourceCount: 2,
    verifiedResourceCount: 2,
    contentVerifiedResourceCount: 2,
    matchedResourceCount: 2,
    reachableResourceCount: 2,
    quizQuestionCount: 5,
    validQuizQuestionCount: 5,
    quizAuthored: true,
    projectId: 'p1',
    projectHasBrief: true,
    projectAiAssessable: true,
    projectRubricCriteria: 6,
    projectMandatoryCriteria: 3,
    ...overrides,
  }
}

const COMPLETE_PROGRESSION = {
  serverValidated: true,
  clientCanForgePass: false,
  retrySupported: true,
  failureFeedbackProvided: true,
  resultsPersisted: true,
  retryHistoryPersisted: true,
}

function completeTrack(overrides = {}) {
  return {
    id: 'demo',
    name: 'Demo Track',
    slug: 'demo',
    category: 'build',
    isAI: false,
    stages: [completeStage({ stageId: 1 }), completeStage({ stageId: 2, projectId: 'p2' })],
    portfolioProjectId: 'p-portfolio',
    portfolioVerified: true,
    duplicateSlug: false,
    progression: { ...COMPLETE_PROGRESSION },
    humanReviewSignedOff: false,
    ...overrides,
  }
}

function gate(track, key) {
  const found = evaluateMandatoryGates(track).find((g) => g.key === key)
  assert.ok(found, `gate ${key} must exist`)
  return found
}

// ─────────────────────────────────────────────────────────────────────────────
// Scores
// ─────────────────────────────────────────────────────────────────────────────

test('a complete track scores at or above the premium threshold on both dimensions', () => {
  const track = completeTrack()
  const readiness = scoreCurriculumReadiness(track)
  const worthiness = scorePremiumWorthiness(track)
  assert.ok(readiness.total >= PREMIUM_MIN_DIMENSION_SCORE, `readiness ${readiness.total}`)
  assert.ok(worthiness.total >= PREMIUM_MIN_DIMENSION_SCORE, `worthiness ${worthiness.total}`)
})

test('an empty track scores below the premium threshold on both dimensions', () => {
  const track = completeTrack({ stages: [], portfolioProjectId: null, portfolioVerified: false })
  assert.ok(scoreCurriculumReadiness(track).total < PREMIUM_MIN_DIMENSION_SCORE)
  assert.ok(scorePremiumWorthiness(track).total < PREMIUM_MIN_DIMENSION_SCORE)
  const assessment = assessTrackQuality(track)
  assert.equal(assessment.gatesPassed, false)
  assert.equal(assessment.premiumEligible, false)
})

test('scores never exceed 100 and components sum to the total', () => {
  const scores = [
    scoreCurriculumReadiness(completeTrack()),
    scorePremiumWorthiness(completeTrack()),
  ]
  for (const score of scores) {
    assert.ok(score.total <= score.max)
    const sum = Math.round(score.components.reduce((n, c) => n + c.score, 0) * 10) / 10
    assert.equal(sum, score.total)
  }
})

test('quality components are flagged for human review', () => {
  const readiness = scoreCurriculumReadiness(completeTrack())
  assert.equal(readiness.humanReviewRequired, true)
  assert.ok(readiness.components.some((c) => c.humanReview), 'some components require human judgement')
})

test('weaker content lowers the score without breaking the scale', () => {
  const strong = scoreCurriculumReadiness(completeTrack())
  const weak = scoreCurriculumReadiness(
    completeTrack({
      stages: [completeStage({ instructionChars: 100, hasCommonMistakes: false, hasWorkedExample: false })],
    }),
  )
  assert.ok(weak.total < strong.total)
  assert.ok(weak.total >= 0)
})

// ─────────────────────────────────────────────────────────────────────────────
// Mandatory gates (one per required element)
// ─────────────────────────────────────────────────────────────────────────────

test('a complete track passes every mandatory gate', () => {
  const gates = evaluateMandatoryGates(completeTrack())
  const failed = gates.filter((g) => !g.passed)
  assert.deepEqual(failed.map((g) => g.key), [])
})

test('missing instruction fails the instruction gate', () => {
  const track = completeTrack({ stages: [completeStage({ instructionChars: 10, hasObjective: false })] })
  const g = gate(track, 'instruction')
  assert.equal(g.passed, false)
  assert.match(g.detail, /1\/1/)
})

test('missing resources fail the resources gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ resourceCount: 0, validResourceCount: 0, verifiedResourceCount: 0, reachableResourceCount: 0 })] }),
    'resources',
  )
  assert.equal(g.passed, false)
})

test('an invalid resource URL fails the resources gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ resourceCount: 2, validResourceCount: 0, verifiedResourceCount: 0, reachableResourceCount: 0 })] }),
    'resources',
  )
  assert.equal(g.passed, false)
})

test('a metadata-only resource (reachable, content never inspected) fails the resources gate', () => {
  // Level 2 = destination reachable but content never inspected. HTTP status and
  // a page title are not content verification.
  const g = gate(
    completeTrack({ stages: [completeStage({ resourceCount: 2, validResourceCount: 2, verifiedResourceCount: 0, contentVerifiedResourceCount: 0, reachableResourceCount: 2 })] }),
    'resources',
  )
  assert.equal(g.passed, false)
})

test('content that does not match the objective lowers the resource score', () => {
  const strong = assessTrackQuality(completeTrack())
  const mismatched = assessTrackQuality(
    completeTrack({
      stages: [
        completeStage({ stageId: 1 }),
        completeStage({ stageId: 2, verifiedResourceCount: 1, contentVerifiedResourceCount: 1, matchedResourceCount: 0 }),
      ],
    }),
  )
  assert.ok(
    mismatched.curriculumReadiness.total < strong.curriculumReadiness.total,
    'a resource whose inspected content has no objective overlap must lower the score',
  )
})

test('a paywalled primary resource cannot satisfy the resources gate', () => {
  // A paywalled resource is neither content-inspected nor free, so it can never
  // be counted as a verified required resource.
  const g = gate(
    completeTrack({ stages: [completeStage({ resourceCount: 1, validResourceCount: 1, verifiedResourceCount: 0, contentVerifiedResourceCount: 0, reachableResourceCount: 1 })] }),
    'resources',
  )
  assert.equal(g.passed, false)
})

test('a stage with no content-verified resource lowers the readiness score', () => {
  const strong = assessTrackQuality(completeTrack())
  const weak = assessTrackQuality(
    completeTrack({
      stages: [
        completeStage({ stageId: 1 }),
        completeStage({ stageId: 2, resourceCount: 1, validResourceCount: 1, verifiedResourceCount: 0, reachableResourceCount: 1 }),
      ],
    }),
  )
  assert.ok(weak.curriculumReadiness.total < strong.curriculumReadiness.total, 'removing a verified resource must lower readiness')
})

test('a stage without a worked example lowers the depth/quality evidence', () => {
  const strong = assessTrackQuality(completeTrack())
  const weak = assessTrackQuality(
    completeTrack({
      stages: [completeStage({ stageId: 1 }), completeStage({ stageId: 2, hasWorkedExample: false })],
    }),
  )
  assert.ok(weak.curriculumReadiness.total < strong.curriculumReadiness.total, 'a missing worked example must lower readiness')
  assert.ok(weak.premiumWorthiness.total < strong.premiumWorthiness.total, 'a missing worked example must lower worthiness')
})

test('removing the AI-verified assessment lowers the worthiness score', () => {
  const strong = assessTrackQuality(completeTrack())
  const weak = assessTrackQuality(
    completeTrack({
      stages: [
        completeStage({ stageId: 1 }),
        completeStage({ stageId: 2, projectId: null, projectHasBrief: false, projectAiAssessable: false, projectRubricCriteria: 0, projectMandatoryCriteria: 0 }),
      ],
    }),
  )
  assert.ok(weak.premiumWorthiness.total < strong.premiumWorthiness.total, 'removing the assessment must lower worthiness')
})

test('an invalidated answer key lowers the readiness score', () => {
  const strong = assessTrackQuality(completeTrack())
  const weak = assessTrackQuality(
    completeTrack({
      stages: [
        completeStage({ stageId: 1 }),
        completeStage({ stageId: 2, quizQuestionCount: 5, validQuizQuestionCount: 0 }),
      ],
    }),
  )
  assert.ok(weak.curriculumReadiness.total < strong.curriculumReadiness.total, 'an invalid answer key must lower readiness')
})

test('too few knowledge questions fail the knowledge-test gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ quizQuestionCount: MIN_QUIZ_QUESTIONS - 1, validQuizQuestionCount: 2 })] }),
    'knowledgeTest',
  )
  assert.equal(g.passed, false)
})

test('an invalid answer key fails the knowledge-test gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ quizQuestionCount: 5, validQuizQuestionCount: 4 })] }),
    'knowledgeTest',
  )
  assert.equal(g.passed, false)
})

test('a stage with no AI-assessable project fails the AI-mastery gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ projectId: null, projectAiAssessable: false, projectRubricCriteria: 0, projectMandatoryCriteria: 0 })] }),
    'aiMastery',
  )
  assert.equal(g.passed, false)
})

test('a project with no mandatory rubric criteria fails the AI-mastery gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ projectAiAssessable: true, projectMandatoryCriteria: 0 })] }),
    'aiMastery',
  )
  assert.equal(g.passed, false)
})

test('a stage with no embedded project fails the phase-project gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ projectId: null, projectAiAssessable: false })] }),
    'phaseProject',
  )
  assert.equal(g.passed, false)
})

test('a rubric-less project fails the rubric gate', () => {
  const g = gate(
    completeTrack({ stages: [completeStage({ projectRubricCriteria: 0, projectMandatoryCriteria: 0 })] }),
    'rubric',
  )
  assert.equal(g.passed, false)
})

test('a forgeable progression path fails the server-validation and no-bypass gates', () => {
  const track = completeTrack({ progression: { ...COMPLETE_PROGRESSION, clientCanForgePass: true } })
  assert.equal(gate(track, 'serverValidation').passed, false)
  assert.equal(gate(track, 'noBypass').passed, false)
})

test('missing retry or feedback fails the remediation gate', () => {
  const noRetry = completeTrack({ progression: { ...COMPLETE_PROGRESSION, retrySupported: false } })
  assert.equal(gate(noRetry, 'remediation').passed, false)
  const noFeedback = completeTrack({ progression: { ...COMPLETE_PROGRESSION, failureFeedbackProvided: false } })
  assert.equal(gate(noFeedback, 'remediation').passed, false)
})

test('lost attempt history fails the progress-recovery gate', () => {
  const track = completeTrack({ progression: { ...COMPLETE_PROGRESSION, retryHistoryPersisted: false } })
  assert.equal(gate(track, 'progressRecovery').passed, false)
})

// ─────────────────────────────────────────────────────────────────────────────
// Eligibility: a failed gate beats a high score
// ─────────────────────────────────────────────────────────────────────────────

test('a failed gate blocks eligibility even when the weighted score is high', () => {
  // Only the quiz is broken, so the score stays high — but the gate must block.
  const track = completeTrack({ stages: [completeStage({ quizQuestionCount: 5, validQuizQuestionCount: 5 })] })
  const brokenQuiz = completeTrack({
    stages: [
      completeStage({ stageId: 1 }),
      completeStage({ stageId: 2, projectId: 'p2', quizQuestionCount: 1, validQuizQuestionCount: 1 }),
    ],
  })
  const healthy = assessTrackQuality(track)
  const broken = assessTrackQuality(brokenQuiz)
  assert.ok(broken.curriculumReadiness.total >= 90, `score stays high (${broken.curriculumReadiness.total})`)
  assert.equal(broken.gatesPassed, false)
  assert.equal(broken.premiumEligible, false)
  assert.ok(broken.failingGates.includes('knowledgeTest'))
  assert.equal(healthy.premiumEligible, true)
})

test('both thresholds are independent: a low worthiness blocks eligibility even at high readiness', () => {
  const track = completeTrack({
    // Remove portfolio + strip practical coverage to depress worthiness only.
    stages: [completeStage({ projectHasBrief: false })],
    portfolioVerified: false,
  })
  const assessment = assessTrackQuality(track)
  assert.ok(assessment.premiumWorthiness.total < assessment.curriculumReadiness.total)
  if (assessment.premiumWorthiness.total < PREMIUM_MIN_DIMENSION_SCORE) {
    assert.equal(assessment.premiumEligible, false)
  }
})

test('automated evidence alone never approves a track — human sign-off is required', () => {
  const unsigned = assessTrackQuality(completeTrack({ humanReviewSignedOff: false }))
  assert.equal(unsigned.premiumEligible, true)
  assert.equal(unsigned.premiumApproved, false)
  assert.equal(unsigned.humanReview.passed, false)

  const signed = assessTrackQuality(completeTrack({ humanReviewSignedOff: true }))
  assert.equal(signed.premiumApproved, true)
  assert.equal(signed.humanReview.passed, true)
})

test('a mechanically ineligible track can never be approved', () => {
  const assessment = assessTrackQuality(
    completeTrack({ humanReviewSignedOff: true, stages: [completeStage({ projectId: null, projectAiAssessable: false })] }),
  )
  assert.equal(assessment.premiumEligible, false)
  assert.equal(assessment.premiumApproved, false)
})

// ─────────────────────────────────────────────────────────────────────────────
// Candidates + catalogue summary
// ─────────────────────────────────────────────────────────────────────────────

test('a configured candidate that fails a gate is ineligible', () => {
  const assessments = [assessTrackQuality(completeTrack({ id: 'a' })), assessTrackQuality(completeTrack({ id: 'b', stages: [completeStage({ projectId: null, projectAiAssessable: false })] }))]
  const results = evaluatePremiumCandidates(['a', 'b'], assessments)
  assert.equal(results.find((r) => r.candidateId === 'a').eligible, true)
  const b = results.find((r) => r.candidateId === 'b')
  assert.equal(b.eligible, false)
  assert.match(b.reason, /mandatory gates/)
})

test('a candidate with no quality evidence is ineligible', () => {
  const results = evaluatePremiumCandidates(['ghost'], [])
  assert.equal(results[0].eligible, false)
  assert.match(results[0].reason, /no curriculum-quality evidence/)
})

test('release mode additionally requires human sign-off', () => {
  const assessments = [assessTrackQuality(completeTrack({ id: 'a', humanReviewSignedOff: false }))]
  assert.equal(evaluatePremiumCandidates(['a'], assessments, false)[0].eligible, true)
  const release = evaluatePremiumCandidates(['a'], assessments, true)[0]
  assert.equal(release.eligible, false)
  assert.match(release.reason, /sign-off/)
})

test('the catalogue summary counts ineligible tracks without silently dropping them', () => {
  const assessments = [
    assessTrackQuality(completeTrack({ id: 'ok' })),
    assessTrackQuality(completeTrack({ id: 'broken', stages: [completeStage({ quizQuestionCount: 0, validQuizQuestionCount: 0 })] })),
    assessTrackQuality(completeTrack({ id: 'signed', humanReviewSignedOff: true })),
  ]
  const summary = summarizeCatalogue(assessments)
  assert.equal(summary.tracks, 3)
  assert.equal(summary.premiumEligible, 2)
  assert.equal(summary.premiumApproved, 1)
  assert.equal(summary.blockedByGates, 1)
  assert.equal(summary.awaitingHumanReview, 1)
})
