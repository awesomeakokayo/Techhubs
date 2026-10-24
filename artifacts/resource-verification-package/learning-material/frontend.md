# Frontend Development (`frontend`)

Slug: `frontend-development` · Category: build · Stages: 5

## Stage 1 — Foundations

**Objective:** Build and style a real web page with semantic HTML, CSS layout, and responsive behaviour.

**Success criteria:**
- Write semantic HTML landmarks and forms
- Lay out content with Flexbox and CSS Grid
- Make the page usable from 375px to desktop without horizontal scrolling

### Instruction

Master the building blocks of the web. HTML structures content, CSS styles and positions it, JavaScript makes it interactive.

OBJECTIVE
Build and style a real web page with semantic HTML, CSS layout, and responsive behaviour.

SUCCESS CRITERIA
• Write semantic HTML landmarks and forms
• Lay out content with Flexbox and CSS Grid
• Make the page usable from 375px to desktop without horizontal scrolling

WORKED EXAMPLE
Build a responsive pricing card. Step 1: structure the markup semantically — `<section>`, `<h2>`, a `<ul>` of features and an `<a>` action. Step 2: apply a single-column flex layout with a max-width. Step 3: add `@media (min-width: 640px)` that switches to a row. Step 4: check 375px and 1280px — the card must never cause horizontal scroll and every control must be keyboard reachable.

COMMON MISTAKES
• Using <div> for everything instead of semantic elements like <nav>, <main> and <section>
• Fighting layout with fixed pixel widths instead of Flexbox or Grid
• Forgetting the viewport meta tag, so mobile browsers zoom out

### Worked example

Build a responsive pricing card. Step 1: structure the markup semantically — `<section>`, `<h2>`, a `<ul>` of features and an `<a>` action. Step 2: apply a single-column flex layout with a max-width. Step 3: add `@media (min-width: 640px)` that switches to a row. Step 4: check 375px and 1280px — the card must never cause horizontal scroll and every control must be keyboard reachable.

### Common mistakes
- Using <div> for everything instead of semantic elements like <nav>, <main> and <section>
- Fighting layout with fixed pixel widths instead of Flexbox or Grid
- Forgetting the viewport meta tag, so mobile browsers zoom out

### Ungraded practice
**Practice: Foundations**

DO THIS NOW
Build a responsive profile page with a header, an about section, a skills grid, and a contact form. Use semantic HTML, one Flexbox layout, one CSS Grid layout, and at least one media query. Check it at 375px and 1024px.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which element should contain the unique primary content of a page?
   - <div>
   - **✔ <main>**
   - <aside>
   - <span>
   - _Answer:_ <main> · _Why:_ The <main> element identifies the primary content and should appear once per page. · _Level:_ understand

2. You need to distribute a row of items along one axis with even spacing. Which layout tool fits best?
   - CSS Grid
   - **✔ Flexbox**
   - position: absolute
   - float: left
   - _Answer:_ Flexbox · _Why:_ Flexbox lays items out along a single main axis; Grid is for two-dimensional layouts. · _Level:_ apply

3. A page looks correct on desktop but scrolls sideways on a phone. What is the most likely cause?
   - The images are too compressed
   - **✔ The viewport meta tag is missing or a fixed-width element overflows**
   - There are too many colours
   - JavaScript is disabled
   - _Answer:_ The viewport meta tag is missing or a fixed-width element overflows · _Why:_ Missing the viewport meta tag or a fixed-width child are the usual causes of horizontal scroll on mobile. · _Level:_ analyze

### Phase project — Build: Responsive Landing Page (`fe-p3`)

- **Objective:** Implement a given design as a responsive, accessible landing page.
- **Problem:** A brand or individual needs a landing page that presents an offer clearly and works on any device.
- **Audience:** Visitors arriving from ads or social media on phones.
- **Required functionality:**
  - Hero with headline and call to action
  - A feature/benefits section
  - A contact or signup form
  - Responsive navigation
- **Constraints:**
  - Semantic HTML
  - No CSS framework required unless already learned
  - Must work without horizontal scroll at 375px
- **Acceptance criteria (brief):**
  - Layout matches the reference at 375px and 1024px
  - All interactive elements are keyboard reachable
  - Images have alt text
  - No horizontal scroll
- **Required evidence:**
  - Live or hosted URL
  - Screenshot at mobile and desktop widths
  - Short README with the decisions you made
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Layout matches the reference at 375px and 1024px (weight 1)
  - All interactive elements are keyboard reachable (weight 1)
  - Images have alt text (weight 1)
  - No horizontal scroll (weight 1)
- **Acceptance criteria (contract):**
  - Layout matches the reference at 375px and 1024px
  - All interactive elements are keyboard reachable
  - Images have alt text
  - No horizontal scroll

### Recorded uncertainties
- 3 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Core JavaScript

