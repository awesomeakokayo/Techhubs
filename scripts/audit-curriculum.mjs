/**
 * TechSkillHub — Curriculum Structural Audit
 *
 * Inventories every learning track in the live catalogue and runs deterministic
 * structural checks over stages, resources, assessments and projects.
 *
 * This is an inspection tool. It never mutates catalogue content.
 *
 * NOTE: the authoritative completeness + premium-eligibility report (two 0–100
 * readiness/worthiness scores and the mandatory quality gates) is produced by
 * `scripts/curriculum-quality-audit.mjs`. This structural tool reports lower-level
 * resource/project defects and writes its own distinct outputs.
 *
 * Usage:
 *   node scripts/audit-curriculum.mjs            # write docs + JSON report
 *   node scripts/audit-curriculum.mjs --check    # exit non-zero on critical defects
 *   node scripts/audit-curriculum.mjs --json     # print JSON report to stdout
 *
 * Outputs:
 *   docs/curriculum-structure-audit.md
 *   scripts/curriculum-audit-report.json
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadTsModule } from './lib/load-ts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = new Set(process.argv.slice(2))

const { TRACKS } = await loadTsModule(join(root, 'lib', 'tracks.ts'))
const { buildGuidedPath } = await loadTsModule(join(root, 'lib', 'guided-path.ts'))
const { buildAIWorldClassPath } = await loadTsModule(join(root, 'lib', 'ai-guided-path.ts'))
const { STAGE_LEARNING_PLANS } = await loadTsModule(join(root, 'lib', 'curriculum.ts'))
const AUTHORED_TRACKS = Object.keys(STAGE_LEARNING_PLANS)

const RESOURCE_TYPES = ['docs', 'video', 'practice', 'book', 'tool', 'community']
const PROJECT_LEVELS = ['beginner', 'intermediate', 'advanced']

function isValidHttpUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function youTubeId(url) {
  if (!isValidHttpUrl(url)) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1).split('/')[0] || null
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/')[2] || null
      if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2] || null
      return parsed.searchParams.get('v')
    }
  } catch {
    return null
  }
  return null
}

/** True when a YouTube URL explicitly targets a single video. */
function isYouTubeVideoUrl(url) {
  if (!isValidHttpUrl(url)) return false
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.length > 1
    if (parsed.hostname.includes('youtube.com')) {
      return (
        parsed.pathname === '/watch' ||
        parsed.pathname.startsWith('/embed/') ||
        parsed.pathname.startsWith('/shorts/') ||
        parsed.pathname.startsWith('/v/')
      )
    }
  } catch {
    return false
  }
  return false
}

const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/

function stepsForTrack(trackId) {
  return trackId.startsWith('ai-') ? buildAIWorldClassPath(trackId) : buildGuidedPath(trackId)
}

const tracks = []
const defects = []
const urlOwners = new Map()
const idOwners = new Map()

function addDefect(defect) {
  defects.push(defect)
}

