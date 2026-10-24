# Reviewer packet — Crypto & Web3

- **Track id:** `crypto`  ·  **Slug:** `crypto-web3`  ·  **Category:** build  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.2/100 · worthiness 98/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | How Blockchain Actually Works | Explain how a blockchain actually works at the cryptographic and consensus level. | 2–3 weeks | 6 |
| 2 | Wallets, Keys & On-Chain Security | Protect keys and sign transactions safely. | 1–2 weeks | 7 |
| 3 | Solidity Fundamentals | Read and write the core of the Solidity language. | 3–4 weeks | 2 |
| 4 | Token Standards & Development Tooling | Implement token standards and use professional tooling. | 3–4 weeks | 6 |
| 5 | DeFi Core Mechanics | Explain the core mechanics of decentralised finance. | 2 weeks | 4 |
| 6 | DeFi Risks & Advanced Concepts | Understand where DeFi breaks and why. | 2 weeks | 5 |
| 7 | Web3 Frontend Foundations | Build a Web3 frontend that reads and writes to contracts. | 3 weeks | 5 |
| 8 | dApp Data & Storage | Use indexing and decentralised storage in a dApp. | 2 weeks | 3 |
| 9 | Common Smart Contract Vulnerabilities | Recognise and prevent the most damaging vulnerability classes. | 2–3 weeks | 6 |
| 10 | Auditing Tools & Practice | Apply auditing tools and write professional findings. | 2 weeks | 3 |
| 11 | On-Chain Data Analysis | Analyse on-chain data and publish a dashboard. | 2–3 weeks | 7 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 6, 11.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 7 — Web3 Frontend Foundations**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 9 — Common Smart Contract Vulnerabilities**: content-inspected required resources 3, objective-matching resources 0, playback-verified resources 0.
- **Stage 1 — How Blockchain Actually Works**: content-inspected required resources 2, objective-matching resources 3, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — How Blockchain Actually Works

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Introduction to Ethereum | required | L3 | content-inspection | — | 2 | https://ethereum.org/en/developers/docs/intro-to-ethereum/ |
| Blockchain Demo — Anders Brownworth | required | L2 | http-probe | — | 1 | https://andersbrownworth.com/blockchain |
| Bitcoin Whitepaper | required | L2 | http-probe | — | 0 | https://bitcoin.org/bitcoin.pdf |
| Ethereum.org Learn | required | L3 | content-inspection | — | 1 | https://ethereum.org/en/learn |
- _L3 required evidence — Ethereum Foundation: “Technical intro to Ethereum Edit page (opens in a new tab) What is a blockchain? A blockchain is a public database that is updated and shared across many computers in a network. "Block" refers to data and state being st…”_
- _L3 required evidence — Ethereum Foundation: “Understand Ethereum Cryptocurrencies, such as bitcoin, enable anyone to transfer money globally. Ethereum does that too, but it can also run code that enables people to create apps and organizations. It's both resilient…”_

### Stage 2 — Wallets, Keys & On-Chain Security

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| MetaMask Learn | required | L3 | content-inspection | — | 1 | https://metamask.io/learn |
| Ethereum Wallets Guide | required | L3 | content-inspection | — | 3 | https://ethereum.org/en/wallets/ |
- _L3 required evidence — MetaMask: “BEGINNER PREDICTION MARKETS Editor's Pick 8 MINUTES What is Polymarket? A guide to decentralized prediction markets Learn about Polymarket: How it works, what makes it popular, the events you can trade, and broader pred…”_
- _L3 required evidence — Ethereum Foundation: “What's an Ethereum wallet? Ethereum wallets are applications that give you control over your account. Just like your physical wallet, it contains everything you need to prove your identity and handle your assets. Your w…”_

