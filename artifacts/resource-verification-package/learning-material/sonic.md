# Sonic Blockchain Development (`sonic`)

Slug: `sonic-blockchain` · Category: build · Stages: 6

## Stage 1 — Web3 Basics (HackQuest Phase 1)

**Objective:** Understand the Web3 fundamentals Sonic builds on.

**Success criteria:**
- Explain keys and wallets
- Explain transactions and gas
- Describe consensus

### Instruction

Complete Phase 1 of the HackQuest Sonic path. This foundation applies to every EVM chain you will ever build on.

OBJECTIVE
Understand the Web3 fundamentals Sonic builds on.

SUCCESS CRITERIA
• Explain keys and wallets
• Explain transactions and gas
• Describe consensus

WORKED EXAMPLE
Make your first on-chain action. Step 1: create a wallet and fund it from a testnet faucet. Step 2: send a transaction. Step 3: read the receipt on the explorer. Step 4: explain each field so a non-technical friend could follow.

COMMON MISTAKES
• Sharing a private key
• Treating gas as optional

### Worked example

Make your first on-chain action. Step 1: create a wallet and fund it from a testnet faucet. Step 2: send a transaction. Step 3: read the receipt on the explorer. Step 4: explain each field so a non-technical friend could follow.

### Common mistakes
- Sharing a private key
- Treating gas as optional

### Ungraded practice
**Practice: Web3 Basics (HackQuest Phase 1)**

DO THIS NOW
Create a test wallet, send a small testnet transaction, and explain what the signature and gas fee did.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does a wallet actually store?
   - Coins
   - **✔ The keys that control your on-chain accounts**
   - A copy of the blockchain
   - Your password
   - _Answer:_ The keys that control your on-chain accounts · _Why:_ A wallet holds keys; assets live on-chain, controlled by those keys. · _Level:_ understand

2. What is gas?
   - A reward for holding tokens
   - **✔ A fee paid to compensate for computation and storage on-chain**
   - A type of token standard
   - A wallet feature
   - _Answer:_ A fee paid to compensate for computation and storage on-chain · _Why:_ Gas pays for the computation and storage a transaction consumes. · _Level:_ understand

3. What does a consensus mechanism achieve?
   - Faster wallets
   - **✔ Agreement among nodes on the canonical chain state**
   - Lower fees always
   - Private transactions
   - _Answer:_ Agreement among nodes on the canonical chain state · _Why:_ Consensus lets distributed nodes agree on a single valid chain state. · _Level:_ understand

### Phase project — Build: First Contract on Sonic Testnet (`son-p1`)

- **Objective:** Complete "First Contract on Sonic Testnet" to a standard you can show and explain to someone else.
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
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
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

## Stage 2 — Sonic Ecosystem (HackQuest Phase 2)

**Objective:** Explain what makes Sonic distinct in the ecosystem.

**Success criteria:**
- Describe Sonic's performance goals
- Explain FeeM
- Map the ecosystem

### Instruction

Understand what makes Sonic different before writing a single line of code. FeeM is the most important concept — it is how building on Sonic becomes financially sustainable.

OBJECTIVE
Explain what makes Sonic distinct in the ecosystem.

SUCCESS CRITERIA
• Describe Sonic's performance goals
• Explain FeeM
• Map the ecosystem

WORKED EXAMPLE
Map the Sonic ecosystem. Step 1: gather the chain parameters from official sources only. Step 2: note the tooling, RPC and bridges. Step 3: compare two dApps. Step 4: write a getting-started checklist and mark any fact you could not verify from a primary source.

COMMON MISTAKES
• Assuming all chains have identical fee models
• Confusing transaction cost with finality

### Worked example

Map the Sonic ecosystem. Step 1: gather the chain parameters from official sources only. Step 2: note the tooling, RPC and bridges. Step 3: compare two dApps. Step 4: write a getting-started checklist and mark any fact you could not verify from a primary source.

### Common mistakes
- Assuming all chains have identical fee models
- Confusing transaction cost with finality

### Ungraded practice
**Practice: Sonic Ecosystem (HackQuest Phase 2)**

DO THIS NOW
Read the Sonic docs on FeeM and summarise, in three sentences, how developer fee revenue is generated.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does Fee Monetisation (FeeM) do for developers?
   - Charges developers rent
   - **✔ Returns a share of the fees their contracts generate**
   - Removes gas entirely
   - Mints a governance token
   - _Answer:_ Returns a share of the fees their contracts generate · _Why:_ FeeM shares generated fees with the developers whose contracts produce them. · _Level:_ understand