**Objective:** Manipulate the DOM and handle asynchronous data with modern JavaScript.

**Success criteria:**
- Select and update DOM elements safely
- Handle user events and form submission
- Fetch data with async/await and handle success and failure states

### Instruction

Go deep into JavaScript. Learn modern syntax, DOM manipulation, and how to fetch data from APIs.

OBJECTIVE
Manipulate the DOM and handle asynchronous data with modern JavaScript.

SUCCESS CRITERIA
• Select and update DOM elements safely
• Handle user events and form submission
• Fetch data with async/await and handle success and failure states

WORKED EXAMPLE
Filter and render a product list. Step 1: hold the raw `products` array and a `maxPrice` value. Step 2: derive results with `const visible = products.filter((p) => p.inStock && p.price <= maxPrice)`. Step 3: render each item with `.map()` into template strings and `join("")`. Step 4: log `visible` before rendering to confirm the transform. Notice the derived data is computed, never mutated.

COMMON MISTAKES
• Forgetting that fetch() only rejects on network failure — check response.ok for 4xx/5xx
• Reassigning a const binding
• Ignoring rapid input, so out-of-order responses overwrite newer results

### Worked example

Filter and render a product list. Step 1: hold the raw `products` array and a `maxPrice` value. Step 2: derive results with `const visible = products.filter((p) => p.inStock && p.price <= maxPrice)`. Step 3: render each item with `.map()` into template strings and `join("")`. Step 4: log `visible` before rendering to confirm the transform. Notice the derived data is computed, never mutated.

### Common mistakes
- Forgetting that fetch() only rejects on network failure — check response.ok for 4xx/5xx
- Reassigning a const binding
- Ignoring rapid input, so out-of-order responses overwrite newer results

### Ungraded practice
**Practice: Core JavaScript**

DO THIS NOW
Build a small search UI that calls a public API. Show a loading state, render the results, and show a friendly error message when the request fails or returns no results.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. A fetch() call returns a response with status 500. Does the promise reject?
   - Yes, it throws
   - **✔ No — you must check response.ok or response.status yourself**
   - Only in Node.js
   - Only if you await it twice
   - _Answer:_ No — you must check response.ok or response.status yourself · _Why:_ fetch() resolves for HTTP error statuses, so you must inspect response.ok or the status code. · _Level:_ understand

2. Which approach lets a user update a value later?
   - const
   - **✔ let**
   - static
   - final
   - _Answer:_ let · _Why:_ let declares a binding that can be reassigned; const cannot. · _Level:_ recall

3. Users type quickly and older responses arrive after newer ones. What should you do?
   - Fetch less often with a timeout
   - **✔ Track the latest request and ignore stale responses (debounce/abort)**
   - Render every response in order of arrival
   - Disable the input while loading
   - _Answer:_ Track the latest request and ignore stale responses (debounce/abort) · _Why:_ You must guard against out-of-order responses by debouncing and ignoring stale results. · _Level:_ analyze

### Phase project — Build: Weather App (`fe-p4`)

- **Objective:** Build a small app that fetches and displays live data with clear loading and error states.
- **Problem:** People want current information (weather) without hunting through multiple sites.
- **Audience:** Everyday users who want an answer in seconds.
- **Required functionality:**
  - Search by location
  - Display current conditions
  - Loading state
  - Error state
  - Remember the last search
- **Constraints:**
  - Handle API failures gracefully
  - Do not expose API keys in client code
- **Acceptance criteria (brief):**
  - Works for a valid location
  - Shows a helpful message for an invalid location
  - No unhandled promise rejections
- **Required evidence:**
  - Live URL
  - Screenshots of success and error states
  - Notes on how you handled API keys
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Works for a valid location (weight 1)
  - Shows a helpful message for an invalid location (weight 1)
  - No unhandled promise rejections (weight 1)
- **Acceptance criteria (contract):**
  - Works for a valid location
  - Shows a helpful message for an invalid location
  - No unhandled promise rejections

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — React Framework

**Objective:** Build component-based interfaces with React and understand how state and props drive rendering.

**Success criteria:**
- Compose components with props
- Manage state with hooks
- Render lists and handle user input in React

### Instruction

React is the most in-demand frontend skill. Build component-based UIs and production apps with Next.js.

OBJECTIVE
Build component-based interfaces with React and understand how state and props drive rendering.

SUCCESS CRITERIA
• Compose components with props
• Manage state with hooks
• Render lists and handle user input in React

WORKED EXAMPLE
Add a searchable list in React. Step 1: hold `query` in `useState`. Step 2: derive `const results = useMemo(() => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())), [items, query])`. Step 3: bind the input to `query` and render `results`. Step 4: type in the box and confirm results change without `items` being modified — if it changes, you are mutating state.

COMMON MISTAKES
• Mutating state directly instead of using the setter
• Missing the key prop when rendering lists
• Running side effects in the render body instead of useEffect

