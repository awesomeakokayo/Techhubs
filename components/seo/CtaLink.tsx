'use client'

import Link from 'next/link'
import { trackCtaClick, trackGuideToRoadmap, trackStartRoadmap } from '@/lib/analytics'

interface CtaLinkProps {
  href: string
  label: string
  trackingPath: string
  /** Fire `guide_to_roadmap` (and `roadmap_start`) when the CTA is a roadmap/track. */
  isRoadmapCta?: boolean
  className?: string
}

/**
 * Intent-specific CTA that also records the conversion event. The label is
 * passed by the caller so it always matches the current page's user intent.
 */
export function CtaLink({ href, label, trackingPath, isRoadmapCta = false, className }: CtaLinkProps) {
  const roadmapLike = isRoadmapCta || /^\/(roadmaps|tracks)\//.test(href)

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackCtaClick({ path: trackingPath, cta_label: label, cta_href: href })
        if (roadmapLike) {
          trackGuideToRoadmap({ path: trackingPath, cta_label: label, roadmap_href: href })
          trackStartRoadmap({ path: trackingPath, cta_label: label, purpose: 'primary_cta' })
        }
      }}
    >
      {label}
    </Link>
  )
}