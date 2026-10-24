/**
 * TechSkillHub — Authored stage curriculum and project briefs.
 *
 * The AI tracks already carry an authored Learn → See → Practice → Verify →
 * Build contract (`lib/ai-*`). This module brings the same accountability to the
 * highest-priority non-AI tracks that previously relied on self-declared
 * completion alone.
 *
 * Design rules (see docs/curriculum-quality-audit.md):
 *   - Knowledge checks measure the concept the stage teaches, never trivia about
 *     the resource or its publisher.
 *   - Every question is answerable from TechSkillHub's own lesson text, the
 *     stage topics, or the linked resource.
 *   - Projects are subject-specific; briefs state the problem, audience,
 *     requirements, acceptance criteria and required evidence.
 *
 * Tracks without an authored entry here still receive an embedded project step
 * (with evidence gating) but are explicitly listed as "assessment authoring
 * pending" in the audit. Do not add a knowledge check that has not been taught.
 */

import type { QuizCognitiveLevel, QuizQuestion } from './guided-path'
import { STAGE_LEARNING_PLANS_EXTENDED } from './curriculum-extended'
import { PROJECT_BRIEFS_EXTENDED, STAGE_PROJECT_MAP_EXTENDED } from './curriculum-extended-projects'
import { PACKAGE_PROJECT_BRIEFS, PACKAGE_STAGE_PROJECT_MAP } from './curriculum-package/projects.generated'

export interface StageLearningPlan {
  objective: string
  successCriteria: string[]
  /** A concrete practice task the learner performs before the knowledge check. */
  exercise: string
  commonMistakes: string[]
  knowledgeCheck: QuizQuestion[]
}

export interface ProjectBrief {
  problem: string
  audience: string
  objective: string
  prerequisites?: string[]
  functionalRequirements: string[]
  constraints: string[]
  milestones: string[]
  acceptanceCriteria: string[]
  evidence: string[]
  commonFailureCases?: string[]
  stretchGoal: string
  portfolioPresentation: string
}

function q(
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
  cognitiveLevel: QuizCognitiveLevel = 'understand',
): QuizQuestion {
  return { question, options, correctIndex, explanation, cognitiveLevel }
}