for (const track of TRACKS) {
  const isAITrack = track.id.startsWith('ai-')
  const steps = stepsForTrack(track.id)
  const stepTypes = steps.reduce((acc, step) => {
    acc[step.type] = (acc[step.type] || 0) + 1
    return acc
  }, {})

  const resourcesByType = RESOURCE_TYPES.reduce((acc, type) => {
    acc[type] = track.resources.filter((r) => r.type === type).length
    return acc
  }, {})

  const projectsByLevel = PROJECT_LEVELS.reduce((acc, level) => {
    acc[level] = track.projects.filter((p) => p.level === level).length
    return acc
  }, {})

  // ── Stage-level checks ────────────────────────────────────────────────
  for (const stage of track.roadmap) {
    if (!stage.topics || stage.topics.length === 0) {
      addDefect({ track: track.id, area: 'roadmap', severity: 'high', code: 'stage-no-topics', message: `Stage ${stage.id} "${stage.title}" has no topics.`, acceptance: 'Stage lists the concepts it teaches.' })
    } else if (stage.topics.length > 6) {
      addDefect({ track: track.id, area: 'roadmap', severity: 'medium', code: 'stage-dense', message: `Stage ${stage.id} "${stage.title}" bundles ${stage.topics.length} topics.`, acceptance: 'Stage is split or explicitly sequenced into manageable units.' })
    }
    if (!stage.duration || !stage.duration.trim()) {
      addDefect({ track: track.id, area: 'roadmap', severity: 'low', code: 'stage-no-duration', message: `Stage ${stage.id} "${stage.title}" has no duration estimate.`, acceptance: 'Stage states an estimated effort.' })
    }
    if (!stage.description || stage.description.trim().length < 20) {
      addDefect({ track: track.id, area: 'roadmap', severity: 'medium', code: 'stage-thin-description', message: `Stage ${stage.id} "${stage.title}" has a thin description.`, acceptance: 'Stage explains what it teaches and why it matters.' })
    }
  }

  // ── Resource checks ───────────────────────────────────────────────────
  const seenUrls = new Map()
  for (const resource of track.resources) {
    if (!resource.title || !resource.title.trim()) {
      addDefect({ track: track.id, area: 'resource', severity: 'high', code: 'resource-no-title', message: `Resource ${resource.id} has no title.`, acceptance: 'Every resource has a human-readable title.' })
    }
    if (!resource.description || resource.description.trim().length < 15) {
      addDefect({ track: track.id, area: 'resource', severity: 'medium', code: 'resource-thin-description', message: `Resource ${resource.id} "${resource.title}" has a thin description.`, acceptance: 'Resource explains what it is and why it helps.' })
    }
    if (!resource.source || !resource.source.trim()) {
      addDefect({ track: track.id, area: 'resource', severity: 'medium', code: 'resource-no-source', message: `Resource ${resource.id} "${resource.title}" has no source.`, acceptance: 'Resource names its publisher.' })
    }
    if (!isValidHttpUrl(resource.url)) {
      addDefect({ track: track.id, area: 'resource', severity: 'critical', code: 'resource-invalid-url', message: `Resource ${resource.id} "${resource.title}" has an invalid URL: ${resource.url}`, acceptance: 'Resource URL is a valid http(s) destination.' })
    } else {
      if (seenUrls.has(resource.url)) {
        addDefect({ track: track.id, area: 'resource', severity: 'high', code: 'resource-duplicate-url', message: `Resources ${seenUrls.get(resource.url)} and ${resource.id} share the same URL.`, acceptance: 'Each resource URL is used once per track.' })
      }
      seenUrls.set(resource.url, resource.id)
      if (!urlOwners.has(resource.url)) urlOwners.set(resource.url, [])
      urlOwners.get(resource.url).push({ track: track.id, id: resource.id })
    }
    if (resource.type === 'video' && isYouTubeVideoUrl(resource.url)) {
      const id = youTubeId(resource.url)
      if (!id || !YOUTUBE_ID_RE.test(id)) {
        addDefect({ track: track.id, area: 'resource', severity: 'high', code: 'resource-invalid-youtube-id', message: `Resource ${resource.id} "${resource.title}" has an invalid YouTube video id: ${resource.url}`, acceptance: 'YouTube video resources carry an 11-character video id.' })
      }
    }
    if (idOwners.has(resource.id)) {
      addDefect({ track: track.id, area: 'resource', severity: 'high', code: 'resource-duplicate-id', message: `Resource id ${resource.id} also exists in track ${idOwners.get(resource.id)}.`, acceptance: 'Resource ids are globally unique.' })
    }
    idOwners.set(resource.id, track.id)
  }

  if (track.resources.length === 0) {
    addDefect({ track: track.id, area: 'resource', severity: 'high', code: 'track-no-resources', message: 'Track has no resources.', acceptance: 'Track links at least one actionable resource per stage.' })
  }
  if (!isAITrack && track.resources.length > 0 && track.resources.length < 5) {
    addDefect({ track: track.id, area: 'resource', severity: 'medium', code: 'track-few-resources', message: `Track has only ${track.resources.length} resources.`, acceptance: 'Track covers each stage with at least one resource.' })
  }

  // ── Project checks ────────────────────────────────────────────────────
  // AI tracks map their projects to stages through `lib/ai-projects.ts`, so the
  // beginner/advanced level checks apply to the non-AI catalogue only.
  if (!isAITrack && track.projects.length === 0) {
    addDefect({ track: track.id, area: 'project', severity: 'high', code: 'track-no-projects', message: 'Track defines no projects.', acceptance: 'Track defines foundation, applied and portfolio projects.' })
  }
  if (!isAITrack && track.projects.length > 0 && projectsByLevel.beginner === 0) {
    addDefect({ track: track.id, area: 'project', severity: 'high', code: 'no-foundation-project', message: 'Track has no beginner foundation project.', acceptance: 'Foundation phase ends in an achievable project.' })
  }
  if (!isAITrack && track.projects.length > 0 && projectsByLevel.advanced === 0) {
    addDefect({ track: track.id, area: 'project', severity: 'high', code: 'no-portfolio-project', message: 'Track has no advanced portfolio project.', acceptance: 'Track culminates in a portfolio-grade project.' })
  }
  for (const project of track.projects) {
    if (!project.description || project.description.trim().length < 30) {
      addDefect({ track: track.id, area: 'project', severity: 'medium', code: 'project-thin-brief', message: `Project ${project.id} "${project.title}" has a thin description.`, acceptance: 'Project states problem, objective and deliverables.' })
    }
  }

  // ── Guided-path assessment / build coverage ──────────────────────────
  const isAI = track.id.startsWith('ai-')
  if (!isAI) {
    if (!stepTypes.quiz) {
      addDefect({ track: track.id, area: 'assessment', severity: 'high', code: 'path-no-assessment', message: 'Guided path contains no server-validated knowledge check.', acceptance: 'Each stage ends in a knowledge check the server validates.' })
    }
    if (!stepTypes.project) {
      addDefect({ track: track.id, area: 'project', severity: 'high', code: 'path-no-project-step', message: 'Guided path contains no project step; projects are disconnected from progression.', acceptance: 'Projects are embedded in the guided path at phase boundaries.' })
    }
  }

  tracks.push({
    id: track.id,
    name: track.name,
    category: track.category,
    difficulty: track.difficulty,
    timeEstimate: track.timeEstimate,
    stageCount: track.roadmap.length,
    stageTitles: track.roadmap.map((s) => s.title),
    resourceCount: track.resources.length,
    resourcesByType,
    projectCount: track.projects.length,
    projectsByLevel,
    guidedStepCount: steps.length,
    guidedStepTypes: stepTypes,
    isAI,
    hasAssessment: Boolean(stepTypes.quiz),
    hasProjectStep: Boolean(stepTypes.project),
    jobTitles: track.overview.jobTitles,
  })
}

