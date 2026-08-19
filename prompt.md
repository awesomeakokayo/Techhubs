# TECH SKILLS HUB — PREMIUM LANDING PAGE REBUILD

## ROLE

You are acting as a **senior product designer, UX strategist, brand designer, conversion-focused product architect, and senior frontend engineer**.

You are working on an existing production Next.js application for **Tech Skill Hub**.

Your task is to redesign and rebuild the **public landing page / homepage** into a premium, distinctive, editorial-quality experience.

This is NOT a request to simply improve the existing Tailwind components.

This is a **landing-page experience redesign**.

The redesign must preserve the current product functionality and visual identity we have already established while fundamentally improving:

* information hierarchy
* visual storytelling
* page composition
* typography
* section transitions
* user progression
* visual identity
* persuasion
* conversion
* brand recognition
* perceived trust
* clarity
* restraint

The homepage must feel like a serious startup product rather than a generic AI-generated SaaS website.

---

# 1. CORE PRODUCT IDEA

Tech Skill Hub is:

> **Your guide for independent learning.**

The product exists to help people learn technology and software-related skills independently.

The user should not feel that Tech Skill Hub is simply another:

* course marketplace
* coding tutorial website
* collection of links
* AI learning tool
* content directory
* generic bootcamp

The product should feel like a **learning guide and navigation system**.

The core problem being solved is:

> There is an overwhelming amount of information online, but not enough direction.

Tech Skill Hub organizes the journey.

It helps the user understand:

* where to start
* what to learn
* what to learn next
* what to build
* where a path can lead
* when to progress
* how to develop professionally

The homepage should communicate this without explaining every feature.

---

# 2. PRIMARY UX PRINCIPLE

## GUIDE WITHOUT FEELING LIKE YOU ARE BEING GUIDED

This is one of the most important requirements.

The user should feel like they are making the decisions themselves.

However, the actual experience should be carefully designed so that the product naturally leads users through a sequence.

Think of it like:

> **holding someone's hand without them realizing they are being led.**

Not manipulative.

Not aggressive.

Not “BUY NOW.”

Instead:

### User perception

“I discovered this.”

“I chose this.”

“I think this is what I need.”

“I want to see the roadmap.”

“I want to start learning.”

“I want more structure.”

“I think Guided Path might be useful.”

### Actual product architecture

The page is intentionally leading them through:

**Curiosity → Recognition → Direction → Exploration → Commitment → Action → Optional upgrade**

The product should orchestrate these steps naturally.

---

# 3. USER JOURNEY

The homepage should function as a carefully constructed narrative.

The desired conceptual journey is:

```text
I arrive
   ↓
I immediately understand what this is
   ↓
I recognize a problem I have
   ↓
I understand Tech Skill Hub's philosophy
   ↓
I see that there is a clear path
   ↓
I begin thinking about my own direction
   ↓
I explore possible directions
   ↓
I see how the system works
   ↓
I become interested in starting
   ↓
I choose my next step
   ↓
I discover optional deeper guidance
   ↓
I independently choose whether to upgrade
```

The page should never feel like:

```text
WELCOME
↓
FEATURES
↓
FEATURES
↓
FEATURES
↓
PRICING
↓
BUY
```

That is not the desired experience.

The homepage is a narrative.

---

# 4. HERO VISUAL CONCEPT

The hero must NOT use a traditional SaaS split-screen layout.

Avoid:

```text
LEFT: heading
RIGHT: dashboard screenshot
```

Do not use the standard:

* text on left
* image on right
* cards floating around
* gradient blob behind everything

That pattern is too common.

Instead, create a **full-composition hero**.

The typography should be the dominant foreground element while the background quietly communicates the brand.

---

# 5. HERO BACKGROUND — TYPEWRITER

Create a custom visual treatment based around a **typewriter**.

The typewriter is not an ordinary photo.

It should feel like a brand illustration.

### Desired appearance

A large vintage/classic typewriter represented as:

* thin line art
* SVG
* single-line illustration style
* precise contours
* minimal visual detail
* no realistic shading
* no photorealism
* no heavy textures
* no cartoon appearance

