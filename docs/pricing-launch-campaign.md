# TechSkillHub pricing and Founding Learner launch runbook

Status: the approved Nigerian prices and pricing journeys are implemented in this branch. **Do not enable paid checkout until the provider sandbox, plan-code verification, access-enforcement transition, and release checks pass.** The Founding Learner campaign is off by default.

## 1. Approved Nigerian pricing

| Plan | Price | Billing / entitlement |
| --- | ---: | --- |
| Free | ₦0 | Public learning catalogue and existing free learning/progress features; two AI project assessments per UTC calendar month |
| Single Guided Path Pass | ₦6,000 | One chosen premium guided path for three calendar months; one-time payment, no auto-renewal |
| Founding Learner Offer | ₦3,000 | Same Single Guided Path access, 50% off, only inside the configured 14-day sale |
| Pro Monthly | ₦4,500/month | All included premium guided paths; recurring monthly billing |
| Pro Quarterly | ₦11,000 per three months | All included premium guided paths; recurring quarterly billing; launch recommendation |
| Pro Annual | ₦36,000/year | All included premium guided paths; recurring annual billing; best long-term value |

Quarterly saves approximately 18.5% compared with three monthly payments. Annual saves approximately 33.3% compared with twelve monthly payments. Pro's AI allowance is finite (150 per UTC calendar month), not unlimited.

Free public pricing copy intentionally says **“Limited AI assessments”**, not “two”. The exact remaining count comes from the authenticated server endpoint and is shown inside the app. Exhausting this allowance must not remove access to free roadmaps, resources, projects, career guides, recorded progress, submissions or earned certificates. AI assessment quota is enforced on the server using the existing atomic reservation ledger.

## 2. Configure the Founding Learner sale

The full campaign is 21 days: days 1–7 are anticipation/warm-up; days 8–21 are the 14-day discounted sales window. The website countdown is for the sale window only.

No dates are supplied in code. When the team has chosen the exact dates, configure the following in the appropriate Vercel environment. Use a timestamp with the Africa/Lagos UTC offset (+01:00), or a correctly specified UTC timestamp. For a Lagos-local sale, use the format YYYY-MM-DDTHH:mm:ss+01:00.

- COMMERCE_FOUNDING_OFFER_ENABLED=true
- COMMERCE_FOUNDING_OFFER_STARTS_AT=replace with the real start instant including +01:00
- COMMERCE_FOUNDING_OFFER_ENDS_AT=replace with the real end instant including +01:00

The values above are instructions, not valid launch dates. Replace them with real ISO timestamps before enabling the campaign. The sale should start at the beginning of day 8 and end at the agreed closing instant after 14 full days. The configured window must satisfy start < end.

Rules enforced by the application:

- Missing, invalid, reversed, disabled or expired campaign configuration means no active offer and no countdown.
- The promo applies only to the Nigerian Track Pass and is resolved server-side to ₦3,000 during the window.
- All visitors share the same fixed deadline; it is not stored or reset per visitor.
- The public banner appears only when the sale is active and the Track Pass checkout route is launch-ready, so we do not advertise a promotion users cannot buy.
- At the closing instant, new orders return to ₦6,000. An order created before the deadline preserves its recorded amount; successful payment arriving after closing can complete at that original price. A stale page trying to create a discounted order after closing receives a price-changed response and must review the regular price.
- No invented seats, purchase counts, testimonials or fake urgency are used.

## 3. Payment-provider release checklist

These flags remain off until testing is complete:

- COMMERCE_CHECKOUT_ENABLED=false
- COMMERCE_PRICES_APPROVED=false
- COMMERCE_ENTITLEMENTS_ENFORCED=false
- COMMERCE_PAYSTACK_PRO_SUBSCRIPTIONS_ENABLED=false

The Nigerian Track Pass uses the existing Paystack one-time transaction path. Pro recurring checkouts stay unavailable until the actual plans exist in the Paystack merchant account and the following server-side configuration is filled with their real plan codes:

- PAYSTACK_PLAN_CODE_PRO_MONTHLY
- PAYSTACK_PLAN_CODE_PRO_QUARTERLY
- PAYSTACK_PLAN_CODE_PRO_ANNUAL

After configuring codes in a sandbox, set COMMERCE_PAYSTACK_PRO_SUBSCRIPTIONS_ENABLED=true only for that sandbox verification window. Before initializing a recurring checkout, the server fetches the Paystack plan and confirms plan code, amount, NGN currency, and billing interval match the displayed catalogue price. A mismatch or unavailable provider API fails closed without creating an order or starting a charge.

