# TECHSKILLHUB — SEARCH INTELLIGENCE AUDIT (STAGE 2)

**Purpose:** Internal implementation audit for the second-stage upgrade (search intelligence, organic growth, learning-funnel).
**Method:** Codebase is the source of truth. Audited app/, components/, lib/, scripts/, sitemap/robots/structured data, analytics, internal search, content data models.
**Date:** August 19, 2026

---

## A. Existing strengths

- Complete metadata layer (`lib/seo/utils.ts` getPageMetadata): unique titles, descriptions, canonicals, OG/Twitter, robots.
- Global + Organization/WebSite JSON-LD; Article/Course/FAQ/Breadcrumb/ItemList builders all emitted by `StructuredData`.
- Dynamic `sitemap.ts` with priorities and `lastModified`; `robots.ts` with explicit AI-bot allowances (`OAI-SearchBot`).
- Rich content library: 11 guides, 5 career pages, 4 resource hubs, 22+ roadmaps, project-by-level pages.
- Every public route carries intentional metadata + canonical; private routes are noindexed.
- Direct-answer pattern: every guide/career page opens with `openingAnswer` rendered in a lead panel (search landing design).
- Contextual `related` arrays per page (topic-matched, not "latest posts").
- Feedback system (`ContentFeedback`) with helpful/no + reason taxonomy; search logging exists (`search_used`, `query_length`, `result_count`).
- Clean, fast statically-generated pages; no client-gating of public content.
- Existing audit tooling: `scripts/seo-audit.mjs` (route-level) — all green.

## B. Existing SEO architecture

- `lib/seo/` — site constants, metadata/JSON-LD utils, content types, guides/careers/resources/roadmaps/projects data.
- `components/seo/` — StructuredData, ArticleLayout, RoadmapLayout, RelatedContent, ContentFeedback.
- `app/` — robots.ts, sitemap.ts, not-found.tsx, per-route metadata, layout wrappers.
- Navigation: Navbar + Footer (discovery-oriented columns).
- Analytics: Vercel Analytics + `lib/analytics.ts` events (page_view, quiz_completed, roadmap_start, roadmap_stage_complete, resource_click, feedback_submitted, share_used, search_used, cta_click).
- Internal search: `lib/search.ts` (Fuse.js index over tracks/resources/projects/roadmap stages) — anonymized query length + result count only.

## C. Search-discovery gaps (entry points)

| Query cluster | Entry path today | Gap |
| --- | --- | --- |
| "how to get into tech" | Only /guides/how-to-learn-coding | **No exact-match page** → new guide `how-to-get-into-tech` (added) |
| "which language should I learn first" | Guide exists | Strong support, weak cross-link from /start |
| "frontend/backend/full-stack roadmap" | Roadmap pages | Strong — linked from guides/careers; needs funnel completion |
| Python/JS/AI projects | /projects levels | Projects lack journey context (project → roadmap → career) |
| Africa-specific "learn coding free in Nigeria" | african-tech-resources | Mapped but needs funnel links (resource → guide → roadmap) |
| Developer-tools queries | developer-tools | Mapped, no career/roadmap ties |

## D. Search-intent gaps

- No explicit search-intent data model existed (query → intent → target page → CTA → journey). **Added `lib/seo/search-intents.ts`.**
- No structured next-step object per page (only free-form `related`). **Added journey graph `lib/seo/journeys.ts`.**
- CTA labels vary by hand but were not intent-driven. **Now intent-driven via journeys + intent map.**
- Gaps now tracked in the intent model (`status: mapped | gap`) for future P2/P3 candidates (SQL, TypeScript-only content, UI/UX career, mobile roadmap career pages).

## E. Content architecture gaps

- Projects exist only at level granularity (`/projects/{beginner|intermediate|advanced}`); no per-topic project landing (Python projects, React projects), but per-level pages are the primary target for "projects" intents — KEEP and avoid multiplying pages.
- Resource hubs exist but funnel context is thin → journeys now connect resources to guides/roadmaps.
- Roadmaps lack an explicit "next roadmap" relationship → journey `nextSkill` fills this.
- Career pages do not connect backward to prerequisites/roadmaps → journeys the same.

