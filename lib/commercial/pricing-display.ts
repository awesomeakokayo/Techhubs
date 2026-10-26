/**
 * Public pricing-page display rules.
 *
 * Approved Nigerian amounts remain visible while checkout is closed. A
 * promotional amount is presented as the active price only while its configured
 * campaign is active AND the matching checkout is ready; otherwise the UI may
 * explain the planned offer without pretending it can currently be purchased.
 */
import type { PlanId } from './plans'
import type { ProviderId } from './providers'
import {
  COMMERCIAL_PRICING_VERSION,
  FOUNDING_LEARNER_PRICING_VERSION,
  formatPrice,
  resolveProviderPrice,
} from './pricing'
import { getFoundingLearnerCampaign } from './campaign'

export interface PublicPricingPriceDisplay {
  priceLabel: string
  regularPriceLabel: string | null
  offerNotice: string | null
  isPromotional: boolean
  pricingVersion: string
  campaignId: string | null
}

export function resolvePublicPricingPriceDisplay(options: {
  provider: ProviderId | null
  planId: PlanId
  country: string
  checkoutReady: boolean
  now?: Date
  env?: Record<string, string | undefined>
}): PublicPricingPriceDisplay {
  const {
    provider,
    planId,
    country,
    checkoutReady,
    now = new Date(),
    env = process.env,
  } = options

  const unavailable: PublicPricingPriceDisplay = {
    priceLabel: 'Not available in your region yet',
    regularPriceLabel: null,
    offerNotice: null,
    isPromotional: false,
    pricingVersion: COMMERCIAL_PRICING_VERSION,
    campaignId: null,
  }

  if (!provider) return unavailable

  const base = resolveProviderPrice(provider, planId)
  if (!base?.approved) return unavailable

  const campaign = getFoundingLearnerCampaign(env, now)
  const isNigerianTrackPass =
    provider === 'paystack' &&
    country.trim().toUpperCase() === 'NG' &&
    planId === 'TRACK_PASS' &&
    base.amountMinor === campaign.regularPriceMinor

  const isPromotional = Boolean(
    isNigerianTrackPass &&
    campaign.active &&
    checkoutReady,
  )

  if (isPromotional) {
    return {
      priceLabel: formatPrice({ ...base, amountMinor: campaign.promotionalPriceMinor }),
      regularPriceLabel: formatPrice(base),
      offerNotice: null,
      isPromotional: true,
      pricingVersion: FOUNDING_LEARNER_PRICING_VERSION,
      campaignId: campaign.id,
    }
  }

  let offerNotice: string | null = null
  if (isNigerianTrackPass) {
    if (campaign.active && !checkoutReady) {
      offerNotice = 'Founding Learner price: ₦3,000. Checkout is not open yet.'
    } else if (
      campaign.configured &&
      campaign.enabled &&
      campaign.startsAt &&
      now.getTime() < new Date(campaign.startsAt).getTime()
    ) {
      const startLabel = new Intl.DateTimeFormat('en-NG', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Africa/Lagos',
      }).format(new Date(campaign.startsAt))
      offerNotice = `Founding Learner offer: ₦3,000 from ${startLabel} (Africa/Lagos).`
    } else if (
      campaign.configured &&
      campaign.endsAt &&
      now.getTime() >= new Date(campaign.endsAt).getTime()
    ) {
      offerNotice = 'The Founding Learner offer has ended.'
    } else {
      offerNotice = 'Founding Learner offer planned at ₦3,000 (50% off ₦6,000); dates will be announced.'
    }
  }

  return {
    priceLabel: formatPrice(base),
    regularPriceLabel: null,
    offerNotice,
    isPromotional: false,
    pricingVersion: COMMERCIAL_PRICING_VERSION,
    campaignId: null,
  }
}
