// DeepRock Homepage Content

export interface HeroSlide {
  number: number;
  eyebrow: string;
  heading: string;
  summary: string;
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
  desktopObjectPosition?: string;
  mobileObjectPosition?: string;
  desktopOverlay?: string;
  mobileOverlay?: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
  };
}

export const heroSlides: HeroSlide[] = [
  {
    number: 1,
    eyebrow: 'Ghanaian-owned. Responsibility-led.',
    heading: 'Responsible Gold Trading. Sustainable Mining. Lasting Value.',
    summary: 'Deep Rock Co. Ltd connects precious minerals trading, aggregation and responsible mining services through transparent commercial relationships.',
    primaryCTA: {
      label: 'Explore Our Services',
      href: '/services',
    },
    secondaryCTA: {
      label: 'About Deep Rock',
      href: '/about',
    },
    desktopImage: '/images/home/hero/responsible-trading-desktop.jpeg',
    mobileImage: '/images/home/hero/responsible-trading-mobile.jpeg',
    imageAlt: 'Ghanaian precious-minerals professionals inspecting gold samples in a secure aggregation facility',
    desktopObjectPosition: '58% center',
    mobileObjectPosition: '52% 38%',
    desktopOverlay: 'linear-gradient(90deg, rgba(8,12,14,0.86) 0%, rgba(8,12,14,0.70) 28%, rgba(8,12,14,0.34) 58%, rgba(8,12,14,0.08) 100%)',
    mobileOverlay: 'linear-gradient(180deg, rgba(8,12,14,0.08) 0%, rgba(8,12,14,0.24) 30%, rgba(8,12,14,0.66) 60%, rgba(8,12,14,0.92) 100%)',
  },
  {
    number: 2,
    eyebrow: 'Gold Trading & Aggregation',
    heading: 'Reliable Aggregation for Ghana\'s Gold Value Chain.',
    summary: 'We work with licensed mining partners to support responsible sourcing, dependable communication and formal market access.',
    primaryCTA: {
      label: 'Explore Aggregation',
      href: '/services/gold-aggregation',
    },
    secondaryCTA: {
      label: 'Partner With Us',
      href: '/contact?enquiry=partnership',
    },
    desktopImage: '/images/home/hero/operations-desktop.webp',
    mobileImage: '/images/home/hero/operations-mobile.webp',
    imageAlt: 'Ghanaian mining professionals operating a modern mineral-processing facility',
    desktopObjectPosition: '55% center',
    mobileObjectPosition: '56% 34%',
    desktopOverlay: 'linear-gradient(90deg, rgba(8,12,14,0.86) 0%, rgba(8,12,14,0.70) 28%, rgba(8,12,14,0.34) 58%, rgba(8,12,14,0.08) 100%)',
    mobileOverlay: 'linear-gradient(180deg, rgba(8,12,14,0.08) 0%, rgba(8,12,14,0.24) 30%, rgba(8,12,14,0.66) 60%, rgba(8,12,14,0.92) 100%)',
  },
  {
    number: 3,
    eyebrow: 'Mining & Exploration',
    heading: 'From Geological Insight to Responsible Operations.',
    summary: 'Our service portfolio supports exploration, mining operations and better-informed decisions across the mining value chain.',
    primaryCTA: {
      label: 'Explore Capabilities',
      href: '/services/mineral-exploration',
    },
    secondaryCTA: {
      label: 'Technical Services',
      href: '/services/geological-consulting',
    },
    desktopImage: '/images/home/hero/exploration-desktop.jpg',
    mobileImage: '/images/home/hero/exploration-mobile.jpg',
    imageAlt: 'Ghanaian geologists conducting a field assessment at a mining site',
    desktopObjectPosition: '54% center',
    mobileObjectPosition: '58% 32%',
    desktopOverlay: 'linear-gradient(90deg, rgba(8,12,14,0.86) 0%, rgba(8,12,14,0.70) 28%, rgba(8,12,14,0.34) 58%, rgba(8,12,14,0.08) 100%)',
    mobileOverlay: 'linear-gradient(180deg, rgba(8,12,14,0.08) 0%, rgba(8,12,14,0.24) 30%, rgba(8,12,14,0.66) 60%, rgba(8,12,14,0.92) 100%)',
  },
  {
    number: 4,
    eyebrow: 'Operational Excellence',
    heading: 'Integrated Support Across Mining and Technical Services.',
    summary: 'Deep Rock combines equipment supply, technical consulting and mining support to help partners operate more effectively.',
    primaryCTA: {
      label: 'Discuss Your Need',
      href: '/contact',
    },
    secondaryCTA: {
      label: 'Our Services',
      href: '/services',
    },
    desktopImage: '/images/home/hero/technical-support-desktop.jpeg',
    mobileImage: '/images/home/hero/technical-support-mobile.jpeg',
    imageAlt: 'Ghanaian technicians maintaining heavy mining equipment in an industrial workshop',
    desktopObjectPosition: '58% center',
    mobileObjectPosition: '62% 38%',
    desktopOverlay: 'linear-gradient(90deg, rgba(8,12,14,0.86) 0%, rgba(8,12,14,0.70) 28%, rgba(8,12,14,0.34) 58%, rgba(8,12,14,0.08) 100%)',
    mobileOverlay: 'linear-gradient(180deg, rgba(8,12,14,0.08) 0%, rgba(8,12,14,0.24) 30%, rgba(8,12,14,0.66) 60%, rgba(8,12,14,0.92) 100%)',
  },
];

