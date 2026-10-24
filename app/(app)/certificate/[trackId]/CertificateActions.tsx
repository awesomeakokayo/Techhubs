'use client'

import { Download, Printer } from 'lucide-react'

interface CertificateActionsProps {
  trackId: string
  trackName: string
}

export function CertificateActions({ trackId, trackName }: CertificateActionsProps) {
  function handlePrint() {
    const previousTitle = document.title
    document.title = `TechSkillHub - ${trackName} Certificate`
    window.print()
    window.setTimeout(() => {
      document.title = previousTitle
    }, 1000)
  }

  const downloadUrl = `/api/certificate/${encodeURIComponent(trackId)}`

  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <a
        href={downloadUrl}
        download={`techskillhub-${trackId}-certificate.pdf`}
        className="btn btn-primary text-sm inline-flex items-center gap-2"
        aria-label={`Download ${trackName} certificate as a PDF`}
      >
        <Download size={14} />
        Download PDF
      </a>
      <button
        type="button"
        onClick={handlePrint}
        className="btn btn-secondary text-sm inline-flex items-center gap-2"
      >
        <Printer size={14} />
        Print Certificate
      </button>
    </div>
  )
}
