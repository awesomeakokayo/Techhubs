'use client'

import Link from 'next/link'
import { AlertTriangle, RefreshCw } from 'lucide-react'

/**
 * DashboardError — handles the "failed to load progress data" state so a query
 * failure shows an actionable message instead of a blank/500 screen.
 */
export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="section pt-16">
      <div className="container max-w-2xl">
        <div className="card flex flex-col items-start gap-4">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-lg"
            style={{ backgroundColor: 'rgba(178, 59, 47, 0.1)', color: 'var(--color-error)' }}
          >
            <AlertTriangle size={20} aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-text-primary">
              We could not load your learning home.
            </h1>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Something went wrong while retrieving your progress. Your data is safe. Try again, or
              continue from the learning paths.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => reset()} className="btn btn-primary inline-flex items-center gap-2">
              <RefreshCw size={15} aria-hidden /> Try again
            </button>
            <Link href="/paths" className="btn btn-secondary inline-flex items-center gap-2">
              Explore paths
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