### Stage 3 — Solidity Fundamentals

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| CryptoZombies | required | L3 | content-inspection | — | 2 | https://cryptozombies.io |
| Solidity by Example | required | L2 | http-probe | — | 0 | https://solidity-by-example.org |
| Patrick Collins — Solidity Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=umepbfKp5rI |
| Solidity Official Docs | required | L3 | content-inspection | — | 3 | https://docs.soliditylang.org |
- _L3 required evidence — CryptoZombies: “Blog Videos Courses English English French Start Course Learn to Code Blockchain DApps by Building Simple Games CryptoZombies is an interactive school that teaches you all things technical about blockchains. Learn to wr…”_
- _L3 required evidence — Ethereum Foundation: “Solidity Edit on GitHub Solidity  Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs that govern the behavior of accounts within the Ethereum state. Solid…”_

### Stage 4 — Token Standards & Development Tooling

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenZeppelin ERC-20 Guide | required | L3 | content-inspection | — | 1 | https://docs.openzeppelin.com/contracts/5.x/erc20 |
| OpenZeppelin Docs | required | L3 | content-inspection | — | 2 | https://docs.openzeppelin.com/contracts |
| Foundry Book | required | L3 | content-inspection | — | 0 | https://github.com/foundry-rs/foundry |
- _L3 required evidence — OpenZeppelin: “OpenZeppelin Contracts Tokens ERC-20 Open in Claude An ERC-20 token contract keeps track of fungible tokens : any one token is exactly equal to any other token; no tokens have special rights or behavior associated with …”_
- _L3 required evidence — OpenZeppelin: “OpenZeppelin Contracts Open in Claude OpenZeppelin Contracts is a library of modular, reusable, secure smart contracts for the Ethereum network, written in Solidity. Getting Started Contracts Overview Start working with…”_
- _L3 required evidence — Paradigm: “Branches Tags Open more actions menu Latest commit History 9,086 Commits 9,086 Commits Folders and files Name Name Last commit message Last commit date .cargo .cargo .config .config .github .github .vscode .vscode bench…”_

### Stage 5 — DeFi Core Mechanics

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Finematics YouTube | required | L2 | http-probe | — | 0 | https://www.youtube.com/c/Finematics |
| DefiLlama | required | L3 | content-inspection | — | 1 | https://defillama.com |
| DeFi MOOC — UC Berkeley | required | L2 | http-probe | — | 1 | https://defi-learning.org |
- _L3 required evidence — DefiLlama: “⌘K Try LlamaAI Ask LlamaAI for free ✦ NEW Ask LlamaAI anything about DeFi — 5 free questions a day for your first week. Try LlamaAI → All Ethereum Base Solana Tron BSC Bitcoin Arbitrum Robinhood Chain Hyperliquid L1 Mon…”_

### Stage 6 — DeFi Risks & Advanced Concepts

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Ethereum — What is DeFi? (Mechanics and Risks) | required | L3 | content-inspection | 15 min | 1 | https://ethereum.org/en/defi/ |
- _L3 required evidence — Ethereum Foundation: “Edit page (opens in a new tab) DeFi is an open and global financial system built for the internet age – an alternative to a system that's opaque, tightly controlled, and held together by decades-old infrastructure and p…”_

### Stage 7 — Web3 Frontend Foundations

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| ethers — Getting Started | required | L3 | content-inspection | — | 0 | https://docs.ethers.org/v6/getting-started/ |
| wagmi Documentation | required | L2 | http-probe | — | 0 | https://wagmi.sh |
- _L3 required evidence — ethers: “ethers 6.17.0 DOCUMENTATION Getting Started Some Common Terminology Connecting to Ethereum User Interaction Interacting with the Blockchain Contracts Signing Messages Ethereum Basics Application Programming Interface Co…”_

### Stage 8 — dApp Data & Storage

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| ETHGlobal Hackathons | required | L3 | content-inspection | — | 0 | https://ethglobal.com |
- _L3 required evidence — ETHGlobal: “Login Events ETHConf New Plus Showcase Faucet Swag About Connect Discord Events ETHConf New Plus Showcase Faucet Swag About Login Building our decentralized future Hackathons teach new skills, strengthen developer commu…”_

