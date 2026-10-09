# TechSkillHub Retention V3 — Local Acceptance Plan

V3 builds on the personalized home and V2 activity rhythm with a learner-defined weekly schedule and contextual, in-app planning cues. It does not send email, browser push, or external reminders.

## Local database safety

Before running any Prisma command, verify DATABASE_URL in .env.local points to your local PostgreSQL database. Use the correct TechSkillHub database, not another app's Neon database.

Commands:
- git fetch origin
- git switch feat/retention-v3
- npm install
- npx prisma generate
- npx prisma db push
- npm run dev

The schema push is for the isolated local database only. Do not run it against production. For an existing development database managed by migrations, apply the new migration through your team's normal migration process instead.

## Automated checks

Run:
- npm run lint
- npm run test
- npm run build

Unit coverage checks supported weekday schedules, duplicate/out-of-range selections, and ISO weekday calculations in the learner's time zone.

## Browser acceptance tests

### 1. Weekly plan preferences
- Sign in and open /dashboard.
- Verify Monday through Friday are selected by default for a profile without a saved schedule.
- Toggle Saturday and Sunday on and save.
- Refresh the page. Confirm the selected days persist.
- Remove one day and save. Confirm the schedule updates.
- Attempt to deselect the only remaining day. Verify the interface keeps one day selected and explains why.
- Simulate a PATCH failure and confirm the user sees an error without losing the saved state.
- Confirm buttons have keyboard focus and announce selected state via aria-pressed.

### 2. Weekly plan adherence
- On a test user, record activity on one planned weekday and one unplanned weekday.
- Confirm only the planned weekday counts toward weekly plan progress.
- Confirm the current-week view uses Monday through Sunday in the learner's saved time zone.
- Verify future scheduled days are not shown as completed.
- Change the plan after activity exists and confirm historical activity is preserved; only the selected plan days change.
- Confirm the zero-elapsed-days state does not claim 100% completion.

### 3. Context-aware dashboard cue
- On a scheduled day with no recorded activity, verify the card gives a calm next-step suggestion and offers a Continue Learning link when a next step exists.
- After completing an activity, refresh /dashboard and verify the message reflects that today's learning has started.
- After reaching the daily goal, verify the message recognizes completion without pressuring the learner to do more.
- On an unscheduled day with no activity, verify the card calls it a planned rest day and names the next scheduled day.
- On an unscheduled day with activity, verify the card acknowledges learning outside the plan without marking the schedule incorrectly.
- Verify the cue is generated using the saved time zone.

### 4. V1/V2 regression checks
- Daily activity goal values 1, 2, and 3 can still be saved.
- Streak, completed-day tracker, activity milestones and course-completion behavior still work.
- Guided path quiz answers continue to be validated by the server.
- Double-submitting a step does not advance the path twice.
- Account and learner onboarding continue to work.

### 5. Visual and accessibility checks
- Review desktop and mobile widths for overflow or clipped labels.
- Confirm Lucide React icons are used consistently; no emoji UI.
- Verify selected weekdays have clear visual state and textual accessible labels.
- Verify save/loading/error/success feedback.
- Check contrast in light and dark themes if both are supported.

## Data and product boundaries

The weekly plan stores recurring ISO weekdays as integers: Monday=1 through Sunday=7. A learner can select between one and seven unique days. Existing completed activity remains the source of truth for actual learning progress.

The contextual cue is shown inside the learning home only. V3 does not send scheduled email, SMS, browser push notifications, or third-party reminders; these would require separate provider, consent, scheduling, and delivery decisions.

## Production gate

Do not merge to main or apply this migration to production until:
1. Automated tests pass.
2. npm run build passes.
3. The schema update succeeds against the intended development database.
4. Weekly plan save/load and contextual cues pass browser testing.
5. V1 and V2 regression checks pass.
6. The Vercel preview succeeds and is manually reviewed.
