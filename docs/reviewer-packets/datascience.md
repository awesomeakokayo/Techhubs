# Reviewer packet — Data Science

- **Track id:** `datascience`  ·  **Slug:** `data-science`  ·  **Category:** analyze  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.6/100 · worthiness 99.2/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Prerequisite: Data Analysis | Be able to clean, query and visualise a dataset before studying statistics and modelling. | Complete first | 4 |
| 2 | Statistics & Math | Understand the statistics and maths that underpin machine learning. | 3 to 4 weeks | 4 |
| 3 | Machine Learning | Build and evaluate supervised and unsupervised models with scikit-learn. | 6 to 8 weeks | 5 |
| 4 | Deep Learning Basics | Understand neural networks and when deep learning is the right tool. | 4 to 5 weeks | 5 |
| 5 | MLOps & Deployment | Deploy and monitor models responsibly. | 2 to 3 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 5.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 3 — Machine Learning**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 2 — Statistics & Math**: content-inspected required resources 2, objective-matching resources 2, playback-verified resources 0.
- **Stage 1 — Prerequisite: Data Analysis**: content-inspected required resources 2, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Prerequisite: Data Analysis

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Simple Classifier Tutorial | required | L3 | content-inspection | — | 1 | https://scikit-learn.org/stable/modules/tree.html |
| fast.ai | required | L3 | content-inspection | — | 0 | https://www.fast.ai |
- _L3 required evidence — Scikit-Learn: “1.10. Decision Trees # Decision Trees (DTs) are a non-parametric supervised learning method used for classification and regression . The goal is to create a model that predicts the value of a target variable by learning…”_
- _L3 required evidence — fast.ai: “Courses : How to Solve it With Code ; Practical Deep Learning for Coders Software : fastai for PyTorch ; nbdev Book : Practical Deep Learning for Coders with fastai and PyTorch In the news : The Economist ; The New York…”_

