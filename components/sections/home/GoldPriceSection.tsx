import { Container, Section, Stack } from '@/components/layout/Container'
import { fetchGoldMarketData } from '@/lib/market/gold-api'
import { GoldPriceLiveRegion } from '@/components/market/GoldPriceLiveRegion'
import { GoldBarDecoration } from '@/components/market/GoldBarDecoration'

export async function GoldPriceSection() {
    let marketData = null
    let error = null

    try {
        marketData = await fetchGoldMarketData()
    } catch (e) {
        console.error('Error fetching gold market data for section:', e)
        error = 'Market price temporarily unavailable'
    }

    if (marketData === null && error === null) {
        error = 'Market price temporarily unavailable'
    }

    return (
        <Section className="bg-white py-12 md:py-24">
            <Container variant="wide">
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center">
                    <Stack gap="sm">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-widest text-copper mb-3">
                                GOLD MARKET
                            </p>
                            <h2 className="font-display text-4xl md:text-5xl text-basalt mb-4 lg:mb-6">
                                Indicative Gold Market Price
                            </h2>
                            <p className="text-graphite/80 max-w-md text-sm md:text-base">
                                Real-time indicative prices provided for informational purposes. Market values are sourced from independent third-party providers.
                            </p>
                        </div>
                    </Stack>

                    <div className="relative">
                        {/* Decorative Pattern */}
                        <div
                            aria-hidden="true"
                            className="absolute -inset-4 bg-[url('/images/patterns/deeprock-card-grid.svg')] bg-repeat bg-[length:200px_auto] opacity-[0.03] pointer-events-none"
                        />

                        <div className="relative bg-[#111111] bg-gradient-to-br from-[#181818] via-[#111111] to-black border border-white/10 rounded-xl shadow-2xl min-h-[280px] flex flex-col justify-center overflow-hidden">
                            <GoldBarDecoration />

                            <div className="relative z-10 p-8 md:p-10">
                                <GoldPriceLiveRegion initialData={marketData} initialError={error} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}
