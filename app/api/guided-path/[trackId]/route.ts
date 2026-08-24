import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { buildGuidedPath } from '@/lib/guided-path'
import { buildAIWorldClassPath } from '@/lib/ai-guided-path'
import { hasTrackAccess } from '@/lib/access'

export const dynamic = 'force-dynamic'

function getSteps(trackId: string) {
  return trackId.startsWith('ai-') ? buildAIWorldClassPath(trackId) : buildGuidedPath(trackId)
}

export async function GET(
  _req: Request,
  { params }: { params: { trackId: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const allowed = await hasTrackAccess(session.user.id, params.trackId)
  if (!allowed) {
    return NextResponse.json({ error: 'Course access required' }, { status: 403 })
  }

  const steps = getSteps(params.trackId)

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
    currentStepIndex: Math.min(enrollment.currentStepIndex, steps.length),
  })
}

export async function POST(
  req: Request,
  { params }: { params: { trackId: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const allowed = await hasTrackAccess(session.user.id, params.trackId)
  if (!allowed) {
    return NextResponse.json({ error: 'Course access required' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  const stepIndex = typeof body?.stepIndex === 'number' ? body.stepIndex : -1

  if (stepIndex < 0) {
    return NextResponse.json({ error: 'Invalid stepIndex' }, { status: 400 })
  }

  const steps = getSteps(params.trackId)
  if (stepIndex >= steps.length) {
    return NextResponse.json({ error: 'Step index out of range' }, { status: 400 })
  }

  let enrollment = await prisma.guidedPathEnrollment.findUnique({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
  })
  if (!enrollment) {
    enrollment = await prisma.guidedPathEnrollment.create({
      data: { userId: session.user.id, trackId: params.trackId },
    })
  }

  // Guided paths are sequential. The server is authoritative about what is
  // currently unlockable, preventing clients from skipping ahead by calling
  // the endpoint directly.
  if (stepIndex !== enrollment.currentStepIndex) {
    return NextResponse.json(
      { error: 'Complete the currently unlocked step before continuing.' },
      { status: 409 }
    )
  }

  const completedStep = steps[stepIndex]
  if (!completedStep) {
    return NextResponse.json({ error: 'Step not found' }, { status: 404 })
  }

  enrollment = await prisma.guidedPathEnrollment.update({
    where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
    data: { currentStepIndex: stepIndex + 1 },
  })

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

  if (stepIndex === steps.length - 1) {
    await prisma.courseCompletion.upsert({
      where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
      create: { userId: session.user.id, trackId: params.trackId, completedAt: new Date() },
      update: { completedAt: new Date() },
    })
  }

  return NextResponse.json({ currentStepIndex: enrollment.currentStepIndex })
}
