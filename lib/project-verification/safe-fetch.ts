/**
 * SSRF-safe fetching for untrusted external artifacts.
 *
 * Every host is resolved and every redirect hop re-validated against private,
 * loopback, link-local and cloud-metadata address ranges. Requests are time and
 * size bounded and restricted to http(s). Test seams (`fetchImpl`, `resolveImpl`)
 * allow deterministic unit tests without real network access.
 */

import { lookup as dnsLookup } from 'node:dns/promises'

export type SafeFetchFailureKind = 'invalid' | 'blocked' | 'unavailable' | 'too_large' | 'wrong_type' | 'timeout'

export type SafeFetchResult =
  | { ok: true; status: number; contentType: string; finalUrl: string; body: string; truncated: boolean }
  | { ok: false; kind: SafeFetchFailureKind; reason: string }

export interface SafeFetchOptions {
  timeoutMs?: number
  maxBytes?: number
  maxRedirects?: number
  allowedContentTypes?: string[]
  userAgent?: string
  fetchImpl?: typeof fetch
  resolveImpl?: (hostname: string) => Promise<string[]>
}

const DEFAULTS = { timeoutMs: 8000, maxBytes: 512 * 1024, maxRedirects: 3 }

export function isPrivateIp(ip: string): boolean {
  const value = ip.trim()
  // IPv6
  if (value.includes(':')) {
    const lower = value.toLowerCase()
    if (lower === '::1' || lower === '::') return true
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true // unique local
    if (lower.startsWith('fe80')) return true // link-local
    if (lower.startsWith('::ffff:')) return isPrivateIp(lower.slice(7)) // IPv4-mapped
    return false
  }
  const parts = value.split('.').map((p) => Number(p))
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true // malformed → block
  const [a, b] = parts
  if (a === 0 || a === 10 || a === 127) return true
  if (a === 169 && b === 254) return true // link-local + metadata
  if (a === 172 && b >= 16 && b <= 31) return true
  if (a === 192 && b === 168) return true
  if (a === 100 && b >= 64 && b <= 127) return true // CGNAT
  return false
}

async function defaultResolve(hostname: string): Promise<string[]> {
  const records = await dnsLookup(hostname, { all: true })
  return records.map((r) => r.address)
}

function isAllowedType(contentType: string, allowed?: string[]): boolean {
  if (!allowed || allowed.length === 0) return true
  const type = contentType.split(';')[0].trim().toLowerCase()
  return allowed.some((a) => type === a || type.startsWith(`${a}/`))
}

/**
 * Safely fetch a text resource. Returns a classified failure rather than
 * throwing so callers can distinguish "invalid" from "temporarily unavailable".
 */
export async function safeFetchText(rawUrl: string, options: SafeFetchOptions = {}): Promise<SafeFetchResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULTS.timeoutMs
  const maxBytes = options.maxBytes ?? DEFAULTS.maxBytes
  const maxRedirects = options.maxRedirects ?? DEFAULTS.maxRedirects
  const doFetch = options.fetchImpl ?? fetch
  const resolve = options.resolveImpl ?? defaultResolve

  let current: URL
  try {
    current = new URL(rawUrl)
  } catch {
    return { ok: false, kind: 'invalid', reason: 'Not a valid URL.' }
  }

  for (let hop = 0; hop <= maxRedirects; hop += 1) {
    if (current.protocol !== 'http:' && current.protocol !== 'https:') {
      return { ok: false, kind: 'blocked', reason: 'Only http(s) is allowed.' }
    }
    let addresses: string[]
    try {
      addresses = await resolve(current.hostname)
    } catch {
      return { ok: false, kind: 'unavailable', reason: 'The host could not be resolved.' }
    }
    if (addresses.length === 0) return { ok: false, kind: 'unavailable', reason: 'The host could not be resolved.' }
    if (addresses.some(isPrivateIp)) {
      return { ok: false, kind: 'blocked', reason: 'That address is not publicly reachable.' }
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    let response: Response
    try {
      response = await doFetch(current.toString(), {
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'User-Agent': options.userAgent ?? 'TechSkillHub-ArtifactVerifier/1.0', Accept: 'text/html,application/json,text/plain,*/*' },
      })
    } catch (error) {
      clearTimeout(timer)
      const aborted = error instanceof Error && error.name === 'AbortError'
      return { ok: false, kind: aborted ? 'timeout' : 'unavailable', reason: aborted ? 'The request timed out.' : 'The resource could not be reached.' }
    }
    clearTimeout(timer)

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      if (!location) return { ok: false, kind: 'unavailable', reason: 'A redirect had no destination.' }
      try {
        current = new URL(location, current)
      } catch {
        return { ok: false, kind: 'invalid', reason: 'A redirect pointed to an invalid URL.' }
      }
      continue
    }

    if (!response.ok) {
      return { ok: false, kind: 'unavailable', reason: `The resource returned HTTP ${response.status}.` }
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!isAllowedType(contentType, options.allowedContentTypes)) {
      return { ok: false, kind: 'wrong_type', reason: `Unsupported content type: ${contentType || 'unknown'}.` }
    }

    const reader = response.body?.getReader()
    if (!reader) {
      const text = await response.text()
      return finish(text, response, current, maxBytes)
    }
    const decoder = new TextDecoder()
    let received = 0
    let truncated = false
    let body = ''
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      received += value.length
      if (received > maxBytes) {
        truncated = true
        await reader.cancel().catch(() => {})
        break
      }
      body += decoder.decode(value, { stream: true })
    }
    body += decoder.decode()
    return { ok: true, status: response.status, contentType, finalUrl: current.toString(), body, truncated }
  }

  return { ok: false, kind: 'unavailable', reason: 'Too many redirects.' }
}

function finish(text: string, response: Response, url: URL, maxBytes: number): SafeFetchResult {
  const truncated = text.length > maxBytes
  return {
    ok: true,
    status: response.status,
    contentType: response.headers.get('content-type') ?? '',
    finalUrl: url.toString(),
    body: truncated ? text.slice(0, maxBytes) : text,
    truncated,
  }
}
