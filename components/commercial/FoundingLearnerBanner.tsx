'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, Clock3 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface FoundingLearnerBannerProps {
  startsAt: string
  endsAt: string
  regularPrice: string
  promotionalPrice: string
  discountPercent: number
  placement: 'homepage' | 'pricing'
}

function formatLagosDate(value: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    timeZone: 'Africa/Lagos',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function countdownLabel(milliseconds: number): string {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000))
  const days = Math.floor(seconds / 86_400)
  const hours = Math.floor((seconds % 86_400) / 3_600)
  const minutes = Math.floor((seconds % 3_600) / 60)
  const remainder = seconds % 60
  if (days > 0) return `${days}d ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m ${remainder}s`
  return `${minutes}m ${remainder}s`
}

export function FoundingLearnerBanner({
  startsAt,
  endsAt,
  regularPrice,
  promotionalPrice,
  discountPercent,
  placement,
}: FoundingLearnerBannerProps) {
  const pathname = usePathname()
  const router = useRouter()
  const endTime = new Date(endsAt).getTime()
  // Use a stable server/client first render; the actual countdown starts after hydration.
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    trackEvent({
      event_name: 'launch_offer_viewed',
      path: pathname || '/',
      content_type: placement,
    })

    let interval: number | undefined
    const update = () => {
      const next = endTime - Date.now()
      setRemainingMs(Math.max(0, next))
      if (next <= 0) {
        setExpired(true)
        if (interval !== undefined) window.clearInterval(interval)
        router.refresh()
      }
    }
    interval = window.setInterval(update, 1000)
    update()
    return () => {
      if (interval !== undefined) window.clearInterval(interval)
    }
  }, [endTime, pathname, placement, router])

  if (expired || (remainingMs !== null && remainingMs <= 0)) return null

  const closeAt = formatLagosDate(endsAt)
  return (
    <aside className="mt-8 overflow-hidden rounded-[18px] border border-brand/25 bg-brand/[0.04]" aria-label="Founding Learner launch offer">
      <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
        <div>
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-brand">
            TechSkillHub Founding Learner Offer
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink md:text-2xl">
            Start your tech journey for less.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
            Get three months of access to one guided learning path for <span className="font-semibold text-brand">{promotionalPrice}</span> instead of{' '}
            <span className="line-through">{regularPrice}</span>. Save {discountPercent}% during the launch offer.
          </p>
          <p className="mt-3 text-xs text-ink/65">
            Offer closes {closeAt} WAT. The same deadline applies to every visitor. No invented seat limits.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="inline-flex items-center gap-2 rounded-md border border-brand/20 bg-white px-3 py-2 font-mono text-sm text-ink" aria-live="off">
            <Clock3 size={15} className="text-brand" aria-hidden />
            <span>Ends in {remainingMs === null ? 'checking deadline…' : countdownLabel(remainingMs)}</span>
          </div>
          <Link
            href={pathname === '/pricing' ? '#plans' : '#plans'}
            onClick={() => trackEvent({ event_name: 'pricing_cta_clicked', path: pathname || '/', cta_label: 'Claim Founding Learner offer', cta_href: '#plans' })}
            className="btn btn-primary inline-flex w-full items-center justify-center gap-2 md:w-auto"
          >
            View offer <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <span className="sr-only">Campaign starts {formatLagosDate(startsAt)} WAT and ends {closeAt} WAT.</span>
    </aside>
  )
}
