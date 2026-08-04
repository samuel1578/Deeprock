'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { GoldMarketData, GoldMarketApiResponse } from '@/lib/market/gold-types'
import { ChartLineUp } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface GoldPriceLiveRegionProps {
    initialData: GoldMarketData | null
    initialError: string | null
}

const CLIENT_REFRESH_MS = 5 * 60 * 1000 // 5 minutes
const STALE_AFTER_MS = 15 * 60 * 1000 // 15 minutes

export function GoldPriceLiveRegion({ initialData, initialError }: GoldPriceLiveRegionProps) {
    const [data, setData] = useState<GoldMarketData | null>(initialData)
    const [error, setError] = useState<string | null>(initialError)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<number>(Date.now())

    const refreshInterval = useRef<NodeJS.Timeout | null>(null)

    const ounceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const gramFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'GMT',
            timeZoneName: 'short',
        })
    }

    const refreshData = useCallback(async () => {
        setIsRefreshing(true)
        try {
            const response = await fetch('/api/market/gold')
            const result: GoldMarketApiResponse = await response.json()

            if (result.data) {
                setData(result.data)
                setError(null)
                setLastUpdated(Date.now())
            } else if (result.error) {
                // Preserve last valid data but show error if no data at all
                if (!data) {
                    setError('Market price temporarily unavailable')
                }
                console.error('Gold refresh error:', result.error.message)
            }
        } catch (err) {
            console.error('Failed to refresh gold price:', err)
            if (!data) {
                setError('Market price temporarily unavailable')
            }
        } finally {
            setIsRefreshing(false)
        }
    }, [data])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const timeSinceLastUpdate = Date.now() - lastUpdated
                if (timeSinceLastUpdate >= CLIENT_REFRESH_MS) {
                    refreshData()
                }

                // Restart interval
                if (!refreshInterval.current) {
                    refreshInterval.current = setInterval(refreshData, CLIENT_REFRESH_MS)
                }
            } else {
                // Pause interval
                if (refreshInterval.current) {
                    clearInterval(refreshInterval.current)
                    refreshInterval.current = null
                }
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Initial interval setup
        refreshInterval.current = setInterval(refreshData, CLIENT_REFRESH_MS)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            if (refreshInterval.current) {
                clearInterval(refreshInterval.current)
            }
        }
    }, [refreshData, lastUpdated])

    // Determine status label and dot color
    let statusLabel = 'Near-live'
    let statusColor = 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'

    if (error || !data) {
        statusLabel = 'Temporarily unavailable'
        statusColor = 'bg-red-500'
    } else {
        const providerUpdateMs = new Date(data.providerUpdatedAt).getTime()
        const isStale = Date.now() - providerUpdateMs > STALE_AFTER_MS

        if (isStale) {
            statusLabel = 'Stale'
            statusColor = 'bg-amber-500'
        }
    }

    if (error && !data) {
        return (
            <div className="flex items-center justify-center py-12 text-white/50 italic">
                {error}
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
            {/* Accessibility Live Region */}
            <div aria-live="polite" className="sr-only">
                Gold market price updated to {ounceFormatter.format(data.ouncePrice)} per ounce.
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <ChartLineUp size={40} weight="duotone" className={cn("text-copper transition-opacity duration-300", isRefreshing && "opacity-50")} aria-hidden="true" />
                    <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-white/50 mb-1">
                            XAU / USD
                        </p>
                        <p className="font-display text-5xl md:text-6xl text-white tabular-nums">
                            {ounceFormatter.format(data.ouncePrice)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-2 pt-4 border-t border-white/10">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-1">
                            Price per Gram
                        </p>
                        <p className="text-xl font-medium text-white/90 tabular-nums">
                            {gramFormatter.format(data.gramPrice)}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-white/40 mb-1">
                            Market Status
                        </p>
                        <div className="flex items-center gap-2">
                            <span className={cn("w-2 h-2 rounded-full transition-colors duration-500", statusColor)} />
                            <span className="text-sm font-medium text-white/80 capitalize">
                                {statusLabel}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-left md:text-right space-y-1">
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">
                    Last Updated
                </p>
                <p className="text-sm text-white/60">
                    {formatDate(data.providerUpdatedAt)}
                </p>
                <p className="text-[9px] text-white/20 pt-2">
                    Source: {data.source}
                </p>
            </div>
        </div>
    )
}
