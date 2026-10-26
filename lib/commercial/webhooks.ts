/**
 * TechSkillHub — provider webhook verification and normalization (pure).
 *
 * This module converts a raw, signature-verified provider webhook into one
 * canonical internal event shape. Provider-specific payload knowledge lives
 * here and nowhere else, so the entitlement service never branches on provider.
 *
 * Signatures follow each provider's official documentation:
 *   - Paystack: HMAC-SHA512 hex of the raw body, header `x-paystack-signature`.
 *   - Lemon Squeezy: HMAC-SHA256 hex of the raw body, header `X-Signature`.
 */

import crypto from 'node:crypto'
import type { ProviderId } from './providers'

export type BillingEventType =
  | 'payment_succeeded'
  | 'payment_failed'
  | 'refunded'
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_cancelled'
  | 'subscription_expired'
  | 'subscription_payment_failed'
  | 'ignored'

export interface NormalizedBillingEvent {
  provider: ProviderId
  /** Canonical event type understood by the entitlement service. */
  type: BillingEventType
  /** Provider's own event name, retained for the audit trail. */
  rawType: string
  /** Internal order reference created before redirect (metadata round-trip). */
  orderReference: string | null
  /** Internal user id carried through provider metadata, if present. */
  userId: string | null
  /** Internal plan id carried through provider metadata, if present. */
  productCode: string | null
  trackId: string | null
  providerOrderId: string | null
  providerSubscriptionId: string | null
  providerCustomerId: string | null
  status: string | null
  /** Provider-reported period end / renewal date (ISO), if present. */
  currentPeriodEnd: string | null
  /** Charged amount in minor units (cents/kobo), if present in the payload. */
  amountMinor: number | null
  /** ISO 4217 currency charged, if present. */
  currency: string | null
  /** Provider product/variant identifier charged, if present. */
  productId: string | null
  /** Provider-side timestamp of the change (ISO), used for ordering guards. */
  occurredAt: string | null
  /** True for test/sandbox deliveries; never grants live entitlement. */
  testMode: boolean
}

function timingSafeHexEqual(expectedHex: string, providedHex: string): boolean {
  const a = Buffer.from(expectedHex, 'utf8')
  const b = Buffer.from(providedHex, 'utf8')
  if (a.length !== b.length || a.length === 0) return false
  return crypto.timingSafeEqual(a, b)
}

/** HMAC-SHA512 hex comparison used by Paystack. */
export function verifyPaystackSignature(rawBody: string, signature: string | null | undefined, secret: string): boolean {
  if (!signature || !secret) return false
  const expected = crypto.createHmac('sha512', secret).update(rawBody, 'utf8').digest('hex')
  return timingSafeHexEqual(expected, signature)
}

/** HMAC-SHA256 hex comparison used by Lemon Squeezy. */
export function verifyLemonSqueezySignature(rawBody: string, signature: string | null | undefined, secret: string): boolean {
  if (!signature || !secret) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
  return timingSafeHexEqual(expected, signature)
}

/** Stable content hash for idempotency when a provider sends no unique event id. */
export function webhookContentHash(rawBody: string): string {
  return crypto.createHash('sha256').update(rawBody, 'utf8').digest('hex')
}

export function safeJsonParse(text: string): unknown | null {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function asString(value: unknown): string | null {
  if (typeof value === 'string' && value.trim().length > 0) return value
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return null
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {}
}

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) return Number(value)
  return null
}

const PAYSTACK_EVENTS: Record<string, BillingEventType> = {
  'charge.success': 'payment_succeeded',
  'charge.failed': 'payment_failed',
  'order_payment_failed': 'payment_failed',
  'refund.processed': 'refunded',
  'refund.pending': 'refunded',
  'subscription.create': 'subscription_created',
  'subscription.not_renew': 'subscription_cancelled',
  'subscription.disable': 'subscription_expired',
  'invoice.payment_failed': 'subscription_payment_failed',
}

