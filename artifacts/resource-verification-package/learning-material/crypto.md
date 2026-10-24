# Crypto & Web3 (`crypto`)

Slug: `crypto-web3` · Category: build · Stages: 11

## Stage 1 — How Blockchain Actually Works

**Objective:** Explain how a blockchain actually works at the cryptographic and consensus level.

**Success criteria:**
- Describe what a hash guarantees
- Compare PoW and PoS
- Explain block structure and gas

### Instruction

Most people who say they know crypto skip this. Understanding the cryptographic foundations changes how you use, build, and protect everything in this space.

OBJECTIVE
Explain how a blockchain actually works at the cryptographic and consensus level.

SUCCESS CRITERIA
• Describe what a hash guarantees
• Compare PoW and PoS
• Explain block structure and gas

WORKED EXAMPLE
Investigate a transaction. Step 1: pick a transaction on a testnet explorer. Step 2: read the from, to, value and gas fields. Step 3: open the logs and decode one event. Step 4: explain what the receipt proves and what it does not.

COMMON MISTAKES
• Thinking a hash can be reversed to the input
• Confusing a wallet address with a private key

### Worked example

Investigate a transaction. Step 1: pick a transaction on a testnet explorer. Step 2: read the from, to, value and gas fields. Step 3: open the logs and decode one event. Step 4: explain what the receipt proves and what it does not.

### Common mistakes
- Thinking a hash can be reversed to the input
- Confusing a wallet address with a private key

### Ungraded practice
**Practice: How Blockchain Actually Works**

DO THIS NOW
Use an interactive blockchain demo to hash a block, change one field, and observe how the hash and subsequent blocks change.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which property must a cryptographic hash function have?
   - It is reversible
   - **✔ A tiny input change produces a completely different output**
   - It always outputs text
   - It needs a password
   - _Answer:_ A tiny input change produces a completely different output · _Why:_ Hashing is one-way and exhibits the avalanche effect: small changes produce very different hashes. · _Level:_ understand

2. What does a block header commit to through its merkle root?
   - The miner's identity
   - **✔ All transactions in the block**
   - The next block only
   - Gas prices only
   - _Answer:_ All transactions in the block · _Why:_ The merkle root is a hash committing to the set of transactions in the block. · _Level:_ understand

3. What is the core difference between Proof of Work and Proof of Stake?
   - Both are identical
   - **✔ PoW secures the chain with computational work; PoS secures it with economic stake**
   - PoS needs no validators
   - PoW has no rewards
   - _Answer:_ PoW secures the chain with computational work; PoS secures it with economic stake · _Why:_ PoW spends computation to propose blocks; PoS selects validators weighted by stake. · _Level:_ analyze

### Phase project — Build: Block Explorer Investigation (`cr-p9`)

- **Objective:** Trace and explain a real transaction on a testnet explorer.
- **Problem:** Beginners trust a transaction hash without understanding what it proves.
- **Audience:** The learner building on-chain literacy.
- **Required functionality:**
  - A real transaction hash and its receipt
  - An explanation of from/to/value/gas/status/logs
  - At least one contract interaction with an event log
- **Constraints:**
  - Use a testnet
  - Do not expose private keys
- **Acceptance criteria (brief):**
  - Every field is explained correctly
  - The log is decoded and interpreted
  - The write-up would let a newcomer repeat it
- **Required evidence:**
  - A written investigation
  - Explorer screenshots or links
  - The decoded event log
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Every field is explained correctly (weight 1)
  - The log is decoded and interpreted (weight 1)
  - The write-up would let a newcomer repeat it (weight 1)
- **Acceptance criteria (contract):**
  - Every field is explained correctly
  - The log is decoded and interpreted
  - The write-up would let a newcomer repeat it

### Recorded uncertainties
- 2 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Wallets, Keys & On-Chain Security

**Objective:** Protect keys and sign transactions safely.

**Success criteria:**
- Distinguish keys, seed phrases and addresses
- Compare wallet types
- Read a transaction before signing

### Instruction

This stage will save you money. Understanding how wallet signatures and token approvals work at a contract level prevents the most common ways people lose funds.

OBJECTIVE
Protect keys and sign transactions safely.

