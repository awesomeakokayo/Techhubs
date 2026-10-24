# Data Analysis (`data`)

Slug: `data-analysis` · Category: analyze · Stages: 5

## Stage 1 — Spreadsheets & Excel

**Objective:** Clean, analyse and visualise tabular data in spreadsheets with formulas and pivot tables.

**Success criteria:**
- Use lookup and aggregation formulas
- Build a pivot table
- Produce a clear chart

### Instruction

Excel is still the most-used data tool in the world. Master it completely before moving on.

OBJECTIVE
Clean, analyse and visualise tabular data in spreadsheets with formulas and pivot tables.

SUCCESS CRITERIA
• Use lookup and aggregation formulas
• Build a pivot table
• Produce a clear chart

WORKED EXAMPLE
Clean a messy sales sheet. Step 1: remove duplicate rows. Step 2: trim whitespace and standardise date formats. Step 3: build a pivot of revenue by month with a chart. Step 4: add a data-validation rule that prevents future bad dates from being entered. Record how many rows each cleaning step removed.

COMMON MISTAKES
• Hard-coding values instead of referencing cells
• Charts with misleading axes
• Leaving duplicates and blanks in the data

### Worked example

Clean a messy sales sheet. Step 1: remove duplicate rows. Step 2: trim whitespace and standardise date formats. Step 3: build a pivot of revenue by month with a chart. Step 4: add a data-validation rule that prevents future bad dates from being entered. Record how many rows each cleaning step removed.

### Common mistakes
- Hard-coding values instead of referencing cells
- Charts with misleading axes
- Leaving duplicates and blanks in the data

### Ungraded practice
**Practice: Spreadsheets & Excel**

DO THIS NOW
Take a messy spreadsheet: clean duplicates and blanks, build a pivot table summarising a key metric by category, and create one chart that communicates the finding.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which function looks a value up in another table?
   - SUM
   - **✔ VLOOKUP**
   - COUNT
   - IF
   - _Answer:_ VLOOKUP · _Why:_ VLOOKUP finds a value in a table by matching a key; INDEX/MATCH is more flexible. · _Level:_ recall

2. What is a pivot table for?
   - Storing raw data
   - **✔ Summarising and grouping data interactively**
   - Formatting cells
   - Encrypting a workbook
   - _Answer:_ Summarising and grouping data interactively · _Why:_ Pivot tables aggregate and group data for analysis. · _Level:_ understand

3. A bar chart starts its y-axis at 80 instead of 0. What is the risk?
   - None
   - **✔ It exaggerates small differences and can mislead**
   - It improves accuracy
   - It is required by Excel
   - _Answer:_ It exaggerates small differences and can mislead · _Why:_ A truncated axis can visually exaggerate differences. · _Level:_ evaluate

### Phase project — Build: Sales Dashboard (`da-p1`)

- **Objective:** Complete "Sales Dashboard" to a standard you can show and explain to someone else.
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

## Stage 2 — SQL Fundamentals

**Objective:** Query relational data with SQL: filtering, aggregation, joins, subqueries and window functions.

**Success criteria:**
- Filter and sort with WHERE/ORDER BY
- Aggregate with GROUP BY
- Combine tables with joins
- Use window functions for running totals or ranks

### Instruction

SQL is the language of data. Every analyst uses it every single day.

OBJECTIVE
Query relational data with SQL: filtering, aggregation, joins, subqueries and window functions.

SUCCESS CRITERIA
• Filter and sort with WHERE/ORDER BY
• Aggregate with GROUP BY
• Combine tables with joins
• Use window functions for running totals or ranks

WORKED EXAMPLE
Answer "top customers by revenue". Step 1: start from `orders` and join `customers` on `customer_id`. Step 2: filter to paid orders with `WHERE status = 'paid'`. Step 3: `GROUP BY customer_id` and `SUM(amount)`. Step 4: `ORDER BY` the total descending and `LIMIT 10`. Run it with and without the filter and explain why the ranking differs.

COMMON MISTAKES
• Using WHERE instead of HAVING to filter aggregates
• Forgetting that LEFT JOIN keeps unmatched left rows
• Assuming NULL comparisons work with =

### Worked example

Answer "top customers by revenue". Step 1: start from `orders` and join `customers` on `customer_id`. Step 2: filter to paid orders with `WHERE status = 'paid'`. Step 3: `GROUP BY customer_id` and `SUM(amount)`. Step 4: `ORDER BY` the total descending and `LIMIT 10`. Run it with and without the filter and explain why the ranking differs.

### Common mistakes
- Using WHERE instead of HAVING to filter aggregates
- Forgetting that LEFT JOIN keeps unmatched left rows
- Assuming NULL comparisons work with =

### Ungraded practice
**Practice: SQL Fundamentals**

