import type { Resource } from './tracks'

/**
 * Additional *stage-specific* external resources researched to give every stage
 * a primary resource whose actual content was inspected and matches the stage
 * objective (verification level 3 — see `lib/resource-verification.ts`).
 *
 * Why this module exists: the earlier audit accepted level-3 evidence derived
 * from page metadata alone. Under the corrected evidence model, a page only
 * counts as content-verified when its real content is extracted and compared
 * with the objective. Stages whose only mapped resources were videos (no
 * transcript available) or JavaScript shells therefore lost their content
 * evidence and failed the `resources` gate. These entries are the researched,
 * content-inspected replacements.
 *
 * Design rules:
 *   - One resource per gap stage, chosen for that stage's exact objective.
 *   - Authoritative documentation, official product docs, a university open
 *     textbook, or a recognised educational publisher.
 *   - Free to read: no paywall gating the taught content. (Tool *features* may
 *     be paid, but studying the assigned material is not.)
 *   - Every URL was destination- AND content-checked on 2026-10-17; the
 *     extracted excerpt is stored in `scripts/resource-probe.json`.
 *
 * These complement the base `track.resources` and are resolved through
 * `lib/stage-resources.ts`, so the served learner path and the audit agree.
 */
export const EXTENDED_STAGE_RESOURCES: Record<string, Resource[]> = {
  frontend: [
    {
      id: 'fe-19',
      title: 'React — Using TypeScript',
      description: 'Official React guidance for typing component props, hooks, and JSX with TypeScript; directly supports the React stage before learners move on to more complex interfaces.',
      url: 'https://react.dev/learn/typescript',
      type: 'docs',
      free: true,
      source: 'React',
    },
    {
      id: 'fe-20',
      title: 'Jest — Getting Started',
      description: 'Official Jest documentation for installing the runner, writing a first test, and understanding the basic test workflow used in a frontend project.',
      url: 'https://jestjs.io/docs/getting-started',
      type: 'docs',
      free: true,
      source: 'Jest',
    },
    {
      id: 'fe-21',
      title: 'W3C WAI — Introduction to Web Accessibility',
      description: 'The W3C Web Accessibility Initiative introduction explains the needs, principles, and benefits behind accessible web content; use it to review keyboard, semantic, and assistive-technology behaviour.',
      url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/',
      type: 'docs',
      free: true,
      source: 'W3C Web Accessibility Initiative',
    },
    {
      id: 'fe-22',
      title: 'Next.js — Deploying Applications',
      description: 'Official App Router deployment guidance covering production builds and deployment options for taking a frontend project from development to a hosted environment.',
      url: 'https://nextjs.org/docs/app/getting-started/deploying',
      type: 'docs',
      free: true,
      source: 'Next.js',
    },
  ],
  backend: [
    {
      id: 'be-16',
      title: 'Node.js — Introduction to Node.js',
      description: 'Official Node.js guide introducing the runtime and its role in server-side JavaScript, supporting the backend stage’s language and server foundations.',
      url: 'https://nodejs.org/learn/getting-started/introduction-to-nodejs',
      type: 'docs', free: true, source: 'Node.js',
    },
    {
      id: 'be-17',
      title: 'Pro Git — Book',
      description: 'The free Pro Git book explains repositories, branching, remotes, and collaboration workflows that learners need before maintaining backend code.',
      url: 'https://git-scm.com/book/en/v2',
      type: 'book', free: true, source: 'Git',
    },
    {
      id: 'be-18',
      title: 'FastAPI — Background Tasks',
      description: 'Official FastAPI tutorial for moving small post-response work out of the request path and recognising when a larger job queue is more appropriate.',
      url: 'https://fastapi.tiangolo.com/tutorial/background-tasks/',
      type: 'docs', free: true, source: 'FastAPI',
    },
    {
      id: 'be-19',
      title: 'FastAPI — WebSockets',
      description: 'Official FastAPI guide to bidirectional WebSocket endpoints, directly supporting the real-time transport topic in Advanced Backend.',
      url: 'https://fastapi.tiangolo.com/advanced/websockets/',
      type: 'docs', free: true, source: 'FastAPI',
    },
    {
      id: 'be-20',
      title: 'FastAPI — Request Files',
      description: 'Official tutorial for receiving uploaded files in API endpoints, supporting file-upload handling and validation patterns.',
      url: 'https://fastapi.tiangolo.com/tutorial/request-files/',
      type: 'docs', free: true, source: 'FastAPI',
    },
    {
      id: 'be-21',
      title: 'Redis — Async support for redis-py',
      description: 'Official Redis Python client documentation for asynchronous connections and commands, relevant to API services that use Redis without blocking request handlers.',
      url: 'https://redis.io/docs/latest/develop/clients/redis-py/async/',
      type: 'docs', free: true, source: 'Redis',
    },
    {
      id: 'be-22',
      title: 'OWASP — API Security Top 10 Training Guide',
      description: 'OWASP’s current developer training guide summarises common API risks and defensive practices, grounding access control and safe endpoint design in a recognised security reference.',
      url: 'https://devguide.owasp.org/en/07-training-education/07-api-top-ten/',
      type: 'docs', free: true, source: 'OWASP',
    },
  ],
  python: [
    {
      id: 'py-9',
      title: 'FastAPI — Tutorial (User Guide)',
      description:
        'Official FastAPI user guide: path operations, request bodies, SQL (relational) databases, bigger applications with multiple files, and async request handling — the API, database, auth and async topics this stage requires.',
      url: 'https://fastapi.tiangolo.com/tutorial/',
      type: 'docs',
      free: true,
      source: 'FastAPI',
    },
    {
      id: 'py-10',
      title: 'Python — The Python Tutorial',
      description: 'The official Python tutorial covers core syntax, data structures, functions, modules, files, and errors; it is a primary reference for the Python Basics stage.',
      url: 'https://docs.python.org/3/tutorial/',
      type: 'docs', free: true, source: 'Python Software Foundation',
    },
    {
      id: 'py-11',
      title: 'Python — pathlib filesystem paths',
      description: 'Official pathlib reference for joining paths, traversing directories, and working with files in a portable, maintainable way for automation scripts.',
      url: 'https://docs.python.org/3/library/pathlib.html',
      type: 'docs', free: true, source: 'Python Software Foundation',
    },
    {
      id: 'py-12',
      title: 'Beautiful Soup — Documentation',
      description: 'The Beautiful Soup documentation explains parsing HTML and navigating a document tree for small, respectful scraping tasks, matching the stage’s web-scraping topic.',
      url: 'https://beautiful-soup-4.readthedocs.io/en/latest/',
      type: 'docs', free: true, source: 'Beautiful Soup',
    },
    {
      id: 'py-13',
      title: 'Python — sched event scheduler',
      description: 'Official standard-library reference for scheduling events and running repeatable timed tasks, relevant to basic script scheduling and automation.',
      url: 'https://docs.python.org/3/library/sched.html',
      type: 'docs', free: true, source: 'Python Software Foundation',
    },
  ],
  uiux: [
    {
      id: 'ux-13',
      title: 'Figma Help — Guide to auto layout',
      description:
        'Official Figma guide to auto layout: how frames, padding, gap and resizing rules build responsive, reusable component structures — the layout system a Figma-fluent workflow depends on.',
      url: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout',
      type: 'docs',
      free: true,
      source: 'Figma Help Center',
    },
  ],
  data: [
    {
      id: 'da-11',
      title: 'Microsoft Support — Create a PivotTable to analyze worksheet data',
      description:
        'Official step-by-step guide to building pivot tables from a data range or table, including grouping, value fields and filters — the spreadsheet analysis skill this stage teaches.',
      url: 'https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576',
      type: 'docs',
      free: true,
      source: 'Microsoft Support',
    },
    {
      id: 'da-12',
      title: 'pandas — 10 minutes to pandas',
      description:
        'Concise official pandas tour: Series and DataFrame creation, selection, missing-data handling, grouping and reshaping — the pandas fundamentals this Python-for-data stage covers.',
      url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
      type: 'docs',
      free: true,
      source: 'pandas',
    },
    {
      id: 'da-13',
      title: 'Tableau — Get Started tutorial',
      description:
        'Official hands-on tutorial: connecting to data, building views and dashboards, and structuring a workbook for analysis — the BI tooling this visualization stage requires.',
      url: 'https://help.tableau.com/current/guides/get-started-tutorial/en-us/get-started-tutorial-home.htm',
      type: 'docs',
      free: true,
      source: 'Tableau',
    },
    {
      id: 'da-14',
      title: 'OpenStax — Introductory Statistics',
      description:
        'Peer-reviewed open textbook covering descriptive statistics, probability distributions, sampling and confidence intervals — the statistical foundations this stage teaches.',
      url: 'https://openstax.org/books/introductory-statistics/pages/1-introduction',
      type: 'book',
      free: true,
      source: 'OpenStax (Rice University)',
    },
  ],
  datascience: [
    {
      id: 'ds-11',
      title: 'scikit-learn — Getting Started',
      description:
        'Official introduction to the scikit-learn workflow: fitting, predicting, model selection and evaluation — the machine-learning workflow this stage requires.',
      url: 'https://scikit-learn.org/stable/getting_started.html',
      type: 'docs',
      free: true,
      source: 'scikit-learn',
    },
  ],
  devops: [
    {
      id: 'dv-11',
      title: 'Docker Docs — What is a container?',
      description:
        'Official Docker concepts page: images, containers and the build/run lifecycle — the container fundamentals this stage builds on before orchestration.',
      url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/',
      type: 'docs',
      free: true,
      source: 'Docker Docs',
    },
  ],
  cyber: [
    {
      id: 'cy-11',
      title: 'MDN — Client-Server overview',
      description:
        'Clear explanation of how clients and servers communicate over a network, including HTTP, DNS, ports and the request/response cycle — the networking fundamentals this stage requires.',
      url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview',
      type: 'docs',
      free: true,
      source: 'MDN Web Docs',
    },
  ],
  crypto: [
    {
      id: 'cr-24',
      title: 'ethers — Getting Started',
      description:
        'Official guide to connecting a JavaScript application to Ethereum: providers, signers, contracts and reading/writing chain data — the Web3 front-end wiring this stage requires.',
      url: 'https://docs.ethers.org/v6/getting-started/',
      type: 'docs',
      free: true,
      source: 'ethers',
    },
  ],
  productmgmt: [
    {
      id: 'prd-14',
      title: 'ProductPlan — The Ultimate Guide to Product Management',
      description:
        'End-to-end guide to product management: discovering real user problems, outcomes over outputs, and how product decisions get made — the product-thinking foundations this stage teaches.',
      url: 'https://www.productplan.com/learn/what-is-product-management/',
      type: 'docs',
      free: true,
      source: 'ProductPlan',
    },
    {
      id: 'prd-15',
      title: 'Atlassian — Product Management guide',
      description:
        'Agile product management explained: discovery, prioritisation and delivery with user problems at the centre — a second view of the product-thinking this stage covers.',
      url: 'https://www.atlassian.com/agile/product-management',
      type: 'docs',
      free: true,
      source: 'Atlassian',
    },
    {
      id: 'prd-16',
      title: 'Nielsen Norman Group — User Interviews 101',
      description:
        'How to run user interviews that surface real behaviour rather than opinions: recruiting, question design and avoiding leading prompts — the core research method this stage requires.',
      url: 'https://www.nngroup.com/articles/user-interviews/',
      type: 'docs',
      free: true,
      source: 'Nielsen Norman Group',
    },
    {
      id: 'prd-17',
      title: 'ProductPlan — Product Strategy',
      description:
        'How to set product strategy: vision, target outcomes and the prioritisation frameworks that connect them to a roadmap — the strategy work this stage requires.',
      url: 'https://www.productplan.com/learn/product-strategy/',
      type: 'docs',
      free: true,
      source: 'ProductPlan',
    },
    {
      id: 'prd-18',
      title: 'Nielsen Norman Group — Prioritization Methods',
      description:
        'Comparison of prioritisation methods (impact/effort, Kano, weighted scoring) and when each is appropriate — the prioritisation skill this stage requires.',
      url: 'https://www.nngroup.com/articles/prioritization-methods/',
      type: 'docs',
      free: true,
      source: 'Nielsen Norman Group',
    },
  ],
  sonic: [
    {
      id: 'son-12',
      title: 'Foundry Book — Getting Started (Installation)',
      description:
        'Official Foundry setup guide: installing, compiling, testing and deploying contracts from the command line — the toolchain this smart-contract stage requires.',
      url: 'https://book.getfoundry.sh/getting-started/installation',
      type: 'docs',
      free: true,
      source: 'Foundry Book',
    },
    {
      id: 'son-13',
      title: 'OpenZeppelin Contracts — Documentation',
      description:
        'Audited, standard smart-contract building blocks (tokens, access control, security utilities) with guidance on safe composition — the ecosystem-standard libraries and security practices this stage covers.',
      url: 'https://docs.openzeppelin.com/contracts/5.x/',
      type: 'docs',
      free: true,
      source: 'OpenZeppelin',
    },
    {
      id: 'son-14',
      title: 'ethereum.org — What is Web3 and why is it important?',
      description:
        'Clear, neutral introduction to Web3: how it differs from Web2, what decentralization and public blockchains actually mean, and where the claims about it are still unproven — the Web3 grounding this first stage requires.',
      url: 'https://ethereum.org/en/web3/',
      type: 'docs',
      free: true,
      source: 'Ethereum Foundation',
    },
    {
      id: 'son-15',
      title: 'ethereum.org — Technical intro to Ethereum',
      description:
        'Technical introduction to blockchains and Ethereum: nodes, accounts, transactions, gas and the EVM — the mechanics behind Web3 that this stage must establish.',
      url: 'https://ethereum.org/en/developers/docs/intro-to-ethereum/',
      type: 'docs',
      free: true,
      source: 'Ethereum Foundation',
    },
  ],
  ai: [
    {
      id: 'ai-7',
      title: 'IBM — What is Artificial Intelligence (AI)?',
      description:
        'Plain-language explanation of what AI is and is not, the main categories (machine learning, generative AI) and how to judge what a given AI tool can actually do — the grounding this "understanding AI tools" stage requires.',
      url: 'https://www.ibm.com/think/topics/artificial-intelligence',
      type: 'docs',
      free: true,
      source: 'IBM',
    },
  ],
}

