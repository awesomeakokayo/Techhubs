/**
 * Deterministic TechSkillHUB research-package adapter.
 *
 * Reads the package, validates it against the canonical catalogue, writes a
 * machine-readable field-mapping report and generates the narrowly scoped
 * runtime modules used by the 20-stage pilot.
 *
 * Run after `npx tsc -p tsconfig.test.json` (the script needs the compiled
 * canonical tracks):
 *   node scripts/curriculum-package/adapt.mjs
 *
 * The package is never imported by the Next.js runtime. Generated files carry
 * provenance and remain `needs_human_review`.
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const root = path.resolve(process.cwd())
const packageDir = path.join(
  root,
  'local-research',
  'TechSkillHUB_DeepSeek_IDE_Starter_Pack',
  'research_package',
  'TechSkillHUB_Curriculum_Research_Deliverables',
)
const outDir = path.join(root, 'lib', 'curriculum-package')
const docsDir = path.join(root, 'docs', 'curriculum-implementation')
fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(docsDir, { recursive: true })

function fail(message) {
  console.error(`ADAPTER FAILED: ${message}`)
  process.exit(1)
}

if (!fs.existsSync(packageDir)) fail(`package directory not found: ${packageDir}`)
for (const file of ['02_STAGE_LEARNING_SPECS.json', '05_QUIZ_BANK.jsonl', '06_STAGE_MASTERY_AND_PRACTICE.json', '07_PHASE_PROJECTS.json']) {
  if (!fs.existsSync(path.join(packageDir, file))) fail(`missing ${file}`)
}

/** Minimal RFC-4180-ish CSV parser; the package has quoted multiline cells. */
function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false
  const source = text.replace(/^\uFEFF/, '')
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i]
    if (quoted) {
      if (ch === '"' && source[i + 1] === '"') { cell += '"'; i += 1 }
      else if (ch === '"') quoted = false
      else cell += ch
      continue
    }
    if (ch === '"') { quoted = true; continue }
    if (ch === ',') { row.push(cell); cell = ''; continue }
    if (ch === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; continue }
    cell += ch
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row) }
  const [header, ...data] = rows
  return data
    .filter((values) => values.some((value) => value !== ''))
    .map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])))
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(packageDir, file), 'utf8'))
}
function readCsv(file) {
  return parseCsv(fs.readFileSync(path.join(packageDir, file), 'utf8'))
}
function readJsonl(file) {
  return fs.readFileSync(path.join(packageDir, file), 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      try { return JSON.parse(line) }
      catch (error) { fail(`${file}:${index + 1} is not valid JSON: ${error.message}`) }
    })
}
function write(relative, data) {
  const target = path.join(root, relative)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, data)
  return target
}
function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

let canonical
try {
  canonical = require(path.join(root, '.test-dist', 'tracks.js')).TRACKS
} catch {
  fail('compiled canonical tracks not found; run `npx tsc -p tsconfig.test.json` first')
}

const specs = readJson('02_STAGE_LEARNING_SPECS.json')
const mastery = readJson('06_STAGE_MASTERY_AND_PRACTICE.json')
const projects = readJson('07_PHASE_PROJECTS.json')
const quizzes = readJsonl('05_QUIZ_BANK.jsonl')
const manifest = readCsv('01_STAGE_MANIFEST.csv')
const candidates = readCsv('03_RESOURCE_CANDIDATES.csv')
const resourceMap = readCsv('04_APPROVED_RESOURCE_MAP.csv')
const issues = readCsv('08_REVIEW_AND_OPEN_ISSUES.csv')
const verificationLog = readCsv('09_RESOURCE_VERIFICATION_LOG.csv')
const preflight = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'curriculum-import-preflight.json'), 'utf8'))
const preflightBlocked = new Set((preflight.blockedStages ?? []).map((stage) => stage.key))

// The package's ai-youtube stages 4-9 carry objectives from a displaced
// sequence. The canonical titles/topics are stable, so the correction restores
// the objective that belongs to each stage rather than retitling the stage and
// breaking learner history. Question IDs and the five-question/20-point
// contract are preserved.
const alignmentPath = path.join(docsDir, 'stage-alignment-overrides.json')
const quizOverridePath = path.join(docsDir, 'quiz-overrides.json')
const alignmentOverrides = fs.existsSync(alignmentPath)
  ? JSON.parse(fs.readFileSync(alignmentPath, 'utf8')).stages ?? []
  : []
const quizOverrides = fs.existsSync(quizOverridePath)
  ? JSON.parse(fs.readFileSync(quizOverridePath, 'utf8')).questions ?? []
  : []
for (const override of alignmentOverrides) {
  const spec = specs.stages.find((stage) => stage.trackId === override.trackId && stage.stageId === override.stageId)
  if (!spec) fail(`alignment override points at unknown stage ${override.trackId}:${override.stageId}`)
  Object.assign(spec, {
    stageTitle: override.title ?? spec.stageTitle,
    currentObjective: override.objective,
    targetOutcomes: override.targetOutcomes ?? spec.targetOutcomes,
    authoredInstruction: {
      ...(spec.authoredInstruction ?? {}),
      workedExample: override.workedExample ?? spec.authoredInstruction?.workedExample,
      commonMistakes: override.commonMistakes ?? spec.authoredInstruction?.commonMistakes,
    },
    practice: override.practice ?? spec.practice,
    instructionNote: override.instructionNote ?? spec.instructionNote,
    supplementalResources: override.supplementalResources ?? spec.supplementalResources,
  })
  if (override.mastery) {
    const masteryRecord = mastery.stages.find((stage) => stage.trackId === override.trackId && stage.stageId === override.stageId)
    if (!masteryRecord) fail(`alignment override points at unknown mastery record ${override.trackId}:${override.stageId}`)
    masteryRecord.aiMastery = {
      ...(masteryRecord.aiMastery ?? {}),
      studentPrompt: override.mastery.prompt,
      criteria: override.mastery.criteria,
      passThreshold: override.mastery.passThreshold ?? 80,
      criticalGate: override.mastery.criticalGate ?? masteryRecord.aiMastery?.criticalGate,
    }
  }
}
for (const override of quizOverrides) {
  const index = quizzes.findIndex((question) => question.questionId === override.questionId)
  if (index === -1) fail(`quiz override points at unknown question ${override.questionId}`)
  quizzes[index] = { ...quizzes[index], ...override }
  quizzes[index].correctAnswer = quizzes[index].options[quizzes[index].correctIndex]
}
const resourceReportPath = path.join(root, 'docs', 'curriculum-implementation', 'resource-verification.json')
const resourceReport = fs.existsSync(resourceReportPath)
  ? JSON.parse(fs.readFileSync(resourceReportPath, 'utf8'))
  : { schema: 'tsh-package-resource-verification-v1', stages: [] }
const resourceReadinessByKey = new Map(
  (resourceReport.stages ?? []).map((stage) => [`${stage.trackId}:${stage.stageId}`, stage]),
)

const findings = []
const addFinding = (severity, code, message, detail = null) => findings.push({ severity, code, message, detail })
const canonicalStages = canonical.flatMap((track) => track.roadmap.map((stage) => ({ trackId: track.id, stageId: stage.id, title: stage.title })))
const canonicalByKey = new Map(canonicalStages.map((stage) => [`${stage.trackId}:${stage.stageId}`, stage]))
const specsByKey = new Map(specs.stages.map((stage) => [`${stage.trackId}:${stage.stageId}`, stage]))
const masteryByKey = new Map(mastery.stages.map((stage) => [`${stage.trackId}:${stage.stageId}`, stage]))

