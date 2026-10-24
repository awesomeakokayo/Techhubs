# Documentation index

Use this page to find the current operating instructions and supporting evidence for TechSkillHub.

## Start here

- [Development handoff](./DEVELOPMENT_HANDOFF.md) — repository status, architecture, verification results, known issues, and next tasks.
- [Launch readiness](./LAUNCH_READINESS.md) — launch blockers, security notes, and approval-gated operations.
- [Product specification](./product-specification.md) — product behavior and intended learner experience.
- [Final review report](./final-review-report.md) — recorded review findings and decisions.

## Architecture, continuity, and operations

- [Entitlement architecture](./entitlement-architecture.md)
- [Learner continuity](./learner-continuity.md)
- [Transition operator guide](./transition-operator-guide.md)
- [Content protection audit](./content-protection-audit.md)
- [Assessment credit concurrency](./assessment-credit-concurrency.md)
- [Assessment economics](./assessment-economics.md)

## Billing and release readiness

- [Commercial billing setup](./commercial-billing-setup.md)
- [Payment provider readiness](./payment-provider-readiness.md)
- [Provider sandbox test matrix](./provider-sandbox-test-matrix.md)
- [Commercial FAQ](./commercial-faq.md)
- [Launch communications plan](./launch-communications-plan.md)

Paid checkout must remain disabled until the owner approves prices, provider configuration, entitlement policy, and operational readiness. Never run Playwright against the production database; set a separate disposable `E2E_DATABASE_URL`.

## Curriculum and learner experience

- [Curriculum implementation guide](./curriculum-implementation/README.md)
- [Curriculum quality audit](./curriculum-quality-audit.md)
- [Curriculum stage evidence](./curriculum-stage-evidence.md)
- [Curriculum import preflight](./curriculum-import-preflight.md)
- [Reviewer packets index](./reviewer-packets/README.md)
- [AI learning sequence audit](./AI_PHASE_4_SEQUENCE.md)
- [AI project audit](./AI_PROJECT_AUDIT.md)
- [AI assessment audit](./AI_PHASE_6_ASSESSMENT_AUDIT.md)
- [AI resource verification audit](./AI_PHASE_7_RESOURCE_AUDIT.md)
- [AI beginner learner-flow audit](./AI_PHASE_8_LEARNER_FLOW_AUDIT.md)

## Generated evidence and research

- [Resource verification package](../artifacts/resource-verification-package/README.md) — portable reviewer bundle.
- [DeepSeek IDE research pack](../local-research/TechSkillHUB_DeepSeek_IDE_Starter_Pack/00_READ_ME_FIRST.md) — prompts and source deliverables used during curriculum research.

These materials can be large and include generated snapshots. Check their generation date and integrity manifest before relying on them as current state.

## Repository policy

- Root [README](../README.md): product introduction and local setup.
- [Contributing](../CONTRIBUTING.md): workflow and contribution expectations.
- [Security](../SECURITY.md): private vulnerability reporting.
- [Code of Conduct](../CODE_OF_CONDUCT.md): community behavior.
- [Open-source policy](../OPEN_SOURCE.md): license and third-party resource notes.

## Historical archive

The [archive index](./archive/README.md) organizes former implementation reports, prompts, audits, and local test plans that were previously scattered through the repository root. They are preserved rather than discarded. Historical snapshots may contradict the current code and must not override the current development handoff or launch-readiness notes.
