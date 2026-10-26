'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { track } from '@vercel/analytics'
import type { PlanId } from '@/lib/commercial/plans'
import { ArrowRight, Loader2 } from 'lucide-react'

const ATTRIBUTION_STORAGE_KEY = 'tsh_checkout_attribution_v1'
const CLIENT_UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

function collectCheckoutAttribution(): Record<string, string> | null {
  try {
    const params = new URLSearchParams(window.location.search)
    const current: Record<string, string> = {}
    for (const key of CLIENT_UTM_KEYS) {
      const value = params.get(key)?.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 120)
      if (value) current[{ utm_source: 'utmSource', utm_medium: 'utmMedium', utm_campaign: 'utmCampaign', utm_content: 'utmContent', utm_term: 'utmTerm' }[key]] = value
    }

    const storedRaw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    const stored = storedRaw ? JSON.parse(storedRaw) as Record<string, unknown> : {}
    const result: Record<string, string> = {}
    const mapping = {
      utm_source: 'utmSource',
      utm_medium: 'utmMedium',
      utm_campaign: 'utmCampaign',
      utm_content: 'utmContent',
      utm_term: 'utmTerm',
    } as const
    for (const [queryKey, targetKey] of Object.entries(mapping) as [keyof typeof mapping, (typeof mapping)[keyof typeof mapping]][]) {
      const storedValue = stored[targetKey] ?? stored[queryKey]
      const value = (typeof storedValue === 'string' ? storedValue.slice(0, 120) : '') || current[targetKey] || ''
      if (value) result[targetKey] = value
    }

    const landingPath = typeof stored.landingPath === 'string' ? stored.landingPath : window.location.pathname
    if (landingPath.startsWith('/') && !landingPath.startsWith('//')) result.landingPath = landingPath.split('?')[0].split('#')[0]
    const referrerHost = typeof stored.referrerHost === 'string' ? stored.referrerHost : ''
    if (referrerHost) result.referrerHost = referrerHost.slice(0, 200)

    return Object.keys(result).length ? result : null
  } catch {
    return null
  }
}

/**
 * Starts checkout through the server. Prices, eligibility and provider selection
 * stay server-controlled; access is granted only after verified payment.
 * If sign-in is required, the learner returns to pricing and checkout resumes
 * automatically instead of asking them to find and click the plan a second time.
 */
export function CheckoutButton({
  planId,
  trackId,
  trackOptions,
  label,
  className,
  disabled = false,
  disabledReason,
  autoStart = false,
  resumePath = '/pricing',
  expectedPricingVersion,
}: {
  planId: PlanId
  trackId?: string
  trackOptions?: Array<{ id: string; name: string }>
  label: string
  className?: string
  disabled?: boolean
  disabledReason?: string
  autoStart?: boolean
  resumePath?: string
  expectedPricingVersion?: string
}) {
  const [busy, setBusy] = useState(false)
  const [selectedTrackId, setSelectedTrackId] = useState(trackId ?? trackOptions?.[0]?.id ?? '')
  const [message, setMessage] = useState<string | null>(null)
  const { status } = useSession()
  const autoStartAttempted = useRef(false)
  const messageId = `checkout-message-${planId}`

  const start = useCallback(async () => {
    if (disabled || busy) {
      if (disabled && disabledReason) setMessage(disabledReason)
      return
    }

    const chosenTrackId = trackId ?? selectedTrackId
    if (planId === 'TRACK_PASS' && !chosenTrackId) {
      setMessage('Choose a track before continuing.')
      return
    }

    setBusy(true)
    setMessage(null)
    track('pricing_plan_selected', { planId })
    track('pricing_cta_clicked', { planId })
    track('checkout_start_clicked', { planId })

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, trackId: chosenTrackId, ...(expectedPricingVersion ? { expectedPricingVersion } : {}), attribution: collectCheckoutAttribution() }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && typeof data?.url === 'string') {
        track('checkout_started', { planId })
        track('checkout_redirect', { planId })
        window.location.href = data.url
        return
      }

      if (res.status === 401) {
        track('checkout_sign_in_required', { planId })
        const params = new URLSearchParams({ resumeCheckout: planId })
        if (chosenTrackId) params.set('trackId', chosenTrackId)
        if (expectedPricingVersion) params.set('expectedPricingVersion', expectedPricingVersion)
        await signIn('google', { callbackUrl: `${resumePath}?${params.toString()}#plans` })
        return
      }

      track('checkout_start_failed', { planId, status: String(res.status) })
      if (data?.code === 'PRICE_CHANGED' || res.status === 409) {
        setMessage(data?.error || 'The offer has ended or the price changed. Review the current price before continuing.')
      } else if (res.status === 503) {
        setMessage('Checkout is not available yet. No payment has been taken.')
      } else {
        setMessage(data?.error || 'We could not start checkout. Please try again.')
      }
    } catch {
      track('checkout_start_failed', { planId, status: 'network_error' })
      setMessage('We could not start checkout. Please try again.')
    } finally {
      setBusy(false)
    }
  }, [busy, disabled, disabledReason, expectedPricingVersion, planId, resumePath, selectedTrackId, trackId])

  useEffect(() => {
    if (!autoStart || status !== 'authenticated' || disabled || autoStartAttempted.current) return
    autoStartAttempted.current = true
    void start()
  }, [autoStart, disabled, start, status])

  const visibleMessage = message ?? (disabled ? disabledReason : null)

  return (
    <span className="inline-flex min-w-0 flex-col items-start gap-2">
      {planId === 'TRACK_PASS' && !trackId && (trackOptions?.length ?? 0) > 0 && (
        <label className="flex w-full flex-col gap-1 text-xs text-text-secondary">
          Choose a track
          <select
            value={selectedTrackId}
            onChange={(event) => setSelectedTrackId(event.target.value)}
            disabled={busy || disabled}
            className="w-full rounded-md border border-border-default bg-surface px-3 py-2 text-sm text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {trackOptions!.map((track) => <option key={track.id} value={track.id}>{track.name}</option>)}
          </select>
        </label>
      )}
      <button
        type="button"
        onClick={() => void start()}
        disabled={busy || disabled}
        aria-describedby={visibleMessage ? messageId : undefined}
        className={`${className ?? 'btn btn-primary inline-flex items-center gap-1.5'} disabled:cursor-not-allowed disabled:opacity-55`}
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
        {label}
      </button>
      {visibleMessage && (
        <span id={messageId} role={message ? 'alert' : 'status'} className="text-xs leading-relaxed text-text-muted">
          {visibleMessage}
        </span>
      )}
    </span>
  )
}
