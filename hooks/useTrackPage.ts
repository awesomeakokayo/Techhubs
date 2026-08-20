'use client'

import { useEffect } from 'react'
import { useAnalytics } from './useAnalytics'
import { trackOrganicLanding } from '@/lib/analytics'

const SESSION_KEY = 'tsh_organic_landing_tracked'
const VISIT_KEY = 'tsh_has_visited'
const SEARCH_ENGINES = [
  'google.',
  'bing.com',
  'search.brave.com',
  'search.yahoo.com',
  'duckduckgo.com',
  'ecosia.org',
  'yandex.',
  'qwant.com',
]

function detectOrganicReferrer(referrer: string): string | null {
  if (!referrer) return null
  if (!/^https?:/i.test(referrer)) return null
  try {
    const host = new URL(referrer).hostname.toLowerCase()
    if (SEARCH_ENGINES.some((engine) => host === engine || host.endsWith(`.${engine}`) || host.includes(engine))) {
      return host
    }
  } catch {
    return null
  }
  return null
}

export function useTrackPage(path: string, eventName = 'page_view') {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(path, eventName)

    // Funnel event: measure organic landings (search engine referrers only).
    try {
      const referrer = typeof document !== 'undefined' ? document.referrer : ''
      const engine = detectOrganicReferrer(referrer)
      if (engine) {
        const alreadyTracked = typeof window !== 'undefined' ? window.sessionStorage.getItem(SESSION_KEY) : null
        if (!alreadyTracked) {
          const isFirstVisit =
            typeof window !== 'undefined' ? !window.localStorage.getItem(VISIT_KEY) : undefined
          trackOrganicLanding({ path, referrer: engine, is_first_visit: isFirstVisit })
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(SESSION_KEY, '1')
            localStorage.setItem(VISIT_KEY, '1')
          }
        }
      }
    } catch {
      // tracking must never break page render
    }
  }, [path, eventName, trackPageView])
}