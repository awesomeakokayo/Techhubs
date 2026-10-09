# TechSkillHub Retention V2 — Local Acceptance Plan

V2 adds daily goals, learning streaks, weekly consistency, and progress milestone feedback. It builds on the V1 personalized home. Do not merge or deploy to production until local checks and preview review pass.

## Local database safety

Use a local PostgreSQL database. Verify that DATABASE_URL in .env.local points to the local database before running any Prisma command.

Commands:
- git fetch origin
- git checkout feat/retention-v2
- npm install
- npx prisma generate
- npx prisma db push
- npm run dev

The schema push is for the isolated local development database only. Do not run it against production.

## Automated checks

Run npm run lint, npm run test, and npm run build.

The test suite includes checks for time-zone-aware streaks, local-day boundaries, activity milestone thresholds, and supported goal/time-zone values.

## Browser acceptance tests

### 1. Daily goal
- Sign in and open /dashboard.
- Verify the daily activity goal shows 1, 2, or 3 activities.
- Change the goal to 2 and refresh the page. Confirm it remains 2.
- Change it to 3 and verify the selected state and progress bar update.
- Confirm the control gives an error message if the request fails.
- Confirm no UI uses emoji characters; all icons are Lucide React icons.

### 2. Actual learning activity
- Open an incomplete guided path from the learning home.
- Complete one currently unlocked step.
- Confirm the API advances the path and records the completed activity.
- Return to /dashboard.
- Confirm today's activity count increases by one.
- Confirm daily goal progress and weekly activity statistics update.
- Try submitting the same step twice. The second request must not advance the path twice.

### 3. Time zone and streaks
- Verify a learner's time zone is saved from the path-finder quiz.
- For a test profile with Africa/Lagos, complete an activity shortly after local midnight.
- Confirm the dashboard counts it against the correct local day.
- Test a sequence of consecutive activity days and verify the displayed streak.
- Test a gap of more than one day and verify an expired streak is not displayed as current.
- Confirm activity on an earlier day does not count toward today's daily goal.

### 4. Weekly consistency
- Confirm the weekly display uses a Monday-to-Sunday calendar week.
- Confirm completed days are marked, the current day is visually distinct, and future days are not marked complete.
- Confirm the weekly goal is a target of five active days, not five completed activities.
- Check desktop and mobile layouts for clipped labels or overflow.

### 5. Milestones
- On a fresh test user, complete the first learning activity and verify the first-step milestone appears.
- Progress through five total completed activities and verify the five-activity milestone appears only when the threshold is crossed.
- For streak milestones, create consecutive activity dates in a test database and verify the three-day and seven-day milestone conditions.
- Confirm a further activity on the same day does not repeat the same streak milestone.
- Confirm the milestone message uses the standard card style and Lucide icons, with a working dismiss control.
- Confirm milestones display when a final course step is completed, not only when another step remains.

### 6. Regression coverage
Verify these routes continue to work:
- /dashboard
- /find-your-path
- /guided-path/[trackId]
- /account
- /dashboard/analytics

Verify guided-path quiz validation, course completion and certificates are unchanged.

## What V2 measures
- Completed activities today versus the learner's selected daily goal
- Completed activities during the current calendar week
- Current streak based on consecutive local calendar days containing completed activity
- Active days during the current calendar week
- Total completed learning activities
- Milestone thresholds reached by new activity

Page views, open tabs and time spent with a page open do not count as learning activity.

## Production gate
V2 is not ready for production until:
1. Automated tests pass.
2. npm run build passes.
3. The local database schema applies without errors.
4. The browser flows above pass.
5. The preview deployment is successful and manually reviewed.
6. No migration has been applied to the production database during V2 testing.

Do not merge to main or promote the preview to production until all six conditions are met.
