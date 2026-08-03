'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface MobileNewsCarouselProps {
    articles: any[]
}

export function MobileNewsCarousel({ articles }: MobileNewsCarouselProps) {
    // Group articles into pairs for mobile stacking
    const groupedArticles = articles.reduce((acc, _, i) => {
        if (i % 2 === 0) acc.push(articles.slice(i, i + 2));
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
                {groupedArticles.map((group, groupIndex) => (
                    <SwiperSlide key={groupIndex} className="h-auto">
                        <div className="grid grid-cols-1 gap-4">
                            {group.map((article) => (
                                <a
                                    key={article.id}
                                    href={`/news/${article.slug}`}
                                    className="group bg-white rounded-lg overflow-hidden flex flex-col shadow-sm w-full"
                                >
                                    <div className="aspect-video bg-stone overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4 flex-grow flex flex-col">
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-copper mb-1">
                                            {article.category}
                                        </p>
                                        <h3 className="font-display text-sm text-basalt mb-2 line-clamp-2 leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-[11px] text-graphite line-clamp-2 flex-grow leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </a>
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