DO THIS NOW
Given an orders and customers schema, write queries for: total revenue per month, the top 5 customers by revenue, and each customer’s most recent order date.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which clause filters groups produced by GROUP BY?
   - WHERE
   - **✔ HAVING**
   - ORDER BY
   - LIMIT
   - _Answer:_ HAVING · _Why:_ HAVING filters after aggregation; WHERE filters rows before grouping. · _Level:_ understand

2. You need every customer, even those with no orders. Which join?
   - INNER JOIN
   - **✔ LEFT JOIN**
   - CROSS JOIN
   - FULL OUTER JOIN only
   - _Answer:_ LEFT JOIN · _Why:_ LEFT JOIN preserves all left-side rows, including customers with no matching orders. · _Level:_ apply

3. Which window function assigns a rank within each group?
   - SUM()
   - **✔ ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)**
   - COUNT(*)
   - AVG()
   - _Answer:_ ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) · _Why:_ ROW_NUMBER with PARTITION BY ranks rows within each group. · _Level:_ apply

### Phase project — Build: SQL Dataset Analysis (`da-p2`)

- **Objective:** Answer specific business questions with SQL and present the findings.
- **Problem:** A business needs answers from its raw relational data.
- **Audience:** A non-technical decision maker.
- **Required functionality:**
  - Analytical queries
  - Aggregations and joins
  - A clear summary
- **Constraints:**
  - Read-only queries
  - Explain each query in plain language
- **Acceptance criteria (brief):**
  - Each question is answered by a query
  - Results are validated against a sanity check
  - Summary explains the finding
- **Required evidence:**
  - SQL file
  - Result tables or screenshots
  - Written summary
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Each question is answered by a query (weight 1)
  - Results are validated against a sanity check (weight 1)
  - Summary explains the finding (weight 1)
- **Acceptance criteria (contract):**
  - Each question is answered by a query
  - Results are validated against a sanity check
  - Summary explains the finding

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Python for Data

**Objective:** Analyse data in Python with pandas and NumPy and visualise findings.

**Success criteria:**
- Load and clean data with pandas
- Aggregate and reshape
- Plot a clear chart

### Instruction

Python unlocks powerful data analysis at scale. Pandas is your most important library.

OBJECTIVE
Analyse data in Python with pandas and NumPy and visualise findings.

SUCCESS CRITERIA
• Load and clean data with pandas
• Aggregate and reshape
• Plot a clear chart

WORKED EXAMPLE
Analyse a dataset with pandas. Step 1: load the CSV and print `dtypes` and a missing-value count. Step 2: handle missing values deliberately — drop or fill, and say which. Step 3: compute a group-by mean and plot it. Step 4: write one sentence on how each cleaning decision could bias the result.

COMMON MISTAKES
• Dropping rows with missing values without considering bias
• Chaining methods that silently mutate data
• Plotting without labelling axes

### Worked example

Analyse a dataset with pandas. Step 1: load the CSV and print `dtypes` and a missing-value count. Step 2: handle missing values deliberately — drop or fill, and say which. Step 3: compute a group-by mean and plot it. Step 4: write one sentence on how each cleaning decision could bias the result.

### Common mistakes
- Dropping rows with missing values without considering bias
- Chaining methods that silently mutate data
- Plotting without labelling axes

### Ungraded practice
**Practice: Python for Data**

DO THIS NOW
Load a CSV with missing values. Clean it, merge a second table, compute a grouped summary, and plot one chart. Document each cleaning decision.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which pandas structure is a two-dimensional labelled table?
   - Series
   - **✔ DataFrame**
   - ndarray
   - Index
   - _Answer:_ DataFrame · _Why:_ A DataFrame is a 2D labelled data structure. · _Level:_ recall

2. What does df.groupby("region")["sales"].sum() return?
   - A single number
   - **✔ Total sales per region**
   - The whole table
   - An error
   - _Answer:_ Total sales per region · _Why:_ It groups by region and sums sales for each group. · _Level:_ apply

3. Before dropping rows with missing values, what should you check?
   - The column colours
   - **✔ How many rows are affected and whether the missingness is biased**
   - The file size
   - The index type
   - _Answer:_ How many rows are affected and whether the missingness is biased · _Why:_ Dropping can bias the analysis; understand the missingness first. · _Level:_ evaluate

### Phase project — Build: Student Performance Analysis (`da-p3`)

- **Objective:** Complete "Student Performance Analysis" to a standard you can show and explain to someone else.
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
- 3 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — BI & Visualization Tools

**Objective:** Build interactive dashboards that communicate a clear story to a non-technical audience.

**Success criteria:**
- Connect a BI tool to data
- Design a readable dashboard
- Choose the right chart for the question

### Instruction

Great analysis is useless if you cannot communicate it. Build dashboards that tell clear stories.

OBJECTIVE
Build interactive dashboards that communicate a clear story to a non-technical audience.

