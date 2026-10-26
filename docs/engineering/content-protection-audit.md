# TechSkillHUB — Content Exposure & Scraping Audit

Status: internal. Based on inspection of the working tree on branch `feat/retention-v3`
(working tree preserved; no commits made). This audit describes what is actually
shipped today and the one confirmed unsafe exposure that was corrected.

## 1. Scope and method

- Read the real routes, API handlers and imported modules rather than trusting
  filenames. A module in `lib/` is **not** private by virtue of its location.
- Traced the client/server boundary: any `'use client'` component (and everything
  it imports at runtime) is shipped to the browser. `import type` is erased and is
  not shipped.
- Verified the resulting production build by searching compiled client chunks for
  authored lesson/answer text (see §5).

Client bundle reachability was checked for every module in `lib/` that contains
authored curriculum, assessment banks, answer keys or project briefs.

## 2. Content classification (current behaviour)

| Material | Where it lives | Current reachability | Intended |
| --- | --- | --- | --- |
| Marketing pages, homepage, `/start`, `/start-here`, `/find-your-path` | `app/(marketing)` | Public, indexable | Public |
| Catalogue metadata (track names, taglines, roadmap **topics**, resource links, project titles/tags) | `lib/tracks.ts` | Public; also bundled into client components (`tracks` page, `TrackCardLarge`, `TrackPageView`, `ResourcesClient`) | Public |
| SEO guides, career guides, resource pages, submission help guides | `lib/seo/*` | Public, in `sitemap.xml`, indexable | Public |
| Project briefs (problem, requirements, acceptance criteria, evidence) | `lib/curriculum.ts`, `lib/ai-project-briefs.ts` | Public project cards (`ProjectCard`) and authenticated guided path | Public (product content) |
| Authored stage lesson bodies (objective, success criteria, common mistakes, exercise) | `lib/curriculum.ts`, `lib/curriculum-extended.ts`, `lib/ai-stage-lessons.ts` | **Authenticated guided path only**, via `GET /api/guided-path/[trackId]` | Learner-facing; not indexable |
| Knowledge-check question bank incl. `correctIndex` + `explanation` | `lib/curriculum.ts`, `lib/curriculum-extended.ts`, `lib/ai-curriculum.ts`, `lib/ai-assessment-bank.ts` | **Authenticated guided path only** (answers stripped by `toPublicStep`); previously also leaked to the client bundle — see §4 | Protected |
| Project grading rubric internals (weights, criteria set) | `lib/project-verification/contract.ts` | Server only; `toPublicContract` removes weights before sending | Protected |
| AI assessment raw prompt, model output, internal codes | `lib/project-verification/prompt.ts`, `assessment.ts` | Server only | Protected |