Run the test-mode matrix in docs/provider-sandbox-test-matrix.md. Verify the first payment, subsequent renewal, failed renewal, cancellation, expiry, duplicate webhook and invalid signature. Confirm that a Track Pass unlocks only the selected premium path; Pro unlocks all included premium paths. Verify that a successful browser redirect alone never grants access. Keep live credentials and production data untouched during sandbox testing.

The Track Pass validity is three calendar months from the verified payment time, using UTC calendar arithmetic with month-end clamping. The migration directory name 20261014_track_pass_six_months is historical; its schema adds the purchase-ledger table and does not define the runtime duration. The authoritative duration is TRACK_PASS_TERM_MONTHS = 3 in lib/commercial/track-pass.ts.

## 4. Analytics: what fires and where

The application reuses Vercel Analytics for low-friction client funnel events and the existing LearningEvent table for authenticated events. Do not treat a button click or browser redirect as a purchase.

| Event | Source / definition |
| --- | --- |
| pricing_viewed | Vercel Analytics page-view event on the pricing page |
| pricing_plan_selected | Vercel Analytics when a plan checkout CTA is activated |
| launch_offer_viewed | Vercel Analytics when the active campaign banner renders |
| pricing_cta_clicked | Vercel Analytics when a pricing/offer CTA is clicked |
| checkout_started | Vercel Analytics after checkout initialization returns a provider URL |
| purchase_succeeded | Authenticated database event written only after the canonical service accepts a verified successful-payment webhook |
| purchase_failed | Database event from a verified failed payment or failed subscription invoice |
| subscription_started | Database event for a successful initial Pro payment |
| subscription_renewed | Database event from a verified recurring successful payment |
| subscription_cancelled | Database event from the provider's verified cancellation event |
| paid_access_expired | Database event on a verified subscription-expiry event |
| ai_assessment_started | Database event after an atomic assessment-credit reservation succeeds |
| ai_assessment_completed | Database event after an assessment result is stored |
| free_ai_quota_exhausted | Database event when a Free learner exhausts the two-use allowance |
| pro_upgrade_viewed / pro_upgrade_clicked | Upgrade prompt view/click following quota exhaustion |

Authenticated checkout orders store sanitized first-touch UTM fields, landing path and referrer hostname when available, together with the server-assigned campaign ID, price version, selected plan, amount, currency and order reference. The attribution sanitizer drops arbitrary fields, user identifiers, email addresses and payment data.

### Business metrics

- **Free-to-paid conversion:** distinct eligible Free accounts that have a verified purchase_succeeded event during a defined cohort window, divided by distinct eligible Free accounts in that cohort. Choose and keep the cohort window consistent.
- **Checkout conversion:** verified successful purchase events divided by successful checkout initializations. Separate one-time purchases from subscription starts and renewals.
- **Renewal / retention:** subscribers renewed or remaining active in the measurement period divided by subscribers due for renewal / eligible at the period start. Treat cancellations separately from expiry.
- **CAC:** attributable marketing and sales spend divided by newly acquired paying customers. Advertising-platform spend is not available from application events; import that spend from Meta, Google, TikTok or other ad accounts before reporting CAC.

Never include payment credentials, emails, user secrets or submitted assessment content in analytics payloads. Do not publish an estimated CAC when spend data is missing.

## 5. Customer journey and terms

- Homepage: visitors can find the integrated pricing section after exploring the learning catalogue, jump to it from the hero, or open Pricing from navigation.
- Plan selection: Free users start learning without payment. A one-path buyer chooses a premium guided path and continues to checkout. The Pro card recommends Quarterly and identifies Annual as the best long-term value.
- Authentication: if the learner is signed out, Google sign-in returns to the selected plan and resumes checkout automatically. The selected track and displayed price version are carried through that journey.
- Access integrity: all amounts come from the server catalogue, selected track IDs are validated, paid access is granted only by verified/idempotent provider events, and recurring checkouts verify the actual Paystack plan first.
- After Track Pass expiry, access to that paid path ends, but free resources, existing progress, submissions and earned certificates are retained. The Track Pass never auto-renews. Pro billing cadence and cancellation conditions must be shown before payment; cancellations and period-end access depend on verified recurring subscription state.

## 6. Current launch boundary

This branch prepares the UI, price catalogue, fixed-window offer, server-side amount/entitlement checks, attribution fields, event hooks and tests. It does not activate checkout, campaign dates, entitlement enforcement or real provider plan codes. Build/test results and actual provider sandbox transactions must be verified before production release.
