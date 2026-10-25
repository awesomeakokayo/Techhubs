/**
 * Quiz-result → learner-profile synchronization.
 *
 * Pure mapping/decision helpers plus a database service. Newer valid server-side
 * preferences are preserved: an incoming quiz result older than the server
 * record is treated as stale and does not overwrite it.
 */

import type { PrismaClient } from '@prisma/client'
import { isLearnerExperienceLevel, isWeeklyHours, type LearnerExperienceLevel } from './learner-profile'
import { DEFAULT_LEARNER_TIME_ZONE } from './learning-rhythm'

export interface LocalQuizResult {
  completed?: boolean
  recommendations?: string[]
  level?: string
  time?: string
  weeklyHours?: number
  goal?: string
  updatedAt?: string
}

export interface LearnerProfilePayload {
  primaryGoal: string
  experienceLevel: LearnerExperienceLevel
  weeklyHours: number
  recommendedTrackId: string
  timeZone?: string
  clientUpdatedAt?: string
}

const MAX_GOAL_LENGTH = 120

/** Map a stored local quiz result to a validated profile payload (or null). */
export function buildLearnerProfilePayload(quiz: LocalQuizResult | null | undefined): LearnerProfilePayload | null {
  if (!quiz || quiz.completed !== true) return null

  const goal = typeof quiz.goal === 'string' ? quiz.goal.trim() : ''
  if (!goal || goal.length > MAX_GOAL_LENGTH) return null
  if (!isLearnerExperienceLevel(quiz.level)) return null
  if (!isWeeklyHours(quiz.weeklyHours)) return null

  const recommendedTrackId =
    Array.isArray(quiz.recommendations) && typeof quiz.recommendations[0] === 'string'
      ? quiz.recommendations[0].trim()
      : ''
  if (!recommendedTrackId) return null

  return {
    primaryGoal: goal,
    experienceLevel: quiz.level,
    weeklyHours: quiz.weeklyHours,
    recommendedTrackId,
    clientUpdatedAt: typeof quiz.updatedAt === 'string' ? quiz.updatedAt : undefined,
  }
}

export type ProfileUpdateDecision = 'create' | 'update' | 'stale'

/** Decide whether an incoming result should create, update, or be rejected as stale. */
export function decideProfileUpdate(
  existingUpdatedAt: Date | string | null | undefined,
  clientUpdatedAt?: string | null,
): ProfileUpdateDecision {
  if (!existingUpdatedAt) return 'create'
  if (!clientUpdatedAt) return 'update'
  const serverTime = new Date(existingUpdatedAt).getTime()
  const clientTime = new Date(clientUpdatedAt).getTime()
  if (Number.isFinite(serverTime) && Number.isFinite(clientTime) && clientTime < serverTime) return 'stale'
  return 'update'
}

export interface ProfileSyncResult {
  decision: ProfileUpdateDecision
  profile: unknown
}

/** Persist a validated quiz/profile payload, preserving newer server preferences. */
export async function syncLearnerProfile(
  prisma: PrismaClient,
  userId: string,
  payload: LearnerProfilePayload,
): Promise<ProfileSyncResult> {
  const existing = await prisma.learnerProfile.findUnique({
    where: { userId },
    select: { updatedAt: true },
  })
  const decision = decideProfileUpdate(existing?.updatedAt ?? null, payload.clientUpdatedAt)

  if (decision === 'stale') {
    const profile = await prisma.learnerProfile.findUnique({ where: { userId } })
    return { decision, profile }
  }

  const profile = await prisma.learnerProfile.upsert({
    where: { userId },
    create: {
      userId,
      primaryGoal: payload.primaryGoal,
      experienceLevel: payload.experienceLevel,
      weeklyHours: payload.weeklyHours,
      recommendedTrackId: payload.recommendedTrackId,
      onboardingCompleted: true,
      timeZone: payload.timeZone ?? DEFAULT_LEARNER_TIME_ZONE,
    },
    update: {
      primaryGoal: payload.primaryGoal,
      experienceLevel: payload.experienceLevel,
      weeklyHours: payload.weeklyHours,
      recommendedTrackId: payload.recommendedTrackId,
      onboardingCompleted: true,
      ...(payload.timeZone ? { timeZone: payload.timeZone } : {}),
    },
  })
  return { decision, profile }
}