/** Maps each additional resource id to the stage it supports. */
export const EXTENDED_RESOURCE_STAGE_MAP: Record<string, Record<string, number>> = {
  frontend: { 'fe-19': 3, 'fe-20': 4, 'fe-21': 4, 'fe-22': 4 },
  backend: { 'be-16': 1, 'be-17': 1, 'be-18': 4, 'be-19': 4, 'be-20': 4, 'be-21': 4, 'be-22': 4 },
  python: { 'py-9': 3, 'py-10': 1, 'py-11': 4, 'py-12': 4, 'py-13': 4 },
  uiux: { 'ux-13': 3 },
  data: { 'da-11': 1, 'da-12': 3, 'da-13': 4, 'da-14': 5 },
  datascience: { 'ds-11': 3 },
  devops: { 'dv-11': 3 },
  cyber: { 'cy-11': 1 },
  crypto: { 'cr-24': 7 },
  productmgmt: { 'prd-14': 1, 'prd-15': 1, 'prd-16': 2, 'prd-17': 3, 'prd-18': 3 },
  sonic: { 'son-12': 4, 'son-13': 5, 'son-14': 1, 'son-15': 1 },
  ai: { 'ai-7': 1 },
}

/** Resources added by this module for a track (empty when none). */
export function getExtendedStageResources(trackId: string): Resource[] {
  return EXTENDED_STAGE_RESOURCES[trackId] ?? []
}

/** Resources from this module mapped to a specific stage. */
export function getExtendedStageResourcesForStage(trackId: string, stageId: number): Resource[] {
  const map = EXTENDED_RESOURCE_STAGE_MAP[trackId] ?? {}
  return getExtendedStageResources(trackId).filter((resource) => map[resource.id] === stageId)
}
