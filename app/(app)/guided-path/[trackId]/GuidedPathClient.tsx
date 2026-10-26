'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  AlertTriangle, ArrowRight, BookOpen, BookOpenCheck, CheckCircle2, ChevronLeft, ExternalLink,
  FileText, GraduationCap, Info, Lightbulb, Loader2, Lock, RotateCcw, Trophy, Users, Wrench, Youtube, X,
} from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getTrackIcon } from '@/lib/icons'
import { trackEvent } from '@/lib/analytics'
import type { PublicGuidedStep, PublicSubmissionState } from '@/lib/guided-path'
import type { LearningMilestone } from '@/lib/learning-rhythm'
import type { PortfolioReadiness } from '@/lib/learning-progress'

export interface TrackMeta {
  id: string
  name: string
  slug: string
  icon: string
  colorHex: string
  category: string
  stages: { id: number; title: string }[]
}

interface QuizFeedback {
  attemptId: string
  passed: boolean
  score: number
  requiredCorrect: number
  totalQuestions: number
  criticalMissed?: boolean
  reviewNotes?: string[]
  results: { questionId: string; selectedIndex: number; correct: boolean; objective?: string; explanation?: string }[]
}

/** Per-submission idempotency key. A retry reuses it; a fresh attempt gets a new one. */
function newAttemptId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
}

/** Present when this load remapped an older path version onto the new one. */
interface PathUpdateNotice {
  fromVersion: number
  toVersion: number
  strategy: string
  message: string
}

function getYouTubeId(url?: string) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1).split('?')[0] || null
    if (parsed.hostname.includes('youtube.com')) return parsed.searchParams.get('v')
  } catch { return null }
  return null
}

const resourceTypeMeta: Record<string, { icon: typeof BookOpen; label: string }> = {
  video: { icon: Youtube, label: 'Video' },
  docs: { icon: FileText, label: 'Guide' },
  practice: { icon: BookOpenCheck, label: 'Practice' },
  tool: { icon: Wrench, label: 'Tool' },
  community: { icon: Users, label: 'Community' },
  book: { icon: BookOpen, label: 'Book' },
}

const STEP_META: Record<string, { label: string; color: string }> = {
  concept: { label: 'Stage overview', color: 'var(--accent-tertiary)' },
  resource: { label: 'Resource', color: 'var(--accent-primary)' },
  practice: { label: 'Practice', color: 'var(--color-success)' },
  quiz: { label: 'Knowledge check', color: 'var(--accent-secondary)' },
  project: { label: 'Project', color: 'var(--color-success)' },
  checkpoint: { label: 'Checkpoint', color: 'var(--color-info)' },
  milestone: { label: 'Milestone', color: 'var(--color-info)' },
}

function stepMeta(step: PublicGuidedStep) {
  if (step.type === 'resource' && step.resourceType === 'practice') return STEP_META.practice
  return STEP_META[step.type] ?? STEP_META.resource
}

/**
 * LessonContent — renders structured lesson text with real hierarchy.
 *
 * Guided-path lesson bodies use blank-line-separated blocks whose first line is
 * often an ALL-CAPS heading (LEARNING OBJECTIVE, COMMON MISTAKES, DELIVERABLES…).
 * This preserves that structure (headings + bullets + paragraphs) instead of
 * collapsing it into one run-on paragraph.
 */
function LessonContent({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
        if (!lines.length) return null

        const first = lines[0]
        const isHeading = /^[A-Z0-9][A-Z0-9 ,'’&/-]*$/.test(first) && first.length <= 52 && !/^[•\-*]/.test(first)
        const heading = isHeading ? first : null
        const body = isHeading ? lines.slice(1) : lines

        const nodes: React.ReactNode[] = []
        let bullets: string[] = []
        const flushBullets = (key: string) => {
          if (!bullets.length) return
          nodes.push(
            <ul key={'ul-' + key} className="mt-3 space-y-2">
              {bullets.map((bullet, i) => (
                <li key={bullet + i} className="flex gap-2.5 text-[0.95rem] leading-7 text-text-secondary">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-grape" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>,
          )
          bullets = []
        }
        body.forEach((line, lineIndex) => {
          const match = line.match(/^[•\-*]\s*(.+)$/)
          if (match) {
            bullets.push(match[1])
          } else {
            flushBullets(`${blockIndex}-${lineIndex}`)
            nodes.push(
              <p key={`p-${blockIndex}-${lineIndex}`} className="text-[0.95rem] leading-7 text-text-secondary">
                {line}
              </p>,
            )
          }
        })
        flushBullets(`${blockIndex}-end`)

        return (
          <div key={blockIndex} className={blockIndex === 0 && !heading ? '' : 'mt-6'}>
            {heading && (
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">
                {heading}
              </h2>
            )}
            <div className={heading ? 'mt-2' : undefined}>{nodes}</div>
          </div>
        )
      })}
    </>
  )
}

function LessonSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12" aria-hidden>
      <div className="h-4 w-40 animate-pulse rounded bg-elevated" />
      <div className="mt-6 h-2 w-full animate-pulse rounded-full bg-elevated" />
      <div className="mt-8 space-y-3">
        <div className="h-5 w-24 animate-pulse rounded bg-elevated" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-elevated" />
        <div className="h-4 w-full animate-pulse rounded bg-elevated" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-elevated" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-elevated" />
      </div>
    </div>
  )
}

interface OutcomeMeta {
  heading: string
  tone: string
  serviceFailure: boolean
}

/**
 * Map a machine-readable assessment code to a distinct heading, tone and whether
 * the failure is the service's (never the project's). This lets the UI render an
 * accurate, actionable message instead of guessing from free text.
 */
