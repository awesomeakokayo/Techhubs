# Reviewer packet — Full-Stack Development

- **Track id:** `fullstack`  ·  **Slug:** `full-stack-development`  ·  **Category:** build  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.3/100 · worthiness 98.5/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Complete Frontend Track | Build and deploy a responsive frontend before you add a backend. | See Frontend track | 4 |
| 2 | Complete Backend Track | Consolidate the backend skills you will connect to the frontend: APIs, databases and authentication. | See Backend track | 4 |
| 3 | Integration | Connect the frontend to the backend and handle authentication and errors end-to-end. | 3 to 4 weeks | 4 |
| 4 | Full Deployment | Deploy the frontend, backend and database together and manage configuration safely. | 2 to 3 weeks | 5 |
| 5 | Production Patterns | Apply production patterns: billing, real-time features and background work. | 3 to 4 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 5.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 4 — Full Deployment**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 2 — Complete Backend Track**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 5 — Production Patterns**: content-inspected required resources 2, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Complete Frontend Track

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| The Odin Project | required | L3 | content-inspection | — | 1 | https://www.theodinproject.com |
| Full Stack Open | required | L3 | content-inspection | — | 0 | https://fullstackopen.com/en |
- _L3 required evidence — The Odin Project: “visibility#off" aria-hidden="true" data-transition-enter="transition-opacity ease-linear duration-200" data-transition-enter-start="opacity-0" data-transition-enter-end="opacity-100" data-transition-leave="transition-op…”_
- _L3 required evidence — Univ. of Helsinki: “Deep Dive Into Modern Web Development Full Stack open Start course Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development. The m…”_

### Stage 2 — Complete Backend Track

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Next.js Official Docs | required | L3 | content-inspection | — | 0 | https://nextjs.org/docs |
- _L3 required evidence — Vercel: “Next.js Docs What is Next.js? Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations. It also auto…”_

### Stage 3 — Integration

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Supabase Docs | required | L3 | content-inspection | — | 2 | https://supabase.com/docs |
- _L3 required evidence — Supabase: “DOCS Supabase Documentation Learn how to get up and running with Supabase through tutorials, APIs and platform resources. Help me get set up with Supabase. Do the following: Install the Supabase CLI as a project dev dep…”_

### Stage 4 — Full Deployment

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Stripe Documentation | required | L3 | content-inspection | — | 0 | https://stripe.com/docs |
| Full-Stack MERN App | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=nu_pCVPKzTk |
- _L3 required evidence — Stripe: “Skip to content Create account or Sign in Search / Ask AI Create account Sign in APIs & SDKs Help Documentation Explore our guides and examples to integrate Stripe. Get started with Stripe Explore all products Sign in o…”_

### Stage 5 — Production Patterns

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| WebSockets with Socket.IO | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=CzcfeL7ymbU |
| Bull Queue Overview | required | L3 | content-inspection | — | 0 | https://optimalbits.github.io/bull/ |
| SaaS Architecture Guide | required | L3 | content-inspection | — | 3 | https://render.com/articles/building-and-deploying-a-saas-application-from-scratch |
- _L3 required evidence — OptimalBits: “What is Bull? Bull is a Node library that implements a fast and robust queue system based on redis . Although it is possible to implement queues directly using Redis commands, this library provides an API that takes car…”_
- _L3 required evidence — Render: “Migrating production infrastructure? Get up to $10K in migration credits. Apply now Core architectural patterns for SaaS Most SaaS applications fail not from bad features, but from architectural decisions made in the fi…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 4 | Full-Stack MERN App | L2 | not verified | not verified — review manually |
| 5 | WebSockets with Socket.IO | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Complete Frontend Track (3 questions)

1. What does Tailwind CSS primarily provide?
   - · A component library you import
   - **✔ Utility-first CSS classes you compose in markup**
   - · A JavaScript state manager
   - · A database layer
   - _Why:_ Tailwind is utility-first: small single-purpose classes composed directly in your markup. · _level: understand_
