# Technical Writing (`writing`)

Slug: `technical-writing` · Category: design · Stages: 4

## Stage 1 — Writing Fundamentals

**Objective:** Write clearly for a technical audience.

**Success criteria:**
- Write concisely
- Use active voice
- Structure for scanning

### Instruction

Good technical writing is not about big vocabulary, it is about clarity. Say complex things simply.

OBJECTIVE
Write clearly for a technical audience.

SUCCESS CRITERIA
• Write concisely
• Use active voice
• Structure for scanning

WORKED EXAMPLE
Rewrite a dense paragraph for a defined reader. Step 1: name the reader and what they need to do. Step 2: cut filler and jargon, keeping technical meaning intact. Step 3: split long sentences and lead with the action. Step 4: compare before and after and justify your three biggest changes.

COMMON MISTAKES
• Long passive sentences
• Assuming the reader has your context

### Worked example

Rewrite a dense paragraph for a defined reader. Step 1: name the reader and what they need to do. Step 2: cut filler and jargon, keeping technical meaning intact. Step 3: split long sentences and lead with the action. Step 4: compare before and after and justify your three biggest changes.

### Common mistakes
- Long passive sentences
- Assuming the reader has your context

### Ungraded practice
**Practice: Writing Fundamentals**

DO THIS NOW
Rewrite a dense paragraph into short sentences with headings and active voice, cutting at least 25% of the words.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which sentence is in active voice?
   - The bug was fixed by the team.
   - **✔ The team fixed the bug.**
   - The bug had been fixed.
   - A fix was applied.
   - _Answer:_ The team fixed the bug. · _Why:_ Active voice puts the actor first: "The team fixed the bug." · _Level:_ apply

2. Why prefer short sentences and headings in technical writing?
   - They look nicer
   - **✔ Readers scan for the answer; structure helps them find it fast**
   - They reduce word count only
   - They are required
   - _Answer:_ Readers scan for the answer; structure helps them find it fast · _Why:_ Structure and brevity help readers find answers quickly. · _Level:_ understand

3. Writing "simply click the obvious button" is a problem because…
   - It is too short
   - **✔ It assumes shared context and may be wrong or condescending**
   - It uses contractions
   - It is passive
   - _Answer:_ It assumes shared context and may be wrong or condescending · _Why:_ Ambiguous, assumptive instructions fail for readers without your context. · _Level:_ evaluate

### Phase project — Build: Clarity Rewrite Clinic (`tw-p4`)

- **Objective:** Rewrite the source for clarity without losing accuracy.
- **Problem:** A dense internal document is hard for its real audience to act on.
- **Audience:** A named, non-expert reader who must act on the content.
- **Required functionality:**
  - A defined audience and purpose
  - A restructured version (headings, short paragraphs, examples)
  - Annotated justifications for the major changes
  - A before/after comparison
- **Constraints:**
  - Do not change technical meaning
  - Keep all required information
  - Prefer plain language over jargon where possible
- **Acceptance criteria (brief):**
  - A reader can find the key action quickly
  - No factual meaning changed
  - At least five changes are justified
- **Required evidence:**
  - Before and after documents
  - An annotated list of changes and why
  - A short accuracy review note
