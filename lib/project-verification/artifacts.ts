import { isArtifactKind, type ArtifactKind } from './contract'
import type { SubmittedArtifact } from './evidence'

/**
 * Strict client-artifact parsing. This runs before credit reservation, provider
 * calls, or persistence, so malformed payloads cannot be silently dropped or
 * partially assessed.
 */
export const MAX_ARTIFACTS = 8

export type ParsedArtifacts =
  | { ok: true; artifacts: SubmittedArtifact[] }
  | { ok: false; error: string; code: string; kind?: string }

export function parseArtifacts(raw: unknown): ParsedArtifacts {
  if (raw === undefined || raw === null) return { ok: true, artifacts: [] }
  if (!Array.isArray(raw)) {
    return { ok: false, error: 'Artifacts must be a list of evidence links.', code: 'ARTIFACTS_INVALID' }
  }
  if (raw.length > MAX_ARTIFACTS) {
    return { ok: false, error: `Submit at most ${MAX_ARTIFACTS} evidence links.`, code: 'TOO_MANY_ARTIFACTS' }
  }

  const artifacts: SubmittedArtifact[] = []
  const seen = new Set<string>()
  for (const item of raw) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: 'Each artifact must include a supported kind and a URL.', code: 'ARTIFACT_INVALID' }
    }
    const record = item as { kind?: unknown; url?: unknown }
    if (!isArtifactKind(record.kind)) {
      return {
        ok: false,
        error: `Unsupported artifact kind${typeof record.kind === 'string' ? `: ${record.kind}` : ''}.`,
        code: 'ARTIFACT_KIND_UNSUPPORTED',
        kind: typeof record.kind === 'string' ? record.kind : undefined,
      }
    }
    const url = typeof record.url === 'string' ? record.url.trim() : ''
    if (!url) {
      return { ok: false, error: 'Every artifact needs a non-empty URL.', code: 'ARTIFACT_URL_REQUIRED' }
    }
    if (seen.has(record.kind)) {
      return { ok: false, error: `Only one link may be submitted for ${record.kind}.`, code: 'ARTIFACT_DUPLICATE_KIND' }
    }
    seen.add(record.kind)
    artifacts.push({ kind: record.kind, url })
  }
  return { ok: true, artifacts }
}

export function artifactKindSet(requirements: { kind: ArtifactKind; alternatives?: { kind: ArtifactKind }[] }[]): Set<ArtifactKind> {
  const set = new Set<ArtifactKind>()
  for (const requirement of requirements) {
    set.add(requirement.kind)
    for (const alternative of requirement.alternatives ?? []) set.add(alternative.kind)
  }
  return set
}

export function missingRequiredArtifacts(
  contract: { requiredArtifacts: { kind: ArtifactKind; alternatives?: { kind: ArtifactKind }[] }[] },
  artifacts: SubmittedArtifact[],
): { kind: ArtifactKind; alternatives?: { kind: ArtifactKind }[] }[] {
  const kinds = new Set(artifacts.map((artifact) => artifact.kind))
  return contract.requiredArtifacts.filter((requirement) => {
    if (kinds.has(requirement.kind)) return false
    return !(requirement.alternatives ?? []).some((alternative) => kinds.has(alternative.kind))
  })
}
