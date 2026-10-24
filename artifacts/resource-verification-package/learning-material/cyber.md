# Cybersecurity (`cyber`)

Slug: `cybersecurity` · Category: grow · Stages: 4

## Stage 1 — Networking Fundamentals

**Objective:** Understand how data moves across networks and where it can be observed.

**Success criteria:**
- Describe the OSI/TCP-IP layers
- Explain HTTPS, firewalls and proxies
- Capture traffic

### Instruction

You cannot protect what you do not understand. Network knowledge is the foundation of all security work.

OBJECTIVE
Understand how data moves across networks and where it can be observed.

SUCCESS CRITERIA
• Describe the OSI/TCP-IP layers
• Explain HTTPS, firewalls and proxies
• Capture traffic

WORKED EXAMPLE
Trace a request end to end. Step 1: resolve the hostname with `nslookup`. Step 2: capture the TCP handshake to port 443. Step 3: observe the TLS negotiation. Step 4: read the HTTP response. Annotate what each layer proves — against a host you own or are authorised to test.

COMMON MISTAKES
• Assuming HTTPS hides metadata such as destinations
• Confusing a firewall with antivirus

### Worked example

Trace a request end to end. Step 1: resolve the hostname with `nslookup`. Step 2: capture the TCP handshake to port 443. Step 3: observe the TLS negotiation. Step 4: read the HTTP response. Annotate what each layer proves — against a host you own or are authorised to test.

### Common mistakes
- Assuming HTTPS hides metadata such as destinations
- Confusing a firewall with antivirus

### Ungraded practice
**Practice: Networking Fundamentals**

DO THIS NOW
Capture traffic with Wireshark, then identify a DNS query, a TCP handshake, and a TLS handshake in the capture.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which OSI layer is responsible for logical addressing and routing between networks?
   - Data link
   - **✔ Network**
   - Transport
   - Application
   - _Answer:_ Network · _Why:_ The network layer handles logical addressing and routing (e.g. IP). · _Level:_ understand

2. What does HTTPS add over HTTP?
   - Compression only
   - **✔ TLS encryption and server authentication**
   - Faster downloads
   - Firewall rules
   - _Answer:_ TLS encryption and server authentication · _Why:_ HTTPS wraps HTTP in TLS, providing confidentiality and server identity. · _Level:_ understand

3. A firewall can see the destination IP and port but not the page contents. Why?
   - Because it is disabled
   - **✔ Because the payload is encrypted by TLS and the firewall is not a trusted endpoint**
   - Because DNS is broken
   - Because HTTP has no headers
   - _Answer:_ Because the payload is encrypted by TLS and the firewall is not a trusted endpoint · _Why:_ Without terminating TLS, a middle device sees only transport metadata, not encrypted contents. · _Level:_ analyze

### Phase project — Build: Home Network Audit (`cy-p1`)

- **Objective:** Complete "Home Network Audit" to a standard you can show and explain to someone else.
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
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Security Concepts

**Objective:** Apply core security principles and recognise common attack classes.

**Success criteria:**
- Explain the CIA triad
- Distinguish authentication from authorization
- Recognise OWASP Top 10 risks

### Instruction

Learn the language of security, attacks, defenses, and the frameworks professionals use.

OBJECTIVE
Apply core security principles and recognise common attack classes.

SUCCESS CRITERIA
• Explain the CIA triad
• Distinguish authentication from authorization
• Recognise OWASP Top 10 risks

WORKED EXAMPLE
Apply STRIDE to a login feature. Step 1: Spoofing — can an attacker impersonate a user? Step 2: Tampering — can the request be altered in flight? Step 3: Repudiation, Information disclosure, Denial of service, Elevation. Step 4: name one concrete control per category and the threat it removes.

COMMON MISTAKES
• Conflating authentication with authorization
• Thinking client-side validation is a security control

### Worked example

Apply STRIDE to a login feature. Step 1: Spoofing — can an attacker impersonate a user? Step 2: Tampering — can the request be altered in flight? Step 3: Repudiation, Information disclosure, Denial of service, Elevation. Step 4: name one concrete control per category and the threat it removes.

### Common mistakes
- Conflating authentication with authorization
- Thinking client-side validation is a security control

### Ungraded practice
**Practice: Security Concepts**

DO THIS NOW
For three OWASP Top 10 categories, write a one-line example attack and its primary mitigation.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does the CIA triad stand for?
   - Control, Integrity, Access
   - **✔ Confidentiality, Integrity, Availability**
   - Cryptography, Identity, Audit
   - Consent, Isolation, Authority
   - _Answer:_ Confidentiality, Integrity, Availability · _Why:_ The CIA triad is confidentiality, integrity and availability. · _Level:_ recall

2. What is the difference between authentication and authorization?
   - None
   - **✔ Authentication proves who you are; authorization decides what you may do**
   - Authorization proves identity; authentication grants access
   - Both are encryption
   - _Answer:_ Authentication proves who you are; authorization decides what you may do · _Why:_ Authentication establishes identity; authorization controls permissions. · _Level:_ understand

3. Which best prevents SQL injection?
   - Hiding the database name
   - **✔ Using parameterised queries / prepared statements**
   - Trusting the client to validate input
   - Adding more indexes
   - _Answer:_ Using parameterised queries / prepared statements · _Why:_ Parameterised queries separate code from data, preventing injected SQL. · _Level:_ apply

