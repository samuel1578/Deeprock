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
];

export const sustainabilityOverviewContent = {
  heading: 'Responsibility Integrated into How We Work.',
  summary: 'Deep Rock is committed to ethical gold trading, operational safety, environmental responsibility and long-term relationships with mining communities and partners.',
  introduction: 'Sustainability must be connected to decisions, responsibilities and evidence. Deep Rock\'s website will communicate approved principles and activities without presenting unsupported targets or impact statistics.',
};

export const sustainabilityPages: Record<string, SustainabilityPage> = {
  'responsible-sourcing': {
    slug: 'responsible-sourcing',
    heading: 'Responsible Sourcing Begins with Clear Expectations.',
    body: 'Deep Rock\'s responsible-sourcing approach is presented through appropriate partner engagement, clear documentation discussions, transparent communication and an understanding of the commercial and operational context. The approach focuses on engagement with licensed partners without describing a traceability system or audit programme unless verified details are supplied.',
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
    body: 'Deep Rock lists safety and sustainability among its core values and includes an HSE management role in its leadership team. The Health, Safety & Environment approach focuses on risk awareness, clear responsibility, operational discipline, environmental consideration and continuous learning.',
    points: [
      'Plan work with relevant risks in view',
      'Communicate responsibilities and reporting channels',
      'Support safe behaviour and concern escalation',
      'Consider environmental responsibilities during planning and operations',
      'Review outcomes and identify improvements',
    ],
  },
};

export function getSustainabilityPageBySlug(slug: string): SustainabilityPage | undefined {
  return sustainabilityPages[slug];
}

export function getPillarBySlug(slug: string): SustainabilityPillar | undefined {
  return sustainabilityPillars.find((pillar) => pillar.slug === slug);
}
