'use client'

import { useState } from 'react'
import { Download, Loader2, Printer } from 'lucide-react'

interface CertificateActionsProps {
  trackId: string
  trackName: string
}

export function CertificateActions({ trackId, trackName }: CertificateActionsProps) {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')

  function handlePrint() {
    const previousTitle = document.title
    document.title = `TechSkillHub - ${trackName} Certificate`
    window.print()
    window.setTimeout(() => {
      document.title = previousTitle
    }, 1000)
  }

  async function handleDownload() {
    setError('')
    setDownloading(true)
    try {
      const response = await fetch(`/api/certificate/${encodeURIComponent(trackId)}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Certificate download failed. Please try again.')
      }

      const blob = await response.blob()
      if (blob.type !== 'application/pdf') {
        throw new Error('The server returned an invalid certificate file.')
      }

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `techskillhub-${trackId}-certificate.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'Certificate download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="btn btn-primary text-sm inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
        aria-label={`Download ${trackName} certificate as a PDF`}
      >
        {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {downloading ? 'Preparing PDF…' : 'Download PDF'}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="btn btn-secondary text-sm inline-flex items-center gap-2"
      >
        <Printer size={14} />
        Print Certificate
      </button>
      {error && <p className="w-full text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  )
}
