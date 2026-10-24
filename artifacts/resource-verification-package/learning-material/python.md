# Python Development (`python`)

Slug: `python-development` · Category: build · Stages: 5

## Stage 1 — Python Basics

**Objective:** Write clear Python programs using core data types, control flow, functions and file handling.

**Success criteria:**
- Use lists, dicts, tuples and sets appropriately
- Write functions with clear inputs and outputs
- Read and write files and handle errors

### Instruction

Python is one of the easiest languages to start with. Nail the fundamentals and everything else opens up.

OBJECTIVE
Write clear Python programs using core data types, control flow, functions and file handling.

SUCCESS CRITERIA
• Use lists, dicts, tuples and sets appropriately
• Write functions with clear inputs and outputs
• Read and write files and handle errors

WORKED EXAMPLE
Parse a CSV of scores. Step 1: open the file inside `with open(...) as f`. Step 2: for each line, `strip()` and `split(",")`. Step 3: convert fields to `int` with a guard that skips blank rows. Step 4: compute the average and print the top three students. Wrap the open in `try/except FileNotFoundError` and print a clear message rather than a traceback.

COMMON MISTAKES
• Using a list where a set or dict is more appropriate
• Ignoring exceptions, so a missing file crashes the script
• Mutating a default argument like def f(x=[])

### Worked example

Parse a CSV of scores. Step 1: open the file inside `with open(...) as f`. Step 2: for each line, `strip()` and `split(",")`. Step 3: convert fields to `int` with a guard that skips blank rows. Step 4: compute the average and print the top three students. Wrap the open in `try/except FileNotFoundError` and print a clear message rather than a traceback.

### Common mistakes
- Using a list where a set or dict is more appropriate
- Ignoring exceptions, so a missing file crashes the script
- Mutating a default argument like def f(x=[])

### Ungraded practice
**Practice: Python Basics**

DO THIS NOW
Write a script that reads a text file, counts word frequencies, prints the top 10, and handles a missing file without crashing.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which structure stores unique values with fast membership tests?
   - list
   - tuple
   - **✔ set**
   - str
   - _Answer:_ set · _Why:_ A set stores unique elements and offers fast membership testing. · _Level:_ understand

2. How should you handle a file that may not exist?
   - Let it crash
   - **✔ Wrap the open in try/except and handle FileNotFoundError**
   - Assume it exists
   - Delete the file first
   - _Answer:_ Wrap the open in try/except and handle FileNotFoundError · _Why:_ Handle the expected error so the program degrades gracefully. · _Level:_ apply

3. Why is def f(items=[]) a bug?
   - It is invalid syntax
   - **✔ The default list is shared across calls and accumulates values**
   - It is slower
   - It cannot take arguments
   - _Answer:_ The default list is shared across calls and accumulates values · _Why:_ Mutable default arguments are evaluated once and shared between calls. · _Level:_ analyze

### Phase project — Build: File Organizer Script (`py-p1`)

- **Objective:** Write a safe, idempotent script that organises files by type.
- **Problem:** Download folders become disorganised and hard to navigate.
- **Audience:** Anyone with a messy downloads or documents folder.
- **Required functionality:**
  - Scan a folder
  - Move files into type-based folders
  - Log actions
  - Dry-run mode
- **Constraints:**
  - Idempotent
  - Never delete data
  - Handle missing folders
- **Acceptance criteria (brief):**
  - Re-running changes nothing
  - A dry run reports without moving
  - Missing folder does not crash
- **Required evidence:**
  - Repository with README
  - Sample log output
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Re-running changes nothing (weight 1)
  - A dry run reports without moving (weight 1)
  - Missing folder does not crash (weight 1)
- **Acceptance criteria (contract):**
  - Re-running changes nothing
  - A dry run reports without moving
  - Missing folder does not crash

### Recorded uncertainties
- 2 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Intermediate Python

**Objective:** Use object-oriented and idiomatic Python to write reusable, well-structured code.