SUCCESS CRITERIA
• Distinguish keys, seed phrases and addresses
• Compare wallet types
• Read a transaction before signing

WORKED EXAMPLE
Set up self-custody safely. Step 1: create a wallet and record the seed phrase offline. Step 2: store it somewhere that survives device loss but is not on a networked device. Step 3: restore the wallet on a second device to test recovery. Step 4: review token approvals and revoke one you no longer need.

COMMON MISTAKES
• Signing an approval without reading it
• Storing a seed phrase digitally

### Worked example

Set up self-custody safely. Step 1: create a wallet and record the seed phrase offline. Step 2: store it somewhere that survives device loss but is not on a networked device. Step 3: restore the wallet on a second device to test recovery. Step 4: review token approvals and revoke one you no longer need.

### Common mistakes
- Signing an approval without reading it
- Storing a seed phrase digitally

### Ungraded practice
**Practice: Wallets, Keys & On-Chain Security**

DO THIS NOW
In a burner wallet, inspect a token approval, revoke it, and explain what signing it originally granted.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is a seed phrase?
   - A public address
   - **✔ A human-readable encoding of the master secret from which keys are derived**
   - A transaction hash
   - A wallet password
   - _Answer:_ A human-readable encoding of the master secret from which keys are derived · _Why:_ A seed phrase encodes the master secret used to derive all keys in an HD wallet. · _Level:_ understand

2. Why is a hardware wallet safer than a hot wallet?
   - It is faster
   - **✔ The private key never leaves the device, so malware on your computer cannot steal it**
   - It has no fees
   - It stores more tokens
   - _Answer:_ The private key never leaves the device, so malware on your computer cannot steal it · _Why:_ Hardware wallets keep keys offline; the host cannot exfiltrate them. · _Level:_ evaluate

3. A site asks you to approve an unlimited token spend. What is the risk?
   - None
   - **✔ A malicious or buggy contract could later drain that token at any time**
   - It doubles your balance
   - It is required for all tokens
   - _Answer:_ A malicious or buggy contract could later drain that token at any time · _Why:_ Unlimited approvals let a contract transfer that token without further consent. · _Level:_ evaluate

### Phase project — Build: Self-Custody Wallet Security Setup (`cr-p10`)

- **Objective:** Set up self-custody with a tested recovery procedure and a risk checklist.
- **Problem:** Poor key handling is the most common way people lose funds.
- **Audience:** The learner securing their own assets.
- **Required functionality:**
  - A self-custody wallet set up on a testnet or with a hardware wallet
  - A documented, offline seed backup plan
  - A tested recovery procedure
  - A phishing/token-approval risk checklist
- **Constraints:**
  - Never store a real seed phrase digitally in the submission
  - Use placeholders in any shared evidence
- **Acceptance criteria (brief):**
  - Recovery was actually tested
  - No real seed is exposed in the submitted evidence
  - Checklist covers approvals and phishing
- **Required evidence:**
  - A procedure document (with redacted/placeholder secrets)
  - A recovery test log
  - The risk checklist
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Recovery was actually tested (weight 1)
  - No real seed is exposed in the submitted evidence (weight 1)
  - Checklist covers approvals and phishing (weight 1)
- **Acceptance criteria (contract):**
  - Recovery was actually tested
  - No real seed is exposed in the submitted evidence
  - Checklist covers approvals and phishing

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Solidity Fundamentals

**Objective:** Read and write the core of the Solidity language.

**Success criteria:**
- Write functions, modifiers and events
- Choose the right data location
- Understand state vs local data

### Instruction

Learn the language itself: how to declare state, write functions, use modifiers and events, and understand where data lives in the EVM.

OBJECTIVE
Read and write the core of the Solidity language.

SUCCESS CRITERIA
• Write functions, modifiers and events
• Choose the right data location
• Understand state vs local data

WORKED EXAMPLE
Write and test a Solidity contract. Step 1: store and retrieve a value with a public function. Step 2: add a test in a local framework. Step 3: deploy to a testnet. Step 4: read the value back from the explorer to confirm the deployment matches your source.

COMMON MISTAKES
• Writing to storage when memory is intended
• Forgetting access control on state-changing functions

### Worked example

Write and test a Solidity contract. Step 1: store and retrieve a value with a public function. Step 2: add a test in a local framework. Step 3: deploy to a testnet. Step 4: read the value back from the explorer to confirm the deployment matches your source.

