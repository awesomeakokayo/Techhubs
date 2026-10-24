# Reviewer packet — AI Data, APIs & Engineering

- **Track id:** `ai-engineering`  ·  **Slug:** `ai-engineering`  ·  **Category:** ai  ·  **AI track:** yes
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.7/100 · worthiness 99.4/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | AI APIs | Integrate models into software using structured outputs, validation, safe configuration, and clear interfaces. | 1 week | 5 |
| 2 | Model Selection | Select and route models according to capability, quality, cost, latency, and workload. | 1 week | 5 |
| 3 | Structured Outputs | Validate AI outputs semantically instead of assuming schema validity means correctness. | 1 week | 5 |
| 4 | Embeddings | Use embeddings and semantic retrieval appropriately for knowledge access and similarity tasks. | 1 week | 5 |
| 5 | Retrieval | Design useful RAG chunks and context boundaries so retrieval remains relevant and interpretable. | 1 week | 5 |
| 6 | RAG | Diagnose retrieval failures separately from generation failures and improve the correct layer. | 1 week | 5 |
| 7 | Vector Search | Combine semantic and lexical retrieval when the problem benefits from both kinds of matching. | 1 week | 5 |
| 8 | AI Evaluation | Evaluate AI applications with representative tests, defined quality criteria, and regression checks. | 1 week | 5 |
| 9 | Cost & Latency | Optimize AI systems for cost and latency without losing the quality required for the use case. | 3 to 5 days | 5 |
| 10 | Deployment | Prepare AI applications for production with security, monitoring, evaluation, error handling, and rollback. | 1 week | 5 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 6, 10.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 6 — RAG**: content-inspected required resources 2, objective-matching resources 0, playback-verified resources 0.
- **Stage 7 — Vector Search**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 1 — AI APIs**: content-inspected required resources 3, objective-matching resources 3, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — AI APIs

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI API Documentation | required | L3 | content-inspection | — | 4 | https://platform.openai.com/docs |
| Groq API Quickstart | required | L3 | content-inspection | — | 1 | https://console.groq.com/docs/quickstart |
| Anthropic — Build With Claude | required | L3 | content-inspection | — | 1 | https://www.anthropic.com/learn/build-with-claude |
- _L3 required evidence — OpenAI: “API Platform Developer quickstart Make your first API request in minutes. Learn the basics of the OpenAI platform. Get started Create API key JavaScript 1 2 3 4 5 6 7 curl https://api.openai.com/v1/responses \ -H "Conte…”_
- _L3 required evidence — Groq: “Login Log In Quickstart Get up and running with the Groq API in a few minutes, with the steps below. For additional support, catch our onboarding video . Create an API Key Please visit here to create an API Key. Set up …”_
- _L3 required evidence — Anthropic: “Build with Claude Courses and tutorials from Anthropic for developers. Learn Claude Code and the Claude API, then build agents with MCP, skills, and tool use. Start here Claude Code 101 An agentic coding tool that lives…”_

### Stage 2 — Model Selection

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Microsoft Learn — Explore Generative AI | required | L3 | content-inspection | — | 1 | https://learn.microsoft.com/en-us/training/modules/explore-generative-ai/ |
| OpenAI API — Structured Outputs | required | L3 | content-inspection | — | 1 | https://platform.openai.com/docs/guides/structured-outputs |
- _L3 required evidence — Microsoft Learn: “Read in English Explore Generative AI Module 9 Units Beginner Developer Student AI Engineer Technology Manager Solution Architect Azure Discover the fundamentals of generative AI and how this technology is transforming …”_
- _L3 required evidence — OpenAI: “Responses JSON is one of the most widely used formats in the world for applications to exchange data. Structured Outputs is a feature that ensures the model will always generate responses that adhere to your supplied JS…”_

### Stage 3 — Structured Outputs

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| LangChain Documentation — Retrieval | required | L3 | content-inspection | — | 2 | https://docs.langchain.com/oss/python/langchain/overview |
| OpenAI — Constrain model responses to predictable machine-r… | required | L3 | content-inspection | — | 2 | https://platform.openai.com/docs/guides/structured-outputs |
- _L3 required evidence — LangChain: “Agent = Model + Harness. LangChain provides create_agent : a minimal, highly configurable harness. The harness is everything around the model loop: the prompt, the tools, and any middleware that shapes behavior. Start w…”_
- _L3 required evidence — OpenAI: “Responses JSON is one of the most widely used formats in the world for applications to exchange data. Structured Outputs is a feature that ensures the model will always generate responses that adhere to your supplied JS…”_

