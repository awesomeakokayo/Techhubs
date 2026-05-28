# CURSOR BUILD PROMPT
## Tech Skills Learning Hub — Full Website
### Version 1.0 | Complete Production Brief

---

> **HOW TO USE THIS PROMPT**
> Read this entire document before writing a single line of code.
> This is your product specification, design system, content architecture,
> interaction model, and development guide — all in one.
> The .md file (Tech_Skills_Learning_Hub.md) contains all the content.
> This prompt tells you how to build the site that presents it.

---

## 1. PROJECT IDENTITY

### What This Is
A public-facing educational web platform called the **Tech Skills Learning Hub** — a free, comprehensive learning resource for university students and young adults across Africa (and beyond) who want to break into technology.

The site must feel like a **premium learning platform** — not a link dump, not a Google Doc, not a generic website. It should feel like it was built by people who deeply care about the students using it.

### Who It Is For
- University students with zero tech background who are curious
- Students mid-way through learning who need structure
- Young adults who want to switch into tech careers
- People in Nigeria, Ghana, Kenya, and across Africa who have limited access to expensive bootcamps

### The Promise of the Site
"Everything you need to start, structure, and complete your journey into tech — in one place, for free."

### Tone & Personality
The site is:
- **Warm** — like a brilliant senior student guiding a junior
- **Direct** — no fluff, no corporate language
- **Confident** — the content is strong, the site should feel that way
- **Energetic** — learning should feel exciting, not like homework
- **Credible** — resources link to the world's best platforms (Harvard, Google, MDN)

---

## 2. TECH STACK

### Required Stack
```
Framework:        Next.js 14 (App Router)
Styling:          Tailwind CSS v3 + custom CSS variables
Animations:       Framer Motion
Icons:            Lucide React
Fonts:            Google Fonts (see Typography section)
Markdown Parser:  gray-matter + remark/rehype (for content)
Search:           Fuse.js (client-side fuzzy search)
Package Manager:  npm or pnpm
Deployment:       Vercel (configure vercel.json)
```

### Optional Enhancements (add if feasible)
```
Progress Tracking:  localStorage (no login required)
Copy Links:         navigator.clipboard API
Print/Export:       window.print() with print stylesheets
Analytics:          Vercel Analytics (free tier)
```

### Project Structure
```
/
├── app/
│   ├── layout.tsx              ← Root layout with nav + footer
│   ├── page.tsx                ← Landing / Hero page
│   ├── tracks/
│   │   ├── page.tsx            ← All tracks overview
│   │   └── [slug]/
│   │       └── page.tsx        ← Individual track page
│   ├── roadmaps/
│   │   └── page.tsx            ← All roadmaps page
│   ├── resources/
│   │   └── page.tsx            ← Master resource index
│   ├── projects/
│   │   └── page.tsx            ← Projects hub
│   ├── ai-guide/
│   │   └── page.tsx            ← AI integration guide
│   ├── career/
│   │   └── page.tsx            ← Career preparation
│   └── start-here/
│       └── page.tsx            ← Beginner guide
├── components/
│   ├── ui/                     ← Reusable UI primitives
│   ├── layout/                 ← Nav, Footer, Sidebar
│   ├── tracks/                 ← Track-specific components
│   ├── search/                 ← Search components
│   └── home/                   ← Landing page sections
├── content/
│   └── tracks/                 ← One .md or .ts file per track
├── lib/
│   ├── tracks.ts               ← Track data and helpers
│   ├── resources.ts            ← Resource data
│   └── search.ts               ← Search index builder
├── public/
│   └── icons/                  ← Tech logos (SVG)
└── styles/
    └── globals.css             ← CSS variables + base styles
```

---

## 3. DESIGN SYSTEM

### 3.1 COLOR PALETTE

This site uses a **dark-first design** with a vibrant accent system.
The darkness communicates focus and seriousness. The accents communicate energy and possibility.

#### Base Colors (CSS Variables)
```css
:root {
  /* === BACKGROUNDS === */
  --bg-void:        #080B10;   /* Deepest background — page base */
  --bg-deep:        #0D1117;   /* Main content background */
  --bg-surface:     #161B22;   /* Card surfaces */
  --bg-elevated:    #1C2333;   /* Elevated cards, hover states */
  --bg-overlay:     #21262D;   /* Modals, dropdowns */

  /* === BORDERS === */
  --border-subtle:  #21262D;   /* Subtle dividers */
  --border-default: #30363D;   /* Default card borders */
  --border-active:  #388BFD;   /* Active/focused borders */

  /* === TEXT === */
  --text-primary:   #E6EDF3;   /* Main body text */
  --text-secondary: #8B949E;   /* Secondary/muted text */
  --text-muted:     #484F58;   /* Placeholders, disabled */
  --text-inverse:   #0D1117;   /* Text on bright backgrounds */

  /* === PRIMARY ACCENT — Electric Teal === */
  --accent-primary:       #00D4AA;   /* Main CTA color */
  --accent-primary-dim:   #00A884;   /* Hover state */
  --accent-primary-glow:  rgba(0, 212, 170, 0.15);  /* Glow effect */
  --accent-primary-bg:    rgba(0, 212, 170, 0.08);  /* Subtle tint */

  /* === SECONDARY ACCENT — Amber/Gold === */
  --accent-secondary:     #F0A500;   /* Highlights, badges */
  --accent-secondary-dim: #C47D00;
  --accent-secondary-bg:  rgba(240, 165, 0, 0.08);

  /* === TERTIARY ACCENT — Soft Purple === */
  --accent-tertiary:      #A78BFA;   /* Tags, categories */
  --accent-tertiary-dim:  #7C5CDB;
  --accent-tertiary-bg:   rgba(167, 139, 250, 0.08);

  /* === TRACK COLORS (one per learning track) === */
  --track-frontend:       #61DAFB;   /* React blue */
  --track-backend:        #68D391;   /* Node green */
  --track-fullstack:      #F6AD55;   /* Orange */
  --track-python:         #FFD43B;   /* Python yellow */
  --track-uiux:           #F687B3;   /* Pink */
  --track-qa:             #76E4F7;   /* Cyan */
  --track-data:           #9F7AEA;   /* Purple */
  --track-datascience:    #B794F4;   /* Light purple */
  --track-devops:         #FC8181;   /* Red/coral */
  --track-cyber:          #48BB78;   /* Security green */
  --track-mobile:         #63B3ED;   /* Blue */
  --track-video:          #F6AD55;   /* Warm orange */
  --track-youtube:        #FC8181;   /* YouTube red */
  --track-marketing:      #68D391;   /* Marketing green */
  --track-ai:             #00D4AA;   /* Teal (AI = primary) */
  --track-nocode:         #A78BFA;   /* Purple */

  /* === SEMANTIC COLORS === */
  --color-success:  #3FB950;
  --color-warning:  #D29922;
  --color-error:    #F85149;
  --color-info:     #388BFD;

  /* === GRADIENTS === */
  --gradient-hero:    linear-gradient(135deg, #080B10 0%, #0D1117 40%, #0A1628 100%);
  --gradient-card:    linear-gradient(135deg, #161B22 0%, #1C2333 100%);
  --gradient-accent:  linear-gradient(90deg, #00D4AA, #A78BFA);
  --gradient-text:    linear-gradient(90deg, #00D4AA 0%, #61DAFB 50%, #A78BFA 100%);
  --gradient-teal:    linear-gradient(135deg, #00D4AA, #0099CC);
  --gradient-warm:    linear-gradient(135deg, #F0A500, #FC8181);

  /* === SHADOWS === */
  --shadow-card:    0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3);
  --shadow-raised:  0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
  --shadow-glow-teal:   0 0 20px rgba(0, 212, 170, 0.3), 0 0 60px rgba(0, 212, 170, 0.1);
  --shadow-glow-amber:  0 0 20px rgba(240, 165, 0, 0.3);

  /* === SPACING SCALE === */
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   32px;
  --space-2xl:  48px;
  --space-3xl:  64px;
  --space-4xl:  96px;
  --space-5xl:  128px;

  /* === RADIUS === */
  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-full: 9999px;

  /* === TRANSITIONS === */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base:   250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   400ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

### 3.2 TYPOGRAPHY

#### Font Choices
```css
/* DISPLAY FONT — Headlines, Hero Text */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
/* Syne: geometric, modern, confident. Perfect for a tech platform. */

/* BODY FONT — All readable content */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
/* DM Sans: highly readable, warm, approachable. Great for long content. */

/* MONO FONT — Code, technical terms, labels */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
/* JetBrains Mono: the standard for developer tools. Legible and credible. */
```

#### Type Scale
```css
:root {
  /* Display */
  --text-display-xl:  clamp(3rem, 8vw, 6rem);     /* Hero headline */
  --text-display-lg:  clamp(2.25rem, 5vw, 4rem);  /* Page titles */
  --text-display-md:  clamp(1.75rem, 3.5vw, 2.75rem); /* Section titles */

  /* Headings */
  --text-h1:  clamp(1.5rem, 2.5vw, 2.25rem);
  --text-h2:  clamp(1.25rem, 2vw, 1.75rem);
  --text-h3:  clamp(1.1rem, 1.5vw, 1.375rem);
  --text-h4:  1.125rem;

  /* Body */
  --text-lg:  1.125rem;   /* Lead paragraphs */
  --text-base: 1rem;      /* Default body */
  --text-sm:  0.875rem;   /* Secondary info */
  --text-xs:  0.75rem;    /* Labels, captions */
  --text-xxs: 0.6875rem;  /* Tiny badges */

  /* Line Heights */
  --leading-tight:    1.25;
  --leading-snug:     1.375;
  --leading-normal:   1.5;
  --leading-relaxed:  1.625;
  --leading-loose:    1.8;

  /* Letter Spacing */
  --tracking-tight:   -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;
  --tracking-wider:   0.1em;
  --tracking-widest:  0.15em;
}
```

#### Typography Rules
- All display/headline text uses `font-family: 'Syne', sans-serif`
- All body and UI text uses `font-family: 'DM Sans', sans-serif`
- All code, file paths, technical labels use `font-family: 'JetBrains Mono', monospace`
- Headline weight: 700–800
- Subheadings: 600
- Body: 400, lead paragraphs: 500
- Never use font-weight below 300
- Track names and category labels are displayed in ALL CAPS with `letter-spacing: 0.1em` using the mono font

---

### 3.3 COMPONENT DESIGN LANGUAGE

#### Cards
All cards follow this pattern:
```
Background:     var(--bg-surface)
Border:         1px solid var(--border-default)
Border-radius:  var(--radius-lg)
Padding:        24px
Shadow:         var(--shadow-card)

On hover:
  Border-color: var(--accent-primary) with 40% opacity
  Background:   var(--bg-elevated)
  Transform:    translateY(-2px)
  Shadow:       var(--shadow-raised)
  Transition:   var(--transition-base)
```

Cards that represent a **track** get a left-border accent:
```
border-left: 3px solid var(--track-[trackname])
```

#### Buttons

**Primary CTA Button:**
```
Background:     var(--accent-primary)
Color:          var(--text-inverse)
Font:           Syne, weight 600
Padding:        12px 28px
Border-radius:  var(--radius-full)
Letter-spacing: 0.02em
Hover:          background var(--accent-primary-dim), shadow var(--shadow-glow-teal)
Active:         scale(0.97)
```

**Secondary Button (outlined):**
```
Background:     transparent
Color:          var(--text-primary)
Border:         1px solid var(--border-default)
Hover:          border-color var(--accent-primary), color var(--accent-primary)
```

**Ghost Button:**
```
Background:     transparent
Color:          var(--accent-primary)
No border
Hover:          background var(--accent-primary-bg)
```

**Tag/Badge:**
```
Background:     var(--accent-primary-bg)
Color:          var(--accent-primary)
Font:           JetBrains Mono, size 0.7rem, weight 500
Padding:        4px 10px
Border-radius:  var(--radius-full)
Text:           uppercase, letter-spacing 0.1em
```

Track-specific tags use the track color instead of primary accent.

#### Progress Bar
```
Container background:   var(--border-subtle)
Fill background:        var(--gradient-accent)
Height:                 4px
Border-radius:          var(--radius-full)
Animated fill on load with spring easing
```

#### Links inside content
```
Color:          var(--accent-primary)
Underline:      none by default
Hover:          underline, color var(--accent-primary-dim)
External links: append small ↗ icon after text
```

---

## 4. HCI PRINCIPLES — IMPLEMENTATION GUIDE

> Human-Computer Interaction principles must be built into every component and page.
> This is not decoration — it is the architecture of how users learn and navigate.

---

### 4.1 FITTS'S LAW — Make Targets Easy to Hit
- All interactive elements minimum **44×44px touch target** (critical for mobile)
- Primary CTAs must be large and prominently positioned, not competing with nearby links
- Navigation items have generous padding: minimum `12px 16px`
- Cards are fully clickable (not just a link inside them) — wrap in `<a>` or use `onClick`
- Track cards: entire card surface is the click target

### 4.2 HICK'S LAW — Reduce Decision Paralysis
- The homepage presents a **maximum of 4 primary choices** in the hero before any scrolling
- The "All Tracks" grid shows tracks grouped into 4 categories (not listed as 17 individual items)
  - `BUILD` → Frontend, Backend, Full-Stack, Mobile, Python
  - `DESIGN` → UI/UX, No-Code, Technical Writing
  - `ANALYZE` → Data Analysis, Data Science
  - `GROW` → DevOps, Cybersecurity, Digital Marketing, YouTube, Video Editing, AI, QA
- Navigation should never have more than 6 top-level items
- "Where do I start?" quiz is featured prominently to help undecided users self-select

### 4.3 MILLER'S LAW — Limit Working Memory Load
- Never show more than 7 items in a list without grouping or pagination
- Roadmap stages are shown **one stage at a time** (tabbed or accordion), not all at once
- Resource lists inside tracks are shown with categories (Documentation, Videos, Practice) — not as one long list
- The sidebar navigation on track pages shows progress through the content sections

### 4.4 GESTALT PRINCIPLES — Visual Grouping
- **Proximity:** Related items (resources of same type) are visually grouped with consistent spacing
- **Similarity:** All track cards look identical in structure — consistency builds trust
- **Continuity:** Roadmap stages use a connected visual timeline, not disconnected steps
- **Figure/Ground:** Content areas have a slightly elevated background (`--bg-surface`) against the page (`--bg-deep`)
- **Common Region:** Each section of a track page (Roadmap / Resources / Projects) is enclosed in a visually distinct container

### 4.5 VISIBILITY OF SYSTEM STATUS (Nielsen)
- Track progress is saved in localStorage and shown as a filled progress bar on track cards
- Currently active page is highlighted in nav with accent color AND underline
- Search input shows a loading spinner when indexing
- Resource links show a small indicator if they point to free vs paid content
- "Jump to section" TOC highlights as the user scrolls

### 4.6 RECOGNITION OVER RECALL (Nielsen)
- Every track has a consistent icon (not random) visible at all times
- Color coding is consistent — `--track-frontend` is always React blue everywhere it appears
- Breadcrumbs on all inner pages: `Home → Tracks → Frontend Development`
- Section headings are always visible (sticky sidebar TOC on desktop)
- Search returns results grouped by type (Track, Resource, Project, Roadmap) — users recognize categories

### 4.7 USER CONTROL & FREEDOM (Nielsen)
- Every page has a clear back navigation
- "Mark as complete" actions are reversible — click again to unmark
- Search can be cleared with a single Escape key or ✕ button
- Mobile drawer menu closes on backdrop click AND on Escape
- No content is hidden behind required login or signup

### 4.8 AESTHETIC AND MINIMALIST DESIGN (Nielsen)
- Each track page section shows only the most essential information by default
- "Show all resources" expandable section for the full resource list
- Descriptions are concise — no paragraph longer than 4 sentences on navigation pages
- Icons replace text labels wherever the icon is unambiguous

### 4.9 PROGRESSIVE DISCLOSURE
- Track cards on the homepage show: name, tagline, difficulty badge, and time estimate
- Clicking a card reveals: full roadmap, resources, projects, AI guide, career path
- Roadmap shows stage titles by default; clicking a stage reveals its full content
- Resource lists show top 5 by default with "View all X resources" button

### 4.10 AFFORDANCES & SIGNIFIERS
- Cards subtly lift on hover (transform + shadow) — signals "clickable"
- Links show arrow icon (→) on hover — signals "navigable"
- Accordion chevron rotates 180° when expanded — signals "collapsible"
- Buttons have press animation (scale 0.97) — signals "interactive"
- Copy button appears on hover over code blocks — signals "copyable"
- Progress checkbox has checkmark animation — signals "completable"

---

## 5. PAGE-BY-PAGE SPECIFICATIONS

---

### 5.1 LANDING PAGE (`/`)

#### Hero Section
```
Layout:         Full viewport height (100vh), centered content
Background:     var(--gradient-hero) + animated particle grid or
                CSS noise texture overlay (subtle, grain-like)

Content (centered, max-width 800px):

  OVERLINE (above main headline):
    Text:       "FREE · OPEN · FOR EVERY STUDENT"
    Font:       JetBrains Mono, 0.75rem, var(--text-secondary)
    Style:      Letter-spacing 0.2em, with small teal dot separators

  MAIN HEADLINE (H1):
    Line 1:     "Your Roadmap"
    Line 2:     "Into Tech" ← this line uses gradient text
    Font:       Syne, var(--text-display-xl), weight 800
    Line 2 uses: background: var(--gradient-text), background-clip: text

  SUBHEADLINE:
    Text:       "Every learning path, resource, project, and roadmap
                 you need — from absolute beginner to job-ready.
                 Structured. Free. Built for you."
    Font:       DM Sans, var(--text-lg), var(--text-secondary)
    Max-width:  560px, centered

  CTA ROW (two buttons, horizontally centered):
    Button 1:   "Start Learning →" — PRIMARY style
    Button 2:   "Browse All Tracks" — SECONDARY style (outlined)
    Gap:        16px

  HERO STATS ROW (below CTAs, 40px margin-top):
    Three stats side by side:
    "17+ Tracks" | "300+ Resources" | "100% Free"
    Font: Syne 600, number in accent color, label in --text-secondary
    Separated by vertical dividers
```

#### Animated Background
```
Option A (preferred): CSS-only animated grid
  - Subtle dot grid pattern using CSS background
  - Very faint, 5% opacity, moves slowly (CSS animation, 20s loop)
  - A few "glowing" cells that pulse (teal, amber) randomly placed

Option B: SVG animated topology/wave
  - Low-opacity SVG paths that slowly animate
  - 3–4% opacity max — should never distract from text
```

#### "How It Works" Section
```
Layout:     3 columns (stack on mobile)
Background: var(--bg-surface) strip

Cards (3 total):
  Card 1: "01 — Pick Your Track"
    Icon: Map pin or compass (Lucide)
    Desc: "Choose from 17 career paths. Don't know where to start?
           Take the 2-minute quiz."

  Card 2: "02 — Follow the Roadmap"
    Icon: Route or arrow-right (Lucide)
    Desc: "Every track has a clear stage-by-stage path from
           zero to job-ready."

  Card 3: "03 — Build & Ship"
    Icon: Rocket or package (Lucide)
    Desc: "Projects, resources, and AI guides are built into
           every track."

