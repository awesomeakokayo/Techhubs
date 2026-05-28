'use client'

import { useEffect } from 'react'
import { useAnalytics } from './useAnalytics'

export function useTrackPage(path: string, eventName = 'page_view') {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(path, eventName)
  }, [path, eventName, trackPageView])
}