### Stage 4 — Embeddings

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI API — Working with evals | required | L3 | content-inspection | — | 0 | https://platform.openai.com/docs/guides/evals |
| LangChain — Understand application patterns for models, ret… | required | L3 | content-inspection | — | 3 | https://docs.langchain.com/oss/python/langchain/overview |
- _L3 required evidence — OpenAI: “Responses Evaluations (often called evals ) test model outputs to ensure they meet style and content criteria that you specify. Writing evals to understand how your LLM applications are performing against your expectati…”_
- _L3 required evidence — LangChain: “Agent = Model + Harness. LangChain provides create_agent : a minimal, highly configurable harness. The harness is everything around the model loop: the prompt, the tools, and any middleware that shapes behavior. Start w…”_

### Stage 5 — Retrieval

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| LangChain — Retrieval | required | L3 | content-inspection | 14 min | 3 | https://docs.langchain.com/oss/python/langchain/retrieval |
- _L3 required evidence — LangChain: “Large Language Models (LLMs) are powerful, but they have two key limitations: Finite context : they can’t ingest entire corpora at once. Static knowledge : their training data is frozen at a point in time. Retrieval add…”_

### Stage 6 — RAG

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Anthropic — Build With Claude | required | L3 | content-inspection | — | 0 | https://www.anthropic.com/learn/build-with-claude |
| LangChain Python Docs | required | L3 | content-inspection | — | 0 | https://python.langchain.com/docs/get_started/introduction |
| Microsoft — Generative AI for Beginners | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=k7HaeJs-N-o |
- _L3 required evidence — Anthropic: “Build with Claude Courses and tutorials from Anthropic for developers. Learn Claude Code and the Claude API, then build agents with MCP, skills, and tool use. Start here Claude Code 101 An agentic coding tool that lives…”_
- _L3 required evidence — LangChain: “This quickstart shows you how to create a fully functional AI agent in just a few minutes. Build the LangChain quickstart agent Using an AI coding assistant? Install the LangChain Docs MCP servers to give your agent acc…”_

### Stage 7 — Vector Search

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI — Vector Embeddings | required | L3 | content-inspection | 11 min | 0 | https://platform.openai.com/docs/guides/embeddings |
- _L3 required evidence — OpenAI: “New embedding models text-embedding-3-small and text-embedding-3-large , our newest and most performant embedding models, are now available. They feature lower costs, higher multilingual performance, and new parameters …”_

### Stage 8 — AI Evaluation

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Anthropic — Define success criteria and build evaluations | required | L3 | content-inspection | — | 3 | https://docs.anthropic.com/en/docs/build-with-claude/develop-tests |
| OpenAI — Create repeatable AI evaluation runs for applicati… | required | L3 | content-inspection | — | 2 | https://platform.openai.com/docs/guides/evals |
- _L3 required evidence — Anthropic: “Building a successful LLM-based application starts with clearly defining your success criteria and then designing evaluations to measure performance against them. This cycle is central to prompt engineering. Define your…”_
- _L3 required evidence — OpenAI: “Responses Evaluations (often called evals ) test model outputs to ensure they meet style and content criteria that you specify. Writing evals to understand how your LLM applications are performing against your expectati…”_

### Stage 9 — Cost & Latency

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI — Latency Optimization | required | L3 | content-inspection | 11 min | 1 | https://platform.openai.com/docs/guides/latency-optimization |
- _L3 required evidence — OpenAI: “This guide covers the core set of principles you can apply to improve latency across a wide variety of LLM-related use cases. These techniques come from working with a wide range of customers and developers on productio…”_

### Stage 10 — Deployment

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI — Production Best Practices | required | L3 | content-inspection | 11 min | 2 | https://platform.openai.com/docs/guides/production-best-practices |
- _L3 required evidence — OpenAI: “This guide provides a comprehensive set of best practices to help you transition from prototype to production. Whether you are a seasoned machine learning engineer or a recent enthusiast, this guide should provide you w…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 6 | Microsoft — Generative AI for Beginners | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — AI APIs (4 questions)

1. Your application expects structured JSON from a model. What is the strongest approach?
   - · Free-form prose
   - **✔ Supported structured output/schema plus validation**
   - · String slicing only
   - · Manual copy/paste
   - _Why:_ Structured output plus validation is safer for software integration. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can define a model contract, and can validate responses rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 2 — Model Selection (4 questions)

