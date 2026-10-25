#!/usr/bin/env node
/**
 * TechSkillHub — read-only legacy-user transition dry run.
 *
 * Prints a privacy-conscious summary of what the configured transition policy
 * WOULD do for the current learners, without changing anything. It never writes
 * to the database and never prints personal data: only aggregate counts and
 * redacted (hashed) user prefixes for the uncertain cases an operator must
 * review.
 *
 * Usage (disposable/read replica only; never production):
 *   DATABASE_URL=postgresql://... node scripts/transition-dry-run.mjs
 *   DATABASE_URL=... TSH_TRANSITION_DRY_RUN=1 COMMERCE_TRANSITION_MODE=ENFORCED \
 *     COMMERCE_GRANDFATHERING_UNTIL=2026-12-31T00:00:00Z \
 *     COMMERCE_GRANDFATHERING_CUTOFF=2026-01-01T00:00:00Z \
 *     node scripts/transition-dry-run.mjs
 *
 * The policy is read from the same environment variables as the app, so the
 * report reflects exactly what enforcement would do.
 */

import crypto from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaClient } from '@prisma/client'
import { loadTsModule } from './lib/load-ts.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { resolveTransitionPolicy, classifyLegacyUser, summarizeTransition } = await loadTsModule(
  join(root, 'lib', 'commercial', 'transition.ts'),
)

const prisma = new PrismaClient()

function redact(id) {
  return `u_${crypto.createHash('sha256').update(id).digest('hex').slice(0, 10)}`
}

async function idSet(promise) {
  const rows = await promise
  return new Set(rows.map((row) => row.userId))
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Refusing to run.')
    process.exitCode = 1
    return
  }
  if (process.env.TSH_TRANSITION_DRY_RUN !== '1' && process.env.NODE_ENV === 'production') {
    console.error('Refusing to run against NODE_ENV=production. Set TSH_TRANSITION_DRY_RUN=1 to override.')
    process.exitCode = 1
    return
  }

  const policy = resolveTransitionPolicy(process.env)
  const now = new Date()

  const [users, accessIds, enrollmentIds, progressIds, checklistIds, submissionIds, completionIds] = await Promise.all([
    prisma.user.findMany({ select: { id: true, createdAt: true } }),
    idSet(prisma.trackAccess.groupBy({ by: ['userId'] })),
    idSet(prisma.guidedPathEnrollment.groupBy({ by: ['userId'] })),
    idSet(prisma.userTrackProgress.groupBy({ by: ['userId'] })),
    idSet(prisma.checklistProgress.groupBy({ by: ['userId'] })),
    idSet(prisma.learningEvent.groupBy({ by: ['userId'], where: { eventName: 'project_assessed' } })),
    idSet(prisma.courseCompletion.groupBy({ by: ['userId'] })),
  ])

  const decisions = users.map((user) =>
    classifyLegacyUser(
      {
        userId: user.id,
        createdAt: user.createdAt,
        hasLegacyAccess: accessIds.has(user.id),
        hasEnrollment: enrollmentIds.has(user.id),
        hasProgress: progressIds.has(user.id) || checklistIds.has(user.id),
        hasSubmission: submissionIds.has(user.id),
        hasCompletion: completionIds.has(user.id),
        hasCertificate: completionIds.has(user.id),
      },
      policy,
      now,
    ),
  )

  const summary = summarizeTransition(decisions, policy.mode)
  console.log('TechSkillHub transition dry run (read-only)')
  console.log('-------------------------------------------------')
  console.log(`policy.mode              : ${policy.mode}`)
  console.log(`policy.cohortCutoff      : ${policy.cohortCutoff ? policy.cohortCutoff.toISOString() : '(none)'}`)
  console.log(`policy.grandfatheredUntil: ${policy.grandfatheredUntil ? policy.grandfatheredUntil.toISOString() : '(none)'}`)
  console.log(`policy.graceDays         : ${policy.graceDays}`)
  console.log(`policy.noticeDays        : ${policy.noticeDays}`)
  console.log('')
  console.log(`total learners           : ${summary.total}`)
  console.log(`retain (unaffected)      : ${summary.retain}`)
  console.log(`uncertain (review)       : ${summary.uncertain}`)
  console.log(`transition candidates    : ${summary.transition}`)
  console.log('')

  const uncertain = decisions.filter((d) => d.action === 'uncertain').slice(0, 25)
  if (uncertain.length > 0) {
    console.log('Uncertain learners (redacted) — keep access until reviewed:')
    for (const decision of uncertain) console.log(`  ${redact(decision.userId)}  ${decision.reasons.join(', ')}`)
  }
  if (policy.mode === 'OPEN') {
    console.log('Mode is OPEN: no learner would lose access. Set a transition mode and a cohort/deadline to evaluate a real transition.')
  }
}

main()
  .catch((error) => {
    console.error('transition dry run failed:', error?.message ?? error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
