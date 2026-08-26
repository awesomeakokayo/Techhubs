'use client'

import { Download, Printer } from 'lucide-react'

interface CertificateActionsProps {
  trackName: string
}

export function CertificateActions({ trackName }: CertificateActionsProps) {
  function handlePrint() {
    const previousTitle = document.title
    document.title = `TechSkillHub - ${trackName} Certificate`
    window.print()
    window.setTimeout(() => {
      document.title = previousTitle
    }, 1000)
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handlePrint}
        className="btn btn-primary text-sm inline-flex items-center gap-2"
        aria-label={`Download ${trackName} certificate as a PDF`}
      >
        <Download size={14} />
        Download / Save PDF
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="btn btn-secondary text-sm inline-flex items-center gap-2"
      >
        <Printer size={14} />
        Print Certificate
      </button>
      <p className="w-full text-xs text-text-muted">
        Your browser will open the print dialog. Choose <strong>Save as PDF</strong> to download the certificate.
      </p>
    </div>
  )
}
