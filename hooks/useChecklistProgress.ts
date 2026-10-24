'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getProgress, getTrackProgress, toggleStage, toggleProject } from '@/lib/progress'

export interface ChecklistProgressState {
  ready: boolean
  stages: ReadonlySet<number>
  projects: ReadonlySet<string>
  pending: ReadonlySet<string>
  error: string
  toggleStage: (stageId: number) => void
  toggleProject: (projectId: string) => void
}

export function checklistItemKey(kind: 'STAGE' | 'PROJECT', itemKey: string | number): string {
  return `${kind}:${itemKey}`
}

interface ApiItem {
  trackId: string
  kind: string
  itemKey: string
  isCompleted: boolean
}

function collectStages(items: ApiItem[], trackId?: string): Set<number> {
  const set = new Set<number>()
  for (const item of items) {
    if (!item.isCompleted || item.kind !== 'STAGE') continue
    if (trackId && item.trackId !== trackId) continue
    if (/^\d+$/.test(item.itemKey)) set.add(Number(item.itemKey))
  }
  return set
}

function collectProjects(items: ApiItem[], trackId?: string): Set<string> {
  const set = new Set<string>()
  for (const item of items) {
    if (!item.isCompleted || item.kind !== 'PROJECT') continue
    if (trackId && item.trackId !== trackId) continue
    set.add(item.itemKey)
  }
  return set
}

/**
 * Authoritative checklist state. Authenticated learners read/write
 * `ChecklistProgress` through the API; anonymous learners use the local blob.
 * Never reads localStorage during render (hydration-safe).
 */
export function useChecklistProgress(trackId?: string): ChecklistProgressState {
  const { data: session, status } = useSession()
  const userId = session?.user?.id ?? null

  const [ready, setReady] = useState(false)
  const [stages, setStages] = useState<Set<number>>(new Set())
  const [projects, setProjects] = useState<Set<string>>(new Set())
  const [pending, setPending] = useState<Set<string>>(new Set())
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    let cancelled = false
    setReady(false)
    setError('')

    if (userId) {
      const url = trackId
        ? `/api/checklist-progress?trackId=${encodeURIComponent(trackId)}`
        : '/api/checklist-progress'
      fetch(url, { cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error('load failed'))))
        .then((data: { items?: ApiItem[] }) => {
          if (cancelled) return
          setStages(collectStages(data.items ?? [], trackId))
          setProjects(collectProjects(data.items ?? [], trackId))
          setReady(true)
        })
        .catch(() => {
          if (cancelled) return
          setReady(true)
          setError('Your checklist progress could not be loaded.')
        })
    } else {
      const source = trackId ? { [trackId]: getTrackProgress(trackId) } : getProgress().tracks
      const stageSet = new Set<number>()
      const projectSet = new Set<string>()
      for (const progress of Object.values(source)) {
        ;(progress.completedStages ?? []).forEach((id) => stageSet.add(id))
        ;(progress.completedProjects ?? []).forEach((id) => projectSet.add(id))
      }
      setStages(stageSet)
      setProjects(projectSet)
      setReady(true)
    }

    return () => {
      cancelled = true
    }
  }, [trackId, userId, status])

  const toggle = useCallback(
    (kind: 'STAGE' | 'PROJECT', itemKey: string) => {
      setError('')
      const isStage = kind === 'STAGE'
      const done = isStage ? stages.has(Number(itemKey)) : projects.has(itemKey)
      const next = !done
      const key = checklistItemKey(kind, itemKey)

      const applyOptimistic = (value: boolean) => {
        if (isStage) {
          setStages((prev) => {
            const copy = new Set(prev)
            if (value) copy.add(Number(itemKey))
            else copy.delete(Number(itemKey))
            return copy
          })
        } else {
          setProjects((prev) => {
            const copy = new Set(prev)
            if (value) copy.add(itemKey)
            else copy.delete(itemKey)
            return copy
          })
        }
      }

      applyOptimistic(next)

      if (!userId) {
        if (isStage) toggleStage(trackId ?? '', Number(itemKey), 0)
        else toggleProject(trackId ?? '', itemKey)
        return
      }

      setPending((prev) => new Set(prev).add(key))
      fetch('/api/checklist-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId, kind, itemKey, completed: next }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('save failed')
        })
        .catch(() => {
          applyOptimistic(!next)
          setError('We could not save that change. Please try again.')
        })
        .finally(() =>
          setPending((prev) => {
            const copy = new Set(prev)
            copy.delete(key)
            return copy
          }),
        )
    },
    [stages, projects, userId, trackId],
  )

  const toggleStageItem = useCallback((stageId: number) => toggle('STAGE', String(stageId)), [toggle])
  const toggleProjectItem = useCallback((projectId: string) => toggle('PROJECT', projectId), [toggle])

  return useMemo(
    () => ({ ready, stages, projects, pending, error, toggleStage: toggleStageItem, toggleProject: toggleProjectItem }),
    [ready, stages, projects, pending, error, toggleStageItem, toggleProjectItem],
  )
}