Card numbers use var(--accent-primary) in very large mono font (4rem, 10% opacity) as background decoration.
```

#### Track Categories Grid
```
Headline: "Choose Your Path"
Sub:      "Pick the area that excites you. Every path leads somewhere real."

Layout:   4 category sections, each with a row of track cards

CATEGORY: BUILD (color: var(--accent-primary))
Tracks:   Frontend, Backend, Full-Stack, Mobile, Python

CATEGORY: DESIGN (color: var(--accent-tertiary))
Tracks:   UI/UX, No-Code, Technical Writing

CATEGORY: ANALYZE (color: var(--accent-secondary))
Tracks:   Data Analysis, Data Science

CATEGORY: GROW (color: var(--color-info))
Tracks:   DevOps, Cybersecurity, QA, Digital Marketing, Video, YouTube, AI

Each track card shows:
  - Track icon (SVG or Lucide)
  - Track name (Syne, 1rem, 600)
  - One-line tagline
  - Difficulty badge (⭐ Easy / ⭐⭐ Medium / ⭐⭐⭐ Hard)
  - Estimated time ("4–6 months")
  - Left border in track color
  - Arrow → that appears on hover
```

#### "Why This Hub?" Section
```
Layout:   Two columns: left = text, right = visual list

Left:
  Headline:   "Built for students who can't afford to waste time"
  Body text:  3 short paragraphs about the hub's philosophy
  (pull from the hub's "Final Note" section)

Right (visual checklist):
  ✓ 17 complete learning tracks
  ✓ Roadmaps from beginner to job-ready
  ✓ 300+ curated, verified resource links
  ✓ AI usage guides built into every track
  ✓ Project ideas with rubrics
  ✓ Career prep: CVs, interviews, freelancing
  ✓ Built for African students and context
  ✓ Zero cost. No signup required.

Each item: teal checkmark, DM Sans 1rem
Animate items in with stagger on scroll enter
```

#### "Start Here" Quiz Teaser
```
Section:    Centered, var(--bg-elevated) background
Headline:   "Not sure where to start?"
Sub:        "Answer 3 quick questions and we'll point you to the right track."
CTA:        "Take the Quiz →" (primary button)
Visual:     Simple illustration of a decision tree (CSS/SVG)
```

#### Footer
```
Background:     var(--bg-void)
Border-top:     1px solid var(--border-subtle)

Layout:         3 columns + copyright row

Column 1:
  Logo + site name
  Tagline: "A free learning hub for the next generation of African tech talent."

Column 2:
  Heading: "Quick Links"
  Links: Start Here, All Tracks, Roadmaps, Resources, AI Guide, Career Prep, Projects

Column 3:
  Heading: "Community"
  Links: (to community resources from the hub doc)
  Ingressive for Good, HNG, She Code Africa, freeCodeCamp Forum, The Odin Project Discord

Copyright row:
  "Built with ♥ for students everywhere. All resources link to their original creators."
  Small secondary text
```

---

### 5.2 ALL TRACKS PAGE (`/tracks`)

#### Page Header
```
Breadcrumb:   Home / Tracks
Headline:     "All Learning Tracks"
Sub:          "17 paths from beginner to professional."
```

#### Filter Bar (Sticky, below site nav)
```
Pill filters: ALL · BUILD · DESIGN · ANALYZE · GROW
              + Difficulty: BEGINNER FRIENDLY · INTERMEDIATE · ADVANCED
Style: pill buttons, active = filled teal, inactive = outlined
When filter active: animate cards out/in with Framer Motion layout animation
```

#### Track Grid
```
Layout:   Responsive grid — 3 cols desktop, 2 cols tablet, 1 col mobile
Gap:      24px

Each Track Card:
┌─────────────────────────────────────────┐
│ [ICON]  FRONTEND DEVELOPMENT            │ ← Track name in Syne 700
│         ─────────────────────           │
│ Build everything users see and interact │ ← tagline DM Sans
│ with on the web.                        │
│                                         │
│ ⭐⭐⭐ Medium   ⏱ 4–6 months          │ ← badges
│                                         │
│ HTML · CSS · JS · React · Next.js       │ ← tech tags (mono font)
│                          [Explore →]    │
└─────────────────────────────────────────┘

Left border: 3px solid var(--track-frontend)
On hover: lift + glow from left border color
```

---

### 5.3 INDIVIDUAL TRACK PAGE (`/tracks/[slug]`)

This is the most important page in the site. A student will spend most of their time here.

#### Layout
```
Desktop:
  Left sidebar (240px fixed): Section navigation + progress
  Main content (flex-grow): Track content
  Right sidebar (200px): Table of contents (jumps to sections)

Mobile:
  Top: Track header
  Below: Tab navigation for sections
  Content: Full width, no sidebars
```

#### Track Header
```
Background:     Subtle gradient using track color at 5% opacity
                linear-gradient(135deg, rgba(var(--track-COLOR), 0.05) 0%, transparent 60%)

Content:
  Breadcrumb:   Home / Tracks / Frontend Development
  Icon:         Large track icon (48px)
  Title:        Track name — Syne 800, very large
  Tagline:      One sentence description — DM Sans, --text-secondary
  Meta row:     [Difficulty] [Time Estimate] [Category badge]
  Progress bar: "Your Progress" + percentage + visual bar
                (reads from localStorage, defaults to 0%)
```

#### Left Sidebar — Section Navigation
```
Sections (in order):
  📋 Overview
  🗺️ Roadmap
  📚 Resources
  🔨 Projects
  🤖 AI Guide
  💼 Career Path

Each:
  - Icon + label
  - Active section highlighted with track color
  - Completed sections show ✓ checkmark
  - Clicking scrolls to section smoothly
```

#### Section 1: Overview
```
Content:
  - What is this skill? (2–3 short paragraphs)
  - "Who is this for?" (3 bullet points)
  - "What can you build?" (3 example outcomes)
  - "Jobs you can get" (4–5 job titles as tags)
  - "Time to entry-level work" (visual indicator)

Design:
  Info cards for jobs — each job title in a rounded pill
  Background: var(--accent-primary-bg), color: var(--accent-primary)
```

#### Section 2: Roadmap
```
Design: Visual STAGE TIMELINE

Desktop layout: Vertical timeline with stage cards to the right
Mobile layout: Vertical stacked cards

Each stage card:
  ┌──────────────────────────────────────────┐
  │  STAGE 1                    [6–8 WEEKS]  │
  │  Foundations                             │
  │  ─────────────────────────────────────   │
  │  • HTML5: Structure of web pages         │
  │  • CSS3: Styling and layout              │
  │  • Responsive Design                     │
  │  • Basic JavaScript                      │
  │                              [Expand ↓]  │
  └──────────────────────────────────────────┘

States:
  Default:     collapsed, showing title + bullet list
  Expanded:    reveals full description + resource links for that stage
  Completed:   left border turns solid track color, faint ✓ background

Timeline connector:
  Vertical line connecting stages (dashed when not completed, solid teal when completed)
  Circle node at each stage that turns from outline → filled on completion

Stage completion:
  Checkbox at top right of each stage card
  On check: animate fill, update progress bar, save to localStorage
```

#### Section 3: Resources
```
Tabbed layout: [Documentation] [Videos] [Practice] [Books] [Tools]

Each resource item:
  ┌─────────────────────────────────────────────────────┐
  │  ▶  JavaScript.info                         [FREE]  │
  │     The Modern JavaScript Tutorial                   │
  │     javascript.info           [Open ↗]              │
  └─────────────────────────────────────────────────────┘

  Icon:    Favicon or category icon
  Title:   Bold, DM Sans 500
  Description: Subdued, --text-secondary
  URL:     Small mono text
  Badge:   FREE (green) / PAID (amber) / FREEMIUM (blue)
  Link:    Opens in new tab

On hover: card lifts, link underlines
```

#### Section 4: Projects
```
Three difficulty columns:
  BEGINNER | INTERMEDIATE | ADVANCED

Each project card:
  - Project number (#01, #02)
  - Project name
  - One-line description
  - Tech tags (pills in mono font)
  - "Mark as built" checkbox that adds ✓ to localStorage

Completed projects shown with strikethrough + green tint background
```

#### Section 5: AI Guide
```
Design: Distinct visual style — slightly different background to signal "this is different"
Background: var(--bg-elevated) with subtle AI-themed pattern

Sections:
  "What AI helps with" — green check items list
  "What AI cannot replace" — red X items list
  "Recommended Tools" — cards with tool name, use case, link
  "Sample Prompts" — code-block style with copy button

Prompt cards:
  Background: var(--bg-void)
  Border: 1px solid var(--border-default)
  Border-left: 3px solid var(--accent-primary)
  Font: JetBrains Mono, 0.85rem
  Copy button: top-right corner, appears on hover
```

#### Section 6: Career Path
```
Job titles: Large pills with salary range below
Freelancing: callout box with rates
Resources: links to CV builder, LinkedIn guide, interview prep
```

---

### 5.4 ROADMAPS PAGE (`/roadmaps`)

```
Headline:   "Visual Roadmaps"
Sub:        "Where you're going before you start walking."

Cards for all roadmaps (pull from roadmap.sh + hub doc)

Each roadmap card:
  - Title
  - 2-line description
  - Three stage preview: Beginner → Intermediate → Advanced
  - "View Full Roadmap →" link to roadmap.sh
  - "Explore Track →" link to internal track page

Visual: The three stages shown as connected pills in gradient from grey → track-color
```

---

### 5.5 RESOURCES PAGE (`/resources`)

```
Purpose: Master index of ALL resources from the hub

Search bar: Full-width, prominent, live search with Fuse.js
Filters: By track, by type (Video / Docs / Practice / Community / Tools)

Table view (default):
  | Resource | Type | Track | Free? | Link |

Card view (toggle):
  Same as resource cards in track pages

"Featured Resources" at top:
  The 10 essential sites from Part 3 of the hub
  Shown as large highlighted cards above the full list
```

---

### 5.6 START HERE PAGE (`/start-here`)

```
Purpose: The beginner onboarding guide from the hub

Layout: Long-form editorial with clear sections

Sections:
  1. "You're in the right place" — welcoming intro
  2. "The 7 Steps" — numbered cards from Beginner Survival Guide
  3. "Which track is for you?" — embedded quiz (see below)
  4. "Your first week" — concrete 7-day plan
  5. "Join a community" — community cards with links

The Quiz ("Which track is right for you?"):
  3 questions, multi-choice
  Q1: "What sounds most exciting to you?"
    A) Building things users can see and click
    B) Logic, data, and systems working behind the scenes
    C) Making things look beautiful and intuitive
    D) Understanding and protecting systems
    E) Creating content or growing an audience

  Q2: "How do you prefer to work?"
    A) Visually — I think in layouts and colors
    B) Analytically — I think in logic and patterns
    C) Creatively — I think in stories and experiences
    D) Strategically — I think in systems and plans

  Q3: "What's your goal?"
    A) Get a job at a tech company
    B) Build my own products
    C) Freelance and work independently
    D) Understand tech enough to lead or manage

  Result: Show 2–3 recommended tracks with "Start This Track →" buttons
  Smooth animated result reveal
  localStorage saves the result
```

---

### 5.7 AI GUIDE PAGE (`/ai-guide`)

```
Purpose: Dedicated AI for Work section from the hub

Hero:
  Headline: "Use AI Like a Pro"
  Sub: "Not as a shortcut. As a thinking partner."
  Visual: animated diagram showing Human ↔ AI collaboration loop

Sections:
  1. The Core Philosophy — 4 principles as large quote cards
  2. Prompt Engineering Basics — visual guide with examples
  3. AI by Track — accordion showing AI guide for each track
  4. Tools Directory — cards for all AI tools
  5. Ethics & Verification — callout section
```

---

### 5.8 CAREER PAGE (`/career`)

```
Purpose: Full career preparation section

Sections:
  1. CV/Resume — tips + link to rxresu.me
  2. Portfolio Building — the 3-layer framework as visual steps
  3. Interview Prep — tabs: Coding / Behavioral / System Design / Take-Home
  4. Freelancing — platforms, pricing table, first client guide
  5. LinkedIn — optimization tips
  6. Communities — African + global communities grid
```

---

## 6. NAVIGATION ARCHITECTURE

### Top Navigation Bar
```
Background:     var(--bg-deep) with backdrop-filter: blur(16px)
                rgba(13, 17, 23, 0.85)
Border-bottom:  1px solid var(--border-subtle)
Height:         64px
Position:       sticky, top: 0, z-index: 100

Left:
  Logo: "TSH" in Syne 800, gradient text (teal → purple)
  Site name: "Tech Skills Hub" in Syne 600

Center (desktop only):
  Navigation links:
  [Tracks] [Roadmaps] [Resources] [AI Guide] [Career] [Start Here]

Right:
  Search icon (opens search modal on click)
  Theme toggle (dark/light — optional)

Mobile:
  Logo left, hamburger right
  Hamburger opens full-screen overlay menu (not a sidebar)
```

### Full-Screen Mobile Menu
```
Background:     var(--bg-void)
Animation:      slide up from bottom + fade in (Framer Motion)

Content:
  Large navigation links (Syne, 2rem)
  Category sub-links
  Search bar
  Footer links

Close:          X button top right + swipe down gesture + Escape
```

### Search Modal
```
Trigger:        Cmd+K shortcut (desktop) + search icon click
Animation:      fade in backdrop + slide down search box

Design:
  Full-width search input, large (24px font)
  Placeholder: "Search tracks, resources, projects..."
  Results appear immediately as user types (Fuse.js)
  Results grouped: Tracks / Resources / Projects / Roadmaps
  Keyboard navigation: arrow up/down, enter to select, escape to close
```

---

## 7. INTERACTION & ANIMATION SYSTEM

### Page Transitions
```
On route change: fade out (150ms) → route change → fade in + slide up (200ms)
Use Next.js App Router + Framer Motion AnimatePresence
```

### Scroll Animations
```
Trigger:        Intersection Observer (elements animate when entering viewport)
Default:        fade in + translate Y(20px → 0)
Duration:       400ms
Easing:         cubic-bezier(0.4, 0, 0.2, 1)
Stagger:        Children animate 80ms apart

Apply to:
  - Track cards on homepage and tracks page
  - "How It Works" step cards
  - Resource items
  - Project cards
  - Stats row in hero
```

### Micro-Interactions
```
Card hover:
  - transform: translateY(-2px) — 250ms spring
  - box-shadow: increased depth
  - border-color: track accent (40% opacity → 100%)

Button press:
  - transform: scale(0.97) on mousedown
  - Restore on mouseup

Progress checkbox:
  - Circular fill animation (SVG stroke-dashoffset animation)
  - Confetti burst on stage completion (canvas-confetti library)

Navigation link hover:
  - Underline slides in from left (CSS pseudo-element animation)

Link with arrow (→):
  - Arrow translates right 4px on hover

Track card open:
  - Smooth page transition with track color flash

Copy button:
  - Icon changes from Copy to Check on copy
  - Reverts after 2s

Search:
  - Instant results, no delay feeling
  - Selected result has highlight animation
```

### Loading States
```
Page load:     Top progress bar (linear, teal, 2px height)
Lazy sections: Skeleton screens matching the content's shape
Search:        Subtle spinner inside input while indexing
Images:        Blur-up progressive loading
```

---

## 8. PROGRESS & PERSONALIZATION SYSTEM

### localStorage Schema
```javascript
// Key: "tsh-progress"
{
  "tracks": {
    "frontend": {
      "started": true,
      "completedStages": [1, 2],         // stage numbers
      "completedProjects": ["p1", "p2"],  // project IDs
      "lastVisited": "2024-01-15T10:30:00Z"
    },
    "python": {
      "started": false,
      ...
    }
  },
  "quizResult": {
    "completed": true,
    "recommendations": ["frontend", "python"]
  },
  "bookmarks": ["resource-id-1", "resource-id-2"]
}
```

### Progress Display
```
On track card:   Small progress bar at bottom of card (0–100%)
On track page:   Full progress bar in header + completed stage count
On tracks page:  "In Progress" badge on started tracks
On homepage:     If has progress: "Continue Learning" section showing in-progress tracks
```

### "Continue Learning" Banner
```
Appears on homepage if localStorage has any progress
Background:     var(--bg-elevated), teal left border
Content:        "Welcome back! Continue where you left off."
                Shows 1–3 in-progress track cards
```

---

## 9. ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 AA Compliance
```
Color contrast:
  Text on dark backgrounds must meet 4.5:1 minimum contrast ratio
  Large text (18px+): 3:1 minimum
  All color combinations must be verified before finalizing

Focus management:
  All interactive elements have visible focus ring
  Focus ring: 2px solid var(--accent-primary), 2px offset
  No focus trap except in modals (which should trap focus correctly)

Keyboard navigation:
  Full keyboard navigability — Tab, Shift+Tab, Enter, Space, Escape
  Arrow keys navigate within menus and accordion groups
  Cmd+K opens search

Screen readers:
  All images have descriptive alt text
  Icon-only buttons have aria-label
  Track cards have aria-describedby for tagline
  Progress bars have aria-valuenow, aria-valuemin, aria-valuemax
  Accordion items have aria-expanded
  Tab panels have role="tabpanel" and aria-labelledby

Reduced motion:
  @media (prefers-reduced-motion: reduce) {
    All Framer Motion animations disabled
    CSS transitions set to 0.01ms
    No scroll animations
  }

