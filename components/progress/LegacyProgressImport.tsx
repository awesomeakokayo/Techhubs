'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2, Upload } from 'lucide-react'
import {
  LEGACY_BACKUP_KEY,
  LEGACY_PROGRESS_KEY,
  LEGACY_USER_KEY,
  classifyLegacyImport,
  collectImportItems,
  dismissMarkerKey,
  importMarkerKey,
  summarizeImportItems,
  type LegacyImportSummary,
  type LegacyProgressData,
} from '@/lib/legacy-progress-import'
import { prepareLegacyProgressForUser } from '@/lib/legacy-account'

const RELEVANT_PATHS = ['/dashboard', '/account']

type Status = 'hidden' | 'prompt' | 'importing' | 'done' | 'error'

interface ImportedResult {
  created: number
  alreadyCompleted: number
  preservedIncomplete: number
}

function backupIfAbsent(raw: string) {
  try {
    if (!localStorage.getItem(LEGACY_BACKUP_KEY)) localStorage.setItem(LEGACY_BACKUP_KEY, raw)
  } catch {
    /* storage unavailable */
  }
}

export function LegacyProgressImport() {
  const { data: session, status: sessionStatus } = useSession()
  const pathname = usePathname()
  const [status, setStatus] = useState<Status>('hidden')
  const [summary, setSummary] = useState<LegacyImportSummary>({ stages: 0, projects: 0, total: 0, tracks: 0 })
  const [result, setResult] = useState<ImportedResult | null>(null)
  const [error, setError] = useState('')
  const detectedFor = useRef<string | null>(null)

  const userId = session?.user?.id ?? null
  const onRelevantPage = RELEVANT_PATHS.includes(pathname)

  const readLegacy = useCallback(() => {
    if (typeof window === 'undefined') {
      return { data: null as LegacyProgressData | null, raw: null as string | null, storedUserId: null as string | null }
    }
    try {
      const raw = localStorage.getItem(LEGACY_PROGRESS_KEY)
      const storedUserId = localStorage.getItem(LEGACY_USER_KEY)
      let data: LegacyProgressData | null = null
      if (raw) {
        try {
          data = JSON.parse(raw) as LegacyProgressData
        } catch {
          data = null
        }
      }
      return { data, raw, storedUserId }
    } catch {
      return { data: null, raw: null, storedUserId: null }
    }
  }, [])

  useEffect(() => {
    if (sessionStatus === 'loading' || !userId || !onRelevantPage) return
    if (detectedFor.current === userId) return
    detectedFor.current = userId

    // Account-switch safety: a previous account's blob is backed up before clearing.
    prepareLegacyProgressForUser(userId)

    try {
      if (localStorage.getItem(importMarkerKey(userId)) || localStorage.getItem(dismissMarkerKey(userId))) {
        setStatus('hidden')
        return
      }
    } catch {
      /* storage unavailable */
    }

    const { data, storedUserId } = readLegacy()
    const items = collectImportItems(data)
    if (classifyLegacyImport(storedUserId, userId, items.length) !== 'eligible') {
      setStatus('hidden')
      return
    }

    setSummary(summarizeImportItems(items))
    setStatus('prompt')
  }, [sessionStatus, userId, onRelevantPage, readLegacy])

  const handleImport = useCallback(async () => {
    if (!userId) return
    setError('')
    const { data, raw } = readLegacy()
    if (raw) backupIfAbsent(raw)
    const items = collectImportItems(data)
    if (items.length === 0) {
      setStatus('hidden')
      return
    }
    setStatus('importing')
    try {
      const res = await fetch('/api/checklist-progress/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const payload = await res.json().catch(() => null)
      if (!res.ok || !payload?.ok) throw new Error(payload?.error || 'Import failed.')
      try {
        localStorage.setItem(importMarkerKey(userId), new Date().toISOString())
      } catch {
        /* storage unavailable */
      }
      setResult(payload.imported ?? null)
      setStatus('done')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Import failed.')
      setStatus('error')
    }
  }, [userId, readLegacy])

  const handleDismiss = useCallback(() => {
    if (!userId) return
    try {
      localStorage.setItem(dismissMarkerKey(userId), new Date().toISOString())
    } catch {
      /* storage unavailable */
    }
    setStatus('hidden')
  }, [userId])

  if (status === 'hidden' || !onRelevantPage) return null

  return (
    <div className="container pt-6">
      <section className="card border-grape/30" role="region" aria-label="Import saved progress">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-grape/10 text-grape">
            {status === 'done' ? (
              <CheckCircle2 size={20} aria-hidden />
            ) : status === 'error' ? (
              <AlertTriangle size={20} aria-hidden />
            ) : (
              <Upload size={20} aria-hidden />
            )}
          </span>

          <div className="min-w-0 flex-1">
            {status === 'prompt' && (
              <>
                <p className="section-label">Save your progress</p>
                <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">
                  Copy your saved checklist progress to your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  We found progress saved on this device: {summary.stages} completed{' '}
                  {summary.stages === 1 ? 'stage' : 'stages'} and {summary.projects} completed{' '}
                  {summary.projects === 1 ? 'project' : 'projects'} across {summary.tracks}{' '}
                  {summary.tracks === 1 ? 'path' : 'paths'}. Importing copies this checklist progress into your
                  account so it is available on every device. Your guided-path progress and certificates are not
                  affected.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-primary inline-flex items-center gap-2"
                    onClick={() => void handleImport()}
                  >
                    Import progress <ArrowRight size={15} aria-hidden />
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleDismiss}>
                    Not now
                  </button>
                </div>
              </>
            )}

            {status === 'importing' && (
              <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
                <Loader2 size={16} className="animate-spin" aria-hidden /> Importing your saved progress…
              </p>
            )}

            {status === 'done' && (
              <>
                <h2 className="font-display text-lg font-semibold text-text-primary">Progress imported</h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Saved {result?.created ?? 0} new {(result?.created ?? 0) === 1 ? 'item' : 'items'} to your account.
                  {(result?.alreadyCompleted ?? 0) > 0 ? ` ${result?.alreadyCompleted} were already saved.` : ''}
                  {(result?.preservedIncomplete ?? 0) > 0
                    ? ` ${result?.preservedIncomplete} stayed as you set them in the app.`
                    : ''}{' '}
                  Your original device data is still kept as a backup.
                </p>
                <div className="mt-4">
                  <button type="button" className="btn btn-secondary" onClick={() => setStatus('hidden')}>
                    Dismiss
                  </button>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <h2 className="font-display text-lg font-semibold text-text-primary">
                  We could not import your progress
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {error} Your saved data has been preserved and you can try again.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button type="button" className="btn btn-primary" onClick={() => void handleImport()}>
                    Try again
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleDismiss}>
                    Not now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
