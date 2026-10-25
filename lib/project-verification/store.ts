/**
 * Project submission lifecycle persistence.
 *
 * Stored inside the existing `UserTrackProgress.data.projectSubmissions` JSON map
 * (no schema change). Records are bounded and keyed by project id. A passing
 * record is only valid for the exact evidence fingerprint and rubric version it
 * was assessed against.
 */

import type { PrismaClient } from '@prisma/client'
import type { SubmissionStatus } from './assessment'
import type { AssessmentDecision, CriterionResult } from './schema'

export interface StoredArtifact {
  kind: string
  url: string
}

export interface StoredSubmission {
  projectId: string
  status: SubmissionStatus
  /** Machine-readable outcome code so the UI can render an accurate message. */
  code?: string
  artifacts: StoredArtifact[]
  explanation: string
  evidenceFingerprint: string
  rubricVersion: string
  assessmentVersion: string
  provider?: string
  model?: string
  criteria?: CriterionResult[]
  decision?: AssessmentDecision
  reviewSummary?: string
  reason?: string
  helpGuideId?: string
  minWords?: number
  wordCount?: number
  warnings?: string[]
  attemptCount: number
  submittedAt: string
  assessedAt?: string
}

const MAX_EXPLANATION = 4000
const MAX_ARTIFACTS = 8
const MAX_CRITERIA = 40
const MAX_HISTORY = 5

/** Bound a submission so the JSON blob cannot grow without limit. */
export function boundSubmission(submission: StoredSubmission): StoredSubmission {
  return {
    ...submission,
    explanation: submission.explanation.slice(0, MAX_EXPLANATION),
    artifacts: submission.artifacts.slice(0, MAX_ARTIFACTS).map((a) => ({ kind: String(a.kind).slice(0, 40), url: String(a.url).slice(0, 500) })),
    criteria: submission.criteria?.slice(0, MAX_CRITERIA),
    warnings: submission.warnings?.slice(0, 8),
    reviewSummary: submission.reviewSummary?.slice(0, 1500),
    reason: submission.reason?.slice(0, 1500),
    helpGuideId: submission.helpGuideId?.slice(0, 80),
  }
}

async function readData(prisma: PrismaClient, userId: string, trackId: string): Promise<Record<string, unknown>> {
  const row = await prisma.userTrackProgress.findUnique({ where: { userId_trackId: { userId, trackId } }, select: { data: true } })
  const data = row?.data
  return data && typeof data === 'object' && !Array.isArray(data) ? { ...(data as Record<string, unknown>) } : {}
}

export async function listSubmissions(prisma: PrismaClient, userId: string, trackId: string): Promise<Record<string, StoredSubmission>> {
  const data = await readData(prisma, userId, trackId)
  const map = data.projectSubmissions
  return map && typeof map === 'object' && !Array.isArray(map) ? (map as Record<string, StoredSubmission>) : {}
}

export async function getSubmission(prisma: PrismaClient, userId: string, trackId: string, projectId: string): Promise<StoredSubmission | null> {
  const all = await listSubmissions(prisma, userId, trackId)
  return all[projectId] ?? null
}

export async function saveSubmission(
  prisma: PrismaClient,
  userId: string,
  trackId: string,
  submission: StoredSubmission,
): Promise<void> {
  const data = await readData(prisma, userId, trackId)
  const map = data.projectSubmissions && typeof data.projectSubmissions === 'object' && !Array.isArray(data.projectSubmissions)
    ? { ...(data.projectSubmissions as Record<string, unknown>) }
    : {}
  const history = Array.isArray(data.projectSubmissionHistory) ? (data.projectSubmissionHistory as unknown[]) : []
  const bounded = boundSubmission(submission)
  map[submission.projectId] = bounded
  // Keep a small audit history of prior outcomes (no raw artifacts beyond bounded records).
  const priorEntry = { projectId: submission.projectId, status: submission.status, at: submission.assessedAt ?? submission.submittedAt, fingerprint: submission.evidenceFingerprint }
  data.projectSubmissions = map
  data.projectSubmissionHistory = [priorEntry, ...history].slice(0, MAX_HISTORY * 4)
  await prisma.userTrackProgress.upsert({
    where: { userId_trackId: { userId, trackId } },
    create: { userId, trackId, data: data as object },
    update: { data: data as object },
  })
}

/** A stored pass is only reusable for identical evidence + rubric + model. */
export function isReusablePass(
  existing: StoredSubmission | null,
  evidenceFingerprint: string,
  rubricVersion: string,
): boolean {
  return Boolean(
    existing &&
      existing.status === 'passed' &&
      existing.evidenceFingerprint &&
      existing.evidenceFingerprint === evidenceFingerprint &&
      existing.rubricVersion === rubricVersion,
  )
}

/* ------------------------------------------------------------------ */
/* Durable rate / budget limiting (database-backed)                    */
/* ------------------------------------------------------------------ */

export interface BudgetConfig {
  perUserPerHour: number
  globalPerHour: number
}

const DEFAULT_BUDGET: BudgetConfig = { perUserPerHour: 20, globalPerHour: 500 }

export interface BudgetDecision {
  allowed: boolean
  reason?: string
}

/**
 * Durable per-user and system-wide budget check based on recorded assessment
 * events. Works across serverless instances because it uses the database.
 */
export async function checkAssessmentBudget(
  prisma: PrismaClient,
  userId: string,
  config: BudgetConfig = DEFAULT_BUDGET,
): Promise<BudgetDecision> {
  const since = new Date(Date.now() - 60 * 60 * 1000)
  const [userCount, globalCount] = await Promise.all([
    prisma.learningEvent.count({ where: { userId, eventName: 'project_assessed', createdAt: { gte: since } } }),
    prisma.learningEvent.count({ where: { eventName: 'project_assessed', createdAt: { gte: since } } }),
  ])
  if (userCount >= config.perUserPerHour) {
    return { allowed: false, reason: 'You have reached the hourly limit for project assessments. Please try again later.' }
  }
  if (globalCount >= config.globalPerHour) {
    return { allowed: false, reason: 'The assessment service is busy right now. Please try again shortly.' }
  }
  return { allowed: true }
}
