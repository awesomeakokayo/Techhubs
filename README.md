# TechSkillHub

**Free Tech Education for Africa — built in public.**

TechSkillHub is an open-source technology learning platform for practical, career-relevant tech education. It combines structured learning tracks, curated resources, guided paths, practice, projects, assessments, progress tracking, and certificates.

## What the platform provides

- Structured technology learning tracks and roadmaps
- Curated learning resources
- Guided learning paths
- Practice tasks and portfolio-oriented projects
- Knowledge checks and assessments
- AI-focused learning pathways
- Learner progress and course completion
- Certificates and account features
- Paid track access and payment processing

## Tech stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth/Auth.js with Google OAuth
- Paystack
- Nodemailer with Gmail SMTP

## Quick start

### 1. Clone

~~~bash
git clone https://github.com/awesomeakokayo/Techhubs.git
cd Techhubs
~~~

### 2. Install

~~~bash
npm ci
~~~

### 3. Configure local environment

Create the local environment configuration required by the application. The actual values are intentionally not documented in this public README.

See [docs/ENVIRONMENT.md](./docs/ENVIRONMENT.md) for the configuration surface and secret-handling rules.

### 4. Generate Prisma Client

~~~bash
npx prisma generate
~~~

### 5. Start development

~~~bash
npm run dev
~~~

Open http://localhost:3000.

## Validation

Before opening a pull request:

~~~bash
npm run lint
npm run test
npm run build
~~~

## Documentation

The repository has a dedicated technical documentation system for maintaining the project over time.

Start with [docs/README.md](./docs/README.md).

The documentation covers:

- application architecture
- local development
- environment configuration
- database structure
- authentication
- payments and access control
- learning content and curriculum maintenance
- deployment
- operations and troubleshooting
- documentation maintenance rules

## Repository structure

~~~text
app/                 Next.js routes and API handlers
components/          Shared UI components
lib/                 Business logic and structured content
prisma/              Database schema
scripts/             Content and SEO maintenance tools
tests/               Automated tests
docs/                Technical documentation
.github/workflows/   CI validation
~~~

## Contributing

Contributions to code, curriculum, resources, assessments, accessibility, documentation, and learner experience are welcome.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before making a substantial change.

## Security

Never commit secrets, production environment files, API credentials, database credentials, or authentication secrets.

For security vulnerabilities, follow [SECURITY.md](./SECURITY.md).

## Open source

The source code is licensed under the [MIT License](./LICENSE).

See [OPEN_SOURCE.md](./OPEN_SOURCE.md) for the project's open-source policy and notes about third-party resources and historical product functionality.

## Project direction

TechSkillHub aims to make high-quality technology education more accessible while keeping the learning experience practical: learn the concept, use the right resource, practice it, verify understanding, and build something real.

## Maintainer

Awesome Akokayo

## License

MIT © 2026 Awesome Akokayo
