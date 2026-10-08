# TechSkillHub Retention V1 — Local Test Plan

This branch contains the first retention slice only. Production remains unchanged.

## V1 scope

- Persistent learner profile from the existing path-finder quiz
- Personalized learning home at `/dashboard`
- Next Best Action based on the learner's profile and guided-path progress
- Visible learning pace and goal
- Current-week activity summaries
- Learning-path progress cards
- Navigation updated so signed-in learners reach the learning home from the profile icon
- No streaks, reminders, badges, mascot, or social features yet

## Safe local setup

1. Check out the branch:

`git checkout feat/retention-v1`

2. Use a local PostgreSQL database. Do not point local development at the production `DATABASE_URL`.

3. Install dependencies:

`npm install`

4. Generate Prisma Client:

`npx prisma generate`

5. Apply the updated schema to the local database:

`npx prisma db push`

For this first local validation pass, use `db push` rather than applying anything to production. The migration file is committed so we have a versioned schema change for the later deployment phase.

6. Start the local application:

`npm run dev`

## Core browser tests

### A. New signed-in learner

- Sign in with a test Google account.
- Visit `/dashboard`.
- Confirm the dashboard loads without errors.
- Confirm the personalization card appears when no learner profile exists.
- Select `Find My Path`.
- Complete the path-finder quiz.
- Confirm the quiz results appear.
- Return to `/dashboard`.
- Confirm the selected goal, experience level, weekly pace, and recommended track appear.

### B. Next Best Action

- Start the recommended guided path.
- Complete one step.
- Return to `/dashboard`.
- Confirm the recommended path remains the focus.
- Confirm the next step shown is the next unlocked step.
- Confirm the path progress percentage increases.

### C. Resume behavior

- Start a guided path.
- Leave the site before completing the next step.
- Return to `/dashboard`.
- Confirm the same learning path is surfaced.
- Confirm the CTA goes back to the guided path.

### D. Multiple paths

- Start a second learning path.
- Return to `/dashboard`.
- Confirm both paths appear under `Your Learning Paths`.
- Confirm the most recently active path is used when there is no profile-specific active path.

### E. Completed path

- Complete a guided path in the local test database.
- Return to `/dashboard`.
- Confirm the completed path is labeled as completed.
- Confirm the dashboard does not keep presenting that completed path as the Next Best Action when another incomplete path exists.

### F. Existing user with no profile

- Use an existing local user who has learning progress but no `LearnerProfile` row.
- Confirm their existing learning paths still appear.
- Confirm they are prompted to personalize the home.
- Confirm no old progress is deleted or rewritten.

### G. Signed-out behavior

- Visit `/dashboard` while signed out.
- Confirm the application redirects to `/login?next=/dashboard`.

## Visual QA

Check desktop and mobile widths.

- No emoji characters in the interface.
- Icons come from Lucide React.
- Buttons have one clear primary action.
- The Next Best Action card is visually dominant.
- Progress bars remain readable at small widths.
- Cards do not overflow on mobile.
- Account access remains easy to find.
- Existing public pages are visually unchanged.

## Regression checks

Run:

`npm run build`

Then:

`npm run test`

Also manually verify:

- `/account`
- `/find-your-path`
- `/guided-path/[trackId]`
- `/certificate/[trackId]`
- `/dashboard/analytics`

## Acceptance criteria

V1 is ready for preview review only when:

1. The application builds successfully.
2. Tests pass.
3. A learner can complete the path-finder quiz and have the profile persisted.
4. The dashboard loads from real database state.
5. The Next Best Action points to the correct guided-path step.
6. Existing progress and course completion behavior still works.
7. The visual system is consistent with the existing TechSkillHub design.
8. Production has not been modified.

## Not part of V1

Do not merge these yet:

- Streaks
- XP
- Badges
- Notifications
- Email reminders
- Mascot
- Leaderboards
- Social learning
- AI-generated personalization

Those should be built after we confirm that the personalized home and Next Best Action foundation works.
