'use client'

import {
  trackEvent,
  trackOutboundClick,
  trackPageView,
  trackQuizCompletion,
  trackRoadmapCompletion,
  trackSearch,
  type AnalyticsEvent,
} from '@/lib/analytics'

export function useAnalytics() {
  return {
    trackEvent: (event: Omit<AnalyticsEvent, 'timestamp'>) => trackEvent(event),
    trackPageView,
    trackOutboundClick,
    trackSearch,
    trackQuizCompletion,
    trackRoadmapCompletion,
  }
}
