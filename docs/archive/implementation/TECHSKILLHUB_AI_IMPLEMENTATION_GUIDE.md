# TechSkillHub Redesign: AI Implementation Guide

**Purpose:** Use this document as the working brief for an AI coding assistant inside the TechSkillHub repository. It defines the brand direction, product principles, design rules, implementation safeguards, and an incremental prompt sequence.

**How to use it:** Give the model the **Master Instructions** first. Then send **one phase prompt at a time**, in order. Review the model's report and changes after each phase before asking it to continue. Do not ask it to implement the entire redesign in one pass.

---

# 1. Master Instructions for the Coding Assistant

You are the senior product designer, UX engineer, and frontend implementation partner for TechSkillHub. Your responsibility is to improve the product's user experience and visual identity while preserving working functionality and the existing technical architecture wherever practical.

Read this complete guide before making changes. Treat it as the project's redesign brief. The codebase is the source of truth for current implementation details: inspect it rather than assuming how routes, components, APIs, authentication, database models, or learning progress currently work.

## Your working method

1. **Audit before changing code.** Inspect the repository structure, framework, package scripts, existing design tokens, routes, major components, data flows, and tests. Identify the actual architecture from the code.
2. **Work in small, reviewable phases.** Implement only the phase explicitly requested. Do not jump ahead, make unrelated improvements, or redesign every page at once.
3. **Preserve existing behavior.** Retain working authentication, enrollment, learning paths, lessons, progress tracking, APIs, persistence, admin flows, payment integrations, and other existing features unless a change is explicitly required and justified. This is a UX and brand redesign first, not permission to rewrite the product.
4. **Prefer minimal, coherent changes.** Reuse existing components and dependencies where suitable. Avoid unnecessary libraries, duplicated components, new abstractions without value, or broad rewrites.
5. **Verify claims.** Never invent learner counts, course counts, testimonials, outcomes, ratings, completion percentages, or other product facts. Use only information verified in the codebase or explicitly supplied in this brief. Clearly label placeholder content when unavoidable.
6. **Do not fabricate functionality.** A button must perform a real supported action. If a feature does not exist, do not make it look functional with an inert control or fake data. Flag the gap and recommend the smallest appropriate solution.
7. **Protect data and secrets.** Never print or expose environment-variable values, API keys, tokens, credentials, private learner data, or secrets. Do not run destructive database commands, reset user data, or alter production configuration as part of a UI redesign.
8. **Keep changes within scope.** Do not change payment, authentication, database schema, API contracts, or business logic merely to achieve a visual effect. If a meaningful behavior change appears necessary, explain why and ask for authorization before doing it.
9. **Test after each meaningful change.** Use the repository's actual scripts. Run appropriate linting, type checks, tests, and builds where available. Report commands run and results honestly. Do not say a check passed if it was not run.
10. **Stop at phase boundaries.** After completing a phase, summarize the changes, files touched, tests run, known issues, and next recommended phase. Then stop. Wait for the user to review and instruct you to continue.
11. **If a command fails, investigate the cause.** Do not repeatedly run the same failed command without changing the diagnosis. Distinguish pre-existing failures from failures introduced by your work.
12. **Do not overwrite local work.** Check the working tree before editing. Preserve unrelated user changes and avoid destructive Git commands.

## Product context

TechSkillHub is an Africa-focused, free technology-learning platform. Its core promise is to help beginners who feel overwhelmed by scattered online resources find direction through structured learning paths, curated resources, practical exercises, and projects.

The desired product outcome is not simply more attractive screens. Learners should be able to answer these questions quickly:

- Where should I start?
- What should I learn next?
- Why does this lesson or step matter?
- How much progress have I made?
- How can I practise what I am learning?
- What can I show to demonstrate what I can do?

The product should support a learner journey such as:

**Discover → Choose a learning path → Learn → Practise → Build → Demonstrate skills → Continue growing.**

Learners should be able to explore, but the recommended next step should remain clear. Do not force every learner into a rigid or linear journey if the existing product supports flexible exploration.

