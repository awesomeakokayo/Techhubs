# TECH SKILLS HUB — PAYSTACK NGN/USD PRICING, GEO-DETECTION & PAYMENT SECURITY

## ROLE

You are a senior backend engineer, payments engineer, security engineer, and Next.js/Node.js developer working inside the existing Tech Skills Hub codebase.

You must modify the existing Pro / Guided Path payment system to support **automatic NGN vs USD pricing through Paystack**, while keeping the existing Paystack integration and eliminating the previous Stripe dependency for this flow.

The product is a Nigeria-based business using Paystack.

Paystack is already configured for international payments.

The system must support:

* Nigerian customers paying in NGN
* non-Nigerian customers paying in USD
* Paystack handling the actual payment
* automatic currency selection
* server-authoritative amount selection
* fraud/bypass resistance
* transaction verification
* webhook verification
* duplicate-payment protection
* subscription/pro entitlement protection
* auditability

Do NOT build a frontend-only currency switch.

Do NOT allow the customer to freely choose NGN or USD.

Do NOT trust a client-supplied country or currency.

Do NOT reintroduce Stripe.

---

# 1. PRIMARY BUSINESS REQUIREMENT

Tech Skills Hub has a Pro / Guided Path paid plan.

There are two prices:

### Nigerian pricing

Displayed and charged in:

**NGN**

### International pricing

Displayed and charged in:

**USD**

The user must not be given a manual selector such as:

> Nigeria / International

or:

> Pay ₦X / Pay $Y

where they can simply choose whichever is cheaper.

The system must automatically determine the appropriate pricing context.

---

# 2. IMPORTANT SECURITY PRINCIPLE

The frontend is NEVER the source of truth for:

* currency
* amount
* country
* plan price
* payment entitlement
* subscription status

The client may request:

> “I want to buy the Pro plan.”

The backend must determine:

```text
customer identity
+
country context
+
pricing region
+
currency
+
server-defined amount
```

and then create the Paystack transaction.

Never accept:

```json
{
  "currency": "NGN",
  "amount": 100000
}
```

from the browser and trust it.

The browser can only send the intended product/plan identifier.

Example:

```json
{
  "plan": "pro"
}
```

The backend decides:

```text
NG user → NGN price
non-NG user → USD price
```

---

# 3. DO NOT USE STRIPE

There is an existing or historical Stripe implementation.

Do NOT depend on Stripe for this payment flow.

Do not add Stripe back.

Do not create a parallel Paystack + Stripe architecture.

Paystack is the single payment provider for this feature.

If old Stripe code exists:

* identify it
* determine whether it is still used elsewhere
* do not break unrelated functionality
* remove only what is obsolete for this specific Pro payment flow if it can safely be removed
* document any remaining Stripe code that is unrelated

---

# 4. PAYSTACK REQUIREMENTS

Use Paystack's server-side transaction initialization flow.

Paystack supports NGN and USD for Nigeria-based businesses, and the transaction initialization API accepts an explicit currency and amount. Amounts must be supplied in the relevant currency's smallest unit.

Therefore:

### Example

If Nigerian Pro price is:

```text
₦15,000
```

the backend initializes:

```text
amount = 1500000
currency = NGN
```

If international Pro price is:

```text
$15
```

the backend initializes:

```text
amount = 1500
currency = USD
```

Never perform currency conversion dynamically at checkout.

The two plan prices should be explicit configuration values.

---

# 5. CENTRALIZE PRICING

Create a single server-side pricing configuration.

Example conceptual structure:

```ts
const PRO_PRICING = {
  NG: {
    currency: "NGN",
    amountMajor: 15000,
  },
  INTERNATIONAL: {
    currency: "USD",
    amountMajor: 15,
  },
};
```

Adapt this to the project's existing pricing model.

Do not duplicate prices across:

* React components
* API routes
* checkout pages
* database queries
* environment variables
* payment handlers

There must be ONE authoritative pricing source.

Prefer a server-side configuration or database-backed plan record.

The frontend should receive the calculated presentation values from the backend.

---

# 6. COUNTRY DETECTION STRATEGY

We need automatic detection, but country detection must not be treated as a perfect identity signal.

Use a layered approach.

## LEVEL 1 — AUTHENTICATED ACCOUNT CONTEXT

If a user is authenticated and has a verified profile country, use that as one strong signal.

Example:

```text
user.profile.country = NG
```

However, do not blindly trust an editable country field by itself.

A user should not be able to change:

