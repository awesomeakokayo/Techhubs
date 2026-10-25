# Reviewer packet — DevOps Engineering

- **Track id:** `devops`  ·  **Slug:** `devops-engineering`  ·  **Category:** grow  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.1/100 · worthiness 98.2/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Linux & Networking | Operate confidently on a Linux server and reason about networking. | 4 to 5 weeks | 4 |
| 2 | Version Control & CI/CD | Use version control and build CI/CD pipelines. | 3 to 4 weeks | 4 |
| 3 | Containers & Docker | Package and run applications with Docker. | 4 to 5 weeks | 4 |
| 4 | Cloud & Orchestration | Understand cloud infrastructure and orchestration. | 4 to 6 weeks | 4 |
| 5 | Monitoring & Security | Monitor systems and apply security hardening. | 2 to 3 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 5.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 1 — Linux & Networking**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 5 — Monitoring & Security**: content-inspected required resources 2, objective-matching resources 0, playback-verified resources 0.
- **Stage 3 — Containers & Docker**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Linux & Networking

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Linux Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=ROjZy1WbCIA |
| Docker Overview | required | L3 | content-inspection | — | 0 | https://docs.docker.com/get-started/docker-overview/ |
| TechWorld with Nana | required | L2 | http-probe | — | 0 | https://www.youtube.com/@TechWorldwithNana |
- _L3 required evidence — Docker: “{ const container = $el; // The div with overflow const item = document.getElementById('sidebar-current-page') if (item) { const containerTop = container.scrollTop; const containerBottom = containerTop + container.clien…”_

### Stage 2 — Version Control & CI/CD

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Docker Get Started | required | L3 | content-inspection | — | 1 | https://docs.docker.com/get-started/ |
| GitHub Actions Docs | required | L3 | content-inspection | — | 0 | https://docs.github.com/en/actions |
- _L3 required evidence — Docker: “{ const container = $el; // The div with overflow const item = document.getElementById('sidebar-current-page') if (item) { const containerTop = container.scrollTop; const containerBottom = containerTop + container.clien…”_
- _L3 required evidence — GitHub: “GitHub Actions documentation Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, …”_

### Stage 3 — Containers & Docker

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Docker Docs — What is a container? | required | L3 | content-inspection | — | 2 | https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/ |
| Docker Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=fqMOX6JJhGo |
- _L3 required evidence — Docker Docs: “{ const container = $el; // The div with overflow const item = document.getElementById('sidebar-current-page') if (item) { const containerTop = container.scrollTop; const containerBottom = containerTop + container.clien…”_

### Stage 4 — Cloud & Orchestration

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| AWS Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=7HKot-brXFE |
| Kubernetes Tutorials | required | L3 | content-inspection | — | 0 | https://kubernetes.io/docs/tutorials |
| Terraform Learn | required | L3 | content-inspection | — | 2 | https://learn.hashicorp.com/terraform |
- _L3 required evidence — CNCF: “Tutorials This section of the Kubernetes documentation contains tutorials. A tutorial shows how to accomplish a goal that is larger than a single task . Typically a tutorial has several sections, each of which has a seq…”_
- _L3 required evidence — HashiCorp: “Overview Try HCP Terraform Sign up for HCP Terraform for free and start managing infrastructure with your team. Follow the tutorials Get Started Build, change, and destroy infrastructure with Terraform. Start here to le…”_

### Stage 5 — Monitoring & Security

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Prometheus & Grafana Setup Guide | required | L3 | content-inspection | — | 0 | https://grafana.com/docs/grafana/latest/getting-started/ |
| Linux Monitoring with Prometheus & Grafana | required | L3 | content-inspection | — | 0 | https://www.devopsness.com/blog/linux-system-monitoring-prometheus-grafana |
- _L3 required evidence — Grafana Labs: “Documentation Grafana documentation Introduction Get started with Grafana Open Source Enterprise Open source Get started with Grafana Open Source You can use Grafana Cloud to avoid installing, maintaining, and scaling y…”_
- _L3 required evidence — DevOpsNess: “Set up comprehensive Linux system monitoring using Prometheus and Grafana. Monitor CPU, memory, disk, network, and application metrics with beautiful dashboards. On this page Comprehensive system monitoring is essential…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 1 | Linux Full Course | L2 | not verified | not verified — review manually |
| 1 | TechWorld with Nana | L2 | not verified | not verified — review manually |
| 3 | Docker Full Course | L2 | not verified | not verified — review manually |
| 4 | AWS Full Course | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Linux & Networking (3 questions)

1. Which command changes a file's permissions?
   - · chown
   - **✔ chmod**
   - · chgrp
   - · ls
   - _Why:_ chmod changes permissions; chown changes ownership. · _level: recall_
2. What does DNS do?
   - · Encrypts traffic
   - **✔ Resolves human-readable names to IP addresses**
   - · Assigns file permissions
   - · Compresses packets
   - _Why:_ DNS maps domain names to IP addresses so browsers can find servers. · _level: understand_
3. You need to run an administrative command safely on a remote server. Why prefer SSH keys over passwords?
   - · They are shorter
   - **✔ They are not guessable and do not travel over the network like a password**
   - · They are required by Linux
   - · They make commands faster
   - _Why:_ Key-based SSH resists brute force and avoids sending reusable secrets over the network. · _level: evaluate_

### Stage 2 — Version Control & CI/CD (3 questions)

1. What is a CI pipeline primarily for?
   - · Hosting the database
   - **✔ Automatically running checks such as tests before changes are merged or deployed**
   - · Designing the UI
   - · Writing documentation
   - _Why:_ Continuous integration runs automated checks so problems are caught before merging. · _level: understand_
2. What is the main benefit of a pull-request workflow?
   - · It slows releases
   - **✔ Changes are reviewed and tested in isolation before reaching the main branch**
   - · It removes the need for tests
   - · It hides history
   - _Why:_ Reviewing isolated changes reduces defects reaching the main branch. · _level: apply_
3. Your CI passes but production still breaks after deploy. Which check is most likely missing?
   - · Unit tests only
   - **✔ A staged deployment or smoke test against the deployed artifact**
   - · More lint rules
   - · A larger test suite in CI
   - _Why:_ Passing unit tests does not prove the deployed build works; add a deploy-stage verification. · _level: analyze_

### Stage 3 — Containers & Docker (3 questions)

1. What is the relationship between an image and a container?
   - · They are identical
   - **✔ An image is a template; a container is a running instance of it**
   - · A container builds an image
   - · An image is a running process
   - _Why:_ An image is the immutable template; containers are running instances created from it. · _level: understand_
2. What is Docker Compose for?
   - · Compiling code
   - **✔ Defining and running multi-container applications with one command**
   - · Editing images
   - · Managing DNS
   - _Why:_ Compose describes multiple services and their configuration so they can run together. · _level: understand_
3. Why avoid `latest` as the only image tag in production?
   - · It is slower
   - **✔ Deploys become non-reproducible because the underlying image can change**
   - · It is deprecated
   - · It cannot be pushed
   - _Why:_ Pinning versions makes builds reproducible; `latest` can change silently. · _level: evaluate_

### Stage 4 — Cloud & Orchestration (3 questions)

1. What does Kubernetes primarily manage?
   - · Source code
   - **✔ Containerised workloads across a cluster, including scaling and scheduling**
   - · DNS records
   - · CSS builds
   - _Why:_ Kubernetes orchestrates containers: scheduling, scaling, and self-healing across nodes. · _level: understand_
2. What does Infrastructure as Code (e.g. Terraform) give you?
   - · A GUI for servers
   - **✔ Infrastructure defined in version-controlled files that can be reviewed and reproduced**
   - · Faster programming languages
   - · Cheaper storage only
   - _Why:_ IaC makes infrastructure declarative, reviewable and reproducible. · _level: understand_
3. What is a key trade-off of serverless functions?
   - · They cannot scale
   - **✔ Less operational overhead but constraints such as cold starts and execution limits**
   - · They are always cheaper
   - · They never fail
   - _Why:_ Serverless removes server management but introduces cold starts, timeouts and vendor limits. · _level: analyze_

### Stage 5 — Monitoring & Security (3 questions)

1. What is the relationship between Prometheus and Grafana?
   - · They are the same tool
   - **✔ Prometheus collects and stores metrics; Grafana visualises them**
   - · Grafana stores logs; Prometheus queries DNS
   - · Both are databases
   - _Why:_ Prometheus is the metrics store; Grafana renders dashboards and alerts from it. · _level: understand_
2. Why does an alert need a justified threshold?
   - · Thresholds must be integers
   - **✔ An unjustified threshold causes alert fatigue or missed incidents**
   - · It is required by law
   - · Alerts cannot be numeric
   - _Why:_ Thresholds should reflect what actually matters to users, or they become noise. · _level: evaluate_
3. Which is a least-privilege hardening step?
   - · Granting all roles to every service
   - **✔ Giving each service only the permissions it needs**
   - · Disabling logging
   - · Sharing one admin account
   - _Why:_ Least privilege limits blast radius if a component is compromised. · _level: apply_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `dv-p0` (rubric rizw7jo-8)

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

### Stage 2 — project `dv-p1` (rubric rizw7jo-8)

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

### Stage 3 — project `dv-p2` (rubric rizw7jo-8)

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

### Stage 4 — project `dv-p4` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Pods recover automatically after being killed | 1 | no |
| The HPA scales under synthetic load and scales back down | 1 | no |
| Only the ingress exposes the service | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 5 — project `dv-p3` (rubric rizw7jo-8)

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

### Stage 1 — Build: Containerise a Small App

- **Objective:** Complete "Containerise a Small App" to a standard you can show and explain to someone else.
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

### Stage 2 — Build: Dockerized Application

- **Objective:** Complete "Dockerized Application" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: CI/CD Pipeline

- **Objective:** Complete "CI/CD Pipeline" to a standard you can show and explain to someone else.
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

### Stage 4 — Build: Kubernetes Orchestration & Autoscaling

- **Objective:** Deploy the service to Kubernetes with proper configuration, scaling, and health management.
- **Problem:** A container runs on one host but the app must survive restarts, traffic spikes, and configuration changes.
- **Audience:** An engineering team standardising deployments on Kubernetes.
- **Required functionality:**
  - Deployment and Service manifests (or Helm chart)
  - ConfigMaps/Secrets separation
  - Liveness and readiness probes
  - Resource requests/limits
  - Horizontal Pod Autoscaler validated under load
- **Acceptance criteria:**
  - Pods recover automatically after being killed
  - The HPA scales under synthetic load and scales back down
  - Only the ingress exposes the service
- **Required evidence:**
  - Manifests/chart in a repository
  - Output of `kubectl get`/`describe` for the workload and HPA
  - A short load-test summary
- **Constraints:**
  - No secrets baked into images
  - Workload must be reachable only through the intended ingress
  - Must be reproducible from manifests

### Stage 5 — Portfolio project: Monitoring Stack

- **Objective:** Complete "Monitoring Stack" to a standard you can show and explain to someone else.
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

- **Stage 1:** Write a backup script. Step 1: check the source directory exists. Step 2: create a timestamped archive excluding temp files. Step 3: write a log line for the run. Step 4: exit non-zero on failure. Run it twice and confi…
- **Stage 2:** Build a CI pipeline. Step 1: install dependencies and cache them. Step 2: lint and test on every push. Step 3: block the merge on failure. Step 4: add a status badge — then deliberately break a test and confirm the pipe…
- **Stage 3:** Containerise a service. Step 1: write a multi-stage Dockerfile. Step 2: run as a non-root user and add a `.dockerignore`. Step 3: read all configuration from environment variables. Step 4: run it, then prove it starts o…
- **Stage 4:** Deploy to Kubernetes. Step 1: write deployment, service and config manifests. Step 2: add liveness and readiness probes. Step 3: set resource requests and limits. Step 4: add a horizontal autoscaler, kill a pod to show …
- **Stage 5:** Describe infrastructure as code. Step 1: define a network and a compute resource in code. Step 2: apply it. Step 3: change one parameter and re-apply to show the plan diff. Step 4: confirm no manual console changes were…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 1 — required (L2): https://www.youtube.com/watch?v=ROjZy1WbCIA
- Stage 1 — required (L2): https://www.youtube.com/@TechWorldwithNana
- Stage 3 — required (L2): https://www.youtube.com/watch?v=fqMOX6JJhGo
- Stage 4 — required (L2): https://www.youtube.com/watch?v=7HKot-brXFE

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.1) **and** worthiness ≥ 90 (this track: 98.2).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

