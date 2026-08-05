import type { Metadata } from "next"
import { Container, Section } from "@/components/layout/Container"
import { LeadershipCarousel } from "./LeadershipCarousel"
import { LeadershipDesktop } from "./LeadershipDesktop"

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the experienced professionals leading Deep Rock Mining Ltd across trading, operations, exploration and technical services.",
}

export default function LeadershipPage() {
  return (
    <Section id="team" className="bg-white pt-8 md:pt-12 lg:pt-16">
      <Container variant="wide">
        <LeadershipCarousel />
        <LeadershipDesktop />
      </Container>
    </Section>
  )
}
