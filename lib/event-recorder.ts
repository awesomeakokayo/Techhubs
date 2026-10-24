import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { LearningEventName } from '@/lib/learning-events'

export interface LearningEventInput {
  userId: string
  eventName: LearningEventName
  trackId?: string | null
  stepId?: string | null
  metadata?: Record<string, unknown> | null
}

export async function recordLearningEvent(input: LearningEventInput) {
  try {
    await prisma.learningEvent.create({
      data: {
        userId: input.userId,
        eventName: input.eventName,
        trackId: input.trackId ?? null,
        stepId: input.stepId ?? null,
        metadata: (input.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    })
  } catch {
    // Best-effort: event logging must never break the core learning flow.
  }
}

export async function recordOnboardingEvents(userId: string, recommendedTrackId: string) {
  await recordLearningEvent({ userId, eventName: 'onboarding_completed' })
  await recordLearningEvent({
    userId,
    eventName: 'path_recommended',
    trackId: recommendedTrackId,
  })
}