### Worked example

Add a searchable list in React. Step 1: hold `query` in `useState`. Step 2: derive `const results = useMemo(() => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())), [items, query])`. Step 3: bind the input to `query` and render `results`. Step 4: type in the box and confirm results change without `items` being modified — if it changes, you are mutating state.

### Common mistakes
- Mutating state directly instead of using the setter
- Missing the key prop when rendering lists
- Running side effects in the render body instead of useEffect

### Ungraded practice
**Practice: React Framework**

DO THIS NOW
Build a movie search app in React: an input, a results list, a loading state, and an error state. Extract the result card into its own component that receives props.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. How do you update React state that was created with useState?
   - Reassign the variable directly
   - **✔ Call the setter function returned by useState**
   - Use document.querySelector
   - Reload the component
   - _Answer:_ Call the setter function returned by useState · _Why:_ State must be updated through its setter so React can re-render. · _Level:_ understand

2. Why does React ask for a key on rendered list items?
   - To style them
   - **✔ To identify which items changed, were added, or removed**
   - To sort them automatically
   - To make them focusable
   - _Answer:_ To identify which items changed, were added, or removed · _Why:_ Keys give React a stable identity for each item so reconciliation is correct and efficient. · _Level:_ understand

3. Where should a data fetch triggered on mount live?
   - In the render body
   - **✔ Inside a useEffect with an appropriate dependency array**
   - In a CSS file
   - In the setState call
   - _Answer:_ Inside a useEffect with an appropriate dependency array · _Why:_ Effects belong in useEffect; running them in render causes repeated calls and bugs. · _Level:_ apply

### Phase project — Build: Movie Search App (`fe-p5`)

- **Objective:** Build a React app that consumes a public API, with components, state and lists.
- **Problem:** Users need to search and browse a catalogue quickly.
- **Audience:** People exploring films, books or products.
- **Required functionality:**
  - Search input
  - Results grid as reusable components
  - Loading and empty states
  - Detail view or modal
- **Constraints:**
  - Reusable components
  - Keys on list items
  - No unnecessary re-renders
- **Acceptance criteria (brief):**
  - Results update with the query
  - Cards are reusable components
  - Empty and loading states exist
- **Required evidence:**
  - Source repository
  - Live deploy
  - Component diagram or notes
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Results update with the query (weight 1)
  - Cards are reusable components (weight 1)
  - Empty and loading states exist (weight 1)
- **Acceptance criteria (contract):**
  - Results update with the query
  - Cards are reusable components
  - Empty and loading states exist

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Professional Skills

**Objective:** Apply the professional practices that make frontend work maintainable: version control, testing, performance, accessibility and deployment.

**Success criteria:**
- Use a branching Git workflow
- Write component tests
- Meet basic accessibility requirements
- Deploy to a hosting platform

### Instruction

Bridge the gap from learning to professional work. These are the practices that separate juniors from team-ready developers.

OBJECTIVE
Apply the professional practices that make frontend work maintainable: version control, testing, performance, accessibility and deployment.

SUCCESS CRITERIA
• Use a branching Git workflow
• Write component tests
• Meet basic accessibility requirements
• Deploy to a hosting platform

WORKED EXAMPLE
Debug a failing test. Step 1: read the assertion message and reproduce the failure locally. Step 2: reduce the input to the smallest case that still fails. Step 3: form one hypothesis and change one thing only. Step 4: re-run. If it passes, commit with a message stating the cause; if not, revert before trying the next hypothesis so you never stack unrelated changes.

COMMON MISTAKES
• Treating accessibility as optional
• Committing directly to main with no review
• Shipping without testing the production build

### Worked example

Debug a failing test. Step 1: read the assertion message and reproduce the failure locally. Step 2: reduce the input to the smallest case that still fails. Step 3: form one hypothesis and change one thing only. Step 4: re-run. If it passes, commit with a message stating the cause; if not, revert before trying the next hypothesis so you never stack unrelated changes.

### Common mistakes
- Treating accessibility as optional
- Committing directly to main with no review
- Shipping without testing the production build

### Ungraded practice
**Practice: Professional Skills**

DO THIS NOW
Take one of your earlier projects and add: semantic landmarks and alt text, keyboard focus states, a test for one component, and a production deployment. Write a short README describing how to run and deploy it.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which is a genuine accessibility requirement rather than an enhancement?
   - **✔ Every interactive control is reachable and operable by keyboard**
   - Animations are always enabled
   - Text uses at least four colours
   - Images are larger than 1MB
   - _Answer:_ Every interactive control is reachable and operable by keyboard · _Why:_ Keyboard operability is required for accessibility; the others are not requirements. · _Level:_ understand