### Phase project — Build: Vulnerable App Pentest (`cy-p2`)

- **Objective:** Complete "Vulnerable App Pentest" to a standard you can show and explain to someone else.
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

## Stage 3 — Ethical Hacking

**Objective:** Perform authorised security testing using standard tools.

**Success criteria:**
- Plan a penetration test
- Use scanning and web-testing tools
- Respect scope and authorisation

### Instruction

Think like an attacker. This is how security professionals find and report vulnerabilities.

OBJECTIVE
Perform authorised security testing using standard tools.

SUCCESS CRITERIA
• Plan a penetration test
• Use scanning and web-testing tools
• Respect scope and authorisation

WORKED EXAMPLE
Practise in an authorised lab. Step 1: define the scope and confirm written authorisation. Step 2: enumerate the target's services. Step 3: identify and exploit a known vulnerability to demonstrate impact. Step 4: document the exact method and the remediation that closes it. Never test a system you do not have permission to test.

COMMON MISTAKES
• Testing systems without written authorisation
• Reporting a tool finding without validating it

### Worked example

Practise in an authorised lab. Step 1: define the scope and confirm written authorisation. Step 2: enumerate the target's services. Step 3: identify and exploit a known vulnerability to demonstrate impact. Step 4: document the exact method and the remediation that closes it. Never test a system you do not have permission to test.

### Common mistakes
- Testing systems without written authorisation
- Reporting a tool finding without validating it

### Ungraded practice
**Practice: Ethical Hacking**

DO THIS NOW
On an authorised practice target, perform reconnaissance, a vulnerability scan, and a web form test, and record findings.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is the purpose of reconnaissance?
   - Exploiting vulnerabilities immediately
   - **✔ Gathering information about the target before testing**
   - Reporting results
   - Cleaning logs
   - _Answer:_ Gathering information about the target before testing · _Why:_ Reconnaissance maps the attack surface so later testing is targeted. · _Level:_ understand

2. Before any penetration test, what is mandatory?
   - A fast internet connection
   - **✔ Written authorisation and a defined scope**
   - Root access on your own machine
   - A paid tool
   - _Answer:_ Written authorisation and a defined scope · _Why:_ Testing without explicit authorisation is illegal; scope defines the permitted boundary. · _Level:_ evaluate

3. You scan an authorised host and the tool reports a critical issue. What should you do first?
   - Publish it immediately
   - **✔ Validate the finding manually to confirm it is a real, exploitable issue**
   - Wait a month
   - Ignore it
   - _Answer:_ Validate the finding manually to confirm it is a real, exploitable issue · _Why:_ Automated tools produce false positives; verify before reporting. · _Level:_ analyze

### Phase project — Build: CTF Write-ups (`cy-p3`)

- **Objective:** Complete "CTF Write-ups" to a standard you can show and explain to someone else.
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

## Stage 4 — Defensive Security

**Objective:** Investigate incidents and harden systems defensively.

**Success criteria:**
- Analyse logs
- Use a SIEM conceptually
- Follow an incident response process

### Instruction

Offense teaches you how attacks work. Defense teaches you how to stop them.

OBJECTIVE
Investigate incidents and harden systems defensively.

SUCCESS CRITERIA
• Analyse logs
• Use a SIEM conceptually
• Follow an incident response process

WORKED EXAMPLE
Harden a host. Step 1: disable services you do not need. Step 2: enforce least-privilege accounts. Step 3: enable logging for authentication and privilege changes. Step 4: configure one alert for a suspicious event and then trigger it to confirm it fires.

COMMON MISTAKES
• Destroying evidence during response
• Monitoring logs without alerts or ownership

### Worked example

Harden a host. Step 1: disable services you do not need. Step 2: enforce least-privilege accounts. Step 3: enable logging for authentication and privilege changes. Step 4: configure one alert for a suspicious event and then trigger it to confirm it fires.

### Common mistakes
- Destroying evidence during response
- Monitoring logs without alerts or ownership

### Ungraded practice
**Practice: Defensive Security**

DO THIS NOW
Given a set of auth logs, identify the brute-force pattern, then outline containment, eradication and recovery steps.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is a SIEM used for?
   - Compiling code
   - **✔ Aggregating logs and correlating events to detect incidents**
   - Hosting websites
   - Encrypting disks
   - _Answer:_ Aggregating logs and correlating events to detect incidents · _Why:_ A SIEM centralises logs and correlates them to surface suspicious activity. · _Level:_ understand

2. What is the first priority when an active intrusion is confirmed?
   - Reinstall everything immediately
   - **✔ Contain the threat to stop further damage**
   - Notify the press
   - Delete the logs
   - _Answer:_ Contain the threat to stop further damage · _Why:_ Containment limits damage before eradication and recovery. · _Level:_ evaluate

3. Why is preserving logs important during incident response?
   - To free disk space
   - **✔ They provide the evidence needed to understand the scope and root cause**
   - To speed the servers
   - They are required for backups
   - _Answer:_ They provide the evidence needed to understand the scope and root cause · _Why:_ Logs are evidence; altering them undermines the investigation. · _Level:_ understand

### Phase project — Portfolio project: Security Assessment Report (`cy-p4`)

- **Objective:** Complete "Security Assessment Report" to a standard you can show and explain to someone else.
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
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