### Stage 2 — Statistics & Math

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| StatQuest with Josh Starmer | required | L2 | http-probe | — | 0 | https://www.youtube.com/@statquest |
| Practical Deep Learning (fast.ai) | required | L3 | content-inspection | — | 2 | https://course.fast.ai |
| Introduction to Statistical Learning | required | L3 | content-inspection | — | 2 | https://www.statlearning.com |
- _L3 required evidence — fast.ai: “New! We just launched a new >30 hour video course for more experienced students: Practical Deep Learning for Coders part 2: Deep Learning Foundations to Stable Diffusion This free course is designed for people (and bunn…”_
- _L3 required evidence — James, Witten, Hastie, Tibshirani: “An Introduction to Statistical Learning Download ISL with R Download ISL with Python As the scale and scope of data collection continue to increase across virtually all fields, statistical learning has become a critical…”_

### Stage 3 — Machine Learning

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| scikit-learn — Getting Started | required | L3 | content-inspection | — | 1 | https://scikit-learn.org/stable/getting_started.html |
| ML Full Course | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=i_LwzRVP7bg |
| Kaggle Learn ML | required | L2 | http-probe | — | 0 | https://www.kaggle.com/learn |
- _L3 required evidence — scikit-learn: “Getting Started # Scikit-learn is an open source machine learning library that supports supervised and unsupervised learning. It also provides various tools for model fitting, data preprocessing, model selection, model …”_

### Stage 4 — Deep Learning Basics

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| PyTorch Official Tutorials | required | L3 | content-inspection | — | 2 | https://pytorch.org/tutorials |
- _L3 required evidence — Meta AI: “index Run in Google Colab Colab Download Notebook Notebook View on GitHub GitHub Welcome to PyTorch Tutorials # What’s new in PyTorch tutorials? Data Loading Optimization in PyTorch Distributed Training with Ray Train S…”_

### Stage 5 — MLOps & Deployment

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| MLflow Deployment Guide | required | L3 | content-inspection | — | 1 | https://mlflow.org/docs/latest/ml/deployment/ |
| Build Your First MLOps Pipeline | required | L3 | content-inspection | — | 1 | https://kodekloud.com/blog/how-to-build-your-first-mlops-pipeline/ |
- _L3 required evidence — MLflow: “After training your machine learning model and ensuring its performance, the next step is deploying it to a production environment. This process can be complex, but MLflow simplifies it by offering an easy toolset for d…”_
- _L3 required evidence — KodeKloud: “Highlights What you'll build: A complete, hands-on MLOps pipeline using MLflow 3, DVC, FastAPI, and Docker - laptop-only, no cloud account required. Time required: ~90 minutes if you code along. Prerequisites: Python 3.…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 2 | StatQuest with Josh Starmer | L2 | not verified | not verified — review manually |
| 3 | ML Full Course | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Prerequisite: Data Analysis (3 questions)

1. Which pandas object is a two-dimensional labelled table?
   - · Series
   - **✔ DataFrame**
   - · ndarray
   - · Index
   - _Why:_ A DataFrame is a 2D labelled data structure; a Series is one-dimensional. · _level: recall_
2. Which SQL clause groups rows so an aggregate can be computed per group?
   - · ORDER BY
   - **✔ GROUP BY**
   - · LIMIT
   - · WHERE
   - _Why:_ GROUP BY forms groups that aggregate functions summarise. · _level: understand_
3. A dataset of house prices has a few extremely expensive houses. Which summary best represents a typical price?
   - · The mean
   - **✔ The median**
   - · The maximum
   - · The range
   - _Why:_ The median is robust to outliers; a skewed mean is pulled up by the expensive houses. · _level: apply_

### Stage 2 — Statistics & Math (3 questions)

1. A machine-learning model is trained by minimising a loss. What does the gradient tell the optimiser?
   - · The exact minimum
   - **✔ The direction of steepest increase of the loss**
   - · The number of epochs
   - · The size of the dataset
   - _Why:_ Gradient descent follows the negative gradient, which points in the direction of steepest increase. · _level: understand_
2. A p-value of 0.03 means…
   - · There is a 3% chance the hypothesis is true
   - **✔ Assuming the null hypothesis, data this extreme would occur about 3% of the time**
   - · The effect size is 3%
   - · The result is definitely real
   - _Why:_ A p-value is the probability of the data under the null hypothesis, not the probability the hypothesis is true. · _level: analyze_
3. Which distribution models the number of successes in a fixed number of independent yes/no trials?
   - · Normal
   - **✔ Binomial**
   - · Uniform
   - · Exponential
   - _Why:_ The binomial distribution counts successes across a fixed number of independent trials. · _level: understand_

### Stage 3 — Machine Learning (3 questions)

1. Which task is supervised learning?
   - · Clustering customers with no labels
   - **✔ Predicting whether an email is spam from labelled examples**
   - · Reducing dimensions
   - · Finding frequent itemsets
   - _Why:_ Supervised learning trains on labelled examples to predict an outcome. · _level: understand_
2. Why hold out a test set?
   - · To speed up training
   - **✔ To estimate performance on data the model has not seen**
   - · To make the model smaller
   - · To avoid preprocessing
   - _Why:_ A held-out set gives an honest estimate of generalisation; training accuracy is optimistic. · _level: apply_
3. A model scores 99% on training data and 62% on test data. What is happening?
   - · Underfitting
   - **✔ Overfitting**
   - · Perfect generalisation
   - · The test set is wrong
   - _Why:_ A large train/test gap indicates overfitting to the training data. · _level: analyze_

### Stage 4 — Deep Learning Basics (3 questions)

1. For which task is a convolutional neural network (CNN) especially suited?
   - · Tabular spreadsheets
   - **✔ Image recognition**
   - · Alphabetical sorting
   - · Password hashing
   - _Why:_ CNNs exploit spatial structure and are designed for images. · _level: understand_
2. What is transfer learning?
   - · Copying a dataset
   - **✔ Reusing a model pre-trained on a large dataset and fine-tuning it for a new task**
   - · Moving a model to production
   - · Compressing a model
   - _Why:_ Transfer learning reuses learned features, needing less data and compute for the new task. · _level: understand_
3. What is an epoch?
   - · One forward pass of a single example
   - **✔ One full pass through the training dataset**
   - · The learning rate
   - · The final prediction
   - _Why:_ An epoch is one complete pass over the entire training set. · _level: recall_

### Stage 5 — MLOps & Deployment (3 questions)

1. Why does a deployed model need monitoring?
   - · To make it faster
   - **✔ Because input data and relationships drift over time, degrading predictions**
   - · To reduce storage
   - · Because APIs require it
   - _Why:_ Data and concept drift erode accuracy; monitoring detects it so you can retrain. · _level: evaluate_
2. What does an experiment-tracking tool such as MLflow record?
   - · Only the final model
   - **✔ Parameters, metrics and artifacts for each training run**
   - · User passwords
   - · CSS styles
   - _Why:_ Experiment tracking records runs so results are reproducible and comparable. · _level: understand_
3. What must you capture to load a saved model later?
   - · Only the accuracy
   - **✔ The serialized model plus its preprocessing and version**
   - · The dataset path only
   - · The training font
   - _Why:_ A model is only reproducible with its serialized weights and the preprocessing/version it expects. · _level: apply_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `ds-p1` (rubric rizw7jo-8)

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

### Stage 2 — project `ds-p2` (rubric rizw7jo-8)

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

### Stage 3 — project `ds-p3` (rubric rizw7jo-8)

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

### Stage 4 — project `ds-p5` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The model beats a majority-class baseline on validation | 1 | no |
| Experiments are comparable and logged | 1 | no |
| At least three concrete error cases are explained | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 5 — project `ds-p4` (rubric rizw7jo-8)

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

### Stage 1 — Build: Titanic Survival Predictor

- **Objective:** Complete "Titanic Survival Predictor" to a standard you can show and explain to someone else.
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

### Stage 2 — Build: House Price Prediction

- **Objective:** Complete "House Price Prediction" to a standard you can show and explain to someone else.
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

### Stage 3 — Build: Image Classifier

- **Objective:** Complete "Image Classifier" to a standard you can show and explain to someone else.
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

### Stage 4 — Build: Deep Learning Transfer Learning Pipeline

- **Objective:** Fine-tune a pretrained model and analyse where it fails.
- **Problem:** A small labelled image dataset needs a strong model quickly, without training a network from scratch.
- **Audience:** A team that needs to prove a computer-vision idea works before investing in more data.
- **Required functionality:**
  - Load and split the dataset (train/validation)
  - Fine-tune a pretrained model
  - Track at least two experiments (e.g. learning rate or augmentation)
  - Report a confusion matrix and per-class performance
- **Acceptance criteria:**
  - The model beats a majority-class baseline on validation
  - Experiments are comparable and logged
  - At least three concrete error cases are explained
- **Required evidence:**
  - Notebook or repository
  - Training/validation metrics
  - Error-analysis notes with example failures
- **Constraints:**
  - Use a pretrained backbone rather than training from scratch
  - Document the split and preprocessing
  - Do not leak validation data into training

### Stage 5 — Portfolio project: Deployed ML API

- **Objective:** Complete "Deployed ML API" to a standard you can show and explain to someone else.
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

- **Stage 1:** Profile a dataset. Step 1: load it and print column types. Step 2: count missing values per column. Step 3: produce three summary statistics and one distribution plot. Step 4: state one hypothesis the data could test, a…
- **Stage 2:** Follow a gradient by hand. Step 1: pick a tiny dataset and define the loss as mean squared error. Step 2: choose two candidate weights, compute the loss for each and tabulate them. Step 3: compute the gradient — the slo…
- **Stage 3:** Train a baseline classifier. Step 1: split into train and validation. Step 2: fit a simple model. Step 3: report precision and recall on validation, not accuracy alone. Step 4: compare against a majority-class baseline.…
- **Stage 4:** Fine-tune a pretrained model. Step 1: prepare and augment the data. Step 2: freeze the backbone and train the head for a few epochs. Step 3: evaluate on validation. Step 4: inspect the confusion matrix and write down wh…
- **Stage 5:** Assemble a portfolio case study. Step 1: state the question. Step 2: describe the data and the method. Step 3: give the result with its uncertainty. Step 4: state the limitation and share the notebook so a reviewer can …

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 2 — required (L2): https://www.youtube.com/@statquest
- Stage 3 — required (L2): https://www.youtube.com/watch?v=i_LwzRVP7bg
- Stage 3 — required (L2): https://www.kaggle.com/learn

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.6) **and** worthiness ≥ 90 (this track: 99.2).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

