import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { newsArticles, newsListingIntro } from '@/content/news';

export const metadata: Metadata = buildSeoMetadata({
  title: 'News & Insights',
  description:
    'Deep Rock Mining Co. Ltd perspectives and practical insights on responsible gold trading, mining operations, safety, sustainability and technical services in Ghana.',
  path: '/news',
});

export default function NewsPage() {
  const featuredArticle = newsArticles.find(a => a.featured);
  const otherArticles = newsArticles.filter(a => !a.featured);

  return (
    <>
      <PageHero
        eyebrow="NEWS & INSIGHTS"
        title="Stay Informed"
        summary={newsListingIntro}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News' },
        ]}
        path="/news"
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            {/* Featured Article */}
            {featuredArticle && (
              <a
                href={`/news/${featuredArticle.slug}`}
                className="group bg-limestone rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video bg-stone overflow-hidden md:order-2">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center md:order-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-copper mb-2">
                      {featuredArticle.category} • Featured
                    </p>
                    <h3 className="font-display text-3xl text-basalt mb-4 group-hover:text-copper transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-graphite mb-4">
                      {featuredArticle.excerpt}
                    </p>
                    <p className="text-sm text-stone">{featuredArticle.date}</p>
                  </div>
                </div>
              </a>
            )}

            {/* Other Articles */}
            {otherArticles.length > 0 && (
              <div>
                <h2 className="font-display text-3xl text-basalt mb-6">
                  All Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {otherArticles.map((article) => (
                    <a
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="group bg-limestone rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-stone overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-copper mb-2">
                          {article.category}
                        </p>
                        <h3 className="font-display text-xl text-basalt mb-2 line-clamp-2 group-hover:text-copper transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-graphite line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                        <p className="text-xs text-stone">{article.date}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Stack>
        </Container>
      </Section>
    </>
  );
}
