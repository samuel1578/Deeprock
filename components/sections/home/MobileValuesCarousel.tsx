'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import { ValueGlyph } from '@/components/icons/ValueGlyph'
import type { ValueItem } from '@/content/homepage'
import { cn } from '@/lib/utils'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface MobileValuesCarouselProps {
    values: ValueItem[]
}

export function MobileValuesCarousel({ values }: MobileValuesCarouselProps) {
    // Group values into pairs for mobile stacking (2+2+2+1)
    const groupedValues = values.reduce((acc, _, i) => {
        if (i % 2 === 0) acc.push(values.slice(i, i + 2))
        return acc
    }, [] as ValueItem[][])

    return (
        <div className="md:hidden deeprock-mobile-carousel">
            <Swiper
                modules={[Pagination, A11y]}
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={16}
                pagination={{ clickable: true }}
                watchOverflow
                className="mb-4"
            >
                {groupedValues.map((group, groupIndex) => (
                    <SwiperSlide key={groupIndex} className="h-auto pb-12">
                        <div className="grid grid-cols-1 gap-4">
                            {group.map((value) => (
                                <article
                                    key={value.key}
                                    className={cn(
                                        'group p-6 rounded-lg flex flex-col shadow-sm w-full transition-all duration-300 hover:shadow-md',
                                        value.variant === 'copper' ? 'bg-copper text-white' : 'bg-slate-card text-white'
                                    )}
                                >
                                    <div className="flex items-start gap-4 mb-3">
                                        <ValueGlyph
                                            valueKey={value.key}
                                            variant={value.variant}
                                            className="shrink-0"
                                        />
                                        <h3 className="font-display text-white text-xl leading-tight pt-1">
                                            {value.title}
                                        </h3>
                                    </div>
                                    <p
                                        className={cn(
                                            'text-[13px] leading-relaxed',
                                            value.variant === 'copper' ? 'text-white/90' : 'text-white/85'
                                        )}
                                    >
                                        {value.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-end pr-2 -mt-8 mb-4">
                <span className="text-[10px] font-medium uppercase tracking-widest text-graphite/40">
                    Swipe &rarr;
                </span>
            </div>
        </div>
    )
}
