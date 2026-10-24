# TechSkillHUB — Payment Provider & Settlement Readiness

Status: **investigation only.** No live products or plans were created, no live
transactions initialized, no billing enabled, and no live API configuration changed.
No merchant credentials were printed or accessed (only code and `.env.example`
were inspected).

---

## 1. What the codebase actually configures (confirmed facts)

- **Single provider:** `PAYMENT_PROVIDER = 'PAYSTACK'` (`lib/pricing.ts:29`).
  Stripe is explicitly not used.
- **Secret-based server flow only:** `PAYSTACK_SECRET_KEY` (`initialize`, `verify`,
  `cancel`, `webhook`). The secret is never used in the browser.
- **Webhook signature:** HMAC-SHA512 over the raw body with the secret key and a
  timing-safe compare (`app/api/payments/webhook/route.ts:26`).
- **Two pricing regions:** Nigeria → `NGN`, everyone else → `USD`
  (`lib/pricing.ts:44`). The browser cannot choose the currency or amount; both
  are derived server-side from `x-vercel-ip-country` (`initialize/route.ts:46`).
- **Per-course orders:** `PaymentOrder` + `TrackAccess` (`prisma/schema.prisma`),
  with idempotent fulfillment (`lib/payments.ts:109`).
- **Deal-breaker signal already in code:** `friendlyPaystackInitError`
  (`lib/payments.ts:47`) maps a provider message containing
  `Merchant [...] does not support currency [USD]` / "international not enabled"
  to *"International (USD) checkout is not enabled for this payment account yet."*
  `tests/payments.test.js:92` asserts this mapping. **This indicates that USD is
  currently not enabled for the configured merchant account.**
- **Dormant:** `/upgrade` redirects to `/tracks` (`app/(marketing)/upgrade/page.tsx`),
  and no route/component calls `/api/payments/initialize`. Learning access does not
  depend on payment (`hasTrackAccess` returns `true`). So no live checkout exists.

### Known vs unknown about the merchant
| Question | Known? |
| --- | --- |
| Which provider | **Yes:** Paystack |
| Merchant legal name / registered country | **No** — not recorded anywhere in the repo |
| Enabled currencies | **Partially:** the code assumes NGN for Nigeria and USD elsewhere; the USD-rejection mapping implies **USD is not enabled** |
| Settlement bank account / currency | **No** — not recorded |
| Subscription product configured | **No** — legacy subscription code paths exist but no active subscription product is referenced |
| Live vs test keys | **No** — values live only in untracked env files (not read) |

**Do not assume** that because Paystack can accept international cards, this
merchant can receive payouts in any currency. Card acceptance and settlement are
separate capabilities.

## 2. Paystack — what must be confirmed with Paystack

Paystack's developer documentation was not retrievable from this environment
(the `paystack.com/docs/*` pages returned HTTP 403 / timeouts). The following are
therefore **requirements to verify directly with Paystack support / dashboard**,
not assertions:

- [ ] The merchant's registered country and the settlement currency available to it.
- [ ] Whether "international payments" (USD/GBP/EUR card acceptance) is enabled
      for this specific business, and what approval it requires.
- [ ] The payout account required to receive foreign-currency settlement
      (e.g. whether a domiciliary/foreign-currency account in the business's own
      name is required) and the settlement currency actually paid out.
- [ ] Applicable transaction charges for domestic NGN vs international cards.
- [ ] Whether recurring subscriptions are supported for this merchant in USD, and
      any plan/subscription creation requirements.
- [ ] Refund, chargeback and settlement-timing terms.
- [ ] Tax/compliance obligations if TechSkillHub is the merchant of record (it
      would be, on Paystack).

Attempted source: `https://paystack.com/docs/` (403/blocked); see `accept-payments`
page retrieved (confirms per-currency `amount`/`currency` on initialize and the
webhook-first verification model) but it does **not** establish settlement eligibility.

**A provider is not production-ready until the merchant is approved and the payout
route is confirmed with the provider.**

## 3. Lemon Squeezy — suitability assessment (verified from official docs)

Sources retrieved for this task:
- `https://docs.lemonsqueezy.com/help/getting-started/fees`
- `https://docs.lemonsqueezy.com/help/getting-started/supported-countries`
- `https://docs.lemonsqueezy.com/help/payments/merchant-of-record`
- `https://docs.lemonsqueezy.com/help/products/subscriptions`

