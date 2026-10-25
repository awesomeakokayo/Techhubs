# Reviewer packet — Dart Programming

- **Track id:** `dart`  ·  **Slug:** `dart-programming`  ·  **Category:** build  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.6/100 · worthiness 99.2/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Dart Fundamentals | Write correct, null-safe Dart with the right variable and collection types. | 2–3 weeks | 6 |
| 2 | Object-Oriented Dart | Model problems with Dart's object-oriented features. | 2–3 weeks | 6 |
| 3 | Async Dart | Handle asynchronous work with Futures, Streams and isolates. | 1–2 weeks | 6 |
| 4 | Dart for Flutter | Connect Dart knowledge to Flutter development. | 1–2 weeks | 6 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 4.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 1 — Dart Fundamentals**: content-inspected required resources 2, objective-matching resources 2, playback-verified resources 0.
- **Stage 2 — Object-Oriented Dart**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 3 — Async Dart**: content-inspected required resources 2, objective-matching resources 2, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Dart Fundamentals

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Dart Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=Ej_Pcr4uC2Q |
| Official Dart Documentation | required | L3 | content-inspection | — | 1 | https://dart.dev/guides |
| DartPad | required | L2 | http-probe | — | 0 | https://dartpad.dev |
| Dart Null Safety Guide | required | L3 | content-inspection | — | 3 | https://dart.dev/null-safety |
| The Net Ninja — Dart Series | required | L2 | http-probe | — | 0 | https://www.youtube.com/playlist?list=PL4cUxeGkcC9iVGY3ppchN9CBSPYyHmPh4 |
- _L3 required evidence — Google / Dart: “Dart 3.13 is here! Clean and lightweight code across every layer of Dart. Read the announcement . Welcome to the Dart documentation! For a list of changes to this site—new pages, new guidelines, and more—see the What's …”_
- _L3 required evidence — Google / Dart: “vertical_align_top Sound null safety Dart 3.13 is here! Clean and lightweight code across every layer of Dart. Read the announcement . The Dart language enforces sound null safety, making it impossible to unintentionall…”_

### Stage 2 — Object-Oriented Dart

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Dart — Classes | required | L3 | content-inspection | 20 min | 1 | https://dart.dev/language/classes |
- _L3 required evidence — Google / Dart: “vertical_align_top Classes Dart 3.13 is here! Clean and lightweight code across every layer of Dart. Read the announcement . Dart is an object-oriented language with classes and mixin-based inheritance. Every object is …”_

### Stage 3 — Async Dart

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Dart Async Programming | required | L3 | content-inspection | — | 2 | https://dart.dev/codelabs/async-await |
| Dart Streams Tutorial | required | L3 | content-inspection | — | 2 | https://dart.dev/tutorials/language/streams |
- _L3 required evidence — Google / Dart: “vertical_align_top Asynchronous programming: futures, async, await Dart 3.13 is here! Clean and lightweight code across every layer of Dart. Read the announcement . This tutorial teaches you how to write asynchronous co…”_
- _L3 required evidence — Google / Dart: “vertical_align_top Asynchronous programming: Streams Dart 3.13 is here! Clean and lightweight code across every layer of Dart. Read the announcement . Asynchronous programming in Dart is characterized by the Future and …”_

