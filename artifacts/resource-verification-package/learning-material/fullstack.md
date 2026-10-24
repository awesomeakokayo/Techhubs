# Full-Stack Development (`fullstack`)

Slug: `full-stack-development` · Category: build · Stages: 5

## Stage 1 — Complete Frontend Track

**Objective:** Build and deploy a responsive frontend before you add a backend.

**Success criteria:**
- Build a responsive UI with React and Tailwind CSS
- Deploy a working frontend to a hosting platform

### Instruction

Full-stack starts with frontend mastery. Complete the Frontend Development track in full first.

OBJECTIVE
Build and deploy a responsive frontend before you add a backend.

SUCCESS CRITERIA
• Build a responsive UI with React and Tailwind CSS
• Deploy a working frontend to a hosting platform

WORKED EXAMPLE
Build the frontend half faithfully. Step 1: follow the design's structure with semantic HTML. Step 2: lay it out so it holds at 375px and 1280px. Step 3: wire one interactive element to component state. Step 4: keep the data-fetching seam obvious — a single module — so you can swap mocks for the real API later.

COMMON MISTAKES
• Leaving deployment until the very end
• Only testing on a desktop browser width

### Worked example

Build the frontend half faithfully. Step 1: follow the design's structure with semantic HTML. Step 2: lay it out so it holds at 375px and 1280px. Step 3: wire one interactive element to component state. Step 4: keep the data-fetching seam obvious — a single module — so you can swap mocks for the real API later.

### Common mistakes
- Leaving deployment until the very end
- Only testing on a desktop browser width

### Ungraded practice
**Practice: Complete Frontend Track**

DO THIS NOW
Deploy a small React + Tailwind page to Vercel, then open the live URL on a phone and fix any layout issues you find.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does Tailwind CSS primarily provide?
   - A component library you import
   - **✔ Utility-first CSS classes you compose in markup**
   - A JavaScript state manager
   - A database layer
   - _Answer:_ Utility-first CSS classes you compose in markup · _Why:_ Tailwind is utility-first: small single-purpose classes composed directly in your markup. · _Level:_ understand

2. How is Next.js best described relative to React?
   - A replacement for React
   - **✔ A framework that adds routing, rendering modes and build tooling on top of React**
   - A CSS framework
   - A database ORM
   - _Answer:_ A framework that adds routing, rendering modes and build tooling on top of React · _Why:_ Next.js builds on React and adds routing, server rendering, and production tooling. · _Level:_ understand

3. A client-rendered app works in dev but returns 404 when you refresh a nested route after deploying. What is the most likely cause?
   - The database is offline
   - **✔ The host is missing a rewrite so unknown paths fall back to the app entry**
   - Tailwind did not compile
   - React is not installed
   - _Answer:_ The host is missing a rewrite so unknown paths fall back to the app entry · _Why:_ Client-side routes need a fallback rewrite so deep links resolve to the app entry point. · _Level:_ analyze

### Phase project — Build: Responsive Portfolio & Deploy (`fs-p0`)

- **Objective:** Complete "Responsive Portfolio & Deploy" to a standard you can show and explain to someone else.
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
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Complete Backend Track

**Objective:** Consolidate the backend skills you will connect to the frontend: APIs, databases and authentication.

**Success criteria:**
- Expose a REST API with correct status codes
- Persist data in PostgreSQL
- Authenticate requests

### Instruction

Then complete the Backend Development track, especially REST APIs, authentication, and PostgreSQL.

OBJECTIVE
Consolidate the backend skills you will connect to the frontend: APIs, databases and authentication.

SUCCESS CRITERIA
• Expose a REST API with correct status codes
• Persist data in PostgreSQL
• Authenticate requests

WORKED EXAMPLE
Build and document the API. Step 1: define the endpoints and their status codes. Step 2: add request validation. Step 3: persist to a database through a repository layer. Step 4: call every endpoint from a client script and add a request log — do not trust the route file alone.

COMMON MISTAKES
• Storing secrets in source control
• Trusting client input without server-side validation

### Worked example

Build and document the API. Step 1: define the endpoints and their status codes. Step 2: add request validation. Step 3: persist to a database through a repository layer. Step 4: call every endpoint from a client script and add a request log — do not trust the route file alone.

### Common mistakes
- Storing secrets in source control
- Trusting client input without server-side validation

### Ungraded practice
**Practice: Complete Backend Track**

DO THIS NOW
Build a small REST API with one resource, a database model, and a protected route. Document the endpoints and how to run it.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which HTTP method is conventionally used to create a new resource?
   - GET
   - **✔ POST**
   - DELETE
   - HEAD
   - _Answer:_ POST · _Why:_ POST creates a resource; the server typically returns 201 and the new resource. · _Level:_ recall

2. What does a foreign key in PostgreSQL enforce?
   - Faster reads
   - **✔ That a referenced row exists in the related table**
   - Alphabetical sorting
   - Password hashing
   - _Answer:_ That a referenced row exists in the related table · _Why:_ A foreign key enforces referential integrity between tables. · _Level:_ understand

