import type { Track } from './tracks'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS } from './ai-curriculum'

/**
 * Returns a Track-shaped object using the existing data model, with the
 * curated Phase 3A AI resources/projects appended. Non-AI tracks are returned
 * unchanged. This keeps the public track model and existing UI intact.
 */
export function getAIEnrichedTrack(track: Track): Track {
  const resources = AI_RESOURCE_EXTENSIONS[track.id]
  const projects = AI_PROJECT_EXTENSIONS[track.id]
  if (!resources && !projects) return track

  return {
    ...track,
    resources: resources ? [...track.resources, ...resources] : track.resources,
    projects: projects ? [...track.projects, ...projects] : track.projects,
  }
}
