import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { isLearnerExperienceLevel, isWeeklyHours } from '@/lib/learner-profile'
import {
  DEFAULT_LEARNER_TIME_ZONE,
  DEFAULT_PLANNED_STUDY_DAYS,
  isDailyGoalSteps,
  isPlannedStudyDays,
  isValidTimeZone,
} from '@/lib/learning-rhythm'

export const dynamic = 'force-dynamic'

async function authenticatedUserId() {
  const session = await auth()
  return session?.user?.id ?? null
}

export async function GET() {
  const userId = await authenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const profile = await prisma.learnerProfile.findUnique({ where: { userId } })
  return NextResponse.json({ profile })
}

export async function POST(req: Request) {
  const userId = await authenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const primaryGoal = typeof body?.primaryGoal === 'string' ? body.primaryGoal.trim() : ''
  const experienceLevel = body?.experienceLevel
  const weeklyHours = body?.weeklyHours
  const recommendedTrackId = typeof body?.recommendedTrackId === 'string' ? body.recommendedTrackId.trim() : ''
  const timeZone = isValidTimeZone(body?.timeZone) ? body.timeZone : undefined

  if (!primaryGoal || primaryGoal.length > 120) {
    return NextResponse.json({ error: 'A valid primary goal is required.' }, { status: 400 })
  }
  if (!isLearnerExperienceLevel(experienceLevel)) {
    return NextResponse.json({ error: 'A valid experience level is required.' }, { status: 400 })
  }
  if (!isWeeklyHours(weeklyHours)) {
    return NextResponse.json({ error: 'A valid weekly learning pace is required.' }, { status: 400 })
  }
  if (!getTrackById(recommendedTrackId)) {
    return NextResponse.json({ error: 'A valid recommended learning path is required.' }, { status: 400 })
  }

  const profile = await prisma.learnerProfile.upsert({
    where: { userId },
    create: {
      userId,
      primaryGoal,
      experienceLevel,
      weeklyHours,
      recommendedTrackId,
      onboardingCompleted: true,
      timeZone: timeZone ?? DEFAULT_LEARNER_TIME_ZONE,
    },
    update: {
      primaryGoal,
      experienceLevel,
      weeklyHours,
      recommendedTrackId,
      onboardingCompleted: true,
      ...(timeZone ? { timeZone } : {}),
    },
  })

  return NextResponse.json({ profile })
}

export async function PATCH(req: Request) {
  const userId = await authenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const dailyGoalSteps = body?.dailyGoalSteps
  const timeZone = body?.timeZone
  const plannedStudyDays = body?.plannedStudyDays

  if (dailyGoalSteps === undefined && timeZone === undefined && plannedStudyDays === undefined) {
    return NextResponse.json(
      { error: 'Provide a daily goal, time zone, or weekly study schedule.' },
      { status: 400 },
    )
  }
  if (dailyGoalSteps !== undefined && !isDailyGoalSteps(dailyGoalSteps)) {
    return NextResponse.json({ error: 'Daily activity goal must be 1, 2, or 3.' }, { status: 400 })
  }
  if (timeZone !== undefined && !isValidTimeZone(timeZone)) {
    return NextResponse.json({ error: 'Provide a valid time zone.' }, { status: 400 })
  }
  if (plannedStudyDays !== undefined && !isPlannedStudyDays(plannedStudyDays)) {
    return NextResponse.json(
      { error: 'Choose between one and seven unique days for your weekly plan.' },
      { status: 400 },
    )
  }

  const profile = await prisma.learnerProfile.upsert({
    where: { userId },
    create: {
      userId,
      dailyGoalSteps: isDailyGoalSteps(dailyGoalSteps) ? dailyGoalSteps : 1,
      timeZone: isValidTimeZone(timeZone) ? timeZone : DEFAULT_LEARNER_TIME_ZONE,
      plannedStudyDays: isPlannedStudyDays(plannedStudyDays) ? plannedStudyDays : [...DEFAULT_PLANNED_STUDY_DAYS],
    },
    update: {
      ...(isDailyGoalSteps(dailyGoalSteps) ? { dailyGoalSteps } : {}),
      ...(isValidTimeZone(timeZone) ? { timeZone } : {}),
      ...(isPlannedStudyDays(plannedStudyDays) ? { plannedStudyDays } : {}),
    },
  })

  return NextResponse.json({ profile })
}
