import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { companyContact } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Deep Rock Mining Ltd privacy policy and data protection information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="reading">
          <div className="prose prose-base max-w-none space-y-6">
            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Information We Collect
              </h2>
              <p className="text-graphite">
                This website may collect contact details and enquiry information that you choose to submit, including name, organisation, email address, telephone number, enquiry type and message.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                How We Use Your Information
              </h2>
              <p className="text-graphite">
                Information may be used to respond to enquiries, evaluate partnership or service requests, maintain security, improve the website and comply with applicable obligations.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Data Protection
              </h2>
              <p className="text-graphite">
                Deep Rock is committed to protecting your personal information. Information may be handled by approved service providers where necessary for hosting, email delivery, analytics, security or professional advice, subject to appropriate controls.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-basalt mb-3">
                Your Rights
              </h2>
              <p className="text-graphite">
                You may contact Deep Rock to ask questions about information submitted through the website. Privacy questions may be directed to{' '}
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
