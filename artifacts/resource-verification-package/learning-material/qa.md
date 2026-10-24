# QA Engineering (`qa`)

Slug: `qa-engineering` · Category: grow · Stages: 4

## Stage 1 — Testing Fundamentals

**Objective:** Plan and execute manual testing: test cases, bug reports and test strategy.

**Success criteria:**
- Write clear test cases
- Report bugs reproducibly
- Choose test types for a risk

### Instruction

Understand what software testing is, why it matters, and how to think systematically about finding failures.

OBJECTIVE
Plan and execute manual testing: test cases, bug reports and test strategy.

SUCCESS CRITERIA
• Write clear test cases
• Report bugs reproducibly
• Choose test types for a risk

WORKED EXAMPLE
Write test cases for a password field. Step 1: valid password (happy path). Step 2: too short (boundary, exactly one below the minimum). Step 3: missing a required character class. Step 4: confirmation that does not match. For each, record input, expected result, and priority.

COMMON MISTAKES
• Vague bug reports with no steps to reproduce
• Testing only the happy path
• No expected result defined

### Worked example

Write test cases for a password field. Step 1: valid password (happy path). Step 2: too short (boundary, exactly one below the minimum). Step 3: missing a required character class. Step 4: confirmation that does not match. For each, record input, expected result, and priority.

### Common mistakes
- Vague bug reports with no steps to reproduce
- Testing only the happy path
- No expected result defined

### Ungraded practice
**Practice: Testing Fundamentals**

DO THIS NOW
For a login page, write eight test cases covering valid, invalid, empty and boundary inputs, and file one bug report with steps, expected and actual results.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What belongs in a good bug report?
   - A screenshot only
   - **✔ Steps to reproduce, expected result, actual result, environment**
   - A fix suggestion only
   - The developer’s name
   - _Answer:_ Steps to reproduce, expected result, actual result, environment · _Why:_ Reproducible steps with expected vs actual are essential. · _Level:_ apply

2. Why test boundary values?
   - They are easy
   - **✔ Most defects cluster at boundaries such as limits and empty input**
   - They are required by law
   - They are fast
   - _Answer:_ Most defects cluster at boundaries such as limits and empty input · _Why:_ Boundary and equivalence analysis find defects efficiently. · _Level:_ understand

3. A test case is missing its expected result. What is the problem?
   - None
   - **✔ The result cannot be judged as pass or fail**
   - It runs faster
   - It is more flexible
   - _Answer:_ The result cannot be judged as pass or fail · _Why:_ Without an expected result a test cannot pass or fail. · _Level:_ evaluate

### Phase project — Build: Login Page Test Cases (`qa-p1`)

- **Objective:** Complete "Login Page Test Cases" to a standard you can show and explain to someone else.
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

## Stage 2 — Tools & API Testing

**Objective:** Test APIs and data with Postman, DevTools and SQL.

**Success criteria:**
- Send and assert API requests
- Inspect network behaviour
- Validate data with SQL

### Instruction

Get hands-on with real testing tools. Postman for APIs and browser DevTools for frontend testing are essential.

OBJECTIVE
Test APIs and data with Postman, DevTools and SQL.

SUCCESS CRITERIA
• Send and assert API requests
• Inspect network behaviour
• Validate data with SQL

WORKED EXAMPLE
Test `POST /users` with a tool like Postman. Step 1: send a valid payload and assert 201. Step 2: send a duplicate email and assert 409. Step 3: omit a required field and assert 422 with a field message. Step 4: save all three in a collection so the checks are repeatable.

COMMON MISTAKES
• Only checking status 200
• Not asserting response bodies
• Not cleaning up test data

### Worked example

Test `POST /users` with a tool like Postman. Step 1: send a valid payload and assert 201. Step 2: send a duplicate email and assert 409. Step 3: omit a required field and assert 422 with a field message. Step 4: save all three in a collection so the checks are repeatable.

### Common mistakes
- Only checking status 200
- Not asserting response bodies
- Not cleaning up test data

### Ungraded practice
**Practice: Tools & API Testing**

DO THIS NOW
Import an API into Postman, write tests that check status codes and response fields for valid and invalid requests, then verify the created record with a SQL query.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Beyond the status code, what should API tests assert?
   - Nothing
   - **✔ Response body fields, content type and error shape**
   - The colour of the response
   - Only latency
   - _Answer:_ Response body fields, content type and error shape · _Why:_ Tests should verify payload structure and values, not just status. · _Level:_ apply

2. You created a record through the API. How do you verify it persisted?
   - Trust the 201 response
   - **✔ Query the database or GET the resource**
   - Assume it worked
   - Check the frontend only
   - _Answer:_ Query the database or GET the resource · _Why:_ Verify persistence through an independent read. · _Level:_ apply

3. What is a common cause of flaky API tests?
   - **✔ Shared mutable test data and test order dependence**
   - Using assertions
   - Using HTTPS
   - Reading the response
   - _Answer:_ Shared mutable test data and test order dependence · _Why:_ Shared state and ordering cause flakiness; tests need isolation. · _Level:_ analyze

### Phase project — Build: API Test Collection (`qa-p2`)

