so I want to rebuild the UX and and add some features on tech skill hub and this is the plan I currently have, I need you to plan and prepare for it's implementation:

TECHSKILLHUB

Retention, Learning Experience
and Repository Audit

A practical product strategy for increasing learner retention, course completion, personalization, engagement, and third-party resource reliability.

Core objective

Turn TechSkillHub from a platform that contains structured learning into a platform that continuously understands each learner, tells them what to do next, makes progress visible, and gives them reasons to return until they complete meaningful work.

Repository reviewed: github.com/awesomeakokayo/Techhubs

Review basis: current default-branch files returned by the GitHub connector on 8 October 2026. The repository metadata reported a push on 7 October 2026. File responses resolved to the current code snapshot represented by commit a4dc39c...


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

1. Executive summary

The retention problem should be treated as a product-system problem, not a single-feature problem. A mascot, streaks or notifications can help, but they will not fix weak activation, unclear next actions, difficult resources or a generic learner experience. The highest-leverage strategy is a layered loop: understand the learner, recommend a path, surface one next action, show progress, create a sustainable habit, celebrate meaningful work, and re-engage the learner when they drift.

The product thesis

TechSkillHub should help a learner answer four questions every time they return: What am I trying to achieve? Where am I now? What should I do next? Why is it worth continuing?

Layer

What to build

Primary outcome

1. Instrumentation

Activation, retention, progress and completion events

Stop guessing where users drop

2. Personalization

Learner profile, goal, pace and recommended path

Higher relevance

3. Next action

A single recommended task on the learner home

Lower decision friction

4. Habit

Daily goals, streaks and milestones

More repeat sessions

5. Meaningful work

Projects, portfolio evidence and career milestones

Progress tied to outcomes

6. Personality

Contextual mascot and celebrations

More emotional connection

7. Re-engagement

Contextual reminders and resume flow

Bring inactive learners back

8. Content reliability

Resource verification and transparent access conditions

Fewer dead ends and broken trust

2. What success should mean

Do not define success as time spent on TechSkillHub or raw registrations. The product exists to help people develop skills and become able to demonstrate those skills. Retention should therefore be measured as a means to meaningful learning progress.

Metric

Definition

Why it matters

Activation

Account created -> goal/path chosen -> first meaningful activity completed

Shows whether signup becomes learning

D1 retention

Activated learner returns the next day

Early habit signal

D7 retention

Activated learner returns within 7 days

Habit formation signal

D30 retention

Activated learner returns within 30 days

Durable usage signal

Path progression

Learners reaching 25%, 50%, 75% of a path

Shows learning momentum

Project start

Learner begins a portfolio-oriented project

Shows shift from consumption to making

Project completion

Learner completes a project

Evidence of practical learning

Course completion

Guided path reaches completion

Primary learning outcome

North Star direction

Increase the percentage of activated learners who return, make measurable progress, and ultimately complete a learning path and produce demonstrable work.

3. Personalization strategy

Personalization should begin before the learner reaches a generic dashboard. It should use explicit preferences first and observed behavior later. The system should not simply insert a name into an otherwise identical page.

3.1 Onboarding questions

What are you trying to achieve? (job, freelancing, building products, career switch, exploration)

Which direction interests you? (software, cybersecurity, AI, product, design, data, marketing, etc.)

What is your current level? (complete beginner, basics, already building)

How much time can you realistically give each week?

What outcome would make the journey feel successful? (fundamentals, projects, portfolio, job/internship readiness)

3.2 The learner home should be personal

Example

Good evening, Awesome. Your goal is Full-Stack Development. You have 30 minutes today. Your next step is JavaScript Functions (18 min). You are two activities away from your next milestone.

The user should not open the product and have to decide among ten equal options. The product should make one recommendation while still allowing exploration.

3.3 Personalization must evolve

