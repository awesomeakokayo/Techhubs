# TechSkillHub — Curriculum Quality & Premium-Eligibility Audit

Generated: 2026-10-24T12:12:48.614Z

Produced by `scripts/curriculum-quality-audit.mjs` from the live catalogue using the
served learner path. Scoring rules live in `lib/curriculum-quality.ts`.

> **A track is premium-eligible only when Curriculum readiness >= 90 AND Premium
> worthiness >= 90 AND every mandatory quality gate passes.** Weighted averages never
> compensate for a missing critical element. Scores marked *(review)* are completeness
> proxies that still require human expert review for instructional quality.

## Summary

| Metric | Value |
| --- | ---: |
| Tracks assessed | 32 |
| Passing both thresholds (>= 90) | 32 |
| Failing curriculum readiness | 0 |
| Failing premium worthiness | 0 |
| Blocked by a mandatory gate | 0 |
| Mechanically eligible (both thresholds + all gates) | 32 |
| Awaiting subject-matter expert review | 32 |
| **Approved for premium (eligible + human sign-off)** | **0** |

### Configured premium candidates

A configured candidate can never override course-quality evidence: if it fails a
threshold or a mandatory gate it is reported ineligible. In `--release` mode the
human-review sign-off is also required.

| Candidate | Eligible | Reason |
| --- | :---: | --- |
| `frontend` | yes | meets both thresholds and all mandatory gates |
| `backend` | yes | meets both thresholds and all mandatory gates |
| `python` | yes | meets both thresholds and all mandatory gates |

## Scores by track

| Track | Stage | Readiness | Worthiness | Gates | Mech. eligible | Human review | Approved |
| --- | ---: | ---: | ---: | :---: | :---: | :---: | :---: |
| Frontend Development `frontend` | 5 | 99.5 | 99 | pass | yes | pending | no |
| Backend Development `backend` | 5 | 99.2 | 98.4 | pass | yes | pending | no |
| Full-Stack Development `fullstack` | 5 | 99.8 | 99.5 | pass | yes | pending | no |
| Python Development `python` | 5 | 99.3 | 98.6 | pass | yes | pending | no |
| UI/UX Design `uiux` | 5 | 99.6 | 99.2 | pass | yes | pending | no |
| QA Engineering `qa` | 4 | 99.7 | 99.4 | pass | yes | pending | no |
| Data Analysis `data` | 5 | 99.2 | 98.3 | pass | yes | pending | no |
| Data Science `datascience` | 5 | 99.6 | 99.3 | pass | yes | pending | no |
| DevOps Engineering `devops` | 5 | 99.1 | 98.2 | pass | yes | pending | no |
| Cybersecurity `cyber` | 4 | 99.3 | 98.6 | pass | yes | pending | no |
| Mobile Development `mobile` | 4 | 99.7 | 99.4 | pass | yes | pending | no |
| Video Editing `video` | 4 | 99.7 | 99.4 | pass | yes | pending | no |
| YouTube Automation `youtube` | 4 | 99.3 | 98.7 | pass | yes | pending | no |
| Digital Marketing `marketing` | 4 | 99.7 | 99.5 | pass | yes | pending | no |
| AI for Work & Productivity `ai` | 4 | 99.1 | 98.3 | pass | yes | pending | no |
| No-Code Development `nocode` | 3 | 99.8 | 99.5 | pass | yes | pending | no |
| Technical Writing `writing` | 4 | 100 | 100 | pass | yes | pending | no |
| Crypto & Web3 `crypto` | 11 | 99.3 | 98.4 | pass | yes | pending | no |
| Project Management `projectmgmt` | 6 | 99.9 | 99.3 | pass | yes | pending | no |
| Product Management `productmgmt` | 8 | 99.7 | 99.3 | pass | yes | pending | no |
| Dart Programming `dart` | 4 | 99.6 | 99.2 | pass | yes | pending | no |
| Sonic Blockchain Development `sonic` | 6 | 99.3 | 98.7 | pass | yes | pending | no |
| AI Foundations & Fluency `ai-foundations` | 6 | 99.6 | 99.2 | pass | yes | pending | no |
| AI for Work & Productivity `ai-work` | 5 | 99.8 | 99.6 | pass | yes | pending | no |
| AI Research, Search & Verification `ai-research` | 5 | 100 | 100 | pass | yes | pending | no |
| AI Content Creation `ai-content` | 6 | 99.6 | 99.3 | pass | yes | pending | no |
| AI Video & YouTube `ai-youtube` | 10 | 99.9 | 99.9 | pass | yes | pending | no |
| AI-Assisted Software Development `ai-software-development` | 8 | 99.9 | 99.7 | pass | yes | pending | no |
| AI Automation `ai-automation` | 8 | 99.8 | 99.6 | pass | yes | pending | no |
| AI Agents `ai-agents` | 10 | 100 | 100 | pass | yes | pending | no |
| AI Data, APIs & Engineering `ai-engineering` | 10 | 99.8 | 99.7 | pass | yes | pending | no |
| AI Design & Creative Work `ai-design` | 8 | 99.6 | 99.3 | pass | yes | pending | no |