export function normalizePaystackEvent(payload: unknown): NormalizedBillingEvent {
  const root = asRecord(payload)
  const rawType = asString(root.event) ?? 'unknown'
  const data = asRecord(root.data)
  const metadata = asRecord(data.metadata)
  const customer = asRecord(data.customer)
  const plan = asRecord(data.plan)
  const planCode = asString(plan.plan_code) ?? asString(data.plan_code)

  return {
    provider: 'paystack',
    type: PAYSTACK_EVENTS[rawType] ?? 'ignored',
    rawType,
    orderReference: asString(data.reference),
    userId: asString(metadata.user_id),
    productCode: asString(metadata.plan_id) ?? asString(metadata.product_code),
    // Expose the provider's plan code via productId only when it is available;
    // the webhook route maps it back to the internal plan id from trusted config.

    trackId: asString(metadata.track_id),
    providerOrderId: asString(data.id),
    providerSubscriptionId: asString(data.subscription_code) ?? asString(plan.subscription),
    providerCustomerId: asString(customer.customer_code),
    status: asString(data.status),
    currentPeriodEnd: asString(data.next_payment_date),
    amountMinor: asNumber(data.amount),
    currency: asString(data.currency),
    productId: planCode,
    // `paid_at` is the authoritative successful-payment instant for a charge.
    occurredAt: asString(data.paid_at) ?? asString(data.updated_at) ?? asString(data.created_at),
    testMode: asString(data.domain) === 'test',
  }
}

const LEMONSQUEEZY_EVENTS: Record<string, BillingEventType> = {
  order_created: 'payment_succeeded',
  order_refunded: 'refunded',
  subscription_created: 'subscription_created',
  subscription_updated: 'subscription_updated',
  subscription_resumed: 'subscription_updated',
  subscription_paused: 'subscription_updated',
  subscription_unpaused: 'subscription_updated',
  subscription_cancelled: 'subscription_cancelled',
  subscription_expired: 'subscription_expired',
  subscription_payment_success: 'payment_succeeded',
  subscription_payment_recovered: 'payment_succeeded',
  subscription_payment_failed: 'subscription_payment_failed',
  subscription_payment_refunded: 'refunded',
}

export function normalizeLemonSqueezyEvent(payload: unknown): NormalizedBillingEvent {
  const root = asRecord(payload)
  const meta = asRecord(root.meta)
  const rawType = asString(meta.event_name) ?? 'unknown'
  const data = asRecord(root.data)
  const attributes = asRecord(data.attributes)
  const custom = asRecord(meta.custom_data)
  const dataType = asString(data.type)

  return {
    provider: 'lemonsqueezy',
    type: LEMONSQUEEZY_EVENTS[rawType] ?? 'ignored',
    rawType,
    orderReference: asString(custom.order_ref),
    userId: asString(custom.user_id),
    productCode: asString(custom.plan_id),
    trackId: asString(custom.track_id),
    providerOrderId: dataType === 'orders' ? asString(data.id) : asString(attributes.order_id),
    providerSubscriptionId: dataType === 'subscriptions' ? asString(data.id) : asString(attributes.subscription_id),
    providerCustomerId: asString(attributes.customer_id),
    status: asString(attributes.status),
    currentPeriodEnd: asString(attributes.renews_at) ?? asString(attributes.ends_at),
    amountMinor: asNumber(attributes.total),
    currency: asString(attributes.currency),
    productId: dataType === 'orders' ? asString(asRecord(attributes.first_order_item).variant_id) : asString(attributes.variant_id),
    occurredAt: asString(attributes.updated_at) ?? asString(attributes.created_at),
    testMode: meta.test_mode === true,
  }
}

/** Normalize a webhook body for a provider after its signature has been verified. */
export function normalizeBillingEvent(provider: ProviderId, payload: unknown): NormalizedBillingEvent {
  return provider === 'paystack' ? normalizePaystackEvent(payload) : normalizeLemonSqueezyEvent(payload)
}