No content is currently gated behind payment: `hasTrackAccess()` in
`lib/access.ts:25` returns `true` for every learner by design ("learning is now
fully free"). This audit did **not** change learner access.

## 3. API surface review

| Endpoint | Auth | Returns | Assessment |
| --- | --- | --- | --- |
| `GET /api/guided-path/[trackId]` | session required (`route.ts:80`) + `hasTrackAccess` | Public steps only; quiz answers stripped by `toPublicStep` (`lib/guided-path.ts:70`); own submission detail only | Safe |
| `POST /api/guided-path/[trackId]` | session + access | Quiz feedback (`correctIndex`, `explanation`) only **after** the learner submits; project advance gated on a stored pass | Safe |
| `POST /api/project-verification/[trackId]` | session + access; unlocked-step check; `acknowledged` required | Result summary + per-criterion feedback; DB-backed hourly budget | Safe |
| `GET/POST /api/progress` | session required; scoped to `session.user.id` | Learner's own progress | Safe |
| `GET/POST/PATCH /api/learner-profile` | session required | Validated, length-capped profile | Safe |
| `POST /api/events` | session required; allow-listed event names; max 25 per call | Learning events | Safe |
| `GET/POST /api/checklist-progress` | session required; catalogue-validated items | Learner's own checklist | Safe |
| `GET /api/certificate/[trackId]` | session required; requires a `CourseCompletion` row | PDF for the learner's own completion | Safe |
| `GET /api/access/[trackId]` | session optional | Boolean only | Safe |
| `GET /api/payments/pricing` | public | Public pricing presentation only | Safe |
| `POST /api/payments/*` | session + signature verification | Dormant; no UI calls `initialize` (see payment-readiness doc) | Safe (inactive) |
| `GET /api/debug` | **404 in production** (`route.ts:9`) | Local diagnostics only | Safe |
| `POST /api/contact` | public | Sends mail via SMTP; no rate limit | Abuse-controlled at edge (see §6) |

No endpoint returns a full question bank, answer key, rubric weight, or another
user's data. There is no bulk catalogue dump endpoint; reads are scoped to a
single `trackId` and to the caller's own records.

## 4. Confirmed unsafe exposure (corrected)

**Finding:** Knowledge-check answer keys and lesson bodies were shipped to the
browser.

**Chain:** `components/quiz/TrackQuiz.tsx` (`'use client'`) imported
`buildGuidedPath` from `@/lib/guided-path`. That module imports
`getStageLearningPlan`, `getProjectBrief`, `STAGE_PROJECT_MAP` and
`PORTFOLIO_PROJECT` from `@/lib/curriculum`, so the whole authored curriculum —
including every `knowledgeCheck[].correctIndex` and `explanation` — became
reachable from the client component graph. The quiz is rendered by three public
pages: `/start`, `/start-here`, `/find-your-path`.

The quiz only needed the **number of steps** per track to estimate pace, not the
content.

**Fix (self-contained, no access change):**

- Added `lib/quiz-pace.ts`. `approxLearningHoursByTrack()` computes the same
  estimate server-side and returns a plain `{ trackId: hours }` map.
- `components/quiz/TrackQuiz.tsx` no longer imports `@/lib/guided-path`; it
  receives `approxHoursByTrack` as a prop.
- The three pages compute the map on the server (`approxLearningHoursByTrack()`)
  and pass it in.
- Added `tests/quiz-pace.test.js`: (a) the client component must not import
  `guided-path`/`curriculum`, (b) no `'use client'` file may import those
  modules (excluding `import type`), and (c) the server estimate still matches
  `buildGuidedPath`.

Behaviour is unchanged for learners; only where the number is computed changed.

## 5. Build verification

A production build of the corrected tree was compiled and its client chunks
searched:

- Authored question text (e.g. `"Which element should contain the unique primary content"`):
  **0** client chunks; present in the server bundle (`server/chunks/5658.js`).
- Lesson-body markers produced by `lib/guided-path.ts` / `lib/ai-guided-path.ts`
  (`COMMON MISTAKES`, `SUCCESS CRITERIA`): **0** authored occurrences in client
  chunks. Two case-insensitive hits exist but come from public sample prompts in
  `lib/tracks.ts` (`tracks` catalogue), which is intended public content.
- `correctIndex` appears in the guided-path client chunk only as the shape of the
  **post-submission feedback** the learner receives for their own answers
  (`m.results[t].correctIndex`), not as a preloaded answer bank.

## 6. Remaining exposures and recommendations

These are inherent or require external configuration; none was applied here.

1. **Already-delivered content can be copied.** Once an authorised learner's
   browser holds a lesson, it can be copied. The goal is to prevent *bulk,
   unauthorised* access, not to make copying impossible.
2. **Rate limiting on expensive/high-volume reads** is still not implemented in
   code. `docs/operations/LAUNCH_READINESS.md §2` correctly states an in-process limiter must
   not be used on serverless Vercel. Recommended: Cloudflare WAF rate-limiting
   rules and/or Upstash/Vercel KV for:
   - `POST /api/project-verification/[trackId]` (already has a DB budget:
     20/user/hour, 500 global/hour via `checkAssessmentBudget`, `store.ts:139`),
   - `GET /api/guided-path/[trackId]`,
   - `POST /api/contact`.
3. **Cloudflare** (compatible, config-only, not changed here): bot management for
   `/api/*`, a rate-limit rule on the two endpoints above, and a cache rule that
   **must not** cache authenticated API responses. Keep public marketing pages
   cacheable.
4. **`robots.txt` is not access control.** Current `app/robots.ts` disallows
   `/api/`, `/login`, `/account`, `/dashboard/`, `/certificate/`, `/guided-path/`,
   `/upgrade` while allowing `Googlebot`/`Bingbot`/`OAI-SearchBot` on public
   content. Keep it as crawler etiquette only; protected content is (and must
   stay) enforced server-side. Do not block all bots indiscriminately.
5. **Bounded pagination.** No catalogue/content endpoint currently returns
   unbounded lists, so no pagination change was required. If a public catalogue
   or content API is added later, it must be bounded and rate-limited from day one.
6. **Attribution.** Catalogue resources link to third-party material. TechSkillHub
   does not claim ownership of externally linked content (`README.md`,
   `OPEN_SOURCE.md`). Preserve attribution when adding Pro material.

## 7. What was deliberately not changed

- No learner access was altered; every existing path remains reachable exactly as
  before. Free/Pro enforcement is design-only (see `docs/engineering/entitlement-architecture.md`).
- Public marketing pages, SEO guides and submission help guides remain public and
  indexable.
- No `robots.txt` blocks were added for protected content as a substitute for
  server-side authorisation.