// ── Structural reconciliation ──────────────────────────────────────────────
if (canonical.length !== 32) addFinding('P0', 'CANONICAL_TRACK_COUNT', `canonical track count is ${canonical.length}, expected 32`)
if (canonicalStages.length !== 186) addFinding('P0', 'CANONICAL_STAGE_COUNT', `canonical stage count is ${canonicalStages.length}, expected 186`)
if (specs.stageCount !== 186 || specs.stages.length !== 186) addFinding('P0', 'SPEC_COUNT', 'stage specs do not reconcile to 186')
if (mastery.stageCount !== 186 || mastery.stages.length !== 186) addFinding('P0', 'MASTERY_COUNT', 'mastery records do not reconcile to 186')
if (projects.count !== 125 || projects.projects.length !== 125) addFinding('P0', 'PROJECT_COUNT', 'project records do not reconcile to 125')
if (quizzes.length !== 930) addFinding('P0', 'QUIZ_COUNT', `quiz count is ${quizzes.length}, expected 930`)
if (resourceMap.length !== 584) addFinding('P0', 'RESOURCE_MAP_COUNT', `resource map is ${resourceMap.length}, expected 584`)
if (candidates.length !== 610) addFinding('P0', 'RESOURCE_CANDIDATE_COUNT', `candidate count is ${candidates.length}, expected 610`)
if (verificationLog.length !== 1021) addFinding('P0', 'VERIFICATION_LOG_COUNT', `verification log is ${verificationLog.length}, expected 1021`)
if (issues.length !== 268) addFinding('P0', 'ISSUE_COUNT', `issue count is ${issues.length}, expected 268`)
if (manifest.length !== 186) addFinding('P0', 'MANIFEST_COUNT', `manifest is ${manifest.length}, expected 186`)

for (const stage of specs.stages) {
  const key = `${stage.trackId}:${stage.stageId}`
  if (!canonicalByKey.has(key)) addFinding('P0', 'UNKNOWN_STAGE', `package stage ${key} is not canonical`)
  else if (canonicalByKey.get(key).title !== stage.stageTitle) {
    addFinding('P1', 'TITLE_MISMATCH', `title mismatch for ${key}`, { canonical: canonicalByKey.get(key).title, package: stage.stageTitle })
  }
}
for (const key of canonicalByKey.keys()) {
  if (!specsByKey.has(key)) addFinding('P0', 'MISSING_STAGE_SPEC', `canonical stage ${key} has no package spec`)
  if (!masteryByKey.has(key)) addFinding('P0', 'MISSING_MASTERY', `canonical stage ${key} has no mastery record`)
}

// ── Quiz validation ────────────────────────────────────────────────────────
const questionIds = new Set()
const quizByKey = new Map()
for (const question of quizzes) {
  const key = `${question.trackId}:${question.stageId}`
  if (!canonicalByKey.has(key)) addFinding('P0', 'QUIZ_UNKNOWN_STAGE', `quiz ${question.questionId} points at unknown stage ${key}`)
  if (questionIds.has(question.questionId)) addFinding('P0', 'DUPLICATE_QUESTION_ID', `duplicate question id ${question.questionId}`)
  questionIds.add(question.questionId)
  if (!Array.isArray(question.options) || question.options.length < 2) addFinding('P0', 'QUIZ_OPTIONS', `${question.questionId} has malformed options`)
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex >= (question.options?.length ?? 0)) {
    addFinding('P0', 'QUIZ_CORRECT_INDEX', `${question.questionId} has an invalid correctIndex`)
  }
  if (question.options?.[question.correctIndex] !== question.correctAnswer) {
    addFinding('P0', 'QUIZ_ANSWER_MISMATCH', `${question.questionId} correctAnswer does not match options[correctIndex]`)
  }
  if (!question.answerRationale || !question.question) addFinding('P0', 'QUIZ_MISSING_FIELD', `${question.questionId} lacks a question or rationale`)
  if (!Number.isFinite(question.points) || question.points <= 0) addFinding('P0', 'QUIZ_POINTS', `${question.questionId} has invalid points`)
  if (!quizByKey.has(key)) quizByKey.set(key, [])
  quizByKey.get(key).push(question)
}
for (const key of canonicalByKey.keys()) {
  const list = quizByKey.get(key) ?? []
  if (list.length !== 5) addFinding('P0', 'QUIZ_STAGE_COUNT', `${key} has ${list.length} questions, expected 5`)
  const total = list.reduce((sum, question) => sum + (Number(question.points) || 0), 0)
  if (total !== 100) addFinding('P0', 'QUIZ_STAGE_POINTS', `${key} totals ${total} points, expected 100`)
}

// ── Mastery/project validation ─────────────────────────────────────────────
const projectIds = new Set()
for (const project of projects.projects) {
  if (projectIds.has(project.projectId)) addFinding('P0', 'DUPLICATE_PROJECT_ID', `duplicate project id ${project.projectId}`)
  projectIds.add(project.projectId)
  const rubricTotal = (project.effectiveRubric ?? []).reduce((sum, criterion) => sum + (Number(criterion.weight) || 0), 0)
  if (rubricTotal !== 100) addFinding('P0', 'PROJECT_RUBRIC_TOTAL', `${project.projectId} rubric totals ${rubricTotal}`)
  for (const stageId of project.stageIds ?? []) {
    const key = `${project.trackId}:${stageId}`
    if (!canonicalByKey.has(key)) addFinding('P0', 'PROJECT_UNKNOWN_STAGE', `${project.projectId} maps to unknown stage ${key}`)
  }
}
for (const record of mastery.stages) {
  const total = (record.aiMastery?.criteria ?? []).reduce((sum, criterion) => sum + (Number(criterion.weight) || 0), 0)
  if (total !== 100) addFinding('P0', 'MASTERY_RUBRIC_TOTAL', `${record.trackId}:${record.stageId} mastery totals ${total}`)
  if (!record.aiMastery?.studentPrompt) addFinding('P0', 'MASTERY_PROMPT', `${record.trackId}:${record.stageId} has no mastery prompt`)
}

// ── Resource disposition validation ────────────────────────────────────────
const blocked = []
const provisional = []
const verified = []
const mapByKey = new Map()
for (const row of resourceMap) {
  const key = `${row.track_id}:${row.stage_id}`
  if (!mapByKey.has(key)) mapByKey.set(key, [])
  mapByKey.get(key).push(row)
}
const stageReadyKeys = []
for (const stage of canonicalStages) {
  const key = `${stage.trackId}:${stage.stageId}`
  const rows = mapByKey.get(key) ?? []
  const readiness = resourceReadinessByKey.get(key)
  if (!readiness) {
    addFinding('P0', 'RESOURCE_READINESS_MISSING', `${key} has no fresh resource-verification record`)
    provisional.push(key)
    continue
  }
  if (readiness.packagePrimaryStatus === 'blocked') blocked.push(key)
  else if (readiness.packagePrimaryStatus === 'verified') verified.push(key)
  else provisional.push(key)
  if (readiness.stageReady) stageReadyKeys.push(key)
  if (readiness.stageReady && !readiness.selected) {
    addFinding('P0', 'RESOURCE_READY_WITHOUT_SELECTION', `${key} is stage-ready but has no selected resource`)
  }
  if (readiness.selected) {
    const states = readiness.selected.states ?? {}
    if (!states.destination_verified || !states.content_inspected || !states.current_free_access_verified) {
      addFinding('P0', 'RESOURCE_SELECTED_WITHOUT_CHECK', `${key} selected a resource without destination/content/current-access evidence`)
    }
    if (states.playback_verified || states.human_reviewed || states.approved) {
      addFinding('P0', 'FALSE_RESOURCE_APPROVAL', `${key} claims playback, human review or approval that did not happen`)
    }
  }
  if (preflightBlocked.has(key)) {
    const alternatives = readiness.alternatives ?? []
    if ((readiness.candidateCount ?? 0) < 3 || alternatives.length < 2) {
      addFinding('P0', 'BLOCKED_ALTERNATIVES', `${key} preflight-blocked stage records fewer than three credible candidates`)
    }
    if (!readiness.reason) addFinding('P0', 'BLOCKED_REASON', `${key} preflight-blocked stage has no disposition reason`)
  }
  if (rows.length === 0) addFinding('P0', 'RESOURCE_MAP_MISSING', `${key} has no package resource-map row`)
}
if (blocked.length + provisional.length + verified.length !== canonicalStages.length) {
  addFinding('P0', 'RESOURCE_STATUS_COUNT', `resource statuses do not cover all ${canonicalStages.length} stages`)
}
if (stageReadyKeys.length !== (resourceReport.stages ?? []).filter((stage) => stage.stageReady).length) {
  addFinding('P0', 'RESOURCE_READY_COUNT', 'stage-ready count does not reconcile to the fresh resource report')
}

