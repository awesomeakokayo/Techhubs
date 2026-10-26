import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { CheckoutButton } from '@/components/commercial/CheckoutButton'
import { FoundingLearnerBanner } from '@/components/commercial/FoundingLearnerBanner'
import { getPageMetadata } from '@/lib/seo/utils'
import {
  COMMERCIAL_PRICING_VERSION,
  formatPrice,
  resolveProviderPrice,
} from '@/lib/commercial/pricing'
import { resolvePublicPricingPriceDisplay } from '@/lib/commercial/pricing-display'
import { getFoundingLearnerCampaign } from '@/lib/commercial/campaign'
import { PLANS, allowanceForTier, premiumTrackIds, type PlanId } from '@/lib/commercial/plans'
import { checkoutEnabled, selectProvider, type ProviderId } from '@/lib/commercial/providers'
import { launchReadiness } from '@/lib/commercial/launch'
import { TRACKS } from '@/lib/tracks'

export const metadata: Metadata = {
  ...getPageMetadata({
    title: 'TechSkillHub Pricing — Free, Track Pass and Pro',
    description:
      'Compare TechSkillHub Free, Single Guided Path Pass, Pro Monthly and Pro Annual. See Nigerian pricing and what each plan includes.',
    path: '/pricing',
    keywords: ['techskillhub pricing', 'guided path pass', 'founding learner offer', 'pro plan'],
  }),
  // Approved NGN prices can be shown while checkout is gated. Keep this page
  // out of search results until the commerce publication switch is approved.
  robots: process.env.COMMERCE_PRICES_APPROVED === 'true' ? undefined : { index: false, follow: false },
}

function checkoutReason(planId: PlanId, provider: ProviderId | null, country: string): string | undefined {
  if (country === 'NG' && planId !== 'TRACK_PASS') {
    return 'Pro recurring checkout opens after Paystack plan codes and sandbox renewals are verified.'
  }
  if (!provider) return 'The payment option for this plan is not configured in your region yet.'
  if (!checkoutEnabled() || !launchReadiness(process.env, planId, provider).ready) {
    return 'Checkout is not open yet. The payment and access checks must pass before a charge can start.'
  }
  return undefined
}

function checkedOutPlanReady(planId: PlanId, preferredProvider: ProviderId): boolean {
  const provider = selectProvider(planId, preferredProvider)
  return Boolean(checkoutEnabled() && provider && launchReadiness(process.env, planId, provider).ready)
}

const PRO_CARD_PLANS: {
  id: 'PRO_MONTHLY' | 'PRO_ANNUAL'
  eyebrow: string
  billingLabel: string
  badge?: string
}[] = [
  { id: 'PRO_MONTHLY', eyebrow: '03 / Flexible billing', billingLabel: 'Billed monthly' },
  { id: 'PRO_ANNUAL', eyebrow: '04 / Long-term value', billingLabel: 'Billed yearly', badge: 'Best value' },
]