```text
country = NG
```

and thereby permanently unlock Nigerian pricing.

---

# 7. SERVER-SIDE IP COUNTRY DETECTION

Use the request's actual public IP on the server and resolve its country using a reliable IP geolocation mechanism already available to the deployment environment, or introduce a reputable server-side geolocation service if the current infrastructure has none.

Do NOT determine the country from:

```js
navigator.language
```

or:

```js
Intl.DateTimeFormat().resolvedOptions().timeZone
```

or frontend locale alone.

Those are UI hints, not payment-security controls.

The server must obtain the connection's IP as reliably as the hosting platform permits.

For example, on a hosted environment, inspect the trusted proxy headers supported by the deployment platform.

Do not trust arbitrary client-provided headers.

---

# 8. IMPORTANT LIMITATION

IP geolocation is not perfect.

A customer can use:

* VPN
* proxy
* corporate network
* roaming
* privacy relay

Therefore:

**IP country cannot be the only anti-fraud signal.**

Use it to determine the initial pricing experience, but retain additional verification.

---

# 9. PRICING DECISION MODEL

Create a centralized backend function such as:

```ts
resolvePaymentRegion(context)
```

or:

```ts
resolveCheckoutPricing(context)
```

The function should return something like:

```ts
{
  region: "NG" | "INTERNATIONAL",
  currency: "NGN" | "USD",
  amount: number,
  amountMajor: number,
  countrySource: "ip" | "profile" | "verified-card" | "fallback",
  confidence: "high" | "medium" | "low"
}
```

The exact shape may differ according to project conventions.

---

# 10. BASE REGION RULE

For the default pricing decision:

```text
country === NG
    → NGN
else
    → USD
```

Do not implement a manual “currency” selector.

Do not offer the customer a dropdown.

Do not include a hidden form field that lets the client choose:

```text
NGN
USD
```

without server validation.

---

# 11. CONFLICT HANDLING

If signals disagree, do NOT silently choose the cheapest option.

Example:

```text
IP country = Nigeria
profile country = United Kingdom
```

or:

```text
IP country = United States
profile country = Nigeria
```

The system should apply a defined policy.

For example:

### Case A

IP = NG

Profile country = NG

→ NGN

### Case B

IP = US

Profile country = US

→ USD

### Case C

IP = NG

Profile country = US

→ treat as high-risk mismatch

Do not simply allow NGN because one signal says NG.

Instead:

* use the stronger rule defined by the product
* optionally require additional verification
* or default to international pricing when ambiguity exists

The security principle is:

> **When there is meaningful uncertainty, never default to the cheaper price.**

---

# 12. PAYMENT SESSION INITIALIZATION

Create a backend endpoint for checkout initialization.

Conceptually:

```http
POST /api/payments/paystack/initialize
```

Body:

```json
{
  "plan": "pro"
}
```

The endpoint must:

1. authenticate the user
2. validate that the plan exists
3. fetch the server-side plan price
4. resolve region/currency
5. calculate exact charge amount
6. create a unique internal payment record
7. initialize Paystack
8. store the Paystack reference
9. return only the required checkout information

Do not allow the browser to supply the final amount.

---

# 13. INTERNAL PAYMENT RECORD

Before calling Paystack, create or reserve an internal payment/order record.

Store at least:

```text
userId
planId
internalOrderId
paystackReference
currency
amount
region
pricingVersion
status
createdAt
expiresAt
countryAtInitialization
ipCountryAtInitialization
```

Also store enough metadata to determine exactly what the customer was supposed to purchase.

This is important for dispute handling and audits.

---

# 14. PRICING VERSION

Store a pricing version or equivalent identifier.

Example:

```text
PRO-2026-08
```

If prices change later, older transactions should remain traceable to the price version that existed when they were initialized.

Do not reconstruct old prices from today's configuration.

---

# 15. PAYSTACK REFERENCE

Every checkout must have a unique internal/paystack reference.

Do not let the client choose the reference.

Generate it server-side.

Example conceptual format:

```text
TSH_PRO_<uuid>
```

or use the project's established transaction-reference convention.

Ensure it is unique.

---

# 16. PAYSTACK METADATA

Attach useful metadata to the Paystack transaction.

For example:

```json
{
  "plan": "pro",
  "internal_order_id": "...",
  "user_id": "...",
  "pricing_region": "NG",
  "pricing_currency": "NGN",
  "pricing_version": "PRO-2026-08"
}
```

Never put:

