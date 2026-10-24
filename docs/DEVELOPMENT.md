# Development

## Prerequisites

Install:

- Node.js 20 LTS or another version compatible with the repository
- npm
- access to a PostgreSQL database for features that require persistence

CI currently uses Node 20.

## First-time setup

Clone the repository:

~~~bash
git clone https://github.com/awesomeakokayo/Techhubs.git
cd Techhubs
~~~

Install dependencies:

~~~bash
npm ci
~~~

Create your local environment file according to [Environment](./ENVIRONMENT.md).

Generate Prisma Client:

~~~bash
npx prisma generate
~~~

Start the development server:

~~~bash
npm run dev
~~~

Open http://localhost:3000.

## NPM commands

| Command | Purpose |
| --- | --- |
| npm run dev | Start the local Next.js development server |
| npm run build | Build the production application |
| npm run start | Start the built application |
| npm run lint | Run Next.js linting |
| npm run test | Type-check test code and run Node tests |
| npx prisma generate | Generate the Prisma Client |

The repository also runs prisma generate as a post-install step.

## Development workflow

For a normal feature:

1. Identify the route or business domain involved.
2. Read the relevant code and the matching document in docs/.
3. Make the smallest change that solves the problem.
4. Add or update tests when the behaviour is testable.
5. Run lint, tests, and a production build.
6. Update documentation when behaviour, configuration, or operational procedure changed.
7. Open a focused pull request.

## Where to start when changing something

### Change a page

Start in app/<route>/.

Look for page.tsx, route-local components, shared components, and imported business logic in lib/.

### Change a learning track

Start with lib/tracks.ts and lib/roadmaps.ts, then inspect any related resource/content data and the relevant UI under app/.

Run the content validation scripts when changing large amounts of learning material.

### Change learner progress

Start with lib/progress.ts, prisma/schema.prisma, and the relevant learner routes/components.

Read [Database](./DATABASE.md) before changing schema-backed behaviour.

### Change pricing or paid access

Start with lib/pricing.ts, lib/payments.ts, lib/risk.ts, app/api/payments/, and prisma/schema.prisma.

Read [Payments](./PAYMENTS.md) before changing this area.

### Change login/account behaviour

Start with auth.ts, middleware.ts, app/login, app/account, and types/next-auth.d.ts.

Read [Authentication](./AUTHENTICATION.md).

## Validation before merging

At minimum:

~~~bash
npm run lint
npm run test
npm run build
~~~

For content-related changes, also run the relevant scripts documented in [Content System](./CONTENT.md).

## Database development

After schema changes, regenerate Prisma Client:

~~~bash
npx prisma generate
~~~

Use the migration strategy appropriate to the environment. Do not experiment with destructive schema changes against production.

See [Database](./DATABASE.md).

## Coding conventions

Follow the existing repository style.

Prefer small functions, explicit names, server-side validation at trust boundaries, reusable domain functions in lib/, and comments that explain why a non-obvious rule exists.

Avoid copying business rules between components, putting secrets in source code, trusting client-submitted prices or access claims, and unrelated formatting changes in feature pull requests.

## Working with AI coding tools

AI tools may be used during development, but generated changes must be reviewed like any other code.

Before accepting an AI-generated change:

- understand what files it touches
- verify assumptions against the current repository
- run the relevant tests/build
- check for accidental secret exposure
- update documentation when behaviour changes

The project should remain understandable without depending on the prompt that originally generated a change.