1. A cheap model handles classification but fails complex reasoning. What should the architecture do?
   - · Use the expensive model for everything
   - **✔ Route tasks according to capability, cost, and latency requirements**
   - · Hide errors
   - · Avoid models
   - _Why:_ Model routing can balance quality, cost, and latency. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can compare models on task fit, and can define routing rules rather than merely repeat a definition.**
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 3 — Structured Outputs (4 questions)

1. Why validate output even when a schema is used?
   - · Schemas guarantee semantics
   - **✔ Values can still be wrong or unsupported**
   - · Validation is useless
   - · Schemas make models deterministic
   - _Why:_ Structural validity does not guarantee semantic correctness. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can define semantic checks, and can reject unsupported outputs rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 4 — Embeddings (4 questions)

1. What do embeddings primarily enable?
   - · Exact keyword matching only
   - **✔ Numerical representations that support semantic similarity search**
   - · Encryption
   - · Video generation
   - _Why:_ Embeddings support semantic retrieval. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can explain embeddings, and can choose a retrieval use case rather than merely repeat a definition.**
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 5 — Retrieval (4 questions)

1. Why does chunking matter in RAG?
   - · Branding
   - **✔ Chunk boundaries affect retrieval relevance and context quality**
   - · It guarantees citations
   - · It replaces embeddings
   - _Why:_ Poor chunking can make relevant evidence difficult to retrieve. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can choose chunking strategy, and can inspect retrieved context rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 6 — RAG (4 questions)

1. A RAG system retrieves the wrong evidence. What should you NOT do first?
   - · Inspect retrieval
   - · Evaluate chunking/query formulation
   - **✔ Blindly increase model temperature**
   - · Compare retrieved evidence with expected evidence
   - _Why:_ Generation settings cannot fix incorrect retrieval. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can inspect retrieval results, and can separate retrieval from generation errors rather than merely repeat a definition.**
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 7 — Vector Search (4 questions)

1. When is hybrid search useful?
   - **✔ When semantic similarity and exact lexical matches both matter**
   - · Only for images
   - · Never
   - · Only without a database
   - _Why:_ Hybrid retrieval can combine semantic and keyword signals. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can identify hybrid-search needs, and can compare retrieval approaches rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 8 — AI Evaluation (4 questions)

1. What is a strong AI evaluation practice?
   - · One impressive demo
   - **✔ Representative test cases with defined criteria and regression checks**
   - · Ask the model if it did well
   - · Measure tokens only
   - _Why:_ AI quality requires repeatable evaluation. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can create an evaluation set, and can define metrics rather than merely repeat a definition.**
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 9 — Cost & Latency (4 questions)

1. An AI feature is accurate but expensive. What should you investigate?
   - · Nothing
   - **✔ Caching, routing, context size, batching, model choice, and unnecessary calls**
   - · UI color
   - · A more expensive model
   - _Why:_ Cost optimization comes from architecture and workload efficiency. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can measure cost drivers, and can reduce unnecessary work rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 10 — Deployment (4 questions)

1. What is required before deploying an AI API?
   - · A demo
   - **✔ Security, secrets management, rate limits, monitoring, evaluation, error handling, and fallback/rollback**
   - · A logo
   - · A longer prompt
   - _Why:_ Production AI needs standard software controls plus AI-specific evaluation and monitoring. · _level: understand_
