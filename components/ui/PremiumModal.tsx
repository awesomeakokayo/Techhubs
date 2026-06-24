'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { X, Sparkles, Check, GraduationCap, Smartphone, ArrowRight } from 'lucide-react'

const FEATURES = [
  { icon: GraduationCap, text: 'Step-by-step guided learning path for every track' },
  { icon: Smartphone, text: 'Cross-device progress sync — switch devices seamlessly' },
  { icon: Sparkles, text: 'Quiz checkpoints to verify what you have learned' },
]

export function PremiumModal({ open, onClose, trackName }: { open: boolean; onClose: () => void; trackName?: string }) {
  const { data: session } = useSession()
  if (!open) return null

  const upgradeHref = session ? '/upgrade' : '/login?next=/upgrade'

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Upgrade to premium">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-accent/30 bg-surface p-6 md:p-8 shadow-2xl animate-in-scale">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text-primary"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
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
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Check size={12} strokeWidth={3} />
                </span>
                {f.text}
              </li>
            )
          })}
        </ul>

        <div className="mt-6 rounded-xl border border-border-default bg-elevated p-4">
          <p className="text-xs text-text-muted font-mono uppercase tracking-wider">Starting from</p>
          <p className="text-2xl font-display font-bold text-text-primary mt-1">
            ₦2,450<span className="text-sm text-text-secondary font-body">/month</span>
          </p>
          <p className="text-xs text-text-muted mt-1">
            <strong className="text-text-primary">₦5,145/3 months</strong> (30% off) &middot; <strong className="text-text-primary">₦14,700/year</strong> (50% off)
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={upgradeHref}
            className="btn btn-primary w-full justify-center inline-flex items-center gap-1.5"
            onClick={onClose}
          >
            <Sparkles size={16} />
            {session ? 'Upgrade Now' : 'Sign In to Upgrade'} <ArrowRight size={16} />
          </Link>
          <p className="text-xs text-center text-text-muted">
            Free access to all tracks, roadmaps, and resources continues forever.
          </p>
        </div>
      </div>
    </div>
  )
}
