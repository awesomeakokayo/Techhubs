import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { CheckoutButton } from '@/components/commercial/CheckoutButton'
import { getPageMetadata } from '@/lib/seo/utils'
import { PLAN_IDS, PLANS, allowanceForTier, type PlanId } from '@/lib/commercial/plans'
import { formatPrice, isPriceApproved, pricesApprovedForPublication, resolveProviderPrice } from '@/lib/commercial/pricing'
import { checkoutEnabled, selectProvider, type ProviderId } from '@/lib/commercial/providers'
import { launchReadiness } from '@/lib/commercial/launch'
import { TRACKS } from '@/lib/tracks'
import { premiumTrackIds } from '@/lib/commercial/plans'

const pricesApproved = pricesApprovedForPublication()

export const metadata: Metadata = {
  ...getPageMetadata({
    title: 'TechSkillHub Pricing — Free, Track Pass and Pro',
    description:
      'Compare TechSkillHub Free, Track Pass, Pro Monthly and Pro Annual. Choose the learning access that fits your goals and budget.',
    path: '/pricing',
    keywords: ['techskillhub pricing', 'track pass', 'pro plan'],
  }),
  // Prices are not approved for publication yet, so the page is not indexed.
  robots: pricesApproved ? undefined : { index: false, follow: false },
}

function planPriceLabel(planId: PlanId, provider: ProviderId | null): string {
  if (!pricesApproved || !provider) return 'Pricing to be announced'
  const price = resolveProviderPrice(provider, planId)
  if (!price || !isPriceApproved(price)) return 'Pricing to be announced'
  const suffix = planId === 'PRO_MONTHLY' ? ' / month' : planId === 'PRO_ANNUAL' ? ' / year' : ''
  return `${formatPrice(price)}${suffix}`
}

export default function PricingPage() {
  const country = headers().get('x-vercel-ip-country')?.trim().toUpperCase() ?? ''
  const preferredProvider: ProviderId = country === 'NG' ? 'paystack' : 'lemonsqueezy'
  const checkoutReady = checkoutEnabled()
  const trackOptions = premiumTrackIds().flatMap((id) => {
    const track = TRACKS.find((item) => item.id === id)
    return track ? [{ id: track.id, name: track.name }] : []
  })

  return (
    <div className="section pt-16">
      <div className="container max-w-5xl">
        <PageViewTracker path="/pricing" eventName="pricing_page_open" />
        <PageHeader
          title="Pricing"
          subtitle="A full free experience, plus optional plans for learners who want more assessment capacity and premium tracks."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]}
        />

        {!pricesApproved && (
          <div className="mt-6 rounded-md border border-border-default bg-elevated p-4 text-sm text-text-secondary">
            Prices are being finalised. This page is a preview and is not publicly indexed yet.
          </div>
        )}

        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* Free */}
          <article className="card flex h-full flex-col">
            <h2 className="font-display text-lg font-semibold text-text-primary">Free</h2>
            <p className="mt-1 min-h-10 text-sm text-text-secondary">For learners exploring tech and building their foundations at no cost.</p>
            <p className="mt-4 font-display text-2xl text-text-primary">$0 <span className="font-sans text-sm font-normal text-text-secondary">/ forever</span></p>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> All free learning paths and lessons</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> Progress tracking and certificates</li>
              <li className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> {allowanceForTier('FREE')} AI project assessments / month</li>
            </ul>
            <div className="mt-auto pt-8"><a href="/start" className="btn btn-secondary w-full justify-center text-sm">Start learning</a></div>
          </article>

          {PLAN_IDS.map((planId) => {
            const plan = PLANS[planId]
            const provider = selectProvider(planId, preferredProvider)
            const planCheckoutReady = checkoutReady && launchReadiness(process.env, planId, provider).ready
            return (
              <article key={planId} className={`card relative flex h-full flex-col border-teal/30 ${planId === 'PRO_ANNUAL' ? 'ring-1 ring-teal/40' : ''}`}>
                {planId === 'PRO_ANNUAL' && <span className="absolute right-4 top-4 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-medium text-teal">Best value</span>}
                <h2 className="font-display text-lg font-semibold text-text-primary">{plan.displayName}</h2>
                <p className="mt-1 min-h-10 pr-1 text-sm text-text-secondary">{plan.summary}</p>
                <p className="mt-4 font-display text-2xl text-text-primary">{planPriceLabel(planId, provider)}</p>
                <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" /> {feature}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <CheckoutButton
                    planId={planId}
                    trackOptions={planId === 'TRACK_PASS' ? trackOptions : undefined}
                    label={planCheckoutReady ? (provider === 'paystack' && planId === 'TRACK_PASS' ? 'Pay ₦6,000 with Paystack' : `Choose ${plan.displayName}`) : 'Checkout coming soon'}
                    className="btn btn-primary w-full justify-center text-sm"
                  />
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-10 text-xs text-text-muted">
          Paid plans are optional. No subscription or payment is started without your explicit action, and your existing progress and certificates are preserved.
          A Track Pass is a one-time payment for three calendar months of access to one premium track; it does not renew automatically and nothing is charged when it ends.
          Your progress, submissions and earned certificates are kept after a pass expires.
        </p>

        <section className="mt-14" aria-labelledby="pricing-faq">
          <h2 id="pricing-faq" className="font-display text-xl font-semibold text-text-primary">Frequently asked questions</h2>
          <dl className="mt-6 space-y-5">
            {PRICING_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-medium text-text-primary">{item.q}</dt>
                <dd className="mt-1 text-sm text-text-secondary">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}

/** Help/FAQ copy. Makes no price or launch-date claims and hides draft prices. */
const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: 'What is changing?',
    a: 'Most learning stays free. Over time, a small number of the most complete tracks are planned to become premium, with a Track Pass for one track or Pro for every premium track. Nothing changes for you until that transition is enabled, and selected tracks are announced in advance.',
  },
  {
    q: 'What stays free?',
    a: 'The free catalogue — the large majority of tracks, lessons, progress tracking and certificates — remains available at no cost, together with a monthly allowance of AI project assessments.',
  },
  {
    q: 'How long does a Track Pass last?',
    a: 'A Track Pass gives three calendar months of access to one premium track you choose. The three months are calculated on our servers from the moment your verified payment completes, not from when checkout was opened.',
  },
  {
    q: 'Does a Track Pass renew automatically?',
    a: 'No. A Track Pass is a one-time payment. It does not renew and nothing is charged when the three months end. To continue premium access to that track after it ends, you would choose a new purchase yourself.',
  },
  {
    q: 'Is Pro a subscription?',
    a: 'Pro is an optional recurring plan. It can be cancelled at any time and access continues to the end of the paid period. It is never started without your explicit action.',
  },
  {
    q: 'What happens to my progress and certificates when access ends?',
    a: 'Nothing is deleted. Your progress, completed stages, submissions, assessment history, achievements and earned certificates are preserved after a Track Pass or Pro period ends. A completed track stays completed; only new premium assessment activity requires an active plan.',
  },
  {
    q: 'Do I keep the access I have today?',
    a: 'Yes — while the transition is being prepared, access is unchanged. Any future transition for existing learners is designed to include advance notice and a grace period, and to preserve access to work already in progress.',
  },
  {
    q: 'Where can I get help?',
    a: 'Use the contact form or the help links on any lesson if something is unclear. We will explain what is included, how long access lasts, and how to continue from where you left off.',
  },
]