The illustration should essentially look as though somebody drew the outline of a typewriter using one carefully controlled pen/pencil stroke.

Do NOT use:

* detailed pencil shading
* realistic charcoal
* photorealistic rendering
* 3D renders
* cartoon vectors
* generic stock illustrations

The typewriter should be:

> **minimal line-art with a premium editorial feel.**

---

# 6. TYPEWRITER COLOR

Use the established Tech Skill Hub brand green.

Do not invent another unrelated green.

The exact brand green should come from the current design tokens/theme.

The SVG should use:

* the primary brand green
* optionally a lower-opacity variation
* possibly an extremely subtle darker/lighter version

The typewriter should NOT compete with the main heading.

It is a visual anchor.

The typewriter should feel almost embedded into the background.

---

# 7. TYPEWRITER COMPOSITION

Do not simply place the typewriter in the middle behind the text.

Create an intentionally composed visual.

Possible layout:

* very large typewriter extending beyond the viewport
* partially cropped by the page
* slightly offset from center
* low-opacity linework
* typography sitting over or slightly in front of it
* selected parts of the linework becoming more visible near the edges
* subtle animation if useful

The typewriter should feel like part of the environment rather than an image pasted into the hero.

The composition should survive:

* desktop
* laptop
* tablet
* mobile

On mobile, the SVG can be cropped aggressively while maintaining the silhouette.

---

# 8. HERO COPY

The hero must contain very little text.

The purpose of the hero is:

> **instant understanding + emotional recognition + direction**

Do NOT put every feature into the hero.

Do NOT say:

* 22 tracks
* 300+ resources
* AI guide
* projects
* career
* premium
* free
* community
* progress tracking

All of that is unnecessary in the first screen.

Use one strong idea.

Preferred messaging direction:

# YOU DON'T NEED ANOTHER COURSE.

## YOU NEED A PATH.

Alternative copy can be considered, but preserve the philosophy.

The supporting text should be approximately one short paragraph.

Something in the range of:

> Tech Skill Hub gives you a clear path to learn valuable technology skills independently — from choosing a direction to building the skills that matter.

Keep it concise.

Primary CTA:

**Find Your Path**

Secondary CTA:

**Explore Tech Skill Hub**

Do not create five competing CTAs.

---

# 9. HERO CTA STRATEGY

The primary CTA should represent the user's first decision.

The natural question after seeing the hero should be:

> “Okay, where should I start?”

Therefore:

**Find Your Path**

should lead to the path-discovery experience or quiz.

The secondary action should be less prominent.

Do not use:

* Start free trial
* Upgrade now
* Buy now
* Get started for $X

in the hero.

The hero is about discovering direction.

---

# 10. HERO MICRO-INTERACTION

If animation is used, it should reinforce the idea of movement.

Potential interaction:

* a subtle path line drawing itself
* typewriter line art slowly appearing
* one highlighted point moving through the route
* tiny cursor movement
* letters appearing subtly
* gentle parallax

Do not overanimate.

The user should be able to ignore the animation and still understand the page.

Animation must respect:

`prefers-reduced-motion`.

---

# 11. SECTION TRANSITIONS

This is extremely important.

The page must NOT look like:

```text
SECTION A
████████████████
hard boundary
████████████████
SECTION B
```

Each section should visually lead into the next.

Use:

* gradients
* overlapping shapes
* background transitions
* color interpolation
* large typography crossing boundaries
* subtle SVG motifs
* line continuations
* curved separators only when intentional
* transparent layers

The user should feel that the page is one continuous visual environment.

---

# 12. COLOR TRANSITION PHILOSOPHY

The brand green remains the anchor.

Do NOT introduce unrelated colors simply because a section needs differentiation.

If the following section uses another color, transition into it gradually.

For example:

```text
GREEN
   ↓
GREEN + WARM NEUTRAL
   ↓
WARM NEUTRAL
```

rather than:

```text
GREEN
██████████

BLUE
██████████

PURPLE
██████████
```

The latter will make the site feel fragmented.

Every section should belong to the same visual world.

---

# 13. OVERALL LANDING PAGE PHILOSOPHY

The homepage should be:

**minimal in information**

but:

**rich in visual composition.**

This distinction is critical.

Do NOT interpret minimalism as:

* empty white screen
* one button
* no visual identity
* no movement
* no personality

Instead:

### Minimal communication

Very few words.

### Rich art direction

Strong typography, line art, colour, composition, whitespace, motion, product visuals and transitions.

---

# 14. HOMEPAGE CONTENT RULE

Every section should communicate ONE primary idea.

If a section is trying to communicate:

* what Tech Skill Hub is
* all the tracks
* how the AI works
* pricing
* career guidance

then split the ideas.

No homepage section should feel like documentation.

The landing page is an introduction.

---

# 15. SECTION 01 — HERO

Purpose:

**Immediate recognition**

Message:

> You don't need another course. You need a path.

Visual:

Large green line-art typewriter.

CTA:

**Find Your Path**

Secondary:

**Explore**

No statistics.

No track cards.

No large feature grid.

No pricing.

No “22 tracks” in the hero.

---

# 16. SECTION 02 — THE PROBLEM

After the hero, do not immediately list product features.

Instead create an editorial statement.

Possible direction:

# THE INTERNET HAS ENOUGH INFORMATION.

## IT DOESN'T HAVE ENOUGH DIRECTION.

Then a short explanation.

The user should recognize themselves.

Someone should think:

> “Exactly.”

This creates emotional resonance before explaining the product.

---

# 17. SECTION 03 — THE PRODUCT PHILOSOPHY

Now introduce Tech Skill Hub.

Keep it extremely concise.

Example:

> Tech Skill Hub organizes the chaos of independent learning into clear paths, practical projects and the next thing you actually need to learn.

Then show one strong visual.

Not eight cards.

---

# 18. SECTION 04 — SHOW THE PATH

This should be one of the most visually important sections.

Show an actual learning path visually.

Example:

```text
01
FOUNDATIONS

↓

02
CORE SKILLS

↓

03
TOOLS

↓

04
BUILD

↓

05
PORTFOLIO

↓

06
CAREER
```

This should be elegant.

Do NOT turn each stage into a giant rounded card.

Use:

* lines
* numbers
* typography
* whitespace
* subtle background visuals
* the Tech Skill Hub green

The user should immediately understand:

> “This platform tells me what comes next.”

---

# 19. SECTION 05 — USER CHOICE

Now introduce the idea that there is no single correct path.

Headline direction:

# WHERE DO YOU WANT TO GO?

Then four choices:

### BUILD

Create software and digital products.

### DESIGN

Create digital experiences.

### ANALYZE

Work with data and systems.

### GROW

Develop business and professional skills.

Keep this section visually calm.

The user should feel:

> “I choose.”

This section should reinforce autonomy.

Each option should lead to a dedicated subpage.

For example:

`/paths/build`

`/paths/design`

`/paths/analyze`

`/paths/grow`

Do not expose every track on the homepage.

---

# 20. SECTION 06 — SHOW, DON'T EXPLAIN

Rather than listing:

* resources
* projects
* roadmaps
* career
* AI

show one or two strong product visuals.

For example:

A beautifully designed screenshot of a roadmap.

Or a cropped track experience.

Or a project milestone.

Accompany it with very little copy.

Possible structure:

### YOU ALWAYS KNOW WHAT COMES NEXT.

Short supporting sentence.

Then a large interface visual.

This communicates the product without explaining every capability.

---

# 21. SECTION 07 — INDEPENDENT LEARNING

This is where the philosophy should become more emotional.

Possible copy:

# LEARN AT YOUR OWN PACE.

Supporting line:

> No classroom schedule. No waiting for the next lesson. Build the skill when you're ready to move.

Do not write a paragraph.

Let the typography do the work.

---

# 22. SECTION 08 — SOCIAL / PRODUCT PROOF

Use real information only.

Do not fabricate:

* testimonials
* users
* company logos
* statistics
* reviews

When real data is strong enough, display a restrained proof section.

Example:

> LEARNERS ARE ALREADY EXPLORING THEIR PATHS.

Then show a few meaningful verified numbers.

Avoid a giant stats dashboard.

