# AI Data, APIs & Engineering (`ai-engineering`)

Slug: `ai-engineering` · Category: ai · Stages: 10

## Stage 1 — AI APIs

**Objective:** Integrate models into software using structured outputs, validation, safe configuration, and clear interfaces.

**Success criteria:**
- Define a model contract
- Validate responses
- Handle failures safely

### Instruction

Learn to interact with AI models through APIs — the foundation of AI engineering.


LEARNING OBJECTIVE
Integrate models into software using structured outputs, validation, safe configuration, and clear interfaces.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. AI APIs is about model integration. The central idea is: Integrate models into software using structured outputs, validation, safe configuration, and clear interfaces. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

Your application expects JSON, but the model returns an extra field with the wrong type. Validation rejects it before the data reaches production logic.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Your application expects structured JSON from a model. What is the strongest approach?
   - Free-form prose
   - **✔ Supported structured output/schema plus validation**
   - String slicing only
   - Manual copy/paste
   - _Answer:_ Supported structured output/schema plus validation · _Why:_ Structured output plus validation is safer for software integration. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can define a model contract, and can validate responses rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define a model contract, and can validate responses rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: AI APIs Mini-Project (`stage:ai-engineering:1`)

- **Rubric version:** sm-1bnl9zd-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Integrate models into software using structured outputs, validation, safe configuration, and clear interfaces. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define a model contract (weight 1)
  - Validate responses (weight 1)
  - Handle failures safely (weight 1)
- **Acceptance criteria (contract):**
  - Define a model contract
  - Validate responses
  - Handle failures safely

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Model Selection

**Objective:** Select and route models according to capability, quality, cost, latency, and workload.

**Success criteria:**
- Compare models on task fit
- Define routing rules
- Measure tradeoffs

### Instruction

Choose the right model for each task based on capability, cost, speed, and accuracy requirements.


LEARNING OBJECTIVE
Select and route models according to capability, quality, cost, latency, and workload.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Model Selection is about model selection. The central idea is: Select and route models according to capability, quality, cost, latency, and workload. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A cheap model is good enough for classification but not reasoning, so you route tasks according to measured requirements.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. A cheap model handles classification but fails complex reasoning. What should the architecture do?
   - Use the expensive model for everything
   - **✔ Route tasks according to capability, cost, and latency requirements**
   - Hide errors
   - Avoid models
   - _Answer:_ Route tasks according to capability, cost, and latency requirements · _Why:_ Model routing can balance quality, cost, and latency. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can compare models on task fit, and can define routing rules rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can compare models on task fit, and can define routing rules rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Model Selection Mini-Project (`stage:ai-engineering:2`)

- **Rubric version:** sm-1s1nvsh-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Select and route models according to capability, quality, cost, latency, and workload. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Compare models on task fit (weight 1)
  - Define routing rules (weight 1)
  - Measure tradeoffs (weight 1)
- **Acceptance criteria (contract):**
  - Compare models on task fit
  - Define routing rules
  - Measure tradeoffs

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Structured Outputs

**Objective:** Validate AI outputs semantically instead of assuming schema validity means correctness.

**Success criteria:**
- Define semantic checks
- Reject unsupported outputs
- Create fallback behavior

### Instruction

Get reliable, structured output from AI models for downstream processing.


LEARNING OBJECTIVE
Validate AI outputs semantically instead of assuming schema validity means correctness.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Structured Outputs is about structured outputs. The central idea is: Validate AI outputs semantically instead of assuming schema validity means correctness. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

Schema-valid output still contains an unsupported claim, so semantic validation rejects it.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why validate output even when a schema is used?
   - Schemas guarantee semantics
   - **✔ Values can still be wrong or unsupported**
   - Validation is useless
   - Schemas make models deterministic
   - _Answer:_ Values can still be wrong or unsupported · _Why:_ Structural validity does not guarantee semantic correctness. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can define semantic checks, and can reject unsupported outputs rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can define semantic checks, and can reject unsupported outputs rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Structured Outputs Mini-Project (`stage:ai-engineering:3`)

- **Rubric version:** sm-1oj8i38-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Validate AI outputs semantically instead of assuming schema validity means correctness. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define semantic checks (weight 1)
  - Reject unsupported outputs (weight 1)
  - Create fallback behavior (weight 1)
- **Acceptance criteria (contract):**
  - Define semantic checks
  - Reject unsupported outputs
  - Create fallback behavior

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Embeddings

**Objective:** Use embeddings and semantic retrieval appropriately for knowledge access and similarity tasks.

**Success criteria:**
- Explain embeddings
- Choose a retrieval use case
- Evaluate similarity behavior

### Instruction

Embeddings turn text into numbers that capture meaning. Learn to use them for search, clustering, and retrieval.


LEARNING OBJECTIVE
Use embeddings and semantic retrieval appropriately for knowledge access and similarity tasks.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Embeddings is about embeddings. The central idea is: Use embeddings and semantic retrieval appropriately for knowledge access and similarity tasks. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

