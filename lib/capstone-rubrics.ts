/**
 * Client-style capstone briefs and scored rubrics for TechSkillHub's flagship tracks.
 *
 * Rubric weights total 100 per project. The same entries drive the project card
 * and the server-side assessment contract so learners see what the evaluator uses.
 */
export interface CapstoneCriterion {
  id: string
  label: string
  weight: number
  mandatory: boolean
}

export interface FlagshipCapstone {
  projectId: string
  clientBrief: string
  deliverables: string[]
  acceptanceCriteria: string[]
  evidence: string[]
  rubric: CapstoneCriterion[]
}

export const FLAGSHIP_CAPSTONES: Record<string, FlagshipCapstone> = {
  'fe-client-capstone': {
    projectId: 'fe-client-capstone',
    clientBrief: 'A local home-maintenance company wants a mobile-first service discovery and booking-request portal. Visitors must understand the available services, choose one, submit a request, and receive a clear confirmation without any live payment processing.',
    deliverables: [
      'Responsive service listing with search or filtering and clear service details.',
      'Typed booking-request form with validation, pending/success/error states, and duplicate-submit prevention.',
      'Accessible navigation, semantic controls, keyboard interaction, and meaningful error announcements.',
      'Jest tests for form validation, submission outcomes, and at least one failure case.',
      'Deployed preview, README with setup/configuration, and screenshots at mobile and desktop widths.',
    ],
    acceptanceCriteria: [
      'A visitor can find a service and submit a valid booking request; invalid input cannot be submitted.',
      'All required actions work by keyboard, controls have accessible names, and semantic structure is appropriate.',
      'The interface works at mobile and desktop widths and has useful loading, empty, success, and error states.',
      'React components, form data, and request/response shapes use TypeScript without avoidable any casts.',
      'Automated tests cover critical user flows and at least one failure response.',
      'The project deploys from documented instructions, contains no committed secrets, and explains known limitations.',
    ],
    evidence: ['Public repository', 'Live preview', 'Jest output or test report', 'Mobile and desktop screenshots', 'README and design decisions'],
    rubric: [
      { id: 'feature-correctness', label: 'Feature behaviour and booking-request flow meet the client requirements', weight: 25, mandatory: true },
      { id: 'accessibility', label: 'Semantic markup, keyboard access, accessible names and usable validation feedback', weight: 20, mandatory: true },
      { id: 'responsive-states', label: 'Responsive layout and complete loading, empty, success and error states', weight: 15, mandatory: true },
      { id: 'typescript', label: 'Clear React component boundaries and meaningful TypeScript types', weight: 15, mandatory: true },
      { id: 'automated-tests', label: 'Automated tests cover critical flows and meaningful failure cases', weight: 15, mandatory: true },
      { id: 'release-quality', label: 'Reproducible setup, safe configuration, deployment and honest documentation', weight: 10, mandatory: false },
    ],
  },
  'be-client-capstone': {
    projectId: 'be-client-capstone',
    clientBrief: 'A small repairs company needs a dependable appointment-intake API used by its staff dashboard. It must accept requests, validate client input, prevent duplicate bookings, protect staff-only operations, and expose operational behaviour clearly. Use synthetic data only.',
    deliverables: [
      'Documented API for service availability and appointment create/read/update/cancel flows.',
      'PostgreSQL persistence, migrations, request validation, and a defensible strategy for duplicate/idempotent requests.',
      'Authentication and role-based authorization for staff-only actions.',
      'Rate limiting or an equivalent abuse control, structured logs, and safe error responses.',
      'Unit/integration tests, API docs, deployment configuration, and recovery/operations notes.',
    ],
    acceptanceCriteria: [
      'Endpoints implement the documented appointment workflow with consistent status codes and response shapes.',
      'Inputs are validated and staff-only operations reject unauthorised users without leaking sensitive information.',
      'Database constraints/transactions or idempotency controls prevent duplicate or inconsistent bookings.',
      'The API has an explicit abuse-control strategy, useful structured logs, and no secrets in source control.',
      'Tests cover normal flows, validation failures, authorization failures, and a duplicate/concurrency edge case.',
      'A reviewer can run or inspect the API using the documented environment, schema, and API reference.',
    ],
    evidence: ['Public repository', 'OpenAPI/API documentation', 'Migration/schema evidence', 'Automated test report', 'Deployment or reproducible run instructions'],
    rubric: [
      { id: 'api-contract', label: 'Appointment endpoints satisfy the documented functional contract', weight: 20, mandatory: true },
      { id: 'validation-auth', label: 'Input validation, authentication/authorization, and safe error behaviour', weight: 20, mandatory: true },
      { id: 'data-integrity', label: 'Database integrity and duplicate/idempotent request handling', weight: 20, mandatory: true },
      { id: 'abuse-operations', label: 'Rate limiting or equivalent abuse controls, structured logs and secret hygiene', weight: 15, mandatory: true },
      { id: 'backend-tests', label: 'Automated tests cover happy paths, permission failures and important edge cases', weight: 15, mandatory: true },
      { id: 'delivery-docs', label: 'Reproducible deployment, API documentation and operational notes', weight: 10, mandatory: false },
    ],
  },
  'py-client-capstone': {
    projectId: 'py-client-capstone',
    clientBrief: 'A small distributor receives monthly sales and stock records from several branches and currently reconciles them manually. Build a repeatable Python pipeline that imports files, normalises rows, flags errors and duplicates, calculates reconciled totals, and exports a review-ready report. Use synthetic sample records, not real customer data.',
    deliverables: [
      'CLI or documented entry point that imports CSV/XLSX-like tabular input with a clear schema.',
      'Normalisation and validation pipeline with a separate rejected-row report and useful error reasons.',
      'Reconciliation rules for duplicates, missing fields, dates, quantities, and totals.',
      'Readable Excel/CSV summary and PDF or equivalent printable report.',
      'Tests for reconciliation arithmetic, duplicate handling, invalid rows, and repeatable runs.',
      'Structured logging, configuration, and instructions for scheduling or rerunning the process.',
    ],
    acceptanceCriteria: [
      'Input files are parsed into a documented schema and invalid rows do not silently disappear.',
      'Duplicate handling and reconciliation rules are explicit, deterministic, and covered by tests.',
      'The totals can be traced to input rows and reconcile to a documented expected sample result.',
      'The pipeline emits usable summary output and a separate report of rejected or suspicious rows.',
      'Tests cover valid data, malformed input, duplicates, missing fields, and arithmetic edge cases.',
      'A new learner can rerun the pipeline using synthetic data and the supplied documentation.',
    ],
    evidence: ['Public repository', 'Synthetic input fixtures', 'Expected/reconciled totals', 'Generated reports', 'Test output and README'],
    rubric: [
      { id: 'ingestion-normalisation', label: 'Input ingestion, schema normalisation and reliable file handling', weight: 20, mandatory: true },
      { id: 'validation-rejections', label: 'Validation, duplicate detection and explicit rejected-row reporting', weight: 20, mandatory: true },
      { id: 'reconciliation', label: 'Correct, traceable reconciliation rules and totals', weight: 20, mandatory: true },
      { id: 'reporting', label: 'Readable and useful output reports for a non-technical reviewer', weight: 15, mandatory: true },
      { id: 'python-tests', label: 'Automated tests cover correctness, malformed inputs and important edge cases', weight: 15, mandatory: true },
      { id: 'repeatable-operations', label: 'Reproducible execution, configuration, logs and maintenance notes', weight: 10, mandatory: false },
    ],
  },
  'ai-ag-p2': {
    projectId: 'ai-ag-p2',
    clientBrief: 'A small online shop wants a support-triage assistant that answers routine questions from the shop’s approved FAQ and policies, classifies tickets, and drafts suggested replies. It may call a sandboxed mock order-lookup tool, but must never issue refunds, change orders, or send customer-facing messages without a human approval step.',
    deliverables: [
      'Documented workflow explaining why agent behaviour is justified over a simpler deterministic workflow.',
      'Retrieval from a small, cited set of approved FAQs and policy documents; unsupported answers must say so.',
      'Constrained mock order-lookup tool with explicit input/output contract and no production credentials.',
      'Human approval queue for consequential actions, with no irreversible tool access granted to the model.',
      'Evaluation set covering routine requests, unsupported questions, prompt injection, tool failure and conflicting policy text.',
      'Audit log, retry/timeout/cost bounds, failure demonstrations, setup instructions and a short demo.',
    ],
    acceptanceCriteria: [
      'Answers cite approved policy/FAQ evidence and abstain when evidence is absent or conflicting.',
      'Tools expose only the minimum sandboxed read capability; untrusted ticket text cannot expand permissions.',
      'No refund, order change, or outbound response occurs before an explicit human approval.',
      'An evaluation set records expected outcomes for normal requests, edge cases and prompt-injection attempts.',
      'Audit logs connect an input, retrieved evidence, tool calls, decision and approval outcome without leaking secrets.',
      'Retries, timeouts, and model/tool spend are bounded; failure leads to a safe handoff rather than unbounded looping.',
      'README and demo allow a reviewer to reproduce the normal flow and at least five failure cases.',
    ],
    evidence: ['Architecture and permission diagram', 'Public repository with synthetic fixtures', 'Policy/FAQ source set with citations', 'Evaluation dataset and results', 'Audit-log examples', 'Failure-case demonstration and README'],
    rubric: [
      { id: 'grounded-retrieval', label: 'Grounded, cited answers with correct abstention when evidence is insufficient', weight: 20, mandatory: true },
      { id: 'tool-boundaries', label: 'Sandboxed tools with least privilege and validated tool contracts', weight: 20, mandatory: true },
      { id: 'human-approval', label: 'Human approval is required before consequential or outbound actions', weight: 20, mandatory: true },
      { id: 'agent-evaluation', label: 'Evaluation set covers routine cases, prompt injection, conflicts and tool failures', weight: 15, mandatory: true },
      { id: 'traceability', label: 'Auditability from input to evidence, tool calls, result and approval outcome', weight: 10, mandatory: true },
      { id: 'bounded-reliability', label: 'Safe bounded retries, timeouts, fallback behaviour and cost limits', weight: 10, mandatory: true },
      { id: 'reproducible-demo', label: 'Clear setup, synthetic test data, documented limitations and reproducible demonstration', weight: 5, mandatory: false },
    ],
  },
};

for (const capstone of Object.values(FLAGSHIP_CAPSTONES)) {
  const total = capstone.rubric.reduce((sum, criterion) => sum + criterion.weight, 0)
  if (total !== 100) throw new Error(`Capstone rubric ${capstone.projectId} totals ${total}, expected 100`)
  if (new Set(capstone.rubric.map((criterion) => criterion.id)).size !== capstone.rubric.length) {
    throw new Error(`Capstone rubric ${capstone.projectId} has duplicate criterion IDs`)
  }
}
