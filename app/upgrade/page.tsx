'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export default function UpgradePage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  const subscribe = async (plan: 'monthly' | 'yearly') => {
    setLoading(plan)
    setError('')
    const res = await fetch('/api/payments/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    const data = await res.json()
    if (data.authorizationUrl) {
      window.location.href = data.authorizationUrl
    } else {
      setError(data.error || 'Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 text-center">
      <p className="section-label justify-center">UPGRADE</p>
      <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-3">
        Get a Guided Path, Not Just a List
      </h1>
      <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-12">
        One clear next step at a time. Progress saved to your account &mdash;
        switch devices and pick up exactly where you left off.
      </p>

      {error && (
        <p className="text-[var(--color-error)] text-sm mb-6">{error}</p>
      )}

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="card text-left">
          <h3 className="text-lg font-display font-semibold text-[var(--text-primary)]">Monthly</h3>
          <p className="text-3xl font-display font-bold text-[var(--text-primary)] mt-2">
            ₦2,450<span className="text-sm text-[var(--text-secondary)] font-body">/month</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> Cross-device sync</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> Guided sequential path</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> Quiz checkpoints</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> Cancel anytime</li>
          </ul>
          <button
            onClick={() => subscribe('monthly')}
            disabled={loading === 'monthly'}
            className="btn btn-secondary w-full mt-6 justify-center"
          >
            {loading === 'monthly' ? 'Redirecting...' : 'Choose Monthly'}
          </button>
        </div>

        <div className="card text-left border-[var(--accent-primary-border)] relative">
          <span className="badge badge-teal absolute -top-3 right-4">BEST VALUE</span>
          <h3 className="text-lg font-display font-semibold text-[var(--text-primary)]">Yearly</h3>
          <p className="text-3xl font-display font-bold text-[var(--text-primary)] mt-2">
            ₦14,700<span className="text-sm text-[var(--text-secondary)] font-body">/year</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> Everything in Monthly</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> <strong>50% off</strong> — save ₦14,700/year</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> Priority access to new tracks</li>
          </ul>
          <button
            onClick={() => subscribe('yearly')}
            disabled={loading === 'yearly'}
            className="btn btn-primary w-full mt-6 justify-center"
          >
            {loading === 'yearly' ? 'Redirecting...' : 'Choose Yearly'}
          </button>
        </div>
      </div>

      <p className="text-[var(--text-muted)] text-sm mt-10">
        Free access to all tracks, roadmaps, and resources continues forever &mdash; no account needed.
        This upgrade unlocks the Guided Path and cross-device progress sync.
      </p>
    </div>
  )
}
