'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Sparkles, GraduationCap, ArrowRight, Loader2 } from 'lucide-react'
import { PRICING, PLAN_LABEL, PAYMENT_PROVIDER } from '@/lib/pricing'
import type { RegionKey, PlanKey, Currency } from '@/lib/pricing'
import { useToast } from '@/components/ui/toast'

const FEATURES = [
  'Step-by-step guided learning path for this course',
  'Cross-device progress sync — switch devices seamlessly',
  'Quiz checkpoints to verify what you have learned',
  'Certificate of completion',
]

export function PurchaseClient({
  trackId,
  trackName,
  trackSlug,
  region,
  regionLabel,
  currency,
  hasAccess,
  grandfathered,
}: {
  trackId: string
  trackName: string
  trackSlug: string
  region: RegionKey
  regionLabel: string
  currency: Currency
  hasAccess: boolean
  grandfathered: boolean
}) {
  const { toast } = useToast()
  const [tier, setTier] = useState<PlanKey>('threeMonths')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const startPurchase = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: tier, trackId }),
      })
      const data = await res.json()
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        toast(data.error || 'Something went wrong. Please try again.', 'error')
        setLoading(false)
      }
    } catch {
      setError('Unable to connect. Please check your internet and try again.')
      toast('Unable to connect. Please check your internet and try again.', 'error')
      setLoading(false)
    }
  }

  if (hasAccess || grandfathered) {
    return (
      <div className="max-w-md mx-auto py-20 px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md border border-teal/40 bg-teal/10 text-teal">
          <GraduationCap size={28} />
        </div>
        <h1 className="font-editorial text-3xl text-text-primary mb-3">You already have access</h1>
        <p className="text-text-secondary mb-8">
          {grandfathered
            ? 'Your active site-wide plan covers every course. Jump back into the guided path.'
            : `Your purchase covers ${trackName}. Jump back into the guided path.`}
        </p>
        <Link
          href={`/guided-path/${trackId}`}
          className="btn btn-primary inline-flex items-center gap-1.5"
        >
          <GraduationCap size={16} />
          Open Your Learning Path <ArrowRight size={16} />
        </Link>
        <p className="mt-4 text-xs text-text-muted">
          <Link href={`/tracks/${trackSlug}`} className="underline">Back to {trackName}</Link>
        </p>
      </div>
    )
  }

  const regionCfg = PRICING[region]

  return (
    <div className="max-w-4xl mx-auto py-14 px-6">
      <Link
        href={`/tracks/${trackSlug}`}
        className="text-sm text-text-secondary hover:text-text-primary no-underline inline-flex items-center gap-1"
      >
        ← Back to {trackName}
      </Link>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex-1">
          <p className="section-label">UNLOCK THE GUIDED PATH</p>
          <h1 className="font-editorial text-4xl text-text-primary mt-2">
            Get a guided path, not just a list
          </h1>
          <p className="mt-3 text-text-secondary max-w-xl">
            {trackName} becomes a step-by-step course — concepts in the right order, curated
            resources, quiz checkpoints, projects, and progress that syncs across devices.
          </p>

          <ul className="mt-6 space-y-2.5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
                  <Check size={12} strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-text-muted">
            Free access to all tracks, roadmaps, resources, and AI guides continues forever —
            no account needed.
          </p>
        </div>

        <div className="w-full md:w-[22rem]">
          <div className="card p-6">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="font-display font-bold text-text-primary">Choose a plan</h2>
            </div>

            <div className="mt-1 text-xs text-text-muted">
              Pricing shown per course in {currency} — paid securely via {PAYMENT_PROVIDER}.
            </div>

            <div className="mt-5 space-y-3" role="radiogroup" aria-label="Plan">
              {regionCfg.tiers.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTier(t.key)}
                  role="radio"
                  aria-checked={tier === t.key}
                  className={`w-full text-left rounded-md border p-4 transition-colors ${
                    tier === t.key
                      ? 'border-teal bg-teal/5'
                      : 'border-border-default hover:border-teal/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-text-primary">{PLAN_LABEL[t.key]}</span>
                    {t.badge && (
                      <span className={`badge ${t.key === 'yearly' ? 'badge-teal' : 'badge-blue'}`}>
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2 flex-wrap">
                    <span className="font-editorial text-2xl text-text-primary">{t.priceLabel}</span>
                    {t.regularLabel && (
                      <span className="text-sm text-text-muted line-through">{t.regularLabel}</span>
                    )}
                    {t.discount && <span className="text-xs text-teal">{t.discount}</span>}
                  </div>
                </button>
              ))}
            </div>

            {error && <p className="mt-3 text-sm text-[var(--color-error)]">{error}</p>}

            <button
              type="button"
              onClick={startPurchase}
              disabled={loading}
              className="btn btn-primary w-full justify-center mt-5 inline-flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Redirecting to Paystack...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Start the Guided Path <ArrowRight size={16} />
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-text-muted">
              Secure checkout via Paystack. Cancel-free, one-time purchase per course.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}