Use a combination of profile data and behavior: preferred learning time, pace, skipped items, repeated failures, resource format preference, project completion, recent inactivity, and declared career goal. This produces an adaptive experience rather than a one-time quiz.

Behavior

Possible adaptation

Repeatedly skipping long resources

Offer shorter orientation resource or split task

Fast completion of beginner material

Recommend next level sooner

Repeated quiz failure

Offer alternative explanation or practice before retry

Consistent evening usage

Schedule optional evening reminder

No activity for several days

Resume flow with the exact unfinished task

Project completion

Promote next portfolio/career milestone


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

4. Engagement strategy

Engagement is not one thing. Some learners are motivated by progress, others by competition, accountability, career outcomes, or building. The product should support multiple motivation patterns without forcing every user into the same game mechanics.

4.1 The next-best-action pattern

Core interaction

Every signed-in learner should see one obvious next action. "Continue learning" should be the highest-friction-free action on the screen.

4.2 Daily goals

Use a small, believable goal such as one activity or 15-20 minutes rather than asking the learner to finish a large course section. The aim is to make starting easy.

4.3 Streaks and milestones

3-day streak: First Spark

7-day streak: Consistent

14-day streak: Builder

30-day streak: Committed

60-day streak: Advanced Builder

Do not make one missed day so punishing that a learner abandons the platform. Consider weekly goals or a limited streak-protection mechanic later.

4.4 Turn courses into journeys and missions

Replace the mental model of "watch lesson 1, watch lesson 2" with visible outcomes: Learn -> Practice -> Build -> Prove -> Career-ready.

Foundation mission: learn a concept.

Practice mission: do something independently.

Build mission: produce an artifact.

Portfolio milestone: document the artifact.

Career milestone: connect the skill to a job, freelance offer or next opportunity.

4.5 Progress should mean more than percentage complete

Show streak, activities completed, milestones reached, projects built, skills demonstrated and course completion. This gives learners multiple forms of visible progress.


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

5. Mascot strategy

The mascot is a strong idea, but only when it participates in the product. It should not become a decorative logo extension or an always-moving distraction.

Context

Mascot role

Example

Welcome

Orientation

"Ready for today's session?"

Guidance

Explain the next action

"You are almost done with this milestone."

Celebration

Acknowledge meaningful work

"You built your first project!"

Struggle

Offer an alternative

"That topic is tricky. Want a simpler explanation?"

Reactivation

Support a return

"Your JavaScript path is still here. Continue where you stopped."

Milestone

Create a memorable moment

Expression/pose change + short message

The mascot can occasionally move or peek into the interface, but motion should be event-driven and respectful. The user should remain in control, and reduced-motion preferences should be honored.

5.1 Personalities by learner type

Learner type

Emphasis

Goal-oriented

Target, deadline, progress

Competitive

Challenges, streaks, optional rankings

Social

Cohorts, study groups, peer accountability

Builder

Projects, GitHub/portfolio evidence

Career-focused

Skills, projects, CV/interview readiness

Explorer

Recommended paths and discovery


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

6. Landing-page and activation strategy

Bounce rate and retention are different problems. The landing page must answer "Why should I start?" The product must answer "Why should I come back?"

6.1 Landing page

Lead with the problem: "Stop guessing what to learn next."

Use one primary CTA: "Find My Learning Path".

Show a real learning-path example before asking for commitment.

Use real product screenshots and real usage/traction numbers rather than generic decorative imagery.

Let visitors explore a path before forcing account creation where practical.

Show projects and career outcomes, not only course catalogs.

6.2 Find My Path can become the acquisition-to-activation bridge

The repository already has a four-question quiz that scores preferred directions, asks about experience and weekly time, and estimates path duration. This is a strong foundation for the new onboarding model. The next step is to persist those results server-side and use them to shape the signed-in experience.

6.3 Re-entry experience

Returning learner

Welcome back. You were learning JavaScript Functions. One 18-minute task remains. [Resume where I stopped]


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

7. Truthful GitHub repository audit