2. A component behaves correctly in tests but breaks only in the production build. What is the most likely cause?
   - The tests are too fast
   - **✔ A development-only assumption such as an environment variable or an unhandled production branch**
   - The browser is old
   - The component has no key
   - _Answer:_ A development-only assumption such as an environment variable or an unhandled production branch · _Why:_ Production-only failures usually come from environment differences or development-only assumptions. · _Level:_ analyze

3. What is the purpose of a feature branch?
   - To slow down development
   - **✔ To isolate work so it can be reviewed before merging**
   - To delete history
   - To replace testing
   - _Answer:_ To isolate work so it can be reviewed before merging · _Why:_ Feature branches keep work isolated and reviewable before it reaches the main branch. · _Level:_ understand

### Phase project — Build: Budget Tracker (`fe-p6`)

- **Objective:** Build a small app with persisted data, validation and tests.
- **Problem:** People want to understand where their money goes each month.
- **Audience:** Individuals tracking personal spending.
- **Required functionality:**
  - Add income/expenses
  - Categorise
  - Show totals and a chart
  - Persist data
- **Constraints:**
  - Input validation
  - Accessible form controls
  - At least one automated test
- **Acceptance criteria (brief):**
  - Totals are correct
  - Invalid input is rejected with a message
  - Data survives a reload
  - A test passes in CI
- **Required evidence:**
  - Repository with a passing test
  - Screenshot of the summary
  - Notes on validation rules
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Totals are correct (weight 1)
  - Invalid input is rejected with a message (weight 1)
  - Data survives a reload (weight 1)
  - A test passes in CI (weight 1)
- **Acceptance criteria (contract):**
  - Totals are correct
  - Invalid input is rejected with a message
  - Data survives a reload
  - A test passes in CI

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — AI-Assisted Workflow

**Objective:** Use AI tools as assistants while keeping ownership of correctness and architecture.

**Success criteria:**
- Generate useful boilerplate with AI
- Review and correct AI output
- Explain the code you ship

### Instruction

Use AI as a powerful assistant, not a replacement for understanding. Build faster without losing the ability to think.

OBJECTIVE
Use AI tools as assistants while keeping ownership of correctness and architecture.

SUCCESS CRITERIA
• Generate useful boilerplate with AI
• Review and correct AI output
• Explain the code you ship

WORKED EXAMPLE
Use AI to scaffold, then own the result. Step 1: prompt for a small component with explicit requirements. Step 2: read every line it returns and look for invented props or imports. Step 3: fix accessibility (labels, focus, contrast) and add one test. Step 4: if you cannot explain a line, delete it and rewrite it yourself — the AI draft is input, not the deliverable.

COMMON MISTAKES
• Shipping generated code without reading it
• Trusting AI explanations of unfamiliar APIs
• Letting AI make architectural decisions

### Worked example

Use AI to scaffold, then own the result. Step 1: prompt for a small component with explicit requirements. Step 2: read every line it returns and look for invented props or imports. Step 3: fix accessibility (labels, focus, contrast) and add one test. Step 4: if you cannot explain a line, delete it and rewrite it yourself — the AI draft is input, not the deliverable.

### Common mistakes
- Shipping generated code without reading it
- Trusting AI explanations of unfamiliar APIs
- Letting AI make architectural decisions

### Ungraded practice
**Practice: AI-Assisted Workflow**

DO THIS NOW
Ask an AI tool to generate a reusable Button component. Then review it: fix any accessibility, typing, or logic issues, and write two sentences explaining each change you made.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. You ask an AI for a React component. What should you do before using it?
   - Use it immediately
   - **✔ Read it, check accessibility and edge cases, and test it**
   - Only check the formatting
   - Paste it into production
   - _Answer:_ Read it, check accessibility and edge cases, and test it · _Why:_ Generated code must be read, reviewed and tested before it is trusted. · _Level:_ evaluate

2. Which task is AI least suited to owning?
   - Writing boilerplate markup
   - Explaining an error message
   - **✔ Deciding your application architecture and trade-offs**
   - Generating mock data
   - _Answer:_ Deciding your application architecture and trade-offs · _Why:_ Architectural decisions require context and accountability that AI cannot own for you. · _Level:_ evaluate

3. AI gives a confident explanation of an API that you have never used. What is the safest next step?
   - Trust it and ship
   - **✔ Verify against the official documentation**
   - Ask a second AI
   - Assume it is correct if the code compiles
   - _Answer:_ Verify against the official documentation · _Why:_ Confident output is not verified output; check the authoritative documentation. · _Level:_ analyze

### Phase project — Build: AI Chat Interface (`fe-p8`)

- **Objective:** Complete "AI Chat Interface" to a standard you can show and explain to someone else.
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

### Phase project — Portfolio project: Full E-commerce Frontend (`fe-p7`)

- **Objective:** Complete "Full E-commerce Frontend" to a standard you can show and explain to someone else.
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
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
