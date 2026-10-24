# Reviewer packet — Sonic Blockchain Development

- **Track id:** `sonic`  ·  **Slug:** `sonic-blockchain`  ·  **Category:** build  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.4/100 · worthiness 98.8/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Web3 Basics (HackQuest Phase 1) | Understand the Web3 fundamentals Sonic builds on. | 1–2 weeks | 4 |
| 2 | Sonic Ecosystem (HackQuest Phase 2) | Explain what makes Sonic distinct in the ecosystem. | 1 week | 5 |
| 3 | Solidity Fundamentals (HackQuest Phases 3–4) | Write and deploy basic Solidity contracts to Sonic. | 4–6 weeks | 4 |
| 4 | Build & Frameworks (HackQuest Phases 5–6) | Use Foundry to build, test and deploy contracts. | 3–4 weeks | 4 |
| 5 | Security & Ecosystem (HackQuest Phases 7–8) | Recognise smart contract security risks and the Sonic ecosystem. | 2–3 weeks | 4 |
| 6 | FeeM Strategy & Mainnet | Design contracts for FeeM and deploy to mainnet safely. | 2–3 weeks | 5 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 4, 6.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 3 — Solidity Fundamentals (HackQuest Phases 3–4)**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 4 — Build & Frameworks (HackQuest Phases 5–6)**: content-inspected required resources 1, objective-matching resources 2, playback-verified resources 0.
- **Stage 5 — Security & Ecosystem (HackQuest Phases 7–8)**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Web3 Basics (HackQuest Phase 1)

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| ethereum.org — What is Web3 and why is it important? | required | L3 | content-inspection | — | 1 | https://ethereum.org/en/web3/ |
| ethereum.org — Technical intro to Ethereum | required | L3 | content-inspection | — | 0 | https://ethereum.org/en/developers/docs/intro-to-ethereum/ |
| HackQuest Sonic Learning Track | required | L3 | content-inspection | — | 1 | https://www.hackquest.io/learning-track/Sonic |
- _L3 required evidence — Ethereum Foundation: “Edit page (opens in a new tab) Centralization has helped onboard billions of people to the World Wide Web and created the stable, robust infrastructure on which it lives. At the same time, a handful of centralized entit…”_
- _L3 required evidence — Ethereum Foundation: “Technical intro to Ethereum Edit page (opens in a new tab) What is a blockchain? A blockchain is a public database that is updated and shared across many computers in a network. "Block" refers to data and state being st…”_
- _L3 required evidence — HackQuest / Sonic: “Sonic Ecosystem Certified by Sonic is a high-performance network evolved from Fantom, aiming to address the blockchain “trilemma” of decentralization, security, and scalability. It achieves impressive performance with 1…”_

### Stage 2 — Sonic Ecosystem (HackQuest Phase 2)

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Sonic Official Documentation | required | L3 | content-inspection | — | 1 | https://docs.soniclabs.com |
| Sonic on DefiLlama | required | L3 | content-inspection | — | 1 | https://defillama.com/chain/Sonic |
- _L3 required evidence — Sonic Labs: “For the complete documentation index, see llms.txt . This page is also available as Markdown . Sonic is the highest-performing EVM layer-1 blockchain, combining speed, incentives, and world-class infrastructure, powerin…”_
- _L3 required evidence — DefiLlama: “⌘K Try LlamaAI Ask LlamaAI for free All Ethereum Base Solana Tron BSC Bitcoin Arbitrum Robinhood Chain Hyperliquid L1 Monad Polygon Avalanche Plasma Arc Sui OP Mainnet Anubis Near Stellar Ask about Sonic · free Sonic To…”_

### Stage 3 — Solidity Fundamentals (HackQuest Phases 3–4)

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Sonic Testnet Faucet | required | L2 | http-probe | — | 0 | https://testnet.soniclabs.com/account |
| Sonic Block Explorer | required | L2 | http-probe | — | 0 | https://explorer.soniclabs.com |
| Patrick Collins Solidity Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=umepbfKp5rI |
| OpenZeppelin Contracts | required | L3 | content-inspection | — | 1 | https://docs.openzeppelin.com/contracts |
- _L3 required evidence — OpenZeppelin: “OpenZeppelin Contracts Open in Claude OpenZeppelin Contracts is a library of modular, reusable, secure smart contracts for the Ethereum network, written in Solidity. Getting Started Contracts Overview Start working with…”_

