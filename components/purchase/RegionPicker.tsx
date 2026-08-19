'use client'

import { useState } from 'react'
import type { RegionKey } from '@/lib/pricing'

export function RegionPicker({
  value,
  onChange,
  compact,
}: {
  value: RegionKey
  onChange: (region: RegionKey) => void
  compact?: boolean
}) {
  const [busy, setBusy] = useState(false)

  const select = async (region: RegionKey) => {
    if (region === value || busy) return
    setBusy(true)
    try {
      await fetch('/api/region', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region }),
      })
      onChange(region)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={`inline-flex items-center gap-1 rounded-md border border-border-default bg-elevated p-1 ${compact ? '' : ''}`}>
      <button
        type="button"
        disabled={busy}
        onClick={() => select('ng')}
        className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          value === 'ng'
            ? 'bg-teal text-text-inverse'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        Nigeria (₦)
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => select('intl')}
        className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          value === 'intl'
            ? 'bg-teal text-text-inverse'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        International ($)
      </button>
    </div>
  )
}