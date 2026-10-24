# DevOps Engineering (`devops`)

Slug: `devops-engineering` · Category: grow · Stages: 5

## Stage 1 — Linux & Networking

**Objective:** Operate confidently on a Linux server and reason about networking.

**Success criteria:**
- Use core shell commands
- Explain DNS, HTTP and SSH
- Manage permissions

### Instruction

Everything in DevOps runs on Linux. Master the command line and networking before anything else.

OBJECTIVE
Operate confidently on a Linux server and reason about networking.

SUCCESS CRITERIA
• Use core shell commands
• Explain DNS, HTTP and SSH
• Manage permissions

WORKED EXAMPLE
Write a backup script. Step 1: check the source directory exists. Step 2: create a timestamped archive excluding temp files. Step 3: write a log line for the run. Step 4: exit non-zero on failure. Run it twice and confirm the second run is independent.

COMMON MISTAKES
• Running everything as root
• Giving world-writable permissions

### Worked example

Write a backup script. Step 1: check the source directory exists. Step 2: create a timestamped archive excluding temp files. Step 3: write a log line for the run. Step 4: exit non-zero on failure. Run it twice and confirm the second run is independent.

### Common mistakes
- Running everything as root
- Giving world-writable permissions

### Ungraded practice
**Practice: Linux & Networking**

DO THIS NOW
On a Linux VM or container, create a user, set file permissions, and start a service reachable over SSH.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which command changes a file's permissions?
   - chown
   - **✔ chmod**
   - chgrp
   - ls
   - _Answer:_ chmod · _Why:_ chmod changes permissions; chown changes ownership. · _Level:_ recall

2. What does DNS do?
   - Encrypts traffic
   - **✔ Resolves human-readable names to IP addresses**
   - Assigns file permissions
   - Compresses packets
   - _Answer:_ Resolves human-readable names to IP addresses · _Why:_ DNS maps domain names to IP addresses so browsers can find servers. · _Level:_ understand

3. You need to run an administrative command safely on a remote server. Why prefer SSH keys over passwords?
   - They are shorter
   - **✔ They are not guessable and do not travel over the network like a password**
   - They are required by Linux
   - They make commands faster
   - _Answer:_ They are not guessable and do not travel over the network like a password · _Why:_ Key-based SSH resists brute force and avoids sending reusable secrets over the network. · _Level:_ evaluate

### Phase project — Build: Containerise a Small App (`dv-p0`)

- **Objective:** Complete "Containerise a Small App" to a standard you can show and explain to someone else.
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
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Version Control & CI/CD

**Objective:** Use version control and build CI/CD pipelines.

**Success criteria:**
- Use branching workflows
- Write a CI workflow
- Explain the stages of a pipeline

### Instruction

Automate the process from code commit to production deployment.

OBJECTIVE
Use version control and build CI/CD pipelines.

SUCCESS CRITERIA
• Use branching workflows
• Write a CI workflow
• Explain the stages of a pipeline

WORKED EXAMPLE
Build a CI pipeline. Step 1: install dependencies and cache them. Step 2: lint and test on every push. Step 3: block the merge on failure. Step 4: add a status badge — then deliberately break a test and confirm the pipeline stops the merge.

COMMON MISTAKES
• Merging without automated checks
• Committing generated artifacts

### Worked example

Build a CI pipeline. Step 1: install dependencies and cache them. Step 2: lint and test on every push. Step 3: block the merge on failure. Step 4: add a status badge — then deliberately break a test and confirm the pipeline stops the merge.

### Common mistakes
- Merging without automated checks
- Committing generated artifacts

### Ungraded practice
**Practice: Version Control & CI/CD**

DO THIS NOW
Add a GitHub Actions workflow that installs dependencies and runs tests on every pull request, then explain what happens when a test fails.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is a CI pipeline primarily for?
   - Hosting the database
   - **✔ Automatically running checks such as tests before changes are merged or deployed**
   - Designing the UI
   - Writing documentation
   - _Answer:_ Automatically running checks such as tests before changes are merged or deployed · _Why:_ Continuous integration runs automated checks so problems are caught before merging. · _Level:_ understand

2. What is the main benefit of a pull-request workflow?
   - It slows releases
   - **✔ Changes are reviewed and tested in isolation before reaching the main branch**
   - It removes the need for tests
   - It hides history
   - _Answer:_ Changes are reviewed and tested in isolation before reaching the main branch · _Why:_ Reviewing isolated changes reduces defects reaching the main branch. · _Level:_ apply

3. Your CI passes but production still breaks after deploy. Which check is most likely missing?
   - Unit tests only
   - **✔ A staged deployment or smoke test against the deployed artifact**
   - More lint rules
   - A larger test suite in CI
   - _Answer:_ A staged deployment or smoke test against the deployed artifact · _Why:_ Passing unit tests does not prove the deployed build works; add a deploy-stage verification. · _Level:_ analyze