---

# 23. SECTION 09 — GUIDED PATH / PREMIUM

This section must NOT feel like:

> Now buy something.

Instead:

> You have chosen a direction.
> You have seen the system.
> You understand how the platform works.
> Now there is an optional deeper level of structure.

Possible headline:

# WANT A MORE STRUCTURED PATH?

Supporting message:

> Guided Path gives you a more deliberate learning experience when you want help staying on course.

Then explain only the essential benefit.

Do not dump every premium feature.

CTA:

**Explore Guided Path**

Not:

**BUY NOW**

The user should perceive this as an option, not pressure.

---

# 24. THE PSYCHOLOGY OF THE PREMIUM SECTION

The user should reach the premium section thinking:

> “This could help me.”

Not:

> “They are trying to sell me something.”

The difference is huge.

The page should first provide enough understanding and value that the user recognizes the need for additional structure.

We are not hiding the paid product.

We are **contextualizing it**.

---

# 25. FINAL CTA

The final CTA should return to the original philosophy.

Possible direction:

# YOU DON'T NEED TO LEARN EVERYTHING.

## YOU NEED TO KNOW WHAT TO LEARN NEXT.

CTA:

**Find Your Path**

This creates a complete narrative loop.

The first message and last message should feel connected.

---

# 26. INFORMATION THAT MUST LEAVE THE HOMEPAGE

Do NOT place the following information in detail on the homepage:

* every learning track
* every skill
* full resource list
* detailed roadmap content
* every project
* detailed AI functionality
* full career database
* detailed pricing comparison
* complete feature matrix
* long FAQ
* detailed testimonials
* full learning statistics

Move these to dedicated pages.

---

# 27. PROPOSED INFORMATION ARCHITECTURE

The homepage should point to a clean product structure.

### `/`

Brand introduction and discovery.

### `/paths`

All major directions.

### `/paths/build`

Build-related learning directions.

### `/paths/design`

Design-related learning directions.

### `/paths/analyze`

Analytical learning directions.

### `/paths/grow`

Professional/business directions.

### `/tracks/[slug]`

Detailed learning track.

### `/resources`

Curated learning library.

### `/projects`

Project-based learning.

### `/career`

Career guidance.

### `/find-your-path`

Quiz / path recommendation experience.

### `/guided-path`

Paid structured learning experience.

This creates progressive disclosure.

---

# 28. NAVIGATION

Keep navigation simple.

Potential structure:

**Tech Skill Hub**

Paths
Resources
Career

Primary CTA:

**Find Your Path**

Then:

Sign In

Keep the header visually quiet.

Do not expose every feature in the navigation.

The navigation itself should reinforce the idea:

> “Start with a direction.”

---

# 29. SECTION TRANSITIONS

Each section should feel connected.

Use a combination of:

* shared background colours
* gradients
* SVG line continuation
* blurred colour diffusion
* overlapping typography
* subtle shape transitions
* common visual motifs

The path illustration can continue subtly through multiple sections.

For example:

Hero path:

`START`

↓

Problem section:

path barely visible

↓

Learning section:

path becomes more visible

↓

Choice section:

path branches into four directions

This is extremely important.

The **visual motif itself can tell the story**.

---

# 30. BRANCHING PATH VISUAL

Use the concept of a path branching at the “Where do you want to go?” section.

For example:

```text
                    BUILD
                   /
START ────────────
                   \
                    DESIGN

                   ANALYZE

                   GROW
```

Do not literally make it look like a technical diagram if it becomes ugly.

The idea should remain elegant.

The user's decision becomes part of the visual narrative.

---

# 31. BRAND VISUAL LANGUAGE

The brand's visual language should consist of:

### Typewriter

Represents learning, writing, creation and craft.

### Path

Represents progression.

### Lines

Represent connection.

### Numbers

Represent stages.

### Green

Represents the recognizable brand identity.

### Editorial typography

Represents confidence and thoughtfulness.

Together these should form a recognizable design system.

---

# 32. TYPEWRITER AS A REUSABLE BRAND ASSET

Do not treat the typewriter as a one-off hero decoration.

