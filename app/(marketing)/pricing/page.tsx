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
  FOUNDING_LEARNER_PRICING_VERSION,
  formatPrice,
  resolveProviderPrice,
} from '@/lib/commercial/pricing'
import { getFoundingLearnerCampaign } from '@/lib/commercial/campaign'
import { PLAN_IDS, PLANS, allowanceForTier, premiumTrackIds, type PlanId } from '@/lib/commercial/plans'
import { checkoutEnabled, selectProvider, type ProviderId } from '@/lib/commercial/providers'
import { launchReadiness } from '@/lib/commercial/launch'
import { TRACKS } from '@/lib/tracks'

export const metadata: Metadata = {
  ...getPageMetadata({
    title: 'Pricing — Free, Guided Path and Pro',
    description:
      'Start for free, get three months of access to one guided learning path, or choose TechSkillHub Pro for all included premium guided paths.',
    path: '/pricing',
    keywords: ['techskillhub pricing', 'guided path pass', 'founding learner offer', 'pro plan'],
  }),
  // Keep this route out of search results until the commerce release gate is approved.
  robots: process.env.COMMERCE_PRICES_APPROVED === 'true' ? undefined : { index: false, follow: false },
}

function publicPriceLabel(planId: PlanId, displayProvider: ProviderId): string {
  const price = resolveProviderPrice(displayProvider, planId)
  return price?.approved ? formatPrice(price) : 'Not available in your region yet'
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

export default function PricingPage({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const queryParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value

  const resumePlanValue = queryParam(searchParams.resumeCheckout)
  const resumePlan = PLAN_IDS.includes(resumePlanValue as PlanId) ? resumePlanValue as PlanId : null
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

  const campaign = getFoundingLearnerCampaign()
  const trackPassProvider = selectProvider('TRACK_PASS', preferredProvider)
  const trackPassReady = checkedOutPlanReady('TRACK_PASS', preferredProvider)
  // Never display urgency when a real purchase cannot be completed.
  const showFoundingOffer = country === 'NG' && campaign.active && trackPassReady
  const trackPassBasePrice = resolveProviderPrice(preferredProvider, 'TRACK_PASS')
  const trackPassDisplayPrice = showFoundingOffer
    ? formatPrice({ ...trackPassBasePrice!, amountMinor: campaign.promotionalPriceMinor })
    : publicPriceLabel('TRACK_PASS', preferredProvider)
  const trackPassPricingVersion = requestedPricingVersion && resumePlan === 'TRACK_PASS'
    ? requestedPricingVersion
    : showFoundingOffer
      ? FOUNDING_LEARNER_PRICING_VERSION
      : COMMERCIAL_PRICING_VERSION

  const monthlyPrice = resolveProviderPrice(preferredProvider, 'PRO_MONTHLY')
  const quarterlyPrice = resolveProviderPrice(preferredProvider, 'PRO_QUARTERLY')
  const annualPrice = resolveProviderPrice(preferredProvider, 'PRO_ANNUAL')
  const monthlyMinor = monthlyPrice?.approved ? monthlyPrice.amountMinor : null
  const quarterlyMinor = quarterlyPrice?.approved ? quarterlyPrice.amountMinor : null
  const annualMinor = annualPrice?.approved ? annualPrice.amountMinor : null
  const quarterlySavings = monthlyMinor && quarterlyMinor
    ? Math.round((1 - quarterlyMinor / (monthlyMinor * 3)) * 1000) / 10
    : null
  const annualSavings = monthlyMinor && annualMinor
    ? Math.round((1 - annualMinor / (monthlyMinor * 12)) * 1000) / 10
    : null

  const proPlans: { id: PlanId; label: string; cadence: string; saving: number | null; recommended?: boolean; bestValue?: boolean }[] = [
    { id: 'PRO_MONTHLY', label: 'Monthly', cadence: 'Billed monthly', saving: null },
    { id: 'PRO_QUARTERLY', label: 'Quarterly', cadence: 'Billed every three months', saving: quarterlySavings, recommended: true },
    { id: 'PRO_ANNUAL', label: 'Annual', cadence: 'Billed yearly', saving: annualSavings, bestValue: true },
  ]

  return (
    <div className="section pt-12 md:pt-16">
      <div className="container max-w-6xl">
        <PageViewTracker path="/pricing" eventName="pricing_viewed" />
        <PageHeader
          title="Choose your path. Build your future."
          subtitle="Start for free, get guided access to one learning path, or unlock the included premium guided paths with Pro."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]}
        />

        {showFoundingOffer && campaign.startsAt && campaign.endsAt && (
          <FoundingLearnerBanner
            startsAt={campaign.startsAt}
            endsAt={campaign.endsAt}
            regularPrice={formatPrice(trackPassBasePrice!)}
            promotionalPrice={formatPrice({ ...trackPassBasePrice!, amountMinor: campaign.promotionalPriceMinor })}
            discountPercent={campaign.discountPercent}
            placement="pricing"
          />
        )}

        <div id="plans" className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
          <article className="card flex flex-col">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">01 / Start here</p>
            <h2 className="mt-3 font-display text-xl font-semibold text-text-primary">Free</h2>
            <p className="mt-2 font-display text-3xl font-semibold text-text-primary">₦0</p>
            <p className="mt-3 text-sm leading-6 text-text-secondary">Explore technology and build your foundations without a payment barrier.</p>
            <ul className="mt-5 flex-1 space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Free roadmaps, resources, projects and career guides</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Available free learning and progress features</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Limited AI assessments</li>
            </ul>
            <a href="/find-your-path" className="btn btn-secondary mt-6 w-full justify-center">Start learning for free</a>
          </article>

          <article className="card flex flex-col">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">02 / One direction</p>
            <h2 className="mt-3 font-display text-xl font-semibold text-text-primary">Single Guided Path Pass</h2>
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <p className="font-display text-3xl font-semibold text-text-primary">{trackPassDisplayPrice}</p>
              {showFoundingOffer && (
                <>
                  <p className="text-sm text-text-muted line-through">₦6,000</p>
                  <span className="rounded-sm bg-brand/10 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-brand">50% off</span>
                </>
              )}
            </div>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Focus on one selected premium guided path for three calendar months. No automatic renewal.
            </p>
            <ul className="mt-5 flex-1 space-y-3 text-sm text-text-secondary">
              {PLANS.TRACK_PASS.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> {feature}</li>
              ))}
            </ul>
            <div className="mt-6">
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

          <article id="pro" className="card flex flex-col border-2 border-brand shadow-sm">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brand">03 / Full premium access</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-text-primary">TechSkillHub Pro</h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              For learners building several skills, shipping projects, and using AI assessment regularly.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> All included premium guided paths</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> {allowanceForTier('PRO')} AI assessments per month</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Cancellation and period-end access handled according to the selected subscription terms</li>
            </ul>

            <div className="mt-6 border-t border-border-default">
              {proPlans.map((item) => {
                const provider = selectProvider(item.id, preferredProvider)
                const ready = checkedOutPlanReady(item.id, preferredProvider)
                const price = publicPriceLabel(item.id, preferredProvider)
                const resumedExpectedVersion = requestedPricingVersion && resumePlan === item.id
                  ? requestedPricingVersion
                  : COMMERCIAL_PRICING_VERSION
                return (
                  <div key={item.id} className="border-b border-border-default py-4 last:border-b-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary">
                          {item.label}
                          {item.recommended ? <span className="ml-2 font-mono text-[0.55rem] uppercase tracking-widest text-brand">Recommended</span> : null}
                          {item.bestValue ? <span className="ml-2 font-mono text-[0.55rem] uppercase tracking-widest text-brand">Best value</span> : null}
                        </p>
                        <p className="mt-1 font-display text-xl font-semibold text-text-primary">
                          {price}{item.id === 'PRO_MONTHLY' ? ' / month' : item.id === 'PRO_QUARTERLY' ? ' / 3 months' : ' / year'}
                        </p>
                        <p className="mt-1 text-xs text-text-muted">{item.cadence}</p>
                        {item.id === 'PRO_QUARTERLY' && quarterlyMinor && (
                          <p className="mt-1 text-xs text-text-secondary">
                            About ₦{Math.round(quarterlyMinor / 100 / 3).toLocaleString('en-NG')}/month
                            {item.saving !== null && item.saving > 0 ? ` · Save ${item.saving}%` : ''}
                          </p>
                        )}
                        {item.id === 'PRO_ANNUAL' && annualMinor && (
                          <p className="mt-1 text-xs text-text-secondary">
                            ₦{Math.round(annualMinor / 100 / 12).toLocaleString('en-NG')}/month
                            {item.saving !== null && item.saving > 0 ? ` · Save ${item.saving}%` : ''}
                          </p>
                        )}
                      </div>
                      <CheckoutButton
                        planId={item.id}
                        autoStart={resumePlan === item.id}
                        label={ready ? (item.id === 'PRO_QUARTERLY' ? 'Choose quarterly' : `Choose ${item.label.toLowerCase()}`) : 'Not available yet'}
                        disabled={!ready}
                        disabledReason={checkoutReason(item.id, provider, country)}
                        expectedPricingVersion={resumedExpectedVersion}
                        className={item.recommended ? 'btn btn-primary justify-center' : 'btn btn-secondary justify-center'}
                        resumePath="/pricing"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        </div>

        <p className="mt-8 text-xs leading-5 text-text-muted">
          The Single Guided Path Pass is a one-time payment for three calendar months; it does not renew automatically.
          Pro renews at the monthly, three-month or annual interval selected before checkout, subject to the verified payment flow.
          Prices and terms are shown before payment. Free roadmaps, public resources, projects, career guides, progress and earned certificates are not removed when a paid period ends.
        </p>
        <p className="mt-3 text-xs leading-5 text-text-muted">
          {(!checkoutEnabled() || process.env.COMMERCE_PRICES_APPROVED !== 'true')
            ? 'Paid checkout is not open yet. Approved prices are displayed for planning; no charge starts until the relevant payment route and access checks are enabled.'
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
    a: 'Pro provides access to all included premium guided paths and a higher AI assessment allowance. The pricing card shows the applicable monthly, three-month or yearly billing interval.',
  },
  {
    q: 'How does the Founding Learner offer work?',
    a: 'When the fixed campaign is active, the Single Guided Path Pass is ₦3,000 instead of ₦6,000 for three months. The offer closes at the date and time shown in Africa/Lagos time; it will not display an active countdown without a configured, valid campaign window.',
  },
  {
    q: 'Will my subscription renew automatically?',
    a: 'Pro is a recurring subscription at the interval shown before checkout. Cancellation and renewal handling are only enabled with the verified payment flow; the final checkout screen must show the applicable terms before you confirm.',
  },
]
