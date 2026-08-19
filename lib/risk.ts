import type { Currency, RegionKey } from './pricing'

export type RiskOutcome = 'ALLOW' | 'REVIEW'

export interface RiskInput {
  ipCountry?: string | null
  profileCountry?: string | null
  pricingRegion: RegionKey
  transactionCurrency: Currency
  cardCountry?: string | null
  paystackRiskAction?: string | null
  userId: string
}

export interface RiskResult {
  outcome: RiskOutcome
  reasons: string[]
}

const NGN = 'NGN'

/**
 * Application-side risk policy. Mismatches are recorded, not automatically
 * blocked — legitimate travel, expatriates and foreign cards are common. The
 * payment provider remains the primary fraud layer. We never deny purely on a
 * country mismatch (conservative: a demerit flag only bubbles up to REVIEW).
 */
export function evaluatePaymentRisk(input: RiskInput): RiskResult {
  const reasons: string[] = []

  if (input.paystackRiskAction === 'deny') {
    reasons.push('paystack_risk_action_deny')
  }
  if (input.paystackRiskAction === 'allow') {
    reasons.push('paystack_risk_action_allow')
  }

  const card = input.cardCountry?.trim().toUpperCase() || null
  const ip = input.ipCountry?.trim().toUpperCase() || null

  if (card && ip && card !== ip) {
    reasons.push(`card_country_mismatch:${card}!={ip:${ip}}`)
  }

  if (input.transactionCurrency === NGN && card && card !== 'NG') {
    reasons.push('ngn_price_with_non_ng_card')
  }

  if (ip === 'NG' && input.pricingRegion !== 'NG') {
    reasons.push('ip_ng_non_ng_price')
  }
  if (input.pricingRegion === 'NG' && ip && ip !== 'NG') {
    reasons.push('ng_price_non_ng_ip')
  }

  return { outcome: reasons.length ? 'REVIEW' : 'ALLOW', reasons }
}

export function riskSummaryToLog(result: RiskResult, userId: string) {
  return {
    userId,
    outcome: result.outcome,
    reasons: result.reasons,
  }
}