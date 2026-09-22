# Environment

## Rule

Environment values are configuration, not source code.

No real API keys, passwords, database URLs, OAuth secrets, SMTP passwords, signing secrets, or production environment files belong in Git.

The public repository may document the names and purpose of environment variables. It must never contain their real values.

## Local configuration

Use an ignored local file such as:

~~~text
.env.local
~~~

The repository .gitignore already ignores .env and .env*.local.

## Current configuration surface

| Variable | Used for | Secret? |
| --- | --- | --- |
| DATABASE_URL | PostgreSQL connection used by Prisma | Yes |
| AUTH_SECRET | Authentication/session signing | Yes |
| GOOGLE_CLIENT_ID | Google OAuth client identifier | Configuration value |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | Yes |
| PAYSTACK_SECRET_KEY | Server-side Paystack API calls and verification | Yes |
| SMTP_USER | Gmail SMTP account used by the contact form | Configuration/credential |
| SMTP_PASS | Gmail SMTP password or app password | Yes |
| CONTACT_EMAIL | Destination for contact-form messages; falls back to SMTP_USER | Configuration |
| NODE_ENV | Runtime environment | Usually supplied by the platform |

The list above is based on the current application code. When a new environment variable is introduced, add it to this document in the same change.

## Obtaining values

### PostgreSQL

Use the connection string supplied by the database provider or your local PostgreSQL installation. The value must point to the database intended for the current environment.

### Google OAuth

Create or use the project's Google OAuth credentials. The authorised redirect URI must match the current deployment and authentication configuration.

Do not reuse production credentials for arbitrary local projects.

### Paystack

Use the Paystack secret key belonging to the correct environment/account. Only server-side code should read PAYSTACK_SECRET_KEY. Never expose it as a browser/client variable.

### SMTP

The contact form currently uses Nodemailer with Gmail's SMTP service. Use an account/app password appropriate for SMTP. The SMTP password must never be committed.

### Contact email

CONTACT_EMAIL controls the destination mailbox for contact-form submissions. When it is absent, the code falls back to SMTP_USER.

## Production configuration

Production values belong in the hosting platform's encrypted environment settings, not in Git.

Keep separate values for:

- local development
- preview/staging
- production

When adding a new variable:

1. add it to the code
2. document its name and purpose here
3. configure it in the environments that need it
4. verify that it is server-only unless there is a deliberate reason for client exposure

## Secret rotation

When a credential is exposed:

1. revoke or rotate it at the service provider
2. replace the production environment value
3. inspect Git history if the secret was committed
4. remove the leaked value from affected systems
5. document the incident without recording the secret itself

## Never do this

Do not create documentation like:

~~~text
PAYSTACK_SECRET_KEY=real-secret
SMTP_PASS=real-password
DATABASE_URL=real-production-connection-string
~~~

Even test credentials can create unnecessary risk and make it easier for real secrets to be copied into version control later.
