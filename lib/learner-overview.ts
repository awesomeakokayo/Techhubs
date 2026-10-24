import type { PrismaClient } from '@prisma/client'
import { getTrackById } from './tracks'
import { buildGuidedPath } from './guided-path'
import { buildAIWorldClassPath } from './ai-guided-path'
import { deriveGuidedPathProgress } from './learning-progress'

/** The ordered guided steps for a track (AI tracks use the world-class path). */
export function getTrackSteps(trackId: string) {
  return trackId.startsWith('ai-') ? buildAIWorldClassPath(trackId) : buildGuidedPath(trackId)
}

export interface GuidedPathSummary {
  trackId: string
  name: string
  slug: string
  icon: string
  colorHex: string
  category: string
  completedSteps: number
  totalSteps: number
  percent: number
  isComplete: boolean
  nextStepTitle: string | null
  lastActivityAt: Date
}

/**
 * Authoritative guided-path summaries for a learner, derived from enrollment and
 * completion records (never from checklist state).
 */
export async function getGuidedPathSummaries(
  prisma: PrismaClient,
  userId: string,
): Promise<GuidedPathSummary[]> {
  const [enrollments, completions] = await Promise.all([
    prisma.guidedPathEnrollment.findMany({ where: { userId }, orderBy: { lastActivityAt: 'desc' } }),
    prisma.courseCompletion.findMany({ where: { userId }, select: { trackId: true } }),
  ])

  const completedTrackIds = new Set(completions.map((item) => item.trackId))

  return enrollments
    .map((enrollment): GuidedPathSummary | null => {
      const track = getTrackById(enrollment.trackId)
      if (!track) return null
      const steps = getTrackSteps(enrollment.trackId)
      if (steps.length === 0) return null
      const progress = deriveGuidedPathProgress(enrollment, steps.length)
      const nextStep = progress.nextStepIndex != null ? steps[progress.nextStepIndex] : undefined
      return {
        trackId: track.id,
        name: track.name,
        slug: track.slug,
        icon: track.icon,
        colorHex: track.colorHex,
        category: track.category,
        completedSteps: progress.completedSteps,
        totalSteps: progress.totalSteps,
        percent: progress.percent,
        isComplete: progress.isComplete || completedTrackIds.has(track.id),
        nextStepTitle: nextStep?.title ?? null,
        lastActivityAt: enrollment.lastActivityAt,
      }
    })
    .filter((item): item is GuidedPathSummary => item !== null)
}
