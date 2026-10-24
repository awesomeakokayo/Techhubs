# Data Science (`datascience`)

Slug: `data-science` · Category: analyze · Stages: 5

## Stage 1 — Prerequisite: Data Analysis

**Objective:** Be able to clean, query and visualise a dataset before studying statistics and modelling.

**Success criteria:**
- Manipulate data with pandas
- Query with SQL
- Summarise and plot a dataset

### Instruction

Data Science builds on Data Analysis. Complete that track first, especially Python, Pandas, and statistics.

OBJECTIVE
Be able to clean, query and visualise a dataset before studying statistics and modelling.

SUCCESS CRITERIA
• Manipulate data with pandas
• Query with SQL
• Summarise and plot a dataset

WORKED EXAMPLE
Profile a dataset. Step 1: load it and print column types. Step 2: count missing values per column. Step 3: produce three summary statistics and one distribution plot. Step 4: state one hypothesis the data could test, and what evidence would support it.

COMMON MISTAKES
• Dropping rows with missing data without checking for bias
• Reading numbers without context

### Worked example

Profile a dataset. Step 1: load it and print column types. Step 2: count missing values per column. Step 3: produce three summary statistics and one distribution plot. Step 4: state one hypothesis the data could test, and what evidence would support it.

### Common mistakes
- Dropping rows with missing data without checking for bias
- Reading numbers without context

### Ungraded practice
**Practice: Prerequisite: Data Analysis**

DO THIS NOW
Load a CSV in pandas, clean missing values, compute a grouped summary, and plot one chart with labelled axes.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which pandas object is a two-dimensional labelled table?
   - Series
   - **✔ DataFrame**
   - ndarray
   - Index
   - _Answer:_ DataFrame · _Why:_ A DataFrame is a 2D labelled data structure; a Series is one-dimensional. · _Level:_ recall

2. Which SQL clause groups rows so an aggregate can be computed per group?
   - ORDER BY
   - **✔ GROUP BY**
   - LIMIT
   - WHERE
   - _Answer:_ GROUP BY · _Why:_ GROUP BY forms groups that aggregate functions summarise. · _Level:_ understand

3. A dataset of house prices has a few extremely expensive houses. Which summary best represents a typical price?
   - The mean
   - **✔ The median**
   - The maximum
   - The range
   - _Answer:_ The median · _Why:_ The median is robust to outliers; a skewed mean is pulled up by the expensive houses. · _Level:_ apply

### Phase project — Build: Titanic Survival Predictor (`ds-p1`)

- **Objective:** Complete "Titanic Survival Predictor" to a standard you can show and explain to someone else.
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

## Stage 2 — Statistics & Math

**Objective:** Understand the statistics and maths that underpin machine learning.

**Success criteria:**
- Describe common probability distributions
- Explain what a gradient is
- Interpret a hypothesis test correctly

### Instruction

You do not need a math degree, but you need enough to understand why models work and when they fail.

OBJECTIVE
Understand the statistics and maths that underpin machine learning.

SUCCESS CRITERIA
• Describe common probability distributions
• Explain what a gradient is
• Interpret a hypothesis test correctly

WORKED EXAMPLE
Follow a gradient by hand. Step 1: pick a tiny dataset and define the loss as mean squared error. Step 2: choose two candidate weights, compute the loss for each and tabulate them. Step 3: compute the gradient — the slope of the loss with respect to the weight — and note its sign. Step 4: take a small step in the opposite direction, recompute the loss and confirm it fell. Repeat once; you have just run gradient descent, the mathematics behind model training.

COMMON MISTAKES
• Treating a p-value as the probability the hypothesis is true
• Assuming the mean works for skewed data

### Worked example

Follow a gradient by hand. Step 1: pick a tiny dataset and define the loss as mean squared error. Step 2: choose two candidate weights, compute the loss for each and tabulate them. Step 3: compute the gradient — the slope of the loss with respect to the weight — and note its sign. Step 4: take a small step in the opposite direction, recompute the loss and confirm it fell. Repeat once; you have just run gradient descent, the mathematics behind model training.

### Common mistakes
- Treating a p-value as the probability the hypothesis is true
- Assuming the mean works for skewed data

### Ungraded practice
**Practice: Statistics & Math**

DO THIS NOW
For one dataset, report a distribution summary, explain which distribution roughly fits it, and give one example of a correlation that is not causation.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. A machine-learning model is trained by minimising a loss. What does the gradient tell the optimiser?
   - The exact minimum
   - **✔ The direction of steepest increase of the loss**
   - The number of epochs
   - The size of the dataset
   - _Answer:_ The direction of steepest increase of the loss · _Why:_ Gradient descent follows the negative gradient, which points in the direction of steepest increase. · _Level:_ understand

