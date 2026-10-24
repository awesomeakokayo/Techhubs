/**
 * SSRF-safe fetching for untrusted external artifacts.
 *
 * The hostname is resolved, every returned address is checked, and the selected
 * public IP is pinned into the actual HTTP socket lookup. This prevents a second
 * DNS lookup from rebinding a previously public hostname to a private address.
 * Redirects are resolved and pinned independently. Requests are time/size
 * bounded and restricted to HTTP(S).
 */
import { lookup as dnsLookup } from 'node:dns/promises'
import { isIP, type LookupFunction } from 'node:net'
import { request as httpRequest, type ClientRequest, type RequestOptions } from 'node:http'
import { request as httpsRequest } from 'node:https'
import { Readable } from 'node:stream'

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
  /** Test seam; production requests use the DNS-pinned Node HTTP client below. */
  fetchImpl?: typeof fetch
  resolveImpl?: (hostname: string) => Promise<string[]>
}

const DEFAULTS = { timeoutMs: 8000, maxBytes: 512 * 1024, maxRedirects: 3 }

function parseIPv6(value: string): bigint | null {
  let source = value.split('%')[0].toLowerCase()
  if (!source) return null

  // Normalize an IPv4 tail (e.g. ::ffff:192.168.1.1) into two IPv6 groups.
  if (source.includes('.')) {
    const colon = source.lastIndexOf(':')
    const ipv4 = source.slice(colon + 1)
    if (isIP(ipv4) !== 4) return null
    const [a, b, c, d] = ipv4.split('.').map(Number)
    const first = ((a << 8) | b).toString(16)
    const second = ((c << 8) | d).toString(16)
    source = source.slice(0, colon) + ':' + first + ':' + second
  }

  if (source.includes(':::')) return null
  const parts = source.split('::')
  if (parts.length > 2) return null
  const left = parts[0] ? parts[0].split(':') : []
  const right = parts.length === 2 && parts[1] ? parts[1].split(':') : []
  if (left.concat(right).some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return null

  const missing = 8 - left.length - right.length
  if ((parts.length === 1 && missing !== 0) || (parts.length === 2 && missing < 1)) return null
  const groups = [...left, ...Array(parts.length === 2 ? missing : 0).fill('0'), ...right]
  if (groups.length !== 8) return null

  return groups.reduce((result, group) => (result << 16n) | BigInt(Number.parseInt(group, 16)), 0n)
}

function inIPv6Range(address: bigint, network: bigint, prefixLength: number): boolean {
  const shift = BigInt(128 - prefixLength)
  return (address >> shift) === (network >> shift)
}

/**
 * True for private, loopback, link-local, reserved, documentation, multicast,
 * malformed, or otherwise non-global IP addresses. Despite the historical name,
 * the intent is to allow only globally reachable destinations.
 */
export function isPrivateIp(ip: string): boolean {
  const value = ip.trim().replace(/^\[|\]$/g, '').split('%')[0]
  const family = isIP(value)
  if (family === 0) return true

  if (family === 4) {
    const [a, b, c] = value.split('.').map(Number)
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 0 && (c === 0 || c === 2)) ||
      (a === 192 && b === 88 && c === 99) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100)) ) ||
      (a === 203 && b === 0 && c === 113) ||
      a >= 224
    )
  }

  const address = parseIPv6(value)
  if (address === null) return true

  // IPv4-mapped IPv6 uses the final 32 bits as the IPv4 address.
  if ((address >> 32n) === 0xffffn) {
    const v4 = Number(address & 0xffffffffn)
    return isPrivateIp([v4 >>> 24, (v4 >>> 16) & 255, (v4 >>> 8) & 255, v4 & 255].join('.'))
  }

  // Permit globally-unicast 2000::/3 only. Exclude the documentation prefix,
  // special-use 2001::/23 block, and deprecated 6to4 transition prefix.
  const globalStart = 0x20000000000000000000000000000000n
  const globalEnd = 0x40000000000000000000000000000000n
  if (address < globalStart || address >= globalEnd) return true
  if (inIPv6Range(address, 0x20010000000000000000000000000000n, 23)) return true
  if (inIPv6Range(address, 0x20010db8000000000000000000000000n, 32)) return true
  if (inIPv6Range(address, 0x20020000000000000000000000000000n, 16)) return true
  if (inIPv6Range(address, 0x3fff0000000000000000000000000000n, 20)) return true
  return false
}

/** A resolver that returns only the previously validated IP, never DNS results. */
export function createPinnedLookup(address: string): LookupFunction {
  const family = isIP(address) as 4 | 6
  if (family !== 4 && family !== 6) throw new Error('A valid resolved IP address is required.')

  return (_hostname, options, callback) => {
    if (options.all) callback(null, [{ address, family }])
    else callback(null, address, family)
  }
}

async function defaultResolve(hostname: string): Promise<string[]> {
  const records = await dnsLookup(hostname, { all: true, verbatim: true })
  return records.map((record) => record.address)
}

function isAllowedType(contentType: string, allowed?: string[]): boolean {
  if (!allowed || allowed.length === 0) return true
  const type = contentType.split(';')[0].trim().toLowerCase()
  return allowed.some((candidate) => type === candidate || type.startsWith(`${candidate}/`))
}

