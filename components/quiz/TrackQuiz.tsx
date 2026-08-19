'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw, Clock } from 'lucide-react'
import { TRACKS } from '@/lib/tracks'
import { buildGuidedPath } from '@/lib/guided-path'
import { getProgress, saveQuizResult } from '@/lib/progress'
import { trackEvent, trackQuizCompletion } from '@/lib/analytics'
import type { Track } from '@/lib/tracks'

type Level = 'beginner' | 'intermediate' | 'advanced'

interface Option {
  label: string
  scores: Record<string, number | undefined>
}

interface Question {
  q: string
  options: Option[]
}

const INTRO_QUESTIONS: Question[] = [
  {
    q: 'What sounds most exciting to you?',
    options: [
      { label: 'Building things users can see and click', scores: { frontend: 3, fullstack: 2, mobile: 2 } },
      { label: 'Logic, data, and systems behind the scenes', scores: { backend: 3, python: 2, data: 2, crypto: 2 } },
      { label: 'Making things look beautiful and intuitive', scores: { uiux: 3, frontend: 1, writing: 1 } },
      { label: 'Understanding and protecting systems', scores: { cyber: 3, devops: 2, qa: 1 } },
      { label: 'Creating content or growing an audience', scores: { youtube: 3, marketing: 3, video: 2 } },
      { label: 'Organising teams and delivering projects on time', scores: { projectmgmt: 3 } },
      { label: 'Deciding what gets built and why', scores: { productmgmt: 3 } },
    ],
  },
  {
    q: 'How do you prefer to work?',
    options: [
      { label: 'Visually — layouts and colors', scores: { uiux: 3, frontend: 2, video: 1 } },
      { label: 'Analytically — logic and patterns', scores: { backend: 2, data: 3, datascience: 2, crypto: 2 } },
      { label: 'Creatively — stories and experiences', scores: { uiux: 2, video: 2, writing: 2 } },
      { label: 'Strategically — systems and plans', scores: { devops: 2, marketing: 2, fullstack: 1, projectmgmt: 2, productmgmt: 2 } },
    ],
  },
  {
    q: "What's your goal?",
    options: [
      { label: 'Get a job at a tech company', scores: { frontend: 2, backend: 2, fullstack: 2, data: 1, crypto: 1, projectmgmt: 1, productmgmt: 1 } },
      { label: 'Build my own products', scores: { fullstack: 3, python: 2, nocode: 2, crypto: 2, productmgmt: 2 } },
      { label: 'Freelance and work independently', scores: { frontend: 2, uiux: 2, marketing: 2 } },
      { label: 'Understand tech enough to lead', scores: { qa: 1, data: 2, writing: 2, ai: 1, projectmgmt: 3, productmgmt: 3 } },
    ],
  },
]

const EXPERIENCE_OPTIONS: Option[] = [
  { label: "I'm brand new", scores: { frontend: 1, uiux: 1, nocode: 1, writing: 1, youtube: 1, qa: 1, projectmgmt: 1 } },
  { label: 'I know the basics', scores: { backend: 1, python: 1, data: 1, marketing: 1, productmgmt: 1 } },
  { label: "I've built things before", scores: { fullstack: 1, devops: 1, cyber: 1, datascience: 1, mobile: 1, ai: 1, crypto: 1, video: 1 } },
]

const LEVEL_FOR_OPTION: Record<string, Level> = {
  "I'm brand new": 'beginner',
  'I know the basics': 'intermediate',
  "I've built things before": 'advanced',
}

const TIME_OPTIONS: { label: string; weeklyHours: number }[] = [
  { label: 'Less than 3 hours', weeklyHours: 2 },
  { label: '3–7 hours', weeklyHours: 5 },
  { label: '7–15 hours', weeklyHours: 10 },
  { label: '15+ hours', weeklyHours: 18 },
]

const QUESTIONS: Question[] = [
  ...INTRO_QUESTIONS,
  { q: 'How much tech experience do you have right now?', options: EXPERIENCE_OPTIONS },
]

