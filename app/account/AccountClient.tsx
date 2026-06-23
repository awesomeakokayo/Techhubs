'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'

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
}: {
  subscription: Subscription | null
  user: User
}) {
  const [subscription, setSubscription] = useState<Subscription | null>(initialSubscription)
  const [refreshing, setRefreshing] = useState(false)

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
    } catch {
      // silently fail
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-8">
        Account
      </h1>

      <div className="card mb-6">
        <h2 className="text-sm font-medium text-[var(--text-muted)] mb-1">Profile</h2>
        <p className="text-[var(--text-primary)] font-medium">{user.name || 'User'}</p>
        <p className="text-sm text-[var(--text-secondary)]">{user.email}</p>
      </div>

      <div className="card mb-6">
        <h2 className="text-sm font-medium text-[var(--text-muted)] mb-3">Subscription</h2>
        <div className="flex items-center gap-2">
          <StatusIcon size={18} style={{ color: config.color }} />
          <span style={{ color: config.color }} className="font-medium">
            {config.label}
          </span>
        </div>
        {subscription?.plan && (
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {subscription.plan === 'YEARLY' ? 'Yearly' : 'Monthly'} plan
          </p>
        )}
        {subscription?.currentPeriodEnd && (
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
        {subscription?.status === 'NONE' && (
          <a href="/upgrade" className="btn btn-primary mt-4 inline-flex">
            Upgrade now
          </a>
        )}
        {(subscription?.status && subscription.status !== 'NONE') && (
          <button
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
