'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react'

export function PurchaseClient({
  trackName,
  trackSlug,
}: {
  trackId: string
  trackName: string
  trackSlug: string
}) {
  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md border border-teal/40 bg-teal/10 text-teal">
        <GraduationCap size={28} />
      </div>
      <p className="section-label text-teal">FREE & OPEN SOURCE</p>
      <h1 className="font-editorial text-4xl text-text-primary mt-3 mb-3">{trackName} is free to learn</h1>
      <p className="mx-auto max-w-xl text-text-secondary leading-7 mb-8">
        TechSkillHub no longer charges for guided learning. The curriculum, resources, projects,
        assessments, and progress experience are available without a course purchase.
      </p>
      <div className="grid gap-3 text-left max-w-xl mx-auto mb-8 sm:grid-cols-3">
        {[
          ['Guided learning', 'Structured stages and checkpoints'],
          ['Projects', 'Portfolio-oriented work to build'],
          ['Open source', 'The platform is available for everyone to inspect and improve'],
        ].map(([title, description]) => (
          <div key={title} className="rounded-md border border-border-subtle bg-elevated p-4">
            <BookOpen size={16} className="text-teal" />
            <p className="mt-2 text-sm font-semibold text-text-primary">{title}</p>
            <p className="mt-1 text-xs leading-5 text-text-secondary">{description}</p>
          </div>
        ))}
      </div>
      <Link href={`/guided-path/${trackId}`} className="btn btn-primary inline-flex items-center gap-2">
        <GraduationCap size={16} /> Start the Guided Path <ArrowRight size={16} />
      </Link>
      <p className="mt-4 text-xs text-text-muted">
        <Link href={`/tracks/${trackSlug}`} className="underline">Back to {trackName}</Link>
      </p>
    </div>
  )
}
