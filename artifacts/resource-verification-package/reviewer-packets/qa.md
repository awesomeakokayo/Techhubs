# Reviewer packet — QA Engineering

- **Track id:** `qa`  ·  **Slug:** `qa-engineering`  ·  **Category:** grow  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.7/100 · worthiness 99.4/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Testing Fundamentals | Plan and execute manual testing: test cases, bug reports and test strategy. | 3 to 4 weeks | 5 |
| 2 | Tools & API Testing | Test APIs and data with Postman, DevTools and SQL. | 3 to 4 weeks | 4 |
| 3 | Test Automation | Automate reliable browser tests with Playwright and the Page Object Model. | 5 to 6 weeks | 4 |
| 4 | Advanced QA | Cover performance, security and CI for test suites. | 3 to 4 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 4.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 3 — Test Automation**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 4 — Advanced QA**: content-inspected required resources 2, objective-matching resources 3, playback-verified resources 0.
- **Stage 1 — Testing Fundamentals**: content-inspected required resources 4, objective-matching resources 4, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Testing Fundamentals

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| ISTQB — Certified Tester Syllabus | required | L3 | content-inspection | — | 2 | https://www.istqb.org/ |
| Guru99 Software Testing | required | L3 | content-inspection | — | 4 | https://www.guru99.com/software-testing.html |
| How to Write Test Cases | required | L3 | content-inspection | — | 4 | https://www.softwaretestinghelp.com/how-to-write-test-cases-for-a-given-scenario/ |
| Ministry of Testing | required | L3 | content-inspection | — | 3 | https://www.ministryoftesting.com |
- _L3 required evidence — ISTQB: “ISTQB® is the leading global certification scheme in the field of software testing. As of May 2025, ISTQB ® has administered 1.5 million exams and issued more than 1.1 million certifications in over 130 countries . With…”_
- _L3 required evidence — Guru99: “Software Testing Training Summary In this comprehensive, free QA course, you will gain foundational skills and a deep understanding of key Software Testing concepts. The lessons are designed to be practical, using REAL-…”_
- _L3 required evidence — Software Testing Help: “By Vijay By Vijay I'm Vijay, and I've been working on this blog for the past 20+ years! I’ve been in the IT industry for more than 20 years now. I completed my graduation in B.E. Computer Science from a reputed Pune uni…”_
- _L3 required evidence — MoT: “👉 MoTaCon 2027 👈 Welcome to the MoTaverse Create Moment Link Job Explore Membership Continuous joy Rosie Sherry I've been thinking about joy again, especially after watching Clare Norman's Make it joyful: How to build…”_

### Stage 2 — Tools & API Testing

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Postman Learning Center | required | L3 | content-inspection | — | 3 | https://learning.postman.com/docs/getting-started/introduction |
- _L3 required evidence — Postman: “Skip to navigation This page is for Postman Docs, version Latest (v12) (default). For other versions, use one of these documentation indexes: - Latest (v12) (default): https://learning.postman.com/latest-v-12/llms.txt -…”_

### Stage 3 — Test Automation

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Cypress Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=u8vMu7viCm8 |
| Playwright Official Docs | required | L3 | content-inspection | — | 3 | https://playwright.dev/docs/intro |
- _L3 required evidence — Microsoft: “Introduction ​ Playwright Test is an end-to-end test framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling. Playwright supports Chromium, WebKit and Firefox on Wi…”_

### Stage 4 — Advanced QA

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Playwright — Official YouTube Channel | required | L2 | http-probe | — | 1 | https://www.youtube.com/@Playwrightdev |
| k6 Performance Testing | required | L3 | content-inspection | — | 2 | https://k6.io/docs |
| OWASP ZAP Security Testing | required | L3 | content-inspection | — | 1 | https://www.zaproxy.org/docs/ |
- _L3 required evidence — Grafana: “Documentation Grafana k6 Open source Grafana k6 Grafana k6 is an open-source, developer-friendly, and extensible performance testing tool that helps you catch performance issues early and proactively improve reliability…”_
- _L3 required evidence — OWASP: “Documentation Guides Getting Started Guide - a good place to start if you are new to ZAP Getting Further Guides - in depth guides covering different ways you can use ZAP Desktop User Guide - the help included with the Z…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 3 | Cypress Full Course | L2 | not verified | not verified — review manually |
| 4 | Playwright — Official YouTube Channel | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Testing Fundamentals (3 questions)

1. What belongs in a good bug report?
   - · A screenshot only
   - **✔ Steps to reproduce, expected result, actual result, environment**
   - · A fix suggestion only
   - · The developer’s name
   - _Why:_ Reproducible steps with expected vs actual are essential. · _level: apply_