### Common mistakes
- Writing to storage when memory is intended
- Forgetting access control on state-changing functions

### Ungraded practice
**Practice: Solidity Fundamentals**

DO THIS NOW
Write a contract with a modifier guarding an admin function, an event emitted on a state change, and a function using calldata and memory appropriately.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which data location is a temporary, mutable copy that is not persisted?
   - storage
   - **✔ memory**
   - calldata
   - immutable
   - _Answer:_ memory · _Why:_ memory is temporary and mutable for the duration of a call. · _Level:_ understand

2. What is a modifier used for in Solidity?
   - Storing data permanently
   - **✔ Reusable pre/post conditions wrapped around a function, such as access control**
   - Compiling code
   - Paying gas
   - _Answer:_ Reusable pre/post conditions wrapped around a function, such as access control · _Why:_ Modifiers wrap functions to enforce conditions such as onlyOwner. · _Level:_ understand

3. What is the purpose of an event?
   - To store state permanently
   - **✔ To emit a log that off-chain apps can observe cheaply**
   - To change gas price
   - To upgrade a contract
   - _Answer:_ To emit a log that off-chain apps can observe cheaply · _Why:_ Events emit logs for off-chain indexing and monitoring. · _Level:_ apply

### Phase project — Build: On-Chain Guestbook (`cr-p2`)

- **Objective:** Complete "On-Chain Guestbook" to a standard you can show and explain to someone else.
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
- 2 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Token Standards & Development Tooling

**Objective:** Implement token standards and use professional tooling.

**Success criteria:**
- Distinguish ERC-20 and ERC-721
- Use OpenZeppelin
- Test and deploy a contract

### Instruction

Standards are why the ecosystem interoperates. Implement ERC-20 and ERC-721 with battle-tested libraries and a professional test-and-deploy workflow.

OBJECTIVE
Implement token standards and use professional tooling.

SUCCESS CRITERIA
• Distinguish ERC-20 and ERC-721
• Use OpenZeppelin
• Test and deploy a contract

WORKED EXAMPLE
Create an ERC-20 token. Step 1: define name, symbol, decimals and total supply. Step 2: add access-controlled minting. Step 3: write tests for transfer, approve and mint authorisation. Step 4: deploy to a testnet and verify the source on the explorer.

COMMON MISTAKES
• Rolling your own token logic instead of audited libraries
• Deploying to mainnet without tests

### Worked example

Create an ERC-20 token. Step 1: define name, symbol, decimals and total supply. Step 2: add access-controlled minting. Step 3: write tests for transfer, approve and mint authorisation. Step 4: deploy to a testnet and verify the source on the explorer.

### Common mistakes
- Rolling your own token logic instead of audited libraries
- Deploying to mainnet without tests

### Ungraded practice
**Practice: Token Standards & Development Tooling**

DO THIS NOW
Implement and test a capped ERC-20 using OpenZeppelin, then deploy it to a testnet and read it on a block explorer.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. How does ERC-721 differ from ERC-20?
   - They are identical
   - **✔ ERC-20 tokens are fungible; ERC-721 tokens are unique (non-fungible)**
   - ERC-721 is for stablecoins
   - ERC-20 is for NFTs
   - _Answer:_ ERC-20 tokens are fungible; ERC-721 tokens are unique (non-fungible) · _Why:_ ERC-20 is fungible; ERC-721 represents unique, non-fungible tokens. · _Level:_ understand

2. Why use OpenZeppelin implementations?
   - They are required
   - **✔ They are audited, battle-tested and standard-compliant**
   - They are the only library
   - They avoid gas
   - _Answer:_ They are audited, battle-tested and standard-compliant · _Why:_ OpenZeppelin provides audited, widely used implementations that reduce risk. · _Level:_ evaluate

3. Why deploy and test on a testnet before mainnet?
   - Mainnet is slower
   - **✔ To validate behaviour and tooling without risking real funds**
   - Testnets have more users
   - It is required by Solidity
   - _Answer:_ To validate behaviour and tooling without risking real funds · _Why:_ Testnets let you verify deployment and behaviour with no real funds at stake. · _Level:_ apply

