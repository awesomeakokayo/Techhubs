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
  trackOptions,
  label,
  className,
}: {
  planId: 'TRACK_PASS' | 'PRO_MONTHLY' | 'PRO_ANNUAL'
  trackId?: string
  trackOptions?: Array<{ id: string; name: string; termMonths: number; timeEstimate: string }>
  label: string
  className?: string
}) {
  const [busy, setBusy] = useState(false)
  const [selectedTrackId, setSelectedTrackId] = useState(trackId ?? trackOptions?.[0]?.id ?? '')
  const [message, setMessage] = useState<string | null>(null)
  const selectedTrack = trackOptions?.find((track) => track.id === (trackId ?? selectedTrackId))

  const start = async () => {
    const chosenTrackId = trackId ?? selectedTrackId
    if (planId === 'TRACK_PASS' && !chosenTrackId) {
      setMessage('Choose a track before continuing.')
      return
    }
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, trackId: chosenTrackId }),
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
      {planId === 'TRACK_PASS' && !trackId && (trackOptions?.length ?? 0) > 0 && (
        <label className="flex w-full flex-col gap-1 text-xs text-text-secondary">
          Choose a track
          <select
            value={selectedTrackId}
            onChange={(event) => setSelectedTrackId(event.target.value)}
            disabled={busy}
            className="w-full rounded-md border border-border-default bg-surface px-3 py-2 text-sm text-text-primary"
          >
            {trackOptions!.map((track) => <option key={track.id} value={track.id}>{track.name} — {track.termMonths} months (estimated {track.timeEstimate})</option>)}
          </select>
        </label>
      )}
      {planId === 'TRACK_PASS' && selectedTrack && (
        <p className="max-w-sm text-xs text-text-muted">
          Access term: {selectedTrack.termMonths} calendar months. Published track estimate: {selectedTrack.timeEstimate}.
        </p>
      )}
      <button type="button" onClick={start} disabled={busy} className={className ?? 'btn btn-primary inline-flex items-center gap-1.5'}>
        {busy ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
        {label}
      </button>
      {message && <span className="text-xs text-text-muted">{message}</span>}
    </span>
  )
}
