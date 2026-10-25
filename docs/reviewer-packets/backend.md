# Reviewer packet — Backend Development

- **Track id:** `backend`  ·  **Slug:** `backend-development`  ·  **Category:** build  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.2/100 · worthiness 98.4/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Foundations | Explain how the web works and run a first backend program with HTTP and version control. | 4 to 6 weeks | 5 |
| 2 | Core Backend | Design and implement a REST API with authentication, validation and correct error handling. | 6 to 8 weeks | 6 |
| 3 | Databases | Model data and query a relational database safely and efficiently. | 4 to 6 weeks | 6 |
| 4 | Advanced Backend | Apply advanced backend patterns: caching, background work, real-time transport and rate limiting. | 4 to 6 weeks | 6 |
| 5 | Deployment | Containerise, configure and deploy a backend service with a repeatable pipeline. | 3 to 4 weeks | 5 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 5.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 1 — Foundations**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 4 — Advanced Backend**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 2 — Core Backend**: content-inspected required resources 3, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Foundations

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| How the Internet Works | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=7_LPdttKXPc |
| HTTP Crash Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=iYM2zFP3Zn0 |
| Build Your First API in 30 Minutes | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=L72fhGm1tfE |
| CS50 Web Programming | required | L3 | content-inspection | — | 0 | https://cs50.harvard.edu/web |
- _L3 required evidence — Harvard: “Welcome This course picks up where CS50x leaves off, diving more deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap. Topics include …”_

### Stage 2 — Core Backend

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Introduction to Node.js | required | L3 | content-inspection | — | 0 | https://nodejs.org/en/learn/getting-started/introduction-to-nodejs |
| Node.js & Express Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=Oe421EPjeBE |
| JWT Introduction | required | L3 | content-inspection | — | 2 | https://jwt.io/introduction |
| FastAPI Official Docs | required | L3 | content-inspection | — | 0 | https://fastapi.tiangolo.com |
- _L3 required evidence — Node.js: “Introduction to Node.js Node.js is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project! Node.js runs the V8 JavaScript engine, the core of Google Chrome,…”_
- _L3 required evidence — jwt.io: “What is JSON Web Token? When should you use JSON Web Tokens? What is the JSON Web Token structure? How do JSON Web Tokens work? Why should we use JSON Web Tokens? Difference Between Validating and Verifying a JWT Differ…”_
- _L3 required evidence — FastAPI: “Opinions FastAPI mini documentary Typer , the FastAPI of CLIs Requirements Installation Example Example upgrade Performance Dependencies License Features Learn Security Middleware CORS (Cross-Origin Resource Sharing) SQ…”_

### Stage 3 — Databases

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| SQLZoo | required | L3 | content-inspection | — | 2 | https://sqlzoo.net |
| PostgreSQL Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=qw--VYLpxG4 |
| Use The Index, Luke | required | L3 | content-inspection | — | 2 | https://use-the-index-luke.com |
- _L3 required evidence — SQLZoo: “Anonymous Not logged in Log in SQLZoo Search SQL Tutorial From SQLZoo Namespaces Main Page Discussion More More Page actions Read View source History Language: Project:Language policy English • 日本語 • русский • 中文 Tutori…”_
- _L3 required evidence — Markus Winand: “by Markus Winand . SQL Indexing and Tuning e-Book A site explaining SQL indexing to developers—no crap about administration. SQL indexing is the most effective tuning method—yet it is often neglected during development.…”_

### Stage 4 — Advanced Backend

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| FastAPI Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=0sOvCWFmrtA |
| Docker Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=fqMOX6JJhGo |
| Full Stack Open | required | L3 | content-inspection | — | 1 | https://fullstackopen.com/en |
- _L3 required evidence — Univ. of Helsinki: “Deep Dive Into Modern Web Development Full Stack open Start course Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development. The m…”_

### Stage 5 — Deployment

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Render Deployment Guide | required | L3 | content-inspection | — | 2 | https://render.com/docs/your-first-deploy |
| Railway Deployment Guides | required | L3 | content-inspection | — | 2 | https://docs.railway.com/guides/express |
| GitHub Actions Documentation | required | L3 | content-inspection | — | 0 | https://docs.github.com/en/actions |
- _L3 required evidence — Render: “Welcome! Let's get up and running on Render. This tutorial uses free Render resources. No payment is required. All you need is a repository connected to a supported Git provider with the web app you want to deploy. Want…”_
- _L3 required evidence — Railway: “Deploy an Express App deployment express nodejs backend Express is a fast and flexible web application framework for Node.js that provides a simple and minimalistic approach to building web servers and APIs. It is known…”_
- _L3 required evidence — GitHub: “GitHub Actions documentation Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, …”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 1 | How the Internet Works | L2 | not verified | not verified — review manually |
| 1 | HTTP Crash Course | L2 | not verified | not verified — review manually |
| 1 | Build Your First API in 30 Minutes | L2 | not verified | not verified — review manually |
| 2 | Node.js & Express Full Course | L2 | not verified | not verified — review manually |
| 3 | PostgreSQL Full Course | L2 | not verified | not verified — review manually |
| 4 | FastAPI Full Course | L2 | not verified | not verified — review manually |
| 4 | Docker Full Course | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Foundations (3 questions)

