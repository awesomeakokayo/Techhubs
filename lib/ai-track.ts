import type { Track } from './tracks'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS } from './ai-curriculum'
import { getVerifiedAIResource } from './ai-resource-audit'

/** Returns the existing Track shape with curated, verified Phase 3 AI resources/projects appended. */
export function getAIEnrichedTrack(track: Track): Track {
  const resources = AI_RESOURCE_EXTENSIONS[track.id]
  const projects = AI_PROJECT_EXTENSIONS[track.id]
  if (!resources && !projects) return track

  const auditedResources = (resources ?? [])
    .map((resource) => {
      const audit = getVerifiedAIResource(resource.id)
      if (!audit) return resource
      return {
        ...resource,
        url: audit.verifiedUrl,
        source: audit.provider,
        free: audit.free,
      }
    })
    // Non-free/plan-dependent material is kept out of the main AI learning
    // resource list. Learners can still use equivalent free/local tooling.
    .filter((resource) => {
      const audit = getVerifiedAIResource(resource.id)
      return !audit || (audit.free && audit.includeInGuidedPath)
    })

  return {
    ...track,
    resources: resources ? [...track.resources, ...auditedResources] : track.resources,
    projects: projects ? [...track.projects, ...projects] : track.projects,
  }
}
