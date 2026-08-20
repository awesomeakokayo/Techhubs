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
  quiz_level?: string
  query_length?: number
  result_count?: number
  cta_label?: string
  cta_href?: string
  content_type?: string
  feedback_helpful?: boolean
  feedback_reason?: string
  feedback_text?: string
  share_network?: string
  step_kind?: string
  step_label?: string
  step_href?: string
  roadmap_href?: string
  referrer?: string
  is_first_visit?: boolean
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

export function trackStartRoadmap(data: {
  path?: string
  track_slug?: string
  cta_label?: string
  purpose?: string
}) {
  trackEvent({
    event_name: 'roadmap_start',
    ...data,
  })
}

export function trackContentFeedback(data: {
  path: string
  content_type?: string
  helpful: boolean
  reason?: string
  detail?: string
}) {
  trackEvent({
    event_name: 'feedback_submitted',
    path: data.path,
    content_type: data.content_type,
    feedback_helpful: data.helpful,
    feedback_reason: data.reason,
    feedback_text: data.detail,
  })
}

export function trackShare(data: { path: string; content_type?: string; network: string }) {
  trackEvent({
    event_name: 'share_used',
    path: data.path,
    content_type: data.content_type,
    share_network: data.network,
  })
}

export function trackCtaClick(data: { path: string; cta_label: string; cta_href?: string }) {
  trackEvent({
    event_name: 'cta_click',
    path: data.path,
    cta_label: data.cta_label,
    cta_href: data.cta_href,
  })
}

/** Content landing (standardized across guides/careers/roadmaps/resources/projects). */
export function trackContentView(data: { path: string; content_type: string }) {
  trackEvent({
    event_name: 'content_view',
    path: data.path,
    content_type: data.content_type,
  })
}

/** Organic landing from a search engine (fired once per session). */
export function trackOrganicLanding(data: { path: string; referrer: string; is_first_visit?: boolean }) {
  trackEvent({
    event_name: 'organic_landing',
    path: data.path,
    referrer: data.referrer,
    is_first_visit: data.is_first_visit,
  })
}

/** A learner clicked a step inside the contextual learning funnel. */
export function trackNextStepClick(data: {
  path: string
  step_label: string
  step_href: string
  step_kind?: string
}) {
  trackEvent({
    event_name: 'next_step_click',
    path: data.path,
    step_label: data.step_label,
    step_href: data.step_href,
    step_kind: data.step_kind,
  })
}

/** A guide/educational page sent the learner into a roadmap. */
export function trackGuideToRoadmap(data: { path: string; cta_label?: string; roadmap_href?: string }) {
  trackEvent({
    event_name: 'guide_to_roadmap',
    path: data.path,
    cta_label: data.cta_label,
    roadmap_href: data.roadmap_href,
  })
}

/** A learner started a project (from project/level/roadmap context). */
export function trackProjectStart(data: { path: string; project_name?: string }) {
  trackEvent({
    event_name: 'project_start',
    path: data.path,
    project_name: data.project_name,
  })
}
