# Reviewer packet — Python Development

- **Track id:** `python`  ·  **Slug:** `python-development`  ·  **Category:** build  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.1/100 · worthiness 98.3/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Python Basics | Write clear Python programs using core data types, control flow, functions and file handling. | 3 to 4 weeks | 5 |
| 2 | Intermediate Python | Use object-oriented and idiomatic Python to write reusable, well-structured code. | 3 to 4 weeks | 5 |
| 3 | Python for the Web | Build and document a Python web API with a database, authentication and async support. | 4 to 5 weeks | 5 |
| 4 | Automation & Scripting | Automate repetitive tasks with Python: files, scraping, documents and scheduling. | 2 to 3 weeks | 5 |
| 5 | Python + AI | Integrate AI services into Python applications with clear prompting and sensible limits. | 4 to 6 weeks | 5 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 5.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 1 — Python Basics**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 5 — Python + AI**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 2 — Intermediate Python**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Python Basics

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Python Full Course for Beginners | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=rfscVS0vtbw |
| Corey Schafer Python Tutorials | required | L2 | http-probe | — | 0 | https://www.youtube.com/@coreyms |
| Official Python Tutorial | required | L3 | content-inspection | — | 6 | https://docs.python.org/3/tutorial |
- _L3 required evidence — Python.org: “Navigation index modules \| next \| previous \| Python » 3.15.0 Documentation » The Python Tutorial \| Theme Auto Light Dark \| The Python Tutorial ¶ Tip This tutorial is designed for programmers that are new to the Python l…”_

### Stage 2 — Intermediate Python

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Python for Everybody (freeCodeCamp) | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=8DvywoWv6fI |
| Automate the Boring Stuff | required | L3 | content-inspection | — | 3 | https://automatetheboringstuff.com |
- _L3 required evidence — Al Sweigart: “By Al Sweigart. Over 500,000 copies sold. Free to read under a Creative Commons license . Buy from Publisher (Free ebook!) Amazon \| Barnes and Nobles \| Powell's \| Bookshop.org \| Goodreads \| Kobo \| Thriftbooks About the …”_

### Stage 3 — Python for the Web

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| FastAPI — Tutorial (User Guide) | required | L3 | content-inspection | — | 1 | https://fastapi.tiangolo.com/tutorial/ |
| FastAPI Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=0sOvCWFmrtA |
- _L3 required evidence — FastAPI: “Security Middleware CORS (Cross-Origin Resource Sharing) SQL (Relational) Databases Bigger Applications - Multiple Files Stream JSON Lines Server-Sent Events (SSE) Background Tasks Metadata and Docs URLs Frontend Static…”_

### Stage 4 — Automation & Scripting

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Groq API Quickstart | required | L3 | content-inspection | — | 1 | https://console.groq.com/docs/quickstart |
- _L3 required evidence — Groq: “Login Log In Quickstart Get up and running with the Groq API in a few minutes, with the steps below. For additional support, catch our onboarding video . Create an API Key Please visit here to create an API Key. Set up …”_

### Stage 5 — Python + AI

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| LangChain Python Docs | required | L3 | content-inspection | — | 0 | https://python.langchain.com/docs/get_started/introduction |
- _L3 required evidence — LangChain: “This quickstart shows you how to create a fully functional AI agent in just a few minutes. Build the LangChain quickstart agent Using an AI coding assistant? Install the LangChain Docs MCP servers to give your agent acc…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 1 | Python Full Course for Beginners | L2 | not verified | not verified — review manually |
| 1 | Corey Schafer Python Tutorials | L2 | not verified | not verified — review manually |
| 2 | Python for Everybody (freeCodeCamp) | L2 | not verified | not verified — review manually |
| 3 | FastAPI Full Course | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Python Basics (3 questions)

1. Which structure stores unique values with fast membership tests?
   - · list
   - · tuple
   - **✔ set**
   - · str
   - _Why:_ A set stores unique elements and offers fast membership testing. · _level: understand_
2. How should you handle a file that may not exist?
   - · Let it crash
   - **✔ Wrap the open in try/except and handle FileNotFoundError**
   - · Assume it exists
   - · Delete the file first
   - _Why:_ Handle the expected error so the program degrades gracefully. · _level: apply_
3. Why is def f(items=[]) a bug?
   - · It is invalid syntax
   - **✔ The default list is shared across calls and accumulates values**
   - · It is slower
   - · It cannot take arguments
   - _Why:_ Mutable default arguments are evaluated once and shared between calls. · _level: analyze_

### Stage 2 — Intermediate Python (3 questions)

1. What does a generator function return when called?
   - · A list
   - **✔ An iterator that yields values lazily**
   - · A tuple
   - · A string
   - _Why:_ Generators produce values lazily via yield, saving memory. · _level: understand_
2. Which comprehension squares only the even numbers in nums?
   - · [n for n in nums if n % 2 == 0]
   - **✔ [n*n for n in nums if n % 2 == 0]**
   - · [n for n in nums]
   - · [n*n for n in nums]
   - _Why:_ It filters evens and squares each. · _level: apply_
3. Why use a virtual environment per project?
   - · It is required by Python
   - **✔ To isolate dependencies so projects do not conflict**
   - · To speed up imports
   - · To compile Python
   - _Why:_ Virtual environments isolate package versions between projects. · _level: understand_

### Stage 3 — Python for the Web (3 questions)

1. What does FastAPI generate automatically from your type hints and models?
   - · A database
   - **✔ Interactive OpenAPI documentation**
   - · A frontend
   - · Unit tests
   - _Why:_ FastAPI derives interactive OpenAPI docs from models and type hints. · _level: understand_
2. What is a risk of calling blocking database code inside an async route?
   - · Nothing
   - **✔ It blocks the event loop and hurts concurrency**
   - · It deletes data
   - · It is faster
   - _Why:_ Blocking calls in async handlers stall other requests. · _level: analyze_
