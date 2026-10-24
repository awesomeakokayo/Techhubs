# Backend Development (`backend`)

Slug: `backend-development` · Category: build · Stages: 5

## Stage 1 — Foundations

**Objective:** Explain how the web works and run a first backend program with HTTP and version control.

**Success criteria:**
- Describe the request/response cycle
- Run a minimal server or script
- Use Git and a terminal confidently

### Instruction

Understand how web servers communicate and pick your first backend language.

OBJECTIVE
Explain how the web works and run a first backend program with HTTP and version control.

SUCCESS CRITERIA
• Describe the request/response cycle
• Run a minimal server or script
• Use Git and a terminal confidently

WORKED EXAMPLE
Handle a request cleanly. Step 1: read the method, path and body. Step 2: validate the body against a schema and reject invalid input early. Step 3: call a service function that contains the business logic. Step 4: map the result or a domain error to a status code (400/404/409/500) and return JSON. Keep validation and logic out of the route handler.

COMMON MISTAKES
• Confusing HTTP methods with actions
• Committing secrets or node_modules
• Not understanding that the server is stateless between requests

### Worked example

Handle a request cleanly. Step 1: read the method, path and body. Step 2: validate the body against a schema and reject invalid input early. Step 3: call a service function that contains the business logic. Step 4: map the result or a domain error to a status code (400/404/409/500) and return JSON. Keep validation and logic out of the route handler.

### Common mistakes
- Confusing HTTP methods with actions
- Committing secrets or node_modules
- Not understanding that the server is stateless between requests

### Ungraded practice
**Practice: Foundations**

DO THIS NOW
Start a minimal HTTP server that returns JSON for two routes (for example /health and /time). Request both with curl and commit the code in a Git repository.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which HTTP method is intended to retrieve data without changing server state?
   - POST
   - **✔ GET**
   - DELETE
   - PATCH
   - _Answer:_ GET · _Why:_ GET retrieves a representation and should not change server state. · _Level:_ understand

2. What does HTTP status 201 usually mean?
   - The request failed
   - **✔ A new resource was created**
   - The server is busy
   - Redirect to login
   - _Answer:_ A new resource was created · _Why:_ 201 Created is returned after a resource is successfully created, typically after POST. · _Level:_ understand

3. Why should secrets never be committed to Git?
   - They slow the repository
   - **✔ Git history is durable and the secret cannot be reliably removed once shared**
   - Git cannot store them
   - They increase build time
   - _Answer:_ Git history is durable and the secret cannot be reliably removed once shared · _Why:_ Once a secret is committed it persists in history and is compromised. · _Level:_ evaluate

### Phase project — Build: Blog REST API (`be-p1`)

- **Objective:** Build a REST API with CRUD for posts and correct status codes.
- **Problem:** A blog needs an API to create and read posts.
- **Audience:** A frontend or mobile client.
- **Required functionality:**
  - List, create, read, update, delete posts
  - Validation
  - Consistent JSON errors
- **Constraints:**
  - No secrets committed
  - Input validated server-side
- **Acceptance criteria (brief):**
  - CRUD works via curl/Postman
  - Invalid input returns 400
  - Missing record returns 404
  - No secrets in the repo
- **Required evidence:**
  - Repository
  - README with endpoint examples and sample responses
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - CRUD works via curl/Postman (weight 1)
  - Invalid input returns 400 (weight 1)
  - Missing record returns 404 (weight 1)
  - No secrets in the repo (weight 1)
- **Acceptance criteria (contract):**
  - CRUD works via curl/Postman
  - Invalid input returns 400
  - Missing record returns 404
  - No secrets in the repo

### Recorded uncertainties
- 3 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Core Backend

**Objective:** Design and implement a REST API with authentication, validation and correct error handling.

**Success criteria:**
- Design resource-oriented routes
- Hash passwords and issue tokens
- Validate input and return correct status codes

### Instruction

Build real APIs. Handle requests, manage authentication, and structure your application cleanly.

OBJECTIVE
Design and implement a REST API with authentication, validation and correct error handling.

SUCCESS CRITERIA
• Design resource-oriented routes
• Hash passwords and issue tokens
• Validate input and return correct status codes

WORKED EXAMPLE
Design `POST /orders`. Step 1: define the request schema (items, quantities, customer). Step 2: reject an empty cart with 422 and a field-level message. Step 3: create the order and return 201 with a `Location` header pointing at the new resource. Step 4: accept a client-supplied idempotency key so a retried request does not create a duplicate order.

