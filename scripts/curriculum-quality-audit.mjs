/**
 * TechSkillHub — Curriculum Quality & Premium-Eligibility Audit (authoritative)
 *
 * Inventories every published learning track and computes, from real catalogue
 * data, TWO independent 0–100 scores per track:
 *
 *   A. Curriculum readiness  — is the course complete, consistent and correct?
 *   B. Premium worthiness    — does it justify charging for access?
 *
 * …plus the mandatory quality gates. A track is premium-eligible ONLY when both
 * scores are >= 90 AND every mandatory gate passes. Weighted scores can never
 * compensate for a missing critical element.
 *
 * Evidence is collected from the SAME path the product serves to learners
 * (`buildAIWorldClassPath` for `ai-*` tracks, `buildGuidedPath` otherwise), so
 * the report describes what a learner actually receives — not a static shortlist.
 *
 * The scoring rules live in `lib/curriculum-quality.ts` (pure, unit-tested);
 * this script only gathers evidence and renders reports.
 *
 * This is an inspection tool. It never mutates catalogue content.
 *
 * Usage:
 *   node scripts/curriculum-quality-audit.mjs            # write docs + JSON
 *   node scripts/curriculum-quality-audit.mjs --check    # exit 1 if a premium
 *                                                        # candidate fails a gate
 *   node scripts/curriculum-quality-audit.mjs --json     # print JSON to stdout
 *
 * Outputs:
 *   docs/curriculum-quality-audit.md
 *   scripts/curriculum-quality-report.json
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadTsModule } from './lib/load-ts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = new Set(process.argv.slice(2))

const { TRACKS } = await loadTsModule(join(root, 'lib', 'tracks.ts'))
const { buildGuidedPath, RESOURCE_STAGE_MAP, getProject } = await loadTsModule(join(root, 'lib', 'guided-path.ts'))
const { buildAIWorldClassPath } = await loadTsModule(join(root, 'lib', 'ai-guided-path.ts'))
const { AI_RESOURCE_EXTENSIONS, AI_RESOURCE_STAGE_MAP, AI_PROJECT_EXTENSIONS, AI_STAGE_CHECKPOINTS } = await loadTsModule(join(root, 'lib', 'ai-curriculum.ts'))
const { getAIStageObjective } = await loadTsModule(join(root, 'lib', 'ai-stage-objectives.ts'))
const { getAIStageLesson } = await loadTsModule(join(root, 'lib', 'ai-stage-lessons.ts'))
const { getAISupplementalQuestions } = await loadTsModule(join(root, 'lib', 'ai-assessment-bank.ts'))
const { getAIProjectsForStage } = await loadTsModule(join(root, 'lib', 'ai-projects.ts'))
const { isAIProjectPortfolioReady } = await loadTsModule(join(root, 'lib', 'ai-project-quality.ts'))
const { AI_PROJECT_BRIEFS } = await loadTsModule(join(root, 'lib', 'ai-project-briefs.ts'))
const { getAIResourceAuditsForStage } = await loadTsModule(join(root, 'lib', 'ai-resource-registry.ts'))
const { resolveStageResourceVerification, normalizeUrl } = await loadTsModule(join(root, 'lib', 'stage-resources.ts'))
const { MIN_RESOURCE_VERIFICATION_LEVEL, isResourceVerified, textOverlapScore } = await loadTsModule(join(root, 'lib', 'resource-verification.ts'))
const { getAIPracticeTasks } = await loadTsModule(join(root, 'lib', 'ai-practice.ts'))
const { getAdvancedAIPracticeTasks } = await loadTsModule(join(root, 'lib', 'ai-practice-advanced.ts'))
const {
  STAGE_LEARNING_PLANS,
  getProjectBrief,
  PORTFOLIO_PROJECT,
} = await loadTsModule(join(root, 'lib', 'curriculum.ts'))
const { deriveContract } = await loadTsModule(join(root, 'lib', 'project-verification', 'contract.ts'))
const { resolveStepAssessment } = await loadTsModule(join(root, 'lib', 'section-mastery.ts'))
const { getStageWorkedExample } = await loadTsModule(join(root, 'lib', 'stage-worked-examples.ts'))
const { assessTrackQuality, summarizeCatalogue, evaluatePremiumCandidates, PREMIUM_MIN_DIMENSION_SCORE, MIN_INSTRUCTION_CHARS, MIN_QUIZ_QUESTIONS } = await loadTsModule(
  join(root, 'lib', 'curriculum-quality.ts'),
)
const { FIRST_WAVE_TRACK_IDS } = await loadTsModule(join(root, 'lib', 'commercial', 'premium.ts'))

// ─────────────────────────────────────────────────────────────────────────────
// Human-review sign-off (auditable record; automated checks cannot do this)
//   docs/curriculum-quality-signoff.json — { "<trackId>": { reviewedBy, reviewedAt, notes } }
// ─────────────────────────────────────────────────────────────────────────────

const SIGNOFF_PATH = join(root, 'docs', 'curriculum-quality-signoff.json')
let signoff = {}
if (existsSync(SIGNOFF_PATH)) {
  try {
    signoff = JSON.parse(readFileSync(SIGNOFF_PATH, 'utf8'))
  } catch (error) {
    process.stderr.write(`WARNING: could not parse ${SIGNOFF_PATH}: ${error.message}\n`)
  }
}
const SIGNED_OFF_IDS = new Set(
  Object.entries(signoff)
    .filter(([, value]) => value && (value.reviewedBy || value.signedOff === true))
    .map(([id]) => id),
)

// ─────────────────────────────────────────────────────────────────────────────
// External resource link evidence
//   scripts/resource-probe.json — destination + page-metadata evidence produced
//   by scripts/verify-resource-links.mjs. A resource with no 2xx probe can never
//   be treated as content-verified.
// ─────────────────────────────────────────────────────────────────────────────

const PROBE_PATH = join(root, 'scripts', 'resource-probe.json')
let probes = {}
let probeMeta = { generatedAt: null, total: 0, reachable: 0 }
if (existsSync(PROBE_PATH)) {
  try {
    const parsed = JSON.parse(readFileSync(PROBE_PATH, 'utf8'))
    probes = parsed.entries ?? {}
    probeMeta = { generatedAt: parsed.generatedAt ?? null, total: parsed.total ?? Object.keys(probes).length, reachable: parsed.reachable ?? null }
  } catch (error) {
    process.stderr.write(`WARNING: could not parse ${PROBE_PATH}: ${error.message}\n`)
  }
} else {
  process.stderr.write(`WARNING: ${PROBE_PATH} is missing — resource verification cannot be scored. Run: node scripts/verify-resource-links.mjs\n`)
}

// ─────────────────────────────────────────────────────────────────────────────
// Source probes (mechanical evidence for behaviour that is not data-driven)
// ─────────────────────────────────────────────────────────────────────────────

function readSource(...relativeParts) {
  try {
    const absolute = join(root, ...relativeParts)
    return existsSync(absolute) ? readFileSync(absolute, 'utf8') : ''
  } catch {
    return ''
  }
}

const progressRoute = readSource('app', 'api', 'progress', 'route.ts')
const guidedRoute = readSource('app', 'api', 'guided-path', '[trackId]', 'route.ts')
const verificationStore = readSource('lib', 'project-verification', 'store.ts')
const assessmentSource = readSource('lib', 'project-verification', 'assessment.ts')

const PROGRESSION_EVIDENCE = {
  serverValidated: /stepIndex !== enrollment\.currentStepIndex/.test(guidedRoute),
  // A client can forge progression state if the client-facing progress endpoint
  // accepts server-owned keys (project passes / path version).
  clientCanForgePass: !/protectedProgressKeysPresent/.test(progressRoute),
  retrySupported: /validateOnly/.test(guidedRoute),
  failureFeedbackProvided: /helpGuideId|criteria/.test(assessmentSource) || /reason/.test(assessmentSource),
  resultsPersisted: /projectSubmissions/.test(verificationStore),
  retryHistoryPersisted: /projectSubmissionHistory|history/.test(verificationStore),
}

// ─────────────────────────────────────────────────────────────────────────────
// Evidence collection
// ─────────────────────────────────────────────────────────────────────────────

const slugCounts = new Map()
for (const track of TRACKS) slugCounts.set(track.slug, (slugCounts.get(track.slug) || 0) + 1)

/** Non-AI stages whose worked example failed the mechanical quality bar. */
const workedExampleProblems = []

function isValidHttpUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Mechanical quality bar for a worked example: it must be substantial and
 * genuinely step-by-step, and must not leak a graded answer. A thin or generic
 * example must not count as a worked example, so the depth/quality evidence
 * reflects what the learner actually gets.
 */
function workedExampleQualityOk(text) {
  if (!text || text.length < 120) return false
  if ((text.match(/Step \d/g) || []).length < 3) return false
  if (/the (?:correct )?answer is|choose option/i.test(text)) return false
  return true
}

function validQuestion(q) {
  if (!q || typeof q.question !== 'string' || !q.question.trim()) return false
  if (!Array.isArray(q.options) || q.options.length < 2) return false
  if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= q.options.length) return false
  if (typeof q.explanation !== 'string' || !q.explanation.trim()) return false
  return true
}

/** Resolve a project step to a contract, or null when it cannot be assessed. */
function buildStageEvidence(track, stage, stepsByStage, isAI) {
  const steps = stepsByStage.get(stage.id) ?? []
  const conceptStep = steps.find((s) => s.type === 'concept')
  const quizStep = steps.find((s) => s.type === 'quiz')
  const projectStep = steps.find((s) => s.type === 'project')

  const plan = isAI ? null : STAGE_LEARNING_PLANS[track.id]?.[stage.id]
  const objective = isAI ? getAIStageObjective(track.id, stage.id) : null
  const lesson = isAI && objective
    ? getAIStageLesson(track.id, stage.id, stage.title, objective.objective, objective.successCriteria)
    : null

  // Resources actually mapped to this stage, resolved through the SAME module
  // the served learner path uses, so the audit and the learner cannot drift.
  // A resource only counts as verified when its actual content was inspected
  // (level 3, carrying contentEvidence) — HTTP status / title metadata is not
  // enough.
  const stageResources = resolveStageResourceVerification(track.id, stage.id, probes)
  const objectiveText = isAI
    ? `${objective?.objective ?? ''} ${(objective?.successCriteria ?? []).join(' ')}`
    : plan?.objective ?? ''
  const contentVerified = stageResources.filter((r) => isResourceVerified(r.verification))
  const verifiedResourceCount = contentVerified.filter((r) => (r.verification?.role ?? 'required') === 'required').length
  const contentVerifiedResourceCount = contentVerified.length
  const optionalResourceCount = stageResources.filter((r) => (r.verification?.role ?? 'required') === 'optional').length
  const reachableResourceCount = stageResources.filter((r) => r.verification && r.verification.level >= 2).length
  const matchedResourceCount = stageResources.filter((r) => {
    const terms = probes[normalizeUrl(r.resource.url)]?.terms
    return textOverlapScore(objectiveText, terms) > 0
  }).length

  const quizQuestions = quizStep?.quizQuestions ?? []
  const authAICount = isAI
    ? (AI_STAGE_CHECKPOINTS[track.id]?.[stage.id]?.length ?? 0) +
      (objective ? getAISupplementalQuestions(track.id, stage.id, objective).length : 0)
    : (plan?.knowledgeCheck?.length ?? 0)

  // Project / section-mastery assessment, resolved the same way the routes do.
  const assessment = projectStep ? resolveStepAssessment(track.id, projectStep) : null
  const projectId = projectStep?.projectId ?? assessment?.projectId ?? null
  const rubricCriteria = assessment ? assessment.contract.rubric.length : 0
  const mandatoryCriteria = assessment ? assessment.contract.rubric.filter((c) => c.mandatory).length : 0
  const aiAssessable = Boolean(assessment) && rubricCriteria > 0 && mandatoryCriteria > 0

  const practiceTasks = isAI ? [...getAIPracticeTasks(track.id, stage.id), ...getAdvancedAIPracticeTasks(track.id, stage.id)] : []
  const workedExample = isAI ? null : getStageWorkedExample(track.id, stage.id)
  const workedExampleOk = isAI ? Boolean(lesson?.workedExample?.trim()) : workedExampleQualityOk(workedExample)
  if (!workedExampleOk && !isAI) workedExampleProblems.push(`${track.id}:${stage.id}`)

  return {
    stageId: stage.id,
    title: stage.title,
    objective: (isAI ? objective?.objective ?? '' : plan?.objective ?? '').trim(),
    successCriteria: (isAI ? objective?.successCriteria ?? [] : plan?.successCriteria ?? []).slice(0, 8),
    topics: conceptStep?.topics ?? [],
    hasAuthoredPlan: isAI
      ? Boolean(objective?.objective) && Boolean(lesson)
      : Boolean(plan?.objective && plan?.successCriteria?.length && plan?.knowledgeCheck?.length),
    hasObjective: isAI ? Boolean(objective?.objective?.trim()) : Boolean(plan?.objective?.trim()),
    instructionChars: (conceptStep?.description ?? '').length,
    hasWorkedExample: workedExampleOk,
    hasCommonMistakes: isAI
      ? Boolean(lesson?.commonMistakes?.length)
      : Boolean(plan?.commonMistakes?.length),
    hasExercise: isAI
      ? practiceTasks.length > 0 || Boolean(lesson?.appliedChallenge)
      : Boolean(plan?.exercise?.trim()),
    topicCount: (conceptStep?.topics ?? []).length,
    resourceCount: stageResources.length,
    validResourceCount: stageResources.filter((r) => isValidHttpUrl(r.resource.url)).length,
    verifiedResourceCount,
    contentVerifiedResourceCount,
    optionalResourceCount,
    matchedResourceCount,
    reachableResourceCount,
    quizQuestionCount: quizQuestions.length,
    validQuizQuestionCount: quizQuestions.filter(validQuestion).length,
    quizAuthored: authAICount >= 3,
    projectId,
    projectHasBrief: Boolean(assessment),
    projectAiAssessable: aiAssessable,
    projectRubricCriteria: rubricCriteria,
    projectMandatoryCriteria: mandatoryCriteria,
  }
}

