import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { buildGuidedPath } from '@/lib/guided-path'
import { buildAIWorldClassPath } from '@/lib/ai-guided-path'
import { hasTrackAccess } from '@/lib/access'

export const dynamic = 'force-dynamic'

const AI_GUIDED_PATH_VERSION = 4

function getSteps(trackId: string) {
  return trackId.startsWith('ai-') ? buildAIWorldClassPath(trackId) : buildGuidedPath(trackId)
}

function getQuizPassRequirement(trackId: string, questionCount: number) {
  const threshold = trackId.startsWith('ai-') ? 0.8 : 1
  return Math.ceil(questionCount * threshold)
}

async function migrateAIEnrollmentIfNeeded(userId: string, trackId: string, steps: ReturnType<typeof getSteps>) {
  let enrollment = await prisma.guidedPathEnrollment.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
  if (!enrollment) {
    enrollment = await prisma.guidedPathEnrollment.create({ data: { userId, trackId } })
  }

  if (!trackId.startsWith('ai-')) return enrollment

  const trackProgress = await prisma.userTrackProgress.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
  const storedData = trackProgress?.data && typeof trackProgress.data === 'object' && !Array.isArray(trackProgress.data)
    ? trackProgress.data as Record<string, unknown>
    : {}

  if (storedData.aiGuidedPathVersion === AI_GUIDED_PATH_VERSION) return enrollment

  // The Phase 4 path changes the number and meaning of indices, so an old
  // currentStepIndex cannot be translated safely. Preserve historical progress
  // records, but restart an incomplete AI path at Learn. A previously completed
  // course remains completed and is left at the end of the new path.
  const completion = await prisma.courseCompletion.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
  const nextIndex = completion ? steps.length : 0

  enrollment = await prisma.guidedPathEnrollment.update({
    where: { userId_trackId: { userId, trackId } },
    data: { currentStepIndex: nextIndex },
  })

  await prisma.userTrackProgress.upsert({
    where: { userId_trackId: { userId, trackId } },
    create: {
      userId,
      trackId,
      data: { aiGuidedPathVersion: AI_GUIDED_PATH_VERSION },
    },
    update: {
      data: { ...storedData, aiGuidedPathVersion: AI_GUIDED_PATH_VERSION },
    },
  })

  return enrollment
}

export async function GET(_req: Request, { params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  if (!(await hasTrackAccess(session.user.id, params.trackId))) return NextResponse.json({ error: 'Course access required' }, { status: 403 })

  const steps = getSteps(params.trackId)
  const enrollment = await migrateAIEnrollmentIfNeeded(session.user.id, params.trackId, steps)
  return NextResponse.json({ steps, currentStepIndex: Math.min(enrollment.currentStepIndex, steps.length) })
}

export async function POST(req: Request, { params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  if (!(await hasTrackAccess(session.user.id, params.trackId))) return NextResponse.json({ error: 'Course access required' }, { status: 403 })

  const body = await req.json().catch(() => null)
  const stepIndex = typeof body?.stepIndex === 'number' ? body.stepIndex : -1
  if (stepIndex < 0) return NextResponse.json({ error: 'Invalid stepIndex' }, { status: 400 })

  const steps = getSteps(params.trackId)
  if (stepIndex >= steps.length) return NextResponse.json({ error: 'Step index out of range' }, { status: 400 })

  const enrollment = await migrateAIEnrollmentIfNeeded(session.user.id, params.trackId, steps)

  if (stepIndex !== enrollment.currentStepIndex) {
    return NextResponse.json({ error: 'Complete the currently unlocked step before continuing.' }, { status: 409 })
  }

  const completedStep = steps[stepIndex]
  if (!completedStep) return NextResponse.json({ error: 'Step not found' }, { status: 404 })

  if (completedStep.type === 'quiz') {
    const submittedAnswers = body?.answers
    const quizQuestions = completedStep.quizQuestions ?? []
    if (!Array.isArray(submittedAnswers) || submittedAnswers.length !== quizQuestions.length) {
      return NextResponse.json({ error: 'Answer every question before continuing.' }, { status: 400 })
    }

    const correctCount = quizQuestions.reduce((count, question, questionIndex) => {
      const answer = submittedAnswers[questionIndex]
      return count + (typeof answer === 'number' && answer === question.correctIndex ? 1 : 0)
    }, 0)
    const requiredCorrect = getQuizPassRequirement(params.trackId, quizQuestions.length)
    const passed = correctCount >= requiredCorrect

    if (!passed) {
      const score = quizQuestions.length ? Math.round((correctCount / quizQuestions.length) * 100) : 0
      return NextResponse.json({
        error: `Mastery check not passed. You scored ${score}%. You need at least ${Math.round((requiredCorrect / quizQuestions.length) * 100)}%. Review the explanations and try again.`,
        score,
        requiredCorrect,
        totalQuestions: quizQuestions.length,
      }, { status: 422 })
    }
  }

  const updatedEnrollment = await prisma.guidedPathEnrollment.update({
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

  return NextResponse.json({ currentStepIndex: updatedEnrollment.currentStepIndex })
}