* passwords
* secrets
* sensitive authentication credentials
* raw card numbers

into metadata.

Paystack supports metadata for custom transaction information.

---

# 17. FRONTEND CHECKOUT DISPLAY

The frontend should ask the backend:

```text
GET /api/payments/pro/pricing
```

or equivalent.

The backend returns:

```json
{
  "plan": "pro",
  "currency": "NGN",
  "amountMajor": 15000,
  "displayPrice": "₦15,000"
}
```

or:

```json
{
  "plan": "pro",
  "currency": "USD",
  "amountMajor": 15,
  "displayPrice": "$15"
}
```

The frontend renders exactly what the backend returned.

Do not calculate:

```text
USD → NGN
```

in the frontend.

Do not determine region from the browser.

---

# 18. DO NOT PROVIDE A MANUAL CURRENCY SWITCH

There should be no:

```text
[ ₦ NGN ] [ $ USD ]
```

toggle.

There should be no:

```text
Pay in Nigeria
Pay internationally
```

selection.

There should be no hidden fallback button that allows users to force NGN.

There should be no query parameter such as:

```text
?currency=NGN
```

that can override the server.

If legacy UI has such controls, remove them.

---

# 19. QUERY PARAMETER SECURITY

If an attacker attempts:

```text
/api/payments/initialize?currency=NGN
```

the server must ignore the currency.

If an attacker sends:

```json
{
  "currency": "NGN",
  "amount": 1000
}
```

the server must ignore client-defined pricing.

Only the product/plan identifier may be accepted from the user, plus legitimate checkout data required by the application.

---

# 20. PAYSTACK VERIFICATION

Never grant Pro access merely because:

* the user reached the success page
* the browser says success
* a callback URL exists
* the client sends “payment successful”

The backend must verify the Paystack transaction.

Paystack provides a Verify Transaction endpoint, and its documentation recommends webhooks as the preferred confirmation mechanism for successful transactions.

---

# 21. WEBHOOK IMPLEMENTATION

Implement or audit the Paystack webhook endpoint.

Example:

```http
POST /api/payments/paystack/webhook
```

Verify the Paystack signature before processing.

Paystack webhook events contain an `x-paystack-signature` HMAC SHA512 signature generated using the secret key.

Implement:

```text
raw request body
↓
HMAC SHA512 with PAYSTACK_SECRET_KEY
↓
compare with x-paystack-signature
↓
reject if invalid
↓
process if valid
```

Do not process webhook data before signature validation.

Use constant-time comparison where appropriate.

---

# 22. WEBHOOK IDEMPOTENCY

Webhook handlers must be idempotent.

The same webhook may be delivered more than once.

Never grant:

```text
2 months
```

because the same success event was processed twice.

Before fulfilling:

```text
already fulfilled?
```

If yes:

```text
acknowledge and stop
```

---

# 23. TRANSACTION VERIFICATION

When a transaction is verified, compare the Paystack response against the internal order.

Do not merely check:

```text
status === success
```

Also validate:

```text
reference
currency
amount
plan/order
customer
```

The paid transaction must match the exact expected amount and currency that the backend initialized.

Paystack's verify response includes transaction status, requested amount, currency, authorization details and customer information.

---

# 24. AMOUNT VERIFICATION

This is mandatory.

Suppose the backend expected:

```text
NGN 15,000
```

but Paystack says:

```text
NGN 1,500
```

Do NOT grant the subscription.

Suppose the backend expected:

```text
USD 15
```

but Paystack says:

```text
USD 5
```

Do NOT grant the subscription.

Compare using the smallest currency units.

Example:

```text
expectedAmountSubunit
=== verifiedTransaction.amount
```

not floating-point comparisons.

---

# 25. CURRENCY VERIFICATION

This is equally mandatory.

Suppose the backend created:

```text
currency = USD
```

If the verified transaction is:

```text
currency = NGN
```

then treat it as an invalid/mismatched payment.

Do not grant Pro.

This prevents someone from initializing one pricing context and attempting to fulfill another.

---

# 26. CARD COUNTRY VERIFICATION

Paystack transaction authorization data contains:

```text
authorization.country_code
```

which represents the country where the customer's card was issued.

After a card transaction is successfully processed, capture this signal.

Example:

```text
authorization.country_code = NG
```

or:

```text
authorization.country_code = US
```

This is a **post-payment risk signal**, not a frontend pricing toggle.

---

# 27. IMPORTANT: CARD COUNTRY IS NOT THE SAME AS USER LOCATION