- **Rubric version:** r15lm2sd-6 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - A publicly accessible deliverable is provided (weight 1, mandatory)
  - The deliverable contains the required content (weight 2, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - A reader can find the key action quickly (weight 1)
  - No factual meaning changed (weight 1)
  - At least five changes are justified (weight 1)
- **Acceptance criteria (contract):**
  - A reader can find the key action quickly
  - No factual meaning changed
  - At least five changes are justified

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Tools & Formats

**Objective:** Use the tools and formats of modern technical writing.

**Success criteria:**
- Write Markdown
- Use docs-as-code
- Create diagrams

### Instruction

Technical writers work inside the same tools as engineers. Learn the formats used by modern tech teams.

OBJECTIVE
Use the tools and formats of modern technical writing.

SUCCESS CRITERIA
• Write Markdown
• Use docs-as-code
• Create diagrams

WORKED EXAMPLE
Write docs-as-code. Step 1: create a Markdown file in the repository. Step 2: use headings, lists and code fences consistently. Step 3: submit it as a pull request for review. Step 4: confirm the change renders correctly in the preview before merging.

COMMON MISTAKES
• Using WYSIWYG only with no version history
• Diagrams with no labels or legend

### Worked example

Write docs-as-code. Step 1: create a Markdown file in the repository. Step 2: use headings, lists and code fences consistently. Step 3: submit it as a pull request for review. Step 4: confirm the change renders correctly in the preview before merging.

### Common mistakes
- Using WYSIWYG only with no version history
- Diagrams with no labels or legend

### Ungraded practice
**Practice: Tools & Formats**

DO THIS NOW
Write a Markdown document in a Git repository, add a Mermaid diagram, and open a pull request for review.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is docs-as-code?
   - Writing code instead of docs
   - **✔ Managing documentation in version control alongside code, with review and CI**
   - A documentation theme
   - A paid tool
   - _Answer:_ Managing documentation in version control alongside code, with review and CI · _Why:_ Docs-as-code applies software workflows (Git, review, CI) to documentation. · _Level:_ understand

2. What is Markdown?
   - A programming language
   - **✔ A lightweight markup syntax for formatting plain text**
   - A database
   - A diagram tool
   - _Answer:_ A lightweight markup syntax for formatting plain text · _Why:_ Markdown is a plain-text formatting syntax rendered to HTML. · _Level:_ recall

3. A diagram is most useful when it…
   - Is decorative
   - **✔ Has labelled elements and a clear purpose the text references**
   - Uses many colours
   - Is animated
   - _Answer:_ Has labelled elements and a clear purpose the text references · _Why:_ Diagrams should be labelled, purposeful and referenced by the prose. · _Level:_ apply

### Phase project — Build: Tutorial Series (`tw-p2`)

- **Objective:** Complete "Tutorial Series" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** r1wftlg1-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - A publicly accessible deliverable is provided (weight 1, mandatory)
  - The deliverable contains the required content (weight 2, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Documentation Types

**Objective:** Choose the right documentation type for the reader's need.

**Success criteria:**
- Write API docs
- Write tutorials and how-tos
- Write reference and explanations

### Instruction

Each documentation type has a different structure and purpose. Learn the Divio documentation system.

OBJECTIVE
Choose the right documentation type for the reader's need.

SUCCESS CRITERIA
• Write API docs
• Write tutorials and how-tos
• Write reference and explanations

WORKED EXAMPLE
Write an API reference page. Step 1: document one endpoint — purpose, method and path. Step 2: list parameters with types and whether they are required. Step 3: give a request example and a response example. Step 4: add one common error and how to fix it.

COMMON MISTAKES
• Mixing learning and reference in one page
• Reference without examples

### Worked example

Write an API reference page. Step 1: document one endpoint — purpose, method and path. Step 2: list parameters with types and whether they are required. Step 3: give a request example and a response example. Step 4: add one common error and how to fix it.

### Common mistakes
- Mixing learning and reference in one page
- Reference without examples

### Ungraded practice
**Practice: Documentation Types**

DO THIS NOW
For one API endpoint, write a tutorial (learning-oriented) and a reference entry (information-oriented), and note how they differ.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. A tutorial is written to…
   - Serve as a lookup table
   - **✔ Teach a beginner by guiding them through a successful first experience**
   - Explain every option
   - Replace the reference
   - _Answer:_ Teach a beginner by guiding them through a successful first experience · _Why:_ Tutorials are learning-oriented and guide a first success. · _Level:_ understand

2. Reference documentation is optimised for…
   - Teaching concepts
   - **✔ Accurate, complete lookup of facts and options**
   - Storytelling
   - Marketing
   - _Answer:_ Accurate, complete lookup of facts and options · _Why:_ Reference is information-oriented: precise and complete for lookup. · _Level:_ understand

3. Good API documentation should include…
   - Only the endpoint URL
   - **✔ Parameters, authentication, request/response examples and errors**
   - A company history
   - Design mockups only
   - _Answer:_ Parameters, authentication, request/response examples and errors · _Why:_ API docs need parameters, auth, examples and error behaviour. · _Level:_ apply

### Phase project — Build: API Documentation (`tw-p1`)

- **Objective:** Complete "API Documentation" to a standard you can show and explain to someone else.
- **Problem:** A real foundation problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** r1wftlg1-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - A publicly accessible deliverable is provided (weight 1, mandatory)
  - The deliverable contains the required content (weight 2, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Portfolio & Specialization

**Objective:** Build a portfolio and choose a specialisation.

**Success criteria:**
- Assemble a portfolio
- Contribute to open source
- Choose a domain

### Instruction

Build a portfolio of real documentation samples. Contributing to open source docs is an excellent start.

OBJECTIVE
Build a portfolio and choose a specialisation.

SUCCESS CRITERIA
• Assemble a portfolio
• Contribute to open source
• Choose a domain

WORKED EXAMPLE
Build a writing portfolio piece. Step 1: choose a document type you can show publicly. Step 2: write or edit it to a high standard. Step 3: add a short note explaining the audience and decisions. Step 4: publish it somewhere a hiring manager can read without an account.

COMMON MISTAKES
• Showing only polished prose with no reasoning about audience
• No published, linkable samples

### Worked example

Build a writing portfolio piece. Step 1: choose a document type you can show publicly. Step 2: write or edit it to a high standard. Step 3: add a short note explaining the audience and decisions. Step 4: publish it somewhere a hiring manager can read without an account.

### Common mistakes
- Showing only polished prose with no reasoning about audience
- No published, linkable samples

### Ungraded practice
**Practice: Portfolio & Specialization**

DO THIS NOW
Assemble three writing samples (one tutorial, one reference, one explanation) and publish them where an employer can find them.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What makes a technical-writing portfolio credible?
   - A long introduction
   - **✔ Linkable samples that show audience awareness and clarity**
   - A list of tools
   - A certificate only
   - _Answer:_ Linkable samples that show audience awareness and clarity · _Why:_ Employers want to read real samples that demonstrate clarity. · _Level:_ evaluate

2. Why is contributing to open-source docs valuable?
   - It is easy
   - **✔ It produces public, reviewable work and real collaboration experience**
   - It replaces all other samples
   - It is required
   - _Answer:_ It produces public, reviewable work and real collaboration experience · _Why:_ Public contributions are verifiable evidence of real collaboration. · _Level:_ understand

3. Specialising by domain helps because…
   - It limits your options
   - **✔ You can write with subject fluency that generalists cannot**
   - It avoids learning
   - It is required
   - _Answer:_ You can write with subject fluency that generalists cannot · _Why:_ Domain fluency produces more accurate, trusted documentation. · _Level:_ analyze

### Phase project — Portfolio project: Open Source Contribution (`tw-p3`)

- **Objective:** Complete "Open Source Contribution" to a standard you can show and explain to someone else.
- **Problem:** A real portfolio problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** r1wftlg1-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - A publicly accessible deliverable is provided (weight 1, mandatory)
  - The deliverable contains the required content (weight 2, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
