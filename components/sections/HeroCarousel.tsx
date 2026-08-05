'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { ButtonLink } from '@/components/ui/Button';
import { Pause, Play, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import type { HeroSlide } from '@/content/homepage';
import 'swiper/css';
import 'swiper/css/effect-fade';

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const shouldPause = userPaused || hoverPaused || focusPaused || documentHidden || prefersReducedMotion;

  const handleInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  useEffect(() => {
    if (!swiper) return;
    if (shouldPause) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [shouldPause, swiper]);

  useEffect(() => {
    const onVisibilityChange = () => {
      setDocumentHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.45 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  };

  const goTo = (index: number) => {
    if (!swiper) return;
    swiper.slideTo(index);
    handleInteraction();
  };

  const prev = () => {
    if (!swiper) return;
    swiper.slidePrev();
    handleInteraction();
  };

  const next = () => {
    if (!swiper) return;
    swiper.slideNext();
    handleInteraction();
  };

  return (
    <div
      className="relative w-full h-[calc(100svh-4rem)] min-h-[620px] max-h-[860px] md:h-[600px] md:min-h-0 md:max-h-none lg:h-[700px] bg-basalt overflow-hidden"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={() => setFocusPaused(false)}
    >
      <Swiper
        onSwiper={setSwiper}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={
          !shouldPause
            ? { delay: 7000, disableOnInteraction: false }
            : false
        }
        loop
        onSlideChange={(s) => setCurrentSlide(s.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.number} className="relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <motion.img
                src={slide.mobileImage}
                alt={slide.imageAlt}
                className="absolute inset-0 block h-full w-full object-cover md:hidden"
                style={{
                  objectPosition: slide.mobileObjectPosition || 'center center',
                }}
                loading={slide.number === 1 ? 'eager' : 'lazy'}
                fetchPriority={slide.number === 1 ? 'high' : 'auto'}
                decoding="async"
                animate={currentSlide === index && !prefersReducedMotion ? { scale: 1.035 } : { scale: 1 }}
                transition={{ duration: 7, ease: 'linear' }}
              />

              <motion.img
                src={slide.desktopImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 hidden h-full w-full object-cover md:block"
                style={{
                  objectPosition: slide.desktopObjectPosition || 'center center',
                }}
                loading={slide.number === 1 ? 'eager' : 'lazy'}
                fetchPriority={slide.number === 1 ? 'high' : 'auto'}
                decoding="async"
                animate={currentSlide === index && !prefersReducedMotion ? { scale: 1.035 } : { scale: 1 }}
                transition={{ duration: 7, ease: 'linear' }}
              />
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  backgroundImage: slide.desktopOverlay || 'linear-gradient(90deg, rgba(8,12,14,0.86) 0%, rgba(8,12,14,0.70) 28%, rgba(8,12,14,0.34) 58%, rgba(8,12,14,0.08) 100%)',
                }}
              />
              <div
                className="absolute inset-0 block md:hidden"
                style={{
                  backgroundImage: slide.mobileOverlay || 'linear-gradient(180deg, rgba(8,12,14,0.08) 0%, rgba(8,12,14,0.24) 30%, rgba(8,12,14,0.66) 60%, rgba(8,12,14,0.92) 100%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-10">
              <div className="flex h-full items-end pb-20 md:items-center md:pb-0">
                <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.number}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="max-w-[34rem] md:max-w-[54rem]"
                    >
                      <motion.h1
                        variants={textVariants}
                        className="font-display text-[clamp(2rem,8vw,3.25rem)] md:text-5xl lg:text-6xl text-white mb-6 leading-tight max-w-[16ch] inline-block bg-black/20 px-3 py-2 rounded"
                      >
                        {slide.heading}
                      </motion.h1>

                      <motion.p
                        variants={textVariants}
                        className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl"
                      >
                        {slide.summary}
                      </motion.p>

                      <motion.div
                        variants={textVariants}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <ButtonLink
                          href={slide.primaryCTA.href}
                          variant="bright-pattern"
                          size="lg"
                        >
                          {slide.primaryCTA.label}
                        </ButtonLink>
                        <span className="inline-flex">
                          <ButtonLink
                            href={slide.secondaryCTA.href}
                            variant="outline"
                            size="lg"
                            className="!bg-[rgba(8,12,14,0.32)] !border-[rgba(255,255,255,0.55)] !text-white hover:!bg-[rgba(8,12,14,0.56)]"
                          >
                            {slide.secondaryCTA.label}
                          </ButtonLink>
                        </span>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="hidden md:inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Slide pagination">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-300 min-w-[24px] min-h-[24px] ${currentSlide === idx
                  ? 'w-7 h-2.5 bg-copper'
                  : 'w-2 h-2 bg-white/45 hover:bg-white/75'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={currentSlide === idx ? 'true' : 'false'}
                role="tab"
              />
            ))}
          </div>

          <button
            onClick={next}
            className="hidden md:inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px]"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {!hasInteracted && !prefersReducedMotion && (
            <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-white/70 md:hidden">
              <MoveHorizontal className="w-4 h-4" />
              Swipe
            </span>
          )}

          <button
            onClick={() => setUserPaused((p) => !p)}
            className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors min-w-[44px] min-h-[44px]"
            aria-label={userPaused ? 'Play autoplay' : 'Pause autoplay'}
          >
            {userPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
