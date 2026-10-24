/**
 * Reviewer packet generator.
 *
 * Produces one Markdown packet per track plus a machine-readable index, so a
 * genuine human (subject-matter, pedagogical and accessibility) reviewer has
 * every artefact needed to judge a course. It NEVER records approval: every
 * packet is explicitly "awaiting independent human review", and the index
 * records zero approvals. Automated evidence cannot stand in for review.
 *
 * Usage: node scripts/generate-reviewer-packets.mjs
 */

import { writeFileSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadTsModule } from './lib/load-ts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(root, 'docs', 'reviewer-packets')

const { TRACKS } = await loadTsModule(join(root, 'lib', 'tracks.ts'))
const { buildGuidedPath } = await loadTsModule(join(root, 'lib', 'guided-path.ts'))
const { getStageWorkedExample } = await loadTsModule(join(root, 'lib', 'stage-worked-examples.ts'))
const { buildAIWorldClassPath } = await loadTsModule(join(root, 'lib', 'ai-guided-path.ts'))
const { getStageLearningPlan } = await loadTsModule(join(root, 'lib', 'curriculum.ts'))
const { getAIStageObjective } = await loadTsModule(join(root, 'lib', 'ai-stage-objectives.ts'))
const { getAIStageLesson } = await loadTsModule(join(root, 'lib', 'ai-stage-lessons.ts'))
const { resolveStepAssessment } = await loadTsModule(join(root, 'lib', 'section-mastery.ts'))

const report = JSON.parse(readFileSync(join(root, 'scripts', 'curriculum-quality-report.json'), 'utf8'))
const inventory = new Map(report.resourceInventory.map((row) => [`${row.trackId}:${row.stageId}`, row]))
const assessment = new Map(report.tracks.map((row) => [row.trackId, row]))

const truncate = (text, n = 240) => {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim()
  return clean.length > n ? `${clean.slice(0, n - 1)}…` : clean
}
const cell = (text) => String(text ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')

rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })

const index = {
  generatedAt: report.generatedAt,
  note: 'Reviewer packets are preparation material only. No track is approved. Approval requires a genuine, named human sign-off recorded in docs/curriculum-quality-signoff.json.',
  approvedTracks: [],
  tracks: [],
}