1. Which HTTP method is intended to retrieve data without changing server state?
   - · POST
   - **✔ GET**
   - · DELETE
   - · PATCH
   - _Why:_ GET retrieves a representation and should not change server state. · _level: understand_
2. What does HTTP status 201 usually mean?
   - · The request failed
   - **✔ A new resource was created**
   - · The server is busy
   - · Redirect to login
   - _Why:_ 201 Created is returned after a resource is successfully created, typically after POST. · _level: understand_
3. Why should secrets never be committed to Git?
   - · They slow the repository
   - **✔ Git history is durable and the secret cannot be reliably removed once shared**
   - · Git cannot store them
   - · They increase build time
   - _Why:_ Once a secret is committed it persists in history and is compromised. · _level: evaluate_

### Stage 2 — Core Backend (3 questions)

1. How should user passwords be stored?
   - · Plain text
   - · Reversibly encrypted
   - **✔ Salted and hashed with a slow algorithm such as bcrypt/argon2**
   - · Base64-encoded
   - _Why:_ Passwords must be salted and hashed with a deliberately slow algorithm. · _level: apply_
2. A client sends an invalid email to a registration endpoint. Which response is correct?
   - · 200 with an error message
   - **✔ 400 with a clear validation message**
   - · 500 internal error
   - · 204 no content
   - _Why:_ Invalid client input is a 400-class error with a useful message. · _level: apply_
3. What is the primary purpose of input validation on the server?
   - · To speed up the database
   - **✔ To protect the system from malformed or malicious data even if the client is bypassed**
   - · To reduce bundle size
   - · To format JSON
   - _Why:_ Server-side validation is the trust boundary; the client cannot be trusted. · _level: understand_

### Stage 3 — Databases (3 questions)

1. Which query returns each author with the number of posts they wrote?
   - · SELECT * FROM posts
   - **✔ SELECT author_id, COUNT(*) FROM posts GROUP BY author_id**
   - · SELECT COUNT(*) FROM users
   - · SELECT author_id FROM posts ORDER BY author_id
   - _Why:_ GROUP BY author_id with COUNT aggregates one row per author. · _level: apply_
2. What does a foreign key enforce?
   - · Faster reads
   - **✔ That a referenced row exists in the related table**
   - · Alphabetical ordering
   - · Unique passwords
   - _Why:_ A foreign key enforces referential integrity between tables. · _level: understand_
3. When does adding an index hurt?
   - · Never
   - · When the column is queried often
   - **✔ On write-heavy tables, because every insert/update must maintain the index**
   - · When the table is small and read-only
   - _Why:_ Indexes speed reads but add overhead to writes and storage. · _level: analyze_

### Stage 4 — Advanced Backend (3 questions)

1. Which data is a poor candidate for aggressive caching?
   - · A public list of countries
   - **✔ A user’s current account balance**
   - · Static documentation
   - · A daily leaderboard
   - _Why:_ Data that must be immediately accurate, like a balance, should not be served from a stale cache. · _level: analyze_
2. Why move image processing out of the request cycle?
   - · To make it slower
   - **✔ To keep responses fast and avoid timeouts under load**
   - · Because databases cannot store images
   - · To reduce code size
   - _Why:_ Long tasks should run in the background so requests stay responsive and do not time out. · _level: apply_
3. What is the main purpose of rate limiting?
   - · Increase bandwidth
   - **✔ Protect the service from abuse and accidental overload**
   - · Encrypt traffic
   - · Compress responses
   - _Why:_ Rate limiting caps request frequency to protect availability and fairness. · _level: understand_

### Stage 5 — Deployment (3 questions)

1. How should a database URL reach a containerised app?
   - · Hard-coded in the Dockerfile
   - **✔ Passed as an environment variable at run time**
   - · Committed in a .env file
   - · Written into the image layer
   - _Why:_ Configuration belongs in environment variables, not the image. · _level: apply_
2. What is a CI pipeline for?
   - · Replacing developers
   - **✔ Automatically running checks such as tests before changes are merged or deployed**
   - · Hosting the database
   - · Designing the UI
   - _Why:_ CI runs automated checks so problems are caught before shipping. · _level: understand_
3. Why prefer a small base image?
   - **✔ Larger attack surface and slower pulls with a big image**
   - · Smaller images are always faster to code
   - · It changes the language
   - · It removes the need for tests
   - _Why:_ Smaller images reduce the attack surface and deploy faster. · _level: analyze_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `be-p1` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| CRUD works via curl/Postman | 1 | no |