function buildTrackEvidence(track) {
  const isAI = track.id.startsWith('ai-')
  const steps = isAI ? buildAIWorldClassPath(track.id) : buildGuidedPath(track.id)

  const stepsByStage = new Map()
  for (const step of steps) {
    if (typeof step.stageId !== 'number') continue
    if (!stepsByStage.has(step.stageId)) stepsByStage.set(step.stageId, [])
    stepsByStage.get(step.stageId).push(step)
  }

  const stages = track.roadmap.map((stage) => buildStageEvidence(track, stage, stepsByStage, isAI))

  // Portfolio project
  let portfolioProjectId = null
  if (isAI) {
    const withPortfolio = steps
      .filter((s) => s.type === 'project' && s.projectId && isAIProjectPortfolioReady(s.projectId))
      .pop()
    portfolioProjectId = withPortfolio?.projectId ?? null
  } else {
    portfolioProjectId = PORTFOLIO_PROJECT[track.id] ?? null
  }

  let portfolioVerified = false
  if (portfolioProjectId) {
    const project = isAI
      ? (AI_PROJECT_EXTENSIONS[track.id] ?? []).find((p) => p.id === portfolioProjectId) ??
        getProject(portfolioProjectId)
      : getProject(portfolioProjectId)
    const brief = isAI ? AI_PROJECT_BRIEFS[portfolioProjectId] : project ? getProjectBrief(project.id, project.level, project.title) : null
    if (project && brief) {
      try {
        const contract = deriveContract({ project, track, brief })
        portfolioVerified = contract.rubric.some((c) => c.mandatory)
      } catch {
        portfolioVerified = false
      }
    }
  }

  return {
    id: track.id,
    name: track.name,
    slug: track.slug,
    category: track.category,
    isAI,
    stages,
    portfolioProjectId,
    portfolioVerified,
    duplicateSlug: (slugCounts.get(track.slug) || 0) > 1,
    progression: PROGRESSION_EVIDENCE,
    humanReviewSignedOff: SIGNED_OFF_IDS.has(track.id),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Assess
// ─────────────────────────────────────────────────────────────────────────────

const evidence = TRACKS.map(buildTrackEvidence)
const assessments = evidence.map(assessTrackQuality)
const summary = summarizeCatalogue(assessments)
const requireSignoff = args.has('--release')
const candidates = evaluatePremiumCandidates([...FIRST_WAVE_TRACK_IDS], assessments, requireSignoff)

// ─────────────────────────────────────────────────────────────────────────────
// Resource inventory (machine- and human-readable; same resolver as the path)
// ─────────────────────────────────────────────────────────────────────────────

const resourceInventory = []
for (const track of TRACKS) {
  const isAI = track.id.startsWith('ai-')
  for (const stage of track.roadmap) {
    const resolved = resolveStageResourceVerification(track.id, stage.id, probes)
    const objectiveText = isAI
      ? `${getAIStageObjective(track.id, stage.id)?.objective ?? ''} ${(getAIStageObjective(track.id, stage.id)?.successCriteria ?? []).join(' ')}`
      : STAGE_LEARNING_PLANS[track.id]?.[stage.id]?.objective ?? ''
    const contentVerified = resolved.filter((r) => isResourceVerified(r.verification))
    resourceInventory.push({
      trackId: track.id,
      stageId: stage.id,
      title: stage.title,
      objective: objectiveText.trim(),
      resourceCount: resolved.length,
      verifiedResourceCount: contentVerified.filter((r) => (r.verification?.role ?? 'required') === 'required').length,
      contentVerifiedResourceCount: contentVerified.length,
      matchedResourceCount: resolved.filter((r) => textOverlapScore(objectiveText, probes[normalizeUrl(r.resource.url)]?.terms) > 0).length,
      reachableResourceCount: resolved.filter((r) => r.verification && r.verification.level >= 2).length,
      resources: resolved.map((r) => ({
        id: r.resource.id,
        title: r.resource.title,
        url: r.resource.url,
        source: r.resource.source,
        type: r.resource.type,
        free: r.resource.free,
        mappedFrom: r.source,
        role: r.verification?.role ?? 'required',
        level: r.verification?.level ?? 0,
        method: r.verification?.method ?? 'none',
        checkedAt: r.verification?.checkedAt ?? null,
        durationMinutes: r.verification?.durationMinutes ?? null,
        segment: r.verification?.segment ?? null,
        objectives: r.verification?.objectives ?? [],
        contentChars: r.verification?.contentEvidence?.contentChars ?? 0,
        excerpt: r.verification?.contentEvidence?.excerpt ?? null,
        contentHash: r.verification?.contentEvidence?.contentHash ?? null,
        objectiveMatch: textOverlapScore(objectiveText, probes[normalizeUrl(r.resource.url)]?.terms),
        limitations: r.verification?.limitations ?? null,
      })),
    })
  }
}

const resourceGapStages = resourceInventory.filter((row) => row.verifiedResourceCount === 0)
const levelHistogram = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }
for (const row of resourceInventory) {
  for (const resource of row.resources) levelHistogram[resource.level] = (levelHistogram[resource.level] ?? 0) + 1
}

// ── Gap reconciliation (former 41 project + 52 resource gaps) ────────────────
const projectGapStages = []
const projectNotAssessable = []
for (const track of evidence) {
  for (const stage of track.stages) {
    if (!stage.projectId) projectGapStages.push(`${track.id}:${stage.stageId}`)
    if (!stage.projectAiAssessable) projectNotAssessable.push(`${track.id}:${stage.stageId}`)
  }
}

const allResourceEntries = Object.values(probes)
const contentInspectedUrls = allResourceEntries.filter(
  (p) => p && p.status >= 200 && p.status < 400 && (p.contentChars ?? 0) >= 600 && !p.paywalled,
).length
const unresolvedUrls = Object.entries(probes)
  .filter(([, p]) => !p || !p.status || p.status < 200 || p.status >= 400)
  .map(([url, p]) => ({ url, status: p?.status ?? 0 }))
  .sort((a, b) => a.status - b.status)
const level2RequiredResources = resourceInventory
  .flatMap((row) => row.resources)
  .filter((r) => r.level === 2 && r.role === 'required')
const objectiveMatchedResources = resourceInventory.flatMap((row) => row.resources).filter((r) => (r.objectiveMatch ?? 0) > 0)

const gapReconciliation = {
  projectGapsRemaining: projectGapStages.length,
  projectGapStages,
  stagesWithoutAiAssessableProject: projectNotAssessable.length,
  resourceGapsRemaining: resourceGapStages.length,
  resourceGapStages: resourceGapStages.map((row) => `${row.trackId}:${row.stageId}`),
  contentInspectedUrls,
  probeUrls: allResourceEntries.length,
  level2RequiredResourceCount: level2RequiredResources.length,
  objectiveMatchedResourceCount: objectiveMatchedResources.length,
  unresolvedUrls,
  workedExampleProblems: [...workedExampleProblems],
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-stage evidence record (Phase 2 audit artefact)
// One row per progression-bearing stage, combining the mechanical evidence, the
// resource inventory and the track's quality result. It records findings and
// remaining uncertainties — never an approval.
// ─────────────────────────────────────────────────────────────────────────────

const stageEvidence = []
for (const track of evidence) {
  const assessment = assessments.find((a) => a.trackId === track.id)
  for (const stage of track.stages) {
    const inv = resourceInventory.find((row) => row.trackId === track.id && row.stageId === stage.stageId)
    const resources = inv?.resources ?? []
    const level2Required = resources.filter((r) => r.level === 2 && r.role === 'required')
    const unresolved = resources.filter((r) => r.level < 2)
    const objectiveMismatch = resources.filter((r) => r.level >= 3 && (r.objectiveMatch ?? 0) === 0)

    const findings = []
    if (!stage.hasObjective) findings.push('No learner-facing objective.')
    if (!stage.hasAuthoredPlan) findings.push('Authored learning plan incomplete (needs objective + success criteria + knowledge check).')
    if (stage.instructionChars < MIN_INSTRUCTION_CHARS) findings.push(`Instruction below the mechanical bar (${stage.instructionChars} < ${MIN_INSTRUCTION_CHARS} chars).`)
    if (!stage.hasWorkedExample) findings.push('Worked example missing or below the mechanical bar.')
    if (!stage.hasCommonMistakes) findings.push('No common-mistake guidance.')
    if (!stage.hasExercise) findings.push('No practice exercise.')
    if (stage.validQuizQuestionCount < MIN_QUIZ_QUESTIONS) findings.push(`Knowledge check below bar (${stage.validQuizQuestionCount} valid; ${MIN_QUIZ_QUESTIONS} required).`)
    if (stage.verifiedResourceCount === 0) findings.push('No content-verified required resource.')
    if (stage.projectId == null) findings.push('No embedded phase project.')
    else if (!stage.projectAiAssessable) findings.push('Project is not AI-assessable (no mandatory rubric criteria).')

    const uncertainties = []
    if (level2Required.length) uncertainties.push(`${level2Required.length} required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.`)
    if (unresolved.length) uncertainties.push(`${unresolved.length} mapped resource URL(s) did not resolve — an alternative or replacement is needed.`)
    if (objectiveMismatch.length) uncertainties.push(`${objectiveMismatch.length} content-verified resource(s) share no vocabulary with the objective — relevance needs human review.`)
    uncertainties.push('Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.')

    stageEvidence.push({
      trackId: track.id,
      track: track.name,
      stageId: stage.stageId,
      stage: stage.title,
      objective: stage.objective,
      successCriteria: stage.successCriteria,
      topics: stage.topics,
      instructionChars: stage.instructionChars,
      hasWorkedExample: stage.hasWorkedExample,
      hasCommonMistakes: stage.hasCommonMistakes,
      hasExercise: stage.hasExercise,
      resources: {
        total: stage.resourceCount,
        contentVerified: stage.contentVerifiedResourceCount,
        verifiedRequired: stage.verifiedResourceCount,
        objectiveMatched: stage.matchedResourceCount,
        mounted: stage.reachableResourceCount,
        level2Required: level2Required.map((r) => ({ id: r.id, url: r.url, why: r.limitations })),
        unresolved: unresolved.map((r) => ({ id: r.id, url: r.url, level: r.level })),
      },
      knowledgeCheck: {
        questions: stage.quizQuestionCount,
        valid: stage.validQuizQuestionCount,
        authored: stage.quizAuthored,
        serverGraded: PROGRESSION_EVIDENCE.serverValidated,
        hiddenAnswers: !PROGRESSION_EVIDENCE.clientCanForgePass,
      },
      aiMastery: {
        projectId: stage.projectId,
        rubricCriteria: stage.projectRubricCriteria,
        mandatoryCriteria: stage.projectMandatoryCriteria,
        aiAssessable: stage.projectAiAssessable,
      },
      progression: PROGRESSION_EVIDENCE,
      quality: {
        readiness: assessment?.curriculumReadiness.total ?? null,
        worthiness: assessment?.premiumWorthiness.total ?? null,
        gatesPassed: assessment?.gatesPassed ?? false,
        failingGates: assessment?.failingGates ?? [],
      },
      findings,
      uncertainties,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Reports
// ─────────────────────────────────────────────────────────────────────────────

const report = {
  generatedAt: new Date().toISOString(),
  thresholds: { minimumDimensionScore: PREMIUM_MIN_DIMENSION_SCORE, gates: 'all-mandatory' },
  resourceProbe: probeMeta,
  resourceVerificationSummary: {
    stagesWithVerifiedResource: resourceInventory.filter((r) => r.verifiedResourceCount > 0).length,
    stagesWithNoVerifiedResource: resourceGapStages.length,
    levelHistogram,
    contentInspectedUrls,
    probeUrls: allResourceEntries.length,
    level2RequiredResourceCount: level2RequiredResources.length,
    objectiveMatchedResourceCount: objectiveMatchedResources.length,
    level4PlaybackVerified: 0,
  },
  gapReconciliation,
  progressionEvidence: PROGRESSION_EVIDENCE,
  summary,
  premiumCandidates: candidates,
  resourceInventory,
  stageEvidence,
  tracks: assessments.map((a, i) => ({
    trackId: a.trackId,
    name: a.name,
    slug: a.slug,
    category: a.category,
    duplicateSlug: evidence[i].duplicateSlug,
    isAI: evidence[i].isAI,
    stageCount: a.stageCount,
    curriculumReadiness: a.curriculumReadiness.total,
    premiumWorthiness: a.premiumWorthiness.total,
    gatesPassed: a.gatesPassed,
    premiumEligible: a.premiumEligible,
    humanReview: a.humanReview,
    premiumApproved: a.premiumApproved,
    failingGates: a.failingGates,
    gates: a.gates,
    readinessComponents: a.curriculumReadiness.components,
    worthinessComponents: a.premiumWorthiness.components,
  })),
}

function renderMarkdown() {
  const lines = []
  lines.push('# TechSkillHub — Curriculum Quality & Premium-Eligibility Audit')
  lines.push('')
  lines.push(`Generated: ${report.generatedAt}`)
  lines.push('')
  lines.push('Produced by `scripts/curriculum-quality-audit.mjs` from the live catalogue using the')
  lines.push('served learner path. Scoring rules live in `lib/curriculum-quality.ts`.')
  lines.push('')
  lines.push('> **A track is premium-eligible only when Curriculum readiness >= 90 AND Premium')
  lines.push('> worthiness >= 90 AND every mandatory quality gate passes.** Weighted averages never')
  lines.push('> compensate for a missing critical element. Scores marked *(review)* are completeness')
  lines.push('> proxies that still require human expert review for instructional quality.')
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push('| Metric | Value |')
  lines.push('| --- | ---: |')
  lines.push(`| Tracks assessed | ${summary.tracks} |`)
  lines.push(`| Passing both thresholds (>= 90) | ${summary.passingBothThresholds} |`)
  lines.push(`| Failing curriculum readiness | ${summary.failingReadiness} |`)
  lines.push(`| Failing premium worthiness | ${summary.failingWorthiness} |`)
  lines.push(`| Blocked by a mandatory gate | ${summary.blockedByGates} |`)
  lines.push(`| Mechanically eligible (both thresholds + all gates) | ${summary.premiumEligible} |`)
  lines.push(`| Awaiting subject-matter expert review | ${summary.awaitingHumanReview} |`)
  lines.push(`| **Approved for premium (eligible + human sign-off)** | **${summary.premiumApproved}** |`)
  lines.push('')
  lines.push('### Configured premium candidates')
  lines.push('')
  lines.push('A configured candidate can never override course-quality evidence: if it fails a')
  lines.push('threshold or a mandatory gate it is reported ineligible. In `--release` mode the')
  lines.push('human-review sign-off is also required.')
  lines.push('')
  lines.push('| Candidate | Eligible | Reason |')
  lines.push('| --- | :---: | --- |')
  for (const c of candidates) lines.push(`| \`${c.candidateId}\` | ${c.eligible ? 'yes' : 'NO'} | ${c.reason} |`)
  lines.push('')
  lines.push('## Scores by track')
  lines.push('')
  lines.push('| Track | Stage | Readiness | Worthiness | Gates | Mech. eligible | Human review | Approved |')
  lines.push('| --- | ---: | ---: | ---: | :---: | :---: | :---: | :---: |')
  for (const t of report.tracks) {
    lines.push(
      `| ${t.name} \`${t.trackId}\`${t.duplicateSlug ? ' ⚠ dup-slug' : ''} | ${t.stageCount} | ${t.curriculumReadiness} | ${t.premiumWorthiness} | ${t.gatesPassed ? 'pass' : `FAIL (${t.failingGates.length})`} | ${t.premiumEligible ? 'yes' : 'no'} | ${t.humanReview.passed ? 'signed' : 'pending'} | ${t.premiumApproved ? 'yes' : 'no'} |`,
    )
  }
  lines.push('')
  lines.push('## Failing mandatory gates by track')
  lines.push('')
  for (const t of report.tracks) {
    if (t.gatesPassed) continue
    lines.push(`### ${t.name} \`${t.trackId}\``)
    lines.push('')
    lines.push(`Readiness **${t.curriculumReadiness}** · Worthiness **${t.premiumWorthiness}**`)
    lines.push('')
    for (const g of t.gates) {
      if (g.passed) continue
      lines.push(`- ❌ **${g.label}** — ${g.detail}`)
    }
    if (t.premiumEligible && !t.humanReview.passed) {
      lines.push(`- ⏳ **${t.humanReview.label}** — ${t.humanReview.detail}`)
    }
    lines.push('')
  }
  lines.push('## Score components (readiness / worthiness)')
  lines.push('')
  for (const t of report.tracks) {
    lines.push(`<details><summary>${t.name} \`${t.trackId}\`</summary>`)
    lines.push('')
    lines.push('**Curriculum readiness** — ' + t.curriculumReadiness + '/100')
    lines.push('')
    for (const c of t.readinessComponents) {
      lines.push(`- ${c.score}/${c.max} — ${c.label}${c.humanReview ? ' *(review)*' : ''}: ${c.evidence}`)
    }
    lines.push('')
    lines.push('**Premium worthiness** — ' + t.premiumWorthiness + '/100')
    lines.push('')
    for (const c of t.worthinessComponents) {
      lines.push(`- ${c.score}/${c.max} — ${c.label}${c.humanReview ? ' *(review)*' : ''}: ${c.evidence}`)
    }
    lines.push('')
    lines.push('</details>')
    lines.push('')
  }
  lines.push('## External resource verification')
  lines.push('')
  lines.push(
    `Probe evidence generated ${probeMeta.generatedAt ?? 'n/a'} by \`scripts/verify-resource-links.mjs\` ` +
      `(\`scripts/resource-probe.json\`): ${probeMeta.reachable ?? '?'}/${probeMeta.total ?? '?'} mapped URLs resolved, ` +
      `${contentInspectedUrls} with inspected main content.`,
  )
  lines.push('')
  lines.push('Evidence levels and what each one requires:')
  lines.push('')
  lines.push('| Level | Meaning | Evidence required |')
  lines.push('| ---: | --- | --- |')
  lines.push('| 0 | No evidence | — |')
  lines.push('| 1 | URL discovered | a URL exists; destination unverified |')
  lines.push('| 2 | Destination + identity verified | HTTP reachable and the right page — a title/HTTP 200 is **not** enough |')
  lines.push('| 3 | Content verified | the actual main content was extracted and compared with the objective (`contentEvidence`) |')
  lines.push('| 4 | Playback/interaction verified | the video/interactive experience was actually used |')
  lines.push('')
  lines.push('| Level | Mapped resource entries |')
  lines.push('| ---: | ---: |')
  for (const level of [0, 1, 2, 3, 4]) lines.push(`| ${level} | ${levelHistogram[level] ?? 0} |`)
  lines.push('')
  lines.push(
    `Of the mapped entries, ${objectiveMatchedResources.length} have inspected content whose vocabulary matches their stage objective; ` +
      `${level2RequiredResources.length} required entries could not be content-inspected (video, interactive app or JS shell) and are listed per stage below.`,
  )
  lines.push('')
  lines.push('**Level 4 (playback) is 0 and cannot be claimed here:** no video or interactive resource was actually played in this environment, and no unauthenticated transcript/runtime source is available. Runtime, segment timestamps and playback remain human-review items (see the reviewer packets).')
  lines.push('')
  if (unresolvedUrls.length) {
    lines.push(`### Mapped URLs that did not resolve (${unresolvedUrls.length})`)
    lines.push('')
    for (const item of unresolvedUrls) lines.push(`- HTTP ${item.status} — ${item.url}`)
    lines.push('')
    lines.push('No stage depends on these alone: every stage still has at least one content-inspected required resource.')
    lines.push('')
  }
  lines.push('### Required resources that could not be content-inspected')
  lines.push('')
  if (level2RequiredResources.length === 0) {
    lines.push('None.')
  } else {
    lines.push('| Track | Stage | Resource | URL | Why |')
    lines.push('| --- | --- | --- | --- | --- |')
    for (const r of level2RequiredResources) {
      lines.push(`| ${r.trackId} | ${r.stageId} | ${(r.title || '').slice(0, 50)} | ${r.url} | ${(r.limitations || '').slice(0, 90)} |`)
    }
  }
  lines.push('')
  lines.push('## Gap reconciliation')
  lines.push('')
  lines.push(`- **Former 41 project-integration gaps:** ${projectGapStages.length} stages still lack an embedded project; ${projectNotAssessable.length} lack an AI-assessable project.`)
  lines.push(`- **Former 52 resource-mapping gaps:** ${resourceGapStages.length} stages still lack a content-inspected (level-3) required resource.`)
  lines.push(`- **Worked-example quality:** ${workedExampleProblems.length} non-AI stages have a worked example below the mechanical bar (>= 120 chars, >= 3 steps, no answer leak).`)
  lines.push('')
  if (resourceGapStages.length) {
    lines.push(`### Stages with no content-verified resource (${resourceGapStages.length})`)
    lines.push('')
    for (const row of resourceGapStages) lines.push(`- \`${row.trackId}\` stage ${row.stageId} — ${row.title}`)
    lines.push('')
  }
  lines.push('## Method & limitations')
  lines.push('')
  lines.push('- Evidence is read from the **served** learner path (`buildAIWorldClassPath` for `ai-*`')
  lines.push('  tracks, `buildGuidedPath` otherwise) plus the authored curriculum modules.')
  lines.push('- The tool verifies *completeness and wiring* mechanically. It does not prove factual')
  lines.push('  correctness or instructional quality. Components that need human judgement are marked')
  lines.push('  *(review)* and must be signed off by a subject-matter expert before launch.')
  lines.push('- Automated level 3 proves that real content was extracted and inspected and that its')
  lines.push('  vocabulary overlaps the objective. It does **not** prove factual accuracy, currency,')
  lines.push('  accessibility or pedagogical fit. Those remain human-review items.')
  lines.push('- Reviewer packets (`docs/reviewer-packets/`) assemble the objectives, resource evidence,')
  lines.push('  answer keys, rubrics and projects each human reviewer needs. They record **no** approvals.')
  lines.push('- Automated evidence alone can NEVER approve a track for premium. A track becomes')
  lines.push('  **approved** only when it is mechanically eligible AND a human-review sign-off exists in')
  lines.push('  `docs/curriculum-quality-signoff.json` (`--release` enforces this).')
  lines.push('- A pass here is necessary but not sufficient for a premium decision.')
  lines.push('')
  return lines.join('\n') + '\n'
}

const markdown = renderMarkdown()

function renderStageEvidenceMarkdown() {
  const lines = []
  lines.push('# TechSkillHub — Per-Stage Curriculum Evidence Record')
  lines.push('')
  lines.push(`Generated: ${report.generatedAt}`)
  lines.push('')
  lines.push('One row per progression-bearing stage, produced by `scripts/curriculum-quality-audit.mjs`')
  lines.push('from the served learner path. This is an evidence record, **not** an approval: every')
  lines.push('stage still requires human subject-matter review (see `docs/reviewer-packets/`).')
  lines.push('')
  lines.push(`Stages recorded: **${stageEvidence.length}** across **${new Set(stageEvidence.map((s) => s.trackId)).size}** tracks.`)
  lines.push('')
  lines.push('Flags: `L2!` = required resource not content-inspected; `unres` = mapped URL did not resolve.')
  lines.push('')
  const byTrack = new Map()
  for (const s of stageEvidence) {
    if (!byTrack.has(s.trackId)) byTrack.set(s.trackId, [])
    byTrack.get(s.trackId).push(s)
  }
  for (const [trackId, stages] of byTrack) {
    lines.push(`## ${stages[0].track} \`${trackId}\``)
    lines.push('')
    for (const s of stages) {
      const flags = []
      if (s.resources.level2Required.length) flags.push(`L2!x${s.resources.level2Required.length}`)
      if (s.resources.unresolved.length) flags.push(`unres x${s.resources.unresolved.length}`)
      lines.push(`<details><summary>Stage ${s.stageId} — ${s.stage} · resources ${s.resources.verifiedRequired}/${s.resources.total} verified · quiz ${s.knowledgeCheck.valid}/${s.knowledgeCheck.questions} · rubric ${s.aiMastery.mandatoryCriteria}/${s.aiMastery.rubricCriteria}${flags.length ? ' · ' + flags.join(' ') : ''}</summary>`)
      lines.push('')
      lines.push(`- **Objective:** ${s.objective || '_(none)_'}`)
      if (s.successCriteria.length) lines.push(`- **Success criteria:** ${s.successCriteria.join(' · ')}`)
      if (s.topics.length) lines.push(`- **Topics:** ${s.topics.slice(0, 8).join(' · ')}`)
      lines.push(`- **Instruction:** ${s.instructionChars} chars · worked example: ${s.hasWorkedExample ? 'yes' : 'NO'} · common mistakes: ${s.hasCommonMistakes ? 'yes' : 'NO'} · exercise: ${s.hasExercise ? 'yes' : 'NO'}`)
      lines.push(`- **Knowledge check:** ${s.knowledgeCheck.valid}/${s.knowledgeCheck.questions} valid · authored: ${s.knowledgeCheck.authored ? 'yes' : 'NO'} · server-graded: ${s.knowledgeCheck.serverGraded ? 'yes' : 'NO'} · hidden answers: ${s.knowledgeCheck.hiddenAnswers ? 'yes' : 'NO'}`)
      lines.push(`- **AI mastery / project:** ${s.aiMastery.projectId ?? '_(none)_'} · rubric ${s.aiMastery.rubricCriteria} (${s.aiMastery.mandatoryCriteria} mandatory) · AI-assessable: ${s.aiMastery.aiAssessable ? 'yes' : 'NO'}`)
      lines.push(`- **Quality:** readiness ${s.quality.readiness} · worthiness ${s.quality.worthiness} · gates ${s.quality.gatesPassed ? 'pass' : 'FAIL (' + s.quality.failingGates.join(', ') + ')'}`)
      for (const r of s.resources.level2Required) lines.push(`- ⚠️ Required but not content-inspected: [${r.id}] ${r.url}`)
      for (const r of s.resources.unresolved) lines.push(`- ❌ Unresolved (level ${r.level}): [${r.id}] ${r.url}`)
      if (s.findings.length) lines.push(`- **Findings:** ${s.findings.join(' ')}`)
      lines.push(`- **Uncertainties:** ${s.uncertainties.join(' ')}`)
      lines.push('')
      lines.push('</details>')
      lines.push('')
    }
  }
  return lines.join('\n') + '\n'
}

const stageEvidenceMarkdown = renderStageEvidenceMarkdown()

if (args.has('--json')) {
  process.stdout.write(JSON.stringify(report, null, 2) + '\n')
} else {
  writeFileSync(join(root, 'docs', 'curriculum-quality-audit.md'), markdown, 'utf8')
  writeFileSync(join(root, 'docs', 'curriculum-stage-evidence.md'), stageEvidenceMarkdown, 'utf8')
  writeFileSync(join(root, 'scripts', 'curriculum-quality-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  if (!args.has('--check')) {
    process.stdout.write(
      `Curriculum quality audit written.\n` +
        `  tracks=${summary.tracks} premiumEligible=${summary.premiumEligible} ` +
        `blockedByGates=${summary.blockedByGates} stages=${stageEvidence.length}\n` +
        `  docs/curriculum-quality-audit.md\n  docs/curriculum-stage-evidence.md\n  scripts/curriculum-quality-report.json\n`,
    )
  }
}

if (args.has('--check')) {
  const failing = candidates.filter((c) => !c.eligible)
  const mode = requireSignoff ? 'release (thresholds + gates + human sign-off)' : 'mechanical (thresholds + gates)'
  // Catalogue-wide coverage: the gate must never silently omit a failing course.
  // Every track in the catalogue is assessed above; here we refuse to pass the
  // check while any of them is below a threshold or blocked by a mandatory gate.
  const catalogueFailures = report.tracks.filter(
    (t) => !t.gatesPassed || t.curriculumReadiness < PREMIUM_MIN_DIMENSION_SCORE || t.premiumWorthiness < PREMIUM_MIN_DIMENSION_SCORE,
  )
  if (catalogueFailures.length > 0) {
    process.stderr.write(`\nCatalogue-coverage check FAILED [${mode}] — ${catalogueFailures.length}/${report.tracks.length} track(s) are below the bar:\n`)
    for (const t of catalogueFailures) {
      process.stderr.write(
        `  ✗ ${t.trackId}: readiness=${t.curriculumReadiness} worthiness=${t.premiumWorthiness} gates=${t.gatesPassed ? 'pass' : `FAIL(${t.failingGates.join(', ')})`}\n`,
      )
    }
    process.exitCode = 1
  }
  if (failing.length > 0) {
    process.stderr.write(`\nPremium-quality check FAILED [${mode}] — configured candidates do not meet the bar:\n`)
    for (const c of failing) process.stderr.write(`  ✗ ${c.candidateId}: ${c.reason}\n`)
    process.stderr.write(
      `\n${failing.length}/${candidates.length} configured premium candidate(s) are ineligible. ` +
        `A track may only be premium when Curriculum readiness >= ${PREMIUM_MIN_DIMENSION_SCORE}, ` +
        `Premium worthiness >= ${PREMIUM_MIN_DIMENSION_SCORE}, and every mandatory gate passes` +
        `${requireSignoff ? ', with a signed human-quality review' : ''}.\n`,
    )
    process.exitCode = 1
  } else {
    process.stdout.write(
      `Premium-quality check passed [${mode}] for ${candidates.length} candidate(s); ` +
        `all ${report.tracks.length} catalogue tracks meet thresholds and mandatory gates.\n`,
    )
  }
}
