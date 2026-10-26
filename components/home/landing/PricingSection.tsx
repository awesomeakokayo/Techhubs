import Link from 'next/link'
import { headers } from 'next/headers'
import { ArrowRight, Check } from 'lucide-react'
import { CheckoutButton } from '@/components/commercial/CheckoutButton'
import { FoundingLearnerBanner } from '@/components/commercial/FoundingLearnerBanner'
import {
  COMMERCIAL_PRICING_VERSION,
  FOUNDING_LEARNER_PRICING_VERSION,
  formatPrice,
  resolveProviderPrice,
} from '@/lib/commercial/pricing'
import { getFoundingLearnerCampaign } from '@/lib/commercial/campaign'
import { PLANS, allowanceForTier, premiumTrackIds, type PlanId } from '@/lib/commercial/plans'
import { checkoutEnabled, selectProvider, type ProviderId } from '@/lib/commercial/providers'
import { launchReadiness } from '@/lib/commercial/launch'
import { TRACKS } from '@/lib/tracks'

function priceLabel(planId: PlanId, displayProvider: ProviderId): string {
  const price = resolveProviderPrice(displayProvider, planId)
  if (price?.approved) return formatPrice(price)
  return 'Pricing not available in this region yet'
}

function unavailableReason(
  planId: PlanId,
  provider: ProviderId | null,
  country: string,
): string | undefined {
  if (country === 'NG' && planId !== 'TRACK_PASS') {
    return 'Pro recurring billing is being prepared. Checkout opens after plan codes and provider tests are verified.'
  }
  if (!provider) return 'Checkout is not configured for this plan and region yet.'
  if (!checkoutEnabled() || !launchReadiness(process.env, planId, provider).ready) {
    return 'Checkout is not available until pricing, access and payment checks are complete.'
  }
  return undefined
}

/**
 * A concise pricing entry point on the landing page. It uses the central plan
 * catalogue and server-side launch gates; it never grants access or publishes
 * a live countdown without a valid campaign window and a ready checkout.
 */
