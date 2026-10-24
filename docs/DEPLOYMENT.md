# Deployment

## Deployment model

TechSkillHub is a Next.js application suitable for deployment on Vercel or another platform that supports the required Next.js runtime.

The repository currently contains Vercel-specific project history and configuration references, while CI validation runs through GitHub Actions.

## Production checklist

Before deploying a release:

1. Pull the latest main branch.
2. Install with npm ci.
3. Run lint, tests, and a production build.
4. Confirm database configuration is available in the target environment.
5. Confirm OAuth configuration matches the target deployment.
6. Confirm Paystack configuration is present and corresponds to the intended environment.
7. Confirm SMTP configuration is available if the contact form is enabled.
8. Review changed migrations and backwards compatibility.
9. Verify the deployed application and key learner flows.

## Environment separation

Keep separate configuration for local development, preview/staging, and production.

Never use a real production secret as a fallback in source code.

See [Environment](./ENVIRONMENT.md).

## Database deployment

Schema changes must be handled deliberately. Generate Prisma Client after schema changes and use the migration workflow appropriate to the deployment environment.

Never make a destructive database change against production merely to fix a local development problem.

## OAuth deployment

Google OAuth requires the deployed application's callback/redirect configuration to match the Google credentials configuration.

After a domain change, re-check OAuth redirect URLs before considering authentication fully deployed.

## Paystack deployment

After changing a payment-related release:

- verify the server can initialise a transaction
- verify successful payments are confirmed server-side
- verify webhook handling is reachable
- verify the configured callback/webhook URLs in Paystack
- verify the correct payment account and environment are being used

Do not test payment fulfilment against production with arbitrary real payments just to prove that an endpoint works.

## Smoke test after deployment

At minimum, check:

- homepage loads
- a track page loads
- login page loads
- Google sign-in works in the intended environment
- authenticated learner page loads
- progress can be read/updated where expected
- purchase flow can initialise
- payment callbacks/webhooks are reachable
- contact form behaves correctly
- robots and sitemap endpoints return valid responses

## Rollback

If a release introduces a severe regression:

1. stop making additional unrelated changes
2. determine whether the issue is application code, database schema, or external configuration
3. roll back the application release where safe
4. do not blindly roll back a database migration that has already accepted production data
5. document the incident and the eventual fix

## Deployment ownership

Deployment credentials should live only in the hosting provider and source-control integration settings. The repository documentation should describe the procedure, not contain credentials.
