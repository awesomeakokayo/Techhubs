# Payments

## Provider

The current checkout implementation uses Paystack as the payment provider.

The authoritative payment provider constant is in lib/pricing.ts.

## Pricing

Pricing is defined in lib/pricing.ts and is treated as application configuration rather than being calculated independently in UI components.

Current plans are:

- Monthly
- 3 Months
- Yearly

The code currently defines separate Nigeria and international pricing regions and stores a pricing version on each internal payment order.

When prices change, update the pricing source and bump the pricing version so historical orders remain traceable to the price set used at checkout.

## Region handling

The server resolves a pricing region from trusted request information. The current implementation uses the hosting platform's IP-country header and falls back conservatively to the international region when the country is unknown.

Do not move price authority to the browser.

## Checkout flow

The high-level flow is:

1. An authenticated user chooses a track and plan.
2. The server resolves the authoritative pricing context.
3. A PaymentOrder is created with the reference, currency, amount, region, and pricing version.
4. The server initializes the Paystack transaction.
5. The user completes checkout with Paystack.
6. The application receives a webhook and/or browser confirmation callback.
7. The server verifies the reference directly with Paystack.
8. The verified transaction must match the internal order reference, currency, and exact amount.
9. Payment risk signals are evaluated.
10. The order is marked paid and TrackAccess is created/updated atomically.

## Why verification matters

The browser redirect is not proof of payment.

The server verifies the transaction with Paystack before granting access. A mismatch must never result in fulfilment.

## Idempotency

Both webhook delivery and browser confirmation can be repeated or can race each other.

lib/payments.ts protects fulfilment by:

- checking whether the order is already PAID
- verifying the transaction again
- atomically changing a PENDING order to PAID
- using the unique user + track entitlement constraint
- using the provider reference uniqueness constraint

Do not remove these safeguards when refactoring the payment flow.

## Payment risk

lib/risk.ts evaluates payment signals and records a risk outcome. Risk handling should remain server-side and should not expose sensitive provider responses directly to users.

## Payment routes

The current payment API area includes handlers for initialization, verification, browser confirmation, webhook processing, and cancellation/subscription operations.

Before changing a payment route, inspect lib/payments.ts and lib/pricing.ts first so that business rules do not become duplicated in route handlers.

## Secret configuration

Server-side payment code reads PAYSTACK_SECRET_KEY.

Do not expose it with a NEXT_PUBLIC_ variable or send it to the browser.

## Testing checklist

Any payment change should be tested for:

- successful payment
- wrong reference
- wrong currency
- wrong amount
- unpaid/failed transaction
- duplicate webhook
- webhook + browser-confirm race
- already-fulfilled order
- missing provider configuration
- access expiry/renewal behaviour

See the payment-related tests in tests/.