## Brand strategy

**Positioning:** A credible, modern learning academy for beginners entering technology.

**Brand promise:** **Learn with direction. Build with confidence.**

**Mission:** Make quality technology education easier to navigate, practise, and apply by giving learners a clear structure for developing real-world skills.

**Long-term vision:** Help African learners access structured technology education and confidently demonstrate their practical skills.

**Brand values:**

- **Clarity:** Learners understand where they are and what comes next.
- **Practicality:** Learning leads to exercises, projects, and demonstrable ability.
- **Trust:** Content and product claims are honest, accurate, and transparent.
- **Accessibility:** The experience is understandable, readable, mobile-friendly, and designed to reduce unnecessary barriers.

**Brand personality:** thoughtful, confident, welcoming, practical, credible, and encouraging without being childish or patronizing.

**Voice:** plain English, short and useful instructions, specific guidance, realistic promises, minimal jargon. Avoid exaggerated claims, corporate filler, generic motivational language, and AI-sounding copy.

Suggested homepage message, subject to fit with the current product:

> **Stop guessing what to learn next.**
>
> Follow a clear path, practise real skills, and build projects that show what you can do.

Do not force this exact copy onto every screen. Adapt language to context while preserving the brand promise.

---

# 2. Visual Design Direction

## Overall direction

Build a **light-first, editorial, spacious, modern education brand**. Combine the credibility of a well-organized learning institution, the warmth of a helpful mentor, and a practical focus on career-relevant skills.

The UI should feel deliberate, readable, calm, and distinctive. Use typography, spacing, composition, and purposeful color to establish hierarchy. The platform should look like one coherent product across the public website, learner dashboard, learning paths, lesson pages, and mobile experience.

Do not imitate a generic SaaS dashboard or use visual decoration to disguise weak information architecture.

## Color palette

Retain the five proposed brand colors. Refine their roles and contrast rather than replacing the palette without evidence.

| Token | Hex | Role |
|---|---|---|
| `--color-carbon-black` | `#222222` | Primary text, headings, icons, high-emphasis buttons, selected dark surfaces |
| `--color-white` | `#FFFFFF` | Main reading surfaces, cards, lesson surfaces, clean page backgrounds |
| `--color-dusty-grape` | `#4B4E6D` | Brand identity, selected navigation, links, feature areas, secondary emphasis |
| `--color-pearl-aqua` | `#84DCC6` | Progress fills, small highlights, restrained illustration accents, accents on dark surfaces |
| `--color-cool-steel` | `#95A3B3` | Decorative borders and supporting details; not the default small-text color on white |

Useful supporting surface, not a new core brand color:

- Warm off-white background: `#F8F8F6`
- Light grape-tinted surface: choose and document a suitably pale tint derived from dusty grape if needed.
- Neutral border: choose a light neutral with sufficient visibility on white.
- Secondary text: use a darker, readable neutral rather than cool steel `#95A3B3` directly on white.

### Color rules

- Use white or warm off-white for most page and reading surfaces.
- Use carbon black for body text and major hierarchy.
- Use dusty grape consistently for recognizable brand elements, links, and selected states.
- Use pearl aqua sparingly to indicate progress, growth, and selected highlights; do not use it as ordinary text on white.
- Do not use cool steel for small text on white unless contrast has been checked and passes.
- Use carbon black or another sufficiently dark foreground on pearl aqua.
- Maintain accessible contrast for text, interactive elements, focus rings, and disabled states. Disabled controls must still be understandable.
- Use semantic colors for success, warning, and error states. Aqua must not communicate every type of status.
- Do not distribute all five colors evenly across the screen. White and neutrals should dominate.
- Do not use gradients that blend all five palette colors. Gradients are not required for this brand direction.
- Avoid gradients, glassmorphism, shadows, and decorative effects unless they have a clear functional or brand purpose.

If the repository already has a token system, extend it coherently instead of creating a second competing system. Use the naming conventions that best fit the existing architecture and document the final mapping.

