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

**2026-10-28 for the new AI Agents and AI Engineering entries.** Existing entries retain their own `lastChecked` date; a new date must not be interpreted as a full recertification of the entire AI catalogue.

The registry is the canonical inventory for audited entries, but the current resolver still combines registry items with extension, researched, and package-selected sources. Do not assume every link across all ten AI tracks has been re-reviewed just because this registry has been updated. The focused 2026-10-28 additions below cover every stage of AI Agents and AI Engineering; the remaining AI tracks still need a full source-to-learner reconciliation.

## Provider verification notes

- Microsoft Learn: current generative AI, prompting/agent, and responsible-AI pages were checked.
- OpenAI Academy/API: current prompting, Getting Started, API, Structured Outputs, and Evals destinations were checked. OpenAI API documentation currently redirects from `platform.openai.com/docs` to `developers.openai.com/api/docs`.
- Cornell University Library: research strategy and source-evaluation guides were confirmed through current search results.
- Google Scholar: current public search service was reachable.
- YouTube Help: content planning, viewer behavior, monetization/originality, AI disclosure, analytics, and thumbnail/title guidance were checked; the AI disclosure page explicitly describes current realistic-content disclosure requirements.
- GitHub Docs: Copilot documentation, code review, and custom review instructions were checked.
- n8n: official learning-resource guidance confirms `docs.n8n.io` as the documentation starting point and the error-handling path is retained as the canonical stage resource.
- LangChain, Canva Design School, and Figma Help were checked as current public learning/documentation destinations.


## Focused stage coverage added on 2026-10-28

The following official/public documentation mappings were added to the AI Agents and AI Engineering extension map and the canonical registry. Their exact destinations were checked against current provider documentation or authoritative search results on 2026-10-28. Stage-to-URL alignment remains subject to learner-rendered verification and expert curriculum review.

| Track | Stage | Competency | Resource |
|---|---:|---|---|
| AI Agents | 1 | Agent purpose and learning sequence | [OpenAI — Building Agents](https://developers.openai.com/tracks/building-agents) |
| AI Agents | 2 | Workflow versus agent design | [OpenAI — Building Agents](https://developers.openai.com/tracks/building-agents) |
| AI Agents | 3 | Agent runtime, state, and definitions | [OpenAI Agents SDK](https://developers.openai.com/api/docs/guides/agents/sdk) |
| AI Agents | 4 | Tool schemas and execution lifecycle | [OpenAI — Function Calling](https://developers.openai.com/api/docs/guides/function-calling) |
| AI Agents | 5 | Context and conversation state | [OpenAI — Conversation State](https://developers.openai.com/api/docs/guides/conversation-state) |
| AI Agents | 6 | Guardrails and failure handling | [OpenAI Agents SDK — Guardrails](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) |
| AI Agents | 7 | Traces and observability | [OpenAI Agents SDK — Observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) |
| AI Agents | 8 | Human approval boundaries | [OpenAI Agents SDK — Human Review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) |
| AI Agents | 9 | Agent evaluation and regression | [OpenAI — Evaluate Agent Workflows](https://developers.openai.com/api/docs/guides/agent-evals) |
| AI Agents | 10 | Multi-agent orchestration | [OpenAI — Orchestration and Handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration) |
| AI Engineering | 1 | API integration and application patterns | [OpenAI API Documentation](https://developers.openai.com/api/docs) |
| AI Engineering | 2 | Model selection and workload fit | [OpenAI — Model Selection](https://developers.openai.com/api/docs/guides/model-selection) |
| AI Engineering | 3 | Structured output schemas | [OpenAI — Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) |
| AI Engineering | 4 | Embeddings and semantic similarity | [OpenAI — Embeddings](https://developers.openai.com/api/docs/guides/embeddings) |
| AI Engineering | 5 | Retrieval, ranking, and chunking | [OpenAI — Retrieval](https://developers.openai.com/api/docs/guides/retrieval) |
| AI Engineering | 6 | File search and grounded generation | [OpenAI — File Search](https://developers.openai.com/api/docs/guides/tools-file-search) |
| AI Engineering | 7 | Hybrid lexical and vector search | [Microsoft Learn — Hybrid Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview) |
| AI Engineering | 8 | Repeatable evaluation tests | [Promptfoo — Intro](https://www.promptfoo.dev/docs/intro/) |
| AI Engineering | 9 | Cost and request optimization | [OpenAI — Cost Optimization](https://developers.openai.com/api/docs/guides/cost-optimization) |
| AI Engineering | 10 | Production readiness | [OpenAI — API Deployment Checklist](https://developers.openai.com/api/docs/guides/deployment-checklist) |

The existing resource evidence snapshot in `docs/curriculum-stage-evidence.md` was generated on 2026-10-24 and has **not** been regenerated as part of this focused change. The updated mappings demonstrate that the intended source entries exist; they do not certify that every other AI track is complete or that every link has been checked inside the deployed learner UI.

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