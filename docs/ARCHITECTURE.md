# Architecture

## Overview

TechSkillHub is a server-rendered Next.js App Router application. The repository keeps the product UI, server routes, business logic, and most learning content in one codebase.

At a high level:

~~~text
Browser
  |
  v
Next.js App Router
  |
  +--> Public pages
  +--> Learner pages
  +--> API route handlers
  |
  +--> Authentication (NextAuth + Google)
  |
  +--> Business logic in lib/
  |      +--> learning content
  |      +--> guided paths
  |      +--> progress
  |      +--> pricing
  |      +--> payments
  |      +--> risk checks
  |
  +--> Prisma
         |
         v
      PostgreSQL
~~~

External services currently used by the application include Google OAuth, Paystack, the hosting platform, and Gmail SMTP for contact messages.

## Repository layers

### app/

The App Router is the public entry point for pages and server route handlers.

Product areas currently represented in app/ include:

- /about
- /account
- /ai
- /ai-guide
- /career
- /careers
- /certificate
- /contact
- /dashboard
- /find-your-path
- /guided-path
- /guides
- /login
- /paths
- /pitch-deck
- /projects
- /resources
- /roadmaps

The exact route tree should be checked in app/ before documenting a new page. Route names are allowed to evolve.

### components/

Reusable UI components live here. Page-specific presentation may stay close to its page when that improves readability; broadly reusable components belong in components/.

### lib/

lib/ contains application behaviour that should not be tied to one route.

Important modules include:

- lib/tracks.ts — structured learning-track data
- lib/roadmaps.ts — roadmap definitions and supporting data
- lib/guided-path.ts — guided-path calculations and sequencing
- lib/progress.ts — learner progress persistence
- lib/search.ts — search behaviour
- lib/pricing.ts — authoritative pricing and region rules
- lib/payments.ts — Paystack verification and order fulfilment
- lib/risk.ts — payment-risk evaluation
- lib/payment-log.ts — payment event logging
- lib/prisma.ts — Prisma client
- lib/site-content.ts — public supporting content
- lib/analytics.ts — analytics helpers
- lib/seo/ — search and SEO logic

### prisma/

prisma/schema.prisma defines the PostgreSQL data model.

The database is not the source of truth for learning-track content; much of that content is represented in TypeScript data files under lib/.

### scripts/

Scripts provide maintenance and validation tasks for content and SEO.

Current examples include content-health.mjs, generate-quiz-data.mjs, seo-audit.mjs, and verify-resources.py.

### tests/

Tests cover important pure logic and server-side behaviour. Payment and risk logic have dedicated tests.

### .github/workflows/

Continuous integration runs repository validation on pull requests and the configured validation branch.

## Request flow

A typical authenticated request looks like this:

1. The browser requests a page or API route.
2. Next.js resolves the App Router route.
3. Authentication is read through NextAuth where required.
4. The route calls the relevant function in lib/.
5. Data is read or written through Prisma.
6. The route returns rendered UI or JSON.

Keep route handlers thin when practical. Business rules that need to be reused or tested should live in lib/.

## Payment flow

Payment logic is deliberately split into pricing resolution, Paystack verification, risk evaluation, fulfilment, and HTTP entry points.

- Pricing: lib/pricing.ts
- Verification and fulfilment: lib/payments.ts
- Risk evaluation: lib/risk.ts
- HTTP routes: app/api/payments/

This separation is important because payment fulfilment must not depend on a browser claim alone.

## Authentication flow

Authentication is configured in auth.ts.

Google is the currently configured provider. Prisma stores users, OAuth accounts, sessions/related authentication records, and application-specific subscription state.

middleware.ts is responsible for guarding selected authenticated areas.

## Design principles

### Keep domain rules centralised

Pricing, access, progress, payment verification, and guided-path behaviour should not be duplicated across page components.

### Never trust the browser for server-side authority

The server must determine:

- whether the user is authenticated
- what the user owns
- what a checkout should cost
- whether a transaction was actually paid
- whether access should be granted

### Make payment fulfilment idempotent

Webhook delivery and browser confirmation can race or be retried. Fulfilment checks order state and relies on database uniqueness constraints so access is not granted twice.

### Prefer explicit data over hidden magic

Learning content and important product rules should remain discoverable in obvious files instead of being spread across unrelated components.