/** Authored learning plans, keyed by track id then stage id. */
const CORE_STAGE_LEARNING_PLANS: Record<string, Record<number, StageLearningPlan>> = {
  // ───────────────────────── FRONTEND ─────────────────────────
  frontend: {
    1: {
      objective: 'Build and style a real web page with semantic HTML, CSS layout, and responsive behaviour.',
      successCriteria: ['Write semantic HTML landmarks and forms', 'Lay out content with Flexbox and CSS Grid', 'Make the page usable from 375px to desktop without horizontal scrolling'],
      exercise: 'Build a responsive profile page with a header, an about section, a skills grid, and a contact form. Use semantic HTML, one Flexbox layout, one CSS Grid layout, and at least one media query. Check it at 375px and 1024px.',
      commonMistakes: ['Using <div> for everything instead of semantic elements like <nav>, <main> and <section>', 'Fighting layout with fixed pixel widths instead of Flexbox or Grid', 'Forgetting the viewport meta tag, so mobile browsers zoom out'],
      knowledgeCheck: [
        q('Which element should contain the unique primary content of a page?', ['<div>', '<main>', '<aside>', '<span>'], 1, 'The <main> element identifies the primary content and should appear once per page.', 'understand'),
        q('You need to distribute a row of items along one axis with even spacing. Which layout tool fits best?', ['CSS Grid', 'Flexbox', 'position: absolute', 'float: left'], 1, 'Flexbox lays items out along a single main axis; Grid is for two-dimensional layouts.', 'apply'),
        q('A page looks correct on desktop but scrolls sideways on a phone. What is the most likely cause?', ['The images are too compressed', 'The viewport meta tag is missing or a fixed-width element overflows', 'There are too many colours', 'JavaScript is disabled'], 1, 'Missing the viewport meta tag or a fixed-width child are the usual causes of horizontal scroll on mobile.', 'analyze'),
      ],
    },
    2: {
      objective: 'Manipulate the DOM and handle asynchronous data with modern JavaScript.',
      successCriteria: ['Select and update DOM elements safely', 'Handle user events and form submission', 'Fetch data with async/await and handle success and failure states'],
      exercise: 'Build a small search UI that calls a public API. Show a loading state, render the results, and show a friendly error message when the request fails or returns no results.',
      commonMistakes: ['Forgetting that fetch() only rejects on network failure — check response.ok for 4xx/5xx', 'Reassigning a const binding', 'Ignoring rapid input, so out-of-order responses overwrite newer results'],
      knowledgeCheck: [
        q('A fetch() call returns a response with status 500. Does the promise reject?', ['Yes, it throws', 'No — you must check response.ok or response.status yourself', 'Only in Node.js', 'Only if you await it twice'], 1, 'fetch() resolves for HTTP error statuses, so you must inspect response.ok or the status code.', 'understand'),
        q('Which approach lets a user update a value later?', ['const', 'let', 'static', 'final'], 1, 'let declares a binding that can be reassigned; const cannot.', 'recall'),
        q('Users type quickly and older responses arrive after newer ones. What should you do?', ['Fetch less often with a timeout', 'Track the latest request and ignore stale responses (debounce/abort)', 'Render every response in order of arrival', 'Disable the input while loading'], 1, 'You must guard against out-of-order responses by debouncing and ignoring stale results.', 'analyze'),
      ],
    },
    3: {
      objective: 'Build component-based interfaces with React and understand how state and props drive rendering.',
      successCriteria: ['Compose components with props', 'Manage state with hooks', 'Render lists and handle user input in React'],
      exercise: 'Build a movie search app in React: an input, a results list, a loading state, and an error state. Extract the result card into its own component that receives props.',
      commonMistakes: ['Mutating state directly instead of using the setter', 'Missing the key prop when rendering lists', 'Running side effects in the render body instead of useEffect'],
      knowledgeCheck: [
        q('How do you update React state that was created with useState?', ['Reassign the variable directly', 'Call the setter function returned by useState', 'Use document.querySelector', 'Reload the component'], 1, 'State must be updated through its setter so React can re-render.', 'understand'),
        q('Why does React ask for a key on rendered list items?', ['To style them', 'To identify which items changed, were added, or removed', 'To sort them automatically', 'To make them focusable'], 1, 'Keys give React a stable identity for each item so reconciliation is correct and efficient.', 'understand'),
        q('Where should a data fetch triggered on mount live?', ['In the render body', 'Inside a useEffect with an appropriate dependency array', 'In a CSS file', 'In the setState call'], 1, 'Effects belong in useEffect; running them in render causes repeated calls and bugs.', 'apply'),
      ],
    },
    4: {
      objective: 'Apply the professional practices that make frontend work maintainable: version control, testing, performance, accessibility and deployment.',
      successCriteria: ['Use a branching Git workflow', 'Write component tests', 'Meet basic accessibility requirements', 'Deploy to a hosting platform'],
      exercise: 'Take one of your earlier projects and add: semantic landmarks and alt text, keyboard focus states, a test for one component, and a production deployment. Write a short README describing how to run and deploy it.',
      commonMistakes: ['Treating accessibility as optional', 'Committing directly to main with no review', 'Shipping without testing the production build'],
      knowledgeCheck: [
        q('Which is a genuine accessibility requirement rather than an enhancement?', ['Every interactive control is reachable and operable by keyboard', 'Animations are always enabled', 'Text uses at least four colours', 'Images are larger than 1MB'], 0, 'Keyboard operability is required for accessibility; the others are not requirements.', 'understand'),
        q('A component behaves correctly in tests but breaks only in the production build. What is the most likely cause?', ['The tests are too fast', 'A development-only assumption such as an environment variable or an unhandled production branch', 'The browser is old', 'The component has no key'], 1, 'Production-only failures usually come from environment differences or development-only assumptions.', 'analyze'),
        q('What is the purpose of a feature branch?', ['To slow down development', 'To isolate work so it can be reviewed before merging', 'To delete history', 'To replace testing'], 1, 'Feature branches keep work isolated and reviewable before it reaches the main branch.', 'understand'),
      ],
    },
    5: {
      objective: 'Use AI tools as assistants while keeping ownership of correctness and architecture.',
      successCriteria: ['Generate useful boilerplate with AI', 'Review and correct AI output', 'Explain the code you ship'],
      exercise: 'Ask an AI tool to generate a reusable Button component. Then review it: fix any accessibility, typing, or logic issues, and write two sentences explaining each change you made.',
      commonMistakes: ['Shipping generated code without reading it', 'Trusting AI explanations of unfamiliar APIs', 'Letting AI make architectural decisions'],
      knowledgeCheck: [
        q('You ask an AI for a React component. What should you do before using it?', ['Use it immediately', 'Read it, check accessibility and edge cases, and test it', 'Only check the formatting', 'Paste it into production'], 1, 'Generated code must be read, reviewed and tested before it is trusted.', 'evaluate'),
        q('Which task is AI least suited to owning?', ['Writing boilerplate markup', 'Explaining an error message', 'Deciding your application architecture and trade-offs', 'Generating mock data'], 2, 'Architectural decisions require context and accountability that AI cannot own for you.', 'evaluate'),
        q('AI gives a confident explanation of an API that you have never used. What is the safest next step?', ['Trust it and ship', 'Verify against the official documentation', 'Ask a second AI', 'Assume it is correct if the code compiles'], 1, 'Confident output is not verified output; check the authoritative documentation.', 'analyze'),
      ],
    },
  },

  // ───────────────────────── BACKEND ─────────────────────────
  backend: {
    1: {
      objective: 'Explain how the web works and run a first backend program with HTTP and version control.',
      successCriteria: ['Describe the request/response cycle', 'Run a minimal server or script', 'Use Git and a terminal confidently'],
      exercise: 'Start a minimal HTTP server that returns JSON for two routes (for example /health and /time). Request both with curl and commit the code in a Git repository.',
      commonMistakes: ['Confusing HTTP methods with actions', 'Committing secrets or node_modules', 'Not understanding that the server is stateless between requests'],
      knowledgeCheck: [
        q('Which HTTP method is intended to retrieve data without changing server state?', ['POST', 'GET', 'DELETE', 'PATCH'], 1, 'GET retrieves a representation and should not change server state.', 'understand'),
        q('What does HTTP status 201 usually mean?', ['The request failed', 'A new resource was created', 'The server is busy', 'Redirect to login'], 1, '201 Created is returned after a resource is successfully created, typically after POST.', 'understand'),
        q('Why should secrets never be committed to Git?', ['They slow the repository', 'Git history is durable and the secret cannot be reliably removed once shared', 'Git cannot store them', 'They increase build time'], 1, 'Once a secret is committed it persists in history and is compromised.', 'evaluate'),
      ],
    },
    2: {
      objective: 'Design and implement a REST API with authentication, validation and correct error handling.',
      successCriteria: ['Design resource-oriented routes', 'Hash passwords and issue tokens', 'Validate input and return correct status codes'],
      exercise: 'Build a small REST API with two resources. Add input validation, return 400 for bad input, 401 for missing auth, and 404 for missing records. Document the endpoints in a README.',
      commonMistakes: ['Storing passwords in plain text', 'Returning 200 for errors', 'Trusting client-supplied data without validation'],
      knowledgeCheck: [
        q('How should user passwords be stored?', ['Plain text', 'Reversibly encrypted', 'Salted and hashed with a slow algorithm such as bcrypt/argon2', 'Base64-encoded'], 2, 'Passwords must be salted and hashed with a deliberately slow algorithm.', 'apply'),
        q('A client sends an invalid email to a registration endpoint. Which response is correct?', ['200 with an error message', '400 with a clear validation message', '500 internal error', '204 no content'], 1, 'Invalid client input is a 400-class error with a useful message.', 'apply'),
        q('What is the primary purpose of input validation on the server?', ['To speed up the database', 'To protect the system from malformed or malicious data even if the client is bypassed', 'To reduce bundle size', 'To format JSON'], 1, 'Server-side validation is the trust boundary; the client cannot be trusted.', 'understand'),
      ],
    },
    3: {
      objective: 'Model data and query a relational database safely and efficiently.',
      successCriteria: ['Design normalised tables with keys', 'Write SELECTs with joins and aggregation', 'Explain an index and when it helps'],
      exercise: 'Design a schema for a small blog (users, posts, comments). Write queries for: posts by author, a post with its comments, and the count of posts per author. Add one index and explain what it speeds up.',
      commonMistakes: ['Storing duplicate data across tables', 'Using SELECT * in production queries', 'Assuming an index always helps — it slows writes and adds storage'],
      knowledgeCheck: [
        q('Which query returns each author with the number of posts they wrote?', ['SELECT * FROM posts', 'SELECT author_id, COUNT(*) FROM posts GROUP BY author_id', 'SELECT COUNT(*) FROM users', 'SELECT author_id FROM posts ORDER BY author_id'], 1, 'GROUP BY author_id with COUNT aggregates one row per author.', 'apply'),
        q('What does a foreign key enforce?', ['Faster reads', 'That a referenced row exists in the related table', 'Alphabetical ordering', 'Unique passwords'], 1, 'A foreign key enforces referential integrity between tables.', 'understand'),
        q('When does adding an index hurt?', ['Never', 'When the column is queried often', 'On write-heavy tables, because every insert/update must maintain the index', 'When the table is small and read-only'], 2, 'Indexes speed reads but add overhead to writes and storage.', 'analyze'),
      ],
    },
    4: {
      objective: 'Apply advanced backend patterns: caching, background work, real-time transport and rate limiting.',
      successCriteria: ['Explain when to cache', 'Move slow work to a background job', 'Choose the right transport for real-time features', 'Protect endpoints with rate limiting'],
      exercise: 'Add caching to an expensive endpoint with a clear expiry, move a slow task to a background job, and add rate limiting to your login route. Explain each decision in one paragraph.',
      commonMistakes: ['Caching data that must always be fresh', 'Doing CPU-heavy work inside a request', 'Adding WebSockets where polling was sufficient'],
      knowledgeCheck: [
        q('Which data is a poor candidate for aggressive caching?', ['A public list of countries', 'A user’s current account balance', 'Static documentation', 'A daily leaderboard'], 1, 'Data that must be immediately accurate, like a balance, should not be served from a stale cache.', 'analyze'),
        q('Why move image processing out of the request cycle?', ['To make it slower', 'To keep responses fast and avoid timeouts under load', 'Because databases cannot store images', 'To reduce code size'], 1, 'Long tasks should run in the background so requests stay responsive and do not time out.', 'apply'),
        q('What is the main purpose of rate limiting?', ['Increase bandwidth', 'Protect the service from abuse and accidental overload', 'Encrypt traffic', 'Compress responses'], 1, 'Rate limiting caps request frequency to protect availability and fairness.', 'understand'),
      ],
    },
    5: {
      objective: 'Containerise, configure and deploy a backend service with a repeatable pipeline.',
      successCriteria: ['Containerise an app with Docker', 'Manage configuration with environment variables', 'Deploy with a CI/CD pipeline'],
      exercise: 'Write a Dockerfile for one of your APIs, run it locally with an environment file, and set up a simple CI workflow that installs dependencies and runs the tests on every push.',
      commonMistakes: ['Baking secrets into the image', 'Using a huge base image', 'Deploying without running tests first'],
      knowledgeCheck: [
        q('How should a database URL reach a containerised app?', ['Hard-coded in the Dockerfile', 'Passed as an environment variable at run time', 'Committed in a .env file', 'Written into the image layer'], 1, 'Configuration belongs in environment variables, not the image.', 'apply'),
        q('What is a CI pipeline for?', ['Replacing developers', 'Automatically running checks such as tests before changes are merged or deployed', 'Hosting the database', 'Designing the UI'], 1, 'CI runs automated checks so problems are caught before shipping.', 'understand'),
        q('Why prefer a small base image?', ['Larger attack surface and slower pulls with a big image', 'Smaller images are always faster to code', 'It changes the language', 'It removes the need for tests'], 0, 'Smaller images reduce the attack surface and deploy faster.', 'analyze'),
      ],
    },
  },

  // ───────────────────────── PYTHON ─────────────────────────
  python: {
    1: {
      objective: 'Write clear Python programs using core data types, control flow, functions and file handling.',
      successCriteria: ['Use lists, dicts, tuples and sets appropriately', 'Write functions with clear inputs and outputs', 'Read and write files and handle errors'],
      exercise: 'Write a script that reads a text file, counts word frequencies, prints the top 10, and handles a missing file without crashing.',
      commonMistakes: ['Using a list where a set or dict is more appropriate', 'Ignoring exceptions, so a missing file crashes the script', 'Mutating a default argument like def f(x=[])'],
      knowledgeCheck: [
        q('Which structure stores unique values with fast membership tests?', ['list', 'tuple', 'set', 'str'], 2, 'A set stores unique elements and offers fast membership testing.', 'understand'),
        q('How should you handle a file that may not exist?', ['Let it crash', 'Wrap the open in try/except and handle FileNotFoundError', 'Assume it exists', 'Delete the file first'], 1, 'Handle the expected error so the program degrades gracefully.', 'apply'),
        q('Why is def f(items=[]) a bug?', ['It is invalid syntax', 'The default list is shared across calls and accumulates values', 'It is slower', 'It cannot take arguments'], 1, 'Mutable default arguments are evaluated once and shared between calls.', 'analyze'),
      ],
    },
    2: {
      objective: 'Use object-oriented and idiomatic Python to write reusable, well-structured code.',
      successCriteria: ['Model problems with classes', 'Use comprehensions and generators', 'Organise code into modules and virtual environments'],
      exercise: 'Refactor a scripts file into a small package: one module for data handling, one for logic, and a main entry point. Use type hints and at least one comprehension.',
      commonMistakes: ['Over-using classes where functions suffice', 'Building whole lists in memory instead of generators', 'Installing packages globally without a virtual environment'],
      knowledgeCheck: [
        q('What does a generator function return when called?', ['A list', 'An iterator that yields values lazily', 'A tuple', 'A string'], 1, 'Generators produce values lazily via yield, saving memory.', 'understand'),
        q('Which comprehension squares only the even numbers in nums?', ['[n for n in nums if n % 2 == 0]', '[n*n for n in nums if n % 2 == 0]', '[n for n in nums]', '[n*n for n in nums]'], 1, 'It filters evens and squares each.', 'apply'),
        q('Why use a virtual environment per project?', ['It is required by Python', 'To isolate dependencies so projects do not conflict', 'To speed up imports', 'To compile Python'], 1, 'Virtual environments isolate package versions between projects.', 'understand'),
      ],
    },
    3: {
      objective: 'Build and document a Python web API with a database, authentication and async support.',
      successCriteria: ['Define FastAPI routes with request models', 'Persist data through an ORM', 'Protect routes with authentication', 'Rely on generated API docs'],
      exercise: 'Build a small FastAPI service backed by SQLite/Postgres with two resources, input models, and a protected route. Confirm the generated /docs page works.',
      commonMistakes: ['Skipping request validation', 'Blocking the event loop with synchronous I/O in async routes', 'Returning ORM objects without serialisation'],
      knowledgeCheck: [
        q('What does FastAPI generate automatically from your type hints and models?', ['A database', 'Interactive OpenAPI documentation', 'A frontend', 'Unit tests'], 1, 'FastAPI derives interactive OpenAPI docs from models and type hints.', 'understand'),
        q('What is a risk of calling blocking database code inside an async route?', ['Nothing', 'It blocks the event loop and hurts concurrency', 'It deletes data', 'It is faster'], 1, 'Blocking calls in async handlers stall other requests.', 'analyze'),
        q('Where should input validation happen for a FastAPI endpoint?', ['Only in the browser', 'In a Pydantic model declared on the endpoint', 'In the CSS', 'In the database schema only'], 1, 'Pydantic models validate and coerce input at the boundary.', 'apply'),
      ],
    },
    4: {
      objective: 'Automate repetitive tasks with Python: files, scraping, documents and scheduling.',
      successCriteria: ['Traverse and transform files', 'Scrape structured data responsibly', 'Generate documents and spreadsheets', 'Schedule recurring jobs'],
      exercise: 'Write an automation that renames and organises a folder of files by type, logs the actions, and can be run safely twice without making a mess.',
      commonMistakes: ['Not making scripts idempotent', 'Ignoring rate limits and robots.txt when scraping', 'Overwriting data without a backup'],
      knowledgeCheck: [
        q('Why should an automation script be idempotent?', ['To run faster', 'So running it twice does not corrupt or duplicate work', 'To avoid imports', 'To use less memory'], 1, 'Idempotent scripts can be safely re-run, which is essential for reliability.', 'apply'),
        q('What should you check before scraping a site at scale?', ['Its colour scheme', 'robots.txt and terms, and whether an API is offered', 'The font', 'The page count only'], 1, 'Respect robots.txt/terms and prefer official APIs.', 'evaluate'),
        q('Which library writes Excel files in Python?', ['requests', 'openpyxl', 'pytest', 'click'], 1, 'openpyxl reads and writes .xlsx files.', 'recall'),
      ],
    },
    5: {
      objective: 'Integrate AI services into Python applications with clear prompting and sensible limits.',
      successCriteria: ['Call an AI API safely', 'Structure prompts and validate responses', 'Handle cost, latency and failure'],
      exercise: 'Build a small CLI that sends a prompt to an AI API, validates the response, and handles a network error and a rate-limit error with useful messages.',
      commonMistakes: ['Hard-coding API keys', 'Trusting model output without validation', 'Ignoring token cost and rate limits'],
      knowledgeCheck: [
        q('Where should an AI API key live?', ['In the source code', 'In an environment variable or secret manager', 'In the README', 'In a public gist'], 1, 'Secrets belong in environment variables or a secret manager, never in source.', 'apply'),
        q('The model returns unstructured text you need as JSON. What is the safest approach?', ['Assume it is valid JSON', 'Parse defensively and validate the fields you rely on', 'eval() the string', 'Ignore errors'], 1, 'Always parse and validate model output; it can be malformed.', 'analyze'),
        q('Why should AI calls have timeouts and retries with backoff?', ['To increase cost', 'Because the service can be slow or rate-limited, and you should fail gracefully', 'To hide errors', 'To slow the app'], 1, 'Timeouts and bounded retries keep the app responsive under provider issues.', 'understand'),
      ],
    },
  },

  // ───────────────────────── UI/UX DESIGN ─────────────────────────
  uiux: {
    1: {
      objective: 'Apply core visual design principles — typography, colour, layout, hierarchy and Gestalt — to real screens.',
      successCriteria: ['Build a clear visual hierarchy', 'Choose type and colour deliberately', 'Use a grid and spacing system'],
      exercise: 'Redesign a cluttered screen: establish a type scale, a limited palette, and a spacing grid. Annotate three decisions explaining why they improve clarity.',
      commonMistakes: ['Too many typefaces and sizes', 'Low colour contrast', 'Inconsistent spacing with no system'],
      knowledgeCheck: [
        q('What is visual hierarchy?', ['Using the largest font everywhere', 'Arranging elements so importance is clear at a glance', 'Adding more colours', 'Centering all text'], 1, 'Hierarchy guides the eye by making relative importance obvious.', 'understand'),
        q('Which pairing choice best improves readability?', ['Low-contrast grey text on grey', 'A strong contrast between text and background that meets accessibility guidance', 'Decorative fonts for body text', 'Random font sizes'], 1, 'Sufficient contrast and legible type make text readable.', 'apply'),
        q('Why limit the number of type sizes and colours?', ['To save storage', 'To create consistency and reduce visual noise', 'Because tools require it', 'To slow the user'], 1, 'Constraints produce consistency and clarity.', 'analyze'),
      ],
    },
    2: {
      objective: 'Ground design decisions in user needs through research, personas, information architecture and wireframes.',
      successCriteria: ['Choose appropriate research methods', 'Turn findings into personas and journey maps', 'Structure content with IA and wireframes'],
      exercise: 'For a chosen product, write three research questions, draft one persona, and produce a low-fidelity wireframe for the primary task. Explain why the flow is ordered that way.',
      commonMistakes: ['Designing without any user evidence', 'Treating a persona as a fictional character rather than a decision tool', 'Jumping to high-fidelity too early'],
      knowledgeCheck: [
        q('What is the purpose of a persona?', ['To decorate a slide', 'To make user goals and constraints concrete enough to guide decisions', 'To replace testing', 'To choose colours'], 1, 'Personas focus design decisions on real user needs.', 'understand'),
        q('Why wireframe before visual design?', ['Because colour is disallowed', 'To settle structure and flow cheaply before investing in visuals', 'To meet a deadline', 'To avoid research'], 1, 'Low-fidelity structure is cheaper to change than polished visuals.', 'understand'),
        q('Which research method best reveals why users struggle with a flow?', ['A large survey', 'A moderated usability test where you observe them attempt the task', 'A focus group about colours', 'Analytics page views alone'], 1, 'Observing real attempts reveals the causes behind problems; analytics show symptoms.', 'analyze'),
      ],
    },
    3: {
      objective: 'Use Figma fluently: components, variants, auto layout, prototyping and developer handoff.',
      successCriteria: ['Build reusable components with variants', 'Use auto layout and constraints', 'Prototype interactions and prepare handoff'],
      exercise: 'Create a small design system in Figma: a Button component with at least three variants, a card with auto layout, and one interactive prototype flow. Write a short handoff note for a developer.',
      commonMistakes: ['Detaching components constantly', 'Using absolute positioning instead of auto layout', 'No naming convention, so handoff is confusing'],
      knowledgeCheck: [
        q('What is the benefit of a component variant?', ['It deletes the original', 'It lets one component express multiple states cleanly', 'It adds animation', 'It exports code'], 1, 'Variants group related states/props under one maintainable component.', 'understand'),
        q('Why prefer auto layout over manually positioned frames?', ['It is faster to draw once', 'Layout responds correctly when content or size changes', 'It looks nicer', 'It exports PNGs'], 1, 'Auto layout keeps design resilient to content changes.', 'understand'),
        q('What should developer handoff include?', ['Only a screenshot', 'Component states, spacing, type styles and interaction notes', 'A private file with no comments', 'Just colours'], 1, 'Handoff must communicate states, spacing, type and behaviour.', 'apply'),
      ],
    },
    4: {
      objective: 'Test designs with users and design inclusively and mobile-first.',
      successCriteria: ['Plan and run a usability test', 'Identify and fix accessibility issues', 'Design mobile-first'],
      exercise: 'Run a five-participant usability test on your prototype. Record task success, note two problems, and revise the design. Check contrast and keyboard order.',
      commonMistakes: ['Leading participants to the answer', 'Testing with too few or unrepresentative users', 'Treating accessibility as a final checkbox'],
      knowledgeCheck: [
        q('What is a good usability test task?', ['“Do you like this?”', 'A realistic goal like “Find and buy a pair of running shoes”', 'A request to rate the colours', 'A survey of preferences'], 1, 'Tasks should be realistic goals, not opinions or leading questions.', 'apply'),
        q('Which is a genuine accessibility failure?', ['Contrast below the guideline for body text', 'Using system fonts', 'A short page', 'Blue buttons'], 0, 'Insufficient contrast makes content unreadable for many users and fails guidelines.', 'understand'),
        q('Why design mobile-first?', ['Mobile is more important', 'It forces prioritisation of content and constraints, which improves all screens', 'It is faster', 'It needs no testing'], 1, 'Mobile-first forces focus and typically improves the desktop experience too.', 'evaluate'),
      ],
    },
    5: {
      objective: 'Communicate design work through documented case studies and a presentable portfolio.',
      successCriteria: ['Document process and decisions', 'Write a case study with evidence', 'Present work clearly to an audience'],
      exercise: 'Write a case study for one project: problem, research, decisions, iterations, evidence of testing, and final outcome. Publish it where a potential employer or client can see it.',
      commonMistakes: ['Showing only polished visuals with no reasoning', 'Claiming results without evidence', 'Hiding failed iterations that show learning'],
      knowledgeCheck: [
        q('What makes a case study credible?', ['Beautiful final screens only', 'The problem, the process, the decisions, and evidence of testing', 'A list of tools', 'A long introduction'], 1, 'Credibility comes from reasoning and evidence, not just output.', 'evaluate'),
        q('A stakeholder asks why you chose a layout. What should you reference?', ['Personal taste', 'The user need and evidence from research or testing', 'A competitor only', 'The deadline'], 1, 'Design decisions should be justified by user need and evidence.', 'evaluate'),
        q('How should you describe an abandoned design direction?', ['Hide it', 'Show it as a considered trade-off that led to a better solution', 'Blame the client', 'Pretend it never existed'], 1, 'Iteration and trade-offs demonstrate judgement.', 'understand'),
      ],
    },
  },

  // ───────────────────────── DATA ANALYSIS ─────────────────────────
  data: {
    1: {
      objective: 'Clean, analyse and visualise tabular data in spreadsheets with formulas and pivot tables.',
      successCriteria: ['Use lookup and aggregation formulas', 'Build a pivot table', 'Produce a clear chart'],
      exercise: 'Take a messy spreadsheet: clean duplicates and blanks, build a pivot table summarising a key metric by category, and create one chart that communicates the finding.',
      commonMistakes: ['Hard-coding values instead of referencing cells', 'Charts with misleading axes', 'Leaving duplicates and blanks in the data'],
      knowledgeCheck: [
        q('Which function looks a value up in another table?', ['SUM', 'VLOOKUP', 'COUNT', 'IF'], 1, 'VLOOKUP finds a value in a table by matching a key; INDEX/MATCH is more flexible.', 'recall'),
        q('What is a pivot table for?', ['Storing raw data', 'Summarising and grouping data interactively', 'Formatting cells', 'Encrypting a workbook'], 1, 'Pivot tables aggregate and group data for analysis.', 'understand'),
        q('A bar chart starts its y-axis at 80 instead of 0. What is the risk?', ['None', 'It exaggerates small differences and can mislead', 'It improves accuracy', 'It is required by Excel'], 1, 'A truncated axis can visually exaggerate differences.', 'evaluate'),
      ],
    },
    2: {
      objective: 'Query relational data with SQL: filtering, aggregation, joins, subqueries and window functions.',
      successCriteria: ['Filter and sort with WHERE/ORDER BY', 'Aggregate with GROUP BY', 'Combine tables with joins', 'Use window functions for running totals or ranks'],
      exercise: 'Given an orders and customers schema, write queries for: total revenue per month, the top 5 customers by revenue, and each customer’s most recent order date.',
      commonMistakes: ['Using WHERE instead of HAVING to filter aggregates', 'Forgetting that LEFT JOIN keeps unmatched left rows', 'Assuming NULL comparisons work with ='],
      knowledgeCheck: [
        q('Which clause filters groups produced by GROUP BY?', ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], 1, 'HAVING filters after aggregation; WHERE filters rows before grouping.', 'understand'),
        q('You need every customer, even those with no orders. Which join?', ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'FULL OUTER JOIN only'], 1, 'LEFT JOIN preserves all left-side rows, including customers with no matching orders.', 'apply'),
        q('Which window function assigns a rank within each group?', ['SUM()', 'ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)', 'COUNT(*)', 'AVG()'], 1, 'ROW_NUMBER with PARTITION BY ranks rows within each group.', 'apply'),
      ],
    },
    3: {
      objective: 'Analyse data in Python with pandas and NumPy and visualise findings.',
      successCriteria: ['Load and clean data with pandas', 'Aggregate and reshape', 'Plot a clear chart'],
      exercise: 'Load a CSV with missing values. Clean it, merge a second table, compute a grouped summary, and plot one chart. Document each cleaning decision.',
      commonMistakes: ['Dropping rows with missing values without considering bias', 'Chaining methods that silently mutate data', 'Plotting without labelling axes'],
      knowledgeCheck: [
        q('Which pandas structure is a two-dimensional labelled table?', ['Series', 'DataFrame', 'ndarray', 'Index'], 1, 'A DataFrame is a 2D labelled data structure.', 'recall'),
        q('What does df.groupby("region")["sales"].sum() return?', ['A single number', 'Total sales per region', 'The whole table', 'An error'], 1, 'It groups by region and sums sales for each group.', 'apply'),
        q('Before dropping rows with missing values, what should you check?', ['The column colours', 'How many rows are affected and whether the missingness is biased', 'The file size', 'The index type'], 1, 'Dropping can bias the analysis; understand the missingness first.', 'evaluate'),
      ],
    },
    4: {
      objective: 'Build interactive dashboards that communicate a clear story to a non-technical audience.',
      successCriteria: ['Connect a BI tool to data', 'Design a readable dashboard', 'Choose the right chart for the question'],
      exercise: 'Build a one-page dashboard for a business metric: connect the data, add filters, choose appropriate charts, and write one sentence stating the main insight.',
      commonMistakes: ['Cramming every metric onto one page', 'Pie charts for many categories', 'No clear focal metric or takeaway'],
      knowledgeCheck: [
        q('Which chart best shows a trend over time?', ['Pie chart', 'Line chart', 'Scatter plot', 'Gauge'], 1, 'Line charts show trends over time clearly.', 'apply'),
        q('What is the most important element of a dashboard?', ['The number of charts', 'A clear takeaway or focal metric', 'Bright colours', 'Animation'], 1, 'A dashboard should communicate a clear message, not display everything.', 'evaluate'),
        q('When is a pie chart a poor choice?', ['For two categories', 'When there are many categories with similar values', 'For percentages summing to 100', 'Never'], 1, 'Many similar slices are hard to compare; use a bar chart instead.', 'analyze'),
      ],
    },
    5: {
      objective: 'Apply basic statistics correctly and avoid common misinterpretations.',
      successCriteria: ['Summarise data with appropriate measures', 'Interpret spread and correlation', 'Explain what a hypothesis test does and does not prove'],
      exercise: 'For a dataset, report mean and median, explain which better represents the data and why, and give one example of a correlation that is not causation.',
      commonMistakes: ['Using the mean for skewed data without checking', 'Treating correlation as causation', 'Reading a p-value as the probability the hypothesis is true'],
      knowledgeCheck: [
        q('When is the median preferred over the mean?', ['When data is symmetric', 'When data is skewed or has outliers', 'Never', 'Only for two values'], 1, 'The median is robust to outliers and skew.', 'apply'),
        q('Ice cream sales and drowning incidents rise together. What is the correct conclusion?', ['Ice cream causes drowning', 'A third factor such as warm weather likely explains both', 'Drowning causes ice cream sales', 'The data is wrong'], 1, 'Correlation does not imply causation; a confounder is likely.', 'evaluate'),
        q('A p-value of 0.03 means…', ['There is a 3% chance the hypothesis is true', 'Assuming the null hypothesis, results this extreme are unlikely (3%)', 'The effect is large', 'The study is proven'], 1, 'A p-value is the probability of the data under the null hypothesis, not the probability the hypothesis is true.', 'analyze'),
      ],
    },
  },

  // ───────────────────────── QA ENGINEERING ─────────────────────────
  qa: {
    1: {
      objective: 'Plan and execute manual testing: test cases, bug reports and test strategy.',
      successCriteria: ['Write clear test cases', 'Report bugs reproducibly', 'Choose test types for a risk'],
      exercise: 'For a login page, write eight test cases covering valid, invalid, empty and boundary inputs, and file one bug report with steps, expected and actual results.',
      commonMistakes: ['Vague bug reports with no steps to reproduce', 'Testing only the happy path', 'No expected result defined'],
      knowledgeCheck: [
        q('What belongs in a good bug report?', ['A screenshot only', 'Steps to reproduce, expected result, actual result, environment', 'A fix suggestion only', 'The developer’s name'], 1, 'Reproducible steps with expected vs actual are essential.', 'apply'),
        q('Why test boundary values?', ['They are easy', 'Most defects cluster at boundaries such as limits and empty input', 'They are required by law', 'They are fast'], 1, 'Boundary and equivalence analysis find defects efficiently.', 'understand'),
        q('A test case is missing its expected result. What is the problem?', ['None', 'The result cannot be judged as pass or fail', 'It runs faster', 'It is more flexible'], 1, 'Without an expected result a test cannot pass or fail.', 'evaluate'),
      ],
    },
    2: {
      objective: 'Test APIs and data with Postman, DevTools and SQL.',
      successCriteria: ['Send and assert API requests', 'Inspect network behaviour', 'Validate data with SQL'],
      exercise: 'Import an API into Postman, write tests that check status codes and response fields for valid and invalid requests, then verify the created record with a SQL query.',
      commonMistakes: ['Only checking status 200', 'Not asserting response bodies', 'Not cleaning up test data'],
      knowledgeCheck: [
        q('Beyond the status code, what should API tests assert?', ['Nothing', 'Response body fields, content type and error shape', 'The colour of the response', 'Only latency'], 1, 'Tests should verify payload structure and values, not just status.', 'apply'),
        q('You created a record through the API. How do you verify it persisted?', ['Trust the 201 response', 'Query the database or GET the resource', 'Assume it worked', 'Check the frontend only'], 1, 'Verify persistence through an independent read.', 'apply'),
        q('What is a common cause of flaky API tests?', ['Shared mutable test data and test order dependence', 'Using assertions', 'Using HTTPS', 'Reading the response'], 0, 'Shared state and ordering cause flakiness; tests need isolation.', 'analyze'),
      ],
    },
    3: {
      objective: 'Automate reliable browser tests with Playwright and the Page Object Model.',
      successCriteria: ['Write a stable browser test', 'Use resilient selectors', 'Structure tests with the Page Object Model'],
      exercise: 'Write a Playwright test that logs in and asserts the dashboard for valid and invalid credentials. Extract selectors into a page object and run the test twice to confirm stability.',
      commonMistakes: ['Using brittle CSS selectors tied to styling', 'Hard-coded waits instead of waiting for state', 'Tests that depend on each other’s order'],
      knowledgeCheck: [
        q('Which selector is most resilient to design changes?', ['A deeply nested CSS class', 'A role or accessible-name based locator', 'An absolute XPath', 'A position index'], 1, 'Role/name locators reflect intent and survive styling changes.', 'apply'),
        q('Why avoid fixed sleeps like waitForTimeout?', ['They are slow and unreliable', 'They are banned', 'They are faster than waiting', 'They fix flakiness'], 0, 'Fixed sleeps are both slow and flaky; wait for a real condition instead.', 'evaluate'),
        q('What does the Page Object Model give you?', ['More files', 'A single place for each page’s locators and actions, reducing duplication', 'Better colours', 'Faster network'], 1, 'Page objects centralise page knowledge so tests stay readable and maintainable.', 'understand'),
      ],
    },
    4: {
      objective: 'Cover performance, security and CI for test suites.',
      successCriteria: ['Run a basic load test', 'Identify common security test cases', 'Integrate tests into CI'],
      exercise: 'Run a small k6 load test against an endpoint, record the baseline, add one security test case (for example an auth bypass attempt), and wire the test suite into a CI job.',
      commonMistakes: ['Load testing without a baseline or goal', 'Treating security testing as optional', 'Only running tests locally'],
      knowledgeCheck: [
        q('What should you establish before a load test?', ['The colour scheme', 'A baseline and target for latency and error rate', 'The database vendor only', 'The number of developers'], 1, 'Performance has no meaning without a baseline and target.', 'apply'),
        q('Which is a basic security test case?', ['Checking the logo', 'Attempting to access a protected route without credentials', 'Testing font size', 'Counting buttons'], 1, 'Access-control checks are fundamental security tests.', 'apply'),
        q('Why run tests in CI?', ['To slow releases', 'To catch regressions automatically before merge', 'To replace local testing', 'To reduce test count'], 1, 'CI provides a consistent, automated regression gate.', 'understand'),
      ],
    },
  },
}