### Stage 4 — Build & Frameworks (HackQuest Phases 5–6)

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Foundry Book — Getting Started (Installation) | required | L3 | content-inspection | — | 2 | https://book.getfoundry.sh/getting-started/installation |
| Foundry Book | required | L2 | http-probe | — | 5 | https://book.getfoundry.sh |
- _L3 required evidence — Foundry Book: “Installation Foundry is installed using foundryup , the official installer and version manager. Install foundryup $ curl -L https://getfoundry.sh/install \| bash Restart your terminal Or run source ~/.bashrc / source ~/.…”_

### Stage 5 — Security & Ecosystem (HackQuest Phases 7–8)

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenZeppelin Contracts — Documentation | required | L3 | content-inspection | — | 3 | https://docs.openzeppelin.com/contracts/5.x/ |
| Sonic Discord | required | L2 | http-probe | — | 0 | https://discord.gg/soniclabs |
- _L3 required evidence — OpenZeppelin: “OpenZeppelin Contracts Contracts Open in Claude A library for secure smart contract development. Build on a solid foundation of community-vetted code. Implementations of standards like ERC20 and ERC721 . Flexible role-b…”_

### Stage 6 — FeeM Strategy & Mainnet

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Sonic FeeM Strategy Guide | required | L3 | content-inspection | — | 1 | https://docs.sonicsvm.org/ |
| Deploying to Sonic Mainnet | required | L2 | http-probe | — | 0 | https://www.sonicsvm.org/ |
- _L3 required evidence — Sonic Labs: “For the complete documentation index, see llms.txt . This page is also available as Markdown . Sonic is the first atomic SVM (Solana Virtual Machine) chain engineered to enable sovereign game economies on Solana. It add…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 3 | Patrick Collins Solidity Course | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Web3 Basics (HackQuest Phase 1) (3 questions)

1. What does a wallet actually store?
   - · Coins
   - **✔ The keys that control your on-chain accounts**
   - · A copy of the blockchain
   - · Your password
   - _Why:_ A wallet holds keys; assets live on-chain, controlled by those keys. · _level: understand_
2. What is gas?
   - · A reward for holding tokens
   - **✔ A fee paid to compensate for computation and storage on-chain**
   - · A type of token standard
   - · A wallet feature
   - _Why:_ Gas pays for the computation and storage a transaction consumes. · _level: understand_
3. What does a consensus mechanism achieve?
   - · Faster wallets
   - **✔ Agreement among nodes on the canonical chain state**
   - · Lower fees always
   - · Private transactions
   - _Why:_ Consensus lets distributed nodes agree on a single valid chain state. · _level: understand_

### Stage 2 — Sonic Ecosystem (HackQuest Phase 2) (3 questions)

1. What does Fee Monetisation (FeeM) do for developers?
   - · Charges developers rent
   - **✔ Returns a share of the fees their contracts generate**
   - · Removes gas entirely
   - · Mints a governance token
   - _Why:_ FeeM shares generated fees with the developers whose contracts produce them. · _level: understand_
2. Why do fast finality and high throughput matter?
   - · They look impressive
   - **✔ They make interactive apps and cheap transactions practical**
   - · They reduce security
   - · They remove the need for validators
   - _Why:_ High throughput and fast finality enable responsive, low-cost applications. · _level: evaluate_
3. Sub-second finality means…
   - · Transactions are free
   - **✔ Transactions become irreversible very quickly**
   - · No signatures are needed
   - · The chain has no blocks
   - _Why:_ Fast finality means transactions are settled and hard to reverse quickly. · _level: understand_

### Stage 3 — Solidity Fundamentals (HackQuest Phases 3–4) (3 questions)

