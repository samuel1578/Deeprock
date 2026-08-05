import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal';
import {
  cardRevealVariants,
  homepageHeadingVariants,
  homepageBodyVariants,
  homepageCtaVariants,
  adinkraSymbolVariants,
} from '@/components/motion/motion-tokens';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { companyContact } from '@/content/site';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Deep Rock Mining Ltd for enquiries regarding gold trading, aggregation, mining operations and technical services.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Start a Conversation with Deep Rock."
        summary="Contact our team about gold trading, aggregation, mining, exploration, equipment, consulting, sustainability or partnership opportunities."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="standard">
          <Stack gap="xl">
            <StaggerReveal
              className="grid md:grid-cols-3 gap-8"
              staggerBy={0.1}
              delayChildren={0.05}
            >
              <StaggerItem className="flex gap-4">
                <Phone className="w-6 h-6 text-copper flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-basalt mb-2">Phone</h3>
                  <TextLink href={companyContact.phoneLink} variant="copper">
                    {companyContact.phone}
                  </TextLink>
                  <div className="mt-3">
                    <ButtonLink
                      href={companyContact.whatsappHref}
                      variant="whatsapp-pattern"
                      size="md"
                      target="_blank"
                      rel="noopener noreferrer"
                      iconLeft={<WhatsappIcon className="size-5 shrink-0" />}
                    >
                      Message {companyContact.phone}
                    </ButtonLink>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem className="flex gap-4">
                <Mail className="w-6 h-6 text-copper flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-basalt mb-2">Email</h3>
                  <TextLink href={companyContact.emailLink} variant="copper">
                    {companyContact.email}
                  </TextLink>
                </div>
              </StaggerItem>

              <StaggerItem className="flex gap-4">
                <MapPin className="w-6 h-6 text-copper flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-basalt mb-2">Office</h3>
                  <div className="text-graphite">
                    <p>{companyContact.address}</p>
                    <p className="text-sm mt-1">{companyContact.postalAddress}</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerReveal>

            <Reveal
              variants={cardRevealVariants}
              className="relative overflow-hidden rounded-lg bg-limestone p-8 md:p-12"
            >
              {/* Decorative Aya (Adinkra) symbol — right side, low opacity */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 size-40 opacity-[0.25] sm:size-52 md:size-64"
              >
                <Reveal variants={adinkraSymbolVariants} className="h-full w-full">
                  <Image
                    src="/images/patterns/aya.png"
                    alt=""
                    fill
                    sizes="(max-width: 767px) 160px, (max-width: 1023px) 208px, 256px"
                    className="object-contain"
                  />
                </Reveal>
              </div>

              {/* Readability gradient — protects heading, copy and buttons */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-limestone via-limestone/92 to-limestone/50"
              />

              <StaggerReveal
                className="relative z-10"
                staggerBy={0.09}
                delayChildren={0.05}
              >
                <StaggerItem variants={homepageHeadingVariants}>
                  <h2 className="font-display text-3xl text-basalt mb-6">
                    Get in Touch
                  </h2>
                </StaggerItem>
                <StaggerItem variants={homepageBodyVariants}>
                  <p className="text-graphite mb-6">
                    Online form delivery is not yet connected. Please contact Deep Rock by phone or email.
                  </p>
                </StaggerItem>
                <StaggerItem variants={homepageCtaVariants}>
                  <div className="flex flex-wrap gap-4">
                    <ButtonLink
                      href={companyContact.whatsappHref}
                      variant="whatsapp-pattern"
                      size="lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      iconLeft={<WhatsappIcon className="size-5 shrink-0" />}
                    >
                      Message {companyContact.phone}
                    </ButtonLink>
                    <ButtonLink
                      href={companyContact.emailLink}
                      variant="bright-pattern"
                      size="lg"
                    >
                      Email Us
                    </ButtonLink>
                  </div>
                </StaggerItem>
              </StaggerReveal>
            </Reveal>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