### Stage 9 — Common Smart Contract Vulnerabilities

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Ethernaut | required | L2 | http-probe | — | 0 | https://ethernaut.openzeppelin.com |
| Cyfrin Updraft Security Course | required | L3 | content-inspection | — | 0 | https://updraft.cyfrin.io |
| Damn Vulnerable DeFi | required | L3 | content-inspection | — | 0 | https://github.com/tinchoabbate/damn-vulnerable-defi |
| OpenZeppelin Security Blog | required | L3 | content-inspection | — | 0 | https://blog.openzeppelin.com |
- _L3 required evidence — Cyfrin: “Copy logo as SVG Copy wordmark as SVG Brand guidelines Home page Resources Industries Services Smart contract security audits Incident response Formal Verification Penetration testing Risk advisory Security advisory Pro…”_
- _L3 required evidence — tinchoabbate: “Branches Tags Open more actions menu Latest commit History 13 Commits 13 Commits Folders and files Name Name Last commit message Last commit date .devcontainer .devcontainer builds/ uniswap builds/ uniswap lib lib src s…”_
- _L3 required evidence — OpenZeppelin: “News from OpenZeppelin OpenZeppelin and T-REX Network Rebuild ONCHAINID as a Smart Account for Regulated Assets Product Releases & Services September 30, 2026 OpenZeppelin Brings Its Security Standard to the TRON Networ…”_

### Stage 10 — Auditing Tools & Practice

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Code4rena | required | L3 | content-inspection | — | 0 | https://code4rena.com |
- _L3 required evidence — Code4rena: “Code4rena is winding down. After 5 years of securing DeFi, Code4rena is closing its doors. Active competitions and bounties are being seen through to completion. 1,607 unique high-severity vulns 26,898 unique findings 1…”_

### Stage 11 — On-Chain Data Analysis

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Dune Analytics | required | L3 | content-inspection | — | 1 | https://dune.com |
- _L3 required evidence — Dune: “The industry standard for prediction markets data stablecoin data prediction markets stablecoin data stablecoin data Normalized blockchain datasets, delivered wherever you work. Explore data 130+ Chains 1M+ Users 1,000+…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 3 | Patrick Collins — Solidity Full Course | L2 | not verified | not verified — review manually |
| 5 | Finematics YouTube | L2 | not verified | not verified — review manually |
| 9 | Cyfrin Updraft Security Course | L3 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — How Blockchain Actually Works (3 questions)

1. Which property must a cryptographic hash function have?
   - · It is reversible
   - **✔ A tiny input change produces a completely different output**
   - · It always outputs text
   - · It needs a password
   - _Why:_ Hashing is one-way and exhibits the avalanche effect: small changes produce very different hashes. · _level: understand_
2. What does a block header commit to through its merkle root?
   - · The miner's identity
   - **✔ All transactions in the block**
   - · The next block only
   - · Gas prices only
   - _Why:_ The merkle root is a hash committing to the set of transactions in the block. · _level: understand_
3. What is the core difference between Proof of Work and Proof of Stake?
   - · Both are identical
   - **✔ PoW secures the chain with computational work; PoS secures it with economic stake**
   - · PoS needs no validators
   - · PoW has no rewards
   - _Why:_ PoW spends computation to propose blocks; PoS selects validators weighted by stake. · _level: analyze_

### Stage 2 — Wallets, Keys & On-Chain Security (3 questions)

1. What is a seed phrase?
   - · A public address
   - **✔ A human-readable encoding of the master secret from which keys are derived**
   - · A transaction hash
   - · A wallet password
   - _Why:_ A seed phrase encodes the master secret used to derive all keys in an HD wallet. · _level: understand_
2. Why is a hardware wallet safer than a hot wallet?
   - · It is faster
   - **✔ The private key never leaves the device, so malware on your computer cannot steal it**
   - · It has no fees
   - · It stores more tokens
   - _Why:_ Hardware wallets keep keys offline; the host cannot exfiltrate them. · _level: evaluate_
3. A site asks you to approve an unlimited token spend. What is the risk?
   - · None
   - **✔ A malicious or buggy contract could later drain that token at any time**
   - · It doubles your balance
   - · It is required for all tokens
   - _Why:_ Unlimited approvals let a contract transfer that token without further consent. · _level: evaluate_

### Stage 3 — Solidity Fundamentals (3 questions)

