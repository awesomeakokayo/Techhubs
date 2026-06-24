import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { buildGuidedPath } from '@/lib/guided-path'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: { trackId: string } }
) {
  const session = await auth()
  if (!session?.user?.id || !session.user.isSubscribed) {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
  }

  const steps = buildGuidedPath(params.trackId)

  let enrollment = await prisma.guidedPathEnrollment.findUnique({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
  })

  if (!enrollment) {
    enrollment = await prisma.guidedPathEnrollment.create({
      data: { userId: session.user.id, trackId: params.trackId },
    })
  }

  return NextResponse.json({
    steps,
    currentStepIndex: enrollment.currentStepIndex,
  })
}

export async function POST(
  req: Request,
  { params }: { params: { trackId: string } }
) {
  const session = await auth()
  if (!session?.user?.id || !session.user.isSubscribed) {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
  }

  const body = await req.json()
  const stepIndex = typeof body?.stepIndex === 'number' ? body.stepIndex : -1
  if (stepIndex < 0) {
    return NextResponse.json({ error: 'Invalid stepIndex' }, { status: 400 })
  }

  const steps = buildGuidedPath(params.trackId)
  if (stepIndex >= steps.length) {
    return NextResponse.json({ error: 'Step index out of range' }, { status: 400 })
  }

  // Ensure enrollment exists before updating
  let enrollment = await prisma.guidedPathEnrollment.findUnique({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
  })
  if (!enrollment) {
    enrollment = await prisma.guidedPathEnrollment.create({
      data: { userId: session.user.id, trackId: params.trackId },
    })
  }

  enrollment = await prisma.guidedPathEnrollment.update({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
    data: { currentStepIndex: stepIndex + 1 },
  })

  const completedStep = steps[stepIndex]

  if (completedStep) {
    const existing = await prisma.userProgress.findFirst({
      where: {
        userId: session.user.id,
        trackId: params.trackId,
        itemType: completedStep.type === 'project' ? 'project' : 'stage',
        stageId: completedStep.stageId ?? undefined,
        resourceId: completedStep.resourceId || completedStep.projectId || undefined,
      },
    })
    if (!existing) {
      await prisma.userProgress.create({
        data: {
          userId: session.user.id,
          trackId: params.trackId,
          itemType: completedStep.type === 'project' ? 'project' : 'stage',
          stageId: completedStep.stageId,
          resourceId: completedStep.resourceId || completedStep.projectId,
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      })
    }
  }

  return NextResponse.json({ currentStepIndex: enrollment.currentStepIndex })
}