Color alone:
  Never use color as the sole indicator — always pair with icon, text, or pattern
  (e.g., difficulty: don't just use red/green, also use ⭐ icons and text)
```

### Semantic HTML Structure
```
<header>: Site navigation
<main>: Page content
<nav>: Navigation groups (with aria-label)
<article>: Track content
<section>: Major page sections (with aria-labelledby)
<aside>: Sidebar content
<footer>: Site footer
Heading hierarchy: h1 (page title) → h2 (sections) → h3 (subsections) — never skip levels
```

---

## 10. RESPONSIVE DESIGN

### Breakpoints
```css
/* Mobile first */
/* sm: */  @media (min-width: 640px)  { }
/* md: */  @media (min-width: 768px)  { }
/* lg: */  @media (min-width: 1024px) { }
/* xl: */  @media (min-width: 1280px) { }
/* 2xl: */ @media (min-width: 1536px) { }
```

### Layout Changes by Breakpoint

**Mobile (<768px):**
- Single column everywhere
- Track cards: full width
- Track page: no sidebars, tabs replace section nav
- Navigation: hamburger menu
- Hero headline: reduced size (clamp handles this)
- Stats row: vertical stack
- Resource tabs: horizontally scrollable

**Tablet (768px–1024px):**
- Track grid: 2 columns
- Track page: still no right sidebar, but left sidebar as collapsible drawer
- Navigation: visible links if space allows

**Desktop (>1024px):**
- Full 3-column layout on track pages
- Track grid: 3 columns
- Full navigation visible

**Large Desktop (>1280px):**
- Max content width: 1320px, centered
- Increased padding
- Track grid: can show 4 columns for category views

---

## 11. PERFORMANCE REQUIREMENTS

### Core Web Vitals Targets
```
LCP (Largest Contentful Paint):  < 2.5s
FID (First Input Delay):         < 100ms
CLS (Cumulative Layout Shift):   < 0.1
```

### Implementation
```
Images:
  - Use Next.js <Image> component for all images
  - Format: WebP with PNG fallback
  - Lazy load all images below the fold
  - Provide width and height to prevent CLS

Fonts:
  - preconnect to fonts.googleapis.com
  - font-display: swap
  - Only load weights actually used

JavaScript:
  - Code-split by route (Next.js handles this)
  - Fuse.js search index built once and cached
  - Framer Motion: use LazyMotion for smaller bundle

CSS:
  - No unused Tailwind classes (purge in production)
  - Critical CSS inlined
  - CSS variables eliminate runtime calculations

Data:
  - Track data in static TypeScript files — no API calls needed
  - Build-time static generation for all track pages (generateStaticParams)
```

---

## 12. CONTENT DATA ARCHITECTURE

### Track Data Structure
```typescript
// types/track.ts
export interface Track {
  id: string;                    // e.g., "frontend"
  slug: string;                  // e.g., "frontend-development"
  name: string;                  // e.g., "Frontend Development"
  tagline: string;               // One sentence
  category: 'build' | 'design' | 'analyze' | 'grow';
  color: string;                 // CSS variable name: "--track-frontend"
  colorHex: string;              // e.g., "#61DAFB"
  icon: string;                  // Lucide icon name
  difficulty: 1 | 2 | 3 | 4 | 5;
  difficultyLabel: string;       // "Medium"
  timeEstimate: string;          // "4–6 months"
  techStack: string[];           // ["HTML", "CSS", "JavaScript", "React"]
  overview: {
    description: string;
    whatYouCanBuild: string[];
    jobTitles: string[];
    salaryRange: string;
  };
  roadmap: Stage[];
  resources: Resource[];
  projects: Project[];
  aiGuide: AIGuide;
  careerPath: CareerPath;
}

export interface Stage {
  id: number;
  title: string;
  duration: string;
  topics: string[];
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'docs' | 'video' | 'practice' | 'book' | 'tool' | 'community';
  free: boolean;
  source: string;               // "freeCodeCamp", "MDN", etc.
}

export interface Project {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  techTags: string[];
}

export interface AIGuide {
  goodFor: string[];
  notGoodFor: string[];
  tools: { name: string; use: string; url: string; }[];
  samplePrompts: string[];
}
```

---

## 13. SEO CONFIGURATION

```typescript
// app/layout.tsx
export const metadata = {
  title: 'Tech Skills Learning Hub — Free Roadmaps & Resources for Tech Careers',
  description: 'Free learning paths, roadmaps, and curated resources for Frontend, Backend, UI/UX, Data, Mobile, Cybersecurity, and 11 more tech tracks. Built for African students.',
  keywords: 'tech learning, programming roadmap, frontend development, Nigeria tech, African students, free coding resources, career in tech',
  openGraph: {
    title: 'Tech Skills Learning Hub',
    description: 'Your complete guide into tech — 17 tracks, 300+ resources, 100% free.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Skills Learning Hub',
  }
}

// Each track page gets its own metadata
export async function generateMetadata({ params }) {
  const track = getTrackBySlug(params.slug);
  return {
    title: `${track.name} Roadmap & Resources | Tech Skills Hub`,
    description: track.tagline,
  }
}
```

---

## 14. SPECIAL COMPONENTS TO BUILD

### Component: TrackCard
Full card with icon, name, tagline, difficulty, time, tech stack, hover effects, progress bar, left border in track color.

### Component: RoadmapTimeline
Vertical timeline with stage cards, completion checkboxes, progress tracking, animated connector line.

### Component: ResourceItem
Resource row/card with favicon, title, description, type badge, free/paid badge, external link.

### Component: ProjectCard
Project card with number, title, description, level badge, tech tags, completion checkbox.

### Component: PromptCard
Code-block styled card with prompt text, copy button, syntax-light highlighting.

### Component: SearchModal
Full-screen search overlay with instant results, keyboard navigation, grouped results.

### Component: TrackQuiz
3-question quiz with animated transitions, result reveal, track recommendations.

### Component: ProgressBar
Track progress bar reading from localStorage, animated fill, percentage label.

### Component: SectionNav
Sticky left sidebar for track pages with section links and completion indicators.

### Component: TOC (Table of Contents)
Right sidebar on track pages, highlights active section on scroll.

### Component: DifficultyBadge
Visual difficulty indicator with stars and label.

### Component: CategoryFilter
Pill filter buttons with animated active state and layout animation on filter change.

### Component: ContinueLearningBanner
Homepage banner showing in-progress tracks from localStorage.

---

## 15. FINAL QUALITY CHECKLIST

Before considering this complete, verify:

```
Content:
[ ] All 17 tracks have complete pages
[ ] All roadmaps are fully expanded from the .md file
[ ] All resource links open correctly in new tabs
[ ] No placeholder "Lorem ipsum" text anywhere
[ ] Quiz produces sensible recommendations

Design:
[ ] No generic "AI slop" aesthetics — every decision is intentional
[ ] Color system consistent across all pages
[ ] Fonts loading correctly from Google Fonts
[ ] Dark theme is the default and the primary experience
[ ] All track cards use their specific track color correctly
[ ] Hover states work on every interactive element
[ ] Animations feel smooth — not janky, not excessive

HCI:
[ ] Quiz is prominent on Start Here page
[ ] Progress saves correctly to localStorage
[ ] Search finds content within 100ms
[ ] Keyboard navigation works end-to-end
[ ] Breadcrumbs visible on all inner pages
[ ] Focus rings visible on all interactive elements

Responsive:
[ ] All pages tested at 375px, 768px, 1024px, 1440px
[ ] No horizontal scroll on any breakpoint
[ ] Touch targets all 44px minimum
[ ] Mobile menu works without keyboard
[ ] Font sizes readable without pinching/zooming

Performance:
[ ] Google PageSpeed Insights score > 90 on mobile
[ ] No layout shift on font/image load
[ ] Search index does not block page render
[ ] All routes statically generated

Accessibility:
[ ] All images have alt text
[ ] Heading hierarchy is correct on every page
[ ] Color contrast passes for all text
[ ] Reduced motion preference respected
[ ] Screen reader announces progress updates
```

---

## 16. CONTENT SOURCE

All content for this site comes from the accompanying file:
**`Tech_Skills_Learning_Hub.md`**

That file contains:
- All 17 track descriptions
- All roadmaps (Stages 1–5 for each track)
- All resource links (300+)
- All project ideas
- All AI guides per track
- Career preparation content
- Beginner survival guide
- Community resources
- The master resource index

**Your job is to:**
1. Parse that .md file into structured TypeScript data
2. Build the UI system described in this prompt
3. Present all that content through the design system and interaction model specified here
4. Produce something a student opens and immediately thinks: *"This was built for me."*

---

*End of Cursor Build Prompt.*
*Tech Skills Learning Hub — Build Brief v1.0*

---
---

# ➕ PART 4 — STARTER CODE & IMPLEMENTATION FILES

> These are not suggestions. These are the exact files to create as the foundation.
> Copy them verbatim and build from here. Do not deviate from the design system.

---

## FILE 1: `styles/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-void: #080B10; --bg-deep: #0D1117; --bg-surface: #161B22;
  --bg-elevated: #1C2333; --bg-overlay: #21262D;
  --border-subtle: #21262D; --border-default: #30363D; --border-active: #388BFD;
  --text-primary: #E6EDF3; --text-secondary: #8B949E; --text-muted: #484F58; --text-inverse: #0D1117;
  --accent-primary: #00D4AA; --accent-primary-dim: #00A884; --accent-primary-bright: #00FFCC;
  --accent-primary-glow: rgba(0,212,170,0.18); --accent-primary-bg: rgba(0,212,170,0.07);
  --accent-primary-border: rgba(0,212,170,0.25);
  --accent-secondary: #F0A500; --accent-secondary-dim: #C47D00; --accent-secondary-bg: rgba(240,165,0,0.08);
  --accent-tertiary: #A78BFA; --accent-tertiary-dim: #7C5CDB; --accent-tertiary-bg: rgba(167,139,250,0.08);
  --track-frontend: #61DAFB; --track-backend: #68D391; --track-fullstack: #F6AD55;
  --track-python: #FFD43B; --track-uiux: #F687B3; --track-qa: #76E4F7;
  --track-data: #9F7AEA; --track-datascience: #B794F4; --track-devops: #FC8181;
  --track-cyber: #48BB78; --track-mobile: #63B3ED; --track-video: #FBB040;
  --track-youtube: #FF4E4E; --track-marketing: #68D391; --track-ai: #00D4AA;
  --track-nocode: #A78BFA; --track-writing: #E2C97E;
  --color-success: #3FB950; --color-warning: #D29922; --color-error: #F85149; --color-info: #388BFD;
  --gradient-hero: linear-gradient(135deg, #080B10 0%, #0D1117 50%, #0A1628 100%);
  --gradient-text: linear-gradient(92deg, #00D4AA 0%, #61DAFB 45%, #A78BFA 100%);
  --gradient-accent: linear-gradient(90deg, #00D4AA, #A78BFA);
  --gradient-warm: linear-gradient(135deg, #F0A500, #FC8181);
  --shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25);
  --shadow-raised: 0 8px 24px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
  --shadow-glow-teal: 0 0 16px rgba(0,212,170,0.3), 0 0 48px rgba(0,212,170,0.08);
  --font-display: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-xl: 24px; --radius-full: 9999px;
  --t-fast: 150ms; --t-base: 250ms; --t-slow: 400ms;
  --ease-out: cubic-bezier(0.4,0,0.2,1); --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }

body {
  font-family: var(--font-body); font-size: 1rem; line-height: 1.6;
  color: var(--text-primary); background-color: var(--bg-deep); overflow-x: hidden;
}

h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-display); font-weight: 700;
  line-height: 1.2; color: var(--text-primary); letter-spacing: -0.02em;
}
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
h3 { font-size: clamp(1.2rem, 2vw, 1.625rem); }
h4 { font-size: 1.25rem; } h5 { font-size: 1.125rem; } h6 { font-size: 1rem; }

p { color: var(--text-secondary); line-height: 1.7; max-width: 70ch; }
a { color: var(--accent-primary); text-decoration: none; transition: color var(--t-fast) var(--ease-out); }
a:hover { color: var(--accent-primary-bright); }
code, kbd, samp, pre { font-family: var(--font-mono); }
code {
  font-size: 0.875em; padding: 2px 6px; background: var(--bg-overlay);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--accent-primary);
}
pre {
  background: var(--bg-void); border: 1px solid var(--border-default);
  border-left: 3px solid var(--accent-primary); border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem; overflow-x: auto; font-size: 0.875rem; line-height: 1.7;
}
pre code { background: none; border: none; padding: 0; color: var(--text-primary); }
strong { font-weight: 600; color: var(--text-primary); }
::selection { background: var(--accent-primary-bg); color: var(--accent-primary-bright); }

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg-void); }
::-webkit-scrollbar-thumb { background: var(--border-default); border-radius: var(--radius-full); }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

:focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 3px; border-radius: var(--radius-sm); }

.gradient-text {
  background: var(--gradient-text);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.card {
  background: var(--bg-surface); border: 1px solid var(--border-default);
  border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-card);
  transition: transform var(--t-base) var(--ease-out), border-color var(--t-base) var(--ease-out),
              box-shadow var(--t-base) var(--ease-out), background var(--t-base) var(--ease-out);
}
.card:hover {
  transform: translateY(-2px); border-color: var(--accent-primary-border);
  background: var(--bg-elevated); box-shadow: var(--shadow-raised);
}
.card-track { border-left-width: 3px; border-left-style: solid; }

.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-display); font-weight: 600; font-size: 0.9375rem;
  border-radius: var(--radius-full); padding: 0.75rem 1.75rem;
  border: none; cursor: pointer; text-decoration: none; white-space: nowrap; min-height: 44px;
  transition: background var(--t-fast) var(--ease-out), transform var(--t-fast) var(--ease-out),
              box-shadow var(--t-fast) var(--ease-out), border-color var(--t-fast) var(--ease-out),
              color var(--t-fast) var(--ease-out);
}
.btn:active { transform: scale(0.97); }
.btn-primary { background: var(--accent-primary); color: var(--text-inverse); }
.btn-primary:hover { background: var(--accent-primary-dim); box-shadow: var(--shadow-glow-teal); color: var(--text-inverse); }
.btn-secondary { background: transparent; color: var(--text-primary); border: 1px solid var(--border-default); }
.btn-secondary:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
.btn-ghost { background: transparent; color: var(--accent-primary); }
.btn-ghost:hover { background: var(--accent-primary-bg); }

.badge {
  display: inline-flex; align-items: center; gap: 0.25rem;
  font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.1em;
  padding: 3px 10px; border-radius: var(--radius-full); min-height: 22px;
}
.badge-teal { background: var(--accent-primary-bg); color: var(--accent-primary); }
.badge-amber { background: var(--accent-secondary-bg); color: var(--accent-secondary); }
.badge-purple { background: var(--accent-tertiary-bg); color: var(--accent-tertiary); }
.badge-green { background: rgba(63,185,80,0.1); color: var(--color-success); }
.badge-blue { background: rgba(56,139,253,0.1); color: var(--color-info); }

.section { padding: 6rem 0; }
.container { width: 100%; max-width: 1320px; margin: 0 auto; padding: 0 1.5rem; }
@media (min-width: 768px) { .container { padding: 0 2rem; } }
@media (min-width: 1280px) { .container { padding: 0 3rem; } }

.progress-bar-container { width: 100%; height: 4px; background: var(--border-subtle); border-radius: var(--radius-full); overflow: hidden; }
.progress-bar-fill { height: 100%; background: var(--gradient-accent); border-radius: var(--radius-full); transition: width 0.6s var(--ease-spring); }

.bg-grid {
  background-image: linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
.bg-dot {
  background-image: radial-gradient(rgba(0,212,170,0.12) 1px, transparent 1px);
  background-size: 24px 24px;
}

.section-label {
  font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent-primary);
  margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;
}
.section-label::before {
  content: ''; display: block; width: 20px; height: 2px;
  background: var(--accent-primary); border-radius: var(--radius-full);
}

.skip-link {
  position: absolute; top: -100px; left: 1rem;
  background: var(--accent-primary); color: var(--text-inverse);
  padding: 0.5rem 1rem; border-radius: var(--radius-sm);
  font-family: var(--font-display); font-weight: 600; z-index: 400;
  transition: top var(--t-fast) var(--ease-out);
}
.skip-link:focus { top: 1rem; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## FILE 2: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne','sans-serif'], body: ['DM Sans','sans-serif'],
        mono: ['JetBrains Mono','monospace'], sans: ['DM Sans','sans-serif'],
      },
      colors: {
        void: '#080B10', deep: '#0D1117', surface: '#161B22',
        elevated: '#1C2333', overlay: '#21262D',
        teal: { DEFAULT: '#00D4AA', dim: '#00A884', bright: '#00FFCC',
          50: 'rgba(0,212,170,0.05)', 100: 'rgba(0,212,170,0.1)', 200: 'rgba(0,212,170,0.2)' },
        amber: { DEFAULT: '#F0A500', dim: '#C47D00' },
        violet: { DEFAULT: '#A78BFA', dim: '#7C5CDB' },
        track: {
          frontend: '#61DAFB', backend: '#68D391', fullstack: '#F6AD55', python: '#FFD43B',
          uiux: '#F687B3', qa: '#76E4F7', data: '#9F7AEA', datascience: '#B794F4',
          devops: '#FC8181', cyber: '#48BB78', mobile: '#63B3ED', video: '#FBB040',
          youtube: '#FF4E4E', marketing: '#68D391', ai: '#00D4AA', nocode: '#A78BFA', writing: '#E2C97E',
        },
        border: { subtle: '#21262D', default: '#30363D', active: '#388BFD' },
        text: { primary: '#E6EDF3', secondary: '#8B949E', muted: '#484F58', inverse: '#0D1117' },
      },
      borderRadius: { xs: '4px', sm: '6px', md: '10px', lg: '16px', xl: '24px', '2xl': '32px' },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25)',
        raised: '0 8px 24px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        modal: '0 24px 64px rgba(0,0,0,0.7)',
        'glow-teal': '0 0 16px rgba(0,212,170,0.3), 0 0 48px rgba(0,212,170,0.08)',
        'glow-amber': '0 0 16px rgba(240,165,0,0.3)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #080B10 0%, #0D1117 50%, #0A1628 100%)',
        'gradient-text': 'linear-gradient(92deg, #00D4AA 0%, #61DAFB 45%, #A78BFA 100%)',
        'gradient-accent': 'linear-gradient(90deg, #00D4AA, #A78BFA)',
        'gradient-warm': 'linear-gradient(135deg, #F0A500, #FC8181)',
        'grid-pattern': 'linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(rgba(0,212,170,0.12) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '40px 40px', dot: '24px 24px' },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'progress-fill': 'progressFill 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 16px rgba(0,212,170,0.3)' }, '50%': { boxShadow: '0 0 32px rgba(0,212,170,0.6)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        progressFill: { from: { width: '0%' }, to: { width: 'var(--progress-width, 0%)' } },
      },
      transitionTimingFunction: { spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', smooth: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      maxWidth: { content: '70ch', site: '1320px' },
    },
  },
  plugins: [],
}
export default config
```
## FILE 3: `lib/tracks.ts` — All 17 Tracks (Complete Data)

```typescript
export type TrackCategory = 'build' | 'design' | 'analyze' | 'grow'
export type ResourceType = 'docs' | 'video' | 'practice' | 'book' | 'tool' | 'community'
export type ProjectLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Resource { id: string; title: string; description: string; url: string; type: ResourceType; free: boolean; source: string }
export interface Project { id: string; title: string; description: string; level: ProjectLevel; techTags: string[] }
export interface Stage { id: number; title: string; duration: string; topics: string[]; description: string }
export interface AIGuide { goodFor: string[]; notFor: string[]; tools: { name: string; use: string; url: string }[]; samplePrompts: string[] }
export interface Track {
  id: string; slug: string; name: string; tagline: string; category: TrackCategory;
  colorHex: string; icon: string; difficulty: 1|2|3|4|5; difficultyLabel: string;
  timeEstimate: string; techStack: string[];
  overview: { description: string; whatYouCanBuild: string[]; jobTitles: string[]; salaryRange: string };
  roadmap: Stage[]; resources: Resource[]; projects: Project[]; aiGuide: AIGuide; careerTip: string;
}

