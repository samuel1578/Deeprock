import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { ButtonLink } from '@/components/ui/Button';
import { companyContact } from '@/content/site';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with DeepRock Mining Ltd for enquiries regarding gold trading, aggregation, mining operations and technical services.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Start a Conversation with DeepRock."
        summary="Contact our team about gold trading, aggregation, mining, exploration, equipment, consulting, sustainability or partnership opportunities."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="standard">
          <Stack gap="xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-copper flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-basalt mb-2">Phone</h3>
                  <TextLink href={companyContact.phoneLink} variant="copper">
                    {companyContact.phone}
                  </TextLink>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-copper flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-basalt mb-2">Email</h3>
                  <TextLink href={companyContact.emailLink} variant="copper">
                    {companyContact.email}
                  </TextLink>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-copper flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-basalt mb-2">Office</h3>
                  <div className="text-graphite">
                    <p>{companyContact.address}</p>
                    <p className="text-sm mt-1">{companyContact.postalAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-limestone p-8 md:p-12 rounded-lg">
              <h2 className="font-display text-3xl text-basalt mb-6">
                Get in Touch
              </h2>
              <p className="text-graphite mb-6">
                Online form delivery is not yet connected. Please contact DeepRock by phone or email.
              </p>
              <div className="space-y-4">
                <ButtonLink href={companyContact.phoneLink} variant="bright-pattern" size="lg">
                  Call {companyContact.phone}
                </ButtonLink>
                <br />
                <ButtonLink href={companyContact.emailLink} variant="bright-pattern" size="lg">
                  Email Us
                </ButtonLink>
              </div>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