### Phase project — Build: Deploy Your Own ERC-20 Token (`cr-p1`)

- **Objective:** Complete "Deploy Your Own ERC-20 Token" to a standard you can show and explain to someone else.
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

## Stage 5 — DeFi Core Mechanics

**Objective:** Explain the core mechanics of decentralised finance.

**Success criteria:**
- Explain AMM pricing
- Describe liquidity and impermanent loss
- Compare stablecoin types

### Instruction

The core primitives of decentralised finance: how automated market makers price assets, how lending markets set rates, and what makes a stablecoin stable.

OBJECTIVE
Explain the core mechanics of decentralised finance.

SUCCESS CRITERIA
• Explain AMM pricing
• Describe liquidity and impermanent loss
• Compare stablecoin types

WORKED EXAMPLE
Build a minimal AMM. Step 1: implement the constant-product reserve formula. Step 2: add add-liquidity and swap functions. Step 3: test a swap and compute the price impact. Step 4: write down what a large trade does to the price and why.

COMMON MISTAKES
• Assuming LP fees always outweigh impermanent loss
• Treating all stablecoins as equally safe

### Worked example

Build a minimal AMM. Step 1: implement the constant-product reserve formula. Step 2: add add-liquidity and swap functions. Step 3: test a swap and compute the price impact. Step 4: write down what a large trade does to the price and why.

### Common mistakes
- Assuming LP fees always outweigh impermanent loss
- Treating all stablecoins as equally safe

### Ungraded practice
**Practice: DeFi Core Mechanics**

DO THIS NOW
For a constant-product pool, calculate the price impact of a large trade and explain why it is larger than a small trade.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. In a constant-product AMM (x × y = k), what happens as a trade grows large?
   - Price stays constant
   - **✔ The average execution price slips further from the starting price**
   - The pool gains liquidity
   - Fees fall to zero
   - _Answer:_ The average execution price slips further from the starting price · _Why:_ Large trades move the pool balances more, causing greater slippage. · _Level:_ analyze

2. What is impermanent loss?
   - A permanent fee
   - **✔ The loss an LP suffers versus simply holding the tokens when the pool price diverges**
   - A hacking loss
   - A tax
   - _Answer:_ The loss an LP suffers versus simply holding the tokens when the pool price diverges · _Why:_ Impermanent loss is the divergence cost LPs face relative to holding. · _Level:_ understand

3. Which stablecoin design depends hardest on external collateral staying solvent?
   - **✔ Algorithmic, undercollateralised designs**
   - Fully fiat-backed
   - Overcollateralised crypto-backed
   - Tokenised deposits
   - _Answer:_ Algorithmic, undercollateralised designs · _Why:_ Undercollateralised algorithmic designs are the most fragile when confidence breaks. · _Level:_ evaluate

### Phase project — Build: Simplified AMM from Scratch (`cr-p7`)

- **Objective:** Complete "Simplified AMM from Scratch" to a standard you can show and explain to someone else.
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
- 2 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 6 — DeFi Risks & Advanced Concepts

**Objective:** Understand where DeFi breaks and why.

**Success criteria:**
- Explain oracle and flash-loan attacks
- Describe MEV and bridge risk
- Explain on-chain governance

### Instruction

Where DeFi breaks. Oracle manipulation, flash-loan exploits, MEV, and bridges cause most major losses. Understand the mechanisms before you build on them.

OBJECTIVE
Understand where DeFi breaks and why.

SUCCESS CRITERIA
• Explain oracle and flash-loan attacks
• Describe MEV and bridge risk
• Explain on-chain governance

WORKED EXAMPLE
Assess DeFi risk. Step 1: pick a protocol and list its dependencies. Step 2: identify the liquidation and impermanent-loss exposure. Step 3: note the admin keys and upgradeability. Step 4: write a short risk assessment separating protocol risk from user error.

COMMON MISTAKES
• Trusting a single price oracle
• Assuming bridges are as safe as the chains they connect

### Worked example

Assess DeFi risk. Step 1: pick a protocol and list its dependencies. Step 2: identify the liquidation and impermanent-loss exposure. Step 3: note the admin keys and upgradeability. Step 4: write a short risk assessment separating protocol risk from user error.

### Common mistakes
- Trusting a single price oracle
- Assuming bridges are as safe as the chains they connect