for (const track of TRACKS) {
  const isAI = track.id.startsWith('ai-')
  const steps = isAI ? buildAIWorldClassPath(track.id) : buildGuidedPath(track.id)
  const outcome = assessment.get(track.id)

  const lines = []
  lines.push(`# Reviewer packet — ${track.name}`)
  lines.push('')
  lines.push(`- **Track id:** \`${track.id}\`  ·  **Slug:** \`${track.slug}\`  ·  **Category:** ${track.category}  ·  **AI track:** ${isAI ? 'yes' : 'no'}`)
  lines.push(`- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.`)
  lines.push(
    `- **Automated evidence (not approval):** readiness ${outcome ? outcome.curriculumReadiness : 'n/a'}/100 · worthiness ${outcome ? outcome.premiumWorthiness : 'n/a'}/100 · mandatory gates ${outcome && outcome.gatesPassed ? 'pass' : 'FAIL'}. A passing mechanical audit is not human sign-off.`,
  )
  lines.push('')
  lines.push('> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.')
  lines.push('')

  // 1. Objectives and sequence
  lines.push('## 1. Learning objectives and sequence')
  lines.push('')
  lines.push('| # | Stage | Objective | Est. time | Lessons |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const stage of track.roadmap) {
    const plan = isAI ? null : getStageLearningPlan(track.id, stage.id)
    const objective = isAI ? getAIStageObjective(track.id, stage.id)?.objective : plan?.objective
    lines.push(`| ${stage.id} | ${cell(stage.title)} | ${cell(truncate(objective, 200))} | ${cell(stage.duration)} | ${(stage.topics || []).length} |`)
  }
  lines.push('')

  // 2. Representative and high-risk lessons
  const rows = track.roadmap.map((stage) => {
    const inv = inventory.get(`${track.id}:${stage.id}`)
    const verified = inv ? inv.verifiedResourceCount : 0
    const matched = inv ? (inv.matchedResourceCount ?? 0) : 0
    const level4 = inv ? inv.resources.filter((r) => r.level === 4).length : 0
    const level2Required = inv ? inv.resources.filter((r) => r.level === 2 && r.role === 'required').length : 0
    return { stage, verified, matched, level4, level2Required, risk: (verified === 0 ? 4 : 0) + (matched === 0 ? 2 : 0) + level2Required }
  })
  const highRisk = [...rows].sort((a, b) => b.risk - a.risk).slice(0, 3)
  lines.push('## 2. Representative and high-risk lessons')
  lines.push('')
  lines.push(`Representative lessons (first, middle, last so a reviewer sees the whole arc): stages ${track.roadmap[0]?.id}, ${track.roadmap[Math.floor(track.roadmap.length / 2)]?.id}, ${track.roadmap[track.roadmap.length - 1]?.id}.`)
  lines.push('')
  lines.push('Highest-risk lessons by resource evidence (verify these first):')
  lines.push('')
  for (const row of highRisk) {
    lines.push(
      `- **Stage ${row.stage.id} — ${cell(row.stage.title)}**: content-inspected required resources ${row.verified}, objective-matching resources ${row.matched}, playback-verified resources ${row.level4}.`,
    )
  }
  lines.push('')

  // 3. External resource evidence
  lines.push('## 3. External resource evidence (destination + inspected content)')
  lines.push('')
  for (const stage of track.roadmap) {
    const inv = inventory.get(`${track.id}:${stage.id}`)
    lines.push(`### Stage ${stage.id} — ${cell(stage.title)}`)
    if (!inv || inv.resources.length === 0) {
      lines.push('')
      lines.push('_No mapped resource._')
      lines.push('')
      continue
    }
    lines.push('')
    lines.push('| Resource | Role | Level | Method | Duration | Match | URL |')
    lines.push('| --- | --- | --- | --- | --- | --- | --- |')
    for (const r of inv.resources) {
      lines.push(
        `| ${cell(truncate(r.title, 60))} | ${r.role} | L${r.level} | ${r.method} | ${r.durationMinutes ? `${r.durationMinutes} min` : '—'} | ${r.objectiveMatch ?? 0} | ${r.url} |`,
      )
    }
    for (const r of inv.resources) {
      if (r.excerpt) lines.push(`- _L${r.level} ${r.role} evidence — ${cell(r.source || '')}: “${cell(truncate(r.excerpt, 220))}”_`)
    }
    lines.push('')
  }

  // 4. Video duration / segments
  lines.push('## 4. Required video segments and measured duration')
  lines.push('')
  const videos = []
  for (const stage of track.roadmap) {
    const inv = inventory.get(`${track.id}:${stage.id}`)
    for (const r of inv?.resources ?? []) {
      if (r.type === 'video' || /youtube\.com|youtu\.be|vimeo\.com/.test(r.url)) videos.push({ stage: stage.id, ...r })
    }
  }
  if (videos.length === 0) {
    lines.push('No required video resources on this track — all required material is text/interactive.')
    lines.push('')
  } else {
    lines.push('| Stage | Video | Level | Published duration | Required segment |')
    lines.push('| --- | --- | --- | --- | --- |')
    for (const v of videos) {
      lines.push(
        `| ${v.stage} | ${cell(truncate(v.title, 55))} | L${v.level} | ${v.durationMinutes ? `${v.durationMinutes} min` : 'not verified'} | ${v.segment ? cell(v.segment) : 'not verified — review manually'} |`,
      )
    }
    lines.push('')
    lines.push('⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**')
    lines.push('')
  }

  // 5. Knowledge checks and answer keys
  lines.push('## 5. Knowledge checks and answer keys (internal)')
  lines.push('')
  for (const stage of track.roadmap) {
    const quiz = steps.find((s) => s.type === 'quiz' && s.stageId === stage.id)
    const questions = quiz?.quizQuestions ?? []
    lines.push(`### Stage ${stage.id} — ${cell(stage.title)} (${questions.length} question${questions.length === 1 ? '' : 's'})`)
    lines.push('')
    if (questions.length === 0) {
      lines.push('_No knowledge check on this stage._')
      lines.push('')
      continue
    }
    questions.forEach((q, i) => {
      lines.push(`${i + 1}. ${cell(q.question)}`)
      q.options.forEach((option, oi) => {
        lines.push(`   - ${oi === q.correctIndex ? '**✔' : '·'} ${cell(option)}${oi === q.correctIndex ? '**' : ''}`)
      })
      lines.push(`   - _Why:_ ${cell(q.explanation)}${q.cognitiveLevel ? ` · _level: ${q.cognitiveLevel}_` : ''}`)
    })
    lines.push('')
  }

  // 6. AI-assessment rubric
  lines.push('## 6. AI-verified mastery assessment rubric')
  lines.push('')
  for (const stage of track.roadmap) {
    const project = steps.find((s) => s.type === 'project' && s.stageId === stage.id)
    if (!project) {
      lines.push(`- Stage ${stage.id}: _no embedded project._`)
      continue
    }
    const resolved = resolveStepAssessment(track.id, project)
    const contract = resolved?.contract
    if (!contract) {
      lines.push(`- Stage ${stage.id}: _project present but not assessable._`)
      continue
    }
    lines.push(`### Stage ${stage.id} — project \`${contract.projectId}\` (rubric ${contract.rubricVersion})`)
    lines.push('')
    lines.push('| Criterion | Weight | Mandatory |')
    lines.push('| --- | --- | --- |')
    for (const c of contract.rubric) lines.push(`| ${cell(c.label)} | ${c.weight} | ${c.mandatory ? 'yes' : 'no'} |`)
    lines.push('')
    lines.push(`- Pass threshold: ${contract.passThreshold}. Requires source inspection: ${contract.requiresSourceInspection ? 'yes' : 'no'}; written explanation: ${contract.writtenExplanation ? 'yes' : 'no'}.`)
    lines.push('')
  }

  // 7. Phase projects and acceptance criteria
  lines.push('## 7. Phase projects and acceptance criteria')
  lines.push('')
  for (const stage of track.roadmap) {
    const project = steps.find((s) => s.type === 'project' && s.stageId === stage.id)
    if (!project) continue
    const resolved = resolveStepAssessment(track.id, project)
    const contract = resolved?.contract
    lines.push(`### Stage ${stage.id} — ${cell(project.title)}`)
    const brief = project.projectBrief
    if (brief) {
      lines.push('')
      lines.push(`- **Objective:** ${cell(truncate(brief.objective, 320))}`)
      lines.push(`- **Problem:** ${cell(truncate(brief.problem, 240))}`)
      lines.push(`- **Audience:** ${cell(truncate(brief.audience, 200))}`)
      if (brief.functionalRequirements?.length) {
        lines.push('- **Required functionality:**')
        for (const req of brief.functionalRequirements) lines.push(`  - ${cell(req)}`)
      }
    }
    if (contract?.acceptanceCriteria?.length) {
      lines.push('- **Acceptance criteria:**')
      for (const criterion of contract.acceptanceCriteria) lines.push(`  - ${cell(criterion)}`)
    }
    if (brief?.evidence?.length) {
      lines.push('- **Required evidence:**')
      for (const item of brief.evidence) lines.push(`  - ${cell(item)}`)
    }
    if (brief?.constraints?.length) {
      lines.push('- **Constraints:**')
      for (const item of brief.constraints) lines.push(`  - ${cell(item)}`)
    }
    lines.push('')
  }

  // 8. Worked examples / AI lesson demonstrations
  lines.push(isAI ? '## 8. AI lesson demonstrations' : '## 8. Worked examples')
  lines.push('')
  for (const stage of track.roadmap) {
    if (isAI) {
      const objective = getAIStageObjective(track.id, stage.id)
      const lesson = getAIStageLesson(track.id, stage.id, stage.title, objective?.objective ?? '', objective?.successCriteria ?? [])
      lines.push(`- **Stage ${stage.id}:** ${lesson ? cell(truncate(lesson.demonstration ?? lesson.example ?? JSON.stringify(lesson), 220)) : '_none_'}`)
    } else {
      const example = getStageWorkedExample(track.id, stage.id)
      lines.push(`- **Stage ${stage.id}:** ${example ? cell(truncate(example, 220)) : '_none_'}`)
    }
  }
  lines.push('')

  // 9. Outstanding limitations and review asks
  lines.push('## 9. Outstanding verification limitations')
  lines.push('')
  const level2 = []
  for (const stage of track.roadmap) {
    const inv = inventory.get(`${track.id}:${stage.id}`)
    for (const r of inv?.resources ?? []) if (r.level < 3) level2.push(`Stage ${stage.id} — ${r.role} (L${r.level}): ${r.url}`)
  }
  if (level2.length) {
    lines.push('Resources whose content could not be inspected automatically (verify manually or replace):')
    lines.push('')
    for (const item of level2) lines.push(`- ${item}`)
  } else {
    lines.push('Every mapped resource reached content-inspected (level 3).')
  }
  lines.push('')
  lines.push('- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.')
  lines.push('')
  lines.push('## 10. Areas requiring human review')
  lines.push('')
  lines.push('- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.')
  lines.push('- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.')
  lines.push('- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.')
  lines.push('- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.')
  lines.push('- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.')
  lines.push('')

  // 11. Exact criteria for passing
  lines.push('## 11. Exact criteria for passing')
  lines.push('')
  lines.push('A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.')
  lines.push('')
  lines.push(`- Mechanical: readiness ≥ 90 (this track: ${outcome?.curriculumReadiness ?? 'n/a'}) **and** worthiness ≥ 90 (this track: ${outcome?.premiumWorthiness ?? 'n/a'}).`)
  lines.push(`- Mandatory quality gates: all pass (this track: ${outcome?.gatesPassed ? 'pass' : 'FAIL'}).`)
  lines.push('- Every stage: at least one required resource verified to content-inspected (level 3) or better.')
  lines.push('- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.')
  lines.push('- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.')
  lines.push('- Every phase: a project with a brief, required evidence and acceptance criteria.')
  lines.push('- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.')
  lines.push('')
  lines.push('**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.')
  lines.push('')

  const file = join(OUT_DIR, `${track.id}.md`)
  writeFileSync(file, lines.join('\n') + '\n', 'utf8')

  index.tracks.push({
    trackId: track.id,
    name: track.name,
    isAI,
    stages: track.roadmap.length,
    readiness: outcome?.curriculumReadiness ?? null,
    worthiness: outcome?.premiumWorthiness ?? null,
    gatesPassed: outcome?.gatesPassed ?? false,
    premiumEligible: outcome?.premiumEligible ?? false,
    premiumApproved: false,
    packet: `docs/reviewer-packets/${track.id}.md`,
    outstanding: {
      level4PlaybackVerified: 0,
      resourcesBelowLevel3: level2.length,
    },
  })
}