1. What is the purpose of a function modifier?
   - · To store data
   - **✔ To apply reusable conditions to a function, such as access control**
   - · To compile code
   - · To pay gas
   - _Why:_ Modifiers wrap functions to enforce reusable conditions. · _level: understand_
2. Why emit an event when state changes?
   - · To change state twice
   - **✔ So off-chain applications can observe the change cheaply**
   - · To reduce gas always
   - · To hide the change
   - _Why:_ Events create logs that off-chain services can index. · _level: apply_
3. Why deploy first to a testnet?
   - · Testnets are faster
   - **✔ To verify behaviour without risking real funds**
   - · It is required by Solidity
   - · Mainnet is offline
   - _Why:_ Testnets validate deployment and behaviour safely. · _level: apply_

### Stage 4 — Build & Frameworks (HackQuest Phases 5–6) (3 questions)

1. What does Foundry use to write tests?
   - · JavaScript
   - **✔ Solidity**
   - · Python
   - · YAML
   - _Why:_ Foundry tests are written in Solidity, keeping tests close to the contracts. · _level: recall_
2. What is a fuzz test?
   - · A test with fixed inputs
   - **✔ A test that runs many randomised inputs to find edge cases**
   - · A UI test
   - · A load test
   - _Why:_ Fuzz tests explore many inputs to surface unexpected failures. · _level: understand_
3. Where should a private key used for deployment be kept?
   - · In the deployment script
   - **✔ In an environment variable or encrypted keystore**
   - · In the repo README
   - · In comments
   - _Why:_ Deployment keys must live in environment variables or an encrypted keystore, never in source. · _level: apply_

### Stage 5 — Security & Ecosystem (HackQuest Phases 7–8) (3 questions)

1. Which pattern prevents reentrancy?
   - · External calls first
   - **✔ Checks-effects-interactions**
   - · More events
   - · Higher gas
   - _Why:_ Updating state before external calls prevents reentrant re-entry. · _level: apply_
2. A contract function should be callable only by the owner. What must you add?
   - · A comment
   - **✔ An access-control modifier that checks the caller**
   - · An event
   - · More gas
   - _Why:_ Sensitive functions need explicit access control on the caller. · _level: apply_
3. Why is an untrusted price oracle dangerous?
   - · It is slow
   - **✔ An attacker can manipulate the price and exploit contracts that trust it**
   - · It costs gas
   - · It is deprecated
   - _Why:_ Manipulable oracles let attackers feed false prices to protocols. · _level: evaluate_

### Stage 6 — FeeM Strategy & Mainnet (3 questions)

1. FeeM developer revenue comes from…
   - · A fixed salary
   - **✔ A share of the fees generated by the developer's contracts**
   - · Token inflation only
   - · Advertisements
   - _Why:_ FeeM returns a portion of contract-generated fees to developers. · _level: understand_
2. What is required for a contract to earn through FeeM?
   - · Nothing
   - **✔ Registering the contract in the FeeM programme**
   - · A governance vote
   - · A paid subscription
   - _Why:_ Contracts must be registered to participate in FeeM. · _level: recall_
3. What belongs on a mainnet deployment checklist?
   - · Only the contract name
   - **✔ Tests, audit/review, key management, verification and a rollback plan**
   - · A logo
   - · A marketing slogan
   - _Why:_ A mainnet checklist covers testing, review, keys, verification and recovery. · _level: apply_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `son-p1` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 2 — project `son-p6` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| All parameters are sourced and current | 1 | no |
| The comparison is fair and evidenced | 1 | no |
| The checklist gets a newcomer to a first testnet transaction | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 3 — project `son-p2` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 4 — project `son-p4` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 5 — project `son-p7` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Each finding is reproducible or clearly reasoned | 1 | no |
| Severity is justified | 1 | no |
| Limitations are stated | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 6 — project `son-p5` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: First Contract on Sonic Testnet

- **Objective:** Complete "First Contract on Sonic Testnet" to a standard you can show and explain to someone else.
- **Problem:** A real foundation problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 2 — Build: Sonic Ecosystem Onboarding Guide

