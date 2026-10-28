export interface AuthoredAIStageLesson {
  lesson: string
  workedExample: string
  commonMistakes: string[]
  appliedChallenge: string
}

/**
 * Authored flagship curriculum for AI Agents.
 *
 * Unlike the general-purpose fallback, each stage below explains its own
 * technical concept, gives a concrete decision procedure, and leads into an
 * applied exercise. These lessons are still subject to named subject-matter
 * review before the track can be described as expert-approved.
 */
export const AI_AGENTS_AUTHORED_LESSONS: Record<number, AuthoredAIStageLesson> = {
  1: {
    lesson: [
      'THE IDEA',
      'An AI agent is a software system that uses a model to choose among actions while working toward a defined goal. A normal program follows rules written in advance. A simple assistant responds to a request. A workflow runs a known sequence. An agent is useful when the next action depends on information discovered during the task, but it still needs a bounded goal and explicit limits.',
      '',
      'A model alone is not a complete agent. The system also needs instructions, tools, state, a loop that decides whether to continue, stopping rules, and a way to report the outcome. A model response that says it sent a refund is not proof a refund happened. The application must inspect the actual tool result and record it.',
      '',
      'WHEN TO USE ONE',
      'Use an agent when there are several possible steps, the correct next step depends on the result of an earlier step, and the task benefits from language understanding or judgment. Use a direct function or deterministic workflow when the path is predictable. Every extra agent loop creates more latency, cost, and possible failure.',
      '',
      'A USEFUL CONTRACT',
      'Define the goal, allowed inputs, tools the system may call, actions it must never take, the stopping condition, and the evidence required before claiming success. Write down at least one normal case, one ambiguous case, and one failure case before implementation.'
    ].join('\n'),
    workedExample: [
      'CASE: classify a customer support ticket.',
      'Step 1: a fixed rule can label messages containing an exact order ID, but cannot reliably interpret a message such as “the second item arrived damaged.”',
      'Step 2: an agent may classify the intent and request a read-only order lookup tool.',
      'Step 3: the application validates the order ID and tool arguments, executes the lookup, then returns the actual result to the model.',
      'Step 4: the agent drafts a response. It cannot issue a refund or change an address. Those actions are outside its permission boundary.',
      'Step 5: success means a valid category and evidence-backed draft were produced, not that the model merely returned confident prose.'
    ].join('\n'),
    commonMistakes: [
      'Calling every chatbot an agent even when it cannot choose or perform actions.',
      'Giving the agent a vague goal such as “help the customer” with no measurable stopping condition.',
      'Treating a model statement as evidence that a tool action succeeded.'
    ],
    appliedChallenge: [
      'Choose one everyday workflow. Draw the normal path and at least three alternative paths.',
      'Compare a deterministic workflow with an agent design. State which decisions truly need a model and which should remain ordinary code.',
      'Write a short agent contract with a goal, tools, permissions, stop condition, and three failure cases.'
    ].join('\n')
  },
  2: {
    lesson: [
      'THE DESIGN CHOICE',
      'A workflow is a sequence of steps chosen by the developer. An agent selects actions at runtime based on the current request, context, and tool results. Neither design is automatically better. The right choice is the simplest architecture that satisfies the requirement with acceptable quality and risk.',
      '',
      'A fixed invoice-export process should usually be a workflow: validate the date range, query records, generate a file, and return it. An assistant that must interpret an unclear request, determine which approved knowledge source to consult, and ask a clarifying question may benefit from agent behavior. A mixed design is common: deterministic code owns permissions and transactions, while a model handles classification or drafting.',
      '',
      'HOW TO DECIDE',
      'List the decisions the system must make. If the decisions can be expressed as stable conditions, use code. If a decision requires interpreting varied language, use a model for that bounded step. If the system must keep changing its plan after observing new results, an agent loop may be justified.',
      '',
      'Compare designs using the same representative test set. Track task success, wrong actions, escalation rate, latency, and cost. Do not justify an agent merely because it looks more advanced. If it adds no measurable value, it adds maintenance burden without improving the product.'
    ].join('\n'),
    workedExample: [
      'CASE: schedule a meeting.',
      'Step 1: a form collects attendees, date range, and duration. Fixed validation rejects impossible values.',
      'Step 2: a calendar API checks availability. This step is deterministic and should remain ordinary code.',
      'Step 3: a model may interpret “sometime after lunch next week” and ask for clarification if the phrase is ambiguous.',
      'Step 4: the application shows the proposed time and requires confirmation before creating the invitation.',
      'Compare this hybrid design with a fully autonomous agent. The model helps with language, while deterministic code handles availability and the final side effect.'
    ].join('\n'),
    commonMistakes: [
      'Building an agent for a task whose sequence and rules are already known.',
      'Letting a model make access-control or transaction decisions that must be deterministic.',
      'Comparing architectures on one impressive demo instead of a repeatable test set.'
    ],
    appliedChallenge: [
      'Choose an agent use case and draw a fully deterministic alternative.',
      'Mark each decision as fixed-rule, model-assisted, or human-approved, with a reason for each choice.',
      'Define three metrics that would demonstrate the agent version is genuinely better.'
    ].join('\n')
  },
  3: {
    lesson: [
      'DESIGN THE RESPONSIBILITY BEFORE THE PROMPT',
      'An agent specification should say what the agent owns and what it does not own. “Research a delivery delay and draft an update” is bounded. “Handle all customer problems” is not. Broad responsibilities make it difficult to predict which tools may be called, what evidence is required, and when the run should stop.',
      '',
      'Separate the agent goal from its capabilities. The goal defines the result. Tools define the operations it can request. Policies define forbidden actions. The runtime decides whether a requested action is allowed and executes it. Do not rely on natural-language instructions as the only security control.',
      '',
      'DESIGN A TASK LOOP',
      'A simple loop is: inspect the request, choose one permitted action, validate its inputs, execute it, inspect the result, and decide whether more work is needed. Set a maximum number of tool calls or elapsed time, and define what happens when the available evidence is insufficient. The agent must be able to stop and report uncertainty.',
      '',
      'Keep state small and explicit. The loop should know what it is trying to accomplish, what evidence it has gathered, what remains unresolved, and which actions have already succeeded. Store important facts in structured fields rather than burying them in an indefinitely growing prompt.'
    ].join('\n'),
    workedExample: [
      'CASE: triage a support ticket.',
      'Step 1: classify intent into a known set such as order_status, damaged_item, or policy_question.',
      'Step 2: use only the tool allowed for that category: an order lookup, approved policy retrieval, or human escalation.',
      'Step 3: validate the returned schema and attach the source or order record that supports the result.',
      'Step 4: draft the reply using only supported facts. If the evidence conflicts, do not invent a resolution.',
      'Step 5: stop after the draft or escalate. The agent is not authorized to perform account changes.'
    ].join('\n'),
    commonMistakes: [
      'Defining the agent by its persona while leaving its actual responsibilities vague.',
      'Putting every rule in a prompt and failing to enforce permissions in application code.',
      'Allowing unbounded loops or endless tool calls when the goal cannot be completed.'
    ],
    appliedChallenge: [
      'Write a one-page design for a single-purpose agent: inputs, goal, tools, output schema, forbidden actions, limits, and stopping rules.',
      'Draw the task loop and show the branch taken when a tool fails or evidence is missing.',
      'Ask another person to identify an ambiguous requirement in the contract, then revise it.'
    ].join('\n')
  },
  4: {
    lesson: [
      'TOOLS ARE AN API CONTRACT',
      'A tool is a controlled capability offered to the model, usually backed by an application function or external service. A useful tool has one clear purpose, a small input schema, a documented result, and predictable error behavior. The model can request a tool call; the host application validates and executes it. This separation matters because model-generated arguments are untrusted input.',
      '',
      'Prefer narrow tools such as lookup_order(order_id) over broad tools such as run_sql(query) or call_any_api(url, body). Narrow tools reduce accidental capability, make errors easier to diagnose, and are easier to test. Validate identifiers, ranges, enums, and ownership server-side. Treat returned content as data too; external pages and retrieved documents may contain misleading instructions.',
      '',
      'TOOL CALL LIFECYCLE',
      'The model requests a named operation and arguments. Your runtime validates the name and schema, checks authorization, executes the operation, and returns a structured success or error result. The model can then interpret that result. A tool call is not complete simply because the model requested it, and a tool error must not be silently rewritten as success.',
      '',
      'Separate read operations from side effects. Reading a policy is different from issuing a refund, deleting a record, sending a message, or changing an account. Side-effecting actions need stronger authorization, idempotency where appropriate, audit logging, and a human approval step when the consequence is material.'
    ].join('\n'),
    workedExample: [
      'CASE: an order lookup tool.',
      'Step 1: expose lookup_order with a single order_id string, not an arbitrary database query.',
      'Step 2: check that the current user is allowed to access that order before returning data.',
      'Step 3: return a typed result such as found, not_found, or unavailable, with only the fields needed for the task.',
      'Step 4: if the tool times out, return a failure the agent can understand and prevent the agent from claiming that the order was checked.',
      'Step 5: test malformed IDs, another user’s ID, missing orders, rate limits, and timeouts.'
    ].join('\n'),
    commonMistakes: [
      'Exposing broad tools with more privilege than the use case needs.',
      'Trusting model-generated arguments without validating types, authorization, and ownership.',
      'Failing to distinguish a failed tool call from a successful result.'
    ],
    appliedChallenge: [
      'Implement or specify two tools for the capstone: one read-only tool and one side-effecting action that remains disabled pending approval.',
      'Write schemas, normal results, error results, authorization rules, and five invalid-input tests.',
      'Explain why a broad shell, SQL, or arbitrary HTTP tool would be riskier than these narrow interfaces.'
    ].join('\n')
  },
  5: {
    lesson: [
      'CONTEXT IS NOT THE SAME AS MEMORY',
      'Context is the information available for the current decision. Memory is information retained for use later. A long conversation can contain stale, irrelevant, contradictory, or sensitive content; blindly appending everything does not make an agent more reliable. Retrieval, summarization, and structured state are different techniques and solve different problems.',
      '',
      'Use short-lived task state for progress through one job: the goal, completed operations, current evidence, and unresolved items. Use durable memory only when future work genuinely needs it. Store durable facts with a purpose, source, timestamp, and retention rule. User preferences should be distinguishable from unverified guesses and temporary task details.',
      '',
      'BUILD A CONTEXT POLICY',
      'Decide which source is authoritative for each fact. Current account state should come from the system of record, not a memory summary. Retrieved documents should remain traceable to the source and passage. If two sources conflict, record the conflict instead of silently blending them. Apply access control before retrieval so the model never receives data the current user may not see.',
      '',
      'Test what happens when the context is incomplete or stale. Ask whether the agent requests new evidence, clarifies, or stops safely. Memory should reduce repetitive work; it should not silently become an unreviewed source of truth.'
    ].join('\n'),
    workedExample: [
      'CASE: an agent supporting a returning customer.',
      'Step 1: fetch current order status from the order system for this request.',
      'Step 2: retrieve only the approved policy passages needed to answer the question, keeping their source IDs.',
      'Step 3: include a short task state containing the verified order, the relevant policy evidence, and the unresolved issue.',
      'Step 4: do not treat a note from a previous conversation as current shipping status.',
      'Step 5: if the customer identity or permissions cannot be confirmed, do not retrieve private order data.'
    ].join('\n'),
    commonMistakes: [
      'Calling an ever-growing conversation transcript a memory strategy.',
      'Using old summaries instead of querying authoritative data for current facts.',
      'Retrieving documents before checking user permissions or preserving source provenance.'
    ],
    appliedChallenge: [
      'Design the context object for one agent run and define which fields are temporary.',
      'Propose a memory record schema with source, timestamp, purpose, and expiry or deletion behavior.',
      'Test stale, conflicting, missing, and unauthorized evidence and document the safe response for each.'
    ].join('\n')
  },
  6: {
    lesson: [
      'FAILURE IS A NORMAL PATH',
      'Models may return incomplete arguments, tools may time out, APIs may reject requests, retrieved evidence may be poor, and an agent may repeat the same unsuccessful action. A production system must treat these as expected states rather than unusual exceptions. A safe agent has a finite budget, explicit recovery choices, and a route to ask a person for help.',
      '',
      'Classify failures before retrying. A transient timeout may justify a limited retry. An invalid argument calls for correction, not repeating the same call. A permission error should not be retried with broader permissions. A quota or billing failure may require operator action. A tool result that contradicts the expected schema should be rejected or quarantined instead of treated as usable evidence.',
      '',
      'DESIGN A RECOVERY POLICY',
      'Set maximum attempts per operation, a total tool-call budget, and an overall deadline. Use bounded backoff for retryable network failures. Make operations idempotent or provide idempotency keys when repeated requests could create duplicate side effects. Keep an audit trail of attempts and their outcomes.',
      '',
      'If recovery fails, stop and return a truthful status: completed, partially completed, needs approval, or unable to complete. The agent should never hide a failure by inventing a plausible answer. A good recovery policy protects the user and makes debugging easier.'
    ].join('\n'),
    workedExample: [
      'CASE: an order service times out.',
      'Step 1: classify the error as a transient timeout, not as “order not found.”',
      'Step 2: retry once within the defined request budget, respecting the service retry guidance.',
      'Step 3: if the retry fails, mark the order lookup unavailable and stop any action that depends on it.',
      'Step 4: tell the user the system could not verify the order and provide a safe retry or escalation path.',
      'Step 5: log the operation ID and failure category, but do not log secrets or unnecessary personal data.'
    ].join('\n'),
    commonMistakes: [
      'Unbounded retries that increase cost, duplicate actions, or create a loop.',
      'Retrying authorization and validation failures as if they were transient network errors.',
      'Returning a successful-sounding answer after the required tool evidence could not be obtained.'
    ],
    appliedChallenge: [
      'Create a failure table for timeout, rate limit, invalid input, permission denial, malformed tool result, and model refusal.',
      'For every failure, define retry count, recovery action, user-facing status, and log fields.',
      'Demonstrate a bounded retry and verify that a side effect cannot happen twice after a retry.'
    ].join('\n')
  },
  7: {
    lesson: [
      'OBSERVABILITY MAKES AGENTS DEBUGGABLE',
      'An agent can produce the wrong result because it chose the wrong tool, passed a bad argument, retrieved weak evidence, interpreted a tool result incorrectly, or used the wrong stopping rule. Looking only at the final answer hides those distinctions. A useful trace records the path that produced the result.',
      '',
      'At minimum, record a run ID, task category, model and configuration identifier, tool name, validated arguments or a redacted representation, tool outcome, timing, retry count, and final status. Correlate each step so the team can reconstruct what happened. Avoid logging secrets, full private documents, or personal information without a specific need and retention policy.',
      '',
      'USE TRACES TO IMPROVE THE SYSTEM',
      'Start with a failed run and identify the first point where behavior diverged from expectations. Was the plan wrong, was the evidence wrong, or did a tool fail? Change one cause at a time and replay the same test case. Track latency and cost per stage, not just average end-to-end duration.',
      '',
      'Tracing is not a substitute for evaluation. A trace explains an individual run. An evaluation set tells you whether a change improves behavior across representative cases. Keep the two connected: turn real, safely redacted failures into regression tests so the same failure is less likely to recur.'
    ].join('\n'),
    workedExample: [
      'CASE: the agent quotes the wrong delivery date.',
      'Step 1: inspect the trace and confirm which tool returned the date.',
      'Step 2: compare the raw structured tool result with the evidence included in the final context.',
      'Step 3: determine whether the wrong date came from the source system, a parsing issue, stale memory, or final response generation.',
      'Step 4: fix the earliest incorrect boundary and add the incident to the evaluation set.',
      'Step 5: rerun the same case plus a conflicting-date case to check that the fix is general.'
    ].join('\n'),
    commonMistakes: [
      'Logging only the final response and losing the tool decisions that led to it.',
      'Recording sensitive payloads wholesale instead of using structured, redacted trace fields.',
      'Fixing one visible example without adding a regression test.'
    ],
    appliedChallenge: [
      'Define an event schema for one complete run, including correlation IDs and redaction rules.',
      'Use three mock traces to diagnose whether a failure came from planning, retrieval, tool execution, or response composition.',
      'Turn one incident into a regression test and state what metric should improve.'
    ].join('\n')
  },
  8: {
    lesson: [
      'HUMAN APPROVAL IS A CONTROL, NOT A PROMPT',
      'A tool call can create consequences outside the conversation: send an email, publish content, issue a refund, delete information, or change an account. For sensitive actions, the model should propose the action while the application enforces a review boundary. Asking the model to “be careful” is not approval control.',
      '',
      'Define approval rules from impact and reversibility. Low-risk, reversible formatting may be automatic. Sending a draft to a real customer may need confirmation. Issuing a refund, deleting records, or changing access may require a stronger policy, identity checks, limits, and human review. Some actions should never be available to the agent in the first place.',
      '',
      'A safe approval request shows the proposed action, target, important inputs, consequences, and evidence. The approval must bind to the exact action reviewed; if the arguments change, require a new approval. Store who approved, when, what was approved, and the outcome. Reject expired or replayed approvals.',
      '',
      'Plan for rejection and delay. If a human rejects the action, the agent should not evade that decision by selecting a different tool. It should explain that the action was not approved and either continue with a safe alternative or stop.'
    ].join('\n'),
    workedExample: [
      'CASE: a customer requests a refund.',
      'Step 1: the agent retrieves the order and refund policy using read-only tools.',
      'Step 2: it calculates a proposed refund and explains the policy evidence and amount.',
      'Step 3: the application verifies account permission and presents the proposal to an authorized reviewer.',
      'Step 4: approval is bound to that exact order and amount. A changed amount requires another review.',
      'Step 5: only after approval does the server call the refund tool and record the transaction result.'
    ].join('\n'),
    commonMistakes: [
      'Treating a prompt instruction as the only barrier before a consequential tool call.',
      'Approving a general intention instead of a specific action with exact arguments.',
      'Allowing the agent to retry the same action through another route after a human rejects it.'
    ].join('\n'),
    appliedChallenge: [
      'Classify five possible agent actions by impact, reversibility, and required approval.',
      'Design an approval record that binds the reviewer to a specific action, arguments, expiry, and idempotency key.',
      'Test approval, rejection, changed arguments, expired approval, and duplicate submission.'
    ].join('\n')
  },
  9: {
    lesson: [
      'EVALUATE BEHAVIOR, NOT VIBES',
      'One successful demonstration does not establish that an agent is reliable. Build an evaluation set from the tasks the system is supposed to handle. Include common requests, ambiguous wording, missing information, contradictory sources, tool errors, permission boundaries, and high-impact edge cases. The expected outcome should be written down before the test is run.',
      '',
      'Use deterministic assertions where possible: the correct tool was called, required arguments were present, a forbidden tool was not called, the final status matched the tool outcome, and the system stopped within its budget. For language judgments such as relevance or clarity, use a defined rubric and inspect a sample of model-graded results with human reviewers.',
      '',
      'MEASURE THE RIGHT THINGS',
      'Track task completion, factual support, tool-selection accuracy, policy violations, escalation quality, latency, and cost. A high average score can hide a rare but severe failure, so report critical failures separately. Keep regression cases after every incident or prompt, model, tool, or retrieval change.',
      '',
      'Evaluation is a loop: define cases, run the system, compare outcomes, inspect failures, change one part, and rerun the same suite. Do not change the rubric after seeing a disappointing result simply to make the score look better.'
    ].join('\n'),
    workedExample: [
      'CASE: test a support agent.',
      'Step 1: create cases for a normal policy question, a nonexistent order, two conflicting policy passages, a read timeout, and a refund request that requires approval.',
      'Step 2: specify the expected retrieval source, permitted tool calls, final status, and whether escalation is required.',
      'Step 3: run every case against a fixed version of the agent.',
      'Step 4: compare actual traces and outputs with expected outcomes; do not score only the prose.',
      'Step 5: fix failures, rerun all cases, and keep the results with the version identifier.'
    ].join('\n'),
    commonMistakes: [
      'Using only happy-path examples or selecting examples after seeing the model output.',
      'Relying only on an LLM judge without calibration or human spot checks.',
      'Reporting only an average score that hides severe safety or authorization failures.'
    ].join('\n'),
    appliedChallenge: [
      'Create at least 12 evaluation cases: normal, ambiguous, missing-data, conflicting-evidence, tool-failure, and policy-boundary cases.',
      'Write expected tool calls and final statuses before executing the tests.',
      'Report task success, critical failure count, tool-selection errors, average latency, and approximate cost.'
    ].join('\n')
  },
  10: {
    lesson: [
      'MULTI-AGENT SYSTEMS ARE A TRADE-OFF',
      'A multi-agent design divides work among specialized agents. It can help when tasks require genuinely different responsibilities, tools, permissions, or evaluation criteria. It also adds handoffs, prompts, state, latency, failure points, and cost. Splitting a workflow into several agents does not automatically make it more intelligent or dependable.',
      '',
      'Two common patterns are handoff and manager-with-tools. In a handoff, one specialist takes ownership of the next stage. In a manager pattern, the manager retains control and calls a specialist for a bounded subtask. Choose based on who should own the final response and whether specialists need to control the next step.',
      '',
      'DEFINE THE BOUNDARIES',
      'Give each specialist a narrow capability and explicit input/output contract. Validate the result before another agent consumes it. Decide which context is shared, which is withheld, and which tools each role may use. Avoid granting every specialist the full permissions of the overall system.',
      '',
      'Measure the multi-agent approach against a single-agent or deterministic baseline using the same evaluation set. Keep it only if quality or operational resilience improves enough to justify its added cost and complexity. If a single agent with two narrow tools performs just as well, keep the simpler system.'
    ].join('\n'),
    workedExample: [
      'CASE: research and answer a policy question.',
      'Step 1: a retrieval specialist returns three source passages and their identifiers. It does not write the final answer.',
      'Step 2: a policy evaluator checks whether the passages support the requested conclusion.',
      'Step 3: the manager composes the answer only when evidence passes the defined checks; otherwise it asks for clarification or escalates.',
      'Step 4: compare this architecture with a single agent that retrieves and answers in one loop.',
      'Step 5: retain the specialist design only if the evaluation suite shows a meaningful, repeatable improvement.'
    ].join('\n'),
    commonMistakes: [
      'Adding multiple agents because the architecture appears more sophisticated.',
      'Allowing every specialist to access all tools and data without need.',
      'Failing to define how handoffs are validated or how errors return to the manager.'
    ].join('\n'),
    appliedChallenge: [
      'Draw a single-agent baseline and a multi-agent alternative for the same task.',
      'Define specialist contracts, allowed tools, shared state, handoff rules, and failure recovery.',
      'Use the same evaluation cases to compare success rate, critical failures, latency, and cost; write a decision to keep or remove the extra agents.'
    ].join('\n')
  }
}

export function getAuthoredAIStageLesson(trackId: string, stageId: number): AuthoredAIStageLesson | null {
  if (trackId !== 'ai-agents') return null
  return AI_AGENTS_AUTHORED_LESSONS[stageId] ?? null
}