writeFileSync(join(OUT_DIR, 'index.json'), JSON.stringify(index, null, 2) + '\n', 'utf8')

const readme = [
  '# Reviewer packets',
  '',
  'Preparation material for INDEPENDENT HUMAN review of each track. These packets are generated from the catalogue and the resource probe; they are **not** approvals.',
  '',
  `- Generated: ${report.generatedAt}`,
  `- Tracks: ${index.tracks.length}`,
  `- Approved tracks: ${index.approvedTracks.length} (none — approval requires genuine human sign-off)`,
  '',
  '## How to use',
  '',
  '1. Pick a track packet and read §1–§4 for scope, objectives and external resource evidence.',
  '2. Verify the high-risk lessons listed in §2 first.',
  '3. Check the knowledge checks (§5), rubric (§6) and projects (§7) against the objectives.',
  '4. Confirm video runtime/segments (§4) and the limitations in §9 by hand.',
  '5. Check §11 for the exact criteria that gate approval for this track.',
  '6. Record a **genuine, named** review in `docs/curriculum-quality-signoff.json`. Never approve a track on automated evidence alone.',
  '',
  '## Index',
  '',
  '| Track | Stages | Readiness | Worthiness | Gates | Eligible | Approved | Packet |',
  '| --- | --- | --- | --- | --- | --- | --- | --- |',
  ...index.tracks.map(
    (t) =>
      `| ${t.name} (\`${t.trackId}\`) | ${t.stages} | ${t.readiness} | ${t.worthiness} | ${t.gatesPassed ? 'pass' : 'FAIL'} | ${t.premiumEligible ? 'yes' : 'no'} | no | [packet](${t.trackId}.md) |`,
  ),
  '',
].join('\n')
writeFileSync(join(OUT_DIR, 'README.md'), readme, 'utf8')

console.log(`Wrote ${index.tracks.length} reviewer packets to docs/reviewer-packets/ (0 approved).`)