**Success criteria:**
- Model problems with classes
- Use comprehensions and generators
- Organise code into modules and virtual environments

### Instruction

These concepts separate beginners from developers. OOP is especially important for real projects.

OBJECTIVE
Use object-oriented and idiomatic Python to write reusable, well-structured code.

SUCCESS CRITERIA
• Model problems with classes
• Use comprehensions and generators
• Organise code into modules and virtual environments

WORKED EXAMPLE
Model inventory with a class. Step 1: `__init__` stores a `dict` of item to quantity. Step 2: `add(item, n)` and `remove(item, n)` update the dict, raising a clear error on missing items or negative stock. Step 3: `__repr__` returns a readable summary. Step 4: write three asserts covering add, remove, and the error case.

COMMON MISTAKES
• Over-using classes where functions suffice
• Building whole lists in memory instead of generators
• Installing packages globally without a virtual environment

### Worked example

Model inventory with a class. Step 1: `__init__` stores a `dict` of item to quantity. Step 2: `add(item, n)` and `remove(item, n)` update the dict, raising a clear error on missing items or negative stock. Step 3: `__repr__` returns a readable summary. Step 4: write three asserts covering add, remove, and the error case.

### Common mistakes
- Over-using classes where functions suffice
- Building whole lists in memory instead of generators
- Installing packages globally without a virtual environment

### Ungraded practice
**Practice: Intermediate Python**

DO THIS NOW
Refactor a scripts file into a small package: one module for data handling, one for logic, and a main entry point. Use type hints and at least one comprehension.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does a generator function return when called?
   - A list
   - **✔ An iterator that yields values lazily**
   - A tuple
   - A string
   - _Answer:_ An iterator that yields values lazily · _Why:_ Generators produce values lazily via yield, saving memory. · _Level:_ understand

2. Which comprehension squares only the even numbers in nums?
   - [n for n in nums if n % 2 == 0]
   - **✔ [n*n for n in nums if n % 2 == 0]**
   - [n for n in nums]
   - [n*n for n in nums]
   - _Answer:_ [n*n for n in nums if n % 2 == 0] · _Why:_ It filters evens and squares each. · _Level:_ apply

3. Why use a virtual environment per project?
   - It is required by Python
   - **✔ To isolate dependencies so projects do not conflict**
   - To speed up imports
   - To compile Python
   - _Answer:_ To isolate dependencies so projects do not conflict · _Why:_ Virtual environments isolate package versions between projects. · _Level:_ understand

### Phase project — Build: Web Scraper (`py-p2`)

- **Objective:** Complete "Web Scraper" to a standard you can show and explain to someone else.
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
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Python for the Web

**Objective:** Build and document a Python web API with a database, authentication and async support.

**Success criteria:**
- Define FastAPI routes with request models
- Persist data through an ORM
- Protect routes with authentication
- Rely on generated API docs

### Instruction

Build real APIs. FastAPI is the modern choice, fast, typed, with beautiful automatic docs.

OBJECTIVE
Build and document a Python web API with a database, authentication and async support.

SUCCESS CRITERIA
• Define FastAPI routes with request models
• Persist data through an ORM
• Protect routes with authentication
• Rely on generated API docs

WORKED EXAMPLE
Build a small web endpoint. Step 1: create a route `GET /items` that queries the database and returns JSON with 200. Step 2: add `POST /items` that validates the payload and returns 201 with the created record. Step 3: return 404 for an unknown id. Step 4: use the framework test client to assert each status code.

COMMON MISTAKES
• Skipping request validation
• Blocking the event loop with synchronous I/O in async routes
• Returning ORM objects without serialisation

### Worked example

Build a small web endpoint. Step 1: create a route `GET /items` that queries the database and returns JSON with 200. Step 2: add `POST /items` that validates the payload and returns 201 with the created record. Step 3: return 404 for an unknown id. Step 4: use the framework test client to assert each status code.