- **Objective:** Produce an accurate, sourced onboarding guide to the Sonic ecosystem.
- **Problem:** The Sonic ecosystem is new and easy to misrepresent from second-hand sources.
- **Audience:** A developer or contributor new to Sonic.
- **Required functionality:**
  - Chain parameters, RPC, explorers, and faucets (verified against official sources)
  - Key tooling and bridges
  - A comparison with one other L1/L2
  - A getting-started checklist
- **Acceptance criteria:**
  - All parameters are sourced and current
  - The comparison is fair and evidenced
  - The checklist gets a newcomer to a first testnet transaction
- **Required evidence:**
  - The guide
  - A source list
  - A completed getting-started checklist
- **Constraints:**
  - Every factual claim must cite an official source
  - Separate verified facts from open questions

### Stage 3 — Build: ERC-20 Token on Sonic

- **Objective:** Complete "ERC-20 Token on Sonic" to a standard you can show and explain to someone else.
- **Problem:** A real foundation problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 4 — Build: HackQuest Guided Projects Portfolio

- **Objective:** Complete "HackQuest Guided Projects Portfolio" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 5 — Build: Sonic dApp Security Review

- **Objective:** Review an authorized contract and report real, reproducible findings.
- **Problem:** A deployed contract may contain vulnerabilities that a reader cannot see.
- **Audience:** The team that owns the contract (authorized review only).
- **Required functionality:**
  - A scope statement and authorized environment
  - Static/manual review for common vulnerability classes
  - Findings with severity, reasoning, and remediation
  - An honest list of what was not checked
- **Acceptance criteria:**
  - Each finding is reproducible or clearly reasoned
  - Severity is justified
  - Limitations are stated
- **Required evidence:**
  - The review report
  - Reproduction steps or reasoning
  - A scope and authorization note
- **Constraints:**
  - Only review contracts you are authorized to test
  - No testing against production/mainnet funds
  - Do not fabricate findings

### Stage 6 — Portfolio project: DeFi Protocol on Sonic Mainnet

- **Objective:** Complete "DeFi Protocol on Sonic Mainnet" to a standard you can show and explain to someone else.
- **Problem:** A real portfolio problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

## 8. Worked examples

- **Stage 1:** Make your first on-chain action. Step 1: create a wallet and fund it from a testnet faucet. Step 2: send a transaction. Step 3: read the receipt on the explorer. Step 4: explain each field so a non-technical friend coul…
- **Stage 2:** Map the Sonic ecosystem. Step 1: gather the chain parameters from official sources only. Step 2: note the tooling, RPC and bridges. Step 3: compare two dApps. Step 4: write a getting-started checklist and mark any fact …
- **Stage 3:** Write a Solidity contract and deploy it. Step 1: implement a simple storage or counter contract. Step 2: add tests. Step 3: deploy to the Sonic testnet. Step 4: verify the source on the explorer and read the value back.
- **Stage 4:** Build a framework-based dApp. Step 1: scaffold with a development framework. Step 2: implement a read and a write function. Step 3: connect a frontend. Step 4: run the flow end to end and record the transaction hash as …
- **Stage 5:** Review a contract for security. Step 1: define the scope and confirm authorisation. Step 2: look for the common classes — reentrancy, access control, unchecked calls. Step 3: validate each suspicion with a test. Step 4:…
- **Stage 6:** Plan a FeeM strategy. Step 1: read how FeeM rewards work from the official docs. Step 2: model the gas usage of your dApp's main action. Step 3: estimate the fee impact. Step 4: write a mainnet readiness checklist, incl…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 3 — required (L2): https://testnet.soniclabs.com/account
- Stage 3 — required (L2): https://explorer.soniclabs.com
- Stage 3 — required (L2): https://www.youtube.com/watch?v=umepbfKp5rI
- Stage 4 — required (L2): https://book.getfoundry.sh
- Stage 5 — required (L2): https://discord.gg/soniclabs
- Stage 6 — required (L2): https://www.sonicsvm.org/

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.4) **and** worthiness ≥ 90 (this track: 98.8).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

