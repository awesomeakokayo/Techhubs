/**
 * Fresh, deterministic package-resource verification.
 *
 * The research package contains candidate and map rows with archive-era
 * evidence. This script does not promote that evidence. It checks every unique
 * candidate URL that is not already in the live probe, extracts the public main
 * text, compares it with the canonical stage objective, and writes a separate
 * evidence report. The adapter consumes that report to build runtime checks.
 *
 * It never logs in, pays, bypasses access control, or claims video playback.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { probeUrl, MIN_CONTENT_CHARS } from '../lib/content-extract.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const packageDir = path.join(
  root,
  'local-research',
  'TechSkillHUB_DeepSeek_IDE_Starter_Pack',
  'research_package',
  'TechSkillHUB_Curriculum_Research_Deliverables',
)
const probePath = path.join(root, 'scripts', 'resource-probe.json')
const reportPath = path.join(root, 'docs', 'curriculum-implementation', 'resource-verification.json')
const additionsPath = path.join(root, 'docs', 'curriculum-implementation', 'resource-research-additions.json')
const checkedAt = new Date().toISOString().slice(0, 10)

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

function readCsv(name) {
  return parseCsv(fs.readFileSync(path.join(packageDir, name), 'utf8'))
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url)
    parsed.hash = ''
    return parsed.toString().replace(/\/$/, '')
  } catch {
    return (url ?? '').trim()
  }
}

const STOPWORDS = new Set(
  ('the a an and or but if then than that this these those of to in on at for with from by as is are was were be been being it its into over under about after before while you your we our they their he she his her not no do does did done can could should would may might must will shall have has had how what when where which who why all any both each few more most other some such only own same so too very just don now here there also use used using make makes made get gets got one two three new like via per etc').split(' '),
)

function termsOf(text) {
  return new Set(
    (text ?? '')
      .toLowerCase()
      .split(/[^a-z0-9+#-]+/)
      .map((word) => word.replace(/^[-#]+|[-#]+$/g, ''))
      .filter((word) => word.length >= 4 && !STOPWORDS.has(word)),
  )
}

function overlap(objectiveTerms, probeTerms) {
  let hits = 0
  for (const term of probeTerms ?? []) if (objectiveTerms.has(term)) hits += 1
  return hits
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length)
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++
        results[index] = await worker(items[index], index)
      }
    }),
  )
  return results
}

const specs = JSON.parse(fs.readFileSync(path.join(packageDir, '02_STAGE_LEARNING_SPECS.json'), 'utf8'))
const alignmentPath = path.join(root, 'docs', 'curriculum-implementation', 'stage-alignment-overrides.json')
if (fs.existsSync(alignmentPath)) {
  const overrides = JSON.parse(fs.readFileSync(alignmentPath, 'utf8')).stages ?? []
  for (const override of overrides) {
    const spec = specs.stages.find((stage) => stage.trackId === override.trackId && stage.stageId === override.stageId)
    if (!spec) continue
    Object.assign(spec, {
      stageTitle: override.title ?? spec.stageTitle,
      currentObjective: override.objective,
      targetOutcomes: override.targetOutcomes ?? spec.targetOutcomes,
    })
  }
}
const packageCandidates = readCsv('03_RESOURCE_CANDIDATES.csv')
const researchAdditions = fs.existsSync(additionsPath)
  ? JSON.parse(fs.readFileSync(additionsPath, 'utf8')).candidates ?? []
  : []
const candidates = [...packageCandidates, ...researchAdditions]
const mapRows = readCsv('04_APPROVED_RESOURCE_MAP.csv')
const preflight = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'curriculum-import-preflight.json'), 'utf8'))
const blockedKeys = new Set((preflight.blockedStages ?? []).map((stage) => stage.key))

// A small set of candidates whose inspected main text clearly matches the
// stage objective even though the automatic term-overlap score is two. These
// are explicit human judgments about the inspected excerpt, not upgrades from
// archive metadata. Every other stage still requires the term threshold.
const curatedRelevance = {
  'ai-agents:6': ['https://www.anthropic.com/engineering/building-effective-agents'],
  'ai-agents:7': ['https://developers.openai.com/api/docs/guides/agents'],
  'ai-agents:8': ['https://learn.microsoft.com/en-us/azure/well-architected/ai/responsible-ai'],
  'ai-agents:9': ['https://docs.langchain.com/oss/python/langgraph/test'],
  'ai-content:2': [
    'https://libguides.library.qut.edu.au/library-guidance-for-ai/evaluating-generated-content',
  ],
  'ai-content:3': ['https://developers.google.com/style'],
  'ai-design:3': ['https://help.figma.com/hc/en-us/articles/23870272542231-Get-started-with-Figma-AI'],
  'ai-design:4': ['https://www.nngroup.com/articles/ai-prototyping'],
  'ai-design:6': ['https://help.figma.com/hc/en-us/articles/360040314193'],
  'ai-design:8': ['https://www.nngroup.com/articles/ai-era-critique'],
  'ai-engineering:7': ['https://platform.openai.com/docs/guides/embeddings'],
  'ai-foundations:1': ['https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/'],
  'ai-foundations:4': ['https://pair.withgoogle.com/'],
  'ai-foundations:5': ['https://platform.openai.com/docs/guides/evals'],
  'ai-research:2': ['https://libguides.library.qut.edu.au/library-guidance-for-ai/evaluating-generated-content'],
  'ai-research:3': ['https://libguides.library.qut.edu.au/library-guidance-for-ai/evaluating-generated-content'],
  'ai-research:4': ['https://libguides.library.qut.edu.au/library-guidance-for-ai/evaluating-generated-content'],
  'ai-software-development:1': ['https://docs.github.com/en/copilot'],
  'ai-software-development:2': ['https://developers.openai.com/api/docs/guides/prompt-engineering'],
  'ai-software-development:4': ['https://docs.github.com/en/copilot'],
  'ai-software-development:5': ['https://openai.com/academy/codex/'],
  'ai-software-development:8': ['https://docs.github.com/en/copilot/get-started/about-github-copilot'],
  'ai-work:5': ['https://openai.com/academy/using-chatgpt/'],
  'ai-youtube:2': ['https://support.google.com/youtube/answer/11962757'],
  'ai-youtube:3': ['https://libguides.library.qut.edu.au/library-guidance-for-ai/evaluating-generated-content'],
  'ai-youtube:8': ['https://support.google.com/youtube/answer/57407'],
  'ai-youtube:10': ['https://support.google.com/youtube/answer/1311392'],
  'ai:2': ['https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt'],
  'ai:3': ['https://pair.withgoogle.com/'],
  'ai:4': ['https://ethics.fast.ai'],
  'backend:2': ['https://jwt.io/introduction'],
  'backend:3': ['https://www.postgresql.org/docs/current/tutorial.html'],
  'backend:5': ['https://render.com/docs/your-first-deploy'],
  'crypto:1': ['https://ethereum.org/en/developers/docs/intro-to-ethereum/'],
  'crypto:2': ['https://ethereum.org/en/wallets/'],
  'crypto:4': ['https://docs.openzeppelin.com/contracts/5.x/erc20'],
  'cyber:1': ['https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview'],
  'dart:3': ['https://dart.dev/codelabs/async-await'],
  'data:4': ['https://help.tableau.com/current/guides/get-started-tutorial/en-us/get-started-tutorial-home.htm'],
  'datascience:5': ['https://mlflow.org/docs/latest/ml/deployment/'],
  'devops:2': ['https://docs.github.com/en/actions'],
  'devops:4': ['https://learn.hashicorp.com/terraform'],
  'devops:5': ['https://www.devopsness.com/blog/linux-system-monitoring-prometheus-grafana'],
  'frontend:1': ['https://web.dev/learn/css'],
  'fullstack:5': ['https://render.com/articles/building-and-deploying-a-saas-application-from-scratch'],
  'marketing:2': ['https://moz.com/learn/seo/what-is-seo'],
  'marketing:3': ['https://www.facebook.com/business/ads'],
  'marketing:4': ['https://www.optimizely.com/optimization-glossary/ab-testing/'],
  'mobile:2': ['https://docs.expo.dev'],
  'mobile:4': ['https://developer.android.com/studio/publish'],
  'productmgmt:2': ['https://www.nngroup.com/articles/user-interviews/'],
  'productmgmt:4': ['https://www.atlassian.com/agile/project-management/user-stories'],
  'projectmgmt:2': ['https://scrumguides.org/scrum-guide.html'],
  'projectmgmt:4': ['https://www.atlassian.com/software/jira/guides/getting-started/introduction'],
  'projectmgmt:5': ['https://www.projectmanager.com/guides/status-report'],
  'projectmgmt:6': ['https://www.projectmanager.com/blog/how-to-become-a-project-manager'],
  'sonic:1': ['https://ethereum.org/en/web3/'],
  'sonic:4': ['https://book.getfoundry.sh/getting-started/installation'],
  'uiux:4': ['https://help.figma.com/hc/en-us/articles/31010011820311-FD4B-Prototyping-fundamentals'],
  'video:1': ['https://www.blackmagicdesign.com/products/davinciresolve/training'],
  'writing:1': ['https://learn.microsoft.com/en-us/style-guide/welcome/'],
  'writing:3': ['https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/'],
  'youtube:1': ['https://support.google.com/youtube/answer/11962757'],
  'youtube:4': ['https://support.google.com/youtube/answer/72857'],
}

const probe = JSON.parse(fs.readFileSync(probePath, 'utf8'))
const entries = { ...(probe.entries ?? {}) }
const known = new Set(Object.keys(entries).map(normalizeUrl))
// Explicitly rejected after excerpt inspection: each page is a real, free page
// but it does not teach the mapped objective. Keeping the stage blocked is more
// honest than promoting a nearby topic or a product/plan page.
const manualMismatch = new Set([
  'ai-content:6|https://support.google.com/youtube/answer/1311392',
  'cyber:2|https://portswigger.net/web-security',
  'cyber:3|https://portswigger.net/web-security',
  'nocode:3|https://help.zapier.com/hc/en-us/articles/32337438839565-What-s-included-in-Zapier-s-Free-plan',
  'productmgmt:1|https://www.gov.uk/service-manual/user-research/user-research-in-discovery',
  'qa:4|https://fastapi.tiangolo.com/tutorial/testing/',
  'sonic:3|https://docs.openzeppelin.com/contracts',
  'video:4|https://www.w3.org/WAI/media/av/',
  // Partial objective coverage found in the consistency review. Each page is
  // free and relevant to part of the stage, but a required resource must cover
  // the named outcomes before the stage can be called ready.
  'backend:1|https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction',
  'devops:2|https://docs.github.com/en/actions/get-started/quickstart',
  'productmgmt:8|https://productschool.com/blog/career-development/product-management-portfolio-examples',
  'crypto:9|https://docs.soliditylang.org/en/latest/security-considerations.html',
  // AI stage resources that matched a title or a neighbouring topic but not
  // the named outcome. The ai-youtube track is also under content-alignment
  // review; these pages must not be presented as required resources yet.
  'ai:1|https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt',
  'ai-youtube:2|https://libguides.library.qut.edu.au/library-guidance-for-ai/evaluating-generated-content',
  'ai-youtube:3|https://libguides.library.qut.edu.au/library-guidance-for-ai/evaluating-generated-content',
  'ai-youtube:5|https://www.w3.org/WAI/media/av/',
  'ai-youtube:5|https://support.google.com/youtube/answer/1311392',
  'ai-youtube:5|https://www.techsmith.com/blog/b-roll/',
  'ai-youtube:5|https://cloud.google.com/vertex-ai/generative-ai/docs/video/generate-videos',
  'ai-youtube:9|https://creatoracademy.youtube.com/page/lesson/using-analytics',
  'ai-youtube:9|https://support.google.com/youtube/answer/14328491',
  'ai-youtube:9|https://support.google.com/youtube/answer/9314415',
  'ai-youtube:10|https://support.google.com/youtube/answer/1311392',
].map((entry) => {
  const [stageKey, url] = entry.split('|')
  return `${stageKey}|${normalizeUrl(url)}`
}))

const allUrls = new Set()
for (const row of [...mapRows, ...candidates]) {
  const url = (row.url ?? '').trim()
  if (/^https?:\/\//i.test(url)) allUrls.add(url)
}
const missing = [...allUrls].filter((url) => !known.has(normalizeUrl(url))).sort()
console.log(`Package candidate URLs: ${allUrls.size}; already probed: ${allUrls.size - missing.length}; missing: ${missing.length}`)

if (missing.length) {
  const results = await mapLimit(missing, 4, async (url) => [normalizeUrl(url), await probeUrl(url, checkedAt)])
  for (const [key, value] of results) entries[key] = value
  // One paced retry for transient failures, as in the catalogue probe.
  for (const [key, value] of results) {
    if (!value || value.status === 0 || value.status === 429 || value.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 900))
      const retry = await probeUrl(value?.finalUrl ?? key, checkedAt)
      if (retry && retry.status >= 200 && retry.status < 400) entries[key] = retry
    }
  }
}

const stageByKey = new Map(specs.stages.map((stage) => [`${stage.trackId}:${stage.stageId}`, stage]))
const mapByKey = new Map()
for (const row of mapRows) {
  const key = `${row.track_id}:${row.stage_id}`
  if (!mapByKey.has(key)) mapByKey.set(key, [])
  mapByKey.get(key).push(row)
}
const candidatesByKey = new Map()
for (const row of candidates) {
  const key = `${row.trackId}:${row.stageId}`
  if (!candidatesByKey.has(key)) candidatesByKey.set(key, [])
  candidatesByKey.get(key).push(row)
}

function candidateRecord(row, kind) {
  const url = (row.url ?? '').trim()
  const key = normalizeUrl(url)
  const checked = entries[key] ?? null
  const spec = stageByKey.get(`${row.trackId ?? row.track_id}:${row.stageId ?? row.stage_id}`)
  const objectiveText = [
    spec?.currentObjective,
    ...(spec?.targetOutcomes ?? []),
    ...(spec?.topics ?? []),
  ].join(' ')
  const objectiveTerms = termsOf(objectiveText)
  const hits = checked ? overlap(objectiveTerms, checked.terms) : 0
  const reachable = Boolean(checked && checked.status >= 200 && checked.status < 400)
  const contentInspected = Boolean(
    reachable && !checked.paywalled && checked.contentChars >= MIN_CONTENT_CHARS && (checked.excerpt ?? '').trim(),
  )
  const finalUrl = checked?.finalUrl ?? url
  const accountBoundary = /(^|\/)(login|signin|sign-in|auth)(\/|$)/i.test(finalUrl)
  const currentFreeAccessVerified = Boolean(contentInspected && !checked.paywalled && !accountBoundary)
  const packageRole = row.new_selected_role || row.current_role || row.decision || ''
  const packageDecision = row.decision || ''
  const stageKey = `${row.trackId ?? row.track_id}:${row.stageId ?? row.stage_id}`
  const curated =
    row.curated === true ||
    (curatedRelevance[stageKey] ?? []).some((item) => normalizeUrl(item) === normalizeUrl(url))
  const optionalOnly = !curated && /optional|practice_tool|not_primary|hold_not_required|mismatch/i.test(
    `${packageRole} ${packageDecision}`,
  )
  let pathname = ''
  let hostname = ''
  try {
    const parsed = new URL(url)
    pathname = parsed.pathname.replace(/\/$/, '')
    hostname = parsed.hostname
  } catch {
    pathname = ''
    hostname = ''
  }
  const segments = pathname.split('/').filter(Boolean)
  const landingOrHub =
    pathname === '' ||
    /\/(docs|documentation|learn|academy|creators|university|tutorials?|guides?|resources?|resources-tools|community|blog|design-systems|language|web3)$/i.test(
      pathname,
    ) ||
    /^\/(creators\/get-started|products\/[^/]+|index\/[^/]+)$/i.test(pathname) ||
    (segments.length <= 1 && /(documentation|resources|community|home|overview|getting started)$/i.test(row.candidateTitle ?? ''))
  // A course overview, docs home or product landing page is not the exact
  // module/segment that was inspected. Curated relevance does not override
  // this: a specific article is still required.
  const indexLike =
    /^\/(learn|academy)\/[^/]+$/i.test(pathname) ||
    /^\/(en\/)?(copilot|actions)$/i.test(pathname) ||
    /^\/business\/ads$/i.test(pathname) ||
    /^\/agile\/product-management$/i.test(pathname) ||
    (hostname.startsWith('learn.') && segments.length === 1) ||
    (segments.length <= 2 && /documentation$/i.test(row.candidateTitle ?? ''))
  const titleHits = [...termsOf(`${row.candidateTitle ?? ''} ${url}`)].filter((term) => objectiveTerms.has(term)).length
  const objectiveRelevant = curated || (hits >= 3 && titleHits >= 1)
  const suitable = Boolean(
    currentFreeAccessVerified &&
      objectiveRelevant &&
      !optionalOnly &&
      !landingOrHub &&
      !indexLike &&
      !manualMismatch.has(`${stageKey}|${normalizeUrl(url)}`),
  )
  return {
    candidateId: row.candidateId || row.resource_entry_id || `${row.trackId ?? row.track_id}:${row.stageId ?? row.stage_id}:${key}`,
    kind,
    title: row.candidateTitle || row.title || checked?.title || url,
    publisher: row.publisher || '',
    url,
    type: row.type || 'documentation',
    exactPortion: row.exactPortion || row.recorded_segment || '',
    durationMinutes: Number(row.durationMinutes) || null,
    accessNotes: row.accessNotes || '',
    rationale: row.rationale || '',
    packageRole,
    packageDecision,
    packageScreeningScore: Number(row.screeningScore || 0) || null,
    checkedAt: checked?.checkedAt ?? null,
    httpStatus: checked?.status ?? null,
    finalUrl,
    contentChars: checked?.contentChars ?? 0,
    excerpt: (checked?.excerpt ?? '').slice(0, 280),
    contentHash: checked?.contentHash ?? '',
    terms: checked?.terms ?? [],
    objectiveHits: hits,
    curated,
    states: {
      discovered: Boolean(url),
      destination_verified: reachable,
      content_inspected: contentInspected,
      current_free_access_verified: currentFreeAccessVerified,
      playback_verified: false,
      human_reviewed: false,
      approved: false,
    },
    objectiveRelevant,
    suitable,
    limitations: [
      'Automated public fetch only; no login, purchase, video playback or interactive exercise was performed.',
      'Factual accuracy, currency, accessibility and pedagogical fit still require named human review.',
      checked?.status === 403 || checked?.status === 429
        ? `The publisher blocked automated access with HTTP ${checked.status}; content could not be inspected.`
        : null,
    ].filter(Boolean),
  }
}

function primaryRow(key) {
  const rows = mapByKey.get(key) ?? []
  return rows.find((row) => /provisional|proposed_required|supplement|optional/i.test(row.new_selected_role ?? '')) ?? rows[0]
}

const stages = [...stageByKey.values()]
  .map((spec) => {
    const key = `${spec.trackId}:${spec.stageId}`
    const primary = primaryRow(key)
    const pool = []
    const seen = new Set()
    for (const row of [primary, ...(candidatesByKey.get(key) ?? [])].filter(Boolean)) {
      const record = candidateRecord(row, row === primary ? 'package_primary' : 'alternative')
      const normalized = normalizeUrl(record.url)
      if (seen.has(normalized)) continue
      seen.add(normalized)
      pool.push(record)
    }
    const primaryRecord = pool.find((record) => record.kind === 'package_primary') ?? null
    const blocked = blockedKeys.has(key)
    const primaryStatus = primaryRecord?.suitable ? 'verified' : blocked ? 'blocked' : 'provisional'
    const suitable = pool
      .filter((record) => record.suitable)
      .sort((a, b) => b.objectiveHits - a.objectiveHits || (b.packageScreeningScore ?? 0) - (a.packageScreeningScore ?? 0) || b.contentChars - a.contentChars)
    const selected = primaryStatus === 'verified' ? primaryRecord : suitable.find((record) => record !== primaryRecord) ?? null
    return {
      trackId: spec.trackId,
      stageId: spec.stageId,
      stageTitle: spec.stageTitle,
      objective: spec.currentObjective,
      packagePrimaryStatus: primaryStatus,
      packagePrimaryBlocked: primaryStatus === 'blocked',
      preflightBlocked: blocked,
      required: Boolean(selected),
      stageReady: Boolean(selected),
      selected: selected
        ? {
            candidateId: selected.candidateId,
            title: selected.title,
            publisher: selected.publisher,
            url: selected.url,
            type: selected.type,
            source: selected.kind,
            objectiveHits: selected.objectiveHits,
            checkedAt: selected.checkedAt,
            contentChars: selected.contentChars,
            excerpt: selected.excerpt,
            contentHash: selected.contentHash,
            exactPortion: selected.exactPortion,
            durationMinutes: selected.durationMinutes,
            accessNotes: selected.accessNotes,
            rationale: selected.rationale,
            states: selected.states,
            limitations: selected.limitations,
          }
        : null,
      primary: primaryRecord,
      alternatives: pool.filter((record) => record !== primaryRecord),
      candidateCount: pool.length,
      reason: selected
        ? selected.kind === 'package_primary'
          ? 'The package primary passed a fresh public content, access and objective-relevance check. Human review is still pending.'
          : 'The package primary did not pass. A different candidate passed a fresh public content, access and objective-relevance check; human review is still pending.'
        : blocked
          ? 'No candidate passed a fresh content, free-access and objective-relevance check. Keep the stage resource-blocked and external links optional.'
          : 'No candidate passed the required fresh content, free-access and objective-relevance check. Keep the primary optional pending human review.',
    }
  })
  .sort((a, b) => `${a.trackId}:${a.stageId}`.localeCompare(`${b.trackId}:${b.stageId}`))

const report = {
  schema: 'tsh-package-resource-verification-v1',
  generatedAt: checkedAt,
  method: 'Public HTTP fetch and main-text extraction; no login, payment, playback or interactive use.',
  limits: [
    'A successful fetch is not human approval or proof of pedagogical quality.',
    'Account requirements are only detected from public redirects and page text; a hidden account gate may remain.',
    'Playback and interactive exercises are never claimed as verified by this script.',
  ],
  counts: {
    stages: stages.length,
    packagePrimaryBlocked: stages.filter((stage) => stage.packagePrimaryBlocked).length,
    packagePrimaryVerified: stages.filter((stage) => stage.packagePrimaryStatus === 'verified').length,
    packagePrimaryProvisional: stages.filter((stage) => stage.packagePrimaryStatus === 'provisional').length,
    stageReady: stages.filter((stage) => stage.stageReady).length,
    selectedPrimary: stages.filter((stage) => stage.selected?.source === 'package_primary').length,
    selectedAlternative: stages.filter((stage) => stage.selected?.source === 'alternative').length,
  },
  stages,
}

fs.writeFileSync(
  probePath,
  `${JSON.stringify(
    {
      ...probe,
      generatedAt: checkedAt,
      checkedAt,
      total: Object.keys(entries).length,
      reachable: Object.values(entries).filter((entry) => entry.status >= 200 && entry.status < 400).length,
      contentInspected: Object.values(entries).filter(
        (entry) => entry.status >= 200 && entry.status < 400 && !entry.paywalled && entry.contentChars >= MIN_CONTENT_CHARS,
      ).length,
      entries: Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b))),
    },
    null,
    2,
  )}\n`,
)
fs.mkdirSync(path.dirname(reportPath), { recursive: true })
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report.counts, null, 2))