### Stage 4 — Dart for Flutter

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Effective Dart | required | L3 | content-inspection | — | 1 | https://dart.dev/guides/language/effective-dart |
| pub.dev | required | L3 | content-inspection | — | 2 | https://pub.dev |
| Flutter Official Docs | required | L3 | content-inspection | — | 2 | https://flutter.dev/docs |
- _L3 required evidence — Google / Dart: “vertical_align_top Effective Dart Dart 3.13 is here! Clean and lightweight code across every layer of Dart. Read the announcement . Over the past several years, we've written a ton of Dart code and learned a lot about w…”_
- _L3 required evidence — Google: “Flutter Favorites Some of the packages that demonstrate the highest levels of quality , selected by the Flutter Ecosystem Committee geolocator Geolocation plugin for Flutter. This plugin provides a cross-platform (iOS, …”_
- _L3 required evidence — Google: “Flutter 3.47 is here! Read the blog post . Set up your environment and start building. Dip into the rich set of Flutter widgets available in the SDK. Bookmark the API reference docs for the Flutter framework. Browse tut…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 1 | Dart Full Course | L2 | not verified | not verified — review manually |
| 1 | The Net Ninja — Dart Series | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Dart Fundamentals (3 questions)

1. What is the difference between final and const in Dart?
   - · They are identical
   - **✔ final is set once at runtime; const is a compile-time constant**
   - · const allows reassignment
   - · final requires a type
   - _Why:_ final is runtime-immutable; const is compile-time constant. · _level: understand_
2. What does the ?? operator do?
   - · Throws if null
   - **✔ Returns the left value unless it is null, then the right value**
   - · Casts a type
   - · Negates a value
   - _Why:_ The ?? operator supplies a fallback when the left operand is null. · _level: understand_
3. Which collection guarantees unique elements?
   - · List
   - **✔ Set**
   - · Map
   - · Queue
   - _Why:_ A Set stores each value at most once. · _level: recall_

### Stage 2 — Object-Oriented Dart (3 questions)

1. What is a factory constructor used for?
   - · Copying arguments only
   - **✔ Returning an instance that may be a subtype or cached, rather than always a new instance**
   - · Compiling code
   - · Creating a mixin
   - _Why:_ A factory constructor controls instance creation and may return existing or subtype instances. · _level: understand_
2. What does a mixin provide?
   - · A way to add reusable behaviour to a class without single-inheritance limits
   - **✔ A database table**
   - · A UI widget
   - · A build step
   - _Why:_ Mixins inject reusable behaviour into classes, Dart's approach to multiple reuse. · _level: understand_
3. Why prefer an abstract class or interface for a shared contract?
   - · To hide code
   - **✔ So different implementations can satisfy the same interface and be swapped**
   - · To speed compilation
   - · To avoid types
   - _Why:_ Interfaces let you depend on a contract rather than a concrete implementation. · _level: apply_

### Stage 3 — Async Dart (3 questions)

1. What is a Future<T>?
   - · A synchronous value
   - **✔ A handle to a value that will be available later**
   - · A type of Stream
   - · A loop
   - _Why:_ A Future represents a value that completes later, successfully or with an error. · _level: understand_
2. What is a Stream<T> in Dart?
   - · A single async value
   - **✔ A sequence of asynchronous events over time**
   - · A synchronous list
   - · A file
   - _Why:_ Streams deliver a sequence of async events, unlike a single Future. · _level: understand_
3. Why use an isolate for a heavy computation?
   - · It is required
   - **✔ To run work on another thread so the UI is not blocked**
   - · To reduce memory always
   - · To avoid errors
   - _Why:_ Isolates run on separate threads, keeping the main isolate responsive. · _level: apply_

### Stage 4 — Dart for Flutter (3 questions)

1. How does Dart compile for release on mobile?
   - · Interpreted line by line
   - **✔ Ahead-of-time (AOT) to native machine code**
   - · To JavaScript only
   - · To Python
   - _Why:_ Flutter release builds use AOT compilation to native code for performance. · _level: understand_
2. In Flutter, a widget is…
   - · A native Android view
   - **✔ A Dart class describing part of the UI**
   - · A CSS file
   - · A database
   - _Why:_ Flutter UIs are Dart classes (widgets) describing the interface. · _level: understand_
3. Where do Dart project dependencies live?
   - **✔ pubspec.yaml**
   - · package.json
   - · Gemfile
   - · requirements.txt
   - _Why:_ pubspec.yaml declares dependencies and assets for a Dart/Flutter project. · _level: recall_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `dart-p1` (rubric rizw7jo-8)

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

### Stage 2 — project `dart-p2` (rubric rizw7jo-8)

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

### Stage 3 — project `dart-p3` (rubric rizw7jo-8)

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

### Stage 4 — project `dart-p5` (rubric rizw7jo-8)

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

### Stage 1 — Build: CLI Calculator

- **Objective:** Complete "CLI Calculator" to a standard you can show and explain to someone else.
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

### Stage 2 — Build: Student Grade Manager

- **Objective:** Complete "Student Grade Manager" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: Async Weather CLI

- **Objective:** Complete "Async Weather CLI" to a standard you can show and explain to someone else.
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

### Stage 4 — Portfolio project: Dart Package on pub.dev

- **Objective:** Complete "Dart Package on pub.dev" to a standard you can show and explain to someone else.
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

- **Stage 1:** Write a CLI calculator. Step 1: read two numbers and an operator from input. Step 2: use a `switch` on the operator. Step 3: handle division by zero with a clear message rather than crashing. Step 4: loop until the user…
- **Stage 2:** Model students with classes. Step 1: define a `Student` class with a name and a list of grades. Step 2: add an `average` getter. Step 3: store students in a `List` and look them up in a `Map` by id. Step 4: print a rank…
- **Stage 3:** Fetch weather asynchronously. Step 1: make an HTTP request returning a `Future`. Step 2: `await` the response and decode the JSON. Step 3: map the fields into a typed model. Step 4: wrap the call in try/catch for networ…
- **Stage 4:** Build a Flutter-ready widget model. Step 1: define an immutable widget state class. Step 2: create a `StatefulWidget` whose state updates on a button tap. Step 3: render the state in `build`. Step 4: move the data logic…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 1 — required (L2): https://www.youtube.com/watch?v=Ej_Pcr4uC2Q
- Stage 1 — required (L2): https://dartpad.dev
- Stage 1 — required (L2): https://www.youtube.com/playlist?list=PL4cUxeGkcC9iVGY3ppchN9CBSPYyHmPh4

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.6) **and** worthiness ≥ 90 (this track: 99.2).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

