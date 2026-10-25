import type { Project } from './tracks'
import type { ProjectBrief } from './curriculum'
import { getPackageExtraProject, getPackageExtraProjects } from './curriculum-package/projects.generated'

/**
 * Stage-project gaps closed in this run.
 *
 * The curriculum-quality audit reported 41 progression-bearing stages without an
 * embedded, AI-assessable project. Rather than deleting the existing projects or
 * inventing filler, this module:
 *   - reuses an existing catalogue project when it genuinely demonstrates the
 *     stage's skill (see STAGE_PROJECT_MAP_EXTENDED), and
 *   - authors a new project (with a full brief) only where no existing project
 *     fit.
 *
 * Merged into STAGE_PROJECT_MAP / PROJECT_BRIEFS by `lib/curriculum.ts` and into
 * the served path by `lib/guided-path.ts`, so the audit and the learner see the
 * same projects.
 */

/** New authored projects, keyed by track id. */
export const EXTRA_STAGE_PROJECTS: Record<string, Project[]> = {
  fullstack: [
    {
      id: 'fs-p5',
      title: 'Production Deployment & Observability',
      description:
        'Take a full-stack app to production: environment configuration, build, CI/CD deploy, health checks, structured logging, and a rollback plan.',
      level: 'intermediate',
      techTags: ['CI/CD', 'Docker', 'Deployment', 'Observability'],
    },
  ],
  datascience: [
    {
      id: 'ds-p5',
      title: 'Deep Learning Transfer Learning Pipeline',
      description:
        'Fine-tune a pretrained image model on a small dataset: data augmentation, a train/validation split, tracked experiments, and error analysis on the confusion matrix.',
      level: 'intermediate',
      techTags: ['PyTorch', 'Transfer Learning', 'Experiment Tracking'],
    },
  ],
  devops: [
    {
      id: 'dv-p4',
      title: 'Kubernetes Orchestration & Autoscaling',
      description:
        'Deploy a containerised service to a Kubernetes cluster with deployments, services, ingress, config/secrets, resource limits, and a horizontal pod autoscaler validated under load.',
      level: 'intermediate',
      techTags: ['Kubernetes', 'Ingress', 'Autoscaling', 'Cloud'],
    },
  ],
  youtube: [
    {
      id: 'yt-p4',
      title: 'Channel Strategy Blueprint',
      description:
        'Define a niche, audience, value proposition, and content pillars with evidence of demand. Produce a 90-day publishing plan and success metrics.',
      level: 'beginner',
      techTags: ['YouTube Strategy', 'Audience Research', 'Content Planning'],
    },
  ],
  ai: [
    {
      id: 'ai-p4',
      title: 'Field AI Workflow Playbook',
      description:
        'Build three documented, field-specific AI workflows for your own work: task definition, context template, instructions, review checklist, and a failure log.',
      level: 'intermediate',
      techTags: ['AI', 'Workflow Design', 'Documentation'],
    },
  ],
  writing: [
    {
      id: 'tw-p4',
      title: 'Clarity Rewrite Clinic',
      description:
        'Take a dense, jargon-heavy source (internal doc, release note, or spec) and rewrite it for a defined audience: cut ambiguity, add structure, and justify each change.',
      level: 'beginner',
      techTags: ['Technical Writing', 'Editing', 'Audience Analysis'],
    },
  ],
  projectmgmt: [
    {
      id: 'pm-p6',
      title: 'Agile vs Waterfall Decision Brief',
      description:
        'For two contrasting projects, compare Agile and predictive delivery across uncertainty, scope stability, and regulatory need, then justify a method choice with evidence.',
      level: 'beginner',
      techTags: ['Agile', 'Waterfall', 'Decision Making'],
    },
    {
      id: 'pm-p7',
      title: 'Project Budget & Status Reporting Pack',
      description:
        'Produce a project budget with a variance tracker, an earned-value snapshot, and a one-page executive status report that surfaces risks and decisions.',
      level: 'intermediate',
      techTags: ['Budgeting', 'Earned Value', 'Reporting'],
    },
  ],
  productmgmt: [
    {
      id: 'prd-p6',
      title: 'Growth Metrics & Funnel Dashboard',
      description:
        'Define a North Star and supporting metrics, map a product funnel, identify the biggest drop-off, and build a one-page dashboard that communicates the insight.',
      level: 'intermediate',
      techTags: ['Metrics', 'Funnels', 'Analytics'],
    },
    {
      id: 'prd-p7',
      title: 'Experiment Design & Readout',
      description:
        'Design a controlled experiment for a product hypothesis: metric, guardrails, sample, success threshold, then write a readout with a ship/iterate/stop recommendation.',
      level: 'intermediate',
      techTags: ['A/B Testing', 'Experimentation', 'Analysis'],
    },
    {
      id: 'prd-p8',
      title: 'Feature Ship Case Study',
      description:
        'Take one feature from spec to launch: engineering-ready requirements, trade-off notes, launch checklist, rollout plan, and a retrospective on what changed after feedback.',
      level: 'advanced',
      techTags: ['Delivery', 'Requirements', 'Launch', 'Portfolio'],
    },
  ],
  sonic: [
    {
      id: 'son-p6',
      title: 'Sonic Ecosystem Onboarding Guide',
      description:
        'Produce an evidence-based guide to the Sonic ecosystem: chain parameters, tooling, bridges, and key dApps, verified against official sources with a comparison to one other L1.',
      level: 'beginner',
      techTags: ['Sonic', 'Research', 'Documentation'],
    },
    {
      id: 'son-p7',
      title: 'Sonic dApp Security Review',
      description:
        'Review a deployed Sonic contract for common Solidity vulnerabilities. Document findings with severity, proof-of-concept reasoning, and remediation in an authorized test environment only.',
      level: 'intermediate',
      techTags: ['Smart Contract Security', 'Solidity', 'Sonic'],
    },
  ],
  crypto: [
    {
      id: 'cr-p9',
      title: 'Block Explorer Investigation',
      description:
        'Trace a real transaction end to end on a testnet explorer: from, to, value, gas, logs, and contract interaction. Explain each field and what the receipt proves.',
      level: 'beginner',
      techTags: ['Blockchain', 'Explorer', 'Transactions'],
    },
    {
      id: 'cr-p10',
      title: 'Self-Custody Wallet Security Setup',
      description:
        'Set up and document a self-custody wallet: key/seed handling, hardware or secure storage plan, backup and recovery procedure, and a phishing/approval-risk checklist.',
      level: 'beginner',
      techTags: ['Wallets', 'Key Management', 'Security'],
    },
    {
      id: 'cr-p11',
      title: 'Automated Audit Pipeline',
      description:
        'Build a repeatable smart-contract audit pipeline: Slither static analysis, Foundry fuzz/invariant tests, a triage of findings, and a short report distinguishing true positives from noise.',
      level: 'advanced',
      techTags: ['Slither', 'Foundry', 'Fuzzing', 'Auditing'],
    },
    {
      id: 'cr-pf',
      title: 'Web3 Capstone: Deploy, Build, Audit, Analyse',
      description:
        'Ship an end-to-end Web3 artefact: a deployed contract, a minimal dApp frontend, a security review, and an on-chain analysis of its usage — packaged as a portfolio case study.',
      level: 'advanced',
      techTags: ['Solidity', 'dApp', 'Security', 'On-Chain Analysis', 'Portfolio'],
    },
  ],
}