### Common mistakes
- Skipping request validation
- Blocking the event loop with synchronous I/O in async routes
- Returning ORM objects without serialisation

### Ungraded practice
**Practice: Python for the Web**

DO THIS NOW
Build a small FastAPI service backed by SQLite/Postgres with two resources, input models, and a protected route. Confirm the generated /docs page works.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does FastAPI generate automatically from your type hints and models?
   - A database
   - **✔ Interactive OpenAPI documentation**
   - A frontend
   - Unit tests
   - _Answer:_ Interactive OpenAPI documentation · _Why:_ FastAPI derives interactive OpenAPI docs from models and type hints. · _Level:_ understand

2. What is a risk of calling blocking database code inside an async route?
   - Nothing
   - **✔ It blocks the event loop and hurts concurrency**
   - It deletes data
   - It is faster
   - _Answer:_ It blocks the event loop and hurts concurrency · _Why:_ Blocking calls in async handlers stall other requests. · _Level:_ analyze

3. Where should input validation happen for a FastAPI endpoint?
   - Only in the browser
   - **✔ In a Pydantic model declared on the endpoint**
   - In the CSS
   - In the database schema only
   - _Answer:_ In a Pydantic model declared on the endpoint · _Why:_ Pydantic models validate and coerce input at the boundary. · _Level:_ apply

### Phase project — Build: REST API with FastAPI (`py-p3`)

- **Objective:** Build a FastAPI service with validation, a database and auth.
- **Problem:** A service needs a documented HTTP API.
- **Audience:** Client applications.
- **Required functionality:**
  - Two resources
  - Pydantic validation
  - Database persistence
  - One protected route
- **Constraints:**
  - Server-side validation
  - Generated docs available
- **Acceptance criteria (brief):**
  - Invalid input returns 422/400
  - /docs works
  - Protected route returns 401 without a token
- **Required evidence:**
  - Repository
  - Screenshot of /docs
  - README
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Invalid input returns 422/400 (weight 1)
  - /docs works (weight 1)
  - Protected route returns 401 without a token (weight 1)
- **Acceptance criteria (contract):**
  - Invalid input returns 422/400
  - /docs works
  - Protected route returns 401 without a token

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Automation & Scripting

**Objective:** Automate repetitive tasks with Python: files, scraping, documents and scheduling.

**Success criteria:**
- Traverse and transform files
- Scrape structured data responsibly
- Generate documents and spreadsheets
- Schedule recurring jobs

### Instruction

Python excels at automating repetitive tasks. Build tools that save hours every week.

OBJECTIVE
Automate repetitive tasks with Python: files, scraping, documents and scheduling.

SUCCESS CRITERIA
• Traverse and transform files
• Scrape structured data responsibly
• Generate documents and spreadsheets
• Schedule recurring jobs

WORKED EXAMPLE
Automate a folder. Step 1: iterate over `Path(folder).glob("*.csv")`. Step 2: transform each file with a pure function. Step 3: move processed files into a `done/` subfolder. Step 4: log any failure to `errors.log` with the filename. Confirm the script is safe to run twice on the same input without duplicating work.

COMMON MISTAKES
• Not making scripts idempotent
• Ignoring rate limits and robots.txt when scraping
• Overwriting data without a backup

### Worked example

Automate a folder. Step 1: iterate over `Path(folder).glob("*.csv")`. Step 2: transform each file with a pure function. Step 3: move processed files into a `done/` subfolder. Step 4: log any failure to `errors.log` with the filename. Confirm the script is safe to run twice on the same input without duplicating work.

### Common mistakes
- Not making scripts idempotent
- Ignoring rate limits and robots.txt when scraping
- Overwriting data without a backup

### Ungraded practice
**Practice: Automation & Scripting**

