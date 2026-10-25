/**
 * TechSkillHub — Learning Resource Reliability Audit
 *
 * Two layers:
 *   1. Structural checks (always run): URL format, missing metadata, duplicate
 *      URLs, invalid YouTube video identifiers, unknown resource types.
 *   2. Optional live checks (`--live`): actually contact each destination and
 *      classify it. Video resources marked `video` on YouTube are verified with
 *      the official oEmbed endpoint, which reports the real video destination.
 *
 * The audit is read-only and safe to re-run. It never edits catalogue content.
 *
 * Usage:
 *   node scripts/audit-resources.mjs               # structural only, write JSON
 *   node scripts/audit-resources.mjs --live        # + network verification
 *   node scripts/audit-resources.mjs --live --json # print report to stdout
 *   node scripts/audit-resources.mjs --live --check # non-zero exit on confirmed broken
 *
 * Outputs:
 *   scripts/resource-audit-report.json
 *   scripts/resource-audit-report.md
 */

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadTsModule } from './lib/load-ts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = new Set(process.argv.slice(2))
const LIVE = args.has('--live')
const CONCURRENCY = Number(process.env.RESOURCE_AUDIT_CONCURRENCY || 12)
const TIMEOUT_MS = Number(process.env.RESOURCE_AUDIT_TIMEOUT_MS || 15000)

const { TRACKS } = await loadTsModule(join(root, 'lib', 'tracks.ts'))
const RESOURCE_TYPES = new Set(['docs', 'video', 'practice', 'book', 'tool', 'community'])
const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/

function isValidHttpUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function isYouTubeVideoUrl(url) {
  if (!isValidHttpUrl(url)) return false
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.length > 1
    if (parsed.hostname.includes('youtube.com')) {
      return parsed.pathname === '/watch' || parsed.pathname.startsWith('/embed/') || parsed.pathname.startsWith('/shorts/') || parsed.pathname.startsWith('/v/')
    }
  } catch {
    return false
  }
  return false
}

function youTubeId(url) {
  if (!isValidHttpUrl(url)) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1).split('/')[0] || null
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/') || parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2] || null
      return parsed.searchParams.get('v')
    }
  } catch {
    return null
  }
  return null
}

// ── Collect every auditable link ──────────────────────────────────────────
const entries = []
const urlIndex = new Map()

for (const track of TRACKS) {
  for (const resource of track.resources) {
    entries.push({
      kind: 'resource',
      trackId: track.id,
      id: resource.id,
      title: resource.title,
      description: resource.description,
      source: resource.source,
      type: resource.type,
      url: resource.url,
    })
  }
  for (const tool of track.aiGuide?.tools ?? []) {
    entries.push({
      kind: 'ai-tool',
      trackId: track.id,
      id: null,
      title: tool.name,
      description: tool.use,
      source: 'AI guide tool',
      type: 'tool',
      url: tool.url,
    })
  }
}

for (const entry of entries) {
  if (!urlIndex.has(entry.url)) urlIndex.set(entry.url, [])
  urlIndex.get(entry.url).push(entry)
}

// ── Structural checks ─────────────────────────────────────────────────────
const findings = []
function flag(entry, severity, code, message) {
  findings.push({ severity, code, trackId: entry.trackId, id: entry.id, title: entry.title, url: entry.url, message })
}

for (const entry of entries) {
  if (!entry.title || !entry.title.trim()) flag(entry, 'high', 'missing-title', 'Link has no title.')
  if (!entry.description || entry.description.trim().length < 12) flag(entry, 'medium', 'thin-description', 'Link has a missing or thin description.')
  if (!isValidHttpUrl(entry.url)) flag(entry, 'critical', 'invalid-url', `Invalid URL: ${entry.url}`)
  if (entry.type && !RESOURCE_TYPES.has(entry.type)) flag(entry, 'medium', 'unknown-type', `Unknown resource type: ${entry.type}`)
  if (entry.type === 'video' && isYouTubeVideoUrl(entry.url)) {
    const id = youTubeId(entry.url)
    if (!id || !YOUTUBE_ID_RE.test(id)) flag(entry, 'high', 'invalid-youtube-id', `Invalid YouTube video id: ${entry.url}`)
  }
}

