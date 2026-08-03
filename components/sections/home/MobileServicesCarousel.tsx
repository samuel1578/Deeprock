'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import { ButtonLink } from '@/components/ui/Button';
import { ServiceGlyph } from '@/components/icons/ServiceGlyph';

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface MobileServicesCarouselProps {
    services: any[]
}

export function MobileServicesCarousel({ services }: MobileServicesCarouselProps) {
    // Group services into pairs for mobile stacking
    const groupedServices = services.reduce((acc, _, i) => {
        if (i % 2 === 0) acc.push(services.slice(i, i + 2));
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
                {groupedServices.map((group: any[], groupIndex: number) => (
                    <SwiperSlide key={groupIndex} className="h-auto">
                        <div className="grid grid-cols-1 gap-4">
                            {group.map((service: any) => (
                                <article
                                    key={service.id}
                                    className="group relative bg-white p-5 rounded-lg flex flex-col shadow-sm w-full h-full overflow-hidden"
                                >
                                    {/* Geological Texture Layer */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-[url('/images/patterns/deeprock-card-grid.svg')] bg-repeat bg-[length:260px_auto] opacity-[0.03] transition-opacity duration-300"
                                    />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-4">
                                            <ServiceGlyph serviceSlug={service.slug} />
                                        </div>
                                        <h3 className="font-display text-lg text-basalt mb-2 line-clamp-2 leading-tight">
                                            {service.name}
                                        </h3>
                                        <p className="text-graphite text-[11px] mb-4 line-clamp-3 leading-relaxed">
                                            {service.summary}
                                        </p>
                                        <div className="mt-auto pt-4">
                                            <ButtonLink
                                                href={`/services/${service.slug}`}
                                                variant="dark-pattern"
                                                size="sm"
                                            >
                                                Learn More
                                            </ButtonLink>
                                        </div>
                                    </div>
                                </article>
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
