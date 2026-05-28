'use client'

import Link from 'next/link'
import { MouseEvent, ReactNode } from 'react'
import { trackOutboundClick } from '@/lib/analytics'

interface TrackedLinkProps {
  href: string
  className?: string
  children: ReactNode
  path?: string
  trackSlug?: string
  resourceTitle?: string
  resourceType?: string
  target?: string
  rel?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const isExternalUrl = (url: string) => /^https?:\/\//.test(url)

export function TrackedLink({
  href,
  className,
  children,
  path,
  trackSlug,
  resourceTitle,
  resourceType,
  target,
  rel,
  onClick,
}: TrackedLinkProps) {
  const external = isExternalUrl(href)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (external) {
      trackOutboundClick({
        path,
        track_slug: trackSlug,
        resource_title: resourceTitle,
        resource_type: resourceType,
        outbound_url: href,
      })
    }
    onClick?.(event)
  }

  if (external) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