I reviewed the current public repository rather than inferring architecture from the product description. The repo is a Next.js/React/TypeScript application using Prisma/PostgreSQL, NextAuth, Framer Motion and Vercel Analytics. It already has several of the foundations needed for the retention roadmap, but the retention system described above does not yet exist as a coherent feature set.

7.1 What already exists and is usable

Area

Current state

Assessment

Auth

NextAuth + Prisma adapter + Google sign-in

GREEN - reusable

Database

PostgreSQL + Prisma

GREEN - strong foundation

User model

User + progress + guided paths + completions

GREEN - enough for first retention version

Guided path

Server-backed enrollment and current step index

GREEN - core learning loop exists

Activity timestamp

GuidedPathEnrollment.lastActivityAt with @updatedAt

GREEN - useful, but not a full event log

Course completion

CourseCompletion table

GREEN - directly usable

Progress

UserProgress and UserTrackProgress

GREEN/AMBER - useful but split across mechanisms

Personalization quiz

Find Your Path quiz with goal/experience/time questions

GREEN/AMBER - currently client/local persistence

Product analytics

Vercel Analytics event helpers

GREEN/AMBER - many events exist, but not yet a retention model

Founder analytics

Database-backed /dashboard/analytics

GREEN - useful internal visibility

Third-party resources

Resource objects embedded in lib/tracks.ts

AMBER - content works, maintenance is fragile

Gamification

No dedicated streak/XP/badge system found

RED - must be added

Reminders

No dedicated learner reminder system found

RED - must be added

Learner profile preferences

No dedicated persistent learner-preference model found

RED - must be added

Primary learner dashboard

Admin analytics exists, but a personalized learner home is not evident as a dedicated route

RED/AMBER - should be created

Repository paths reviewed include prisma/schema.prisma, lib/tracks.ts, lib/progress.ts, lib/analytics.ts, components/quiz/TrackQuiz.tsx, app/api/guided-path/[trackId]/route.ts, app/guided-path/[trackId]/page.tsx, app/api/progress/route.ts, app/find-your-path/page.tsx, app/start/page.tsx, app/account/page.tsx, and the resource implementation/audit documents.

7.2 Important technical observations

The database already records UserProgress, UserTrackProgress, GuidedPathEnrollment and CourseCompletion, so a new retention system does not require a rewrite of the learning core.

GuidedPathEnrollment already stores currentStepIndex, startedAt and lastActivityAt. This can support "resume where I stopped" immediately.

The guided-path POST route records completed steps and upserts CourseCompletion when the final step is reached. This is a solid basis for completion analytics.

The TrackQuiz currently saves quiz results through the browser progress helper. That means the recommendation is not yet a durable learner profile across devices in the way a personalization engine should be.

lib/progress.ts combines browser localStorage with server synchronization. This is workable but creates two sources of state; the long-term direction should be to make the database the canonical source for authenticated learners.

Vercel Analytics events already exist for page views, quiz completion, resource clicks, roadmap stages, projects, shares and CTAs. These can be extended with activation and retention events rather than introducing a second analytics stack immediately.


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

8. Recommended technical architecture

The safest path is incremental. Preserve the existing guided-path engine and add a thin learner-profile, event, recommendation and notification layer around it.

8.1 Recommended Prisma additions

Model

Purpose

Core fields

LearnerProfile

Persistent personalization

userId, primaryGoal, preferredTrack, experienceLevel, weeklyHours, targetOutcome, preferredLearningWindow, onboardingCompletedAt

LearningEvent

Canonical retention/behavior log

userId, eventName, trackId, stepId, metadata Json, createdAt

LearnerStreak

Derived habit state

userId, currentStreak, longestStreak, lastActivityDate, weeklyGoal, updatedAt

NotificationPreference

Control communications

userId, email, inApp, reminderWindow, quietHours

NotificationLog

Avoid duplicate reminders and measure reactivation

