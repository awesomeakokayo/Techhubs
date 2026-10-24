# Reviewer packet — Mobile Development

- **Track id:** `mobile`  ·  **Slug:** `mobile-development`  ·  **Category:** build  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.4/100 · worthiness 98.8/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Prerequisites | Confirm the prerequisites for mobile development and understand mobile UI constraints. | 3 to 4 weeks | 3 |
| 2 | Core Mobile Development | Build screens with navigation, state and device APIs. | 4 to 5 weeks | 4 |
| 3 | Firebase & Backend | Add backend services with Firebase. | 3 to 4 weeks | 4 |
| 4 | Publishing & Polish | Publish a polished app to the stores. | 2 to 3 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 4.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 2 — Core Mobile Development**: content-inspected required resources 2, objective-matching resources 1, playback-verified resources 0.
- **Stage 4 — Publishing & Polish**: content-inspected required resources 2, objective-matching resources 0, playback-verified resources 0.
- **Stage 1 — Prerequisites**: content-inspected required resources 2, objective-matching resources 2, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Prerequisites

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| React Native Express | required | L3 | content-inspection | — | 1 | https://www.reactnative.express/ |
| Flutter Official Getting Started | required | L3 | content-inspection | — | 1 | https://flutter.dev/docs/get-started |
- _L3 required evidence — React Native Express: “Search pages React Native Express What is React Native? React Native is a JavaScript framework for building cross-platform apps. This guide covers everything you need to know to start developing React Native apps. How t…”_
- _L3 required evidence — Google: “vertical_align_top Install Flutter Flutter 3.47 is here! Read the blog post . Ready to build beautiful, multiplatform apps from a single codebase? Choose from the following two options to get started setting up your Flu…”_

### Stage 2 — Core Mobile Development

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| React Native Official Docs | required | L3 | content-inspection | — | 0 | https://reactnative.dev/docs/getting-started |
| Expo Documentation | required | L3 | content-inspection | — | 1 | https://docs.expo.dev |
| React Native Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=0-S5a0eXPoc |
| Flutter Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=VPvVD8t02U8 |
- _L3 required evidence — Meta: “Welcome to the very start of your React Native journey! If you're looking for getting started instructions, they've moved to their own section . Continue reading for an introduction to the documentation, Native Componen…”_
- _L3 required evidence — Expo: “This documentation is available as Markdown for AI agents and LLMs. See the full Markdown index or append .md to any documentation URL. Create amazing apps that run everywhere Build one JavaScript/TypeScript project tha…”_

### Stage 3 — Firebase & Backend

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Firebase Official Docs | required | L3 | content-inspection | — | 1 | https://firebase.google.com/docs |
- _L3 required evidence — Google: “Firebase Documentation Stay organized with collections Save and categorize content based on your preferences. auto_awesome Products to help you harness AI Use Firebase and Gemini together to make development faster, eas…”_

### Stage 4 — Publishing & Polish

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Publish to Google Play Guide | required | L3 | content-inspection | — | 0 | https://developer.android.com/studio/publish |
| Publish to App Store Guide | required | L3 | content-inspection | — | 0 | https://developer.apple.com/app-store/submitting/ |
- _L3 required evidence — Google: “Эта страница переведена с помощью Cloud Translation API . Android Developers Создание контента Android Studio Руководства по IDE Опубликуйте свое приложение Оптимизируйте свои подборки Сохраняйте и классифицируйте конте…”_
- _L3 required evidence — Apple: “Submit your apps and games today Take advantage of the latest capabilities in Apple platforms and the App Store to deliver your most innovative apps yet. Update for the latest OS releases Build and test with Xcode 27 , …”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 2 | React Native Full Course | L2 | not verified | not verified — review manually |
| 2 | Flutter Full Course | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Prerequisites (3 questions)

1. React Native builds on knowledge of which technology?
   - · Dart
   - **✔ JavaScript and React**
   - · Swift only
   - · Kotlin only
   - _Why:_ React Native uses JavaScript/React; Flutter uses Dart. · _level: recall_
2. What is the minimum recommended size for a tappable mobile control (per platform guidance)?
   - · About 12pt
   - **✔ About 44–48pt**
   - · About 8pt
   - · Any size works
   - _Why:_ Roughly 44–48 logical points ensures controls are reliably tappable. · _level: understand_
3. Why must layouts respect safe areas?
   - · For faster rendering
   - **✔ So content is not hidden by notches, rounded corners or system bars**
   - · To reduce data usage
   - · To enable dark mode
   - _Why:_ Safe-area insets keep content visible around system UI elements. · _level: apply_

