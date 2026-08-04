import { GoldMarketData } from './gold-types'

const GOLD_API_URL = 'https://api.gold-api.com/price/XAU'
const GRAMS_PER_TROY_OUNCE = 31.1034768
const GOLD_REVALIDATE_SECONDS = 300
const STALE_AFTER_MS = 15 * 60 * 1000
const FETCH_TIMEOUT_MS = 8000

interface GoldApiResponse {
    price: number
    updatedAt: string
    symbol: string
    currency: string
}

function isValidGoldApiResponse(data: unknown): data is GoldApiResponse {
    if (!data || typeof data !== 'object') return false
    const d = data as Record<string, unknown>
    return (
        typeof d.price === 'number' &&
        d.price > 0 &&
        typeof d.updatedAt === 'string' &&
        typeof d.symbol === 'string' &&
        typeof d.currency === 'string'
    )
}

export async function fetchGoldMarketData(): Promise<GoldMarketData | null> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
        const response = await fetch(GOLD_API_URL, {
            headers: {
                Accept: 'application/json',
            },
            next: {
                revalidate: GOLD_REVALIDATE_SECONDS,
            },
            signal: controller.signal,
        })

        if (!response.ok) {
            throw new Error(`Gold-API error: ${response.status} ${response.statusText}`)
        }

        const rawData = await response.json()

        if (!isValidGoldApiResponse(rawData)) {
            throw new Error('Invalid response format from Gold-API')
        }

        const ouncePrice = rawData.price
        const gramPrice = ouncePrice / GRAMS_PER_TROY_OUNCE
        const providerUpdatedAt = rawData.updatedAt
        const servedAt = new Date().toISOString()

        const updatedAtMs = new Date(providerUpdatedAt).getTime()
        const nowMs = Date.now()
        const freshness = nowMs - updatedAtMs > STALE_AFTER_MS ? 'stale' : 'near-live'

        return {
            symbol: 'XAU',
            currency: 'USD',
            ouncePrice,
            gramPrice,
            providerUpdatedAt,
            servedAt,
            source: 'Gold-API.com',
            freshness,
        }
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            return null
        }
        throw error
    } finally {
        clearTimeout(timeoutId)
    }
}
