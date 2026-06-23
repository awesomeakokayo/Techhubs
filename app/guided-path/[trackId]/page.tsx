'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle2, Lock, ExternalLink, ArrowRight, Sparkles, BookOpen, Code2, Trophy } from 'lucide-react'
import type { GuidedStep, QuizQuestion } from '@/lib/guided-path'

export default function GuidedPathPage() {
  const params = useParams()
  const router = useRouter()
  const trackId = params.trackId as string

  const [steps, setSteps] = useState<GuidedStep[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedIndices, setCompletedIndices] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
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
        if (!data) return
        setSteps(data.steps)
        setCurrentIndex(data.currentStepIndex)
        setCompletedIndices(
          Array.from({ length: data.currentStepIndex }, (_, i) => i)
        )
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [trackId, router])

  const markComplete = useCallback(async (stepIndex: number) => {
    await fetch(`/api/guided-path/${trackId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stepIndex }),
    })
    setCompletedIndices((prev) => [...prev, stepIndex])
    setCurrentIndex(stepIndex + 1)
    setQuizAnswer(null)
    setQuizSubmitted(false)
    setShowCelebration(false)

    const step = steps[stepIndex]
    if (step?.type === 'checkpoint') {
      setShowCelebration(true)
    }
  }, [trackId, steps])

  const handleQuizSubmit = useCallback((stepIndex: number) => {
    setQuizSubmitted(true)
  }, [])

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

  if (showCelebration) {
    return (
      <CelebrationScreen
        steps={steps}
        currentIndex={currentIndex}
        completedIndices={completedIndices}
        onContinue={() => setShowCelebration(false)}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-8">
        <p className="section-label">YOUR GUIDED PATH</p>
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
          quizAnswer={quizAnswer}
          setQuizAnswer={setQuizAnswer}
          quizSubmitted={quizSubmitted}
          onQuizSubmit={handleQuizSubmit}
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
              <p className="text-xs text-[var(--text-muted)]">Unlocks after current step</p>
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

function StepCard({
  step,
  stepIndex,
  onComplete,
  quizAnswer,
  setQuizAnswer,
  quizSubmitted,
  onQuizSubmit,
  isLastStep,
}: {
  step: GuidedStep
  stepIndex: number
  onComplete: (i: number) => void
  quizAnswer: number | null
  setQuizAnswer: (v: number | null) => void
  quizSubmitted: boolean
  onQuizSubmit: (i: number) => void
  isLastStep: boolean
}) {
  const typeStyles: Record<string, { icon: typeof BookOpen; label: string; color: string }> = {
    concept: { icon: BookOpen, label: 'LEARN', color: 'var(--accent-tertiary)' },
    resource: { icon: BookOpen, label: 'READ', color: 'var(--accent-primary)' },
    quiz: { icon: Sparkles, label: 'QUIZ', color: 'var(--accent-secondary)' },
    project: { icon: Code2, label: 'BUILD', color: 'var(--color-success)' },
    checkpoint: { icon: Trophy, label: 'MILESTONE', color: 'var(--color-info)' },
  }
  const config = typeStyles[step.type] || typeStyles.resource
  const Icon = config.icon

  const allQuizCorrect =
    step.type === 'quiz' &&
    step.quizQuestions &&
    quizSubmitted &&
    quizAnswer !== null &&
    quizAnswer === step.quizQuestions[0]?.correctIndex

  const quizFailed =
    step.type === 'quiz' &&
    quizSubmitted &&
    quizAnswer !== null &&
    step.quizQuestions &&
    quizAnswer !== step.quizQuestions[0]?.correctIndex

  return (
    <div className="card border-[var(--accent-primary-border)]">
      <span
        className="badge mb-3 inline-flex"
        style={{
          background: `${config.color}15`,
          color: config.color,
        }}
      >
        <Icon size={12} className="mr-1" />
        {config.label} &middot; {step.estimatedTime}
      </span>

      <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-2">
        {step.title}
      </h2>

      <p className="text-[var(--text-secondary)] mb-4">{step.description}</p>

      {step.type === 'quiz' && step.quizQuestions && step.quizQuestions.length > 0 && (
        <div className="mb-4 p-4 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <p className="font-medium text-sm text-[var(--text-primary)] mb-3">
            {step.quizQuestions[0].question}
          </p>
          <div className="space-y-2">
            {step.quizQuestions[0].options.map((opt, oi) => {
              let borderColor = 'var(--border-default)'
              let bgColor = 'transparent'
              if (quizSubmitted) {
                if (oi === step.quizQuestions![0].correctIndex) {
                  borderColor = 'var(--color-success)'
                  bgColor = 'rgba(22,163,74,0.08)'
                } else if (oi === quizAnswer) {
                  borderColor = 'var(--color-error)'
                  bgColor = 'rgba(220,38,38,0.08)'
                }
              } else if (oi === quizAnswer) {
                borderColor = 'var(--accent-primary)'
                bgColor = 'var(--accent-primary-bg)'
              }
              return (
                <button
                  key={oi}
                  onClick={() => !quizSubmitted && setQuizAnswer(oi)}
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
          {!quizSubmitted && (
            <button
              onClick={() => onQuizSubmit(stepIndex)}
              disabled={quizAnswer === null}
              className="btn btn-primary text-sm mt-3"
            >
              Submit Answer
            </button>
          )}
          {quizSubmitted && (
            <div className="mt-3">
              {allQuizCorrect ? (
                <p className="text-sm font-medium" style={{ color: 'var(--color-success)' }}>
                  Correct! {step.quizQuestions[0].explanation}
                </p>
              ) : quizFailed ? (
                <p className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>
                  Not quite. {step.quizQuestions[0].explanation}
                </p>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">
                  Select an answer and submit.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {step.type === 'project' && (
        <div className="mb-4 p-4 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
          <p className="text-sm text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Tech:</strong> Check the track page for project tech stack and hints.
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Search YouTube or freeCodeCamp for tutorials on building this project.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        {step.resourceUrl && step.type !== 'quiz' && (
          <a
            href={step.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-sm"
          >
            Open Resource <ExternalLink size={14} />
          </a>
        )}
        <button
          onClick={() => onComplete(stepIndex)}
          disabled={
            step.type === 'quiz' && quizSubmitted && !allQuizCorrect
          }
          className="btn btn-primary text-sm"
        >
          {isLastStep ? 'Finish Path' : 'Mark Complete & Continue'}{' '}
          <ArrowRight size={16} />
        </button>
      </div>

      {step.type === 'quiz' && quizSubmitted && !allQuizCorrect && (
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Review the explanation above, then try again.
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