1. Which data location is a temporary, mutable copy that is not persisted?
   - · storage
   - **✔ memory**
   - · calldata
   - · immutable
   - _Why:_ memory is temporary and mutable for the duration of a call. · _level: understand_
2. What is a modifier used for in Solidity?
   - · Storing data permanently
   - **✔ Reusable pre/post conditions wrapped around a function, such as access control**
   - · Compiling code
   - · Paying gas
   - _Why:_ Modifiers wrap functions to enforce conditions such as onlyOwner. · _level: understand_
3. What is the purpose of an event?
   - · To store state permanently
   - **✔ To emit a log that off-chain apps can observe cheaply**
   - · To change gas price
   - · To upgrade a contract
   - _Why:_ Events emit logs for off-chain indexing and monitoring. · _level: apply_

### Stage 4 — Token Standards & Development Tooling (3 questions)

1. How does ERC-721 differ from ERC-20?
   - · They are identical
   - **✔ ERC-20 tokens are fungible; ERC-721 tokens are unique (non-fungible)**
   - · ERC-721 is for stablecoins
   - · ERC-20 is for NFTs
   - _Why:_ ERC-20 is fungible; ERC-721 represents unique, non-fungible tokens. · _level: understand_
2. Why use OpenZeppelin implementations?
   - · They are required
   - **✔ They are audited, battle-tested and standard-compliant**
   - · They are the only library
   - · They avoid gas
   - _Why:_ OpenZeppelin provides audited, widely used implementations that reduce risk. · _level: evaluate_
3. Why deploy and test on a testnet before mainnet?
   - · Mainnet is slower
   - **✔ To validate behaviour and tooling without risking real funds**
   - · Testnets have more users
   - · It is required by Solidity
   - _Why:_ Testnets let you verify deployment and behaviour with no real funds at stake. · _level: apply_

### Stage 5 — DeFi Core Mechanics (3 questions)

1. In a constant-product AMM (x × y = k), what happens as a trade grows large?
   - · Price stays constant
   - **✔ The average execution price slips further from the starting price**
   - · The pool gains liquidity
   - · Fees fall to zero
   - _Why:_ Large trades move the pool balances more, causing greater slippage. · _level: analyze_
2. What is impermanent loss?
   - · A permanent fee
   - **✔ The loss an LP suffers versus simply holding the tokens when the pool price diverges**
   - · A hacking loss
   - · A tax
   - _Why:_ Impermanent loss is the divergence cost LPs face relative to holding. · _level: understand_
3. Which stablecoin design depends hardest on external collateral staying solvent?
   - **✔ Algorithmic, undercollateralised designs**
   - · Fully fiat-backed
   - · Overcollateralised crypto-backed
   - · Tokenised deposits
   - _Why:_ Undercollateralised algorithmic designs are the most fragile when confidence breaks. · _level: evaluate_

### Stage 6 — DeFi Risks & Advanced Concepts (3 questions)

1. What is a flash-loan attack?
   - · A slow loan repaid over years
   - **✔ A loan taken and repaid within one transaction, used to manipulate prices or bypass checks**
   - · A hack of the wallet
   - · A governance vote
   - _Why:_ Flash loans require no collateral because they are borrowed and repaid in one atomic transaction. · _level: understand_
2. Why are cross-chain bridges frequent targets?
   - · They are cheap to run
   - **✔ They concentrate large value and often rely on complex, permissioned validation**
   - · They are regulated
   - · They hold no funds
   - _Why:_ Bridges hold large value and add trust assumptions and complex code, raising risk. · _level: evaluate_
3. What is MEV?
   - · A wallet standard
   - **✔ Value extracted by reordering, inserting or censoring transactions in a block**
   - · A type of token
   - · A consensus algorithm
   - _Why:_ MEV is value captured through transaction ordering within blocks. · _level: understand_

### Stage 7 — Web3 Frontend Foundations (3 questions)

1. What is ethers.js used for?
   - · Designing UI
   - **✔ Interacting with Ethereum contracts and providers from JavaScript**
   - · Storing files
   - · Mining blocks
   - _Why:_ ethers.js is a library for talking to Ethereum nodes and contracts. · _level: recall_