2. Why do fast finality and high throughput matter?
   - They look impressive
   - **✔ They make interactive apps and cheap transactions practical**
   - They reduce security
   - They remove the need for validators
   - _Answer:_ They make interactive apps and cheap transactions practical · _Why:_ High throughput and fast finality enable responsive, low-cost applications. · _Level:_ evaluate

3. Sub-second finality means…
   - Transactions are free
   - **✔ Transactions become irreversible very quickly**
   - No signatures are needed
   - The chain has no blocks
   - _Answer:_ Transactions become irreversible very quickly · _Why:_ Fast finality means transactions are settled and hard to reverse quickly. · _Level:_ understand

### Phase project — Build: Sonic Ecosystem Onboarding Guide (`son-p6`)

- **Objective:** Produce an accurate, sourced onboarding guide to the Sonic ecosystem.
- **Problem:** The Sonic ecosystem is new and easy to misrepresent from second-hand sources.
- **Audience:** A developer or contributor new to Sonic.
- **Required functionality:**
  - Chain parameters, RPC, explorers, and faucets (verified against official sources)
  - Key tooling and bridges
  - A comparison with one other L1/L2
  - A getting-started checklist
- **Constraints:**
  - Every factual claim must cite an official source
  - Separate verified facts from open questions
- **Acceptance criteria (brief):**
  - All parameters are sourced and current
  - The comparison is fair and evidenced
  - The checklist gets a newcomer to a first testnet transaction
- **Required evidence:**
  - The guide
  - A source list
  - A completed getting-started checklist
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - All parameters are sourced and current (weight 1)
  - The comparison is fair and evidenced (weight 1)
  - The checklist gets a newcomer to a first testnet transaction (weight 1)
- **Acceptance criteria (contract):**
  - All parameters are sourced and current
  - The comparison is fair and evidenced
  - The checklist gets a newcomer to a first testnet transaction

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Solidity Fundamentals (HackQuest Phases 3–4)

**Objective:** Write and deploy basic Solidity contracts to Sonic.

**Success criteria:**
- Write variables, functions and types
- Use inheritance and events
- Deploy to testnet

### Instruction

Sonic is EVM-compatible — Solidity you write for Ethereum works here. Complete both phases on HackQuest for the structured, ecosystem-specific curriculum.

OBJECTIVE
Write and deploy basic Solidity contracts to Sonic.

SUCCESS CRITERIA
• Write variables, functions and types
• Use inheritance and events
• Deploy to testnet

WORKED EXAMPLE
Write a Solidity contract and deploy it. Step 1: implement a simple storage or counter contract. Step 2: add tests. Step 3: deploy to the Sonic testnet. Step 4: verify the source on the explorer and read the value back.

COMMON MISTAKES
• Skipping testnet and deploying straight to mainnet
• Forgetting to emit events for off-chain tracking

### Worked example

Write a Solidity contract and deploy it. Step 1: implement a simple storage or counter contract. Step 2: add tests. Step 3: deploy to the Sonic testnet. Step 4: verify the source on the explorer and read the value back.

### Common mistakes
- Skipping testnet and deploying straight to mainnet
- Forgetting to emit events for off-chain tracking

### Ungraded practice
**Practice: Solidity Fundamentals (HackQuest Phases 3–4)**

DO THIS NOW
Write a small contract with an event and an inherited base, deploy it to Sonic testnet, and read it on the explorer.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is the purpose of a function modifier?
   - To store data
   - **✔ To apply reusable conditions to a function, such as access control**
   - To compile code
   - To pay gas
   - _Answer:_ To apply reusable conditions to a function, such as access control · _Why:_ Modifiers wrap functions to enforce reusable conditions. · _Level:_ understand

2. Why emit an event when state changes?
   - To change state twice
   - **✔ So off-chain applications can observe the change cheaply**
   - To reduce gas always
   - To hide the change
   - _Answer:_ So off-chain applications can observe the change cheaply · _Why:_ Events create logs that off-chain services can index. · _Level:_ apply

3. Why deploy first to a testnet?
   - Testnets are faster
   - **✔ To verify behaviour without risking real funds**
   - It is required by Solidity
   - Mainnet is offline
   - _Answer:_ To verify behaviour without risking real funds · _Why:_ Testnets validate deployment and behaviour safely. · _Level:_ apply

### Phase project — Build: ERC-20 Token on Sonic (`son-p2`)

