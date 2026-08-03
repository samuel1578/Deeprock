import { Container, Stack } from '@/components/layout/Container';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/layout/Breadcrumbs';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  summary?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  eyebrow,
  title,
  summary,
  breadcrumbs,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="bg-limestone py-8 md:py-12 lg:py-16">
      <Container>
        <Stack gap="lg">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} />
          )}

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

          {image && (
            <div className="mt-8 -mx-4 md:mx-0 rounded-lg overflow-hidden aspect-video bg-stone">
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </Stack>
      </Container>
    </section>
  );
}
