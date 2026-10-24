/**
 * TechSkillHub — payment/order matching (pure).
 *
 * Provider webhooks carry an amount, currency and product/variant. Before any
 * entitlement is granted we must confirm the charge corresponds to the trusted
 * internal order (or the configured product) and never to a tampered metadata
 * value. This is deliberately conservative: when a required signal is missing for
 * a one-time purchase, the match fails closed.
 *
 * Currency units: Paystack and Lemon Squeezy both report integer minor units
 * (kobo / cents), matching `PaymentOrder.amount`.
 */

import type { BillingEventType } from './webhooks'

export interface OrderDescriptor {
  amount: number
  currency: string
  productCode: string | null
}

export interface EventMoney {
  type: BillingEventType
  amountMinor: number | null
  currency: string | null
  productId: string | null
}

export interface PaymentMatchResult {
  matches: boolean
  reason?: string
}

export function validatePaymentMatch(
  event: EventMoney,
  order: OrderDescriptor | null,
  expectedProductId: string | null,
  options: { requiresOrder: boolean },
): PaymentMatchResult {
  const isPayment = event.type === 'payment_succeeded'

  // A one-time purchase must correspond to a known internal order.
  if (isPayment && options.requiresOrder && !order) {
    return { matches: false, reason: 'missing_order' }
  }

  if (order) {
    if (event.currency && event.currency.toUpperCase() !== order.currency.toUpperCase()) {
      return { matches: false, reason: `currency_mismatch:${event.currency}!=${order.currency}` }
    }
    if (isPayment) {
      // Fail closed when the amount is absent for a purchase that must be matched.
      if (options.requiresOrder && event.amountMinor == null) {
        return { matches: false, reason: 'amount_missing' }
      }
      if (event.amountMinor != null && event.amountMinor !== order.amount) {
        return { matches: false, reason: `amount_mismatch:${event.amountMinor}!=${order.amount}` }
      }
    }
    if (event.type === 'refunded' && event.amountMinor != null && event.amountMinor > order.amount) {
      return { matches: false, reason: `refund_exceeds_order:${event.amountMinor}>${order.amount}` }
    }
  }

  // The paid variant/product must be the configured product for the internal plan.
  if (event.productId && expectedProductId && event.productId !== expectedProductId) {
    return { matches: false, reason: `variant_mismatch:${event.productId}!=${expectedProductId}` }
  }

  return { matches: true }
}
