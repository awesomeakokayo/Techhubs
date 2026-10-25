/**
 * Curriculum-quality scoring and premium-eligibility rules.
 *
 * Two independent 0–100 scores are computed from evidence:
 *   A. Curriculum readiness — is the course complete, consistent and correctly
 *      implemented?
 *   B. Premium worthiness — does it deliver enough depth, practice, feedback,
 *      evidence and outcome to justify charging for access?
 *
 * A course is only premium-eligible when BOTH scores are >= 90 AND every
 * mandatory gate passes. Weighted averages never compensate for a missing
 * critical element: a single failed gate blocks eligibility regardless of score.
 *
 * This module is pure and dependency-free so it can be unit-tested against
 * intentionally incomplete fixtures and reused by the audit CLI. The mechanical
 * checks it performs measure *completeness and wiring*, not instructional
 * quality; components that need human judgement set `humanReview: true`.
 *
 * The learner's exam pass mark (>= 80% on a knowledge test or a project rubric)
 * is a different concept from the course's 90/100 quality threshold.
 */

/** Minimum score on each dimension for premium eligibility. */
export const PREMIUM_MIN_DIMENSION_SCORE = 90

/** A stage must have at least this much instructional text to be "complete". */
export const MIN_INSTRUCTION_CHARS = 250

/** A knowledge check needs at least this many questions to be meaningful. */
export const MIN_QUIZ_QUESTIONS = 3

// ─────────────────────────────────────────────────────────────────────────────
// Evidence shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface StageQualityEvidence {
  stageId: number
  title: string
  /** An authored learning plan exists for this stage (objective + checks). */
  hasAuthoredPlan: boolean
  /** A non-empty learning objective / outcome is stated. */
  hasObjective: boolean
  /** Characters of instructional explanation on the stage's learn step. */
  instructionChars: number
  /** The stage provides a worked example / demonstration. */
  hasWorkedExample: boolean
  /** The stage lists common mistakes or misconceptions. */
  hasCommonMistakes: boolean
  /** The stage provides a guided practice exercise. */
  hasExercise: boolean
  topicCount: number
  /** Learning resources mapped to this stage. */
  resourceCount: number
  /** Mapped resources with a valid http(s) URL. */
  validResourceCount: number
  /**
   * Mapped resources whose verification level is >= 3: the actual content was
   * inspected (level-3 evidence carries a content excerpt). A reachable URL,
   * page title or metadata is NOT sufficient — that is level 2 only. Only
   * `required` resources count here; optional deep dives do not.
   */
  verifiedResourceCount: number
  /** Content-verified (level-3) resources including optional ones. */
  contentVerifiedResourceCount?: number
  /** Content-verified resources whose inspected content matches the stage objective. */
  matchedResourceCount?: number
  /** Mapped resources whose destination is reachable (verification level >= 2). */
  reachableResourceCount: number
  /** Knowledge-check questions on this stage. */
  quizQuestionCount: number
  /** Questions with an in-range correct answer and a non-empty explanation. */
  validQuizQuestionCount: number
  /** The questions are authored for this stage (not a generic fallback). */
  quizAuthored: boolean
  /** Embedded, AI-assessable project for this stage (the mastery demonstration). */
  projectId: string | null
  projectHasBrief: boolean
  /** The project step is wired to the verification pipeline. */
  projectAiAssessable: boolean
  /** Rubric criteria the project is assessed against. */
  projectRubricCriteria: number
  /** Mandatory (critical) rubric criteria. */
  projectMandatoryCriteria: number
}

export interface ProgressionEvidence {
  /** Progression is decided server-side from stored results. */
  serverValidated: boolean
  /** A client can forge progress/assessment state (a bypass). */
  clientCanForgePass: boolean
  /** A failed assessment can be retried without losing history. */
  retrySupported: boolean
  /** Failures return specific, actionable feedback. */
  failureFeedbackProvided: boolean
  /** Assessment results are persisted durably. */
  resultsPersisted: boolean
  /** Prior attempts are retained for audit/recovery. */
  retryHistoryPersisted: boolean
}

