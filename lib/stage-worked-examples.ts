/**
 * Worked, step-by-step examples for non-AI stages.
 *
 * The curriculum-quality audit tracks whether each stage shows a worked example
 * (a concrete demonstration of the skill in use), because a definition alone is
 * not enough to prepare a learner for the stage's practice and knowledge check.
 * The AI tracks carry their worked examples in `lib/ai-stage-lessons.ts`; this
 * module brings the same accountability to the authored non-AI tracks.
 *
 * Rules:
 *   - The example demonstrates the stage's objective with concrete steps, not a
 *     restatement of the objective.
 *   - It is answerable from the stage material; it introduces no new tool the
 *     stage does not teach.
 *   - It is short enough to read in a couple of minutes.
 *
 * `lib/guided-path.ts` renders it into the stage's concept step, so the learner
 * sees it, and the audit scores it.
 */
export const STAGE_WORKED_EXAMPLES: Record<string, Record<number, string>> = {
  frontend: {
    1: 'Build a responsive pricing card. Step 1: structure the markup semantically — `<section>`, `<h2>`, a `<ul>` of features and an `<a>` action. Step 2: apply a single-column flex layout with a max-width. Step 3: add `@media (min-width: 640px)` that switches to a row. Step 4: check 375px and 1280px — the card must never cause horizontal scroll and every control must be keyboard reachable.',
    2: 'Filter and render a product list. Step 1: hold the raw `products` array and a `maxPrice` value. Step 2: derive results with `const visible = products.filter((p) => p.inStock && p.price <= maxPrice)`. Step 3: render each item with `.map()` into template strings and `join("")`. Step 4: log `visible` before rendering to confirm the transform. Notice the derived data is computed, never mutated.',
    3: 'Add a searchable list in React. Step 1: hold `query` in `useState`. Step 2: derive `const results = useMemo(() => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())), [items, query])`. Step 3: bind the input to `query` and render `results`. Step 4: type in the box and confirm results change without `items` being modified — if it changes, you are mutating state.',
    4: 'Debug a failing test. Step 1: read the assertion message and reproduce the failure locally. Step 2: reduce the input to the smallest case that still fails. Step 3: form one hypothesis and change one thing only. Step 4: re-run. If it passes, commit with a message stating the cause; if not, revert before trying the next hypothesis so you never stack unrelated changes.',
    5: 'Use AI to scaffold, then own the result. Step 1: prompt for a small component with explicit requirements. Step 2: read every line it returns and look for invented props or imports. Step 3: fix accessibility (labels, focus, contrast) and add one test. Step 4: if you cannot explain a line, delete it and rewrite it yourself — the AI draft is input, not the deliverable.',
  },
  backend: {
    1: 'Handle a request cleanly. Step 1: read the method, path and body. Step 2: validate the body against a schema and reject invalid input early. Step 3: call a service function that contains the business logic. Step 4: map the result or a domain error to a status code (400/404/409/500) and return JSON. Keep validation and logic out of the route handler.',
    2: 'Design `POST /orders`. Step 1: define the request schema (items, quantities, customer). Step 2: reject an empty cart with 422 and a field-level message. Step 3: create the order and return 201 with a `Location` header pointing at the new resource. Step 4: accept a client-supplied idempotency key so a retried request does not create a duplicate order.',
    3: 'Model orders and line items. Step 1: create `users`, then `orders` with a foreign key to `users`. Step 2: create `order_items` referencing both `orders` and a `products` table. Step 3: add indexes on the foreign-key columns and on the column you filter by. Step 4: run `EXPLAIN` on your main query and confirm it uses the index rather than a full scan.',
    4: 'Add caching to a read endpoint. Step 1: build a cache key from the input (path + query). Step 2: check the cache; on a hit, return immediately. Step 3: on a miss, query the database, store the result with a TTL, and return it. Step 4: on any write that affects the data, invalidate the matching key. Verify a second identical read is served from cache.',
    5: 'Containerise and deploy the API. Step 1: write a multi-stage Dockerfile that builds then runs as a non-root user. Step 2: pass all configuration through environment variables and document each one. Step 3: add a `/health` route. Step 4: run database migrations as a release step, not at container start-up, and confirm the app boots from a clean environment using only the documented variables.',
  },
  python: {
    1: 'Parse a CSV of scores. Step 1: open the file inside `with open(...) as f`. Step 2: for each line, `strip()` and `split(",")`. Step 3: convert fields to `int` with a guard that skips blank rows. Step 4: compute the average and print the top three students. Wrap the open in `try/except FileNotFoundError` and print a clear message rather than a traceback.',
    2: 'Model inventory with a class. Step 1: `__init__` stores a `dict` of item to quantity. Step 2: `add(item, n)` and `remove(item, n)` update the dict, raising a clear error on missing items or negative stock. Step 3: `__repr__` returns a readable summary. Step 4: write three asserts covering add, remove, and the error case.',
    3: 'Build a small web endpoint. Step 1: create a route `GET /items` that queries the database and returns JSON with 200. Step 2: add `POST /items` that validates the payload and returns 201 with the created record. Step 3: return 404 for an unknown id. Step 4: use the framework test client to assert each status code.',
    4: 'Automate a folder. Step 1: iterate over `Path(folder).glob("*.csv")`. Step 2: transform each file with a pure function. Step 3: move processed files into a `done/` subfolder. Step 4: log any failure to `errors.log` with the filename. Confirm the script is safe to run twice on the same input without duplicating work.',
    5: 'Call a model for classification. Step 1: define a strict output contract (JSON with `label` and `confidence`). Step 2: request that shape explicitly. Step 3: validate the response and treat out-of-schema output as a failure. Step 4: retry once, then give up gracefully — and log the raw response for every rejection so you can see why it failed.',
  },
  uiux: {
    1: 'Design a login screen. Step 1: pick a 4-pt spacing scale and use only those values. Step 2: choose two text sizes and one accent colour. Step 3: align the form fields to a single axis with consistent gaps. Step 4: add visible focus states and check body-text contrast against 4.5:1.',
    2: 'Turn a complaint into a journey map. Step 1: write the user\'s goal. Step 2: list each step they took, in order. Step 3: mark the emotion and the exact point they dropped off. Step 4: write one problem statement — "New users cannot find X because Y" — that the design will address.',
    3: 'Build a button component in Figma. Step 1: create variants for default, hover and disabled. Step 2: use auto-layout with padding and gap tokens. Step 3: place instances on a screen. Step 4: change the variant property once and confirm every instance updates — if it does not, your instances are detached.',
    4: 'Run a five-task usability test. Step 1: give each participant a goal, not instructions. Step 2: record completion, time and where they hesitate. Step 3: note verbatim quotes for each friction point. Step 4: prioritise the fixes by severity (blocker, major, minor) and state the evidence for each rating.',
    5: 'Turn a project into a case study. Step 1: state the problem and the constraints. Step 2: show two alternative directions you rejected and why. Step 3: present the final design. Step 4: give the outcome — a metric, a quote, or a clearly labelled expected effect. Show the reasoning, not just the mockups.',
  },
  data: {
    1: 'Clean a messy sales sheet. Step 1: remove duplicate rows. Step 2: trim whitespace and standardise date formats. Step 3: build a pivot of revenue by month with a chart. Step 4: add a data-validation rule that prevents future bad dates from being entered. Record how many rows each cleaning step removed.',
    2: 'Answer "top customers by revenue". Step 1: start from `orders` and join `customers` on `customer_id`. Step 2: filter to paid orders with `WHERE status = \'paid\'`. Step 3: `GROUP BY customer_id` and `SUM(amount)`. Step 4: `ORDER BY` the total descending and `LIMIT 10`. Run it with and without the filter and explain why the ranking differs.',
    3: 'Analyse a dataset with pandas. Step 1: load the CSV and print `dtypes` and a missing-value count. Step 2: handle missing values deliberately — drop or fill, and say which. Step 3: compute a group-by mean and plot it. Step 4: write one sentence on how each cleaning decision could bias the result.',
    4: 'Build a one-page dashboard. Step 1: choose one headline metric. Step 2: add one trend line over time. Step 3: add one breakdown by segment. Step 4: remove any element that does not change a decision, and label every axis with its unit.',
    5: 'Compare two groups. Step 1: state the null hypothesis. Step 2: check the sample sizes are adequate. Step 3: run the appropriate test and note its assumptions. Step 4: report the effect size and confidence interval — not just the p-value — and state any assumption you could not verify.',
  },
  qa: {
    1: 'Write test cases for a password field. Step 1: valid password (happy path). Step 2: too short (boundary, exactly one below the minimum). Step 3: missing a required character class. Step 4: confirmation that does not match. For each, record input, expected result, and priority.',
    2: 'Test `POST /users` with a tool like Postman. Step 1: send a valid payload and assert 201. Step 2: send a duplicate email and assert 409. Step 3: omit a required field and assert 422 with a field message. Step 4: save all three in a collection so the checks are repeatable.',
    3: 'Automate a login flow with Playwright. Step 1: navigate to the page. Step 2: fill credentials from a fixture, not literals. Step 3: assert the dashboard heading is visible. Step 4: run it in CI. Use role/text selectors so a CSS refactor does not break the test.',
    4: 'Assess release risk. Step 1: list the features that changed. Step 2: score each by user impact and size of change. Step 3: assign test depth to match the risk. Step 4: write down what you deliberately did not test and why, so the gap is a decision rather than an oversight.',
  },
  cyber: {
    1: 'Trace a request end to end. Step 1: resolve the hostname with `nslookup`. Step 2: capture the TCP handshake to port 443. Step 3: observe the TLS negotiation. Step 4: read the HTTP response. Annotate what each layer proves — against a host you own or are authorised to test.',
    2: 'Apply STRIDE to a login feature. Step 1: Spoofing — can an attacker impersonate a user? Step 2: Tampering — can the request be altered in flight? Step 3: Repudiation, Information disclosure, Denial of service, Elevation. Step 4: name one concrete control per category and the threat it removes.',
    3: 'Practise in an authorised lab. Step 1: define the scope and confirm written authorisation. Step 2: enumerate the target\'s services. Step 3: identify and exploit a known vulnerability to demonstrate impact. Step 4: document the exact method and the remediation that closes it. Never test a system you do not have permission to test.',
    4: 'Harden a host. Step 1: disable services you do not need. Step 2: enforce least-privilege accounts. Step 3: enable logging for authentication and privilege changes. Step 4: configure one alert for a suspicious event and then trigger it to confirm it fires.',
  },
  mobile: {
    1: 'Prove your edit-run loop. Step 1: install the SDK and create an empty app. Step 2: run it on a simulator or device. Step 3: change one visible string. Step 4: hot-reload and confirm the change appears. If this loop is not fast and reliable, stop and fix it before writing features.',
    2: 'Build a list screen. Step 1: fetch the data on mount. Step 2: show a loading state. Step 3: render the items and handle the empty case with a message. Step 4: navigate to a detail screen on tap. Keep state local until two screens genuinely need to share it.',
    3: 'Add auth and a remote list. Step 1: sign the user in and store the session safely. Step 2: write a document to the backend. Step 3: read the list back. Step 4: handle the offline/error case with a clear message. Never embed privileged keys in the app bundle.',
    4: 'Prepare a release build. Step 1: add an app icon and splash screen. Step 2: justify every permission you request. Step 3: bump the version and write the store listing. Step 4: produce a signed build and read the store\'s rejection checklist before submitting.',
  },
  video: {
    1: 'Cut a 60-second clip from raw footage. Step 1: import and trim to the best take. Step 2: add a J or L cut so the audio leads or trails the picture smoothly. Step 3: normalise audio levels. Step 4: export at the platform\'s target resolution and bitrate. Watch it back on a phone before exporting again.',
    2: 'Restructure a flat video. Step 1: open with the outcome rather than the setup. Step 2: add a hook in the first five seconds. Step 3: place a pattern interrupt (a cut, a question, a graphic) in the middle. Step 4: end on a clear call to action. Compare the retention curve before and after.',
    3: 'Add a lower-third title. Step 1: create the title graphic. Step 2: keyframe it in and out with matched easing. Step 3: keep it inside the title-safe area. Step 4: export a frame and check it is legible on a phone screen.',
    4: 'Repurpose one edit for two platforms. Step 1: export a vertical 9:16 version with burned-in captions and a faster hook for short-form. Step 2: keep a horizontal 16:9 version for long-form. Step 3: adjust the pacing and the first-three-seconds for each. Step 4: note which version your audience completes more often.',
  },
  marketing: {
    1: 'Write a positioning statement. Step 1: complete the template — "For [audience] who [problem], [product] is a [category] that [benefit], unlike [alternative]." Step 2: add one proof point (a number, a testimonial). Step 3: name one differentiator you can defend. Step 4: read it aloud — if a rival could say the same sentence, it is not positioning.',
    2: 'Plan a channel test. Step 1: pick one channel and one goal. Step 2: define the content and the publishing cadence. Step 3: choose the single metric that tells you whether it worked. Step 4: run it for two weeks and decide scale or stop from the numbers, not the feeling.',
    3: 'Launch a small paid campaign. Step 1: define the audience and the budget. Step 2: create one primary creative and one variant. Step 3: set the conversion event you will optimise for. Step 4: compute the break-even cost per acquisition before you spend a cent.',
    4: 'Build a funnel report. Step 1: list the stages — impressions, clicks, signups, purchases. Step 2: compute each conversion rate. Step 3: identify the weakest step. Step 4: propose one experiment that targets exactly that step, with a success threshold.',
  },
  nocode: {
    1: 'Build a landing page. Step 1: add a hero, benefits and testimonials section. Step 2: connect the signup form to your email list. Step 3: test on a phone width and fix any overflow. Step 4: set the page title and meta description so search and social previews are correct.',
    2: 'Build a two-table app. Step 1: create a tasks collection with a status field. Step 2: add a form that creates a task. Step 3: build a list view filtered to open tasks. Step 4: mark one task complete and confirm it leaves the open view.',
    3: 'Connect a form to a database and a notification. Step 1: on submission, create a record. Step 2: send a confirmation email to the respondent. Step 3: post a message to a team channel. Step 4: add one conditional that routes submissions with missing fields to a review queue instead.',
  },
  fullstack: {
    1: 'Build the frontend half faithfully. Step 1: follow the design\'s structure with semantic HTML. Step 2: lay it out so it holds at 375px and 1280px. Step 3: wire one interactive element to component state. Step 4: keep the data-fetching seam obvious — a single module — so you can swap mocks for the real API later.',
    2: 'Build and document the API. Step 1: define the endpoints and their status codes. Step 2: add request validation. Step 3: persist to a database through a repository layer. Step 4: call every endpoint from a client script and add a request log — do not trust the route file alone.',
    3: 'Connect the two halves. Step 1: fetch the list on load. Step 2: render loading, empty and error states. Step 3: on form submit, POST and update the list optimistically. Step 4: force a 500 response and confirm the UI recovers rather than freezing.',
    4: 'Deploy both halves. Step 1: build the frontend to static assets. Step 2: run the API behind a reverse proxy. Step 3: set environment variables in the host. Step 4: complete one full user flow — sign up, create a record, reload and see it — on the deployed URL.',
    5: 'Add production safeguards. Step 1: add structured logs with request ids. Step 2: add a health endpoint and an error boundary. Step 3: rate-limit the write endpoint. Step 4: write the rollback steps. Trigger one failure deliberately and show the log, alert or boundary that caught it.',
  },
  datascience: {
    1: 'Profile a dataset. Step 1: load it and print column types. Step 2: count missing values per column. Step 3: produce three summary statistics and one distribution plot. Step 4: state one hypothesis the data could test, and what evidence would support it.',
    2: 'Follow a gradient by hand. Step 1: pick a tiny dataset and define the loss as mean squared error. Step 2: choose two candidate weights, compute the loss for each and tabulate them. Step 3: compute the gradient — the slope of the loss with respect to the weight — and note its sign. Step 4: take a small step in the opposite direction, recompute the loss and confirm it fell. Repeat once; you have just run gradient descent, the mathematics behind model training.',
    3: 'Train a baseline classifier. Step 1: split into train and validation. Step 2: fit a simple model. Step 3: report precision and recall on validation, not accuracy alone. Step 4: compare against a majority-class baseline. Do not tune until you have a baseline to beat.',
    4: 'Fine-tune a pretrained model. Step 1: prepare and augment the data. Step 2: freeze the backbone and train the head for a few epochs. Step 3: evaluate on validation. Step 4: inspect the confusion matrix and write down which classes fail most and a plausible reason.',
    5: 'Assemble a portfolio case study. Step 1: state the question. Step 2: describe the data and the method. Step 3: give the result with its uncertainty. Step 4: state the limitation and share the notebook so a reviewer can rerun it end to end.',
  },
  devops: {
    1: 'Write a backup script. Step 1: check the source directory exists. Step 2: create a timestamped archive excluding temp files. Step 3: write a log line for the run. Step 4: exit non-zero on failure. Run it twice and confirm the second run is independent.',
    2: 'Build a CI pipeline. Step 1: install dependencies and cache them. Step 2: lint and test on every push. Step 3: block the merge on failure. Step 4: add a status badge — then deliberately break a test and confirm the pipeline stops the merge.',
    3: 'Containerise a service. Step 1: write a multi-stage Dockerfile. Step 2: run as a non-root user and add a `.dockerignore`. Step 3: read all configuration from environment variables. Step 4: run it, then prove it starts on a clean machine using only the documented variables.',
    4: 'Deploy to Kubernetes. Step 1: write deployment, service and config manifests. Step 2: add liveness and readiness probes. Step 3: set resource requests and limits. Step 4: add a horizontal autoscaler, kill a pod to show recovery, then load-test to trigger scaling.',
    5: 'Describe infrastructure as code. Step 1: define a network and a compute resource in code. Step 2: apply it. Step 3: change one parameter and re-apply to show the plan diff. Step 4: confirm no manual console changes were needed to reach the same state.',
  },
  youtube: {
    1: 'Define your channel. Step 1: choose one niche and one specific viewer. Step 2: write the promise — what the viewer gets from subscribing. Step 3: choose three content pillars backed by search or audience evidence. Step 4: write the pitch a viewer would repeat to a friend in one sentence.',
    2: 'Produce three videos. Step 1: write a hook for the first five seconds. Step 2: structure the body around one idea. Step 3: end with a call to action. Step 4: record click-through and retention for each and decide what to repeat.',
    3: 'Optimise one video for search and click. Step 1: put the search phrase in the title naturally. Step 2: write a description that adds information, not keywords. Step 3: add chapters. Step 4: design a thumbnail that is readable at 120px. Compare impressions and click-through before and after.',
    4: 'Plan monetisation honestly. Step 1: list the revenue options that fit your niche. Step 2: check each one\'s eligibility requirements. Step 3: pick the one that best matches your audience and content. Step 4: state the realistic timeline and the metric you will watch, without over-promising.',
  },
  writing: {
    1: 'Rewrite a dense paragraph for a defined reader. Step 1: name the reader and what they need to do. Step 2: cut filler and jargon, keeping technical meaning intact. Step 3: split long sentences and lead with the action. Step 4: compare before and after and justify your three biggest changes.',
    2: 'Write docs-as-code. Step 1: create a Markdown file in the repository. Step 2: use headings, lists and code fences consistently. Step 3: submit it as a pull request for review. Step 4: confirm the change renders correctly in the preview before merging.',
    3: 'Write an API reference page. Step 1: document one endpoint — purpose, method and path. Step 2: list parameters with types and whether they are required. Step 3: give a request example and a response example. Step 4: add one common error and how to fix it.',
    4: 'Build a writing portfolio piece. Step 1: choose a document type you can show publicly. Step 2: write or edit it to a high standard. Step 3: add a short note explaining the audience and decisions. Step 4: publish it somewhere a hiring manager can read without an account.',
  },
  ai: {
    1: 'Choose and evaluate an AI tool for a task. Step 1: write the task in one sentence. Step 2: pick two tools that could do it. Step 3: run the same input through both. Step 4: compare output quality, cost and data handling, and justify your choice in writing.',
    2: 'Engineer a prompt deliberately. Step 1: state the role, the task and the output format. Step 2: provide the minimum context needed. Step 3: run it and note where the output drifts. Step 4: add one constraint and re-run — keep changes to one at a time so you can attribute the effect.',
    3: 'Build a workflow for your own field. Step 1: pick a recurring task in your work. Step 2: write the input template and the instruction. Step 3: define the review step and what you check before using the output. Step 4: log one failure and the correction that fixed it.',
    4: 'Verify AI output before using it. Step 1: identify any factual claims. Step 2: check each against a primary source. Step 3: look for bias, missing context or fabricated references. Step 4: record the verification and note any claim you could not confirm.',
  },
  projectmgmt: {
    1: 'Write a project charter. Step 1: state the objective and the business reason. Step 2: list measurable success criteria. Step 3: name the sponsor, key stakeholders and the constraints. Step 4: define what is explicitly out of scope, so change requests have a baseline.',
    2: 'Decide between Agile and predictive delivery. Step 1: assess the project\'s uncertainty and scope stability. Step 2: check regulatory or contractual constraints. Step 3: consider how available the customer is. Step 4: recommend a method and state the trade-offs of the rejected alternative.',
    3: 'Run a Scrum sprint. Step 1: hold planning and pick a sprint goal. Step 2: track a small board daily and surface blockers. Step 3: review the increment with the stakeholder. Step 4: hold a retrospective and commit to one process change for the next sprint.',
    4: 'Plan with tools. Step 1: break the work into tasks with owners. Step 2: sequence them and identify the critical path. Step 3: track a small risk register with likelihood, impact and mitigation. Step 4: baseline the schedule so you can measure variance later.',
    5: 'Report project status. Step 1: build a budget with categories and a variance tracker. Step 2: compute earned value (PV, EV, AC) and the cost/schedule indices. Step 3: write a one-page status with the top risks. Step 4: state the decisions you need from the sponsor, not just the numbers.',
    6: 'Plan your certification path. Step 1: shortlist two certifications that fit your experience level. Step 2: compare cost, study time and recognition in your market. Step 3: check the eligibility requirements against your record. Step 4: set a study plan with a target exam date and the evidence you will use to prepare.',
  },
  productmgmt: {
    1: 'Run a product teardown. Step 1: pick a product you use and name its core job-to-be-done. Step 2: map the main user journey. Step 3: identify two friction points with evidence. Step 4: propose one improvement and state the outcome it should move.',
    2: 'Conduct user research. Step 1: write five open questions about behaviour, not opinions. Step 2: interview three people from the target segment. Step 3: capture verbatim quotes and observed workarounds. Step 4: synthesise into two or three insights, each tied to a quote.',
    3: 'Choose what to build. Step 1: list candidate opportunities from research. Step 2: score each on impact and confidence versus effort. Step 3: pick the top one and write why the others lost. Step 4: state the assumption that, if wrong, would change the decision.',
    4: 'Write a PRD. Step 1: state the problem and the target user. Step 2: describe the solution and the key user stories. Step 3: list requirements with acceptance criteria. Step 4: add non-goals and success metrics so the scope is bounded.',
    5: 'Model growth metrics. Step 1: define the North Star metric. Step 2: add two or three supporting metrics with exact definitions. Step 3: map the funnel and compute each stage\'s conversion. Step 4: name the weakest stage and one hypothesis to improve it.',
    6: 'Design an experiment. Step 1: write a falsifiable hypothesis. Step 2: choose the primary metric and guardrails. Step 3: set the success threshold and sample size before running. Step 4: pre-commit to the decision rule — ship, iterate or stop — and apply it to the results.',
    7: 'Ship a feature with engineering. Step 1: agree the requirements and acceptance criteria. Step 2: record the trade-offs (scope, quality, time). Step 3: plan the rollout with a kill switch. Step 4: watch the metrics after launch and write a short retrospective on what changed.',
    8: 'Build your PM portfolio. Step 1: choose two projects that show different skills. Step 2: write each as a case study — problem, decisions, outcome. Step 3: include the artefacts (a spec, a metric, a research synthesis). Step 4: add a one-line summary of your role and impact for each.',
  },
  dart: {
    1: 'Write a CLI calculator. Step 1: read two numbers and an operator from input. Step 2: use a `switch` on the operator. Step 3: handle division by zero with a clear message rather than crashing. Step 4: loop until the user chooses to exit, and test each operation.',
    2: 'Model students with classes. Step 1: define a `Student` class with a name and a list of grades. Step 2: add an `average` getter. Step 3: store students in a `List` and look them up in a `Map` by id. Step 4: print a ranked report and handle a student with no grades.',
    3: 'Fetch weather asynchronously. Step 1: make an HTTP request returning a `Future`. Step 2: `await` the response and decode the JSON. Step 3: map the fields into a typed model. Step 4: wrap the call in try/catch for network and parse errors and show a friendly message.',
    4: 'Build a Flutter-ready widget model. Step 1: define an immutable widget state class. Step 2: create a `StatefulWidget` whose state updates on a button tap. Step 3: render the state in `build`. Step 4: move the data logic into a plain Dart class so it is testable without Flutter.',
  },
  crypto: {
    1: 'Investigate a transaction. Step 1: pick a transaction on a testnet explorer. Step 2: read the from, to, value and gas fields. Step 3: open the logs and decode one event. Step 4: explain what the receipt proves and what it does not.',
    2: 'Set up self-custody safely. Step 1: create a wallet and record the seed phrase offline. Step 2: store it somewhere that survives device loss but is not on a networked device. Step 3: restore the wallet on a second device to test recovery. Step 4: review token approvals and revoke one you no longer need.',
    3: 'Write and test a Solidity contract. Step 1: store and retrieve a value with a public function. Step 2: add a test in a local framework. Step 3: deploy to a testnet. Step 4: read the value back from the explorer to confirm the deployment matches your source.',
    4: 'Create an ERC-20 token. Step 1: define name, symbol, decimals and total supply. Step 2: add access-controlled minting. Step 3: write tests for transfer, approve and mint authorisation. Step 4: deploy to a testnet and verify the source on the explorer.',
    5: 'Build a minimal AMM. Step 1: implement the constant-product reserve formula. Step 2: add add-liquidity and swap functions. Step 3: test a swap and compute the price impact. Step 4: write down what a large trade does to the price and why.',
    6: 'Assess DeFi risk. Step 1: pick a protocol and list its dependencies. Step 2: identify the liquidation and impermanent-loss exposure. Step 3: note the admin keys and upgradeability. Step 4: write a short risk assessment separating protocol risk from user error.',
    7: 'Connect a frontend to a contract. Step 1: read the deployer\'s ABI. Step 2: connect a wallet and read a value. Step 3: send a write transaction and wait for the receipt. Step 4: show the updated value and handle a rejected transaction gracefully.',
    8: 'Store and retrieve dApp data. Step 1: decide what belongs on-chain (state) versus off-chain (large files). Step 2: write on-chain state with events. Step 3: store metadata on IPFS and reference its hash on-chain. Step 4: read the state back and confirm the hash resolves.',
    9: 'Find a vulnerability. Step 1: review a contract for reentrancy, access control and integer issues. Step 2: pick one suspected bug. Step 3: write a test that demonstrates the impact. Step 4: describe the fix and verify the test passes after it.',
    10: 'Build an audit pipeline. Step 1: run static analysis with a tool such as Slither. Step 2: triage the findings, separating real issues from noise. Step 3: write a fuzz test for one suspected bug. Step 4: produce a report that marks each finding confirmed or unconfirmed.',
    11: 'Analyse on-chain activity. Step 1: pick an address or contract. Step 2: query its transactions and transfers. Step 3: build a chart of activity over time. Step 4: write one insight — who is using it and how — supported by the data.',
  },
  sonic: {
    1: 'Make your first on-chain action. Step 1: create a wallet and fund it from a testnet faucet. Step 2: send a transaction. Step 3: read the receipt on the explorer. Step 4: explain each field so a non-technical friend could follow.',
    2: 'Map the Sonic ecosystem. Step 1: gather the chain parameters from official sources only. Step 2: note the tooling, RPC and bridges. Step 3: compare two dApps. Step 4: write a getting-started checklist and mark any fact you could not verify from a primary source.',
    3: 'Write a Solidity contract and deploy it. Step 1: implement a simple storage or counter contract. Step 2: add tests. Step 3: deploy to the Sonic testnet. Step 4: verify the source on the explorer and read the value back.',
    4: 'Build a framework-based dApp. Step 1: scaffold with a development framework. Step 2: implement a read and a write function. Step 3: connect a frontend. Step 4: run the flow end to end and record the transaction hash as evidence.',
    5: 'Review a contract for security. Step 1: define the scope and confirm authorisation. Step 2: look for the common classes — reentrancy, access control, unchecked calls. Step 3: validate each suspicion with a test. Step 4: report findings with severity and remediation, and list what you did not check.',
    6: 'Plan a FeeM strategy. Step 1: read how FeeM rewards work from the official docs. Step 2: model the gas usage of your dApp\'s main action. Step 3: estimate the fee impact. Step 4: write a mainnet readiness checklist, including a testnet run and a security review.',
  },
}

export function getStageWorkedExample(trackId: string, stageId: number): string | null {
  return STAGE_WORKED_EXAMPLES[trackId]?.[stageId] ?? null
}