## Typography

Initial recommendation to evaluate against the existing setup:

- **DM Sans** for headings, body copy, navigation, labels, and UI.
- **JetBrains Mono** only for code blocks or technical snippets where a monospace typeface improves readability.

Use a restrained, consistent type scale. Headings should be confident but not oversized; paragraphs must remain easy to read. Prioritize sensible line length, comfortable line height, clear hierarchy, and legible form labels. Do not add font dependencies if the repository already has an appropriate family or if loading another font would materially harm performance.

## Logo and graphic language

The long-term identity should explore a simple mark based on a structured path, connected learning blocks, or progress from one stage to another. Pair the mark with a readable wordmark. The design must work in monochrome before brand color is applied and must remain recognizable at favicon and mobile-icon sizes.

Do not invent or replace the logo as part of an unrelated component task. If no final logo asset exists, use the current logo or a simple temporary wordmark and report that final logo design is still outstanding.

Use a consistent family of simple geometric or editorial illustrations for paths, learning states, and empty states. Prefer genuine learning content, real project previews, or helpful diagrams over random stock photography. Avoid graduation-cap, lightbulb, AI-spark, and generic tech imagery unless it is part of an original, purposeful concept.

## Components and motion

Create a consistent system for:

- Buttons and links, including hover, focus, pressed, loading, and disabled states.
- Navigation and mobile navigation.
- Cards and content lists.
- Forms, validation, helper text, and errors.
- Learning-path stage indicators.
- Lesson status and progress indicators.
- Resource links and project cards.
- Empty, error, loading, and success states.
- Dialogs, menus, tooltips, and notifications where those patterns are needed.

Prefer clear spacing, subtle borders, limited radius variation, restrained shadows, and consistent alignment. Do not make every component a colorful rounded card.

Motion should be brief, purposeful, and responsive. Use it to indicate state changes and preserve spatial context, not to add spectacle. Respect `prefers-reduced-motion`. Avoid blocking navigation behind unnecessary spinners or adding transitions that make the app feel slower.

---

# 3. UX Architecture and Product Principles

## Proposed navigation model

Validate these destinations against the routes and features that really exist. Reuse existing routes and avoid creating duplicate or fake destinations.

- **Home:** next steps, current activity, and a prominent action to resume learning.
- **Explore:** discover technology areas, courses, topics, and resources.
- **Learning Paths:** inspect roadmaps, prerequisites, expected outcomes, stages, and enrolled paths.
- **Projects:** find practical work and track completed projects, if supported by the product.
- **My Progress:** review completed lessons, milestones, activity, and progress.
- **Career Guidance:** relevant portfolio, CV, interview, and opportunity preparation only where supported or intentionally approved as a new feature.
- **Account:** profile and settings in an account menu rather than unnecessarily crowding primary navigation.

On mobile, reduce navigation to the most important current destinations. A compact bottom navigation may be appropriate if it fits the existing product structure and does not conflict with lesson controls. The lesson experience itself should remain focused and free of unnecessary navigation clutter.

## UX principles

1. **One clear primary action per screen.** Secondary actions must not compete with it.
2. **Preserve context.** Show the learner's current path, stage, and next step when relevant.
3. **Persist progress reliably.** Learners should be able to resume where they stopped. Verify persistence from the actual data flow; do not fake it in the UI.
4. **Make the next step clear.** Explain what the learner can do next and why it matters.
5. **Support practical application.** Present projects and practice in a way that connects to the material already covered.
6. **Design mobile-first.** Reading, forms, tap targets, roadmaps, navigation, and primary actions must work on narrow screens.
7. **Use progressive disclosure.** Show essential information first and reveal detail when learners need it.
8. **Design for empty and error states.** Explain what happened and provide a useful next action instead of leaving blank spaces or cryptic errors.
9. **Do not gamify indiscriminately.** Progress milestones can help; badges, streaks, points, and animation should only be added or retained when they serve a real learning goal.
10. **Accessibility is part of completion.** Check semantic structure, keyboard use, focus states, contrast, reduced motion, input labels, and useful error messages.
11. **Performance is part of UX.** Avoid unnecessary dependencies, heavy media, layout shift, needless loading states, and interaction-blocking animation.
12. **Honesty over appearance.** Never display fake activity, made-up progress, invented testimonials, or unsupported claims to fill a design.

