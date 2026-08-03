// DeepRock Sustainability Content

export interface SustainabilityPillar {
  title: string;
  slug: string;
  summary: string;
  route: string;
}

export interface SustainabilityPage {
  slug: string;
  heading: string;
  body: string;
  points: string[];
  image?: string;
}

export const sustainabilityPillars: SustainabilityPillar[] = [
  {
    title: 'Responsible Sourcing',
    slug: 'responsible-sourcing',
    summary: 'Clear partner expectations and attention to the origin and commercial pathway of precious minerals.',
    route: '/sustainability/responsible-sourcing',
  },
  {
    title: 'Health, Safety & Environment',
    slug: 'health-safety-environment',
    summary: 'Safety-conscious operations, environmental awareness and accountable risk management.',
    route: '/sustainability/health-safety-environment',
  },
  {
    title: 'Community Impact',
    slug: 'community-impact',
    summary: 'Respectful communication and long-term relationships with communities connected to mining activity.',
    route: '/sustainability/community-impact',
  },
];

export const sustainabilityOverviewContent = {
  heading: 'Responsibility Integrated into How We Work.',
  summary: 'DeepRock is committed to ethical gold trading, operational safety, environmental responsibility and long-term relationships with mining communities and partners.',
  introduction: 'Sustainability must be connected to decisions, responsibilities and evidence. DeepRock\'s website will communicate approved principles and activities without presenting unsupported targets or impact statistics.',
};

export const sustainabilityPages: Record<string, SustainabilityPage> = {
  'responsible-sourcing': {
    slug: 'responsible-sourcing',
    heading: 'Responsible Sourcing Begins with Clear Expectations.',
    body: 'DeepRock\'s responsible-sourcing approach is presented through appropriate partner engagement, clear documentation discussions, transparent communication and an understanding of the commercial and operational context. The approach focuses on engagement with licensed partners without describing a traceability system or audit programme unless verified details are supplied.',
    points: [
      'Engage appropriate and licensed partners',
      'Discuss relevant documentation and sourcing expectations',
      'Maintain clear commercial communication',
      'Escalate concerns through defined channels',
      'Review and improve approved processes over time',
    ],
  },
  'health-safety-environment': {
    slug: 'health-safety-environment',
    heading: 'Safe Operations and Environmental Responsibility Are Shared Duties.',
    body: 'DeepRock lists safety and sustainability among its core values and includes an HSE management role in its leadership team. The Health, Safety & Environment approach focuses on risk awareness, clear responsibility, operational discipline, environmental consideration and continuous learning.',
    points: [
      'Plan work with relevant risks in view',
      'Communicate responsibilities and reporting channels',
      'Support safe behaviour and concern escalation',
      'Consider environmental responsibilities during planning and operations',
      'Review outcomes and identify improvements',
    ],
  },
  'community-impact': {
    slug: 'community-impact',
    heading: 'Stronger Relationships Begin with Respectful Engagement.',
    body: 'Mining activity is connected to people and places. DeepRock\'s community engagement focuses on listening, realistic commitments, accessible feedback channels and long-term relationship building. The approach avoids project stories, donations or impact statistics until approved evidence is provided.',
    points: [
      'Respect local context and stakeholder perspectives',
      'Communicate clearly and at appropriate times',
      'Provide accessible channels for questions and feedback',
      'Avoid promises that have not been formally approved',
      'Share verified updates when material activity affects stakeholders',
    ],
  },
};

export function getSustainabilityPageBySlug(slug: string): SustainabilityPage | undefined {
  return sustainabilityPages[slug];
}

export function getPillarBySlug(slug: string): SustainabilityPillar | undefined {
  return sustainabilityPillars.find((pillar) => pillar.slug === slug);
}