| Dimension | Verified fact |
| --- | --- |
| Merchant of record | **Yes.** Lemon Squeezy is the seller of record and handles tax/VAT collection, refunds, chargebacks and PCI compliance. |
| Payout countries | **Nigeria is explicitly listed** for bank payouts (also Ghana, Kenya, South Africa, and 150+ more). PayPal payouts in 200+ countries. |
| Fees | Platform fee on order total; example `$0.50 + 5%`, **+1.5% international (non-US)**, **+1.5% PayPal**, **+0.5% subscription**. Payout fees: Stripe **1%** outside US; PayPal **3% capped at $30** outside US. |
| Subscriptions | Full recurring support (daily/weekly/monthly/yearly up to 1 year), free trials, lifecycle (on trial/active/paused/past due/unpaid/cancelled/expired), API + webhooks, customer portal. |
| Tax | Handled by Lemon Squeezy as MoR (VAT/sales tax). |
| Approval | Store activation + identity verification required; prohibited-products policy applies. |

**How it maps to TechSkillHub:** an educational digital subscription (guided
paths, AI assessments) is within scope; personal/course subscriptions are standard.
Bank payouts to Nigeria are supported. The MoR model removes the USD-settlement
problem entirely: the customer pays Lemon Squeezy; Lemon Squeezy pays the business
out in its supported way; Lemon Squeezy is the seller of record.

**Caveats / approval requirements:**
- Store must be activated and identity verified.
- The subscription surcharge (+0.5%) and international surcharge (+1.5%) reduce
  net margin versus the current Paystack assumptions.
- Lemon Squeezy is the merchant of record — the public legal/refund relationship
  is with Lemon Squeezy. This must be reflected in terms and in the launch
  communications.
- Pricing must be reviewed against the actual fee stack before publication.
- No live store/product was created in this task.

## 4. Options

| Option | Assessment |
| --- | --- |
| **A. Paystack only (status quo)** | Blocked for international customers until USD acceptance **and a USD payout route** are confirmed. NGN (Nigeria) only may work today, but that wasn't verified. |
| **B. Paystack (NGN) + Lemon Squeezy (international)** | Pragmatic hybrid. Keep local NGN pricing on Paystack if eligible; use the MoR for the "everyone else pays USD" case. Adds a second provider and two webhook integrations. |
| **C. Lemon Squeezy only (MoR)** | Simplest for international settlement and tax; supported for Nigerian bank payouts. Loses the direct Paystack NGN channel and changes the legal seller-of-record relationship. |

## 5. Recommendation

1. **Do not enable billing on the current Paystack account.** First obtain written
   confirmation of the merchant's country, enabled currencies, payout account
   requirements, and whether USD settlement is possible.
2. **If a USD payout route cannot be confirmed on Paystack,** adopt a
   merchant-of-record (Lemon Squeezy) for non-Nigerian customers, because it is
   documented to support Nigerian bank payouts and absorbs tax/refund liability.
3. Keep the existing Paystack integration as inert legacy (it already is), and
   **do not repurpose or edit migration files**. Any new provider requires its own
   webhook verification and entitlement source-of-truth work (see
   `docs/entitlement-architecture.md`).
4. Re-price against the real fee stack before announcing anything; the figures in
   `lib/pricing.ts` are legacy internal values, not approved prices.

## 6. Outstanding requirements before go-live

- [ ] Merchant approval + confirmed payout/settlement route (Paystack or MoR).
- [ ] Confirmed enabled currencies and whether subscriptions are permitted.
- [ ] Approved pricing after real fees/taxes.
- [ ] Approved Free/Pro policy and grandfathering (see monetization plan).
- [ ] Entitlement architecture implemented client-invisible and server-authoritative.
- [ ] Launch communications approved (see launch-communications plan).
- [ ] Tax/legal review for the jurisdictions served.

## 7. Compliance questions for legal review

- If Paystack is used, TechSkillHub is the merchant of record: sales tax/VAT and
  consumer-protection obligations sit with the business.
- If a MoR is used, the seller of record and refund terms are the provider's; the
  site must communicate that clearly.
- Cross-border digital-services VAT (EU/UK/others) and Nigerian tax treatment need
  professional review.

## 8. Explicitly not done

No live products/plans created, no live transactions or API changes, no billing
activated, no credentials read or exposed, no legal business country changed, and
no third-party payout account used.