## Learner journey

The experience should support this journey without falsely imposing a strict sequence where the current product permits exploration:

1. Discover the available fields and what each path leads to.
2. Choose a path based on interest, current level, and goals.
3. Understand the path's purpose, prerequisites, stages, and expected commitment.
4. Work through lessons and curated resources in a sensible order.
5. Test understanding through exercises or quizzes where available.
6. Apply knowledge through practical projects where available.
7. Review completed work and collect evidence of skills where supported.
8. Return easily and continue learning.

---

# 4. Screen-Level Requirements

## A. Public landing page

**Goal:** Help a new visitor quickly understand who TechSkillHub serves, what problem it solves, and how to begin.

Recommended hierarchy:

1. Clear header and recognizable brand.
2. Short, strong headline that addresses the lack of learning direction.
3. Supporting copy explaining structured learning and practical application.
4. Primary CTA to explore or start a learning path, connected to a real route.
5. Concise explanation of how the platform works.
6. Verified examples of available learning paths or categories.
7. Explanation of practical projects and progress, only to the extent these features exist.
8. Credibility through truthful information, not invented testimonials or unsupported metrics.
9. Clear footer and essential links.

The landing page should not be an overly long sales page or a wall of feature cards. Keep content readable and the first action obvious. Make the responsive layout intentional instead of simply stacking every desktop element.

Suggested starting copy (adapt where necessary):

**Headline:** “Stop guessing what to learn next.”

**Supporting copy:** “Follow a clear path, practise real skills, and build projects that show what you can do.”

**Primary CTA:** “Explore learning paths” or the closest accurate action already supported.

## B. Learning-path detail page

**Goal:** Let learners decide whether a path is appropriate before they start.

Where data exists, present:

- Path title and clear description.
- Intended learner and expected learning outcomes.
- Prerequisites and difficulty level.
- Estimated time commitment only when there is a defensible basis for it.
- Roadmap stages and the relationship between them.
- Lessons, resources, exercises, or projects included.
- Enrollment or continuation status.
- A clear start/resume action.

Distinguish completed, current, available, and prerequisite-locked stages with text or icons in addition to color. Do not create fake prerequisites or show incomplete roadmap data as fact.

## C. Learner dashboard

**Goal:** Help the learner resume quickly and decide what to do next.

Prioritize:

1. A welcome or orientation message that is brief and appropriate.
2. The current learning path or most useful next action.
3. A prominent “Continue learning” or equivalent action linked to the actual next lesson.
4. A small number of meaningful progress summaries based on real data.
5. Relevant recommendations based on actual platform capabilities and available learner context.
6. Secondary activity and history beneath the primary task.

Do not allow decorative charts, empty statistics, or many equal-weight cards to dominate. Handle new users with no path, incomplete profile information, errors retrieving progress, and users who have finished a path.

## D. Lesson experience

**Goal:** Make it easy to understand the material, use its resources, and continue to the next step.

Where applicable, include:

- Path and stage context.
- Lesson title and learning objectives.
- Readable lesson content with good hierarchy.
- Accessible links and resource metadata.
- Code examples formatted as code rather than ordinary paragraphs.
- Exercises or knowledge checks where supported.
- A reliable indication of completion state.
- A clear previous/next lesson interaction.
- A return path to the roadmap.
- Responsive reading layout and table-of-contents behavior for long lessons when useful.

Do not mark a lesson as complete just because the page was opened unless that is the existing, explicitly defined product behavior. Do not change completion rules or progress persistence without inspecting their implementation first.

## E. Progress and project experiences