Embeddings help retrieve semantically related passages for a support assistant, but you still inspect what similarity does and does not mean.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What do embeddings primarily enable?
   - Exact keyword matching only
   - **✔ Numerical representations that support semantic similarity search**
   - Encryption
   - Video generation
   - _Answer:_ Numerical representations that support semantic similarity search · _Why:_ Embeddings support semantic retrieval. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can explain embeddings, and can choose a retrieval use case rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can explain embeddings, and can choose a retrieval use case rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Embeddings Mini-Project (`stage:ai-engineering:4`)

- **Rubric version:** sm-1a5ef7r-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Use embeddings and semantic retrieval appropriately for knowledge access and similarity tasks. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Explain embeddings (weight 1)
  - Choose a retrieval use case (weight 1)
  - Evaluate similarity behavior (weight 1)
- **Acceptance criteria (contract):**
  - Explain embeddings
  - Choose a retrieval use case
  - Evaluate similarity behavior

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — Retrieval

**Objective:** Design useful RAG chunks and context boundaries so retrieval remains relevant and interpretable.

**Success criteria:**
- Choose chunking strategy
- Inspect retrieved context
- Improve bad retrieval

### Instruction

Effective retrieval is the foundation of RAG. Learn to process documents and retrieve relevant information.


LEARNING OBJECTIVE
Design useful RAG chunks and context boundaries so retrieval remains relevant and interpretable.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Retrieval is about RAG design. The central idea is: Design useful RAG chunks and context boundaries so retrieval remains relevant and interpretable. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You compare chunk sizes and retrieval context to reduce irrelevant passages entering the model.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why does chunking matter in RAG?
   - Branding
   - **✔ Chunk boundaries affect retrieval relevance and context quality**
   - It guarantees citations
   - It replaces embeddings
   - _Answer:_ Chunk boundaries affect retrieval relevance and context quality · _Why:_ Poor chunking can make relevant evidence difficult to retrieve. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can choose chunking strategy, and can inspect retrieved context rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can choose chunking strategy, and can inspect retrieved context rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Retrieval Mini-Project (`stage:ai-engineering:5`)

- **Rubric version:** sm-1w162wr-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Design useful RAG chunks and context boundaries so retrieval remains relevant and interpretable. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Choose chunking strategy (weight 1)
  - Inspect retrieved context (weight 1)
  - Improve bad retrieval (weight 1)
- **Acceptance criteria (contract):**
  - Choose chunking strategy
  - Inspect retrieved context
  - Improve bad retrieval

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 6 — RAG

**Objective:** Diagnose retrieval failures separately from generation failures and improve the correct layer.

**Success criteria:**
- Inspect retrieval results
- Separate retrieval from generation errors
- Test improvements

### Instruction

Build Retrieval-Augmented Generation systems that combine document retrieval with AI generation.


LEARNING OBJECTIVE
Diagnose retrieval failures separately from generation failures and improve the correct layer.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. RAG is about retrieval diagnosis. The central idea is: Diagnose retrieval failures separately from generation failures and improve the correct layer. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A bad answer is traced to missing evidence in retrieval rather than immediately changing the model prompt.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. A RAG system retrieves the wrong evidence. What should you NOT do first?
   - Inspect retrieval
   - Evaluate chunking/query formulation
   - **✔ Blindly increase model temperature**
   - Compare retrieved evidence with expected evidence
   - _Answer:_ Blindly increase model temperature · _Why:_ Generation settings cannot fix incorrect retrieval. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can inspect retrieval results, and can separate retrieval from generation errors rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can inspect retrieval results, and can separate retrieval from generation errors rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: RAG Mini-Project (`stage:ai-engineering:6`)

- **Rubric version:** sm-6nozd4-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Diagnose retrieval failures separately from generation failures and improve the correct layer. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Inspect retrieval results (weight 1)
  - Separate retrieval from generation errors (weight 1)
  - Test improvements (weight 1)
- **Acceptance criteria (contract):**
  - Inspect retrieval results
  - Separate retrieval from generation errors
  - Test improvements

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 2 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 7 — Vector Search

**Objective:** Combine semantic and lexical retrieval when the problem benefits from both kinds of matching.

**Success criteria:**
- Identify hybrid-search needs
- Compare retrieval approaches
- Measure results

### Instruction

Vector search enables semantic similarity matching. Learn to implement it for AI applications.


LEARNING OBJECTIVE
Combine semantic and lexical retrieval when the problem benefits from both kinds of matching.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Vector Search is about hybrid retrieval. The central idea is: Combine semantic and lexical retrieval when the problem benefits from both kinds of matching. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

Exact product codes need keyword matching while conceptual questions benefit from semantic search, so you evaluate a hybrid approach.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. When is hybrid search useful?
   - **✔ When semantic similarity and exact lexical matches both matter**
   - Only for images
   - Never
   - Only without a database
   - _Answer:_ When semantic similarity and exact lexical matches both matter · _Why:_ Hybrid retrieval can combine semantic and keyword signals. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can identify hybrid-search needs, and can compare retrieval approaches rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can identify hybrid-search needs, and can compare retrieval approaches rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Vector Search Mini-Project (`stage:ai-engineering:7`)

