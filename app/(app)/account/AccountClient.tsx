'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2, XCircle, AlertTriangle,
  GraduationCap, ArrowRight, Sparkles, Loader2, Clock, ListChecks,
} from 'lucide-react'
import type { Track } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { prepareLegacyProgressForUser } from '@/lib/legacy-account'
import { useToast } from '@/components/ui/toast'

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

interface GuidedPathSummary {
  trackId: string
  name: string
  slug: string
  icon: string
  colorHex: string
  completedSteps: number
  totalSteps: number
  percent: number
  isComplete: boolean
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
  completedTrackIds,
  guidedPaths,
  checklistSummary,
  billingSlot,
}: {
  subscription: Subscription | null
  user: User
  tracks: Track[]
  owned: OwnedCourse[]
  grandfathered: boolean
  grandfatheredUntil: string | null
  completedTrackIds: string[]
  guidedPaths: GuidedPathSummary[]
  checklistSummary: { stages: number; projects: number }
  billingSlot?: ReactNode
}) {
  const router = useRouter()
  const { data: session, update: updateSession } = useSession()
  const { toast } = useToast()
  const user = session?.user ?? serverUser
  const [subscription, setSubscription] = useState<Subscription | null>(initialSubscription)
  const [owned, setOwned] = useState<OwnedCourse[]>(initialOwned)
  const [grandfathered, setGrandfathered] = useState(initialGrandfathered)
  const [cancelling, setCancelling] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (user.id) prepareLegacyProgressForUser(user.id)
  }, [user.id])

  const activeOwned = useMemo(() => owned.filter(isActive), [owned])
  const expiredOwned = useMemo(() => owned.filter((o) => !isActive(o)), [owned])

  const statusConfig: Record<string, { icon: typeof CheckCircle2; label: string; color: string }> = {
    ACTIVE: { icon: CheckCircle2, label: 'Active', color: 'var(--color-success)' },
    PAST_DUE: { icon: AlertTriangle, label: 'Payment Failed', color: 'var(--color-warning)' },
    CANCELLED: { icon: XCircle, label: 'Cancelled', color: 'var(--color-error)' },
    EXPIRED: { icon: XCircle, label: 'Expired', color: 'var(--color-error)' },
    NONE: { icon: XCircle, label: 'No active plan', color: 'var(--text-muted)' },
  }
  const config = grandfathered ? statusConfig.ACTIVE : statusConfig[subscription?.status || 'NONE']
  const StatusIcon = config.icon

  const applyVerifyResult = useCallback((data: any) => {
    const sub = data.subscription ?? null
    setSubscription((prev) => (sub ? { status: sub.status, plan: sub.plan, currentPeriodEnd: sub.currentPeriodEnd, paystackSubscriptionCode: sub.paystackSubscriptionCode ?? prev?.paystackSubscriptionCode ?? null } : prev))
    if (Array.isArray(data.entitlements)) setOwned(data.entitlements)
    if (typeof data.grandfathered === 'boolean') setGrandfathered(data.grandfathered)
  }, [])

  const refreshSubscription = useCallback(async () => {
    try {
      const res = await fetch('/api/payments/verify', { method: 'POST' })
      const data = await res.json()
      applyVerifyResult(data)
      if (data.grandfathered === true) toast('Subscription verified! Your courses are ready.', 'success')
      else if (data.error) toast(data.error, 'error')
      await updateSession()
    } catch { toast('Could not refresh subscription. Try again later.', 'error') }
  }, [applyVerifyResult, toast, updateSession])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('purchased') !== 'true') return
    window.history.replaceState({}, '', '/account')
    let cancelled = false
    ;(async () => {
      const reference = params.get('reference')
      try {
        if (reference) {
          const res = await fetch('/api/payments/confirm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reference }) })
          const data = await res.json()
          if (!cancelled) toast(data.ok ? 'Payment received! Your course is unlocked.' : (data.error || 'We could not confirm your payment yet.'), data.ok ? 'success' : 'error')
        }
      } catch { if (!cancelled) toast('We could not confirm your payment. Please refresh your status.', 'error') }
      finally { if (!cancelled) { await refreshSubscription(); setShowOnboarding(true) } }
    })()
    return () => { cancelled = true }
  }, [refreshSubscription, toast])

  const cancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel? Your access will continue until the end of the current billing period.')) return
    setCancelling(true)
    try {
      const res = await fetch('/api/payments/cancel', { method: 'POST' })
      const data = await res.json()
      if (data.status === 'CANCELLED') {
        setSubscription((prev) => (prev ? { ...prev, status: 'CANCELLED' } : prev))
        setGrandfathered(false)
        toast('Subscription cancelled. You can still use your courses until the period ends.', 'info')
        await updateSession()
      } else toast(data.error || 'Failed to cancel. Please try again.', 'error')
    } catch { toast('Could not cancel. Try again later.', 'error') }
    finally { setCancelling(false) }
  }

  const trackFor = (id: string) => tracks.find((t) => t.id === id)

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      {showOnboarding && <div className="card mb-8 border-l-[3px] border-l-teal"><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal"><GraduationCap size={20} /></div><div className="flex-1"><h2 className="font-display text-lg font-bold text-text-primary">Course unlocked!</h2><p className="mt-1 text-sm text-text-secondary">Your guided path is ready. Open the course and start your step-by-step learning journey.</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => router.push('/tracks')} className="btn btn-primary inline-flex items-center gap-1.5 text-sm"><Sparkles size={14} />Open a Course <ArrowRight size={14} /></button><button type="button" onClick={() => setShowOnboarding(false)} className="btn btn-ghost text-sm">Dismiss</button></div></div></div></div>}

      <h1 className="font-editorial text-3xl text-text-primary mb-8">Account</h1>
      <div className="card mb-6"><h2 className="text-sm font-medium text-text-muted mb-1">Profile</h2><p className="text-text-primary font-medium">{user.name || 'User'}</p><p className="text-sm text-text-secondary">{user.email}</p></div>

      {billingSlot && <div className="mb-6">{billingSlot}</div>}

      {guidedPaths.length > 0 ? (
        <div className="card mb-6">
          <h2 className="text-sm font-medium text-text-muted mb-4">Guided learning</h2>
          <div className="space-y-4">
            {guidedPaths.map((path) => {
              const Icon = getTrackIcon(path.icon)
              return (
                <a key={path.trackId} href={`/guided-path/${path.trackId}`} className="flex items-center gap-3 rounded-lg border border-border-subtle p-3 no-underline transition hover:border-teal/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${path.colorHex}20`, color: path.colorHex }}>
                    <Icon size={20} aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-primary truncate">{path.name}</span>
                      <span className={path.isComplete ? 'badge badge-green' : 'badge badge-teal'}>{path.isComplete ? 'Completed' : 'In progress'}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${path.percent}%`, backgroundColor: path.colorHex }} />
                      </div>
                      <span className="text-xs font-mono text-text-muted shrink-0 text-right">{path.completedSteps}/{path.totalSteps} · {path.percent}%</span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="card mb-6">
          <h2 className="text-sm font-medium text-text-muted mb-3">Guided learning</h2>
          <p className="text-sm text-text-secondary">No guided paths started yet.</p>
          <button type="button" onClick={() => router.push('/tracks')} className="btn btn-primary inline-flex items-center gap-1.5 mt-4 text-sm">Browse tracks <ArrowRight size={14} /></button>
        </div>
      )}

      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-3"><ListChecks size={16} className="text-teal" aria-hidden /><h2 className="text-sm font-medium text-text-muted">Roadmap &amp; project checklists</h2></div>
        <p className="text-sm text-text-secondary">
          {checklistSummary.stages} roadmap {checklistSummary.stages === 1 ? 'step' : 'steps'} and {checklistSummary.projects} {checklistSummary.projects === 1 ? 'project' : 'projects'} marked complete.
        </p>
        <button type="button" onClick={() => router.push('/tracks')} className="btn btn-secondary inline-flex items-center gap-1.5 mt-4 text-sm">Open track checklists <ArrowRight size={14} /></button>
      </div>

      <div className="card mb-6"><h2 className="text-sm font-medium text-text-muted mb-3">My Courses</h2>{grandfathered && <div className="rounded-md border border-border-default bg-elevated p-3 mb-3"><div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal" /><span className="text-sm font-medium text-text-primary">All courses unlocked</span></div><p className="text-xs text-text-secondary mt-1">Your active site-wide plan covers every course.{grandfatheredUntil && <> Valid until {new Date(grandfatheredUntil).toLocaleDateString()}.</>}</p></div>}{activeOwned.length === 0 && !grandfathered && <div><p className="text-sm text-text-secondary">All learning tracks are free to explore. Browse the learning catalogue to start a guided path.</p><button type="button" onClick={() => router.push('/tracks')} className="btn btn-primary mt-4 inline-flex items-center gap-1.5 text-sm"><Sparkles size={14} /> Browse Learning Paths <ArrowRight size={14} /></button></div>}{activeOwned.length > 0 && <div className="space-y-3">{activeOwned.map((course) => { const track = trackFor(course.trackId); const Icon = track ? getTrackIcon(track.icon) : GraduationCap; const isComplete = completedTrackIds.includes(course.trackId); return <div key={course.trackId} className="flex items-center gap-3 rounded-lg border border-border-subtle p-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal"><Icon size={20} /></div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-text-primary truncate">{track?.name ?? course.trackId}</p><p className="text-xs text-text-muted mt-1">{isComplete ? 'Completed' : 'Course available'}</p></div>{isComplete ? <a href={`/certificate/${course.trackId}`} className="btn btn-secondary text-xs">Certificate</a> : <a href={`/guided-path/${course.trackId}`} className="btn btn-primary text-xs">Continue</a>}</div> })}</div>}</div>

      {expiredOwned.length > 0 && <div className="card mb-6"><h2 className="text-sm font-medium text-text-muted mb-3">Expired Courses</h2><div className="space-y-2">{expiredOwned.map((course) => <div key={course.trackId} className="flex items-center justify-between gap-3 text-sm"><span className="text-text-secondary">{trackFor(course.trackId)?.name ?? course.trackId}</span><span className="text-xs text-text-muted inline-flex items-center gap-1"><Clock size={12} />Expired</span></div>)}</div></div>}

      {subscription?.status === 'ACTIVE' && !grandfathered && <div className="card"><div className="flex items-center justify-between"><div><h2 className="text-sm font-medium text-text-muted">Subscription</h2><p className="mt-1 text-text-primary">{subscription.plan ?? 'Active plan'}</p>{subscription.currentPeriodEnd && <p className="mt-1 text-xs text-text-secondary">Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>}</div><StatusIcon size={20} style={{ color: config.color }} /></div><button type="button" onClick={cancelSubscription} disabled={cancelling} className="btn btn-secondary mt-4 text-sm">{cancelling ? 'Cancelling...' : 'Cancel Subscription'}</button></div>}

      <div className="mt-6 text-center"><button type="button" className="text-sm text-text-muted hover:text-text-primary" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button></div>
    </div>
  )
}