Display only information the platform can actually track. Use progress indicators that have clear meanings, accessible labels, and correct calculations. Distinguish activity from achievement. If the platform does not yet support portfolio publishing, project review, or career recommendations, document the gap rather than making a visual mock-up appear to be a live feature.

---

# 5. Technical and Repository Safeguards

The repository, not this brief, determines the exact framework versions, directory structure, state management, styling approach, and backend boundaries. Inspect these before choosing an implementation.

The known product context suggests a Next.js/React-based application with TypeScript, Tailwind CSS, backend services, Prisma/PostgreSQL, and payment/authentication integrations, but **verify all of this against the current repository**. Do not assume every item remains present or is configured as expected.

Before editing:

- Read `package.json` and relevant configuration files.
- Inspect the app's actual route structure and shared layouts.
- Locate global styles, tokens, fonts, and shared UI components.
- Trace how authentication and learner identity are resolved.
- Trace how learning paths, lessons, enrollments, and progress are fetched and saved.
- Identify important API endpoints, server actions, database access, and integration boundaries.
- Check the existing test setup and available scripts.
- Check Git status and preserve unrelated changes.

During implementation:

- Prefer existing patterns unless they are clearly causing the problem.
- Keep client/server component boundaries correct for the framework in use.
- Avoid moving secrets into client-side code.
- Maintain correct loading, error, and empty states.
- Avoid breaking route names, query parameters, external links, deep links, or data contracts.
- Do not alter schemas or run migrations for purely visual changes.
- Do not reset or seed any production data.
- Check responsive states at narrow mobile, larger mobile/tablet, laptop, and wide desktop sizes.
- Use the repository's existing icon system if one is already established. Avoid emoji as UI icons; use consistent interface icons.
- Keep browser console errors, type errors, and accessibility regressions under control.

If a required fact is unavailable, inspect the code and existing documentation first. If it remains unclear, explain the uncertainty and present a safe, minimal option instead of inventing product behavior.

---

# 6. Phase-by-Phase Prompt Sequence

**Important:** Run these prompts one at a time. Each phase ends with a report and a stop point. Do not proceed to the next phase until the user explicitly asks you to continue.

## Phase 0 — Repository and UX audit (READ ONLY)

### Prompt to give the model

> Read `TECHSKILLHUB_AI_IMPLEMENTATION_GUIDE.md` completely and treat it as the redesign brief. Start Phase 0 only. Do not edit, create, delete, move, or format any files yet.
>
> Audit the actual TechSkillHub repository. Inspect the project structure, package scripts, framework versions, routes, layouts, global styles, design tokens, shared components, authentication boundaries, learning-path and lesson flows, enrollment, learner progress persistence, APIs, database usage, integrations, and existing tests. Verify the actual implementation instead of assuming it from this document.
>
> Review the public landing page, learning-path discovery/detail experience, learner dashboard, lesson experience, progress views, and mobile navigation where they exist. If you can inspect the running local app, do so; otherwise clearly say that your audit is based on code inspection only.
>
> Deliver a structured audit containing:
> 1. Actual stack and architecture, with the files that support your findings.
> 2. Route and screen inventory.
> 3. Existing design system and components worth preserving.
> 4. Current strengths, UX problems, visual inconsistencies, mobile issues, accessibility risks, and performance risks. Separate verified findings from hypotheses.
> 5. Important product behavior and integrations that must not break.
> 6. Any current test/build failures you could verify.
> 7. A prioritized redesign backlog grouped into critical, high, medium, and later.
> 8. Recommended implementation order and acceptance criteria for each major screen.
>
> Do not start implementation. Do not fabricate findings based on screens you have not inspected. Finish with a concise report and stop for review.

### Completion gate

Do not proceed until the audit identifies real routes, current functionality, design constraints, and the first safe implementation target.

---

## Phase 1 — Design-system foundation

### Prompt to give the model