function resolveTracks(ids: string[]): (Track | undefined)[] {
  return ids.map((id) => TRACKS.find((t) => t.id === id)).filter(Boolean)
}

function estimateWeeks(trackId: string, weeklyHours: number): number | null {
  const steps = buildGuidedPath(trackId)
  const approxHours = steps.filter((s) => s.type !== 'checkpoint').length * 0.75
  if (!weeklyHours) return null
  return Math.max(1, Math.round(approxHours / weeklyHours))
}

function PaceNote({ trackId, weeklyHours }: { trackId: string; weeklyHours: number | null }) {
  if (!weeklyHours) return null
  const weeks = estimateWeeks(trackId, weeklyHours)
  return (
    <span className="inline-flex items-center gap-1 text-xs text-text-muted">
      <Clock size={11} /> {weeks} week{weeks !== 1 ? 's' : ''} at your pace
    </span>
  )
}

function ResultsList({
  ids,
  reasons,
  weeklyHours,
  onRetake,
  saved,
}: {
  ids: string[]
  reasons?: Record<string, string[]>
  weeklyHours?: number | null
  onRetake?: () => void
  saved?: boolean
}) {
  const tracks = resolveTracks(ids)
  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card max-w-2xl border-teal/30"
    >
      <h3 className="font-editorial text-2xl">{saved ? 'Your saved picks' : 'Your recommended tracks'}</h3>
      <p className="mt-2 text-text-secondary">
        {saved ? 'From your last quiz. Retake it anytime to refresh your results.' : 'Based on your answers, start with one of these paths:'}
      </p>
      <div className="mt-6 space-y-3">
        {tracks.map((track) =>
          track ? (
            <div
              key={track.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-border-default p-4"
              style={{ borderLeftColor: track.colorHex, borderLeftWidth: 3 }}
            >
              <div className="min-w-0">
                <h4 className="font-display font-semibold">{track.name}</h4>
                <p className="text-sm text-text-secondary">{track.tagline}</p>
                {(reasons?.[track.id]?.length ?? 0) > 0 && (
                  <p className="mt-1 text-xs text-text-muted">
                    Matches: {Array.from(new Set(reasons?.[track.id])).slice(0, 2).join(' · ')}
                  </p>
                )}
                {!saved && <PaceNote trackId={track.id} weeklyHours={weeklyHours ?? null} />}
              </div>
              <Link href={`/tracks/${track.slug}`} className="btn btn-primary shrink-0 inline-flex items-center gap-1.5">
                Start This Track <ArrowRight size={16} className="shrink-0" />
              </Link>
            </div>
          ) : null
        )}
      </div>
      {onRetake && (
        <button type="button" className="btn btn-ghost mt-6 inline-flex items-center gap-1.5" onClick={onRetake}>
          <RotateCcw size={14} /> Retake Quiz
        </button>
      )}
    </motion.div>
  )
}

