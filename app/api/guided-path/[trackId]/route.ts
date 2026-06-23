import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { buildGuidedPath } from '@/lib/guided-path'

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

  const { stepIndex } = await req.json()

  const enrollment = await prisma.guidedPathEnrollment.update({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
    data: { currentStepIndex: stepIndex + 1 },
  })

  const steps = buildGuidedPath(params.trackId)
  const completedStep = steps[stepIndex]

  if (completedStep) {
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

  return NextResponse.json({ currentStepIndex: enrollment.currentStepIndex })
}