userId, type, sentAt, channel, metadata

Important design choice

Do not build a separate table for every metric. Record meaningful events once, then derive activation, retention, streaks and funnel reports from the event stream plus existing progress/completion tables.

8.2 Suggested event taxonomy

Event

When fired

signup_completed

Account is created/authenticated

onboarding_completed

Learner finishes the personalization flow

path_recommended

System recommends a path

path_started

Learner begins a guided path

learning_step_started

Learner opens a step

learning_step_completed

Learner completes a step

quiz_passed / quiz_failed

Mastery check outcome

project_started / project_completed

Project milestone

milestone_reached

Important journey checkpoint

course_completed

Guided path completed

session_returned

Learner returns after inactivity

notification_sent / notification_clicked

Reminder performance

resource_opened / resource_failed

Third-party content behavior

8.3 Learner home route

Because a dedicated personalized learner home is not evident in the current repository search, create one rather than overloading the admin analytics route. A likely structure is `app/dashboard/page.tsx` or another intentionally named learner route. Keep `/dashboard/analytics` reserved for founder/admin analytics.

9. Third-party learning resources: current reality and the right fix

This is an area where the repository is stronger than it first appears, but also more fragile than the documentation suggests. Resources are curated into the `Track` structure in `lib/tracks.ts` and the guided-path engine can turn resources, practice items, quizzes and projects into sequential steps. The resource object currently carries id, title, description, URL, type, free flag and source.

9.1 What works today

Resources are structured, categorized and attached to specific learning tracks.

Guided paths can place resources into a sequenced path instead of simply listing a library.

YouTube videos can be embedded in the guided path when the URL is recognized as a YouTube URL.

Other third-party resources are opened in a new tab, preserving TechSkillHub as the learning hub.

Click analytics already record resource clicks, providing a starting point for quality measurement.

The repository contains resource-audit and implementation documents that show deliberate effort around broken links, pricing clarity and beginner progression.

9.2 The documentation/code mismatch is a real risk

Unbiased finding

The repository contains an IMPLEMENTATION_COMPLETE.md document claiming that six broken URLs and other resource changes were fully implemented. However, the current lib/tracks.ts still contains at least some of the old resource entries, including an older cr-6 Foundry entry. That means the written implementation status should not be treated as proof that the live source code matches the claimed state.

This does not mean the resource work was useless. It means the next step should be a source-of-truth audit: code is authoritative, not a status document. The same pattern should be avoided for future product work.

9.3 Recommended resource data model

Field

Why

url

Canonical source URL

source

Provider/organization

type

docs, video, practice, book, tool, community

accessType

free, audit_free, paid, freemium, account_required

lastVerifiedAt

When TechSkillHub last checked it

verificationStatus

verified, warning, broken, manual_review

estimatedMinutes

Helps personalize daily tasks

difficulty

beginner, intermediate, advanced

stageId

Where it belongs in the roadmap

learningObjective

What the learner should gain

9.4 Resource verification pipeline

Run an automated HTTP check on every resource on a schedule.

Record status code, redirect destination and verification timestamp.

Flag 4xx, 5xx, DNS and repeated timeout failures for manual review.

Keep a fallback URL when a trusted alternative exists.

Do not label a course "free" when only auditing is free; distinguish access from certification.

Prefer authoritative/first-party sources for foundational concepts and use third-party tutorials where they add practical value.

Add a "Why this resource?" learning objective so the learner knows why the external link is part of the path.

Where technically appropriate, show a short preview/description inside TechSkillHub before sending the learner off-site.


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

10. Better learning procedures and resource sequencing

The goal is not simply to have many resources. The goal is to reduce cognitive load. A strong sequence generally moves from orientation to concept to practice to verification to project.

Recommended sequence

Orient -> Learn -> Practice -> Verify -> Build -> Reflect -> Document -> Advance

Step

Purpose

Example

Orientation

Make the topic feel understandable

5-minute overview video

