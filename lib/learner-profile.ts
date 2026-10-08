export const LEARNER_EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type LearnerExperienceLevel = (typeof LEARNER_EXPERIENCE_LEVELS)[number]

export const LEARNER_WEEKLY_HOURS = [2, 5, 10, 18] as const

export interface LearnerProfilePayload {
  primaryGoal: string
  experienceLevel: LearnerExperienceLevel
  weeklyHours: number
  recommendedTrackId: string
}

export const PROFILE_GOAL_LABELS: Record<string, string> = {
  'Get a job at a tech company': 'Get a job at a tech company',
  'Build my own products': 'Build my own products',
  'Freelance and work independently': 'Freelance and work independently',
  'Understand tech enough to lead': 'Understand tech enough to lead',
}

export function isLearnerExperienceLevel(value: unknown): value is LearnerExperienceLevel {
  return typeof value === 'string' && LEARNER_EXPERIENCE_LEVELS.includes(value as LearnerExperienceLevel)
}

export function isWeeklyHours(value: unknown): value is number {
  return typeof value === 'number' && LEARNER_WEEKLY_HOURS.includes(value as (typeof LEARNER_WEEKLY_HOURS)[number])
}