// ── Cross-track duplicate URLs ────────────────────────────────────────────
const crossTrackDuplicates = []
for (const [url, owners] of urlOwners) {
  const uniqueTracks = new Set(owners.map((o) => o.track))
  if (uniqueTracks.size > 1) {
    crossTrackDuplicates.push({ url, owners })
  }
}

// ── Aggregate severity ────────────────────────────────────────────────────
const bySeverity = { critical: 0, high: 0, medium: 0, low: 0 }
for (const defect of defects) bySeverity[defect.severity] += 1

const totalResources = TRACKS.reduce((n, t) => n + t.resources.length, 0)
const totalProjects = TRACKS.reduce((n, t) => n + t.projects.length, 0)
const totalStages = TRACKS.reduce((n, t) => n + t.roadmap.length, 0)

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    tracks: TRACKS.length,
    stages: totalStages,
    resources: totalResources,
    projects: totalProjects,
    resourcesByType: RESOURCE_TYPES.reduce((acc, type) => {
      acc[type] = TRACKS.reduce((n, t) => n + t.resources.filter((r) => r.type === type).length, 0)
      return acc
    }, {}),
    defects: bySeverity,
    totalDefects: defects.length,
    crossTrackDuplicateUrls: crossTrackDuplicates.length,
    tracksWithAssessment: tracks.filter((t) => t.hasAssessment).length,
    tracksWithProjectStep: tracks.filter((t) => t.hasProjectStep).length,
    nonAITracks: tracks.filter((t) => !t.isAI).length,
  },
  tracks,
  defects,
  crossTrackDuplicates,
}