/**
 * Authored learning plans for every track. Core plans live here; the remaining
 * tracks are authored in `lib/curriculum-extended.ts` and merged so callers see
 * one source of truth.
 */
export const STAGE_LEARNING_PLANS: Record<string, Record<number, StageLearningPlan>> = {
  ...CORE_STAGE_LEARNING_PLANS,
  ...STAGE_LEARNING_PLANS_EXTENDED,
}

/** Authored project briefs keyed by catalogue project id. */
export const PROJECT_BRIEFS: Record<string, ProjectBrief> = {
  'fe-p3': {
    problem: 'A brand or individual needs a landing page that presents an offer clearly and works on any device.',
    audience: 'Visitors arriving from ads or social media on phones.',
    objective: 'Implement a given design as a responsive, accessible landing page.',
    functionalRequirements: ['Hero with headline and call to action', 'A feature/benefits section', 'A contact or signup form', 'Responsive navigation'],
    constraints: ['Semantic HTML', 'No CSS framework required unless already learned', 'Must work without horizontal scroll at 375px'],
    milestones: ['Structure the HTML', 'Implement the layout', 'Add responsive breakpoints', 'Polish spacing and type'],
    acceptanceCriteria: ['Layout matches the reference at 375px and 1024px', 'All interactive elements are keyboard reachable', 'Images have alt text', 'No horizontal scroll'],
    evidence: ['Live or hosted URL', 'Screenshot at mobile and desktop widths', 'Short README with the decisions you made'],
    stretchGoal: 'Add a subtle entrance animation and a dark-mode variant.',
    portfolioPresentation: 'Present it as a design-to-code piece: show the reference, your implementation, and the accessibility checks you ran.',
  },
  'fe-p4': {
    problem: 'People want current information (weather) without hunting through multiple sites.',
    audience: 'Everyday users who want an answer in seconds.',
    objective: 'Build a small app that fetches and displays live data with clear loading and error states.',
    functionalRequirements: ['Search by location', 'Display current conditions', 'Loading state', 'Error state', 'Remember the last search'],
    constraints: ['Handle API failures gracefully', 'Do not expose API keys in client code'],
    milestones: ['Explore the API', 'Build the request layer', 'Render results', 'Handle loading and errors'],
    acceptanceCriteria: ['Works for a valid location', 'Shows a helpful message for an invalid location', 'No unhandled promise rejections'],
    evidence: ['Live URL', 'Screenshots of success and error states', 'Notes on how you handled API keys'],
    stretchGoal: 'Add a 5-day forecast and unit switching.',
    portfolioPresentation: 'Explain how you handled failure — reviewers care more about error handling than a happy-path screenshot.',
  },
  'fe-p5': {
    problem: 'Users need to search and browse a catalogue quickly.',
    audience: 'People exploring films, books or products.',
    objective: 'Build a React app that consumes a public API, with components, state and lists.',
    functionalRequirements: ['Search input', 'Results grid as reusable components', 'Loading and empty states', 'Detail view or modal'],
    constraints: ['Reusable components', 'Keys on list items', 'No unnecessary re-renders'],
    milestones: ['Design component tree', 'Fetch data', 'Render list', 'Add detail view'],
    acceptanceCriteria: ['Results update with the query', 'Cards are reusable components', 'Empty and loading states exist'],
    evidence: ['Source repository', 'Live deploy', 'Component diagram or notes'],
    stretchGoal: 'Add filtering and pagination.',
    portfolioPresentation: 'Highlight component design and state management, not just the visual result.',
  },
  'fe-p6': {
    problem: 'People want to understand where their money goes each month.',
    audience: 'Individuals tracking personal spending.',
    objective: 'Build a small app with persisted data, validation and tests.',
    functionalRequirements: ['Add income/expenses', 'Categorise', 'Show totals and a chart', 'Persist data'],
    constraints: ['Input validation', 'Accessible form controls', 'At least one automated test'],
    milestones: ['Model the data', 'Build the form', 'Add persistence', 'Add summary view', 'Write a test'],
    acceptanceCriteria: ['Totals are correct', 'Invalid input is rejected with a message', 'Data survives a reload', 'A test passes in CI'],
    evidence: ['Repository with a passing test', 'Screenshot of the summary', 'Notes on validation rules'],
    stretchGoal: 'Add CSV export and category budgets.',
    portfolioPresentation: 'Present it as evidence you can handle state, validation and testing together.',
  },
  'be-p1': {
    problem: 'A blog needs an API to create and read posts.',
    audience: 'A frontend or mobile client.',
    objective: 'Build a REST API with CRUD for posts and correct status codes.',
    functionalRequirements: ['List, create, read, update, delete posts', 'Validation', 'Consistent JSON errors'],
    constraints: ['No secrets committed', 'Input validated server-side'],
    milestones: ['Design routes', 'Implement CRUD', 'Add validation', 'Document endpoints'],
    acceptanceCriteria: ['CRUD works via curl/Postman', 'Invalid input returns 400', 'Missing record returns 404', 'No secrets in the repo'],
    evidence: ['Repository', 'README with endpoint examples and sample responses'],
    stretchGoal: 'Add pagination and search.',
    portfolioPresentation: 'Lead with your API design and error contract.',
  },
  'be-p2': {
    problem: 'An application needs secure accounts.',
    audience: 'End users signing up and logging in.',
    objective: 'Implement registration, login, hashing and protected routes.',
    functionalRequirements: ['Register', 'Login', 'Hashed passwords', 'Protected endpoint requiring a token'],
    constraints: ['Never store plaintext passwords', 'Do not leak whether an email exists'],
    milestones: ['Model users', 'Hash and store', 'Issue tokens', 'Protect a route'],
    acceptanceCriteria: ['Passwords are salted and hashed', 'Invalid credentials are rejected', 'Protected route returns 401 without a token'],
    evidence: ['Repository', 'A short security note explaining your choices'],
    stretchGoal: 'Add password reset and refresh tokens.',
    portfolioPresentation: 'Focus on the security decisions, not the endpoint list.',
  },
  'be-p3': {
    problem: 'Long links are unwieldy to share.',
    audience: 'Anyone sharing links.',
    objective: 'Build a URL shortener with a database and redirects.',
    functionalRequirements: ['Create a short code for a URL', 'Redirect short code to target', 'Track click count'],
    constraints: ['Unique codes', 'Validate the target URL'],
    milestones: ['Schema', 'Create endpoint', 'Redirect handler', 'Click tracking'],
    acceptanceCriteria: ['Short links redirect correctly', 'Invalid URLs are rejected', 'Codes are unique'],
    evidence: ['Repository', 'README with example create + redirect'],
    stretchGoal: 'Add expiry and custom aliases.',
    portfolioPresentation: 'Explain your code-generation and collision strategy.',
  },
  'be-p4': {
    problem: 'Users want to message each other in real time.',
    audience: 'Collaborating users.',
    objective: 'Build a real-time backend with authentication and message persistence.',
    functionalRequirements: ['Authenticated connection', 'Send/receive messages', 'Persist history'],
    constraints: ['Authenticate the socket', 'Validate messages', 'Rate limit'],
    milestones: ['Transport setup', 'Auth', 'Messaging', 'Persistence'],
    acceptanceCriteria: ['Messages deliver in real time', 'Unauthenticated clients are rejected', 'History persists'],
    evidence: ['Repository', 'Short demo video or GIF', 'Architecture note'],
    stretchGoal: 'Add typing indicators and read receipts.',
    portfolioPresentation: 'Present the architecture and how you secured the real-time channel.',
  },
  'py-p1': {
    problem: 'Download folders become disorganised and hard to navigate.',
    audience: 'Anyone with a messy downloads or documents folder.',
    objective: 'Write a safe, idempotent script that organises files by type.',
    functionalRequirements: ['Scan a folder', 'Move files into type-based folders', 'Log actions', 'Dry-run mode'],
    constraints: ['Idempotent', 'Never delete data', 'Handle missing folders'],
    milestones: ['Scan', 'Classify', 'Move + log', 'Dry run'],
    acceptanceCriteria: ['Re-running changes nothing', 'A dry run reports without moving', 'Missing folder does not crash'],
    evidence: ['Repository with README', 'Sample log output'],
    stretchGoal: 'Add undo and a config file.',
    portfolioPresentation: 'Emphasise safety and idempotency — the qualities that make automation trustworthy.',
  },
  'py-p3': {
    problem: 'A service needs a documented HTTP API.',
    audience: 'Client applications.',
    objective: 'Build a FastAPI service with validation, a database and auth.',
    functionalRequirements: ['Two resources', 'Pydantic validation', 'Database persistence', 'One protected route'],
    constraints: ['Server-side validation', 'Generated docs available'],
    milestones: ['Models', 'Routes', 'Persistence', 'Auth'],
    acceptanceCriteria: ['Invalid input returns 422/400', '/docs works', 'Protected route returns 401 without a token'],
    evidence: ['Repository', 'Screenshot of /docs', 'README'],
    stretchGoal: 'Add tests with TestClient.',
    portfolioPresentation: 'Show the API contract and how validation protects the data.',
  },
  'ux-p3': {
    problem: 'A mobile app idea needs a usable, testable design.',
    audience: 'Mobile users completing a primary task.',
    objective: 'Design and prototype a mobile flow in Figma and validate it with users.',
    functionalRequirements: ['Core flow screens', 'Interactive prototype', 'Reusable components'],
    constraints: ['Follow platform patterns', 'Meet contrast guidelines'],
    milestones: ['Flow map', 'Wireframes', 'High-fidelity + prototype', 'Usability test'],
    acceptanceCriteria: ['Primary task can be completed in the prototype', 'At least two users tested', 'Findings documented'],
    evidence: ['Prototype link', 'Test notes', 'Before/after revisions'],
    stretchGoal: 'Add a design system file and developer handoff notes.',
    portfolioPresentation: 'Present the flow, the test findings, and what you changed as a result.',
  },
  'da-p2': {
    problem: 'A business needs answers from its raw relational data.',
    audience: 'A non-technical decision maker.',
    objective: 'Answer specific business questions with SQL and present the findings.',
    functionalRequirements: ['Analytical queries', 'Aggregations and joins', 'A clear summary'],
    constraints: ['Read-only queries', 'Explain each query in plain language'],
    milestones: ['Understand the schema', 'Write queries', 'Validate results', 'Summarise'],
    acceptanceCriteria: ['Each question is answered by a query', 'Results are validated against a sanity check', 'Summary explains the finding'],
    evidence: ['SQL file', 'Result tables or screenshots', 'Written summary'],
    stretchGoal: 'Add a window-function analysis such as a running total.',
    portfolioPresentation: 'Show the question → query → finding chain, not just SQL syntax.',
  },
}