3. Where should a database password live in a deployed backend?
   - Hard-coded in the source
   - **✔ In an environment variable or secret manager**
   - In the README
   - In a public repository
   - _Answer:_ In an environment variable or secret manager · _Why:_ Secrets belong in environment variables or a secret manager, never in source control. · _Level:_ apply

### Phase project — Build: Job Board (`fs-p2`)

- **Objective:** Complete "Job Board" to a standard you can show and explain to someone else.
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
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Integration

**Objective:** Connect the frontend to the backend and handle authentication and errors end-to-end.

**Success criteria:**
- Call the API from the frontend
- Handle auth across the stack
- Handle loading, error and empty states

### Instruction

Integration is where most full-stack learners struggle. Learn to connect all the pieces cleanly.

OBJECTIVE
Connect the frontend to the backend and handle authentication and errors end-to-end.

SUCCESS CRITERIA
• Call the API from the frontend
• Handle auth across the stack
• Handle loading, error and empty states

WORKED EXAMPLE
Connect the two halves. Step 1: fetch the list on load. Step 2: render loading, empty and error states. Step 3: on form submit, POST and update the list optimistically. Step 4: force a 500 response and confirm the UI recovers rather than freezing.

COMMON MISTAKES
• Ignoring failed requests
• Assuming the client can be trusted for authorization

### Worked example

Connect the two halves. Step 1: fetch the list on load. Step 2: render loading, empty and error states. Step 3: on form submit, POST and update the list optimistically. Step 4: force a 500 response and confirm the UI recovers rather than freezing.

### Common mistakes
- Ignoring failed requests
- Assuming the client can be trusted for authorization

### Ungraded practice
**Practice: Integration**

DO THIS NOW
Build a page that fetches from your API with loading, error and empty states, and one authenticated action. Explain how the token reaches the server.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. A browser request to your API is blocked by CORS. What is the correct fix?
   - Disable the browser security
   - **✔ Configure the server to send the appropriate Access-Control-Allow-* headers for the allowed origin**
   - Rename the endpoint
   - Use HTTP instead of HTTPS
   - _Answer:_ Configure the server to send the appropriate Access-Control-Allow-* headers for the allowed origin · _Why:_ CORS is enforced by the browser; the server must grant access with the correct response headers. · _Level:_ apply

2. Where must an authorization decision be enforced for trust?
   - In the browser UI only
   - **✔ On the server for every request**
   - In CSS
   - In the database client
   - _Answer:_ On the server for every request · _Why:_ The server is the trust boundary; client checks are only for user experience. · _Level:_ understand

3. What is an optimistic UI update?
   - **✔ Updating the UI immediately and rolling back if the server request fails**
   - Waiting for the server before showing anything
   - Never showing errors
   - Caching every response forever
   - _Answer:_ Updating the UI immediately and rolling back if the server request fails · _Why:_ Optimistic updates feel fast but must roll back when the server rejects the change. · _Level:_ apply

### Phase project — Build: Full Blog Platform (`fs-p1`)

- **Objective:** Complete "Full Blog Platform" to a standard you can show and explain to someone else.
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

## Stage 4 — Full Deployment

**Objective:** Deploy the frontend, backend and database together and manage configuration safely.

**Success criteria:**
- Deploy each part to a host
- Manage environment variables
- Connect a domain with HTTPS

### Instruction

Get the complete stack live. Managing different deployment environments is a real skill.

OBJECTIVE
Deploy the frontend, backend and database together and manage configuration safely.

SUCCESS CRITERIA
• Deploy each part to a host
• Manage environment variables
• Connect a domain with HTTPS

WORKED EXAMPLE
Deploy both halves. Step 1: build the frontend to static assets. Step 2: run the API behind a reverse proxy. Step 3: set environment variables in the host. Step 4: complete one full user flow — sign up, create a record, reload and see it — on the deployed URL.

COMMON MISTAKES
• Sharing one database URL between development and production
• Committing a populated .env file

### Worked example

Deploy both halves. Step 1: build the frontend to static assets. Step 2: run the API behind a reverse proxy. Step 3: set environment variables in the host. Step 4: complete one full user flow — sign up, create a record, reload and see it — on the deployed URL.

### Common mistakes
- Sharing one database URL between development and production
- Committing a populated .env file

### Ungraded practice
**Practice: Full Deployment**

DO THIS NOW
Deploy your frontend and backend, point the frontend at the deployed API, set environment variables, and put the app behind HTTPS on a custom domain.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. How should you keep production and development databases separate?
   - Use the same URL but different passwords
   - **✔ Use a separate DATABASE_URL per environment**
   - Rely on table prefixes
   - Disable the database in development
   - _Answer:_ Use a separate DATABASE_URL per environment · _Why:_ Each environment must point at its own database via its own configuration. · _Level:_ apply

