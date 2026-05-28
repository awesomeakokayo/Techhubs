'use client'

import { useEffect } from 'react'
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics'

interface EventTrackerProps {
  event: Omit<AnalyticsEvent, 'timestamp'>
  once?: boolean
}

export function EventTracker({ event, once = true }: EventTrackerProps) {
  useEffect(() => {
    trackEvent(event)
  }, [event])

  if (once) return null
  return null
}
