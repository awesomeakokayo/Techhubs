import type { PlanPrice } from './pricing'

export interface PaystackPlanDescriptor {
  plan_code?: unknown
  amount?: unknown
  currency?: unknown
  interval?: unknown
}

export interface PaystackPlanCheck {
  matches: boolean
  reason?: 'missing_plan_code' | 'plan_code_mismatch' | 'amount_mismatch' | 'currency_mismatch' | 'interval_mismatch'
}

/** Pure validation for a live Paystack plan response against the advertised plan. */
export function validatePaystackPlan(
  configuredPlanCode: string | null | undefined,
  response: PaystackPlanDescriptor | null | undefined,
  expectedPrice: PlanPrice,
): PaystackPlanCheck {
  if (!configuredPlanCode || !response) return { matches: false, reason: 'missing_plan_code' }
  if (typeof response.plan_code !== 'string' || response.plan_code !== configuredPlanCode) {
    return { matches: false, reason: 'plan_code_mismatch' }
  }
  if (typeof response.amount !== 'number' || response.amount !== expectedPrice.amountMinor) {
    return { matches: false, reason: 'amount_mismatch' }
  }
  if (typeof response.currency !== 'string' || response.currency.toUpperCase() !== expectedPrice.currency.toUpperCase()) {
    return { matches: false, reason: 'currency_mismatch' }
  }

  const expectedInterval: Record<NonNullable<PlanPrice['interval']>, string> = {
    P1M: 'monthly',
    P3M: 'quarterly',
    P1Y: 'annually',
  }
  if (!expectedPrice.interval || typeof response.interval !== 'string' ||
      response.interval.toLowerCase() !== expectedInterval[expectedPrice.interval]) {
    return { matches: false, reason: 'interval_mismatch' }
  }
  return { matches: true }
}