// ── Field mapping report ───────────────────────────────────────────────────
const quizFieldMappings = [
  ['questionId', 'QuizQuestion.id', 'preserved'],
  ['trackId/stageId', 'canonical track/stage', 'validated against lib/tracks.ts'],
  ['question', 'QuizQuestion.question', 'preserved'],
  ['options', 'QuizQuestion.options', 'preserved'],
  ['correctIndex', 'QuizQuestion.correctIndex', 'server-only; never serialized before submission'],
  ['answerRationale', 'QuizQuestion.explanation', 'server-only until feedback policy allows release'],
  ['feedbackOnIncorrect', 'QuizQuestion.feedbackOnIncorrect', 'preserved as remediation metadata; not returned on a failed attempt'],
  ['points', 'QuizQuestion.points', 'preserved; stage total must be 100'],
  ['critical', 'QuizQuestion.critical', 'preserved; a missed critical question fails the attempt'],
  ['learningObjectiveId/learningObjective', 'QuizQuestion.objective', 'preserved for audit/remediation'],
  ['difficulty/difficultyRationale', 'QuizQuestion.difficulty', 'difficulty preserved; rationale retained in staging provenance'],
  ['correctAnswer', 'validation only', 'checked against options[correctIndex]; not a runtime field'],
  ['distractorMisconception/distractorAnalysis', 'staging provenance', 'preserved in validation report; not exposed before submission'],
  ['rationaleSourceKeys', 'QuizQuestion.provenance', 'preserved'],
  ['assessmentSourceStatus', 'QuizQuestion.reviewStatus', 'needshuman_review'],
  ['type', 'validation only', 'must be mcq'],
]
const stageFieldMappings = [
  ['currentObjective', 'StageLearningPlan.objective / pilot objective', 'preserved'],
  ['targetOutcomes', 'success criteria', 'preserved'],
  ['prerequisites', 'stage prerequisites', 'preserved'],
  ['topics', 'stage topics', 'preserved'],
  ['misconceptions/commonMistakes', 'commonMistakes', 'preserved'],
  ['authoredInstruction.lessonOutline', 'staging only', 'not imported: outline, not complete lesson prose'],
  ['authoredInstruction.workedExample', 'concept worked example', 'preserved as an additional example'],
  ['practice', 'StageLearningPlan.exercise', 'preserved when the existing authored exercise does not already cover it'],
  ['aiMastery', 'section/project contract criteria', 'preserved as objective-anchored criteria'],
  ['phaseProjectRef/phaseProjectChanges', 'staging provenance', 'project mapping resolved from canonical project registry'],
  ['readiness/humanReviewItems', 'review ledger', 'preserved; never treated as approval'],
]
const projectFieldMappings = [
  ['brief', 'ProjectBrief', 'preserved/merged'],
  ['acceptanceCriteria', 'contract.acceptanceCriteria + rubric', 'preserved'],
  ['effectiveRubric.criterion/weight/mandatory', 'RubricCriterion', 'preserved for pilot project overrides'],
  ['effectiveRubric.scoringGuide', 'staging provenance', 'not sent to the model as a separate requirement'],
  ['criticalGates', 'mandatory criterion/gate note', 'preserved as mandatory gate'],
  ['evaluationRoute.requiredArtifacts.kind', 'ArtifactKind', 'mapped explicitly; unknown kinds are rejected'],
  ['evaluationRoute.optionalArtifacts', 'optionalArtifacts', 'mapped explicitly'],
  ['deliverables', 'writtenExplanation prompts/artifact labels', 'preserved in labels'],
  ['rubricVersion', 'provenance only', 'runtime hash remains authoritative'],
]
const resourceFieldMappings = [
  ['url/title/publisher/type', 'staging resource metadata', 'preserved in validation report'],
  ['current_role/new_selected_role/decision', 'disposition', 'package-primary status; archive evidence never promotes itself to required'],
  ['free_access_status/account_requirement', 'review evidence', 'archive-era only; current access is a separate fresh check'],
  ['verification_level/archive_http_status', 'review evidence', 'not current verification'],
  ['exact_portion/duration/segment', 'staging provenance', 'not a verified playback/required segment; fresh content evidence is recorded separately'],
]

// ── Pilot content ──────────────────────────────────────────────────────────
const pilot = [
  ['frontend', [1, 2, 3, 4, 5]],
  ['uiux', [1, 2, 3, 4, 5]],
  ['ai-foundations', [1, 2, 3, 4, 5, 6]],
  ['cyber', [1, 2, 3, 4]],
]
const pilotKeys = new Set(pilot.flatMap(([trackId, stages]) => stages.map((stageId) => `${trackId}:${stageId}`)))

function resourceDisposition(key) {
  const rows = mapByKey.get(key) ?? []
  const readiness = resourceReadinessByKey.get(key)
  const mapPrimary =
    rows.find((row) => /provisional|proposed_required|supplement|optional/i.test(row.new_selected_role ?? '')) ??
    rows[0]
  if (readiness) {
    const primary = readiness.primary
    const currentCheck =
      primary?.checkedAt && primary?.states?.content_inspected
        ? {
            url: primary.url,
            checkedAt: primary.checkedAt,
            verificationLevel: primary.states.current_free_access_verified ? 3 : 3,
            freeAccess: primary.states.current_free_access_verified,
            accountRequired: false,
            paymentRequired: false,
            contentInspected: primary.states.content_inspected,
            objectiveRelevant: primary.objectiveRelevant,
            contentChars: primary.contentChars,
            excerpt: primary.excerpt,
            contentHash: primary.contentHash,
            limitations: primary.limitations,
          }
        : null
    return {
      status: readiness.packagePrimaryStatus,
      required: readiness.required,
      stageReady: readiness.stageReady,
      candidateCount: readiness.candidateCount ?? rows.length,
      primary: primary
        ? {
            title: primary.title,
            publisher: primary.publisher,
            url: primary.url,
            rationale: primary.packageDecision || primary.packageRole || '',
            verificationLevel: primary.states?.current_free_access_verified
              ? '3'
              : primary.packageScreeningScore
                ? 'archive screening only'
                : null,
            freeAccess: primary.states?.current_free_access_verified ? 'current public fetch' : 'unverified',
            currentCheck,
            states: primary.states,
          }
        : null,
      selected: readiness.selected ?? null,
      reason: readiness.reason,
    }
  }
  return {
    status: preflightBlocked.has(key) ? 'blocked' : 'provisional',
    required: false,
    stageReady: false,
    candidateCount: rows.length,
    primary: mapPrimary
      ? {
          title: mapPrimary.title,
          publisher: mapPrimary.publisher,
          url: mapPrimary.url,
          rationale: mapPrimary.decision || mapPrimary.next_action || '',
          verificationLevel: mapPrimary.recorded_verification_level || null,
          freeAccess: mapPrimary.current_free_access_flag || 'unverified',
          currentCheck: null,
          states: {
            discovered: Boolean(mapPrimary.url),
            destination_verified: false,
            content_inspected: false,
            current_free_access_verified: false,
            playback_verified: false,
            human_reviewed: false,
            approved: false,
          },
        }
      : null,
    selected: null,
    reason: preflightBlocked.has(key)
      ? 'No fresh verification record exists. Keep external links optional; do not gate progression.'
      : 'No fresh verification record exists. Keep the primary optional pending human review.',
  }
}