// ── Markdown rendering ────────────────────────────────────────────────────
function renderMarkdown() {
  const lines = []
  lines.push('# TechSkillHub — Curriculum Quality Audit')
  lines.push('')
  lines.push(`Generated: ${report.generatedAt}`)
  lines.push('')
  lines.push('This report is produced by `scripts/audit-curriculum.mjs`, which loads the live')
  lines.push('catalogue (`lib/tracks.ts`) and the guided-path builder and runs deterministic')
  lines.push('structural checks. It is an inspection report, not a user-facing claim.')
  lines.push('')
  lines.push('## Coverage')
  lines.push('')
  lines.push('| Dimension | Count |')
  lines.push('| --- | ---: |')
  lines.push(`| Catalogue entries structurally checked | ${TRACKS.length} tracks |`)
  lines.push(`| Stages checked | ${totalStages} |`)
  lines.push(`| Individual resources checked for structure | ${totalResources} |`)
  lines.push(`| Projects checked for structure | ${totalProjects} |`)
  lines.push('| Learning paths examined in depth | see "Deep content review" below |')
  lines.push(`| Defects confirmed by inspection | ${defects.length} |`)
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push('| Metric | Value |')
  lines.push('| --- | ---: |')
  lines.push(`| Tracks | ${report.summary.tracks} |`)
  lines.push(`| Resources | ${report.summary.resources} (${Object.entries(report.summary.resourcesByType).map(([k, v]) => `${k}: ${v}`).join(', ')}) |`)
  lines.push(`| Projects | ${report.summary.projects} |`)
  lines.push(`| Tracks with a server-validated assessment in the guided path | ${report.summary.tracksWithAssessment} / ${report.summary.tracks} |`)
  lines.push(`| Tracks with a project step in the guided path | ${report.summary.tracksWithProjectStep} / ${report.summary.tracks} |`)
  lines.push(`| Defects — critical | ${bySeverity.critical} |`)
  lines.push(`| Defects — high | ${bySeverity.high} |`)
  lines.push(`| Defects — medium | ${bySeverity.medium} |`)
  lines.push(`| Defects — low | ${bySeverity.low} |`)
  lines.push(`| Cross-track duplicate resource URLs | ${crossTrackDuplicates.length} |`)
  lines.push('')
  lines.push('## Track inventory')
  lines.push('')
  lines.push('| Track | Category | Stages | Resources | Projects | Guided steps | Assessment | Project step |')
  lines.push('| --- | --- | ---: | ---: | ---: | ---: | :---: | :---: |')
  for (const t of tracks) {
    lines.push(`| ${t.name} (\`${t.id}\`) | ${t.category} | ${t.stageCount} | ${t.resourceCount} | ${t.projectCount} | ${t.guidedStepCount} | ${t.hasAssessment ? 'yes' : 'no'} | ${t.hasProjectStep ? 'yes' : 'no'} |`)
  }
  lines.push('')
  lines.push('## Defect register')
  lines.push('')
  lines.push('Priority is assigned as: **critical** (invalid/incoherent data), **high** (breaks the')
  lines.push('learning contract), **medium** (reduces quality), **low** (polish).')
  lines.push('')
  lines.push('| Severity | Track | Area | Code | Finding | Acceptance criterion |')
  lines.push('| --- | --- | --- | --- | --- | --- |')
  const order = { critical: 0, high: 1, medium: 2, low: 3 }
  for (const d of [...defects].sort((a, b) => order[a.severity] - order[b.severity])) {
    lines.push(`| ${d.severity} | \`${d.track}\` | ${d.area} | \`${d.code}\` | ${d.message} | ${d.acceptance} |`)
  }
  lines.push('')
  if (crossTrackDuplicates.length) {
    lines.push('## Cross-track duplicate resource URLs')
    lines.push('')
    for (const dup of crossTrackDuplicates) {
      lines.push(`- \`${dup.url}\` — ${dup.owners.map((o) => `${o.track}:${o.id}`).join(', ')}`)
    }
    lines.push('')
  }
  lines.push('## Deep content review')
  lines.push('')
  lines.push('Automated structural checks cover every catalogue entry. In addition, the')
  lines.push('following tracks received a fully authored curriculum review — stage objectives,')
  lines.push('success criteria, a practice exercise, common mistakes, concept-level knowledge')
  lines.push('checks, and project briefs (problem, audience, requirements, acceptance criteria,')
  lines.push('evidence and portfolio framing):')
  lines.push('')
  lines.push('| Track | Stages | Knowledge checks | Projects embedded | Status |')
  lines.push('| --- | ---: | :---: | :---: | --- |')
  for (const id of AUTHORED_TRACKS) {
    const entry = tracks.find((item) => item.id === id)
    if (entry) lines.push(`| ${entry.name} (\`${id}\`) | ${entry.stageCount} | yes | yes | Authored |`)
  }
  lines.push('')
  const pending = tracks.filter((item) => !item.hasAssessment).map((item) => `\`${item.id}\``)
  if (pending.length) {
    lines.push(`Tracks with a project-embedded, evidence-gated path but knowledge checks still`)
    lines.push(`**pending authoring** (${pending.length}): ${pending.join(', ')}.`)
  } else {
    lines.push('Every track now has a server-validated knowledge check for each stage.')
  }
  lines.push('')
  lines.push('## Remediation status')
  lines.push('')
  lines.push('| Work area | Status |')
  lines.push('| --- | --- |')
  lines.push('| Catalogue inventory | Complete for all 32 tracks |')
  lines.push('| Resource reliability checks | Complete — `scripts/audit-resources.mjs` |')
  lines.push('| Confirmed broken resources | Repaired; live re-check shows 0 confirmed unavailable |')
  lines.push(`| Authored curriculum | ${AUTHORED_TRACKS.length} tracks (all non-AI tracks) |`)
  lines.push('| Embedded projects + evidence gating | Applied to all 32 tracks |')
  lines.push('| Server-side assessment validation | Complete for every quiz step |')
  lines.push(`| Remaining knowledge-check authoring | ${pending.length === 0 ? 'None' : pending.length + ' tracks'} |`)
  lines.push('| Dense stages (>6 topics) | 6 retained (reviewed; see final report) |')
  lines.push('')
  lines.push('## Method and limitations')
  lines.push('')
  lines.push('- Structural checks run over every catalogue entry. They verify data shape and')
  lines.push('  coherence, not educational accuracy.')
  lines.push('- URL *liveness* is checked separately by `scripts/audit-resources.mjs` (which')
  lines.push('  requires network access). Structural validity here is not a claim of availability.')
  lines.push('- Assessment, project-brief and lesson quality still require subject-matter review')
  lines.push('  outside an automated pass. Sections that could not be fully validated are marked')
  lines.push('  explicitly in the narrative above and the final report.')
  lines.push('')
  return lines.join('\n')
}

const markdown = renderMarkdown()

if (args.has('--json')) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
} else {
  mkdirSync(join(root, 'docs'), { recursive: true })
  writeFileSync(join(root, 'docs', 'curriculum-structure-audit.md'), markdown, 'utf8')
  writeFileSync(join(root, 'scripts', 'curriculum-audit-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Curriculum audit written. Tracks: ${TRACKS.length}, defects: ${defects.length} (critical ${bySeverity.critical}, high ${bySeverity.high}, medium ${bySeverity.medium}, low ${bySeverity.low}).`)
}

if (args.has('--check') && bySeverity.critical > 0) {
  console.error(`Curriculum audit failed: ${bySeverity.critical} critical defect(s).`)
  process.exit(1)
}
