/**
 * TechSkillHub — authored stage curriculum for the remaining tracks.
 *
 * This module completes knowledge-check coverage for the tracks that previously
 * had none. It follows the same rules as the core authored tracks in
 * `lib/curriculum.ts`:
 *   - questions test the concept a stage teaches, never publisher trivia;
 *   - every correct answer is defensible from the stage topics, the stage
 *     description, or the linked resources;
 *   - explanations teach the reasoning, not just the letter of the answer.
 *
 * It is merged into `STAGE_LEARNING_PLANS` there. Do not add a question that has
 * not been checked against the stage it belongs to.
 */

import type { StageLearningPlan } from './curriculum'
import type { QuizCognitiveLevel, QuizQuestion } from './guided-path'

function q(
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
  cognitiveLevel: QuizCognitiveLevel = 'understand',
): QuizQuestion {
  return { question, options, correctIndex, explanation, cognitiveLevel }
}

export const STAGE_LEARNING_PLANS_EXTENDED: Record<string, Record<number, StageLearningPlan>> = {
  // ───────────────────────── FULL-STACK ─────────────────────────
  fullstack: {
    1: {
      objective: 'Build and deploy a responsive frontend before you add a backend.',
      successCriteria: ['Build a responsive UI with React and Tailwind CSS', 'Deploy a working frontend to a hosting platform'],
      exercise: 'Deploy a small React + Tailwind page to Vercel, then open the live URL on a phone and fix any layout issues you find.',
      commonMistakes: ['Leaving deployment until the very end', 'Only testing on a desktop browser width'],
      knowledgeCheck: [
        q('What does Tailwind CSS primarily provide?', ['A component library you import', 'Utility-first CSS classes you compose in markup', 'A JavaScript state manager', 'A database layer'], 1, 'Tailwind is utility-first: small single-purpose classes composed directly in your markup.', 'understand'),
        q('How is Next.js best described relative to React?', ['A replacement for React', 'A framework that adds routing, rendering modes and build tooling on top of React', 'A CSS framework', 'A database ORM'], 1, 'Next.js builds on React and adds routing, server rendering, and production tooling.', 'understand'),
        q('A client-rendered app works in dev but returns 404 when you refresh a nested route after deploying. What is the most likely cause?', ['The database is offline', 'The host is missing a rewrite so unknown paths fall back to the app entry', 'Tailwind did not compile', 'React is not installed'], 1, 'Client-side routes need a fallback rewrite so deep links resolve to the app entry point.', 'analyze'),
      ],
    },
    2: {
      objective: 'Consolidate the backend skills you will connect to the frontend: APIs, databases and authentication.',
      successCriteria: ['Expose a REST API with correct status codes', 'Persist data in PostgreSQL', 'Authenticate requests'],
      exercise: 'Build a small REST API with one resource, a database model, and a protected route. Document the endpoints and how to run it.',
      commonMistakes: ['Storing secrets in source control', 'Trusting client input without server-side validation'],
      knowledgeCheck: [
        q('Which HTTP method is conventionally used to create a new resource?', ['GET', 'POST', 'DELETE', 'HEAD'], 1, 'POST creates a resource; the server typically returns 201 and the new resource.', 'recall'),
        q('What does a foreign key in PostgreSQL enforce?', ['Faster reads', 'That a referenced row exists in the related table', 'Alphabetical sorting', 'Password hashing'], 1, 'A foreign key enforces referential integrity between tables.', 'understand'),
        q('Where should a database password live in a deployed backend?', ['Hard-coded in the source', 'In an environment variable or secret manager', 'In the README', 'In a public repository'], 1, 'Secrets belong in environment variables or a secret manager, never in source control.', 'apply'),
      ],
    },
    3: {
      objective: 'Connect the frontend to the backend and handle authentication and errors end-to-end.',
      successCriteria: ['Call the API from the frontend', 'Handle auth across the stack', 'Handle loading, error and empty states'],
      exercise: 'Build a page that fetches from your API with loading, error and empty states, and one authenticated action. Explain how the token reaches the server.',
      commonMistakes: ['Ignoring failed requests', 'Assuming the client can be trusted for authorization'],
      knowledgeCheck: [
        q('A browser request to your API is blocked by CORS. What is the correct fix?', ['Disable the browser security', 'Configure the server to send the appropriate Access-Control-Allow-* headers for the allowed origin', 'Rename the endpoint', 'Use HTTP instead of HTTPS'], 1, 'CORS is enforced by the browser; the server must grant access with the correct response headers.', 'apply'),
        q('Where must an authorization decision be enforced for trust?', ['In the browser UI only', 'On the server for every request', 'In CSS', 'In the database client'], 1, 'The server is the trust boundary; client checks are only for user experience.', 'understand'),
        q('What is an optimistic UI update?', ['Updating the UI immediately and rolling back if the server request fails', 'Waiting for the server before showing anything', 'Never showing errors', 'Caching every response forever'], 0, 'Optimistic updates feel fast but must roll back when the server rejects the change.', 'apply'),
      ],
    },
    4: {
      objective: 'Deploy the frontend, backend and database together and manage configuration safely.',
      successCriteria: ['Deploy each part to a host', 'Manage environment variables', 'Connect a domain with HTTPS'],
      exercise: 'Deploy your frontend and backend, point the frontend at the deployed API, set environment variables, and put the app behind HTTPS on a custom domain.',
      commonMistakes: ['Sharing one database URL between development and production', 'Committing a populated .env file'],
      knowledgeCheck: [
        q('How should you keep production and development databases separate?', ['Use the same URL but different passwords', 'Use a separate DATABASE_URL per environment', 'Rely on table prefixes', 'Disable the database in development'], 1, 'Each environment must point at its own database via its own configuration.', 'apply'),
        q('Why serve the app over HTTPS?', ['It makes it faster', 'It encrypts traffic and verifies the server identity', 'It removes the need for authentication', 'It compresses images'], 1, 'HTTPS provides transport encryption and server identity, protecting credentials and data.', 'understand'),
        q('A deploy works locally but fails in production because an environment variable is missing. How do you prevent this?', ['Assume it will not happen', 'Validate required configuration on startup so the app fails fast with a clear message', 'Hard-code a fallback secret', 'Ignore the variable'], 1, 'Failing fast on missing configuration turns a silent production bug into a clear startup error.', 'analyze'),
      ],
    },
    5: {
      objective: 'Apply production patterns: billing, real-time features and background work.',
      successCriteria: ['Integrate a payment provider safely', 'Add a real-time or background feature', 'Reason about failure and retries'],
      exercise: 'Add a payment webhook that verifies the provider signature, then add one background job and explain how you handle a retry.',
      commonMistakes: ['Trusting a client-reported payment success', 'Running slow work inside the request cycle'],
      knowledgeCheck: [
        q('Why must a payment webhook signature be verified on the server?', ['To make it faster', 'To prove the notification genuinely came from the payment provider', 'To avoid storing data', 'To reduce cost'], 1, 'An unverified webhook can be forged, letting an attacker grant themselves paid access.', 'evaluate'),
        q('When should work be moved to a background job?', ['When it is quick and must block the response', 'When it is long-running or does not need to block the user response', 'Never', 'Only on the client'], 1, 'Long or non-urgent work belongs in the background so requests stay fast and reliable.', 'apply'),
        q('Why is idempotency important in payment handling?', ['It makes payments free', 'So retries do not charge or credit the same order twice', 'It speeds up the database', 'It encrypts the card'], 1, 'Webhooks and network retries can repeat an event; idempotent handling prevents duplicate effects.', 'analyze'),
      ],
    },
  },

  // ───────────────────────── DATA SCIENCE ─────────────────────────
  datascience: {
    1: {
      objective: 'Be able to clean, query and visualise a dataset before studying statistics and modelling.',
      successCriteria: ['Manipulate data with pandas', 'Query with SQL', 'Summarise and plot a dataset'],
      exercise: 'Load a CSV in pandas, clean missing values, compute a grouped summary, and plot one chart with labelled axes.',
      commonMistakes: ['Dropping rows with missing data without checking for bias', 'Reading numbers without context'],
      knowledgeCheck: [
        q('Which pandas object is a two-dimensional labelled table?', ['Series', 'DataFrame', 'ndarray', 'Index'], 1, 'A DataFrame is a 2D labelled data structure; a Series is one-dimensional.', 'recall'),
        q('Which SQL clause groups rows so an aggregate can be computed per group?', ['ORDER BY', 'GROUP BY', 'LIMIT', 'WHERE'], 1, 'GROUP BY forms groups that aggregate functions summarise.', 'understand'),
        q('A dataset of house prices has a few extremely expensive houses. Which summary best represents a typical price?', ['The mean', 'The median', 'The maximum', 'The range'], 1, 'The median is robust to outliers; a skewed mean is pulled up by the expensive houses.', 'apply'),
      ],
    },
    2: {
      objective: 'Understand the statistics and maths that underpin machine learning.',
      successCriteria: ['Describe common probability distributions', 'Explain what a gradient is', 'Interpret a hypothesis test correctly'],
      exercise: 'For one dataset, report a distribution summary, explain which distribution roughly fits it, and give one example of a correlation that is not causation.',
      commonMistakes: ['Treating a p-value as the probability the hypothesis is true', 'Assuming the mean works for skewed data'],
      knowledgeCheck: [
        q('A machine-learning model is trained by minimising a loss. What does the gradient tell the optimiser?', ['The exact minimum', 'The direction of steepest increase of the loss', 'The number of epochs', 'The size of the dataset'], 1, 'Gradient descent follows the negative gradient, which points in the direction of steepest increase.', 'understand'),
        q('A p-value of 0.03 means…', ['There is a 3% chance the hypothesis is true', 'Assuming the null hypothesis, data this extreme would occur about 3% of the time', 'The effect size is 3%', 'The result is definitely real'], 1, 'A p-value is the probability of the data under the null hypothesis, not the probability the hypothesis is true.', 'analyze'),
        q('Which distribution models the number of successes in a fixed number of independent yes/no trials?', ['Normal', 'Binomial', 'Uniform', 'Exponential'], 1, 'The binomial distribution counts successes across a fixed number of independent trials.', 'understand'),
      ],
    },
    3: {
      objective: 'Build and evaluate supervised and unsupervised models with scikit-learn.',
      successCriteria: ['Distinguish supervised from unsupervised learning', 'Evaluate a model honestly', 'Engineer useful features'],
      exercise: 'Train a classifier, evaluate it on a held-out test set, and report accuracy plus a confusion matrix. Explain one feature you engineered.',
      commonMistakes: ['Evaluating on the training data', 'Ignoring class imbalance when reading accuracy'],
      knowledgeCheck: [
        q('Which task is supervised learning?', ['Clustering customers with no labels', 'Predicting whether an email is spam from labelled examples', 'Reducing dimensions', 'Finding frequent itemsets'], 1, 'Supervised learning trains on labelled examples to predict an outcome.', 'understand'),
        q('Why hold out a test set?', ['To speed up training', 'To estimate performance on data the model has not seen', 'To make the model smaller', 'To avoid preprocessing'], 1, 'A held-out set gives an honest estimate of generalisation; training accuracy is optimistic.', 'apply'),
        q('A model scores 99% on training data and 62% on test data. What is happening?', ['Underfitting', 'Overfitting', 'Perfect generalisation', 'The test set is wrong'], 1, 'A large train/test gap indicates overfitting to the training data.', 'analyze'),
      ],
    },
    4: {
      objective: 'Understand neural networks and when deep learning is the right tool.',
      successCriteria: ['Explain what a neural network learns', 'Describe when CNNs or transfer learning apply', 'Train a small model'],
      exercise: 'Train a small neural network on images, then repeat with a pretrained model and compare results and training time.',
      commonMistakes: ['Using deep learning for small tabular problems where simpler models suffice', 'Training from scratch when transfer learning would work better'],
      knowledgeCheck: [
        q('For which task is a convolutional neural network (CNN) especially suited?', ['Tabular spreadsheets', 'Image recognition', 'Alphabetical sorting', 'Password hashing'], 1, 'CNNs exploit spatial structure and are designed for images.', 'understand'),
        q('What is transfer learning?', ['Copying a dataset', 'Reusing a model pre-trained on a large dataset and fine-tuning it for a new task', 'Moving a model to production', 'Compressing a model'], 1, 'Transfer learning reuses learned features, needing less data and compute for the new task.', 'understand'),
        q('What is an epoch?', ['One forward pass of a single example', 'One full pass through the training dataset', 'The learning rate', 'The final prediction'], 1, 'An epoch is one complete pass over the entire training set.', 'recall'),
      ],
    },
    5: {
      objective: 'Deploy and monitor models responsibly.',
      successCriteria: ['Serialize and serve a model', 'Expose predictions through an API', 'Monitor for drift'],
      exercise: 'Save a trained model, serve it behind a FastAPI endpoint, and describe what you would monitor after deployment.',
      commonMistakes: ['Assuming a model stays accurate forever', 'Shipping without recording the model version'],
      knowledgeCheck: [
        q('Why does a deployed model need monitoring?', ['To make it faster', 'Because input data and relationships drift over time, degrading predictions', 'To reduce storage', 'Because APIs require it'], 1, 'Data and concept drift erode accuracy; monitoring detects it so you can retrain.', 'evaluate'),
        q('What does an experiment-tracking tool such as MLflow record?', ['Only the final model', 'Parameters, metrics and artifacts for each training run', 'User passwords', 'CSS styles'], 1, 'Experiment tracking records runs so results are reproducible and comparable.', 'understand'),
        q('What must you capture to load a saved model later?', ['Only the accuracy', 'The serialized model plus its preprocessing and version', 'The dataset path only', 'The training font'], 1, 'A model is only reproducible with its serialized weights and the preprocessing/version it expects.', 'apply'),
      ],
    },
  },

  // ───────────────────────── DEVOPS ─────────────────────────
  devops: {
    1: {
      objective: 'Operate confidently on a Linux server and reason about networking.',
      successCriteria: ['Use core shell commands', 'Explain DNS, HTTP and SSH', 'Manage permissions'],
      exercise: 'On a Linux VM or container, create a user, set file permissions, and start a service reachable over SSH.',
      commonMistakes: ['Running everything as root', 'Giving world-writable permissions'],
      knowledgeCheck: [
        q('Which command changes a file\'s permissions?', ['chown', 'chmod', 'chgrp', 'ls'], 1, 'chmod changes permissions; chown changes ownership.', 'recall'),
        q('What does DNS do?', ['Encrypts traffic', 'Resolves human-readable names to IP addresses', 'Assigns file permissions', 'Compresses packets'], 1, 'DNS maps domain names to IP addresses so browsers can find servers.', 'understand'),
        q('You need to run an administrative command safely on a remote server. Why prefer SSH keys over passwords?', ['They are shorter', 'They are not guessable and do not travel over the network like a password', 'They are required by Linux', 'They make commands faster'], 1, 'Key-based SSH resists brute force and avoids sending reusable secrets over the network.', 'evaluate'),
      ],
    },
    2: {
      objective: 'Use version control and build CI/CD pipelines.',
      successCriteria: ['Use branching workflows', 'Write a CI workflow', 'Explain the stages of a pipeline'],
      exercise: 'Add a GitHub Actions workflow that installs dependencies and runs tests on every pull request, then explain what happens when a test fails.',
      commonMistakes: ['Merging without automated checks', 'Committing generated artifacts'],
      knowledgeCheck: [
        q('What is a CI pipeline primarily for?', ['Hosting the database', 'Automatically running checks such as tests before changes are merged or deployed', 'Designing the UI', 'Writing documentation'], 1, 'Continuous integration runs automated checks so problems are caught before merging.', 'understand'),
        q('What is the main benefit of a pull-request workflow?', ['It slows releases', 'Changes are reviewed and tested in isolation before reaching the main branch', 'It removes the need for tests', 'It hides history'], 1, 'Reviewing isolated changes reduces defects reaching the main branch.', 'apply'),
        q('Your CI passes but production still breaks after deploy. Which check is most likely missing?', ['Unit tests only', 'A staged deployment or smoke test against the deployed artifact', 'More lint rules', 'A larger test suite in CI'], 1, 'Passing unit tests does not prove the deployed build works; add a deploy-stage verification.', 'analyze'),
      ],
    },
    3: {
      objective: 'Package and run applications with Docker.',
      successCriteria: ['Explain images and containers', 'Write a Dockerfile', 'Use Docker Compose for multi-service apps'],
      exercise: 'Write a Dockerfile for an app, build the image, run the container with an environment variable, and add a Compose file with a database service.',
      commonMistakes: ['Baking secrets into the image', 'Using a huge base image'],
      knowledgeCheck: [
        q('What is the relationship between an image and a container?', ['They are identical', 'An image is a template; a container is a running instance of it', 'A container builds an image', 'An image is a running process'], 1, 'An image is the immutable template; containers are running instances created from it.', 'understand'),
        q('What is Docker Compose for?', ['Compiling code', 'Defining and running multi-container applications with one command', 'Editing images', 'Managing DNS'], 1, 'Compose describes multiple services and their configuration so they can run together.', 'understand'),
        q('Why avoid `latest` as the only image tag in production?', ['It is slower', 'Deploys become non-reproducible because the underlying image can change', 'It is deprecated', 'It cannot be pushed'], 1, 'Pinning versions makes builds reproducible; `latest` can change silently.', 'evaluate'),
      ],
    },
    4: {
      objective: 'Understand cloud infrastructure and orchestration.',
      successCriteria: ['Explain cloud compute options', 'Describe what Kubernetes manages', 'Explain Infrastructure as Code'],
      exercise: 'Describe (or build) a small deployment using Terraform and explain what Kubernetes would add if you needed to scale.',
      commonMistakes: ['Managing infrastructure by hand without version control', 'Adopting Kubernetes before you need it'],
      knowledgeCheck: [
        q('What does Kubernetes primarily manage?', ['Source code', 'Containerised workloads across a cluster, including scaling and scheduling', 'DNS records', 'CSS builds'], 1, 'Kubernetes orchestrates containers: scheduling, scaling, and self-healing across nodes.', 'understand'),
        q('What does Infrastructure as Code (e.g. Terraform) give you?', ['A GUI for servers', 'Infrastructure defined in version-controlled files that can be reviewed and reproduced', 'Faster programming languages', 'Cheaper storage only'], 1, 'IaC makes infrastructure declarative, reviewable and reproducible.', 'understand'),
        q('What is a key trade-off of serverless functions?', ['They cannot scale', 'Less operational overhead but constraints such as cold starts and execution limits', 'They are always cheaper', 'They never fail'], 1, 'Serverless removes server management but introduces cold starts, timeouts and vendor limits.', 'analyze'),
      ],
    },
    5: {
      objective: 'Monitor systems and apply security hardening.',
      successCriteria: ['Instrument metrics and dashboards', 'Set meaningful alerts', 'Apply least-privilege hardening'],
      exercise: 'Add metrics to a service, build a Grafana dashboard, and define one alert with a threshold you can justify.',
      commonMistakes: ['Alerting on symptoms with no threshold rationale', 'Granting broad permissions by default'],
      knowledgeCheck: [
        q('What is the relationship between Prometheus and Grafana?', ['They are the same tool', 'Prometheus collects and stores metrics; Grafana visualises them', 'Grafana stores logs; Prometheus queries DNS', 'Both are databases'], 1, 'Prometheus is the metrics store; Grafana renders dashboards and alerts from it.', 'understand'),
        q('Why does an alert need a justified threshold?', ['Thresholds must be integers', 'An unjustified threshold causes alert fatigue or missed incidents', 'It is required by law', 'Alerts cannot be numeric'], 1, 'Thresholds should reflect what actually matters to users, or they become noise.', 'evaluate'),
        q('Which is a least-privilege hardening step?', ['Granting all roles to every service', 'Giving each service only the permissions it needs', 'Disabling logging', 'Sharing one admin account'], 1, 'Least privilege limits blast radius if a component is compromised.', 'apply'),
      ],
    },
  },

  // ───────────────────────── CYBERSECURITY ─────────────────────────
  cyber: {
    1: {
      objective: 'Understand how data moves across networks and where it can be observed.',
      successCriteria: ['Describe the OSI/TCP-IP layers', 'Explain HTTPS, firewalls and proxies', 'Capture traffic'],
      exercise: 'Capture traffic with Wireshark, then identify a DNS query, a TCP handshake, and a TLS handshake in the capture.',
      commonMistakes: ['Assuming HTTPS hides metadata such as destinations', 'Confusing a firewall with antivirus'],
      knowledgeCheck: [
        q('Which OSI layer is responsible for logical addressing and routing between networks?', ['Data link', 'Network', 'Transport', 'Application'], 1, 'The network layer handles logical addressing and routing (e.g. IP).', 'understand'),
        q('What does HTTPS add over HTTP?', ['Compression only', 'TLS encryption and server authentication', 'Faster downloads', 'Firewall rules'], 1, 'HTTPS wraps HTTP in TLS, providing confidentiality and server identity.', 'understand'),
        q('A firewall can see the destination IP and port but not the page contents. Why?', ['Because it is disabled', 'Because the payload is encrypted by TLS and the firewall is not a trusted endpoint', 'Because DNS is broken', 'Because HTTP has no headers'], 1, 'Without terminating TLS, a middle device sees only transport metadata, not encrypted contents.', 'analyze'),
      ],
    },
    2: {
      objective: 'Apply core security principles and recognise common attack classes.',
      successCriteria: ['Explain the CIA triad', 'Distinguish authentication from authorization', 'Recognise OWASP Top 10 risks'],
      exercise: 'For three OWASP Top 10 categories, write a one-line example attack and its primary mitigation.',
      commonMistakes: ['Conflating authentication with authorization', 'Thinking client-side validation is a security control'],
      knowledgeCheck: [
        q('What does the CIA triad stand for?', ['Control, Integrity, Access', 'Confidentiality, Integrity, Availability', 'Cryptography, Identity, Audit', 'Consent, Isolation, Authority'], 1, 'The CIA triad is confidentiality, integrity and availability.', 'recall'),
        q('What is the difference between authentication and authorization?', ['None', 'Authentication proves who you are; authorization decides what you may do', 'Authorization proves identity; authentication grants access', 'Both are encryption'], 1, 'Authentication establishes identity; authorization controls permissions.', 'understand'),
        q('Which best prevents SQL injection?', ['Hiding the database name', 'Using parameterised queries / prepared statements', 'Trusting the client to validate input', 'Adding more indexes'], 1, 'Parameterised queries separate code from data, preventing injected SQL.', 'apply'),
      ],
    },
    3: {
      objective: 'Perform authorised security testing using standard tools.',
      successCriteria: ['Plan a penetration test', 'Use scanning and web-testing tools', 'Respect scope and authorisation'],
      exercise: 'On an authorised practice target, perform reconnaissance, a vulnerability scan, and a web form test, and record findings.',
      commonMistakes: ['Testing systems without written authorisation', 'Reporting a tool finding without validating it'],
      knowledgeCheck: [
        q('What is the purpose of reconnaissance?', ['Exploiting vulnerabilities immediately', 'Gathering information about the target before testing', 'Reporting results', 'Cleaning logs'], 1, 'Reconnaissance maps the attack surface so later testing is targeted.', 'understand'),
        q('Before any penetration test, what is mandatory?', ['A fast internet connection', 'Written authorisation and a defined scope', 'Root access on your own machine', 'A paid tool'], 1, 'Testing without explicit authorisation is illegal; scope defines the permitted boundary.', 'evaluate'),
        q('You scan an authorised host and the tool reports a critical issue. What should you do first?', ['Publish it immediately', 'Validate the finding manually to confirm it is a real, exploitable issue', 'Wait a month', 'Ignore it'], 1, 'Automated tools produce false positives; verify before reporting.', 'analyze'),
      ],
    },
    4: {
      objective: 'Investigate incidents and harden systems defensively.',
      successCriteria: ['Analyse logs', 'Use a SIEM conceptually', 'Follow an incident response process'],
      exercise: 'Given a set of auth logs, identify the brute-force pattern, then outline containment, eradication and recovery steps.',
      commonMistakes: ['Destroying evidence during response', 'Monitoring logs without alerts or ownership'],
      knowledgeCheck: [
        q('What is a SIEM used for?', ['Compiling code', 'Aggregating logs and correlating events to detect incidents', 'Hosting websites', 'Encrypting disks'], 1, 'A SIEM centralises logs and correlates them to surface suspicious activity.', 'understand'),
        q('What is the first priority when an active intrusion is confirmed?', ['Reinstall everything immediately', 'Contain the threat to stop further damage', 'Notify the press', 'Delete the logs'], 1, 'Containment limits damage before eradication and recovery.', 'evaluate'),
        q('Why is preserving logs important during incident response?', ['To free disk space', 'They provide the evidence needed to understand the scope and root cause', 'To speed the servers', 'They are required for backups'], 1, 'Logs are evidence; altering them undermines the investigation.', 'understand'),
      ],
    },
  },

  // ───────────────────────── MOBILE ─────────────────────────
  mobile: {
    1: {
      objective: 'Confirm the prerequisites for mobile development and understand mobile UI constraints.',
      successCriteria: ['Choose React Native or Flutter', 'Apply mobile UI basics', 'Set up a device simulator'],
      exercise: 'Install a simulator/emulator, run the default app, and identify three mobile UI constraints (touch target size, thumb reach, safe areas).',
      commonMistakes: ['Designing desktop-sized layouts for a phone', 'Ignoring platform conventions'],
      knowledgeCheck: [
        q('React Native builds on knowledge of which technology?', ['Dart', 'JavaScript and React', 'Swift only', 'Kotlin only'], 1, 'React Native uses JavaScript/React; Flutter uses Dart.', 'recall'),
        q('What is the minimum recommended size for a tappable mobile control (per platform guidance)?', ['About 12pt', 'About 44–48pt', 'About 8pt', 'Any size works'], 1, 'Roughly 44–48 logical points ensures controls are reliably tappable.', 'understand'),
        q('Why must layouts respect safe areas?', ['For faster rendering', 'So content is not hidden by notches, rounded corners or system bars', 'To reduce data usage', 'To enable dark mode'], 1, 'Safe-area insets keep content visible around system UI elements.', 'apply'),
      ],
    },
    2: {
      objective: 'Build screens with navigation, state and device APIs.',
      successCriteria: ['Navigate between screens', 'Manage state', 'Use a device API with permission'],
      exercise: 'Build a two-screen app with navigation, shared state, and one device API (camera or location) that requests permission and handles denial.',
      commonMistakes: ['Blocking the UI thread with heavy work', 'Forgetting to handle permission denial'],
      knowledgeCheck: [
        q('What is React Navigation used for in React Native?', ['State management', 'Moving between screens and managing the navigation stack', 'Styling', 'Database access'], 1, 'React Navigation handles screen transitions and the navigation stack.', 'recall'),
        q('A user denies a camera permission. What should the app do?', ['Crash', 'Show a clear explanation and a fallback or a link to settings', 'Pretend it was granted', 'Retry in a loop'], 1, 'Handle denial gracefully with explanation and a path forward.', 'apply'),
        q('Why manage state with a dedicated solution instead of many component states?', ['It looks better', 'To keep shared data consistent and avoid prop drilling across screens', 'To reduce bundle size', 'Because React forbids useState'], 1, 'Centralised state keeps data consistent across screens and simplifies sharing.', 'understand'),
      ],
    },
    3: {
      objective: 'Add backend services with Firebase.',
      successCriteria: ['Set up authentication', 'Store and read data', 'Use storage and notifications'],
      exercise: 'Add email/password auth and persist a small list of items to a cloud database, then read it back on relaunch.',
      commonMistakes: ['Leaving database rules open', 'Storing sensitive data in the client'],
      knowledgeCheck: [
        q('What does Firebase Authentication provide?', ['A database', 'Managed sign-in and identity, including providers like email and Google', 'A CSS framework', 'A build tool'], 1, 'Firebase Auth handles sign-in flows and identity tokens.', 'understand'),
        q('Why are permissive Firebase database rules dangerous?', ['They slow queries', 'They can expose or allow modification of all data to any client', 'They break authentication', 'They cost more'], 1, 'Open rules let anyone read or write data; rules must enforce access.', 'evaluate'),
        q('What is required before an app can show push notifications on iOS?', ['Nothing', 'Requesting and receiving the user\'s permission', 'A paid database', 'Disabling Wi-Fi'], 1, 'iOS requires explicit user permission before push notifications are shown.', 'apply'),
      ],
    },
    4: {
      objective: 'Publish a polished app to the stores.',
      successCriteria: ['Prepare store listings', 'Produce icons and splash screens', 'Optimise performance'],
      exercise: 'Prepare a store listing with screenshots, an icon set and a splash screen, and profile the app to fix one slow list.',
      commonMistakes: ['Submitting without testing on real devices', 'Skipping required store metadata'],
      knowledgeCheck: [
        q('What must you provide for both App Store and Play Store submissions?', ['Only source code', 'An icon, screenshots, a description and required metadata', 'A domain name', 'A database'], 1, 'Both stores require visual assets and complete metadata before review.', 'recall'),
        q('A long list scrolls slowly. Which is the most appropriate first fix?', ['Add animations', 'Virtualise/recycle the list so only visible items render', 'Increase the font size', 'Add more images'], 1, 'Virtualisation renders only visible rows, keeping scrolling smooth.', 'apply'),
        q('Which is a real publishing risk?', ['Testing on one device', 'Store review rejecting the app for policy or completeness issues', 'Using an icon', 'Supporting dark mode'], 1, 'Store review can reject apps for policy violations or incomplete metadata.', 'understand'),
      ],
    },
  },

  // ───────────────────────── VIDEO EDITING ─────────────────────────
  video: {
    1: {
      objective: 'Cut a clean timeline with correct audio and export settings.',
      successCriteria: ['Assemble a timeline', 'Use cut types deliberately', 'Export a correct file'],
      exercise: 'Edit a 60-second sequence using at least one J-cut and one L-cut, balance the audio, and export at the settings a platform expects.',
      commonMistakes: ['Editing audio after picture', 'Exporting at the wrong resolution or bitrate'],
      knowledgeCheck: [
        q('What is a J-cut?', ['A hard cut', 'Audio from the next clip starts before its picture', 'A cut with no transition', 'A cut to black'], 1, 'In a J-cut the incoming audio leads the incoming video (the audio shape resembles a J).', 'understand'),
        q('Why level audio before final export?', ['It changes the video resolution', 'So dialogue is consistently audible and nothing clips or is buried', 'It reduces file size', 'It adds captions'], 1, 'Consistent audio levels keep speech intelligible across the edit.', 'apply'),
        q('A video looks soft after upload even though it looked sharp locally. What is the most likely cause?', ['The camera lens', 'Export settings (resolution/bitrate) too low for the platform', 'Too much colour grading', 'The music choice'], 1, 'Under-spec export settings, or platform re-encoding, can soften a video.', 'analyze'),
      ],
    },
    2: {
      objective: 'Structure an edit so viewers stay to the end.',
      successCriteria: ['Apply story structure', 'Pace for the format', 'Use music purposefully'],
      exercise: 'Re-edit your sequence to improve pacing: tighten the opening and align a music change with a story beat.',
      commonMistakes: ['Slow openings that lose viewers', 'Music that fights the dialogue'],
      knowledgeCheck: [
        q('What is the purpose of a strong opening in a short video?', ['To list credits', 'To earn the viewer\'s attention in the first seconds', 'To show the title only', 'To increase the file size'], 1, 'Retention depends on giving viewers a reason to keep watching immediately.', 'apply'),
        q('Pacing for a 60-second short compared with a 15-minute video should generally be…', ['Identical', 'Faster and denser, with quicker cuts', 'Much slower', 'Unchanged by format'], 1, 'Short-form needs a higher information and cut rate to hold attention.', 'understand'),
        q('When should music be adjusted?', ['Never', 'At story beats so it supports rather than fights the narrative', 'Only at the end', 'To hide bad audio'], 1, 'Aligning music to beats reinforces pacing and emotion.', 'apply'),
      ],
    },
    3: {
      objective: 'Add professional colour, graphics and sound.',
      successCriteria: ['Correct and grade colour', 'Add clear titles and graphics', 'Design basic sound'],
      exercise: 'Add a colour correction pass, a lower third, and sound effects that emphasise two key moments.',
      commonMistakes: ['Grading before correcting exposure/white balance', 'Overusing effects that distract'],
      knowledgeCheck: [
        q('What is the difference between colour correction and colour grading?', ['None', 'Correction fixes exposure and white balance; grading applies a creative look', 'Grading is only for photos', 'Correction is only for audio'], 1, 'Correction makes footage technically neutral; grading adds a creative grade.', 'understand'),
        q('What is a lower third?', ['A crop of the bottom of the frame', 'A text graphic in the lower portion naming a speaker or place', 'A type of transition', 'A music track'], 1, 'A lower third identifies a person or location in the lower part of the frame.', 'recall'),
        q('Sound design in editing primarily…', ['Replaces dialogue', 'Reinforces on-screen action and mood with effects and ambience', 'Increases resolution', 'Removes the need for music'], 1, 'Sound design heightens impact and presence through effects and ambience.', 'understand'),
      ],
    },
    4: {
      objective: 'Adapt edits to each platform\'s format and audience.',
      successCriteria: ['Edit for long-form', 'Edit for Shorts/Reels', 'Add captions'],
      exercise: 'Cut the same footage into a 9:16 short with captions and a 16:9 long-form segment, explaining the differences.',
      commonMistakes: ['Reusing a landscape edit unchanged for vertical', 'Omitting captions on sound-off platforms'],
      knowledgeCheck: [
        q('Which aspect ratio is standard for mobile Shorts and Reels?', ['16:9', '9:16', '4:3', '1:1'], 1, 'Vertical short-form uses 9:16.', 'recall'),
        q('Why add captions to social video?', ['To increase file size', 'Much of viewing happens with sound off, so captions preserve comprehension', 'They are required by law in all countries', 'To replace the audio'], 1, 'Captions keep the message accessible when audio is muted.', 'apply'),
        q('Longer videos often retain viewers better when they…', ['Start slowly', 'Deliver on a clear promise with a coherent structure', 'Hide the topic', 'Use no chapters'], 1, 'A clear promise and coherent structure sustain long-form retention.', 'understand'),
      ],
    },
  },

  // ───────────────────────── YOUTUBE AUTOMATION ─────────────────────────
  youtube: {
    1: {
      objective: 'Choose a viable channel niche and define a clear proposition.',
      successCriteria: ['Research demand and competition', 'Define the audience', 'Set up branding'],
      exercise: 'Pick a niche, analyse three competitors, and write a one-sentence channel proposition naming the viewer and the problem it solves.',
      commonMistakes: ['Choosing a niche with no evidence of demand', 'Copying a competitor exactly'],
      knowledgeCheck: [
        q('What should guide niche selection?', ['Your favourite colour', 'Evidence of viewer demand and a gap you can serve differently', 'The number of editors you know', 'Random choice'], 1, 'A viable niche needs demand plus a defensible angle.', 'apply'),
        q('Competitor analysis is most useful for…', ['Copying their videos', 'Finding what works, what is missing, and where you can differ', 'Reporting them', 'Downloading their assets'], 1, 'Analysis reveals demand signals and gaps to differentiate.', 'understand'),
        q('Why does a clear channel proposition matter?', ['It increases upload speed', 'It helps the right viewers understand instantly why they should subscribe', 'It is required by YouTube', 'It reduces rendering time'], 1, 'A clear proposition aligns content, packaging and audience expectations.', 'evaluate'),
      ],
    },
    2: {
      objective: 'Produce content efficiently while keeping quality and originality.',
      successCriteria: ['Write a script with a hook', 'Source footage and voice responsibly', 'Design a thumbnail'],
      exercise: 'Write a 5-minute script with a strong hook, source footage, and design a matching thumbnail that sets an accurate expectation.',
      commonMistakes: ['Weak hooks', 'Thumbnails that promise something the video does not deliver'],
      knowledgeCheck: [
        q('What is a hook?', ['A background music track', 'The opening that earns the viewer\'s attention and sets the promise', 'A type of thumbnail', 'A monetisation tool'], 1, 'The hook is the opening that gives viewers a reason to keep watching.', 'understand'),
        q('When using an AI voiceover for realistic narration, you should…', ['Hide that it is synthetic', 'Follow the platform\'s current disclosure rules', 'Always avoid AI', 'Speed it up to 2x'], 1, 'Platforms require disclosure of realistic synthetic media; follow current policy.', 'evaluate'),
        q('A good thumbnail primarily…', ['Shows the full script', 'Communicates the promise clearly and honestly at a glance', 'Uses as many colours as possible', 'Is text-only'], 1, 'Thumbnails should communicate the promise clearly and honestly to earn the click.', 'apply'),
      ],
    },
    3: {
      objective: 'Grow through packaging and analytics rather than hoping for luck.',
      successCriteria: ['Apply SEO basics', 'Optimise titles and thumbnails', 'Read analytics honestly'],
      exercise: 'Take one existing video, rewrite the title and thumbnail, publish the change, and record the change in click-through rate over two weeks.',
      commonMistakes: ['Chasing views over watch time', 'Changing metadata without recording the result'],
      knowledgeCheck: [
        q('Which metric best reflects whether viewers watch the video?', ['Impressions', 'Average view duration / retention', 'Subscriber count', 'Number of uploads'], 1, 'Retention and average view duration show whether viewers actually watch.', 'understand'),
        q('A video has many impressions but low click-through rate. What should you test first?', ['The title and thumbnail', 'The audio bitrate', 'The upload time only', 'The video length only'], 0, 'Low CTR with strong impressions usually points to packaging (title/thumbnail).', 'analyze'),
        q('Why is a consistent upload schedule useful?', ['It is required by YouTube', 'It builds viewer expectation and gives you comparable performance data', 'It increases video quality', 'It avoids competition'], 1, 'Consistency sets audience expectations and makes analytics comparable.', 'apply'),
      ],
    },
    4: {
      objective: 'Understand realistic monetisation paths.',
      successCriteria: ['Explain the Partner Program', 'Evaluate sponsorships and affiliates', 'Assess digital products'],
      exercise: 'For a sample channel, compare the revenue potential of the Partner Program, one affiliate, and one digital product, noting the assumptions.',
      commonMistakes: ['Assuming monetisation starts immediately', 'Accepting sponsors that conflict with audience trust'],
      knowledgeCheck: [
        q('What does the YouTube Partner Program primarily require?', ['A website', 'Meeting watch-time/subscriber thresholds and policy compliance', 'A paid subscription', 'A business licence'], 1, 'The YPP has eligibility thresholds and policy requirements before ad revenue.', 'understand'),
        q('Why disclose a paid sponsorship?', ['To increase views', 'It is required and it preserves audience trust', 'To reduce taxes', 'Because sponsors ask only sometimes'], 1, 'Disclosure is required by rules and protects trust.', 'evaluate'),
        q('Affiliate marketing income depends most on…', ['Your upload count', 'Conversions from qualified traffic you send', 'Your subscriber count alone', 'Video length'], 1, 'Affiliate revenue comes from conversions, not raw view counts.', 'analyze'),
      ],
    },
  },

  // ───────────────────────── DIGITAL MARKETING ─────────────────────────
  marketing: {
    1: {
      objective: 'Frame marketing work around the customer journey and a target audience.',
      successCriteria: ['Map the customer journey', 'Define a target audience', 'Choose meaningful metrics'],
      exercise: 'Map the awareness-to-purchase journey for one product and define one metric you would watch at each stage.',
      commonMistakes: ['Targeting "everyone"', 'Measuring vanity metrics with no link to revenue'],
      knowledgeCheck: [
        q('What is the customer journey?', ['The delivery route', 'The stages a customer passes through from awareness to purchase and beyond', 'The company org chart', 'The product roadmap'], 1, 'The customer journey describes awareness, consideration, purchase and retention stages.', 'understand'),
        q('Why is a specific target audience important?', ['To make ads cheaper', 'Because a message that speaks to everyone persuades no one', 'It is required by law', 'To shorten the sales cycle'], 1, 'Clear segmentation lets the message resonate with a defined group.', 'evaluate'),
        q('Which is the most useful marketing metric?', ['Number of likes', 'Cost per acquisition relative to customer value', 'Total page views', 'Number of posts'], 1, 'Metrics tied to acquisition cost and customer value guide decisions.', 'analyze'),
      ],
    },
    2: {
      objective: 'Execute across the core organic channels.',
      successCriteria: ['Apply SEO basics', 'Plan social and content', 'Write for email and copy'],
      exercise: 'Create a one-month organic content plan across SEO, social and email, each with one measurable goal.',
      commonMistakes: ['Publishing without a keyword or audience target', 'Treating email as spam rather than a valued list'],
      knowledgeCheck: [
        q('On-page SEO primarily involves…', ['Buying backlinks', 'Optimising content and structure for the topics users search', 'Changing your hosting', 'Posting daily'], 1, 'On-page SEO aligns page content and structure with search intent.', 'understand'),
        q('Why is an email list valuable?', ['It is free to grow infinitely', 'You own the channel and can reach subscribers directly', 'It replaces all other channels', 'It guarantees sales'], 1, 'An owned list lets you reach an interested audience directly.', 'understand'),
        q('A headline job in copywriting is to…', ['List every feature', 'Get the right reader to continue reading', 'Use as many keywords as possible', 'Be as long as possible'], 1, 'Headlines earn attention so the body can persuade.', 'apply'),
      ],
    },
    3: {
      objective: 'Plan and run paid campaigns with intent and budget discipline.',
      successCriteria: ['Use search and social ads appropriately', 'Target and segment', 'Manage budget and costs'],
      exercise: 'Draft a search campaign for a high-intent keyword and a social campaign for awareness, with a budget and a target cost per result.',
      commonMistakes: ['Running ads without a conversion goal', 'Scaling spend before the funnel converts'],
      knowledgeCheck: [
        q('Search ads are strongest when…', ['The audience is unaware of the product', 'The user has clear intent and is actively searching', 'You have no budget', 'You want brand awareness only'], 1, 'Search captures existing intent; it works well for high-intent queries.', 'understand'),
        q('Which metric shows the cost to acquire one customer?', ['CPM', 'CPA (cost per acquisition)', 'CTR', 'Impressions'], 1, 'CPA measures spend per acquisition and connects ads to outcomes.', 'recall'),
        q('A campaign spends its budget with no conversions. What should you check first?', ['Increase budget', 'Whether the landing page and tracking are working', 'Change the logo', 'Post more on social'], 1, 'Before scaling, verify the funnel converts and conversions are tracked.', 'analyze'),
      ],
    },
    4: {
      objective: 'Measure and improve performance with analytics and experiments.',
      successCriteria: ['Use GA4 conceptually', 'Track conversions', 'Run and read an A/B test'],
      exercise: 'Define one conversion event, set up tracking conceptually, and design an A/B test with a hypothesis and success metric.',
      commonMistakes: ['Calling a test early', 'Tracking page views instead of conversions'],
      knowledgeCheck: [
        q('What is conversion tracking?', ['Counting website visits', 'Recording when users complete a desired action such as a purchase or signup', 'Measuring page load time', 'Counting social followers'], 1, 'Conversion tracking records completions of the actions that matter.', 'understand'),
        q('Why should you not stop an A/B test the moment one variant leads?', ['It costs money', 'Early results can be noise; the result may not be statistically meaningful', 'It is against the rules', 'It slows the site'], 1, 'Testing only until a favourable result appears produces false conclusions.', 'evaluate'),
        q('Which is a well-formed A/B test hypothesis?', ['"The new design is better"', '"Changing the button colour from grey to green will increase signups because contrast draws attention"', '"Let us try something"', '"Users prefer blue"'], 1, 'A good hypothesis states the change, the expected effect and the reason.', 'apply'),
      ],
    },
  },

  // ───────────────────────── AI FOR WORK ─────────────────────────
  ai: {
    1: {
      objective: 'Choose AI tools based on what they can and cannot do.',
      successCriteria: ['Explain what an LLM is', 'Identify limitations', 'Choose when not to use AI'],
      exercise: 'For three tasks, decide whether an LLM, a traditional tool, or a person is best, and justify each choice in one sentence.',
      commonMistakes: ['Trusting fluent output as fact', 'Using AI for tasks needing current, verifiable data without verification'],
      knowledgeCheck: [
        q('What is a large language model fundamentally doing when it responds?', ['Looking up a stored answer', 'Predicting likely next text tokens from patterns learned in training', 'Searching the live web by default', 'Running your code'], 1, 'LLMs generate text by predicting likely continuations from training patterns.', 'understand'),
        q('A model states a confident statistic with no source. What should you assume?', ['It is correct', 'It may be a hallucination and must be verified', 'It came from a trusted database', 'It cannot be wrong'], 1, 'Fluent confidence is not evidence; verify claims, especially numbers.', 'evaluate'),
        q('When is a traditional tool better than an LLM?', ['Writing a poem', 'Calculating a precise, auditable result', 'Brainstorming names', 'Summarising a document'], 1, 'For exact, auditable computation, use deterministic tools.', 'apply'),
      ],
    },
    2: {
      objective: 'Write instructions that produce reliable results.',
      successCriteria: ['Use few-shot examples', 'Apply step-by-step reasoning', 'Set role and constraints'],
      exercise: 'Write a prompt with a role, a clear task, constraints and two examples, then improve it after seeing a weak first result.',
      commonMistakes: ['Vague prompts', 'Assuming one attempt is the final word'],
      knowledgeCheck: [
        q('What is few-shot prompting?', ['Repeating the same request', 'Providing a few examples of the desired input/output in the prompt', 'Running the prompt many times', 'Using a paid model'], 1, 'Few-shot prompting demonstrates the desired pattern with examples.', 'understand'),
        q('Why ask a model to reason step by step on a complex task?', ['It is faster', 'It often improves accuracy on multi-step problems', 'It reduces cost', 'It hides errors'], 1, 'Explicit reasoning steps help models avoid jumping to a wrong answer.', 'apply'),
        q('What is the role of a system prompt?', ['To store the answer', 'To set persistent instructions and persona that shape all responses', 'To log usage', 'To encrypt output'], 1, 'A system prompt sets durable context and behaviour for the model.', 'understand'),
      ],
    },
    3: {
      objective: 'Apply AI effectively within your own field.',
      successCriteria: ['Use coding assistants safely', 'Use AI for design/analysis', 'Verify domain output'],
      exercise: 'Use a coding or analysis assistant on a small real task, then verify its output and note one thing it got wrong or missed.',
      commonMistakes: ['Merging AI code without review', 'Trusting AI analysis of data you cannot see it computed correctly'],
      knowledgeCheck: [
        q('You ask an AI coding assistant for a function. Before using it you should…', ['Ship it', 'Read it, test it, and check edge cases', 'Only check formatting', 'Ask a second AI'], 1, 'Generated code must be understood and tested before use.', 'evaluate'),
        q('An AI data tool produces a summary chart. Why verify it?', ['Charts are always wrong', 'The tool may mis-handle the data or the request; confirm the computation', 'It is slower', 'To reduce costs'], 1, 'Generated analyses can misread data; verify the computation.', 'analyze'),
        q('AI is best used in a design workflow to…', ['Replace user research', 'Explore options quickly while you apply judgement and test with users', 'Finalise without review', 'Ignore accessibility'], 1, 'AI accelerates exploration; humans keep judgement, research and accessibility.', 'understand'),
      ],
    },
    4: {
      objective: 'Use AI responsibly with verification and privacy in mind.',
      successCriteria: ['Verify outputs', 'Protect private data', 'Reason before prompting'],
      exercise: 'Write a short checklist you would use before trusting an AI output in your work, covering verification, privacy and disclosure.',
      commonMistakes: ['Pasting confidential data into tools', 'Publishing unverified AI output'],
      knowledgeCheck: [
        q('Before sharing AI-generated content publicly, you should…', ['Publish immediately', 'Fact-check the claims and confirm you can stand behind them', 'Add a disclaimer only', 'Shorten it'], 1, 'Responsibility for published claims stays with you.', 'evaluate'),
        q('Why avoid pasting confidential client data into a public AI tool?', ['It slows the tool', 'It may be stored or used in ways that breach confidentiality', 'It increases cost', 'It is technically impossible'], 1, 'Data sent to external tools may leave your control, breaching confidentiality.', 'evaluate'),
        q('"Thinking before prompting" means…', ['Writing longer prompts', 'Deciding the goal, what you need, and how you will verify the result first', 'Using a bigger model', 'Copying a prompt'], 1, 'Clarity about goal and verification improves results and reduces risk.', 'understand'),
      ],
    },
  },

  // ───────────────────────── NO-CODE ─────────────────────────
  nocode: {
    1: {
      objective: 'Build a responsive, content-driven website without code.',
      successCriteria: ['Build with a visual builder', 'Use dynamic content', 'Make it responsive'],
      exercise: 'Build a multi-page site with a CMS-driven list and detail page, then check it at mobile and desktop widths.',
      commonMistakes: ['Hard-coding content instead of using the CMS', 'Ignoring breakpoints'],
      knowledgeCheck: [
        q('What does a CMS in a no-code site let you do?', ['Write code', 'Manage structured content that templates render dynamically', 'Manage DNS', 'Compress images'], 1, 'A CMS stores structured content that templates render as dynamic pages.', 'understand'),
        q('Why set responsive breakpoints?', ['To slow the site', 'So layout adapts to different screen sizes without breaking', 'To add SEO', 'To reduce content'], 1, 'Breakpoints let the layout adapt across devices.', 'apply'),
        q('A client wants to add a blog post themselves. What is the right structure?', ['You edit the site each time', 'A CMS collection the client can add to', 'A shared spreadsheet only', 'Screenshot the post'], 1, 'A CMS collection lets non-technical users add content safely.', 'analyze'),
      ],
    },
    2: {
      objective: 'Build a functional app with data, auth and logic.',
      successCriteria: ['Model data', 'Add authentication', 'Build workflows'],
      exercise: 'Build a small app with a user account, one data type, and a workflow that creates and displays records for the logged-in user.',
      commonMistakes: ['Leaving data publicly readable', 'Putting all logic in the UI with no data rules'],
      knowledgeCheck: [
        q('In a no-code app, what is a workflow?', ['A design file', 'An automated sequence of steps triggered by user actions or events', 'A database table', 'A colour theme'], 1, 'Workflows automate logic in response to triggers.', 'understand'),
        q('Why are database privacy rules important?', ['They speed the app', 'They stop users reading or changing data that is not theirs', 'They improve the UI', 'They are optional'], 1, 'Privacy rules enforce who can read/write which records.', 'evaluate'),
        q('You need to show each user only their own items. What must you do?', ['Show all items', 'Filter the data query by the logged-in user', 'Hide items with CSS', 'Ask users to ignore others'], 1, 'Data must be filtered by ownership in the query and enforced by rules.', 'apply'),
      ],
    },
    3: {
      objective: 'Connect apps and services with automation.',
      successCriteria: ['Build trigger/action automations', 'Connect APIs without code', 'Handle errors'],
      exercise: 'Build an automation with a trigger and at least two actions, add a filter, and describe what happens when one step fails.',
      commonMistakes: ['No error handling', 'Automating a process that changes constantly'],
      knowledgeCheck: [
        q('In Zapier/Make, a trigger is…', ['The final result', 'The event that starts an automation', 'A data field', 'A colour scheme'], 1, 'A trigger is the event that starts the automation.', 'recall'),
        q('How can you connect to an API without code?', ['Write a server', 'Use a no-code HTTP/webhook action in the automation tool', 'Email the API provider', 'Use CSS'], 1, 'No-code tools provide HTTP request steps to call APIs directly.', 'apply'),
        q('Why add error handling to an automation?', ['To make it slower', 'So a single failed step does not silently corrupt the process', 'To increase cost', 'To avoid testing'], 1, 'Without error handling, failures strand data or cause duplicate work.', 'evaluate'),
      ],
    },
  },

  // ───────────────────────── TECHNICAL WRITING ─────────────────────────
  writing: {
    1: {
      objective: 'Write clearly for a technical audience.',
      successCriteria: ['Write concisely', 'Use active voice', 'Structure for scanning'],
      exercise: 'Rewrite a dense paragraph into short sentences with headings and active voice, cutting at least 25% of the words.',
      commonMistakes: ['Long passive sentences', 'Assuming the reader has your context'],
      knowledgeCheck: [
        q('Which sentence is in active voice?', ['The bug was fixed by the team.', 'The team fixed the bug.', 'The bug had been fixed.', 'A fix was applied.'], 1, 'Active voice puts the actor first: "The team fixed the bug."', 'apply'),
        q('Why prefer short sentences and headings in technical writing?', ['They look nicer', 'Readers scan for the answer; structure helps them find it fast', 'They reduce word count only', 'They are required'], 1, 'Structure and brevity help readers find answers quickly.', 'understand'),
        q('Writing "simply click the obvious button" is a problem because…', ['It is too short', 'It assumes shared context and may be wrong or condescending', 'It uses contractions', 'It is passive'], 1, 'Ambiguous, assumptive instructions fail for readers without your context.', 'evaluate'),
      ],
    },
    2: {
      objective: 'Use the tools and formats of modern technical writing.',
      successCriteria: ['Write Markdown', 'Use docs-as-code', 'Create diagrams'],
      exercise: 'Write a Markdown document in a Git repository, add a Mermaid diagram, and open a pull request for review.',
      commonMistakes: ['Using WYSIWYG only with no version history', 'Diagrams with no labels or legend'],
      knowledgeCheck: [
        q('What is docs-as-code?', ['Writing code instead of docs', 'Managing documentation in version control alongside code, with review and CI', 'A documentation theme', 'A paid tool'], 1, 'Docs-as-code applies software workflows (Git, review, CI) to documentation.', 'understand'),
        q('What is Markdown?', ['A programming language', 'A lightweight markup syntax for formatting plain text', 'A database', 'A diagram tool'], 1, 'Markdown is a plain-text formatting syntax rendered to HTML.', 'recall'),
        q('A diagram is most useful when it…', ['Is decorative', 'Has labelled elements and a clear purpose the text references', 'Uses many colours', 'Is animated'], 1, 'Diagrams should be labelled, purposeful and referenced by the prose.', 'apply'),
      ],
    },
    3: {
      objective: 'Choose the right documentation type for the reader\'s need.',
      successCriteria: ['Write API docs', 'Write tutorials and how-tos', 'Write reference and explanations'],
      exercise: 'For one API endpoint, write a tutorial (learning-oriented) and a reference entry (information-oriented), and note how they differ.',
      commonMistakes: ['Mixing learning and reference in one page', 'Reference without examples'],
      knowledgeCheck: [
        q('A tutorial is written to…', ['Serve as a lookup table', 'Teach a beginner by guiding them through a successful first experience', 'Explain every option', 'Replace the reference'], 1, 'Tutorials are learning-oriented and guide a first success.', 'understand'),
        q('Reference documentation is optimised for…', ['Teaching concepts', 'Accurate, complete lookup of facts and options', 'Storytelling', 'Marketing'], 1, 'Reference is information-oriented: precise and complete for lookup.', 'understand'),
        q('Good API documentation should include…', ['Only the endpoint URL', 'Parameters, authentication, request/response examples and errors', 'A company history', 'Design mockups only'], 1, 'API docs need parameters, auth, examples and error behaviour.', 'apply'),
      ],
    },
    4: {
      objective: 'Build a portfolio and choose a specialisation.',
      successCriteria: ['Assemble a portfolio', 'Contribute to open source', 'Choose a domain'],
      exercise: 'Assemble three writing samples (one tutorial, one reference, one explanation) and publish them where an employer can find them.',
      commonMistakes: ['Showing only polished prose with no reasoning about audience', 'No published, linkable samples'],
      knowledgeCheck: [
        q('What makes a technical-writing portfolio credible?', ['A long introduction', 'Linkable samples that show audience awareness and clarity', 'A list of tools', 'A certificate only'], 1, 'Employers want to read real samples that demonstrate clarity.', 'evaluate'),
        q('Why is contributing to open-source docs valuable?', ['It is easy', 'It produces public, reviewable work and real collaboration experience', 'It replaces all other samples', 'It is required'], 1, 'Public contributions are verifiable evidence of real collaboration.', 'understand'),
        q('Specialising by domain helps because…', ['It limits your options', 'You can write with subject fluency that generalists cannot', 'It avoids learning', 'It is required'], 1, 'Domain fluency produces more accurate, trusted documentation.', 'analyze'),
      ],
    },
  },

  // ───────────────────────── CRYPTO & WEB3 ─────────────────────────
  crypto: {
    1: {
      objective: 'Explain how a blockchain actually works at the cryptographic and consensus level.',
      successCriteria: ['Describe what a hash guarantees', 'Compare PoW and PoS', 'Explain block structure and gas'],
      exercise: 'Use an interactive blockchain demo to hash a block, change one field, and observe how the hash and subsequent blocks change.',
      commonMistakes: ['Thinking a hash can be reversed to the input', 'Confusing a wallet address with a private key'],
      knowledgeCheck: [
        q('Which property must a cryptographic hash function have?', ['It is reversible', 'A tiny input change produces a completely different output', 'It always outputs text', 'It needs a password'], 1, 'Hashing is one-way and exhibits the avalanche effect: small changes produce very different hashes.', 'understand'),
        q('What does a block header commit to through its merkle root?', ['The miner\'s identity', 'All transactions in the block', 'The next block only', 'Gas prices only'], 1, 'The merkle root is a hash committing to the set of transactions in the block.', 'understand'),
        q('What is the core difference between Proof of Work and Proof of Stake?', ['Both are identical', 'PoW secures the chain with computational work; PoS secures it with economic stake', 'PoS needs no validators', 'PoW has no rewards'], 1, 'PoW spends computation to propose blocks; PoS selects validators weighted by stake.', 'analyze'),
      ],
    },
    2: {
      objective: 'Protect keys and sign transactions safely.',
      successCriteria: ['Distinguish keys, seed phrases and addresses', 'Compare wallet types', 'Read a transaction before signing'],
      exercise: 'In a burner wallet, inspect a token approval, revoke it, and explain what signing it originally granted.',
      commonMistakes: ['Signing an approval without reading it', 'Storing a seed phrase digitally'],
      knowledgeCheck: [
        q('What is a seed phrase?', ['A public address', 'A human-readable encoding of the master secret from which keys are derived', 'A transaction hash', 'A wallet password'], 1, 'A seed phrase encodes the master secret used to derive all keys in an HD wallet.', 'understand'),
        q('Why is a hardware wallet safer than a hot wallet?', ['It is faster', 'The private key never leaves the device, so malware on your computer cannot steal it', 'It has no fees', 'It stores more tokens'], 1, 'Hardware wallets keep keys offline; the host cannot exfiltrate them.', 'evaluate'),
        q('A site asks you to approve an unlimited token spend. What is the risk?', ['None', 'A malicious or buggy contract could later drain that token at any time', 'It doubles your balance', 'It is required for all tokens'], 1, 'Unlimited approvals let a contract transfer that token without further consent.', 'evaluate'),
      ],
    },
    3: {
      objective: 'Read and write the core of the Solidity language.',
      successCriteria: ['Write functions, modifiers and events', 'Choose the right data location', 'Understand state vs local data'],
      exercise: 'Write a contract with a modifier guarding an admin function, an event emitted on a state change, and a function using calldata and memory appropriately.',
      commonMistakes: ['Writing to storage when memory is intended', 'Forgetting access control on state-changing functions'],
      knowledgeCheck: [
        q('Which data location is a temporary, mutable copy that is not persisted?', ['storage', 'memory', 'calldata', 'immutable'], 1, 'memory is temporary and mutable for the duration of a call.', 'understand'),
        q('What is a modifier used for in Solidity?', ['Storing data permanently', 'Reusable pre/post conditions wrapped around a function, such as access control', 'Compiling code', 'Paying gas'], 1, 'Modifiers wrap functions to enforce conditions such as onlyOwner.', 'understand'),
        q('What is the purpose of an event?', ['To store state permanently', 'To emit a log that off-chain apps can observe cheaply', 'To change gas price', 'To upgrade a contract'], 1, 'Events emit logs for off-chain indexing and monitoring.', 'apply'),
      ],
    },
    4: {
      objective: 'Implement token standards and use professional tooling.',
      successCriteria: ['Distinguish ERC-20 and ERC-721', 'Use OpenZeppelin', 'Test and deploy a contract'],
      exercise: 'Implement and test a capped ERC-20 using OpenZeppelin, then deploy it to a testnet and read it on a block explorer.',
      commonMistakes: ['Rolling your own token logic instead of audited libraries', 'Deploying to mainnet without tests'],
      knowledgeCheck: [
        q('How does ERC-721 differ from ERC-20?', ['They are identical', 'ERC-20 tokens are fungible; ERC-721 tokens are unique (non-fungible)', 'ERC-721 is for stablecoins', 'ERC-20 is for NFTs'], 1, 'ERC-20 is fungible; ERC-721 represents unique, non-fungible tokens.', 'understand'),
        q('Why use OpenZeppelin implementations?', ['They are required', 'They are audited, battle-tested and standard-compliant', 'They are the only library', 'They avoid gas'], 1, 'OpenZeppelin provides audited, widely used implementations that reduce risk.', 'evaluate'),
        q('Why deploy and test on a testnet before mainnet?', ['Mainnet is slower', 'To validate behaviour and tooling without risking real funds', 'Testnets have more users', 'It is required by Solidity'], 1, 'Testnets let you verify deployment and behaviour with no real funds at stake.', 'apply'),
      ],
    },
    5: {
      objective: 'Explain the core mechanics of decentralised finance.',
      successCriteria: ['Explain AMM pricing', 'Describe liquidity and impermanent loss', 'Compare stablecoin types'],
      exercise: 'For a constant-product pool, calculate the price impact of a large trade and explain why it is larger than a small trade.',
      commonMistakes: ['Assuming LP fees always outweigh impermanent loss', 'Treating all stablecoins as equally safe'],
      knowledgeCheck: [
        q('In a constant-product AMM (x × y = k), what happens as a trade grows large?', ['Price stays constant', 'The average execution price slips further from the starting price', 'The pool gains liquidity', 'Fees fall to zero'], 1, 'Large trades move the pool balances more, causing greater slippage.', 'analyze'),
        q('What is impermanent loss?', ['A permanent fee', 'The loss an LP suffers versus simply holding the tokens when the pool price diverges', 'A hacking loss', 'A tax'], 1, 'Impermanent loss is the divergence cost LPs face relative to holding.', 'understand'),
        q('Which stablecoin design depends hardest on external collateral staying solvent?', ['Algorithmic, undercollateralised designs', 'Fully fiat-backed', 'Overcollateralised crypto-backed', 'Tokenised deposits'], 0, 'Undercollateralised algorithmic designs are the most fragile when confidence breaks.', 'evaluate'),
      ],
    },
    6: {
      objective: 'Understand where DeFi breaks and why.',
      successCriteria: ['Explain oracle and flash-loan attacks', 'Describe MEV and bridge risk', 'Explain on-chain governance'],
      exercise: 'Pick one historical exploit, identify the mechanism, and describe the missing control that would have prevented it.',
      commonMistakes: ['Trusting a single price oracle', 'Assuming bridges are as safe as the chains they connect'],
      knowledgeCheck: [
        q('What is a flash-loan attack?', ['A slow loan repaid over years', 'A loan taken and repaid within one transaction, used to manipulate prices or bypass checks', 'A hack of the wallet', 'A governance vote'], 1, 'Flash loans require no collateral because they are borrowed and repaid in one atomic transaction.', 'understand'),
        q('Why are cross-chain bridges frequent targets?', ['They are cheap to run', 'They concentrate large value and often rely on complex, permissioned validation', 'They are regulated', 'They hold no funds'], 1, 'Bridges hold large value and add trust assumptions and complex code, raising risk.', 'evaluate'),
        q('What is MEV?', ['A wallet standard', 'Value extracted by reordering, inserting or censoring transactions in a block', 'A type of token', 'A consensus algorithm'], 1, 'MEV is value captured through transaction ordering within blocks.', 'understand'),
      ],
    },
    7: {
      objective: 'Build a Web3 frontend that reads and writes to contracts.',
      successCriteria: ['Connect a wallet', 'Read on-chain data', 'Send a transaction and track it'],
      exercise: 'Build a page that connects a wallet, reads a balance, and sends one transaction, showing pending and confirmed states.',
      commonMistakes: ['Trusting client-side data without checking the chain', 'Not handling rejected transactions'],
      knowledgeCheck: [
        q('What is ethers.js used for?', ['Designing UI', 'Interacting with Ethereum contracts and providers from JavaScript', 'Storing files', 'Mining blocks'], 1, 'ethers.js is a library for talking to Ethereum nodes and contracts.', 'recall'),
        q('What does wagmi provide?', ['A database', 'React hooks for reading and writing to Ethereum', 'A CSS framework', 'A block explorer'], 1, 'wagmi exposes React hooks for common Web3 read/write operations.', 'understand'),
        q('After sending a transaction, which states should the UI handle?', ['Only success', 'Pending, confirmed and failed/rejected states', 'Nothing', 'Only cost'], 1, 'Transactions may be pending, confirmed, or rejected; the UI must handle each.', 'apply'),
      ],
    },
    8: {
      objective: 'Use indexing and decentralised storage in a dApp.',
      successCriteria: ['Query indexed data', 'Store files on IPFS', 'Assemble a full dApp'],
      exercise: 'Add a The Graph subgraph query for historical events and store an asset on IPFS, then link it into your dApp.',
      commonMistakes: ['Scanning every block for history in the frontend', 'Assuming IPFS guarantees persistence without pinning'],
      knowledgeCheck: [
        q('Why use The Graph instead of reading events directly from a node?', ['It is prettier', 'It indexes blockchain data so historical queries are fast and simple', 'It stores private keys', 'It mines tokens'], 1, 'The Graph indexes events into queryable data, avoiding slow block scans.', 'understand'),
        q('What does IPFS content addressing mean?', ['Files are stored on one server', 'A file is referenced by a hash of its content', 'Files are encrypted', 'Files are free forever'], 1, 'IPFS addresses content by hash, so identical content shares an address.', 'understand'),
        q('A file is added to IPFS but later becomes unavailable. Why?', ['It never uploaded', 'IPFS does not guarantee persistence unless the content is pinned/replicated', 'The hash changed', 'IPFS is read-only'], 1, 'IPFS is a network of providers; unpinned content can be garbage-collected.', 'evaluate'),
      ],
    },
    9: {
      objective: 'Recognise and prevent the most damaging vulnerability classes.',
      successCriteria: ['Apply checks-effects-interactions', 'Enforce access control', 'Handle arithmetic and frontrunning risks'],
      exercise: 'For a vulnerable withdraw function, identify the reentrancy flaw and rewrite it using the checks-effects-interactions pattern.',
      commonMistakes: ['Making external calls before updating state', 'Missing access control on privileged functions'],
      knowledgeCheck: [
        q('What does the checks-effects-interactions pattern prevent?', ['High gas', 'Reentrancy, by updating state before making external calls', 'Integer overflow', 'Frontrunning'], 1, 'Updating state before external calls prevents reentrant re-entry from seeing stale state.', 'apply'),
        q('Since Solidity 0.8, what happens to unchecked integer overflow by default?', ['It wraps silently', 'The operation reverts', 'It logs a warning', 'It pays a fee'], 1, 'Solidity 0.8+ reverts on overflow/underflow unless explicitly unchecked.', 'understand'),
        q('Which is the most common access-control mistake?', ['Using events', 'Forgetting to restrict a sensitive function to the right role', 'Using memory', 'Emitting logs'], 1, 'Missing or wrong access control on sensitive functions is a leading exploit cause.', 'analyze'),
      ],
    },
    10: {
      objective: 'Apply auditing tools and write professional findings.',
      successCriteria: ['Run static analysis and fuzzing', 'Write a clear report', 'Understand audit contests'],
      exercise: 'Run Slither on a sample contract, triage its findings, and write one finding with severity, impact and a recommended fix.',
      commonMistakes: ['Reporting tool output without validation', 'Vague findings with no proof of concept'],
      knowledgeCheck: [
        q('What is Slither?', ['A wallet', 'A static analysis tool that flags common Solidity vulnerabilities', 'A testnet', 'A DEX'], 1, 'Slither performs static analysis to detect common issues.', 'recall'),
        q('What does fuzzing add over example-based tests?', ['Faster compilation', 'Randomised inputs that can find edge cases you did not imagine', 'Cheaper gas', 'Better UI'], 1, 'Fuzzing explores many inputs automatically, surfacing unexpected edge cases.', 'understand'),
        q('A strong audit finding should include…', ['Only a severity label', 'The vulnerability, its impact, a proof of concept and a recommended fix', 'The auditor\'s opinion only', 'A screenshot'], 1, 'Findings need impact, reproduction and remediation to be actionable.', 'apply'),
      ],
    },
    11: {
      objective: 'Analyse on-chain data and publish a dashboard.',
      successCriteria: ['Read a block explorer', 'Explain key metrics', 'Query with Dune SQL'],
      exercise: 'Build a small Dune dashboard for one protocol and write a short paragraph explaining what each chart shows and what it does not.',
      commonMistakes: ['Treating TVL as revenue', 'Drawing conclusions without context or baselines'],
      knowledgeCheck: [
        q('What does TVL measure?', ['Protocol profit', 'The total value of assets deposited in a protocol\'s contracts', 'Token price', 'Daily active users'], 1, 'TVL is the value locked in a protocol, not its profit.', 'understand'),
        q('Why convert stablecoin inflows to an exchange into a caution signal?', ['They mean nothing', 'Large inflows can precede selling pressure as users prepare to trade', 'They reduce fees', 'They prove adoption'], 1, 'Exchange inflows are often read as potential selling pressure.', 'analyze'),
        q('Dune Analytics lets analysts…', ['Mine tokens', 'Write SQL against decoded blockchain data and publish dashboards', 'Deploy contracts', 'Hold keys'], 1, 'Dune provides SQL access to decoded on-chain data for analysis and dashboards.', 'understand'),
      ],
    },
  },

  // ───────────────────────── PROJECT MANAGEMENT ─────────────────────────
  projectmgmt: {
    1: {
      objective: 'Use the universal language of project management.',
      successCriteria: ['Map the project lifecycle', 'Explain the triple constraint', 'Break work down'],
      exercise: 'Write a one-page project charter for a real project with objectives, scope, stakeholders and a high-level work breakdown.',
      commonMistakes: ['Starting work without a defined scope', 'Confusing a work package with a deliverable'],
      knowledgeCheck: [
        q('What is the triple constraint?', ['People, process, tools', 'Scope, time and cost trade-offs that define a project', 'Risk, quality, value', 'Plan, do, review'], 1, 'Scope, time and cost are interdependent constraints; changing one affects the others.', 'understand'),
        q('What is a work breakdown structure (WBS)?', ['A Gantt chart', 'A hierarchical decomposition of the work into manageable pieces', 'A risk list', 'A budget'], 1, 'A WBS decomposes deliverables into work packages.', 'understand'),
        q('A stakeholder has high interest but low influence. How should you manage them?', ['Ignore them', 'Keep them informed so their interest does not become disruption', 'Give them decision authority', 'Escalate immediately'], 1, 'High-interest, low-influence stakeholders should be kept informed.', 'apply'),
      ],
    },
    2: {
      objective: 'Understand Agile values and when to choose them.',
      successCriteria: ['State the Agile values', 'Compare Agile and Waterfall', 'Choose a fit for the context'],
      exercise: 'For two projects (one stable and predictable, one uncertain), choose Agile or Waterfall and justify the choice.',
      commonMistakes: ['Treating Agile as no planning', 'Using Agile where requirements are fixed and regulated'],
      knowledgeCheck: [
        q('Which does the Agile Manifesto value more?', ['Processes and tools over people', 'Responding to change over following a plan', 'Contracts over collaboration', 'Documentation over working software'], 1, 'Agile values individuals, working software, collaboration and responding to change.', 'understand'),
        q('When is a Waterfall approach more appropriate than Agile?', ['When requirements are highly uncertain', 'When scope is stable, well understood and changes are costly', 'Always', 'Never'], 1, 'Waterfall suits stable, well-understood scope; Agile suits uncertainty.', 'evaluate'),
        q('"Agile means no planning" is a misconception because…', ['Agile forbids plans', 'Agile plans continuously at multiple horizons rather than producing one upfront plan', 'Plans are illegal', 'Agile has no backlog'], 1, 'Agile is continuous planning, not absence of planning.', 'analyze'),
      ],
    },
    3: {
      objective: 'Run Scrum: roles, events and flow.',
      successCriteria: ['Describe Scrum roles', 'Run sprint events', 'Estimate with story points'],
      exercise: 'Simulate one sprint: write user stories, estimate with points, plan a sprint, hold a standup, and run a retrospective.',
      commonMistakes: ['Treating the daily standup as a status report to the manager', 'Using velocity to compare teams'],
      knowledgeCheck: [
        q('What is the Product Owner accountable for?', ['Facilitating events', 'Maximising the value delivered by the product and ordering the backlog', 'Writing all code', 'Managing the servers'], 1, 'The PO owns product value and the ordering of the backlog.', 'understand'),
        q('What is the purpose of the sprint retrospective?', ['Plan the next sprint', 'Inspect how the team worked and choose improvements', 'Demo to stakeholders', 'Estimate stories'], 1, 'Retrospectives focus on process improvement.', 'understand'),
        q('Why are story points relative rather than hours?', ['They are faster', 'They express effort/complexity relative to other stories and are more stable across a team', 'They are required', 'They are exact'], 1, 'Relative estimation is more reliable than false precision in hours.', 'apply'),
      ],
    },
    4: {
      objective: 'Use planning tools and techniques effectively.',
      successCriteria: ['Track work in a tool', 'Use Gantt/critical path', 'Apply Kanban limits'],
      exercise: 'Set up a Kanban board with WIP limits, then build a small Gantt chart and identify the critical path.',
      commonMistakes: ['No WIP limits, so nothing finishes', 'Treating every task as critical'],
      knowledgeCheck: [
        q('What is the critical path?', ['The shortest task', 'The longest sequence of dependent tasks that determines the project duration', 'The highest-risk task', 'The most expensive task'], 1, 'The critical path is the longest dependent chain; delay there delays the project.', 'understand'),
        q('What is the purpose of a WIP limit on a Kanban board?', ['To reduce quality', 'To limit work in progress so flow improves and bottlenecks surface', 'To hide work', 'To estimate'], 1, 'Limiting WIP improves flow and reveals bottlenecks.', 'apply'),
        q('What should you use to track an Agile sprint?', ['A Gantt chart only', 'A backlog and board suited to the team\'s flow', 'A spreadsheet only', 'Email threads'], 1, 'Agile tracking uses a backlog and board rather than a fixed Gantt only.', 'understand'),
      ],
    },
    5: {
      objective: 'Report cost and schedule health honestly.',
      successCriteria: ['Forecast a budget', 'Interpret EVM', 'Write a useful status report'],
      exercise: 'For a sample project, compute CPI and SPI and write a status report that states the health clearly with one corrective action.',
      commonMistakes: ['Reporting activity instead of progress against plan', 'Hiding bad news until it is too late'],
      knowledgeCheck: [
        q('An SPI below 1.0 indicates…', ['The project is ahead of schedule', 'The project is behind schedule', 'The project is under budget', 'Nothing'], 1, 'SPI < 1 means schedule performance is behind plan.', 'apply'),
        q('What is the main purpose of a status report?', ['To list everything done', 'To communicate health, risks and decisions needed, concisely', 'To increase documentation', 'To assign blame'], 1, 'Status reports communicate health and decisions, not activity logs.', 'evaluate'),
        q('What is a lessons-learned exercise for?', ['Punishing mistakes', 'Capturing what to repeat and change for future projects', 'Satisfying auditors only', 'Filling time'], 1, 'Lessons learned improve future projects by capturing causes and improvements.', 'understand'),
      ],
    },
    6: {
      objective: 'Navigate PM certifications and build a portfolio.',
      successCriteria: ['Compare certifications', 'Choose a fit', 'Build experience without a formal role'],
      exercise: 'For your situation, choose one certification path and describe how you would build three portfolio artifacts without a formal PM job.',
      commonMistakes: ['Collecting certifications without evidence of delivery', 'Assuming experience is impossible without the title'],
      knowledgeCheck: [
        q('Which certification is aimed at entry-level project managers?', ['PMP', 'CAPM', 'PSM III', 'CISSP'], 1, 'CAPM is the entry-level PMI credential; PMP requires experience.', 'recall'),
        q('A PM portfolio is strongest when it shows…', ['Certificates only', 'Real projects with charters, plans and measured outcomes', 'A long CV', 'Tool lists'], 1, 'Evidence of real delivery is more persuasive than credentials alone.', 'evaluate'),
        q('How can someone build PM experience without the title?', ['Wait for a promotion', 'Run a side project, community initiative or university project with real planning and retrospectives', 'Take more courses only', 'Avoid responsibility'], 1, 'Running a real project end-to-end creates genuine, documentable experience.', 'apply'),
      ],
    },
  },

  // ───────────────────────── PRODUCT MANAGEMENT ─────────────────────────
  productmgmt: {
    1: {
      objective: 'Adopt product thinking grounded in user problems.',
      successCriteria: ['Explain what PM is not', 'Apply Jobs To Be Done', 'Describe the product lifecycle'],
      exercise: 'For a daily-use app, write a Jobs-To-Be-Done statement and describe where it sits in the product lifecycle.',
      commonMistakes: ['Thinking the PM decides how to build', 'Confusing features with outcomes'],
      knowledgeCheck: [
        q('Which is the PM\'s responsibility rather than the engineer\'s?', ['Choosing implementation details', 'Deciding what to build and why', 'Writing code', 'Provisioning servers'], 1, 'PM owns what and why; engineering owns how.', 'understand'),
        q('What does Jobs To Be Done focus on?', ['Features competitors ship', 'The progress a user is trying to make in a situation', 'Pricing only', 'Design style'], 1, 'JTBD frames needs as the progress a user seeks, not as features.', 'understand'),
        q('Which is an outcome rather than an output?', ['A shipped feature', 'An increase in weekly active users', 'A new design system', 'A release date'], 1, 'Outcomes are changes in behaviour/results; outputs are things you ship.', 'apply'),
      ],
    },
    2: {
      objective: 'Run honest discovery before writing requirements.',
      successCriteria: ['Run good interviews', 'Avoid leading questions', 'Map assumptions'],
      exercise: 'Write five non-leading interview questions about a real problem, then map the assumptions you need to test.',
      commonMistakes: ['Asking about hypotheticals instead of past behaviour', 'Pitching instead of listening'],
      knowledgeCheck: [
        q('The Mom Test says to…', ['Ask if your idea is good', 'Ask about the user\'s actual past behaviour and problems, not your idea', 'Survey at scale', 'Avoid talking to users'], 1, 'Honest feedback comes from discussing real past behaviour, not your idea.', 'understand'),
        q('Which is a leading question?', ['"Walk me through the last time this happened."', '"Wouldn\'t this feature be useful to you?"', '"What did you do next?"', '"How often did this occur?"'], 1, 'Suggesting the answer biases the response; ask about actual behaviour instead.', 'evaluate'),
        q('What is assumption mapping for?', ['Decorating slides', 'Surfacing the riskiest beliefs to test before committing to build', 'Estimating cost', 'Choosing a font'], 1, 'Assumption mapping prioritises which beliefs to validate first.', 'apply'),
      ],
    },
    3: {
      objective: 'Set strategy and prioritise with clear frameworks.',
      successCriteria: ['Write a strategy', 'Set OKRs', 'Prioritise with a framework'],
      exercise: 'Write one objective with two key results, then prioritise five features with RICE and justify the top item.',
      commonMistakes: ['Setting output-based key results', 'Prioritising by loudest stakeholder'],
      knowledgeCheck: [
        q('What makes a good key result?', ['A task to complete', 'A measurable outcome with a target and timeframe', 'A list of features', 'A budget'], 1, 'Key results are measurable outcomes, not tasks.', 'understand'),
        q('Which RICE factor captures how many users an initiative affects?', ['Reach', 'Impact', 'Confidence', 'Effort'], 0, 'Reach is the number of users affected in a period.', 'recall'),
        q('The Kano model distinguishes…', ['Cost from price', 'Must-have, performance and delighter attributes', 'Agile from Waterfall', 'Users from buyers'], 1, 'Kano separates basic needs, performance features and delighters.', 'understand'),
      ],
    },
    4: {
      objective: 'Write requirements engineers can build the first time.',
      successCriteria: ['Structure a PRD', 'Write user stories and acceptance criteria', 'Cover edge cases'],
      exercise: 'Write a PRD for one feature with problem, personas, user stories, acceptance criteria, out-of-scope items and success metrics.',
      commonMistakes: ['Omitting out-of-scope items', 'Acceptance criteria that are not testable'],
      knowledgeCheck: [
        q('What belongs in a PRD?', ['Only the feature name', 'Problem, scope, user stories, acceptance criteria, metrics and edge cases', 'The code', 'The colour palette'], 1, 'A PRD aligns the team on problem, scope and measurable success.', 'understand'),
        q('A good acceptance criterion is…', ['Vague', 'Specific and testable', 'A design description', 'Optional'], 1, 'Acceptance criteria must be verifiable so QA and engineering agree.', 'apply'),
        q('Why list edge cases before engineering starts?', ['To add work', 'To surface ambiguity early, reducing rework and missed scenarios', 'It is required', 'To slow delivery'], 1, 'Identifying edge cases up front prevents costly surprises.', 'evaluate'),
      ],
    },
    5: {
      objective: 'Choose the right high-level growth metrics.',
      successCriteria: ['Apply AARRR', 'Choose among DAU/WAU/MAU', 'Use satisfaction metrics appropriately'],
      exercise: 'Map a product against AARRR and choose one headline metric, explaining why it fits the business model.',
      commonMistakes: ['Treating all engagement metrics as interchangeable', 'Using NPS as the only measure of value'],
      knowledgeCheck: [
        q('What does the AARRR framework stand for?', ['Analyse, Adapt, Repeat, Report, Review', 'Acquisition, Activation, Retention, Referral, Revenue', 'Awareness, Ads, Reach, ROI, Results', 'Audit, Assess, Refine, Release, Retire'], 1, 'AARRR is acquisition, activation, retention, referral, revenue.', 'recall'),
        q('When is DAU the more meaningful metric than MAU?', ['For a product used daily, like messaging', 'For a product used annually', 'Never', 'Only for free products'], 0, 'DAU matters for habitually used products; MAU suits lower-frequency ones.', 'apply'),
        q('NPS is best used as…', ['The single source of truth', 'A directional relationship signal alongside behavioural metrics', 'A revenue forecast', 'An A/B result'], 1, 'NPS is directional sentiment, not a behavioural truth.', 'evaluate'),
      ],
    },
    6: {
      objective: 'Diagnose retention, funnels and run trustworthy experiments.',
      successCriteria: ['Read retention curves', 'Analyse a funnel', 'Design a valid A/B test'],
      exercise: 'Given a funnel and a retention curve, identify the biggest drop-off, form a hypothesis, and design a test with a success metric.',
      commonMistakes: ['Stopping tests early', 'Changing multiple variables in one test'],
      knowledgeCheck: [
        q('What does a flattening retention curve indicate?', ['Product-market fit signal: a core of users stays', 'The product is failing', 'Users are churning completely', 'Nothing useful'], 0, 'A flattening curve suggests a retained core audience.', 'analyze'),
        q('Funnel analysis is used to…', ['Increase prices', 'Find the stage where users drop off most so you can improve it', 'Design logos', 'Write copy'], 1, 'Funnels locate the biggest drop-off to prioritise improvement.', 'apply'),
        q('Which makes an A/B test result trustworthy?', ['Stopping as soon as a leader appears', 'A pre-defined success metric, sufficient sample and a full test duration', 'Changing several variables', 'Testing on a tiny sample'], 1, 'Pre-registration, adequate sample and duration make results reliable.', 'evaluate'),
      ],
    },
    7: {
      objective: 'Ship effectively with engineering.',
      successCriteria: ['Write clear tickets', 'Scope an MVP', 'Run a launch checklist'],
      exercise: 'Write one engineering ticket with context, acceptance criteria and out-of-scope notes, then draft a launch checklist.',
      commonMistakes: ['Tickets without acceptance criteria', 'Treating MVP as "low quality"'],
      knowledgeCheck: [
        q('What should an engineering ticket contain?', ['A one-line title only', 'Context, requirements, acceptance criteria and out-of-scope notes', 'A design mockup only', 'A deadline only'], 1, 'Clear tickets include context, acceptance criteria and boundaries.', 'apply'),
        q('MVP means…', ['The lowest quality thing possible', 'The smallest release that delivers real value and lets you learn', 'A finished v1', 'A prototype with no users'], 1, 'An MVP delivers real value and enables learning, not minimum quality.', 'understand'),
        q('What is the purpose of a launch checklist?', ['To delay launch', 'To ensure monitoring, rollback and ownership are ready before release', 'To add paperwork', 'To replace testing'], 1, 'Launch checklists ensure operational readiness and rollback.', 'understand'),
      ],
    },
    8: {
      objective: 'Build a credible PM portfolio and interview well.',
      successCriteria: ['Create case studies', 'Understand APM routes', 'Prepare for interviews'],
      exercise: 'Write one case study from problem to measured outcome, then outline how you would answer a product-sense interview question.',
      commonMistakes: ['Case studies with no decisions or trade-offs', 'Claiming results without evidence'],
      knowledgeCheck: [
        q('A strong PM case study emphasises…', ['Pretty screens', 'The problem, decisions, trade-offs and measured outcome', 'A long introduction', 'Tool names'], 1, 'Credibility comes from reasoning and evidence, not visuals alone.', 'evaluate'),
        q('APM (Associate Product Manager) programmes are designed for…', ['Senior PMs', 'People entering product management with little or no PM experience', 'Engineers only', 'Designers only'], 1, 'APM programmes target early-career entrants to PM.', 'recall'),
        q('In a product-sense interview, the most important skill is…', ['Memorising frameworks', 'Structuring your thinking and justifying trade-offs for a specific user', 'Speed', 'Using buzzwords'], 1, 'Interviewers look for structured reasoning and user-centred trade-offs.', 'evaluate'),
      ],
    },
  },

  // ───────────────────────── DART ─────────────────────────
  dart: {
    1: {
      objective: 'Write correct, null-safe Dart with the right variable and collection types.',
      successCriteria: ['Use final and const correctly', 'Handle null safely', 'Choose appropriate collections'],
      exercise: 'Write a script that reads an optional value, uses null-aware operators to avoid crashes, and stores results in a Map and a Set.',
      commonMistakes: ['Using the null-assertion ! on a value that can be null', 'Choosing a List where a Set or Map is clearer'],
      knowledgeCheck: [
        q('What is the difference between final and const in Dart?', ['They are identical', 'final is set once at runtime; const is a compile-time constant', 'const allows reassignment', 'final requires a type'], 1, 'final is runtime-immutable; const is compile-time constant.', 'understand'),
        q('What does the ?? operator do?', ['Throws if null', 'Returns the left value unless it is null, then the right value', 'Casts a type', 'Negates a value'], 1, 'The ?? operator supplies a fallback when the left operand is null.', 'understand'),
        q('Which collection guarantees unique elements?', ['List', 'Set', 'Map', 'Queue'], 1, 'A Set stores each value at most once.', 'recall'),
      ],
    },
    2: {
      objective: 'Model problems with Dart\'s object-oriented features.',
      successCriteria: ['Use constructors correctly', 'Apply inheritance and interfaces', 'Use mixins and generics'],
      exercise: 'Model a payment system with an abstract base, two concrete subclasses, and a mixin that adds logging.',
      commonMistakes: ['Overusing inheritance where composition is clearer', 'Confusing a mixin with a base class'],
      knowledgeCheck: [
        q('What is a factory constructor used for?', ['Copying arguments only', 'Returning an instance that may be a subtype or cached, rather than always a new instance', 'Compiling code', 'Creating a mixin'], 1, 'A factory constructor controls instance creation and may return existing or subtype instances.', 'understand'),
        q('What does a mixin provide?', ['A way to add reusable behaviour to a class without single-inheritance limits', 'A database table', 'A UI widget', 'A build step'], 1, 'Mixins inject reusable behaviour into classes, Dart\'s approach to multiple reuse.', 'understand'),
        q('Why prefer an abstract class or interface for a shared contract?', ['To hide code', 'So different implementations can satisfy the same interface and be swapped', 'To speed compilation', 'To avoid types'], 1, 'Interfaces let you depend on a contract rather than a concrete implementation.', 'apply'),
      ],
    },
    3: {
      objective: 'Handle asynchronous work with Futures, Streams and isolates.',
      successCriteria: ['Use async/await', 'Consume a Stream', 'Offload CPU work to an isolate'],
      exercise: 'Write code that awaits a Future, listens to a Stream of values, and offloads a heavy computation to an isolate.',
      commonMistakes: ['Blocking the main isolate with heavy work', 'Not awaiting a Future and missing errors'],
      knowledgeCheck: [
        q('What is a Future<T>?', ['A synchronous value', 'A handle to a value that will be available later', 'A type of Stream', 'A loop'], 1, 'A Future represents a value that completes later, successfully or with an error.', 'understand'),
        q('What is a Stream<T> in Dart?', ['A single async value', 'A sequence of asynchronous events over time', 'A synchronous list', 'A file'], 1, 'Streams deliver a sequence of async events, unlike a single Future.', 'understand'),
        q('Why use an isolate for a heavy computation?', ['It is required', 'To run work on another thread so the UI is not blocked', 'To reduce memory always', 'To avoid errors'], 1, 'Isolates run on separate threads, keeping the main isolate responsive.', 'apply'),
      ],
    },
    4: {
      objective: 'Connect Dart knowledge to Flutter development.',
      successCriteria: ['Explain AOT compilation', 'Relate Dart classes to widgets', 'Manage packages'],
      exercise: 'Add a package via pubspec.yaml, write a small widget-like class, and explain how Dart compiles for a mobile release.',
      commonMistakes: ['Editing generated files', 'Adding dependencies without pinning versions'],
      knowledgeCheck: [
        q('How does Dart compile for release on mobile?', ['Interpreted line by line', 'Ahead-of-time (AOT) to native machine code', 'To JavaScript only', 'To Python'], 1, 'Flutter release builds use AOT compilation to native code for performance.', 'understand'),
        q('In Flutter, a widget is…', ['A native Android view', 'A Dart class describing part of the UI', 'A CSS file', 'A database'], 1, 'Flutter UIs are Dart classes (widgets) describing the interface.', 'understand'),
        q('Where do Dart project dependencies live?', ['pubspec.yaml', 'package.json', 'Gemfile', 'requirements.txt'], 0, 'pubspec.yaml declares dependencies and assets for a Dart/Flutter project.', 'recall'),
      ],
    },
  },

  // ───────────────────────── SONIC BLOCKCHAIN ─────────────────────────
  sonic: {
    1: {
      objective: 'Understand the Web3 fundamentals Sonic builds on.',
      successCriteria: ['Explain keys and wallets', 'Explain transactions and gas', 'Describe consensus'],
      exercise: 'Create a test wallet, send a small testnet transaction, and explain what the signature and gas fee did.',
      commonMistakes: ['Sharing a private key', 'Treating gas as optional'],
      knowledgeCheck: [
        q('What does a wallet actually store?', ['Coins', 'The keys that control your on-chain accounts', 'A copy of the blockchain', 'Your password'], 1, 'A wallet holds keys; assets live on-chain, controlled by those keys.', 'understand'),
        q('What is gas?', ['A reward for holding tokens', 'A fee paid to compensate for computation and storage on-chain', 'A type of token standard', 'A wallet feature'], 1, 'Gas pays for the computation and storage a transaction consumes.', 'understand'),
        q('What does a consensus mechanism achieve?', ['Faster wallets', 'Agreement among nodes on the canonical chain state', 'Lower fees always', 'Private transactions'], 1, 'Consensus lets distributed nodes agree on a single valid chain state.', 'understand'),
      ],
    },
    2: {
      objective: 'Explain what makes Sonic distinct in the ecosystem.',
      successCriteria: ['Describe Sonic\'s performance goals', 'Explain FeeM', 'Map the ecosystem'],
      exercise: 'Read the Sonic docs on FeeM and summarise, in three sentences, how developer fee revenue is generated.',
      commonMistakes: ['Assuming all chains have identical fee models', 'Confusing transaction cost with finality'],
      knowledgeCheck: [
        q('What does Fee Monetisation (FeeM) do for developers?', ['Charges developers rent', 'Returns a share of the fees their contracts generate', 'Removes gas entirely', 'Mints a governance token'], 1, 'FeeM shares generated fees with the developers whose contracts produce them.', 'understand'),
        q('Why do fast finality and high throughput matter?', ['They look impressive', 'They make interactive apps and cheap transactions practical', 'They reduce security', 'They remove the need for validators'], 1, 'High throughput and fast finality enable responsive, low-cost applications.', 'evaluate'),
        q('Sub-second finality means…', ['Transactions are free', 'Transactions become irreversible very quickly', 'No signatures are needed', 'The chain has no blocks'], 1, 'Fast finality means transactions are settled and hard to reverse quickly.', 'understand'),
      ],
    },
    3: {
      objective: 'Write and deploy basic Solidity contracts to Sonic.',
      successCriteria: ['Write variables, functions and types', 'Use inheritance and events', 'Deploy to testnet'],
      exercise: 'Write a small contract with an event and an inherited base, deploy it to Sonic testnet, and read it on the explorer.',
      commonMistakes: ['Skipping testnet and deploying straight to mainnet', 'Forgetting to emit events for off-chain tracking'],
      knowledgeCheck: [
        q('What is the purpose of a function modifier?', ['To store data', 'To apply reusable conditions to a function, such as access control', 'To compile code', 'To pay gas'], 1, 'Modifiers wrap functions to enforce reusable conditions.', 'understand'),
        q('Why emit an event when state changes?', ['To change state twice', 'So off-chain applications can observe the change cheaply', 'To reduce gas always', 'To hide the change'], 1, 'Events create logs that off-chain services can index.', 'apply'),
        q('Why deploy first to a testnet?', ['Testnets are faster', 'To verify behaviour without risking real funds', 'It is required by Solidity', 'Mainnet is offline'], 1, 'Testnets validate deployment and behaviour safely.', 'apply'),
      ],
    },
    4: {
      objective: 'Use Foundry to build, test and deploy contracts.',
      successCriteria: ['Compile and test with Foundry', 'Write fuzz tests', 'Use deployment scripts'],
      exercise: 'Write a Foundry test (including one fuzz test) for a contract function, then deploy it with a script.',
      commonMistakes: ['Testing only the happy path', 'Hard-coding addresses or keys in scripts'],
      knowledgeCheck: [
        q('What does Foundry use to write tests?', ['JavaScript', 'Solidity', 'Python', 'YAML'], 1, 'Foundry tests are written in Solidity, keeping tests close to the contracts.', 'recall'),
        q('What is a fuzz test?', ['A test with fixed inputs', 'A test that runs many randomised inputs to find edge cases', 'A UI test', 'A load test'], 1, 'Fuzz tests explore many inputs to surface unexpected failures.', 'understand'),
        q('Where should a private key used for deployment be kept?', ['In the deployment script', 'In an environment variable or encrypted keystore', 'In the repo README', 'In comments'], 1, 'Deployment keys must live in environment variables or an encrypted keystore, never in source.', 'apply'),
      ],
    },
    5: {
      objective: 'Recognise smart contract security risks and the Sonic ecosystem.',
      successCriteria: ['Explain common vulnerabilities', 'Describe mitigation patterns', 'Understand ecosystem DeFi'],
      exercise: 'For a sample contract, identify one reentrancy risk and one access-control gap, and describe the fix.',
      commonMistakes: ['Making external calls before updating state', 'Leaving privileged functions unprotected'],
      knowledgeCheck: [
        q('Which pattern prevents reentrancy?', ['External calls first', 'Checks-effects-interactions', 'More events', 'Higher gas'], 1, 'Updating state before external calls prevents reentrant re-entry.', 'apply'),
        q('A contract function should be callable only by the owner. What must you add?', ['A comment', 'An access-control modifier that checks the caller', 'An event', 'More gas'], 1, 'Sensitive functions need explicit access control on the caller.', 'apply'),
        q('Why is an untrusted price oracle dangerous?', ['It is slow', 'An attacker can manipulate the price and exploit contracts that trust it', 'It costs gas', 'It is deprecated'], 1, 'Manipulable oracles let attackers feed false prices to protocols.', 'evaluate'),
      ],
    },
    6: {
      objective: 'Design contracts for FeeM and deploy to mainnet safely.',
      successCriteria: ['Explain FeeM revenue', 'Register contracts', 'Follow a mainnet checklist'],
      exercise: 'Draft a mainnet deployment checklist covering tests, audit, key management and a FeeM registration step.',
      commonMistakes: ['Deploying to mainnet without a checklist', 'Assuming FeeM earnings without activity'],
      knowledgeCheck: [
        q('FeeM developer revenue comes from…', ['A fixed salary', 'A share of the fees generated by the developer\'s contracts', 'Token inflation only', 'Advertisements'], 1, 'FeeM returns a portion of contract-generated fees to developers.', 'understand'),
        q('What is required for a contract to earn through FeeM?', ['Nothing', 'Registering the contract in the FeeM programme', 'A governance vote', 'A paid subscription'], 1, 'Contracts must be registered to participate in FeeM.', 'recall'),
        q('What belongs on a mainnet deployment checklist?', ['Only the contract name', 'Tests, audit/review, key management, verification and a rollback plan', 'A logo', 'A marketing slogan'], 1, 'A mainnet checklist covers testing, review, keys, verification and recovery.', 'apply'),
      ],
    },
  },

}

export function extendedStageChecks(trackId: string, stageId: number): number {
  return STAGE_LEARNING_PLANS_EXTENDED[trackId]?.[stageId]?.knowledgeCheck.length ?? 0
}
