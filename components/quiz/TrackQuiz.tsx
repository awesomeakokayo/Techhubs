'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { TRACKS } from '@/lib/tracks'
import { saveQuizResult } from '@/lib/progress'
import { trackEvent, trackQuizCompletion } from '@/lib/analytics'

const QUESTIONS = [
  {
    q: 'What sounds most exciting to you?',
    options: [
      { label: 'Building things users can see and click', scores: { frontend: 3, fullstack: 2, mobile: 2 } },
      { label: 'Logic, data, and systems behind the scenes', scores: { backend: 3, python: 2, data: 2 } },
      { label: 'Making things look beautiful and intuitive', scores: { uiux: 3, frontend: 1, writing: 1 } },
      { label: 'Understanding and protecting systems', scores: { cyber: 3, devops: 2, qa: 1 } },
      { label: 'Creating content or growing an audience', scores: { youtube: 3, marketing: 3, video: 2 } },
    ],
  },
  {
    q: 'How do you prefer to work?',
    options: [
      { label: 'Visually — layouts and colors', scores: { uiux: 3, frontend: 2, video: 1 } },
      { label: 'Analytically — logic and patterns', scores: { backend: 2, data: 3, datascience: 2 } },
      { label: 'Creatively — stories and experiences', scores: { uiux: 2, video: 2, writing: 2 } },
      { label: 'Strategically — systems and plans', scores: { devops: 2, marketing: 2, fullstack: 1 } },
    ],
  },
  {
    q: "What's your goal?",
    options: [
      { label: 'Get a job at a tech company', scores: { frontend: 2, backend: 2, fullstack: 2, data: 1 } },
      { label: 'Build my own products', scores: { fullstack: 3, python: 2, nocode: 2 } },
      { label: 'Freelance and work independently', scores: { frontend: 2, uiux: 2, marketing: 2 } },
      { label: 'Understand tech enough to lead', scores: { qa: 1, data: 2, writing: 2, ai: 1 } },
    ],
  },
]

export function TrackQuiz() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  const pick = (optionScores: Record<string, number | undefined>) => {
    if (!started) {
      setStarted(true)
      trackEvent({ event_name: 'quiz_started', path: '/start-here' })
    }
    const next = { ...scores }
    Object.entries(optionScores).forEach(([k, v]) => {
      if (v) next[k] = (next[k] ?? 0) + v
    })
    setScores(next)
    if (step < QUESTIONS.length - 1) setStep(step + 1)
    else {
      setDone(true)
      const top = Object.entries(next)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id]) => id)
      saveQuizResult(top)
      trackQuizCompletion(top, '/start-here')
      trackEvent({ event_name: 'recommended_tracks_generated', path: '/start-here', quiz_result: top })
    }
  }

  const recommendations = done
    ? Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id]) => TRACKS.find((t) => t.id === id))
        .filter(Boolean)
    : []

  return (
    <div id="quiz" className="scroll-mt-24">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card max-w-2xl"
          >
            <p className="font-mono text-xs text-text-muted">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold">{QUESTIONS[step].q}</h3>
            <div className="mt-6 space-y-3">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => pick(opt.scores)}
                  className="flex w-full min-h-[44px] items-center rounded-lg border border-border-default px-4 py-3 text-left text-text-primary transition-colors hover:border-teal hover:bg-teal/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl border-teal/30"
          >
            <h3 className="font-display text-xl font-bold">Your recommended tracks</h3>
            <p className="mt-2 text-text-secondary">Based on your answers, start with one of these paths:</p>
            <div className="mt-6 space-y-3">
              {recommendations.map((track) =>
                track ? (
                  <div
                    key={track.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-default p-4"
                    style={{ borderLeftColor: track.colorHex, borderLeftWidth: 3 }}
                  >
                    <div>
                      <h4 className="font-display font-semibold">{track.name}</h4>
                      <p className="text-sm text-text-secondary">{track.tagline}</p>
                    </div>
                    <Link href={`/tracks/${track.slug}`} className="btn btn-primary shrink-0">
                      Start This Track →
                    </Link>
                  </div>
                ) : null
              )}
            </div>
            <button type="button" className="btn btn-ghost mt-6" onClick={() => { setDone(false); setStep(0); setScores({}) }}>
              Retake Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