COMMON MISTAKES
• Storing passwords in plain text
• Returning 200 for errors
• Trusting client-supplied data without validation

### Worked example

Design `POST /orders`. Step 1: define the request schema (items, quantities, customer). Step 2: reject an empty cart with 422 and a field-level message. Step 3: create the order and return 201 with a `Location` header pointing at the new resource. Step 4: accept a client-supplied idempotency key so a retried request does not create a duplicate order.

### Common mistakes
- Storing passwords in plain text
- Returning 200 for errors
- Trusting client-supplied data without validation

### Ungraded practice
**Practice: Core Backend**

DO THIS NOW
Build a small REST API with two resources. Add input validation, return 400 for bad input, 401 for missing auth, and 404 for missing records. Document the endpoints in a README.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. How should user passwords be stored?
   - Plain text
   - Reversibly encrypted
   - **✔ Salted and hashed with a slow algorithm such as bcrypt/argon2**
   - Base64-encoded
   - _Answer:_ Salted and hashed with a slow algorithm such as bcrypt/argon2 · _Why:_ Passwords must be salted and hashed with a deliberately slow algorithm. · _Level:_ apply

2. A client sends an invalid email to a registration endpoint. Which response is correct?
   - 200 with an error message
   - **✔ 400 with a clear validation message**
   - 500 internal error
   - 204 no content
   - _Answer:_ 400 with a clear validation message · _Why:_ Invalid client input is a 400-class error with a useful message. · _Level:_ apply

3. What is the primary purpose of input validation on the server?
   - To speed up the database
   - **✔ To protect the system from malformed or malicious data even if the client is bypassed**
   - To reduce bundle size
   - To format JSON
   - _Answer:_ To protect the system from malformed or malicious data even if the client is bypassed · _Why:_ Server-side validation is the trust boundary; the client cannot be trusted. · _Level:_ understand

### Phase project — Build: User Auth System (`be-p2`)

- **Objective:** Implement registration, login, hashing and protected routes.
- **Problem:** An application needs secure accounts.
- **Audience:** End users signing up and logging in.
- **Required functionality:**
  - Register
  - Login
  - Hashed passwords
  - Protected endpoint requiring a token
- **Constraints:**
  - Never store plaintext passwords
  - Do not leak whether an email exists
- **Acceptance criteria (brief):**
  - Passwords are salted and hashed
  - Invalid credentials are rejected
  - Protected route returns 401 without a token
- **Required evidence:**
  - Repository
  - A short security note explaining your choices
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Passwords are salted and hashed (weight 1)
  - Invalid credentials are rejected (weight 1)
  - Protected route returns 401 without a token (weight 1)
- **Acceptance criteria (contract):**
  - Passwords are salted and hashed
  - Invalid credentials are rejected
  - Protected route returns 401 without a token

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 2 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Databases

**Objective:** Model data and query a relational database safely and efficiently.

**Success criteria:**
- Design normalised tables with keys
- Write SELECTs with joins and aggregation
- Explain an index and when it helps

### Instruction

Data is the heart of every application. Design schemas, query efficiently, and connect databases to your APIs.

OBJECTIVE
Model data and query a relational database safely and efficiently.

SUCCESS CRITERIA
• Design normalised tables with keys
• Write SELECTs with joins and aggregation
• Explain an index and when it helps

WORKED EXAMPLE
Model orders and line items. Step 1: create `users`, then `orders` with a foreign key to `users`. Step 2: create `order_items` referencing both `orders` and a `products` table. Step 3: add indexes on the foreign-key columns and on the column you filter by. Step 4: run `EXPLAIN` on your main query and confirm it uses the index rather than a full scan.

COMMON MISTAKES
• Storing duplicate data across tables
• Using SELECT * in production queries
• Assuming an index always helps — it slows writes and adds storage

### Worked example

Model orders and line items. Step 1: create `users`, then `orders` with a foreign key to `users`. Step 2: create `order_items` referencing both `orders` and a `products` table. Step 3: add indexes on the foreign-key columns and on the column you filter by. Step 4: run `EXPLAIN` on your main query and confirm it uses the index rather than a full scan.