Learn

Teach the underlying concept

Authoritative docs/course

Practice

Require independent action

Interactive exercise

Verify

Check understanding

Quiz/mastery check

Build

Create something

Project

Reflect

Explain what was built

Short reflection or checklist

Document

Create proof of skill

Portfolio/GitHub entry

Advance

Choose the next milestone

Next-best-action recommendation

10.1 High-priority curriculum improvements

Keep the existing beginner quickstarts and hands-on resources where they exist, but verify that the code actually contains the documented entries.

Add a first small project earlier in tracks where the learner can feel "I built something" within the first few sessions.

Break intimidating long courses into bounded tasks rather than sending learners to a 10-30 hour external course with no scaffolding.

Use multiple resource types: video for orientation, docs for reference, practice for mastery, and projects for transfer.

Label external resources by time, difficulty and access conditions before the user clicks away.


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

11. Implementation roadmap

Do not build everything at once. The sequence below maximizes learning from the product while minimizing wasted engineering effort.

Phase 1 - Measurement and foundation

Work

Output

Priority

Define activation

One consistent activation definition

P0

Add LearningEvent model

Canonical event log

P0

Add activation/retention events

D1/D7/D30 reporting inputs

P0

Create learner dashboard

Personal home separate from admin analytics

P0

Canonicalize authenticated progress in DB

Reduce localStorage ambiguity

P0

Phase 2 - Personalization

Persist quiz answers server-side.

Create LearnerProfile.

Generate recommended path and pace.

Show Next Best Action.

Show resume state, weekly goal and milestone progress.

Phase 3 - Habit and engagement

Add daily/weekly learning goal.

Add streak calculation from real learning events.

Add milestone celebrations.

Add project-first progress indicators.

Add optional challenge mechanics.

Phase 4 - Mascot and personality

Create a mascot with a small interaction vocabulary.

Connect the mascot to real product states, not random animation.

Celebrate first project, first streak, milestone and completion.

Add reduced-motion support and a mute/quiet option.

Use the mascot as a contextual guide, not an always-on chatbot.

Phase 5 - Re-engagement and community

Build notification preferences.

Add contextual reminder templates.

Build re-entry/resume experience.

Experiment with cohorts, study groups and challenges.

Only introduce leaderboards when data shows that competition helps target learners.


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

12. Likely file-by-file implementation path

These are implementation targets based on the current repository. They are recommendations, not claims that the files already exist.

Path

Change

prisma/schema.prisma

Add LearnerProfile, LearningEvent, LearnerStreak, NotificationPreference, NotificationLog

lib/analytics.ts

Add standardized retention/activation event helpers

lib/progress.ts

Gradually move authenticated learner state toward DB as source of truth

components/quiz/TrackQuiz.tsx

Persist completed quiz outcome to server profile after authentication

app/find-your-path/page.tsx

Keep as acquisition/onboarding surface; connect result to persistent profile

app/dashboard/page.tsx (new, likely)

Create personalized learner home

