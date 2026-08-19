export type PaymentLogEvent =
  | 'checkout_initialized'
  | 'payment_redirected'
  | 'payment_verified'
  | 'payment_webhook_received'
  | 'payment_fulfilled'
  | 'payment_mismatch'
  | 'payment_rejected'
  | 'payment_risk_review'
  | 'payment_already_fulfilled'
  | 'payment_error'

/** Structured payment audit log. Never include credentials or card numbers. */
export function paymentLog(
  event: PaymentLogEvent,
  fields: Record<string, unknown> = {}
): void {
  console.log(
    JSON.stringify({
      type: 'payments',
      event,
      ...fields,
      timestamp: new Date().toISOString(),
    })
  )
}

export function paymentLogError(
  event: PaymentLogEvent,
  message: string,
  fields: Record<string, unknown> = {}
): void {
  console.error(
    JSON.stringify({
      type: 'payments',
      event,
      message,
      ...fields,
      timestamp: new Date().toISOString(),
    })
  )
}