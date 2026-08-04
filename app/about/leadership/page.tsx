import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { leadershipTeam, leadershipIntroduction } from '@/content/leadership';

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'Meet the experienced professionals leading DeepRock Mining Ltd across trading, operations, exploration and technical services.',
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="Leadership with Commercial, Technical and Operational Perspective."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Leadership' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <p className="max-w-2xl text-lg text-graphite">
              {leadershipIntroduction}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member) => (
                <div key={member.name}>
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    width={900}
                    height={1200}
                    category="Team"
                    objectFit="contain"
                    layout="intrinsic"
                    className="mb-6 rounded-lg"
                  />
                  <h3 className="font-display text-xl text-basalt mb-1 font-bold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-copper font-bold mb-3 uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-sm text-graphite">
                    {member.biography}
                  </p>
                </div>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