app/dashboard/components/* (new, likely)

Next action, streak, milestone, progress, project and mascot components

app/api/onboarding/* (new, likely)

Create/update LearnerProfile

app/api/events/* (new, likely)

Persist important learning events server-side

app/api/reminders/* (new, likely)

Preference + reminder endpoints

lib/tracks.ts

Continue curriculum data, but consider moving resource metadata into a validated data layer

scripts/resource-check.* (new)

Automated URL/access verification

.github/workflows/resource-check.yml (new, likely)

Scheduled resource validation if GitHub Actions is used

lib/guided-path.ts

Continue sequence logic; add objective/time metadata as the data model grows

app/guided-path/[trackId]/page.tsx

Surface next step, time estimate, project milestone, mascot events

app/api/guided-path/[trackId]/route.ts

Emit authoritative completion/progress events and maintain enrollment state


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

13. What to build first - an unbiased priority matrix

Feature

Impact

Effort

Recommendation

Learner event model

Very high

Medium

BUILD FIRST

Personal learner home

Very high

Medium

BUILD FIRST

Next Best Action

Very high

Low

BUILD FIRST

Persistent onboarding profile

High

Medium

BUILD SECOND

Server-side quiz persistence

High

Low

BUILD SECOND

Resume exact unfinished step

High

Low

USE EXISTING GUIDED-PATH STATE

Daily/weekly goals

High

Medium

BUILD SECOND

Streaks

Medium-high

Medium

BUILD AFTER EVENTS

Smart reminders

High

Medium-high

BUILD AFTER PREFERENCES

Mascot

Medium-high

Medium

BUILD AFTER CORE LOOP

Community cohorts

Medium

High

LATER

Leaderboard

Unclear

Medium

DO NOT PRIORITIZE YET

Large AI tutor/chatbot

Unclear

High

DO NOT PRIORITIZE YET

Straightforward recommendation

Do not start by hiring someone to animate the mascot. First make the product know who the learner is, what they are trying to achieve, what they last did, and what they should do next. Then the mascot can make that system feel alive.


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

14. Risks and anti-patterns to avoid

Optimizing for time-on-site instead of learning outcomes.

Adding gamification before fixing unclear learning paths.

Sending generic push/email reminders that feel like spam.

Creating one personalized-looking dashboard that is actually identical for everyone.

Making the mascot constantly move or interrupt learning.

Making streak loss so punishing that one missed day causes churn.

Over-relying on third-party resources without checking availability, access conditions or learning quality.

Marking external content as "free" when certificates or important modules require payment.

Keeping progress partly in localStorage and partly in the database without an explicit source of truth.

Writing implementation status documents that say "complete" while source code still contains old values.

Adding complex AI features before measuring which learner behavior actually needs help.

15. Testing and validation plan

Experiment

Primary metric

Guardrail

Personalized onboarding vs generic start

Activation rate

Onboarding completion time

Next Best Action vs generic dashboard

D7 retention

Task completion

Daily goal

7-day return

Course progression

Streak

D14/D30 retention

Course completion and frustration signals

Milestone celebration

Next-session return

Session length

Mascot on vs off

D7 retention / task completion

Bounce within learning session

Shorter quickstart resources

First-week progression

Quiz/mastery performance

Re-entry reminder

Reactivated learners

Unsubscribe/disable rate

Run controlled experiments where practical. Do not assume a feature helped simply because usage went up. A feature is successful when the desired learning behavior improves without introducing negative engagement or trust effects.


Internal working document | 8 October 2026

TECHSKILLHUB | PRODUCT RETENTION PLAN

16. Recommended next path

Based on the actual repository, the platform is not starting from zero. The guided learning, progress, completion and analytics foundations are already present. The gap is the layer that connects them into a personalized retention system.

Step 1

Instrument the learner journey and define activation, D1, D7, D30, progression and completion.

Step 2

Create the personalized learner home and Next Best Action.

Step 3

Persist onboarding and quiz outcomes as a learner profile.

Step 4

Add daily goals, streaks and milestone celebrations based on real learning events.

Step 5

Introduce the mascot as the personality layer over the working system.

Step 6

Add contextual re-engagement and notification controls.

Step 7

Harden third-party resources with verification, access labels, fallbacks and quality metadata.

17. Bottom line

TechSkillHub already has the bones of a strong learning engine: structured tracks, curated resources, guided paths, quizzes, projects, progress and completion. The next product leap is not another catalog feature. It is turning those pieces into an adaptive learner journey.

LEARN -> PRACTICE -> BUILD -> PROVE -> RETURN -> BECOME

Repository source reviewed: https://github.com/awesomeakokayo/Techhubs

This document separates confirmed repository observations from recommended architecture and product strategy. Where the repository did not contain evidence of a feature, the document says so rather than assuming it exists.

Internal working document | 8 October 2026