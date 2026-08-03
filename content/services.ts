// DeepRock Services Content

export type ServiceCategory = 'Trading & Aggregation' | 'Mining & Exploration' | 'Technical Services' | 'Responsible Operations';

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  image: string;
  summary: string;
  overview: string;
  capabilities: string[];
  targetAudience: string[];
  engagementSteps: string[];
  ctaHeading: string;
  ctaLink: string;
}

export const services: Service[] = [
  {
    id: 'gold-buying-trading',
    slug: 'gold-buying-trading',
    name: 'Gold Buying & Precious Minerals Trading',
    category: 'Trading & Aggregation',
    image: '/images/services/gold-buying-trading.webp',
    summary: 'A responsible and transparent approach to sourcing, purchasing and marketing gold and other precious minerals.',
    overview: 'DeepRock Mining Ltd participates in the precious minerals value chain through the buying and selling of gold. The service is designed around clear commercial engagement, responsible sourcing and dependable communication with mining and trading partners. The company presents itself as a commercial participant, not as a regulator or national authority, helping prospective partners begin a conversation without publishing prices, guarantees or unverified operational claims.',
    capabilities: [
      'Gold buying enquiries',
      'Precious minerals trading discussions',
      'Commercial engagement with licensed mining partners',
      'Aggregation-related market access',
      'Documented and transparent communication',
    ],
    targetAudience: [
      'Licensed small-scale miners',
      'Mining companies',
      'Precious minerals trading partners',
      'Institutional and commercial partners',
    ],
    engagementSteps: [
      'Submit a trading enquiry',
      'Discuss the source, scope and documentation requirements',
      'Complete the required commercial and compliance review',
      'Agree the appropriate transaction or partnership pathway',
    ],
    ctaHeading: 'Discuss Your Gold Buying & Precious Minerals Trading Requirement',
    ctaLink: '/contact?enquiry=service&service=gold-buying-trading',
  },
  {
    id: 'gold-aggregation',
    slug: 'gold-aggregation',
    name: 'Gold Aggregation',
    category: 'Trading & Aggregation',
    image: '/images/services/gold-aggregation.webp',
    summary: 'Gold aggregation under DeepRock\'s self-financing Aggregator Licence, connecting licensed mining partners with responsible market access.',
    overview: 'DeepRock\'s aggregation service focuses on sourcing, purchasing and combining gold from appropriate mining partners under its self-financing model. The service is described in clear commercial terms and linked strongly to integrity, transparency and responsible sourcing. The page presents the company\'s aggregation partnerships without implying that DeepRock licenses miners, sets national prices or exercises statutory authority.',
    capabilities: [
      'Aggregation partnership enquiries',
      'Engagement with licensed small-scale miners',
      'Responsible sourcing discussions',
      'Commercial coordination and market access',
      'Relationship management across the aggregation process',
    ],
    targetAudience: [
      'Licensed small-scale miners',
      'Mining communities and organised mining groups',
      'Gold trading partners',
      'Off-take and institutional partners',
    ],
    engagementSteps: [
      'Initial partner enquiry',
      'Eligibility and documentation discussion',
      'Commercial and responsible-sourcing review',
      'Aggregation engagement and ongoing communication',
    ],
    ctaHeading: 'Discuss Your Gold Aggregation Requirement',
    ctaLink: '/contact?enquiry=service&service=gold-aggregation',
  },
  {
    id: 'mining-operations',
    slug: 'mining-operations',
    name: 'Mining Operations',
    category: 'Mining & Exploration',
    image: '/images/services/mining-operations.webp',
    summary: 'Responsible mining operations guided by safety, operational discipline and environmental awareness.',
    overview: 'DeepRock\'s mining operations service describes the company\'s commitment to conducting mining activities responsibly while creating sustainable value for stakeholders. The service is presented based on verified information, avoiding unsubstantiated claims about project locations, production capacity, equipment fleets or performance statistics until the client provides verified details.',
    capabilities: [
      'Mining operations planning',
      'Operational coordination',
      'Safety-conscious work practices',
      'Environmental consideration within operations',
      'Collaboration with technical and community stakeholders',
    ],
    targetAudience: [
      'Mining asset owners',
      'Investment and operating partners',
      'Licensed mining companies',
      'Technical and institutional partners',
    ],
    engagementSteps: [
      'Define the opportunity and operating context',
      'Review technical, commercial and regulatory requirements',
      'Develop an appropriate operating approach',
      'Coordinate implementation, monitoring and stakeholder communication',
    ],
    ctaHeading: 'Discuss Your Mining Operations Requirement',
    ctaLink: '/contact?enquiry=service&service=mining-operations',
  },
  {
    id: 'mineral-exploration',
    slug: 'mineral-exploration',
    name: 'Mineral Exploration',
    category: 'Mining & Exploration',
    image: '/images/services/mineral-exploration.webp',
    summary: 'Geological and exploration support for better-informed mineral development decisions.',
    overview: 'Mineral exploration requires disciplined field investigation, geological interpretation and clear technical communication. DeepRock\'s exploration service is presented as part of an integrated pathway from geological understanding to responsible mining decisions, avoiding claims about specific technologies, discoveries or exploration licences that have not been supplied.',
    capabilities: [
      'Exploration planning support',
      'Geological field assessment',
      'Technical interpretation and reporting',
      'Opportunity evaluation',
      'Coordination with specialist partners where required',
    ],
    targetAudience: [
      'Mining companies',
      'Exploration licence holders',
      'Investors evaluating mineral opportunities',
      'Project developers and technical partners',
    ],
    engagementSteps: [
      'Clarify the exploration objective',
      'Review available geological and project information',
      'Plan the appropriate field and technical work',
      'Communicate findings and recommended next steps',
    ],
    ctaHeading: 'Discuss Your Mineral Exploration Requirement',
    ctaLink: '/contact?enquiry=service&service=mineral-exploration',
  },
  {
    id: 'mining-equipment-supply',
    slug: 'mining-equipment-supply',
    name: 'Mining Equipment Supply',
    category: 'Technical Services',
    image: '/images/services/mining-equipment-supply.webp',
    summary: 'Mining equipment supply aligned with operational requirements and responsible use.',
    overview: 'DeepRock\'s equipment supply service focuses on understanding operational needs, discussing suitable equipment categories and supporting responsible procurement decisions. The service remains broad until the client confirms the exact supply catalogue, geographic coverage and service-level commitments, avoiding claims about brand names, inventory levels, warranties or delivery timeframes until confirmed.',
    capabilities: [
      'Equipment requirement discussions',
      'Supply enquiries for mining operations',
      'Coordination with approved supply partners',
      'Technical suitability considerations',
      'After-supply support discussions where applicable',
    ],
    targetAudience: [
      'Small-scale and established mining operators',
      'Mining contractors',
      'Exploration teams',
      'Project and procurement managers',
    ],
    engagementSteps: [
      'Submit the equipment requirement',
      'Review operating conditions and intended use',
      'Confirm availability and commercial terms',
      'Coordinate supply and agreed support',
    ],
    ctaHeading: 'Discuss Your Mining Equipment Supply Requirement',
    ctaLink: '/contact?enquiry=service&service=mining-equipment-supply',
  },
  {
    id: 'geological-consulting',
    slug: 'geological-consulting',
    name: 'Geological & Technical Consulting',
    category: 'Technical Services',
    image: '/images/services/geological-consulting.webp',
    summary: 'Geological and technical consulting that supports clearer decisions across exploration and mining activities.',
    overview: 'DeepRock offers geological and technical consulting as part of its service portfolio, emphasising structured problem definition, evidence-led analysis and practical communication. Professional credentials, laboratory partnerships and specialist methodologies are only included after client verification.',
    capabilities: [
      'Geological review and interpretation',
      'Technical advisory support',
      'Exploration and mining decision support',
      'Project scoping discussions',
      'Technical reporting and stakeholder communication',
    ],
    targetAudience: [
      'Mining and exploration companies',
      'Investors and project owners',
      'Small-scale mining organisations',
      'Technical and institutional partners',
    ],
    engagementSteps: [
      'Define the technical question',
      'Review the available information',
      'Agree the scope and required expertise',
      'Deliver findings, recommendations and next-step guidance',
    ],
    ctaHeading: 'Discuss Your Geological & Technical Consulting Requirement',
    ctaLink: '/contact?enquiry=service&service=geological-consulting',
  },
  {
    id: 'environmental-sustainability',
    slug: 'environmental-sustainability',
    name: 'Environmental & Sustainability Services',
    category: 'Responsible Operations',
    image: '/images/services/environmental-sustainability.webp',
    summary: 'Environmental and sustainability support that places responsibility alongside operational progress.',
    overview: 'DeepRock states a commitment to environmental responsibility and sustainable mining. The environmental and sustainability service explains the principles that guide environmental consideration, responsible sourcing and long-term stakeholder value, without publishing invented ESG targets, carbon figures, reclamation statistics or certification badges.',
    capabilities: [
      'Environmental and sustainability planning support',
      'Responsible-sourcing guidance',
      'Stakeholder and community consideration',
      'Operational environmental awareness',
      'Support for policy and process development',
    ],
    targetAudience: [
      'Mining operators',
      'Exploration teams',
      'Project owners and investors',
      'Communities and institutional partners',
    ],
    engagementSteps: [
      'Understand the operation and stakeholder context',
      'Identify material environmental and sustainability considerations',
      'Define practical actions and responsibilities',
      'Review progress and communicate outcomes transparently',
    ],
    ctaHeading: 'Discuss Your Environmental & Sustainability Services Requirement',
    ctaLink: '/contact?enquiry=service&service=environmental-sustainability',
  },
  {
    id: 'mining-support',
    slug: 'mining-support',
    name: 'Mining Support Services',
    category: 'Technical Services',
    image: '/images/services/mining-support.webp',
    summary: 'Practical support services that help mining and exploration activities operate more effectively.',
    overview: 'DeepRock\'s mining support service brings together commercial, technical and operational assistance according to the needs of a project or partner. The service remains broad until the client confirms the exact support catalogue, geographic coverage and service-level commitments.',
    capabilities: [
      'Operational support enquiries',
      'Technical coordination',
      'Partner and supplier coordination',
      'Project support planning',
      'Integrated access to related DeepRock services',
    ],
    targetAudience: [
      'Mining and exploration companies',
      'Licensed small-scale miners',
      'Project developers',
      'Technical contractors and investors',
    ],
    engagementSteps: [
      'Describe the operating need',
      'Identify the relevant support workstream',
      'Agree scope, responsibilities and commercial terms',
      'Coordinate delivery and ongoing communication',
    ],
    ctaHeading: 'Discuss Your Mining Support Services Requirement',
    ctaLink: '/contact?enquiry=service&service=mining-support',
  },
];

export const servicesOverviewIntro = 'Every engagement begins with understanding the commercial or operational need. The website groups services so users can identify a relevant starting point and submit a focused enquiry.';

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category);
}