3. Where should input validation happen for a FastAPI endpoint?
   - · Only in the browser
   - **✔ In a Pydantic model declared on the endpoint**
   - · In the CSS
   - · In the database schema only
   - _Why:_ Pydantic models validate and coerce input at the boundary. · _level: apply_

### Stage 4 — Automation & Scripting (3 questions)

1. Why should an automation script be idempotent?
   - · To run faster
   - **✔ So running it twice does not corrupt or duplicate work**
   - · To avoid imports
   - · To use less memory
   - _Why:_ Idempotent scripts can be safely re-run, which is essential for reliability. · _level: apply_
2. What should you check before scraping a site at scale?
   - · Its colour scheme
   - **✔ robots.txt and terms, and whether an API is offered**
   - · The font
   - · The page count only
   - _Why:_ Respect robots.txt/terms and prefer official APIs. · _level: evaluate_
3. Which library writes Excel files in Python?
   - · requests
   - **✔ openpyxl**
   - · pytest
   - · click
   - _Why:_ openpyxl reads and writes .xlsx files. · _level: recall_

### Stage 5 — Python + AI (3 questions)

1. Where should an AI API key live?
   - · In the source code
   - **✔ In an environment variable or secret manager**
   - · In the README
   - · In a public gist
   - _Why:_ Secrets belong in environment variables or a secret manager, never in source. · _level: apply_
2. The model returns unstructured text you need as JSON. What is the safest approach?
   - · Assume it is valid JSON
   - **✔ Parse defensively and validate the fields you rely on**
   - · eval() the string
   - · Ignore errors
   - _Why:_ Always parse and validate model output; it can be malformed. · _level: analyze_
3. Why should AI calls have timeouts and retries with backoff?
   - · To increase cost
   - **✔ Because the service can be slow or rate-limited, and you should fail gracefully**
   - · To hide errors
   - · To slow the app
   - _Why:_ Timeouts and bounded retries keep the app responsive under provider issues. · _level: understand_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `py-p1` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Re-running changes nothing | 1 | no |
| A dry run reports without moving | 1 | no |
| Missing folder does not crash | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 2 — project `py-p2` (rubric rizw7jo-8)

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

### Stage 3 — project `py-p3` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Invalid input returns 422/400 | 1 | no |
| /docs works | 1 | no |
| Protected route returns 401 without a token | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 4 — project `py-p4` (rubric rizw7jo-8)

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

### Stage 5 — project `py-p5` (rubric rizw7jo-8)

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

### Stage 1 — Build: File Organizer Script

- **Objective:** Write a safe, idempotent script that organises files by type.
- **Problem:** Download folders become disorganised and hard to navigate.
- **Audience:** Anyone with a messy downloads or documents folder.
- **Required functionality:**
  - Scan a folder
  - Move files into type-based folders
  - Log actions
  - Dry-run mode
- **Acceptance criteria:**
  - Re-running changes nothing
  - A dry run reports without moving
  - Missing folder does not crash
- **Required evidence:**
  - Repository with README
  - Sample log output
- **Constraints:**
  - Idempotent
  - Never delete data
  - Handle missing folders

### Stage 2 — Build: Web Scraper

- **Objective:** Complete "Web Scraper" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: REST API with FastAPI

- **Objective:** Build a FastAPI service with validation, a database and auth.
- **Problem:** A service needs a documented HTTP API.
- **Audience:** Client applications.
- **Required functionality:**
  - Two resources
  - Pydantic validation
  - Database persistence
  - One protected route
- **Acceptance criteria:**
  - Invalid input returns 422/400
  - /docs works
  - Protected route returns 401 without a token
- **Required evidence:**
  - Repository
  - Screenshot of /docs
  - README
- **Constraints:**
  - Server-side validation
  - Generated docs available

### Stage 4 — Build: PDF Report Generator

- **Objective:** Complete "PDF Report Generator" to a standard you can show and explain to someone else.
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

### Stage 5 — Build: Telegram Bot

- **Objective:** Complete "Telegram Bot" to a standard you can show and explain to someone else.
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

## 8. Worked examples

- **Stage 1:** Parse a CSV of scores. Step 1: open the file inside `with open(...) as f`. Step 2: for each line, `strip()` and `split(",")`. Step 3: convert fields to `int` with a guard that skips blank rows. Step 4: compute the avera…
- **Stage 2:** Model inventory with a class. Step 1: `__init__` stores a `dict` of item to quantity. Step 2: `add(item, n)` and `remove(item, n)` update the dict, raising a clear error on missing items or negative stock. Step 3: `__re…
- **Stage 3:** Build a small web endpoint. Step 1: create a route `GET /items` that queries the database and returns JSON with 200. Step 2: add `POST /items` that validates the payload and returns 201 with the created record. Step 3: …
- **Stage 4:** Automate a folder. Step 1: iterate over `Path(folder).glob("*.csv")`. Step 2: transform each file with a pure function. Step 3: move processed files into a `done/` subfolder. Step 4: log any failure to `errors.log` with…
- **Stage 5:** Call a model for classification. Step 1: define a strict output contract (JSON with `label` and `confidence`). Step 2: request that shape explicitly. Step 3: validate the response and treat out-of-schema output as a fai…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 1 — required (L2): https://www.youtube.com/watch?v=rfscVS0vtbw
- Stage 1 — required (L2): https://www.youtube.com/@coreyms
- Stage 2 — required (L2): https://www.youtube.com/watch?v=8DvywoWv6fI
- Stage 3 — required (L2): https://www.youtube.com/watch?v=0sOvCWFmrtA

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.1) **and** worthiness ≥ 90 (this track: 98.3).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