### Ungraded practice
**Practice: DeFi Risks & Advanced Concepts**

DO THIS NOW
Pick one historical exploit, identify the mechanism, and describe the missing control that would have prevented it.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is a flash-loan attack?
   - A slow loan repaid over years
   - **✔ A loan taken and repaid within one transaction, used to manipulate prices or bypass checks**
   - A hack of the wallet
   - A governance vote
   - _Answer:_ A loan taken and repaid within one transaction, used to manipulate prices or bypass checks · _Why:_ Flash loans require no collateral because they are borrowed and repaid in one atomic transaction. · _Level:_ understand

2. Why are cross-chain bridges frequent targets?
   - They are cheap to run
   - **✔ They concentrate large value and often rely on complex, permissioned validation**
   - They are regulated
   - They hold no funds
   - _Answer:_ They concentrate large value and often rely on complex, permissioned validation · _Why:_ Bridges hold large value and add trust assumptions and complex code, raising risk. · _Level:_ evaluate

3. What is MEV?
   - A wallet standard
   - **✔ Value extracted by reordering, inserting or censoring transactions in a block**
   - A type of token
   - A consensus algorithm
   - _Answer:_ Value extracted by reordering, inserting or censoring transactions in a block · _Why:_ MEV is value captured through transaction ordering within blocks. · _Level:_ understand

### Phase project — Build: DeFi Protocol Analysis Report (`cr-p6`)

- **Objective:** Complete "DeFi Protocol Analysis Report" to a standard you can show and explain to someone else.
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
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 7 — Web3 Frontend Foundations

**Objective:** Build a Web3 frontend that reads and writes to contracts.

**Success criteria:**
- Connect a wallet
- Read on-chain data
- Send a transaction and track it

### Instruction

Smart contracts without a frontend have no users. Connect your on-chain logic to interfaces real people can use.

OBJECTIVE
Build a Web3 frontend that reads and writes to contracts.

SUCCESS CRITERIA
• Connect a wallet
• Read on-chain data
• Send a transaction and track it

WORKED EXAMPLE
Connect a frontend to a contract. Step 1: read the deployer's ABI. Step 2: connect a wallet and read a value. Step 3: send a write transaction and wait for the receipt. Step 4: show the updated value and handle a rejected transaction gracefully.

COMMON MISTAKES
• Trusting client-side data without checking the chain
• Not handling rejected transactions

### Worked example

Connect a frontend to a contract. Step 1: read the deployer's ABI. Step 2: connect a wallet and read a value. Step 3: send a write transaction and wait for the receipt. Step 4: show the updated value and handle a rejected transaction gracefully.

### Common mistakes
- Trusting client-side data without checking the chain
- Not handling rejected transactions

### Ungraded practice
**Practice: Web3 Frontend Foundations**

DO THIS NOW
Build a page that connects a wallet, reads a balance, and sends one transaction, showing pending and confirmed states.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is ethers.js used for?
   - Designing UI
   - **✔ Interacting with Ethereum contracts and providers from JavaScript**
   - Storing files
   - Mining blocks
   - _Answer:_ Interacting with Ethereum contracts and providers from JavaScript · _Why:_ ethers.js is a library for talking to Ethereum nodes and contracts. · _Level:_ recall

2. What does wagmi provide?
   - A database
   - **✔ React hooks for reading and writing to Ethereum**
   - A CSS framework
   - A block explorer
   - _Answer:_ React hooks for reading and writing to Ethereum · _Why:_ wagmi exposes React hooks for common Web3 read/write operations. · _Level:_ understand

3. After sending a transaction, which states should the UI handle?
   - Only success
   - **✔ Pending, confirmed and failed/rejected states**
   - Nothing
   - Only cost
   - _Answer:_ Pending, confirmed and failed/rejected states · _Why:_ Transactions may be pending, confirmed, or rejected; the UI must handle each. · _Level:_ apply

### Phase project — Build: NFT Collection with On-Chain Metadata (`cr-p5`)

- **Objective:** Complete "NFT Collection with On-Chain Metadata" to a standard you can show and explain to someone else.
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
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 8 — dApp Data & Storage

**Objective:** Use indexing and decentralised storage in a dApp.

