'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Info, X } from 'lucide-react'

const DISMISS_KEY = 'tsh-commercial-announcement-dismissed-v1'

const APP_ROUTE_PREFIXES = [
  '/dashboard',
  '/achievements',
  '/learning',
  '/plan',
  '/account',
  '/certificate',
]

function isAppRoute(pathname: string) {
  if (pathname.startsWith('/guided-path/')) return true
  return APP_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

/**
 * Dismissible, non-blocking announcement for the commercial transition.
 * It never interrupts an active lesson and is hidden once dismissed. It makes no
 * pricing or date claims.
 */
export function CommercialAnnouncement({ enabled = true }: { enabled?: boolean }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) !== 'true') setVisible(true)
    } catch {
      /* storage unavailable: remain hidden rather than nag */
    }
  }, [])

  // The landing page carries its own honest "what's free" explanation in the
  // FAQ. Keep the pre-launch announcement away from the first impression.
  if (!enabled || !visible || pathname === '/') return null

  const onAppRoute = isAppRoute(pathname)

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, 'true')
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      role="status"
      className={
        'border-b border-border-subtle bg-elevated/60' + (onAppRoute ? ' lg:pl-64' : '')
      }
    >
      <div className={`container flex items-start gap-3 py-2.5 text-[0.8rem] sm:text-sm${onAppRoute ? ' max-w-none' : ''}`}>
        <Info size={16} className="mt-0.5 shrink-0 text-teal" aria-hidden />
        <p className="max-w-none flex-1 text-text-secondary">
          <span className="lg:hidden">
            Optional <span className="font-medium text-text-primary">Pro</span> plan in preparation. No changes today.{' '}
          </span>
          <span className="hidden lg:inline">
            We&apos;re preparing an optional <span className="font-medium text-text-primary">Pro</span> plan and Track Passes to help cover the cost of AI project assessments. A small number of popular tracks are planned to become premium over time; a Track Pass will give <span className="font-medium text-text-primary">six months of access to one track</span> (one-time, no auto-renewal).{' '}
            <span className="text-text-primary">Nothing changes for you today</span> and you&apos;ll never be charged unless you choose a plan yourself.{' '}
          </span>
          <Link href="/pricing" className="text-teal underline underline-offset-2 hover:text-teal-bright">See pricing</Link>
        </p>
        <button type="button" onClick={dismiss} aria-label="Dismiss announcement" className="shrink-0 rounded p-1 text-text-muted hover:text-text-primary">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
