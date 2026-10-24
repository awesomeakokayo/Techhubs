/**
 * Deterministic artifact validation.
 *
 * Pure functions that classify a submitted URL, check it matches the required
 * artifact kind, and scan text for obviously committed secrets. These run before
 * any AI call so malformed or wrong-provider submissions are rejected cheaply.
 */

import type { ArtifactKind } from './contract'

export type Provider =
  | 'github'
  | 'gitlab'
  | 'codesandbox'
  | 'stackblitz'
  | 'replit'
  | 'figma'
  | 'youtube'
  | 'vimeo'
  | 'loom'
  | 'google_drive'
  | 'google_docs'
  | 'google_sheets'
  | 'colab'
  | 'kaggle'
  | 'notion'
  | 'web'
  | 'unknown'

export interface ParsedArtifactUrl {
  ok: boolean
  provider: Provider
  canonical?: string
  reason?: string
}

function hostOf(url: URL): string {
  return url.hostname.toLowerCase().replace(/^www\./, '')
}

/** Classify a URL by provider. Does not perform any network access. */
export function classifyProvider(raw: string): { provider: Provider; url?: URL; reason?: string } {
  let url: URL
  try {
    url = new URL(raw.trim())
  } catch {
    return { provider: 'unknown', reason: 'That is not a valid URL.' }
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { provider: 'unknown', reason: 'Only http(s) links are supported.' }
  }
  const host = hostOf(url)
  if (host === 'github.com' || host.endsWith('.github.com')) return { provider: 'github', url }
  if (host === 'gitlab.com') return { provider: 'gitlab', url }
  if (host.endsWith('codesandbox.io')) return { provider: 'codesandbox', url }
  if (host.endsWith('stackblitz.com')) return { provider: 'stackblitz', url }
  if (host.endsWith('replit.com') || host.endsWith('repl.it')) return { provider: 'replit', url }
  if (host.endsWith('figma.com')) return { provider: 'figma', url }
  if (host === 'youtube.com' || host === 'youtu.be' || host.endsWith('.youtube.com')) return { provider: 'youtube', url }
  if (host.endsWith('vimeo.com')) return { provider: 'vimeo', url }
  if (host.endsWith('loom.com')) return { provider: 'loom', url }
  if (host === 'drive.google.com' || host === 'docs.google.com') {
    if (url.pathname.startsWith('/document')) return { provider: 'google_docs', url }
    if (url.pathname.startsWith('/spreadsheets')) return { provider: 'google_sheets', url }
    return { provider: 'google_drive', url }
  }
  if (host === 'colab.research.google.com') return { provider: 'colab', url }
  if (host.endsWith('kaggle.com')) return { provider: 'kaggle', url }
  if (host.endsWith('notion.site') || host.endsWith('notion.so')) return { provider: 'notion', url }
  return { provider: 'web', url }
}

/** Which providers can satisfy a required artifact kind. */
const KIND_PROVIDERS: Record<ArtifactKind, Provider[]> = {
  github_repo: ['github', 'gitlab'],
  code_sandbox: ['codesandbox', 'stackblitz', 'replit', 'github', 'gitlab'],
  live_url: ['web', 'github', 'gitlab', 'codesandbox', 'stackblitz', 'replit', 'notion'],
  notebook: ['github', 'gitlab', 'colab', 'kaggle'],
  dataset: ['kaggle', 'web', 'github', 'google_sheets', 'google_drive'],
  design_file: ['figma'],
  design_export: ['figma', 'web', 'google_drive'],
  video_url: ['youtube', 'vimeo', 'loom', 'web', 'google_drive'],
  document_url: ['google_docs', 'google_drive', 'notion', 'web', 'github'],
  document_file: ['google_docs', 'google_drive', 'web'],
  dashboard_url: ['web', 'google_sheets', 'notion'],
  presentation: ['google_drive', 'google_docs', 'notion', 'web'],
  image: ['web', 'google_drive', 'figma', 'github'],
  text: ['web', 'github', 'gitlab', 'notion', 'google_docs', 'google_drive'],
}

export function providerMatchesKind(provider: Provider, kind: ArtifactKind): boolean {
  return KIND_PROVIDERS[kind]?.includes(provider) ?? false
}