## F. Funnel gaps

- Guides→roadmap exists via CTA but **no labeled conversion event** → added `guide_to_roadmap`, CTA clicks now fire `cta_click`.
- Roadmap→project and roadmap→next-step were text only (no clickable structural next step) → added `LearningFunnel` with `next_step_click`.
- Projects→career/roadmap: none → journey graph exposes this on content pages.
- Feedback: only surface widget; now feeds `feedback_submitted` with reason taxonomy (existing) — aggregated signals floor ready.

## G. Retention gaps

- No "what to learn next" surfaced after content/roadmap → `LearningFunnel` (keep learning strip) now rendered on guides, career pages, resources and roadmaps.
- No organic-landing measurement → `organic_landing` event + first-visit flag added to `useTrackPage`.
- /start goal cards lacked "get into tech" → added.
- Internal return-visit signal: deferred to existing analytics (sessionStorage-based return detection not yet added; noted in analytics section).

## H. Data gaps (cannot measure today)

- No GSC/Bing query ingestion (no credentials; will be external integration).
- No content-health scores stored → added `scripts/content-health.mjs` (editorial tool), opportunity scoring module `lib/seo/opportunities.ts`.
- Feedback signals (positive/negative by reason) exist but not yet aggregated into an admin view (P2).
- No per-stage roadmap funnel (which stage users reach) beyond `roadmap_stage_complete`.

## I. Implementation risks (do not touch)

- Do NOT replace `lib/seo/utils.ts`, sitemap, robots, or analytics plumbing — extend only.
- Do NOT index private/auth routes (login, account, dashboard, certificates, purchase, upgrade, guided-path) — unchanged.
- Do NOT add hidden text/AI-only content — all new content is user-visible.
- Do NOT duplicate analytics libraries or intent data structures in a second location.
- Do NOT fake data — opportunity estimates are explicitly labeled; no invented traffic/CTR.

## J. Recommended changes (prioritized)

- **P0** Search-intent model + matrix (DONE), journey/next-step graph (DONE), intent CTAs (DONE), contextual funnel rendering (DONE), internal-link strengthening via journeys (DONE), new `how-to-get-into-tech` guide (DONE).
- **P1** Content-health audit tool (DONE), opportunity scoring (DONE), analytics events (DONE), start-page goal (DONE), SEO regression checks (extend `seo-audit.mjs`, DONE via both scripts).
- **P2** Search performance ingestion (designed; external integration required), opportunity dashboard (future), recommendation logic (future), evidence-based content expansion (list below).

---

## Content gap matrix (P0-P1 value check)

Topic | Guide | Roadmap | Projects | Career | FAQ | CTA | Internal links | Next step | Status
--- | --- | --- | --- | --- | --- | --- | --- | --- | ---
Learning coding | ▲ | ▲ | ▲ | ▲ | ▲ | ✓ | ✓ | ✓ | Strong
Get into tech | ✓ added | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Strong
Web development | ▲ | ▲ | ▲ | ▲ | ▲ | ✓ | ✓ | ✓ | Strong
Frontend developer | ▲ | ▲ | ▲ | ▲ | ▲ | ✓ | ✓ | ✓ | Strong
Backend developer | ▲ | ▲ | ▲ | ▲ | ▲ | ✓ | ✓ | ✓ | Strong
Full-stack developer | — | ▲ | ✓(advanced) | ▲ | — | ✓ | ✓ | ✓ | Weak guide
JavaScript | ▲ | ▲ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Strong
React | — | ▲ | ✓(intermediate) | ✓ | ✓ | ✓ | ✓ | ✓ | Weak guide (via JS)
Python | ▲ | ▲ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Strong
AI | ▲ | ▲ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Strong
Data science | — | ▲ | ✓(advanced) | — | — | ✓ | ✓ | ✓ | Career gap
Cybersecurity | — | ▲ | ✓ | — | — | ✓ | ✓ | ✓ | Guide/career gap
Mobile | — | ▲ | ✓ | — | — | ✓ | ✓ | ✓ | Guide/career gap
SQL | — | partial | — | — | — | — | — | — | Intent gap (P3)

## Content overlap classification

