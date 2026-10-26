import Link from 'next/link'
import { headers } from 'next/headers'
import { ArrowRight, Check } from 'lucide-react'
import { CheckoutButton } from '@/components/commercial/CheckoutButton'
import { PLANS, allowanceForTier, premiumTrackIds, type PlanId } from '@/lib/commercial/plans'
import {
  formatPrice,
  isPriceApproved,
  pricesApprovedForPublication,
  resolveProviderPrice,
} from '@/lib/commercial/pricing'
import { checkoutEnabled, selectProvider, type ProviderId } from '@/lib/commercial/providers'
import { launchReadiness } from '@/lib/commercial/launch'
import { TRACKS } from '@/lib/tracks'

function priceLabel(planId: PlanId, provider: ProviderId | null): string {
  if (!pricesApprovedForPublication() || !provider) return 'Pricing to be announced'
  const price = resolveProviderPrice(provider, planId)
  if (!price || !isPriceApproved(price)) return 'Pricing to be announced'
  const interval = planId === 'PRO_MONTHLY' ? ' / month' : planId === 'PRO_ANNUAL' ? ' / year' : ' · one-time'
  return `${formatPrice(price)}${interval}`
}

function unavailableReason(
  planId: PlanId,
  provider: ProviderId | null,
  country: string,
): string | undefined {
  const price = provider ? resolveProviderPrice(provider, planId) : null
  if (!pricesApprovedForPublication() || !isPriceApproved(price)) {
    return 'Pricing and checkout are still being finalised.'
  }
  if (country === 'NG' && planId !== 'TRACK_PASS') {
    return 'Pro subscriptions in naira are not configured yet.'
  }
  if (!provider) return 'This payment option is not configured yet.'
  if (!checkoutEnabled() || !launchReadiness(process.env, planId, provider).ready) {
    return 'Checkout is not available until the payment checks are complete.'
  }
  return undefined
}

function isReady(planId: PlanId, provider: ProviderId | null): boolean {
  return Boolean(
    provider &&
      checkoutEnabled() &&
      launchReadiness(process.env, planId, provider).ready,
  )
}

/**
 * A concise price preview on the landing page. The commercial catalogue and
 * launch guards remain the source of truth: unapproved prices are never shown
 * and unavailable checkout buttons cannot be clicked.
 */
export function PricingSection() {
  const country = headers().get('x-vercel-ip-country')?.trim().toUpperCase() ?? ''
  const preferredProvider: ProviderId = country === 'NG' ? 'paystack' : 'lemonsqueezy'
  const trackOptions = premiumTrackIds().flatMap((id) => {
    const track = TRACKS.find((item) => item.id === id)
    return track ? [{ id: track.id, name: track.name }] : []
  })
  const paidPlanIds: PlanId[] = ['TRACK_PASS', 'PRO_MONTHLY', 'PRO_ANNUAL']

  const planState = Object.fromEntries(
    paidPlanIds.map((planId) => {
      const provider = selectProvider(planId, preferredProvider)
      return [
        planId,
        {
          provider,
          price: priceLabel(planId, provider),
          ready: isReady(planId, provider),
          reason: unavailableReason(planId, provider, country),
        },
      ]
    }),
  ) as Record<PlanId, { provider: ProviderId | null; price: string; ready: boolean; reason?: string }>

  return (
    <section id="pricing" className="border-y border-hairline bg-paper">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-8">
            <p className="landing-eyebrow">Plans / Choose your pace</p>
            <h2 className="landing-display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.8rem)]">
              Start free.
              <br />
              <span className="landing-serif text-brand">Go further with Pro.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/70 md:col-span-4 md:justify-self-end">
            The public catalogue stays free. Use a Track Pass for one premium path, or
            choose Pro when you want to work across every premium track.
          </p>
        </div>

        <div id="plans" className="mt-9 grid gap-4 lg:grid-cols-3">
          <article className="flex flex-col rounded-[18px] border border-hairline bg-white p-5 md:p-6">
            <p className="landing-eyebrow">01 / Start here</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">Free</h3>
            <p className="mt-2 font-display text-3xl font-semibold text-ink">₦0 / $0</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Build your foundation without a payment barrier.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/75">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Public roadmaps, resources and projects</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Progress tracking and completion certificates</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> {allowanceForTier('FREE')} AI project assessments each month</li>
            </ul>
            <Link href="/find-your-path" className="btn btn-secondary mt-6 w-full justify-center">
              Start learning <ArrowRight size={15} />
            </Link>
          </article>

          <article className="flex flex-col rounded-[18px] border border-hairline bg-white p-5 md:p-6">
            <p className="landing-eyebrow">02 / One direction</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">{PLANS.TRACK_PASS.displayName}</h3>
            <p className="mt-2 font-display text-2xl font-semibold text-ink">{planState.TRACK_PASS.price}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Focus on one premium track for three calendar months, with no automatic renewal.
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
                label={planState.TRACK_PASS.ready ? 'Get a Track Pass' : 'Checkout not available yet'}
                disabled={!planState.TRACK_PASS.ready}
                disabledReason={planState.TRACK_PASS.reason}
                className="btn btn-secondary w-full justify-center"
                resumePath="/pricing"
              />
            </div>
          </article>

          <article id="pro" className="relative flex flex-col rounded-[18px] border-2 border-brand bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="landing-eyebrow text-brand">03 / The full experience</p>
              <span className="rounded-full bg-brand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white">
                Recommended
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">TechSkillHub Pro</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              For learners building several skills, shipping projects and using AI assessment
              regularly.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/75">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Every premium track</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> {allowanceForTier('PRO')} AI project assessments each month</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Priority assessment capacity</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" /> Cancel any time; access lasts through the paid period</li>
            </ul>
            <div className="mt-6 space-y-4 border-t border-hairline pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink">Monthly</p>
                  <p className="mt-1 text-sm text-ink/70">{planState.PRO_MONTHLY.price}</p>
                </div>
                <CheckoutButton
                  planId="PRO_MONTHLY"
                  label={planState.PRO_MONTHLY.ready ? 'Start monthly Pro' : 'Not available yet'}
                  disabled={!planState.PRO_MONTHLY.ready}
                  disabledReason={planState.PRO_MONTHLY.reason}
                  className="btn btn-primary justify-center"
                  resumePath="/pricing"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-4">
                <div>
                  <p className="text-sm font-semibold text-ink">Annual</p>
                  <p className="mt-1 text-sm text-ink/70">{planState.PRO_ANNUAL.price}</p>
                </div>
                <CheckoutButton
                  planId="PRO_ANNUAL"
                  label={planState.PRO_ANNUAL.ready ? 'Choose annual Pro' : 'Not available yet'}
                  disabled={!planState.PRO_ANNUAL.ready}
                  disabledReason={planState.PRO_ANNUAL.reason}
                  className="btn btn-secondary justify-center"
                  resumePath="/pricing"
                />
              </div>
            </div>
            <Link href="/pricing#plans" className="landing-arrow mt-5">
              Compare all plan details <ArrowRight size={14} />
            </Link>
          </article>
        </div>

        {(!pricesApprovedForPublication() || !checkoutEnabled()) && (
          <p className="mt-5 text-xs leading-relaxed text-ink/70" role="status">
            Paid checkout is still being prepared. Your free learning experience remains available,
            and no payment will be started until the relevant plan is approved and checkout is enabled.
          </p>
        )}
      </div>
    </section>
  )
}
