# Mobile Development (`mobile`)

Slug: `mobile-development` · Category: build · Stages: 4

## Stage 1 — Prerequisites

**Objective:** Confirm the prerequisites for mobile development and understand mobile UI constraints.

**Success criteria:**
- Choose React Native or Flutter
- Apply mobile UI basics
- Set up a device simulator

### Instruction

Choose your track: React Native (JS background) or Flutter (learn Dart). Both are excellent for cross-platform development.

OBJECTIVE
Confirm the prerequisites for mobile development and understand mobile UI constraints.

SUCCESS CRITERIA
• Choose React Native or Flutter
• Apply mobile UI basics
• Set up a device simulator

WORKED EXAMPLE
Prove your edit-run loop. Step 1: install the SDK and create an empty app. Step 2: run it on a simulator or device. Step 3: change one visible string. Step 4: hot-reload and confirm the change appears. If this loop is not fast and reliable, stop and fix it before writing features.

COMMON MISTAKES
• Designing desktop-sized layouts for a phone
• Ignoring platform conventions

### Worked example

Prove your edit-run loop. Step 1: install the SDK and create an empty app. Step 2: run it on a simulator or device. Step 3: change one visible string. Step 4: hot-reload and confirm the change appears. If this loop is not fast and reliable, stop and fix it before writing features.

### Common mistakes
- Designing desktop-sized layouts for a phone
- Ignoring platform conventions

### Ungraded practice
**Practice: Prerequisites**

DO THIS NOW
Install a simulator/emulator, run the default app, and identify three mobile UI constraints (touch target size, thumb reach, safe areas).

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. React Native builds on knowledge of which technology?
   - Dart
   - **✔ JavaScript and React**
   - Swift only
   - Kotlin only
   - _Answer:_ JavaScript and React · _Why:_ React Native uses JavaScript/React; Flutter uses Dart. · _Level:_ recall

2. What is the minimum recommended size for a tappable mobile control (per platform guidance)?
   - About 12pt
   - **✔ About 44–48pt**
   - About 8pt
   - Any size works
   - _Answer:_ About 44–48pt · _Why:_ Roughly 44–48 logical points ensures controls are reliably tappable. · _Level:_ understand

3. Why must layouts respect safe areas?
   - For faster rendering
   - **✔ So content is not hidden by notches, rounded corners or system bars**
   - To reduce data usage
   - To enable dark mode
   - _Answer:_ So content is not hidden by notches, rounded corners or system bars · _Why:_ Safe-area insets keep content visible around system UI elements. · _Level:_ apply

### Phase project — Build: First Single-Screen App (`mob-p0`)

- **Objective:** Complete "First Single-Screen App" to a standard you can show and explain to someone else.
- **Problem:** A real foundation problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Core Mobile Development

**Objective:** Build screens with navigation, state and device APIs.

**Success criteria:**
- Navigate between screens
- Manage state
- Use a device API with permission

### Instruction

Build your first real screens. Mobile development feels different from web, learn the patterns that make apps feel native.

OBJECTIVE
Build screens with navigation, state and device APIs.

SUCCESS CRITERIA
• Navigate between screens
• Manage state
• Use a device API with permission

WORKED EXAMPLE
Build a list screen. Step 1: fetch the data on mount. Step 2: show a loading state. Step 3: render the items and handle the empty case with a message. Step 4: navigate to a detail screen on tap. Keep state local until two screens genuinely need to share it.

COMMON MISTAKES
• Blocking the UI thread with heavy work
• Forgetting to handle permission denial

### Worked example

Build a list screen. Step 1: fetch the data on mount. Step 2: show a loading state. Step 3: render the items and handle the empty case with a message. Step 4: navigate to a detail screen on tap. Keep state local until two screens genuinely need to share it.

### Common mistakes
- Blocking the UI thread with heavy work
- Forgetting to handle permission denial

### Ungraded practice
**Practice: Core Mobile Development**

DO THIS NOW
Build a two-screen app with navigation, shared state, and one device API (camera or location) that requests permission and handles denial.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is React Navigation used for in React Native?
   - State management
   - **✔ Moving between screens and managing the navigation stack**
   - Styling
   - Database access
   - _Answer:_ Moving between screens and managing the navigation stack · _Why:_ React Navigation handles screen transitions and the navigation stack. · _Level:_ recall

2. A user denies a camera permission. What should the app do?
   - Crash
   - **✔ Show a clear explanation and a fallback or a link to settings**
   - Pretend it was granted
   - Retry in a loop
   - _Answer:_ Show a clear explanation and a fallback or a link to settings · _Why:_ Handle denial gracefully with explanation and a path forward. · _Level:_ apply

3. Why manage state with a dedicated solution instead of many component states?
   - It looks better
   - **✔ To keep shared data consistent and avoid prop drilling across screens**
   - To reduce bundle size
   - Because React forbids useState
   - _Answer:_ To keep shared data consistent and avoid prop drilling across screens · _Why:_ Centralised state keeps data consistent across screens and simplifies sharing. · _Level:_ understand

