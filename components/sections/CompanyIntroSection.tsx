import { Container, Section, Stack } from '@/components/layout/Container';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { companyIntroductionContent } from '@/content/homepage';

export function CompanyIntroSection() {
  return (
    <Section className="bg-white">
      <Container variant="wide">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Stack gap="lg">
            <h2 className="font-display text-4xl md:text-5xl text-basalt">
              {companyIntroductionContent.heading}
            </h2>
            {companyIntroductionContent.body.split('\n').map((para, idx) => (
              <p key={idx} className="text-lg text-graphite leading-relaxed">
                {para}
              </p>
            ))}
          </Stack>

          <ImageWithFallback
            src={companyIntroductionContent.image}
            alt={companyIntroductionContent.heading}
            width={600}
            height={400}
            category="Company Overview"
            className="rounded-lg"
          />
        </div>
      </Container>
    </Section>
  );
}