**Success criteria:**
- Query indexed data
- Store files on IPFS
- Assemble a full dApp

### Instruction

Indexing and storage are what make dApps usable at scale. Query historical data with The Graph and store assets on IPFS.

OBJECTIVE
Use indexing and decentralised storage in a dApp.

SUCCESS CRITERIA
• Query indexed data
• Store files on IPFS
• Assemble a full dApp

WORKED EXAMPLE
Store and retrieve dApp data. Step 1: decide what belongs on-chain (state) versus off-chain (large files). Step 2: write on-chain state with events. Step 3: store metadata on IPFS and reference its hash on-chain. Step 4: read the state back and confirm the hash resolves.

COMMON MISTAKES
• Scanning every block for history in the frontend
• Assuming IPFS guarantees persistence without pinning

### Worked example

Store and retrieve dApp data. Step 1: decide what belongs on-chain (state) versus off-chain (large files). Step 2: write on-chain state with events. Step 3: store metadata on IPFS and reference its hash on-chain. Step 4: read the state back and confirm the hash resolves.

### Common mistakes
- Scanning every block for history in the frontend
- Assuming IPFS guarantees persistence without pinning

### Ungraded practice
**Practice: dApp Data & Storage**

DO THIS NOW
Add a The Graph subgraph query for historical events and store an asset on IPFS, then link it into your dApp.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Why use The Graph instead of reading events directly from a node?
   - It is prettier
   - **✔ It indexes blockchain data so historical queries are fast and simple**
   - It stores private keys
   - It mines tokens
   - _Answer:_ It indexes blockchain data so historical queries are fast and simple · _Why:_ The Graph indexes events into queryable data, avoiding slow block scans. · _Level:_ understand

2. What does IPFS content addressing mean?
   - Files are stored on one server
   - **✔ A file is referenced by a hash of its content**
   - Files are encrypted
   - Files are free forever
   - _Answer:_ A file is referenced by a hash of its content · _Why:_ IPFS addresses content by hash, so identical content shares an address. · _Level:_ understand

3. A file is added to IPFS but later becomes unavailable. Why?
   - It never uploaded
   - **✔ IPFS does not guarantee persistence unless the content is pinned/replicated**
   - The hash changed
   - IPFS is read-only
   - _Answer:_ IPFS does not guarantee persistence unless the content is pinned/replicated · _Why:_ IPFS is a network of providers; unpinned content can be garbage-collected. · _Level:_ evaluate

### Phase project — Build: Decentralised Voting System (`cr-p4`)

- **Objective:** Complete "Decentralised Voting System" to a standard you can show and explain to someone else.
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
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 9 — Common Smart Contract Vulnerabilities

**Objective:** Recognise and prevent the most damaging vulnerability classes.

**Success criteria:**
- Apply checks-effects-interactions
- Enforce access control
- Handle arithmetic and frontrunning risks

### Instruction

The vulnerability classes that cause the largest losses. Learn to recognise each pattern by reading real code, not just definitions.

OBJECTIVE
Recognise and prevent the most damaging vulnerability classes.

SUCCESS CRITERIA
• Apply checks-effects-interactions
• Enforce access control
• Handle arithmetic and frontrunning risks

WORKED EXAMPLE
Find a vulnerability. Step 1: review a contract for reentrancy, access control and integer issues. Step 2: pick one suspected bug. Step 3: write a test that demonstrates the impact. Step 4: describe the fix and verify the test passes after it.

COMMON MISTAKES
• Making external calls before updating state
• Missing access control on privileged functions

### Worked example

Find a vulnerability. Step 1: review a contract for reentrancy, access control and integer issues. Step 2: pick one suspected bug. Step 3: write a test that demonstrates the impact. Step 4: describe the fix and verify the test passes after it.

### Common mistakes
- Making external calls before updating state
- Missing access control on privileged functions

### Ungraded practice
**Practice: Common Smart Contract Vulnerabilities**

DO THIS NOW
For a vulnerable withdraw function, identify the reentrancy flaw and rewrite it using the checks-effects-interactions pattern.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does the checks-effects-interactions pattern prevent?
   - High gas
   - **✔ Reentrancy, by updating state before making external calls**
   - Integer overflow
   - Frontrunning
   - _Answer:_ Reentrancy, by updating state before making external calls · _Why:_ Updating state before external calls prevents reentrant re-entry from seeing stale state. · _Level:_ apply

