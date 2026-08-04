export interface GoldMarketData {
    symbol: 'XAU'
    currency: 'USD'
    ouncePrice: number
    gramPrice: number
    providerUpdatedAt: string
    servedAt: string
    source: 'Gold-API.com'
    freshness: 'near-live' | 'stale'
}

export type GoldMarketApiResponse =
    | {
        data: GoldMarketData
        error?: never
    }
    | {
        data?: never
        error: {
            code: 'GOLD_MARKET_UNAVAILABLE'
            message: string
        }
    }