/** Level-based fallback so every project still has a structured brief. */
export function deriveProjectBrief(level: 'beginner' | 'intermediate' | 'advanced', title: string): ProjectBrief {
  const levelName = level === 'beginner' ? 'foundation' : level === 'intermediate' ? 'applied' : 'portfolio'
  return {
    problem: `A real ${levelName} problem that demonstrates the skills in this phase.`,
    audience: 'A specific user or stakeholder you can name.',
    objective: `Complete "${title}" to a standard you can show and explain to someone else.`,
    prerequisites: ['The lessons and practice in this stage', 'Any tools the stage introduced'],
    functionalRequirements: ['Implement the core behaviour described in the project', 'Handle at least one edge case or failure', 'Document how to run it'],
    constraints: ['Use only tools introduced in the prerequisite lessons', 'Do not copy a tutorial step-for-step'],
    milestones: ['Plan the scope', 'Build the core', 'Handle edge cases', 'Document and present'],
    acceptanceCriteria: [
      'The core behaviour works as described',
      'At least one edge case is handled',
      'You can explain each significant decision you made',
      'The project is documented well enough for someone else to run it',
    ],
    evidence: ['A repository or design file link', 'A short written summary of the problem and solution', 'Evidence of testing or validation where relevant'],
    commonFailureCases: [
      'Copying a tutorial without understanding it, so it breaks on any change',
      'Skipping edge cases and error handling',
      'No documentation, so the work cannot be reproduced',
    ],
    stretchGoal: 'Add one improvement that a professional would consider valuable.',
    portfolioPresentation: 'Write a short description of the problem, your approach, and what you would improve next.',
  }
}