/** Stage → project mappings that close the reported project gaps. */
export const STAGE_PROJECT_MAP_EXTENDED: Record<string, Record<number, string>> = {
  fullstack: { 2: 'fs-p2', 4: 'fs-p5' },
  datascience: { 4: 'ds-p5' },
  devops: { 4: 'dv-p4' },
  youtube: { 1: 'yt-p4', 2: 'yt-p1', 3: 'yt-p2' },
  ai: { 3: 'ai-p4' },
  writing: { 1: 'tw-p4', 2: 'tw-p2', 3: 'tw-p1' },
  projectmgmt: { 1: 'pm-p1', 2: 'pm-p6', 3: 'pm-p3', 4: 'pm-p2', 5: 'pm-p7' },
  dart: { 1: 'dart-p1', 2: 'dart-p2', 3: 'dart-p3' },
  productmgmt: { 1: 'prd-p1', 2: 'prd-p2', 3: 'prd-p4', 4: 'prd-p3', 5: 'prd-p6', 6: 'prd-p7', 7: 'prd-p8' },
  sonic: { 1: 'son-p1', 2: 'son-p6', 3: 'son-p2', 4: 'son-p4', 5: 'son-p7' },
  crypto: {
    1: 'cr-p9', 2: 'cr-p10', 3: 'cr-p2', 4: 'cr-p1', 5: 'cr-p7', 6: 'cr-p6',
    7: 'cr-p5', 8: 'cr-p4', 9: 'cr-p8', 10: 'cr-p11', 11: 'cr-p3',
  },
}