2. Why serve the app over HTTPS?
   - It makes it faster
   - **✔ It encrypts traffic and verifies the server identity**
   - It removes the need for authentication
   - It compresses images
   - _Answer:_ It encrypts traffic and verifies the server identity · _Why:_ HTTPS provides transport encryption and server identity, protecting credentials and data. · _Level:_ understand

3. A deploy works locally but fails in production because an environment variable is missing. How do you prevent this?
   - Assume it will not happen
   - **✔ Validate required configuration on startup so the app fails fast with a clear message**
   - Hard-code a fallback secret
   - Ignore the variable
   - _Answer:_ Validate required configuration on startup so the app fails fast with a clear message · _Why:_ Failing fast on missing configuration turns a silent production bug into a clear startup error. · _Level:_ analyze

### Phase project — Build: Production Deployment & Observability (`fs-p5`)

- **Objective:** Deploy the app to a hosted environment with configuration, CI/CD, health checks, logs, and a rollback plan.
- **Problem:** A working full-stack app exists locally but has never been deployed reliably or observed in production.
- **Audience:** A small team that needs repeatable releases without downtime surprises.
- **Required functionality:**
  - Environment-specific configuration via environment variables
  - A repeatable build and deploy pipeline
  - A health/readiness endpoint
  - Structured logs and a basic error-alerting plan
- **Constraints:**
  - No secrets in the repository or image
  - Deployment must be reproducible from scratch
  - Must not require manual file edits on the server
- **Acceptance criteria (brief):**
  - A push to main deploys automatically and succeeds
  - The app starts from a clean environment with only documented configuration
  - A health check reports status
  - Rollback steps are documented and tested once
- **Required evidence:**
  - Repository with the pipeline config
  - A link to the running deployment
  - A short operations note (logs, alerts, rollback)
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - A push to main deploys automatically and succeeds (weight 1)
  - The app starts from a clean environment with only documented configuration (weight 1)
  - A health check reports status (weight 1)
  - Rollback steps are documented and tested once (weight 1)
- **Acceptance criteria (contract):**
  - A push to main deploys automatically and succeeds
  - The app starts from a clean environment with only documented configuration
  - A health check reports status
  - Rollback steps are documented and tested once

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — Production Patterns

**Objective:** Apply production patterns: billing, real-time features and background work.

**Success criteria:**
- Integrate a payment provider safely
- Add a real-time or background feature
- Reason about failure and retries

### Instruction

Build things that actually make money. Stripe, real-time, and SaaS patterns unlock serious product building.

OBJECTIVE
Apply production patterns: billing, real-time features and background work.

SUCCESS CRITERIA
• Integrate a payment provider safely
• Add a real-time or background feature
• Reason about failure and retries

WORKED EXAMPLE
Add production safeguards. Step 1: add structured logs with request ids. Step 2: add a health endpoint and an error boundary. Step 3: rate-limit the write endpoint. Step 4: write the rollback steps. Trigger one failure deliberately and show the log, alert or boundary that caught it.

COMMON MISTAKES
• Trusting a client-reported payment success
• Running slow work inside the request cycle

### Worked example

Add production safeguards. Step 1: add structured logs with request ids. Step 2: add a health endpoint and an error boundary. Step 3: rate-limit the write endpoint. Step 4: write the rollback steps. Trigger one failure deliberately and show the log, alert or boundary that caught it.

### Common mistakes
- Trusting a client-reported payment success
- Running slow work inside the request cycle

### Ungraded practice
**Practice: Production Patterns**

DO THIS NOW
Add a payment webhook that verifies the provider signature, then add one background job and explain how you handle a retry.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Why must a payment webhook signature be verified on the server?
   - To make it faster
   - **✔ To prove the notification genuinely came from the payment provider**
   - To avoid storing data
   - To reduce cost
   - _Answer:_ To prove the notification genuinely came from the payment provider · _Why:_ An unverified webhook can be forged, letting an attacker grant themselves paid access. · _Level:_ evaluate

2. When should work be moved to a background job?
   - When it is quick and must block the response
   - **✔ When it is long-running or does not need to block the user response**
   - Never
   - Only on the client
   - _Answer:_ When it is long-running or does not need to block the user response · _Why:_ Long or non-urgent work belongs in the background so requests stay fast and reliable. · _Level:_ apply

3. Why is idempotency important in payment handling?
   - It makes payments free
   - **✔ So retries do not charge or credit the same order twice**
   - It speeds up the database
   - It encrypts the card
   - _Answer:_ So retries do not charge or credit the same order twice · _Why:_ Webhooks and network retries can repeat an event; idempotent handling prevents duplicate effects. · _Level:_ analyze

### Phase project — Build: E-commerce Platform (`fs-p3`)

- **Objective:** Complete "E-commerce Platform" to a standard you can show and explain to someone else.
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

### Phase project — Portfolio project: AI Productivity App (`fs-p4`)

- **Objective:** Complete "AI Productivity App" to a standard you can show and explain to someone else.
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
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
