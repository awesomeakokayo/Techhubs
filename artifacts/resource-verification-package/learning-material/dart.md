# Dart Programming (`dart`)

Slug: `dart-programming` · Category: build · Stages: 4

## Stage 1 — Dart Fundamentals

**Objective:** Write correct, null-safe Dart with the right variable and collection types.

**Success criteria:**
- Use final and const correctly
- Handle null safely
- Choose appropriate collections

### Instruction

Dart's null safety system is its most important modern feature — it eliminates an entire class of runtime errors. Understanding it from day one shapes good habits.

OBJECTIVE
Write correct, null-safe Dart with the right variable and collection types.

SUCCESS CRITERIA
• Use final and const correctly
• Handle null safely
• Choose appropriate collections

WORKED EXAMPLE
Write a CLI calculator. Step 1: read two numbers and an operator from input. Step 2: use a `switch` on the operator. Step 3: handle division by zero with a clear message rather than crashing. Step 4: loop until the user chooses to exit, and test each operation.

COMMON MISTAKES
• Using the null-assertion ! on a value that can be null
• Choosing a List where a Set or Map is clearer

### Worked example

Write a CLI calculator. Step 1: read two numbers and an operator from input. Step 2: use a `switch` on the operator. Step 3: handle division by zero with a clear message rather than crashing. Step 4: loop until the user chooses to exit, and test each operation.

### Common mistakes
- Using the null-assertion ! on a value that can be null
- Choosing a List where a Set or Map is clearer

### Ungraded practice
**Practice: Dart Fundamentals**

DO THIS NOW
Write a script that reads an optional value, uses null-aware operators to avoid crashes, and stores results in a Map and a Set.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is the difference between final and const in Dart?
   - They are identical
   - **✔ final is set once at runtime; const is a compile-time constant**
   - const allows reassignment
   - final requires a type
   - _Answer:_ final is set once at runtime; const is a compile-time constant · _Why:_ final is runtime-immutable; const is compile-time constant. · _Level:_ understand

2. What does the ?? operator do?
   - Throws if null
   - **✔ Returns the left value unless it is null, then the right value**
   - Casts a type
   - Negates a value
   - _Answer:_ Returns the left value unless it is null, then the right value · _Why:_ The ?? operator supplies a fallback when the left operand is null. · _Level:_ understand

3. Which collection guarantees unique elements?
   - List
   - **✔ Set**
   - Map
   - Queue
   - _Answer:_ Set · _Why:_ A Set stores each value at most once. · _Level:_ recall

### Phase project — Build: CLI Calculator (`dart-p1`)

- **Objective:** Complete "CLI Calculator" to a standard you can show and explain to someone else.
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
- 3 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Object-Oriented Dart

**Objective:** Model problems with Dart's object-oriented features.

**Success criteria:**
- Use constructors correctly
- Apply inheritance and interfaces
- Use mixins and generics

### Instruction

Dart is a pure OOP language — everything is an object. Mastering classes and mixins directly translates to how Flutter widgets are structured.

OBJECTIVE
Model problems with Dart's object-oriented features.

SUCCESS CRITERIA
• Use constructors correctly
• Apply inheritance and interfaces
• Use mixins and generics

WORKED EXAMPLE
Model students with classes. Step 1: define a `Student` class with a name and a list of grades. Step 2: add an `average` getter. Step 3: store students in a `List` and look them up in a `Map` by id. Step 4: print a ranked report and handle a student with no grades.

COMMON MISTAKES
• Overusing inheritance where composition is clearer
• Confusing a mixin with a base class

### Worked example

Model students with classes. Step 1: define a `Student` class with a name and a list of grades. Step 2: add an `average` getter. Step 3: store students in a `List` and look them up in a `Map` by id. Step 4: print a ranked report and handle a student with no grades.

### Common mistakes
- Overusing inheritance where composition is clearer
- Confusing a mixin with a base class

### Ungraded practice
**Practice: Object-Oriented Dart**

DO THIS NOW
Model a payment system with an abstract base, two concrete subclasses, and a mixin that adds logging.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is a factory constructor used for?
   - Copying arguments only
   - **✔ Returning an instance that may be a subtype or cached, rather than always a new instance**
   - Compiling code
   - Creating a mixin
   - _Answer:_ Returning an instance that may be a subtype or cached, rather than always a new instance · _Why:_ A factory constructor controls instance creation and may return existing or subtype instances. · _Level:_ understand

2. What does a mixin provide?
   - A way to add reusable behaviour to a class without single-inheritance limits
   - **✔ A database table**
   - A UI widget
   - A build step
   - _Answer:_ A database table · _Why:_ Mixins inject reusable behaviour into classes, Dart's approach to multiple reuse. · _Level:_ understand

3. Why prefer an abstract class or interface for a shared contract?
   - To hide code
   - **✔ So different implementations can satisfy the same interface and be swapped**
   - To speed compilation
   - To avoid types
   - _Answer:_ So different implementations can satisfy the same interface and be swapped · _Why:_ Interfaces let you depend on a contract rather than a concrete implementation. · _Level:_ apply

### Phase project — Build: Student Grade Manager (`dart-p2`)