2. A p-value of 0.03 means…
   - There is a 3% chance the hypothesis is true
   - **✔ Assuming the null hypothesis, data this extreme would occur about 3% of the time**
   - The effect size is 3%
   - The result is definitely real
   - _Answer:_ Assuming the null hypothesis, data this extreme would occur about 3% of the time · _Why:_ A p-value is the probability of the data under the null hypothesis, not the probability the hypothesis is true. · _Level:_ analyze

3. Which distribution models the number of successes in a fixed number of independent yes/no trials?
   - Normal
   - **✔ Binomial**
   - Uniform
   - Exponential
   - _Answer:_ Binomial · _Why:_ The binomial distribution counts successes across a fixed number of independent trials. · _Level:_ understand

### Phase project — Build: House Price Prediction (`ds-p2`)

- **Objective:** Complete "House Price Prediction" to a standard you can show and explain to someone else.
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

## Stage 3 — Machine Learning

**Objective:** Build and evaluate supervised and unsupervised models with scikit-learn.

**Success criteria:**
- Distinguish supervised from unsupervised learning
- Evaluate a model honestly
- Engineer useful features

### Instruction

Classical ML is the most practical starting point. Master Scikit-learn and core algorithms first.

OBJECTIVE
Build and evaluate supervised and unsupervised models with scikit-learn.

SUCCESS CRITERIA
• Distinguish supervised from unsupervised learning
• Evaluate a model honestly
• Engineer useful features

WORKED EXAMPLE
Train a baseline classifier. Step 1: split into train and validation. Step 2: fit a simple model. Step 3: report precision and recall on validation, not accuracy alone. Step 4: compare against a majority-class baseline. Do not tune until you have a baseline to beat.

COMMON MISTAKES
• Evaluating on the training data
• Ignoring class imbalance when reading accuracy

### Worked example

Train a baseline classifier. Step 1: split into train and validation. Step 2: fit a simple model. Step 3: report precision and recall on validation, not accuracy alone. Step 4: compare against a majority-class baseline. Do not tune until you have a baseline to beat.

### Common mistakes
- Evaluating on the training data
- Ignoring class imbalance when reading accuracy

### Ungraded practice
**Practice: Machine Learning**

DO THIS NOW
Train a classifier, evaluate it on a held-out test set, and report accuracy plus a confusion matrix. Explain one feature you engineered.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which task is supervised learning?
   - Clustering customers with no labels
   - **✔ Predicting whether an email is spam from labelled examples**
   - Reducing dimensions
   - Finding frequent itemsets
   - _Answer:_ Predicting whether an email is spam from labelled examples · _Why:_ Supervised learning trains on labelled examples to predict an outcome. · _Level:_ understand

2. Why hold out a test set?
   - To speed up training
   - **✔ To estimate performance on data the model has not seen**
   - To make the model smaller
   - To avoid preprocessing
   - _Answer:_ To estimate performance on data the model has not seen · _Why:_ A held-out set gives an honest estimate of generalisation; training accuracy is optimistic. · _Level:_ apply

3. A model scores 99% on training data and 62% on test data. What is happening?
   - Underfitting
   - **✔ Overfitting**
   - Perfect generalisation
   - The test set is wrong
   - _Answer:_ Overfitting · _Why:_ A large train/test gap indicates overfitting to the training data. · _Level:_ analyze

### Phase project — Build: Image Classifier (`ds-p3`)

- **Objective:** Complete "Image Classifier" to a standard you can show and explain to someone else.
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

## Stage 4 — Deep Learning Basics

**Objective:** Understand neural networks and when deep learning is the right tool.

**Success criteria:**
- Explain what a neural network learns
- Describe when CNNs or transfer learning apply
- Train a small model

### Instruction

Deep learning powers modern AI. Start with concepts, then apply with PyTorch or TensorFlow.

OBJECTIVE
Understand neural networks and when deep learning is the right tool.

SUCCESS CRITERIA
• Explain what a neural network learns
• Describe when CNNs or transfer learning apply
• Train a small model

WORKED EXAMPLE
Fine-tune a pretrained model. Step 1: prepare and augment the data. Step 2: freeze the backbone and train the head for a few epochs. Step 3: evaluate on validation. Step 4: inspect the confusion matrix and write down which classes fail most and a plausible reason.

COMMON MISTAKES
• Using deep learning for small tabular problems where simpler models suffice
• Training from scratch when transfer learning would work better

### Worked example

Fine-tune a pretrained model. Step 1: prepare and augment the data. Step 2: freeze the backbone and train the head for a few epochs. Step 3: evaluate on validation. Step 4: inspect the confusion matrix and write down which classes fail most and a plausible reason.

### Common mistakes
- Using deep learning for small tabular problems where simpler models suffice
- Training from scratch when transfer learning would work better

### Ungraded practice
**Practice: Deep Learning Basics**