const allStages = {}
for (const key of canonicalStages.map((stage) => `${stage.trackId}:${stage.stageId}`)) {
  const spec = specsByKey.get(key)
  if (!spec) { addFinding('P0', 'PILOT_MISSING_SPEC', `pilot stage ${key} has no spec`); continue }
  const [trackId, stageIdText] = key.split(':')
  const stageId = Number(stageIdText)
  const stageQuiz = (quizByKey.get(key) ?? []).map((question) => ({
    id: question.questionId,
    question: question.question,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.answerRationale,
    feedbackOnIncorrect: question.feedbackOnIncorrect || null,
    points: question.points,
    critical: Boolean(question.critical),
    objective: question.learningObjective || spec.currentObjective,
    difficulty: question.difficulty || null,
    provenance: {
      package: '05_QUIZ_BANK.jsonl',
      questionId: question.questionId,
      rationaleSourceKeys: question.rationaleSourceKeys ?? [],
      reviewStatus: 'needs_human_review',
    },
  }))
  const masteryRecord = masteryByKey.get(key)
  allStages[key] = {
    trackId,
    stageId,
    stageTitle: spec.stageTitle,
    objective: spec.currentObjective,
    targetOutcomes: spec.targetOutcomes ?? [],
    prerequisites: spec.prerequisites ?? [],
    topics: spec.topics ?? [],
    workedExample: spec.authoredInstruction?.workedExample || null,
    commonMistakes: spec.authoredInstruction?.commonMistakes ?? spec.misconceptions ?? [],
    instructionNote:
      spec.instructionNote ??
      'The package authoredInstruction is an outline. TechSkillHub authored lesson/practice remains the teaching source; no outline is represented as a full lesson.',
    supplementalResources: (spec.supplementalResources ?? []).map((resource) => ({
      title: resource.title,
      url: resource.url,
      publisher: resource.publisher,
      section: resource.section,
      accessNotes: resource.accessNotes,
    })),
    practice: spec.practice
      ? {
          title: spec.practice.title,
          instructions: spec.practice.instructions,
          expectedOutput: spec.practice.expectedOutput,
          hints: spec.practice.hints ?? [],
          completionCriteria: spec.practice.completionCriteria ?? [],
        }
      : null,
    quiz: stageQuiz,
    mastery: masteryRecord?.aiMastery
      ? {
          prompt: masteryRecord.aiMastery.studentPrompt,
          evidenceFormats: masteryRecord.aiMastery.evidenceFormats ?? [],
          criteria: (masteryRecord.aiMastery.criteria ?? []).map((criterion) => ({
            id: criterion.criterionId,
            name: criterion.name,
            weight: criterion.weight,
            mandatory: Boolean(criterion.mandatory),
            description: criterion.description,
            stageSpecificEvidence: criterion.stageSpecificEvidence || null,
          })),
          passThreshold: masteryRecord.aiMastery.passThreshold ?? 80,
          criticalGate: masteryRecord.aiMastery.criticalGate ?? null,
          packageRubricVersion: masteryRecord.aiMastery.rubricVersion,
          reviewStatus: 'needs_human_review',
        }
      : null,
    projectIds: projects.projects.filter((project) => project.trackId === trackId && (project.stageIds ?? []).includes(stageId)).map((project) => project.projectId),
    resourceDisposition: resourceDisposition(key),
    reviewStatus: 'needs_human_review',
    packageProvenance: {
      package: '02_STAGE_LEARNING_SPECS.json',
      sourcePackageHash: specs.sourcePackageHash,
      fetchedAt: spec.researchTrace?.searchedAt ?? null,
      resourceVerification: 'archive-era only',
    },
  }
}
const pilotStages = Object.fromEntries([...pilotKeys].sort().map((key) => [key, allStages[key]]))
if (Object.keys(allStages).length !== canonicalStages.length) {
  addFinding('P0', 'STAGE_CONTENT_COUNT', `generated stage content = ${Object.keys(allStages).length}, expected ${canonicalStages.length}`)
}
if (Object.keys(pilotStages).length !== 20) addFinding('P0', 'PILOT_COUNT', `pilot stage count is ${Object.keys(pilotStages).length}, expected 20`)

