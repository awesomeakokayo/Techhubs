'use strict'
/**
 * Research-package pilot and resource-gate contract.
 *
 * The package is staged as a 20-stage overlay. These tests prove the adapter's
 * reconciliation, the 100-point quiz contract, explicit project overrides, the
 * strict no-text-URL rule, and the archive-era resource gate.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const validation = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'curriculum-implementation', 'import-validation.json'), 'utf8'))

const {
  PILOT_STAGE_CONTENT,
} = require('../.test-dist/curriculum-package/pilot.generated.js')
const {
  PACKAGE_EXTRA_PROJECTS,
  PACKAGE_PROJECT_OVERRIDES,
  PILOT_PROJECT_OVERRIDES,
} = require('../.test-dist/curriculum-package/projects.generated.js')
const {
  PACKAGE_STAGE_CONTENT,
} = require('../.test-dist/curriculum-package/stage-content.generated.js')
const {
  PACKAGE_PREFLIGHT_BLOCKED_STAGES,
  PACKAGE_RESOURCE_DISPOSITIONS,
  PACKAGE_SELECTED_RESOURCES,
  PACKAGE_STAGE_READINESS,
} = require('../.test-dist/curriculum-package/resources.generated.js')
const {
  auditPackageResourceGate,
  blockedPackageStages,
  getStageResourcePolicy,
  canPromoteResourceToRequired,
} = require('../.test-dist/curriculum-package/resource-gate.js')
const { buildGuidedPath, toPublicStep } = require('../.test-dist/guided-path.js')
const { questionIdFor } = require('../.test-dist/quiz-attempts.js')
const { buildAIWorldClassPath } = require('../.test-dist/ai-guided-path.js')
const { resolveStepAssessment } = require('../.test-dist/section-mastery.js')
const {
  deriveContract,
  disciplineForTrack,
  isArtifactKind,
  isStageMasteryProjectId,
  stageMasteryProjectId,
} = require('../.test-dist/project-verification/contract.js')
const { TRACKS } = require('../.test-dist/tracks.js')
const { getProjectBrief } = require('../.test-dist/curriculum.js')

function quizTotal(questions) {
  return questions.reduce((sum, question) => sum + (question.points ?? 0), 0)
}

test('the adapter reconciles the package and records human-review status', () => {
  assert.equal(validation.status, 'validated_needs_human_review')
  assert.equal(validation.counts.canonicalTracks, 32)
  assert.equal(validation.counts.canonicalStages, 186)
  assert.equal(validation.counts.quizzes, 930)
  assert.equal(validation.counts.phaseProjects, 125)
  assert.equal(validation.pilot.stageCount, 20)
  assert.equal(validation.pilot.projectOverrideCount, 16)
  assert.equal(validation.resources.preflightBlockedCount, 43)
  assert.equal(
    validation.resources.blockedCount + validation.resources.provisionalCount + validation.resources.currentVerifiedCount,
    186,
  )
  assert.equal(validation.resources.currentVerifiedCount, validation.resources.selectedPackagePrimaryCount)
  assert.equal(validation.resources.stageReadyCount, validation.resources.selectedStages.length)
  assert.equal(validation.findings.length, 0)
})

test('the adapter output is deterministic by default', () => {
  const pilotSource = fs.readFileSync(path.join(root, 'lib', 'curriculum-package', 'pilot.generated.ts'), 'utf8')
  assert.doesNotMatch(pilotSource, /Generated at:/)
  assert.match(pilotSource, /Source package hash: [a-f0-9]{16,}/)
  assert.equal(validation.generatedAt, undefined)
})

test('all 20 pilot stages use five 20-point questions and stage-scoped metadata', () => {
  assert.equal(Object.keys(PILOT_STAGE_CONTENT).length, 20)
  const questionIds = new Set()
  for (const [key, stage] of Object.entries(PILOT_STAGE_CONTENT)) {
    assert.equal(stage.quiz.length, 5, `${key} quiz length`)
    assert.equal(quizTotal(stage.quiz), 100, `${key} must total 100 points`)
    assert.ok(stage.quiz.every((question) => question.points === 20), `${key} point weights`)
    assert.ok(stage.quiz.every((question) => question.objective), `${key} objective`)
    assert.ok(stage.quiz.every((question) => question.provenance.reviewStatus === 'needs_human_review'))
    assert.match(stage.instructionNote, /outline/i)
    for (const question of stage.quiz) {
      assert.equal(questionIds.has(question.id), false, `${question.id} is duplicated`)
      questionIds.add(question.id)
    }
  }
  assert.equal(questionIds.size, 100)
})

test('all 186 stages carry instruction, practice, a 5 x 20 quiz, mastery and a real or explicitly synthetic assessment path', () => {
  const keys = Object.keys(PACKAGE_STAGE_CONTENT)
  assert.equal(keys.length, 186)
  const questionIds = new Set()
  const projectIds = new Set([...Object.keys(PACKAGE_PROJECT_OVERRIDES), ...PACKAGE_EXTRA_PROJECTS.map((project) => project.id)])
  let mapped = 0
  let synthetic = 0
  for (const key of keys) {
    const stage = PACKAGE_STAGE_CONTENT[key]
    const [trackId, stageText] = key.split(':')
    const stageId = Number(stageText)
    assert.equal(stage.trackId, trackId, key)
    assert.equal(stage.stageId, stageId, key)
    assert.ok(stage.objective.length > 0, `${key} objective`)
    assert.ok(stage.instructionNote.length > 0, `${key} instruction note`)
    assert.ok(stage.practice?.instructions.length > 0, `${key} practice`)
    assert.ok(stage.practice?.completionCriteria.length > 0, `${key} practice criteria`)
    assert.equal(stage.quiz.length, 5, `${key} quiz length`)
    assert.equal(quizTotal(stage.quiz), 100, `${key} quiz total`)
    assert.ok(stage.quiz.every((question) => question.points === 20), `${key} quiz weights`)
    assert.ok(stage.quiz.every((question) => question.objective), `${key} quiz objective`)
    assert.equal(stage.mastery.criteria.reduce((sum, criterion) => sum + criterion.weight, 0), 100, `${key} mastery total`)
    assert.ok(stage.mastery.criteria.some((criterion) => criterion.mandatory || criterion.weight > 0), `${key} mastery evidence`)
    assert.equal(stage.reviewStatus, 'needs_human_review', key)
    for (const question of stage.quiz) {
      assert.equal(questionIds.has(question.id), false, `${question.id} is duplicated`)
      questionIds.add(question.id)
    }
    if (stage.projectIds.length > 0) {
      mapped += 1
      assert.ok(stage.projectIds.every((id) => projectIds.has(id)), `${key} project exists`)
    } else {
      synthetic += 1
      assert.equal(isStageMasteryProjectId(stageMasteryProjectId(trackId, stageId)), true)
      assert.equal(projectIds.has(stageMasteryProjectId(trackId, stageId)), false, `${key} synthetic is not a project`)
    }
  }
  assert.equal(questionIds.size, 930)
  assert.equal(mapped, 120)
  assert.equal(synthetic, 66)
  assert.equal(Object.keys(PACKAGE_PROJECT_OVERRIDES).length, 125)
  assert.equal(PACKAGE_EXTRA_PROJECTS.length, 10)
})

test('pilot project overrides preserve package evidence without requiring a text URL', () => {
  assert.equal(Object.keys(PILOT_PROJECT_OVERRIDES).length, 16)
  for (const [projectId, override] of Object.entries(PILOT_PROJECT_OVERRIDES)) {
    assert.ok(override.requiredArtifacts.length >= 1, `${projectId} required artifacts`)
    assert.ok(override.requiredArtifacts.every((artifact) => artifact.required))
    assert.ok(override.requiredArtifacts.every((artifact) => artifact.kind !== 'text'), `${projectId} must not require a text URL`)
    assert.ok(override.requiredArtifacts.every((artifact) => isArtifactKind(artifact.kind)), `${projectId} kind`)
    assert.ok(override.optionalArtifacts.every((artifact) => isArtifactKind(artifact.kind)), `${projectId} optional kind`)
    assert.equal(override.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100, `${projectId} rubric total`)
    assert.ok(override.rubric.some((criterion) => criterion.mandatory), `${projectId} mandatory criterion`)
    assert.equal(override.reviewStatus, 'needs_human_review')
  }
  assert.ok(PILOT_PROJECT_OVERRIDES['fe-p3'].writtenExplanationPrompts.length > 0)
  assert.equal(PILOT_PROJECT_OVERRIDES['fe-p3'].requiredArtifacts.some((artifact) => artifact.kind === 'github_repo'), true)
  assert.equal(PILOT_PROJECT_OVERRIDES['cy-p1'].requiredArtifacts.some((artifact) => artifact.kind === 'github_repo'), false)
  assert.equal(PILOT_PROJECT_OVERRIDES['cy-p1'].requiredArtifacts.some((artifact) => artifact.kind === 'document_url'), true)
})

test('fresh resource evidence separates package-primary status from stage readiness', () => {
  const audit = auditPackageResourceGate()
  assert.equal(audit.ok, true)
  assert.equal(audit.total, 186)
  assert.equal(audit.blocked, validation.resources.blockedCount)
  assert.equal(audit.provisional, validation.resources.provisionalCount)
  assert.equal(audit.verified, validation.resources.currentVerifiedCount)
  assert.equal(audit.stageReady, validation.resources.stageReadyCount)
  assert.equal(audit.selectedAlternative, validation.resources.selectedAlternativeCount)
  assert.equal(audit.requiredCount, audit.stageReady)
  assert.equal(Object.keys(PACKAGE_SELECTED_RESOURCES).length, audit.stageReady)
  assert.deepEqual(blockedPackageStages(), validation.resources.blockedStages)

  for (const readiness of PACKAGE_STAGE_READINESS) {
    assert.ok(readiness.primary, `${readiness.trackId}:${readiness.stageId} primary record`)
    assert.ok(readiness.candidateCount >= 1, `${readiness.trackId}:${readiness.stageId} candidate count`)
    if (readiness.selected) {
      assert.equal(readiness.stageReady, true, `${readiness.trackId}:${readiness.stageId} selected but not ready`)
      assert.equal(readiness.selected.states.destination_verified, true)
      assert.equal(readiness.selected.states.content_inspected, true)
      assert.equal(readiness.selected.states.current_free_access_verified, true)
      assert.equal(readiness.selected.states.playback_verified, false)
      assert.equal(readiness.selected.states.human_reviewed, false)
      assert.equal(readiness.selected.states.approved, false)
      assert.ok(readiness.selected.contentChars >= 600)
      assert.ok(readiness.selected.excerpt.length > 0)
      assert.ok(readiness.selected.contentHash.length > 0)
    } else {
      assert.equal(readiness.stageReady, false, `${readiness.trackId}:${readiness.stageId} ready without a resource`)
    }
  }

  for (const key of PACKAGE_PREFLIGHT_BLOCKED_STAGES) {
    const readiness = PACKAGE_STAGE_READINESS.find((stage) => `${stage.trackId}:${stage.stageId}` === key)
    assert.ok(readiness, `${key} preflight readiness`)
    assert.ok(readiness.candidateCount >= 3, `${key} needs at least three candidates`)
    assert.ok(readiness.alternatives.length >= 2, `${key} needs at least two documented alternatives`)
    assert.ok(readiness.reason.length > 0, `${key} needs a reason`)
  }

  for (const key of ['productmgmt:5', 'productmgmt:6', 'productmgmt:7']) {
    const disposition = PACKAGE_RESOURCE_DISPOSITIONS[key]
    assert.equal(disposition.status, 'blocked', key)
    assert.equal(disposition.selected?.source, 'alternative', key)
    assert.equal(disposition.stageReady, true, key)
    assert.equal(disposition.required, true, key)
    const policy = getStageResourcePolicy(key.split(':')[0], Number(key.split(':')[1]))
    assert.equal(policy.required, true)
    assert.equal(policy.role, 'required')
    assert.equal(policy.currentCheck, 'current')
  }

  // These candidates were inspected and found to cover only part of the named
  // outcome. Keep the stage unresolved rather than promoting a partial source.
  for (const key of ['backend:1', 'devops:2', 'productmgmt:8', 'ai-youtube:5']) {
    const disposition = PACKAGE_RESOURCE_DISPOSITIONS[key]
    assert.equal(disposition.stageReady, false, key)
    assert.equal(disposition.required, false, key)
    assert.match(disposition.reason, /No candidate passed/, key)
    const policy = getStageResourcePolicy(key.split(':')[0], Number(key.split(':')[1]))
    assert.equal(policy.required, false, key)
    assert.equal(policy.role, 'optional', key)
  }

  // Manual rejections are keyed by normalised URL. A trailing slash must not
  // let a rejected page become the selected required resource again.
  for (const key of ['qa:4', 'video:4']) {
    const readiness = PACKAGE_STAGE_READINESS.find((stage) => `${stage.trackId}:${stage.stageId}` === key)
    assert.equal(readiness.stageReady, false, key)
    assert.match(readiness.reason, /No candidate passed/, key)
  }

  assert.equal(canPromoteResourceToRequired(PACKAGE_RESOURCE_DISPOSITIONS['frontend:1'], null), false)
  assert.equal(canPromoteResourceToRequired(PACKAGE_RESOURCE_DISPOSITIONS['frontend:1'], {
    url: PACKAGE_RESOURCE_DISPOSITIONS['frontend:1'].primary.url,
    checkedAt: '2026-10-22',
    verificationLevel: 3,
    freeAccess: false,
    accountRequired: false,
    paymentRequired: false,
    contentInspected: true,
    objectiveRelevant: true,
  }), false)
})

test('the pilot quiz is public-safe and marks draft content', () => {
  const steps = buildGuidedPath('frontend')
  const stageOneQuiz = steps.find((step) => step.stageId === 1 && step.type === 'quiz')
  assert.ok(stageOneQuiz)
  assert.equal(stageOneQuiz.quizQuestions.length, 5)
  assert.equal(quizTotal(stageOneQuiz.quizQuestions), 100)
  assert.equal(stageOneQuiz.contentReviewStatus, 'needs_human_review')
  const publicStep = toPublicStep(stageOneQuiz)
  assert.doesNotMatch(JSON.stringify(publicStep), /correctIndex/)
  assert.doesNotMatch(JSON.stringify(publicStep), /explanation/)
  assert.equal(publicStep.quizQuestions[0].points, 20)
  assert.equal(publicStep.quizQuestions[0].reviewStatus, 'needs_human_review')
})

test('legacy quizzes expose the same derived question ids the grader uses', () => {
  const step = buildGuidedPath('crypto').find((candidate) => candidate.type === 'quiz')
  assert.ok(step)
  const publicStep = toPublicStep(step)
  assert.equal(publicStep.quizQuestions.length, step.quizQuestions.length)
  publicStep.quizQuestions.forEach((question, index) => {
    assert.equal(question.id, questionIdFor(step.quizQuestions[index], index, step.stageId))
    assert.ok(question.id)
  })
  assert.doesNotMatch(JSON.stringify(publicStep), /correctIndex/)
})

test('blocked pilot stages expose the optional-only resource status', () => {
  const steps = buildGuidedPath('cyber')
  const blockedConcept = steps.find((step) => step.stageId === 4 && step.type === 'concept')
  assert.ok(blockedConcept)
  assert.equal(blockedConcept.contentProvenance.resourceStatus, 'blocked')
  assert.equal(blockedConcept.contentProvenance.resourceRequired, false)
  const practice = steps.find((step) => step.stageId === 4 && step.type === 'practice')
  assert.ok(practice)
  assert.equal((practice.description.match(/This is ungraded practice/gi) ?? []).length, 1)
})

test('the AI pilot path replaces checkpoint reuse with the pilot quiz', () => {
  const steps = buildAIWorldClassPath('ai-foundations')
  const stageOneQuiz = steps.find((step) => step.stageId === 1 && step.type === 'quiz')
  assert.ok(stageOneQuiz)
  assert.equal(stageOneQuiz.quizQuestions.length, 5)
  assert.equal(quizTotal(stageOneQuiz.quizQuestions), 100)
  assert.equal(stageOneQuiz.contentReviewStatus, 'needs_human_review')
  assert.ok(stageOneQuiz.quizQuestions.every((question) => question.teachingSource))
  assert.doesNotMatch(JSON.stringify(toPublicStep(stageOneQuiz)), /correctIndex/)
})

test('pilot project contracts use explicit disciplines and package rubrics', () => {
  const frontend = TRACKS.find((track) => track.id === 'frontend')
  const landing = frontend.projects.find((project) => project.id === 'fe-p3')
  const steps = buildGuidedPath('frontend')
  const projectStep = steps.find((step) => step.projectId === 'fe-p3')
  const assessment = resolveStepAssessment('frontend', projectStep)
  assert.ok(assessment)
  assert.equal(assessment.contract.discipline, 'software')
  assert.deepEqual(assessment.contract.requiredArtifacts.map((artifact) => artifact.kind), ['github_repo'])
  assert.equal(assessment.contract.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100)
  assert.ok(assessment.contract.rubric.some((criterion) => criterion.mandatory))
  assert.ok(assessment.contract.writtenExplanation.prompts.some((prompt) => /test output/i.test(prompt)))
  const derived = deriveContract({ project: landing, track: frontend, brief: getProjectBrief(landing.id, landing.level, landing.title) })
  assert.deepEqual(derived.requiredArtifacts.map((artifact) => artifact.kind), ['github_repo'])
})

test('QA and cybersecurity evidence can be a report or manual test evidence, not a repository', () => {
  const qaTrack = TRACKS.find((track) => track.id === 'qa')
  const qaProject = qaTrack.projects[0]
  const qaContract = deriveContract({
    project: qaProject,
    track: qaTrack,
    brief: getProjectBrief(qaProject.id, qaProject.level, qaProject.title),
  })
  assert.equal(qaContract.discipline, 'qa')
  assert.ok(qaContract.requiredArtifacts.some((artifact) => artifact.kind === 'document_url'))
  assert.equal(qaContract.requiredArtifacts.some((artifact) => artifact.kind === 'github_repo'), false)

  const cyberTrack = TRACKS.find((track) => track.id === 'cyber')
  const cyberProject = cyberTrack.projects.find((project) => project.id === 'cy-p1') ?? cyberTrack.projects[0]
  const cyberContract = deriveContract({
    project: cyberProject,
    track: cyberTrack,
    brief: getProjectBrief(cyberProject.id, cyberProject.level, cyberProject.title),
  })
  assert.equal(cyberContract.discipline, 'security')
  assert.ok(cyberContract.requiredArtifacts.some((artifact) => artifact.kind === 'document_url'))
  assert.equal(cyberContract.requiredArtifacts.some((artifact) => artifact.kind === 'github_repo'), false)
})

test('every catalogue track resolves an explicit discipline and AI non-code tracks avoid GitHub', () => {
  for (const track of TRACKS) {
    assert.ok(disciplineForTrack(track.id), `${track.id} has no discipline`)
  }
  assert.equal(disciplineForTrack('devops'), 'software')
  assert.equal(disciplineForTrack('ai-foundations'), 'ai-foundations')
  assert.equal(disciplineForTrack('ai-design'), 'design')
  assert.equal(disciplineForTrack('ai-youtube'), 'ai-content')
  assert.equal(disciplineForTrack('qa'), 'qa')

  for (const track of TRACKS.filter((item) => item.id.startsWith('ai-'))) {
    if (['ai-software-development', 'ai-engineering'].includes(track.id)) continue
    for (const project of track.projects) {
      const contract = deriveContract({
        project,
        track,
        brief: getProjectBrief(project.id, project.level, project.title),
      })
      assert.equal(
        contract.requiredArtifacts.some((artifact) => artifact.kind === 'github_repo'),
        false,
        `${track.id}/${project.id} should not require a repository`,
      )
    }
  }
})