## Failing mandatory gates by track

## Score components (readiness / worthiness)

<details><summary>Frontend Development `frontend`</summary>

**Curriculum readiness** — 99.5/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.5/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Backend Development `backend`</summary>

**Curriculum readiness** — 99.2/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.2/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 80% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.4/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.4/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 80% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Full-Stack Development `fullstack`</summary>

**Curriculum readiness** — 99.8/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.8/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.5/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.5/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Python Development `python`</summary>

**Curriculum readiness** — 99.3/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.3/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 80% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.6/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.6/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 80% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>UI/UX Design `uiux`</summary>

**Curriculum readiness** — 99.6/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.6/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.2/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.2/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>QA Engineering `qa`</summary>

**Curriculum readiness** — 99.7/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.7/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.4/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.4/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Data Analysis `data`</summary>

**Curriculum readiness** — 99.2/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.2/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.3/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.3/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Data Science `datascience`</summary>

**Curriculum readiness** — 99.6/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.6/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.3/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.3/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>DevOps Engineering `devops`</summary>

**Curriculum readiness** — 99.1/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.1/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 60% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.2/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.2/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 60% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Cybersecurity `cyber`</summary>

**Curriculum readiness** — 99.3/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.3/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 75% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.6/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.6/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 75% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Mobile Development `mobile`</summary>

**Curriculum readiness** — 99.7/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.7/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.4/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.4/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Video Editing `video`</summary>

**Curriculum readiness** — 99.7/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.7/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.4/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.4/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>YouTube Automation `youtube`</summary>

**Curriculum readiness** — 99.3/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.3/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 75% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.7/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.7/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 75% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Digital Marketing `marketing`</summary>

**Curriculum readiness** — 99.7/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.7/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.5/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.5/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI for Work & Productivity `ai`</summary>

**Curriculum readiness** — 99.1/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.1/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 50% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.3/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.3/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 50% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>No-Code Development `nocode`</summary>

**Curriculum readiness** — 99.8/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.8/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.5/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.5/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Technical Writing `writing`</summary>

**Curriculum readiness** — 100/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 10/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 100/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 10/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Crypto & Web3 `crypto`</summary>

**Curriculum readiness** — 99.3/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.3/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 72% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.4/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 14.7/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.7/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 72% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Project Management `projectmgmt`</summary>

**Curriculum readiness** — 99.9/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.9/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.3/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 14.5/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.8/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Product Management `productmgmt`</summary>

**Curriculum readiness** — 99.7/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.7/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.3/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.3/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Dart Programming `dart`</summary>

**Curriculum readiness** — 99.6/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.6/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.2/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.2/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>Sonic Blockchain Development `sonic`</summary>

**Curriculum readiness** — 99.3/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.3/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 98.7/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 8.7/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Foundations & Fluency `ai-foundations`</summary>

**Curriculum readiness** — 99.6/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.6/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.2/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.2/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI for Work & Productivity `ai-work`</summary>

**Curriculum readiness** — 99.8/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.8/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 80% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.6/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.6/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 80% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Research, Search & Verification `ai-research`</summary>

**Curriculum readiness** — 100/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 10/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 100/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 10/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Content Creation `ai-content`</summary>

**Curriculum readiness** — 99.6/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.6/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.3/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.3/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Video & YouTube `ai-youtube`</summary>