export function TrackQuiz() {
  const [stage, setStage] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [reasons, setReasons] = useState<Record<string, string[]>>({})
  const [level, setLevel] = useState<Level | null>(null)
  const [weeklyHours, setWeeklyHours] = useState<number | null>(null)
  const [timeLabel, setTimeLabel] = useState<string | undefined>(undefined)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const [showSaved, setShowSaved] = useState(() => getProgress().quizResult?.completed ?? false)
  const [submitting, setSubmitting] = useState(false)

  const reset = () => {
    setStage(0)
    setScores({})
    setReasons({})
    setLevel(null)
    setWeeklyHours(null)
    setTimeLabel(undefined)
    setDone(false)
    setShowSaved(false)
  }

  const advance = (option: Option) => {
    if (LEVEL_FOR_OPTION[option.label]) setLevel(LEVEL_FOR_OPTION[option.label])
    if (stage < QUESTIONS.length - 1) {
      setStage(stage + 1)
      return
    }
    // Experience question answered — move to the time question.
    setStage(stage + 1)
  }

  const pick = (option: Option) => {
    if (submitting || done) return
    if (!started) {
      setStarted(true)
      setShowSaved(false)
      trackEvent({ event_name: 'quiz_started', path: '/find-your-path' })
    }

    const nextScores = { ...scores }
    Object.entries(option.scores).forEach(([k, v]) => {
      if (v) nextScores[k] = (nextScores[k] ?? 0) + v
    })
    setScores(nextScores)

    const nextReasons = { ...reasons }
    for (const id of Object.keys(option.scores)) {
      nextReasons[id] = [...(nextReasons[id] ?? []), option.label]
    }
    setReasons(nextReasons)

    advance(option)
  }

  const pickTime = (opt: { label: string; weeklyHours: number }) => {
    if (submitting || done) return
    if (!started) {
      setStarted(true)
      trackEvent({ event_name: 'quiz_started', path: '/find-your-path' })
    }
    setWeeklyHours(opt.weeklyHours)
    setTimeLabel(opt.label)
    finish(scores, reasons, opt.weeklyHours, opt.label, level)
  }

  const finish = (
    finalScores: Record<string, number>,
    finalReasons: Record<string, string[]>,
    hours: number | null,
    time: string | undefined,
    level: Level | null
  ) => {
    setSubmitting(true)
    setDone(true)
    const top = Object.entries(finalScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id)
    try {
      saveQuizResult(top, { level: level ?? undefined, time, weeklyHours: hours ?? undefined })
    } catch { /* localStorage error */ }
    trackQuizCompletion(top, '/find-your-path')
    trackEvent({ event_name: 'recommended_tracks_generated', path: '/find-your-path', quiz_result: top, quiz_level: level ?? '' })
  }

  const results = useMemo(() => {
    if (!done) return { ids: [] as string[], reasons: {} as Record<string, string[]> }
    const ids = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => id)
    return { ids, reasons }
  }, [done, scores, reasons])

  const savedPicks = useMemo(() => {
    const r = getProgress().quizResult
    if (!r?.completed || !r.recommendations?.length) return null
    return r
  }, [showSaved])

  if (showSaved && savedPicks) {
    return (
      <div id="quiz" className="scroll-mt-24 space-y-4">
        <ResultsList ids={savedPicks.recommendations} saved onRetake={reset} />
      </div>
    )
  }

  if (done) {
    return (
      <div id="quiz" className="scroll-mt-24">
        <ResultsList
          ids={results.ids}
          reasons={results.reasons}
          weeklyHours={weeklyHours}
          onRetake={reset}
        />
      </div>
    )
  }

  // Time stage comes after the scored questions.
  const timeStage = stage >= QUESTIONS.length
  const question = timeStage ? null : QUESTIONS[stage]

  return (
    <div id="quiz" className="scroll-mt-24">
      <AnimatePresence mode="wait">
        {timeStage ? (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card max-w-2xl"
          >
            <p className="font-mono text-xs text-text-muted">Last question</p>
            <h3 className="mt-2 font-editorial text-2xl">Roughly how much time can you give each week?</h3>
            <p className="mt-2 text-sm text-text-secondary">We use this to estimate how long each path will take at your pace.</p>
            <div className="mt-6 space-y-3">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => pickTime(opt)}
                  className="flex w-full min-h-[44px] items-center rounded-md border border-border-default px-4 py-3 text-left text-text-primary transition-colors hover:border-teal hover:bg-teal/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card max-w-2xl"
          >
            <p className="font-mono text-xs text-text-muted">
              Question {stage + 1} of {QUESTIONS.length + 1}
            </p>
            <h3 className="mt-2 font-editorial text-2xl">{question?.q}</h3>
            <div className="mt-6 space-y-3">
              {question?.options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => pick(opt)}
                  className="flex w-full min-h-[44px] items-center rounded-md border border-border-default px-4 py-3 text-left text-text-primary transition-colors hover:border-teal hover:bg-teal/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {stage > 0 && (
              <button
                type="button"
                onClick={() => setStage(stage - 1)}
                className="mt-5 text-sm text-text-muted hover:text-text-primary"
              >
                ← Back
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}