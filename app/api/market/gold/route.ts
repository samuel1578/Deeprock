import { NextResponse } from 'next/server'
import { fetchGoldMarketData } from '@/lib/market/gold-api'
import { GoldMarketApiResponse } from '@/lib/market/gold-types'

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