SUCCESS CRITERIA
• Connect a BI tool to data
• Design a readable dashboard
• Choose the right chart for the question

WORKED EXAMPLE
Build a one-page dashboard. Step 1: choose one headline metric. Step 2: add one trend line over time. Step 3: add one breakdown by segment. Step 4: remove any element that does not change a decision, and label every axis with its unit.

COMMON MISTAKES
• Cramming every metric onto one page
• Pie charts for many categories
• No clear focal metric or takeaway

### Worked example

Build a one-page dashboard. Step 1: choose one headline metric. Step 2: add one trend line over time. Step 3: add one breakdown by segment. Step 4: remove any element that does not change a decision, and label every axis with its unit.

### Common mistakes
- Cramming every metric onto one page
- Pie charts for many categories
- No clear focal metric or takeaway

### Ungraded practice
**Practice: BI & Visualization Tools**

DO THIS NOW
Build a one-page dashboard for a business metric: connect the data, add filters, choose appropriate charts, and write one sentence stating the main insight.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Which chart best shows a trend over time?
   - Pie chart
   - **✔ Line chart**
   - Scatter plot
   - Gauge
   - _Answer:_ Line chart · _Why:_ Line charts show trends over time clearly. · _Level:_ apply

2. What is the most important element of a dashboard?
   - The number of charts
   - **✔ A clear takeaway or focal metric**
   - Bright colours
   - Animation
   - _Answer:_ A clear takeaway or focal metric · _Why:_ A dashboard should communicate a clear message, not display everything. · _Level:_ evaluate

3. When is a pie chart a poor choice?
   - For two categories
   - **✔ When there are many categories with similar values**
   - For percentages summing to 100
   - Never
   - _Answer:_ When there are many categories with similar values · _Why:_ Many similar slices are hard to compare; use a bar chart instead. · _Level:_ analyze

### Phase project — Build: Financial Report Dashboard (`da-p4`)

- **Objective:** Complete "Financial Report Dashboard" to a standard you can show and explain to someone else.
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

## Stage 5 — Statistics Basics

**Objective:** Apply basic statistics correctly and avoid common misinterpretations.

**Success criteria:**
- Summarise data with appropriate measures
- Interpret spread and correlation
- Explain what a hypothesis test does and does not prove

### Instruction

You need enough statistics to avoid drawing wrong conclusions from your data.

OBJECTIVE
Apply basic statistics correctly and avoid common misinterpretations.

SUCCESS CRITERIA
• Summarise data with appropriate measures
• Interpret spread and correlation
• Explain what a hypothesis test does and does not prove

WORKED EXAMPLE
Compare two groups. Step 1: state the null hypothesis. Step 2: check the sample sizes are adequate. Step 3: run the appropriate test and note its assumptions. Step 4: report the effect size and confidence interval — not just the p-value — and state any assumption you could not verify.

COMMON MISTAKES
• Using the mean for skewed data without checking
• Treating correlation as causation
• Reading a p-value as the probability the hypothesis is true

### Worked example

Compare two groups. Step 1: state the null hypothesis. Step 2: check the sample sizes are adequate. Step 3: run the appropriate test and note its assumptions. Step 4: report the effect size and confidence interval — not just the p-value — and state any assumption you could not verify.

### Common mistakes
- Using the mean for skewed data without checking
- Treating correlation as causation
- Reading a p-value as the probability the hypothesis is true

### Ungraded practice
**Practice: Statistics Basics**

DO THIS NOW
For a dataset, report mean and median, explain which better represents the data and why, and give one example of a correlation that is not causation.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. When is the median preferred over the mean?
   - When data is symmetric
   - **✔ When data is skewed or has outliers**
   - Never
   - Only for two values
   - _Answer:_ When data is skewed or has outliers · _Why:_ The median is robust to outliers and skew. · _Level:_ apply

2. Ice cream sales and drowning incidents rise together. What is the correct conclusion?
   - Ice cream causes drowning
   - **✔ A third factor such as warm weather likely explains both**
   - Drowning causes ice cream sales
   - The data is wrong
   - _Answer:_ A third factor such as warm weather likely explains both · _Why:_ Correlation does not imply causation; a confounder is likely. · _Level:_ evaluate

3. A p-value of 0.03 means…
   - There is a 3% chance the hypothesis is true
   - **✔ Assuming the null hypothesis, results this extreme are unlikely (3%)**
   - The effect is large
   - The study is proven
   - _Answer:_ Assuming the null hypothesis, results this extreme are unlikely (3%) · _Why:_ A p-value is the probability of the data under the null hypothesis, not the probability the hypothesis is true. · _Level:_ analyze

### Phase project — Portfolio project: End-to-End Analytics Portfolio Project (`da-p5`)

- **Objective:** Complete "End-to-End Analytics Portfolio Project" to a standard you can show and explain to someone else.
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
