'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { track } from '@vercel/analytics'
import { ArrowRight, Loader2 } from 'lucide-react'

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
}: {
  planId: 'TRACK_PASS' | 'PRO_MONTHLY' | 'PRO_ANNUAL'
  trackId?: string
  trackOptions?: Array<{ id: string; name: string }>
  label: string
  className?: string
  disabled?: boolean
  disabledReason?: string
  autoStart?: boolean
  resumePath?: string
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
    track('checkout_start_clicked', { planId })

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, trackId: chosenTrackId }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && typeof data?.url === 'string') {
        track('checkout_redirect', { planId })
        window.location.href = data.url
        return
      }

      if (res.status === 401) {
        track('checkout_sign_in_required', { planId })
        const params = new URLSearchParams({ resumeCheckout: planId })
        if (chosenTrackId) params.set('trackId', chosenTrackId)
        await signIn('google', { callbackUrl: `${resumePath}?${params.toString()}#plans` })
        return
      }

      track('checkout_start_failed', { planId, status: String(res.status) })
      if (res.status === 503) {
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
  }, [busy, disabled, disabledReason, planId, resumePath, selectedTrackId, trackId])

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
