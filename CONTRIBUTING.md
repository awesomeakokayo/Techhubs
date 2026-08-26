# Contributing to TechSkillHub

Thank you for contributing to TechSkillHub. The project is open source, and improvements to the code, curriculum, resources, assessments, accessibility, documentation, and learner experience are welcome.

## Before you start

Read the [OPEN_SOURCE.md](./OPEN_SOURCE.md) policy and check existing issues and pull requests before starting substantial work.

For larger changes, open an issue first so the proposed direction can be discussed before implementation.

## Local development

```bash
npm install
npm run dev
```

Run validation before submitting a pull request:

```bash
npm run build
npm run test
```

## Pull requests

Keep pull requests focused on one meaningful change. Explain what changed, why it changed, and how it was tested.

For UI changes, include screenshots where they make the change easier to review.

For changes to authentication, payments, access control, progress persistence, certificates, or other server-side behavior, explain the security and backwards-compatibility considerations.

## Curriculum contributions

Curriculum is held to a higher standard than ordinary documentation. New or changed learning material should be:

- technically accurate and current
- beginner-accessible without being shallow
- tied to practical outcomes
- supported by authoritative or first-party resources where possible
- accompanied by meaningful practice when appropriate
- assessed through application and understanding rather than trivia alone
- useful to learners building a portfolio or preparing for real work

Do not fabricate resources, credentials, statistics, projects, or claims of industry validation.

## Commit messages

Use clear, imperative commit messages, for example:

```text
feat: add AI agent evaluation roadmap
fix: prevent duplicate progress records
docs: improve contributor setup
```

## Code style

Follow the conventions already used in the repository. Prefer small, readable changes over unnecessary rewrites. Do not commit generated build output, local environment files, secrets, or unrelated formatting changes.

## License

By contributing to TechSkillHub, you agree that your contribution is provided under the repository's [MIT License](./LICENSE), unless a different license is explicitly required for a particular contribution or asset.