2. What does wagmi provide?
   - · A database
   - **✔ React hooks for reading and writing to Ethereum**
   - · A CSS framework
   - · A block explorer
   - _Why:_ wagmi exposes React hooks for common Web3 read/write operations. · _level: understand_
3. After sending a transaction, which states should the UI handle?
   - · Only success
   - **✔ Pending, confirmed and failed/rejected states**
   - · Nothing
   - · Only cost
   - _Why:_ Transactions may be pending, confirmed, or rejected; the UI must handle each. · _level: apply_

### Stage 8 — dApp Data & Storage (3 questions)

1. Why use The Graph instead of reading events directly from a node?
   - · It is prettier
   - **✔ It indexes blockchain data so historical queries are fast and simple**
   - · It stores private keys
   - · It mines tokens
   - _Why:_ The Graph indexes events into queryable data, avoiding slow block scans. · _level: understand_
2. What does IPFS content addressing mean?
   - · Files are stored on one server
   - **✔ A file is referenced by a hash of its content**
   - · Files are encrypted
   - · Files are free forever
   - _Why:_ IPFS addresses content by hash, so identical content shares an address. · _level: understand_
3. A file is added to IPFS but later becomes unavailable. Why?
   - · It never uploaded
   - **✔ IPFS does not guarantee persistence unless the content is pinned/replicated**
   - · The hash changed
   - · IPFS is read-only
   - _Why:_ IPFS is a network of providers; unpinned content can be garbage-collected. · _level: evaluate_

### Stage 9 — Common Smart Contract Vulnerabilities (3 questions)

1. What does the checks-effects-interactions pattern prevent?
   - · High gas
   - **✔ Reentrancy, by updating state before making external calls**
   - · Integer overflow
   - · Frontrunning
   - _Why:_ Updating state before external calls prevents reentrant re-entry from seeing stale state. · _level: apply_
2. Since Solidity 0.8, what happens to unchecked integer overflow by default?
   - · It wraps silently
   - **✔ The operation reverts**
   - · It logs a warning
   - · It pays a fee
   - _Why:_ Solidity 0.8+ reverts on overflow/underflow unless explicitly unchecked. · _level: understand_
3. Which is the most common access-control mistake?
   - · Using events
   - **✔ Forgetting to restrict a sensitive function to the right role**
   - · Using memory
   - · Emitting logs
   - _Why:_ Missing or wrong access control on sensitive functions is a leading exploit cause. · _level: analyze_

### Stage 10 — Auditing Tools & Practice (3 questions)

1. What is Slither?
   - · A wallet
   - **✔ A static analysis tool that flags common Solidity vulnerabilities**
   - · A testnet
   - · A DEX
   - _Why:_ Slither performs static analysis to detect common issues. · _level: recall_
2. What does fuzzing add over example-based tests?
   - · Faster compilation
   - **✔ Randomised inputs that can find edge cases you did not imagine**
   - · Cheaper gas
   - · Better UI
   - _Why:_ Fuzzing explores many inputs automatically, surfacing unexpected edge cases. · _level: understand_
3. A strong audit finding should include…
   - · Only a severity label
   - **✔ The vulnerability, its impact, a proof of concept and a recommended fix**
   - · The auditor's opinion only
   - · A screenshot
   - _Why:_ Findings need impact, reproduction and remediation to be actionable. · _level: apply_

### Stage 11 — On-Chain Data Analysis (3 questions)

1. What does TVL measure?
   - · Protocol profit
   - **✔ The total value of assets deposited in a protocol's contracts**
   - · Token price
   - · Daily active users
   - _Why:_ TVL is the value locked in a protocol, not its profit. · _level: understand_
2. Why convert stablecoin inflows to an exchange into a caution signal?
   - · They mean nothing
   - **✔ Large inflows can precede selling pressure as users prepare to trade**
   - · They reduce fees
   - · They prove adoption
   - _Why:_ Exchange inflows are often read as potential selling pressure. · _level: analyze_
