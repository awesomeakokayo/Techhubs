/**
 * Evidence adapters: turn a validated submission into a bounded package of actual
 * artifact evidence for the evaluator. Retrieval is kept separate from the model.
 *
 * Supported for real inspection: public GitHub repositories (metadata, README,
 * selected source files) and text-bearing documents/pages (Google Docs export,
 * generic public web pages). Other modalities are accessibility-checked and
 * reported honestly as limited rather than fabricated.
 */

import type { ArtifactKind, ArtifactRequirement, SubmissionContract } from './contract'
import type { SubmissionCode } from './diagnostics'
import { inspectGithubRepo, type GithubInspection } from './github'
import { safeFetchText, type SafeFetchResult } from './safe-fetch'
import { parseArtifactUrl, type Provider } from './validation'

export interface SubmittedArtifact {
  kind: ArtifactKind
  url: string
}

export interface EvidenceItem {
  label: string
  source: string
  content: string
}

export interface EvidencePackage {
  metadata: Record<string, unknown>
  items: EvidenceItem[]
  warnings: string[]
  /** Fingerprint input changes when the submitted artifacts change. */
  fingerprint: string
  /** Whether the deterministic layer considers evidence ready for assessment. */
  ready: boolean
  /** True when at least one required artifact could only be accessibility-checked. */
  limitedInspection: boolean
  /** Set when the deterministic layer rejects the submission outright. */
  rejected?: EvidenceRejection
}

export type EvidenceRejectionStatus = 'invalid' | 'incomplete' | 'service_unavailable' | 'unable_to_verify'

export interface EvidenceRejection {
  status: EvidenceRejectionStatus
  code: SubmissionCode
  reason: string
  helpGuideId?: string
  minWords?: number
  wordCount?: number
}