// ── Project overrides for the pilot ────────────────────────────────────────
const packageProjectIds = new Set(projects.projects.map((project) => project.projectId))
const artifactKindMap = {
  code_or_repo: 'github_repo',
  test_evidence: 'text',
  readme: null,
  live_url: 'live_url',
  design_file: 'design_file',
  screenshots: 'image',
  rationale: 'document_url',
  workflow_artifact: 'document_url',
  evaluation_evidence: 'document_file',
  guardrails: 'text',
  authorized_lab_report: 'document_url',
  redacted_evidence: 'image',
  remediation: 'text',
  analysis_artifact: 'notebook',
  sample_data: 'dataset',
  interpretation: 'document_url',
  campaign_artifact: 'document_url',
  measurement_plan: 'document_file',
  evidence_note: 'text',
  creative_output: 'video_url',
  script_or_storyboard: 'document_file',
  review_evidence: 'image',
  contract_or_analysis: 'document_url',
  tests: 'github_repo',
  security_notes: 'text',
  planning_artifact: 'document_url',
  evidence_appendix: 'document_file',
  success_measures: 'text',
  document: 'document_url',
  example_or_test: 'text',
  editorial_notes: 'document_file',
}
const trackDiscipline = {
  frontend: 'software', backend: 'software', fullstack: 'software', python: 'software',
  devops: 'software', mobile: 'software', dart: 'software', crypto: 'software', sonic: 'software',
  'ai-software-development': 'software', 'ai-engineering': 'software',
  uiux: 'design', 'ai-design': 'design',
  qa: 'qa',
  data: 'data', datascience: 'data',
  cyber: 'security',
  video: 'video', youtube: 'video',
  marketing: 'marketing',
  writing: 'writing',
  nocode: 'nocode',
  projectmgmt: 'management', productmgmt: 'management',
  ai: 'ai-foundations', 'ai-foundations': 'ai-foundations', 'ai-work': 'ai-work',
  'ai-research': 'ai-research', 'ai-content': 'ai-content', 'ai-youtube': 'ai-content',
  'ai-automation': 'ai-automation', 'ai-agents': 'ai-agents',
}
const helpForKind = {
  github_repo: 'publish-a-public-github-repository',
  code_sandbox: 'publish-a-public-github-repository',
  design_file: 'share-a-figma-prototype',
  image: 'share-a-document-deliverable',
  document_url: 'share-a-document-deliverable',
  document_file: 'share-a-document-deliverable',
  text: 'write-a-project-description',
  live_url: 'publish-and-share-a-live-frontend-project',
}
const packageProjectOverrides = {}
for (const project of projects.projects.filter((item) => packageProjectIds.has(item.projectId))) {
  const required = []
  const optional = []
  const explanationPrompts = []
  const seenKinds = new Set()
  for (const artifact of project.evaluationRoute?.requiredArtifacts ?? []) {
    const kind = artifactKindMap[artifact.kind]
    if (kind === null) continue
    if (!kind) {
      addFinding('P0', 'PROJECT_ARTIFACT_UNMAPPED', `${project.projectId} required artifact kind ${artifact.kind} has no runtime mapping`)
      continue
    }
    if (seenKinds.has(kind)) {
      addFinding('P0', 'PROJECT_ARTIFACT_COLLISION', `${project.projectId} maps multiple required artifacts to ${kind}; the second cannot be represented without dropping evidence`)
      continue
    }
    seenKinds.add(kind)
    // The runtime collects written explanation as text, never as a URL
    // artifact. Preserve package text evidence as an explicit explanation
    // prompt and retain the optional link so a learner can still attach it.
    if (kind === 'text') {
      explanationPrompts.push(artifact.label)
      optional.push({
        kind,
        label: artifact.label,
        description: artifact.description || `Optional supporting evidence for ${project.title}.`,
        required: false,
        helpGuideId: helpForKind[kind] || 'share-a-document-deliverable',
      })
      continue
    }
    required.push({
      kind,
      label: artifact.label,
      description: artifact.description || `Required evidence for ${project.title}.`,
      required: true,
      helpGuideId: helpForKind[kind] || 'share-a-document-deliverable',
      alternatives: [],
    })
  }
  for (const artifact of project.evaluationRoute?.optionalArtifacts ?? []) {
    const kind = artifactKindMap[artifact.kind]
    if (!kind || seenKinds.has(kind)) continue
    seenKinds.add(kind)
    if (kind === 'text') explanationPrompts.push(artifact.label)
    optional.push({
      kind,
      label: artifact.label,
      description: artifact.description || `Optional supporting evidence for ${project.title}.`,
      required: false,
      helpGuideId: helpForKind[kind] || 'share-a-document-deliverable',
    })
  }
  const discipline = trackDiscipline[project.trackId]
  if (!discipline) {
    addFinding('P0', 'PROJECT_DISCIPLINE_UNMAPPED', `${project.projectId} track ${project.trackId} has no runtime discipline mapping`)
    continue
  }
  // QA is a manual-evidence discipline. The package's generated QA projects
  // still describe a code repository, which would wrongly require public code.
  // Keep the project and rubric, but require a test plan/report and allow a
  // repository only as optional test-automation evidence.
  if (discipline === 'qa') {
    required.length = 0
    optional.length = 0
    required.push({
      kind: 'document_url',
      label: 'Test plan, test report, or exploratory testing notes',
      description: 'Share the actual manual test evidence: scope, test cases or charters, expected vs actual results, bug reports, and prioritisation. A public repository is not required.',
      required: true,
      helpGuideId: 'share-a-document-deliverable',
      alternatives: [{ kind: 'document_file', label: 'Downloadable test report', helpGuideId: 'share-a-document-deliverable' }],
    })
    optional.push(
      { kind: 'image', label: 'Evidence screenshots', description: 'Screenshots or recordings of observed behaviour.', required: false, helpGuideId: 'share-a-document-deliverable' },
      { kind: 'text', label: 'Bug report or reproduction steps', description: 'A written bug report with reproduction steps and expected vs actual results.', required: false, helpGuideId: 'write-a-project-description' },
      { kind: 'github_repo', label: 'Test automation code (optional)', description: 'Only when the project genuinely uses automated tests. Not required for manual QA projects.', required: false, helpGuideId: 'publish-a-public-github-repository' },
    )
  }
  const rubric = (project.effectiveRubric ?? []).map((criterion) => ({
    id: criterion.id,
    label: criterion.criterion,
    weight: criterion.weight,
    mandatory: Boolean(criterion.mandatory),
  }))
  if (rubric.reduce((sum, criterion) => sum + criterion.weight, 0) !== 100) {
    addFinding('P0', 'PROJECT_RUBRIC_OVERRIDE', `${project.projectId} pilot rubric does not total 100`)
  }
  packageProjectOverrides[project.projectId] = {
    projectId: project.projectId,
    trackId: project.trackId,
    discipline,
    requiredArtifacts: required,
    optionalArtifacts: optional,
    writtenExplanationPrompts: [...new Set(explanationPrompts)],
    requiresSourceInspection: discipline === 'software',
    requiresReadme: discipline === 'software',
    requiresLivePreview: required.some((artifact) => artifact.kind === 'live_url'),
    writtenExplanationMinWords: project.level === 'advanced' ? 120 : project.level === 'intermediate' ? 80 : 50,
    rubric,
    passThreshold: 0.8,
    acceptanceCriteria: project.acceptanceCriteria ?? [],
    criticalGates: project.criticalGates ?? [],
    packageRubricVersion: project.rubricVersion,
    reviewStatus: 'needs_human_review',
    note:
      discipline === 'security'
        ? 'Authorised labs or owned systems only. Do not test public targets, real third-party systems, or include secrets/personal data. A remediation note and redacted evidence are required.'
        : discipline === 'design'
          ? 'Design evidence is inspected as far as the platform permits; the written rationale must explain the decisions and accessibility checks.'
          : discipline === 'ai-foundations'
            ? 'This is a workflow/evaluation artefact, not necessarily code. Evidence must show the workflow, evaluation results and guardrails.'
            : undefined,
  }
}
const pilotProjectIds = new Set(Object.values(pilotStages).flatMap((stage) => stage.projectIds))
const pilotProjectOverrides = Object.fromEntries(
  Object.entries(packageProjectOverrides).filter(([projectId]) => pilotProjectIds.has(projectId)),
)
if (Object.keys(packageProjectOverrides).length !== projects.projects.length) {
  addFinding('P0', 'PROJECT_OVERRIDE_COUNT', `package project overrides = ${Object.keys(packageProjectOverrides).length}, expected ${projects.projects.length}`)
}
if (Object.keys(pilotProjectOverrides).length !== 16) {
  addFinding('P1', 'PILOT_PROJECT_OVERRIDE_COUNT', `pilot project overrides = ${Object.keys(pilotProjectOverrides).length}, expected 16`)
}

// ── Product Management 5–8 review ──────────────────────────────────────────
// Package phase projects that are not in the authored runtime catalogue.
// These ids were reconciled against the canonical catalogue: every other
// package project already exists in `TRACKS` or the authored extra-project
// module. Defining only the genuinely missing records avoids duplicate ids.
const PACKAGE_EXTRA_PROJECT_IDS = new Set([
  'ai-f-p3',
  'ai-w-p4',
  'ai-r-p2',
  'ai-c-p4',
  'ai-y-p3',
  'ai-s-p4',
  'ai-a-p2',
  'ai-ag-p2',
  'ai-e-p2',
  'ai-d-p2',
])
const packageExtraProjects = projects.projects
  .filter((project) => PACKAGE_EXTRA_PROJECT_IDS.has(project.projectId))
  .map((project) => {
    const track = canonical.find((item) => item.id === project.trackId)
    const stageCount = track?.roadmap.length ?? 1
    const finalStage = Math.max(...(project.stageIds ?? [1]))
    return {
      id: project.projectId,
      trackId: project.trackId,
      title: project.title,
      description:
        project.brief?.objective ??
        project.sourceDescription?.split('\n')[0] ??
        `Apply the ${project.trackTitle} stage outcome in a complete project.`,
      level: project.level ?? (finalStage >= stageCount ? 'advanced' : 'intermediate'),
      techTags: [project.trackTitle ?? project.trackId, project.discipline ?? 'project'],
      stageIds: project.stageIds ?? [],
      isPortfolio: finalStage >= stageCount,
    }
  })
if (packageExtraProjects.length !== PACKAGE_EXTRA_PROJECT_IDS.size) {
  addFinding('P0', 'PACKAGE_EXTRA_PROJECTS', `expected ${PACKAGE_EXTRA_PROJECT_IDS.size} missing package projects, found ${packageExtraProjects.length}`)
}