- **Rubric version:** sm-1gtmskf-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Combine semantic and lexical retrieval when the problem benefits from both kinds of matching. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Identify hybrid-search needs (weight 1)
  - Compare retrieval approaches (weight 1)
  - Measure results (weight 1)
- **Acceptance criteria (contract):**
  - Identify hybrid-search needs
  - Compare retrieval approaches
  - Measure results

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 8 — AI Evaluation

**Objective:** Evaluate AI applications with representative tests, defined quality criteria, and regression checks.

**Success criteria:**
- Create an evaluation set
- Define metrics
- Track regressions

### Instruction

How do you know if your AI application is working well? Learn to evaluate AI output systematically.


LEARNING OBJECTIVE
Evaluate AI applications with representative tests, defined quality criteria, and regression checks.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. AI Evaluation is about evaluation. The central idea is: Evaluate AI applications with representative tests, defined quality criteria, and regression checks. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You build an evaluation set and compare a change using the same cases before and after.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What is a strong AI evaluation practice?
   - One impressive demo
   - **✔ Representative test cases with defined criteria and regression checks**
   - Ask the model if it did well
   - Measure tokens only
   - _Answer:_ Representative test cases with defined criteria and regression checks · _Why:_ AI quality requires repeatable evaluation. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can create an evaluation set, and can define metrics rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can create an evaluation set, and can define metrics rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: AI Evaluation Mini-Project (`stage:ai-engineering:8`)

- **Rubric version:** sm-44gi88-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Evaluate AI applications with representative tests, defined quality criteria, and regression checks. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Create an evaluation set (weight 1)
  - Define metrics (weight 1)
  - Track regressions (weight 1)
- **Acceptance criteria (contract):**
  - Create an evaluation set
  - Define metrics
  - Track regressions

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 9 — Cost & Latency

**Objective:** Optimize AI systems for cost and latency without losing the quality required for the use case.

**Success criteria:**
- Measure cost drivers
- Reduce unnecessary work
- Validate quality after optimization

### Instruction

AI APIs cost money per token. Learn to optimize for cost and latency without sacrificing quality.


LEARNING OBJECTIVE
Optimize AI systems for cost and latency without losing the quality required for the use case.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Cost & Latency is about cost and latency. The central idea is: Optimize AI systems for cost and latency without losing the quality required for the use case. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You reduce repeated context and unnecessary model calls while checking that answer quality remains acceptable.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. An AI feature is accurate but expensive. What should you investigate?
   - Nothing
   - **✔ Caching, routing, context size, batching, model choice, and unnecessary calls**
   - UI color
   - A more expensive model
   - _Answer:_ Caching, routing, context size, batching, model choice, and unnecessary calls · _Why:_ Cost optimization comes from architecture and workload efficiency. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can measure cost drivers, and can reduce unnecessary work rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can measure cost drivers, and can reduce unnecessary work rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Cost & Latency Mini-Project (`stage:ai-engineering:9`)

- **Rubric version:** sm-1v6pjch-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Optimize AI systems for cost and latency without losing the quality required for the use case. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Measure cost drivers (weight 1)
  - Reduce unnecessary work (weight 1)
  - Validate quality after optimization (weight 1)
- **Acceptance criteria (contract):**
  - Measure cost drivers
  - Reduce unnecessary work
  - Validate quality after optimization

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 10 — Deployment

**Objective:** Prepare AI applications for production with security, monitoring, evaluation, error handling, and rollback.

**Success criteria:**
- Protect secrets and endpoints
- Define monitoring
- Create fallback/rollback behavior

### Instruction

Deploy AI applications to production with proper monitoring, scaling, and security practices.


LEARNING OBJECTIVE
Prepare AI applications for production with security, monitoring, evaluation, error handling, and rollback.


TECHSKILLHUB LESSON
You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Deployment is about production readiness. The central idea is: Prepare AI applications for production with security, monitoring, evaluation, error handling, and rollback. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A production system has secret management, monitoring, fallbacks, evaluation, and rollback rules before launch.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What is required before deploying an AI API?
   - A demo
   - **✔ Security, secrets management, rate limits, monitoring, evaluation, error handling, and fallback/rollback**
   - A logo
   - A longer prompt
   - _Answer:_ Security, secrets management, rate limits, monitoring, evaluation, error handling, and fallback/rollback · _Why:_ Production AI needs standard software controls plus AI-specific evaluation and monitoring. · _Level:_ understand

2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can protect secrets and endpoints, and can define monitoring rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can protect secrets and endpoints, and can define monitoring rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Production RAG Evaluation (`ai-e-p2`)

- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The system can expose the evidence used for an answer. (weight 1)
  - Evaluation cases cover representative and difficult inputs. (weight 1)
  - Changes are justified by observed evaluation results. (weight 1)
  - Cost and latency are considered alongside quality. (weight 1)
- **Acceptance criteria (contract):**
  - The system can expose the evidence used for an answer.
  - Evaluation cases cover representative and difficult inputs.
  - Changes are justified by observed evaluation results.
  - Cost and latency are considered alongside quality.

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
