/**
 * TechSkillHub — fixed-window Founding Learner campaign.
 *
 * No dates are guessed or stored in client state. The offer is active only when
 * explicitly enabled, both timestamps are valid ISO instants with a timezone,
 * and server time is inside the configured [startsAt, endsAt) window.
 */
export const FOUNDING_LEARNER_CAMPAIGN_ID = 'FOUNDING_LEARNER_OFFER'
export const FOUNDING_LEARNER_TIME_ZONE = 'Africa/Lagos'
export const FOUNDING_LEARNER_REGULAR_PRICE_MINOR = 600_000
export const FOUNDING_LEARNER_PROMO_PRICE_MINOR = 300_000
export const FOUNDING_LEARNER_DISCOUNT_PERCENT = 50

export interface FoundingLearnerCampaign {
  id: typeof FOUNDING_LEARNER_CAMPAIGN_ID
  enabled: boolean
  configured: boolean
  active: boolean
  startsAt: string | null
  endsAt: string | null
  timezone: typeof FOUNDING_LEARNER_TIME_ZONE
  regularPriceMinor: number
  promotionalPriceMinor: number
  discountPercent: number
}

type Env = Record<string, string | undefined>

function parseConfiguredInstant(value: string | undefined): Date | null {
  if (!value || !/(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) return null
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? date : null
}

export function getFoundingLearnerCampaign(
  env: Env = process.env,
  now: Date = new Date(),
): FoundingLearnerCampaign {
  const enabled = env.COMMERCE_FOUNDING_OFFER_ENABLED === 'true'
  const startsAtDate = parseConfiguredInstant(env.COMMERCE_FOUNDING_OFFER_STARTS_AT)
  const endsAtDate = parseConfiguredInstant(env.COMMERCE_FOUNDING_OFFER_ENDS_AT)
  const configured = Boolean(startsAtDate && endsAtDate && startsAtDate.getTime() < endsAtDate.getTime())
  const active = Boolean(
    enabled &&
      configured &&
      startsAtDate &&
      endsAtDate &&
      now.getTime() >= startsAtDate.getTime() &&
      now.getTime() < endsAtDate.getTime(),
  )

  return {
    id: FOUNDING_LEARNER_CAMPAIGN_ID,
    enabled,
    configured,
    active,
    startsAt: configured ? startsAtDate!.toISOString() : null,
    endsAt: configured ? endsAtDate!.toISOString() : null,
    timezone: FOUNDING_LEARNER_TIME_ZONE,
    regularPriceMinor: FOUNDING_LEARNER_REGULAR_PRICE_MINOR,
    promotionalPriceMinor: FOUNDING_LEARNER_PROMO_PRICE_MINOR,
    discountPercent: FOUNDING_LEARNER_DISCOUNT_PERCENT,
  }
}
