import type { Track } from './tracks'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS } from './ai-curriculum'

/** Returns the existing Track shape with curated Phase 3 AI resources/projects appended. */
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
