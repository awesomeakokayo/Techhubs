# TechSkillHub Documentation

This directory is the working technical documentation for TechSkillHub.

The purpose is simple: a developer who did not build the project should be able to understand the system, run it locally, find the code responsible for a feature, make a change safely, deploy it, and troubleshoot common failures.

## Documentation map

| Document | Purpose |
| --- | --- |
| [Architecture](./ARCHITECTURE.md) | How the application is organised and how major pieces interact |
| [Development](./DEVELOPMENT.md) | Local setup, commands, validation, and day-to-day workflow |
| [Environment](./ENVIRONMENT.md) | Configuration names, where configuration lives, and secret-handling rules |
| [Database](./DATABASE.md) | Prisma schema, data ownership, relationships, and migration guidance |
| [Authentication](./AUTHENTICATION.md) | Google OAuth, NextAuth, sessions, protected routes, and account creation |
| [Payments](./PAYMENTS.md) | Paystack flow, pricing, verification, access grants, and webhook behaviour |
| [Content System](./CONTENT.md) | Tracks, roadmaps, resources, quizzes, guided paths, and content maintenance |
| [Deployment](./DEPLOYMENT.md) | Production deployment and service configuration |
| [Operations](./OPERATIONS.md) | Troubleshooting, logs, common failures, and safe production changes |
| [Documentation Rules](./DOCUMENTATION_RULES.md) | How documentation should be maintained as the project changes |

## Source-of-truth rule

When documentation and code disagree, the current code is the source of truth.

When a code change changes behaviour, update the relevant documentation in the same pull request.

Historical files in the repository describe previous implementation phases and audits. They are useful for context, but they are not automatically authoritative for the current system.

## Current application shape

TechSkillHub is a Next.js App Router application using:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth/Auth.js
- Google OAuth
- Paystack for payments
- Nodemailer with Gmail SMTP for the contact form

The application contains public learning pages, learner accounts, progress persistence, guided paths, certificates, paid track access, payment verification, and supporting SEO/analytics functionality.

## Finding the code

| Concern | Primary location |
| --- | --- |
| Public pages/routes | app/ |
| API handlers | app/api/ |
| Shared UI | components/ |
| Business logic | lib/ |
| Authentication | auth.ts, middleware.ts |
| Database schema | prisma/schema.prisma |
| Learning tracks | lib/tracks.ts |
| Roadmaps | lib/roadmaps.ts |
| Guided learning logic | lib/guided-path.ts |
| Progress logic | lib/progress.ts |
| Search | lib/search.ts |
| Pricing | lib/pricing.ts |
| Payment fulfilment | lib/payments.ts |
| Payment risk decisions | lib/risk.ts |
| Content validation | scripts/content-health.mjs, scripts/verify-resources.py |
| Tests | tests/ |
| CI | .github/workflows/ |

## Historical documentation

The repository also contains older root-level implementation and audit documents such as IMPLEMENTATION_GUIDE.md, IMPLEMENTATION_REPORT.md, IMPLEMENTATION_COMPLETE.md, and several resource/AI audit files.

Do not delete historical documents simply because the code has evolved. Link them from the documentation index or explicitly mark them as historical when their statements are no longer current.