Do NOT assume:

```text
card country === person's current physical location
```

A Nigerian customer can possess a foreign card.

A foreign customer can possess a Nigerian-issued card.

Therefore, card country should be used as a risk/consistency signal alongside other signals.

Do not create a brittle rule that automatically blocks every mismatch.

---

# 28. FRAUD / MISMATCH POLICY

Create a configurable risk evaluation function.

Conceptually:

```ts
evaluatePaymentRisk({
  ipCountry,
  profileCountry,
  pricingRegion,
  transactionCurrency,
  cardCountry,
  paystackRiskAction,
  amount,
  userId
})
```

Possible outcome:

```text
ALLOW
REVIEW
DENY
```

---

# 29. EXAMPLE RISK RULES

### LOW RISK

```text
IP = NG
Profile = NG
Currency = NGN
Card country = NG
```

→ ALLOW

### LOW RISK INTERNATIONAL

```text
IP = US
Profile = US
Currency = USD
Card country = US
```

→ ALLOW

### INTERNATIONAL TRAVEL CASE

```text
IP = US
Profile = NG
Currency = USD
Card country = NG
```

This should NOT automatically mean fraud.

It may simply be a Nigerian user currently abroad.

Use the configured risk policy.

### SUSPICIOUS CASE

```text
IP = NG
Profile = NG
Currency = NGN
Card country = US
```

Potential mismatch.

Do not automatically grant or automatically reject unless the application's risk policy says so.

At minimum:

```text
record mismatch
```

and make the logic auditable.

---

# 30. AVS

Because this is a Nigeria-based Paystack business with international payments enabled, evaluate whether Paystack AVS is available and enabled for this integration.

Paystack states that AVS is available to Nigeria-based businesses with international payments enabled, subject to their eligibility, and it helps verify billing-address consistency for eligible US, UK and Canadian cards.

Do not assume AVS is universally available for every card/country.

If the Paystack response exposes useful AVS/risk information, incorporate it into the risk evaluation.

Do not invent AVS fields that Paystack does not actually return.

---

# 31. PAYSTACK RISK SIGNALS

Paystack transaction/customer data can contain risk-related information.

Inspect the current Paystack response shape and use only fields that are actually available in this integration.

Do not hardcode undocumented fields.

If Paystack returns:

```text
customer.risk_action
```

or equivalent risk information, treat it as an additional provider signal.

Paystack's API documents customer risk actions such as `default`, `allow`, and `deny`.

---

# 32. DO NOT TRY TO BUILD YOUR OWN CARD FRAUD ENGINE

Do not implement homemade card-number scoring.

Do not collect raw card details.

Do not store:

* PAN
* CVV
* unmasked card numbers

in the Tech Skills Hub backend.

Let Paystack handle payment credentials and provider-side card risk.

Our responsibility is to make the application-side pricing and fulfillment secure.

---

# 33. PAYMENT FULFILLMENT

Only grant Pro access after all of the following are satisfied:

```text
Paystack payment is successful
AND
transaction reference matches
AND
currency matches expected
AND
amount matches expected
AND
product/plan matches expected order
AND
transaction has not already been fulfilled
AND
risk policy allows fulfillment
```

If any required condition fails:

```text
do not grant entitlement
```

---

# 34. SUBSCRIPTION / ENTITLEMENT MODEL

Do not make the user “Pro” simply because they opened the checkout.

Track:

```text
pending
paid
active
expired
cancelled
failed
refunded
reversed
```

Adapt to the existing application.

If the product uses recurring Paystack authorization, preserve that architecture.

Paystack's recurring-charge system provides reusable authorization information, and the authorization response includes the card's country code.

---

# 35. DOUBLE-FULFILLMENT PROTECTION

If both:

```text
webhook
```

and:

```text
verify callback
```

process the same payment:

Only the first successful fulfillment may grant the entitlement.

Use a transaction/database lock or atomic update where appropriate.

Example:

```text
if order.status !== "paid"
    mark as paid + grant entitlement

else
    no-op
```

Use database-level protection where practical.

---

# 36. PAYMENT FAILURE HANDLING

The UI must clearly distinguish:

### Success

Payment confirmed.

### Failed

Paystack returned a failed payment.

### Abandoned

User started but did not finish.

### Pending

Payment is still being processed.

### Mismatch

Payment exists but does not match the expected order.

### Verification failure

The server could not safely confirm the payment.

Do not show:

> “Payment successful”

