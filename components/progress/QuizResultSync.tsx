'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getProgress } from '@/lib/progress'
import { buildLearnerProfilePayload } from '@/lib/quiz-sync'

/**
 * Syncs a locally stored quiz result to the learner profile after sign-in.
 * Runs once per (user, result) and is safe to retry; failed syncs are not
 * marked complete and will be attempted again on the next load.
 */
export function QuizResultSync() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const userId = session?.user?.id ?? null
  const attempted = useRef<string | null>(null)

  useEffect(() => {
    if (status === 'loading' || !userId) return

    const payload = buildLearnerProfilePayload(getProgress().quizResult)
    if (!payload) return

    const token = `${userId}:${payload.clientUpdatedAt ?? 'none'}`
    if (attempted.current === token) return
    attempted.current = token

    const marker = `tsh-quiz-synced:${token}`
    try {
      if (localStorage.getItem(marker)) return
    } catch {
      /* storage unavailable */
    }

    fetch('/api/learner-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('sync failed'))))
      .then((data: { status?: string } | null) => {
        try {
          localStorage.setItem(marker, new Date().toISOString())
        } catch {
          /* storage unavailable */
        }
        if (data?.status === 'updated') router.refresh()
      })
      .catch(() => {
        // Allow a retry on the next load; do not mark the sync as done.
        attempted.current = null
      })
  }, [status, userId, router])

  return null
}