> Implement Phase 1 only: establish the TechSkillHub design-system foundation based on the approved audit and this guide. Do not redesign all pages yet.
>
> Inspect and reuse the current styling architecture. Define consistent tokens for the five brand colors, backgrounds, text, borders, spacing, typography, radius, shadows, focus states, and semantic states. Keep the palette: carbon black `#222222`, white `#FFFFFF`, dusty grape `#4B4E6D`, pearl aqua `#84DCC6`, and cool steel `#95A3B3`. A warm off-white such as `#F8F8F6` may be used as a supporting surface. Create a darker neutral for secondary text where cool steel fails contrast.
>
> Use DM Sans and JetBrains Mono only if they are appropriate for the existing setup and can be introduced without unnecessary performance cost. Reuse the current icon library if one is already installed. Establish button, link, form, focus, card, progress, and navigation styles only where it is sensible to create shared styles/components.
>
> Follow the editorial, light-first, spacious visual direction. Avoid five-color gradients, generic AI gradients, excessive glass effects, overdone rounding, inconsistent shadows, and decorative changes without purpose. Ensure text and controls are accessible; use dark text on pearl aqua and verify actual contrast rather than guessing.
>
> Do not change business logic, data models, API contracts, authentication, or payment behavior. Keep changes limited to the design-system foundation and any small shared primitives needed for consistency. Run relevant available checks.
>
> Report the files changed, final token mapping, notable contrast decisions, checks run/results, unresolved design questions, and stop. Do not proceed to the homepage redesign.

### Completion gate

The design tokens and shared primitives are stable, existing functionality still works, and available checks have been run.

---

## Phase 2 — Shared application shell and navigation

### Prompt to give the model

> Implement Phase 2 only: refine the shared application shell and navigation using the approved design system. Use the audit to identify the actual layouts and user roles. Preserve route behavior and all working navigation destinations.
>
> Make the header, content width, active navigation states, account area, menus, and mobile navigation feel consistent and responsive. Make the visual hierarchy calm and clear. Keep a light-first overall design; use dusty grape for recognizable brand and selected states, carbon black for strong hierarchy, and pearl aqua only as a restrained accent. Do not create a separate competing design language for the dashboard and public pages.
>
> On mobile, prioritize the destinations learners genuinely need. Use bottom navigation only if it fits the existing architecture and does not conflict with reading or lesson controls. Verify navigation by following the real routes, including nested paths and account states where possible.
>
> Do not redesign the main body content of every page yet. Do not add fake destinations or placeholder interactions. Test desktop and mobile behavior, keyboard navigation, focus visibility, menus, and the relevant build/lint/type checks.
>
> Report changed files and routes verified, tests run/results, and any known issues. Stop for review.

---

## Phase 3 — Public landing page

### Prompt to give the model

> Implement Phase 3 only: redesign the public TechSkillHub landing page using the approved brand strategy, design system, and audit.
>
> Its primary job is to help beginners understand that TechSkillHub gives them direction through structured technology learning. Use a clear headline, concise support copy, a real primary action into the learning experience, a short explanation of how learning paths work, and verified examples of available paths or content. Use “Stop guessing what to learn next” and “Follow a clear path, practise real skills, and build projects that show what you can do” as starting copy if they accurately reflect the existing product.
>
> Keep the page editorial, spacious, readable, and responsive. Make the main action prominent without adding competing CTAs. Prefer genuine platform content, simple explanatory diagrams, or consistent geometric visuals over random stock images and decorative graphics. Use only verified product statistics and testimonials; if there is no verified evidence, omit the section instead of filling it with invented claims.
>
> Connect all calls to action to real working routes. Preserve relevant metadata, SEO behavior, accessibility semantics, and existing footer/legal links. Do not alter unrelated dashboard pages or backend logic. Test the page at narrow mobile, tablet, and desktop widths; check keyboard focus, contrast, console errors if available, and relevant scripts.
>
> Report what changed, which routes and content sources were verified, checks run/results, and any follow-up recommendations. Stop for review.

---

## Phase 4 — Learning-path discovery and detail

### Prompt to give the model