Create the illustration as a reusable SVG asset.

Potential uses:

* homepage hero
* empty states
* onboarding
* about page
* social graphics
* promotional materials
* loading screens
* marketing pages

The hero should establish a visual asset that can become part of the brand.

---

# 33. TYPEWRITER ANIMATION

Optionally animate the line-art.

Potential subtle effects:

* stroke reveal
* gentle cursor movement
* faint paper line
* typing indicator
* blinking cursor
* very slow parallax

But do not make the typewriter “type” aggressively.

Avoid gimmicks.

The illustration should feel sophisticated.

---

# 34. DO NOT MAKE THE TYPEWRITER TOO LITERAL

It should not dominate the typography.

The user should first notice:

**the message**

and then notice:

**the visual world behind the message.**

The visual exists to reinforce the brand.

It is not the product itself.

---

# 35. MICROCOPY

Use short copy everywhere.

Examples:

Instead of:

> Explore our comprehensive collection of learning tracks designed to provide a structured learning experience across multiple areas of technology.

Use:

> Find a direction.

Instead of:

> Our carefully curated resources have been selected to help you develop relevant skills.

Use:

> Follow the right resources in the right order.

Instead of:

> Access a wide range of technology disciplines.

Use:

> Choose your path.

The page should feel **edited**.

Every sentence should earn its space.

---

# 36. USER-LED FEELING

Always ask:

> Does this section tell the user what to do?

If yes, ask:

> Can we instead show them why they would naturally want to do it?

For example:

Do NOT:

> Click here to explore our premium guided path.

Prefer:

> When you want more structure, Guided Path keeps your learning moving.

Then:

**Explore Guided Path**

The user should feel that the action is theirs.

---

# 37. NO AGGRESSIVE CONVERSION TACTICS

Do not use:

* countdowns
* fake scarcity
* fake urgency
* “limited time”
* popups immediately after arrival
* repeated pricing CTAs
* manipulative modal interruptions
* fake social proof
* exaggerated claims

The product should sell through:

**clarity + usefulness + trust + desire.**

---

# 38. VISUAL HIERARCHY

Establish a very clear hierarchy.

The viewer's eye should generally move:

```text
BRAND
↓
MAIN IDEA
↓
SUPPORTING IDEA
↓
VISUAL
↓
DECISION
```

Not:

```text
TITLE
CARD
CARD
STAT
CARD
BUTTON
CARD
HEADING
STAT
BUTTON
IMAGE
CARD
```

---

# 39. SPACING

Give the sections significantly more breathing room than the current homepage.

Premium should feel spacious.

Use larger vertical spacing for:

* hero
* major statements
* product visuals
* roadmap sections
* CTA

However, do not create empty space without purpose.

Whitespace should establish hierarchy.

---

# 40. RESPONSIVE BEHAVIOR

Desktop can use the full visual composition.

Mobile should simplify intelligently.

On mobile:

* typewriter may become smaller or partially cropped
* path may become vertical
* branch paths may stack
* large typography scales down carefully
* sections remain visually connected
* CTAs remain easy to reach

Do not simply shrink desktop layouts.

Create a mobile composition.

---

# 41. ACCESSIBILITY

Preserve:

* semantic HTML
* keyboard navigation
* visible focus
* contrast
* screen reader compatibility
* reduced motion

The typewriter and decorative SVG should be marked decorative where appropriate.

Do not let decorative visuals interfere with accessibility.

---

# 42. PERFORMANCE

The typewriter SVG should be optimized.

Avoid:

* huge SVG files
* unnecessary path complexity
* massive image assets
* unnecessary animation libraries

Use CSS/SVG wherever appropriate.

Preserve good Lighthouse performance.

---

# 43. IMPLEMENTATION STRATEGY

Do not immediately rewrite everything.

First inspect the current homepage implementation and determine:

* which components are reusable
* which sections can be repurposed
* which sections should move to subpages
* which components should be removed from the homepage
* which current hero path elements can be retained
* where the new typewriter should live
* what existing design tokens should remain

Then implement the new page.

---

# 44. COMPONENT STRATEGY

Create reusable components where appropriate.

Potential components:

