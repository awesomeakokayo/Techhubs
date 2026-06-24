'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CheckCircle2, Lock, ExternalLink, ArrowRight, Sparkles, BookOpen, Code2, Trophy, Youtube, FileText, Wrench, Users, BookOpenCheck, GraduationCap, RotateCcw, ChevronLeft } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { TRACKS } from '@/lib/tracks'
import type { GuidedStep } from '@/lib/guided-path'

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('?')[0] || null
      return u.searchParams.get('v')
    }
    return null
  } catch { return null }
}

export default function GuidedPathPage() {
  const params = useParams()
  const router = useRouter()
  const { update } = useSession()
  const trackId = params.trackId as string

  const [steps, setSteps] = useState<GuidedStep[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedIndices, setCompletedIndices] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/guided-path/${trackId}`)
      .then((res) => {
        if (res.status === 403) {
          router.push('/upgrade')
          return null
        }
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then((data) => {
        if (cancelled || !data) return
        setSteps(data.steps)
        setCurrentIndex(data.currentStepIndex)
        setCompletedIndices(
          Array.from({ length: data.currentStepIndex }, (_, i) => i)
        )
        setLoading(false)
        update()
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [trackId, router, update])

  const markComplete = useCallback(async (stepIndex: number) => {
    await fetch(`/api/guided-path/${trackId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stepIndex }),
    })
    setCompletedIndices((prev) => [...prev, stepIndex])
    setCurrentIndex(stepIndex + 1)
    setQuizAnswers({})
    setQuizSubmitted(false)
    setShowCelebration(false)

    const step = steps[stepIndex]
    if (step?.type === 'checkpoint') {
      setShowCelebration(true)
    }
  }, [trackId, steps])

  const handleQuizSubmit = useCallback(() => {
    setQuizSubmitted(true)
  }, [])

  const handleQuizRetry = useCallback(() => {
    setQuizAnswers({})
    setQuizSubmitted(false)
  }, [])

  const allQuizCorrect = (() => {
    const step = steps[currentIndex]
    if (!step || step.type !== 'quiz' || !step.quizQuestions) return false
    if (!quizSubmitted) return false
    return step.quizQuestions.every((q, qi) => quizAnswers[`${step.index}-${qi}`] === q.correctIndex)
  })()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-[var(--text-secondary)] text-lg">Loading your path...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-[var(--color-error)]">{error}</div>
      </div>
    )
  }

  if (steps.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-[var(--text-secondary)]">Track not found.</div>
      </div>
    )
  }

  const currentStep = steps[currentIndex]
  const progress = Math.round((currentIndex / steps.length) * 100)
  const isLastStep = currentIndex >= steps.length - 1

  if (showCelebration && currentStep) {
    return (
      <CelebrationScreen
        steps={steps}
        currentIndex={currentIndex}
        completedIndices={completedIndices}
        onContinue={() => setShowCelebration(false)}
      />
    )
  }

  const track = TRACKS.find((t) => t.id === trackId)

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tracks', href: '/tracks' },
            { label: track?.name || trackId, href: `/tracks/${track?.slug || trackId}` },
            { label: 'Guided Path' },
          ]}
        />
        <Link
          href={`/tracks/${track?.slug || trackId}`}
          className="mt-3 inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline"
        >
          <ChevronLeft size={14} /> Back to {track?.name || 'Track'}
        </Link>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <span className="badge" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' }}>
          <GraduationCap size={12} className="mr-1" />
          PRO
        </span>
        <span className="text-xs text-[var(--text-muted)]">Guided Path &middot; Cross-device sync</span>
      </div>

      <div className="mb-8">
        <p className="section-label">YOUR LEARNING PATH</p>
        <div className="progress-bar-container mt-3">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[var(--text-secondary)] text-sm mt-2">
          Step {currentIndex + 1} of {steps.length} &middot; {progress}% complete
        </p>
      </div>

      {currentStep && (
        <StepCard
          step={currentStep}
          stepIndex={currentIndex}
          onComplete={markComplete}
          quizAnswers={quizAnswers}
          setQuizAnswers={setQuizAnswers}
          quizSubmitted={quizSubmitted}
          onQuizSubmit={handleQuizSubmit}
          onQuizRetry={handleQuizRetry}
          allQuizCorrect={allQuizCorrect}
          isLastStep={isLastStep}
        />
      )}

      <div className="space-y-3 mt-6">
        {steps.slice(currentIndex + 1, currentIndex + 4).map((step) => (
          <div
            key={step.index}
            className="card opacity-40 flex items-center gap-3 cursor-not-allowed"
          >
            <Lock size={16} className="text-[var(--text-muted)]" />
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)]">{step.title}</p>
              <p className="text-xs text-[var(--text-muted)]">Complete current step to unlock</p>
            </div>
          </div>
        ))}
      </div>

      {completedIndices.length > 0 && (
        <details className="mt-8">
          <summary className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)]">
            View {completedIndices.length} completed step{completedIndices.length > 1 ? 's' : ''}
          </summary>
          <div className="space-y-2 mt-3">
            {steps
              .filter((_, i) => completedIndices.includes(i))
              .map((step) => (
                <div key={step.index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0" />
                  <span className="text-[var(--text-secondary)]">{step.title}</span>
                </div>
              ))}
          </div>
        </details>
      )}
    </div>
  )
}

