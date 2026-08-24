'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AlertTriangle, ArrowRight, BookOpen, BookOpenCheck, CheckCircle2, ChevronLeft, Code2, ExternalLink, FileText, GraduationCap, Lightbulb, Lock, RotateCcw, Sparkles, Trophy, Users, Wrench, Youtube } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { TRACKS } from '@/lib/tracks'
import type { GuidedStep } from '@/lib/guided-path'

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
  video: { icon: Youtube, label: 'Video' }, docs: { icon: FileText, label: 'Guide' }, practice: { icon: BookOpenCheck, label: 'Practice' }, tool: { icon: Wrench, label: 'Tool' }, community: { icon: Users, label: 'Community' }, book: { icon: BookOpen, label: 'Book' },
}

export default function GuidedPathPage() {
  const params = useParams<{ trackId: string }>()
  const router = useRouter()
  const { update } = useSession()
  const trackId = params.trackId
  const [steps, setSteps] = useState<GuidedStep[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedIndices, setCompletedIndices] = useState<number[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch(`/api/guided-path/${trackId}`).then(async (response) => {
      if (response.status === 403) { router.push(`/purchase/${trackId}`); return null }
      if (!response.ok) throw new Error('Failed to load your guided path.')
      return response.json()
    }).then((data) => {
      if (!data || cancelled) return
      setSteps(data.steps)
      setCurrentIndex(data.currentStepIndex)
      setCompletedIndices(Array.from({ length: data.currentStepIndex }, (_, i) => i))
      setLoading(false)
      update()
    }).catch((err) => {
      if (!cancelled) { setError(err instanceof Error ? err.message : 'Failed to load your guided path.'); setLoading(false) }
    })
    return () => { cancelled = true }
  }, [router, trackId, update])

  const currentStep = steps[currentIndex]
  const track = TRACKS.find((item) => item.id === trackId)
  const progress = steps.length ? Math.round((currentIndex / steps.length) * 100) : 0
  const allQuizCorrect = useMemo(() => {
    if (currentStep?.type !== 'quiz' || !submitted || !currentStep.quizQuestions) return false
    return currentStep.quizQuestions.every((question, index) => answers[`${currentStep.index}-${index}`] === question.correctIndex)
  }, [answers, currentStep, submitted])

  async function completeStep(stepIndex: number) {
    setError('')
    const step = steps[stepIndex]
    const payload: { stepIndex: number; answers?: number[] } = { stepIndex }
    if (step?.type === 'quiz') payload.answers = step.quizQuestions?.map((_, index) => answers[`${step.index}-${index}`]) ?? []
    const response = await fetch(`/api/guided-path/${trackId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!response.ok) {
      const data = await response.json().catch(() => null)
      setError(data?.error || 'Your progress could not be saved. Please try again.')
      return
    }
    setCompletedIndices((previous) => previous.includes(stepIndex) ? previous : [...previous, stepIndex])
    setCurrentIndex(stepIndex + 1)
    setAnswers({})
    setSubmitted(false)
  }

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center text-text-secondary">Loading your path...</div>
  if (error && steps.length === 0) return <div className="flex min-h-[60vh] items-center justify-center text-[var(--color-error)]">{error}</div>
  if (!steps.length) return <div className="flex min-h-[60vh] items-center justify-center text-text-secondary">Track not found.</div>

  if (currentIndex >= steps.length) return <div className="max-w-2xl mx-auto py-20 px-6 text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(22,163,74,0.1)' }}><Trophy size={30} style={{ color: 'var(--color-success)' }} /></div><h1 className="font-editorial text-4xl text-text-primary">Course complete!</h1><p className="mt-4 text-text-secondary">You completed the guided path for {track?.name || trackId}.</p><div className="mt-8 flex justify-center gap-3"><Link href={`/certificate/${trackId}`} className="btn btn-primary inline-flex items-center gap-2">Get certificate <ArrowRight size={16} /></Link><Link href={track ? `/tracks/${track.slug}` : '/tracks'} className="btn btn-secondary">Back to track</Link></div></div>

  return <main className="max-w-2xl mx-auto px-6 py-10">
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Tracks', href: '/tracks' }, { label: track?.name || trackId, href: `/tracks/${track?.slug || trackId}` }, { label: 'Guided Path' }]} />
    <Link href={track ? `/tracks/${track.slug}` : '/tracks'} className="mt-3 inline-flex items-center gap-1 text-sm text-text-secondary"><ChevronLeft size={14} /> Back to {track?.name || 'Track'}</Link>
    <div className="mt-6 flex items-center gap-2"><span className="badge inline-flex items-center gap-1"><GraduationCap size={12} /> PRO</span><span className="text-xs text-text-muted">Guided Path · Cross-device sync</span></div>
    <div className="mt-6"><p className="section-label">YOUR LEARNING PATH</p><div className="progress-bar-container mt-3"><div className="progress-bar-fill" style={{ width: `${progress}%` }} /></div><p className="mt-2 text-sm text-text-secondary">Step {currentIndex + 1} of {steps.length} · {progress}% complete</p></div>
    {error && <div className="mt-5 rounded-md p-3" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.22)' }}><p className="text-sm text-[var(--color-error)]">{error}</p></div>}
    <StepCard step={currentStep} answerMap={answers} submitted={submitted} allQuizCorrect={allQuizCorrect} onSelect={(key, value) => setAnswers((previous) => ({ ...previous, [key]: value }))} onSubmitQuiz={() => { setError(''); setSubmitted(true) }} onRetryQuiz={() => { setAnswers({}); setSubmitted(false); setError('') }} onComplete={() => completeStep(currentIndex)} />
    <div className="mt-6 space-y-3">{steps.slice(currentIndex + 1, currentIndex + 4).map((step) => <div key={step.index} className="card opacity-40 flex items-center gap-3"><Lock size={16} className="text-text-muted" /><div><p className="text-sm font-medium text-text-secondary">{step.title}</p><p className="text-xs text-text-muted">Complete current step to unlock</p></div></div>)}</div>
    {completedIndices.length > 0 && <details className="mt-8"><summary className="cursor-pointer text-sm text-text-secondary">View {completedIndices.length} completed steps</summary><div className="mt-3 space-y-2">{steps.filter((_, index) => completedIndices.includes(index)).map((step) => <div key={step.index} className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 size={14} className="text-[var(--color-success)]" />{step.title}</div>)}</div></details>}
  </main>
}

function StepCard({ step, answerMap, submitted, allQuizCorrect, onSelect, onSubmitQuiz, onRetryQuiz, onComplete }: { step: GuidedStep; answerMap: Record<string, number>; submitted: boolean; allQuizCorrect: boolean; onSelect: (key: string, value: number) => void; onSubmitQuiz: () => void; onRetryQuiz: () => void; onComplete: () => void }) {
  const typeMeta = step.type === 'concept' ? { icon: BookOpen, label: 'STAGE', color: 'var(--accent-tertiary)' } : step.type === 'resource' && step.resourceType === 'practice' ? { icon: BookOpenCheck, label: 'PRACTICE', color: 'var(--color-success)' } : step.type === 'resource' ? { icon: FileText, label: 'RESOURCE', color: 'var(--accent-primary)' } : step.type === 'quiz' ? { icon: Sparkles, label: 'VERIFY', color: 'var(--accent-secondary)' } : step.type === 'project' ? { icon: Code2, label: 'PROJECT', color: 'var(--color-success)' } : { icon: Trophy, label: 'MILESTONE', color: 'var(--color-info)' }
  const Icon = typeMeta.icon
  const youtubeId = getYouTubeId(step.resourceUrl)
  const resourceMeta = step.resourceType ? resourceTypeMeta[step.resourceType] : null

  return <section className="card mt-8">
    <div className="flex flex-wrap items-center gap-2"><span className="badge inline-flex items-center gap-1" style={{ background: `${typeMeta.color}15`, color: typeMeta.color }}><Icon size={12} /> {typeMeta.label} · {step.estimatedTime}</span>{resourceMeta && <span className="badge inline-flex items-center gap-1"><resourceMeta.icon size={12} /> {resourceMeta.label}</span>}{step.resourceFree && <span className="badge" style={{ color: 'var(--color-success)' }}>Free</span>}{step.resourceSource && <span className="text-xs text-text-muted">{step.resourceSource}</span>}</div>
    <h1 className="mt-4 font-editorial text-3xl text-text-primary">{step.title}</h1>
    <p className="mt-3 leading-7 text-text-secondary">{step.description}</p>

    {step.type === 'concept' && step.topics?.length ? <div className="mt-5 rounded-md p-4" style={{ background: 'var(--bg-elevated)' }}><p className="text-xs font-medium text-text-muted">WHAT YOU WILL LEARN</p><ul className="mt-2 space-y-2">{step.topics.map((topic) => <li key={topic} className="flex gap-2 text-sm text-text-secondary"><span className="text-teal">▸</span>{topic}</li>)}</ul></div> : null}

    {step.type === 'resource' && step.resourceType !== 'practice' && <div className="mt-5 rounded-md p-4" style={{ background: 'var(--bg-elevated)' }}><p className="text-xs font-medium text-text-muted">YOUR LEARNING TASK</p><p className="mt-2 text-sm leading-6 text-text-secondary">Study the resource, take notes on the key ideas, and return to complete the step.</p></div>}
    {step.type === 'resource' && step.resourceType === 'practice' && <div className="mt-5 rounded-md p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--accent-primary-border)' }}><p className="text-xs font-medium text-[var(--color-success)]">DO THIS BEFORE THE MASTERY CHECK</p><p className="mt-2 text-sm leading-7 text-text-secondary">Complete the task above yourself. The point is to apply the idea, not just recognize it. Use the resource material as reference when necessary.</p></div>}

    {youtubeId && <div className="mt-5 overflow-hidden rounded-md" style={{ aspectRatio: '16/9', background: '#000' }}><iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={step.title} /></div>}

    {step.type === 'quiz' && step.quizQuestions?.length ? <div className="mt-6 space-y-6"><div className="flex items-center gap-2 rounded-md p-3" style={{ background: 'rgba(138,90,0,0.08)', border: '1px solid rgba(138,90,0,0.22)' }}><AlertTriangle size={14} style={{ color: 'var(--color-warning)' }} /><p className="text-xs font-medium text-[var(--color-warning)]">All questions must be correct to continue. Your answers are checked again on the server.</p></div>{step.quizQuestions.map((question, questionIndex) => { const key = `${step.index}-${questionIndex}`; const selected = answerMap[key]; return <div key={key} className="rounded-md p-4" style={{ background: 'var(--bg-elevated)' }}><p className="text-sm font-medium text-text-primary">{questionIndex + 1}. {question.question}</p><div className="mt-3 space-y-2">{question.options.map((option, optionIndex) => { const selectedThis = selected === optionIndex; const correct = submitted && optionIndex === question.correctIndex; const incorrect = submitted && selectedThis && !correct; return <button key={option} type="button" onClick={() => !submitted && onSelect(key, optionIndex)} className="w-full rounded-md p-3 text-left text-sm" style={{ border: `1px solid ${correct ? 'var(--color-success)' : incorrect ? 'var(--color-error)' : selectedThis ? 'var(--accent-primary)' : 'var(--border-default)'}`, background: correct ? 'rgba(22,163,74,0.08)' : incorrect ? 'rgba(220,38,38,0.08)' : selectedThis ? 'var(--accent-primary-bg)' : 'transparent' }}>{option}</button> })}</div>{submitted && <p className={`mt-2 text-xs ${selected === question.correctIndex ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>{question.explanation}</p>}</div> })}{!submitted && <button className="btn btn-primary" disabled={step.quizQuestions.some((_, index) => answerMap[`${step.index}-${index}`] === undefined)} onClick={onSubmitQuiz}>Submit Answers</button>}{submitted && !allQuizCorrect && <button className="btn btn-secondary inline-flex items-center gap-2" onClick={onRetryQuiz}><RotateCcw size={14} /> Try Again</button>}{submitted && allQuizCorrect && <div className="flex items-center gap-2 text-sm text-[var(--color-success)]"><CheckCircle2 size={15} /> Mastery check passed. Continue when ready.</div>}</div> : null}

    {step.type === 'project' && <div className="mt-5 rounded-md p-4" style={{ background: 'var(--bg-elevated)' }}><p className="text-xs font-medium text-text-muted">PROJECT STANDARD</p><p className="mt-2 text-sm leading-6 text-text-secondary"><Lightbulb size={13} className="mr-1 inline text-[var(--color-warning)]" />Build from the requirements. Do not copy a tutorial step-for-step. Produce an artifact you can explain and improve.</p>{step.techTags?.length ? <div className="mt-3 flex flex-wrap gap-2">{step.techTags.map((tag) => <span key={tag} className="rounded-md px-2 py-1 text-xs" style={{ background: 'var(--accent-primary-bg)', color: 'var(--accent-primary)' }}>{tag}</span>)}</div> : null}</div>}

    <div className="mt-6 flex flex-wrap gap-3">{step.resourceUrl && <a className="btn btn-secondary inline-flex items-center gap-2" href={step.resourceUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> Open Resource</a>}{step.type !== 'quiz' && <button className="btn btn-primary inline-flex items-center gap-2" onClick={onComplete}>{step.type === 'project' ? <CheckCircle2 size={14} /> : <ArrowRight size={14} />} {step.type === 'project' ? 'Mark Project Complete' : step.type === 'checkpoint' ? 'Continue to Next Stage' : step.resourceType === 'practice' ? 'Task Complete — Continue' : 'Mark Complete'}</button>}{step.type === 'quiz' && allQuizCorrect && <button className="btn btn-primary inline-flex items-center gap-2" onClick={onComplete}>Continue <ArrowRight size={14} /></button>}</div>
  </section>
}
