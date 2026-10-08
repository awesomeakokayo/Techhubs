import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { isLearnerExperienceLevel, isWeeklyHours } from '@/lib/learner-profile'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const profile = await prisma.learnerProfile.findUnique({
    where: { userId: session.user.id },
  })

  return NextResponse.json({ profile })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const primaryGoal = typeof body?.primaryGoal === 'string' ? body.primaryGoal.trim() : ''
  const experienceLevel = body?.experienceLevel
  const weeklyHours = body?.weeklyHours
  const recommendedTrackId = typeof body?.recommendedTrackId === 'string' ? body.recommendedTrackId.trim() : ''

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
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      primaryGoal,
      experienceLevel,
      weeklyHours,
      recommendedTrackId,
      onboardingCompleted: true,
    },
    update: {
      primaryGoal,
      experienceLevel,
      weeklyHours,
      recommendedTrackId,
      onboardingCompleted: true,
    },
  })

  return NextResponse.json({ profile })
}
