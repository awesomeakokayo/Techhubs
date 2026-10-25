'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { trackCtaClick } from '@/lib/analytics'

/**
 * Landing CTA link. Keeps the existing analytics conventions:
 * one `cta_click` event per meaningful next step, no fake conversions.
 */
export function CtaLink({
  href,
  label,
  className,
  children,
  path = '/',
}: {
  href: string
  label: string
  className?: string
  children: ReactNode
  path?: string
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackCtaClick({ path, cta_label: label, cta_href: href })}
    >
      {children}
    </Link>
  )
}
