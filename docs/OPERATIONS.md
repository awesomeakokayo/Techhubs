# Operations

## First rule

Do not patch production by guesswork.

Start from the user-visible symptom, identify the responsible route/module, inspect logs, reproduce safely, and make the smallest reversible change.

## Common problems

### Application will not build

Run:

~~~bash
npm run build
~~~

Then inspect the first meaningful TypeScript, import, Prisma, or Next.js error. Do not focus on the final cascading error if an earlier error explains it.

### Database errors

Check:

- DATABASE_URL is configured for the target environment
- Prisma Client is generated
- the deployed schema matches the application version
- the affected model exists in prisma/schema.prisma

### Login errors

Check:

- Google OAuth credentials exist in the target environment
- redirect/callback URLs match the deployment
- AUTH_SECRET is configured
- middleware is not blocking the intended route

Read [Authentication](./AUTHENTICATION.md).

### Payment initialisation fails

Check:

- PAYSTACK_SECRET_KEY exists on the server
- the server-side pricing result is correct
- the selected currency is supported by the payment account
- the PaymentOrder was created as expected
- the provider response is not being incorrectly translated into a client-facing error

Read [Payments](./PAYMENTS.md).

### Payment succeeded but access is missing

Check in this order:

1. Does the internal PaymentOrder exist?
2. What is its status?
3. Does the Paystack reference match?
4. Does Paystack verify the transaction as successful?
5. Do currency and exact amount match the order?
6. Did risk evaluation produce a review state?
7. Was TrackAccess created or updated?
8. Did the request fail after provider verification but before the database transaction completed?

Do not manually grant access by editing the database until the underlying fulfilment problem is understood.

### Contact form fails

The current contact route uses Nodemailer with Gmail SMTP.

Check:

- SMTP_USER exists
- SMTP_PASS exists and is valid for SMTP
- CONTACT_EMAIL is correct when supplied
- the SMTP account permits the configured authentication method

Do not log or print SMTP credentials while debugging.

## Logging

Payment operations use structured logging helpers in lib/payment-log.ts. Prefer safe identifiers such as internal order references and event names.

Do not log:

- passwords
- OAuth secrets
- provider secret keys
- full access tokens
- database credentials

## Production database caution

Production data can contain learner information, payment records, and authentication-related data.

Before running a database command against production, confirm:

- the target database
- the intended query/change
- whether the action is reversible
- whether the action can affect more than one user

## Emergency changes

For an urgent production fix:

1. identify the exact failure
2. make the smallest safe change
3. validate locally or in preview
4. deploy
5. verify the affected user flow
6. document what changed and why
7. follow up with a permanent test or code improvement

Avoid leaving emergency fixes as undocumented one-off knowledge.
