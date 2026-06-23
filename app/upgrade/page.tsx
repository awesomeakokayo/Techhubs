'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check, Sparkles, ArrowRight, HelpCircle } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

const FAQS = [
  { q: 'What is the Guided Path?', a: 'A step-by-step sequential learning experience for each track. Instead of browsing resources on your own, you get a curated path with concepts, resources, quizzes, and projects in the right order.' },
  { q: 'What happens to my free access?', a: 'Nothing changes. All tracks, roadmaps, resources, and AI guides remain completely free forever. The subscription only unlocks the Guided Path and cross-device sync.' },
  { q: 'Can I cancel anytime?', a: 'Yes. You can cancel from the Account page. Your access continues until the end of the current billing period.' },
  { q: 'How does cross-device sync work?', a: 'When you sign in, your progress is saved to your account. Pick up on any device — phone, laptop, tablet — exactly where you left off.' },
  { q: 'Is there a free trial?', a: 'There is no trial, but you can explore all tracks and resources for free. Upgrade only when you are ready for a structured path.' },
  { q: 'What payment methods are accepted?', a: 'Paystack processes all payments. Cards, bank transfers, and mobile money (Nigeria) are supported.' },
]

export default function UpgradePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?next=/upgrade')
    }
  }, [status, router])

  const subscribe = async (plan: 'monthly' | 'threeMonths' | 'yearly') => {
    if (status !== 'authenticated' || !session?.user) {
      router.push('/login?next=/upgrade')
      return
    }
    setLoading(plan)
    setError('')
    try {
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
        toast(data.error || 'Something went wrong. Please try again.', 'error')
        setLoading(null)
      }
    } catch {
      setError('Unable to connect. Please check your internet and try again.')
      toast('Unable to connect. Please check your internet and try again.', 'error')
      setLoading(null)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-text-secondary text-lg">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-text-secondary">Redirecting to sign in...</div>
      </div>
    )
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

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
            {loading === 'monthly' ? 'Redirecting to Paystack...' : 'Choose Monthly'}
          </button>
        </div>

        <div className="card text-left border-[var(--accent-primary-border)] relative">
          <span className="badge badge-teal absolute -top-3 right-4">30% OFF</span>
          <h3 className="text-lg font-display font-semibold text-[var(--text-primary)]">3 Months</h3>
          <p className="text-3xl font-display font-bold text-[var(--text-primary)] mt-2">
            ₦5,145<span className="text-sm text-[var(--text-secondary)] font-body">/3 months</span>
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1 line-through">₦7,350</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> Everything in Monthly</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> <strong>30% off</strong> — save ₦2,205</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-[var(--accent-primary)]" /> 3 months of guided learning</li>
          </ul>
          <button
            onClick={() => subscribe('threeMonths')}
            disabled={loading === 'threeMonths'}
            className="btn btn-primary w-full mt-6 justify-center"
          >
            {loading === 'threeMonths' ? 'Redirecting to Paystack...' : 'Choose 3 Months'}
          </button>
        </div>

        <div className="card text-left relative">
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
            className="btn btn-secondary w-full mt-6 justify-center"
          >
            {loading === 'yearly' ? 'Redirecting to Paystack...' : 'Choose Yearly'}
          </button>
        </div>
      </div>

      <p className="text-[var(--text-muted)] text-sm mt-10">
        Free access to all tracks, roadmaps, and resources continues forever &mdash; no account needed.
        This upgrade unlocks the Guided Path and cross-device progress sync.
      </p>

      {/* FAQ */}
      <section className="mt-20 max-w-2xl mx-auto text-left">
        <h2 className="text-xl font-display font-bold text-[var(--text-primary)] text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="card py-4 px-5">
              <button
                type="button"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="font-medium text-[var(--text-primary)] text-sm">{faq.q}</span>
                <HelpCircle
                  size={16}
                  className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                    faqOpen === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {faqOpen === i && (
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
