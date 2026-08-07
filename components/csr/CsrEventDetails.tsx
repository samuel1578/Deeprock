import { Container, Section, Stack } from '@/components/layout/Container'
import { TextLink } from '@/components/ui/TextLink'
import { BrandText } from '@/components/ui/BrandText'
import { CsrEventGallery } from '@/components/csr/CsrEventGallery'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import {
  homepageEyebrowVariants,
  homepageSectionVariants,
  fadeUpVariants,
} from '@/components/motion/motion-tokens'
import type { CsrEvent } from '@/content/csr'

interface CsrEventDetailsProps {
  event: CsrEvent
}

/**
 * Server-rendered CSR event detail content.
 * Client behaviour (Swiper, lightbox, keyboard, scroll lock) lives inside
 * CsrEventGallery — everything here stays on the server.
 */
export function CsrEventDetails({ event }: CsrEventDetailsProps) {
  const metadataBits = [event.date, event.location].filter(Boolean)

  return (
    <Section className="bg-white">
      <Container variant="reading">
        <Stack gap="xl">
          {/* Optional metadata — grouped with the story, revealed on load */}
          {metadataBits.length > 0 && (
            <StaggerReveal staggerBy={0.08} delayChildren={0.05}>
              <StaggerItem variants={homepageEyebrowVariants}>
                <p className="text-sm font-medium uppercase tracking-wide text-graphite">
                  {metadataBits.join(' · ')}
                </p>
              </StaggerItem>
            </StaggerReveal>
          )}

          {/* Story body — one grouped fade-up, never per-paragraph observers */}
          <StaggerReveal staggerBy={0.08} delayChildren={0.05}>
            <StaggerItem variants={homepageSectionVariants}>
              <div className="space-y-6">
                {event.body.map((paragraph, index) => (
                  <p key={index} className="text-lg text-graphite leading-relaxed">
                    <BrandText text={paragraph} />
                  </p>
                ))}
              </div>
            </StaggerItem>
          </StaggerReveal>

          {/* Main gallery + thumbnail grid (single viewport owner inside) */}
          <CsrEventGallery images={event.galleryImages} />

          {/* Back link */}
          <Reveal variants={fadeUpVariants}>
            <TextLink href="/csr" showIcon>
              Back to Corporate Social Responsibility
            </TextLink>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  )
}
