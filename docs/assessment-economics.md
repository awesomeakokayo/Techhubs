# TechSkillHUB — Project Assessment Economics

Status: internal working estimate. No historical usage statistics are recorded,
so **nothing here is presented as measured historical usage**. Every number is
either a **code fact** or a **labelled estimate** derived from the code and the
current official provider price list.

## 1. What the system actually does (code facts)

Project verification (`POST /api/project-verification/[trackId]`) runs:

1. **Deterministic pre-checks** (`lib/project-verification/evidence.ts`): required
   artifact present, valid URL, explanation ≥ minimum words. Failures return
   `invalid`/`incomplete` and **never call the model** — no cost.
2. **Evidence retrieval** (no model): GitHub README + selected source files,
   or a document/web page. Content is truncated into a prompt budget.
3. **Model call** (`lib/project-verification/assessment.ts:96`): `deepseek-flash`
   via `lib/project-verification/provider.ts`, `temperature 0.1`,
   `max_tokens 3000`, `response_format: json_object`, 30s timeout.
4. **Strict validation + deterministic decision.** The AI never decides
   progression; a malformed response yields `service_unavailable`, never a pass.

### Recorded today
- Redacted learning events only: `project_assessed` / `project_assessment_failed`
  with `{ projectId, status, code, provider }`. **No token counts, no cost, no
  latency are recorded.** `LearningEvent.metadata` is redacted by design
  (`app/api/project-verification/[trackId]/route.ts:120`).

### Prompt size (code facts → token estimate)
| Component | Cap in code | ≈ tokens (≈4 chars/token) |
| --- | --- | --- |
| System prompt | ~1,300 chars | ~330 |
| Fixed rubric / deliverables / examples | ~2,000–3,000 chars | ~500–750 |
| Learner explanation | 6,000 chars (`prompt.ts:54`) | ~1,500 |
| Artifact evidence budget | 52,000 chars (`prompt.ts:56`) | ~13,000 |
| **Input total** | | **~3,000 (small) – 16,000 (max)** |
| Model output | `max_tokens 3000` | ~800–3,000 |

Reuse and retry controls already present:
- `isReusablePass` returns a prior pass for **identical evidence + rubric** with no
  new model call (`store.ts:105`).
- At most **one** retry for an empty/malformed response (`assessment.ts:93`) →
  a rare ≤2× cost on malformed JSON.
- A **DB-backed** budget: 20 assessments/user/hour and 500 global/hour
  (`store.ts:128`, `checkAssessmentBudget`). This is the only hard spend ceiling
  today.

## 2. Provider price (official, verified)

Source: DeepSeek official pricing (`https://api-docs.deepseek.com/quick_start/pricing`,
retrieved for this task). `deepseek-flash` = DeepSeek-V4.1-Flash. USD per 1M tokens:

| | Input (cache miss) | Input (cache hit) | Output |
| --- | --- | --- | --- |
| Off-peak | $0.15 | $0.003 | $0.60 |
| Peak | $0.30 | $0.006 | $1.20 |

Peak = 01:00–04:00 and 06:00–10:00 UTC, Mon–Fri (≈21% of weekly hours); all other
time is off-peak. Cache hits (system prompt reuse) reduce input cost further.

## 3. Per-assessment cost model

Formula: `cost = input_tokens × input_price + output_tokens × output_price`.
All values **estimates**.

| Scenario | Input tok | Output tok | Off-peak | Peak |
| --- | --- | --- | --- | --- |
| Light (small repo, short explanation) | 4,000 | 800 | **$0.0011** | **$0.0022** |
| Typical | 10,000 | 1,200 | **$0.0022** | **$0.0044** |
| Heavy (full evidence) | 16,000 | 2,000 | **$0.0036** | **$0.0072** |
| Absolute worst (max input + 3k output) | 16,000 | 3,000 | **$0.0042** | **$0.0084** |

**Planning figure:** ≈ **$0.003 per assessment** blended, with a worst case
**≤ $0.01**. Assumption: mostly off-peak traffic (Nigeria/Africa study hours sit
largely outside the UTC peak), no cache-hit credit assumed (conservative).

Overheads with **no direct model cost** but real latency/limits: GitHub API calls
(public; optional `GITHUB_TOKEN` raises rate limits), webpage/document fetches
(≤400 KB, 30s timeout), and the DB budget queries.

## 4. Monthly scenarios (estimates)

Assumes 0.003 blended per assessment and typical output.

| Scenario | Assessments / month | Est. model cost |
| --- | --- | --- |
| Modest launch (free tier only) | 1,000 | ~$3 |
| 1,000 active learners × 6 | 6,000 | ~$18 |
| 5,000 active learners × 8 | 40,000 | ~$120 |
| 10,000 active learners × 8 | 80,000 | ~$240 |
| **Hard ceiling from existing global cap** (500/hr) | 360,000 | ~$1,080–$3,024 |

The last row shows the current global budget already bounds worst-case exposure to
roughly $1k–$3k/month at full abuse. Per-user hourly cap bounds any single account.

Non-model variable costs (hosting, Postgres, email) are **not measurable** from
this repository and are excluded here — the platform runs on serverless hosting
with an external Postgres; the owner must supply those actuals.

## 5. Recommended allowances and controls

| Control | Recommendation |
| --- | --- |
| Free allowance | **2 assessments/month** (launch allowance; users retain access to free resources and progress after exhaustion) |
| Pro allowance | **150 assessments/month** |
| Per-user hourly | keep 20/hr while trialling; consider 6/hr to blunt scripted abuse (a learner rarely needs >6 judged submissions in an hour) |
| Global hourly | keep 500/hr; alert at 60% |
| Reuse | keep `isReusablePass` (identical evidence → no spend) |
| Failure handling | keep "fail → `service_unavailable`, never a pass"; do not charge a credit when the provider fails or the model returns invalid output |
| Monthly budget | add a per-user monthly counter (depends on the entitlement work), plus a global monthly alert |
| Observability | record `{ tokensIn, tokensOut, latencyMs, provider, model, status }` in the assessment event **without** content, so cost becomes measurable going forward |
| Result reuse cache | reuse within the same evidence fingerprint is already implemented; extend to a short TTL only if needed |

## 6. What is confirmed vs estimated

- **Confirmed:** which steps call the model; the truncation budgets; the retry,
  reuse and budget logic; redacted logging; the official price list.
- **Estimated:** token counts, per-assessment cost, monthly scenario totals, the
  share of peak traffic, and hosting costs.
- **Not available:** real historical usage, real average assessment cost, real
  reassessment frequency. These cannot be invented; instrument the event metadata
  first, then revisit the allowances.

## 7. Non-negotiable

Do not offer "unlimited" assessments. The current evidence supports metered
allowances with a hard global ceiling; unlimited assessment is not justified until
real token/cost telemetry exists and the abuse ceiling has been reviewed.