### Phase project — Build: Dockerized Application (`dv-p1`)

- **Objective:** Complete "Dockerized Application" to a standard you can show and explain to someone else.
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

## Stage 3 — Containers & Docker

**Objective:** Package and run applications with Docker.

**Success criteria:**
- Explain images and containers
- Write a Dockerfile
- Use Docker Compose for multi-service apps

### Instruction

Docker changed how software is packaged and deployed. Understanding containers is fundamental.

OBJECTIVE
Package and run applications with Docker.

SUCCESS CRITERIA
• Explain images and containers
• Write a Dockerfile
• Use Docker Compose for multi-service apps

WORKED EXAMPLE
Containerise a service. Step 1: write a multi-stage Dockerfile. Step 2: run as a non-root user and add a `.dockerignore`. Step 3: read all configuration from environment variables. Step 4: run it, then prove it starts on a clean machine using only the documented variables.

COMMON MISTAKES
• Baking secrets into the image
• Using a huge base image

### Worked example

Containerise a service. Step 1: write a multi-stage Dockerfile. Step 2: run as a non-root user and add a `.dockerignore`. Step 3: read all configuration from environment variables. Step 4: run it, then prove it starts on a clean machine using only the documented variables.

### Common mistakes
- Baking secrets into the image
- Using a huge base image

### Ungraded practice
**Practice: Containers & Docker**

DO THIS NOW
Write a Dockerfile for an app, build the image, run the container with an environment variable, and add a Compose file with a database service.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is the relationship between an image and a container?
   - They are identical
   - **✔ An image is a template; a container is a running instance of it**
   - A container builds an image
   - An image is a running process
   - _Answer:_ An image is a template; a container is a running instance of it · _Why:_ An image is the immutable template; containers are running instances created from it. · _Level:_ understand

2. What is Docker Compose for?
   - Compiling code
   - **✔ Defining and running multi-container applications with one command**
   - Editing images
   - Managing DNS
   - _Answer:_ Defining and running multi-container applications with one command · _Why:_ Compose describes multiple services and their configuration so they can run together. · _Level:_ understand

3. Why avoid `latest` as the only image tag in production?
   - It is slower
   - **✔ Deploys become non-reproducible because the underlying image can change**
   - It is deprecated
   - It cannot be pushed
   - _Answer:_ Deploys become non-reproducible because the underlying image can change · _Why:_ Pinning versions makes builds reproducible; `latest` can change silently. · _Level:_ evaluate

### Phase project — Build: CI/CD Pipeline (`dv-p2`)

- **Objective:** Complete "CI/CD Pipeline" to a standard you can show and explain to someone else.
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

## Stage 4 — Cloud & Orchestration

**Objective:** Understand cloud infrastructure and orchestration.

**Success criteria:**
- Explain cloud compute options
- Describe what Kubernetes manages
- Explain Infrastructure as Code

### Instruction

Learn the major concepts and at least one cloud provider deeply.

OBJECTIVE
Understand cloud infrastructure and orchestration.

SUCCESS CRITERIA
• Explain cloud compute options
• Describe what Kubernetes manages
• Explain Infrastructure as Code

WORKED EXAMPLE
Deploy to Kubernetes. Step 1: write deployment, service and config manifests. Step 2: add liveness and readiness probes. Step 3: set resource requests and limits. Step 4: add a horizontal autoscaler, kill a pod to show recovery, then load-test to trigger scaling.

COMMON MISTAKES
• Managing infrastructure by hand without version control
• Adopting Kubernetes before you need it

### Worked example

Deploy to Kubernetes. Step 1: write deployment, service and config manifests. Step 2: add liveness and readiness probes. Step 3: set resource requests and limits. Step 4: add a horizontal autoscaler, kill a pod to show recovery, then load-test to trigger scaling.

### Common mistakes
- Managing infrastructure by hand without version control
- Adopting Kubernetes before you need it

### Ungraded practice
**Practice: Cloud & Orchestration**

DO THIS NOW
Describe (or build) a small deployment using Terraform and explain what Kubernetes would add if you needed to scale.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What does Kubernetes primarily manage?
   - Source code
   - **✔ Containerised workloads across a cluster, including scaling and scheduling**
   - DNS records
   - CSS builds
   - _Answer:_ Containerised workloads across a cluster, including scaling and scheduling · _Why:_ Kubernetes orchestrates containers: scheduling, scaling, and self-healing across nodes. · _Level:_ understand