### Common mistakes
- Storing duplicate data across tables
- Using SELECT * in production queries
- Assuming an index always helps — it slows writes and adds storage

### Ungraded practice
**Practice: Databases**

DO THIS NOW
Design a schema for a small blog (users, posts, comments). Write queries for: posts by author, a post with its comments, and the count of posts per author. Add one index and explain what it speeds up.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which query returns each author with the number of posts they wrote?
   - SELECT * FROM posts
   - **✔ SELECT author_id, COUNT(*) FROM posts GROUP BY author_id**
   - SELECT COUNT(*) FROM users
   - SELECT author_id FROM posts ORDER BY author_id
   - _Answer:_ SELECT author_id, COUNT(*) FROM posts GROUP BY author_id · _Why:_ GROUP BY author_id with COUNT aggregates one row per author. · _Level:_ apply

2. What does a foreign key enforce?
   - Faster reads
   - **✔ That a referenced row exists in the related table**
   - Alphabetical ordering
   - Unique passwords
   - _Answer:_ That a referenced row exists in the related table · _Why:_ A foreign key enforces referential integrity between tables. · _Level:_ understand

3. When does adding an index hurt?
   - Never
   - When the column is queried often
   - **✔ On write-heavy tables, because every insert/update must maintain the index**
   - When the table is small and read-only
   - _Answer:_ On write-heavy tables, because every insert/update must maintain the index · _Why:_ Indexes speed reads but add overhead to writes and storage. · _Level:_ analyze

### Phase project — Build: URL Shortener (`be-p3`)

- **Objective:** Build a URL shortener with a database and redirects.
- **Problem:** Long links are unwieldy to share.
- **Audience:** Anyone sharing links.
- **Required functionality:**
  - Create a short code for a URL
  - Redirect short code to target
  - Track click count
- **Constraints:**
  - Unique codes
  - Validate the target URL
- **Acceptance criteria (brief):**
  - Short links redirect correctly
  - Invalid URLs are rejected
  - Codes are unique
- **Required evidence:**
  - Repository
  - README with example create + redirect
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Short links redirect correctly (weight 1)
  - Invalid URLs are rejected (weight 1)
  - Codes are unique (weight 1)
- **Acceptance criteria (contract):**
  - Short links redirect correctly
  - Invalid URLs are rejected
  - Codes are unique

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Advanced Backend

**Objective:** Apply advanced backend patterns: caching, background work, real-time transport and rate limiting.

**Success criteria:**
- Explain when to cache
- Move slow work to a background job
- Choose the right transport for real-time features
- Protect endpoints with rate limiting

### Instruction

Level up your APIs with performance patterns and real-time features.

OBJECTIVE
Apply advanced backend patterns: caching, background work, real-time transport and rate limiting.

SUCCESS CRITERIA
• Explain when to cache
• Move slow work to a background job
• Choose the right transport for real-time features
• Protect endpoints with rate limiting

WORKED EXAMPLE
Add caching to a read endpoint. Step 1: build a cache key from the input (path + query). Step 2: check the cache; on a hit, return immediately. Step 3: on a miss, query the database, store the result with a TTL, and return it. Step 4: on any write that affects the data, invalidate the matching key. Verify a second identical read is served from cache.

COMMON MISTAKES
• Caching data that must always be fresh
• Doing CPU-heavy work inside a request
• Adding WebSockets where polling was sufficient

### Worked example

Add caching to a read endpoint. Step 1: build a cache key from the input (path + query). Step 2: check the cache; on a hit, return immediately. Step 3: on a miss, query the database, store the result with a TTL, and return it. Step 4: on any write that affects the data, invalidate the matching key. Verify a second identical read is served from cache.

### Common mistakes
- Caching data that must always be fresh
- Doing CPU-heavy work inside a request
- Adding WebSockets where polling was sufficient

### Ungraded practice
**Practice: Advanced Backend**

DO THIS NOW
Add caching to an expensive endpoint with a clear expiry, move a slow task to a background job, and add rate limiting to your login route. Explain each decision in one paragraph.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which data is a poor candidate for aggressive caching?
   - A public list of countries
   - **✔ A user’s current account balance**
   - Static documentation
   - A daily leaderboard
   - _Answer:_ A user’s current account balance · _Why:_ Data that must be immediately accurate, like a balance, should not be served from a stale cache. · _Level:_ analyze

