export interface AIStageLesson {
  lesson: string
  workedExample: string
  commonMistakes: string[]
  appliedChallenge: string
}

const DOMAIN_CONTEXT: Record<string, string> = {
  'ai-foundations': 'You are choosing, directing, and evaluating AI systems for everyday professional work.',
  'ai-work': 'You are applying AI to real workplace tasks where accuracy, audience, privacy, and review still matter.',
  'ai-research': 'You are using AI to accelerate research while keeping evidence, sources, dates, and uncertainty explicit.',
  'ai-content': 'You are producing useful, original content where audience value and editorial judgment matter more than output volume.',
  'ai-youtube': 'You are building a YouTube workflow where viewer value, originality, packaging, analytics, and platform rules matter.',
  'ai-software-development': 'You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained.',
  'ai-automation': 'You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled.',
  'ai-agents': 'You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit.',
  'ai-engineering': 'You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability.',
  'ai-design': 'You are using AI to accelerate design exploration while keeping user needs, accessibility, consistency, evidence, and human judgment in control.',
}

const STAGE_LENSES: Record<string, string[]> = {
  'ai-foundations': ['mental models and limits', 'tool selection', 'clear instructions', 'reasoning support', 'verification', 'repeatable workflows'],
  'ai-work': ['communication', 'documents', 'learning', 'planning', 'responsible workplace workflows'],
  'ai-research': ['question framing', 'evidence tracing', 'conflicting sources', 'high-risk claims', 'research synthesis'],
  'ai-content': ['audience and value', 'research and ideation', 'drafting and editing', 'visual production', 'measurement and iteration'],
  'ai-youtube': ['channel strategy', 'topic research', 'script development', 'packaging', 'originality and policy', 'AI disclosure', 'analytics', 'editing for retention', 'editorial ownership', 'operating a sustainable channel'],
  'ai-software-development': ['AI coding fundamentals', 'bounded coding instructions', 'debugging', 'coding agents', 'agent boundaries', 'test verification', 'professional development loop', 'team policy'],
  'ai-automation': ['automation candidates', 'workflow design', 'API diagnosis', 'webhook security', 'AI placement', 'data contracts', 'human approval', 'operations and recovery'],
  'ai-agents': ['agent fundamentals', 'workflow vs agent', 'agent design', 'tool contracts', 'context and memory', 'failure handling', 'observability', 'human approval', 'evaluation', 'multi-agent tradeoffs'],
  'ai-engineering': ['model integration', 'model selection', 'structured outputs', 'embeddings', 'RAG design', 'retrieval diagnosis', 'hybrid retrieval', 'evaluation', 'cost and latency', 'production readiness'],
  'ai-design': ['creative exploration', 'UI evaluation', 'visual systems', 'responsible visual output', 'evidence-based design', 'prototyping', 'design systems', 'design judgment'],
}

