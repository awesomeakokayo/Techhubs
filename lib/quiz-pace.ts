/**
 * Server-side pace estimates for the path-finder quiz.
 *
 * The quiz shows an approximate "weeks at your pace" figure per recommended
 * track. That figure depends on the number of guided-path steps, which is
 * derived from authored curriculum (stage plans, knowledge checks, projects).
 *
 * It was previously computed in the client component with `buildGuidedPath`,
 * which pulled `lib/guided-path` (and therefore `lib/curriculum`, including
 * every knowledge-check answer and rationale) into the browser bundle. This
 * helper computes the same numbers on the server so the quiz can receive a
 * small, answer-free map as a prop.
 */

import { TRACKS } from './tracks'
import { buildGuidedPath } from './guided-path'

/**
 * Approximate learning hours per track id, matching the previous client-side
 * estimate: (number of non-checkpoint steps) × 0.75 hours.
 */
export function approxLearningHoursByTrack(): Record<string, number> {
  const hours: Record<string, number> = {}
  for (const track of TRACKS) {
    const steps = buildGuidedPath(track.id)
    const counted = steps.filter((step) => step.type !== 'checkpoint').length
    hours[track.id] = counted * 0.75
  }
  return hours
}