export const companyIntroductionContent = {
  heading: 'Responsible Trading. Capable Operations. Long-Term Value.',
  body: 'Deep Rock Co. Ltd specialises in precious minerals trading, particularly the buying and selling of gold, as well as responsible mining operations under a self-financing Aggregator Licence. Our work includes sourcing, purchasing, aggregating and marketing gold while supporting sustainable mining and technical activities.\n\nWe work closely with licensed small-scale miners, mining communities, investors, technical partners and institutions. Our aim is to provide reliable market access and responsible service solutions while operating with integrity, transparency and respect for applicable requirements.',
  image: '/images/home/company/company-overview.jpeg',
};

export const servicesOverviewContent = {
  eyebrow: 'SERVICES',
  heading: 'Integrated Services Across Trading, Mining and Technical Operations.',
  summary: 'Explore Deep Rock\'s service portfolio across gold trading, aggregation, mining, exploration, equipment, technical consulting, environmental responsibility and mining support.',
};

export const aggregationFeatureContent = {
  eyebrow: 'GOLD AGGREGATION',
  heading: 'Dependable Market Access Begins with Responsible Partnership.',
  body: 'Through its self-financing aggregation model, Deep Rock Co. Ltd works with licensed small-scale miners and mining communities to support responsible gold sourcing, purchasing and aggregation. Our focus is clear communication, commercial reliability and relationships designed for long-term value.',
  steps: [
    {
      number: '01',
      label: 'Begin the conversation',
      copy: 'Share your organisation, operating context and aggregation requirement.',
    },
    {
      number: '02',
      label: 'Review the engagement',
      copy: 'Discuss documentation, responsible-sourcing expectations and commercial needs.',
    },
    {
      number: '03',
      label: 'Define the pathway',
      copy: 'Agree the appropriate partnership or transaction process and maintain clear communication.',
    },
  ],
};

export const responsibleOperationsContent = {
  heading: 'Progress Must Be Responsible to Be Sustainable.',
  body: 'Deep Rock\'s commitment to responsible mining extends across sourcing, safety, environmental awareness, ethical business conduct and relationships with mining communities. We aim to make responsibility part of how opportunities are evaluated and delivered.',
  pillars: [
    {
      title: 'Responsible Sourcing',
      description: 'Engage appropriate partners and communicate sourcing expectations clearly.',
    },
    {
      title: 'Health & Safety',
      description: 'Place worker wellbeing, risk awareness and operational discipline at the centre of activity.',
    },
    {
      title: 'Environmental Stewardship',
      description: 'Consider environmental responsibilities as part of planning and operations.',
    },
    {
      title: 'Community Relationships',
      description: 'Build communication and long-term trust with the communities connected to mining activity.',
    },
  ],
};

import type { ValueCardVariant } from '@/components/icons/value-icons'

export interface ValueItem {
  title: string
  description: string
  key: string
  variant: ValueCardVariant
}

export const coreValuesContent = {
  eyebrow: 'OUR VALUES',
  heading: 'The Principles That Guide Our Work.',
  featured: {
    title: 'Integrity',
    description: 'We act honestly and protect the trust placed in our commercial and operational relationships.',
    key: 'integrity',
    variant: 'copper' as ValueCardVariant,
  },
  supporting: [
    {
      title: 'Transparency',
      description: 'We communicate clearly and support decisions with appropriate information.',
      key: 'transparency',
      variant: 'slate' as ValueCardVariant,
    },
    {
      title: 'Safety',
      description: 'We treat safe work and risk awareness as essential responsibilities.',
      key: 'safety',
      variant: 'copper' as ValueCardVariant,
    },
    {
      title: 'Excellence',
      description: 'We pursue disciplined execution, learning and continuous improvement.',
      key: 'excellence',
      variant: 'slate' as ValueCardVariant,
    },
    {
      title: 'Sustainability',
      description: 'We consider long-term environmental, social and commercial value.',
      key: 'sustainability',
      variant: 'copper' as ValueCardVariant,
    },
    {
      title: 'Accountability',
      description: 'We take responsibility for commitments, decisions and outcomes.',
      key: 'accountability',
      variant: 'slate' as ValueCardVariant,
    },
    {
      title: 'Customer Focus',
      description: 'We listen carefully and shape our engagement around legitimate partner needs.',
      key: 'customer-focus',
      variant: 'copper' as ValueCardVariant,
    },
  ],
};

export const galleryContent = {
  eyebrow: 'GALLERY',
  heading: 'A Closer Look at Our Operations.',
  summary: 'A visual record of Deep Rock\'s trading, aggregation and mining activity across Ghana.',
};

export const partnershipCTAContent = {
  heading: 'Build the Next Opportunity with Deep Rock Co. Ltd',
  body: 'Speak with our team about gold trading, aggregation partnerships, mining operations, exploration or technical support.',
  primaryCTA: {
    label: 'Partner With Us',
    href: '/contact?enquiry=partnership',
  },
  secondaryCTA: {
    label: 'Call +233 54 170 3325',
    href: 'tel:+233541703325',
  },
};