const resourceTypeMeta: Record<string, { icon: typeof BookOpen; label: string }> = {
  video: { icon: Youtube, label: 'Video' },
  docs: { icon: FileText, label: 'Guide' },
  practice: { icon: BookOpenCheck, label: 'Practice' },
  tool: { icon: Wrench, label: 'Tool' },
  community: { icon: Users, label: 'Community' },
  book: { icon: BookOpen, label: 'Book' },
}

function StepCard({
  step,
  stepIndex,
  onComplete,
  quizAnswers,
  setQuizAnswers,
  quizSubmitted,
  onQuizSubmit,
  onQuizRetry,
  allQuizCorrect,
  isLastStep,
}: {
  step: GuidedStep
  stepIndex: number
  onComplete: (i: number) => void
  quizAnswers: Record<string, number>
  setQuizAnswers: (fn: (prev: Record<string, number>) => Record<string, number>) => void
  quizSubmitted: boolean
  onQuizSubmit: () => void
  onQuizRetry: () => void
  allQuizCorrect: boolean
  isLastStep: boolean
}) {
  const typeStyles: Record<string, { icon: typeof BookOpen; label: string; color: string }> = {
    concept: { icon: BookOpen, label: 'STAGE', color: 'var(--accent-tertiary)' },
    resource: { icon: Youtube, label: 'RESOURCE', color: 'var(--accent-primary)' },
    quiz: { icon: Sparkles, label: 'VERIFY', color: 'var(--accent-secondary)' },
    project: { icon: Code2, label: 'PROJECT', color: 'var(--color-success)' },
    checkpoint: { icon: Trophy, label: 'MILESTONE', color: 'var(--color-info)' },
  }
  const config = typeStyles[step.type] || typeStyles.resource
  const Icon = config.icon

  const youtubeId = step.resourceUrl ? getYouTubeId(step.resourceUrl) : null
  const rtMeta = step.type === 'resource' && step.resourceType ? resourceTypeMeta[step.resourceType] : null

  return (
    <div className="card border-[var(--accent-primary-border)]">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="badge inline-flex"
          style={{
            background: `${config.color}15`,
            color: config.color,
          }}
        >
          <Icon size={12} className="mr-1" />
          {config.label} &middot; {step.estimatedTime}
        </span>
        {rtMeta && (
          <span className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
            <rtMeta.icon size={12} className="mr-1" />
            {rtMeta.label}
          </span>
        )}
        {step.resourceFree === true && (
          <span className="badge" style={{ background: 'rgba(22,163,74,0.1)', color: 'var(--color-success)' }}>
            Free
          </span>
        )}
        {step.resourceSource && (
          <span className="text-xs text-[var(--text-muted)]">{step.resourceSource}</span>
        )}
      </div>

      <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-2">
        {step.type === 'quiz' ? '📝 ' : ''}{step.title}
      </h2>

      <p className="text-[var(--text-secondary)] mb-4">{step.description}</p>

      {step.type === 'concept' && step.topics && step.topics.length > 0 && (
        <div className="mb-4 p-4 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">WHAT YOU WILL LEARN</p>
          <ul className="space-y-1.5">
            {step.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span style={{ color: 'var(--accent-tertiary)' }} className="mt-0.5 shrink-0">▸</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.type === 'resource' && (
        <div className="mb-4 p-4 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">YOUR LEARNING TASK</p>
          <p className="text-sm text-[var(--text-secondary)]">
            1. Open the resource below and study it thoroughly.<br />
            2. Come back when you feel confident.<br />
            3. Click <strong>&quot;I&apos;ve Learned This&quot;</strong> to mark complete and unlock the quiz.
          </p>
        </div>
      )}

      {youtubeId && (
        <div className="mb-4 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: '#000' }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={step.title}
          />
        </div>
      )}

      {step.type === 'quiz' && step.quizQuestions && step.quizQuestions.length > 0 && (
        <div className="mb-4 space-y-6">
          <div className="p-3 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="text-xs font-medium" style={{ color: '#f59e0b' }}>
              ⚠️ You must answer all questions correctly to pass.
            </p>
          </div>
          {step.quizQuestions.map((q, qi) => {
            const answerKey = `${step.index}-${qi}`
            const selected = quizAnswers[answerKey]
            return (
              <div key={qi} className="p-4 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                <p className="font-medium text-sm text-[var(--text-primary)] mb-3">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    let borderColor = 'var(--border-default)'
                    let bgColor = 'transparent'
                    if (quizSubmitted) {
                      if (oi === q.correctIndex) {
                        borderColor = 'var(--color-success)'
                        bgColor = 'rgba(22,163,74,0.08)'
                      } else if (oi === selected) {
                        borderColor = 'var(--color-error)'
                        bgColor = 'rgba(220,38,38,0.08)'
                      }
                    } else if (oi === selected) {
                      borderColor = 'var(--accent-primary)'
                      bgColor = 'var(--accent-primary-bg)'
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => {
                          if (!quizSubmitted) {
                            setQuizAnswers((prev) => ({ ...prev, [answerKey]: oi }))
                          }
                        }}
                        className="w-full text-left p-3 rounded-md text-sm transition-all"
                        style={{
                          border: `1px solid ${borderColor}`,
                          background: bgColor,
                          cursor: quizSubmitted ? 'default' : 'pointer',
                        }}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {quizSubmitted && (
                  <p className={`text-xs mt-2 ${selected === q.correctIndex ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                    {q.explanation}
                  </p>
                )}
              </div>
            )
          })}
          {!quizSubmitted && (
            <button
              onClick={onQuizSubmit}
              disabled={step.quizQuestions.some((_, qi) => quizAnswers[`${step.index}-${qi}`] === undefined)}
              className="btn btn-primary text-sm"
            >
              Submit Answers
            </button>
          )}
          {quizSubmitted && allQuizCorrect && (
            <div className="p-3 rounded-lg" style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)' }}>
              <p className="text-sm font-medium" style={{ color: 'var(--color-success)' }}>
                ✅ All correct! You really learned this.
              </p>
            </div>
          )}
          {quizSubmitted && !allQuizCorrect && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[var(--text-muted)]">
                Review the explanations above, then try again.
              </p>
              <button onClick={onQuizRetry} className="btn btn-secondary text-sm self-start">
                <RotateCcw size={14} className="mr-1" /> Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {step.type === 'project' && step.techTags && step.techTags.length > 0 && (
        <div className="mb-4 p-4 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <p className="text-xs font-medium text-[var(--text-muted)] mb-2">TECH STACK</p>
          <div className="flex flex-wrap gap-2">
            {step.techTags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: 'var(--accent-primary-bg)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--accent-primary-border)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs text-[var(--text-secondary)]">
              💡 Search YouTube for &quot;{step.title.replace('Build: ', '')} tutorial&quot;
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              🔗 Try <a href="https://www.freecodecamp.org/news/search/" target="_blank" rel="noopener noreferrer" className="underline">freeCodeCamp</a> or <a href={`https://github.com/topics/${step.techTags[0]?.toLowerCase() || ''}`} target="_blank" rel="noopener noreferrer" className="underline">GitHub examples</a>
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        {step.resourceUrl && (
          <a
            href={step.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-sm"
          >
            <ExternalLink size={14} className="mr-1" /> Open Resource
          </a>
        )}
        {step.type === 'resource' && (
          <button
            onClick={() => onComplete(stepIndex)}
            className="btn btn-primary text-sm"
          >
            <CheckCircle2 size={14} className="mr-1" /> I&apos;ve Learned This — Mark Complete
          </button>
        )}
        {step.type === 'quiz' && allQuizCorrect && (
          <button
            onClick={() => onComplete(stepIndex)}
            className="btn btn-primary text-sm"
          >
            {isLastStep ? 'Finish Path' : 'Continue'} <ArrowRight size={14} className="ml-1" />
          </button>
        )}
        {step.type === 'project' && (
          <button
            onClick={() => onComplete(stepIndex)}
            className="btn btn-primary text-sm"
          >
            <CheckCircle2 size={14} className="mr-1" /> Mark Complete
          </button>
        )}
        {step.type === 'concept' && (
          <button
            onClick={() => onComplete(stepIndex)}
            className="btn btn-primary text-sm"
          >
            Got It — Start Learning <ArrowRight size={14} className="ml-1" />
          </button>
        )}
        {step.type === 'checkpoint' && (
          <button
            onClick={() => onComplete(stepIndex)}
            className="btn btn-primary text-sm"
          >
            Continue to Next Stage <ArrowRight size={14} className="ml-1" />
          </button>
        )}
      </div>

      {step.type === 'quiz' && quizSubmitted && !allQuizCorrect && (
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Answer all questions correctly to continue.
        </p>
      )}
    </div>
  )
}

function CelebrationScreen({
  steps,
  currentIndex,
  completedIndices,
  onContinue,
}: {
  steps: GuidedStep[]
  currentIndex: number
  completedIndices: number[]
  onContinue: () => void
}) {
  const stageSteps = steps.filter((s) => completedIndices.includes(s.index))
  const completedTitles = stageSteps.map((s) => s.title)

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-3">
        Stage Complete!
      </h1>
      <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
        You just completed another milestone. Every step builds momentum — keep going.
      </p>

      <div className="card mb-8 text-left">
        <p className="text-sm font-medium text-[var(--text-muted)] mb-3">Completed in this stage</p>
        <div className="space-y-2">
          {completedTitles.slice(-5).map((title, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0" />
              <span className="text-[var(--text-secondary)]">{title}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onContinue} className="btn btn-primary">
        Continue to Next Step <ArrowRight size={16} />
      </button>
    </div>
  )
}
