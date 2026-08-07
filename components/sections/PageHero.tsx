import { Container, Stack } from '@/components/layout/Container';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/layout/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal';
import {
  heroImageVariants,
  homepageBodyVariants,
  homepageEyebrowVariants,
  homepageHeadingVariants,
} from '@/components/motion/motion-tokens';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  summary?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
  /**
   * Opt-in hero entrance choreography (Services + Sustainability routes).
   * Defaults to false so the rest of the site (About, News, Contact, legal)
   * keeps its current static hero. Reduced motion is handled by the shared
   * primitives (opacity-only, no transforms).
   */
  motion?: boolean;
  /**
   * Canonical path of the current page, used by the BreadcrumbList structured
   * data for the final (non-linked) crumb, e.g. '/services/gold-aggregation'.
   */
  path?: string;
}

/**
 * Shared page hero. Server component: the motion pieces are the existing
 * client primitives (Reveal / StaggerReveal), and the hero image uses
 * next/image via ImageWithFallback with `priority` — the hero is the LCP
 * element, so it must never be lazy-loaded.
 */
export function PageHero({
  eyebrow,
  title,
  summary,
  breadcrumbs,
  image,
  imageAlt,
  motion = false,
  path,
}: PageHeroProps) {
  const heroCopy = (
    <div className="space-y-4">
      {eyebrow && (
        <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-copper">
          {eyebrow}
        </p>
      )}

      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-basalt">
        {title}
      </h1>

      {summary && (
        <p className="max-w-2xl text-lg md:text-xl text-graphite">
          {summary}
        </p>
      )}
    </div>
  )

  const heroImage = image && (
    <div className="mt-8 -mx-4 md:mx-0 rounded-lg overflow-hidden bg-stone">
      <ImageWithFallback
        src={image}
        alt={imageAlt || title}
        width={1600}
        height={900}
        category="Hero"
        priority
        sizes="(min-width: 1248px) 1248px, 100vw"
      />
    </div>
  )

  return (
    <section className="bg-limestone py-8 md:py-12 lg:py-16">
      {breadcrumbs && breadcrumbs.length > 1 && (
        <BreadcrumbJsonLd items={breadcrumbs} path={path} />
      )}
      <Container>
        <Stack gap="lg">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} />
          )}

          {motion ? (
            <StaggerReveal
              staggerBy={0.1}
              delayChildren={0.05}
              className="space-y-4"
            >
              {eyebrow && (
                <StaggerItem variants={homepageEyebrowVariants}>
                  <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-copper">
                    {eyebrow}
                  </p>
                </StaggerItem>
              )}

              <StaggerItem variants={homepageHeadingVariants}>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-basalt">
                  {title}
                </h1>
              </StaggerItem>

              {summary && (
                <StaggerItem variants={homepageBodyVariants}>
                  <p className="max-w-2xl text-lg md:text-xl text-graphite">
                    {summary}
                  </p>
                </StaggerItem>
              )}
            </StaggerReveal>
          ) : (
            heroCopy
          )}

          {image &&
            (motion ? (
              <Reveal variants={heroImageVariants}>{heroImage}</Reveal>
            ) : (
              heroImage
            ))}
        </Stack>
      </Container>
    </section>
  );
}
