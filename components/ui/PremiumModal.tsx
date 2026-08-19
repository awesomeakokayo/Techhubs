'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { X, Sparkles, Check, GraduationCap, Smartphone, ArrowRight } from 'lucide-react'

const FEATURES = [
  { icon: GraduationCap, text: 'Step-by-step guided learning path for this course' },
  { icon: Smartphone, text: 'Cross-device progress sync — switch devices seamlessly' },
  { icon: Sparkles, text: 'Quiz checkpoints to verify what you have learned' },
]

export function PremiumModal({
  open,
  onClose,
  trackId,
  trackName,
}: {
  open: boolean
  onClose: () => void
  trackId: string
  trackName?: string
}) {
  const { data: session } = useSession()
  if (!open) return null

  const purchaseHref = session ? `/purchase/${trackId}` : `/login?next=/purchase/${trackId}`

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Unlock the guided path">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-md border border-accent/30 bg-surface p-6 md:p-8 shadow-2xl animate-in-scale">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text-primary"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent mb-4">
          <Sparkles size={24} />
        </div>

        <h2 className="text-xl font-display font-bold text-text-primary">Unlock the Guided Path</h2>

        {trackName && (
          <p className="mt-2 text-sm text-text-secondary">
            Get a structured, step-by-step learning experience for <strong className="text-text-primary">{trackName}</strong> — with quizzes, projects, and progress that follows you across devices.
          </p>
        )}

        <ul className="mt-6 space-y-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <li key={f.text} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
                  <Check size={12} strokeWidth={3} />
                </span>
                {f.text}
              </li>
            )
          })}
        </ul>

        <div className="mt-6 rounded-md border border-border-default bg-elevated p-4">
          <p className="text-xs text-text-muted font-mono uppercase tracking-wider">Per course, from</p>
          <div className="mt-1 flex items-baseline gap-3 flex-wrap">
            <p className="text-2xl font-display font-bold text-text-primary">
              $4.99<span className="text-sm text-text-secondary font-body">/month</span>
            </p>
            <span className="text-text-muted">or</span>
            <p className="text-xl font-display font-semibold text-text-primary">
              ₦2,450<span className="text-sm text-text-secondary font-body">/month</span>
            </p>
          </div>
          <p className="text-xs text-text-muted mt-2">
            <strong className="text-text-primary">3 months</strong> $9.99 / ₦5,145 &middot; <strong className="text-text-primary">Yearly</strong> $29.99 / ₦14,700 — with discount badges applied at checkout.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={purchaseHref}
            className="btn btn-primary w-full justify-center inline-flex items-center gap-1.5"
            onClick={onClose}
          >
            <Sparkles size={16} />
            {session ? 'Choose a Plan' : 'Sign In to Unlock'} <ArrowRight size={16} />
          </Link>
          <p className="text-xs text-center text-text-muted">
            Free access to all tracks, roadmaps, and resources continues forever.
          </p>
        </div>
      </div>
    </div>
  )
}