2. How is Next.js best described relative to React?
   - · A replacement for React
   - **✔ A framework that adds routing, rendering modes and build tooling on top of React**
   - · A CSS framework
   - · A database ORM
   - _Why:_ Next.js builds on React and adds routing, server rendering, and production tooling. · _level: understand_
3. A client-rendered app works in dev but returns 404 when you refresh a nested route after deploying. What is the most likely cause?
   - · The database is offline
   - **✔ The host is missing a rewrite so unknown paths fall back to the app entry**
   - · Tailwind did not compile
   - · React is not installed
   - _Why:_ Client-side routes need a fallback rewrite so deep links resolve to the app entry point. · _level: analyze_

### Stage 2 — Complete Backend Track (3 questions)

1. Which HTTP method is conventionally used to create a new resource?
   - · GET
   - **✔ POST**
   - · DELETE
   - · HEAD
   - _Why:_ POST creates a resource; the server typically returns 201 and the new resource. · _level: recall_
2. What does a foreign key in PostgreSQL enforce?
   - · Faster reads
   - **✔ That a referenced row exists in the related table**
   - · Alphabetical sorting
   - · Password hashing
   - _Why:_ A foreign key enforces referential integrity between tables. · _level: understand_
3. Where should a database password live in a deployed backend?
   - · Hard-coded in the source
   - **✔ In an environment variable or secret manager**
   - · In the README
   - · In a public repository
   - _Why:_ Secrets belong in environment variables or a secret manager, never in source control. · _level: apply_

### Stage 3 — Integration (3 questions)

1. A browser request to your API is blocked by CORS. What is the correct fix?
   - · Disable the browser security
   - **✔ Configure the server to send the appropriate Access-Control-Allow-* headers for the allowed origin**
   - · Rename the endpoint
   - · Use HTTP instead of HTTPS
   - _Why:_ CORS is enforced by the browser; the server must grant access with the correct response headers. · _level: apply_
2. Where must an authorization decision be enforced for trust?
   - · In the browser UI only
   - **✔ On the server for every request**
   - · In CSS
   - · In the database client
   - _Why:_ The server is the trust boundary; client checks are only for user experience. · _level: understand_
3. What is an optimistic UI update?
   - **✔ Updating the UI immediately and rolling back if the server request fails**
   - · Waiting for the server before showing anything
   - · Never showing errors
   - · Caching every response forever
   - _Why:_ Optimistic updates feel fast but must roll back when the server rejects the change. · _level: apply_

### Stage 4 — Full Deployment (3 questions)

1. How should you keep production and development databases separate?
   - · Use the same URL but different passwords
   - **✔ Use a separate DATABASE_URL per environment**
   - · Rely on table prefixes
   - · Disable the database in development
   - _Why:_ Each environment must point at its own database via its own configuration. · _level: apply_
2. Why serve the app over HTTPS?
   - · It makes it faster
   - **✔ It encrypts traffic and verifies the server identity**
   - · It removes the need for authentication
   - · It compresses images
   - _Why:_ HTTPS provides transport encryption and server identity, protecting credentials and data. · _level: understand_
3. A deploy works locally but fails in production because an environment variable is missing. How do you prevent this?
   - · Assume it will not happen
   - **✔ Validate required configuration on startup so the app fails fast with a clear message**
   - · Hard-code a fallback secret
   - · Ignore the variable
   - _Why:_ Failing fast on missing configuration turns a silent production bug into a clear startup error. · _level: analyze_

### Stage 5 — Production Patterns (3 questions)

1. Why must a payment webhook signature be verified on the server?
   - · To make it faster
   - **✔ To prove the notification genuinely came from the payment provider**
   - · To avoid storing data
   - · To reduce cost
   - _Why:_ An unverified webhook can be forged, letting an attacker grant themselves paid access. · _level: evaluate_
