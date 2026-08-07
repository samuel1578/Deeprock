import { NextResponse } from 'next/server'
import { fetchGoldMarketData } from '@/lib/market/gold-api'
import { GoldMarketApiResponse } from '@/lib/market/gold-types'

/**
 * Caching: dynamic route handler (`ƒ` in the build route table), no shared public cache.
 *
 * This endpoint is polled by <GoldPriceLiveRegion /> every 5 minutes on the client.
 * It intentionally sets no `Cache-Control` header, so neither the browser nor the
 * Vercel CDN keeps a shared copy of the JSON — freshness is owned entirely by the
 * Next.js Data Cache inside `fetchGoldMarketData()` (`revalidate: 300`), which is what
 * keeps the upstream provider from being called on every request.
 *
 * Do not add `s-maxage` / `immutable` headers here: a CDN-cached response would pin the
 * quote for all visitors and defeat the 5-minute refresh contract.
 */
export async function GET() {
    try {
        const data = await fetchGoldMarketData()

        if (!data) {
            const errorResponse: GoldMarketApiResponse = {
                error: {
                    code: 'GOLD_MARKET_UNAVAILABLE',
                    message: 'Gold market data is temporarily unavailable.',
                },
            }

            return NextResponse.json(errorResponse, { status: 503 })
        }

        const response: GoldMarketApiResponse = {
            data,
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Gold market API error:', error)

        const errorResponse: GoldMarketApiResponse = {
            error: {
                code: 'GOLD_MARKET_UNAVAILABLE',
                message: 'Gold market data is temporarily unavailable.',
            },
        }

        return NextResponse.json(errorResponse, { status: 503 })
    }
}
