export const LEARNING_EVENT_NAMES = [
  'signup_completed',
  'onboarding_completed',
  'path_recommended',
  'path_started',
  'learning_step_started',
  'learning_step_completed',
  'quiz_attempted',
  'quiz_passed',
  'quiz_failed',
  'project_started',
  'project_completed',
  'project_assessed',
  'project_assessment_failed',
  'assessment_credit_used',
  'ai_assessment_started',
  'ai_assessment_completed',
  'free_ai_quota_exhausted',
  'pro_upgrade_viewed',
  'pro_upgrade_clicked',
  'paid_access_expired',
  'subscription_started',
  'subscription_renewed',
  'subscription_cancelled',
  'milestone_reached',
  'course_completed',
  'session_returned',
  'notification_sent',
  'notification_clicked',
  'resource_opened',
  'resource_failed',
] as const

export type LearningEventName = (typeof LEARNING_EVENT_NAMES)[number]

export const CLIENT_RECORDABLE_EVENTS: readonly LearningEventName[] = [
  'learning_step_started',
  'session_returned',
  'resource_opened',
  'resource_failed',
  'project_started',
] as const

export function isClientRecordableEvent(value: unknown): value is LearningEventName {
  return isLearningEventName(value) && CLIENT_RECORDABLE_EVENTS.includes(value as LearningEventName)
}

export interface LearningEventPayload {
  userId: string
  eventName: LearningEventName
  trackId?: string | null
  stepId?: string | null
  metadata?: Record<string, unknown> | null
}

export function isLearningEventName(value: unknown): value is LearningEventName {
  return typeof value === 'string' && LEARNING_EVENT_NAMES.includes(value as LearningEventName)
}

export function isLearningEventPayload(value: unknown): value is LearningEventPayload {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  if (typeof record.userId !== 'string' || record.userId.length < 1) return false
  if (!isLearningEventName(record.eventName)) return false
  if (record.trackId !== undefined && record.trackId !== null && typeof record.trackId !== 'string') return false
  if (record.stepId !== undefined && record.stepId !== null && typeof record.stepId !== 'string') return false
  if (
    record.metadata !== undefined &&
    record.metadata !== null &&
    (typeof record.metadata !== 'object' || Array.isArray(record.metadata))
  ) {
    return false
  }
  return true
}

export function sanitizeLearningEventPayload(input: Record<string, unknown>): LearningEventPayload {
  const trackId = typeof input.trackId === 'string' && input.trackId.length > 0 ? input.trackId : null
  const stepId = typeof input.stepId === 'string' && input.stepId.length > 0 ? input.stepId : null
  const metadata =
    input.metadata !== undefined &&
    input.metadata !== null &&
    typeof input.metadata === 'object' &&
    !Array.isArray(input.metadata)
      ? (input.metadata as Record<string, unknown>)
      : null

  return {
    userId: String(input.userId),
    eventName: input.eventName as LearningEventName,
    trackId,
    stepId,
    metadata,
  }
}