2. Why test boundary values?
   - · They are easy
   - **✔ Most defects cluster at boundaries such as limits and empty input**
   - · They are required by law
   - · They are fast
   - _Why:_ Boundary and equivalence analysis find defects efficiently. · _level: understand_
3. A test case is missing its expected result. What is the problem?
   - · None
   - **✔ The result cannot be judged as pass or fail**
   - · It runs faster
   - · It is more flexible
   - _Why:_ Without an expected result a test cannot pass or fail. · _level: evaluate_

### Stage 2 — Tools & API Testing (3 questions)

1. Beyond the status code, what should API tests assert?
   - · Nothing
   - **✔ Response body fields, content type and error shape**
   - · The colour of the response
   - · Only latency
   - _Why:_ Tests should verify payload structure and values, not just status. · _level: apply_
2. You created a record through the API. How do you verify it persisted?
   - · Trust the 201 response
   - **✔ Query the database or GET the resource**
   - · Assume it worked
   - · Check the frontend only
   - _Why:_ Verify persistence through an independent read. · _level: apply_
3. What is a common cause of flaky API tests?
   - **✔ Shared mutable test data and test order dependence**
   - · Using assertions
   - · Using HTTPS
   - · Reading the response
   - _Why:_ Shared state and ordering cause flakiness; tests need isolation. · _level: analyze_

### Stage 3 — Test Automation (3 questions)

1. Which selector is most resilient to design changes?
   - · A deeply nested CSS class
   - **✔ A role or accessible-name based locator**
   - · An absolute XPath
   - · A position index
   - _Why:_ Role/name locators reflect intent and survive styling changes. · _level: apply_
2. Why avoid fixed sleeps like waitForTimeout?
   - **✔ They are slow and unreliable**
   - · They are banned
   - · They are faster than waiting
   - · They fix flakiness
   - _Why:_ Fixed sleeps are both slow and flaky; wait for a real condition instead. · _level: evaluate_
3. What does the Page Object Model give you?
   - · More files
   - **✔ A single place for each page’s locators and actions, reducing duplication**
   - · Better colours
   - · Faster network
   - _Why:_ Page objects centralise page knowledge so tests stay readable and maintainable. · _level: understand_

### Stage 4 — Advanced QA (3 questions)

1. What should you establish before a load test?
   - · The colour scheme
   - **✔ A baseline and target for latency and error rate**
   - · The database vendor only
   - · The number of developers
   - _Why:_ Performance has no meaning without a baseline and target. · _level: apply_
2. Which is a basic security test case?
   - · Checking the logo
   - **✔ Attempting to access a protected route without credentials**
   - · Testing font size
   - · Counting buttons
   - _Why:_ Access-control checks are fundamental security tests. · _level: apply_
3. Why run tests in CI?
   - · To slow releases
   - **✔ To catch regressions automatically before merge**
   - · To replace local testing
   - · To reduce test count
   - _Why:_ CI provides a consistent, automated regression gate. · _level: understand_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `qa-p1` (rubric rizw7jo-8)

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

### Stage 2 — project `qa-p2` (rubric rizw7jo-8)

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

### Stage 3 — project `qa-p3` (rubric rizw7jo-8)

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

### Stage 4 — project `qa-p4` (rubric rizw7jo-8)

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

### Stage 1 — Build: Login Page Test Cases

- **Objective:** Complete "Login Page Test Cases" to a standard you can show and explain to someone else.
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

### Stage 2 — Build: API Test Collection

- **Objective:** Complete "API Test Collection" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: Automated Login Tests

- **Objective:** Complete "Automated Login Tests" to a standard you can show and explain to someone else.
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

### Stage 4 — Portfolio project: Performance Test Report

- **Objective:** Complete "Performance Test Report" to a standard you can show and explain to someone else.
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

- **Stage 1:** Write test cases for a password field. Step 1: valid password (happy path). Step 2: too short (boundary, exactly one below the minimum). Step 3: missing a required character class. Step 4: confirmation that does not mat…
- **Stage 2:** Test `POST /users` with a tool like Postman. Step 1: send a valid payload and assert 201. Step 2: send a duplicate email and assert 409. Step 3: omit a required field and assert 422 with a field message. Step 4: save al…
- **Stage 3:** Automate a login flow with Playwright. Step 1: navigate to the page. Step 2: fill credentials from a fixture, not literals. Step 3: assert the dashboard heading is visible. Step 4: run it in CI. Use role/text selectors …
- **Stage 4:** Assess release risk. Step 1: list the features that changed. Step 2: score each by user impact and size of change. Step 3: assign test depth to match the risk. Step 4: write down what you deliberately did not test and w…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 3 — required (L2): https://www.youtube.com/watch?v=u8vMu7viCm8
- Stage 4 — required (L2): https://www.youtube.com/@Playwrightdev

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.7) **and** worthiness ≥ 90 (this track: 99.4).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