export const TRACKS: Track[] = [
  {
    id: 'frontend', slug: 'frontend-development', name: 'Frontend Development',
    tagline: 'Build everything users see, click, and experience on the web.',
    category: 'build', colorHex: '#61DAFB', icon: 'Monitor',
    difficulty: 3, difficultyLabel: 'Medium', timeEstimate: '4–6 months',
    techStack: ['HTML','CSS','JavaScript','React','Next.js','Tailwind'],
    overview: {
      description: 'Frontend developers build the visual layer of the web — layouts, buttons, forms, animations, and everything users interact with. You translate designs into working code using HTML, CSS, and JavaScript, then build complex interfaces using React.',
      whatYouCanBuild: ['Responsive websites','Web applications','Dashboards','E-commerce storefronts','AI-powered chat interfaces'],
      jobTitles: ['Frontend Developer','UI Developer','React Developer','Web Developer','Frontend Engineer'],
      salaryRange: '$40,000–$120,000/year'
    },
    roadmap: [
      { id:1, title:'Foundations', duration:'4–8 weeks', topics:['HTML5 semantics','CSS3 & Flexbox','CSS Grid','Responsive Design','Basic JavaScript'], description:'Master the building blocks of the web. HTML structures content, CSS styles and positions it, JavaScript makes it interactive.' },
      { id:2, title:'Core JavaScript', duration:'4–6 weeks', topics:['ES6+ syntax','DOM Manipulation','Events & forms','Async JavaScript','Fetch API'], description:'Go deep into JavaScript. Learn modern syntax, DOM manipulation, and how to fetch data from APIs.' },
      { id:3, title:'React Framework', duration:'6–10 weeks', topics:['Components & Props','State with Hooks','React Router','Context API','Next.js Basics'], description:'React is the most in-demand frontend skill. Build component-based UIs and production apps with Next.js.' },
      { id:4, title:'Professional Skills', duration:'3–4 weeks', topics:['Git workflows','Testing (Jest)','Performance optimization','Accessibility (a11y)','Deployment'], description:'Bridge the gap from learning to professional work. These are the practices that separate juniors from team-ready developers.' },
      { id:5, title:'AI-Assisted Workflow', duration:'Ongoing', topics:['GitHub Copilot','v0.dev for UI','AI debugging','Verifying AI code'], description:'Use AI as a powerful assistant — not a replacement for understanding. Build faster without losing the ability to think.' },
    ],
    resources: [
      { id:'fe-1', title:'MDN Web Docs', description:'The gold standard HTML, CSS, and JavaScript reference. Bookmark this forever.', url:'https://developer.mozilla.org/en-US/docs/Learn', type:'docs', free:true, source:'Mozilla' },
      { id:'fe-2', title:'The Odin Project', description:'Free, project-based full-stack curriculum. Best structured free path for web dev.', url:'https://www.theodinproject.com/foundations', type:'docs', free:true, source:'The Odin Project' },
      { id:'fe-3', title:'JavaScript.info', description:'The best JavaScript learning site on the internet. Clear, thorough, modern.', url:'https://javascript.info', type:'docs', free:true, source:'javascript.info' },
      { id:'fe-4', title:'React Official Docs', description:'Completely rewritten official docs with interactive examples.', url:'https://react.dev', type:'docs', free:true, source:'React' },
      { id:'fe-5', title:'HTML Crash Course', description:'Traversy Media — perfect introduction for absolute beginners.', url:'https://www.youtube.com/watch?v=UB1O30fR-EE', type:'video', free:true, source:'Traversy Media' },
      { id:'fe-6', title:'JavaScript Full Course', description:'3-hour JavaScript beginner course by freeCodeCamp.', url:'https://www.youtube.com/watch?v=PkZNo7MFNFg', type:'video', free:true, source:'freeCodeCamp' },
      { id:'fe-7', title:'React Full Course', description:'Complete React course covering hooks, router, and state management.', url:'https://www.youtube.com/watch?v=bMknfKXIFA8', type:'video', free:true, source:'freeCodeCamp' },
      { id:'fe-8', title:'Frontend Mentor', description:'Real HTML/CSS/JS challenges with professional designs to implement.', url:'https://www.frontendmentor.io', type:'practice', free:true, source:'Frontend Mentor' },
      { id:'fe-9', title:'Flexbox Froggy', description:'Learn CSS flexbox interactively by moving frogs.', url:'https://flexboxfroggy.com', type:'practice', free:true, source:'Flexbox Froggy' },
      { id:'fe-10', title:'CSS Grid Garden', description:'Learn CSS grid layout by watering a garden.', url:'https://cssgridgarden.com', type:'practice', free:true, source:'CSS Grid Garden' },
      { id:'fe-11', title:'Full Stack Open', description:'University of Helsinki free full-stack curriculum. Deep and rigorous.', url:'https://fullstackopen.com/en', type:'docs', free:true, source:'Univ. of Helsinki' },
      { id:'fe-12', title:'Next.js Learn', description:'Official Next.js interactive course. Built by Vercel, always up to date.', url:'https://nextjs.org/learn', type:'docs', free:true, source:'Vercel' },
      { id:'fe-13', title:'Tailwind CSS Docs', description:'Official Tailwind documentation — the fastest way to style anything.', url:'https://tailwindcss.com/docs', type:'docs', free:true, source:'Tailwind' },
      { id:'fe-14', title:'Eloquent JavaScript', description:'Free online book that builds deep JavaScript understanding.', url:'https://eloquentjavascript.net', type:'book', free:true, source:'Marijn Haverbeke' },
      { id:'fe-15', title:'v0.dev by Vercel', description:'AI-powered UI generation. Describe a component, get React + Tailwind code.', url:'https://v0.dev', type:'tool', free:true, source:'Vercel' },
    ],
    projects: [
      { id:'fe-p1', title:'Personal Portfolio', description:'Build your own site with bio, skills, and project showcase.', level:'beginner', techTags:['HTML','CSS'] },
      { id:'fe-p2', title:'Calculator App', description:'Functional calculator with keyboard support and history.', level:'beginner', techTags:['HTML','CSS','JavaScript'] },
      { id:'fe-p3', title:'Responsive Landing Page', description:'Pixel-perfect implementation of a Figma or Dribbble design.', level:'beginner', techTags:['HTML','Tailwind CSS'] },
      { id:'fe-p4', title:'Weather App', description:'Fetch real weather data from OpenWeatherMap API with search.', level:'intermediate', techTags:['JavaScript','API','CSS'] },
      { id:'fe-p5', title:'Movie Search App', description:'Search and display movies using TMDB API with filters.', level:'intermediate', techTags:['React','API'] },
      { id:'fe-p6', title:'Budget Tracker', description:'Track income and expenses with categories and charts.', level:'intermediate', techTags:['React','localStorage'] },
      { id:'fe-p7', title:'Full E-commerce Frontend', description:'Product listings, cart, and checkout flow.', level:'advanced', techTags:['React','Next.js','Tailwind'] },
      { id:'fe-p8', title:'AI Chat Interface', description:'Chat UI connecting to OpenAI or Groq API with message history.', level:'advanced', techTags:['React','AI API','Next.js'] },
    ],
    aiGuide: {
      goodFor:['Generating boilerplate components','Explaining CSS bugs','Writing unit tests','Creating mock data','Suggesting responsive layout fixes'],
      notFor:['Designing your application architecture','Writing production logic you have not reviewed','Replacing your understanding of the DOM'],
      tools:[
        { name:'GitHub Copilot', use:'In-editor code completion and generation', url:'https://github.com/features/copilot' },
        { name:'v0.dev', use:'Rapid UI prototyping from text prompts', url:'https://v0.dev' },
        { name:'Cursor', use:'Full AI code editor for larger files', url:'https://cursor.sh' },
        { name:'Claude', use:'Debugging, explaining errors, refactoring', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'I have this React component [paste code]. It re-renders every time the parent state changes even though the props have not changed. What is causing this and how do I fix it using React.memo?',
        'Write a reusable Button component in React with TypeScript that accepts: variant (primary | secondary | danger), size (sm | md | lg), disabled state, and an onClick handler.',
        'Explain what this CSS is doing and why the flexbox alignment is not working as expected: [paste code]',
      ],
    },
    careerTip:'Build your portfolio site first — use it as living proof of skill. Deploy every project. Employers want live links, not just GitHub repos.',
  },
  {
    id:'backend', slug:'backend-development', name:'Backend Development',
    tagline:'Build the systems, APIs, and databases that power every application.',
    category:'build', colorHex:'#68D391', icon:'Server',
    difficulty:4, difficultyLabel:'Hard', timeEstimate:'5–8 months',
    techStack:['Python','Node.js','FastAPI','PostgreSQL','Redis','Docker'],
    overview: {
      description:'Backend developers build the server-side logic, databases, and APIs that power every application. You handle data, security, authentication, and performance — none of which users see, but everything depends on.',
      whatYouCanBuild:['REST APIs','Authentication systems','Database schemas','Real-time chat backends','AI-powered APIs'],
      jobTitles:['Backend Developer','API Developer','Node.js Developer','Python Developer','Software Engineer'],
      salaryRange:'$50,000–$130,000/year'
    },
    roadmap:[
      { id:1, title:'Foundations', duration:'4–6 weeks', topics:['How the internet works','HTTP & REST','Python or Node.js basics','Terminal & Linux','Git workflows'], description:'Understand how web servers communicate and pick your first backend language.' },
      { id:2, title:'Core Backend', duration:'6–8 weeks', topics:['REST API design','CRUD operations','HTTP methods','JWT Authentication','Input validation','Error handling'], description:'Build real APIs. Handle requests, manage authentication, and structure your application cleanly.' },
      { id:3, title:'Databases', duration:'4–6 weeks', topics:['SQL fundamentals','PostgreSQL','Database design','ORM (SQLAlchemy/Prisma)','MongoDB basics','Indexing'], description:'Data is the heart of every application. Design schemas, query efficiently, and connect databases to your APIs.' },
      { id:4, title:'Advanced Backend', duration:'4–6 weeks', topics:['FastAPI / Express.js','Caching with Redis','WebSockets','Background jobs','File uploads','Rate limiting'], description:'Level up your APIs with performance patterns and real-time features.' },
      { id:5, title:'Deployment', duration:'3–4 weeks', topics:['Docker basics','Render / Railway','Environment variables','CI/CD pipelines','Linux server basics'], description:'Get your APIs live. Learn containerization and deployment pipelines.' },
    ],
    resources:[
      { id:'be-1', title:'CS50 Web Programming', description:'Harvard free web course — Python, Django, SQL, JavaScript.', url:'https://cs50.harvard.edu/web', type:'docs', free:true, source:'Harvard' },
      { id:'be-2', title:'FastAPI Official Docs', description:'The best API framework documentation with excellent examples.', url:'https://fastapi.tiangolo.com', type:'docs', free:true, source:'FastAPI' },
      { id:'be-3', title:'Node.js & Express Full Course', description:'Complete Node.js and Express course by freeCodeCamp.', url:'https://www.youtube.com/watch?v=Oe421EPjeBE', type:'video', free:true, source:'freeCodeCamp' },
      { id:'be-4', title:'PostgreSQL Full Course', description:'Learn PostgreSQL from scratch — tables, queries, joins, and more.', url:'https://www.youtube.com/watch?v=qw--VYLpxG4', type:'video', free:true, source:'freeCodeCamp' },
      { id:'be-5', title:'SQLZoo', description:'Interactive SQL practice with exercises from beginner to advanced.', url:'https://sqlzoo.net', type:'practice', free:true, source:'SQLZoo' },
      { id:'be-6', title:'JWT Introduction', description:'Official JWT.io documentation explaining tokens, signing, and usage.', url:'https://jwt.io/introduction', type:'docs', free:true, source:'jwt.io' },
      { id:'be-7', title:'Docker Full Course', description:'Learn Docker from ground up — images, containers, Compose.', url:'https://www.youtube.com/watch?v=fqMOX6JJhGo', type:'video', free:true, source:'freeCodeCamp' },
      { id:'be-8', title:'FastAPI Full Course', description:'Complete FastAPI course for Python backend development.', url:'https://www.youtube.com/watch?v=0sOvCWFmrtA', type:'video', free:true, source:'freeCodeCamp' },
      { id:'be-9', title:'Use The Index, Luke', description:'Essential guide to SQL database performance and indexing.', url:'https://use-the-index-luke.com', type:'docs', free:true, source:'Markus Winand' },
      { id:'be-10', title:'Full Stack Open', description:'University of Helsinki — Node, Express, MongoDB, GraphQL.', url:'https://fullstackopen.com/en', type:'docs', free:true, source:'Univ. of Helsinki' },
    ],
    projects:[
      { id:'be-p1', title:'Blog REST API', description:'CRUD API for blog posts with categories, pagination, and search.', level:'beginner', techTags:['FastAPI','PostgreSQL'] },
      { id:'be-p2', title:'User Auth System', description:'Registration, login, JWT tokens, password reset, refresh tokens.', level:'beginner', techTags:['Node.js','JWT','bcrypt'] },
      { id:'be-p3', title:'URL Shortener', description:'Shorten URLs, track click counts, and redirect with analytics.', level:'intermediate', techTags:['FastAPI','Redis','PostgreSQL'] },
      { id:'be-p4', title:'Real-time Chat Backend', description:'WebSocket chat server with rooms, presence, and message history.', level:'advanced', techTags:['Node.js','WebSockets','PostgreSQL'] },
      { id:'be-p5', title:'AI-Powered API', description:'API that accepts text prompts and returns AI-generated responses via Groq.', level:'advanced', techTags:['FastAPI','Groq API','PostgreSQL'] },
    ],
    aiGuide:{
      goodFor:['Writing CRUD route templates fast','Generating SQL queries from plain English','Debugging error messages','Writing API documentation','Suggesting database schema improvements'],
      notFor:['Security-sensitive auth logic — always review yourself','Business logic requiring domain knowledge','Replacing testing'],
      tools:[
        { name:'GitHub Copilot / Cursor', use:'In-editor code generation', url:'https://cursor.sh' },
        { name:'Claude', use:'Architecture planning, code review, API docs', url:'https://claude.ai' },
        { name:'Postman AI', use:'Auto-generate API test collections', url:'https://www.postman.com' },
      ],
      samplePrompts:[
        'Write a FastAPI endpoint that accepts a user registration form (email, password, full name), hashes the password with bcrypt, saves to PostgreSQL using SQLAlchemy, and returns a JWT token. Include proper error handling for duplicate emails.',
        'I have this SQL query running slowly on 2 million rows: [paste]. Suggest indexes and optimizations.',
        'Explain this PostgreSQL error and suggest a fix: [paste error]',
      ],
    },
    careerTip:'Master one language and one database deeply before branching out. Python + FastAPI + PostgreSQL is an excellent starting combination.',
  },
  {
    id:'fullstack', slug:'full-stack-development', name:'Full-Stack Development',
    tagline:'Design it, build it, deploy it — end to end, all by yourself.',
    category:'build', colorHex:'#F6AD55', icon:'Layers',
    difficulty:5, difficultyLabel:'Advanced', timeEstimate:'8–12 months',
    techStack:['React','Next.js','Node.js','PostgreSQL','Prisma','Tailwind','Docker'],
    overview:{
      description:'Full-stack developers build complete applications — the interface, APIs, and databases. You can take a product from idea to deployed, working software entirely on your own.',
      whatYouCanBuild:['Complete SaaS products','E-commerce platforms','Social media platforms','Learning management systems','AI-powered web apps'],
      jobTitles:['Full-Stack Developer','Software Engineer','Product Engineer','Web Application Developer'],
      salaryRange:'$60,000–$150,000/year'
    },
    roadmap:[
      { id:1, title:'Complete Frontend Track', duration:'See Frontend track', topics:['HTML, CSS, JavaScript','React + Next.js','Tailwind CSS','Deployment to Vercel'], description:'Full-stack starts with frontend mastery. Complete the Frontend Development track in full first.' },
      { id:2, title:'Complete Backend Track', duration:'See Backend track', topics:['Node.js or Python','REST APIs','PostgreSQL','Authentication'], description:'Then complete the Backend Development track — especially REST APIs, authentication, and PostgreSQL.' },
      { id:3, title:'Integration', duration:'3–4 weeks', topics:['Connecting frontend to backend','Authentication flows end-to-end','Error handling across the stack','State management with server data'], description:'Integration is where most full-stack learners struggle. Learn to connect all the pieces cleanly.' },
      { id:4, title:'Full Deployment', duration:'2–3 weeks', topics:['Frontend on Vercel','Backend on Render/Railway','Database on Neon/Supabase','Environment variables','Domain setup'], description:'Get the complete stack live. Managing different deployment environments is a real skill.' },
      { id:5, title:'Production Patterns', duration:'3–4 weeks', topics:['SaaS architecture','Stripe payment integration','Real-time features','Background jobs'], description:'Build things that actually make money. Stripe, real-time, and SaaS patterns unlock serious product building.' },
    ],
    resources:[
      { id:'fs-1', title:'Full Stack Open', description:'University of Helsinki complete full-stack curriculum. The single best free full-stack course.', url:'https://fullstackopen.com/en', type:'docs', free:true, source:'Univ. of Helsinki' },
      { id:'fs-2', title:'The Odin Project', description:'Complete full-stack curriculum from foundations to NodeJS. All free, project-based.', url:'https://www.theodinproject.com', type:'docs', free:true, source:'The Odin Project' },
      { id:'fs-3', title:'Next.js Official Docs', description:'Next.js is the premier full-stack React framework.', url:'https://nextjs.org/docs', type:'docs', free:true, source:'Vercel' },
      { id:'fs-4', title:'Supabase Docs', description:'Open-source Firebase alternative: auth, PostgreSQL, storage.', url:'https://supabase.com/docs', type:'docs', free:true, source:'Supabase' },
      { id:'fs-5', title:'Stripe Documentation', description:'Official Stripe docs for payments and subscription billing.', url:'https://stripe.com/docs', type:'docs', free:true, source:'Stripe' },
      { id:'fs-6', title:'Full-Stack MERN App', description:'Build a complete MERN stack application with Traversy Media.', url:'https://www.youtube.com/watch?v=nu_pCVPKzTk', type:'video', free:true, source:'Traversy Media' },
    ],
    projects:[
      { id:'fs-p1', title:'Full Blog Platform', description:'Blog with auth, CRUD posts, comments, categories, and admin panel.', level:'intermediate', techTags:['Next.js','PostgreSQL','Auth'] },
      { id:'fs-p2', title:'Job Board', description:'Post, search, and apply for jobs with employer and candidate dashboards.', level:'intermediate', techTags:['React','Node.js','PostgreSQL'] },
      { id:'fs-p3', title:'E-commerce Platform', description:'Products, cart, checkout with Stripe, order management, and admin.', level:'advanced', techTags:['Next.js','Stripe','PostgreSQL'] },
      { id:'fs-p4', title:'AI Productivity App', description:'Notes + tasks + AI summarization and scheduling — like Notion + AI.', level:'advanced', techTags:['Next.js','Groq API','PostgreSQL','Redis'] },
    ],
    aiGuide:{
      goodFor:['Architecting data models across frontend and backend','Debugging cross-origin errors','Writing API client code','Generating boilerplate for auth and CRUD patterns'],
      notFor:['Security implications of your architecture','Performance profiling decisions','Deployment decisions without review'],
      tools:[
        { name:'Cursor', use:'Full AI editor — excellent for full-stack projects', url:'https://cursor.sh' },
        { name:'v0.dev', use:'Generate full-stack Next.js components and pages', url:'https://v0.dev' },
        { name:'Claude', use:'Architecture planning, debugging, code review', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'I am building a SaaS app with Next.js and Supabase. Design a database schema for multi-tenant subscriptions where each organization can have multiple users with roles: admin, member, viewer.',
        'My Next.js app sends a request to my Express API but I get a CORS error. Here is my Express config: [paste]. Here is the error: [paste]. What is wrong and how do I fix it properly?',
      ],
    },
    careerTip:'One deployed, polished full-stack project beats ten incomplete ones. Build your best idea to production quality, maintain it, and that single project will get you hired.',
  },
  {
    id:'python', slug:'python-development', name:'Python Development',
    tagline:'The most versatile language in tech — automation, APIs, AI, and data.',
    category:'build', colorHex:'#FFD43B', icon:'Code2',
    difficulty:3, difficultyLabel:'Medium', timeEstimate:'3–5 months',
    techStack:['Python','FastAPI','SQLAlchemy','Pandas','BeautifulSoup','Groq/OpenAI'],
    overview:{
      description:'Python is used for backend APIs, automation, data science, and AI. It has the simplest syntax of any mainstream language — perfect for beginners — while being powerful enough for the world\'s largest tech companies.',
      whatYouCanBuild:['REST APIs','Automation scripts','Web scrapers','AI chatbots','Data pipelines','Telegram/WhatsApp bots'],
      jobTitles:['Python Developer','Backend Developer','Data Engineer','Automation Engineer','AI/ML Engineer'],
      salaryRange:'$50,000–$130,000/year'
    },
    roadmap:[
      { id:1, title:'Python Basics', duration:'3–4 weeks', topics:['Variables & data types','Conditions & loops','Functions & scope','Lists, dicts, tuples, sets','File handling & errors'], description:'Python is one of the easiest languages to start with. Nail the fundamentals and everything else opens up.' },
      { id:2, title:'Intermediate Python', duration:'3–4 weeks', topics:['OOP: classes & inheritance','Comprehensions','Decorators & generators','Modules & packages','Virtual environments'], description:'These concepts separate beginners from developers. OOP is especially important for real projects.' },
      { id:3, title:'Python for the Web', duration:'4–5 weeks', topics:['FastAPI fundamentals','SQLAlchemy ORM','JWT authentication','Async Python','API documentation'], description:'Build real APIs. FastAPI is the modern choice — fast, typed, with beautiful automatic docs.' },
      { id:4, title:'Automation & Scripting', duration:'2–3 weeks', topics:['File system operations','Web scraping (BeautifulSoup)','Working with PDFs & Excel','Sending emails','Scheduling tasks'], description:'Python excels at automating repetitive tasks. Build tools that save hours every week.' },
      { id:5, title:'Python + AI', duration:'4–6 weeks', topics:['OpenAI / Groq API integration','Prompt engineering in Python','LangChain basics','Vector databases intro','Building AI agents'], description:'Python is the dominant language of AI. Learn to build applications that use LLMs as their backbone.' },
    ],
    resources:[
      { id:'py-1', title:'Official Python Tutorial', description:'The Python.org tutorial. Use alongside other sources.', url:'https://docs.python.org/3/tutorial', type:'docs', free:true, source:'Python.org' },
      { id:'py-2', title:'Python Full Course for Beginners', description:'4.5-hour Python beginner course — the best single video to start with.', url:'https://www.youtube.com/watch?v=rfscVS0vtbw', type:'video', free:true, source:'freeCodeCamp' },
      { id:'py-3', title:'Automate the Boring Stuff', description:'Free online book: Python automation for files, PDFs, Excel, emails, web scraping.', url:'https://automatetheboringstuff.com', type:'book', free:true, source:'Al Sweigart' },
      { id:'py-4', title:'Real Python', description:'High-quality Python tutorials on every topic imaginable.', url:'https://realpython.com', type:'docs', free:false, source:'Real Python' },
      { id:'py-5', title:'Corey Schafer Python Tutorials', description:'The best Python YouTube channel. Deep, clear, professional-level content.', url:'https://www.youtube.com/@coreyms', type:'video', free:true, source:'Corey Schafer' },
      { id:'py-6', title:'FastAPI Full Course', description:'Complete FastAPI tutorial — routing, auth, databases, deployment.', url:'https://www.youtube.com/watch?v=0sOvCWFmrtA', type:'video', free:true, source:'freeCodeCamp' },
      { id:'py-7', title:'Groq API Quickstart', description:'Run LLMs at incredible speed. The Groq quickstart for Python developers.', url:'https://console.groq.com/docs/quickstart', type:'docs', free:true, source:'Groq' },
      { id:'py-8', title:'LangChain Python Docs', description:'Build AI-powered apps with LangChain — agents, chains, and memory.', url:'https://python.langchain.com/docs/get_started/introduction', type:'docs', free:true, source:'LangChain' },
    ],
    projects:[
      { id:'py-p1', title:'File Organizer Script', description:'Auto-sort files in Downloads folder into categorized subfolders.', level:'beginner', techTags:['Python','os','shutil'] },
      { id:'py-p2', title:'Web Scraper', description:'Scrape job listings or news and save to CSV with BeautifulSoup.', level:'beginner', techTags:['Python','BeautifulSoup','requests'] },
      { id:'py-p3', title:'REST API with FastAPI', description:'Full CRUD API with FastAPI, SQLAlchemy, and PostgreSQL.', level:'intermediate', techTags:['FastAPI','PostgreSQL','SQLAlchemy'] },
      { id:'py-p4', title:'PDF Report Generator', description:'Take data input and auto-generate formatted PDF reports.', level:'intermediate', techTags:['Python','reportlab','Pandas'] },
      { id:'py-p5', title:'Telegram Bot', description:'Build a Telegram bot with commands, inline keyboards, and database persistence.', level:'intermediate', techTags:['Python','python-telegram-bot'] },
      { id:'py-p6', title:'AI Chatbot API', description:'Multi-turn AI chatbot backed by Groq LLM with conversation history.', level:'advanced', techTags:['FastAPI','Groq API','PostgreSQL'] },
    ],
    aiGuide:{
      goodFor:['Generating automation script templates','Debugging logic errors and tracebacks','Converting pseudocode to Python','Writing docstrings and type hints','Refactoring messy code'],
      notFor:['Understanding concepts for the first time — work through them yourself','Replacing testing','Security-sensitive code without thorough review'],
      tools:[
        { name:'GitHub Copilot / Cursor', use:'In-editor Python code generation', url:'https://cursor.sh' },
        { name:'Claude', use:'Code review, refactoring, architecture decisions', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Refactor this Python function to be more Pythonic, add type hints, and improve error handling without changing the core logic: [paste code]',
        'Write a Python script using Pandas that: loads all CSV files from a given folder, merges them into one DataFrame, removes duplicate rows by "id" column, and saves the result.',
        'Explain this Python traceback and tell me exactly what to fix: [paste traceback]',
      ],
    },
    careerTip:'Python is a gateway language — it leads to backend, data, AI, and automation. Once solid at fundamentals, specialize. Pick one direction: APIs, data, or AI, and go deep.',
  },
  {
    id:'uiux', slug:'ui-ux-design', name:'UI/UX Design',
    tagline:'Design interfaces that feel intuitive, beautiful, and human.',
    category:'design', colorHex:'#F687B3', icon:'Palette',
    difficulty:2, difficultyLabel:'Beginner-Friendly', timeEstimate:'3–5 months',
    techStack:['Figma','FigJam','Adobe XD','Prototyping','User Research'],
    overview:{
      description:'UI designers decide how things look. UX designers decide how things work and feel. Great product designers do both. You research users, design flows, create wireframes, build prototypes, and test with real people.',
      whatYouCanBuild:['Mobile app UIs','Web dashboards','Design systems','Interactive prototypes','Brand identity systems'],
      jobTitles:['UI Designer','UX Designer','Product Designer','UX Researcher','Interaction Designer'],
      salaryRange:'$45,000–$120,000/year'
    },
    roadmap:[
      { id:1, title:'Design Fundamentals', duration:'2–3 weeks', topics:['Typography','Color theory','Layout & grid systems','Visual hierarchy','Gestalt principles'], description:'Every great designer understands the principles behind visual communication. These are tools, not rules.' },
      { id:2, title:'UX Foundations', duration:'3–4 weeks', topics:['What is UX?','User research methods','Personas & journey maps','Information architecture','Wireframing'], description:'UX is about understanding people. Research what users need, map their experiences, and structure information clearly.' },
      { id:3, title:'Figma Mastery', duration:'4–6 weeks', topics:['Frames, components, variants','Auto layout','Prototyping','Design systems','Developer handoff'], description:'Figma is the industry-standard design tool. Learn it deeply — components, auto-layout, and interactive prototypes.' },
      { id:4, title:'Advanced UX', duration:'3–4 weeks', topics:['Usability testing','Accessibility design','Mobile-first design','Design sprints','Micro-interactions'], description:'Move from making things look good to making things work well. Test with real users, fix what breaks, iterate.' },
      { id:5, title:'Portfolio & Case Studies', duration:'Ongoing', topics:['Documenting design process','Writing case studies','Publishing on Behance','Presenting work'], description:'A designer with no portfolio is invisible. Document your thinking, not just final designs.' },
    ],
    resources:[
      { id:'ux-1', title:'Google UX Design Certificate', description:'Google\'s 7-course UX certificate on Coursera. Audit for free. Industry recognized.', url:'https://www.coursera.org/professional-certificates/google-ux-design', type:'docs', free:false, source:'Google / Coursera' },
      { id:'ux-2', title:'Figma Official Tutorials', description:'Learn Figma from its creators — the fastest way to get started.', url:'https://help.figma.com/hc/en-us/categories/360002051613', type:'docs', free:true, source:'Figma' },
      { id:'ux-3', title:'Nielsen Norman Group Articles', description:'The world\'s most respected UX research and writing. Read weekly.', url:'https://www.nngroup.com/articles', type:'docs', free:true, source:'NNGroup' },
      { id:'ux-4', title:'Interaction Design Foundation', description:'Comprehensive UX courses — many free. Strong theoretical foundation.', url:'https://www.interaction-design.org/courses', type:'docs', free:false, source:'IDF' },
      { id:'ux-5', title:'DesignCourse YouTube', description:'Gary Simon\'s channel — excellent UI design tutorials and Figma walkthroughs.', url:'https://www.youtube.com/@DesignCourse', type:'video', free:true, source:'DesignCourse' },
      { id:'ux-6', title:'Mobbin', description:'Real app UI patterns from thousands of iOS and Android apps. Best design reference.', url:'https://mobbin.com', type:'tool', free:true, source:'Mobbin' },
      { id:'ux-7', title:'Coolors', description:'The fastest color palette generator. Pick, adjust, and export in seconds.', url:'https://coolors.co', type:'tool', free:true, source:'Coolors' },
      { id:'ux-8', title:'Google Material Design', description:'Google\'s complete design system — typography, components, and patterns.', url:'https://material.io/design', type:'docs', free:true, source:'Google' },
      { id:'ux-9', title:'Dribbble', description:'Design community and portfolio platform. Browse for inspiration daily.', url:'https://dribbble.com', type:'tool', free:true, source:'Dribbble' },
    ],
    projects:[
      { id:'ux-p1', title:'App Redesign', description:'Redesign one screen of a popular app with documented reasoning for every decision.', level:'beginner', techTags:['Figma'] },
      { id:'ux-p2', title:'Local Business Website UI', description:'Design a full website UI for a local business from scratch.', level:'beginner', techTags:['Figma','Typography','Color'] },
      { id:'ux-p3', title:'Mobile App Prototype', description:'Design and prototype a 5-screen mobile app with full interactive flow in Figma.', level:'intermediate', techTags:['Figma','Prototyping','UX'] },
      { id:'ux-p4', title:'Design System', description:'Build a full design system: color palette, type scale, spacing, and 8 components.', level:'advanced', techTags:['Figma','Design Systems'] },
      { id:'ux-p5', title:'Full UX Case Study', description:'Complete UX process: research, personas, wireframes, prototype, usability test, report.', level:'advanced', techTags:['Figma','Research','Testing'] },
    ],
    aiGuide:{
      goodFor:['Writing UX copy and microcopy','Summarizing user research findings','Generating design critique checklists','Brainstorming component variations'],
      notFor:['Making final design decisions — that requires human judgment and taste','Replacing real user research','Building a consistent design system automatically'],
      tools:[
        { name:'Midjourney', use:'Visual inspiration and mood board generation', url:'https://midjourney.com' },
        { name:'Galileo AI', use:'Wireframe generation from text prompts', url:'https://www.usegalileo.ai' },
        { name:'Figma AI', use:'Auto-layout suggestions and AI content fill', url:'https://www.figma.com' },
        { name:'Claude', use:'UX writing, research synthesis, design critique', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Act as a UX copywriter. Write 5 versions of an error message for when a payment fails. App tone is friendly and supportive. Each under 15 words.',
        'I am designing a mobile banking app for young adults aged 18–25 in Nigeria. Give me 8 UX principles to prioritize for this audience and context.',
      ],
    },
    careerTip:'Case studies win you jobs, not just pretty screens. Document your process — the problem, your thinking, your decisions. That is what interviewers actually read.',
  },
  {
    id:'qa', slug:'qa-engineering', name:'QA Engineering',
    tagline:'Find what breaks before users do — and make sure it stays fixed.',
    category:'grow', colorHex:'#76E4F7', icon:'Bug',
    difficulty:3, difficultyLabel:'Medium', timeEstimate:'3–5 months',
    techStack:['Postman','Playwright','Cypress','Selenium','Jest','k6'],
    overview:{
      description:'QA engineers ensure software works correctly for every user, in every scenario, on every device. You design test plans, write test cases, automate repetitive tests, and file clear bug reports.',
      whatYouCanBuild:['Automated test suites','API test collections','Performance test reports','Bug tracking documentation'],
      jobTitles:['QA Engineer','Software Tester','Test Automation Engineer','SDET','Quality Analyst'],
      salaryRange:'$40,000–$100,000/year'
    },
    roadmap:[
      { id:1, title:'Testing Fundamentals', duration:'3–4 weeks', topics:['Types of testing','Writing test cases','Bug reporting','Test plans & strategy','Manual testing workflow'], description:'Understand what software testing is, why it matters, and how to think systematically about finding failures.' },
      { id:2, title:'Tools & API Testing', duration:'3–4 weeks', topics:['Postman for API testing','Browser DevTools','SQL for data validation','Writing clear bug reports'], description:'Get hands-on with real testing tools. Postman for APIs and browser DevTools for frontend testing are essential.' },
      { id:3, title:'Test Automation', duration:'5–6 weeks', topics:['Playwright (recommended)','Cypress for frontend','Selenium WebDriver','Page Object Model'], description:'Automation is what separates manual testers from engineers. Learn to write tests that run themselves.' },
      { id:4, title:'Advanced QA', duration:'3–4 weeks', topics:['Performance testing (k6)','Security testing basics','CI/CD test integration','Test reporting'], description:'Go beyond functional testing — performance, security, and integrating tests into development pipelines.' },
    ],
    resources:[
      { id:'qa-1', title:'Software Testing Full Course', description:'Comprehensive QA course covering manual testing, automation, and tools.', url:'https://www.youtube.com/watch?v=4ELH9fNMBOQ', type:'video', free:true, source:'freeCodeCamp' },
      { id:'qa-2', title:'Guru99 Software Testing', description:'The most comprehensive free testing tutorial site. Covers everything.', url:'https://www.guru99.com/software-testing.html', type:'docs', free:true, source:'Guru99' },
      { id:'qa-3', title:'Playwright Official Docs', description:'Modern, recommended test automation tool. Great docs and cross-browser support.', url:'https://playwright.dev/docs/intro', type:'docs', free:true, source:'Microsoft' },
      { id:'qa-4', title:'Postman Learning Center', description:'Official Postman docs and learning paths. Master API testing completely.', url:'https://learning.postman.com/docs/getting-started/introduction', type:'docs', free:true, source:'Postman' },
      { id:'qa-5', title:'Cypress Full Course', description:'Frontend test automation with Cypress — the most popular frontend testing tool.', url:'https://www.youtube.com/watch?v=BQqzfHQkREo', type:'video', free:true, source:'freeCodeCamp' },
      { id:'qa-6', title:'Ministry of Testing', description:'The premier QA community — articles, courses, and a global network of testers.', url:'https://www.ministryoftesting.com', type:'community', free:true, source:'MoT' },
      { id:'qa-7', title:'k6 Performance Testing', description:'Load testing with k6 — write performance tests in JavaScript.', url:'https://k6.io/docs', type:'docs', free:true, source:'Grafana' },
    ],
    projects:[
      { id:'qa-p1', title:'Login Page Test Cases', description:'Write a complete manual test case document for a login form — all paths.', level:'beginner', techTags:['Manual Testing','Documentation'] },
      { id:'qa-p2', title:'API Test Collection', description:'Build a Postman collection testing a public API endpoint with assertions.', level:'beginner', techTags:['Postman','API Testing'] },
      { id:'qa-p3', title:'Automated Login Tests', description:'Write Playwright tests for login flow: valid, invalid, locked account.', level:'intermediate', techTags:['Playwright','TypeScript'] },
      { id:'qa-p4', title:'Performance Test Report', description:'Run k6 load tests against an API, analyze results, write a report.', level:'advanced', techTags:['k6','Performance','Reporting'] },
    ],
    aiGuide:{
      goodFor:['Generating test cases from feature descriptions','Writing Playwright scripts from plain English','Explaining why a test is failing','Reviewing test coverage gaps'],
      notFor:['Replacing actual test execution','Knowing your application\'s specific business logic','Making severity judgments without product context'],
      tools:[
        { name:'GitHub Copilot', use:'Writing automation scripts in your editor', url:'https://github.com/features/copilot' },
        { name:'Claude / ChatGPT', use:'Generating test cases from requirements', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Feature: user can log in with email and password, locked out after 5 failed attempts. Generate complete test cases: happy path, invalid credentials, locked account, empty fields.',
        'Write a Playwright test in TypeScript that navigates to /login, fills email and password, clicks submit, and asserts user is redirected to /dashboard.',
      ],
    },
    careerTip:'QA is underrated and underhired. Combine QA with test automation coding skills and you become significantly more employable and better paid.',
  },
  {
    id:'data', slug:'data-analysis', name:'Data Analysis',
    tagline:'Turn raw numbers into decisions that actually matter.',
    category:'analyze', colorHex:'#9F7AEA', icon:'BarChart2',
    difficulty:3, difficultyLabel:'Medium', timeEstimate:'4–6 months',
    techStack:['Excel','SQL','Python','Pandas','Power BI','Tableau'],
    overview:{
      description:'Data analysts collect, clean, and interpret data to help organizations make informed decisions. You work with spreadsheets, SQL, Python, and visualization tools to find patterns and tell stories with data.',
      whatYouCanBuild:['Business dashboards','Sales performance reports','Customer behavior analyses','Financial forecasting models'],
      jobTitles:['Data Analyst','Business Intelligence Analyst','Reporting Analyst','Operations Analyst'],
      salaryRange:'$45,000–$100,000/year'
    },
    roadmap:[
      { id:1, title:'Spreadsheets & Excel', duration:'2–3 weeks', topics:['Formulas & functions','Pivot tables','Charts & visualization','Data cleaning in Excel','VLOOKUP / INDEX-MATCH'], description:'Excel is still the most-used data tool in the world. Master it completely before moving on.' },
      { id:2, title:'SQL Fundamentals', duration:'4–5 weeks', topics:['SELECT, WHERE, ORDER BY','Aggregations: COUNT, SUM, AVG','JOINs: INNER, LEFT, RIGHT','Subqueries and CTEs','Window functions'], description:'SQL is the language of data. Every analyst uses it every single day.' },
      { id:3, title:'Python for Data', duration:'5–6 weeks', topics:['Pandas: data manipulation','NumPy: numerical operations','Matplotlib & Seaborn','Handling missing data','Merging and reshaping data'], description:'Python unlocks powerful data analysis at scale. Pandas is your most important library.' },
      { id:4, title:'BI & Visualization Tools', duration:'3–4 weeks', topics:['Power BI fundamentals','Tableau Public','Google Looker Studio','Dashboard design principles'], description:'Great analysis is useless if you cannot communicate it. Build dashboards that tell clear stories.' },
      { id:5, title:'Statistics Basics', duration:'2–3 weeks', topics:['Mean, median, mode','Standard deviation','Correlation vs causation','Basic hypothesis testing'], description:'You need enough statistics to avoid drawing wrong conclusions from your data.' },
    ],
    resources:[
      { id:'da-1', title:'SQL Full Course', description:'Complete SQL covering everything from SELECT to window functions.', url:'https://www.youtube.com/watch?v=HXV3zeQKqGY', type:'video', free:true, source:'freeCodeCamp' },
      { id:'da-2', title:'SQLZoo', description:'Interactive SQL practice. The best place to drill queries until they feel natural.', url:'https://sqlzoo.net', type:'practice', free:true, source:'SQLZoo' },
      { id:'da-3', title:'Pandas Full Course', description:'Learn Python Pandas — loading, cleaning, transforming, and analyzing data.', url:'https://www.youtube.com/watch?v=vmEHCJofslg', type:'video', free:true, source:'freeCodeCamp' },
      { id:'da-4', title:'Kaggle Learn', description:'Free micro-courses on Python, Pandas, SQL, and data viz. Highly practical.', url:'https://www.kaggle.com/learn', type:'docs', free:true, source:'Kaggle' },
      { id:'da-5', title:'Excel Full Course', description:'Master Excel for data analysis — formulas, pivot tables, charts, power query.', url:'https://www.youtube.com/watch?v=Vl0H-qTclOg', type:'video', free:true, source:'freeCodeCamp' },
      { id:'da-6', title:'Power BI Full Course', description:'Complete Power BI course — connect data and build interactive reports.', url:'https://www.youtube.com/watch?v=TmhQCQr_DCA', type:'video', free:true, source:'freeCodeCamp' },
      { id:'da-7', title:'Kaggle Datasets', description:'Thousands of free datasets to practice on. Download and analyze anything.', url:'https://www.kaggle.com/datasets', type:'practice', free:true, source:'Kaggle' },
      { id:'da-8', title:'Select Star SQL', description:'Interactive SQL book. Best way to learn SQL for real analytical queries.', url:'https://selectstarsql.com', type:'book', free:true, source:'Zi Chong Kao' },
    ],
    projects:[
      { id:'da-p1', title:'Sales Dashboard', description:'Analyze a sales dataset and build an interactive dashboard with KPIs.', level:'beginner', techTags:['Excel','Power BI'] },
      { id:'da-p2', title:'SQL Dataset Analysis', description:'Download a Kaggle dataset, write 15+ SQL queries, and document insights.', level:'beginner', techTags:['SQL','PostgreSQL'] },
      { id:'da-p3', title:'Student Performance Analysis', description:'Analyze academic dataset with Pandas: trends, outliers, correlations.', level:'intermediate', techTags:['Python','Pandas','Matplotlib'] },
      { id:'da-p4', title:'Financial Report Dashboard', description:'Build a Tableau Public dashboard from a financial CSV dataset.', level:'intermediate', techTags:['Tableau','Data Viz'] },
    ],
    aiGuide:{
      goodFor:['Writing SQL queries from plain English','Explaining dataset columns','Suggesting chart types','Writing Pandas cleaning scripts','Interpreting statistical results'],
      notFor:['Interpreting business context it does not know','Replacing statistical understanding','Making business decisions — that is your job'],
      tools:[
        { name:'ChatGPT Code Interpreter', use:'Upload CSVs and ask AI to analyze and chart them', url:'https://chat.openai.com' },
        { name:'Julius AI', use:'Dedicated data analysis AI with chart generation', url:'https://julius.ai' },
        { name:'Claude', use:'SQL generation, Pandas scripts, insight interpretation', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Write a SQL query that finds the top 10 customers by total order value in the past 6 months, grouped by region. Schema: orders(id, customer_id, amount, date, region).',
        'I have a Pandas DataFrame with a "date" column stored as strings in dd/mm/yyyy format. Write code to convert it to datetime, extract month and year, and create a monthly sales summary by product category.',
      ],
    },
    careerTip:'Domain knowledge multiplies your value. A data analyst who understands finance, healthcare, or logistics is far more valuable than one who only knows SQL.',
  },
  {
    id:'datascience', slug:'data-science', name:'Data Science',
    tagline:'Build models that predict, classify, and discover patterns in data.',
    category:'analyze', colorHex:'#B794F4', icon:'BrainCircuit',
    difficulty:5, difficultyLabel:'Advanced', timeEstimate:'9–14 months',
    techStack:['Python','Pandas','Scikit-learn','TensorFlow','PyTorch','Jupyter'],
    overview:{
      description:'Data scientists build machine learning models that predict outcomes, classify data, and find hidden patterns. The field sits at the intersection of statistics, programming, and domain expertise.',
      whatYouCanBuild:['Predictive models','Recommendation systems','Image classifiers','NLP pipelines','Fraud detection systems'],
      jobTitles:['Data Scientist','ML Engineer','AI Researcher','NLP Engineer','Computer Vision Engineer'],
      salaryRange:'$70,000–$160,000/year'
    },
    roadmap:[
      { id:1, title:'Prerequisite: Data Analysis', duration:'Complete first', topics:['Python + Pandas','SQL','Statistics basics','Data visualization'], description:'Data Science builds on Data Analysis. Complete that track first — especially Python, Pandas, and statistics.' },
      { id:2, title:'Statistics & Math', duration:'3–4 weeks', topics:['Probability distributions','Linear algebra basics','Calculus concepts (gradients)','Hypothesis testing'], description:'You do not need a math degree, but you need enough to understand why models work and when they fail.' },
      { id:3, title:'Machine Learning', duration:'6–8 weeks', topics:['Supervised learning: regression, classification','Unsupervised: clustering','Model evaluation metrics','Feature engineering','Scikit-learn'], description:'Classical ML is the most practical starting point. Master Scikit-learn and core algorithms first.' },
      { id:4, title:'Deep Learning Basics', duration:'4–5 weeks', topics:['Neural networks fundamentals','TensorFlow or PyTorch','CNNs for image tasks','Intro to NLP','Transfer learning'], description:'Deep learning powers modern AI. Start with concepts, then apply with PyTorch or TensorFlow.' },
      { id:5, title:'MLOps & Deployment', duration:'2–3 weeks', topics:['Saving and loading models','FastAPI ML endpoints','Model monitoring','Experiment tracking (MLflow)'], description:'A model in a Jupyter notebook has zero impact. Learn to deploy models as usable APIs.' },
    ],
    resources:[
      { id:'ds-1', title:'fast.ai', description:'Practical deep learning from the top down. One of the best AI courses in existence. Free.', url:'https://www.fast.ai', type:'docs', free:true, source:'fast.ai' },
      { id:'ds-2', title:'Andrew Ng ML Course', description:'The course that introduced millions to machine learning. Audit free on Coursera.', url:'https://www.coursera.org/specializations/machine-learning-introduction', type:'docs', free:false, source:'DeepLearning.AI' },
      { id:'ds-3', title:'Kaggle Learn ML', description:'Free ML courses: intro to ML, intermediate ML, feature engineering, deep learning.', url:'https://www.kaggle.com/learn', type:'docs', free:true, source:'Kaggle' },
      { id:'ds-4', title:'Introduction to Statistical Learning', description:'Essential ML statistics textbook. Free PDF. Read alongside coding practice.', url:'https://www.statlearning.com', type:'book', free:true, source:'James, Witten, Hastie, Tibshirani' },
      { id:'ds-5', title:'ML Full Course', description:'Machine learning course covering core algorithms with Python.', url:'https://www.youtube.com/watch?v=i_LwzRVP7bg', type:'video', free:true, source:'freeCodeCamp' },
      { id:'ds-6', title:'PyTorch Official Tutorials', description:'Official PyTorch tutorials — the industry-standard deep learning framework.', url:'https://pytorch.org/tutorials', type:'docs', free:true, source:'Meta AI' },
      { id:'ds-7', title:'StatQuest with Josh Starmer', description:'Statistics and ML concepts explained visually and clearly. Essential channel.', url:'https://www.youtube.com/@statquest', type:'video', free:true, source:'StatQuest' },
    ],
    projects:[
      { id:'ds-p1', title:'Titanic Survival Predictor', description:'Classic Kaggle competition. Build a classifier with feature engineering.', level:'beginner', techTags:['Python','Pandas','Scikit-learn'] },
      { id:'ds-p2', title:'House Price Prediction', description:'Regression model predicting property prices with feature analysis and cross-validation.', level:'intermediate', techTags:['Scikit-learn','Pandas','EDA'] },
      { id:'ds-p3', title:'Image Classifier', description:'CNN classifier for 10-class image recognition using PyTorch.', level:'advanced', techTags:['PyTorch','CNN','GPU Training'] },
      { id:'ds-p4', title:'Deployed ML API', description:'Train a model, save it, and serve predictions via FastAPI endpoint.', level:'advanced', techTags:['FastAPI','scikit-learn','Docker'] },
    ],
    aiGuide:{
      goodFor:['Explaining ML algorithms in plain terms','Debugging model training code','Suggesting feature engineering ideas','Explaining statistical concepts'],
      notFor:['Replacing mathematical understanding — you must grasp why models work','Validating results without your own analysis'],
      tools:[
        { name:'ChatGPT Code Interpreter', use:'Upload datasets and run ML experiments interactively', url:'https://chat.openai.com' },
        { name:'Claude', use:'Explaining concepts, debugging training pipelines', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Explain gradient descent as if I understand basic algebra but not calculus. Include why it works and what can go wrong with learning rate.',
        'My Random Forest has 97% training accuracy but only 61% test accuracy. Explain what is happening and give me 5 concrete steps to fix it.',
      ],
    },
    careerTip:'Kaggle competitions are your portfolio. Even finishing in the top 40% shows employers you can apply ML to real problems. Publish your notebooks.',
  },
  {
    id:'devops', slug:'devops-engineering', name:'DevOps Engineering',
    tagline:'Build the infrastructure and pipelines that keep software running at scale.',
    category:'grow', colorHex:'#FC8181', icon:'GitBranch',
    difficulty:5, difficultyLabel:'Advanced', timeEstimate:'8–12 months',
    techStack:['Linux','Docker','Kubernetes','GitHub Actions','AWS/GCP','Terraform'],
    overview:{
      description:'DevOps engineers design and maintain infrastructure, deployment pipelines, and monitoring systems that keep software running reliably. You bridge development and operations.',
      whatYouCanBuild:['CI/CD pipelines','Containerized deployments','Monitoring dashboards','Infrastructure as code','Auto-scaling systems'],
      jobTitles:['DevOps Engineer','Site Reliability Engineer (SRE)','Platform Engineer','Cloud Engineer'],
      salaryRange:'$70,000–$160,000/year'
    },
    roadmap:[
      { id:1, title:'Linux & Networking', duration:'4–5 weeks', topics:['Linux command line mastery','TCP/IP, DNS, HTTP, SSH','Shell scripting (Bash)','File permissions & users'], description:'Everything in DevOps runs on Linux. Master the command line and networking before anything else.' },
      { id:2, title:'Version Control & CI/CD', duration:'3–4 weeks', topics:['Advanced Git workflows','GitHub Actions','CI/CD concepts','Pipeline building'], description:'Automate the process from code commit to production deployment.' },
      { id:3, title:'Containers & Docker', duration:'4–5 weeks', topics:['Containerization concepts','Docker images & containers','Docker Compose','Multi-stage builds'], description:'Docker changed how software is packaged and deployed. Understanding containers is fundamental.' },
      { id:4, title:'Cloud & Orchestration', duration:'4–6 weeks', topics:['Cloud concepts (AWS/GCP/Azure)','Kubernetes fundamentals','Infrastructure as Code (Terraform)','Serverless basics'], description:'Learn the major concepts and at least one cloud provider deeply.' },
      { id:5, title:'Monitoring & Security', duration:'2–3 weeks', topics:['Prometheus & Grafana','Log aggregation','Alerting systems','Security hardening'], description:'Keeping systems healthy requires knowing when they are unhealthy. Monitoring is how you know before users do.' },
    ],
    resources:[
      { id:'dv-1', title:'Linux Full Course', description:'Complete Linux course — command line, file system, processes, and scripting.', url:'https://www.youtube.com/watch?v=j5Zsa_eOXeY', type:'video', free:true, source:'freeCodeCamp' },
      { id:'dv-2', title:'Docker Full Course', description:'Learn Docker from the ground up — images, containers, volumes, Compose.', url:'https://www.youtube.com/watch?v=fqMOX6JJhGo', type:'video', free:true, source:'freeCodeCamp' },
      { id:'dv-3', title:'GitHub Actions Docs', description:'Official GitHub Actions documentation. Learn CI/CD with the most popular tool.', url:'https://docs.github.com/en/actions', type:'docs', free:true, source:'GitHub' },
      { id:'dv-4', title:'Kubernetes Tutorials', description:'Official Kubernetes tutorials from basics to advanced deployment strategies.', url:'https://kubernetes.io/docs/tutorials', type:'docs', free:true, source:'CNCF' },
      { id:'dv-5', title:'TechWorld with Nana', description:'The best DevOps YouTube channel — Docker, Kubernetes, CI/CD, cloud.', url:'https://www.youtube.com/@TechWorldwithNana', type:'video', free:true, source:'TechWorld with Nana' },
      { id:'dv-6', title:'Terraform Learn', description:'HashiCorp\'s official Terraform learning platform — Infrastructure as Code.', url:'https://learn.hashicorp.com/terraform', type:'docs', free:true, source:'HashiCorp' },
      { id:'dv-7', title:'AWS Full Course', description:'Complete AWS cloud fundamentals course for beginners.', url:'https://www.youtube.com/watch?v=IPvYjXCsTg8', type:'video', free:true, source:'freeCodeCamp' },
    ],
    projects:[
      { id:'dv-p1', title:'Dockerized Application', description:'Containerize a full-stack app with multi-stage Docker build and Docker Compose.', level:'intermediate', techTags:['Docker','Docker Compose'] },
      { id:'dv-p2', title:'CI/CD Pipeline', description:'GitHub Actions pipeline: test → build Docker image → deploy to Render.', level:'intermediate', techTags:['GitHub Actions','Docker','CI/CD'] },
      { id:'dv-p3', title:'Monitoring Stack', description:'Set up Prometheus and Grafana to monitor an API with dashboards and alerts.', level:'advanced', techTags:['Prometheus','Grafana','Docker'] },
    ],
    aiGuide:{
      goodFor:['Writing Dockerfiles and docker-compose files','Creating GitHub Actions workflows','Writing Bash scripts','Explaining infrastructure errors','Generating Terraform configs'],
      notFor:['Replacing hands-on experience with real infrastructure','Security decisions without expert review'],
      tools:[
        { name:'GitHub Copilot', use:'YAML pipeline generation and script writing', url:'https://github.com/features/copilot' },
        { name:'Warp Terminal', use:'AI-powered terminal with command suggestions', url:'https://www.warp.dev' },
      ],
      samplePrompts:[
        'Write a multi-stage Dockerfile for a Python FastAPI app: uses Python 3.11, installs dependencies, runs as non-root user, exposes port 8000, minimizes final image size.',
        'Write a GitHub Actions workflow that triggers on push to main, runs pytest, builds a Docker image, pushes to Docker Hub, and deploys to Render via deploy hook.',
      ],
    },
    careerTip:'Get the AWS Cloud Practitioner certification while learning — it is free to study for and validates foundational knowledge. Then aim for AWS Solutions Architect Associate.',
  },
  {
    id:'cyber', slug:'cybersecurity', name:'Cybersecurity',
    tagline:'Protect systems, find vulnerabilities, and defend what matters.',
    category:'grow', colorHex:'#48BB78', icon:'Shield',
    difficulty:4, difficultyLabel:'Hard', timeEstimate:'6–10 months',
    techStack:['Linux','Kali Linux','Wireshark','Nmap','Burp Suite','Metasploit'],
    overview:{
      description:'Cybersecurity professionals protect systems and data from attacks. Ethical hackers find vulnerabilities before malicious actors do. One of the fastest-growing, highest-demand fields in tech globally.',
      whatYouCanBuild:['Vulnerability assessment reports','Penetration testing scripts','Security audit documentation','CTF challenge solutions'],
      jobTitles:['Security Analyst','Penetration Tester','Cybersecurity Engineer','SOC Analyst','Ethical Hacker'],
      salaryRange:'$60,000–$150,000/year'
    },
    roadmap:[
      { id:1, title:'Networking Fundamentals', duration:'3–4 weeks', topics:['TCP/IP, DNS, HTTP/HTTPS','OSI model','Firewalls, VPNs, proxies','Wireshark traffic analysis'], description:'You cannot protect what you do not understand. Network knowledge is the foundation of all security work.' },
      { id:2, title:'Security Concepts', duration:'3–4 weeks', topics:['CIA Triad','Authentication & authorization','Common attacks: phishing, MITM, SQLi, XSS','OWASP Top 10'], description:'Learn the language of security — attacks, defenses, and the frameworks professionals use.' },
      { id:3, title:'Ethical Hacking', duration:'5–6 weeks', topics:['Kali Linux setup','Reconnaissance (OSINT)','Vulnerability scanning (Nmap, Nessus)','Exploitation (Metasploit)','Web app testing (Burp Suite)'], description:'Think like an attacker. This is how security professionals find and report vulnerabilities.' },
      { id:4, title:'Defensive Security', duration:'3–4 weeks', topics:['Log analysis','SIEM tools (Splunk basics)','Incident response','Security hardening'], description:'Offense teaches you how attacks work. Defense teaches you how to stop them.' },
    ],
    resources:[
      { id:'cy-1', title:'TryHackMe', description:'The best beginner cybersecurity platform. Gamified labs and guided paths.', url:'https://tryhackme.com', type:'practice', free:true, source:'TryHackMe' },
      { id:'cy-2', title:'HackTheBox', description:'Intermediate to advanced hacking labs. The next step after TryHackMe.', url:'https://www.hackthebox.com', type:'practice', free:true, source:'HackTheBox' },
      { id:'cy-3', title:'PortSwigger Web Security Academy', description:'Free world-class web security training from the Burp Suite creators.', url:'https://portswigger.net/web-security', type:'docs', free:true, source:'PortSwigger' },
      { id:'cy-4', title:'Google Cybersecurity Certificate', description:'Google\'s cybersecurity certificate on Coursera. Audit for free.', url:'https://www.coursera.org/professional-certificates/google-cybersecurity', type:'docs', free:false, source:'Google / Coursera' },
      { id:'cy-5', title:'NetworkChuck YouTube', description:'Networking and cybersecurity content. Engaging and practical.', url:'https://www.youtube.com/@NetworkChuck', type:'video', free:true, source:'NetworkChuck' },
      { id:'cy-6', title:'OWASP Top 10', description:'The definitive list of the 10 most critical web application security risks.', url:'https://owasp.org/www-project-top-ten', type:'docs', free:true, source:'OWASP' },
      { id:'cy-7', title:'PicoCTF', description:'Beginner Capture The Flag challenges. Best place to start practicing.', url:'https://picoctf.org', type:'practice', free:true, source:'CMU' },
    ],
    projects:[
      { id:'cy-p1', title:'Home Network Audit', description:'Use Nmap to scan your own network and document devices, open ports, and risks.', level:'beginner', techTags:['Nmap','Linux'] },
      { id:'cy-p2', title:'Vulnerable App Pentest', description:'Test DVWA or HackTheBox and write a professional penetration test report.', level:'intermediate', techTags:['Kali Linux','Burp Suite','Metasploit'] },
      { id:'cy-p3', title:'CTF Write-ups', description:'Solve 5 TryHackMe challenges and publish detailed write-ups.', level:'intermediate', techTags:['CTF','Linux','Crypto'] },
    ],
    aiGuide:{
      goodFor:['Explaining security concepts and attack vectors','Writing security policy documentation','Understanding CVEs and vulnerability reports'],
      notFor:['Any task facilitating real attacks on systems you do not own','Bypassing security controls in production','Generating malicious code of any kind'],
      tools:[
        { name:'Claude / ChatGPT', use:'Explaining security concepts and documentation writing', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Explain how SQL injection works, what damage it can cause, and the 3 most effective prevention methods in a Python + PostgreSQL application.',
        'Explain the difference between symmetric and asymmetric encryption, when each is used, and give real-world examples of both.',
      ],
    },
    careerTip:'Certifications matter more in cybersecurity than any other tech track. Aim for CompTIA Security+ first — it is widely recognized and achievable for beginners.',
  },
  {
    id:'mobile', slug:'mobile-development', name:'Mobile Development',
    tagline:'Build apps that live in the pockets of billions of people.',
    category:'build', colorHex:'#63B3ED', icon:'Smartphone',
    difficulty:4, difficultyLabel:'Hard', timeEstimate:'5–8 months',
    techStack:['React Native','Expo','Flutter','Dart','Firebase','TypeScript'],
    overview:{
      description:'Mobile developers build apps for Android and iOS. React Native (JavaScript/TypeScript) and Flutter (Dart) are the two most popular cross-platform frameworks — write once, deploy to both platforms.',
      whatYouCanBuild:['Chat apps','Finance trackers','E-commerce apps','Health and habit apps','Social platforms'],
      jobTitles:['Mobile Developer','React Native Developer','Flutter Developer','iOS Developer','Android Developer'],
      salaryRange:'$55,000–$130,000/year'
    },
    roadmap:[
      { id:1, title:'Prerequisites', duration:'3–4 weeks', topics:['JavaScript / React fundamentals (for RN)','Dart basics (for Flutter)','Mobile UI design principles'], description:'Choose your track: React Native (JS background) or Flutter (learn Dart). Both are excellent for cross-platform development.' },
      { id:2, title:'Core Mobile Development', duration:'4–5 weeks', topics:['Components & styling','Navigation (React Navigation / GoRouter)','State management','Device APIs: camera, location'], description:'Build your first real screens. Mobile development feels different from web — learn the patterns that make apps feel native.' },
      { id:3, title:'Firebase & Backend', duration:'3–4 weeks', topics:['Firebase Authentication','Firestore database','Firebase Storage','Push notifications'], description:'Firebase gives your app a full backend without building one from scratch. Perfect for MVPs.' },
      { id:4, title:'Publishing & Polish', duration:'2–3 weeks', topics:['Play Store publishing','App Store publishing','App icons & splash screens','Performance optimization'], description:'Getting an app to production is a skill of its own. Learn publishing, ASO, and monitoring.' },
    ],
    resources:[
      { id:'mob-1', title:'React Native Official Docs', description:'The complete React Native documentation — components, APIs, and guides.', url:'https://reactnative.dev/docs/getting-started', type:'docs', free:true, source:'Meta' },
      { id:'mob-2', title:'Expo Documentation', description:'Expo is the easiest way to start React Native development.', url:'https://docs.expo.dev', type:'docs', free:true, source:'Expo' },
      { id:'mob-3', title:'React Native Full Course', description:'Complete React Native course by freeCodeCamp — components to deployment.', url:'https://www.youtube.com/watch?v=0-S5a0eXPoc', type:'video', free:true, source:'freeCodeCamp' },
      { id:'mob-4', title:'Flutter Official Getting Started', description:'Google\'s Flutter documentation and getting started guide.', url:'https://flutter.dev/docs/get-started', type:'docs', free:true, source:'Google' },
      { id:'mob-5', title:'Flutter Full Course', description:'Complete Flutter course from zero — widgets, navigation, Firebase, deployment.', url:'https://www.youtube.com/watch?v=VPvVD8t02U8', type:'video', free:true, source:'freeCodeCamp' },
      { id:'mob-6', title:'Firebase Official Docs', description:'Official Firebase docs covering auth, Firestore, storage, and more.', url:'https://firebase.google.com/docs', type:'docs', free:true, source:'Google' },
    ],
    projects:[
      { id:'mob-p1', title:'Chat App', description:'Real-time messaging with rooms, user avatars, and Firebase backend.', level:'intermediate', techTags:['React Native','Firebase','Expo'] },
      { id:'mob-p2', title:'Finance Tracker', description:'Track income and expenses with charts, categories, and monthly summaries.', level:'intermediate', techTags:['React Native','SQLite','Charts'] },
      { id:'mob-p3', title:'Habit Tracker App', description:'Track daily habits with streaks, reminders, and a progress dashboard.', level:'intermediate', techTags:['React Native','AsyncStorage','Notifications'] },
      { id:'mob-p4', title:'E-commerce App', description:'Product catalog, cart, checkout with backend API integration.', level:'advanced', techTags:['React Native','FastAPI','Stripe'] },
    ],
    aiGuide:{
      goodFor:['Generating React Native component templates','Explaining platform-specific errors','Writing navigation configuration','Debugging Firebase integration issues'],
      notFor:['Device-specific behavior testing — you need physical devices','App Store review policy decisions'],
      tools:[
        { name:'GitHub Copilot', use:'Component generation and code completion', url:'https://github.com/features/copilot' },
        { name:'Claude / ChatGPT', use:'Debugging platform errors and architecture questions', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Write a React Native component for a custom bottom tab navigator with 4 tabs: Home, Explore, Notifications, Profile. Use Expo icons and React Navigation. Include TypeScript types.',
        'I am getting this Expo build error: [paste error]. Explain the cause and exact steps to fix it.',
      ],
    },
    careerTip:'Publish at least one app to the Play Store. A live app link is far more powerful than a GitHub repo. The publishing process teaches things no course covers.',
  },
  {
    id:'video', slug:'video-editing', name:'Video Editing',
    tagline:'Transform raw footage into stories that captivate and retain audiences.',
    category:'grow', colorHex:'#FBB040', icon:'Film',
    difficulty:2, difficultyLabel:'Beginner-Friendly', timeEstimate:'2–4 months',
    techStack:['DaVinci Resolve','Premiere Pro','CapCut','After Effects'],
    overview:{
      description:'Video editors cut, arrange, color, and polish raw footage into compelling content for YouTube, social media, film, and marketing. One of the most in-demand creative skills in the world.',
      whatYouCanBuild:['YouTube long-form edits','Reels and Shorts','Brand promos','Documentary cuts','Motion graphic intros'],
      jobTitles:['Video Editor','Content Creator','Motion Designer','Post-Production Editor','Social Media Video Editor'],
      salaryRange:'$35,000–$90,000/year (freelance varies widely)'
    },
    roadmap:[
      { id:1, title:'Editing Fundamentals', duration:'2–3 weeks', topics:['Timeline editing','Cut types: hard cut, J-cut, L-cut','Audio levels and syncing','Export settings'], description:'Learn how editing software works and the fundamental language of cuts, transitions, and timing.' },
      { id:2, title:'Storytelling & Pacing', duration:'2–3 weeks', topics:['Story structure','Pacing for different formats','Music selection and sync','Retention editing'], description:'Technical editing is the vehicle. Storytelling is the destination. Make people watch until the end.' },
      { id:3, title:'Visual Effects & Graphics', duration:'3–4 weeks', topics:['Color correction and grading','Text animations','Basic motion graphics','Sound design'], description:'Elevate your edits with professional color, clear typography, and visual polish.' },
      { id:4, title:'Platform-Specific Editing', duration:'2–3 weeks', topics:['YouTube long-form (10–20 min)','Shorts and Reels (60–90 sec)','Captions and subtitles','Podcast video editing'], description:'Different platforms have different editing languages. Master the nuances of each format.' },
    ],
    resources:[
      { id:'vid-1', title:'DaVinci Resolve Official Training', description:'Free professional-grade video editing software with official training.', url:'https://www.blackmagicdesign.com/products/davinciresolve/training', type:'docs', free:true, source:'Blackmagic Design' },
      { id:'vid-2', title:'Casey Faris — DaVinci Resolve', description:'Best DaVinci Resolve YouTube channel. Clear tutorials for all levels.', url:'https://www.youtube.com/@CaseyFaris', type:'video', free:true, source:'Casey Faris' },
      { id:'vid-3', title:'Adobe Premiere Pro Tutorials', description:'Official Adobe tutorials for Premiere Pro — industry standard for professional editing.', url:'https://helpx.adobe.com/premiere-pro/tutorials.html', type:'docs', free:false, source:'Adobe' },
      { id:'vid-4', title:'CapCut Learn Center', description:'Official CapCut tutorials. Best mobile editing tool for beginners.', url:'https://www.capcut.com/learn', type:'docs', free:true, source:'CapCut' },
      { id:'vid-5', title:'Pexels — Free Stock Video', description:'High-quality free stock video for practice projects and B-roll.', url:'https://www.pexels.com', type:'tool', free:true, source:'Pexels' },
      { id:'vid-6', title:'Descript', description:'AI-powered transcript-based video editing. Edit video like a document.', url:'https://www.descript.com', type:'tool', free:false, source:'Descript' },
    ],
    projects:[
      { id:'vid-p1', title:'Talking Head Edit', description:'Record 5 minutes of yourself talking, edit it down to 2 tight, engaging minutes.', level:'beginner', techTags:['DaVinci Resolve','CapCut'] },
      { id:'vid-p2', title:'60-Second Promo', description:'Create a 60-second product promo from stock footage and music.', level:'beginner', techTags:['DaVinci Resolve','Motion Graphics'] },
      { id:'vid-p3', title:'YouTube Video Edit', description:'Edit a 10–15 minute YouTube video with B-roll, lower thirds, color grade.', level:'intermediate', techTags:['Premiere Pro','After Effects'] },
    ],
    aiGuide:{
      goodFor:['Writing scripts and voiceover copy','Generating YouTube title options','Creating thumbnail concepts','Suggesting pacing and structure improvements'],
      notFor:['Making creative editing decisions — that requires human taste','Replacing the craft of storytelling'],
      tools:[
        { name:'ElevenLabs', use:'AI voiceover generation for narration', url:'https://elevenlabs.io' },
        { name:'Descript', use:'AI transcript editing, filler word removal', url:'https://www.descript.com' },
        { name:'Claude / ChatGPT', use:'Script writing, titles, descriptions', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'Write a 60-second YouTube Shorts script about [topic]. Hook viewer in the first 3 seconds with a question, deliver one clear insight, end with a specific call to action. Tone: energetic and direct.',
        'Generate 10 YouTube title options for a video about [topic]. Curiosity-driven, under 60 characters, optimized for click-through rate.',
      ],
    },
    careerTip:'Specialize early. "I edit finance or tech YouTube videos with graphics and captions" gets you hired and lets you charge more than a generic editor.',
  },
  {
    id:'youtube', slug:'youtube-automation', name:'YouTube Automation',
    tagline:'Build content businesses that generate value while you sleep.',
    category:'grow', colorHex:'#FF4E4E', icon:'Youtube',
    difficulty:2, difficultyLabel:'Beginner-Friendly', timeEstimate:'1–3 months',
    techStack:['Canva','ElevenLabs','CapCut','vidIQ','TubeBuddy'],
    overview:{
      description:'YouTube automation is building channels that produce video content systematically — using scripts, AI voices, stock footage, and editors — without being on camera. It is a content business model as much as a skill.',
      whatYouCanBuild:['Faceless YouTube channels','Niche content businesses','Educational video series','AI-narrated documentaries'],
      jobTitles:['Content Creator','YouTube Strategist','Channel Manager','Digital Media Producer'],
      salaryRange:'$0–$50,000+/month (highly variable, performance-based)'
    },
    roadmap:[
      { id:1, title:'Channel Strategy', duration:'1–2 weeks', topics:['Niche selection','Search volume research','Competitor analysis','Channel setup and branding'], description:'Pick the right niche before creating anything. Evergreen topics with search demand and low competition are the target.' },
      { id:2, title:'Content Production', duration:'3–4 weeks', topics:['Script writing with hooks','AI voiceovers (ElevenLabs)','Stock footage sourcing','Thumbnail design (Canva)'], description:'Build a repeatable production system. Automation channels live or die by consistency and quality.' },
      { id:3, title:'Growth & SEO', duration:'2–3 weeks', topics:['YouTube SEO','Title and thumbnail optimization','Upload schedule','Analytics reading'], description:'Publishing is only half the work. Learn how to get YouTube to recommend your videos.' },
      { id:4, title:'Monetization', duration:'Ongoing', topics:['YouTube Partner Program','Sponsorships','Affiliate marketing','Digital products'], description:'Multiple income streams make a channel sustainable. YPP is the start, not the end.' },
    ],
    resources:[
      { id:'yt-1', title:'Matt Par YouTube Channel', description:'The leading YouTube automation channel. Systems, niches, strategy from someone running many channels.', url:'https://www.youtube.com/@MattPar', type:'video', free:true, source:'Matt Par' },
      { id:'yt-2', title:'ElevenLabs', description:'Industry-best AI voice generation. Indistinguishable from human narration.', url:'https://elevenlabs.io', type:'tool', free:false, source:'ElevenLabs' },
      { id:'yt-3', title:'Canva', description:'Design thumbnails, channel art, and graphics — free plan is sufficient to start.', url:'https://www.canva.com', type:'tool', free:true, source:'Canva' },
      { id:'yt-4', title:'vidIQ', description:'YouTube SEO and keyword research tool. Free tier useful for beginners.', url:'https://vidiq.com', type:'tool', free:true, source:'vidIQ' },
      { id:'yt-5', title:'TubeBuddy', description:'YouTube channel growth tool — keyword research, A/B thumbnail testing.', url:'https://tubebuddy.com', type:'tool', free:true, source:'TubeBuddy' },
      { id:'yt-6', title:'Pexels', description:'Free stock video for B-roll without copyright issues.', url:'https://www.pexels.com', type:'tool', free:true, source:'Pexels' },
    ],
    projects:[
      { id:'yt-p1', title:'First 3 Videos', description:'Produce and publish your first 3 automation videos with script, AI voice, thumbnail.', level:'beginner', techTags:['ElevenLabs','CapCut','Canva'] },
      { id:'yt-p2', title:'SEO Content Calendar', description:'Research and plan 30 video ideas ranked by search volume and competition.', level:'beginner', techTags:['vidIQ','TubeBuddy','Research'] },
      { id:'yt-p3', title:'Channel at 1,000 Subscribers', description:'Reach 1,000 subscribers on a niche channel with consistent publishing strategy.', level:'advanced', techTags:['YouTube SEO','Analytics','Strategy'] },
    ],
    aiGuide:{
      goodFor:['Generating script outlines for any topic','Writing multiple title options for A/B testing','Creating video description templates','Suggesting niche ideas'],
      notFor:['Replacing human editorial judgment on what audiences want','Guaranteeing channel growth','Automating audience relationship building'],
      tools:[
        { name:'Claude / ChatGPT', use:'Scripts, titles, descriptions, research summaries', url:'https://claude.ai' },
        { name:'ElevenLabs', use:'Voice generation for narration', url:'https://elevenlabs.io' },
        { name:'Perplexity AI', use:'Fast research and fact-checking for scripts', url:'https://www.perplexity.ai' },
      ],
      samplePrompts:[
        'I run a YouTube automation channel in the personal finance niche targeting young adults in Africa. Generate 10 video ideas with strong search potential, a title for each, and a 3-sentence script outline.',
        'Write a YouTube video hook for: "5 Money Habits That Keep Most People Broke." Hook should create curiosity in first 15 seconds and make viewers unable to click away.',
      ],
    },
    careerTip:'Consistency over perfection when starting. 50 average videos beat 5 perfect ones when building channel authority. Improve quality as you learn what works.',
  },
  {
    id:'marketing', slug:'digital-marketing', name:'Digital Marketing',
    tagline:'Grow audiences, drive traffic, and turn attention into business outcomes.',
    category:'grow', colorHex:'#68D391', icon:'TrendingUp',
    difficulty:2, difficultyLabel:'Beginner-Friendly', timeEstimate:'2–4 months',
    techStack:['Google Ads','Meta Ads','Mailchimp','Google Analytics','SEMrush','Canva'],
    overview:{
      description:'Digital marketers promote products and services through online channels. It is a broad field with many specializations — SEO, paid ads, email marketing, social media, and content. Every business needs it.',
      whatYouCanBuild:['SEO content strategies','Paid ad campaigns','Email marketing sequences','Social media calendars','Analytics dashboards'],
      jobTitles:['Digital Marketing Manager','SEO Specialist','Paid Ads Manager','Content Marketer','Growth Marketer'],
      salaryRange:'$40,000–$100,000/year'
    },
    roadmap:[
      { id:1, title:'Marketing Foundations', duration:'2–3 weeks', topics:['Customer journey (awareness → purchase)','Marketing channels overview','Target audience research','Branding basics','Marketing metrics'], description:'Understand the full picture before specializing. Great marketers understand business goals, not just tactics.' },
      { id:2, title:'Core Channels', duration:'6–8 weeks', topics:['SEO: on-page, off-page, technical','Social media marketing','Content marketing','Email marketing','Copywriting basics'], description:'Master the organic channels first — SEO and content marketing compound over time and cost nothing but effort.' },
      { id:3, title:'Paid Advertising', duration:'3–4 weeks', topics:['Google Ads fundamentals','Meta Ads (Facebook/Instagram)','Ad targeting and segmentation','Budget management'], description:'Paid ads amplify what already works. Learn to spend money profitably before spending big.' },
      { id:4, title:'Analytics & Optimization', duration:'2–3 weeks', topics:['Google Analytics 4','Conversion tracking','A/B testing','ROI reporting'], description:'Data separates professional marketers from guessers. Measure everything and optimize relentlessly.' },
    ],
    resources:[
      { id:'mkt-1', title:'Google Digital Garage', description:'Google\'s free digital marketing certification. Covers all major channels.', url:'https://learndigital.withgoogle.com/digitalgarage', type:'docs', free:true, source:'Google' },
      { id:'mkt-2', title:'HubSpot Academy', description:'Free marketing certifications on inbound, email, SEO, and social media.', url:'https://academy.hubspot.com', type:'docs', free:true, source:'HubSpot' },
      { id:'mkt-3', title:'SEMrush Academy', description:'Free SEO and SEM courses from one of the most respected tools in the industry.', url:'https://www.semrush.com/academy', type:'docs', free:true, source:'SEMrush' },
      { id:'mkt-4', title:'Moz SEO Learning Center', description:'The definitive SEO learning resource. Comprehensive and up to date.', url:'https://moz.com/learn/seo/what-is-seo', type:'docs', free:true, source:'Moz' },
      { id:'mkt-5', title:'Neil Patel YouTube', description:'High-quality SEO, content, and digital marketing strategy tutorials.', url:'https://www.youtube.com/@NeilPatel', type:'video', free:true, source:'Neil Patel' },
      { id:'mkt-6', title:'Ahrefs YouTube', description:'The best SEO YouTube channel. Practical, well-researched, actionable content.', url:'https://www.youtube.com/@AhrefsTV', type:'video', free:true, source:'Ahrefs' },
    ],
    projects:[
      { id:'mkt-p1', title:'SEO Audit Report', description:'Pick a local business website, run a full SEO audit, and write a recommendations report.', level:'beginner', techTags:['SEO','Moz','Google Search Console'] },
      { id:'mkt-p2', title:'Content Calendar', description:'Create a 30-day social media content calendar with captions and hashtags.', level:'beginner', techTags:['Content Strategy','Canva'] },
      { id:'mkt-p3', title:'Email Campaign', description:'Build a 5-email welcome sequence for a product using Mailchimp. Track open rates.', level:'intermediate', techTags:['Mailchimp','Copywriting','Email'] },
    ],
    aiGuide:{
      goodFor:['Writing multiple ad copy variations for A/B testing','Generating social media captions for a week','Writing email subject lines','Analyzing and rewriting underperforming copy'],
      notFor:['Replacing genuine audience understanding','Predicting campaign performance','Making media buying decisions without platform data'],
      tools:[
        { name:'Claude / ChatGPT', use:'Copywriting, campaign ideation, content planning', url:'https://claude.ai' },
        { name:'Canva AI', use:'Ad creative and social media graphic generation', url:'https://www.canva.com' },
        { name:'Perplexity AI', use:'Market research and competitor intelligence', url:'https://www.perplexity.ai' },
      ],
      samplePrompts:[
        'Write 5 Facebook Ad headline options for a Nigerian fintech app targeting small business owners aged 25–45 focused on saving time on bookkeeping. Each under 40 characters.',
        'Create a 2-week Instagram content calendar for a fashion brand targeting Gen Z women in Lagos. Include post concept, caption under 150 chars, and 5 hashtags per day.',
      ],
    },
    careerTip:'Get Google\'s free Digital Marketing certification first — it validates baseline knowledge. Then specialize: SEO is the highest long-term value marketing skill.',
  },
  {
    id:'ai', slug:'ai-for-work', name:'AI for Work & Productivity',
    tagline:'Use AI as a thinking partner that makes you sharper, not dependent.',
    category:'grow', colorHex:'#00D4AA', icon:'Sparkles',
    difficulty:1, difficultyLabel:'All Levels', timeEstimate:'Ongoing',
    techStack:['Claude','ChatGPT','Gemini','Copilot','Cursor','Perplexity'],
    overview:{
      description:'AI tools are now part of every professional workflow. This track teaches you to use them intelligently — as tools that amplify your thinking, not replace it. It applies to every other track in this hub.',
      whatYouCanBuild:['AI-assisted workflows','Custom prompt libraries','Automated research pipelines','AI-augmented development setups'],
      jobTitles:['AI-Augmented Developer','Prompt Engineer','AI Product Manager','LLM Application Developer'],
      salaryRange:'This track amplifies every other track\'s salary potential'
    },
    roadmap:[
      { id:1, title:'Understanding AI Tools', duration:'1 week', topics:['What LLMs are and are not','Major tools: Claude, ChatGPT, Gemini','Strengths and limitations','Hallucinations and fact-checking'], description:'Before using AI effectively, you must understand what it is — and critically, what it cannot do.' },
      { id:2, title:'Prompt Engineering', duration:'2–3 weeks', topics:['Zero-shot prompting','Few-shot prompting','Chain-of-thought','System prompts and roles','Iterating and refining'], description:'The quality of your AI outputs depends entirely on the quality of your inputs. Prompting is a learnable skill.' },
      { id:3, title:'AI for Your Field', duration:'Ongoing', topics:['AI for developers (Copilot, Cursor)','AI for designers (Midjourney, Figma AI)','AI for analysts (Code Interpreter)','AI for writers (Claude)'], description:'Each field has specific AI workflows. Learn the tools and patterns for your specific track.' },
      { id:4, title:'AI Ethics & Verification', duration:'1–2 weeks', topics:['Understanding hallucinations','Fact-checking AI output','Privacy and data concerns','Thinking before prompting'], description:'The most important AI skill is knowing when not to trust it. Build the habit of verification.' },
    ],
    resources:[
      { id:'ai-1', title:'Intro to Large Language Models', description:'Andrej Karpathy\'s definitive video explanation of how LLMs work. Watch this first.', url:'https://www.youtube.com/watch?v=zjkBMFhNj_g', type:'video', free:true, source:'Andrej Karpathy' },
      { id:'ai-2', title:'Prompt Engineering Guide', description:'The most comprehensive free prompt engineering reference. All major techniques covered.', url:'https://www.promptingguide.ai', type:'docs', free:true, source:'DAIR.AI' },
      { id:'ai-3', title:'Learn Prompting', description:'Free interactive course on prompt engineering from basics to advanced.', url:'https://learnprompting.org', type:'docs', free:true, source:'Learn Prompting' },
      { id:'ai-4', title:'DeepLearning.AI Short Courses', description:'Free short courses from Andrew Ng on prompt engineering, LangChain, and AI apps.', url:'https://www.deeplearning.ai/short-courses', type:'docs', free:true, source:'DeepLearning.AI' },
      { id:'ai-5', title:'Neural Networks — 3Blue1Brown', description:'Visual, intuitive explanation of how neural networks learn. Beautiful and clear.', url:'https://www.youtube.com/watch?v=aircAruvnKk', type:'video', free:true, source:'3Blue1Brown' },
      { id:'ai-6', title:'fast.ai Practical Data Ethics', description:'Think critically about AI — bias, fairness, safety, and ethics.', url:'https://ethics.fast.ai', type:'docs', free:true, source:'fast.ai' },
    ],
    projects:[
      { id:'ai-p1', title:'Personal Prompt Library', description:'Build a personal library of 20+ tested prompts for your specific workflow and field.', level:'beginner', techTags:['Prompt Engineering','Claude','ChatGPT'] },
      { id:'ai-p2', title:'AI Research Report', description:'Research a topic using AI tools, verify every claim independently, produce a report.', level:'intermediate', techTags:['Perplexity','Claude','Verification'] },
      { id:'ai-p3', title:'AI-Integrated App', description:'Build an application that calls an LLM API as a core feature.', level:'advanced', techTags:['Python','Groq API','FastAPI'] },
    ],
    aiGuide:{
      goodFor:['Everything in this track — AI teaches you to use AI'],
      notFor:['This is the one track where the entire point is learning AI tools'],
      tools:[
        { name:'Claude', use:'Long-form reasoning, code, writing, analysis', url:'https://claude.ai' },
        { name:'ChatGPT', use:'General purpose, code interpreter, images', url:'https://chat.openai.com' },
        { name:'Perplexity AI', use:'Research with citations and live web access', url:'https://www.perplexity.ai' },
        { name:'GitHub Copilot', use:'In-editor code completion', url:'https://github.com/features/copilot' },
        { name:'Cursor', use:'Full AI code editor for serious development', url:'https://cursor.sh' },
        { name:'v0.dev', use:'AI UI component generation from text', url:'https://v0.dev' },
      ],
      samplePrompts:[
        'Act as a senior software engineer reviewing my code. Look for: bugs, security issues, performance problems, and style issues. Be specific about what to fix and why. Code: [paste]',
        'I need to learn [specific concept]. Explain it in simple terms first, then with a concrete example, then tell me the most common misconceptions beginners have about it.',
      ],
    },
    careerTip:'The professionals thriving with AI use it to go deeper, not shallower. Use AI to understand things faster — then push further on your own. That combination is unbeatable.',
  },
  {
    id:'nocode', slug:'no-code-development', name:'No-Code Development',
    tagline:'Build functional products without writing a single line of code.',
    category:'design', colorHex:'#A78BFA', icon:'Blocks',
    difficulty:1, difficultyLabel:'Beginner', timeEstimate:'1–2 months',
    techStack:['Webflow','Bubble','Framer','Zapier','Glide','Airtable'],
    overview:{
      description:'No-code tools let you build websites, apps, and automations without writing code. It is the fastest way to validate ideas, build MVPs, and create tools for non-technical businesses.',
      whatYouCanBuild:['Marketing websites','Web apps with databases','Automated workflows','Mobile-first apps from spreadsheets'],
      jobTitles:['No-Code Developer','Automation Specialist','Operations Manager','Product Manager'],
      salaryRange:'$35,000–$80,000/year'
    },
    roadmap:[
      { id:1, title:'Website Building', duration:'2–3 weeks', topics:['Webflow fundamentals','Framer for React sites','CMS and dynamic content','Responsive layouts'], description:'Build professional websites without code. Webflow is the industry leader for design-quality no-code sites.' },
      { id:2, title:'App Building', duration:'3–4 weeks', topics:['Bubble for web apps','Glide for mobile apps','Database design','User authentication','Logic and workflows'], description:'Build functional applications with user accounts, databases, and business logic — all without code.' },
      { id:3, title:'Automation', duration:'2–3 weeks', topics:['Zapier workflows','Make (Integromat)','Connecting APIs without code','Multi-step automations'], description:'Connect tools, trigger actions, and automate repetitive tasks across any platform.' },
    ],
    resources:[
      { id:'nc-1', title:'Webflow University', description:'Official Webflow learning platform. The most complete free no-code web building education.', url:'https://webflow.com/university', type:'docs', free:true, source:'Webflow' },
      { id:'nc-2', title:'Bubble Academy', description:'Official Bubble tutorials for building full web apps without code.', url:'https://bubble.io/learn', type:'docs', free:true, source:'Bubble' },
      { id:'nc-3', title:'Framer Learn', description:'Build React-powered websites without code using Framer\'s visual editor.', url:'https://framer.com/learn', type:'docs', free:true, source:'Framer' },
      { id:'nc-4', title:'Zapier Learn', description:'Official Zapier documentation and tutorials for workflow automation.', url:'https://zapier.com/learn', type:'docs', free:true, source:'Zapier' },
      { id:'nc-5', title:'Glide Apps', description:'Build mobile apps from Google Sheets or Airtable with no code.', url:'https://www.glideapps.com', type:'tool', free:true, source:'Glide' },
    ],
    projects:[
      { id:'nc-p1', title:'Business Website', description:'Build a complete 5-page business website in Webflow from a design brief.', level:'beginner', techTags:['Webflow','CMS','Responsive'] },
      { id:'nc-p2', title:'Automation Workflow', description:'Zapier: new form submission → add to Airtable → send welcome email.', level:'beginner', techTags:['Zapier','Airtable','Email'] },
      { id:'nc-p3', title:'MVP Web App', description:'Build a functional web app in Bubble with user auth, database, and core features.', level:'intermediate', techTags:['Bubble','Database','Auth'] },
    ],
    aiGuide:{
      goodFor:['Writing content for your no-code site','Generating workflow logic descriptions','Planning data structure for your app'],
      notFor:['This track is about visual building — AI keeps you focused on the tools'],
      tools:[
        { name:'Claude / ChatGPT', use:'Content writing, workflow planning, troubleshooting', url:'https://claude.ai' },
      ],
      samplePrompts:[
        'I am building a membership platform in Bubble for freelance designers. Design the database schema — what tables, fields, and relationships do I need?',
        'Write homepage copy for a freelance web design studio: hero headline, subheadline, 3 service descriptions, testimonial placeholder, and CTA.',
      ],
    },
    careerTip:'No-code is a multiplier. Add basic HTML/CSS and SQL knowledge and you can break out of tool limitations when needed — and charge significantly more.',
  },
  {
    id:'writing', slug:'technical-writing', name:'Technical Writing',
    tagline:'Write documentation so clear that engineers stop asking questions.',
    category:'design', colorHex:'#E2C97E', icon:'FileText',
    difficulty:2, difficultyLabel:'Beginner-Friendly', timeEstimate:'2–3 months',
    techStack:['Markdown','Confluence','Notion','ReadMe','Git','Docs as Code'],
    overview:{
      description:'Technical writers create documentation that makes complex systems understandable — API docs, user guides, tutorials, and changelogs. If you can write clearly about technical things, you are in demand.',
      whatYouCanBuild:['API documentation','User manuals and guides','Developer tutorials','Internal knowledge bases','Product changelogs'],
      jobTitles:['Technical Writer','Documentation Engineer','Developer Advocate','Content Engineer'],
      salaryRange:'$50,000–$120,000/year'
    },
    roadmap:[
      { id:1, title:'Writing Fundamentals', duration:'2–3 weeks', topics:['Writing for technical audiences','Clarity and concision','Active voice','Structure and hierarchy','Tone and consistency'], description:'Good technical writing is not about big vocabulary — it is about clarity. Say complex things simply.' },
      { id:2, title:'Tools & Formats', duration:'2–3 weeks', topics:['Markdown mastery','Docs as Code (Git)','Confluence / Notion','ReadMe.com','Diagrams (Mermaid, Excalidraw)'], description:'Technical writers work inside the same tools as engineers. Learn the formats used by modern tech teams.' },
      { id:3, title:'Documentation Types', duration:'3–4 weeks', topics:['API documentation','Tutorial writing','How-to guides','Conceptual explanations','Reference documentation'], description:'Each documentation type has a different structure and purpose. Learn the Divio documentation system.' },
      { id:4, title:'Portfolio & Specialization', duration:'Ongoing', topics:['Technical writing portfolio','Specializing by domain','Writing for open source'], description:'Build a portfolio of real documentation samples. Contributing to open source docs is an excellent start.' },
    ],
    resources:[
      { id:'tw-1', title:'Google Technical Writing Courses', description:'Google\'s free technical writing courses. Pre-course and main course. Essential starting point.', url:'https://developers.google.com/tech-writing', type:'docs', free:true, source:'Google' },
      { id:'tw-2', title:'Write the Docs Guide', description:'Community-driven documentation best practices guide. The industry standard reference.', url:'https://www.writethedocs.org/guide', type:'docs', free:true, source:'Write the Docs' },
      { id:'tw-3', title:'Divio Documentation System', description:'The 4-type documentation framework: tutorials, how-tos, explanations, and references.', url:'https://www.divio.com/blog/documentation', type:'docs', free:true, source:'Divio' },
      { id:'tw-4', title:'Markdown Guide', description:'Complete reference for Markdown syntax — the format of most technical documentation.', url:'https://www.markdownguide.org/cheat-sheet', type:'docs', free:true, source:'Markdown Guide' },
    ],
    projects:[
      { id:'tw-p1', title:'API Documentation', description:'Document a public API or one you built — endpoints, parameters, responses, errors.', level:'beginner', techTags:['Markdown','ReadMe','APIs'] },
      { id:'tw-p2', title:'Tutorial Series', description:'Write a 3-part tutorial teaching a beginner to build something in your area of expertise.', level:'intermediate', techTags:['Docs as Code','Markdown','Git'] },
      { id:'tw-p3', title:'Open Source Contribution', description:'Improve the documentation of a real open source project and submit a pull request.', level:'advanced', techTags:['GitHub','Markdown','Open Source'] },
    ],
    aiGuide:{
      goodFor:['Drafting first versions of documentation sections','Simplifying overly complex sentences','Generating API reference templates','Proofreading and consistency checking'],
      notFor:['Understanding the technical systems you are documenting','Replacing clarity of thought with generated text'],
      tools:[
        { name:'Claude', use:'Draft documentation, simplify text, consistency review', url:'https://claude.ai' },
        { name:'Grammarly', use:'Grammar, tone, and readability checks', url:'https://www.grammarly.com' },
      ],
      samplePrompts:[
        'I have written this technical explanation but it is too long. Simplify it for junior developers who understand JavaScript but not React: [paste text]',
        'Generate an API reference entry for this endpoint formatted as Markdown with: Description, HTTP Method, URL, Request Parameters, Request Body, Response, Error Codes, and a code example: [paste details]',
      ],
    },
    careerTip:'Technical writers who can read code earn significantly more than those who cannot. Even basic Python or JavaScript reading ability makes you far more effective and employable.',
  },
]

export const getAllTracks = () => TRACKS
export const getTrackBySlug = (slug: string) => TRACKS.find(t => t.slug === slug)
export const getTrackById = (id: string) => TRACKS.find(t => t.id === id)
export const getTracksByCategory = (category: TrackCategory) => TRACKS.filter(t => t.category === category)
export const getTrackSlugs = () => TRACKS.map(t => t.slug)

export const CATEGORIES = [
  { id: 'build' as TrackCategory, label:'BUILD', description:'Write code, create systems, ship products', color:'#00D4AA' },
  { id: 'design' as TrackCategory, label:'DESIGN', description:'Create interfaces, experiences, and content', color:'#A78BFA' },
  { id: 'analyze' as TrackCategory, label:'ANALYZE', description:'Extract meaning from data and systems', color:'#F0A500' },
  { id: 'grow' as TrackCategory, label:'GROW', description:'Scale, secure, market, and automate', color:'#388BFD' },
]
```

---

*End of Part 4 — Cursor Prompt is now complete.*

*Hand Cursor both files:*
*1. `CURSOR_PROMPT_TechSkillsHub.md` — the full build spec (Parts 1–3)*
*2. This file — the starter code (Part 4: globals.css, tailwind.config.ts, lib/tracks.ts)*

*Everything Cursor needs to build the site without guessing is here.*