unless the backend has actually confirmed it.

Paystack documents statuses including `abandoned`, `failed`, `pending`, `processing`, `reversed`, and `success`.

---

# 37. REDIRECT/CALLBACK SECURITY

If the payment flow returns the customer to:

```text
/payment/success
```

that page must not itself grant access.

It should simply:

1. read the Paystack reference
2. ask the backend for verification status
3. display the appropriate state

The backend remains authoritative.

---

# 38. PRICING ENDPOINT SECURITY

The pricing endpoint itself should not reveal internal fraud logic.

It may return:

```text
currency
amount
displayPrice
region label
```

It should not return:

```text
ip_country
risk_score
internal confidence
fraud thresholds
```

unless needed for administrative tooling.

---

# 39. NO USER OVERRIDE

The API must reject attempts such as:

```json
{
  "plan": "pro",
  "currency": "NGN",
  "amount": 1000
}
```

with arbitrary values.

The backend should derive:

```text
plan → price
region → currency
```

itself.

---

# 40. NO “INTERNATIONAL CHECKBOX”

Do not implement:

```text
I'm outside Nigeria
```

as the mechanism.

That is user-controlled.

A user can lie.

The system should make the normal decision automatically.

---

# 41. GUEST USERS

If users can start checkout before creating an account, decide how the backend should associate the Paystack customer with a user/order.

Preferred:

```text
user authenticated
↓
internal order
↓
Paystack transaction
```

If guests are supported:

* create a secure pending order
* collect email
* generate a unique internal order
* associate Paystack reference
* only create/activate entitlement after successful verified payment

Do not let someone obtain Pro merely by supplying another user's email address.

---

# 42. REPLAY PROTECTION

Do not allow a previously successful Paystack reference to be reused to activate another account.

Every payment reference must correspond to one internal order.

Before fulfillment:

```text
reference belongs to this order?
reference belongs to this user?
reference already fulfilled?
```

All should be checked.

---

# 43. PLAN/PRICE TAMPERING

Never allow the frontend to send:

```text
price = 0
price = discounted price
currency = NGN
```

as authoritative values.

The client sends:

```text
planId
```

The server resolves:

```text
planId
→ active plan configuration
→ pricing region
→ currency
→ amount
```

---

# 44. DISCOUNT CODES

If the existing product supports coupons or discounts, integrate them into the same server-side pricing pipeline.

Example:

```text
base plan
↓
region pricing
↓
coupon validation
↓
final amount
↓
Paystack initialization
```

Never calculate the final amount purely on the client.

---

# 45. LOGGING / AUDIT

Add structured logs for critical payment transitions.

Example:

```text
checkout_initialized
payment_redirected
payment_verified
payment_webhook_received
payment_fulfilled
payment_mismatch
payment_rejected
payment_risk_review
```

Do not log sensitive payment credentials.

Log:

* internal order ID
* Paystack reference
* user ID
* currency
* amount
* region
* event type
* timestamp

---

# 46. ADMIN VISIBILITY

If the application has an admin dashboard, expose enough information to investigate disputes.

An admin should be able to see:

```text
Internal order
Paystack reference
Plan
Expected currency
Expected amount
Paid currency
Paid amount
Pricing region
Initial IP country
Profile country
Card country
Payment status
Risk outcome
Fulfillment status
Created at
```

Do not expose sensitive card data beyond masked information Paystack provides.

---

# 47. GEOLOCATION CACHE

Do not call an external IP geolocation provider on every React render.

Resolve country on the server when needed.

Cache where appropriate.

Do not make checkout depend on a slow geolocation request if there is already sufficient trusted context.

---

# 48. GEOLOCATION FAILURE

If IP geolocation fails:

Do not crash the application.

Apply a deterministic fallback.

Example options:

### Conservative fallback

Use the verified profile country if available.

Otherwise default to INTERNATIONAL pricing.

Why?

Because the system must never grant the cheaper Nigerian price simply because location lookup failed.

Document the chosen policy.

---

# 49. GEOLOCATION PROVIDER

If introducing a third-party service:

* use a reputable provider
* keep the integration server-side
* store the API key in environment variables
* add timeout handling
* fail gracefully
* do not block the entire site if the service is unavailable

Do not expose the geolocation API key to the browser.

---

# 50. CACHE AND SECURITY

Do not cache personalized pricing responses globally.

A response saying:

```text
currency = NGN
```

must not accidentally be served to a user in the United States through a shared CDN cache.