2. Since Solidity 0.8, what happens to unchecked integer overflow by default?
   - It wraps silently
   - **✔ The operation reverts**
   - It logs a warning
   - It pays a fee
   - _Answer:_ The operation reverts · _Why:_ Solidity 0.8+ reverts on overflow/underflow unless explicitly unchecked. · _Level:_ understand

3. Which is the most common access-control mistake?
   - Using events
   - **✔ Forgetting to restrict a sensitive function to the right role**
   - Using memory
   - Emitting logs
   - _Answer:_ Forgetting to restrict a sensitive function to the right role · _Why:_ Missing or wrong access control on sensitive functions is a leading exploit cause. · _Level:_ analyze

### Phase project — Build: Smart Contract Security Audit Report (`cr-p8`)

- **Objective:** Complete "Smart Contract Security Audit Report" to a standard you can show and explain to someone else.
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
- 3 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 10 — Auditing Tools & Practice

**Objective:** Apply auditing tools and write professional findings.

**Success criteria:**
- Run static analysis and fuzzing
- Write a clear report
- Understand audit contests

### Instruction

Turn vulnerability knowledge into a professional practice: run automated tools, write clear findings, and compete in audit contests.

OBJECTIVE
Apply auditing tools and write professional findings.

SUCCESS CRITERIA
• Run static analysis and fuzzing
• Write a clear report
• Understand audit contests

WORKED EXAMPLE
Build an audit pipeline. Step 1: run static analysis with a tool such as Slither. Step 2: triage the findings, separating real issues from noise. Step 3: write a fuzz test for one suspected bug. Step 4: produce a report that marks each finding confirmed or unconfirmed.

COMMON MISTAKES
• Reporting tool output without validation
• Vague findings with no proof of concept

### Worked example

Build an audit pipeline. Step 1: run static analysis with a tool such as Slither. Step 2: triage the findings, separating real issues from noise. Step 3: write a fuzz test for one suspected bug. Step 4: produce a report that marks each finding confirmed or unconfirmed.

### Common mistakes
- Reporting tool output without validation
- Vague findings with no proof of concept

### Ungraded practice
**Practice: Auditing Tools & Practice**

DO THIS NOW
Run Slither on a sample contract, triage its findings, and write one finding with severity, impact and a recommended fix.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is Slither?
   - A wallet
   - **✔ A static analysis tool that flags common Solidity vulnerabilities**
   - A testnet
   - A DEX
   - _Answer:_ A static analysis tool that flags common Solidity vulnerabilities · _Why:_ Slither performs static analysis to detect common issues. · _Level:_ recall

2. What does fuzzing add over example-based tests?
   - Faster compilation
   - **✔ Randomised inputs that can find edge cases you did not imagine**
   - Cheaper gas
   - Better UI
   - _Answer:_ Randomised inputs that can find edge cases you did not imagine · _Why:_ Fuzzing explores many inputs automatically, surfacing unexpected edge cases. · _Level:_ understand

3. A strong audit finding should include…
   - Only a severity label
   - **✔ The vulnerability, its impact, a proof of concept and a recommended fix**
   - The auditor's opinion only
   - A screenshot
   - _Answer:_ The vulnerability, its impact, a proof of concept and a recommended fix · _Why:_ Findings need impact, reproduction and remediation to be actionable. · _Level:_ apply

### Phase project — Build: Automated Audit Pipeline (`cr-p11`)

- **Objective:** Build a repeatable, automated-plus-manual audit pipeline.
- **Problem:** Manual review alone is slow and misses classes of bugs that tools catch quickly.
- **Audience:** A security-focused developer or auditor.
- **Required functionality:**
  - Slither (or equivalent) static analysis run and triaged
  - Foundry fuzz/invariant tests targeting suspected issues
  - A triage that separates true positives from noise
  - A short findings report
- **Constraints:**
  - Authorized targets only
  - Do not report tool output as confirmed findings without validation
- **Acceptance criteria (brief):**
  - Each reported finding is validated or clearly marked unconfirmed
  - The pipeline is re-runnable
  - False positives are explained