const CODE_OUTCOME: Record<string, OutcomeMeta> = {
  passed: { heading: 'Assessment passed', tone: 'var(--color-success)', serviceFailure: false },
  changes_required: { heading: 'Changes required', tone: 'var(--color-warning)', serviceFailure: false },
  artifact_unrelated: { heading: 'This does not appear to match this assignment', tone: 'var(--color-warning)', serviceFailure: false },
  invalid_project_url: { heading: 'Your project link needs fixing', tone: 'var(--color-error)', serviceFailure: false },
  missing_artifact: { heading: 'Add your project link', tone: 'var(--color-warning)', serviceFailure: false },
  repository_inaccessible: { heading: 'We could not access this repository', tone: 'var(--color-warning)', serviceFailure: false },
  artifact_unavailable: { heading: 'We could not retrieve this artifact', tone: 'var(--color-warning)', serviceFailure: true },
  artifact_empty: { heading: 'No project files were found', tone: 'var(--color-warning)', serviceFailure: false },
  secret_detected: { heading: 'Remove the committed secret, then resubmit', tone: 'var(--color-error)', serviceFailure: false },
  explanation_too_short: { heading: 'Your explanation is too short', tone: 'var(--color-warning)', serviceFailure: false },
  limited_inspection: { heading: 'Some parts could not be verified automatically', tone: 'var(--color-warning)', serviceFailure: false },
  evidence_insufficient: { heading: 'We need more evidence to assess this', tone: 'var(--color-warning)', serviceFailure: false },
  assessment_invalid_response: { heading: 'Assessment could not be completed', tone: 'var(--color-warning)', serviceFailure: true },
  assessment_service_unavailable: { heading: 'Assessment service is unavailable', tone: 'var(--color-warning)', serviceFailure: true },
  assessment_rate_limited: { heading: 'Assessment is temporarily rate-limited', tone: 'var(--color-warning)', serviceFailure: true },
  assessment_timeout: { heading: 'Assessment timed out', tone: 'var(--color-warning)', serviceFailure: true },
  assessment_not_configured: { heading: 'Assessment is not configured', tone: 'var(--color-warning)', serviceFailure: true },
  in_progress: { heading: 'Assessing your submission…', tone: 'var(--color-info)', serviceFailure: false },
}

function outcomeFor(state: PublicSubmissionState): OutcomeMeta {
  return (
    CODE_OUTCOME[state.code ?? state.status] ?? {
      heading: 'Assessment result',
      tone: 'var(--text-primary)',
      serviceFailure: state.status === 'service_unavailable',
    }
  )
}

