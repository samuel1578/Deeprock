import type { Metadata } from 'next';
import { Container, Section } from '@/components/layout/Container';
import { IntroSection } from './IntroSection';
import { LeadershipCarousel } from './LeadershipCarousel';
import { LeadershipDesktop } from './LeadershipDesktop';

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'Meet the experienced professionals leading DeepRock Mining Ltd across trading, operations, exploration and technical services.',
};

export default function LeadershipPage() {
  return (
    <>
      <IntroSection />

      <Section id="team" className="bg-white">
        <Container variant="wide">
          <LeadershipCarousel />
          <LeadershipDesktop />
        </Container>
      </Section>
    </>
  );
}