**Curriculum readiness** — 99.9/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.9/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.9/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.9/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI-Assisted Software Development `ai-software-development`</summary>

**Curriculum readiness** — 99.9/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.9/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.7/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.7/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Automation `ai-automation`</summary>

**Curriculum readiness** — 99.8/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.8/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 87% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.6/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.6/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 87% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Agents `ai-agents`</summary>

**Curriculum readiness** — 100/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 10/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 100/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 10/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Data, APIs & Engineering `ai-engineering`</summary>

**Curriculum readiness** — 99.8/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.8/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 90% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.7/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.7/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 90% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

<details><summary>AI Design & Creative Work `ai-design`</summary>

**Curriculum readiness** — 99.6/100

- 15/15 — Learning outcomes, coverage and instructional sequence *(review)*: 100% of stages have an authored plan; 100% state an objective with topics.
- 15/15 — Accuracy, depth and usefulness of instructional content *(review)*: 100% of stages have >= 250 chars of instruction; worked examples 100%; common mistakes 100%.
- 9.6/10 — Relevant, usable and verified learning resources *(review)*: 100% of stages have a required content-inspected (level >= 3) resource; 100% have a reachable destination; 100% have content whose vocabulary matches the objective.
- 15/15 — Knowledge tests and section-level assessment coverage *(review)*: 100% of stages have >= 3 questions; authored 100%.
- 15/15 — Practical assignments and phase-project coverage: 100% of stages have an AI-assessable project.
- 15/15 — AI verification, rubric quality and evidence validation: 100% of stages have an AI-verified mastery gate with mandatory rubric criteria.
- 10/10 — Progression gates, remediation and saved assessment results: Server-validated; no client forgery path; retry supported; history retained.
- 5/5 — Accessibility, clarity and learner-facing explanations *(review)*: Mechanical proxy only; instructional clarity and accessibility need human review.

**Premium worthiness** — 99.3/100

- 15/15 — Coherent skill progression and demonstrable outcomes *(review)*: 100% of stages have an authored outcome; portfolio verified.
- 15/15 — Curriculum depth, correctness and practical coverage *(review)*: Depth proxy; technical correctness requires expert human review.
- 9.3/10 — Quality and usefulness of instructional resources *(review)*: 100% of stages have a required content-inspected resource; 100% have content matching the objective.
- 15/15 — Knowledge tests that genuinely establish understanding *(review)*: Question quality (plausible distractors, non-trivial reasoning) needs human review.
- 15/15 — Meaningful practical assignments and phase projects: 100% of stages have an AI-assessable project; 100% have an authored brief.
- 20/20 — Reliable AI-verified mastery and evidence-based feedback: 100% of stages have an AI-verified mastery gate; results persisted.
- 10/10 — Portfolio, capstone or other demonstrated outcomes: Portfolio project verified.

</details>

## External resource verification

Probe evidence generated 2026-10-22 by `scripts/verify-resource-links.mjs` (`scripts/resource-probe.json`): 433/437 mapped URLs resolved, 346 with inspected main content.

Evidence levels and what each one requires:

| Level | Meaning | Evidence required |
| ---: | --- | --- |
| 0 | No evidence | — |
| 1 | URL discovered | a URL exists; destination unverified |
| 2 | Destination + identity verified | HTTP reachable and the right page — a title/HTTP 200 is **not** enough |
| 3 | Content verified | the actual main content was extracted and compared with the objective (`contentEvidence`) |
| 4 | Playback/interaction verified | the video/interactive experience was actually used |

| Level | Mapped resource entries |
| ---: | ---: |
| 0 | 0 |
| 1 | 1 |
| 2 | 98 |
| 3 | 382 |
| 4 | 0 |

Of the mapped entries, 312 have inspected content whose vocabulary matches their stage objective; 98 required entries could not be content-inspected (video, interactive app or JS shell) and are listed per stage below.

**Level 4 (playback) is 0 and cannot be claimed here:** no video or interactive resource was actually played in this environment, and no unauthenticated transcript/runtime source is available. Runtime, segment timestamps and playback remain human-review items (see the reviewer packets).

### Mapped URLs that did not resolve (4)

