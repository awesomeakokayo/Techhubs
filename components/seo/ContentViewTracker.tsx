'use client'

import { useEffect } from 'react'
import { trackContentView } from '@/lib/analytics'

interface ContentViewTrackerProps {
  path: string
  contentType: string
}

/** Fires the standardized `content_view` event once per page mount. */
export function ContentViewTracker({ path, contentType }: ContentViewTrackerProps) {
  useEffect(() => {
    trackContentView({ path, content_type: contentType })
  }, [path, contentType])
  return null
}