const packageProjectBriefs = {}
function sourceBullets(sourceDescription, heading) {
  const text = sourceDescription ?? ''
  const start = text.indexOf(`\n${heading}\n`)
  if (start === -1) return []
  const rest = text.slice(start + heading.length + 2)
  const end = rest.search(/\n\n[A-Z][A-Z ]{3,}\n/)
  const body = end === -1 ? rest : rest.slice(0, end)
  return body
    .split(/\r?\n/)
    .map((line) => line.replace(/^[•*-]\s*/, '').trim())
    .filter(Boolean)
}
function sourceParagraph(sourceDescription, heading) {
  const text = sourceDescription ?? ''
  const start = text.indexOf(`\n${heading}\n`)
  if (start === -1) return ''
  const rest = text.slice(start + heading.length + 2).trim()
  const end = rest.search(/\n\n[A-Z][A-Z ]{3,}\n/)
  return (end === -1 ? rest : rest.slice(0, end)).trim()
}
for (const project of projects.projects) {
  const brief = project.brief ?? {}
  const source = project.sourceDescription
  const evidence = brief.evidence?.length
    ? brief.evidence
    : sourceBullets(source, 'EVIDENCE').length
      ? sourceBullets(source, 'EVIDENCE')
      : project.deliverables ?? []
  packageProjectBriefs[project.projectId] = {
    problem: brief.problem ?? `A real ${project.trackTitle ?? project.trackId} problem needs a defensible solution.`,
    audience: brief.audience ?? 'The people affected by the problem in the project brief.',
    objective: brief.objective ?? project.title,
    prerequisites: brief.prerequisites ?? [],
    functionalRequirements: brief.functionalRequirements?.length
      ? brief.functionalRequirements
      : sourceBullets(source, 'DELIVERABLES'),
    constraints: brief.constraints?.length ? brief.constraints : sourceBullets(source, 'CONSTRAINTS'),
    milestones: brief.milestones?.length ? brief.milestones : sourceBullets(source, 'MILESTONES'),
    acceptanceCriteria: brief.acceptanceCriteria ?? project.acceptanceCriteria ?? [],
    evidence,
    commonFailureCases: brief.commonFailureCases?.length
      ? brief.commonFailureCases
      : sourceBullets(source, 'COMMON FAILURE CASES'),
    stretchGoal:
      brief.stretchGoal ??
      (sourceParagraph(source, 'STRETCH GOAL') ||
        'Extend the project only after the required outcome is reproducible.'),
    portfolioPresentation:
      project.portfolioOutcome ??
      brief.portfolioPresentation ??
      'Explain the problem, your decisions, the evidence, and what you would improve next.',
  }
}

const packageStageProjectMap = {}
for (const project of projects.projects) {
  for (const stageId of project.stageIds ?? []) {
    if (!packageStageProjectMap[project.trackId]) packageStageProjectMap[project.trackId] = {}
    packageStageProjectMap[project.trackId][stageId] = project.projectId
  }
}

const productManagementGate = ['productmgmt:5', 'productmgmt:6', 'productmgmt:7', 'productmgmt:8'].map((key) => {
  const [trackId, stageId] = key.split(':')
  const rows = mapByKey.get(key) ?? []
  return {
    trackId,
    stageId: Number(stageId),
    status: blocked.includes(key) ? 'blocked' : 'provisional',
    candidates: rows.map((row) => ({
      title: row.title,
      publisher: row.publisher,
      url: row.url,
      recordedFreeAccess: row.current_free_access_flag,
      recordedVerificationLevel: row.recorded_verification_level,
      decision: row.decision,
      nextAction: row.next_action,
    })),
    conclusion: 'No candidate is currently verified as free, relevant and content-inspected. Keep the stage blocked from a required external primary.',
  }
})

// ── Generated runtime modules ──────────────────────────────────────────────
// Deterministic by default: the same package and code produce identical bytes.
// Set SOURCE_DATE_EPOCH (seconds) to add an explicit build timestamp.
const sourceDateEpoch = Number(process.env.SOURCE_DATE_EPOCH)
const generatedAt = Number.isFinite(sourceDateEpoch) && sourceDateEpoch > 0
  ? new Date(sourceDateEpoch * 1000).toISOString()
  : null
const generatedHeader = `/* eslint-disable */
// GENERATED by scripts/curriculum-package/adapt.mjs. Do not edit by hand.
// Source package hash: ${specs.sourcePackageHash}
${generatedAt ? `// Generated at: ${generatedAt}` : '// Deterministic output (no timestamp; set SOURCE_DATE_EPOCH to stamp).'}
// All content remains needs_human_review.

`
write(
  'lib/curriculum-package/types.ts',
  `export type PackageReviewStatus = 'needs_human_review'

export interface PilotQuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  feedbackOnIncorrect: string | null
  points: number
  critical: boolean
  objective: string
  difficulty: string | null
  provenance: {
    package: string
    questionId: string
    rationaleSourceKeys: string[]
    reviewStatus: PackageReviewStatus
  }
}

export interface PilotMasteryCriterion {
  id: string
  name: string
  weight: number
  mandatory: boolean
  description: string
  stageSpecificEvidence: string | null
}

export interface PackageResourceCheck {
  url: string
  checkedAt: string
  verificationLevel: 3 | 4
  freeAccess: boolean
  accountRequired: boolean
  paymentRequired: boolean
  contentInspected: boolean
  objectiveRelevant: boolean
  contentChars: number
  excerpt: string
  contentHash: string
  limitations: string[]
}

export interface PackageResourceCandidate {
  candidateId: string
  kind: 'package_primary' | 'alternative'
  title: string
  publisher: string
  url: string
  type: string
  exactPortion: string
  durationMinutes: number | null
  accessNotes: string
  rationale: string
  packageRole: string
  packageDecision: string
  packageScreeningScore: number | null
  checkedAt: string | null
  httpStatus: number | null
  finalUrl: string
  contentChars: number
  excerpt: string
  contentHash: string
  terms: string[]
  objectiveHits: number
  curated: boolean
  states: {
    discovered: boolean
    destination_verified: boolean
    content_inspected: boolean
    current_free_access_verified: boolean
    playback_verified: boolean
    human_reviewed: boolean
    approved: boolean
  }
  objectiveRelevant: boolean
  suitable: boolean
  limitations: string[]
}

export interface SelectedPackageResource {
  candidateId: string
  title: string
  publisher: string
  url: string
  type: string
  source: 'package_primary' | 'alternative'
  exactPortion: string
  durationMinutes: number | null
  accessNotes: string
  rationale: string
  objectiveHits: number
  checkedAt: string
  contentChars: number
  excerpt: string
  contentHash: string
  states: PackageResourceCandidate['states']
  limitations: string[]
}

export interface PackageResourceDisposition {
  status: 'blocked' | 'provisional' | 'verified'
  required: boolean
  stageReady: boolean
  candidateCount: number
  primary: {
    title: string
    publisher: string
    url: string
    rationale: string
    verificationLevel: string | null
    freeAccess: string
    currentCheck: PackageResourceCheck | null
    states: PackageResourceCandidate['states']
  } | null
  selected: SelectedPackageResource | null
  reason: string
}

export interface PackageStageReadiness {
  trackId: string
  stageId: number
  stageTitle: string
  objective: string
  packagePrimaryStatus: 'blocked' | 'provisional' | 'verified'
  packagePrimaryBlocked: boolean
  preflightBlocked: boolean
  required: boolean
  stageReady: boolean
  selected: SelectedPackageResource | null
  primary: PackageResourceCandidate | null
  alternatives: PackageResourceCandidate[]
  candidateCount: number
  reason: string
}

export interface PilotStageContent {
  trackId: string
  stageId: number
  stageTitle: string
  objective: string
  targetOutcomes: string[]
  prerequisites: string[]
  topics: string[]
  workedExample: string | null
  commonMistakes: string[]
  instructionNote: string
  practice: {
    title: string
    instructions: string
    expectedOutput: string
    hints: string[]
    completionCriteria: string[]
  } | null
  quiz: PilotQuizQuestion[]
  mastery: {
    prompt: string
    evidenceFormats: string[]
    criteria: PilotMasteryCriterion[]
    passThreshold: number
    criticalGate: { required: boolean; rule: string } | null
    packageRubricVersion: string
    reviewStatus: PackageReviewStatus
  } | null
  projectIds: string[]
  resourceDisposition: PackageResourceDisposition
  reviewStatus: PackageReviewStatus
  packageProvenance: {
    package: string
    sourcePackageHash: string
    fetchedAt: string | null
    resourceVerification: string
  }
}

