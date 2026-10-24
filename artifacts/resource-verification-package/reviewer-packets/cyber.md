# Reviewer packet — Cybersecurity

- **Track id:** `cyber`  ·  **Slug:** `cybersecurity`  ·  **Category:** grow  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.3/100 · worthiness 98.6/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Networking Fundamentals | Understand how data moves across networks and where it can be observed. | 3 to 4 weeks | 4 |
| 2 | Security Concepts | Apply core security principles and recognise common attack classes. | 3 to 4 weeks | 4 |
| 3 | Ethical Hacking | Perform authorised security testing using standard tools. | 5 to 6 weeks | 5 |
| 4 | Defensive Security | Investigate incidents and harden systems defensively. | 3 to 4 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 4.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 4 — Defensive Security**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 1 — Networking Fundamentals**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 2 — Security Concepts**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Networking Fundamentals

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| MDN — Client-Server overview | required | L3 | content-inspection | — | 1 | https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview |
| NetworkChuck YouTube | required | L2 | http-probe | — | 0 | https://www.youtube.com/@NetworkChuck |
- _L3 required evidence — MDN Web Docs: “Client-server overview Previous Overview: Server-side website programming first steps Next Now that you know the purpose and potential benefits of server-side programming, we're going to examine in detail what happens w…”_

### Stage 2 — Security Concepts

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| TryHackMe — Complete Beginner Path | required | L2 | http-probe | — | 0 | https://tryhackme.com/paths |
| OWASP Top 10 | required | L3 | content-inspection | — | 1 | https://owasp.org/www-project-top-ten |
- _L3 required evidence — OWASP: “OWASP Top 10 The OWASP Top 10 is the reference standard for the most critical web application security risks. Adopting the OWASP Top 10 is perhaps the most effective first step towards changing your software development…”_

### Stage 3 — Ethical Hacking

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| TryHackMe | required | L3 | content-inspection | — | 1 | https://tryhackme.com |
| PicoCTF | required | L3 | content-inspection | — | 1 | https://picoctf.org |
| PortSwigger Web Security Academy | required | L3 | content-inspection | — | 2 | https://portswigger.net/web-security |
| HackTheBox | required | L3 | content-inspection | — | 1 | https://www.hackthebox.com |
- _L3 required evidence — TryHackMe: “Anyone can learn cyber security with TryHackMe Hands-on cyber security training through real-world scenarios Continue with Google Beginner-friendly Guides and challenges Go from wherever you are to the role you want eas…”_
- _L3 required evidence — CMU: “Your cybersecurity journey at picoCTF continues at the CyLab Security Academy! CyLab Security Academy is Carnegie Mellon University&rsquo;s free cybersecurity learning platform. From foundational security concepts to cu…”_
- _L3 required evidence — PortSwigger: “Free, online web security training from the creators of Burp Suite Boost your career The Web Security Academy is a strong step toward a career in cybersecurity. Flexible learning Learn anywhere, anytime, with free inter…”_
- _L3 required evidence — HackTheBox: “Build and scale a cyber workforce in the AI era Equip threat-ready cyber teams for an AI-accelerated landscape with hands-on labs, assessments, and pathways that build top performing teams. For business For individuals …”_

### Stage 4 — Defensive Security

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Splunk SIEM Tutorial | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=pTvGrj3QOmU |
| Splunk SIEM Home Lab | required | L3 | content-inspection | — | 0 | https://github.com/0xrajneesh/Splunk-SIEM-Home-Lab |
- _L3 required evidence — Rajneesh: “Branches Tags Open more actions menu Latest commit History 8 Commits 8 Commits Folders and files Name Name Last commit message Last commit date README.md README.md install-splunk-siem-on-ubuntu-server.md install-splunk-…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 1 | NetworkChuck YouTube | L2 | not verified | not verified — review manually |
| 4 | Splunk SIEM Tutorial | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Networking Fundamentals (3 questions)

1. Which OSI layer is responsible for logical addressing and routing between networks?
   - · Data link
   - **✔ Network**
   - · Transport
   - · Application
   - _Why:_ The network layer handles logical addressing and routing (e.g. IP). · _level: understand_
2. What does HTTPS add over HTTP?
   - · Compression only
   - **✔ TLS encryption and server authentication**
   - · Faster downloads
   - · Firewall rules
   - _Why:_ HTTPS wraps HTTP in TLS, providing confidentiality and server identity. · _level: understand_
3. A firewall can see the destination IP and port but not the page contents. Why?
   - · Because it is disabled
   - **✔ Because the payload is encrypted by TLS and the firewall is not a trusted endpoint**
   - · Because DNS is broken
   - · Because HTTP has no headers
   - _Why:_ Without terminating TLS, a middle device sees only transport metadata, not encrypted contents. · _level: analyze_