2. What does Infrastructure as Code (e.g. Terraform) give you?
   - A GUI for servers
   - **✔ Infrastructure defined in version-controlled files that can be reviewed and reproduced**
   - Faster programming languages
   - Cheaper storage only
   - _Answer:_ Infrastructure defined in version-controlled files that can be reviewed and reproduced · _Why:_ IaC makes infrastructure declarative, reviewable and reproducible. · _Level:_ understand

3. What is a key trade-off of serverless functions?
   - They cannot scale
   - **✔ Less operational overhead but constraints such as cold starts and execution limits**
   - They are always cheaper
   - They never fail
   - _Answer:_ Less operational overhead but constraints such as cold starts and execution limits · _Why:_ Serverless removes server management but introduces cold starts, timeouts and vendor limits. · _Level:_ analyze

### Phase project — Build: Kubernetes Orchestration & Autoscaling (`dv-p4`)

- **Objective:** Deploy the service to Kubernetes with proper configuration, scaling, and health management.
- **Problem:** A container runs on one host but the app must survive restarts, traffic spikes, and configuration changes.
- **Audience:** An engineering team standardising deployments on Kubernetes.
- **Required functionality:**
  - Deployment and Service manifests (or Helm chart)
  - ConfigMaps/Secrets separation
  - Liveness and readiness probes
  - Resource requests/limits
  - Horizontal Pod Autoscaler validated under load
- **Constraints:**
  - No secrets baked into images
  - Workload must be reachable only through the intended ingress
  - Must be reproducible from manifests
- **Acceptance criteria (brief):**
  - Pods recover automatically after being killed
  - The HPA scales under synthetic load and scales back down
  - Only the ingress exposes the service
- **Required evidence:**
  - Manifests/chart in a repository
  - Output of `kubectl get`/`describe` for the workload and HPA
  - A short load-test summary
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Pods recover automatically after being killed (weight 1)
  - The HPA scales under synthetic load and scales back down (weight 1)
  - Only the ingress exposes the service (weight 1)
- **Acceptance criteria (contract):**
  - Pods recover automatically after being killed
  - The HPA scales under synthetic load and scales back down
  - Only the ingress exposes the service

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — Monitoring & Security

**Objective:** Monitor systems and apply security hardening.

**Success criteria:**
- Instrument metrics and dashboards
- Set meaningful alerts
- Apply least-privilege hardening

### Instruction

Keeping systems healthy requires knowing when they are unhealthy. Monitoring is how you know before users do.

OBJECTIVE
Monitor systems and apply security hardening.

SUCCESS CRITERIA
• Instrument metrics and dashboards
• Set meaningful alerts
• Apply least-privilege hardening

WORKED EXAMPLE
Describe infrastructure as code. Step 1: define a network and a compute resource in code. Step 2: apply it. Step 3: change one parameter and re-apply to show the plan diff. Step 4: confirm no manual console changes were needed to reach the same state.

COMMON MISTAKES
• Alerting on symptoms with no threshold rationale
• Granting broad permissions by default

### Worked example

Describe infrastructure as code. Step 1: define a network and a compute resource in code. Step 2: apply it. Step 3: change one parameter and re-apply to show the plan diff. Step 4: confirm no manual console changes were needed to reach the same state.

### Common mistakes
- Alerting on symptoms with no threshold rationale
- Granting broad permissions by default

### Ungraded practice
**Practice: Monitoring & Security**

DO THIS NOW
Add metrics to a service, build a Grafana dashboard, and define one alert with a threshold you can justify.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is the relationship between Prometheus and Grafana?
   - They are the same tool
   - **✔ Prometheus collects and stores metrics; Grafana visualises them**
   - Grafana stores logs; Prometheus queries DNS
   - Both are databases
   - _Answer:_ Prometheus collects and stores metrics; Grafana visualises them · _Why:_ Prometheus is the metrics store; Grafana renders dashboards and alerts from it. · _Level:_ understand

2. Why does an alert need a justified threshold?
   - Thresholds must be integers
   - **✔ An unjustified threshold causes alert fatigue or missed incidents**
   - It is required by law
   - Alerts cannot be numeric
   - _Answer:_ An unjustified threshold causes alert fatigue or missed incidents · _Why:_ Thresholds should reflect what actually matters to users, or they become noise. · _Level:_ evaluate

3. Which is a least-privilege hardening step?
   - Granting all roles to every service
   - **✔ Giving each service only the permissions it needs**
   - Disabling logging
   - Sharing one admin account
   - _Answer:_ Giving each service only the permissions it needs · _Why:_ Least privilege limits blast radius if a component is compromised. · _Level:_ apply

### Phase project — Portfolio project: Monitoring Stack (`dv-p3`)

- **Objective:** Complete "Monitoring Stack" to a standard you can show and explain to someone else.
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
- 2 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