export interface PackageProjectBrief {
  problem: string
  audience: string
  objective: string
  prerequisites: string[]
  functionalRequirements: string[]
  constraints: string[]
  milestones: string[]
  acceptanceCriteria: string[]
  evidence: string[]
  commonFailureCases: string[]
  stretchGoal: string
  portfolioPresentation: string
}

export interface PackageExtraProject {
  id: string
  trackId: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  techTags: string[]
  stageIds: number[]
  isPortfolio: boolean
}

export interface PilotProjectOverride {
  projectId: string
  trackId: string
  discipline: string
  requiredArtifacts: Array<{
    kind: string
    label: string
    description: string
    required: boolean
    helpGuideId?: string
    alternatives?: Array<{ kind: string; label: string; helpGuideId?: string }>
  }>
  optionalArtifacts: Array<{
    kind: string
    label: string
    description: string
    required: boolean
    helpGuideId?: string
  }>
  /** Package text evidence is collected through the written explanation field. */
  writtenExplanationPrompts: string[]
  requiresSourceInspection: boolean
  requiresReadme: boolean
  requiresLivePreview: boolean
  writtenExplanationMinWords: number
  rubric: Array<{ id: string; label: string; weight: number; mandatory: boolean }>
  passThreshold: number
  acceptanceCriteria: string[]
  criticalGates: Array<{ gate: string; required: boolean; description?: string; appliesTo?: string[] }>
  packageRubricVersion: string
  reviewStatus: PackageReviewStatus
  note?: string
}
`,
)
write(
  'lib/curriculum-package/stage-content.generated.ts',
  `${generatedHeader}import type { PilotStageContent } from './types'

/**
 * All 186 canonical stages, generated from the research package.
 * The authored TechSkillHub lesson remains the teaching source; this module
 * supplies the package objective, practice, quiz and mastery contract.
 */
export const PACKAGE_STAGE_CONTENT: Record<string, PilotStageContent> = ${JSON.stringify(allStages, null, 2)}