2. Why move image processing out of the request cycle?
   - To make it slower
   - **✔ To keep responses fast and avoid timeouts under load**
   - Because databases cannot store images
   - To reduce code size
   - _Answer:_ To keep responses fast and avoid timeouts under load · _Why:_ Long tasks should run in the background so requests stay responsive and do not time out. · _Level:_ apply

3. What is the main purpose of rate limiting?
   - Increase bandwidth
   - **✔ Protect the service from abuse and accidental overload**
   - Encrypt traffic
   - Compress responses
   - _Answer:_ Protect the service from abuse and accidental overload · _Why:_ Rate limiting caps request frequency to protect availability and fairness. · _Level:_ understand

### Phase project — Build: Real-time Chat Backend (`be-p4`)

- **Objective:** Build a real-time backend with authentication and message persistence.
- **Problem:** Users want to message each other in real time.
- **Audience:** Collaborating users.
- **Required functionality:**
  - Authenticated connection
  - Send/receive messages
  - Persist history
- **Constraints:**
  - Authenticate the socket
  - Validate messages
  - Rate limit
- **Acceptance criteria (brief):**
  - Messages deliver in real time
  - Unauthenticated clients are rejected
  - History persists
- **Required evidence:**
  - Repository
  - Short demo video or GIF
  - Architecture note
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Messages deliver in real time (weight 1)
  - Unauthenticated clients are rejected (weight 1)
  - History persists (weight 1)
- **Acceptance criteria (contract):**
  - Messages deliver in real time
  - Unauthenticated clients are rejected
  - History persists

### Recorded uncertainties
- 2 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — Deployment

**Objective:** Containerise, configure and deploy a backend service with a repeatable pipeline.

**Success criteria:**
- Containerise an app with Docker
- Manage configuration with environment variables
- Deploy with a CI/CD pipeline

### Instruction

Get your APIs live. Learn containerization and deployment pipelines.

OBJECTIVE
Containerise, configure and deploy a backend service with a repeatable pipeline.

SUCCESS CRITERIA
• Containerise an app with Docker
• Manage configuration with environment variables
• Deploy with a CI/CD pipeline

WORKED EXAMPLE
Containerise and deploy the API. Step 1: write a multi-stage Dockerfile that builds then runs as a non-root user. Step 2: pass all configuration through environment variables and document each one. Step 3: add a `/health` route. Step 4: run database migrations as a release step, not at container start-up, and confirm the app boots from a clean environment using only the documented variables.

COMMON MISTAKES
• Baking secrets into the image
• Using a huge base image
• Deploying without running tests first

### Worked example

Containerise and deploy the API. Step 1: write a multi-stage Dockerfile that builds then runs as a non-root user. Step 2: pass all configuration through environment variables and document each one. Step 3: add a `/health` route. Step 4: run database migrations as a release step, not at container start-up, and confirm the app boots from a clean environment using only the documented variables.

### Common mistakes
- Baking secrets into the image
- Using a huge base image
- Deploying without running tests first

### Ungraded practice
**Practice: Deployment**

DO THIS NOW
Write a Dockerfile for one of your APIs, run it locally with an environment file, and set up a simple CI workflow that installs dependencies and runs the tests on every push.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. How should a database URL reach a containerised app?
   - Hard-coded in the Dockerfile
   - **✔ Passed as an environment variable at run time**
   - Committed in a .env file
   - Written into the image layer
   - _Answer:_ Passed as an environment variable at run time · _Why:_ Configuration belongs in environment variables, not the image. · _Level:_ apply

2. What is a CI pipeline for?
   - Replacing developers
   - **✔ Automatically running checks such as tests before changes are merged or deployed**
   - Hosting the database
   - Designing the UI
   - _Answer:_ Automatically running checks such as tests before changes are merged or deployed · _Why:_ CI runs automated checks so problems are caught before shipping. · _Level:_ understand

3. Why prefer a small base image?
   - **✔ Larger attack surface and slower pulls with a big image**
   - Smaller images are always faster to code
   - It changes the language
   - It removes the need for tests
   - _Answer:_ Larger attack surface and slower pulls with a big image · _Why:_ Smaller images reduce the attack surface and deploy faster. · _Level:_ analyze

### Phase project — Portfolio project: AI-Powered API (`be-p5`)

- **Objective:** Complete "AI-Powered API" to a standard you can show and explain to someone else.
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