> Implement Phase 4 only: improve learning-path discovery and the learning-path detail experience. Use the real data model, routes, and existing learning content discovered in Phase 0.
>
> Help beginners understand the available options and choose an appropriate path. Where real data supports it, show the intended learner, outcomes, prerequisites, difficulty, roadmap stages, resources, projects, current enrollment status, and a clear start/resume action. Do not invent estimated durations, prerequisites, outcomes, lesson counts, or path data. If this information does not exist, do not disguise a guess as fact; report what is missing.
>
> On path detail pages, create a clear visual hierarchy between overview, outcomes, roadmap, included learning material, and the primary action. Use clear labels and more than color alone to distinguish completed, current, upcoming, unavailable, and prerequisite-locked states. Make roadmaps usable on mobile without horizontal overflow or tiny controls.
>
> Preserve enrollment rules, route parameters, authorization, and persistence. Do not alter database schemas or business logic just to match the design. Test discovery filters/search if they exist, path detail routes, enrollment/continue behavior, responsive states, and relevant available checks.
>
> Report changes, real flows tested, unavailable product data, checks run/results, and stop for review.

---

## Phase 5 — Learner dashboard

### Prompt to give the model

> Implement Phase 5 only: redesign the signed-in learner dashboard around the next useful learning action.
>
> Use real learner and progress data. Prioritize the current path or next lesson, a clear continue-learning action, a small number of meaningful progress summaries, and relevant next steps. Keep secondary activity and statistics subordinate. Do not fill the dashboard with empty cards, generic charts, invented numbers, or recommendations that are not grounded in available product functionality.
>
> Handle different real states: a new learner with no enrollment, a learner partway through a path, a learner who completed a path, unavailable or failed progress data, and incomplete profile information. Use actionable empty and error states. Make sure progress calculations are correct and that dashboard actions point to the actual next destination.
>
> Preserve authentication, data ownership, server/client boundaries, and progress persistence. Do not weaken authorization to make data visible. Do not change enrollment or completion rules without explicit authorization. Test the relevant states where possible, plus mobile, keyboard interaction, and available build/lint/type checks.
>
> Report flows and states verified, files changed, checks/results, and remaining gaps. Stop for review.

---

## Phase 6 — Lesson experience and progress continuity

### Prompt to give the model

> Implement Phase 6 only: improve the lesson-reading experience and its connection to the learning path.
>
> Use the existing lesson content and behavior. Establish clear lesson hierarchy, comfortable reading width and line height, useful headings, accessible links, properly formatted code snippets, path/stage context, and clear previous/next actions where supported. For long lessons, add or refine a table of contents only if it improves navigation and fits the actual content model. Keep the lesson page calm and focused.
>
> Make completed, current, and upcoming lesson states understandable without relying on color alone. Verify how lesson completion is recorded and how progress is saved. Preserve the existing completion rules unless the user explicitly approves a behavior change. Never mark a lesson complete merely because it has been opened unless that is the established product behavior.
>
> Ensure progress survives navigation and refresh when the underlying product supports persistence. Show appropriate loading, saving, success, and error states without unnecessary full-screen spinners. Preserve resource links, authentication rules, and deep links. Do not invent exercises or quizzes that do not exist; report possible enhancements separately.
>
> Test reading and navigation on mobile and desktop and run relevant checks. Report tested scenarios, changes, known limitations, and stop for review.

---

## Phase 7 — Practice, projects, and progress screens

### Prompt to give the model

> Implement Phase 7 only: refine existing practice, project, and progress experiences using what actually exists in the repository. Do not invent an entire new feature set under the cover of a UI redesign.
>
> Present practical work as a meaningful extension of learning. Where supported, show what the learner is expected to produce, relevant instructions/resources, current status, and a clear next action. Progress screens should distinguish lessons completed, activity, milestones, and project outcomes rather than mixing them into one ambiguous percentage.
>
> Use correct calculations and verified underlying data. Provide useful empty states for learners who have not started. If the current platform does not support portfolio publishing, project submissions, assessment, badges, streaks, or career recommendations, document the gap rather than building a fake front-end version. Suggest such additions separately, with their data and product implications.
>
> Keep colors, components, terminology, and interaction patterns consistent with the design system. Preserve all data flows and authorization, then test applicable routes, responsive behavior, and relevant checks. Report changed files, real functionality exercised, limitations, checks/results, and stop for review.

