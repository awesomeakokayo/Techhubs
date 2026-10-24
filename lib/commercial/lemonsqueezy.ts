/**
 * TechSkillHub — Lemon Squeezy checkout adapter.
 *
 * Only this module knows the Lemon Squeezy checkout payload shape. The builder
 * is pure and unit-tested; the network call is a thin wrapper and is only ever
 * invoked when checkout is explicitly enabled and fully configured.
 */

export const LEMONSQUEEZY_API_BASE = 'https://api.lemonsqueezy.com/v1'

export interface LemonSqueezyCheckoutInput {
  storeId: string
  variantId: string
  redirectUrl: string
  email?: string | null
  name?: string | null
  /** Round-tripped in webhook `meta.custom_data`. */
  custom: Record<string, string>
  /** Enable Lemon Squeezy's own overlay/embed if desired. */
  embedded?: boolean
  /**
   * Create a provider test-mode checkout. Default false (live). Set only for
   * sandbox verification via `COMMERCE_PROVIDER_TEST_MODE`; test-mode deliveries
   * never grant entitlement (see `lib/commercial/webhooks.ts`).
   */
  testMode?: boolean
}

/** Build the JSON:API body for POST /v1/checkouts. Pure and deterministic. */
export function buildLemonSqueezyCheckoutPayload(input: LemonSqueezyCheckoutInput) {
  const checkoutData: Record<string, unknown> = { custom: input.custom }
  if (input.email) checkoutData.email = input.email
  if (input.name) checkoutData.name = input.name

  return {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: checkoutData,
        product_options: {
          redirect_url: input.redirectUrl,
          enabled_variants: [Number(input.variantId)].filter((n) => Number.isFinite(n)),
        },
        checkout_options: {
          embed: input.embedded === true,
        },
        test_mode: input.testMode === true,
      },
      relationships: {
        store: { data: { type: 'stores', id: String(input.storeId) } },
        variant: { data: { type: 'variants', id: String(input.variantId) } },
      },
    },
  }
}

export interface LemonSqueezyCheckoutResult {
  ok: boolean
  url?: string
  error?: string
}

/** Extract the hosted checkout URL from a Lemon Squeezy create-checkout response. */
export function lemonSqueezyCheckoutUrl(response: unknown): string | null {
  if (!response || typeof response !== 'object') return null
  const data = (response as { data?: { attributes?: { url?: unknown } } }).data
  const url = data?.attributes?.url
  return typeof url === 'string' && url.startsWith('https://') ? url : null
}

/**
 * Create a hosted checkout. Returns a safe result object; never throws on
 * provider error. The caller must have already created the internal pending
 * order and embedded its reference in `custom.order_ref`.
 */
export async function createLemonSqueezyCheckout(
  input: LemonSqueezyCheckoutInput & { apiKey: string },
  fetchImpl: typeof fetch = fetch,
): Promise<LemonSqueezyCheckoutResult> {
  const body = buildLemonSqueezyCheckoutPayload(input)
  try {
    const response = await fetchImpl(`${LEMONSQUEEZY_API_BASE}/checkouts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(body),
    })
    const json = await response.json().catch(() => null)
    if (!response.ok) {
      return { ok: false, error: `provider_http_${response.status}` }
    }
    const url = lemonSqueezyCheckoutUrl(json)
    if (!url) return { ok: false, error: 'no_checkout_url' }
    return { ok: true, url }
  } catch {
    return { ok: false, error: 'network_error' }
  }
}