| Invalid input returns 400 | 1 | no |
| Missing record returns 404 | 1 | no |
| No secrets in the repo | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 2 — project `be-p2` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Passwords are salted and hashed | 1 | no |
| Invalid credentials are rejected | 1 | no |
| Protected route returns 401 without a token | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 3 — project `be-p3` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Short links redirect correctly | 1 | no |
| Invalid URLs are rejected | 1 | no |
| Codes are unique | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 4 — project `be-p4` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Messages deliver in real time | 1 | no |
| Unauthenticated clients are rejected | 1 | no |
| History persists | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 5 — project `be-p5` (rubric rizw7jo-8)

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

### Stage 1 — Build: Blog REST API

- **Objective:** Build a REST API with CRUD for posts and correct status codes.
- **Problem:** A blog needs an API to create and read posts.
- **Audience:** A frontend or mobile client.
- **Required functionality:**
  - List, create, read, update, delete posts
  - Validation
  - Consistent JSON errors
- **Acceptance criteria:**
  - CRUD works via curl/Postman
  - Invalid input returns 400
  - Missing record returns 404
  - No secrets in the repo
- **Required evidence:**
  - Repository
  - README with endpoint examples and sample responses
- **Constraints:**
  - No secrets committed
  - Input validated server-side

### Stage 2 — Build: User Auth System

- **Objective:** Implement registration, login, hashing and protected routes.
- **Problem:** An application needs secure accounts.
- **Audience:** End users signing up and logging in.
- **Required functionality:**
  - Register
  - Login
  - Hashed passwords
  - Protected endpoint requiring a token
- **Acceptance criteria:**
  - Passwords are salted and hashed
  - Invalid credentials are rejected
  - Protected route returns 401 without a token
- **Required evidence:**
  - Repository
  - A short security note explaining your choices
- **Constraints:**
  - Never store plaintext passwords
  - Do not leak whether an email exists

### Stage 3 — Build: URL Shortener

- **Objective:** Build a URL shortener with a database and redirects.
- **Problem:** Long links are unwieldy to share.
- **Audience:** Anyone sharing links.
- **Required functionality:**
  - Create a short code for a URL
  - Redirect short code to target
  - Track click count
- **Acceptance criteria:**
  - Short links redirect correctly
  - Invalid URLs are rejected
  - Codes are unique
- **Required evidence:**
  - Repository
  - README with example create + redirect
- **Constraints:**
  - Unique codes
  - Validate the target URL

### Stage 4 — Build: Real-time Chat Backend

- **Objective:** Build a real-time backend with authentication and message persistence.
- **Problem:** Users want to message each other in real time.
- **Audience:** Collaborating users.
- **Required functionality:**
  - Authenticated connection
  - Send/receive messages
  - Persist history
- **Acceptance criteria:**
  - Messages deliver in real time
  - Unauthenticated clients are rejected
  - History persists
- **Required evidence:**
  - Repository
  - Short demo video or GIF
  - Architecture note
- **Constraints:**
  - Authenticate the socket
  - Validate messages
  - Rate limit

### Stage 5 — Portfolio project: AI-Powered API

- **Objective:** Complete "AI-Powered API" to a standard you can show and explain to someone else.
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

- **Stage 1:** Handle a request cleanly. Step 1: read the method, path and body. Step 2: validate the body against a schema and reject invalid input early. Step 3: call a service function that contains the business logic. Step 4: map …
- **Stage 2:** Design `POST /orders`. Step 1: define the request schema (items, quantities, customer). Step 2: reject an empty cart with 422 and a field-level message. Step 3: create the order and return 201 with a `Location` header p…
- **Stage 3:** Model orders and line items. Step 1: create `users`, then `orders` with a foreign key to `users`. Step 2: create `order_items` referencing both `orders` and a `products` table. Step 3: add indexes on the foreign-key col…
- **Stage 4:** Add caching to a read endpoint. Step 1: build a cache key from the input (path + query). Step 2: check the cache; on a hit, return immediately. Step 3: on a miss, query the database, store the result with a TTL, and ret…
- **Stage 5:** Containerise and deploy the API. Step 1: write a multi-stage Dockerfile that builds then runs as a non-root user. Step 2: pass all configuration through environment variables and document each one. Step 3: add a `/healt…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 1 — required (L2): https://www.youtube.com/watch?v=7_LPdttKXPc
- Stage 1 — required (L2): https://www.youtube.com/watch?v=iYM2zFP3Zn0
- Stage 1 — required (L2): https://www.youtube.com/watch?v=L72fhGm1tfE
- Stage 2 — required (L2): https://www.youtube.com/watch?v=Oe421EPjeBE
- Stage 3 — required (L2): https://www.youtube.com/watch?v=qw--VYLpxG4
- Stage 4 — required (L2): https://www.youtube.com/watch?v=0sOvCWFmrtA
- Stage 4 — required (L2): https://www.youtube.com/watch?v=fqMOX6JJhGo

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.2) **and** worthiness ≥ 90 (this track: 98.4).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