/** Authored briefs for the new projects. */
export const PROJECT_BRIEFS_EXTENDED: Record<string, ProjectBrief> = {
  'fs-p5': {
    problem: 'A working full-stack app exists locally but has never been deployed reliably or observed in production.',
    audience: 'A small team that needs repeatable releases without downtime surprises.',
    objective: 'Deploy the app to a hosted environment with configuration, CI/CD, health checks, logs, and a rollback plan.',
    prerequisites: ['A complete full-stack app', 'A container or build step', 'A CI runner (e.g. GitHub Actions)'],
    functionalRequirements: [
      'Environment-specific configuration via environment variables',
      'A repeatable build and deploy pipeline',
      'A health/readiness endpoint',
      'Structured logs and a basic error-alerting plan',
    ],
    constraints: ['No secrets in the repository or image', 'Deployment must be reproducible from scratch', 'Must not require manual file edits on the server'],
    milestones: ['Containerise/build', 'Configure environments', 'Automate deploy in CI', 'Add health checks and logs', 'Document rollback'],
    acceptanceCriteria: [
      'A push to main deploys automatically and succeeds',
      'The app starts from a clean environment with only documented configuration',
      'A health check reports status',
      'Rollback steps are documented and tested once',
    ],
    evidence: ['Repository with the pipeline config', 'A link to the running deployment', 'A short operations note (logs, alerts, rollback)'],
    commonFailureCases: ['Hard-coded secrets', 'A deploy that only works on one machine', 'No way to tell whether the app is healthy'],
    stretchGoal: 'Add zero-downtime deploys and a staging environment.',
    portfolioPresentation: 'Present the pipeline diagram and the operational safeguards, not just the app screenshot.',
  },
  'ds-p5': {
    problem: 'A small labelled image dataset needs a strong model quickly, without training a network from scratch.',
    audience: 'A team that needs to prove a computer-vision idea works before investing in more data.',
    objective: 'Fine-tune a pretrained model and analyse where it fails.',
    prerequisites: ['Python and PyTorch or TensorFlow basics', 'A labelled image dataset (can be a small public one)'],
    functionalRequirements: [
      'Load and split the dataset (train/validation)',
      'Fine-tune a pretrained model',
      'Track at least two experiments (e.g. learning rate or augmentation)',
      'Report a confusion matrix and per-class performance',
    ],
    constraints: ['Use a pretrained backbone rather than training from scratch', 'Document the split and preprocessing', 'Do not leak validation data into training'],
    milestones: ['Prepare data', 'Baseline run', 'Tune/augment', 'Evaluate and analyse errors'],
    acceptanceCriteria: [
      'The model beats a majority-class baseline on validation',
      'Experiments are comparable and logged',
      'At least three concrete error cases are explained',
    ],
    evidence: ['Notebook or repository', 'Training/validation metrics', 'Error-analysis notes with example failures'],
    commonFailureCases: ['Data leakage between splits', 'Reporting only accuracy on an imbalanced set', 'No baseline to compare against'],
    stretchGoal: 'Add class weighting and compare against a second backbone.',
    portfolioPresentation: 'Lead with the error analysis — it shows judgement beyond a single accuracy number.',
  },
  'dv-p4': {
    problem: 'A container runs on one host but the app must survive restarts, traffic spikes, and configuration changes.',
    audience: 'An engineering team standardising deployments on Kubernetes.',
    objective: 'Deploy the service to Kubernetes with proper configuration, scaling, and health management.',
    prerequisites: ['Docker fundamentals', 'Access to a test cluster (local or cloud)'],
    functionalRequirements: [
      'Deployment and Service manifests (or Helm chart)',
      'ConfigMaps/Secrets separation',
      'Liveness and readiness probes',
      'Resource requests/limits',
      'Horizontal Pod Autoscaler validated under load',
    ],
    constraints: ['No secrets baked into images', 'Workload must be reachable only through the intended ingress', 'Must be reproducible from manifests'],
    milestones: ['Container image', 'Manifests', 'Config and probes', 'Autoscaling', 'Load validation'],
    acceptanceCriteria: [
      'Pods recover automatically after being killed',
      'The HPA scales under synthetic load and scales back down',
      'Only the ingress exposes the service',
    ],
    evidence: ['Manifests/chart in a repository', 'Output of `kubectl get`/`describe` for the workload and HPA', 'A short load-test summary'],
    commonFailureCases: ['No resource limits, so one pod starves the node', 'Missing readiness probe causing traffic to fail fast', 'Secrets committed in plaintext'],
    stretchGoal: 'Add a rolling-update strategy with zero-downtime verification.',
    portfolioPresentation: 'Show the scaling graph and the probe configuration — the reliability evidence.',
  },
  'yt-p4': {
    problem: 'A new channel has no clear audience or reason to exist beyond "I want to post videos".',
    audience: 'The channel creator starting from zero.',
    objective: 'Produce a defensible channel strategy before producing content.',
    prerequisites: ['None'],
    functionalRequirements: [
      'A specific niche and target viewer',
      'A value proposition and 3–4 sustainable content pillars',
      'Evidence of search/audience demand',
      'A 90-day publishing plan and success metrics',
    ],
    constraints: ['Strategy must be affordable to sustain', 'Pillars must be realistically producible'],
    milestones: ['Audience definition', 'Demand research', 'Pillars', '90-day plan'],
    acceptanceCriteria: ['The niche is specific enough to name the viewer', 'Each pillar is justified by demand evidence', 'The plan is achievable at the stated cadence'],
    evidence: ['A strategy document', 'Screenshots of demand research (search/analytics)', 'A calendar of the first 12 planned videos'],
    commonFailureCases: ['A niche so broad it competes with everyone', 'Pillars with no evidence of demand', 'A cadence the creator cannot sustain'],
    stretchGoal: 'Add a differentiation analysis against three established channels.',
    portfolioPresentation: 'Frame it as a business case: viewer, value, evidence, and plan.',
  },
  'ai-p4': {
    problem: 'Generic AI advice does not translate into repeatable, field-specific work.',
    audience: 'The learner\'s own professional context and a reviewer in the same field.',
    objective: 'Create three documented AI workflows that fit the learner\'s actual work.',
    prerequisites: ['The earlier stages of this track'],
    functionalRequirements: [
      'Three recurring tasks from the learner\'s field',
      'For each: task definition, context template, instructions, expected output, and a review checklist',
      'A logged failure example per workflow with the fix',
    ],
    constraints: ['Do not use confidential or unapproved data', 'Each workflow must be re-runnable by someone else'],
    milestones: ['Identify tasks', 'Design workflows', 'Test and log failures', 'Refine and document'],
    acceptanceCriteria: ['Each workflow produces a usable output from a defined input', 'Each includes a review step', 'Failure examples are genuine and the fix is explained'],
    evidence: ['A playbook document with the three workflows', 'Input/output examples', 'A failure log with corrections'],
    commonFailureCases: ['Vague prompts that only work once', 'No human review step', 'Using sensitive data in an unapproved tool'],
    stretchGoal: 'Add a fourth workflow that chains two AI steps with an explicit check between them.',
    portfolioPresentation: 'Present it as a professional playbook a colleague could adopt tomorrow.',
  },
  'tw-p4': {
    problem: 'A dense internal document is hard for its real audience to act on.',
    audience: 'A named, non-expert reader who must act on the content.',
    objective: 'Rewrite the source for clarity without losing accuracy.',
    prerequisites: ['None'],
    functionalRequirements: [
      'A defined audience and purpose',
      'A restructured version (headings, short paragraphs, examples)',
      'Annotated justifications for the major changes',
      'A before/after comparison',
    ],
    constraints: ['Do not change technical meaning', 'Keep all required information', 'Prefer plain language over jargon where possible'],
    milestones: ['Audience analysis', 'Draft rewrite', 'Annotate changes', 'Peer check for accuracy'],
    acceptanceCriteria: ['A reader can find the key action quickly', 'No factual meaning changed', 'At least five changes are justified'],
    evidence: ['Before and after documents', 'An annotated list of changes and why', 'A short accuracy review note'],
    commonFailureCases: ['Simplifying until the content is wrong', 'No audience definition', 'Changes made with no rationale'],
    stretchGoal: 'Rewrite the same source for a second, more technical audience and compare.',
    portfolioPresentation: 'Show the reasoning behind the edits — that is the skill.',
  },
  'pm-p6': {
    problem: 'Teams often default to one delivery method without weighing the project\'s real conditions.',
    audience: 'A project sponsor deciding how to run a project.',
    objective: 'Compare Agile and predictive (waterfall) delivery and justify a choice.',
    prerequisites: ['The Agile and predictive lessons in this track'],
    functionalRequirements: [
      'Two contrasting project scenarios',
      'A comparison across uncertainty, scope stability, regulation, and stakeholder access',
      'A justified recommendation per scenario',
    ],
    constraints: ['Base the comparison on the project conditions, not preference', 'Cite the factors explicitly'],
    milestones: ['Define scenarios', 'Compare factors', 'Recommend and justify', 'Note trade-offs'],
    acceptanceCriteria: ['Each recommendation follows from the stated conditions', 'Trade-offs and risks of the chosen method are acknowledged', 'Both scenarios name the specific factors (uncertainty, scope stability, regulation, stakeholder access) that drove the choice'],
    evidence: ['A decision brief for both scenarios', 'A comparison matrix', 'A short risk note per choice'],
    commonFailureCases: ['Choosing a method by fashion', 'Ignoring regulatory or contractual constraints', 'No acknowledgement of the method\'s weaknesses'],
    stretchGoal: 'Add a hybrid approach and explain when it is justified.',
    portfolioPresentation: 'Present it as an advisory memo a sponsor could act on.',
  },
  'pm-p7': {
    problem: 'A project is tracked informally, so cost and schedule problems surface too late.',
    audience: 'A steering committee or sponsor who needs a clear status view.',
    objective: 'Produce a budget with variance tracking and an executive status report.',
    prerequisites: ['The budgeting and reporting lessons in this track'],
    functionalRequirements: [
      'A project budget with categories and a variance tracker',
      'An earned-value snapshot (PV, EV, AC and the derived indices)',
      'A one-page status report with risks and decisions needed',
    ],
    constraints: ['Figures must reconcile across budget, EV, and report', 'State assumptions explicitly'],
    milestones: ['Build the budget', 'Add variance tracking', 'Compute EV', 'Write the status report'],
    acceptanceCriteria: ['Budget totals reconcile', 'CPI/SPI are computed correctly from stated values', 'The report names the top risks and required decisions'],
    evidence: ['A spreadsheet with the budget and EV', 'The one-page status report', 'Assumptions and sources'],
    commonFailureCases: ['Reporting percent-complete without earned value', 'Numbers that do not reconcile', 'A report with no decisions requested'],
    stretchGoal: 'Add a forecast-to-complete using the earned-value indices.',
    portfolioPresentation: 'Show that a sponsor could make a go/no-go decision from the report alone.',
  },
  'prd-p6': {
    problem: 'A product team measures activity but not the funnel that drives growth.',
    audience: 'A product team and its stakeholders.',
    objective: 'Define a metric model, map the funnel, and surface the biggest opportunity.',
    prerequisites: ['The metrics lessons in this track'],
    functionalRequirements: [
      'A North Star metric and 2–3 supporting metrics with definitions',
      'A funnel map with stage volumes',
      'Identification of the largest drop-off with a hypothesis',
      'A one-page dashboard mock',
    ],
    constraints: ['Every metric must have a precise definition and data source', 'Guardrail metrics must be included'],
    milestones: ['Define metrics', 'Map the funnel', 'Analyse drop-offs', 'Design the dashboard'],
    acceptanceCriteria: ['Metric definitions are unambiguous', 'The funnel identifies a specific weak stage', 'The dashboard communicates one clear insight'],
    evidence: ['A metrics definition document', 'The funnel analysis', 'A dashboard mock with the headline insight'],
    commonFailureCases: ['Vanity metrics without definitions', 'A funnel that ignores a segment', 'No guardrail metrics'],
    stretchGoal: 'Segment the funnel by user type and compare.',
    portfolioPresentation: 'Lead with the insight and the decision it implies, not the chart.',
  },
  'prd-p7': {
    problem: 'A product change is shipped on opinion rather than evidence.',
    audience: 'A product team deciding whether to invest in a change.',
    objective: 'Design a controlled experiment and commit to a pre-registered decision rule.',
    prerequisites: ['The experimentation lessons in this track'],
    functionalRequirements: [
      'A falsifiable hypothesis',
      'A primary metric, guardrail metrics, and a success threshold',
      'Sample/segment plan and duration',
      'A pre-committed decision rule (ship/iterate/stop)',
    ],
    constraints: ['Decision rule must be set before results', 'Guardrails must be able to block a launch'],
    milestones: ['Hypothesis', 'Metric and threshold', 'Design and sample', 'Readout template'],
    acceptanceCriteria: ['The hypothesis is testable and specific', 'The success threshold is justified', 'The readout applies the rule to realistic results'],
    evidence: ['An experiment design document', 'A readout using (real or realistic) results', 'The final recommendation'],
    commonFailureCases: ['Moving the goalposts after results', 'Ignoring a guardrail regression', 'Stopping early on a fluke'],
    stretchGoal: 'Add a second variant and a documented multiple-comparison caveat.',
    portfolioPresentation: 'Emphasise the discipline of the pre-registered rule.',
  },
  'prd-p8': {
    problem: 'Features slip between a good spec and a working launch.',
    audience: 'A product team and an engineering partner.',
    objective: 'Take one feature from spec to launch and reflect on the outcome.',
    prerequisites: ['The requirements and shipping lessons in this track'],
    functionalRequirements: [
      'Engineering-ready requirements with acceptance criteria',
      'Trade-off notes (scope, quality, time)',
      'A launch/rollout plan with metrics to watch',
      'A retrospective on what changed after feedback',
    ],
    constraints: ['Requirements must be testable', 'Must include a rollback/kill-switch plan'],
    milestones: ['Write the spec', 'Agree trade-offs', 'Plan the rollout', 'Reflect on the outcome'],
    acceptanceCriteria: ['Acceptance criteria are objectively checkable', 'The rollout plan states success and failure signals', 'The retrospective is candid about what changed'],
    evidence: ['The spec', 'The rollout plan', 'The retrospective'],
    commonFailureCases: ['Acceptance criteria no one can test', 'No rollout safety net', 'A retrospective that hides problems'],
    stretchGoal: 'Add a phased rollout with a feature flag and staged percentages.',
    portfolioPresentation: 'Tell the spec → decision → launch → learning story end to end.',
  },
  'son-p6': {
    problem: 'The Sonic ecosystem is new and easy to misrepresent from second-hand sources.',
    audience: 'A developer or contributor new to Sonic.',
    objective: 'Produce an accurate, sourced onboarding guide to the Sonic ecosystem.',
    prerequisites: ['Blockchain and wallet basics'],
    functionalRequirements: [
      'Chain parameters, RPC, explorers, and faucets (verified against official sources)',
      'Key tooling and bridges',
      'A comparison with one other L1/L2',
      'A getting-started checklist',
    ],
    constraints: ['Every factual claim must cite an official source', 'Separate verified facts from open questions'],
    milestones: ['Gather sources', 'Verify facts', 'Write the guide', 'Peer review'],
    acceptanceCriteria: ['All parameters are sourced and current', 'The comparison is fair and evidenced', 'The checklist gets a newcomer to a first testnet transaction'],
    evidence: ['The guide', 'A source list', 'A completed getting-started checklist'],
    commonFailureCases: ['Copying outdated parameters', 'Uncited claims', 'Confusing testnet and mainnet'],
    stretchGoal: 'Add a short video or screenshot walkthrough of the first transaction.',
    portfolioPresentation: 'Present it as a public resource with a verifiable source list.',
  },
  'son-p7': {
    problem: 'A deployed contract may contain vulnerabilities that a reader cannot see.',
    audience: 'The team that owns the contract (authorized review only).',
    objective: 'Review an authorized contract and report real, reproducible findings.',
    prerequisites: ['Solidity fundamentals', 'The security lessons in this track'],
    functionalRequirements: [
      'A scope statement and authorized environment',
      'Static/manual review for common vulnerability classes',
      'Findings with severity, reasoning, and remediation',
      'An honest list of what was not checked',
    ],
    constraints: ['Only review contracts you are authorized to test', 'No testing against production/mainnet funds', 'Do not fabricate findings'],
    milestones: ['Scope', 'Review', 'Validate findings', 'Report'],
    acceptanceCriteria: ['Each finding is reproducible or clearly reasoned', 'Severity is justified', 'Limitations are stated'],
    evidence: ['The review report', 'Reproduction steps or reasoning', 'A scope and authorization note'],
    commonFailureCases: ['Inflating low-severity issues', 'Testing unauthorized contracts', 'Claiming coverage that was not performed'],
    stretchGoal: 'Add a fuzz test that demonstrates one finding.',
    portfolioPresentation: 'Show professional judgement: accurate severity and honest scope.',
  },
  'cr-p9': {
    problem: 'Beginners trust a transaction hash without understanding what it proves.',
    audience: 'The learner building on-chain literacy.',
    objective: 'Trace and explain a real transaction on a testnet explorer.',
    prerequisites: ['A testnet wallet with a little test ETH'],
    functionalRequirements: [
      'A real transaction hash and its receipt',
      'An explanation of from/to/value/gas/status/logs',
      'At least one contract interaction with an event log',
    ],
    constraints: ['Use a testnet', 'Do not expose private keys'],
    milestones: ['Make a transaction', 'Read the receipt', 'Explain each field', 'Document the contract call'],
    acceptanceCriteria: ['Every field is explained correctly', 'The log is decoded and interpreted', 'The write-up would let a newcomer repeat it'],
    evidence: ['A written investigation', 'Explorer screenshots or links', 'The decoded event log'],
    commonFailureCases: ['Confusing gas used with gas price', 'Ignoring the status/logs', 'Exposing a key in a screenshot'],
    stretchGoal: 'Trace the same transaction through a second explorer and reconcile any differences.',
    portfolioPresentation: 'Present it as a teaching artefact: a readable transaction walkthrough.',
  },
  'cr-p10': {
    problem: 'Poor key handling is the most common way people lose funds.',
    audience: 'The learner securing their own assets.',
    objective: 'Set up self-custody with a tested recovery procedure and a risk checklist.',
    prerequisites: ['Wallet and key concepts from this stage'],
    functionalRequirements: [
      'A self-custody wallet set up on a testnet or with a hardware wallet',
      'A documented, offline seed backup plan',
      'A tested recovery procedure',
      'A phishing/token-approval risk checklist',
    ],
    constraints: ['Never store a real seed phrase digitally in the submission', 'Use placeholders in any shared evidence'],
    milestones: ['Set up wallet', 'Backup plan', 'Test recovery', 'Write the risk checklist'],
    acceptanceCriteria: ['Recovery was actually tested', 'No real seed is exposed in the submitted evidence', 'Checklist covers approvals and phishing'],
    evidence: ['A procedure document (with redacted/placeholder secrets)', 'A recovery test log', 'The risk checklist'],
    commonFailureCases: ['Storing a seed in a screenshot or note app', 'Never testing recovery', 'Ignoring token approvals'],
    stretchGoal: 'Add a multisig or social-recovery plan for higher-value holdings.',
    portfolioPresentation: 'Lead with the safety process, not the wallet screenshot.',
  },
  'cr-p11': {
    problem: 'Manual review alone is slow and misses classes of bugs that tools catch quickly.',
    audience: 'A security-focused developer or auditor.',
    objective: 'Build a repeatable, automated-plus-manual audit pipeline.',
    prerequisites: ['Foundry', 'The vulnerabilities and auditing lessons in this track'],
    functionalRequirements: [
      'Slither (or equivalent) static analysis run and triaged',
      'Foundry fuzz/invariant tests targeting suspected issues',
      'A triage that separates true positives from noise',
      'A short findings report',
    ],
    constraints: ['Authorized targets only', 'Do not report tool output as confirmed findings without validation'],
    milestones: ['Run static analysis', 'Write fuzz tests', 'Validate and triage', 'Report'],
    acceptanceCriteria: ['Each reported finding is validated or clearly marked unconfirmed', 'The pipeline is re-runnable', 'False positives are explained'],
    evidence: ['Pipeline scripts/config', 'Tool output', 'The triaged report'],
    commonFailureCases: ['Dumping raw tool output as findings', 'No validation step', 'Missing the false-positive explanation'],
    stretchGoal: 'Add a CI job that fails on new high-severity findings.',
    portfolioPresentation: 'Show the triage discipline — that is what separates an auditor from a script.',
  },
  'cr-pf': {
    problem: 'A Web3 portfolio needs to show the full lifecycle, not just a token deploy.',
    audience: 'A hiring manager or protocol team evaluating practical ability.',
    objective: 'Ship one coherent artefact spanning contract, frontend, security, and analysis.',
    prerequisites: ['All prior stages of this track'],
    functionalRequirements: [
      'A deployed contract on a testnet',
      'A minimal dApp frontend that interacts with it',
      'A security review of the contract',
      'An on-chain analysis of its usage',
    ],
    constraints: ['Testnet only unless explicitly authorized', 'No fabricated usage data', 'All third-party sources cited'],
    milestones: ['Contract', 'Frontend', 'Security review', 'Usage analysis', 'Packaging'],
    acceptanceCriteria: ['The dApp actually calls the deployed contract', 'The review and analysis are evidence-based', 'The case study is reproducible by a reviewer'],
    evidence: ['Repository', 'Deployed addresses', 'The review and analysis', 'A portfolio case study'],
    commonFailureCases: ['A dApp that does not reach the deployed contract', 'A review with no validated findings', 'Usage claims with no data'],
    stretchGoal: 'Add a second contract and show the interaction between them.',
    portfolioPresentation: 'Package it as a single story: idea → build → secure → measure.',
  },
}

export function getExtraProjects(trackId: string): Project[] {
  const authored = EXTRA_STAGE_PROJECTS[trackId] ?? []
  const imported = getPackageExtraProjects(trackId).map(({ id, title, description, level, techTags }) => ({
    id,
    title,
    description,
    level,
    techTags,
  }))
  return [...authored, ...imported]
}

export function getExtraProject(projectId: string): Project | undefined {
  for (const projects of Object.values(EXTRA_STAGE_PROJECTS)) {
    const found = projects.find((project) => project.id === projectId)
    if (found) return found
  }
  const imported = getPackageExtraProject(projectId)
  if (!imported) return undefined
  const { id, title, description, level, techTags } = imported
  return { id, title, description, level, techTags }
}