export default function PricingPage({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const queryParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value

  const resumePlanValue = queryParam(searchParams.resumeCheckout)
  const resumePlan = ['TRACK_PASS', 'PRO_MONTHLY', 'PRO_ANNUAL'].includes(resumePlanValue ?? '')
    ? (resumePlanValue as PlanId)
    : null
  const requestedTrackId = queryParam(searchParams.trackId)
  const requestedPricingVersion = queryParam(searchParams.expectedPricingVersion)

  const country = headers().get('x-vercel-ip-country')?.trim().toUpperCase() ?? ''
  const preferredProvider: ProviderId = country === 'NG' ? 'paystack' : 'lemonsqueezy'
  const trackOptions = premiumTrackIds().flatMap((id) => {
    const track = TRACKS.find((item) => item.id === id)
    return track ? [{ id: track.id, name: track.name }] : []
  })
  const resumedTrackId =
    resumePlan === 'TRACK_PASS' && requestedTrackId && trackOptions.some((track) => track.id === requestedTrackId)
      ? requestedTrackId
      : undefined

  const now = new Date()
  const campaign = getFoundingLearnerCampaign(process.env, now)
  const trackPassProvider = selectProvider('TRACK_PASS', preferredProvider)
  const trackPassReady = Boolean(
    checkoutEnabled() &&
    trackPassProvider &&
    launchReadiness(process.env, 'TRACK_PASS', trackPassProvider).ready
  )
  const trackPassPriceDisplay = resolvePublicPricingPriceDisplay({
    provider: trackPassProvider,
    planId: 'TRACK_PASS',
    country,
    checkoutReady: trackPassReady,
    now,
  })
  const showFoundingOffer = trackPassPriceDisplay.isPromotional
  const trackPassBasePrice = resolveProviderPrice(preferredProvider, 'TRACK_PASS')
  const trackPassPricingVersion =
    requestedPricingVersion && resumePlan === 'TRACK_PASS'
      ? requestedPricingVersion
      : trackPassPriceDisplay.pricingVersion

  return (
    <div className="section pt-12 md:pt-16">
      <div className="container max-w-6xl">
        <PageViewTracker path="/pricing" eventName="pricing_viewed" />
        <PageHeader
          title="Choose your path. Build your future."
          subtitle="Start for free, focus on one guided path, or unlock premium learning with Pro. Every plan is clearly priced so you can choose what fits."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]}
        />

        {showFoundingOffer && campaign.startsAt && campaign.endsAt && trackPassBasePrice && (
          <FoundingLearnerBanner
            startsAt={campaign.startsAt}
            endsAt={campaign.endsAt}
            regularPrice={formatPrice(trackPassBasePrice)}
            promotionalPrice={trackPassPriceDisplay.priceLabel}
            discountPercent={campaign.discountPercent}
            placement="pricing"
          />
        )}

        <div id="plans" className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <article className="card flex h-full flex-col">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">01 / Start here</p>
            <h2 className="mt-3 min-h-14 font-display text-xl font-semibold text-text-primary">Free</h2>
            <p className="mt-3 font-display text-3xl font-semibold text-text-primary">₦0 <span className="font-sans text-sm font-normal text-text-secondary">/ forever</span></p>
            <p className="mt-3 min-h-14 text-sm leading-6 text-text-secondary">Build your tech foundations and explore available learning resources without a payment barrier.</p>
            <ul className="mt-5 flex-1 space-y-3 text-sm leading-5 text-text-secondary">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Free roadmaps, resources, projects and career guides</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Available free learning and progress features</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Limited AI assessments</li>
            </ul>
            <a href="/find-your-path" className="btn btn-secondary mt-8 w-full justify-center">Start learning for free</a>
          </article>

          <article className="card flex h-full flex-col">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">02 / One direction</p>
            <h2 className="mt-3 min-h-14 font-display text-xl font-semibold text-text-primary">Single Guided Path Pass</h2>
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <p className="font-display text-3xl font-semibold text-text-primary">{trackPassPriceDisplay.priceLabel}</p>
              {trackPassPriceDisplay.regularPriceLabel && (
                <p className="text-sm text-text-muted line-through">{trackPassPriceDisplay.regularPriceLabel}</p>
              )}
            </div>
            {trackPassPriceDisplay.offerNotice && (
              <p className="mt-2 text-xs leading-5 text-text-secondary">{trackPassPriceDisplay.offerNotice}</p>
            )}
            <p className="mt-3 min-h-14 text-sm leading-6 text-text-secondary">Focus on one selected premium guided path for three calendar months. It never renews automatically.</p>
            <ul className="mt-5 flex-1 space-y-3 text-sm leading-5 text-text-secondary">
              {PLANS.TRACK_PASS.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> {feature}</li>
              ))}
            </ul>
            <div className="mt-8">
              <CheckoutButton
                planId="TRACK_PASS"
                trackId={resumedTrackId}
                trackOptions={resumedTrackId ? undefined : trackOptions}
                autoStart={resumePlan === 'TRACK_PASS' && (!resumePlan || Boolean(resumedTrackId))}
                label={trackPassReady ? 'Choose a guided path' : 'Checkout not available yet'}
                disabled={!trackPassReady}
                disabledReason={checkoutReason('TRACK_PASS', trackPassProvider, country)}
                expectedPricingVersion={trackPassPricingVersion}
                className="btn btn-primary w-full justify-center"
                resumePath="/pricing"
              />
            </div>
          </article>

          {PRO_CARD_PLANS.map((card) => {
            const plan = PLANS[card.id]
            const provider = selectProvider(card.id, preferredProvider)
            const ready = checkedOutPlanReady(card.id, preferredProvider)
            const priceDisplay = resolvePublicPricingPriceDisplay({
              provider,
              planId: card.id,
              country,
              checkoutReady: ready,
              now,
            })
            const expectedVersion =
              requestedPricingVersion && resumePlan === card.id
                ? requestedPricingVersion
                : priceDisplay.pricingVersion

            return (
              <article key={card.id} className={`card relative flex h-full flex-col ${card.id === 'PRO_ANNUAL' ? 'border-2 border-brand shadow-sm' : ''}`}>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand">{card.eyebrow}</p>
                {card.badge && <span className="absolute right-4 top-4 rounded-sm bg-brand/10 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-widest text-brand">{card.badge}</span>}
                <h2 className="mt-3 min-h-14 pr-2 font-display text-xl font-semibold text-text-primary">{plan.displayName}</h2>
                <p className="mt-3 min-h-14 text-sm leading-6 text-text-secondary">{plan.summary}</p>
                <p className="mt-3 font-display text-3xl font-semibold text-text-primary">
                  {priceDisplay.priceLabel}{card.id === 'PRO_MONTHLY' ? ' / month' : ' / year'}
                </p>
                <p className="mt-1 min-h-5 text-xs text-text-muted">{card.billingLabel}</p>
                {card.id === 'PRO_ANNUAL' && priceDisplay.priceLabel.startsWith('₦') && (
                  <p className="mt-1 text-xs text-text-secondary">
                    About ₦{Math.round((resolveProviderPrice(provider ?? 'paystack', 'PRO_ANNUAL')?.amountMinor ?? 0) / 100 / 12).toLocaleString('en-NG')}/month, billed yearly
                  </p>
                )}
                <ul className="mt-5 flex-1 space-y-3 text-sm leading-5 text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> {feature}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CheckoutButton
                    planId={card.id}
                    autoStart={resumePlan === card.id}
                    label={ready ? `Choose ${card.id === 'PRO_MONTHLY' ? 'monthly Pro' : 'annual Pro'}` : 'Checkout not available yet'}
                    disabled={!ready}
                    disabledReason={checkoutReason(card.id, provider, country)}
                    expectedPricingVersion={expectedVersion || COMMERCIAL_PRICING_VERSION}
                    className={card.id === 'PRO_ANNUAL' ? 'btn btn-primary w-full justify-center' : 'btn btn-secondary w-full justify-center'}
                    resumePath="/pricing"
                  />
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-8 text-xs leading-5 text-text-muted">
          The Single Guided Path Pass is a one-time payment for three calendar months; it does not renew automatically.
          Pro renews monthly or yearly according to the plan selected before checkout, until cancelled. Your terms and price are shown before payment.
          Free resources, existing progress, submissions and earned certificates are preserved when a paid period ends.
        </p>
        <p className="mt-3 text-xs leading-5 text-text-muted">
          {(!checkoutEnabled() || process.env.COMMERCE_PRICES_APPROVED !== 'true')
            ? 'Paid checkout is not open yet. Approved Nigerian prices are displayed for planning; no charge starts until the relevant payment route and access checks are enabled.'
            : 'Payment availability depends on your region and the payment method shown on the selected plan.'}
        </p>

        <section className="mt-12 border-t border-border-default pt-8" aria-labelledby="pricing-faq">
          <h2 id="pricing-faq" className="font-display text-xl font-semibold text-text-primary">Pricing questions</h2>
          <dl className="mt-5 grid gap-5 md:grid-cols-2">
            {PRICING_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-medium text-text-primary">{item.q}</dt>
                <dd className="mt-1 text-sm leading-6 text-text-secondary">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}

const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: 'Can I start for free?',
    a: 'Yes. Free roadmaps, resources, projects, career guides and available learning features remain accessible without paying. AI assessments have a small monthly allowance.',
  },
  {
    q: 'What does the Single Guided Path Pass include?',
    a: 'It provides three calendar months of access to one selected premium guided path and the premium features explicitly listed for that path. It does not unlock every premium path and it does not auto-renew.',
  },
  {
    q: 'What happens after my guided-path access expires?',
    a: 'Your access to that paid path ends, but free resources and existing progress, submissions and earned certificates are preserved. You can continue learning from the free catalogue.',
  },
  {
    q: 'What is TechSkillHub Pro?',
    a: 'Pro provides access to all included premium guided paths and a higher AI assessment allowance. Monthly and annual prices are displayed separately above.',
  },
  {
    q: 'How does the Founding Learner offer work?',
    a: 'When the fixed campaign is active and checkout is ready, the Single Guided Path Pass is ₦3,000 instead of ₦6,000 for three months. Until then, the planned offer is disclosed without presenting it as an active sale. No countdown appears without a configured, valid campaign window.',
  },
  {
    q: 'Will my subscription renew automatically?',
    a: 'Pro automatically renews monthly or yearly according to the plan you select, until you cancel. Cancellation stops future renewals while access remains through the paid period. These terms must be shown at checkout before you confirm.',
  },
]