2. When should work be moved to a background job?
   - · When it is quick and must block the response
   - **✔ When it is long-running or does not need to block the user response**
   - · Never
   - · Only on the client
   - _Why:_ Long or non-urgent work belongs in the background so requests stay fast and reliable. · _level: apply_
3. Why is idempotency important in payment handling?
   - · It makes payments free
   - **✔ So retries do not charge or credit the same order twice**
   - · It speeds up the database
   - · It encrypts the card
   - _Why:_ Webhooks and network retries can repeat an event; idempotent handling prevents duplicate effects. · _level: analyze_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `fs-p0` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 2 — project `fs-p2` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 3 — project `fs-p1` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 4 — project `fs-p5` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| A push to main deploys automatically and succeeds | 1 | no |
| The app starts from a clean environment with only documented configuration | 1 | no |
| A health check reports status | 1 | no |
| Rollback steps are documented and tested once | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 5 — project `fs-p3` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: Responsive Portfolio & Deploy

- **Objective:** Complete "Responsive Portfolio & Deploy" to a standard you can show and explain to someone else.
- **Problem:** A real foundation problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 2 — Build: Job Board

- **Objective:** Complete "Job Board" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 3 — Build: Full Blog Platform

- **Objective:** Complete "Full Blog Platform" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 4 — Build: Production Deployment & Observability

- **Objective:** Deploy the app to a hosted environment with configuration, CI/CD, health checks, logs, and a rollback plan.
- **Problem:** A working full-stack app exists locally but has never been deployed reliably or observed in production.
- **Audience:** A small team that needs repeatable releases without downtime surprises.
- **Required functionality:**
  - Environment-specific configuration via environment variables
  - A repeatable build and deploy pipeline
  - A health/readiness endpoint
  - Structured logs and a basic error-alerting plan
- **Acceptance criteria:**
  - A push to main deploys automatically and succeeds
  - The app starts from a clean environment with only documented configuration
  - A health check reports status
  - Rollback steps are documented and tested once
- **Required evidence:**
  - Repository with the pipeline config
  - A link to the running deployment
  - A short operations note (logs, alerts, rollback)
- **Constraints:**
  - No secrets in the repository or image
  - Deployment must be reproducible from scratch
  - Must not require manual file edits on the server

### Stage 5 — Build: E-commerce Platform

- **Objective:** Complete "E-commerce Platform" to a standard you can show and explain to someone else.
- **Problem:** A real portfolio problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

## 8. Worked examples

- **Stage 1:** Build the frontend half faithfully. Step 1: follow the design's structure with semantic HTML. Step 2: lay it out so it holds at 375px and 1280px. Step 3: wire one interactive element to component state. Step 4: keep the…
- **Stage 2:** Build and document the API. Step 1: define the endpoints and their status codes. Step 2: add request validation. Step 3: persist to a database through a repository layer. Step 4: call every endpoint from a client script…
- **Stage 3:** Connect the two halves. Step 1: fetch the list on load. Step 2: render loading, empty and error states. Step 3: on form submit, POST and update the list optimistically. Step 4: force a 500 response and confirm the UI re…
- **Stage 4:** Deploy both halves. Step 1: build the frontend to static assets. Step 2: run the API behind a reverse proxy. Step 3: set environment variables in the host. Step 4: complete one full user flow — sign up, create a record,…
- **Stage 5:** Add production safeguards. Step 1: add structured logs with request ids. Step 2: add a health endpoint and an error boundary. Step 3: rate-limit the write endpoint. Step 4: write the rollback steps. Trigger one failure …

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 4 — required (L2): https://www.youtube.com/watch?v=nu_pCVPKzTk
- Stage 5 — required (L2): https://www.youtube.com/watch?v=CzcfeL7ymbU

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.3) **and** worthiness ≥ 90 (this track: 98.5).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