---

## Phase 8 — Responsive polish, accessibility, and performance

### Prompt to give the model

> Implement Phase 8 only: conduct a focused quality pass on the redesigned screens already implemented. Do not introduce a new visual direction or unrelated features.
>
> Review responsive layouts at narrow mobile, larger mobile, tablet, laptop, and wide desktop sizes. Fix overflow, awkward text wrapping, content density, tap-target problems, sticky elements covering content, navigation conflicts, and inconsistent spacing. Check keyboard navigation, visible focus, heading order, accessible names, form labels/errors, contrast, reduced-motion behavior, and non-color status indicators.
>
> Review loading, empty, success, and failure states. Check for unnecessary loading spinners, layout shift, heavy assets, and avoidable dependencies. Use the project's existing performance tools and diagnostics where available. Do not claim a performance score or accessibility compliance without running appropriate checks. Avoid changing application logic unless a verified UX or accessibility defect requires it; explain and isolate any such change.
>
> Run the most relevant lint, type, test, and production-build scripts available. Separate newly introduced problems from pre-existing failures and report evidence. Finish with a list of fixes, checks and results, remaining issues by severity, and stop for review.

---

## Phase 9 — Regression verification and release readiness

### Prompt to give the model

> Implement Phase 9 only: verify the redesign for regressions and release readiness. Do not add new design features.
>
> Build a verification matrix from the actual product flows. At minimum, verify the public landing page and CTA destinations; sign-in/sign-up if applicable; learning-path discovery and detail; enrollment or continuation; opening lessons; completing a lesson according to established rules; progress persistence after navigation or refresh; dashboard state changes; project/progress pages that exist; account navigation; and mobile navigation. Include unauthenticated, new-learner, in-progress, and completed states where applicable.
>
> Use tests already present and add narrowly scoped tests only where useful and consistent with the test stack. Check route errors, console output where available, responsive regressions, and correct use of real data. Do not run destructive database commands or expose secrets. Do not claim manual or automated test success unless it actually occurred.
>
> Deliver a release-readiness report containing: completed phases, modified files, commands and test results, verified user flows, known regressions, pre-existing failures, unresolved issues grouped by severity, and any manual checks still required. Do not deploy or alter production resources unless explicitly authorized. Stop for review.

---

# 7. Definition of Done

A redesigned screen or phase is not complete merely because it looks polished. It should meet the relevant checks below:

## Brand and consistency

- Uses the agreed TechSkillHub palette and visual direction.
- Follows the shared typography, spacing, component, and interaction rules.
- Avoids unsupported claims, generic filler, and decorative effects without purpose.
- Fits the same identity as the rest of the product.

## UX and functionality

- Has a clear primary action.
- Works at mobile and desktop sizes.
- Uses real routes and real data.
- Includes appropriate empty, loading, and error states.
- Preserves existing authentication, enrollment, lesson completion, and progress behavior.
- Does not add controls that appear functional but do nothing.

## Accessibility and quality

- Text and interactive elements have adequate contrast.
- Navigation and controls work with a keyboard where applicable.
- Focus states remain visible.
- Semantic headings, labels, and accessible names are appropriate.
- Reduced-motion preferences are respected.
- No avoidable overflow or obstructed controls at mobile sizes.
- Available lint, type checks, tests, and builds are run and accurately reported.

## Handoff report after every phase

The assistant must finish each phase with:

1. **Summary:** What was done and why.
2. **Files changed:** Actual paths and their purpose.
3. **Behavior preserved:** Important flows checked.
4. **Verification:** Commands run and exact results.
5. **Known issues:** Anything unfinished or uncertain.
6. **Next phase:** One recommended next step.
7. **Stop:** Wait for explicit user instruction before continuing.

---