DO THIS NOW
Write an automation that renames and organises a folder of files by type, logs the actions, and can be run safely twice without making a mess.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Why should an automation script be idempotent?
   - To run faster
   - **✔ So running it twice does not corrupt or duplicate work**
   - To avoid imports
   - To use less memory
   - _Answer:_ So running it twice does not corrupt or duplicate work · _Why:_ Idempotent scripts can be safely re-run, which is essential for reliability. · _Level:_ apply

2. What should you check before scraping a site at scale?
   - Its colour scheme
   - **✔ robots.txt and terms, and whether an API is offered**
   - The font
   - The page count only
   - _Answer:_ robots.txt and terms, and whether an API is offered · _Why:_ Respect robots.txt/terms and prefer official APIs. · _Level:_ evaluate

3. Which library writes Excel files in Python?
   - requests
   - **✔ openpyxl**
   - pytest
   - click
   - _Answer:_ openpyxl · _Why:_ openpyxl reads and writes .xlsx files. · _Level:_ recall

### Phase project — Build: PDF Report Generator (`py-p4`)

- **Objective:** Complete "PDF Report Generator" to a standard you can show and explain to someone else.
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

## Stage 5 — Python + AI

**Objective:** Integrate AI services into Python applications with clear prompting and sensible limits.

**Success criteria:**
- Call an AI API safely
- Structure prompts and validate responses
- Handle cost, latency and failure

### Instruction

Python is the dominant language of AI. Learn to build applications that use LLMs as their backbone.

OBJECTIVE
Integrate AI services into Python applications with clear prompting and sensible limits.

SUCCESS CRITERIA
• Call an AI API safely
• Structure prompts and validate responses
• Handle cost, latency and failure

WORKED EXAMPLE
Call a model for classification. Step 1: define a strict output contract (JSON with `label` and `confidence`). Step 2: request that shape explicitly. Step 3: validate the response and treat out-of-schema output as a failure. Step 4: retry once, then give up gracefully — and log the raw response for every rejection so you can see why it failed.

COMMON MISTAKES
• Hard-coding API keys
• Trusting model output without validation
• Ignoring token cost and rate limits

### Worked example

Call a model for classification. Step 1: define a strict output contract (JSON with `label` and `confidence`). Step 2: request that shape explicitly. Step 3: validate the response and treat out-of-schema output as a failure. Step 4: retry once, then give up gracefully — and log the raw response for every rejection so you can see why it failed.

### Common mistakes
- Hard-coding API keys
- Trusting model output without validation
- Ignoring token cost and rate limits

### Ungraded practice
**Practice: Python + AI**

DO THIS NOW
Build a small CLI that sends a prompt to an AI API, validates the response, and handles a network error and a rate-limit error with useful messages.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Where should an AI API key live?
   - In the source code
   - **✔ In an environment variable or secret manager**
   - In the README
   - In a public gist
   - _Answer:_ In an environment variable or secret manager · _Why:_ Secrets belong in environment variables or a secret manager, never in source. · _Level:_ apply

2. The model returns unstructured text you need as JSON. What is the safest approach?
   - Assume it is valid JSON
   - **✔ Parse defensively and validate the fields you rely on**
   - eval() the string
   - Ignore errors
   - _Answer:_ Parse defensively and validate the fields you rely on · _Why:_ Always parse and validate model output; it can be malformed. · _Level:_ analyze

3. Why should AI calls have timeouts and retries with backoff?
   - To increase cost
   - **✔ Because the service can be slow or rate-limited, and you should fail gracefully**
   - To hide errors
   - To slow the app
   - _Answer:_ Because the service can be slow or rate-limited, and you should fail gracefully · _Why:_ Timeouts and bounded retries keep the app responsive under provider issues. · _Level:_ understand

### Phase project — Build: Telegram Bot (`py-p5`)

- **Objective:** Complete "Telegram Bot" to a standard you can show and explain to someone else.
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

### Phase project — Portfolio project: AI Chatbot API (`py-p6`)

- **Objective:** Complete "AI Chatbot API" to a standard you can show and explain to someone else.
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