// Duplicate URLs (resources only; AI-guide tools may legitimately reference the
// same product page as a catalogue resource).
for (const [url, owners] of urlIndex) {
  const resourcesOnly = owners.filter((o) => o.kind === 'resource')
  if (resourcesOnly.length < 2) continue
  const withinTrack = new Map()
  for (const owner of resourcesOnly) withinTrack.set(owner.trackId, (withinTrack.get(owner.trackId) || 0) + 1)
  for (const [trackId, count] of withinTrack) {
    if (count > 1) {
      findings.push({ severity: 'high', code: 'duplicate-url-in-track', trackId, id: null, title: '', url, message: `URL appears ${count} times in track ${trackId}.` })
    }
  }
  if (withinTrack.size > 1 && withinTrack.size === resourcesOnly.length) {
    findings.push({ severity: 'low', code: 'duplicate-url-across-tracks', trackId: resourcesOnly.map((o) => o.trackId).join(','), id: null, title: '', url, message: `Same URL used in ${resourcesOnly.length} different tracks.` })
  }
}

// ── Live checks ───────────────────────────────────────────────────────────
function classifyStatus(status) {
  if (status >= 200 && status < 400) return 'available'
  if (status === 401 || status === 403 || status === 429 || status === 503) return 'restricted'
  if (status === 404 || status === 410 || status === 451) return 'unavailable'
  if (status >= 400) return 'error'
  return 'inconclusive'
}

async function withTimeout(promise, ms) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await promise(controller.signal)
  } finally {
    clearTimeout(timer)
  }
}

async function checkLive(entry) {
  const result = { url: entry.url, status: null, finalUrl: null, classification: 'inconclusive', detail: '' }
  if (!isValidHttpUrl(entry.url)) {
    result.classification = 'invalid'
    return result
  }

  // YouTube videos: verify the actual video destination via oEmbed.
  if (isYouTubeVideoUrl(entry.url)) {
    try {
      const target = `https://www.youtube.com/oembed?url=${encodeURIComponent(entry.url)}&format=json`
      const response = await withTimeout((signal) => fetch(target, { signal }), TIMEOUT_MS)
      result.status = response.status
      if (response.ok) {
        result.classification = 'available'
        result.detail = 'oEmbed confirmed the video'
      } else if (response.status === 404 || response.status === 401) {
        result.classification = 'unavailable'
        result.detail = 'oEmbed reports the video is unavailable'
      } else {
        result.classification = 'inconclusive'
        result.detail = `oEmbed status ${response.status}`
      }
      return result
    } catch (error) {
      result.classification = 'inconclusive'
      result.detail = `oEmbed error: ${String(error.message || error).slice(0, 80)}`
      return result
    }
  }

  const headers = { 'User-Agent': 'Mozilla/5.0 (compatible; TechSkillHub-ResourceAudit/1.0)' }
  try {
    let response = await withTimeout((signal) => fetch(entry.url, { method: 'HEAD', redirect: 'follow', headers, signal }), TIMEOUT_MS)
    // Many hosts block HEAD or answer it with 404/405 while GET succeeds, so fall
    // back to GET whenever HEAD does not look healthy.
    if (!(response.status >= 200 && response.status < 400)) {
      response = await withTimeout((signal) => fetch(entry.url, { method: 'GET', redirect: 'follow', headers, signal }), TIMEOUT_MS)
    }
    result.status = response.status
    result.finalUrl = response.url !== entry.url ? response.url : null
    result.classification = classifyStatus(response.status)
    if (result.finalUrl && result.classification === 'available') result.detail = 'redirected to a valid destination'
    return result
  } catch (error) {
    // Some hosts reject HEAD; retry once with GET before declaring inconclusive.
    try {
      const response = await withTimeout((signal) => fetch(entry.url, { method: 'GET', redirect: 'follow', headers, signal }), TIMEOUT_MS)
      result.status = response.status
      result.finalUrl = response.url !== entry.url ? response.url : null
      result.classification = classifyStatus(response.status)
      return result
    } catch (error2) {
      result.classification = 'inconclusive'
      result.detail = `network error: ${String(error2.message || error2).slice(0, 80)}`
      return result
    }
  }
}

