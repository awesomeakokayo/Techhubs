import type { Resource } from './tracks'
import { TRACKS } from './tracks'
import { RESOURCE_STAGE_MAP } from './guided-path'
import { AI_RESOURCE_EXTENSIONS, AI_RESOURCE_STAGE_MAP } from './ai-curriculum'
import { AI_RESOURCE_REGISTRY } from './ai-resource-registry'
import { AI_INSTRUCTIONAL_GAP_RESOURCES } from './ai-instructional-gap-resources'
import { AI_STAGE_RESOURCES, AI_STAGE_RESOURCE_MAP } from './ai-stage-resources'
import { getExtendedStageResourcesForStage } from './curriculum-extended-resources'
import {
  classifyResource,
  getAuthoredVerification,
  type ResourceProbeResult,
  type ResourceVerification,
} from './resource-verification'
import { getStageResourcePolicy } from './curriculum-package/resource-gate'
import { getPackageSelectedResource } from './curriculum-package/resources.generated'

/**
 * Package resources are staged separately and must never become required based
 * on archive evidence. Callers that display external links can use this policy
 * to distinguish a current check from archive/provisional evidence.
 */
export { getStageResourcePolicy }

/**
 * Single source of truth for "which learning resources are mapped to this
 * stage". Both the served learner path and the curriculum-quality audit resolve
 * resources through this module, so the machine-readable report, the
 * human-readable report and what a learner actually receives cannot drift.
 *
 * Sources (in resolution order, de-duplicated by URL):
 *   1. extended researched resources (curriculum-extended-resources.ts)
 *   2. base catalogue resources      (tracks.ts + RESOURCE_STAGE_MAP)
 *   3. AI resource extensions        (ai-curriculum.ts)
 *   4. researched AI stage resources (ai-stage-resources.ts)
 *   5. AI instructional-gap resources (ai-instructional-gap-resources.ts)
 *   6. AI resource registry          (ai-resource-registry.ts)
 */

export type StageResourceSource =
  | 'package'
  | 'extended'
  | 'base'
  | 'ai-extension'
  | 'ai-research'
  | 'ai-gap'
  | 'ai-registry'

export interface ResolvedStageResource {
  resource: Resource
  source: StageResourceSource
  verification: ResourceVerification | null
}

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    parsed.hash = ''
    return parsed.toString().replace(/\/$/, '')
  } catch {
    return url.trim()
  }
}

function registryEntryToResource(entry: (typeof AI_RESOURCE_REGISTRY)[string]): Resource {
  const type = entry.type === 'course' ? 'docs' : entry.type
  return {
    id: entry.id,
    title: `${entry.provider} — ${entry.competency.split('.')[0]}`,
    description: entry.competency,
    url: entry.url,
    type: type as Resource['type'],
    free: entry.free,
    source: entry.provider,
  }
}

/** Every resource mapped to a stage, from all sources, de-duplicated by URL. */
export function resolveStageResources(trackId: string, stageId: number): ResolvedStageResource[] {
  const track = TRACKS.find((t) => t.id === trackId)
  const resolved: ResolvedStageResource[] = []
  const seen = new Set<string>()

  const push = (
    resource: Resource,
    source: StageResourceSource,
    verification: ResourceVerification | null = getAuthoredVerification(resource.id),
  ) => {
    if (!resource?.url) return
    const key = normalizeUrl(resource.url)
    if (seen.has(key)) return
    seen.add(key)
    resolved.push({ resource, source, verification })
  }

  // 1. Extended researched resources, placed first so a learner reads the
  //    content-verified primary text before any supplementary video.
  for (const resource of getExtendedStageResourcesForStage(trackId, stageId)) push(resource, 'extended')

  // 2. Base catalogue resources.
  const baseMap = RESOURCE_STAGE_MAP[trackId] ?? {}
  for (const resource of track?.resources ?? []) {
    if (baseMap[resource.id] === stageId) push(resource, 'base')
  }

  // 3. AI resource extensions.
  const aiExtMap = AI_RESOURCE_STAGE_MAP[trackId] ?? {}
  for (const resource of AI_RESOURCE_EXTENSIONS[trackId] ?? []) {
    if (aiExtMap[resource.id] === stageId) push(resource, 'ai-extension')
  }

  // 4. Researched AI stage resources.
  const aiResearchMap = AI_STAGE_RESOURCE_MAP[trackId] ?? {}
  for (const resource of AI_STAGE_RESOURCES[trackId] ?? []) {
    if (aiResearchMap[resource.id] === stageId) push(resource, 'ai-research')
  }

  // 5. AI instructional-gap resources.
  for (const resource of AI_INSTRUCTIONAL_GAP_RESOURCES[trackId] ?? []) {
    if (resource.id.endsWith(`-${stageId}`)) push(resource, 'ai-gap')
  }

  // 6. AI resource registry.
  for (const entry of Object.values(AI_RESOURCE_REGISTRY)) {
    if (entry.trackId === trackId && entry.stage === stageId) push(registryEntryToResource(entry), 'ai-registry')
  }

  // 7. Freshly checked package selection. If the exact URL is already mapped,
  //    keep the stable runtime resource id but attach the fresh verification.
  //    Otherwise add the selected resource at the front.
  const packageSelected = getPackageSelectedResource(trackId, stageId)
  if (packageSelected) {
    const existing = resolved.find(
      (entry) => normalizeUrl(entry.resource.url) === normalizeUrl(packageSelected.url),
    )
    if (existing) {
      existing.verification = packageSelected.verification
    } else {
      resolved.unshift({
        resource: {
          id: packageSelected.id,
          title: packageSelected.title,
          description: packageSelected.description,
          url: packageSelected.url,
          type: packageSelected.type,
          free: packageSelected.free,
          source: packageSelected.source,
        },
        source: 'package',
        verification: packageSelected.verification,
      })
    }
  }

  return resolved
}

/**
 * Classify every mapped resource on a stage using authored records and an
 * optional URL probe map. Returns the resolved resources with a concrete
 * verification level.
 */
export function resolveStageResourceVerification(
  trackId: string,
  stageId: number,
  probes: Record<string, ResourceProbeResult> = {},
): ResolvedStageResource[] {
  return resolveStageResources(trackId, stageId).map((entry) => ({
    ...entry,
    verification:
      entry.source === 'package'
        ? entry.verification
        : classifyResource(entry.resource.id, entry.resource.url, probes[normalizeUrl(entry.resource.url)] ?? null),
  }))
}

export { normalizeUrl }