- **Objective:** Complete "ERC-20 Token on Sonic" to a standard you can show and explain to someone else.
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
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
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
- 3 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Build & Frameworks (HackQuest Phases 5–6)

**Objective:** Use Foundry to build, test and deploy contracts.

**Success criteria:**
- Compile and test with Foundry
- Write fuzz tests
- Use deployment scripts

### Instruction

Phase 5 gets you building real things on Sonic. Phase 6 teaches Foundry — the modern toolkit that serious smart contract developers use.

OBJECTIVE
Use Foundry to build, test and deploy contracts.

SUCCESS CRITERIA
• Compile and test with Foundry
• Write fuzz tests
• Use deployment scripts

WORKED EXAMPLE
Build a framework-based dApp. Step 1: scaffold with a development framework. Step 2: implement a read and a write function. Step 3: connect a frontend. Step 4: run the flow end to end and record the transaction hash as evidence.

COMMON MISTAKES
• Testing only the happy path
• Hard-coding addresses or keys in scripts

### Worked example

Build a framework-based dApp. Step 1: scaffold with a development framework. Step 2: implement a read and a write function. Step 3: connect a frontend. Step 4: run the flow end to end and record the transaction hash as evidence.

### Common mistakes
- Testing only the happy path
- Hard-coding addresses or keys in scripts

### Ungraded practice
**Practice: Build & Frameworks (HackQuest Phases 5–6)**

DO THIS NOW
Write a Foundry test (including one fuzz test) for a contract function, then deploy it with a script.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does Foundry use to write tests?
   - JavaScript
   - **✔ Solidity**
   - Python
   - YAML
   - _Answer:_ Solidity · _Why:_ Foundry tests are written in Solidity, keeping tests close to the contracts. · _Level:_ recall

2. What is a fuzz test?
   - A test with fixed inputs
   - **✔ A test that runs many randomised inputs to find edge cases**
   - A UI test
   - A load test
   - _Answer:_ A test that runs many randomised inputs to find edge cases · _Why:_ Fuzz tests explore many inputs to surface unexpected failures. · _Level:_ understand

3. Where should a private key used for deployment be kept?
   - In the deployment script
   - **✔ In an environment variable or encrypted keystore**
   - In the repo README
   - In comments
   - _Answer:_ In an environment variable or encrypted keystore · _Why:_ Deployment keys must live in environment variables or an encrypted keystore, never in source. · _Level:_ apply

### Phase project — Build: HackQuest Guided Projects Portfolio (`son-p4`)

- **Objective:** Complete "HackQuest Guided Projects Portfolio" to a standard you can show and explain to someone else.
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
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
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
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — Security & Ecosystem (HackQuest Phases 7–8)

**Objective:** Recognise smart contract security risks and the Sonic ecosystem.

**Success criteria:**
- Explain common vulnerabilities
- Describe mitigation patterns
- Understand ecosystem DeFi

### Instruction

Complete the HackQuest path and earn your Sonic certification. Phase 7 ensures your contracts are safe before touching mainnet.

OBJECTIVE
Recognise smart contract security risks and the Sonic ecosystem.

SUCCESS CRITERIA
• Explain common vulnerabilities
• Describe mitigation patterns
• Understand ecosystem DeFi

WORKED EXAMPLE
Review a contract for security. Step 1: define the scope and confirm authorisation. Step 2: look for the common classes — reentrancy, access control, unchecked calls. Step 3: validate each suspicion with a test. Step 4: report findings with severity and remediation, and list what you did not check.

COMMON MISTAKES
• Making external calls before updating state
• Leaving privileged functions unprotected

### Worked example

Review a contract for security. Step 1: define the scope and confirm authorisation. Step 2: look for the common classes — reentrancy, access control, unchecked calls. Step 3: validate each suspicion with a test. Step 4: report findings with severity and remediation, and list what you did not check.

### Common mistakes
- Making external calls before updating state
- Leaving privileged functions unprotected

### Ungraded practice
**Practice: Security & Ecosystem (HackQuest Phases 7–8)**

DO THIS NOW
For a sample contract, identify one reentrancy risk and one access-control gap, and describe the fix.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which pattern prevents reentrancy?
   - External calls first
   - **✔ Checks-effects-interactions**
   - More events
   - Higher gas
   - _Answer:_ Checks-effects-interactions · _Why:_ Updating state before external calls prevents reentrant re-entry. · _Level:_ apply

