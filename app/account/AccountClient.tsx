'use client'

import { useState, useEffect, useCallback } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2, XCircle, AlertTriangle, RefreshCw, ExternalLink,
  GraduationCap, ArrowRight, Sparkles, Trash2, Loader2,
} from 'lucide-react'
import type { Track } from '@/lib/tracks'
import { getProgress, saveProgress, getTrackPercent, loadAllServerProgress } from '@/lib/progress'
import { getTrackIcon } from '@/lib/icons'
import { useToast } from '@/components/ui/toast'

interface Subscription {
  status: string
  plan: string | null
  currentPeriodEnd: string | null
  paystackSubscriptionCode: string | null
  createdAt?: string
  updatedAt?: string
}

interface User {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  isSubscribed?: boolean
}

export function AccountClient({
  subscription: initialSubscription,
  user,
  tracks,
}: {
  subscription: Subscription | null
  user: User
  tracks: Track[]
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [subscription, setSubscription] = useState<Subscription | null>(initialSubscription)
  const [refreshing, setRefreshing] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const isSubscribed = user.isSubscribed ?? false
  const [syncKey, setSyncKey] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const refreshProgress = useCallback(() => setSyncKey((k) => k + 1), [])

  useEffect(() => {
    if (!isSubscribed) return
    const params = new URLSearchParams(window.location.search)
    if (params.get('subscribed') === 'true') {
      setShowOnboarding(true)
      window.history.replaceState({}, '', '/account')
    }
  }, [isSubscribed])

  useEffect(() => {
    if (!isSubscribed) return
    setSyncing(true)
    loadAllServerProgress().then((serverData) => {
      if (!serverData) { setSyncing(false); return }
      const local = getProgress()
      for (const [id, tp] of Object.entries(serverData.tracks)) {
        local.tracks[id] = tp
      }
      saveProgress(local)
      setSyncing(false)
      refreshProgress()
    })
  }, [isSubscribed, refreshProgress])

  const statusConfig: Record<string, { icon: typeof CheckCircle2; label: string; color: string }> = {
    ACTIVE: { icon: CheckCircle2, label: 'Active', color: 'var(--color-success)' },
    PAST_DUE: { icon: AlertTriangle, label: 'Payment Failed', color: 'var(--color-warning)' },
    CANCELLED: { icon: XCircle, label: 'Cancelled', color: 'var(--color-error)' },
    EXPIRED: { icon: XCircle, label: 'Expired', color: 'var(--color-error)' },
    NONE: { icon: XCircle, label: 'No active plan', color: 'var(--text-muted)' },
  }

  const config = statusConfig[subscription?.status || 'NONE']
  const StatusIcon = config.icon

  const refreshSubscription = async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/payments/verify', { method: 'POST' })
      const data = await res.json()
      setSubscription({
        status: data.status,
        plan: data.plan,
        currentPeriodEnd: data.currentPeriodEnd,
        paystackSubscriptionCode: subscription?.paystackSubscriptionCode || null,
      })
      if (data.status === 'ACTIVE') {
        toast('Subscription verified! Your guided path is ready.', 'success')
      }
    } catch {
      toast('Could not refresh subscription. Try again later.', 'error')
    } finally {
      setRefreshing(false)
    }
  }

  const cancelSubscription = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel? Your access will continue until the end of the current billing period.'
    )
    if (!confirmed) return
    setCancelling(true)
    try {
      const res = await fetch('/api/payments/cancel', { method: 'POST' })
      const data = await res.json()
      if (data.status === 'CANCELLED') {
        setSubscription((prev) => prev ? { ...prev, status: 'CANCELLED' } : prev)
        toast('Subscription cancelled. You can still access guided paths until the period ends.', 'info')
      } else {
        toast(data.error || 'Failed to cancel. Please try again.', 'error')
      }
    } catch {
      toast('Could not cancel. Try again later.', 'error')
    } finally {
      setCancelling(false)
    }
  }

  const inProgress = (() => {
    const local = getProgress()
    return Object.entries(local.tracks)
      .filter(([, tp]) => tp.started)
      .map(([id, tp]) => {
        const track = tracks.find((t) => t.id === id)
        const totalStages = track?.roadmap.length ?? 0
        const totalProjects = track?.projects.length ?? 0
        const percent = getTrackPercent(id, totalStages, totalProjects)
        return { id, track, tp, percent }
      })
      .sort((a, b) => b.percent - a.percent)
  })()

  const hasTracks = tracks.length > 0

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      {/* Onboarding banner for new subscribers */}
      {showOnboarding && (
        <div className="card mb-8 border-l-[3px] border-l-teal bg-gradient-to-br from-teal/[0.03] to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-5 select-none" aria-hidden>🎉</div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <GraduationCap size={20} />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-text-primary">Welcome to Pro!</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Your guided path is ready. Pick a track and start your step-by-step learning journey.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/tracks')}
                  className="btn btn-primary inline-flex items-center gap-1.5 text-sm"
                >
                  <Sparkles size={14} />
                  Start a Guided Path <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowOnboarding(false)}
                  className="btn btn-ghost text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-display font-bold text-text-primary mb-8">
        Account
      </h1>

      <div className="card mb-6">
        <h2 className="text-sm font-medium text-text-muted mb-1">Profile</h2>
        <p className="text-text-primary font-medium">{user.name || 'User'}</p>
        <p className="text-sm text-text-secondary">{user.email}</p>
      </div>

      {inProgress.length > 0 && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text-muted">Your Progress</h2>
            {isSubscribed && syncing && (
              <span className="text-xs text-teal inline-flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" /> Syncing...
              </span>
            )}
            {isSubscribed && !syncing && (
              <span className="text-xs text-text-muted inline-flex items-center gap-1">
                <CheckCircle2 size={12} className="text-teal" /> Synced
              </span>
            )}
          </div>
          <div className="space-y-4" key={syncKey}>
            {inProgress.map(({ id, track, percent }) => {
              const Icon = track ? getTrackIcon(track.icon) : CheckCircle2
              return (
                <a
                  key={id}
                  href={track ? `/tracks/${track.slug}` : '#'}
                  className="flex items-center gap-3 rounded-lg border border-border-subtle p-3 no-underline transition hover:border-teal/40"
                >
                  {track && (
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${track.colorHex}20`, color: track.colorHex }}
                    >
                      <Icon size={20} aria-hidden />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-text-primary truncate">
                        {track?.name ?? id}
                      </span>
                      <ExternalLink size={12} className="shrink-0 text-text-muted" />
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: track?.colorHex ?? 'var(--color-teal)',
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono text-text-muted shrink-0 w-8 text-right">
                        {percent}%
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}

      {!inProgress.length && hasTracks && (
        <div className="card mb-6">
          <h2 className="text-sm font-medium text-text-muted mb-3">Your Progress</h2>
          <p className="text-sm text-text-secondary">No tracks started yet.</p>
          <button
            type="button"
            onClick={() => router.push('/tracks')}
            className="btn btn-primary inline-flex items-center gap-1.5 mt-4 text-sm"
          >
            Browse Tracks <ArrowRight size={14} />
          </button>
        </div>
      )}

      <div className="card mb-6">
        <h2 className="text-sm font-medium text-text-muted mb-3">Subscription</h2>
        <div className="flex items-center gap-2">
          <StatusIcon size={18} style={{ color: config.color }} />
          <span style={{ color: config.color }} className="font-medium">
            {config.label}
          </span>
        </div>
        {subscription?.plan && (
          <p className="text-sm text-text-secondary mt-1">
            {subscription.plan === 'YEARLY' ? 'Yearly' : 'Monthly'} plan
          </p>
        )}
        {subscription?.currentPeriodEnd && (
          <p className="text-sm text-text-secondary mt-1">
            Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
        {subscription?.status === 'NONE' && (
          <button
            type="button"
            onClick={() => router.push('/upgrade')}
            className="btn btn-primary mt-4 inline-flex items-center gap-1.5"
          >
            <Sparkles size={14} /> Upgrade now
          </button>
        )}
        {subscription?.status === 'ACTIVE' && (
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push('/tracks')}
              className="btn btn-primary inline-flex items-center gap-1.5 text-sm"
            >
              <GraduationCap size={14} /> Continue Learning
            </button>
            <button
              type="button"
              onClick={refreshSubscription}
              disabled={refreshing}
              className="btn btn-ghost text-sm inline-flex items-center gap-2"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh status'}
            </button>
            <button
              type="button"
              onClick={cancelSubscription}
              disabled={cancelling}
              className="btn btn-ghost text-sm inline-flex items-center gap-2 text-[var(--color-error)] hover:bg-red/5"
            >
              {cancelling ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              {cancelling ? 'Cancelling...' : 'Cancel subscription'}
            </button>
          </div>
        )}
        {(subscription?.status && subscription.status !== 'NONE' && subscription.status !== 'ACTIVE') && (
          <button
            type="button"
            onClick={refreshSubscription}
            disabled={refreshing}
            className="btn btn-ghost text-sm mt-3 inline-flex items-center gap-2"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh subscription status'}
          </button>
        )}
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="btn btn-ghost text-sm"
      >
        Sign out
      </button>
    </div>
  )
}