- HTTP 0 — https://react.dev
- HTTP 0 — https://react.dev/learn
- HTTP 404 — https://owasp.org/www-project-api-security
- HTTP 429 — https://tryhackme.com/paths

No stage depends on these alone: every stage still has at least one content-inspected required resource.

### Required resources that could not be content-inspected

| Track | Stage | Resource | URL | Why |
| --- | --- | --- | --- | --- |
| undefined | undefined | HTML Crash Course | https://www.youtube.com/watch?v=UB1O30fR-EE | Destination and identity verified (HTTP 200, "HTML Crash Course For Absolute Beginners") o |
| undefined | undefined | CSS Crash Course | https://www.youtube.com/watch?v=yfoY53QXEnI | Destination and identity verified (HTTP 200, "CSS Crash Course For Absolute Beginners") on |
| undefined | undefined | CSS Grid Garden | https://cssgridgarden.com | Destination and identity verified (HTTP 200, "Grid Garden - A game for learning CSS grid l |
| undefined | undefined | JavaScript Full Course | https://www.youtube.com/watch?v=PkZNo7MFNFg | Destination and identity verified (HTTP 200, "Learn JavaScript - Full Course for Beginners |
| undefined | undefined | React Full Course | https://www.youtube.com/watch?v=bMknfKXIFA8 | Destination and identity verified (HTTP 200, "React Course - Beginner's Tutorial for React |
| undefined | undefined | Git & GitHub Crash Course | https://www.youtube.com/watch?v=RGOj5yH7evk | Destination and identity verified (HTTP 200, "Git and GitHub for Beginners - Crash Course" |
| undefined | undefined | How the Internet Works | https://www.youtube.com/watch?v=7_LPdttKXPc | Destination and identity verified (HTTP 200, "How the Internet Works in 5 Minutes") on 202 |
| undefined | undefined | HTTP Crash Course | https://www.youtube.com/watch?v=iYM2zFP3Zn0 | Destination and identity verified (HTTP 200, "HTTP Crash Course & Exploration") on 2026-10 |
| undefined | undefined | Build Your First API in 30 Minutes | https://www.youtube.com/watch?v=L72fhGm1tfE | Destination and identity verified (HTTP 200, "Express JS Crash Course") on 2026-10-22, but |
| undefined | undefined | Node.js & Express Full Course | https://www.youtube.com/watch?v=Oe421EPjeBE | Destination and identity verified (HTTP 200, "Node.js and Express.js - Full Course") on 20 |
| undefined | undefined | PostgreSQL Full Course | https://www.youtube.com/watch?v=qw--VYLpxG4 | Destination and identity verified (HTTP 200, "Learn PostgreSQL Tutorial - Full Course for  |
| undefined | undefined | FastAPI Full Course | https://www.youtube.com/watch?v=0sOvCWFmrtA | Destination and identity verified (HTTP 200, "Python API Development - Comprehensive Cours |
| undefined | undefined | Docker Full Course | https://www.youtube.com/watch?v=fqMOX6JJhGo | Destination and identity verified (HTTP 200, "Docker Tutorial for Beginners - A Full DevOp |
| undefined | undefined | Full-Stack MERN App | https://www.youtube.com/watch?v=nu_pCVPKzTk | Destination and identity verified (HTTP 200, "Full Stack Web Development for Beginners (Fu |
| undefined | undefined | WebSockets with Socket.IO | https://www.youtube.com/watch?v=CzcfeL7ymbU | Destination and identity verified (HTTP 200, "WebSockets Beginners Tutorial with Socket.IO |
| undefined | undefined | Python Full Course for Beginners | https://www.youtube.com/watch?v=rfscVS0vtbw | Destination and identity verified (HTTP 200, "Learn Python - Full Course for Beginners [Tu |
| undefined | undefined | Corey Schafer Python Tutorials | https://www.youtube.com/@coreyms | Destination and identity verified (HTTP 200, "Corey Schafer - YouTube") on 2026-10-22, but |
| undefined | undefined | Python for Everybody (freeCodeCamp) | https://www.youtube.com/watch?v=8DvywoWv6fI | Destination and identity verified (HTTP 200, "Python for Everybody - Full University Pytho |
| undefined | undefined | FastAPI Full Course | https://www.youtube.com/watch?v=0sOvCWFmrtA | Destination and identity verified (HTTP 200, "Python API Development - Comprehensive Cours |
| undefined | undefined | Google Material Design | https://material.io/design | Destination and identity verified (HTTP 200, "Material Design") on 2026-10-22, but content |
| undefined | undefined | The Futur — Design Education Channel | https://www.youtube.com/@thefutur | Destination and identity verified (HTTP 200, "The Futur - YouTube") on 2026-10-22, but con |
| undefined | undefined | DesignCourse YouTube | https://www.youtube.com/@DesignCourse | Destination and identity verified (HTTP 200, "DesignCourse - YouTube") on 2026-10-22, but  |
| undefined | undefined | Dribbble | https://dribbble.com | Destination and identity verified (HTTP 202, "") on 2026-10-22, but content was not inspec |
| undefined | undefined | Cypress Full Course | https://www.youtube.com/watch?v=u8vMu7viCm8 | Destination and identity verified (HTTP 200, "Testing JavaScript with Cypress – Full Cours |
| undefined | undefined | Playwright — Official YouTube Channel | https://www.youtube.com/@Playwrightdev | Destination and identity verified (HTTP 200, "Playwright - YouTube") on 2026-10-22, but co |
| undefined | undefined | Excel Full Course | https://www.youtube.com/watch?v=Vl0H-qTclOg | Destination and identity verified (HTTP 200, "Microsoft Excel Tutorial for Beginners - Ful |
| undefined | undefined | Kaggle Notebook Example | https://www.kaggle.com/learn-forum | Destination and identity verified (HTTP 200, "Getting Started | Kaggle") on 2026-10-22, bu |
| undefined | undefined | SQL Full Course | https://www.youtube.com/watch?v=HXV3zeQKqGY | Destination and identity verified (HTTP 200, "SQL Tutorial - Full Database Course for Begi |
| undefined | undefined | Pandas Full Course | https://www.youtube.com/watch?v=vmEHCJofslg | Destination and identity verified (HTTP 200, "Complete Python Pandas Data Science Tutorial |
| undefined | undefined | Kaggle Learn | https://www.kaggle.com/learn | Destination and identity verified (HTTP 200, "Learn Python, Data Viz, Pandas & More | Tuto |
| undefined | undefined | Kaggle Datasets | https://www.kaggle.com/datasets | Destination and identity verified (HTTP 200, "Find Open Datasets for AI and Research | Kag |
| undefined | undefined | Power BI Full Course | https://www.youtube.com/watch?v=TmhQCQr_DCA | Destination and identity verified (HTTP 200, "How to use Microsoft Power BI - Tutorial for |
| undefined | undefined | Khan Academy Statistics | https://www.khanacademy.org/math/statistics-probability | Destination and identity verified (HTTP 200, "Client Challenge") on 2026-10-22, but conten |
| undefined | undefined | StatQuest Statistics | https://statquest.org/video_index.html | Destination and identity verified (HTTP 200, "Videos!!!") on 2026-10-22, but content was n |
| undefined | undefined | StatQuest with Josh Starmer | https://www.youtube.com/@statquest | Destination and identity verified (HTTP 200, "StatQuest with Josh Starmer - YouTube") on 2 |
| undefined | undefined | ML Full Course | https://www.youtube.com/watch?v=i_LwzRVP7bg | Destination and identity verified (HTTP 200, "Machine Learning for Everybody – Full Course |
| undefined | undefined | Kaggle Learn ML | https://www.kaggle.com/learn | Destination and identity verified (HTTP 200, "Learn Python, Data Viz, Pandas & More | Tuto |
| undefined | undefined | Linux Full Course | https://www.youtube.com/watch?v=ROjZy1WbCIA | Destination and identity verified (HTTP 200, "Linux Operating System - Crash Course for Be |
| undefined | undefined | TechWorld with Nana | https://www.youtube.com/@TechWorldwithNana | Destination and identity verified (HTTP 200, "TechWorld with Nana - YouTube") on 2026-10-2 |
| undefined | undefined | Docker Full Course | https://www.youtube.com/watch?v=fqMOX6JJhGo | Destination and identity verified (HTTP 200, "Docker Tutorial for Beginners - A Full DevOp |
| undefined | undefined | AWS Full Course | https://www.youtube.com/watch?v=7HKot-brXFE | Destination and identity verified (HTTP 200, "AWS Certified Cloud Practitioner Certificati |
| undefined | undefined | NetworkChuck YouTube | https://www.youtube.com/@NetworkChuck | Destination and identity verified (HTTP 200, "NetworkChuck - YouTube") on 2026-10-22, but  |
| undefined | undefined | TryHackMe — Complete Beginner Path | https://tryhackme.com/paths | Destination exists but the automated check was blocked (HTTP 429) on 2026-10-22; content n |
| undefined | undefined | Splunk SIEM Tutorial | https://www.youtube.com/watch?v=pTvGrj3QOmU | Destination and identity verified (HTTP 200, "Splunk SIEM Tutorial | Most Popular Cybersec |
| undefined | undefined | React Native Full Course | https://www.youtube.com/watch?v=0-S5a0eXPoc | Destination and identity verified (HTTP 200, "React Native Tutorial for Beginners - Build  |
| undefined | undefined | Flutter Full Course | https://www.youtube.com/watch?v=VPvVD8t02U8 | Destination and identity verified (HTTP 200, "Flutter Course for Beginners – 37-hour Cross |
| undefined | undefined | Casey Faris, DaVinci Resolve | https://www.youtube.com/@CaseyFaris | Destination and identity verified (HTTP 200, "Casey Faris - YouTube") on 2026-10-22, but c |
| undefined | undefined | YouTube Creator Academy | https://creatoracademy.youtube.com/ | Destination and identity verified (HTTP 200, "YouTube Creators - YouTube") on 2026-10-22,  |
| undefined | undefined | Matt Par YouTube Channel | https://www.youtube.com/@MattPar | Destination and identity verified (HTTP 200, "Matt Par Course Reviews - YouTube") on 2026- |
| undefined | undefined | Canva | https://www.canva.com | Destination and identity verified (HTTP 200, "Unsupported client – Canva") on 2026-10-22,  |
| undefined | undefined | TubeBuddy | https://tubebuddy.com | Destination and identity verified (HTTP 200, "YouTube SEO & Growth Tool for Creators | Tub |
| undefined | undefined | HubSpot Academy | https://academy.hubspot.com | Destination and identity verified (HTTP 200, "HubSpot Academy") on 2026-10-22, but content |
| undefined | undefined | Neil Patel YouTube | https://www.youtube.com/@NeilPatel | Destination and identity verified (HTTP 200, "Neil Patel - YouTube") on 2026-10-22, but co |
| undefined | undefined | Intro to Large Language Models | https://www.youtube.com/watch?v=zjkBMFhNj_g | Destination and identity verified (HTTP 200, "[1hr Talk] Intro to Large Language Models")  |
| undefined | undefined | Neural Networks, 3Blue1Brown | https://www.youtube.com/watch?v=aircAruvnKk | Destination and identity verified (HTTP 200, "But what is a neural network? | Deep learnin |
| undefined | undefined | Bubble Academy | https://bubble.io/academy | Destination and identity verified (HTTP 200, "Bubble Academy — Free Courses to Build Real  |
| undefined | undefined | Blockchain Demo — Anders Brownworth | https://andersbrownworth.com/blockchain | Destination and identity verified (HTTP 200, "Blockchain Demo") on 2026-10-22, but content |
| undefined | undefined | Bitcoin Whitepaper | https://bitcoin.org/bitcoin.pdf | Destination and identity verified (HTTP 200, "") on 2026-10-22, but content was not inspec |
| undefined | undefined | Solidity by Example | https://solidity-by-example.org | Destination and identity verified (HTTP 200, "Solidity by Example") on 2026-10-22, but con |
| undefined | undefined | Patrick Collins — Solidity Full Course | https://www.youtube.com/watch?v=umepbfKp5rI | Destination and identity verified (HTTP 200, "Learn Solidity, Blockchain Development, & Sm |
| undefined | undefined | Finematics YouTube | https://www.youtube.com/c/Finematics | Destination and identity verified (HTTP 200, "Finematics - YouTube") on 2026-10-22, but co |
| undefined | undefined | DeFi MOOC — UC Berkeley | https://defi-learning.org | Destination and identity verified (HTTP 200, "Decentralized Finance MOOC") on 2026-10-22,  |
| undefined | undefined | wagmi Documentation | https://wagmi.sh | Destination and identity verified (HTTP 200, "Wagmi | Reactivity for Ethereum apps") on 20 |
| undefined | undefined | Ethernaut | https://ethernaut.openzeppelin.com | Destination and identity verified (HTTP 200, "The Ethernaut") on 2026-10-22, but content w |
| undefined | undefined | Project Management Full Course (freeCodeCamp) | https://www.youtube.com/watch?v=uWPIsaYpY7U | Destination and identity verified (HTTP 200, "Project Management Full Course In 8 Hours |  |
| undefined | undefined | Product Management Full Course | https://www.youtube.com/watch?v=0p5YPBl_uBI | Destination and identity verified (HTTP 200, "Product Management Full Course 2026 | Produc |
| undefined | undefined | Lenny's Newsletter | https://www.lennysnewsletter.com | Destination and identity verified (HTTP 200, "Lenny's Newsletter | Substack") on 2026-10-2 |
| undefined | undefined | The Mom Test Summary | https://www.youtube.com/watch?v=pk3VOO9WT8o | Destination and identity verified (HTTP 200, "TOP 3 TIPS from THE MOM TEST by Rob Fitzpatr |
| undefined | undefined | Writing Good Acceptance Criteria | https://www.atlassian.com/agile/requirements/acceptance-criteria | Destination and identity verified (HTTP 200, "| Atlassian") on 2026-10-22, but content was |
| undefined | undefined | Shreyas Doshi on Twitter/X | https://twitter.com/shreyas | Destination and identity verified (HTTP 200, "Shreyas Doshi (@shreyas) / X") on 2026-10-22 |
| undefined | undefined | Dart Full Course | https://www.youtube.com/watch?v=Ej_Pcr4uC2Q | Destination and identity verified (HTTP 200, "Dart Programming Tutorial - Full Course") on |
| undefined | undefined | DartPad | https://dartpad.dev | Destination and identity verified (HTTP 200, "DartPad") on 2026-10-22, but content was not |
| undefined | undefined | The Net Ninja — Dart Series | https://www.youtube.com/playlist?list=PL4cUxeGkcC9iVGY3ppchN9CBSPYyHmPh4 | Destination and identity verified (HTTP 200, "undefined - YouTube") on 2026-10-22, but con |
| undefined | undefined | HackQuest Sonic Learning Track | https://www.hackquest.io/learning-track/Sonic | Destination and identity verified (HTTP 200, "Sonic - HackQuest") on 2026-10-22, but conte |
| undefined | undefined | Sonic Testnet Faucet | https://testnet.soniclabs.com/account | Destination and identity verified (HTTP 200, "Sonic Testnet") on 2026-10-22, but content w |
| undefined | undefined | Sonic Block Explorer | https://explorer.soniclabs.com | Destination and identity verified (HTTP 200, "Sonic Explorer") on 2026-10-22, but content  |
| undefined | undefined | Patrick Collins Solidity Course | https://www.youtube.com/watch?v=umepbfKp5rI | Destination and identity verified (HTTP 200, "Learn Solidity, Blockchain Development, & Sm |
| undefined | undefined | Foundry Book | https://book.getfoundry.sh | Destination and identity verified (HTTP 200, "Foundry - Ethereum Development Framework – f |
| undefined | undefined | Sonic Discord | https://discord.gg/soniclabs | Destination and identity verified (HTTP 200, "Sonic Labs") on 2026-10-22, but content was  |
| undefined | undefined | Deploying to Sonic Mainnet | https://www.sonicsvm.org/ | Destination and identity verified (HTTP 200, "Sonic SVM: Architecting the Attention Econom |
| undefined | undefined | OpenAI Academy — AI Foundations | https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true | Destination and identity verified (HTTP 200, "OpenAI Academy") on 2026-10-22, but content  |
| undefined | undefined | 3Blue1Brown — Neural Networks | https://www.youtube.com/watch?v=aircAruvnKk | Destination and identity verified (HTTP 200, "But what is a neural network? | Deep learnin |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/ | Destination and identity verified (HTTP 200, "Generative AI for Beginners | Microsoft Lear |
| undefined | undefined | OpenAI Academy — AI Foundations Course | https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true | Destination and identity verified (HTTP 200, "OpenAI Academy") on 2026-10-22, but content  |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://www.youtube.com/watch?v=k7HaeJs-N-o | Destination and identity verified (HTTP 200, "Full Series [Part 1-18] | Generative AI for  |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://www.youtube.com/watch?v=k7HaeJs-N-o | Destination and identity verified (HTTP 200, "Full Series [Part 1-18] | Generative AI for  |
| undefined | undefined | Canva Design School | https://www.canva.com/designschool/ | Destination and identity verified (HTTP 200, "Unsupported client – Canva") on 2026-10-22,  |
| undefined | undefined | Canva Design School — Apply visual hierarchy, comp | https://www.canva.com/design-school/courses/ | Destination and identity verified (HTTP 200, "Unsupported client – Canva") on 2026-10-22,  |
| undefined | undefined | Digital Marketing Institute — Content Repurposing | https://digitalmarketinginstitute.com/resources/lessons/content-marketing_content-repurposing_ttbC | Destination and identity verified (HTTP 200, "Content Repurposing - Digital Marketing Less |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://www.youtube.com/watch?v=k7HaeJs-N-o | Destination and identity verified (HTTP 200, "Full Series [Part 1-18] | Generative AI for  |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/ | Destination and identity verified (HTTP 200, "Generative AI for Beginners | Microsoft Lear |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://www.youtube.com/watch?v=k7HaeJs-N-o | Destination and identity verified (HTTP 200, "Full Series [Part 1-18] | Generative AI for  |
| undefined | undefined | n8n Courses | https://docs.n8n.io/courses/ | Destination and identity verified (HTTP 200, "n8n") on 2026-10-22, but content was not ins |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://www.youtube.com/watch?v=k7HaeJs-N-o | Destination and identity verified (HTTP 200, "Full Series [Part 1-18] | Generative AI for  |
| undefined | undefined | Canva Design School | https://www.canva.com/designschool/ | Destination and identity verified (HTTP 200, "Unsupported client – Canva") on 2026-10-22,  |
| undefined | undefined | Canva Design School | https://www.canva.com/design-school/courses/ | Destination and identity verified (HTTP 200, "Unsupported client – Canva") on 2026-10-22,  |
| undefined | undefined | Microsoft — Generative AI for Beginners | https://www.youtube.com/watch?v=k7HaeJs-N-o | Destination and identity verified (HTTP 200, "Full Series [Part 1-18] | Generative AI for  |
| undefined | undefined | Canva Design School | https://www.canva.com/design-school/courses/ | Destination and identity verified (HTTP 200, "Unsupported client – Canva") on 2026-10-22,  |