### Stage 2 — Core Mobile Development (3 questions)

1. What is React Navigation used for in React Native?
   - · State management
   - **✔ Moving between screens and managing the navigation stack**
   - · Styling
   - · Database access
   - _Why:_ React Navigation handles screen transitions and the navigation stack. · _level: recall_
2. A user denies a camera permission. What should the app do?
   - · Crash
   - **✔ Show a clear explanation and a fallback or a link to settings**
   - · Pretend it was granted
   - · Retry in a loop
   - _Why:_ Handle denial gracefully with explanation and a path forward. · _level: apply_
3. Why manage state with a dedicated solution instead of many component states?
   - · It looks better
   - **✔ To keep shared data consistent and avoid prop drilling across screens**
   - · To reduce bundle size
   - · Because React forbids useState
   - _Why:_ Centralised state keeps data consistent across screens and simplifies sharing. · _level: understand_

### Stage 3 — Firebase & Backend (3 questions)

1. What does Firebase Authentication provide?
   - · A database
   - **✔ Managed sign-in and identity, including providers like email and Google**
   - · A CSS framework
   - · A build tool
   - _Why:_ Firebase Auth handles sign-in flows and identity tokens. · _level: understand_
2. Why are permissive Firebase database rules dangerous?
   - · They slow queries
   - **✔ They can expose or allow modification of all data to any client**
   - · They break authentication
   - · They cost more
   - _Why:_ Open rules let anyone read or write data; rules must enforce access. · _level: evaluate_
3. What is required before an app can show push notifications on iOS?
   - · Nothing
   - **✔ Requesting and receiving the user's permission**
   - · A paid database
   - · Disabling Wi-Fi
   - _Why:_ iOS requires explicit user permission before push notifications are shown. · _level: apply_

### Stage 4 — Publishing & Polish (3 questions)

1. What must you provide for both App Store and Play Store submissions?
   - · Only source code
   - **✔ An icon, screenshots, a description and required metadata**
   - · A domain name
   - · A database
   - _Why:_ Both stores require visual assets and complete metadata before review. · _level: recall_
2. A long list scrolls slowly. Which is the most appropriate first fix?
   - · Add animations
   - **✔ Virtualise/recycle the list so only visible items render**
   - · Increase the font size
   - · Add more images
   - _Why:_ Virtualisation renders only visible rows, keeping scrolling smooth. · _level: apply_
3. Which is a real publishing risk?
   - · Testing on one device
   - **✔ Store review rejecting the app for policy or completeness issues**
   - · Using an icon
   - · Supporting dark mode
   - _Why:_ Store review can reject apps for policy violations or incomplete metadata. · _level: understand_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `mob-p0` (rubric rizw7jo-8)

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

### Stage 2 — project `mob-p1` (rubric rizw7jo-8)

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

### Stage 3 — project `mob-p2` (rubric rizw7jo-8)

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

### Stage 4 — project `mob-p4` (rubric rizw7jo-8)

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

### Stage 1 — Build: First Single-Screen App

- **Objective:** Complete "First Single-Screen App" to a standard you can show and explain to someone else.
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

### Stage 2 — Build: Chat App

- **Objective:** Complete "Chat App" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: Finance Tracker

- **Objective:** Complete "Finance Tracker" to a standard you can show and explain to someone else.
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

### Stage 4 — Portfolio project: E-commerce App

- **Objective:** Complete "E-commerce App" to a standard you can show and explain to someone else.
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

- **Stage 1:** Prove your edit-run loop. Step 1: install the SDK and create an empty app. Step 2: run it on a simulator or device. Step 3: change one visible string. Step 4: hot-reload and confirm the change appears. If this loop is n…
- **Stage 2:** Build a list screen. Step 1: fetch the data on mount. Step 2: show a loading state. Step 3: render the items and handle the empty case with a message. Step 4: navigate to a detail screen on tap. Keep state local until t…
- **Stage 3:** Add auth and a remote list. Step 1: sign the user in and store the session safely. Step 2: write a document to the backend. Step 3: read the list back. Step 4: handle the offline/error case with a clear message. Never e…
- **Stage 4:** Prepare a release build. Step 1: add an app icon and splash screen. Step 2: justify every permission you request. Step 3: bump the version and write the store listing. Step 4: produce a signed build and read the store's…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 2 — required (L2): https://www.youtube.com/watch?v=0-S5a0eXPoc
- Stage 2 — required (L2): https://www.youtube.com/watch?v=VPvVD8t02U8

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.4) **and** worthiness ≥ 90 (this track: 98.8).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

