'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface MobileValuesCarouselProps {
    featured: {
        title: string
        description: string
    }
    supporting: Array<{
        title: string
        description: string
    }>
}

export function MobileValuesCarousel({ featured, supporting }: MobileValuesCarouselProps) {
    const allValues = [
        { ...featured, isFeatured: true },
        ...supporting.map((v) => ({ ...v, isFeatured: false })),
    ]

    // Group values into pairs for mobile stacking
    const groupedValues = allValues.reduce((acc, _, i) => {
        if (i % 2 === 0) acc.push(allValues.slice(i, i + 2));
        return acc;
    }, [] as any[][]);

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
                    <SwiperSlide key={groupIndex} className="h-auto">
                        <div className="grid grid-cols-1 gap-4">
                            {group.map((value, index) => (
                                <div
                                    key={index}
                                    className={`p-5 rounded-lg flex flex-col shadow-sm w-full ${value.isFeatured ? 'bg-copper text-white' : 'bg-limestone text-basalt'
                                        }`}
                                >
                                    <h3
                                        className={`font-display mb-2 line-clamp-2 leading-tight ${value.isFeatured ? 'text-lg' : 'text-base'
                                            }`}
                                    >
                                        {value.title}
                                    </h3>
                                    <p
                                        className={`line-clamp-4 leading-relaxed ${value.isFeatured ? 'text-clay text-[11px]' : 'text-graphite text-[11px]'
                                            }`}
                                    >
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-end pr-2">
                <span className="text-[10px] font-medium uppercase tracking-widest text-graphite/40">
                    Swipe &rarr;
                </span>
            </div>
        </div>
    )
}