2. A contract function should be callable only by the owner. What must you add?
   - A comment
   - **✔ An access-control modifier that checks the caller**
   - An event
   - More gas
   - _Answer:_ An access-control modifier that checks the caller · _Why:_ Sensitive functions need explicit access control on the caller. · _Level:_ apply

3. Why is an untrusted price oracle dangerous?
   - It is slow
   - **✔ An attacker can manipulate the price and exploit contracts that trust it**
   - It costs gas
   - It is deprecated
   - _Answer:_ An attacker can manipulate the price and exploit contracts that trust it · _Why:_ Manipulable oracles let attackers feed false prices to protocols. · _Level:_ evaluate

### Phase project — Build: Sonic dApp Security Review (`son-p7`)

- **Objective:** Review an authorized contract and report real, reproducible findings.
- **Problem:** A deployed contract may contain vulnerabilities that a reader cannot see.
- **Audience:** The team that owns the contract (authorized review only).
- **Required functionality:**
  - A scope statement and authorized environment
  - Static/manual review for common vulnerability classes
  - Findings with severity, reasoning, and remediation
  - An honest list of what was not checked
- **Constraints:**
  - Only review contracts you are authorized to test
  - No testing against production/mainnet funds
  - Do not fabricate findings
- **Acceptance criteria (brief):**
  - Each finding is reproducible or clearly reasoned
  - Severity is justified
  - Limitations are stated
- **Required evidence:**
  - The review report
  - Reproduction steps or reasoning
  - A scope and authorization note
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Each finding is reproducible or clearly reasoned (weight 1)
  - Severity is justified (weight 1)
  - Limitations are stated (weight 1)
- **Acceptance criteria (contract):**
  - Each finding is reproducible or clearly reasoned
  - Severity is justified
  - Limitations are stated

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 6 — FeeM Strategy & Mainnet

**Objective:** Design contracts for FeeM and deploy to mainnet safely.

**Success criteria:**
- Explain FeeM revenue
- Register contracts
- Follow a mainnet checklist

### Instruction

FeeM is what makes Sonic uniquely attractive for builders. Learn to design products that generate sustainable on-chain revenue from day one.

OBJECTIVE
Design contracts for FeeM and deploy to mainnet safely.

SUCCESS CRITERIA
• Explain FeeM revenue
• Register contracts
• Follow a mainnet checklist

WORKED EXAMPLE
Plan a FeeM strategy. Step 1: read how FeeM rewards work from the official docs. Step 2: model the gas usage of your dApp's main action. Step 3: estimate the fee impact. Step 4: write a mainnet readiness checklist, including a testnet run and a security review.

COMMON MISTAKES
• Deploying to mainnet without a checklist
• Assuming FeeM earnings without activity

### Worked example

Plan a FeeM strategy. Step 1: read how FeeM rewards work from the official docs. Step 2: model the gas usage of your dApp's main action. Step 3: estimate the fee impact. Step 4: write a mainnet readiness checklist, including a testnet run and a security review.

### Common mistakes
- Deploying to mainnet without a checklist
- Assuming FeeM earnings without activity

### Ungraded practice
**Practice: FeeM Strategy & Mainnet**

DO THIS NOW
Draft a mainnet deployment checklist covering tests, audit, key management and a FeeM registration step.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. FeeM developer revenue comes from…
   - A fixed salary
   - **✔ A share of the fees generated by the developer's contracts**
   - Token inflation only
   - Advertisements
   - _Answer:_ A share of the fees generated by the developer's contracts · _Why:_ FeeM returns a portion of contract-generated fees to developers. · _Level:_ understand

2. What is required for a contract to earn through FeeM?
   - Nothing
   - **✔ Registering the contract in the FeeM programme**
   - A governance vote
   - A paid subscription
   - _Answer:_ Registering the contract in the FeeM programme · _Why:_ Contracts must be registered to participate in FeeM. · _Level:_ recall

3. What belongs on a mainnet deployment checklist?
   - Only the contract name
   - **✔ Tests, audit/review, key management, verification and a rollback plan**
   - A logo
   - A marketing slogan
   - _Answer:_ Tests, audit/review, key management, verification and a rollback plan · _Why:_ A mainnet checklist covers testing, review, keys, verification and recovery. · _Level:_ apply

### Phase project — Portfolio project: DeFi Protocol on Sonic Mainnet (`son-p5`)

- **Objective:** Complete "DeFi Protocol on Sonic Mainnet" to a standard you can show and explain to someone else.
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
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
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
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