export interface TrackQualityEvidence {
  id: string
  name: string
  slug: string
  category: string
  isAI: boolean
  stages: StageQualityEvidence[]
  portfolioProjectId: string | null
  /** The portfolio project is AI-assessable and has a brief. */
  portfolioVerified: boolean
  /** Two catalogue tracks share this slug. */
  duplicateSlug: boolean
  progression: ProgressionEvidence
  /**
   * A subject-matter expert has reviewed instructional quality (correctness,
   * depth, accessibility, question quality) for this track. Automated checks
   * cannot establish this, so it defaults to false and is supplied by a
   * tracked, auditable sign-off record.
   */
  humanReviewSignedOff?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Result shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface ScoreComponent {
  key: string
  label: string
  score: number
  max: number
  evidence: string
  /** True when the component needs human expert review in addition to the proxy. */
  humanReview: boolean
}

export interface QualityScore {
  total: number
  max: number
  components: ScoreComponent[]
  humanReviewRequired: boolean
}

export interface MandatoryGate {
  key: string
  label: string
  passed: boolean
  detail: string
}

export interface TrackQualityAssessment {
  trackId: string
  name: string
  slug: string
  category: string
  stageCount: number
  curriculumReadiness: QualityScore
  premiumWorthiness: QualityScore
  gates: MandatoryGate[]
  gatesPassed: boolean
  /** Mechanically eligible: both scores >= 90 and every mechanical gate passes. */
  premiumEligible: boolean
  /**
   * Human-quality gate. Automated checks can verify completeness and wiring but
   * NOT factual correctness or instructional quality, so a track can only be
   * *approved* for premium once this gate is signed off.
   */
  humanReview: MandatoryGate
  /** Eligible AND human-review signed off. A track is only truly premium-ready when true. */
  premiumApproved: boolean
  failingGates: string[]
}

export interface CatalogueQualitySummary {
  tracks: number
  premiumEligible: number
  premiumApproved: number
  failingReadiness: number
  failingWorthiness: number
  blockedByGates: number
  passingBothThresholds: number
  awaitingHumanReview: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function ratio(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return 0
  return Math.max(0, Math.min(1, numerator / denominator))
}

function stageRatio(stages: StageQualityEvidence[], predicate: (s: StageQualityEvidence) => boolean): number {
  return ratio(stages.filter(predicate).length, stages.length)
}

function round1(value: number): number {
  return Math.round(value * 10) / 10
}

function component(
  key: string,
  label: string,
  max: number,
  fraction: number,
  evidence: string,
  humanReview = false,
): ScoreComponent {
  return { key, label, score: round1(max * Math.max(0, Math.min(1, fraction))), max, evidence, humanReview }
}

// ─────────────────────────────────────────────────────────────────────────────
// A. Curriculum readiness (100 points)
// ─────────────────────────────────────────────────────────────────────────────

export function scoreCurriculumReadiness(track: TrackQualityEvidence): QualityScore {
  const stages = track.stages

  // 1. Learning outcomes, coverage and instructional sequence — 15
  const authoredPlanRatio = stageRatio(stages, (s) => s.hasAuthoredPlan)
  const objectiveRatio = stageRatio(stages, (s) => s.hasObjective && s.topicCount > 0)
  const components: ScoreComponent[] = [
    component(
      'outcomes',
      'Learning outcomes, coverage and instructional sequence',
      15,
      0.6 * authoredPlanRatio + 0.4 * objectiveRatio,
      `${Math.round(authoredPlanRatio * 100)}% of stages have an authored plan; ${Math.round(objectiveRatio * 100)}% state an objective with topics.`,
      true,
    ),

    // 2. Accuracy, depth and usefulness of instructional content — 15
    component(
      'instruction',
      'Accuracy, depth and usefulness of instructional content',
      15,
      0.4 * stageRatio(stages, (s) => s.instructionChars >= MIN_INSTRUCTION_CHARS) +
        0.3 * stageRatio(stages, (s) => s.hasWorkedExample) +
        0.3 * stageRatio(stages, (s) => s.hasCommonMistakes),
      `${stageRatio(stages, (s) => s.instructionChars >= MIN_INSTRUCTION_CHARS) * 100 | 0}% of stages have >= ${MIN_INSTRUCTION_CHARS} chars of instruction; worked examples ${Math.round(stageRatio(stages, (s) => s.hasWorkedExample) * 100)}%; common mistakes ${Math.round(stageRatio(stages, (s) => s.hasCommonMistakes) * 100)}%.`,
      true,
    ),

    // 3. Learning resources — 10
    //    A stage only earns the content-verification share when a required
    //    resource's actual content was inspected (level 3 with contentEvidence).
    //    Metadata-only reachability is a smaller, separate share.
    component(
      'resources',
      'Relevant, usable and verified learning resources',
      10,
      0.55 * stageRatio(stages, (s) => s.verifiedResourceCount > 0) +
        0.2 * stageRatio(stages, (s) => s.reachableResourceCount > 0) +
        0.15 *
          ratio(
            stages.reduce((n, s) => n + s.verifiedResourceCount, 0),
            stages.reduce((n, s) => n + Math.max(s.resourceCount, 1), 0),
          ) +
        0.1 * stageRatio(stages, (s) => (s.matchedResourceCount ?? 0) > 0),
      `${stageRatio(stages, (s) => s.verifiedResourceCount > 0) * 100 | 0}% of stages have a required content-inspected (level >= 3) resource; ` +
        `${stageRatio(stages, (s) => s.reachableResourceCount > 0) * 100 | 0}% have a reachable destination; ` +
        `${stageRatio(stages, (s) => (s.matchedResourceCount ?? 0) > 0) * 100 | 0}% have content whose vocabulary matches the objective.`,
      true,
    ),

    // 4. Knowledge tests and section-level assessment coverage — 15
    component(
      'knowledgeChecks',
      'Knowledge tests and section-level assessment coverage',
      15,
      0.5 * stageRatio(stages, (s) => s.quizQuestionCount >= MIN_QUIZ_QUESTIONS) +
        0.25 * ratio(
          stages.reduce((n, s) => n + s.validQuizQuestionCount, 0),
          stages.reduce((n, s) => n + s.quizQuestionCount, 0),
        ) +
        0.25 * stageRatio(stages, (s) => s.quizAuthored),
      `${stageRatio(stages, (s) => s.quizQuestionCount >= MIN_QUIZ_QUESTIONS) * 100 | 0}% of stages have >= ${MIN_QUIZ_QUESTIONS} questions; authored ${Math.round(stageRatio(stages, (s) => s.quizAuthored) * 100)}%.`,
      true,
    ),

    // 5. Practical assignments and phase-project coverage — 15
    component(
      'practical',
      'Practical assignments and phase-project coverage',
      15,
      0.7 * stageRatio(stages, (s) => s.projectAiAssessable) + 0.3 * stageRatio(stages, (s) => s.projectHasBrief),
      `${stageRatio(stages, (s) => s.projectAiAssessable) * 100 | 0}% of stages have an AI-assessable project.`,
    ),

    // 6. AI verification, rubric quality and evidence validation — 15
    component(
      'aiVerification',
      'AI verification, rubric quality and evidence validation',
      15,
      0.7 * stageRatio(stages, (s) => s.projectAiAssessable && s.projectMandatoryCriteria > 0) +
        0.3 * stageRatio(stages, (s) => s.projectRubricCriteria > 0),
      `${stageRatio(stages, (s) => s.projectAiAssessable && s.projectMandatoryCriteria > 0) * 100 | 0}% of stages have an AI-verified mastery gate with mandatory rubric criteria.`,
    ),

    // 7. Progression gates, remediation and saved results — 10
    component(
      'progression',
      'Progression gates, remediation and saved assessment results',
      10,
      0.4 * (track.progression.serverValidated ? 1 : 0) +
        0.25 * (track.progression.clientCanForgePass ? 0 : 1) +
        0.2 * (track.progression.retrySupported ? 1 : 0) +
        0.15 * (track.progression.retryHistoryPersisted ? 1 : 0),
      `${track.progression.serverValidated ? 'Server-validated' : 'Not server-validated'}; ${track.progression.clientCanForgePass ? 'client can forge state' : 'no client forgery path'}; retry ${track.progression.retrySupported ? 'supported' : 'missing'}; history ${track.progression.retryHistoryPersisted ? 'retained' : 'not retained'}.`,
    ),

    // 8. Accessibility, clarity and learner-facing explanations — 5
    component(
      'accessibility',
      'Accessibility, clarity and learner-facing explanations',
      5,
      0.5 * stageRatio(stages, (s) => s.instructionChars >= MIN_INSTRUCTION_CHARS) +
        0.5 * (track.progression.failureFeedbackProvided ? 1 : 0),
      'Mechanical proxy only; instructional clarity and accessibility need human review.',
      true,
    ),
  ]

  return finalize(components)
}

// ─────────────────────────────────────────────────────────────────────────────
// B. Premium worthiness (100 points)
// ─────────────────────────────────────────────────────────────────────────────

export function scorePremiumWorthiness(track: TrackQualityEvidence): QualityScore {
  const stages = track.stages
  const projectCoverage = stageRatio(stages, (s) => s.projectAiAssessable)
  const briefCoverage = stageRatio(stages, (s) => s.projectHasBrief)

  const components: ScoreComponent[] = [
    // 1. Coherent skill progression and demonstrable outcomes — 15
    component(
      'progressionOutcomes',
      'Coherent skill progression and demonstrable outcomes',
      15,
      0.6 * stageRatio(stages, (s) => s.hasAuthoredPlan && s.hasObjective) + 0.4 * (track.portfolioVerified ? 1 : 0),
      `${Math.round(stageRatio(stages, (s) => s.hasAuthoredPlan && s.hasObjective) * 100)}% of stages have an authored outcome; portfolio ${track.portfolioVerified ? 'verified' : 'not verified'}.`,
      true,
    ),

    // 2. Curriculum depth, correctness and practical coverage — 15
    component(
      'depth',
      'Curriculum depth, correctness and practical coverage',
      15,
      0.35 * stageRatio(stages, (s) => s.instructionChars >= MIN_INSTRUCTION_CHARS) +
        0.25 * stageRatio(stages, (s) => s.hasWorkedExample) +
        0.2 * stageRatio(stages, (s) => s.hasExercise) +
        0.2 * stageRatio(stages, (s) => s.topicCount >= 3),
      'Depth proxy; technical correctness requires expert human review.',
      true,
    ),

    // 3. Quality and usefulness of instructional resources — 10
    component(
      'resourceQuality',
      'Quality and usefulness of instructional resources',
      10,
      0.5 * stageRatio(stages, (s) => s.verifiedResourceCount > 0) +
        0.3 *
          ratio(
            stages.reduce((n, s) => n + s.verifiedResourceCount, 0),
            stages.reduce((n, s) => n + Math.max(s.resourceCount, 1), 0),
          ) +
        0.2 * stageRatio(stages, (s) => (s.matchedResourceCount ?? 0) > 0),
      `${stageRatio(stages, (s) => s.verifiedResourceCount > 0) * 100 | 0}% of stages have a required content-inspected resource; ` +
        `${stageRatio(stages, (s) => (s.matchedResourceCount ?? 0) > 0) * 100 | 0}% have content matching the objective.`,
      true,
    ),

    // 4. Knowledge tests that genuinely establish understanding — 15
    component(
      'knowledgeTests',
      'Knowledge tests that genuinely establish understanding',
      15,
      0.4 * stageRatio(stages, (s) => s.quizQuestionCount >= MIN_QUIZ_QUESTIONS) +
        0.35 * ratio(
          stages.reduce((n, s) => n + s.validQuizQuestionCount, 0),
          stages.reduce((n, s) => n + s.quizQuestionCount, 0),
        ) +
        0.25 * stageRatio(stages, (s) => s.quizAuthored),
      'Question quality (plausible distractors, non-trivial reasoning) needs human review.',
      true,
    ),

    // 5. Meaningful practical assignments and phase projects — 15
    component(
      'practicalProjects',
      'Meaningful practical assignments and phase projects',
      15,
      0.6 * projectCoverage + 0.4 * briefCoverage,
      `${Math.round(projectCoverage * 100)}% of stages have an AI-assessable project; ${Math.round(briefCoverage * 100)}% have an authored brief.`,
    ),

    // 6. Reliable AI-verified mastery and evidence-based feedback — 20
    component(
      'aiVerifiedMastery',
      'Reliable AI-verified mastery and evidence-based feedback',
      20,
      0.7 * stageRatio(stages, (s) => s.projectAiAssessable && s.projectMandatoryCriteria > 0) +
        0.3 * (track.progression.resultsPersisted && track.progression.retryHistoryPersisted ? 1 : 0),
      `${stageRatio(stages, (s) => s.projectAiAssessable && s.projectMandatoryCriteria > 0) * 100 | 0}% of stages have an AI-verified mastery gate; results ${track.progression.resultsPersisted ? 'persisted' : 'not persisted'}.`,
    ),

    // 7. Portfolio, capstone or demonstrated outcomes — 10
    component(
      'portfolio',
      'Portfolio, capstone or other demonstrated outcomes',
      10,
      0.6 * (track.portfolioVerified ? 1 : 0) + 0.4 * stageRatio(stages, (s) => s.projectHasBrief),
      `Portfolio project ${track.portfolioVerified ? 'verified' : 'not verified'}.`,
    ),
  ]

  return finalize(components)
}

function finalize(components: ScoreComponent[]): QualityScore {
  const total = round1(components.reduce((sum, c) => sum + c.score, 0))
  return {
    total,
    max: 100,
    components,
    humanReviewRequired: components.some((c) => c.humanReview),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Mandatory gates
// ─────────────────────────────────────────────────────────────────────────────

export function evaluateMandatoryGates(track: TrackQualityEvidence): MandatoryGate[] {
  const stages = track.stages
  const total = stages.length

  const missingInstruction = stages.filter(
    (s) => !s.hasAuthoredPlan || !s.hasObjective || s.instructionChars < MIN_INSTRUCTION_CHARS,
  )
  const missingResources = stages.filter((s) => s.verifiedResourceCount === 0)
  const missingQuiz = stages.filter((s) => s.quizQuestionCount < MIN_QUIZ_QUESTIONS || s.validQuizQuestionCount < s.quizQuestionCount)
  const missingMastery = stages.filter((s) => !(s.projectAiAssessable && s.projectMandatoryCriteria > 0))
  const missingProject = stages.filter((s) => !s.projectId || !s.projectAiAssessable)
  const missingRubric = stages.filter((s) => s.projectId && (s.projectRubricCriteria <= 0 || s.projectMandatoryCriteria <= 0))

  return [
    {
      key: 'instruction',
      label: 'Complete, coherent instruction for every section',
      passed: total > 0 && missingInstruction.length === 0,
      detail: total === 0
        ? 'Track has no stages.'
        : `${missingInstruction.length}/${total} stages lack an objective or >= ${MIN_INSTRUCTION_CHARS} chars of instruction.`,
    },
    {
      key: 'resources',
      label: 'Appropriate, content-verified learning resources for every phase',
      passed: total > 0 && missingResources.length === 0,
      detail: `${missingResources.length}/${total} stages have no content-verified (level >= 3) mapped resource.`,
    },
    {
      key: 'knowledgeTest',
      label: 'A working knowledge test for every progression-bearing section',
      passed: total > 0 && missingQuiz.length === 0,
      detail: `${missingQuiz.length}/${total} stages lack >= ${MIN_QUIZ_QUESTIONS} valid knowledge-check questions.`,
    },
    {
      key: 'aiMastery',
      label: 'A functioning AI-verified mastery assessment for every section',
      passed: total > 0 && missingMastery.length === 0,
      detail: `${missingMastery.length}/${total} stages have no AI-verified mastery gate with mandatory rubric criteria.`,
    },
    {
      key: 'phaseProject',
      label: 'An appropriate practical project for every phase',
      passed: total > 0 && missingProject.length === 0,
      detail: `${missingProject.length}/${total} stages have no embedded, AI-assessable project.`,
    },
    {
      key: 'rubric',
      label: 'A documented assessment rubric and clear passing requirements',
      passed: total > 0 && missingRubric.length === 0,
      detail: `${missingRubric.length}/${total} project steps lack a rubric with mandatory criteria.`,
    },
    {
      key: 'serverValidation',
      label: 'Secure server-side validation of progression',
      passed: track.progression.serverValidated && !track.progression.clientCanForgePass,
      detail: track.progression.clientCanForgePass
        ? 'A client can forge progression/assessment state (bypass).'
        : track.progression.serverValidated
          ? 'Progression is decided server-side.'
          : 'Progression is not server-validated.',
    },
    {
      key: 'remediation',
      label: 'Useful failure feedback and a path to remediate and retry',
      passed: track.progression.retrySupported && track.progression.failureFeedbackProvided,
      detail: `Retry ${track.progression.retrySupported ? 'supported' : 'missing'}; actionable failure feedback ${track.progression.failureFeedbackProvided ? 'provided' : 'missing'}.`,
    },
    {
      key: 'progressRecovery',
      label: 'Correct recording and recovery of learner progress',
      passed: track.progression.resultsPersisted && track.progression.retryHistoryPersisted,
      detail: `Results ${track.progression.resultsPersisted ? 'persisted' : 'not persisted'}; attempt history ${track.progression.retryHistoryPersisted ? 'retained' : 'not retained'}.`,
    },
    {
      key: 'noBypass',
      label: 'No assessment can be bypassed to unlock the next section',
      passed: !track.progression.clientCanForgePass,
      detail: track.progression.clientCanForgePass
        ? 'An assessment can be bypassed without meeting the mastery conditions.'
        : 'No bypass path detected.',
    },
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// Assessment + catalogue summary
// ─────────────────────────────────────────────────────────────────────────────

export function assessTrackQuality(track: TrackQualityEvidence): TrackQualityAssessment {
  const curriculumReadiness = scoreCurriculumReadiness(track)
  const premiumWorthiness = scorePremiumWorthiness(track)
  const gates = evaluateMandatoryGates(track)
  const gatesPassed = gates.every((g) => g.passed)
  const premiumEligible =
    curriculumReadiness.total >= PREMIUM_MIN_DIMENSION_SCORE &&
    premiumWorthiness.total >= PREMIUM_MIN_DIMENSION_SCORE &&
    gatesPassed

  const humanReview: MandatoryGate = {
    key: 'humanQualityReview',
    label: 'Subject-matter expert review of instructional quality',
    passed: track.humanReviewSignedOff === true,
    detail:
      track.humanReviewSignedOff === true
        ? 'Instructional quality signed off by a subject-matter expert.'
        : 'Awaiting human review of correctness, depth, accessibility and question quality (automated checks cannot establish this).',
  }

  return {
    trackId: track.id,
    name: track.name,
    slug: track.slug,
    category: track.category,
    stageCount: track.stages.length,
    curriculumReadiness,
    premiumWorthiness,
    gates,
    gatesPassed,
    premiumEligible,
    humanReview,
    premiumApproved: premiumEligible && humanReview.passed,
    failingGates: gates.filter((g) => !g.passed).map((g) => g.key),
  }
}

export function summarizeCatalogue(assessments: TrackQualityAssessment[]): CatalogueQualitySummary {
  return {
    tracks: assessments.length,
    premiumEligible: assessments.filter((a) => a.premiumEligible).length,
    premiumApproved: assessments.filter((a) => a.premiumApproved).length,
    failingReadiness: assessments.filter((a) => a.curriculumReadiness.total < PREMIUM_MIN_DIMENSION_SCORE).length,
    failingWorthiness: assessments.filter((a) => a.premiumWorthiness.total < PREMIUM_MIN_DIMENSION_SCORE).length,
    blockedByGates: assessments.filter((a) => !a.gatesPassed).length,
    passingBothThresholds: assessments.filter(
      (a) => a.curriculumReadiness.total >= PREMIUM_MIN_DIMENSION_SCORE && a.premiumWorthiness.total >= PREMIUM_MIN_DIMENSION_SCORE,
    ).length,
    awaitingHumanReview: assessments.filter((a) => a.premiumEligible && !a.humanReview.passed).length,
  }
}

/**
 * Premium eligibility for a configured candidate set. A candidate that is not
 * present in the evidence, or that fails any threshold/gate, is reported as
 * ineligible — a configured allowlist can never override course-quality
 * evidence.
 *
 * With `requireSignoff` (release mode) a candidate must also have its human
 * quality review signed off before it counts as eligible.
 */
export function evaluatePremiumCandidates(
  candidateIds: string[],
  assessments: TrackQualityAssessment[],
  requireSignoff = false,
): { candidateId: string; eligible: boolean; reason: string }[] {
  const byId = new Map(assessments.map((a) => [a.trackId, a]))
  return candidateIds.map((id) => {
    const assessment = byId.get(id)
    if (!assessment) return { candidateId: id, eligible: false, reason: 'no curriculum-quality evidence' }
    if (!assessment.gatesPassed) {
      return { candidateId: id, eligible: false, reason: `failed mandatory gates: ${assessment.failingGates.join(', ')}` }
    }
    if (assessment.curriculumReadiness.total < PREMIUM_MIN_DIMENSION_SCORE) {
      return { candidateId: id, eligible: false, reason: `curriculum readiness ${assessment.curriculumReadiness.total} < ${PREMIUM_MIN_DIMENSION_SCORE}` }
    }
    if (assessment.premiumWorthiness.total < PREMIUM_MIN_DIMENSION_SCORE) {
      return { candidateId: id, eligible: false, reason: `premium worthiness ${assessment.premiumWorthiness.total} < ${PREMIUM_MIN_DIMENSION_SCORE}` }
    }
    if (requireSignoff && !assessment.humanReview.passed) {
      return { candidateId: id, eligible: false, reason: 'awaiting subject-matter expert sign-off (human review)' }
    }
    return { candidateId: id, eligible: true, reason: 'meets both thresholds and all mandatory gates' }
  })
}