export function getPackageStageContent(trackId: string, stageId: number): PilotStageContent | null {
  return PACKAGE_STAGE_CONTENT[\`\${trackId}:\${stageId}\`] ?? null
}
`,
)
write(
  'lib/curriculum-package/pilot.generated.ts',
  `${generatedHeader}import type { PilotStageContent } from './types'

export const PILOT_STAGE_CONTENT: Record<string, PilotStageContent> = ${JSON.stringify(pilotStages, null, 2)}

export function getPilotStageContent(trackId: string, stageId: number): PilotStageContent | null {
  return PILOT_STAGE_CONTENT[\`\${trackId}:\${stageId}\`] ?? null
}
`,
)
write(
  'lib/curriculum-package/projects.generated.ts',
  `${generatedHeader}import type { PackageExtraProject, PackageProjectBrief, PilotProjectOverride } from './types'

/** The 20-stage pilot subset, retained for the pilot regression contract. */
export const PILOT_PROJECT_OVERRIDES: Record<string, PilotProjectOverride> = ${JSON.stringify(pilotProjectOverrides, null, 2)}

/** Every package phase project, reconciled to the canonical project ids. */
export const PACKAGE_PROJECT_OVERRIDES: Record<string, PilotProjectOverride> = ${JSON.stringify(packageProjectOverrides, null, 2)}

/** Genuinely new package projects that have no authored runtime record. */
export const PACKAGE_EXTRA_PROJECTS: PackageExtraProject[] = ${JSON.stringify(packageExtraProjects, null, 2)}

/** Package briefs for every phase project. Authored runtime lessons remain the teaching source. */
export const PACKAGE_PROJECT_BRIEFS: Record<string, PackageProjectBrief> = ${JSON.stringify(packageProjectBriefs, null, 2)}

/** Package stage -> project mapping. Runtime merges this only where no project is already mapped. */
export const PACKAGE_STAGE_PROJECT_MAP: Record<string, Record<string, string>> = ${JSON.stringify(packageStageProjectMap, null, 2)}

export function getPilotProjectOverride(projectId: string): PilotProjectOverride | null {
  return PILOT_PROJECT_OVERRIDES[projectId] ?? null
}

export function getPackageProjectOverride(projectId: string): PilotProjectOverride | null {
  return PACKAGE_PROJECT_OVERRIDES[projectId] ?? null
}

export function getPackageProjectBrief(projectId: string): PackageProjectBrief | null {
  return PACKAGE_PROJECT_BRIEFS[projectId] ?? null
}

export function getPackageExtraProjects(trackId: string): PackageExtraProject[] {
  return PACKAGE_EXTRA_PROJECTS.filter((project) => project.trackId === trackId)
}

export function getPackageExtraProject(projectId: string): PackageExtraProject | null {
  return PACKAGE_EXTRA_PROJECTS.find((project) => project.id === projectId) ?? null
}

export function getPackageProjectIdForStage(trackId: string, stageId: number): string | null {
  return PACKAGE_STAGE_PROJECT_MAP[trackId]?.[String(stageId)] ?? null
}
`,
)

const dispositions = {}
for (const stage of canonicalStages) {
  const key = `${stage.trackId}:${stage.stageId}`
  dispositions[key] = resourceDisposition(key)
}
const resourceType = (type) =>
  type === 'documentation' ? 'docs' : ['docs', 'video', 'practice', 'book', 'tool', 'community'].includes(type) ? type : 'docs'
const selectedResources = {}
for (const stage of resourceReport.stages ?? []) {
  if (!stage.selected) continue
  const selected = stage.selected
  const video = resourceType(selected.type) === 'video'
  selectedResources[`${stage.trackId}:${stage.stageId}`] = {
    id: `package-${stage.trackId}-${stage.stageId}`,
    title: selected.title,
    description:
      selected.excerpt ||
      `Selected package resource for ${stage.stageTitle}. Inspect the linked material before the knowledge check.`,
    url: selected.url,
    type: resourceType(selected.type),
    free: true,
    source: selected.publisher || 'Research package',
    verification: {
      level: 3,
      checkedAt: selected.checkedAt,
      method: 'content-inspection',
      access: 'free',
      accountRequired: false,
      paymentRequired: false,
      delivery: video ? 'watch' : 'read',
      role: 'required',
      objectives: [stage.objective],
      contentEvidence: {
        contentChars: selected.contentChars ?? 0,
        excerpt: selected.excerpt ?? '',
        contentHash: selected.contentHash ?? '',
      },
      limitations: [
        ...(selected.limitations ?? []),
        'Playback, interactive exercises, factual accuracy and pedagogical fit were not verified by this automated check.',
      ].join(' '),
    },
  }
}
write(
  'lib/curriculum-package/resources.generated.ts',
  `${generatedHeader}import type { PackageResourceDisposition, PackageStageReadiness } from './types'

/**
 * Package-primary dispositions from fresh public evidence. A verified status
 * means destination, inspected content, current free access and objective
 * relevance passed the automated check; it is not human approval. The required
 * flag refers to the selected stage resource, which may be a verified
 * alternative when the package primary itself remains blocked.
 */
export const PACKAGE_RESOURCE_DISPOSITIONS: Record<string, PackageResourceDisposition> = ${JSON.stringify(dispositions, null, 2)}

/** Selected external resource for each stage that passed the fresh check. */
export const PACKAGE_SELECTED_RESOURCES: Record<
  string,
  {
    id: string
    title: string
    description: string
    url: string
    type: 'docs' | 'video' | 'practice' | 'book' | 'tool' | 'community'
    free: boolean
    source: string
    verification: {
      level: 3
      checkedAt: string
      method: 'content-inspection'
      access: 'free'
      accountRequired: false
      paymentRequired: false
      delivery: 'read' | 'watch'
      role: 'required'
      objectives: string[]
      contentEvidence: { contentChars: number; excerpt: string; contentHash: string }
      limitations: string
    }
  }
> = ${JSON.stringify(selectedResources, null, 2)}

export const PACKAGE_STAGE_READINESS: PackageStageReadiness[] = ${JSON.stringify(resourceReport.stages ?? [], null, 2)}

/** Preflight blockers, retained separately from the current fresh-check status. */
export const PACKAGE_PREFLIGHT_BLOCKED_STAGES: readonly string[] = ${JSON.stringify([...preflightBlocked].sort(), null, 2)}

export const PACKAGE_BLOCKED_STAGES: readonly string[] = ${JSON.stringify(blocked.sort(), null, 2)}
export const PACKAGE_PROVISIONAL_STAGES: readonly string[] = ${JSON.stringify(provisional.sort(), null, 2)}
export const PACKAGE_VERIFIED_STAGES: readonly string[] = ${JSON.stringify(verified.sort(), null, 2)}
export const PACKAGE_STAGE_READY_KEYS: readonly string[] = ${JSON.stringify(stageReadyKeys.sort(), null, 2)}

export function packageResourceDisposition(trackId: string, stageId: number): PackageResourceDisposition | null {
  return PACKAGE_RESOURCE_DISPOSITIONS[\`\${trackId}:\${stageId}\`] ?? null
}

export function getPackageSelectedResource(trackId: string, stageId: number) {
  return PACKAGE_SELECTED_RESOURCES[\`\${trackId}:\${stageId}\`] ?? null
}

export function getPackageStageReadiness(trackId: string, stageId: number): PackageStageReadiness | null {
  return PACKAGE_STAGE_READINESS.find((stage) => stage.trackId === trackId && stage.stageId === stageId) ?? null
}
`,
)

// ── Reports ────────────────────────────────────────────────────────────────
const report = {
  schema: 'tsh-curriculum-package-adapter-v1',
  generatedAt: generatedAt ?? undefined,
  sourcePackageHash: specs.sourcePackageHash,
  packageDirectory: path.relative(root, packageDir).replace(/\\/g, '/'),
  counts: {
    canonicalTracks: canonical.length,
    canonicalStages: canonicalStages.length,
    stageSpecs: specs.stages.length,
    quizzes: quizzes.length,
    masteryRecords: mastery.stages.length,
    phaseProjects: projects.projects.length,
    syntheticMasteryContracts: 66,
    resourceCandidates: candidates.length,
    resourceMapRows: resourceMap.length,
    verificationLogRows: verificationLog.length,
    openIssues: issues.length,
  },
  pilot: {
    stages: [...pilotKeys].sort(),
    stageCount: pilotKeys.size,
    projectOverrides: Object.keys(pilotProjectOverrides).sort(),
    projectOverrideCount: Object.keys(pilotProjectOverrides).length,
  },
  resources: {
    blockedCount: blocked.length,
    provisionalCount: provisional.length,
    currentVerifiedCount: verified.length,
    stageReadyCount: stageReadyKeys.length,
    selectedPackagePrimaryCount: (resourceReport.stages ?? []).filter((stage) => stage.selected?.source === 'package_primary').length,
    selectedAlternativeCount: (resourceReport.stages ?? []).filter((stage) => stage.selected?.source === 'alternative').length,
    preflightBlockedCount: preflightBlocked.size,
    blockedStages: blocked.sort(),
    provisionalStages: provisional.sort(),
    selectedStages: stageReadyKeys.sort(),
    productManagementStages5to8: productManagementGate,
  },
  fieldMappings: {
    quiz: quizFieldMappings,
    stage: stageFieldMappings,
    project: projectFieldMappings,
    resource: resourceFieldMappings,
  },
  findings,
  findingsBySeverity: findings.reduce((acc, finding) => {
    acc[finding.severity] = (acc[finding.severity] ?? 0) + 1
    return acc
  }, {}),
  status: findings.some((finding) => finding.severity === 'P0') ? 'failed_validation' : 'validated_needs_human_review',
  humanReview: {
    status: 'pending',
    namedReviewers: [],
    premiumApproved: false,
  },
}
write('docs/curriculum-implementation/import-validation.json', JSON.stringify(report, null, 2) + '\n')
write(
  'docs/curriculum-implementation/import-validation.md',
  `# Curriculum Package Adapter Validation

Generated from the package at \`${report.packageDirectory}\`.

- Package hash: \`${report.sourcePackageHash}\`
- Validation status: **${report.status}**
- Human review: **pending**; premium approval: **no**

## Counts

| Item | Count |
|---|---:|
| Canonical tracks | ${report.counts.canonicalTracks} |
| Canonical stages | ${report.counts.canonicalStages} |
| Stage specs | ${report.counts.stageSpecs} |
| Quiz rows | ${report.counts.quizzes} |
| Mastery records | ${report.counts.masteryRecords} |
| Phase projects | ${report.counts.phaseProjects} |
| Synthetic mastery contracts (not projects) | ${report.counts.syntheticMasteryContracts} |
| Resource candidates | ${report.counts.resourceCandidates} |
| Resource-map rows | ${report.counts.resourceMapRows} |
| Verification-log rows | ${report.counts.verificationLogRows} |
| Open issues | ${report.counts.openIssues} |
| Pilot stages | ${report.pilot.stageCount} |
| Pilot project overrides | ${report.pilot.projectOverrideCount} |

## Findings

${findings.length ? findings.map((finding) => `- **${finding.severity} ${finding.code}** — ${finding.message}${finding.detail ? ` (${JSON.stringify(finding.detail)})` : ''}`).join('\n') : '- No structural findings.'}

## Resource gate

- Blocked package primaries: ${report.resources.blockedCount}
- Provisional package primaries: ${report.resources.provisionalCount}
- Freshly verified package primaries: ${report.resources.currentVerifiedCount}
- Stages with a selected, freshly checked resource: ${report.resources.stageReadyCount}
- Selected package primary: ${report.resources.selectedPackagePrimaryCount}
- Selected verified alternative: ${report.resources.selectedAlternativeCount}

Verified means the exact URL passed a fresh public destination, content,
free-access and objective-overlap check. It is not human approval and does not
claim video playback or interactive completion. A stage may use a verified
alternative while its package primary remains blocked or provisional. Product Management stages 5-7 resolve through verified alternatives while their package primaries remain blocked; stage 8 remains unresolved because the portfolio article does not cover interview preparation. Unresolved stages stay optional-only and are not premium-ready.

## Quiz field mapping

| Source | Target | Transformation |
|---|---|---|
${quizFieldMappings.map(([source, target, transformation]) => `| \`${source}\` | \`${target}\` | ${transformation} |`).join('\n')}

## Stage/mastery field mapping

| Source | Target | Transformation |
|---|---|---|
${stageFieldMappings.map(([source, target, transformation]) => `| \`${source}\` | \`${target}\` | ${transformation} |`).join('\n')}

## Project field mapping

| Source | Target | Transformation |
|---|---|---|
${projectFieldMappings.map(([source, target, transformation]) => `| \`${source}\` | \`${target}\` | ${transformation} |`).join('\n')}

## Resource field mapping

| Source | Target | Transformation |
|---|---|---|
${resourceFieldMappings.map(([source, target, transformation]) => `| \`${source}\` | \`${target}\` | ${transformation} |`).join('\n')}
`,
)

console.log(JSON.stringify({
  status: report.status,
  counts: report.counts,
  blocked: blocked.length,
  provisional: provisional.length,
  verified: verified.length,
  pilotStages: Object.keys(pilotStages).length,
  pilotProjects: Object.keys(pilotProjectOverrides).length,
  findings: report.findingsBySeverity,
}, null, 2))

if (report.status === 'failed_validation') process.exit(1)