Use appropriate cache-control behavior.

For user-specific pricing responses:

```text
private / no-store
```

where appropriate.

---

# 51. NEXT.JS CONSIDERATIONS

Follow the application's existing Next.js conventions.

If the project uses:

* App Router
* Server Actions
* Route Handlers
* API routes

use the existing architecture rather than introducing another pattern unnecessarily.

The backend remains authoritative.

Do not move secret Paystack operations into client components.

---

# 52. NODE.JS BACKEND CONSIDERATIONS

The Node.js backend must own:

* Paystack secret key
* transaction initialization
* pricing resolution
* order creation
* verification
* webhook processing
* entitlement fulfillment

The secret key must never be exposed in frontend bundles.

Paystack explicitly recommends keeping secret keys out of frontend code and public repositories.

---

# 53. ENVIRONMENT VARIABLES

Inspect the existing environment configuration.

Do not create duplicate naming conventions if existing variables already exist.

Likely requirements include:

```text
PAYSTACK_SECRET_KEY
PAYSTACK_PUBLIC_KEY
PAYSTACK_WEBHOOK_SECRET
```

Only add variables actually required by the chosen webhook/security architecture.

The secret must exist only server-side.

---

# 54. PUBLIC KEY VS SECRET KEY

Use:

### Public key

Only where Paystack's client-side checkout requires it.

### Secret key

Only on the server.

Never import:

```text
PAYSTACK_SECRET_KEY
```

into client components.

---

# 55. CUSTOMER EXPERIENCE

When Nigerian:

Display:

```text
₦15,000
```

When international:

Display:

```text
$15
```

Do not display the other currency as a selectable alternative.

Optionally you may mention a localized equivalent in informational text only if there is a compelling reason, but do not present it as a competing checkout option.

---

# 56. USER COUNTRY VISUAL FEEDBACK

Do not make the UI say:

> “We detected that you are Nigerian because your IP is ...”

That is unnecessary and potentially confusing.

The customer should simply see the correct price.

If a mismatch or verification issue occurs, provide a neutral message such as:

> “We couldn't safely verify your payment region. Please contact support.”

Do not expose fraud rules.

---

# 57. PAYSTACK INTERNATIONAL PAYMENT SUPPORT

Do not assume that all international payment channels behave identically.

Paystack's international-payment documentation states that Nigeria-based businesses can accept international card payments and can price transactions in either NGN or USD, subject to the account's enabled features.

Keep the checkout configuration aligned with the channels that are actually enabled on the Paystack account.

Do not hardcode unavailable channels.

---

# 58. CARD COUNTRY / BIN AS A SECONDARY SIGNAL

Paystack exposes a card BIN resolution endpoint that can return the card's issuing country, bank, brand and card type.

Prefer using the transaction authorization data returned after payment where available.

Do not perform unnecessary BIN lookups for every checkout unless there is a concrete security reason.

The goal is to minimize unnecessary external calls.

---

# 59. IMPORTANT BUSINESS RULE

The system must make it difficult to exploit a cheaper regional price.

Examples to protect against:

### Attack 1

International user manually submits:

```text
currency=NGN
```

Result:

```text
ignored
```

### Attack 2

User changes a browser request from:

```text
price=15000
```

to:

```text
price=1000
```

Result:

```text
ignored
```

### Attack 3

User changes URL:

```text
?country=NG
```

Result:

```text
ignored
```

### Attack 4

User changes localStorage:

```text
region=NG
```

Result:

```text
ignored
```

### Attack 5

User modifies JavaScript variables in DevTools.

Result:

```text
ignored because backend calculates the amount
```

### Attack 6

User attempts to fulfill with a different Paystack reference.

Result:

```text
rejected because reference does not belong to internal order
```

---

# 60. DO NOT OVERBLOCK LEGITIMATE USERS

Security must not become a broken checkout.

Do not automatically reject everyone with:

```text
IP country != card country
```

because legitimate travel, expatriates, international cards, corporate networks, VPNs and other scenarios exist.

Use mismatches as a signal, not as proof of fraud.

The payment provider remains the primary card-payment processor/risk layer.

Our application layer's responsibility is:

```text
correct pricing
+
correct fulfillment
+
anti-tampering
+
auditability
```

---

# 61. TEST CASE MATRIX

Create automated tests for at least the following scenarios.

### Test 1

IP = NG

profile = NG

→ NGN

### Test 2

IP = US

profile = US

→ USD

### Test 3

IP = UK

profile = NG