`LandingHero`

`TypewriterIllustration`

`EditorialStatement`

`PathJourney`

`PathChoice`

`LearningPathPreview`

`ProductVisual`

`ProofSection`

`GuidedPathPreview`

`FinalCTA`

`SectionTransition`

Do not over-componentize trivial elements.

---

# 45. PAGE LENGTH

The homepage should become significantly shorter in terms of **information density**.

It can still be visually long.

Target roughly:

```text
Hero
↓
Problem
↓
Philosophy
↓
Path
↓
Choices
↓
Product proof
↓
Guided Path
↓
Final CTA
```

Avoid turning the homepage into a documentation page.

---

# 46. CONTENT DENSITY RULE

Apply this rule to the entire page:

> **If a paragraph exists only to explain something that can be shown visually, remove the paragraph.**

> **If a section exists only because the product has a feature, do not automatically put it on the homepage.**

> **If information is only useful after someone has selected a path, move it to that path.**

> **If information requires explanation, give it its own page.**

---

# 47. THE HOMEPAGE SHOULD FUNCTION AS A DOORWAY

The homepage is not the entire house.

It is the entrance.

Its job is to make users want to walk further inside.

The hierarchy should therefore be:

### Homepage

**Why should I care?**

### Paths

**What direction fits me?**

### Track

**How do I learn it?**

### Dashboard

**What do I do today?**

### Guided Path

**Do I want more structure?**

This is the product architecture we are trying to establish.

---

# 48. CONVERSION FUNNEL

Design the homepage around this natural sequence:

### Stage 1 — Recognition

“I have this problem.”

### Stage 2 — Reassurance

“This product understands the problem.”

### Stage 3 — Curiosity

“I want to see how it works.”

### Stage 4 — Agency

“I can choose my direction.”

### Stage 5 — Commitment

“I want to start learning.”

### Stage 6 — Depth

“I want more structure.”

### Stage 7 — Upgrade

“Guided Path makes sense for me.”

The product should NEVER make Stage 7 feel like it appeared out of nowhere.

The premium product should feel like the natural continuation of the user's existing journey.

---

# 49. FINAL BRAND FEELING

When somebody leaves the landing page, they should remember:

### The message

> You don't need another course. You need a path.

### The visual

The green line-art typewriter.

### The concept

Independent learning.

### The feeling

Calm confidence.

### The action

Find your path.

That is enough.

---

# 50. FINAL QUALITY CHECK

Before finishing, review the homepage and answer:

### Is there too much information?

If yes, remove it.

### Does the hero communicate the product within seconds?

If no, simplify.

### Does the typewriter look like a real brand asset?

If no, redesign it.

### Does the green feel like a coherent brand colour?

If no, revisit the token system.

### Do sections visually blend together?

If no, redesign transitions.

### Does the page feel visually rich without being verbally busy?

If no, reduce copy and improve composition.

### Does the user feel like they are choosing?

If no, reduce directional language.

### Does the page still guide them toward the intended next step?

If no, improve hierarchy and CTA placement.

### Does the premium offer feel like a natural next level?

If no, improve the story leading into it.

### Does the homepage feel like a premium product rather than a portfolio project?

If no, continue refining.

---

# IMPLEMENTATION COMMAND

Start by inspecting the current homepage implementation and existing design system.

Do not modify backend logic.

Do not modify authentication.

Do not modify database behavior.

Do not modify payment logic.

Do not remove working product features.

The redesign should primarily affect:

* homepage composition
* visual system
* typography
* SVG assets
* layout
* navigation presentation
* section transitions
* content hierarchy
* CTA hierarchy
* responsive behavior
* visual storytelling

Move detailed product information out of the homepage rather than deleting it from the product.

Create or reuse the necessary subpages.

Begin with the homepage.

Build the new experience carefully.

Do not generate a generic template.

Do not use a standard SaaS hero.

Do not use a grid-based hero.

Do not fill empty areas with cards.

Do not add unnecessary sections just to make the page longer.

The finished landing page should feel like:

**a premium editorial learning brand with a technology backbone.**

It should look and feel unmistakably like **Tech Skill Hub**.
