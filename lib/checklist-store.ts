/**
 * Server-side checklist-progress store (extracted from the route so it can be
 * exercised directly against a database in tests).
 *
 * Writes are idempotent and preserve server decisions:
 *   - completing an already-completed item keeps the original completedAt
 *   - an explicit uncheck is never overwritten by a re-completion race
 *   - the composite unique constraint is the final duplicate guard
 */

import type { PrismaClient } from '@prisma/client'
import type { ChecklistKind } from './checklist-progress'

export interface ChecklistItemRecord {
  trackId: string
  kind: string
  itemKey: string
  isCompleted: boolean
  completedAt: Date | null
}

export interface SetChecklistInput {
  trackId: string
  kind: ChecklistKind
  itemKey: string
  completed: boolean
}

const ITEM_SELECT = {
  trackId: true,
  kind: true,
  itemKey: true,
  isCompleted: true,
  completedAt: true,
} as const

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { code?: unknown }).code === 'P2002'
  )
}

export async function getChecklistItems(
  prisma: PrismaClient,
  userId: string,
  trackId?: string,
): Promise<ChecklistItemRecord[]> {
  return prisma.checklistProgress.findMany({
    where: { userId, ...(trackId ? { trackId } : {}) },
    orderBy: [{ trackId: 'asc' }, { kind: 'asc' }, { itemKey: 'asc' }],
    select: ITEM_SELECT,
  })
}

export async function setChecklistCompletion(
  prisma: PrismaClient,
  userId: string,
  input: SetChecklistInput,
): Promise<ChecklistItemRecord> {
  const where = {
    userId_trackId_kind_itemKey: {
      userId,
      trackId: input.trackId,
      kind: input.kind,
      itemKey: input.itemKey,
    },
  }

  const existing = await prisma.checklistProgress.findUnique({ where, select: ITEM_SELECT })

  if (input.completed) {
    if (existing?.isCompleted) return existing
    if (existing) {
      return prisma.checklistProgress.update({
        where,
        data: { isCompleted: true, completedAt: new Date() },
        select: ITEM_SELECT,
      })
    }
    try {
      return await prisma.checklistProgress.create({
        data: {
          userId,
          trackId: input.trackId,
          kind: input.kind,
          itemKey: input.itemKey,
          isCompleted: true,
          completedAt: new Date(),
        },
        select: ITEM_SELECT,
      })
    } catch (error) {
      if (isUniqueViolation(error)) {
        const raced = await prisma.checklistProgress.findUnique({ where, select: ITEM_SELECT })
        if (raced) return raced
      }
      throw error
    }
  }

  if (!existing || !existing.isCompleted) {
    return {
      trackId: input.trackId,
      kind: input.kind,
      itemKey: input.itemKey,
      isCompleted: false,
      completedAt: null,
    }
  }

  return prisma.checklistProgress.update({
    where,
    data: { isCompleted: false, completedAt: null },
    select: ITEM_SELECT,
  })
}
