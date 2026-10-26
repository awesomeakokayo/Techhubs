# Phase 7 — AI Resource Verification Audit

## Canonical rule

`lib/ai-resource-registry.ts` is the source of truth for external AI curriculum resources.

Every deployable resource must record:

| Field | Requirement |
|---|---|
| URL | Exact public HTTPS URL |
| Provider | Named source/provider |
| Free | `true` |
| Competency | Exact skill the resource reinforces |
| Stage | AI roadmap stage where it belongs |
| Type | `docs`, `video`, `course`, or `tool` |
| Status | `verified` |
| Last checked | ISO date of latest verification |

## Verification standard

A resource is marked `verified` only when the exact URL has been checked against the live provider site or a current authoritative search result and the resource still matches the stated competency.

Redirects to a current provider destination are acceptable when the submitted public URL remains valid. Dead, paywalled, unrelated, duplicate, or ambiguous resources must not enter the canonical registry.

## Current verification date

**2026-08-26**

The registry currently contains the deployment-safe external resources used by the AI guided path. Legacy raw resource catalogs may remain in the repository for historical context, but the learner-facing AI sequence reads from the canonical registry only.

## Provider verification notes

- Microsoft Learn: current generative AI, prompting/agent, and responsible-AI pages were checked.
- OpenAI Academy/API: current prompting, Getting Started, API, Structured Outputs, and Evals destinations were checked. OpenAI API documentation currently redirects from `platform.openai.com/docs` to `developers.openai.com/api/docs`.
- Cornell University Library: research strategy and source-evaluation guides were confirmed through current search results.
- Google Scholar: current public search service was reachable.
- YouTube Help: content planning, viewer behavior, monetization/originality, AI disclosure, analytics, and thumbnail/title guidance were checked; the AI disclosure page explicitly describes current realistic-content disclosure requirements.
- GitHub Docs: Copilot documentation, code review, and custom review instructions were checked.
- n8n: official learning-resource guidance confirms `docs.n8n.io` as the documentation starting point and the error-handling path is retained as the canonical stage resource.
- LangChain, Canva Design School, and Figma Help were checked as current public learning/documentation destinations.

## Resource policy

The registry deliberately does not mirror every historical link in `lib/ai-curriculum.ts` or the earlier Phase 3 gap catalog. Only resources actually approved for the current learner path belong in the canonical deployment registry.

This prevents stale links, duplicates, and merely related resources from becoming accidental curriculum dependencies.

## Pre-deployment gate

Before deployment, verify:

1. Every registry entry has all required fields.
2. Every entry is HTTPS, free, and `verified`.
3. Every AI stage resource mapping points to a registry entry.
4. No learner-facing AI resource is sourced directly from an un-audited legacy catalog.
5. `assertAIResourceRegistry()` passes.
6. The latest `lastChecked` dates are refreshed whenever a URL, provider, or competency mapping changes.

## Current status

**Phase 7 registry: implemented.**

The AI guided path now consumes the registry instead of the legacy instructional-gap catalog, making the audited registry the deployment source of truth.