let liveResults = []
if (LIVE) {
  const queue = [...entries]
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) {
      const entry = queue.shift()
      const live = await checkLive(entry)
      liveResults.push({ ...live, trackId: entry.trackId, id: entry.id, title: entry.title, kind: entry.kind })
    }
  })
  await Promise.all(workers)
}

// ── Report ────────────────────────────────────────────────────────────────
const liveByClass = liveResults.reduce((acc, r) => {
  acc[r.classification] = (acc[r.classification] || 0) + 1
  return acc
}, {})

const report = {
  generatedAt: new Date().toISOString(),
  live: LIVE,
  totals: {
    links: entries.length,
    resources: entries.filter((e) => e.kind === 'resource').length,
    aiTools: entries.filter((e) => e.kind === 'ai-tool').length,
    uniqueUrls: urlIndex.size,
  },
  structuralFindings: findings,
  structuralByCode: findings.reduce((acc, f) => {
    acc[f.code] = (acc[f.code] || 0) + 1
    return acc
  }, {}),
  liveByClass,
  liveResults: LIVE ? liveResults : undefined,
}

if (args.has('--json')) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
} else {
  const lines = []
  lines.push('# TechSkillHub — Resource Reliability Audit')
  lines.push('')
  lines.push(`Generated: ${report.generatedAt} · live network checks: ${LIVE ? 'yes' : 'no'}`)
  lines.push('')
  lines.push(`Links audited: ${report.totals.links} (${report.totals.resources} resources, ${report.totals.aiTools} AI-guide tools), ${report.totals.uniqueUrls} unique URLs.`)
  lines.push('')
  lines.push('## Structural findings')
  lines.push('')
  lines.push('| Code | Count |')
  lines.push('| --- | ---: |')
  for (const [code, count] of Object.entries(report.structuralByCode)) lines.push(`| ${code} | ${count} |`)
  if (!Object.keys(report.structuralByCode).length) lines.push('| (none) | 0 |')
  lines.push('')
  if (LIVE) {
    lines.push('## Live verification')
    lines.push('')
    lines.push('| Classification | Count |')
    lines.push('| --- | ---: |')
    for (const [cls, count] of Object.entries(liveByClass)) lines.push(`| ${cls} | ${count} |`)
    lines.push('')
    const problems = liveResults.filter((r) => r.classification === 'unavailable' || r.classification === 'error' || r.classification === 'invalid')
    if (problems.length) {
      lines.push('### Confirmed broken')
      lines.push('')
      for (const p of problems) lines.push(`- \`${p.trackId}\` ${p.id ?? p.title}: ${p.url} — ${p.classification} (${p.status ?? ''})`)
      lines.push('')
    }
    const restricted = liveResults.filter((r) => r.classification === 'restricted')
    if (restricted.length) {
      lines.push('### Access-restricted or automated-request-blocked (verify manually)')
      lines.push('')
      for (const p of restricted) lines.push(`- \`${p.trackId}\` ${p.id ?? p.title}: ${p.url} — HTTP ${p.status}`)
      lines.push('')
    }
    const inconclusive = liveResults.filter((r) => r.classification === 'inconclusive')
    if (inconclusive.length) {
      lines.push('### Inconclusive (network/other)')
      lines.push('')
      for (const p of inconclusive) lines.push(`- \`${p.trackId}\` ${p.id ?? p.title}: ${p.url} — ${p.detail || 'no detail'}`)
      lines.push('')
    }
  }
  lines.push('## Structural finding detail')
  lines.push('')
  for (const f of findings) {
    lines.push(`- [${f.severity}] \`${f.trackId}\` ${f.id ?? f.title}: ${f.message}`)
  }
  lines.push('')
  writeFileSync(join(root, 'scripts', 'resource-audit-report.md'), lines.join('\n'), 'utf8')
  writeFileSync(join(root, 'scripts', 'resource-audit-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Resource audit written. Links: ${report.totals.links}. Structural findings: ${findings.length}.${LIVE ? ` Live: ${JSON.stringify(liveByClass)}` : ''}`)
}

if (args.has('--check') && (findings.some((f) => f.severity === 'critical') || liveResults.some((r) => r.classification === 'unavailable'))) {
  console.error('Resource audit failed: critical structural defects or confirmed-unavailable resources remain.')
  process.exit(1)
}