3. Dune Analytics lets analysts…
   - · Mine tokens
   - **✔ Write SQL against decoded blockchain data and publish dashboards**
   - · Deploy contracts
   - · Hold keys
   - _Why:_ Dune provides SQL access to decoded on-chain data for analysis and dashboards. · _level: understand_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `cr-p9` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Every field is explained correctly | 1 | no |
| The log is decoded and interpreted | 1 | no |
| The write-up would let a newcomer repeat it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 2 — project `cr-p10` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Recovery was actually tested | 1 | no |
| No real seed is exposed in the submitted evidence | 1 | no |
| Checklist covers approvals and phishing | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 3 — project `cr-p2` (rubric rizw7jo-8)

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

### Stage 4 — project `cr-p1` (rubric rizw7jo-8)

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

### Stage 5 — project `cr-p7` (rubric rizw7jo-8)

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

### Stage 6 — project `cr-p6` (rubric rizw7jo-8)

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

### Stage 7 — project `cr-p5` (rubric rizw7jo-8)

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

### Stage 8 — project `cr-p4` (rubric rizw7jo-8)

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

### Stage 9 — project `cr-p8` (rubric rizw7jo-8)

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

### Stage 10 — project `cr-p11` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Each reported finding is validated or clearly marked unconfirmed | 1 | no |
| The pipeline is re-runnable | 1 | no |
| False positives are explained | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 11 — project `cr-p3` (rubric rizw7jo-8)

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

### Stage 1 — Build: Block Explorer Investigation

- **Objective:** Trace and explain a real transaction on a testnet explorer.
- **Problem:** Beginners trust a transaction hash without understanding what it proves.
- **Audience:** The learner building on-chain literacy.
- **Required functionality:**
  - A real transaction hash and its receipt
  - An explanation of from/to/value/gas/status/logs
  - At least one contract interaction with an event log
- **Acceptance criteria:**
  - Every field is explained correctly
  - The log is decoded and interpreted
  - The write-up would let a newcomer repeat it
- **Required evidence:**
  - A written investigation
  - Explorer screenshots or links
  - The decoded event log
- **Constraints:**
  - Use a testnet
  - Do not expose private keys

### Stage 2 — Build: Self-Custody Wallet Security Setup

- **Objective:** Set up self-custody with a tested recovery procedure and a risk checklist.
- **Problem:** Poor key handling is the most common way people lose funds.
- **Audience:** The learner securing their own assets.
- **Required functionality:**
  - A self-custody wallet set up on a testnet or with a hardware wallet
  - A documented, offline seed backup plan
  - A tested recovery procedure
  - A phishing/token-approval risk checklist
- **Acceptance criteria:**
  - Recovery was actually tested
  - No real seed is exposed in the submitted evidence
  - Checklist covers approvals and phishing
- **Required evidence:**
  - A procedure document (with redacted/placeholder secrets)
  - A recovery test log
  - The risk checklist
- **Constraints:**
  - Never store a real seed phrase digitally in the submission
  - Use placeholders in any shared evidence

### Stage 3 — Build: On-Chain Guestbook

- **Objective:** Complete "On-Chain Guestbook" to a standard you can show and explain to someone else.
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

### Stage 4 — Build: Deploy Your Own ERC-20 Token

- **Objective:** Complete "Deploy Your Own ERC-20 Token" to a standard you can show and explain to someone else.
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

### Stage 5 — Build: Simplified AMM from Scratch

- **Objective:** Complete "Simplified AMM from Scratch" to a standard you can show and explain to someone else.
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

### Stage 6 — Build: DeFi Protocol Analysis Report

- **Objective:** Complete "DeFi Protocol Analysis Report" to a standard you can show and explain to someone else.
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

### Stage 7 — Build: NFT Collection with On-Chain Metadata

- **Objective:** Complete "NFT Collection with On-Chain Metadata" to a standard you can show and explain to someone else.
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

### Stage 8 — Build: Decentralised Voting System

- **Objective:** Complete "Decentralised Voting System" to a standard you can show and explain to someone else.
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

### Stage 9 — Build: Smart Contract Security Audit Report

- **Objective:** Complete "Smart Contract Security Audit Report" to a standard you can show and explain to someone else.
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

### Stage 10 — Build: Automated Audit Pipeline

