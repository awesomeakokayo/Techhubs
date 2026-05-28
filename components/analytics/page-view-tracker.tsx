'use client'

import { useTrackPage } from '@/hooks/useTrackPage'

interface PageViewTrackerProps {
  path: string
  eventName?: string
}

export function PageViewTracker({ path, eventName = 'page_view' }: PageViewTrackerProps) {
  useTrackPage(path, eventName)
  return null
}
