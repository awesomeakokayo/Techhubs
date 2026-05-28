import { track } from '@vercel/analytics'

export type AnalyticsEvent = {
  event_name: string
  path?: string
  track_slug?: string
  resource_title?: string
  resource_type?: string
  project_name?: string
  roadmap_stage?: string
  search_category?: string
  outbound_url?: string
  quiz_result?: string[]
  query_length?: number
  result_count?: number
  timestamp?: string
}

function basePayload(payload: Omit<AnalyticsEvent, 'timestamp'>): AnalyticsEvent {
  return {
    ...payload,
    timestamp: new Date().toISOString(),
  }
}

type AnalyticsValue = string | number | boolean | null | undefined

function safeTrack(event_name: string, payload: Record<string, AnalyticsValue>) {
  try {
    track(event_name, payload)
  } catch {
    // swallow analytics errors to avoid impacting UX
  }
}

export function trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>) {
  const payload = basePayload(event)
  const normalized = Object.entries(payload).reduce<Record<string, AnalyticsValue>>(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.join(',')
      } else {
        acc[key] = value as AnalyticsValue
      }
      return acc
    },
    {}
  )
  safeTrack(payload.event_name, normalized)
}

export function trackPageView(path: string, event_name = 'page_view') {
  trackEvent({ event_name, path })
}

export function trackOutboundClick(data: {
  path?: string
  track_slug?: string
  resource_title?: string
  resource_type?: string
  outbound_url: string
}) {
  trackEvent({
    event_name: 'resource_click',
    ...data,
  })
}

export function trackSearch(data: {
  path?: string
  query_length: number
  result_count: number
  search_category?: string
}) {
  trackEvent({
    event_name: 'search_used',
    ...data,
  })
}

export function trackQuizCompletion(quiz_result: string[], path = '/start-here') {
  trackEvent({
    event_name: 'quiz_completed',
    path,
    quiz_result,
  })
}

export function trackRoadmapCompletion(data: {
  path?: string
  track_slug?: string
  roadmap_stage: string
}) {
  trackEvent({
    event_name: 'roadmap_stage_complete',
    ...data,
  })
}