## Gap reconciliation

- **Former 41 project-integration gaps:** 0 stages still lack an embedded project; 0 lack an AI-assessable project.
- **Former 52 resource-mapping gaps:** 0 stages still lack a content-inspected (level-3) required resource.
- **Worked-example quality:** 0 non-AI stages have a worked example below the mechanical bar (>= 120 chars, >= 3 steps, no answer leak).

## Method & limitations

- Evidence is read from the **served** learner path (`buildAIWorldClassPath` for `ai-*`
  tracks, `buildGuidedPath` otherwise) plus the authored curriculum modules.
- The tool verifies *completeness and wiring* mechanically. It does not prove factual
  correctness or instructional quality. Components that need human judgement are marked
  *(review)* and must be signed off by a subject-matter expert before launch.
- Automated level 3 proves that real content was extracted and inspected and that its
  vocabulary overlaps the objective. It does **not** prove factual accuracy, currency,
  accessibility or pedagogical fit. Those remain human-review items.
- Reviewer packets (`docs/reviewer-packets/`) assemble the objectives, resource evidence,
  answer keys, rubrics and projects each human reviewer needs. They record **no** approvals.
- Automated evidence alone can NEVER approve a track for premium. A track becomes
  **approved** only when it is mechanically eligible AND a human-review sign-off exists in
  `docs/curriculum-quality-signoff.json` (`--release` enforces this).
- A pass here is necessary but not sufficient for a premium decision.

