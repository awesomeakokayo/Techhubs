'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Check, Share2 } from 'lucide-react'
import { trackContentFeedback, trackShare } from '@/lib/analytics'

const NO_REASONS = [
  'Too basic',
  'Too advanced',
  'Missing information',
  'Unclear explanation',
  'Outdated',
  'Broken resource',
  'Other',
]

interface ContentFeedbackProps {
  path: string
  contentType?: string
}

export function ContentFeedback({ path, contentType }: ContentFeedbackProps) {
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const [reason, setReason] = useState<string | null>(null)
  const [detail, setDetail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function share() {
    const text = `I found this useful on TechSkillHub: ${typeof window !== 'undefined' ? window.location.href : ''}`
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text, url: typeof window !== 'undefined' ? window.location.href : '' })
        trackShare({ path, content_type: contentType, network: 'native' })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '')
        trackShare({ path, content_type: contentType, network: 'copy' })
        setSubmitted(true)
      }
    } catch {
      // user cancelled share — do nothing
    }
  }

  if (submitted && helpful) {
    return (
      <div className="panel mt-10" aria-live="polite">
        <p className="font-display text-lg text-text-primary">
          Glad it helped. Would you recommend this resource?
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={share} className="btn btn-secondary text-sm">
            <Share2 size={15} /> Share this resource
          </button>
          <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
            <Check size={15} className="text-teal" /> Thanks for the feedback
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="panel mt-10" aria-live="polite">
      <p className="font-display text-lg text-text-primary">Was this helpful?</p>
      {helpful === null && (
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            className="btn btn-secondary text-sm"
            onClick={() => {
              setHelpful(true)
              trackContentFeedback({ path, content_type: contentType, helpful: true })
            }}
          >
            <ThumbsUp size={15} /> Yes
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm"
            onClick={() => setHelpful(false)}
          >
            <ThumbsDown size={15} /> No
          </button>
        </div>
      )}

      {helpful === true && !submitted && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={share} className="btn btn-primary text-sm">
            <Share2 size={15} /> Share this resource
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm"
            onClick={() => setSubmitted(true)}
          >
            No thanks
          </button>
        </div>
      )}

      {helpful === false && (
        <div className="mt-4 max-w-lg">
          <p className="text-sm font-medium text-text-primary">What was missing?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {NO_REASONS.map((r) => (
              <button
                key={r}
                type="button"
                className={`badge cursor-pointer ${reason === r ? 'badge-teal' : 'border border-border-default text-text-secondary'}`}
                onClick={() => {
                  setReason(r)
                  trackContentFeedback({ path, content_type: contentType, helpful: false, reason: r })
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <textarea
            aria-label="Additional feedback"
            className="mt-4 w-full rounded-md border border-border-default bg-surface p-3 text-sm text-text-primary"
            rows={3}
            placeholder="Anything we should add or fix? (optional)"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              className="btn btn-primary text-sm"
              onClick={() => {
                trackContentFeedback({
                  path,
                  content_type: contentType,
                  helpful: false,
                  reason: reason ?? undefined,
                  detail: detail.trim() || undefined,
                })
                setSubmitted(true)
              }}
            >
              Submit feedback
            </button>
            <button
              type="button"
              className="btn btn-secondary text-sm"
              onClick={() => setHelpful(null)}
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {submitted && !helpful && (
        <p className="mt-4 text-sm text-text-muted">
          <Check size={15} className="mr-1 inline text-teal" /> Thanks — your feedback helps us improve
          this page for other learners.
        </p>
      )}
    </div>
  )
}