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
npm run build
npm run test
```

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](./CONTRIBUTING.md), especially when changing curriculum, learning paths, assessments, or access/progress logic.

## Security

Please do not disclose security vulnerabilities in public issues. See [SECURITY.md](./SECURITY.md) for the reporting process.

## Project direction

TechSkillHub aims to make high-quality technology education more accessible while keeping the learning experience practical: learn the concept, use the right resource, practice it, verify understanding, and ship something real.

## License

MIT © 2026 Awesome Akokayo