- **Objective:** Complete "Student Grade Manager" to a standard you can show and explain to someone else.
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
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Async Dart

**Objective:** Handle asynchronous work with Futures, Streams and isolates.

**Success criteria:**
- Use async/await
- Consume a Stream
- Offload CPU work to an isolate

### Instruction

Flutter apps are inherently asynchronous — API calls, animations, user input. Understanding Dart's async model makes you a significantly better Flutter developer.

OBJECTIVE
Handle asynchronous work with Futures, Streams and isolates.

SUCCESS CRITERIA
• Use async/await
• Consume a Stream
• Offload CPU work to an isolate

WORKED EXAMPLE
Fetch weather asynchronously. Step 1: make an HTTP request returning a `Future`. Step 2: `await` the response and decode the JSON. Step 3: map the fields into a typed model. Step 4: wrap the call in try/catch for network and parse errors and show a friendly message.

COMMON MISTAKES
• Blocking the main isolate with heavy work
• Not awaiting a Future and missing errors

### Worked example

Fetch weather asynchronously. Step 1: make an HTTP request returning a `Future`. Step 2: `await` the response and decode the JSON. Step 3: map the fields into a typed model. Step 4: wrap the call in try/catch for network and parse errors and show a friendly message.

### Common mistakes
- Blocking the main isolate with heavy work
- Not awaiting a Future and missing errors

### Ungraded practice
**Practice: Async Dart**

DO THIS NOW
Write code that awaits a Future, listens to a Stream of values, and offloads a heavy computation to an isolate.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is a Future<T>?
   - A synchronous value
   - **✔ A handle to a value that will be available later**
   - A type of Stream
   - A loop
   - _Answer:_ A handle to a value that will be available later · _Why:_ A Future represents a value that completes later, successfully or with an error. · _Level:_ understand

2. What is a Stream<T> in Dart?
   - A single async value
   - **✔ A sequence of asynchronous events over time**
   - A synchronous list
   - A file
   - _Answer:_ A sequence of asynchronous events over time · _Why:_ Streams deliver a sequence of async events, unlike a single Future. · _Level:_ understand

3. Why use an isolate for a heavy computation?
   - It is required
   - **✔ To run work on another thread so the UI is not blocked**
   - To reduce memory always
   - To avoid errors
   - _Answer:_ To run work on another thread so the UI is not blocked · _Why:_ Isolates run on separate threads, keeping the main isolate responsive. · _Level:_ apply

### Phase project — Build: Async Weather CLI (`dart-p3`)

- **Objective:** Complete "Async Weather CLI" to a standard you can show and explain to someone else.
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

## Stage 4 — Dart for Flutter

**Objective:** Connect Dart knowledge to Flutter development.

**Success criteria:**
- Explain AOT compilation
- Relate Dart classes to widgets
- Manage packages

### Instruction

Bridge the gap between pure Dart and Flutter development. Understand how your Dart knowledge translates into every widget, state object, and service you write in Flutter.

OBJECTIVE
Connect Dart knowledge to Flutter development.

SUCCESS CRITERIA
• Explain AOT compilation
• Relate Dart classes to widgets
• Manage packages

WORKED EXAMPLE
Build a Flutter-ready widget model. Step 1: define an immutable widget state class. Step 2: create a `StatefulWidget` whose state updates on a button tap. Step 3: render the state in `build`. Step 4: move the data logic into a plain Dart class so it is testable without Flutter.

COMMON MISTAKES
• Editing generated files
• Adding dependencies without pinning versions

### Worked example

Build a Flutter-ready widget model. Step 1: define an immutable widget state class. Step 2: create a `StatefulWidget` whose state updates on a button tap. Step 3: render the state in `build`. Step 4: move the data logic into a plain Dart class so it is testable without Flutter.

### Common mistakes
- Editing generated files
- Adding dependencies without pinning versions

### Ungraded practice
**Practice: Dart for Flutter**

DO THIS NOW
Add a package via pubspec.yaml, write a small widget-like class, and explain how Dart compiles for a mobile release.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. How does Dart compile for release on mobile?
   - Interpreted line by line
   - **✔ Ahead-of-time (AOT) to native machine code**
   - To JavaScript only
   - To Python
   - _Answer:_ Ahead-of-time (AOT) to native machine code · _Why:_ Flutter release builds use AOT compilation to native code for performance. · _Level:_ understand

2. In Flutter, a widget is…
   - A native Android view
   - **✔ A Dart class describing part of the UI**
   - A CSS file
   - A database
   - _Answer:_ A Dart class describing part of the UI · _Why:_ Flutter UIs are Dart classes (widgets) describing the interface. · _Level:_ understand

3. Where do Dart project dependencies live?
   - **✔ pubspec.yaml**
   - package.json
   - Gemfile
   - requirements.txt
   - _Answer:_ pubspec.yaml · _Why:_ pubspec.yaml declares dependencies and assets for a Dart/Flutter project. · _Level:_ recall

### Phase project — Portfolio project: Dart Package on pub.dev (`dart-p5`)

- **Objective:** Complete "Dart Package on pub.dev" to a standard you can show and explain to someone else.
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