DO THIS NOW
Train a small neural network on images, then repeat with a pretrained model and compare results and training time.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. For which task is a convolutional neural network (CNN) especially suited?
   - Tabular spreadsheets
   - **✔ Image recognition**
   - Alphabetical sorting
   - Password hashing
   - _Answer:_ Image recognition · _Why:_ CNNs exploit spatial structure and are designed for images. · _Level:_ understand

2. What is transfer learning?
   - Copying a dataset
   - **✔ Reusing a model pre-trained on a large dataset and fine-tuning it for a new task**
   - Moving a model to production
   - Compressing a model
   - _Answer:_ Reusing a model pre-trained on a large dataset and fine-tuning it for a new task · _Why:_ Transfer learning reuses learned features, needing less data and compute for the new task. · _Level:_ understand

3. What is an epoch?
   - One forward pass of a single example
   - **✔ One full pass through the training dataset**
   - The learning rate
   - The final prediction
   - _Answer:_ One full pass through the training dataset · _Why:_ An epoch is one complete pass over the entire training set. · _Level:_ recall

### Phase project — Build: Deep Learning Transfer Learning Pipeline (`ds-p5`)

- **Objective:** Fine-tune a pretrained model and analyse where it fails.
- **Problem:** A small labelled image dataset needs a strong model quickly, without training a network from scratch.
- **Audience:** A team that needs to prove a computer-vision idea works before investing in more data.
- **Required functionality:**
  - Load and split the dataset (train/validation)
  - Fine-tune a pretrained model
  - Track at least two experiments (e.g. learning rate or augmentation)
  - Report a confusion matrix and per-class performance
- **Constraints:**
  - Use a pretrained backbone rather than training from scratch
  - Document the split and preprocessing
  - Do not leak validation data into training
- **Acceptance criteria (brief):**
  - The model beats a majority-class baseline on validation
  - Experiments are comparable and logged
  - At least three concrete error cases are explained
- **Required evidence:**
  - Notebook or repository
  - Training/validation metrics
  - Error-analysis notes with example failures
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The model beats a majority-class baseline on validation (weight 1)
  - Experiments are comparable and logged (weight 1)
  - At least three concrete error cases are explained (weight 1)
- **Acceptance criteria (contract):**
  - The model beats a majority-class baseline on validation
  - Experiments are comparable and logged
  - At least three concrete error cases are explained

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — MLOps & Deployment

**Objective:** Deploy and monitor models responsibly.

**Success criteria:**
- Serialize and serve a model
- Expose predictions through an API
- Monitor for drift

### Instruction

A model in a Jupyter notebook has zero impact. Learn to deploy models as usable APIs.

OBJECTIVE
Deploy and monitor models responsibly.

SUCCESS CRITERIA
• Serialize and serve a model
• Expose predictions through an API
• Monitor for drift

WORKED EXAMPLE
Assemble a portfolio case study. Step 1: state the question. Step 2: describe the data and the method. Step 3: give the result with its uncertainty. Step 4: state the limitation and share the notebook so a reviewer can rerun it end to end.

COMMON MISTAKES
• Assuming a model stays accurate forever
• Shipping without recording the model version

### Worked example

Assemble a portfolio case study. Step 1: state the question. Step 2: describe the data and the method. Step 3: give the result with its uncertainty. Step 4: state the limitation and share the notebook so a reviewer can rerun it end to end.

### Common mistakes
- Assuming a model stays accurate forever
- Shipping without recording the model version

### Ungraded practice
**Practice: MLOps & Deployment**

DO THIS NOW
Save a trained model, serve it behind a FastAPI endpoint, and describe what you would monitor after deployment.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Why does a deployed model need monitoring?
   - To make it faster
   - **✔ Because input data and relationships drift over time, degrading predictions**
   - To reduce storage
   - Because APIs require it
   - _Answer:_ Because input data and relationships drift over time, degrading predictions · _Why:_ Data and concept drift erode accuracy; monitoring detects it so you can retrain. · _Level:_ evaluate

2. What does an experiment-tracking tool such as MLflow record?
   - Only the final model
   - **✔ Parameters, metrics and artifacts for each training run**
   - User passwords
   - CSS styles
   - _Answer:_ Parameters, metrics and artifacts for each training run · _Why:_ Experiment tracking records runs so results are reproducible and comparable. · _Level:_ understand

3. What must you capture to load a saved model later?
   - Only the accuracy
   - **✔ The serialized model plus its preprocessing and version**
   - The dataset path only
   - The training font
   - _Answer:_ The serialized model plus its preprocessing and version · _Why:_ A model is only reproducible with its serialized weights and the preprocessing/version it expects. · _Level:_ apply

### Phase project — Portfolio project: Deployed ML API (`ds-p4`)

- **Objective:** Complete "Deployed ML API" to a standard you can show and explain to someone else.
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
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
