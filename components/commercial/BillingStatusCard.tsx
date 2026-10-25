'use client'

import { useCallback, useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, Clock, Loader2, Sparkles, XCircle } from 'lucide-react'

interface EntitlementsResponse {
  tier: 'FREE' | 'PASS' | 'PRO'
  hasAllPremiumTracks: boolean
  ownedTrackIds: string[]
  grandfathered: boolean
  grandfatheredUntil: string | null
  subscriptionStatus: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
  trackPasses?: Array<{
    trackId: string
    status: 'ACTIVE' | 'EXPIRED' | 'REVOKED'
    startedAt: string | null
    expiresAt: string
    active: boolean
  }>
  assessments: { used: number; reserved?: number; remaining?: number; allowance: number; enforced: boolean }
  checkoutEnabled: boolean
  pricesApproved: boolean
}

const TIER_LABEL: Record<string, string> = {
  FREE: 'Free',
  PASS: 'Track Pass',
  PRO: 'TechSkillHub Pro',
}

/** Render a track id as a readable label without importing the catalogue. */
function humanizeTrackId(trackId: string): string {
  return trackId
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** Show the exact expiry date in UTC so it never shifts with the local timezone. */
function formatUtcDate(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? iso : date.toISOString().slice(0, 10)
}

/**
 * Server-derived plan, allowance and renewal status. The client can request a
 * cancellation, but the displayed state always comes from the server.
 */
export function BillingStatusCard() {
  const [data, setData] = useState<EntitlementsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/billing/entitlements')
      if (res.ok) setData(await res.json())
    } catch {
      /* leave loading state */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const cancel = async () => {
    if (!window.confirm('Cancel your subscription? Access continues until the end of the current billing period.')) return
    setCancelling(true)
    setMessage(null)
    try {
      const res = await fetch('/api/billing/cancel', { method: 'POST' })
      const body = await res.json().catch(() => ({}))
      if (res.ok) {
        setMessage('Subscription cancelled. You keep access until the period ends.')
        await load()
      } else {
        setMessage(body?.error || 'We could not cancel your subscription.')
      }
    } catch {
      setMessage('We could not cancel your subscription.')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 text-text-muted text-sm"><Loader2 size={14} className="animate-spin" /> Loading your plan…</div>
      </div>
    )
  }
  if (!data) return null

  const isPro = data.tier === 'PRO'
  const showRenewal = isPro && data.currentPeriodEnd && !data.grandfathered

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium text-text-muted">Plan</h2>
          <p className="mt-1 text-text-primary font-medium">{TIER_LABEL[data.tier] ?? data.tier}</p>
          {(data.trackPasses?.length ?? 0) > 0 && (
            <div className="mt-2 space-y-1">
              {data.trackPasses!.map((pass) => (
                <p key={`${pass.trackId}-${pass.expiresAt}`} className="text-xs text-text-secondary">
                  Track Pass — <span className="text-text-primary">{humanizeTrackId(pass.trackId)}</span>:{' '}
                  {pass.active ? (
                    <>access until <span className="font-mono">{formatUtcDate(pass.expiresAt)}</span> (no auto-renewal)</>
                  ) : (
                    <>
                      <span className="text-text-muted">
                        {pass.status === 'REVOKED' ? 'revoked' : 'expired'} {formatUtcDate(pass.expiresAt)}
                      </span>{' '}
                      <a href="/pricing" className="text-teal no-underline hover:underline">renew</a>
                    </>
                  )}
                </p>
              ))}
            </div>
          )}
          {data.grandfathered && (
            <p className="mt-1 text-xs text-text-secondary">
              Full access retained during the transition{data.grandfatheredUntil ? ` until ${new Date(data.grandfatheredUntil).toLocaleDateString()}` : ''}.
            </p>
          )}
          {showRenewal && (
            <p className="mt-1 text-xs text-text-secondary">
              {data.cancelAtPeriodEnd ? `Access ends ${new Date(data.currentPeriodEnd!).toLocaleDateString()}` : `Renews ${new Date(data.currentPeriodEnd!).toLocaleDateString()}`}
            </p>
          )}
        </div>
        {data.subscriptionStatus === 'ACTIVE' ? <CheckCircle2 size={20} className="text-teal" /> : data.subscriptionStatus === 'PAST_DUE' ? <AlertTriangle size={20} className="text-amber-500" /> : data.subscriptionStatus && data.subscriptionStatus !== 'NONE' ? <XCircle size={20} className="text-text-muted" /> : <Clock size={20} className="text-text-muted" />}
      </div>

      <div className="mt-4 rounded-md border border-border-subtle p-3">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">AI project assessments</p>
        <p className="mt-1 text-sm text-text-primary">
          <span className="font-mono">{data.assessments.used}</span> of <span className="font-mono">{data.assessments.allowance}</span> used this month
          {' · '}
          <span className="font-mono">{data.assessments.remaining ?? Math.max(0, data.assessments.allowance - data.assessments.used)}</span> remaining
        </p>
        {(data.assessments.remaining ?? data.assessments.allowance - data.assessments.used) <= 0 && (
          <p className="mt-1 text-xs text-text-secondary">You have reached this month&apos;s included assessments. They reset next month.</p>
        )}
      </div>

      {data.tier !== 'PRO' && (
        <a href="/pricing" className="btn btn-secondary mt-4 inline-flex items-center gap-1.5 text-sm">
          <Sparkles size={14} /> See plans
        </a>
      )}
      {isPro && !data.cancelAtPeriodEnd && data.subscriptionStatus === 'ACTIVE' && (
        <button type="button" onClick={cancel} disabled={cancelling} className="btn btn-secondary mt-4 text-sm">
          {cancelling ? 'Cancelling…' : 'Cancel subscription'}
        </button>
      )}
      {message && <p className="mt-3 text-xs text-text-secondary">{message}</p>}
    </div>
  )
}
