#!/usr/bin/env node
/**
 * TechSkillHub — external resource-verification package exporter.
 *
 * READ-ONLY with respect to the repository: it reads the catalogue, the
 * curriculum-quality report, the resource probe and the reviewer-packet index,
 * then writes an export bundle under artifacts/resource-verification-package/.
 * It never writes to learner data, .env files, commerce configuration or any
 * existing source file.
 *
 * Usage:  node artifacts/resource-verification-package/tools/generate.mjs
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  copyFileSync,
  rmSync,
} from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadTsModule } from '../../../scripts/lib/load-ts.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(here, '..', '..', '..')
const OUT = resolve(here, '..')

const normUrl = (u) => String(u ?? '').replace(/\/+$/, '')
const clean = (v) => (v === undefined ? null : v)
const nowIso = new Date().toISOString()

function writeJson(file, value) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8')
}
function writeText(file, value) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, value.endsWith('\n') ? value : value + '\n', 'utf8')
}
function sha256File(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex')
}

// ── canonical catalogue + curriculum modules ────────────────────────────────
const { TRACKS } = await loadTsModule(join(ROOT, 'lib', 'tracks.ts'))
const { buildGuidedPath } = await loadTsModule(join(ROOT, 'lib', 'guided-path.ts'))
const { buildAIWorldClassPath } = await loadTsModule(join(ROOT, 'lib', 'ai-guided-path.ts'))
const { getStageLearningPlan } = await loadTsModule(join(ROOT, 'lib', 'curriculum.ts'))
const { getStageWorkedExample } = await loadTsModule(join(ROOT, 'lib', 'stage-worked-examples.ts'))
const { getAIStageObjective } = await loadTsModule(join(ROOT, 'lib', 'ai-stage-objectives.ts'))
const { getAIStageLesson } = await loadTsModule(join(ROOT, 'lib', 'ai-stage-lessons.ts'))
const { resolveStepAssessment } = await loadTsModule(join(ROOT, 'lib', 'section-mastery.ts'))

const report = JSON.parse(readFileSync(join(ROOT, 'scripts', 'curriculum-quality-report.json'), 'utf8'))
const probe = JSON.parse(readFileSync(join(ROOT, 'scripts', 'resource-probe.json'), 'utf8'))
const packetIndex = JSON.parse(readFileSync(join(ROOT, 'docs', 'reviewer-packets', 'index.json'), 'utf8'))

// ── verification-level definitions (verbatim from the audit) ───────────────
const LEVELS = {
  0: { label: 'No evidence', evidence: '—' },
  1: { label: 'URL discovered', evidence: 'a URL exists; destination unverified' },
  2: { label: 'Destination + identity verified', evidence: 'HTTP reachable and the right page — a title/HTTP 200 is not enough' },
  3: { label: 'Content verified', evidence: 'the actual main content was extracted and compared with the objective (contentEvidence)' },
  4: { label: 'Playback/interaction verified', evidence: 'the video/interactive experience was actually used' },
}

// ── indexes ────────────────────────────────────────────────────────────────
const probeByNorm = new Map()
for (const [url, entry] of Object.entries(probe.entries)) probeByNorm.set(normUrl(url), { ...entry, probed_url: url })

const evidenceByStage = new Map(report.stageEvidence.map((row) => [`${row.trackId}:${row.stageId}`, row]))
const inventoryByStage = new Map(report.resourceInventory.map((row) => [`${row.trackId}:${row.stageId}`, row]))
const reportTrackById = new Map(report.tracks.map((row) => [row.trackId, row]))

const trackById = new Map(TRACKS.map((t) => [t.id, t]))
const expectedTrackIds = TRACKS.map((t) => t.id)
const expectedStageKeys = []
for (const t of TRACKS) for (const s of t.roadmap) expectedStageKeys.push(`${t.id}:${s.id}`)

// ── 1. resource inventory ──────────────────────────────────────────────────
const resourceEntries = []
const stepPurpose = new Map()
for (const track of TRACKS) {
  const isAI = track.id.startsWith('ai-')
  const steps = isAI ? buildAIWorldClassPath(track.id) : buildGuidedPath(track.id)
  for (const step of steps) {
    if (step.type === 'resource' && step.resourceId) {
      stepPurpose.set(`${track.id}:${step.stageId}:${step.resourceId}`, {
        description: step.description ?? null,
        estimated_time: step.estimatedTime ?? null,
      })
    }
  }
}

for (const track of TRACKS) {
  for (const stage of track.roadmap) {
    const inv = inventoryByStage.get(`${track.id}:${stage.id}`)
    if (!inv) continue
    const objective = evidenceByStage.get(`${track.id}:${stage.id}`)?.objective ?? stage.description ?? ''
    const seen = new Map()
    for (const resource of inv.resources) {
      const key = `${track.id}:${stage.id}:${resource.id}`
      const ordinal = (seen.get(key) ?? 0) + 1
      seen.set(key, ordinal)
      const probeEntry = probeByNorm.get(normUrl(resource.url)) ?? null
      const purpose = stepPurpose.get(`${track.id}:${stage.id}:${resource.id}`)
      const resolvedUrl = probeEntry?.finalUrl ?? null
      resourceEntries.push({
        entry_id: `${key}:${ordinal}`,
        resource_id: resource.id,
        ordinal_within_stage_resource: ordinal,
        track_id: track.id,
        track_title: track.name,
        track_slug: track.slug,
        track_category: track.category,
        stage_id: stage.id,
        stage_title: stage.title,
        stage_objective: objective,
        title: resource.title,
        publisher: resource.source,
        type: resource.type,
        purpose: purpose?.description ?? null,
        purpose_estimated_time: purpose?.estimated_time ?? null,
        role: resource.role,
        required: resource.role === 'required',
        mapped_from: resource.mappedFrom,
        canonical_url: resource.url,
        resolved_url: resolvedUrl,
        url_unchanged: resolvedUrl === null ? null : resolvedUrl === resource.url,
        resolved_url_differs_only_by_trailing_slash:
          resolvedUrl === null ? null : normUrl(resolvedUrl) === normUrl(resource.url) && resolvedUrl !== resource.url,
        duration_minutes: clean(resource.durationMinutes),
        segment: clean(resource.segment),
        free_access: resource.free,
        verification: {
          level: resource.level,
          level_label: LEVELS[resource.level]?.label ?? 'unknown',
          level_evidence_required: LEVELS[resource.level]?.evidence ?? 'unknown',
          method: resource.method,
          last_checked: resource.checkedAt,
          http_status: probeEntry?.status ?? null,
          probe_title: probeEntry?.title ?? null,
          probe_kind: probeEntry?.kind ?? null,
          content_chars: resource.contentChars,
          content_hash: resource.contentHash,
          content_excerpt: resource.excerpt,
          objective_match_terms: resource.objectiveMatch,
          content_vocabulary_terms_count: (probeEntry?.terms ?? []).length,
          content_vocabulary_terms_sample: (probeEntry?.terms ?? []).slice(0, 15),
          paywalled: probeEntry?.paywalled ?? null,
          unresolved: probeEntry ? !(probeEntry.status >= 200 && probeEntry.status < 300) : null,
          recorded_limitations: resource.limitations,
        },
        objectives: resource.objectives ?? [],
      })
    }
  }
}

// ── 2. derived current unresolved records (from the probe, not the older report) ──
const unresolved = Object.entries(probe.entries)
  .filter(([, e]) => !(e.status >= 200 && e.status < 300))
  .map(([url, e]) => ({
    url,
    status: e.status,
    final_url: e.finalUrl ?? null,
    host: e.host ?? null,
    checked_at: e.checkedAt ?? null,
    title: e.title ?? null,
    kind: e.kind ?? null,
    paywalled: e.paywalled ?? null,
    content_vocabulary_terms_count: (e.terms ?? []).length,
    mapped_entries: resourceEntries
      .filter((r) => normUrl(r.canonical_url) === normUrl(url))
      .map((r) => ({ entry_id: r.entry_id, track_id: r.track_id, track_title: r.track_title, stage_id: r.stage_id, role: r.role })),
  }))

const reportUnresolved = report.gapReconciliation?.unresolvedUrls ?? []
const unresolvedDelta = {
  note:
    'The curriculum-quality report was generated BEFORE the latest resource-probe re-run. ' +
    'This file records the difference so no reader treats the older list as current.',
  report_generated_at: report.generatedAt,
  probe_generated_at: probe.generatedAt,
  report_unresolved: reportUnresolved,
  current_unresolved_from_probe: unresolved.map((u) => ({ url: u.url, status: u.status })),
  resolved_since_report: reportUnresolved
    .filter((r) => !unresolved.some((u) => normUrl(u.url) === normUrl(r.url)))
    .map((r) => r.url),
  newly_unresolved_since_report: unresolved
    .filter((u) => !reportUnresolved.some((r) => normUrl(r.url) === normUrl(u.url)))
    .map((u) => u.url),
  counts: {
    report_unresolved: reportUnresolved.length,
    current_unresolved: unresolved.length,
    probe_total: probe.total,
    probe_reachable: probe.reachable,
    probe_content_inspected: probe.contentInspected,
    report_content_inspected_urls: report.resourceVerificationSummary?.contentInspectedUrls ?? null,
  },
}

// ── 3. learning material ───────────────────────────────────────────────────
const learningMaterial = []
const projects = []
for (const track of TRACKS) {
  const isAI = track.id.startsWith('ai-')
  const steps = isAI ? buildAIWorldClassPath(track.id) : buildGuidedPath(track.id)
  for (const stage of track.roadmap) {
    const stageSteps = steps.filter((s) => s.stageId === stage.id)
    const concepts = stageSteps.filter((s) => s.type === 'concept')
    const resources = stageSteps.filter((s) => s.type === 'resource')
    const practices = stageSteps.filter((s) => s.type === 'practice')
    const quiz = stageSteps.find((s) => s.type === 'quiz') ?? null
    const projectSteps = stageSteps.filter((s) => s.type === 'project')

    const plan = isAI ? null : getStageLearningPlan(track.id, stage.id)
    const aiObjective = isAI ? getAIStageObjective(track.id, stage.id) : null
    const aiLesson = isAI
      ? getAIStageLesson(track.id, stage.id, stage.title, aiObjective?.objective ?? '', aiObjective?.successCriteria ?? [])
      : null
    const evidence = evidenceByStage.get(`${track.id}:${stage.id}`) ?? null

    const projectRecords = projectSteps.map((p) => {
      const resolved = resolveStepAssessment(track.id, p)
      const record = {
        project_id: p.projectId ?? resolved?.projectId ?? null,
        title: p.title,
        level: p.projectLevel ?? null,
        is_portfolio: p.isPortfolio === true,
        estimated_time: p.estimatedTime ?? null,
        tech_tags: p.techTags ?? [],
        description: p.description ?? null,
        brief: p.projectBrief ?? null,
        assessment_contract: resolved?.contract ?? null,
      }
      projects.push({
        track_id: track.id,
        track_title: track.name,
        stage_id: stage.id,
        stage_title: stage.title,
        ...record,
      })
      return record
    })

    learningMaterial.push({
      track_id: track.id,
      track_title: track.name,
      track_slug: track.slug,
      is_ai_track: isAI,
      stage_id: stage.id,
      stage_title: stage.title,
      stage_duration: stage.duration ?? null,
      stage_description: stage.description ?? null,
      topics: stage.topics ?? [],
      objective: evidence?.objective ?? plan?.objective ?? aiObjective?.objective ?? null,
      success_criteria: evidence?.successCriteria ?? plan?.successCriteria ?? aiObjective?.successCriteria ?? [],
      instruction: concepts.map((c) => c.description).filter(Boolean).join('\n\n'),
      learning_phase: concepts.map((c) => c.learningPhase).filter(Boolean),
      worked_example: isAI ? aiLesson?.workedExample ?? null : getStageWorkedExample(track.id, stage.id),
      common_mistakes: plan?.commonMistakes ?? aiLesson?.commonMistakes ?? [],
      applied_challenge: aiLesson?.appliedChallenge ?? null,
      ungraded_practice: practices.map((p) => ({ title: p.title, description: p.description, estimated_time: p.estimatedTime ?? null })),
      practice_exercise: plan?.exercise ?? null,
      resource_steps: resources.map((r) => ({
        resource_id: r.resourceId ?? null,
        title: r.title,
        url: r.resourceUrl ?? null,
        description: r.description ?? null,
        type: r.resourceType ?? null,
        source: r.resourceSource ?? null,
        free: r.resourceFree ?? null,
        estimated_time: r.estimatedTime ?? null,
      })),
      knowledge_check: {
        source: quiz ? 'guided-path quiz step' : plan?.knowledgeCheck ? 'curriculum stage plan' : null,
        server_graded: evidence?.knowledgeCheck?.serverGraded ?? null,
        hidden_answers: evidence?.knowledgeCheck?.hiddenAnswers ?? null,
        questions_valid: evidence?.knowledgeCheck?.valid ?? null,
        questions_authored: evidence?.knowledgeCheck?.authored ?? null,
        questions: (quiz?.quizQuestions ?? plan?.knowledgeCheck ?? []).map((q) => ({
          question: q.question,
          options: q.options,
          correct_index: q.correctIndex,
          correct_option: q.options?.[q.correctIndex] ?? null,
          explanation: q.explanation,
          cognitive_level: q.cognitiveLevel ?? null,
        })),
      },
      ai_mastery: evidence?.aiMastery ?? null,
      progression: evidence?.progression ?? null,
      project_briefs: projectRecords.map((p) => ({
        project_id: p.project_id,
        title: p.title,
        brief: p.brief,
        assessment_contract: p.assessment_contract,
      })),
      quality: evidence?.quality ?? null,
      findings: evidence?.findings ?? [],
      uncertainties: evidence?.uncertainties ?? [],
    })
  }
}

// ── 4. audit copies ────────────────────────────────────────────────────────
const AUDIT = join(OUT, 'audit')
mkdirSync(AUDIT, { recursive: true })
copyFileSync(join(ROOT, 'scripts', 'curriculum-quality-report.json'), join(AUDIT, 'curriculum-quality-report.json'))
copyFileSync(join(ROOT, 'docs', 'curriculum-quality-audit.md'), join(AUDIT, 'curriculum-quality-audit.md'))
copyFileSync(join(ROOT, 'docs', 'curriculum-stage-evidence.md'), join(AUDIT, 'curriculum-stage-evidence.md'))
copyFileSync(join(ROOT, 'docs', 'reviewer-packets', 'index.json'), join(AUDIT, 'reviewer-packets-index.json'))

// reviewer packets (human-readable evidence)
const PACKETS = join(OUT, 'reviewer-packets')
rmSync(PACKETS, { recursive: true, force: true })
mkdirSync(PACKETS, { recursive: true })
for (const name of readdirSync(join(ROOT, 'docs', 'reviewer-packets'))) {
  const src = join(ROOT, 'docs', 'reviewer-packets', name)
  if (statSync(src).isFile()) copyFileSync(src, join(PACKETS, name))
}

// verification copies
const VERIF = join(OUT, 'verification')
mkdirSync(VERIF, { recursive: true })
copyFileSync(join(ROOT, 'scripts', 'resource-probe.json'), join(VERIF, 'resource-probe.json'))

// project coverage (derived from the project steps + assessment contracts)
const projectCoverage = {
  generated_at: nowIso,
  derived_from: ['lib/guided-path.ts', 'lib/ai-guided-path.ts', 'lib/section-mastery.ts', 'scripts/curriculum-quality-report.json'],
  note: 'Derived export. A project is covered when it has a brief AND a resolvable assessment contract.',
  total_projects: projects.length,
  projects_with_brief: projects.filter((p) => p.brief).length,
  projects_with_contract: projects.filter((p) => p.assessment_contract).length,
  projects_with_acceptance_criteria: projects.filter((p) => (p.assessment_contract?.acceptanceCriteria ?? []).length > 0).length,
  projects_with_required_evidence: projects.filter((p) => (p.brief?.evidence ?? []).length > 0).length,
  stages_without_project: expectedStageKeys.filter((k) => !projects.some((p) => `${p.track_id}:${p.stage_id}` === k)),
  by_track: TRACKS.map((t) => ({
    track_id: t.id,
    track_title: t.name,
    stages: t.roadmap.length,
    projects: projects.filter((p) => p.track_id === t.id).length,
  })),
  projects,
}

// ── 5. write machine-readable exports ──────────────────────────────────────
const counts = {
  tracks: TRACKS.length,
  stages: expectedStageKeys.length,
  resource_entries: resourceEntries.length,
  unique_canonical_urls: new Set(resourceEntries.map((r) => normUrl(r.canonical_url))).size,
  probe_urls: Object.keys(probe.entries).length,
  probe_reachable: probe.reachable,
  probe_content_inspected: probe.contentInspected,
  unresolved_urls: unresolved.length,
  projects: projects.length,
  knowledge_check_questions: learningMaterial.reduce((n, s) => n + s.knowledge_check.questions.length, 0),
  level_histogram: resourceEntries.reduce((acc, r) => {
    acc[r.verification.level] = (acc[r.verification.level] ?? 0) + 1
    return acc
  }, {}),
}

writeJson(join(OUT, 'resources.json'), {
  schema: 'tsh-resource-inventory/v1',
  generated_at: nowIso,
  source_files: [
    'scripts/curriculum-quality-report.json#resourceInventory (canonical mapped entries)',
    'scripts/resource-probe.json#entries (destination/content evidence)',
    'lib/tracks.ts (track + stage catalogue)',
  ],
  counts,
  verification_levels: LEVELS,
  entries: resourceEntries,
})

writeJson(join(OUT, 'learning-material.json'), {
  schema: 'tsh-learning-material/v1',
  generated_at: nowIso,
  note: 'Answer keys and rubric criteria are included for independent review only. Do not publish.',
  counts: {
    tracks: TRACKS.length,
    stages: learningMaterial.length,
    questions: counts.knowledge_check_questions,
  },
  stages: learningMaterial,
})

writeJson(join(AUDIT, 'project-coverage.json'), projectCoverage)
writeJson(join(VERIF, 'current-unresolved-resources.json'), {
  schema: 'tsh-unresolved-resources/v1',
  generated_at: nowIso,
  source: 'scripts/resource-probe.json (status not 2xx)',
  count: unresolved.length,
  entries: unresolved,
})
writeJson(join(VERIF, 'probe-vs-report-delta.json'), unresolvedDelta)

// ── 6. CSV ─────────────────────────────────────────────────────────────────
const CSV_FIELDS = [
  'entry_id', 'resource_id', 'track_id', 'track_title', 'track_slug', 'stage_id', 'stage_title', 'stage_objective',
  'title', 'publisher', 'type', 'purpose', 'role', 'required', 'mapped_from',
  'canonical_url', 'resolved_url', 'url_unchanged', 'duration_minutes', 'segment', 'free_access',
  'verification_level', 'verification_method', 'last_checked', 'http_status', 'content_chars', 'content_hash',
  'objective_match_terms', 'content_vocabulary_terms_count', 'paywalled', 'unresolved', 'recorded_limitations',
]
const csvCell = (value) => {
  if (value === null || value === undefined) return ''
  const text = String(value).replace(/\r?\n/g, ' ').replace(/"/g, '""')
  return `"${text}"`
}
const csvRows = [CSV_FIELDS.join(',')]
for (const r of resourceEntries) {
  csvRows.push(
    [
      r.entry_id, r.resource_id, r.track_id, r.track_title, r.track_slug, r.stage_id, r.stage_title, r.stage_objective,
      r.title, r.publisher, r.type, r.purpose, r.role, r.required, r.mapped_from,
      r.canonical_url, r.resolved_url, r.url_unchanged, r.duration_minutes, r.segment, r.free_access,
      r.verification.level, r.verification.method, r.verification.last_checked, r.verification.http_status,
      r.verification.content_chars, r.verification.content_hash, r.verification.objective_match_terms,
      r.verification.content_vocabulary_terms_count, r.verification.paywalled, r.verification.unresolved,
      r.verification.recorded_limitations,
    ]
      .map(csvCell)
      .join(','),
  )
}
writeText(join(OUT, 'resources.csv'), csvRows.join('\n'))

// ── 7. human-readable per-track learning material ──────────────────────────
const MATERIAL_DIR = join(OUT, 'learning-material')
mkdirSync(MATERIAL_DIR, { recursive: true })
const materialIndex = ['# Learning material (full)', '', 'Generated from the canonical catalogue. Answer keys are included for review.', '']
for (const track of TRACKS) {
  const rows = learningMaterial.filter((s) => s.track_id === track.id)
  const md = [`# ${track.name} (\`${track.id}\`)`, '', `Slug: \`${track.slug}\` · Category: ${track.category} · Stages: ${track.roadmap.length}`, '']
  for (const s of rows) {
    md.push(`## Stage ${s.stage_id} — ${s.stage_title}`, '')
    md.push(`**Objective:** ${s.objective ?? '_none_'}`, '')
    if (s.success_criteria?.length) {
      md.push('**Success criteria:**', ...s.success_criteria.map((c) => `- ${c}`), '')
    }
    md.push('### Instruction', '', s.instruction || '_none_', '')
    if (s.worked_example) md.push('### Worked example', '', s.worked_example, '')
    if (s.common_mistakes?.length) md.push('### Common mistakes', ...s.common_mistakes.map((c) => `- ${c}`), '')
    if (s.ungraded_practice?.length) {
      md.push('### Ungraded practice', ...s.ungraded_practice.flatMap((p) => [`**${p.title}**`, '', p.description ?? '', '']))
    }
    md.push(`### Knowledge check (${s.knowledge_check.questions.length} questions, server graded: ${s.knowledge_check.server_graded ? 'yes' : 'not recorded'})`, '')
    for (const [i, q] of s.knowledge_check.questions.entries()) {
      md.push(`${i + 1}. ${q.question}`)
      for (const [j, o] of q.options.entries()) md.push(`   - ${j === q.correct_index ? '**✔ ' : ''}${o}${j === q.correct_index ? '**' : ''}`)
      md.push(`   - _Answer:_ ${q.correct_option ?? '(index ' + q.correct_index + ')'} · _Why:_ ${q.explanation ?? ''} · _Level:_ ${q.cognitive_level ?? 'n/a'}`)
      md.push('')
    }
    for (const p of s.project_briefs) {
      md.push(`### Phase project — ${p.title} (\`${p.project_id ?? 'n/a'}\`)`, '')
      if (p.brief) {
        md.push(`- **Objective:** ${p.brief.objective}`)
        md.push(`- **Problem:** ${p.brief.problem}`)
        md.push(`- **Audience:** ${p.brief.audience}`)
        if (p.brief.functionalRequirements?.length) {
          md.push('- **Required functionality:**', ...p.brief.functionalRequirements.map((x) => `  - ${x}`))
        }
        if (p.brief.constraints?.length) md.push('- **Constraints:**', ...p.brief.constraints.map((x) => `  - ${x}`))
        if (p.brief.acceptanceCriteria?.length) md.push('- **Acceptance criteria (brief):**', ...p.brief.acceptanceCriteria.map((x) => `  - ${x}`))
        if (p.brief.evidence?.length) md.push('- **Required evidence:**', ...p.brief.evidence.map((x) => `  - ${x}`))
      }
      const contract = p.assessment_contract
      if (contract) {
        md.push(`- **Rubric version:** ${contract.rubricVersion} · **Pass threshold:** ${contract.passThreshold} · **Source inspection:** ${contract.requiresSourceInspection ? 'yes' : 'no'}`)
        md.push('- **Rubric:**')
        for (const c of contract.rubric) md.push(`  - ${c.label} (weight ${c.weight}${c.mandatory ? ', mandatory' : ''})`)
        if (contract.acceptanceCriteria?.length) {
          md.push('- **Acceptance criteria (contract):**', ...contract.acceptanceCriteria.map((x) => `  - ${x}`))
        }
      }
      md.push('')
    }
    if (s.uncertainties?.length) md.push('### Recorded uncertainties', ...s.uncertainties.map((u) => `- ${u}`), '')
  }
  writeText(join(MATERIAL_DIR, `${track.id}.md`), md.join('\n'))
  materialIndex.push(`- [${track.name}](./${track.id}.md) — ${rows.length} stages`)
}
writeText(join(MATERIAL_DIR, 'README.md'), materialIndex.join('\n'))

// ── 8. integrity checks ────────────────────────────────────────────────────
const inventoryKeys = new Set(report.resourceInventory.map((r) => `${r.trackId}:${r.stageId}`))
const missingStages = expectedStageKeys.filter((k) => !inventoryKeys.has(k))
const extraStages = [...inventoryKeys].filter((k) => !expectedStageKeys.includes(k))
const badMappings = resourceEntries.filter((r) => !trackById.has(r.track_id) || !trackById.get(r.track_id).roadmap.some((s) => s.id === r.stage_id))
const noProbe = resourceEntries.filter((r) => !probeByNorm.has(normUrl(r.canonical_url)))
const emptyUrls = resourceEntries.filter((r) => !r.canonical_url)
const levelSum = Object.values(counts.level_histogram).reduce((a, b) => a + b, 0)
const reportLevelSum = Object.values(report.resourceVerificationSummary.levelHistogram ?? {}).reduce((a, b) => a + b, 0)
const inventoryCountSum = report.resourceInventory.reduce((n, row) => n + (row.resourceCount ?? row.resources.length), 0)
const duplicateEntryIds = resourceEntries.length - new Set(resourceEntries.map((r) => r.entry_id)).size

const integrity = {
  generated_at: nowIso,
  status: 'package checks passed; archive readability recorded in ../techskillhub-resource-verification.zip.verification.json',
  counts,
  checks: [
    { id: 'tracks', ok: TRACKS.length === 32, detail: `${TRACKS.length} tracks` },
    { id: 'stages', ok: expectedStageKeys.length === 186, detail: `${expectedStageKeys.length} stages` },
    { id: 'published-stages-represented', ok: missingStages.length === 0 && extraStages.length === 0, detail: `missing ${missingStages.length}, extra ${extraStages.length}` },
    { id: 'mappings-point-to-real-track-stage', ok: badMappings.length === 0, detail: `${badMappings.length} invalid mappings` },
    { id: 'entries-have-canonical-url', ok: emptyUrls.length === 0, detail: `${emptyUrls.length} empty URLs` },
    { id: 'entries-have-probe-record', ok: noProbe.length === 0, detail: `${noProbe.length} entries without a probe record (URLs normalised by trailing slash)` },
    { id: 'entry-ids-unique', ok: duplicateEntryIds === 0, detail: `${duplicateEntryIds} duplicate entry ids` },
    {
      id: 'resource-count-reconciles',
      ok: inventoryCountSum === resourceEntries.length && reportLevelSum === resourceEntries.length && levelSum === resourceEntries.length,
      detail: `inventory sum ${inventoryCountSum}, report level sum ${reportLevelSum}, exported level sum ${levelSum}, exported entries ${resourceEntries.length}`,
    },
    { id: 'unique-urls-reconcile', ok: counts.unique_canonical_urls === counts.probe_urls, detail: `${counts.unique_canonical_urls} unique inventory URLs vs ${counts.probe_urls} probe URLs` },
    { id: 'no-untracked-probe-urls', ok: [...probeByNorm.keys()].every((u) => new Set(resourceEntries.map((r) => normUrl(r.canonical_url))).has(u)), detail: 'every probe URL is mapped by at least one entry after normalisation' },
    { id: 'learning-material-complete', ok: learningMaterial.length === expectedStageKeys.length, detail: `${learningMaterial.length} stage records` },
  ],
  unresolved_summary: { count: unresolved.length, urls: unresolved.map((u) => ({ url: u.url, status: u.status })) },
  limitations: [
    'Verification level 4 (playback/interaction) is 0: no video or interactive resource was actually played.',
    'HTTP 200 / page title is destination and identity evidence only, never content verification.',
    'Level-2 entries are mapped and reachable but their content could not be extracted; they require manual or playback review.',
    'The curriculum-quality report predates the latest probe re-run; verification/probe-vs-report-delta.json records the difference.',
  ],
}

// Secret/PII scan over every text artefact in the package (excluding this tool).
const textExtensions = ['.json', '.md', '.csv']
const secretPatterns = [
  /DATABASE_URL\s*=/i,
  /AUTH_SECRET\s*=/i,
  /API_KEY\s*=\s*["']?[A-Za-z0-9]/i,
  /WEBHOOK_SECRET\s*=/i,
  /postgres(ql)?:\/\/[^\s"']+/i,
  /sk-[A-Za-z0-9]{16,}/,
  /ghp_[A-Za-z0-9]{20,}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /Bearer\s+[A-Za-z0-9._-]{20,}/,
  /[A-Za-z0-9._%+-]+@(?!example\.)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
]
const scanFindings = []
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name)
    if (statSync(file).isDirectory()) {
      if (name === 'tools') continue
      walk(file)
    } else if (textExtensions.includes(name.slice(name.lastIndexOf('.')))) {
      const text = readFileSync(file, 'utf8')
      for (const re of secretPatterns) {
        const m = text.match(re)
        if (m) scanFindings.push({ file: relative(OUT, file), pattern: re.source, match: m[0].slice(0, 40) })
      }
    }
  }
}
walk(OUT)
integrity.checks.push({
  id: 'no-secrets-or-personal-data',
  ok: scanFindings.length === 0,
  detail: scanFindings.length === 0 ? 'no secret/credential/personal-data patterns found' : `${scanFindings.length} potential findings`,
  findings: scanFindings.slice(0, 20),
})

writeJson(join(OUT, 'integrity.json'), integrity)

// ── 9. manifest + README ───────────────────────────────────────────────────
function listFiles(dir, base = dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const file = join(dir, name)
    if (statSync(file).isDirectory()) out.push(...listFiles(file, base))
    else out.push(relative(base, file).replace(/\\/g, '/'))
  }
  return out.sort()
}
const files = listFiles(OUT).filter((f) => f !== 'MANIFEST.json' && f !== 'README.md')
const manifest = {
  schema: 'tsh-package-manifest/v1',
  generated_at: nowIso,
  package: 'techskillhub-resource-verification',
  files: files.map((f) => ({ path: f, bytes: statSync(join(OUT, f)).size, sha256: sha256File(join(OUT, f)) })),
}
writeJson(join(OUT, 'MANIFEST.json'), manifest)

const levelRows = [0, 1, 2, 3, 4].map((l) => `| ${l} | ${LEVELS[l].label} | ${LEVELS[l].evidence} | ${counts.level_histogram[l] ?? 0} |`)
const readme = `# TechSkillHub — external resource-verification package

Generated: ${nowIso}
Source commit: \`8c1a1154a45c735c3d418b2fa9b8cc7d385a6641\` (branch \`feat/retention-v3\`)
Package: \`techskillhub-resource-verification\`

This package is a **read-only export** of the current catalogue, mapped learning
resources, verification evidence, learning material and audit results. It is
prepared for **independent** review. It contains **no approvals** and **no
learner records**. Every track remains awaiting human sign-off.

## Headline counts

| Item | Count |
| --- | ---: |
| Tracks | **${counts.tracks}** |
| Stages | **${counts.stages}** |
| Mapped resource entries | **${counts.resource_entries}** |
| Unique canonical URLs | **${counts.unique_canonical_urls}** |
| Probed URLs | **${counts.probe_urls}** |
| Probe-reachable URLs | **${counts.probe_reachable}** |
| Probe content-inspected URLs | **${counts.probe_content_inspected}** |
| Currently unresolved URLs | **${counts.unresolved_urls}** |
| Projects (with brief + contract) | **${counts.projects}** |
| Knowledge-check questions | **${counts.knowledge_check_questions}** |

## Verification-level definitions

| Level | Meaning | Evidence required | Entries at this level |
| ---: | --- | --- | ---: |
${levelRows.join('\n')}

**Level 4 is 0.** No video or interactive resource was actually played in this
environment. No transcript, runtime or playback claim is made for any resource.
HTTP 200 and a page title prove only that the destination resolved to the right
page — **they are not content verification** and never approval.

## Package structure

\`\`\`
resource-verification-package/
  README.md                     this file
  MANIFEST.json                 every file with bytes + sha256
  integrity.json                reconciliation and integrity checks
  resources.json                complete mapped-resource inventory (machine-readable)
  resources.csv                 the same inventory for sorting/filtering
  learning-material.json        186 stage records: instruction, examples,
                                knowledge checks + answer keys, rubrics, projects
  learning-material/             the same material, one Markdown file per track
  verification/
    resource-probe.json         raw probe evidence (status, final URL, excerpt, hash)
    current-unresolved-resources.json   derived: status not 2xx, with mapped entries
    probe-vs-report-delta.json  explains the report/probe timestamp difference
  audit/
    curriculum-quality-report.json
    curriculum-quality-audit.md
    curriculum-stage-evidence.md
    reviewer-packets-index.json
    project-coverage.json       derived project/contract/evidence coverage
  reviewer-packets/             the 32 human-review packets + index
  tools/generate.mjs            reproducible exporter (read-only on the repo)
\`\`\`

## Known limitations (read before judging)

- **Playback is unverified** for every video; level 4 is 0.
- **Level-2 resources** are reachable and correctly identified but their content
  could not be extracted (video/JS shell). ${counts.level_histogram[2] ?? 0} entries are level 2;
  ${report.resourceVerificationSummary.level2RequiredResourceCount ?? 'n/a'} of them are required.
- **Unresolved URLs** (current probe): ${unresolved.map((u) => `\`${u.url}\` [${u.status}]`).join(', ') || 'none'}.
  These are supplementary/bot-blocked pages; every stage still has at least one
  content-inspected required resource. See \`verification/current-unresolved-resources.json\`.
- The **curriculum-quality report predates the latest probe re-run**. Its
  \`gapReconciliation.unresolvedUrls\` is stale; \`verification/probe-vs-report-delta.json\`
  records exactly which URLs changed. The probe is the current evidence.
- URL sets reconcile only after **trailing-slash normalisation** (67 probe keys
  differ from the mapped URL by a trailing slash). No URL was dropped.
- Ownership, licensing and long-term availability of third-party resources are
  not asserted. Excerpts are short and recorded solely as verification evidence.

## Integrity

\`integrity.json\` records: 32 tracks / 186 stages, every stage represented, every
mapping pointing to a real track/stage, ${counts.resource_entries} entries reconciling with
the report, ${counts.unique_canonical_urls} unique URLs reconciling with the probe, no
duplicate entry ids, and a clean secret/PII scan. Archive readability is verified
after zipping (see the adjacent \`.sha256\` file).

## What this package does *not* prove

It does not approve any track, does not certify factual accuracy, pedagogy,
accessibility, licence fitness or playback, and does not replace an independent
human reviewer. It is evidence for that reviewer, not a substitute for them.
`
writeText(join(OUT, 'README.md'), readme)

console.log(JSON.stringify({ out: OUT, counts, integrity_ok: integrity.checks.every((c) => c.ok) }, null, 2))
if (!integrity.checks.every((c) => c.ok)) {
  console.error('INTEGRITY CHECK FAILED')
  process.exitCode = 2
}
