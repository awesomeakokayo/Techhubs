/**
 * Assessment provider abstraction.
 *
 * The evaluator is pluggable so assessment and progression logic never depend on
 * a specific vendor. DeepSeek Flash is the default live provider; a mock provider
 * is used for deterministic tests. All credentials stay on the server.
 */

export interface AssessmentRequest {
  systemPrompt: string
  userPrompt: string
  maxOutputTokens?: number
  temperature?: number
}

export interface AssessmentProvider {
  name: string
  model: string
  /** Returns the raw model output; throws ProviderError on failure. */
  assess(request: AssessmentRequest): Promise<string>
}

export type ProviderFailure = 'rate_limited' | 'timeout' | 'unavailable' | 'malformed' | 'not_configured'

export class ProviderError extends Error {
  kind: ProviderFailure
  constructor(kind: ProviderFailure, message: string) {
    super(message)
    this.name = 'ProviderError'
    this.kind = kind
  }
}

export interface DeepSeekConfig {
  apiKey?: string
  baseUrl?: string
  model?: string
  fetchImpl?: typeof fetch
  timeoutMs?: number
}

export const DEFAULT_DEEPSEEK_BASE_URL = 'https://api.deepseek.com'
export const DEFAULT_DEEPSEEK_MODEL = 'deepseek-flash'

/** Create a DeepSeek assessment provider from server-side configuration. */
export function createDeepSeekProvider(config: DeepSeekConfig = {}): AssessmentProvider {
  const apiKey = config.apiKey ?? process.env.DEEPSEEK_API_KEY
  const baseUrl = (config.baseUrl ?? process.env.DEEPSEEK_BASE_URL ?? DEFAULT_DEEPSEEK_BASE_URL).replace(/\/+$/, '')
  const model = config.model ?? process.env.DEEPSEEK_MODEL ?? DEFAULT_DEEPSEEK_MODEL
  const doFetch = config.fetchImpl ?? fetch
  const timeoutMs = config.timeoutMs ?? 30000

  return {
    name: 'deepseek',
    model,
    async assess(request: AssessmentRequest): Promise<string> {
      if (!apiKey) throw new ProviderError('not_configured', 'The assessment provider is not configured.')
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeoutMs)
      try {
        const response = await doFetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          signal: controller.signal,
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: request.systemPrompt },
              { role: 'user', content: request.userPrompt },
            ],
            response_format: { type: 'json_object' },
            max_tokens: request.maxOutputTokens ?? 2500,
            temperature: request.temperature ?? 0.1,
            stream: false,
          }),
        })
        if (response.status === 429) throw new ProviderError('rate_limited', 'The assessment service is rate-limiting requests.')
        if (response.status >= 500) throw new ProviderError('unavailable', 'The assessment service is temporarily unavailable.')
        if (!response.ok) throw new ProviderError('unavailable', `The assessment service returned HTTP ${response.status}.`)
        const data = (await response.json()) as { choices?: { message?: { content?: string } }[] }
        const content = data?.choices?.[0]?.message?.content
        if (typeof content !== 'string' || content.trim().length === 0) {
          throw new ProviderError('malformed', 'The assessment service returned an empty response.')
        }
        return content
      } catch (error) {
        if (error instanceof ProviderError) throw error
        const aborted = error instanceof Error && error.name === 'AbortError'
        throw new ProviderError(aborted ? 'timeout' : 'unavailable', aborted ? 'The assessment timed out.' : 'The assessment service could not be reached.')
      } finally {
        clearTimeout(timer)
      }
    },
  }
}

/** Deterministic provider for tests. Returns a queued response or throws a queued error. */
export function createMockProvider(scripted: Array<string | ProviderError | { output: string } | { error: ProviderFailure }>): AssessmentProvider & { calls: AssessmentRequest[] } {
  let cursor = 0
  const calls: AssessmentRequest[] = []
  return {
    name: 'mock',
    model: 'mock-model',
    calls,
    async assess(request: AssessmentRequest): Promise<string> {
      calls.push(request)
      const next = scripted[Math.min(cursor, scripted.length - 1)]
      cursor += 1
      if (typeof next === 'string') return next
      if (next instanceof ProviderError) throw next
      if (next && 'error' in next) throw new ProviderError(next.error, 'scripted failure')
      if (next && 'output' in next) return next.output
      throw new ProviderError('malformed', 'no scripted response')
    },
  }
}

export function providerFromFailure(error: unknown): ProviderFailure {
  if (error instanceof ProviderError) return error.kind
  return 'unavailable'
}
