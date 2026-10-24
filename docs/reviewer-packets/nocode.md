# Reviewer packet — No-Code Development

- **Track id:** `nocode`  ·  **Slug:** `no-code-development`  ·  **Category:** design  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.7/100 · worthiness 99.4/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Website Building | Build a responsive, content-driven website without code. | 2 to 3 weeks | 4 |
| 2 | App Building | Build a functional app with data, auth and logic. | 3 to 4 weeks | 5 |
| 3 | Automation | Connect apps and services with automation. | 2 to 3 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 2, 3.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 2 — App Building**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 1 — Website Building**: content-inspected required resources 2, objective-matching resources 2, playback-verified resources 0.
- **Stage 3 — Automation**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Website Building

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Webflow University | required | L3 | content-inspection | — | 2 | https://webflow.com/university |
| Framer Learn | required | L3 | content-inspection | — | 2 | https://framer.com/learn |
- _L3 required evidence — Webflow: “Learn Webflow, straight from the source. Free education. Practical resources. Verified accreditation. Search "CMS" ⌘E Recently added NEW Take your app live with Webflow Cloud Prepare and deploy an existing app, connect …”_
- _L3 required evidence — Framer: “Developers Search Framer Academy Learn how to design, build, and publish with Framer Agents. Learn about prompting, the Canvas, responsive layouts, CMS, and more. Academy Basics Agents CMS Publishing Animations Layout C…”_

### Stage 2 — App Building

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Bubble Academy | required | L2 | http-probe | — | 0 | https://bubble.io/academy |
| Glide Apps | required | L3 | content-inspection | — | 2 | https://www.glideapps.com |
- _L3 required evidence — Glide: “Coming soon Glide for iPhone Glide for iPhone Stop chasing spreadsheets. Run your business from one place. Glide is the business operations platform that turns the Excel files and Google Sheets your team runs on into ap…”_

### Stage 3 — Automation

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Zapier Learn | required | L3 | content-inspection | — | 1 | https://zapier.com/learn |
- _L3 required evidence — Zapier: “Zapier guides Educational resources to move your work forward. Basics How to Implement AI Orchestration in 3 Phases Guide AI orchestration doesn't have to be a multi-year initiative. This guide breaks down a phased appr…”_

## 4. Required video segments and measured duration

No required video resources on this track — all required material is text/interactive.

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Website Building (3 questions)

1. What does a CMS in a no-code site let you do?
   - · Write code
   - **✔ Manage structured content that templates render dynamically**
   - · Manage DNS
   - · Compress images
   - _Why:_ A CMS stores structured content that templates render as dynamic pages. · _level: understand_
2. Why set responsive breakpoints?
   - · To slow the site
   - **✔ So layout adapts to different screen sizes without breaking**
   - · To add SEO
   - · To reduce content
   - _Why:_ Breakpoints let the layout adapt across devices. · _level: apply_
3. A client wants to add a blog post themselves. What is the right structure?
   - · You edit the site each time
   - **✔ A CMS collection the client can add to**
   - · A shared spreadsheet only
   - · Screenshot the post
   - _Why:_ A CMS collection lets non-technical users add content safely. · _level: analyze_

### Stage 2 — App Building (3 questions)

1. In a no-code app, what is a workflow?
   - · A design file
   - **✔ An automated sequence of steps triggered by user actions or events**
   - · A database table
   - · A colour theme
   - _Why:_ Workflows automate logic in response to triggers. · _level: understand_
2. Why are database privacy rules important?
   - · They speed the app
   - **✔ They stop users reading or changing data that is not theirs**
   - · They improve the UI
   - · They are optional
   - _Why:_ Privacy rules enforce who can read/write which records. · _level: evaluate_
3. You need to show each user only their own items. What must you do?
   - · Show all items
   - **✔ Filter the data query by the logged-in user**
   - · Hide items with CSS
   - · Ask users to ignore others
   - _Why:_ Data must be filtered by ownership in the query and enforced by rules. · _level: apply_

### Stage 3 — Automation (3 questions)

1. In Zapier/Make, a trigger is…
   - · The final result
   - **✔ The event that starts an automation**
   - · A data field
   - · A colour scheme
   - _Why:_ A trigger is the event that starts the automation. · _level: recall_
2. How can you connect to an API without code?
   - · Write a server
   - **✔ Use a no-code HTTP/webhook action in the automation tool**
   - · Email the API provider
   - · Use CSS
   - _Why:_ No-code tools provide HTTP request steps to call APIs directly. · _level: apply_
3. Why add error handling to an automation?
   - · To make it slower
   - **✔ So a single failed step does not silently corrupt the process**
   - · To increase cost
   - · To avoid testing
   - _Why:_ Without error handling, failures strand data or cause duplicate work. · _level: evaluate_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `nc-p1` (rubric r19qhznk-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A publicly reachable app or preview is provided | 1 | yes |
| The app implements the required behaviour | 2 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 2 — project `nc-p2` (rubric r19qhznk-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A publicly reachable app or preview is provided | 1 | yes |
| The app implements the required behaviour | 2 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 3 — project `nc-p3` (rubric r19qhznk-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A publicly reachable app or preview is provided | 1 | yes |
| The app implements the required behaviour | 2 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: Business Website

- **Objective:** Complete "Business Website" to a standard you can show and explain to someone else.
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

### Stage 2 — Build: Automation Workflow

- **Objective:** Complete "Automation Workflow" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: MVP Web App

- **Objective:** Complete "MVP Web App" to a standard you can show and explain to someone else.
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

- **Stage 1:** Build a landing page. Step 1: add a hero, benefits and testimonials section. Step 2: connect the signup form to your email list. Step 3: test on a phone width and fix any overflow. Step 4: set the page title and meta de…
- **Stage 2:** Build a two-table app. Step 1: create a tasks collection with a status field. Step 2: add a form that creates a task. Step 3: build a list view filtered to open tasks. Step 4: mark one task complete and confirm it leave…
- **Stage 3:** Connect a form to a database and a notification. Step 1: on submission, create a record. Step 2: send a confirmation email to the respondent. Step 3: post a message to a team channel. Step 4: add one conditional that ro…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 2 — required (L2): https://bubble.io/academy

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