export function getStageLearningPlan(trackId: string, stageId: number): StageLearningPlan | null {
  return STAGE_LEARNING_PLANS[trackId]?.[stageId] ?? null
}

export function getProjectBrief(projectId: string | undefined, level: 'beginner' | 'intermediate' | 'advanced', title: string): ProjectBrief {
  // Start from the level template so briefs always carry the full checklist
  // (prerequisites, common failure cases), then overlay any authored brief.
  const derived = deriveProjectBrief(level, title)
  const packageBrief = projectId ? PACKAGE_PROJECT_BRIEFS[projectId] : undefined
  const authored = packageBrief ?? (projectId ? (PROJECT_BRIEFS[projectId] ?? PROJECT_BRIEFS_EXTENDED[projectId]) : undefined)
  if (!authored) return derived
  return {
    ...derived,
    ...authored,
    prerequisites: authored.prerequisites?.length ? authored.prerequisites : derived.prerequisites,
    commonFailureCases: authored.commonFailureCases?.length ? authored.commonFailureCases : derived.commonFailureCases,
  }
}

/**
 * Embeds a real catalogue project at the end of a specific stage so projects are
 * part of the progression rather than a disconnected list.
 */
const STAGE_PROJECT_MAP_BASE: Record<string, Record<number, string>> = {
  frontend: { 1: 'fe-p3', 2: 'fe-p4', 3: 'fe-p5', 4: 'fe-p6', 5: 'fe-p8' },
  backend: { 1: 'be-p1', 2: 'be-p2', 3: 'be-p3', 4: 'be-p4' },
  fullstack: { 1: 'fs-p0', 3: 'fs-p1', 5: 'fs-p3' },
  python: { 1: 'py-p1', 2: 'py-p2', 3: 'py-p3', 4: 'py-p4', 5: 'py-p5' },
  uiux: { 1: 'ux-p2', 2: 'ux-p1', 3: 'ux-p3', 4: 'ux-p4' },
  qa: { 1: 'qa-p1', 2: 'qa-p2', 3: 'qa-p3' },
  data: { 1: 'da-p1', 2: 'da-p2', 3: 'da-p3', 4: 'da-p4' },
  datascience: { 1: 'ds-p1', 2: 'ds-p2', 3: 'ds-p3' },
  devops: { 1: 'dv-p0', 2: 'dv-p1', 3: 'dv-p2' },
  cyber: { 1: 'cy-p1', 2: 'cy-p2', 3: 'cy-p3' },
  mobile: { 1: 'mob-p0', 2: 'mob-p1', 3: 'mob-p2' },
  video: { 1: 'vid-p1', 2: 'vid-p2', 3: 'vid-p3' },
  marketing: { 1: 'mkt-p1', 2: 'mkt-p2', 3: 'mkt-p3' },
  nocode: { 1: 'nc-p1', 2: 'nc-p2', 3: 'nc-p3' },
  ai: { 1: 'ai-p1', 2: 'ai-p2' },
}