- **Required evidence:**
  - Pipeline scripts/config
  - Tool output
  - The triaged report
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Each reported finding is validated or clearly marked unconfirmed (weight 1)
  - The pipeline is re-runnable (weight 1)
  - False positives are explained (weight 1)
- **Acceptance criteria (contract):**
  - Each reported finding is validated or clearly marked unconfirmed
  - The pipeline is re-runnable
  - False positives are explained

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 11 — On-Chain Data Analysis

**Objective:** Analyse on-chain data and publish a dashboard.

**Success criteria:**
- Read a block explorer
- Explain key metrics
- Query with Dune SQL

### Instruction

Everything on a public blockchain is permanently visible. A skilled analyst can see whale movements, accumulation patterns, and protocol health signals invisible in traditional finance.

OBJECTIVE
Analyse on-chain data and publish a dashboard.

SUCCESS CRITERIA
• Read a block explorer
• Explain key metrics
• Query with Dune SQL

WORKED EXAMPLE
Analyse on-chain activity. Step 1: pick an address or contract. Step 2: query its transactions and transfers. Step 3: build a chart of activity over time. Step 4: write one insight — who is using it and how — supported by the data.

COMMON MISTAKES
• Treating TVL as revenue
• Drawing conclusions without context or baselines

### Worked example

Analyse on-chain activity. Step 1: pick an address or contract. Step 2: query its transactions and transfers. Step 3: build a chart of activity over time. Step 4: write one insight — who is using it and how — supported by the data.

### Common mistakes
- Treating TVL as revenue
- Drawing conclusions without context or baselines

### Ungraded practice
**Practice: On-Chain Data Analysis**

DO THIS NOW
Build a small Dune dashboard for one protocol and write a short paragraph explaining what each chart shows and what it does not.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does TVL measure?
   - Protocol profit
   - **✔ The total value of assets deposited in a protocol's contracts**
   - Token price
   - Daily active users
   - _Answer:_ The total value of assets deposited in a protocol's contracts · _Why:_ TVL is the value locked in a protocol, not its profit. · _Level:_ understand

2. Why convert stablecoin inflows to an exchange into a caution signal?
   - They mean nothing
   - **✔ Large inflows can precede selling pressure as users prepare to trade**
   - They reduce fees
   - They prove adoption
   - _Answer:_ Large inflows can precede selling pressure as users prepare to trade · _Why:_ Exchange inflows are often read as potential selling pressure. · _Level:_ analyze

3. Dune Analytics lets analysts…
   - Mine tokens
   - **✔ Write SQL against decoded blockchain data and publish dashboards**
   - Deploy contracts
   - Hold keys
   - _Answer:_ Write SQL against decoded blockchain data and publish dashboards · _Why:_ Dune provides SQL access to decoded on-chain data for analysis and dashboards. · _Level:_ understand

### Phase project — Build: On-Chain Data Dashboard (`cr-p3`)

- **Objective:** Complete "On-Chain Data Dashboard" to a standard you can show and explain to someone else.
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

### Phase project — Portfolio project: Web3 Capstone: Deploy, Build, Audit, Analyse (`cr-pf`)

- **Objective:** Ship one coherent artefact spanning contract, frontend, security, and analysis.
- **Problem:** A Web3 portfolio needs to show the full lifecycle, not just a token deploy.
- **Audience:** A hiring manager or protocol team evaluating practical ability.
- **Required functionality:**
  - A deployed contract on a testnet
  - A minimal dApp frontend that interacts with it
  - A security review of the contract
  - An on-chain analysis of its usage
- **Constraints:**
  - Testnet only unless explicitly authorized
  - No fabricated usage data
  - All third-party sources cited
- **Acceptance criteria (brief):**
  - The dApp actually calls the deployed contract
  - The review and analysis are evidence-based
  - The case study is reproducible by a reviewer
- **Required evidence:**
  - Repository
  - Deployed addresses
  - The review and analysis
  - A portfolio case study
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The dApp actually calls the deployed contract (weight 1)
  - The review and analysis are evidence-based (weight 1)
  - The case study is reproducible by a reviewer (weight 1)
- **Acceptance criteria (contract):**
  - The dApp actually calls the deployed contract
  - The review and analysis are evidence-based
  - The case study is reproducible by a reviewer

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
