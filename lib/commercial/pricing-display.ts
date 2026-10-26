/**
 * Public pricing-page display rules.
 *
 * Approved Nigerian base prices remain visible while checkout is gated.
 * The ₦3,000 Founding Learner offer is always disclosed for planning, but it is
 * only presented as the current chargeable price when the fixed campaign window
 * is active and checkout is ready. A closed checkout never implies a live sale.
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

  const isPromotional = Boolean(isNigerianTrackPass && campaign.active && checkoutReady)
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

  if (!isNigerianTrackPass) {
    return {
      priceLabel: formatPrice(base),
      regularPriceLabel: null,
      offerNotice: null,
      isPromotional: false,
      pricingVersion: COMMERCIAL_PRICING_VERSION,
      campaignId: null,
    }
  }

  // Once the configured campaign has ended, revert to the regular price.
  if (campaign.configured && campaign.endsAt && now.getTime() >= new Date(campaign.endsAt).getTime()) {
    return {
      priceLabel: formatPrice(base),
      regularPriceLabel: null,
      offerNotice: 'The Founding Learner offer has ended.',
      isPromotional: false,
      pricingVersion: COMMERCIAL_PRICING_VERSION,
      campaignId: null,
    }
  }

  // A future, explicitly configured campaign is advertised without activating
  // the discount early. Checkout stays at the regular price until the start.
  if (campaign.configured && campaign.enabled && campaign.startsAt && now.getTime() < new Date(campaign.startsAt).getTime()) {
    const startLabel = new Intl.DateTimeFormat('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Lagos',
    }).format(new Date(campaign.startsAt))
    return {
      priceLabel: formatPrice(base),
      regularPriceLabel: null,
      offerNotice: `Founding Learner offer: ₦3,000 from ${startLabel} (Africa/Lagos). The regular price applies until then.`,
      isPromotional: false,
      pricingVersion: COMMERCIAL_PRICING_VERSION,
      campaignId: null,
    }
  }

  // Show the planned amount prominently while checkout is closed. It remains
  // explicitly non-purchasable; the checkout version stays at the regular price.
  if (!checkoutReady) {
    return {
      priceLabel: formatPrice({ ...base, amountMinor: campaign.promotionalPriceMinor }),
      regularPriceLabel: formatPrice(base),
      offerNotice: campaign.active
        ? 'Founding Learner offer: 50% off the regular price. Checkout is not open yet.'
        : 'Planned Founding Learner offer: ₦3,000 (50% off ₦6,000); campaign dates and checkout availability will be announced.',
      isPromotional: false,
      pricingVersion: COMMERCIAL_PRICING_VERSION,
      campaignId: null,
    }
  }

  // If checkout is ready but the campaign is not currently active, never show
  // the discounted amount as purchasable.
  return {
    priceLabel: formatPrice(base),
    regularPriceLabel: null,
    offerNotice: 'Founding Learner offer planned at ₦3,000 (50% off ₦6,000); dates will be announced.',
    isPromotional: false,
    pricingVersion: COMMERCIAL_PRICING_VERSION,
    campaignId: null,
  }
}