2. You are given a new AI application engineering task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the AI application engineering problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can protect secrets and endpoints, and can define monitoring rather than merely repeat a definition.**
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `stage:ai-engineering:1` (rubric sm-1bnl9zd-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Integrate models into software using structured outputs, validation, safe configuration, and clear interfaces. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define a model contract | 1 | no |
| Validate responses | 1 | no |
| Handle failures safely | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 2 — project `stage:ai-engineering:2` (rubric sm-1s1nvsh-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Select and route models according to capability, quality, cost, latency, and workload. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Compare models on task fit | 1 | no |
| Define routing rules | 1 | no |
| Measure tradeoffs | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 3 — project `stage:ai-engineering:3` (rubric sm-1oj8i38-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Validate AI outputs semantically instead of assuming schema validity means correctness. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define semantic checks | 1 | no |
| Reject unsupported outputs | 1 | no |
| Create fallback behavior | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 4 — project `stage:ai-engineering:4` (rubric sm-1a5ef7r-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Use embeddings and semantic retrieval appropriately for knowledge access and similarity tasks. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Explain embeddings | 1 | no |
| Choose a retrieval use case | 1 | no |
| Evaluate similarity behavior | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 5 — project `stage:ai-engineering:5` (rubric sm-1w162wr-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Design useful RAG chunks and context boundaries so retrieval remains relevant and interpretable. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Choose chunking strategy | 1 | no |
| Inspect retrieved context | 1 | no |
| Improve bad retrieval | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 6 — project `stage:ai-engineering:6` (rubric sm-6nozd4-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Diagnose retrieval failures separately from generation failures and improve the correct layer. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Inspect retrieval results | 1 | no |
| Separate retrieval from generation errors | 1 | no |
| Test improvements | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 7 — project `stage:ai-engineering:7` (rubric sm-1gtmskf-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Combine semantic and lexical retrieval when the problem benefits from both kinds of matching. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Identify hybrid-search needs | 1 | no |
| Compare retrieval approaches | 1 | no |
| Measure results | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 8 — project `stage:ai-engineering:8` (rubric sm-44gi88-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Evaluate AI applications with representative tests, defined quality criteria, and regression checks. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Create an evaluation set | 1 | no |
| Define metrics | 1 | no |
| Track regressions | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 9 — project `stage:ai-engineering:9` (rubric sm-1v6pjch-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Optimize AI systems for cost and latency without losing the quality required for the use case. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Measure cost drivers | 1 | no |
| Reduce unnecessary work | 1 | no |
| Validate quality after optimization | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 10 — project `ai-e-p2` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The system can expose the evidence used for an answer. | 1 | no |
| Evaluation cases cover representative and difficult inputs. | 1 | no |
| Changes are justified by observed evaluation results. | 1 | no |
| Cost and latency are considered alongside quality. | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: AI APIs Mini-Project
- **Acceptance criteria:**
  - Define a model contract
  - Validate responses
  - Handle failures safely

### Stage 2 — Build: Model Selection Mini-Project
- **Acceptance criteria:**
  - Compare models on task fit
  - Define routing rules
  - Measure tradeoffs

### Stage 3 — Build: Structured Outputs Mini-Project
- **Acceptance criteria:**
  - Define semantic checks
  - Reject unsupported outputs
  - Create fallback behavior

### Stage 4 — Build: Embeddings Mini-Project
- **Acceptance criteria:**
  - Explain embeddings
  - Choose a retrieval use case
  - Evaluate similarity behavior

### Stage 5 — Build: Retrieval Mini-Project
- **Acceptance criteria:**
  - Choose chunking strategy
  - Inspect retrieved context
  - Improve bad retrieval

### Stage 6 — Build: RAG Mini-Project
- **Acceptance criteria:**
  - Inspect retrieval results
  - Separate retrieval from generation errors
  - Test improvements

### Stage 7 — Build: Vector Search Mini-Project
- **Acceptance criteria:**
  - Identify hybrid-search needs
  - Compare retrieval approaches
  - Measure results

### Stage 8 — Build: AI Evaluation Mini-Project
- **Acceptance criteria:**
  - Create an evaluation set
  - Define metrics
  - Track regressions

### Stage 9 — Build: Cost & Latency Mini-Project
- **Acceptance criteria:**
  - Measure cost drivers
  - Reduce unnecessary work
  - Validate quality after optimization

### Stage 10 — Build: Production RAG Evaluation
- **Acceptance criteria:**
  - The system can expose the evidence used for an answer.
  - Evaluation cases cover representative and difficult inputs.
  - Changes are justified by observed evaluation results.
  - Cost and latency are considered alongside quality.

## 8. AI lesson demonstrations

- **Stage 1:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. AI APIs is about model integration. The central idea is: Integrate models i…
- **Stage 2:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Model Selection is about model selection. The central idea is: Select and r…
- **Stage 3:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Structured Outputs is about structured outputs. The central idea is: Valida…
- **Stage 4:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Embeddings is about embeddings. The central idea is: Use embeddings and sem…
- **Stage 5:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Retrieval is about RAG design. The central idea is: Design useful RAG chunk…
- **Stage 6:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. RAG is about retrieval diagnosis. The central idea is: Diagnose retrieval f…
- **Stage 7:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Vector Search is about hybrid retrieval. The central idea is: Combine seman…
- **Stage 8:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. AI Evaluation is about evaluation. The central idea is: Evaluate AI applica…
- **Stage 9:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Cost & Latency is about cost and latency. The central idea is: Optimize AI …
- **Stage 10:** {"lesson":"You are building AI applications that must be evaluated for quality, retrieval, cost, latency, security, and production reliability. Deployment is about production readiness. The central idea is: Prepare AI a…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 6 — required (L2): https://www.youtube.com/watch?v=k7HaeJs-N-o

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.7) **and** worthiness ≥ 90 (this track: 99.4).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

