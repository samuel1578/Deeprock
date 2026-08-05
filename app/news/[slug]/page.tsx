import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { getArticleBySlug, newsArticles } from '@/content/news';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Deep Rock News`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        summary={article.excerpt}
        image={article.image}
        imageAlt={article.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
          { label: article.title },
        ]}
      />

      <Section className="bg-white">
        <Container variant="reading">
          <Stack gap="lg">
            <div className="text-sm text-stone">
              By {article.author} on {article.date}
            </div>

            <div className="prose prose-base max-w-none">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-graphite leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.cta && (
              <div className="bg-limestone p-8 rounded-lg">
                <ButtonLink
                  href={article.cta.href}
                  variant="primary"
                  size="lg"
                >
                  {article.cta.label}
                </ButtonLink>
              </div>
            )}

            <TextLink href="/news" showIcon>
              Back to all insights
            </TextLink>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