### Phase project — Build: Chat App (`mob-p1`)

- **Objective:** Complete "Chat App" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- 2 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Firebase & Backend

**Objective:** Add backend services with Firebase.

**Success criteria:**
- Set up authentication
- Store and read data
- Use storage and notifications

### Instruction

Firebase gives your app a full backend without building one from scratch. Perfect for MVPs.

OBJECTIVE
Add backend services with Firebase.

SUCCESS CRITERIA
• Set up authentication
• Store and read data
• Use storage and notifications

WORKED EXAMPLE
Add auth and a remote list. Step 1: sign the user in and store the session safely. Step 2: write a document to the backend. Step 3: read the list back. Step 4: handle the offline/error case with a clear message. Never embed privileged keys in the app bundle.

COMMON MISTAKES
• Leaving database rules open
• Storing sensitive data in the client

### Worked example

Add auth and a remote list. Step 1: sign the user in and store the session safely. Step 2: write a document to the backend. Step 3: read the list back. Step 4: handle the offline/error case with a clear message. Never embed privileged keys in the app bundle.

### Common mistakes
- Leaving database rules open
- Storing sensitive data in the client

### Ungraded practice
**Practice: Firebase & Backend**

DO THIS NOW
Add email/password auth and persist a small list of items to a cloud database, then read it back on relaunch.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does Firebase Authentication provide?
   - A database
   - **✔ Managed sign-in and identity, including providers like email and Google**
   - A CSS framework
   - A build tool
   - _Answer:_ Managed sign-in and identity, including providers like email and Google · _Why:_ Firebase Auth handles sign-in flows and identity tokens. · _Level:_ understand

2. Why are permissive Firebase database rules dangerous?
   - They slow queries
   - **✔ They can expose or allow modification of all data to any client**
   - They break authentication
   - They cost more
   - _Answer:_ They can expose or allow modification of all data to any client · _Why:_ Open rules let anyone read or write data; rules must enforce access. · _Level:_ evaluate

3. What is required before an app can show push notifications on iOS?
   - Nothing
   - **✔ Requesting and receiving the user's permission**
   - A paid database
   - Disabling Wi-Fi
   - _Answer:_ Requesting and receiving the user's permission · _Why:_ iOS requires explicit user permission before push notifications are shown. · _Level:_ apply

### Phase project — Build: Finance Tracker (`mob-p2`)

- **Objective:** Complete "Finance Tracker" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Publishing & Polish

**Objective:** Publish a polished app to the stores.

**Success criteria:**
- Prepare store listings
- Produce icons and splash screens
- Optimise performance

### Instruction

Getting an app to production is a skill of its own. Learn publishing, ASO, and monitoring.

OBJECTIVE
Publish a polished app to the stores.

SUCCESS CRITERIA
• Prepare store listings
• Produce icons and splash screens
• Optimise performance

WORKED EXAMPLE
Prepare a release build. Step 1: add an app icon and splash screen. Step 2: justify every permission you request. Step 3: bump the version and write the store listing. Step 4: produce a signed build and read the store's rejection checklist before submitting.

COMMON MISTAKES
• Submitting without testing on real devices
• Skipping required store metadata

### Worked example

Prepare a release build. Step 1: add an app icon and splash screen. Step 2: justify every permission you request. Step 3: bump the version and write the store listing. Step 4: produce a signed build and read the store's rejection checklist before submitting.

### Common mistakes
- Submitting without testing on real devices
- Skipping required store metadata

### Ungraded practice
**Practice: Publishing & Polish**

DO THIS NOW
Prepare a store listing with screenshots, an icon set and a splash screen, and profile the app to fix one slow list.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What must you provide for both App Store and Play Store submissions?
   - Only source code
   - **✔ An icon, screenshots, a description and required metadata**
   - A domain name
   - A database
   - _Answer:_ An icon, screenshots, a description and required metadata · _Why:_ Both stores require visual assets and complete metadata before review. · _Level:_ recall

2. A long list scrolls slowly. Which is the most appropriate first fix?
   - Add animations
   - **✔ Virtualise/recycle the list so only visible items render**
   - Increase the font size
   - Add more images
   - _Answer:_ Virtualise/recycle the list so only visible items render · _Why:_ Virtualisation renders only visible rows, keeping scrolling smooth. · _Level:_ apply

3. Which is a real publishing risk?
   - Testing on one device
   - **✔ Store review rejecting the app for policy or completeness issues**
   - Using an icon
   - Supporting dark mode
   - _Answer:_ Store review rejecting the app for policy or completeness issues · _Why:_ Store review can reject apps for policy violations or incomplete metadata. · _Level:_ understand

### Phase project — Portfolio project: E-commerce App (`mob-p4`)

- **Objective:** Complete "E-commerce App" to a standard you can show and explain to someone else.
- **Problem:** A real portfolio problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- 2 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