- **Objective:** Complete "API Test Collection" to a standard you can show and explain to someone else.
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

## Stage 3 — Test Automation

**Objective:** Automate reliable browser tests with Playwright and the Page Object Model.

**Success criteria:**
- Write a stable browser test
- Use resilient selectors
- Structure tests with the Page Object Model

### Instruction

Automation is what separates manual testers from engineers. Learn to write tests that run themselves.

OBJECTIVE
Automate reliable browser tests with Playwright and the Page Object Model.

SUCCESS CRITERIA
• Write a stable browser test
• Use resilient selectors
• Structure tests with the Page Object Model

WORKED EXAMPLE
Automate a login flow with Playwright. Step 1: navigate to the page. Step 2: fill credentials from a fixture, not literals. Step 3: assert the dashboard heading is visible. Step 4: run it in CI. Use role/text selectors so a CSS refactor does not break the test.

COMMON MISTAKES
• Using brittle CSS selectors tied to styling
• Hard-coded waits instead of waiting for state
• Tests that depend on each other’s order

### Worked example

Automate a login flow with Playwright. Step 1: navigate to the page. Step 2: fill credentials from a fixture, not literals. Step 3: assert the dashboard heading is visible. Step 4: run it in CI. Use role/text selectors so a CSS refactor does not break the test.

### Common mistakes
- Using brittle CSS selectors tied to styling
- Hard-coded waits instead of waiting for state
- Tests that depend on each other’s order

### Ungraded practice
**Practice: Test Automation**

DO THIS NOW
Write a Playwright test that logs in and asserts the dashboard for valid and invalid credentials. Extract selectors into a page object and run the test twice to confirm stability.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which selector is most resilient to design changes?
   - A deeply nested CSS class
   - **✔ A role or accessible-name based locator**
   - An absolute XPath
   - A position index
   - _Answer:_ A role or accessible-name based locator · _Why:_ Role/name locators reflect intent and survive styling changes. · _Level:_ apply

2. Why avoid fixed sleeps like waitForTimeout?
   - **✔ They are slow and unreliable**
   - They are banned
   - They are faster than waiting
   - They fix flakiness
   - _Answer:_ They are slow and unreliable · _Why:_ Fixed sleeps are both slow and flaky; wait for a real condition instead. · _Level:_ evaluate

3. What does the Page Object Model give you?
   - More files
   - **✔ A single place for each page’s locators and actions, reducing duplication**
   - Better colours
   - Faster network
   - _Answer:_ A single place for each page’s locators and actions, reducing duplication · _Why:_ Page objects centralise page knowledge so tests stay readable and maintainable. · _Level:_ understand

### Phase project — Build: Automated Login Tests (`qa-p3`)

- **Objective:** Complete "Automated Login Tests" to a standard you can show and explain to someone else.
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
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Advanced QA

**Objective:** Cover performance, security and CI for test suites.

**Success criteria:**
- Run a basic load test
- Identify common security test cases
- Integrate tests into CI

### Instruction

Go beyond functional testing, performance, security, and integrating tests into development pipelines.

OBJECTIVE
Cover performance, security and CI for test suites.

SUCCESS CRITERIA
• Run a basic load test
• Identify common security test cases
• Integrate tests into CI

WORKED EXAMPLE
Assess release risk. Step 1: list the features that changed. Step 2: score each by user impact and size of change. Step 3: assign test depth to match the risk. Step 4: write down what you deliberately did not test and why, so the gap is a decision rather than an oversight.

COMMON MISTAKES
• Load testing without a baseline or goal
• Treating security testing as optional
• Only running tests locally

### Worked example

Assess release risk. Step 1: list the features that changed. Step 2: score each by user impact and size of change. Step 3: assign test depth to match the risk. Step 4: write down what you deliberately did not test and why, so the gap is a decision rather than an oversight.

### Common mistakes
- Load testing without a baseline or goal
- Treating security testing as optional
- Only running tests locally

### Ungraded practice
**Practice: Advanced QA**

DO THIS NOW
Run a small k6 load test against an endpoint, record the baseline, add one security test case (for example an auth bypass attempt), and wire the test suite into a CI job.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What should you establish before a load test?
   - The colour scheme
   - **✔ A baseline and target for latency and error rate**
   - The database vendor only
   - The number of developers
   - _Answer:_ A baseline and target for latency and error rate · _Why:_ Performance has no meaning without a baseline and target. · _Level:_ apply

2. Which is a basic security test case?
   - Checking the logo
   - **✔ Attempting to access a protected route without credentials**
   - Testing font size
   - Counting buttons
   - _Answer:_ Attempting to access a protected route without credentials · _Why:_ Access-control checks are fundamental security tests. · _Level:_ apply

3. Why run tests in CI?
   - To slow releases
   - **✔ To catch regressions automatically before merge**
   - To replace local testing
   - To reduce test count
   - _Answer:_ To catch regressions automatically before merge · _Why:_ CI provides a consistent, automated regression gate. · _Level:_ understand

### Phase project — Portfolio project: Performance Test Report (`qa-p4`)

- **Objective:** Complete "Performance Test Report" to a standard you can show and explain to someone else.
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
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