const EXAMPLES: Record<string, string[]> = {
  'ai-foundations': [
    'A customer asks for today’s market data. You first decide whether freshness requires search or a current-data source rather than relying on a model’s memory.',
    'You compare two AI tools for a task and choose the one whose evidence, modality, speed, cost, and reliability fit the job instead of choosing by brand.',
    'You turn “write a report” into a defined task with audience, source material, constraints, structure, and review rules.',
    'You ask AI to challenge your assumptions about a project plan, then make the final decision yourself using evidence and tradeoffs.',
    'You discover a confident statistic with no source, trace it to an authoritative source, and correct the report before publication.',
    'You convert a recurring weekly task into a documented workflow with inputs, instructions, review points, and a measurable quality target.',
  ],
  'ai-work': [
    'A manager wants an email rewritten for executives, so you specify audience, tone, purpose, and facts that must not change.',
    'You use AI to summarize a long document, then verify names, dates, numbers, and exceptions against the original before sharing it.',
    'You ask AI to critique your reasoning after attempting a problem yourself, rather than asking it to produce an answer you cannot explain.',
    'An AI-generated project plan ignores a two-week dependency. You revise the plan using the actual capacity and dependency constraints.',
    'A workplace workflow handles internal information, so you define what data may enter the tool and where human approval is mandatory.',
  ],
  'ai-research': [
    'You turn “Is remote work productive?” into narrower questions about measurement, industry, time period, employee group, and outcome.',
    'AI proposes a claim. You trace it through search results until you find the original report or study and compare the actual wording.',
    'Two sources disagree because one measures revenue per employee while another measures output per hour. You resolve the disagreement by checking definitions.',
    'A report contains a quote and percentage that look plausible. You locate the original source and reject the claim when the wording does not match.',
    'You create a research brief with an evidence table so a reader can distinguish verified facts, interpretation, and unresolved uncertainty.',
  ],
  'ai-content': [
    'Before prompting, you define the audience, desired outcome, distinctive angle, and why the content deserves attention.',
    'AI produces ten ideas; you research them, eliminate weak claims, and turn one into an editorial brief with a defensible angle.',
    'AI improves a draft for clarity, but you keep the authorial voice, restore nuance, and remove unsupported claims.',
    'You use AI to generate visual directions, then reject a visually impressive result because it violates the brand or creates a misleading representation.',
    'You compare content performance using a meaningful outcome and decide what to change instead of increasing production volume blindly.',
  ],
  'ai-youtube': [
    'You choose a channel proposition by identifying a specific viewer and a repeatable problem the channel can solve.',
    'You compare competing videos, comments, search intent, and gaps before deciding which topic is worth producing.',
    'You turn research into a script with a credible hook, clear structure, fact-checked claims, and deliberate pacing.',
    'The thumbnail promises one thing while the opening delivers another. You fix the expectation gap instead of only changing the title.',
    'You audit a planned production system for repetitive, mass-produced content that provides little original viewer value.',
    'You determine whether realistic synthetic media needs disclosure under current YouTube rules and document the decision.',
    'A video has strong impressions but weak retention. You inspect the opening and audience expectation before changing unrelated metadata.',
    'You cut unnecessary pauses and repeated explanations while preserving the story and argument.',
    'AI can draft assets, but you retain final responsibility for facts, narrative, originality, and audience value.',
    'You establish a monthly review loop that combines content quality, audience response, current policy, and one focused experiment.',
  ],
  'ai-software-development': [
    'AI suggests a function. You read it line by line, explain its behavior, identify edge cases, and only then integrate it.',
    'Instead of asking an agent to “build the feature,” you supply requirements, interfaces, constraints, acceptance criteria, and repository context.',
    'A test fails. You reproduce the failure, isolate the root cause, ask AI for hypotheses, and verify the chosen fix with a regression test.',
    'An agent changes five unrelated files. You inspect the diff, keep the in-scope changes, and reject the rest.',
    'You prevent the coding agent from modifying authentication and secret-handling code without explicit review.',
    'AI-generated tests all pass, but you identify an untested failure mode and add a case that exposes a real bug.',
    'You run a loop of requirement → bounded delegation → diff review → tests → integration rather than “prompt until it works.”',
    'A team defines acceptable AI usage, review gates, secret-handling rules, and documentation expectations.',
  ],
  'ai-automation': [
    'You automate a weekly classification task only after confirming the inputs are stable and the output can be measured.',
    'You design a workflow with a retry path, dead-letter/manual review path, and protection against repeated side effects.',
    'A 401 error appears. You inspect credentials and scopes before rewriting the entire workflow.',
    'A webhook can trigger a financial action, so you validate the sender and constrain the permission before the action can execute.',
    'AI classifies incoming messages, while deterministic rules handle routing, validation, and irreversible operations.',
    'A malformed JSON payload is rejected at the boundary instead of silently flowing into the next node.',
    'A customer-facing response requires human approval when confidence is low or the requested action is consequential.',
    'You add logs, alerts, bounded retries, and a recovery procedure that a teammate can operate.',
  ],
  'ai-agents': [
    'A known three-step process is stable, so you use a deterministic workflow instead of introducing an agent unnecessarily.',
    'You compare the same task as a fixed workflow and as an agent, then reject the agent when its flexibility does not justify added failure modes.',
    'You define an agent goal, allowed tools, output contract, escalation rule, and actions it is never allowed to take.',
    'A database tool can read records but cannot delete them. Permissions reflect the actual risk of the action.',
    'You define what short-term context belongs in the current run and what long-term memory is appropriate to retain.',
    'After two failed attempts, an agent escalates rather than looping indefinitely.',
    'A tool trace shows the agent called the wrong API twice. You use the trace to diagnose the planning error.',
    'A purchase or account change requires human approval before execution.',
    'You test normal, ambiguous, adversarial, and failure cases against expected outcomes.',
    'A multi-agent design adds coordination overhead with no measurable benefit, so you simplify it.',
  ],
  'ai-engineering': [
    'Your application expects JSON, but the model returns an extra field with the wrong type. Validation rejects it before the data reaches production logic.',
    'A cheap model is good enough for classification but not reasoning, so you route tasks according to measured requirements.',
    'Schema-valid output still contains an unsupported claim, so semantic validation rejects it.',
    'Embeddings help retrieve semantically related passages for a support assistant, but you still inspect what similarity does and does not mean.',
    'You compare chunk sizes and retrieval context to reduce irrelevant passages entering the model.',
    'A bad answer is traced to missing evidence in retrieval rather than immediately changing the model prompt.',
    'Exact product codes need keyword matching while conceptual questions benefit from semantic search, so you evaluate a hybrid approach.',
    'You build an evaluation set and compare a change using the same cases before and after.',
    'You reduce repeated context and unnecessary model calls while checking that answer quality remains acceptable.',
    'A production system has secret management, monitoring, fallbacks, evaluation, and rollback rules before launch.',
  ],
  'ai-design': [
    'You generate several interface directions, then choose among them using user goals and design principles rather than visual novelty.',
    'An AI-generated layout looks attractive but hides the primary action. You redesign hierarchy around the task.',
    'You set typography, color, spacing, content, and component constraints before generating visual alternatives.',
    'An AI-generated image misrepresents a product capability. You replace it rather than rationalizing the error.',
    'You challenge a persona assumption with user evidence before asking AI to optimize the UI around it.',
    'A prototype tests the riskiest interaction before you invest in full visual polish.',
    'AI accelerates component creation, but tokens, accessibility, and reusable patterns remain consistent with the design system.',
    'You reject an AI recommendation because it conflicts with evidence, accessibility, or the product objective and explain why.',
  ],
}

export function getAIStageLesson(trackId: string, stageId: number, stageTitle: string, objective: string, successCriteria: string[]): AIStageLesson {
  const examples = EXAMPLES[trackId] ?? []
  const lens = STAGE_LENSES[trackId]?.[stageId - 1] ?? stageTitle.toLowerCase()
  const domain = DOMAIN_CONTEXT[trackId] ?? 'You are applying AI to practical work where judgment and verification still matter.'
  const workedExample = examples[stageId - 1] ?? `In a realistic ${lens} task, ${successCriteria[0]?.toLowerCase() ?? 'apply the concept'} and check the result against an explicit quality criterion before moving on.`

  return {
    lesson: `${domain} ${stageTitle} is about ${lens}. The central idea is: ${objective} Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.`,
    workedExample,
    commonMistakes: [
      'Starting with a tool or prompt before defining the actual problem and success criteria.',
      'Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.',
      'Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.',
    ],
    appliedChallenge: `Before continuing, demonstrate the stage yourself: ${successCriteria.slice(0, 2).join('; ')}. Write down one failure mode you encountered, how you detected it, and what change improved the result.`,
  }
}
