import type { Metadata } from "next"
import { Container, Section } from "@/components/layout/Container"
import { buildSeoMetadata } from "@/lib/seo/metadata"
import { LeadershipCarousel } from "./LeadershipCarousel"
import { LeadershipDesktop } from "./LeadershipDesktop"
import { leadershipIntroduction } from "@/content/leadership"

/**
 * Caching: fully static editorial route.
 * Leadership data is a local module (`@/content/leadership`) and the carousel /
 * desktop switcher are Client Components (Swiper + Framer Motion). Nothing here
 * reads request-time APIs, so the HTML shell is prerendered at build time and
 * refreshed by deployment only.
 */
export const dynamic = "force-static"

export const metadata: Metadata = buildSeoMetadata({
  title: "Our Leadership",
  description:
    "Meet the experienced professionals leading Deep Rock Mining Co. Ltd across trading, operations, exploration, finance, health and safety, environmental management and business development in Ghana.",
  path: "/about/leadership",
})

export default function LeadershipPage() {
  return (
    <>
      {/* Page header — provides the single H1 this route was missing. */}
      <Section variant="compact" tone="limestone" className="pb-0">
        <Container>
          <div className="max-w-3xl pt-8 md:pt-12 lg:pt-16">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-copper">
              ABOUT US
            </p>
            <h1 className="font-display text-4xl text-basalt md:text-5xl lg:text-6xl">
              Our Leadership
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-graphite md:text-xl">
              {leadershipIntroduction}
            </p>
          </div>
        </Container>
      </Section>

      <Section id="team" className="bg-white pt-8 md:pt-12 lg:pt-16">
        <Container variant="wide">
          <LeadershipCarousel />
          <LeadershipDesktop />
        </Container>
      </Section>
    </>
  )
}
