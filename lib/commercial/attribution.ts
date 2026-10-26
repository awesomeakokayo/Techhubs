/**
 * Small first-party checkout attribution contract.
 *
 * Only short UTM values, a safe landing path and a referrer hostname are stored.
 * Values are untrusted browser input, so these functions whitelist fields and
 * strip control characters before persisting anything to the order ledger.
 */
export interface CheckoutAttribution {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  landingPath?: string
  referrerHost?: string
}

function safeText(value: unknown, maxLength = 120): string | undefined {
  if (typeof value !== 'string') return undefined
  const valueWithoutControls = value.replace(/[\u0000-\u001F\u007F]/g, '').trim()
  if (!valueWithoutControls) return undefined
  return valueWithoutControls.slice(0, maxLength)
}

function safeHostname(value: unknown): string | undefined {
  const valueText = safeText(value, 300)
  if (!valueText) return undefined
  try {
    const parsed = new URL(valueText.includes('://') ? valueText : `https://${valueText}`)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return undefined
    return parsed.hostname.toLowerCase().slice(0, 200) || undefined
  } catch {
    return undefined
  }
}

/** Remove unknown fields and unsafe values; return null when nothing survives. */
export function sanitizeCheckoutAttribution(value: unknown): CheckoutAttribution | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const input = value as Record<string, unknown>
  const result: CheckoutAttribution = {}
  const fields = [
    ['utmSource', 120],
    ['utmMedium', 120],
    ['utmCampaign', 120],
    ['utmContent', 120],
    ['utmTerm', 120],
  ] as const
  for (const [key, maxLength] of fields) {
    const clean = safeText(input[key], maxLength)
    if (clean) result[key] = clean
  }

  const landingPath = safeText(input.landingPath, 200)
  if (landingPath?.startsWith('/') && !landingPath.startsWith('//') && !landingPath.includes('\\')) {
    result.landingPath = landingPath.split('?')[0].split('#')[0]
  }
  const referrerHost = safeHostname(input.referrerHost)
  if (referrerHost) result.referrerHost = referrerHost

  return Object.keys(result).length ? result : null
}
