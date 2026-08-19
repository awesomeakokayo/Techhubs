'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2, XCircle, AlertTriangle, RefreshCw, ExternalLink,
  GraduationCap, ArrowRight, Sparkles, Trash2, Loader2, Globe, Clock,
} from 'lucide-react'
import type { Track } from '@/lib/tracks'
import { getProgress, saveProgress, getTrackPercent, loadAllServerProgress, getStoredUserId, setStoredUserId, clearProgress } from '@/lib/progress'
import { getTrackIcon } from '@/lib/icons'
import { useToast } from '@/components/ui/toast'
import { RegionPicker } from '@/components/purchase/RegionPicker'
import type { RegionKey } from '@/lib/pricing'
import { detectRegionClient } from '@/lib/pricing'

interface Subscription {
  status: string
  plan: string | null
  currentPeriodEnd: string | null
  paystackSubscriptionCode: string | null
}

interface OwnedCourse {
  trackId: string
  status: string
  expiresAt: string | null
  source: string
  provider: string
  plan: string
}

interface User {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  isSubscribed?: boolean
}

function isActive(o: OwnedCourse): boolean {
  return o.status === 'ACTIVE' && (!o.expiresAt || new Date(o.expiresAt) > new Date())
}

export function AccountClient({
  subscription: initialSubscription,
  user: serverUser,
  tracks,
  owned: initialOwned,
  grandfathered: initialGrandfathered,
  grandfatheredUntil,
}: {
  subscription: Subscription | null
  user: User
  tracks: Track[]
  owned: OwnedCourse[]
  grandfathered: boolean
  grandfatheredUntil: string | null
}) {
  const router = useRouter()
  const { data: session, update: updateSession } = useSession()
  const { toast } = useToast()
  const user = session?.user ?? serverUser
  const [subscription, setSubscription] = useState<Subscription | null>(initialSubscription)
  const [owned, setOwned] = useState<OwnedCourse[]>(initialOwned)
  const [grandfathered, setGrandfathered] = useState(initialGrandfathered)
  const [refreshing, setRefreshing] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const isSubscribed = user.isSubscribed ?? false
  const [region, setRegion] = useState<RegionKey>(() => detectRegionClient())
  const [syncKey, setSyncKey] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [userCheckVersion, setUserCheckVersion] = useState(0)
  const refreshProgress = useCallback(() => setSyncKey((k) => k + 1), [])

  const hasAnyAccess = grandfathered || owned.some(isActive)

  // Clear local progress when user changes — and force a re-render so the UI re-reads from localStorage
  useEffect(() => {
    const stored = getStoredUserId()
    if (!user.id) return
    if (stored && stored !== user.id) {
      clearProgress()
    }
    setStoredUserId(user.id)
    setUserCheckVersion((v) => v + 1)
  }, [user.id])

  useEffect(() => {
    if (!hasAnyAccess) return
    const params = new URLSearchParams(window.location.search)
    if (params.get('purchased') === 'true') {
      setShowOnboarding(true)
      window.history.replaceState({}, '', '/account')
      updateSession()
    }
  }, [hasAnyAccess, updateSession])

  useEffect(() => {
    if (!hasAnyAccess) return
    let cancelled = false
    setSyncing(true)
    loadAllServerProgress().then((serverData) => {
      if (cancelled) return
      if (!serverData) { setSyncing(false); return }
      const local = getProgress()
      for (const [id, tp] of Object.entries(serverData.tracks)) {
        local.tracks[id] = tp
      }
      saveProgress(local)
      setSyncing(false)
      refreshProgress()
    })
    return () => { cancelled = true }
  }, [hasAnyAccess, refreshProgress])

  const activeOwned = useMemo(() => owned.filter(isActive), [owned])
  const expiredOwned = useMemo(() => owned.filter((o) => !isActive(o)), [owned])

  const statusConfig: Record<string, { icon: typeof CheckCircle2; label: string; color: string }> = {
    ACTIVE: { icon: CheckCircle2, label: 'Active', color: 'var(--color-success)' },
    PAST_DUE: { icon: AlertTriangle, label: 'Payment Failed', color: 'var(--color-warning)' },
    CANCELLED: { icon: XCircle, label: 'Cancelled', color: 'var(--color-error)' },
    EXPIRED: { icon: XCircle, label: 'Expired', color: 'var(--color-error)' },
    NONE: { icon: XCircle, label: 'No active plan', color: 'var(--text-muted)' },
  }

  const config = grandfathered
    ? statusConfig.ACTIVE
    : statusConfig[subscription?.status || 'NONE']
  const StatusIcon = config.icon

  const applyVerifyResult = (data: any) => {
    const sub = data.subscription ?? null
    setSubscription((prev) =>
      sub
        ? {
            status: sub.status,
            plan: sub.plan,
            currentPeriodEnd: sub.currentPeriodEnd,
            paystackSubscriptionCode: sub.paystackSubscriptionCode ?? prev?.paystackSubscriptionCode ?? null,
          }
        : prev
    )
    if (Array.isArray(data.entitlements)) setOwned(data.entitlements)
    if (typeof data.grandfathered === 'boolean') setGrandfathered(data.grandfathered)
  }

  const refreshSubscription = async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/payments/verify', { method: 'POST' })
      const data = await res.json()
      applyVerifyResult(data)
      if (data.grandfathered === true) {
        toast('Subscription verified! Your courses are ready.', 'success')
      } else if (data.error) {
        toast(data.error, 'error')
      }
      await updateSession()
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
        setGrandfathered(false)
        toast('Subscription cancelled. You can still use your courses until the period ends.', 'info')
        await updateSession()
      } else {
        toast(data.error || 'Failed to cancel. Please try again.', 'error')
      }
    } catch {
      toast('Could not cancel. Try again later.', 'error')
    } finally {
      setCancelling(false)
    }
  }

  const inProgress = useMemo(() => {
    const storedUserId = getStoredUserId()
    if (storedUserId && user.id && storedUserId !== user.id) {
      return []
    }
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
  }, [tracks, user.id, userCheckVersion, syncKey])

  const trackFor = (id: string) => tracks.find((t) => t.id === id)

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      {showOnboarding && (
        <div className="card mb-8 border-l-[3px] border-l-teal">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
              <GraduationCap size={20} />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-text-primary">Course unlocked!</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Your guided path is ready. Open the course and start your step-by-step learning journey.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/tracks')}
                  className="btn btn-primary inline-flex items-center gap-1.5 text-sm"
                >
                  <Sparkles size={14} />
                  Open a Course <ArrowRight size={14} />
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

      <h1 className="font-editorial text-3xl text-text-primary mb-8">
        Account
      </h1>

      <div className="card mb-6">
        <h2 className="text-sm font-medium text-text-muted mb-1">Profile</h2>
        <p className="text-text-primary font-medium">{user.name || 'User'}</p>
        <p className="text-sm text-text-secondary">{user.email}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-muted inline-flex items-center gap-1">
            <Globe size={13} /> Billing region
          </span>
          <RegionPicker value={region} onChange={setRegion} />
        </div>
      </div>

      {inProgress.length > 0 && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-text-muted">Your Progress</h2>
            {hasAnyAccess && syncing && (
              <span className="text-xs text-teal inline-flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" /> Syncing...
              </span>
            )}
            {hasAnyAccess && !syncing && (
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

      {!inProgress.length && (
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
        <h2 className="text-sm font-medium text-text-muted mb-3">My Courses</h2>

        {grandfathered && (
          <div className="rounded-md border border-border-default bg-elevated p-3 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-teal" />
              <span className="text-sm font-medium text-text-primary">All courses unlocked</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Your active site-wide plan covers every course.
              {grandfatheredUntil && (
                <> Valid until {new Date(grandfatheredUntil).toLocaleDateString()}.</>
              )}
            </p>
          </div>
        )}

        {activeOwned.length === 0 && !grandfathered && (
          <div>
            <p className="text-sm text-text-secondary">
              You haven&apos;t purchased a course yet. Unlock the guided path for any track, per course.
            </p>
            <button
              type="button"
              onClick={() => router.push('/tracks')}
              className="btn btn-primary mt-4 inline-flex items-center gap-1.5 text-sm"
            >
              <Sparkles size={14} /> Browse Courses <ArrowRight size={14} />
            </button>
          </div>
        )}

        {activeOwned.length > 0 && (
          <div className="space-y-3">
            {activeOwned.map((course) => {
              const track = trackFor(course.trackId)
              const Icon = track ? getTrackIcon(track.icon) : GraduationCap
              return (
                <div
                  key={course.trackId}
                  className="flex items-center gap-3 rounded-lg border border-border-default p-3"
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
                    <p className="text-sm font-medium text-text-primary truncate">
                      {track?.name ?? course.trackId}
                    </p>
                    <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                      <Clock size={11} /> Access {course.expiresAt && course.status === 'ACTIVE'
                        ? `until ${new Date(course.expiresAt).toLocaleDateString()}`
                        : 'ended'}
                    </p>
                  </div>
                  <a
                    href={`/guided-path/${course.trackId}`}
                    className="btn btn-secondary text-xs inline-flex items-center gap-1"
                  >
                    Open <ArrowRight size={12} />
                  </a>
                </div>
              )
            })}
          </div>
        )}

        {expiredOwned.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              Expired
            </p>
            <div className="space-y-2">
              {expiredOwned.map((course) => {
                const track = trackFor(course.trackId)
                return (
                  <div key={course.trackId} className="flex items-center justify-between gap-3 rounded-lg border border-border-subtle p-3 opacity-70">
                    <p className="text-sm text-text-secondary truncate">
                      {track?.name ?? course.trackId}
                    </p>
                    <a href={`/purchase/${course.trackId}`} className="text-xs text-teal shrink-0">
                      Renew
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="card mb-6">
        <h2 className="text-sm font-medium text-text-muted mb-3">Site-wide plan</h2>
        <div className="flex items-center gap-2">
          <StatusIcon size={18} style={{ color: config.color }} />
          <span style={{ color: config.color }} className="font-medium">
            {grandfathered ? 'Active (grandfathered)' : config.label}
          </span>
        </div>
        {subscription?.plan && (
          <p className="text-sm text-text-secondary mt-1">
            {subscription.plan === 'YEARLY' ? 'Yearly' : subscription.plan === 'THREE_MONTHS' ? '3 Months' : 'Monthly'} plan
          </p>
        )}
        {subscription?.currentPeriodEnd && subscription.status === 'ACTIVE' && (
          <p className="text-sm text-text-secondary mt-1">
            Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
        {!grandfathered && subscription?.status === 'NONE' && (
          <p className="text-sm text-text-secondary mt-2">
            Course purchases are managed per course in <strong>My Courses</strong>. No site-wide plan.
          </p>
        )}
        {grandfathered && (
          <div className="mt-4 flex flex-wrap gap-3">
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
        {(subscription?.status && subscription.status !== 'NONE' && subscription.status !== 'ACTIVE' && !grandfathered) && (
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
        onClick={async () => {
          clearProgress()
          await signOut({ callbackUrl: '/' })
        }}
        className="btn btn-ghost text-sm"
      >
        Sign out
      </button>
    </div>
  )
}