- `/start`, `/start-here`, `/find-your-path` → distinct intents (goal hub / first-week onboarding / quiz). KEEP all; `/find-your-path` is quiz-focused duplicate of `/start` quiz → classified WATCH (add cross-links, no merge).
- Guide `how-to-become-a-frontend-developer` vs career `frontend-developer` → KEEP (teaching plan vs role/expectations), cross-linked, monitor cannibalization.
- `how-to-learn-coding` vs `how-to-get-into-tech` → now distinct primary questions. KEEP.
- Roadmap + its guide (e.g. python) → intentionally different intents (educational vs roadmap). KEEP.

## Search-to-page matrix (backbone — full list in `lib/seo/search-intents.ts`)

| Query | Intent | Target page | Primary CTA | Roadmap | Project | Conversion |
| --- | --- | --- | --- | --- | --- | --- |
| how to learn coding | educational | /guides/how-to-learn-coding | Start the roadmap | python | beginner | guide_to_roadmap |
| how to get into tech | career | /guides/how-to-get-into-tech | Find your path | frontend | beginner | guide_to_roadmap |
| frontend developer roadmap | roadmap | /roadmaps/frontend-development | Start this roadmap | frontend | beginner | roadmap_start |
| how to become a frontend developer | career | /careers/frontend-developer | Start the frontend roadmap | frontend | beginner | cta_click |
| how to learn python | educational | /guides/how-to-learn-python | Start the Python roadmap | python | beginner | guide_to_roadmap |
| material JS/react | roadmap | /roadmaps/javascript, /roadmaps/react | Start this roadmap | js/react | intermediate | roadmap_start |
| coding projects for beginners | project | /projects | Build this project | frontend | beginner | project_start |
| free coding resources | resource | /resources/free-coding-resources | Explore free resources | frontend | — | content_view |
| learn coding free in Nigeria | resource | /resources/african-tech-resources | Explore free resources | python | — | content_view |

## Funnel changes implemented

Search → landing (direct answer) → CTA (intent-tuned) → roadmap → learning (track) → project → next skill → feedback → return attempt.

## Analytics changes implemented

- `organic_landing` (search-engine referrers only, once per session, `is_first_visit` flag)
- `content_view` (standardized content_type on guides/careers/roadmaps/resources/projects)
- `next_step_click` (funnel step click, includes step kind/href)
- `guide_to_roadmap` (educational → roadmap/track CTA)
- `roadmap_start` (already existed; now also from CTA clicks on roadmap pages)
- `cta_click` (already existed; now attached to primary CTAs in ArticleLayout/RoadmapLayout)
- New event fields: `step_kind`, `step_label`, `step_href`, `roadmap_href`, `referrer`, `is_first_visit`

## SEO risks remaining

- Roadmap `Last reviewed` is hard-coded in RoadmapLayout (2026-08-19) rather than derived from content — acceptable until per-track review dates are stored; do not bump without a real review.
- `/search?q=` result pages are not public routes (search is Fuse-based on the client); no indexability risk today, but any future `/search` route must stay noindex.
- `utm_`/tracking parameter handling relies on metadata canonicals (already emitted) — no change needed; pages were verified to emit canonical without params.
- Third-party AI tools may not surface on undiscoverable content — mitigated by user-visible structured answers (no hidden text).

## External actions still required (not code)

- Google Search Console: verify site, submit sitemap.xml, request indexing for new guide/roadmap URLs.
- Bing Webmaster Tools: verify + submit sitemap.
- Content promotion: share new guide + funnels in developer/African-learning communities (manual, earned).
- Partnerships/references: optional guest posts now that content is publication-gated.
- GSC/Bing **query ingestion** requires external credentials + scheduled job — architecture designed but intentionally not claimed as integrated.

## Evidence-based content expansion candidates (P2, decide with real data)

- Full-stack developer guide (guide row empty above).
- Frontend-per-topic project pages (Python projects / React projects) if search data shows demand + journey value.
- SQL guide (backend cluster) if demand justifies.
- "How to become a developer without a degree" → fold into `how-to-get-into-tech` FAQ (already covered) to avoid cannibalization.
- Africa-specific career pages only if genuinely distinct content can be written (do not create artificial country pages).