→ follow documented mismatch policy

### Test 4

Client submits `currency=NGN` while server context is international

→ server still uses USD

### Test 5

Client submits arbitrary amount

→ server ignores amount

### Test 6

Paystack success with expected currency/amount

→ grant access

### Test 7

Paystack success with wrong currency

→ reject fulfillment

### Test 8

Paystack success with wrong amount

→ reject fulfillment

### Test 9

Duplicate webhook

→ one fulfillment only

### Test 10

Invalid webhook signature

→ reject

### Test 11

Unknown Paystack reference

→ reject

### Test 12

Already fulfilled order

→ no duplicate entitlement

### Test 13

Geolocation provider unavailable

→ deterministic safe fallback

### Test 14

VPN / mismatched signals

→ follow configured risk policy

### Test 15

User retries after failed transaction

→ new safe transaction/reference

---

# 62. TEST WITH PAYSTACK TEST MODE

Before touching production:

Use Paystack test mode.

Verify both:

```text
NGN
USD
```

flows.

Confirm:

* amount
* currency
* reference
* redirect
* webhook
* transaction verification
* fulfillment
* duplicate handling

Paystack uses separate test/live environments and keys.

---

# 63. LIVE CHECKLIST

Before deploying live, verify:

[ ] Paystack international payments are enabled

[ ] USD transactions are enabled for the Paystack account

[ ] Production Paystack secret key is configured server-side

[ ] Production public key is configured where needed

[ ] Webhook URL is configured in Paystack

[ ] Webhook signature validation works

[ ] Transaction verification works

[ ] NGN checkout works

[ ] USD checkout works

[ ] No frontend currency override exists

[ ] No client-supplied amount is trusted

[ ] Duplicate webhook is safe

[ ] Wrong amount is rejected

[ ] Wrong currency is rejected

[ ] Unknown references are rejected

[ ] User cannot reuse another user's payment reference

[ ] Entitlements are granted only after server confirmation

[ ] Logging is enabled

[ ] Sensitive secrets are not exposed in the client

---

# 64. IMPORTANT: DO NOT CLAIM IMPOSSIBLE FRAUD PREVENTION

Do not describe this system internally or in product messaging as:

> “Fraud-proof.”

Nothing is completely fraud-proof.

The goal is:

> **Make regional price bypass difficult, prevent application-side payment tampering, validate Paystack transactions correctly, and use provider risk signals appropriately.**

Paystack itself also applies payment-risk controls and fraud-related mechanisms.

The application should complement those controls rather than pretending to replace them.

---

# 65. CODE QUALITY

Use strong TypeScript types.

Create types for:

```ts
Currency
PricingRegion
PaymentStatus
RiskOutcome
PaymentOrder
PaystackTransaction
```

Do not pass arbitrary strings throughout the codebase.

Validate API inputs.

Handle failures explicitly.

Do not swallow exceptions.

Do not expose raw Paystack errors to end users.

---

# 66. DATABASE CONSISTENCY

Inspect the existing Prisma schema or database model before creating new tables.

Prefer reusing existing:

* payment
* transaction
* subscription
* order
* entitlement

models if they are suitable.

Do not create duplicate payment tables simply because the existing naming is inconvenient.

If schema changes are necessary:

* create migrations
* preserve existing records
* add indexes
* document relationships

---

# 67. RECURRING SUBSCRIPTIONS

If Pro currently uses recurring billing:

preserve the existing subscription architecture while applying the NGN/USD region logic.

The currency chosen at subscription creation must be stored.

Do not assume a user's currency can change automatically during an active subscription.

A subscription should retain the currency and pricing terms under which it was created unless the application explicitly supports plan migration.

---

# 68. EXISTING SUBSCRIBERS

Do not break users who already paid.

When implementing the new system:

* inspect existing subscriptions
* preserve their currency
* preserve their entitlement
* do not reclassify an existing active subscription without an explicit migration strategy

Existing customer records must remain valid.

---

# 69. LEGACY STRIPE DATA

If Stripe subscriptions or transactions exist historically:

Do not delete them blindly.

Determine whether they are:

* active
* expired
* historical
* orphaned

Do not break access for legitimate old subscribers.

New Pro checkout should use Paystack.

---

# 70. USER-FACING PRICE CONSISTENCY

The following must all agree:

```text
pricing API
pricing card
checkout page
Paystack initialization
payment record
verification
subscription record
receipt
```

If frontend says:

```text
$15
```

but Paystack receives:

```text
NGN 15000
```

that is a critical bug.

The system must use the same authoritative pricing object.

---

# 71. RECEIPTS / EMAILS

If the application sends payment confirmation emails, the receipt must show the actual charged currency and amount.

Do not display:

```text
₦15,000
```

for a USD transaction.

Use the verified Paystack transaction values or the internal confirmed order values.

---

# 72. ANALYTICS

Track useful events:

```text
pro_pricing_viewed
checkout_started
checkout_currency_ngn
checkout_currency_usd
payment_initialized
payment_success
payment_failed
payment_abandoned
payment_rejected
payment_risk_review
subscription_activated
```

Do not send sensitive card information to analytics systems.

---

# 73. USER EXPERIENCE FOR REGION DETECTION

The detection should happen fast enough that the user does not see:

```text
₦15,000
```

for two seconds and then suddenly see:

```text
$15
```

Prefer server-rendered or server-fetched pricing where the architecture allows it.

Otherwise use a controlled loading state:

```text
Loading plan...
```

then display the final server-resolved price.

Avoid visible price flickering.

---

# 74. EDGE / CACHE SAFETY

If the app uses:

* Vercel caching
* CDN
* ISR
* static rendering

make sure region-sensitive pricing is not statically cached as one universal response.

Personalized pricing must be handled dynamically or privately.

---

# 75. ACCEPTANCE CRITERIA

The work is complete only when all of the following are true:

### Nigerian user

Automatically sees:

```text
NGN
```

and Paystack initializes an NGN transaction using the server-defined Nigerian price.

### International user

Automatically sees:

```text
USD
```

and Paystack initializes a USD transaction using the server-defined international price.

### User cannot manually switch

No frontend control can force a different currency.

### User cannot manipulate amount

The backend ignores arbitrary client amounts.

### Payment must match

Currency + amount + reference + order must match before fulfillment.

### Webhook is secure

Invalid signatures are rejected.

### Duplicate fulfillment is prevented

Same payment can never grant multiple entitlements.

### Verification is server-side

Success page alone cannot grant access.

### Risk signals are recorded

IP/profile/card-country discrepancies can be audited.

### Legitimate travelers are not automatically blocked

Mismatch does not equal fraud.

### Stripe is not used

Paystack is the single provider for this flow.

---

# 76. IMPLEMENTATION PROCESS

Do this in stages.

## STAGE 1 — AUDIT

Inspect the existing:

* Paystack integration
* Stripe integration
* pricing components
* payment APIs
* Prisma payment models
* subscription models
* webhook handlers
* checkout components
* Pro/Guided Path entitlement logic

Do not make major changes yet.

Report exactly what exists.

---

## STAGE 2 — DESIGN THE PAYMENT FLOW

Create a clear architecture:

```text
User
 ↓
Frontend requests Pro pricing
 ↓
Backend resolves region
 ↓
Backend resolves server price
 ↓
Frontend displays price
 ↓
User clicks Continue
 ↓
Backend creates internal order
 ↓
Backend initializes Paystack
 ↓
User pays
 ↓
Paystack webhook
 ↓
Signature verification
 ↓
Transaction verification
 ↓
Amount/currency/reference checks
 ↓
Risk evaluation
 ↓
Fulfill Pro entitlement
```

---

## STAGE 3 — IMPLEMENT

Implement the architecture using the existing codebase conventions.

Do not introduce unnecessary frameworks.

Do not duplicate logic.

---

## STAGE 4 — TEST

Run:

* unit tests
* integration tests
* payment-flow tests
* webhook tests
* tampering tests
* duplicate tests

---

## STAGE 5 — REVIEW

Perform a security review specifically for:

* price manipulation
* currency manipulation
* reference manipulation
* entitlement manipulation
* webhook spoofing
* replay
* duplicate fulfillment
* cache leakage
* secret exposure

---

# 77. FINAL ENGINEERING PRINCIPLE

The most important rule is:

> **The customer can request a plan. They cannot decide the price, currency, or entitlement.**

The backend decides.

Paystack processes the payment.

The backend verifies what Paystack reports.

Only then does Tech Skills Hub grant Pro access.

Build the system so that even if a user opens DevTools, modifies JavaScript, alters localStorage, changes query parameters, sends custom API requests, or attempts to replay payment callbacks, they cannot obtain the cheaper regional price or Pro entitlement without a valid Paystack transaction that matches the server-created order.

Start by auditing the existing implementation before modifying it.
