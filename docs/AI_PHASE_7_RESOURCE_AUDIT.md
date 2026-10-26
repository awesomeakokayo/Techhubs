# Phase 7 — AI resource verification audit (stable entry point)

The complete report, provider notes, verification date, and deployment checklist are maintained in [the AI resource verification audit](./ai-audits/phase-7-resource-verification-audit.md).

Every deployable resource must record the following metadata:

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

## Pre-deployment gate

Use the full audit linked above as the source of detailed pre-deployment checks. This stable entry point remains at its original path because the automated regression suite reads this location.
