/**
 * Shared content-extraction helpers for external resource verification.
 *
 * Used by `scripts/verify-resource-links.mjs` (the probe that produces
 * `scripts/resource-probe.json`) and by candidate-comparison tooling. It stores
 * only a short original excerpt — never a reproduction of the material.
 *
 * Level-3 verification requires `probeUrl(url).contentChars >= MIN_CONTENT_CHARS`
 * with a non-empty excerpt and no paywall signal.
 */

import { createHash } from 'node:crypto'

export const MIN_CONTENT_CHARS = 600

const STOPWORDS = new Set(
  ('the a an and or but if then than that this these those of to in on at for with from by as is are was were be been being it its into over under about after before while you your we our they their he she his her not no do does did done can could should would may might must will shall have has had how what when where which who whom why all any both each few more most other some such only own same so too very s t just don now here there also use used using make makes made get gets got one two three new like via per etc').split(' '),
)

export function decodeEntities(input) {
  return input
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x2f;/gi, '/')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
}

/** Extract the main readable text from a page (concise, not a reproduction). */
export function extractMainText(html) {
  let s = html
  s = s.replace(/<!--[\s\S]*?-->/g, ' ')
  s = s.replace(/<(script|style|noscript|svg|template|iframe|head)[\s\S]*?<\/\1>/gi, ' ')
  s = s.replace(/<(nav|header|footer|aside|form|button)[\s\S]*?<\/\1>/gi, ' ')
  const main = s.match(/<main[\s>][\s\S]*?<\/main>/i) || s.match(/<article[\s>][\s\S]*?<\/article>/i)
  if (main) s = main[0]
  s = s.replace(/<[^>]+>/g, ' ')
  s = decodeEntities(s)
  s = s.replace(/\s+/g, ' ').trim()
  return s
}

export function significantTerms(text, limit = 60) {
  const counts = new Map()
  for (const raw of text.toLowerCase().split(/[^a-z0-9+#-]+/)) {
    const word = raw.replace(/^[-#]+|[-#]+$/g, '')
    if (word.length < 4 || STOPWORDS.has(word) || /^\d+$/.test(word)) continue
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word]) => word)
}

export function parseDuration(text) {
  const match = text.match(/"duration"\s*:\s*"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?"/i) || text.match(/content="PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?"/i)
  if (!match) return undefined
  const minutes = Number(match[1] ?? 0) * 60 + Number(match[2] ?? 0) + Math.round(Number(match[3] ?? 0) / 60)
  return minutes > 0 ? minutes : undefined
}

const PAYWALL_PATTERNS = [
  /subscribe to continue/i,
  /this (?:article|content|story) is for (?:subscribers|members)/i,
  /sign in to (?:continue|read) (?:reading|this)/i,
  /create (?:a )?free account to (?:continue|keep) (?:reading|going)/i,
  /you(?:'ve| have) reached your (?:free )?(?:article|story) limit/i,
  /content is (?:currently )?unavailable in your (?:region|country)/i,
]

export function detectPaywall(html, text) {
  const haystack = `${html.slice(0, 20000)} ${text.slice(0, 4000)}`
  return PAYWALL_PATTERNS.some((re) => re.test(haystack))
}

export function youtubeId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export const DEFAULT_UA = 'Mozilla/5.0 (compatible; TechSkillHubLinkCheck/2.0; +https://techskillhub.example)'

export async function fetchWithTimeout(url, { userAgent = DEFAULT_UA, timeoutMs = 20000 } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': userAgent, accept: 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8' },
    })
  } finally {
    clearTimeout(timer)
  }
}

async function probeYoutube(url, checkedAt) {
  const id = youtubeId(url)
  try {
    const response = await fetchWithTimeout(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`)
    if (response.status >= 200 && response.status < 300) {
      const data = await response.json()
      return {
        status: 200,
        finalUrl: url,
        host: 'www.youtube.com',
        title: String(data.title ?? '').slice(0, 200),
        kind: 'video',
        contentChars: 0,
        excerpt: '',
        contentHash: '',
        terms: [],
        checkedAt,
        note: 'Video identity verified via the publisher oEmbed API. Playback and transcript not verified in this environment (no unauthenticated transcript endpoint).',
      }
    }
    return { status: response.status, finalUrl: url, host: 'www.youtube.com', title: '', kind: 'video', contentChars: 0, excerpt: '', contentHash: '', terms: [], checkedAt }
  } catch (error) {
    return { status: 0, finalUrl: url, host: 'www.youtube.com', title: '', kind: 'video', contentChars: 0, excerpt: '', contentHash: '', terms: [], error: String(error?.message ?? error).slice(0, 160), checkedAt }
  }
}

/**
 * Fetch a URL and return durable evidence about it. Videos are recorded via the
 * publisher oEmbed API (identity only — never playback).
 */
export async function probeUrl(url, checkedAt = new Date().toISOString().slice(0, 10), options = {}) {
  if (youtubeId(url)) return probeYoutube(url, checkedAt)
  const host = (() => {
    try {
      return new URL(url).host
    } catch {
      return ''
    }
  })()
  try {
    const response = await fetchWithTimeout(url, options)
    const contentType = (response.headers.get('content-type') || '').toLowerCase()
    const base = { status: response.status, finalUrl: response.url, host, checkedAt, title: '', kind: 'unknown', contentChars: 0, excerpt: '', contentHash: '', terms: [] }
    if (response.status < 200 || response.status >= 400) return { ...base, kind: 'blocked-or-shell' }
    if (contentType.includes('application/pdf')) return { ...base, kind: 'pdf', note: 'PDF resource; content not extracted by this tool.' }
    if (contentType.includes('application/json')) {
      const body = await response.text()
      const text = body.slice(0, 4000)
      return { ...base, kind: 'json', contentChars: text.length, excerpt: text.replace(/\s+/g, ' ').slice(0, 280), contentHash: createHash('sha256').update(body).digest('hex').slice(0, 16), terms: significantTerms(text) }
    }
    const html = await response.text()
    const title = decodeEntities((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/\s+/g, ' ').trim().slice(0, 200)
    const text = extractMainText(html)
    const paywalled = detectPaywall(html, text)
    const durationMinutes = parseDuration(html)
    const kind = text.length < 200 ? 'blocked-or-shell' : 'html'
    return {
      ...base,
      title,
      kind,
      contentChars: text.length,
      excerpt: text.slice(0, 280),
      contentHash: createHash('sha256').update(text).digest('hex').slice(0, 16),
      terms: significantTerms(text),
      durationMinutes,
      paywalled,
    }
  } catch (error) {
    return { status: 0, finalUrl: url, host, title: '', kind: 'unknown', contentChars: 0, excerpt: '', contentHash: '', terms: [], error: String(error?.message ?? error).slice(0, 160), checkedAt }
  }
}