### Stage 2 — Security Concepts (3 questions)

1. What does the CIA triad stand for?
   - · Control, Integrity, Access
   - **✔ Confidentiality, Integrity, Availability**
   - · Cryptography, Identity, Audit
   - · Consent, Isolation, Authority
   - _Why:_ The CIA triad is confidentiality, integrity and availability. · _level: recall_
2. What is the difference between authentication and authorization?
   - · None
   - **✔ Authentication proves who you are; authorization decides what you may do**
   - · Authorization proves identity; authentication grants access
   - · Both are encryption
   - _Why:_ Authentication establishes identity; authorization controls permissions. · _level: understand_
3. Which best prevents SQL injection?
   - · Hiding the database name
   - **✔ Using parameterised queries / prepared statements**
   - · Trusting the client to validate input
   - · Adding more indexes
   - _Why:_ Parameterised queries separate code from data, preventing injected SQL. · _level: apply_

### Stage 3 — Ethical Hacking (3 questions)

1. What is the purpose of reconnaissance?
   - · Exploiting vulnerabilities immediately
   - **✔ Gathering information about the target before testing**
   - · Reporting results
   - · Cleaning logs
   - _Why:_ Reconnaissance maps the attack surface so later testing is targeted. · _level: understand_
2. Before any penetration test, what is mandatory?
   - · A fast internet connection
   - **✔ Written authorisation and a defined scope**
   - · Root access on your own machine
   - · A paid tool
   - _Why:_ Testing without explicit authorisation is illegal; scope defines the permitted boundary. · _level: evaluate_
3. You scan an authorised host and the tool reports a critical issue. What should you do first?
   - · Publish it immediately
   - **✔ Validate the finding manually to confirm it is a real, exploitable issue**
   - · Wait a month
   - · Ignore it
   - _Why:_ Automated tools produce false positives; verify before reporting. · _level: analyze_

### Stage 4 — Defensive Security (3 questions)

1. What is a SIEM used for?
   - · Compiling code
   - **✔ Aggregating logs and correlating events to detect incidents**
   - · Hosting websites
   - · Encrypting disks
   - _Why:_ A SIEM centralises logs and correlates them to surface suspicious activity. · _level: understand_
2. What is the first priority when an active intrusion is confirmed?
   - · Reinstall everything immediately
   - **✔ Contain the threat to stop further damage**
   - · Notify the press
   - · Delete the logs
   - _Why:_ Containment limits damage before eradication and recovery. · _level: evaluate_
3. Why is preserving logs important during incident response?
   - · To free disk space
   - **✔ They provide the evidence needed to understand the scope and root cause**
   - · To speed the servers
   - · They are required for backups
   - _Why:_ Logs are evidence; altering them undermines the investigation. · _level: understand_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `cy-p1` (rubric rizw7jo-8)

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

### Stage 2 — project `cy-p2` (rubric rizw7jo-8)

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

### Stage 3 — project `cy-p3` (rubric rizw7jo-8)

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

### Stage 4 — project `cy-p4` (rubric rizw7jo-8)

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

### Stage 1 — Build: Home Network Audit

- **Objective:** Complete "Home Network Audit" to a standard you can show and explain to someone else.
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

### Stage 2 — Build: Vulnerable App Pentest

- **Objective:** Complete "Vulnerable App Pentest" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: CTF Write-ups

- **Objective:** Complete "CTF Write-ups" to a standard you can show and explain to someone else.
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

### Stage 4 — Portfolio project: Security Assessment Report

- **Objective:** Complete "Security Assessment Report" to a standard you can show and explain to someone else.
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

- **Stage 1:** Trace a request end to end. Step 1: resolve the hostname with `nslookup`. Step 2: capture the TCP handshake to port 443. Step 3: observe the TLS negotiation. Step 4: read the HTTP response. Annotate what each layer prov…
- **Stage 2:** Apply STRIDE to a login feature. Step 1: Spoofing — can an attacker impersonate a user? Step 2: Tampering — can the request be altered in flight? Step 3: Repudiation, Information disclosure, Denial of service, Elevation…
- **Stage 3:** Practise in an authorised lab. Step 1: define the scope and confirm written authorisation. Step 2: enumerate the target's services. Step 3: identify and exploit a known vulnerability to demonstrate impact. Step 4: docum…
- **Stage 4:** Harden a host. Step 1: disable services you do not need. Step 2: enforce least-privilege accounts. Step 3: enable logging for authentication and privilege changes. Step 4: configure one alert for a suspicious event and …

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 1 — required (L2): https://www.youtube.com/@NetworkChuck
- Stage 2 — required (L2): https://tryhackme.com/paths
- Stage 4 — required (L2): https://www.youtube.com/watch?v=pTvGrj3QOmU

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.3) **and** worthiness ≥ 90 (this track: 98.6).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