export function PricingSection() {
  const country = headers().get('x-vercel-ip-country')?.trim().toUpperCase() ?? ''
  const preferredProvider: ProviderId = country === 'NG' ? 'paystack' : 'lemonsqueezy'
  const checkoutReady = checkoutEnabled()
  const campaign = getFoundingLearnerCampaign()
  const trackOptions = premiumTrackIds().flatMap((id) => {
    const track = TRACKS.find((item) => item.id === id)
    return track ? [{ id: track.id, name: track.name }] : []
  })

  const providerFor = (planId: PlanId) => selectProvider(planId, preferredProvider)
  const isReady = (planId: PlanId) => {
    const provider = providerFor(planId)
    return Boolean(checkoutReady && provider && launchReadiness(process.env, planId, provider).ready)
  }
  const reasonFor = (planId: PlanId) => unavailableReason(planId, providerFor(planId), country)

  const trackPassReady = isReady('TRACK_PASS')
  const showFoundingOffer = country === 'NG' && campaign.active && trackPassReady
  const trackPassVersion = showFoundingOffer ? FOUNDING_LEARNER_PRICING_VERSION : COMMERCIAL_PRICING_VERSION
  const monthly = resolveProviderPrice(preferredProvider, 'PRO_MONTHLY')
  const quarterly = resolveProviderPrice(preferredProvider, 'PRO_QUARTERLY')
  const annual = resolveProviderPrice(preferredProvider, 'PRO_ANNUAL')
  const monthlyAmount = monthly?.approved ? monthly.amountMinor : null
  const quarterlyAmount = quarterly?.approved ? quarterly.amountMinor : null
  const annualAmount = annual?.approved ? annual.amountMinor : null
  const quarterlySaving = monthlyAmount && quarterlyAmount
    ? Math.round((1 - quarterlyAmount / (monthlyAmount * 3)) * 1000) / 10
    : null
  const annualSaving = monthlyAmount && annualAmount
    ? Math.round((1 - annualAmount / (monthlyAmount * 12)) * 1000) / 10
    : null

  return (
    <section id="pricing" className="border-y border-hairline bg-paper">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-8">
            <p className="landing-eyebrow">Plans / Choose your pace</p>
            <h2 className="landing-display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.8rem)]">
              Choose your path.
              <br />
              <span className="landing-serif text-brand">Build your future.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/70 md:col-span-4 md:justify-self-end">
            Start for free, get guided access to one learning path, or choose Pro for all
            included premium guided paths.
          </p>
        </div>

        {showFoundingOffer && campaign.endsAt && (
          <FoundingLearnerBanner
            startsAt={campaign.startsAt!}
            endsAt={campaign.endsAt}
            regularPrice={formatPrice(resolveProviderPrice('paystack', 'TRACK_PASS')!)}
            promotionalPrice="₦3,000"
            discountPercent={campaign.discountPercent}
            placement="homepage"
          />
        )}

        <div id="plans" className="mt-9 grid gap-4 lg:grid-cols-3">
          <article className="flex flex-col rounded-[18px] border border-hairline bg-white p-5 md:p-6">
            <p className="landing-eyebrow">01 / Start here</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">Free</h3>
            <p className="mt-2 font-display text-3xl font-semibold text-ink">₦0</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Explore tech and build your foundations without a payment barrier.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/75">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Free roadmaps, resources, projects and career guides</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Progress tracking and completion certificates</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Limited AI assessments</li>
            </ul>
            <Link href="/find-your-path" className="btn btn-secondary mt-6 w-full justify-center">
              Start learning <ArrowRight size={15} />
            </Link>
          </article>

          <article className="flex flex-col rounded-[18px] border border-hairline bg-white p-5 md:p-6">
            <p className="landing-eyebrow">02 / One direction</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">Single Guided Path</h3>
            {showFoundingOffer ? (
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-2xl font-semibold text-brand">₦3,000</span>
                <span className="text-sm text-ink/55 line-through">₦6,000</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-brand">Save 50%</span>
              </div>
            ) : (
              <p className="mt-2 font-display text-2xl font-semibold text-ink">
                {priceLabel('TRACK_PASS', preferredProvider)}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Focus on one selected premium guided path for three calendar months. No automatic
              renewal; your progress and earned certificates remain yours.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/75">
              {PLANS.TRACK_PASS.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> {feature}</li>
              ))}
            </ul>
            <div className="mt-6">
              <CheckoutButton
                planId="TRACK_PASS"
                trackOptions={trackOptions}
                label={trackPassReady ? 'Choose a guided path' : 'Checkout not available yet'}
                disabled={!trackPassReady}
                disabledReason={reasonFor('TRACK_PASS')}
                expectedPricingVersion={trackPassVersion}
                className="btn btn-secondary w-full justify-center"
                resumePath="/pricing"
              />
            </div>
          </article>

          <article id="pro" className="relative flex flex-col rounded-[18px] border-2 border-brand bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="landing-eyebrow text-brand">03 / Full premium access</p>
              <span className="rounded-full bg-brand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white">
                Pro
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">TechSkillHub Pro</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              For learners building several skills, shipping projects and using AI assessment
              regularly.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/75">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> All included premium guided paths</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> {allowanceForTier('PRO')} AI assessments each month</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Priority assessment capacity</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Cancel any time; access continues through the paid period</li>
            </ul>

            <div className="mt-6 space-y-4 border-t border-hairline pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">Monthly</p>
                  <p className="mt-1 text-sm text-ink/70">{priceLabel('PRO_MONTHLY', preferredProvider)} / month</p>
                </div>
                <CheckoutButton
                  planId="PRO_MONTHLY"
                  label={isReady('PRO_MONTHLY') ? 'Choose monthly' : 'Not available yet'}
                  disabled={!isReady('PRO_MONTHLY')}
                  disabledReason={reasonFor('PRO_MONTHLY')}
                  expectedPricingVersion={COMMERCIAL_PRICING_VERSION}
                  className="btn btn-secondary justify-center"
                  resumePath="/pricing"
                />
              </div>
              <div className="border-t border-hairline pt-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">Quarterly <span className="ml-1 font-mono text-[0.55rem] uppercase tracking-widest text-brand">Recommended</span></p>
                    <p className="mt-1 font-display text-xl font-semibold text-ink">{priceLabel('PRO_QUARTERLY', preferredProvider)} / 3 months</p>
                    {quarterlyAmount && monthlyAmount ? (
                      <p className="mt-1 text-xs text-ink/65">About ₦{Math.round(quarterlyAmount / 100 / 3).toLocaleString('en-NG')}/month{quarterlySaving !== null && quarterlySaving > 0 ? ` · Save ${quarterlySaving}%` : ''}</p>
                    ) : null}
                  </div>
                  <CheckoutButton
                    planId="PRO_QUARTERLY"
                    label={isReady('PRO_QUARTERLY') ? 'Choose quarterly' : 'Not available yet'}
                    disabled={!isReady('PRO_QUARTERLY')}
                    disabledReason={reasonFor('PRO_QUARTERLY')}
                    expectedPricingVersion={COMMERCIAL_PRICING_VERSION}
                    className="btn btn-primary justify-center"
                    resumePath="/pricing"
                  />
                </div>
              </div>
              <div className="border-t border-hairline pt-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">Annual <span className="ml-1 font-mono text-[0.55rem] uppercase tracking-widest text-brand">Best long-term value</span></p>
                    <p className="mt-1 font-display text-xl font-semibold text-ink">{priceLabel('PRO_ANNUAL', preferredProvider)} / year</p>
                    {annualAmount && monthlyAmount ? (
                      <p className="mt-1 text-xs text-ink/65">₦{Math.round(annualAmount / 100 / 12).toLocaleString('en-NG')}/month{annualSaving !== null && annualSaving > 0 ? ` · Save ${annualSaving}%` : ''}</p>
                    ) : null}
                  </div>
                  <CheckoutButton
                    planId="PRO_ANNUAL"
                    label={isReady('PRO_ANNUAL') ? 'Choose annual' : 'Not available yet'}
                    disabled={!isReady('PRO_ANNUAL')}
                    disabledReason={reasonFor('PRO_ANNUAL')}
                    expectedPricingVersion={COMMERCIAL_PRICING_VERSION}
                    className="btn btn-secondary justify-center"
                    resumePath="/pricing"
                  />
                </div>
              </div>
            </div>
            <Link href="/pricing#plans" className="landing-arrow mt-5">
              Compare all plan details <ArrowRight size={14} />
            </Link>
          </article>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-ink/65">
          Prices and billing terms are displayed up front. Checkout is enabled only after the
          corresponding payment method and access checks are verified. Free learning resources
          remain available regardless of AI assessment usage.
        </p>
      </div>
    </section>
  )
}
