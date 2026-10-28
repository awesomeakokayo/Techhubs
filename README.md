# TechSkillHub

**Free Tech Education for Africa — built in public.**

TechSkillHub is an open-source technology learning platform built to help people learn practical, career-relevant tech skills through structured roadmaps, curated resources, practice, projects, assessments, and guided learning paths.

## What you can build with TechSkillHub

- Structured technology learning tracks and roadmaps
- Curated learning resources, including free and first-party material
- Guided learning paths with progressive unlocks
- Practice tasks and portfolio-oriented projects
- Knowledge checks and mastery assessments
- AI-focused learning pathways
- Progress persistence and course completion
- Certificates and learner-facing account features

## Open source

TechSkillHub's source code is licensed under the [MIT License](./LICENSE).

See [OPEN_SOURCE.md](./OPEN_SOURCE.md) for the project's open-source policy and notes about third-party resources and historical product functionality.

## Tech stack

TechSkillHub is built with Next.js, React, TypeScript, Prisma, PostgreSQL, Tailwind CSS, and NextAuth.

## Current development status

Active development is on `feat/retention-v3`, which is ahead of `main` and not yet
merged. Production (`main`) is unchanged by that branch. For the verified architecture,
feature status, test results, known issues and next tasks, see
[development handoff](./docs/operations/DEVELOPMENT_HANDOFF.md).

## Documentation

Start with [the documentation index](./docs/README.md). It links to the current architecture and development handoff, launch blockers, curriculum evidence, billing operations, and archived implementation prompts. Historical implementation snapshots and older prompts are kept under `docs/archive/`; current operational, product, engineering, billing, AI-instruction, and curriculum audit documents are grouped in the folders linked from `docs/README.md`.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/awesomeakokayo/Techhubs.git
cd Techhubs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env.local` file using the variables required by the application. Never commit credentials, API keys, database passwords, or production secrets.

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Validation

Before opening a pull request, run the checks that apply to your change:

```bash
npm run lint
npm test
npx tsc --noEmit -p tsconfig.json
npm run build
```

`npm test` compiles the test TypeScript project and runs the unit/contract tests.
Database-backed integration tests skip unless `TSH_CHECKLIST_IMPORT_TEST_DB` points at
a disposable database. Playwright E2E must be run with `E2E_DATABASE_URL` set to a
disposable database — never the production database:

```bash
E2E_DATABASE_URL="postgresql://..." npm run test:e2e
```

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](./CONTRIBUTING.md), especially when changing curriculum, learning paths, assessments, or access/progress logic.

## Security

Please do not disclose security vulnerabilities in public issues. See [SECURITY.md](./SECURITY.md) for the reporting process.

## Project direction

TechSkillHub aims to make high-quality technology education more accessible while keeping the learning experience practical: learn the concept, use the right resource, practice it, verify understanding, and ship something real.

## License

MIT © 2026 Awesome Akokayo