function HelpLink({ id, label }: { id?: string; label?: string }) {
  if (!id) return null
  return (
    <a
      href={`/submit-help/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-grape underline underline-offset-2"
    >
      {label ?? 'How to submit this'} <ExternalLink size={11} aria-hidden />
    </a>
  )
}

function ProjectSubmissionPanel({
  step, submissionState, assessing, onAssess,
}: {
  step: PublicGuidedStep
  submissionState: PublicSubmissionState | null
  assessing: boolean
  onAssess: (payload: { artifacts: { kind: string; url: string }[]; explanation: string; acknowledged: boolean }) => void
}) {
  const contract = step.submissionContract
  const [artifactUrls, setArtifactUrls] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {}
    for (const artifact of submissionState?.artifacts ?? []) seed[artifact.kind] = artifact.url
    return seed
  })
  const [explanation, setExplanation] = useState(submissionState?.explanation ?? '')
  const [acknowledged, setAcknowledged] = useState(false)
  const [localError, setLocalError] = useState('')

  const rubricLabels = new Map((contract?.rubric ?? []).map((c) => [c.id, c.label]))
  const requiredKinds = contract?.requiredArtifacts ?? []
  const missingRequired = requiredKinds.filter((artifact) => !(artifactUrls[artifact.kind] ?? '').trim())
  const explanationWords = explanation.trim().split(/\s+/).filter(Boolean).length
  const minWords = contract?.writtenExplanation.minWords ?? 50
  const canSubmit = missingRequired.length === 0 && explanationWords >= minWords && acknowledged && !assessing

  const submit = () => {
    if (!canSubmit) {
      setLocalError(
        missingRequired.length
          ? `Add the required ${missingRequired.length === 1 ? 'deliverable' : 'deliverables'}: ${missingRequired.map((a) => a.label).join(', ')}.`
          : explanationWords < minWords
            ? `Your explanation needs at least ${minWords} words (you have ${explanationWords}).`
            : 'Confirm that the work is your own before submitting.',
      )
      return
    }
    setLocalError('')
    const artifacts = requiredKinds
      .map((artifact) => ({ kind: artifact.kind, url: (artifactUrls[artifact.kind] ?? '').trim() }))
      .filter((artifact) => artifact.url)
      .concat(
        (contract?.optionalArtifacts ?? [])
          .map((artifact) => ({ kind: artifact.kind, url: (artifactUrls[artifact.kind] ?? '').trim() }))
          .filter((artifact) => artifact.url),
      )
    onAssess({ artifacts, explanation, acknowledged })
  }

  const status = submissionState?.status
  const passed = status === 'passed'

  return (
    <div className="mt-6 rounded-lg bg-elevated p-4 sm:p-5">
      <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">
        {step.isPortfolio ? 'Portfolio project' : 'Project standard'}
      </h2>
      <p className="mt-2 text-[0.95rem] leading-7 text-text-secondary">
        <Lightbulb size={13} className="mr-1 inline text-[var(--color-warning)]" aria-hidden />
        Build from the requirements. Do not copy a tutorial step-for-step. Produce an artifact you can explain and improve.
      </p>
      {step.techTags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {step.techTags.map((tag) => (
            <span key={tag} className="rounded-md bg-grape/10 px-2 py-1 text-xs text-grape">{tag}</span>
          ))}
        </div>
      ) : null}

      {contract ? (
        <div className="mt-5 border-t border-border-subtle pt-5">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">What you must submit</h3>
          <ul className="mt-3 space-y-3">
            {contract.requiredArtifacts.map((artifact) => (
              <li key={artifact.kind} className="text-sm leading-6 text-text-secondary">
                <span className="font-medium text-text-primary">{artifact.label}.</span> {artifact.description}
                {artifact.example ? <span className="ml-1 text-xs text-text-muted">e.g. {artifact.example}</span> : null}
                <span className="ml-1"> <HelpLink id={artifact.helpGuideId} /></span>
                {artifact.alternatives?.length ? (
                  <span className="mt-0.5 block text-xs text-text-muted">
                    Alternative: {artifact.alternatives.map((alt) => alt.label).join(', ')}
                    {artifact.alternatives[0]?.helpGuideId ? <> <HelpLink id={artifact.alternatives[0].helpGuideId} label="Guide" /></> : null}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          {contract.acceptanceCriteria.length ? (
            <>
              <h3 className="mt-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">Your submission will be assessed on</h3>
              <ul className="mt-3 space-y-2">
                {contract.acceptanceCriteria.map((criterion) => (
                  <li key={criterion} className="flex gap-2.5 text-sm leading-6 text-text-secondary">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grape" aria-hidden />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-5 space-y-4">
            {contract.requiredArtifacts.map((artifact) => (
              <div key={artifact.kind}>
                <label className="block text-sm font-medium text-text-primary" htmlFor={`artifact-${step.index}-${artifact.kind}`}>
                  {artifact.label} <span className="text-[var(--color-error)]">*</span>
                </label>
                <input
                  id={`artifact-${step.index}-${artifact.kind}`}
                  type="url"
                  inputMode="url"
                  value={artifactUrls[artifact.kind] ?? ''}
                  onChange={(event) => setArtifactUrls((previous) => ({ ...previous, [artifact.kind]: event.target.value }))}
                  placeholder={artifact.example ?? 'https://…'}
                  className="mt-1.5 w-full rounded-md border border-border-default bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-grape"
                />
              </div>
            ))}

            {contract.optionalArtifacts.length ? (
              <details className="text-sm">
                <summary className="cursor-pointer text-text-secondary">Optional supporting evidence</summary>
                <div className="mt-3 space-y-4">
                  {contract.optionalArtifacts.map((artifact) => (
                    <div key={artifact.kind}>
                      <label className="block text-sm font-medium text-text-primary" htmlFor={`artifact-opt-${step.index}-${artifact.kind}`}>
                        {artifact.label} <span className="text-text-muted">(optional)</span>
                      </label>
                      <input
                        id={`artifact-opt-${step.index}-${artifact.kind}`}
                        type="url"
                        inputMode="url"
                        value={artifactUrls[artifact.kind] ?? ''}
                        onChange={(event) => setArtifactUrls((previous) => ({ ...previous, [artifact.kind]: event.target.value }))}
                        placeholder="https://…"
                        className="mt-1.5 w-full rounded-md border border-border-default bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-grape"
                      />
                    </div>
                  ))}
                </div>
              </details>
            ) : null}

            <div>
              <label className="block text-sm font-medium text-text-primary" htmlFor={`explanation-${step.index}`}>
                Explain your work <span className="text-[var(--color-error)]">*</span>
              </label>
              <ul className="mt-1.5 space-y-1 text-xs text-text-muted">
                {contract.writtenExplanation.prompts.map((prompt) => <li key={prompt}>• {prompt}</li>)}
              </ul>
              <textarea
                id={`explanation-${step.index}`}
                value={explanation}
                onChange={(event) => setExplanation(event.target.value)}
                rows={5}
                className="mt-2 w-full rounded-md border border-border-default bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-grape"
              />
              <p className="mt-1 text-xs text-text-muted">{explanationWords} / {minWords} words minimum</p>
            </div>

            <label className="flex items-start gap-2 text-sm text-text-secondary">
              <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1" />
              <span>This is my own work and the links point to my deliverables. I understand that public artifacts can be viewed by others, and that I must not commit secrets.</span>
            </label>

            {localError ? <p className="text-xs text-[var(--color-error)]">{localError}</p> : null}

            <button type="button" className="btn btn-primary inline-flex items-center gap-2" onClick={submit} disabled={assessing}>
              {assessing ? <Loader2 size={14} className="animate-spin" aria-hidden /> : <CheckCircle2 size={14} aria-hidden />}
              {assessing ? 'Assessing…' : submissionState && !passed ? 'Re-submit for assessment' : 'Submit for assessment'}
            </button>
            <p className="text-xs leading-6 text-text-muted">
              This is an automated assessment. It is not human or expert review and does not guarantee employment.
            </p>
          </div>

          {submissionState ? (
            (() => {
              const outcome = outcomeFor(submissionState)
              return (
                <div className="mt-5 rounded-lg border border-border-default p-4" style={{ borderColor: outcome.tone }}>
                  <p className="text-sm font-semibold" style={{ color: outcome.tone }}>
                    {outcome.heading}
                    {submissionState.status === 'passed' && typeof submissionState.decision?.score === 'number'
                      ? ` · ${Math.round(submissionState.decision.score * 100)}%`
                      : ''}
                  </p>

                  {outcome.serviceFailure ? (
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      Your submission was saved and your project has <span className="font-medium">not</span> been marked as
                      failed. Please try again in a few minutes.
                    </p>
                  ) : null}
                  {submissionState.status === 'passed' ? (
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      All required criteria were met. You can continue to the next step.
                    </p>
                  ) : null}

                  {submissionState.reviewSummary ? <p className="mt-2 text-sm leading-6 text-text-secondary">{submissionState.reviewSummary}</p> : null}
                  {submissionState.reason ? <p className="mt-2 text-sm leading-6 text-text-secondary">{submissionState.reason}</p> : null}
                  {submissionState.code === 'explanation_too_short' && typeof submissionState.minWords === 'number' ? (
                    <p className="mt-2 text-xs text-text-muted">
                      Minimum: {submissionState.minWords} words · You entered: {submissionState.wordCount ?? 0} words.
                    </p>
                  ) : null}
                  {submissionState.helpGuideId ? <p className="mt-2"><HelpLink id={submissionState.helpGuideId} label="Open the relevant guide" /></p> : null}

                  {submissionState.criteria?.length ? (
                    <ul className="mt-3 space-y-2">
                      {submissionState.criteria.map((criterion) => (
                        <li key={criterion.criterionId} className="text-sm leading-6">
                          <span className="font-medium text-text-primary">{rubricLabels.get(criterion.criterionId) ?? criterion.criterionId}:</span>{' '}
                          <span style={{ color: criterion.status === 'met' ? 'var(--color-success)' : criterion.status === 'partially_met' ? 'var(--color-warning)' : 'var(--color-error)' }}>
                            {criterion.status.replace(/_/g, ' ')}
                          </span>
                          <span className="block text-text-secondary">{criterion.feedback}</span>
                          {criterion.evidence ? <span className="block text-xs text-text-muted">Evidence inspected: {criterion.evidence}</span> : null}
                          {criterion.suggestedFix ? <span className="block text-xs text-text-muted">Fix: {criterion.suggestedFix}</span> : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {submissionState.warnings?.length ? (
                    <ul className="mt-3 space-y-1">
                      {submissionState.warnings.map((warning) => (
                        <li key={warning} className="text-xs leading-6 text-[var(--color-warning)]">{warning}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )
            })()
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function GuidedPathClient({ trackId, trackMeta }: { trackId: string; trackMeta: TrackMeta | null }) {
  const router = useRouter()
  const { update } = useSession()
  const [steps, setSteps] = useState<PublicGuidedStep[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedIndices, setCompletedIndices] = useState<number[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null)
  const [quizAttemptId, setQuizAttemptId] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const savedTimer = useRef<number | null>(null)
  const [error, setError] = useState('')
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null)
  const [quotaTier, setQuotaTier] = useState<string | null>(null)
  const [showQuotaUpgrade, setShowQuotaUpgrade] = useState(false)
  const [milestones, setMilestones] = useState<LearningMilestone[]>([])
  const [readiness, setReadiness] = useState<PortfolioReadiness | null>(null)
  const [projectSubmission, setProjectSubmission] = useState<PublicSubmissionState | null>(null)
  const [assessing, setAssessing] = useState(false)
  const [pathUpdate, setPathUpdate] = useState<PathUpdateNotice | null>(null)

  function dismissPathUpdate() {
    setPathUpdate(null)
    // Persist the dismissal so it does not reappear; failure is harmless because
    // the notice only explains an already-applied, non-destructive change.
    void fetch(`/api/guided-path/${trackId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acknowledgePathUpdate: true }),
    }).catch(() => {})
  }

  useEffect(() => {
    let cancelled = false
    fetch('/api/billing/entitlements').then(async (response) => {
      if (!response.ok) return null
      return response.json()
    }).then((data) => {
      if (cancelled || !data?.assessments) return
      const remaining = data.assessments.remaining
      const tier = data.tier
      if (typeof remaining === 'number') setQuotaRemaining(remaining)
      if (typeof tier === 'string') setQuotaTier(tier)
      if (tier === 'FREE' && remaining === 0) {
        setShowQuotaUpgrade(true)
        trackEvent({ event_name: 'pro_upgrade_viewed', path: `/guided-path/${trackId}`, content_type: 'free_ai_quota_exhausted' })
      }
    }).catch(() => {
      // Quota status is supplemental; assessment authorization remains server-side.
    })

    fetch(`/api/guided-path/${trackId}`).then(async (response) => {
      if (response.status === 401) { router.push(`/login?next=/guided-path/${trackId}`); return null }
      if (response.status === 403) throw new Error('You do not have access to this learning path.')
      if (!response.ok) throw new Error('Failed to load your guided path.')
      return response.json()
    }).then((data) => {
      if (!data || cancelled) return
      setSteps(data.steps)
      setCurrentIndex(data.currentStepIndex)
      setCompletedIndices(Array.from({ length: data.currentStepIndex }, (_, i) => i))
      setReadiness(data.readiness ?? null)
      setPathUpdate(data.pathUpdate ?? null)
      setLoading(false)
      update()
    }).catch((err) => {
      if (!cancelled) { setError(err instanceof Error ? err.message : 'Failed to load your guided path.'); setLoading(false) }
    })
    return () => { cancelled = true }
  }, [router, trackId, update])

  const currentStep = steps[currentIndex]
  const track = trackMeta
  const progress = steps.length ? Math.round((currentIndex / steps.length) * 100) : 0
  const stage = currentStep ? track?.stages.find((item) => item.id === currentStep.stageId) : undefined
  const submissionState = projectSubmission ?? (currentStep?.type === 'project' ? currentStep.submission ?? null : null)

  const quizResult = useMemo(() => {
    if (!feedback) return { correctCount: 0, total: 0, score: 0, requiredCorrect: 0, passed: false, results: [] as QuizFeedback['results'], reviewNotes: [] as string[] }
    const correctCount = feedback.results.filter((result) => result.correct).length
    return {
      correctCount,
      total: feedback.totalQuestions,
      score: feedback.score,
      requiredCorrect: feedback.requiredCorrect,
      passed: feedback.passed,
      results: feedback.results,
      reviewNotes: feedback.reviewNotes ?? [],
    }
  }, [feedback])

  async function submitQuiz() {
    if (checking || !currentStep || currentStep.type !== 'quiz') return
    setError('')
    setChecking(true)
    const attemptId = quizAttemptId ?? newAttemptId()
    setQuizAttemptId(attemptId)
    try {
      const submittedAnswers = currentStep.quizQuestions?.map((question, index) => ({
        questionId: question.id ?? `q-${currentStep.stageId}-${index + 1}`,
        selectedIndex: answers[`${currentStep.index}-${index}`],
      })) ?? []
      const response = await fetch(`/api/guided-path/${trackId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepIndex: currentStep.index, answers: submittedAnswers, attemptId, validateOnly: true }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || !data?.results) {
        setError(data?.error || 'Your answers could not be checked. Please try again.')
        return
      }
      setFeedback({
        attemptId: data.attemptId ?? attemptId,
        passed: Boolean(data.passed),
        score: Number(data.score) || 0,
        requiredCorrect: Number(data.requiredCorrect) || 0,
        totalQuestions: Number(data.totalQuestions) || submittedAnswers.length,
        criticalMissed: Boolean(data.criticalMissed),
        reviewNotes: Array.isArray(data.reviewNotes) ? data.reviewNotes : [],
        results: data.results,
      })
      setSubmitted(true)
    } finally {
      setChecking(false)
    }
  }

  async function submitProject(payload: { artifacts: { kind: string; url: string }[]; explanation: string; acknowledged: boolean }) {
    if (assessing || !currentStep || currentStep.type !== 'project') return
    setError('')
    setAssessing(true)
    try {
      const response = await fetch(`/api/project-verification/${trackId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepIndex: currentStep.index, ...payload }),
      })
      const data = await response.json().catch(() => null)
      if (data?.assessmentUsage) {
        setQuotaRemaining(typeof data.assessmentUsage.remaining === 'number' ? data.assessmentUsage.remaining : null)
        setQuotaTier(typeof data.assessmentUsage.tier === 'string' ? data.assessmentUsage.tier : null)
      }
      if (data?.status === 'allowance_exhausted') {
        const tier = typeof data.tier === 'string' ? data.tier : 'FREE'
        setQuotaRemaining(0)
        setQuotaTier(tier)
        if (tier === 'FREE') {
          setShowQuotaUpgrade(true)
          trackEvent({ event_name: 'pro_upgrade_viewed', path: `/guided-path/${trackId}`, content_type: 'free_ai_quota_exhausted' })
        }
        setError(data?.error || "You've used your free AI assessments. Explore Pro plans or continue learning for free.")
        return
      }
      if (!data?.status) {
        setError(data?.error || 'Your submission could not be assessed. Please try again.')
        return
      }
      if (
        data?.assessmentUsage?.tier === 'FREE' &&
        data?.assessmentUsage?.remaining === 0
      ) {
        setShowQuotaUpgrade(true)
        trackEvent({ event_name: 'pro_upgrade_viewed', path: `/guided-path/${trackId}`, content_type: 'free_ai_quota_exhausted' })
      }
      setProjectSubmission({
        status: data.status,
        reviewSummary: data.reviewSummary ?? null,
        criteria: data.criteria ?? null,
        decision: data.decision ?? null,
        warnings: data.warnings ?? [],
        reason: data.reason ?? data.error ?? null,
        helpGuideId: data.helpGuideId ?? null,
        evidenceFingerprint: data.evidenceFingerprint ?? null,
        attemptCount: (submissionState?.attemptCount ?? 0) + 1,
        artifacts: payload.artifacts,
        explanation: payload.explanation,
      })
      if (data.status === 'service_unavailable') {
        setError(data.reason || data.error || 'The assessment service is unavailable. Your work was saved — please try again.')
      }
    } catch {
      setError('Your submission could not be assessed. Your work is still in the form — please try again.')
    } finally {
      setAssessing(false)
    }
  }

  function applyConfirmedProgress(stepIndex: number, data: { currentStepIndex?: number; milestones?: LearningMilestone[]; readiness?: PortfolioReadiness }) {
    setCompletedIndices((previous) => (previous.includes(stepIndex) ? previous : [...previous, stepIndex]))
    setCurrentIndex(typeof data.currentStepIndex === 'number' ? data.currentStepIndex : stepIndex + 1)
    setMilestones(Array.isArray(data.milestones) ? data.milestones : [])
    if (data.readiness) setReadiness(data.readiness)
    setAnswers({})
    setSubmitted(false)
    setFeedback(null)
    setQuizAttemptId(null)
    setProjectSubmission(null)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function flashSaved() {
    setSaveState('saved')
    if (typeof window !== 'undefined') {
      if (savedTimer.current) window.clearTimeout(savedTimer.current)
      savedTimer.current = window.setTimeout(() => setSaveState('idle'), 1500)
    }
  }

  /**
   * The response was lost or ambiguous. Reconcile against the authoritative
   * server state: if the server already advanced past this step, treat it as
   * saved (the compare-and-swap prevents any duplicate advance); otherwise ask
   * the learner to retry.
   */
  async function reconcileProgress(stepIndex: number): Promise<boolean> {
    setSaveState('saving')
    try {
      const response = await fetch(`/api/guided-path/${trackId}`, { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json().catch(() => null)
        if (data && typeof data.currentStepIndex === 'number' && data.currentStepIndex > stepIndex) {
          applyConfirmedProgress(stepIndex, data)
          setError('')
          flashSaved()
          return true
        }
      }
    } catch {
      /* fall through to the retry message */
    }
    setError('We could not confirm that your progress was saved. Please retry — your work is still here.')
    setSaveState('error')
    return false
  }

  async function completeStep(stepIndex: number) {
    if (saving) return false
    setError('')
    setSaving(true)
    setSaveState('saving')
    try {
      const step = steps[stepIndex]
      const payload: { stepIndex: number; answers?: unknown[]; attemptId?: string } = { stepIndex }
      if (step?.type === 'quiz') {
        payload.attemptId = quizAttemptId ?? newAttemptId()
        setQuizAttemptId(payload.attemptId)
        payload.answers = step.quizQuestions?.map((question, index) => ({
          questionId: question.id ?? `q-${step.stageId}-${index + 1}`,
          selectedIndex: answers[`${step.index}-${index}`],
        })) ?? []
      }

      let response: Response
      try {
        response = await fetch(`/api/guided-path/${trackId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } catch {
        // Network error or lost response: verify against the server before claiming anything.
        return reconcileProgress(stepIndex)
      }

      // 409 means the step was already advanced (e.g. a retried request whose
      // first attempt committed). Reconcile rather than fail.
      if (response.status === 409) return reconcileProgress(stepIndex)

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        setError(data?.error || 'Your progress could not be saved. Check your connection and try again.')
        setSaveState('error')
        return false
      }

      const data = await response.json().catch(() => null)
      if (!data || typeof data.currentStepIndex !== 'number') {
        // Success status but no authoritative state: confirm before advancing.
        return reconcileProgress(stepIndex)
      }

      applyConfirmedProgress(stepIndex, data)
      flashSaved()
      return true
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LessonSkeleton />

  if (error && steps.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-elevated text-[var(--color-error)]">
          <AlertTriangle size={22} aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-xl font-semibold text-text-primary">This path could not be opened.</h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">{error}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/tracks" className="btn btn-primary inline-flex items-center gap-2">Browse paths</Link>
          <Link href="/login" className="btn btn-secondary">Sign in</Link>
        </div>
      </div>
    )
  }

  if (!steps.length) {
    return <div className="mx-auto max-w-md px-6 py-24 text-center text-text-secondary">This learning path has no steps yet.</div>
  }

  if (currentIndex >= steps.length) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <MilestoneCelebration milestones={milestones} onDismiss={() => setMilestones([])} />
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-grape/10 text-grape">
          <Trophy size={30} aria-hidden />
        </div>
        <h1 className="font-display text-4xl text-text-primary">Course complete!</h1>
        <p className="mt-4 text-text-secondary">
          You completed the guided path for {track?.name || trackId}. Your progress is saved to your account.
        </p>
        {readiness && (
          <dl className="mt-6 grid grid-cols-3 gap-3 text-left">
            <div className="rounded-lg border border-border-subtle bg-surface p-3">
              <dt className="text-xs text-text-muted">Knowledge checks passed</dt>
              <dd className="mt-1 font-display text-xl text-text-primary">{readiness.knowledgeChecksPassed}/{readiness.knowledgeChecksTotal}</dd>
            </div>
            <div className="rounded-lg border border-border-subtle bg-surface p-3">
              <dt className="text-xs text-text-muted">Projects with evidence</dt>
              <dd className="mt-1 font-display text-xl text-text-primary">{readiness.projectsSubmitted}/{readiness.projectsTotal}</dd>
            </div>
            <div className="rounded-lg border border-border-subtle bg-surface p-3">
              <dt className="text-xs text-text-muted">Portfolio-grade projects</dt>
              <dd className="mt-1 font-display text-xl text-text-primary">{readiness.portfolioArtifacts}</dd>
            </div>
          </dl>
        )}
        <p className="mt-3 text-xs leading-6 text-text-muted">
          Submitted projects are self-reported and recorded, not independently reviewed by an expert. Keep the artifacts as portfolio evidence.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/certificate/${trackId}`} className="btn btn-primary inline-flex items-center gap-2">
            Get certificate <ArrowRight size={16} />
          </Link>
          <Link href={track ? `/tracks/${track.slug}` : '/tracks'} className="btn btn-secondary">Back to path</Link>
          <Link href="/dashboard" className="btn btn-secondary">Learning home</Link>
        </div>
      </div>
    )
  }

  const TrackIcon = track ? getTrackIcon(track.icon) : null

  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tracks', href: '/tracks' }, { label: track?.name || trackId, href: `/tracks/${track?.slug || trackId}` }, { label: 'Guided path' }]} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Link href={track ? `/tracks/${track.slug}` : '/tracks'} className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary">
          <ChevronLeft size={14} /> Back to {track?.name || 'path'}
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
          <GraduationCap size={13} aria-hidden /> Free · progress saved to your account
        </span>
      </div>

      {/* Path + step context */}
      <div className="mt-6 rounded-xl border border-border-default bg-surface p-4 sm:p-5">
        <div className="flex items-center gap-3">
          {TrackIcon && (
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: (track?.colorHex ?? '#4B4E6D') + '18', color: track?.colorHex ?? '#4B4E6D' }}
            >
              <TrackIcon size={19} aria-hidden />
            </span>
          )}
          <div className="min-w-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">Guided path</p>
            <p className="truncate font-display font-semibold text-text-primary">{track?.name || trackId}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-secondary">
            <span>Step {currentIndex + 1} of {steps.length}</span>
            <span className="text-text-muted" aria-hidden>·</span>
            <span>{progress}% complete</span>
            {stage && (
              <>
                <span className="text-text-muted" aria-hidden>·</span>
                <span className="text-text-muted">Stage {stage.id}: {stage.title}</span>
              </>
            )}
          </p>
        </div>
      </div>

      <MilestoneCelebration milestones={milestones} onDismiss={() => setMilestones([])} />

      {pathUpdate ? (
        <section role="status" className="mt-5 flex items-start gap-3 rounded-xl border border-grape/25 bg-grape/5 p-4 sm:p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-grape/10 text-grape">
            <Info size={19} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape">Course updated</p>
            <p className="mt-1 text-sm leading-6 text-text-secondary">{pathUpdate.message}</p>
          </div>
          <button
            type="button"
            onClick={dismissPathUpdate}
            aria-label="Dismiss course update message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-grape/10 hover:text-text-primary"
          >
            <X size={16} aria-hidden />
          </button>
        </section>
      ) : null}

      <div role="status" aria-live="polite" className="min-h-0">
        {saveState === 'saved' ? (
          <p className="mt-5 flex items-center gap-1.5 text-sm text-[var(--color-success)]">
            <CheckCircle2 size={15} aria-hidden /> Progress saved
          </p>
        ) : null}
        {saveState === 'saving' ? (
          <p className="mt-5 flex items-center gap-1.5 text-sm text-text-muted">
            <Loader2 size={14} className="animate-spin" aria-hidden /> Saving your progress…
          </p>
        ) : null}
      </div>

      {quotaRemaining !== null ? (
        <p className="mt-4 text-xs text-text-muted" role="status" aria-live="polite">
          {quotaTier === 'FREE' ? 'Free AI assessments remaining this month:' : 'AI assessments remaining this month:'}{' '}
          <span className="font-mono font-semibold text-text-primary">{quotaRemaining}</span>
        </p>
      ) : null}

      {showQuotaUpgrade && quotaTier === 'FREE' ? (
        <section className="mt-5 rounded-xl border border-brand/25 bg-brand/[0.04] p-5 md:p-6" aria-labelledby="quota-upgrade-title">
          <p className="section-label">AI assessment allowance</p>
          <h2 id="quota-upgrade-title" className="mt-2 font-display text-xl font-semibold text-text-primary">
            Ready to take the next step?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
            You&apos;ve used your free AI assessments. TechSkillHub Pro provides access to all included premium guided paths and a higher monthly AI assessment allowance.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pricing#pro"
              className="btn btn-primary inline-flex items-center justify-center gap-2"
              onClick={() => trackEvent({ event_name: 'pro_upgrade_clicked', path: `/guided-path/${trackId}`, cta_label: 'Explore Pro plans', cta_href: '/pricing#pro' })}
            >
              Explore Pro plans <ArrowRight size={15} />
            </Link>
            <Link
              href="/tracks"
              className="btn btn-secondary inline-flex items-center justify-center"
              onClick={() => trackEvent({ event_name: 'continue_learning_free', path: `/guided-path/${trackId}`, cta_label: 'Continue learning for free', cta_href: '/tracks' })}
            >
              Continue learning for free
            </Link>
          </div>
        </section>
      ) : null}

      {error && (
        <div role="alert" className="mt-5 flex items-start gap-2 rounded-lg p-3" style={{ border: '1px solid rgba(178, 59, 47, 0.25)', backgroundColor: 'rgba(178, 59, 47, 0.05)' }}>
          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[var(--color-error)]" aria-hidden />
          <p className="text-sm text-[var(--color-error)]">{error}</p>
        </div>
      )}

      <StepCard
        key={currentStep.index}
        step={currentStep}
        trackId={trackId}
        saving={saving}
        saveErrored={saveState === 'error'}
        checking={checking}
        answerMap={answers}
        submitted={submitted}
        quizResult={quizResult}
        assessing={assessing}
        submissionState={submissionState}
        onSelect={(key, value) => setAnswers((previous) => ({ ...previous, [key]: value }))}
        onSubmitQuiz={submitQuiz}
        onRetryQuiz={() => { setAnswers({}); setSubmitted(false); setFeedback(null); setQuizAttemptId(null); setError('') }}
        onAssess={submitProject}
        onComplete={() => completeStep(currentIndex)}
      />

      {steps.length > currentIndex + 1 && (
        <div className="mt-8">
          <p className="section-label">Up next</p>
          <ol className="mt-3 space-y-2">
            {steps.slice(currentIndex + 1, currentIndex + 4).map((step) => (
              <li key={step.index} className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface/60 px-4 py-3">
                <Lock size={15} className="shrink-0 text-text-muted" aria-hidden />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-text-secondary">{step.title}</p>
                  <p className="text-xs text-text-muted">Unlocks when the current step is complete</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {completedIndices.length > 0 && (
        <details className="mt-8 rounded-lg border border-border-subtle px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium text-text-secondary">
            {completedIndices.length} completed {completedIndices.length === 1 ? 'step' : 'steps'}
          </summary>
          <ol className="mt-3 space-y-2">
            {steps.filter((_, index) => completedIndices.includes(index)).map((step) => (
              <li key={step.index} className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 size={14} className="shrink-0 text-[var(--color-success)]" aria-hidden />
                <span className="min-w-0 truncate">{step.title}</span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </main>
  )
}

function MilestoneCelebration({ milestones, onDismiss }: { milestones: LearningMilestone[]; onDismiss: () => void }) {
  if (!milestones.length) return null
  return (
    <section role="status" aria-live="polite" className="mt-5 rounded-xl border border-grape/25 bg-grape/5 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-grape/10 text-grape">
          <Trophy size={19} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grape">Milestone unlocked</p>
          {milestones.map((milestone) => (
            <div key={milestone.code} className="mt-2">
              <h2 className="font-display text-lg font-semibold text-text-primary">{milestone.title}</h2>
              <p className="mt-1 text-sm leading-6 text-text-secondary">{milestone.description}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss milestone message"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-grape/10 hover:text-text-primary"
        >
          <X size={16} aria-hidden />
        </button>
      </div>
    </section>
  )
}

function StepCard({
  step, trackId, saving, saveErrored, checking, answerMap, submitted, quizResult, assessing, submissionState, onSelect, onSubmitQuiz, onRetryQuiz, onAssess, onComplete,
}: {
  step: PublicGuidedStep
  trackId: string
  saving: boolean
  saveErrored: boolean
  checking: boolean
  answerMap: Record<string, number>
  submitted: boolean
  quizResult: { correctCount: number; total: number; score: number; requiredCorrect: number; passed: boolean; results: { questionId: string; selectedIndex: number; correct: boolean; objective?: string; explanation?: string }[]; reviewNotes: string[] }
  assessing: boolean
  submissionState: PublicSubmissionState | null
  onSelect: (key: string, value: number) => void
  onSubmitQuiz: () => void
  onRetryQuiz: () => void
  onAssess: (payload: { artifacts: { kind: string; url: string }[]; explanation: string; acknowledged: boolean }) => void
  onComplete: () => void
}) {
  const meta = stepMeta(step)
  const youtubeId = getYouTubeId(step.resourceUrl)
  const resourceMeta = step.resourceType ? resourceTypeMeta[step.resourceType] : null
  const isAIQuiz = step.type === 'quiz' && trackId.startsWith('ai-')
  const isPractice = step.type === 'practice' || (step.type === 'resource' && step.resourceType === 'practice')

  return (
    <section className="mt-6 rounded-xl border border-border-default bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge border border-border-default text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} aria-hidden />
          {meta.label}
        </span>
        {step.estimatedTime && <span className="text-xs text-text-muted">{step.estimatedTime}</span>}
        {resourceMeta && (
          <span className="badge inline-flex items-center gap-1 border border-border-default text-text-secondary">
            <resourceMeta.icon size={12} aria-hidden /> {resourceMeta.label}
          </span>
        )}
        {step.resourceFree && <span className="badge badge-green">Free</span>}
        {step.contentReviewStatus === 'needs_human_review' && (
          <span className="badge border border-[rgba(138,90,0,0.3)] text-[var(--color-warning)]">Draft · pending subject review</span>
        )}
        {step.legacyGrandfathered && (
          <span className="badge border border-border-default text-text-secondary">Legacy completion preserved</span>
        )}
        {step.contentProvenance?.resourceStatus === 'blocked' && (
          <span className="badge border border-border-default text-text-secondary">External resource blocked · optional only</span>
        )}
        {step.contentProvenance?.resourceStatus === 'provisional' && (
          <span className="badge border border-border-default text-text-secondary">External resource provisional · optional</span>
        )}
        {step.resourceSource && <span className="text-xs text-text-muted">{step.resourceSource}</span>}
      </div>

      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary">{step.title}</h1>

      <div className="mt-4">
        <LessonContent text={step.description} />
      </div>

      {step.type === 'concept' && step.topics?.length ? (
        <div className="mt-6 rounded-lg bg-elevated p-4 sm:p-5">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">In this stage</h2>
          <p className="mt-2 text-[0.95rem] leading-7 text-text-secondary">
            Here&apos;s what you&apos;ll learn and practise. Continue when you&apos;re ready to start.
          </p>
          <ul className="mt-3 space-y-2">
            {step.topics.map((topic) => (
              <li key={topic} className="flex gap-2.5 text-[0.95rem] leading-7 text-text-secondary">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-grape" aria-hidden />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {step.type === 'resource' && !isPractice ? (
        <div className="mt-6 rounded-lg bg-elevated p-4 sm:p-5">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">Your task</h2>
          <p className="mt-2 text-[0.95rem] leading-7 text-text-secondary">
            Study the resource, take notes on the key ideas, then mark this step complete to continue.
          </p>
        </div>
      ) : null}

      {isPractice ? (
        <div className="mt-6 rounded-lg border border-grape/25 bg-grape/5 p-4 sm:p-5">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">Do this before the knowledge check</h2>
          <p className="mt-2 text-[0.95rem] leading-7 text-text-secondary">
            Complete the task yourself. The point is to apply the idea, not just recognise it. Use the resource as reference when you need it.
          </p>
        </div>
      ) : null}

      {youtubeId ? (
        <div className="mt-6 overflow-hidden rounded-lg" style={{ aspectRatio: '16/9', background: '#000' }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={step.title}
          />
        </div>
      ) : null}

      {step.type === 'quiz' && step.quizQuestions?.length ? (
        <div className="mt-6 space-y-5">
          <div className="flex items-start gap-2 rounded-lg p-3" style={{ border: '1px solid rgba(138, 90, 0, 0.25)', backgroundColor: 'rgba(138, 90, 0, 0.05)' }}>
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[var(--color-warning)]" aria-hidden />
            <p className="text-xs font-medium text-[var(--color-warning)]">
              {isAIQuiz
                ? 'AI knowledge checks require at least 80%. Your answers are checked again on the server.'
                : 'You may get one question wrong and still pass. Your answers are checked again on the server.'}
            </p>
          </div>

          {step.quizQuestions.map((question, questionIndex) => {
            const key = `${step.index}-${questionIndex}`
            const selected = answerMap[key]
            return (
              <fieldset key={key} className="rounded-lg bg-elevated p-4">
                <legend className="text-sm font-medium text-text-primary">
                  {questionIndex + 1}. {question.question}
                </legend>
                <div className="mt-3 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const selectedThis = selected === optionIndex
                    const answerResult = quizResult.results[questionIndex]
                    const correct = submitted && selectedThis && Boolean(answerResult?.correct)
                    const incorrect = submitted && selectedThis && !answerResult?.correct
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={submitted}
                        aria-pressed={selectedThis}
                        onClick={() => !submitted && onSelect(key, optionIndex)}
                        className="flex w-full items-start gap-2 rounded-md border p-3 text-left text-sm transition-colors disabled:cursor-default"
                        style={{
                          borderColor: correct
                            ? 'var(--color-success)'
                            : incorrect
                              ? 'var(--color-error)'
                              : selectedThis
                                ? 'var(--accent-primary)'
                                : 'var(--border-default)',
                          background: correct
                            ? 'rgba(30, 124, 71, 0.08)'
                            : incorrect
                              ? 'rgba(178, 59, 47, 0.08)'
                              : selectedThis
                                ? 'var(--accent-primary-bg)'
                                : 'transparent',
                        }}
                      >
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                          style={{ borderColor: selectedThis ? 'var(--accent-primary)' : 'var(--border-default)' }}
                          aria-hidden
                        >
                          {selectedThis && <span className="h-2 w-2 rounded-full bg-grape" />}
                        </span>
                        <span className="text-text-primary">{option}</span>
                        {correct && <CheckCircle2 size={15} className="ml-auto shrink-0 text-[var(--color-success)]" aria-hidden />}
                      </button>
                    )
                  })}
                </div>
                {submitted && quizResult.results[questionIndex]?.explanation && (
                  <p className={`mt-2 text-xs leading-6 ${quizResult.results[questionIndex]?.correct ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                    {quizResult.results[questionIndex]?.explanation}
                  </p>
                )}
              </fieldset>
            )
          })}

          {!submitted && (
            <button
              type="button"
              className="btn btn-primary w-full justify-center sm:w-auto"
              disabled={checking || step.quizQuestions.some((_, index) => answerMap[`${step.index}-${index}`] === undefined)}
              onClick={onSubmitQuiz}
            >
              {checking ? 'Checking…' : 'Submit answers'}
            </button>
          )}
          {submitted && !quizResult.passed && (
            <div className="space-y-2">
              {quizResult.reviewNotes.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-xs leading-6 text-text-secondary">
                  {quizResult.reviewNotes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-secondary inline-flex items-center gap-2" onClick={onRetryQuiz}>
                  <RotateCcw size={14} aria-hidden /> Try again
                </button>
                <span className="text-xs text-[var(--color-error)]">
                  Score {quizResult.score}%. Need {Math.round((quizResult.requiredCorrect / quizResult.total) * 100)}% to continue.
                </span>
              </div>
            </div>
          )}
          {submitted && quizResult.passed && (
            <p className="inline-flex items-center gap-1.5 text-sm text-[var(--color-success)]">
              <CheckCircle2 size={15} aria-hidden /> Knowledge check passed at {quizResult.score}%.
            </p>
          )}
        </div>
      ) : null}

      {step.type === 'project' ? (
        <ProjectSubmissionPanel
          key={step.index}
          step={step}
          submissionState={submissionState}
          assessing={assessing}
          onAssess={onAssess}
        />
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-6">
        {step.resourceUrl && (
          <a className="btn btn-secondary inline-flex items-center gap-2" href={step.resourceUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} aria-hidden /> Open resource
          </a>
        )}
        {step.type === 'project' ? (
          submissionState?.status === 'passed' ? (
            <button className="btn btn-primary inline-flex items-center gap-2" onClick={() => onComplete()} disabled={saving}>
              {saving ? <Loader2 size={14} className="animate-spin" aria-hidden /> : <ArrowRight size={14} aria-hidden />}
              {saving ? 'Saving…' : saveErrored ? 'Retry' : 'Continue to next step'}
            </button>
          ) : (
            <span className="text-xs text-text-muted">Assessment must pass before you can continue.</span>
          )
        ) : step.type !== 'quiz' ? (
          <button className="btn btn-primary inline-flex items-center gap-2" onClick={() => onComplete()} disabled={saving}>
            {saving ? <Loader2 size={14} className="animate-spin" aria-hidden /> : <ArrowRight size={14} aria-hidden />}
            {saving
              ? 'Saving…'
              : saveErrored
                ? 'Retry'
                : step.type === 'checkpoint'
                  ? 'Continue to next stage'
                  : isPractice
                    ? 'Task complete — continue'
                    : step.type === 'concept'
                      ? 'Continue'
                      : 'Mark complete'}
          </button>
        ) : null}
        {step.type === 'quiz' && quizResult.passed && (
          <button className="btn btn-primary inline-flex items-center gap-2" onClick={() => onComplete()} disabled={saving}>
            {saving ? <Loader2 size={14} className="animate-spin" aria-hidden /> : <ArrowRight size={14} aria-hidden />}
            {saving ? 'Saving…' : saveErrored ? 'Retry' : 'Continue'}
          </button>
        )}
      </div>
    </section>
  )
}
