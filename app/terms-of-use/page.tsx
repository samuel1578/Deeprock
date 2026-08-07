import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { companyContact } from '@/content/site';

export const metadata: Metadata = buildSeoMetadata({
  title: 'Terms of Use',
  description: 'Deep Rock Mining Co. Ltd website terms of use and legal disclaimer.',
  path: '/terms-of-use',
});

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Use"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Use' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="reading">
          <div className="prose prose-base max-w-none space-y-6">
            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Website Purpose
              </h2>
              <p className="text-graphite">
                This website provides general corporate information about Deep Rock Mining Co. Ltd and its stated services. Content does not constitute financial, legal, investment, geological or regulatory advice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Accuracy of Information
              </h2>
              <p className="text-graphite">
                Deep Rock aims to keep information accurate, but service descriptions and general industry content may be updated. Users should confirm material commercial information directly with the company.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Enquiries
              </h2>
              <p className="text-graphite">
                Submitting an enquiry does not create a contract, confirm eligibility, reserve equipment, establish a trading relationship or guarantee that Deep Rock will accept a proposed engagement.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Intellectual Property
              </h2>
              <p className="text-graphite">
                Website text, branding, layouts and approved media are protected by applicable rights. Third-party content remains subject to the rights of its owner.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                External Links
              </h2>
              <p className="text-graphite">
                External websites are provided for convenience. Deep Rock is not responsible for their availability or content.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Changes to Terms
              </h2>
              <p className="text-graphite">
                Deep Rock may revise the website and these terms at any time.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Contact
              </h2>
              <p className="text-graphite">
                Questions about the website may be sent to{' '}
                <TextLink href={companyContact.emailLink} variant="copper">
                  {companyContact.email}
                </TextLink>
                .
              </p>
            </div>

            <div>
              <p className="text-sm text-stone italic">
                Last updated: August 2026
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