- **Objective:** Build a repeatable, automated-plus-manual audit pipeline.
- **Problem:** Manual review alone is slow and misses classes of bugs that tools catch quickly.
- **Audience:** A security-focused developer or auditor.
- **Required functionality:**
  - Slither (or equivalent) static analysis run and triaged
  - Foundry fuzz/invariant tests targeting suspected issues
  - A triage that separates true positives from noise
  - A short findings report
- **Acceptance criteria:**
  - Each reported finding is validated or clearly marked unconfirmed
  - The pipeline is re-runnable
  - False positives are explained
- **Required evidence:**
  - Pipeline scripts/config
  - Tool output
  - The triaged report
- **Constraints:**
  - Authorized targets only
  - Do not report tool output as confirmed findings without validation

### Stage 11 — Build: On-Chain Data Dashboard

- **Objective:** Complete "On-Chain Data Dashboard" to a standard you can show and explain to someone else.
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

## 8. Worked examples

- **Stage 1:** Investigate a transaction. Step 1: pick a transaction on a testnet explorer. Step 2: read the from, to, value and gas fields. Step 3: open the logs and decode one event. Step 4: explain what the receipt proves and what …
- **Stage 2:** Set up self-custody safely. Step 1: create a wallet and record the seed phrase offline. Step 2: store it somewhere that survives device loss but is not on a networked device. Step 3: restore the wallet on a second devic…
- **Stage 3:** Write and test a Solidity contract. Step 1: store and retrieve a value with a public function. Step 2: add a test in a local framework. Step 3: deploy to a testnet. Step 4: read the value back from the explorer to confi…
- **Stage 4:** Create an ERC-20 token. Step 1: define name, symbol, decimals and total supply. Step 2: add access-controlled minting. Step 3: write tests for transfer, approve and mint authorisation. Step 4: deploy to a testnet and ve…
- **Stage 5:** Build a minimal AMM. Step 1: implement the constant-product reserve formula. Step 2: add add-liquidity and swap functions. Step 3: test a swap and compute the price impact. Step 4: write down what a large trade does to …
- **Stage 6:** Assess DeFi risk. Step 1: pick a protocol and list its dependencies. Step 2: identify the liquidation and impermanent-loss exposure. Step 3: note the admin keys and upgradeability. Step 4: write a short risk assessment …
- **Stage 7:** Connect a frontend to a contract. Step 1: read the deployer's ABI. Step 2: connect a wallet and read a value. Step 3: send a write transaction and wait for the receipt. Step 4: show the updated value and handle a reject…
- **Stage 8:** Store and retrieve dApp data. Step 1: decide what belongs on-chain (state) versus off-chain (large files). Step 2: write on-chain state with events. Step 3: store metadata on IPFS and reference its hash on-chain. Step 4…
- **Stage 9:** Find a vulnerability. Step 1: review a contract for reentrancy, access control and integer issues. Step 2: pick one suspected bug. Step 3: write a test that demonstrates the impact. Step 4: describe the fix and verify t…
- **Stage 10:** Build an audit pipeline. Step 1: run static analysis with a tool such as Slither. Step 2: triage the findings, separating real issues from noise. Step 3: write a fuzz test for one suspected bug. Step 4: produce a report…
- **Stage 11:** Analyse on-chain activity. Step 1: pick an address or contract. Step 2: query its transactions and transfers. Step 3: build a chart of activity over time. Step 4: write one insight — who is using it and how — supported …

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 1 — required (L2): https://andersbrownworth.com/blockchain
- Stage 1 — required (L2): https://bitcoin.org/bitcoin.pdf
- Stage 3 — required (L2): https://solidity-by-example.org
- Stage 3 — required (L2): https://www.youtube.com/watch?v=umepbfKp5rI
- Stage 5 — required (L2): https://www.youtube.com/c/Finematics
- Stage 5 — required (L2): https://defi-learning.org
- Stage 7 — required (L2): https://wagmi.sh
- Stage 9 — required (L2): https://ethernaut.openzeppelin.com

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.2) **and** worthiness ≥ 90 (this track: 98).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