export interface EvidenceDeps {
  fetchImpl?: typeof fetch
  resolveImpl?: (hostname: string) => Promise<string[]>
  githubToken?: string
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function googleDocId(url: string): string | null {
  const match = url.match(/\/document\/d\/([A-Za-z0-9_-]+)/)
  return match ? match[1] : null
}

async function fetchWebText(url: string, deps: EvidenceDeps): Promise<{ ok: boolean; text?: string; reason?: string }> {
  const result: SafeFetchResult = await safeFetchText(url, {
    fetchImpl: deps.fetchImpl,
    resolveImpl: deps.resolveImpl,
    allowedContentTypes: ['text/html', 'text/plain', 'application/json'],
    maxBytes: 400 * 1024,
  })
  if (!result.ok) return { ok: false, reason: (result as Extract<SafeFetchResult, { ok: false }>).reason }
  const text = textFromResult(result, url)
  return { ok: true, text }
}

function textFromResult(result: Extract<SafeFetchResult, { ok: true }>, url: string): string {
  const looksHtml = result.contentType.includes('html') || /<html|<!doctype/i.test(result.body.slice(0, 200))
  return (looksHtml ? stripHtml(result.body) : result.body).slice(0, 24000)
}

/** Extract text from a hosted document (Google Docs export, generic page). */
async function fetchDocumentText(provider: Provider, url: string, deps: EvidenceDeps): Promise<{ ok: boolean; text?: string; reason?: string }> {
  if (provider === 'google_docs') {
    const id = googleDocId(url)
    if (id) {
      const exportUrl = `https://docs.google.com/document/d/${id}/export?format=txt`
      const exportResult = await safeFetchText(exportUrl, { fetchImpl: deps.fetchImpl, resolveImpl: deps.resolveImpl, maxBytes: 300 * 1024 })
      if (exportResult.ok) return { ok: true, text: textFromResult(exportResult, exportUrl) }
    }
  }
  return fetchWebText(url, deps)
}

function buildGitHubItems(inspection: GithubInspection): EvidenceItem[] {
  const items: EvidenceItem[] = []
  if (inspection.readme) items.push({ label: 'README', source: 'github:readme', content: inspection.readme.slice(0, 12000) })
  for (const file of inspection.selectedFiles) {
    items.push({ label: file.path, source: `github:${file.path}`, content: file.content.slice(0, 8000) })
  }
  return items
}

export interface CollectResult {
  package: EvidencePackage
}

/**
 * Deterministically validate every required artifact and collect evidence.
 * Network failures are classified (never treated as proof the project is bad).
 */
export async function collectEvidence(input: {
  contract: SubmissionContract
  artifacts: SubmittedArtifact[]
  explanation: string
  deps?: EvidenceDeps
}): Promise<CollectResult> {
  const { contract } = input
  const deps = input.deps ?? {}
  const metadata: Record<string, unknown> = { discipline: contract.discipline }
  const items: EvidenceItem[] = []
  const warnings: string[] = []
  const reject = (rejection: EvidenceRejection): CollectResult => ({
    package: { metadata, items, warnings, fingerprint: '', ready: false, limitedInspection: false, rejected: rejection },
  })

  const byKind = new Map<ArtifactKind, string>()
  for (const artifact of input.artifacts) {
    if (artifact && typeof artifact.url === 'string' && artifact.url.trim()) {
      byKind.set(artifact.kind, artifact.url.trim())
    }
  }

  // 1. The required primary project artifact(s) must be present and provider-compatible.
  const resolvedByKind = new Map<ArtifactKind, { kind: ArtifactKind; url: string }>()
  for (const requirement of contract.requiredArtifacts) {
    const direct = byKind.get(requirement.kind)
    if (direct) {
      resolvedByKind.set(requirement.kind, { kind: requirement.kind, url: direct })
      continue
    }
    const alternative = (requirement.alternatives ?? []).find((candidate) => byKind.has(candidate.kind))
    const alternativeUrl = alternative ? byKind.get(alternative.kind) : undefined
    if (!alternative || !alternativeUrl) {
      const alt = requirement.alternatives?.[0]
      return reject({
        status: 'incomplete',
        code: 'missing_artifact',
        reason: `Add the required project link (${requirement.label}). It must point to your actual project - not an unrelated website or a separate explanation document.`,
        helpGuideId: requirement.helpGuideId ?? alt?.helpGuideId,
      })
    }
    resolvedByKind.set(requirement.kind, { kind: alternative.kind, url: alternativeUrl })
  }

  for (const requirement of contract.requiredArtifacts) {
    const resolved = resolvedByKind.get(requirement.kind)
    if (!resolved) continue
    const parsed = parseArtifactUrl(resolved.kind, resolved.url)
    if (!parsed.ok) {
      return reject({
        status: 'invalid',
        code: 'invalid_project_url',
        reason: parsed.reason ?? `The link you entered is not a valid ${requirement.label}.`,
        helpGuideId: requirement.helpGuideId,
      })
    }
  }

  // 2. The written explanation is required text (never a URL). Relevance is judged by the evaluator.
  const wordCount = input.explanation.trim().split(/\s+/).filter(Boolean).length
  if (wordCount < contract.writtenExplanation.minWords) {
    return reject({
      status: 'incomplete',
      code: 'explanation_too_short',
      reason: `Your explanation is ${wordCount} words; at least ${contract.writtenExplanation.minWords} words are required. Describe what you built, how it works, and how it meets the project brief.`,
      helpGuideId: 'write-a-project-description',
      minWords: contract.writtenExplanation.minWords,
      wordCount,
    })
  }

  // 3. Inspect artifacts where we genuinely can.
  let limitedInspection = false
  for (const requirement of contract.requiredArtifacts) {
    const resolved = resolvedByKind.get(requirement.kind)
    if (!resolved) continue
    const { kind: effectiveKind, url } = resolved
    const parsed = parseArtifactUrl(effectiveKind, url)
    const provider = parsed.provider

    if (effectiveKind === 'github_repo' || (effectiveKind === 'notebook' && provider === 'github') || (effectiveKind === 'code_sandbox' && provider === 'github')) {
      const inspection = await inspectGithubRepo(url, {
        requiresReadme: contract.requiresReadme,
        requiresSourceInspection: contract.requiresSourceInspection,
        token: deps.githubToken,
        fetchImpl: deps.fetchImpl,
      })
      if (inspection.kind === 'unavailable') {
        return reject({
          status: 'service_unavailable',
          code: 'artifact_unavailable',
          reason: inspection.reason ?? 'The repository host is temporarily unavailable. Your submission was preserved — please retry shortly.',
          helpGuideId: requirement.helpGuideId,
        })
      }
      if (inspection.kind === 'invalid' || inspection.kind === 'empty') {
        const accessProblem = /private|does not exist|not public|inaccessible/i.test(inspection.reason ?? '')
        return reject({
          status: 'invalid',
          code: inspection.kind === 'empty' ? 'artifact_empty' : accessProblem ? 'repository_inaccessible' : 'invalid_project_url',
          reason:
            inspection.reason ??
            (inspection.kind === 'empty'
              ? 'The repository does not appear to contain the project. Add your implementation files and resubmit.'
              : 'The repository could not be accessed. Check that it is public and that the URL is correct.'),
          helpGuideId: requirement.helpGuideId,
        })
      }
      if (inspection.secretFindings.length) {
        return reject({
          status: 'invalid',
          code: 'secret_detected',
          reason: `We detected what looks like a committed secret (${inspection.secretFindings.map((s) => s.label).join(', ')}). Remove the secret from the repository, rotate it, and resubmit.`,
          helpGuideId: 'protect-api-keys-and-personal-data',
        })
      }
      warnings.push(...inspection.warnings)
      metadata.repository = {
        fullName: inspection.fullName,
        commitSha: inspection.commitSha,
        defaultBranch: inspection.defaultBranch,
        sizeKb: inspection.sizeKb,
        pushedAt: inspection.pushedAt,
        fileCount: inspection.tree.length,
        readmePresent: inspection.readmePresent,
      }
      items.push(...buildGitHubItems(inspection))
      continue
    }

    if (effectiveKind === 'document_url' || effectiveKind === 'presentation' || effectiveKind === 'document_file' || effectiveKind === 'text') {
      const doc = await fetchDocumentText(provider, url, deps)
      if (doc.ok && doc.text) {
        items.push({ label: requirement.label, source: `document:${provider}`, content: doc.text })
        metadata[`artifact:${effectiveKind}`] = { provider, accessible: true }
      } else {
        metadata[`artifact:${effectiveKind}`] = { provider, accessible: false }
        return reject({
          status: 'unable_to_verify',
          code: 'artifact_unavailable',
          reason: `We could not read your submitted document (${doc.reason ?? 'it was not accessible'}). Make sure it is shared so that anyone with the link can view it, then resubmit.`,
          helpGuideId: 'share-a-document-deliverable',
        })
      }
      continue
    }

    if (effectiveKind === 'live_url' || effectiveKind === 'dashboard_url') {
      const page = await fetchWebText(url, deps)
      metadata[`artifact:${effectiveKind}`] = { provider, accessible: page.ok }
      if (page.ok && page.text) {
        items.push({ label: requirement.label, source: `web:${provider}`, content: page.text.slice(0, 16000) })
      } else {
        return reject({
          status: 'unable_to_verify',
          code: 'artifact_unavailable',
          reason: `We could not reach your ${requirement.label} (${page.reason ?? 'it did not respond'}). Check that the link is public and points to the project, then resubmit.`,
          helpGuideId: requirement.helpGuideId,
        })
      }
      continue
    }

    // Modalities this platform cannot inspect (design files, video, images, datasets).
    const reachable = await checkReachable(url, provider, deps)
    metadata[`artifact:${effectiveKind}`] = { provider, accessible: reachable.ok, inspection: 'limited' }
    limitedInspection = true
    warnings.push(
      `We confirmed your ${requirement.label} link is reachable, but this platform cannot inspect that artifact's contents automatically. Those parts are assessed from your written explanation and the link itself. If the criteria below cannot be verified, provide an inspectable alternative artifact.`,
    )
    continue
  }

  metadata.limitedInspection = limitedInspection
  const fingerprint = computeEvidenceFingerprint(input.artifacts, contract.rubricVersion)
  return { package: { metadata, items, warnings, fingerprint, ready: true, limitedInspection } }
}

async function checkReachable(url: string, provider: Provider, deps: EvidenceDeps): Promise<{ ok: boolean; status?: number }> {
  const result = await safeFetchText(url, { fetchImpl: deps.fetchImpl, resolveImpl: deps.resolveImpl, maxBytes: 64 * 1024, allowedContentTypes: undefined })
  if (result.ok) return { ok: true, status: result.status }
  // For likely-media providers, a byte-range/HTML block is not proof of failure.
  if (provider === 'youtube' || provider === 'vimeo' || provider === 'loom' || provider === 'figma') {
    return { ok: (result as Extract<SafeFetchResult, { ok: false }>).kind !== 'unavailable' }
  }
  return { ok: false }
}

/** Stable fingerprint over the submitted artifact identities and rubric version. */
export function computeEvidenceFingerprint(artifacts: SubmittedArtifact[], rubricVersion: string): string {
  const material = artifacts
    .filter((a) => a && a.url)
    .map((a) => `${a.kind}:${a.url.trim().toLowerCase()}`)
    .sort()
    .join('|')
  const combined = `${material}|${rubricVersion}`
  let hash = 0
  for (let i = 0; i < combined.length; i += 1) {
    hash = (hash * 31 + combined.charCodeAt(i)) | 0
  }
  return `ev${(hash >>> 0).toString(36)}`
}
