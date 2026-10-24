'use client'

import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'

/**
 * Starts a checkout on the server. The button is a thin shell: all prices,
 * eligibility and provider selection are resolved server-side. It never grants
 * access — only a verified webhook does. When checkout is disabled the server
 * returns 503 and we show a gentle "coming soon" message.
 */
export function CheckoutButton({
  planId,
  trackId,
  label,
  className,
}: {
  planId: 'TRACK_PASS' | 'PRO_MONTHLY' | 'PRO_ANNUAL'
  trackId?: string
  label: string
  className?: string
}) {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const start = async () => {
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, trackId }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.url) {
        window.location.href = data.url
        return
      }
      if (res.status === 503) {
        setMessage('Checkout is coming soon.')
      } else if (res.status === 401) {
        setMessage('Please sign in to continue.')
      } else {
        setMessage(data?.error || 'We could not start checkout. Please try again.')
      }
    } catch {
      setMessage('We could not start checkout. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-2">
      <button type="button" onClick={start} disabled={busy} className={className ?? 'btn btn-primary inline-flex items-center gap-1.5'}>
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
        {label}
      </button>
      {message && <span className="text-xs text-text-muted">{message}</span>}
    </span>
  )
}