/**
 * Parse and validate a submitted URL for a required artifact kind. Returns a
 * helpful reason when the provider cannot satisfy the kind (for example a Gmail
 * link where a GitHub repository is required).
 */
export function parseArtifactUrl(kind: ArtifactKind, raw: string): ParsedArtifactUrl {
  const classified = classifyProvider(raw)
  if (!classified.url) return { ok: false, provider: 'unknown', reason: classified.reason }
  if (!providerMatchesKind(classified.provider, kind)) {
    return {
      ok: false,
      provider: classified.provider,
      reason: artifactKindMismatchMessage(kind, classified.provider),
    }
  }
  return { ok: true, provider: classified.provider, canonical: canonicalize(classified.provider, classified.url) }
}

export function artifactKindMismatchMessage(kind: ArtifactKind, provider: Provider): string {
  if ((kind === 'github_repo' || kind === 'notebook') && provider !== 'github' && provider !== 'gitlab' && provider !== 'colab' && provider !== 'kaggle') {
    return 'This project requires a publicly accessible source repository (for example a public GitHub repository) that an evaluator can inspect. A link to an unrelated site cannot be assessed.'
  }
  if (kind === 'design_file' && provider !== 'figma') {
    return 'This project requires a publicly viewable Figma file or prototype, or an exported design (PDF/images).'
  }
  if (kind === 'video_url' && !['youtube', 'vimeo', 'loom', 'web', 'google_drive'].includes(provider)) {
    return 'This project requires an accessible video preview, such as a public or unlisted YouTube/Vimeo link.'
  }
  return `That link does not look like the required artifact (${kind.replace(/_/g, ' ')}).`
}

function canonicalize(provider: Provider, url: URL): string {
  const host = hostOf(url)
  const path = url.pathname.replace(/\/+$/, '')
  if (provider === 'youtube') {
    if (host === 'youtu.be') return `https://www.youtube.com/watch?v=${url.pathname.slice(1)}`
    const id = url.searchParams.get('v')
    if (id) return `https://www.youtube.com/watch?v=${id}`
  }
  return `https://${host}${path}`
}

/* ------------------------------------------------------------------ */
/* Secret detection                                                    */
/* ------------------------------------------------------------------ */

interface SecretRule {
  id: string
  label: string
  pattern: RegExp
}

const SECRET_RULES: SecretRule[] = [
  { id: 'aws-access-key', label: 'AWS access key id', pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'private-key', label: 'PEM private key', pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { id: 'openai-key', label: 'OpenAI-style API key', pattern: /\bsk-[A-Za-z0-9]{20,}\b/ },
  { id: 'github-token', label: 'GitHub personal access token', pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b/ },
  { id: 'slack-token', label: 'Slack token', pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { id: 'google-api-key', label: 'Google API key', pattern: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { id: 'stripe-secret', label: 'Stripe secret key', pattern: /\bsk_live_[0-9a-zA-Z]{20,}\b/ },
  { id: 'env-assignment', label: 'Likely secret in an .env-style line', pattern: /(?:SECRET|PASSWORD|API_KEY|ACCESS_TOKEN|PRIVATE_KEY)\s*=\s*['"]?[A-Za-z0-9_\-]{12,}['"]?/i },
]

export interface SecretFinding {
  ruleId: string
  label: string
}

/**
 * Scan text for obviously committed secrets. Returns only rule identifiers and
 * labels — never the matched secret value, so it is safe to log or send onward.
 */
export function scanForSecrets(text: string): SecretFinding[] {
  if (!text) return []
  const findings = new Map<string, SecretFinding>()
  for (const rule of SECRET_RULES) {
    if (rule.pattern.test(text)) findings.set(rule.id, { ruleId: rule.id, label: rule.label })
  }
  return Array.from(findings.values())
}

/** True when text is empty or only library/framework boilerplate. */
export function looksLikePlaceholder(text: string): boolean {
  const trimmed = text.replace(/[\s#*\-]/g, '')
  if (trimmed.length < 40) return true
  const boilerplate = /^(add a readme|todo|com ing soon|my project|lorem ipsum)+$/i.test(trimmed)
  return boilerplate
}