function pinnedRequest(
  url: URL,
  address: string,
  signal: AbortSignal,
  userAgent: string,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const hostname = url.hostname.replace(/^\[|\]$/g, '')
    let outgoing: ClientRequest | undefined
    let resolved = false

    const onAbort = () => outgoing?.destroy(new Error('SAFE_FETCH_TIMEOUT'))
    const onResponse = (incoming: import('node:http').IncomingMessage) => {
      const headers = new Headers()
      for (let index = 0; index < incoming.rawHeaders.length; index += 2) {
        const name = incoming.rawHeaders[index]
        const value = incoming.rawHeaders[index + 1]
        if (name && value !== undefined) {
          try { headers.append(name, value) } catch { /* Ignore malformed upstream headers. */ }
        }
      }

      const cleanup = () => signal.removeEventListener('abort', onAbort)
      incoming.once('close', cleanup)
      incoming.once('end', cleanup)
      incoming.once('error', cleanup)

      const status = incoming.statusCode ?? 502
      resolved = true
      // Fetch Response forbids bodies on these statuses. Consume any unexpected
      // bytes without exposing them, while retaining the timeout until the
      // underlying message is drained/closed.
      if (status === 204 || status === 205 || status === 304) {
        // No connection reuse is needed (agent:false); close immediately so a
        // malformed upstream cannot stream an ignored body indefinitely.
        incoming.destroy()
        resolve(new Response(null, { status, headers }))
        return
      }

      const stream = Readable.toWeb(incoming) as ReadableStream<Uint8Array>
      resolve(new Response(stream, { status, headers }))
    }

    const lookup = createPinnedLookup(address)
    const common: RequestOptions = {
      protocol: url.protocol,
      hostname,
      port: url.port || undefined,
      path: url.pathname + url.search,
      method: 'GET',
      agent: false,
      headers: {
        Host: url.host,
        'User-Agent': userAgent,
        Accept: 'text/html,application/json,text/plain,*/*',
      },
      lookup,
    }

    outgoing = url.protocol === 'https:'
      ? httpsRequest({ ...common, servername: isIP(hostname) === 0 ? hostname : undefined }, onResponse)
      : httpRequest(common, onResponse)

    outgoing.once('error', (error) => {
      signal.removeEventListener('abort', onAbort)
      if (!resolved) reject(error)
    })
    signal.addEventListener('abort', onAbort, { once: true })
    if (signal.aborted) onAbort()
    else outgoing.end()
  })
}

/** Safely fetch a text resource without allowing hostname-based DNS rebinding. */
export async function safeFetchText(rawUrl: string, options: SafeFetchOptions = {}): Promise<SafeFetchResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULTS.timeoutMs
  const maxBytes = options.maxBytes ?? DEFAULTS.maxBytes
  const maxRedirects = options.maxRedirects ?? DEFAULTS.maxRedirects
  const resolve = options.resolveImpl ?? defaultResolve
  const userAgent = options.userAgent ?? 'TechSkillHub-ArtifactVerifier/1.0'

  let current: URL
  try {
    current = new URL(rawUrl)
  } catch {
    return { ok: false, kind: 'invalid', reason: 'Not a valid URL.' }
  }

  if (current.username || current.password) {
    return { ok: false, kind: 'blocked', reason: 'URLs containing credentials are not allowed.' }
  }

  for (let hop = 0; hop <= maxRedirects; hop += 1) {
    if (current.protocol !== 'http:' && current.protocol !== 'https:') {
      return { ok: false, kind: 'blocked', reason: 'Only http(s) is allowed.' }
    }

    let addresses: string[]
    try {
      const literal = current.hostname.replace(/^\[|\]$/g, '')
      addresses = isIP(literal) ? [literal] : await resolve(literal)
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
      response = options.fetchImpl
        ? await options.fetchImpl(current.toString(), {
            redirect: 'manual',
            signal: controller.signal,
            headers: { 'User-Agent': userAgent, Accept: 'text/html,application/json,text/plain,*/*' },
          })
        : await pinnedRequest(current, addresses[0], controller.signal, userAgent)
    } catch (error) {
      clearTimeout(timer)
      const aborted = controller.signal.aborted || (error instanceof Error && error.message === 'SAFE_FETCH_TIMEOUT')
      return { ok: false, kind: aborted ? 'timeout' : 'unavailable', reason: aborted ? 'The request timed out.' : 'The resource could not be reached.' }
    }

    if (response.status >= 300 && response.status < 400) {
      clearTimeout(timer)
      await response.body?.cancel().catch(() => {})
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
      clearTimeout(timer)
      await response.body?.cancel().catch(() => {})
      return { ok: false, kind: 'unavailable', reason: `The resource returned HTTP ${response.status}.` }
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!isAllowedType(contentType, options.allowedContentTypes)) {
      clearTimeout(timer)
      await response.body?.cancel().catch(() => {})
      return { ok: false, kind: 'wrong_type', reason: `Unsupported content type: ${contentType || 'unknown'}.` }
    }

    try {
      const reader = response.body?.getReader()
      if (!reader) {
        const text = await response.text()
        const truncated = new TextEncoder().encode(text).length > maxBytes
        const body = truncated
          ? new TextDecoder().decode(new TextEncoder().encode(text).slice(0, maxBytes))
          : text
        return { ok: true, status: response.status, contentType, finalUrl: current.toString(), body, truncated }
      }

      const decoder = new TextDecoder()
      let received = 0
      let truncated = false
      let body = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        received += value.byteLength
        if (received > maxBytes) {
          truncated = true
          await reader.cancel().catch(() => {})
          break
        }
        body += decoder.decode(value, { stream: true })
      }
      body += decoder.decode()
      return { ok: true, status: response.status, contentType, finalUrl: current.toString(), body, truncated }
    } catch (error) {
      const aborted = controller.signal.aborted || (error instanceof Error && error.message === 'SAFE_FETCH_TIMEOUT')
      return { ok: false, kind: aborted ? 'timeout' : 'unavailable', reason: aborted ? 'The request timed out.' : 'The resource could not be read.' }
    } finally {
      clearTimeout(timer)
    }
  }

  return { ok: false, kind: 'unavailable', reason: 'Too many redirects.' }
}