/**
 * Stage → project map, merged with the gap-closing mappings authored in
 * `lib/curriculum-extended-projects.ts`. Extended entries are additive: a track
 * keeps its base mappings and gains the ones that closed the reported gaps.
 */
export const STAGE_PROJECT_MAP: Record<string, Record<number, string>> = (() => {
  const merged: Record<string, Record<number, string>> = { ...STAGE_PROJECT_MAP_BASE }
  for (const [trackId, mapping] of Object.entries(STAGE_PROJECT_MAP_EXTENDED)) {
    merged[trackId] = { ...(merged[trackId] ?? {}), ...mapping }
  }
  // Package phase projects fill stages that had no mapped project (notably the
  // final AI builds). Authored mappings win where they already exist.
  for (const [trackId, mapping] of Object.entries(PACKAGE_STAGE_PROJECT_MAP)) {
    for (const [stageId, projectId] of Object.entries(mapping)) {
      const numericStageId = Number(stageId)
      if (!merged[trackId]?.[numericStageId]) {
        merged[trackId] = { ...(merged[trackId] ?? {}), [numericStageId]: projectId }
      }
    }
  }
  return merged
})()

/** The portfolio-grade project shown as the final build of a track. */
export const PORTFOLIO_PROJECT: Record<string, string> = {
  frontend: 'fe-p7',
  backend: 'be-p5',
  fullstack: 'fs-p4',
  python: 'py-p6',
  uiux: 'ux-p5',
  qa: 'qa-p4',
  data: 'da-p5',
  datascience: 'ds-p4',
  devops: 'dv-p3',
  cyber: 'cy-p4',
  mobile: 'mob-p4',
  video: 'vid-p4',
  youtube: 'yt-p3',
  marketing: 'mkt-p4',
  writing: 'tw-p3',
  nocode: 'nc-p4',
  crypto: 'cr-pf',
  projectmgmt: 'pm-p5',
  productmgmt: 'prd-p5',
  dart: 'dart-p5',
  sonic: 'son-p5',
  ai: 'ai-p3',
}

/** True when a track has authored knowledge checks for every one of its stages. */
export function trackAssessmentCoverage(trackId: string, stageIds: number[]): { authored: number; total: number } {
  const plans = STAGE_LEARNING_PLANS[trackId] ?? {}
  const authored = stageIds.filter((id) => (plans[id]?.knowledgeCheck?.length ?? 0) > 0).length
  return { authored, total: stageIds.length }
}
