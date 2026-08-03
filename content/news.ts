// DeepRock News & Insights Content

export type NewsCategory = 'All' | 'Company Insight' | 'Industry Insight' | 'HSE Insight' | 'Technical Insight' | 'Sustainability Insight' | 'Services Insight';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  image: string;
  excerpt: string;
  author: string;
  content: string[];
  cta?: {
    label: string;
    href: string;
  };
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'building-trust',
    slug: 'building-trust-across-the-gold-value-chain',
    title: 'Building Trust Across the Gold Value Chain',
    category: 'Company Insight',
    date: '1 August 2026',
    image: '/images/news/building-trust-gold-value-chain.webp',
    excerpt: 'Why integrity, transparency and accountable partnerships matter at every stage of precious minerals trading.',
    author: 'DeepRock Mining Ltd',
    content: [
      'Trust is an operating requirement. Precious minerals trading depends on more than the movement of a valuable commodity. It depends on clear relationships, credible documentation, responsible sourcing and confidence that each party understands its obligations. For DeepRock Mining Ltd, integrity and transparency are therefore not decorative brand values. They are the basis on which long-term commercial relationships should be built.',
      'Clear engagement with mining partners. Licensed miners and mining organisations need reliable channels through which they can discuss market access, aggregation and related support. A responsible trading company should communicate its requirements clearly, avoid unnecessary ambiguity and treat every commercial enquiry with consistency. That approach helps partners prepare the correct information and reduces avoidable friction.',
      'Accountability throughout the relationship. Accountability means keeping commitments, documenting decisions and addressing concerns promptly. It also means recognising that responsible gold trading has environmental, social and institutional implications. DeepRock\'s stated ambition is to create sustainable value for customers, partners, communities and shareholders, and that requires disciplined conduct throughout the relationship.',
      'A platform for responsible growth. As DeepRock develops its trading, aggregation, mining and technical services, the company\'s public website will provide a central source of verified information. Partners will be able to understand the company\'s service scope, leadership, values and contact channels before beginning a formal discussion.',
    ],
    featured: true,
    cta: {
      label: 'Discuss a Related Opportunity',
      href: '/contact',
    },
  },
  {
    id: 'responsible-aggregation',
    slug: 'why-responsible-gold-aggregation-matters',
    title: 'Why Responsible Gold Aggregation Matters',
    category: 'Industry Insight',
    date: '1 August 2026',
    image: '/images/news/responsible-gold-aggregation.webp',
    excerpt: 'A practical look at aggregation, responsible sourcing and dependable market access for licensed mining partners.',
    author: 'DeepRock Mining Ltd',
    content: [
      'Aggregation connects production with formal markets. Gold aggregation brings together material sourced from appropriate mining partners so it can move through a structured commercial pathway. Done responsibly, this process can improve communication, documentation and access to dependable buyers.',
      'The importance of responsible sourcing. A strong aggregation relationship should consider where gold comes from, whether the parties are appropriately licensed and whether the engagement reflects applicable requirements. Responsible sourcing is not a single statement on a website. It requires ongoing attention to documentation, partner expectations and operational conduct.',
      'Transparency supports stronger partnerships. Mining partners need to understand how an engagement begins, what information is required and how commercial discussions will progress. Transparent communication creates a more predictable experience and supports accountability on both sides.',
      'DeepRock\'s role. DeepRock operates under a self-financing Aggregator Licence and works with licensed small-scale miners and mining communities. Its public messaging focuses on responsible engagement and market access without presenting the company as a regulator or price-setting authority.',
    ],
    cta: {
      label: 'Discuss a Related Opportunity',
      href: '/contact',
    },
  },
  {
    id: 'safety-core',
    slug: 'safety-as-a-core-principle',
    title: 'Safety as a Core Principle in Mining Operations',
    category: 'HSE Insight',
    date: '1 August 2026',
    image: '/images/news/safety-core-principle.webp',
    excerpt: 'Safety must shape planning, communication and everyday decisions across mining and support activities.',
    author: 'DeepRock Mining Ltd',
    content: [
      'Safety begins before work starts. Responsible operations begin with understanding the task, the environment and the people who may be affected. Planning should identify relevant hazards, define responsibilities and ensure that expectations are understood before activity begins.',
      'Communication is part of risk control. Clear instructions, reporting channels and the willingness to raise concerns are essential. A safety culture is weakened when information is withheld or when people are uncertain about who should act.',
      'Learning and accountability. Operational excellence requires teams to review what happened, identify improvements and apply lessons consistently. Accountability is not limited to responding after an incident; it also includes maintaining standards during routine work.',
      'A visible organisational commitment. DeepRock lists safety among its core values and includes Health, Safety and Environment leadership within its management structure. The website makes that commitment visible while avoiding unsupported claims such as injury-free hours or certifications that have not been verified.',
    ],
    cta: {
      label: 'Discuss a Related Opportunity',
      href: '/contact',
    },
  },
  {
    id: 'geological-insight',
    slug: 'geological-insight-and-better-decisions',
    title: 'The Role of Geological Insight in Better Mining Decisions',
    category: 'Technical Insight',
    date: '1 August 2026',
    image: '/images/news/geological-insight-better-decisions.webp',
    excerpt: 'How disciplined geological investigation and clear technical communication support exploration and mining development.',
    author: 'DeepRock Mining Ltd',
    content: [
      'Understand before committing. Exploration and mining decisions involve technical, financial, environmental and community considerations. Geological information helps project stakeholders understand the opportunity and the uncertainty before committing resources.',
      'From field information to decisions. Field observations, available records and technical interpretation must be brought together in a way that supports practical decisions. The value is not simply in collecting information, but in explaining what that information means for the next stage of work.',
      'Integrated technical support. Geological consulting becomes more useful when it connects with exploration planning, mining operations, equipment needs and environmental responsibilities. DeepRock\'s service portfolio is designed to present these areas as related capabilities rather than isolated offerings.',
      'Communicate limitations clearly. Technical advice should explain assumptions, limitations and areas requiring further investigation. This protects decision quality and helps partners distinguish established information from preliminary interpretation.',
    ],
    cta: {
      label: 'Discuss a Related Opportunity',
      href: '/contact',
    },
  },
  {
    id: 'sustainability-beyond',
    slug: 'sustainability-beyond-compliance',
    title: 'Sustainability Beyond Compliance',
    category: 'Sustainability Insight',
    date: '1 August 2026',
    image: '/images/news/sustainability-beyond-compliance.webp',
    excerpt: 'Long-term value depends on environmental responsibility, stakeholder trust and decisions that remain defensible over time.',
    author: 'DeepRock Mining Ltd',
    content: [
      'A broader view of value. Mining and precious minerals trading create commercial opportunities, but they also affect workers, communities, land and institutions. Sustainable value requires these relationships to be considered alongside financial outcomes.',
      'Environmental responsibility. Environmental awareness should be integrated into planning and operations rather than treated as a final communication exercise. The appropriate actions will depend on the project context, applicable requirements and the responsibilities of each party.',
      'Communities and long-term relationships. Open engagement helps stakeholders understand proposed activities and raise relevant concerns. Strong relationships are built through consistent conduct, realistic commitments and clear channels for feedback.',
      'Evidence before claims. DeepRock\'s website communicates principles and approved activities. It must not publish invented carbon targets, rehabilitation statistics, community-investment figures or certification logos. Credibility is stronger when claims are specific, evidence-based and properly approved.',
    ],
    cta: {
      label: 'Discuss a Related Opportunity',
      href: '/contact',
    },
  },
  {
    id: 'integrated-support',
    slug: 'integrated-mining-support-services',
    title: 'An Integrated Approach to Mining Support Services',
    category: 'Services Insight',
    date: '1 August 2026',
    image: '/images/news/integrated-mining-support.webp',
    excerpt: 'Mining projects often need coordinated technical, operational, equipment and sustainability support rather than isolated services.',
    author: 'DeepRock Mining Ltd',
    content: [
      'Projects are interconnected. An exploration question may lead to equipment requirements, operational planning, environmental considerations or specialist technical advice. Treating every need as unrelated can create gaps in communication and responsibility.',
      'Define the need first. Effective support begins with a clear description of the operating context, desired outcome and constraints. That makes it easier to identify the relevant DeepRock service and determine whether additional specialist partners are required.',
      'Coordinate responsibilities. Each engagement should clarify scope, decision ownership, communication channels and commercial expectations. This is especially important where several service areas contribute to the same project.',
      'A scalable service model. DeepRock\'s current service portfolio includes mining support, equipment supply, geological consulting, exploration, operations and environmental services. The website groups these capabilities so prospective partners can understand how they relate and submit a focused enquiry.',
    ],
    cta: {
      label: 'Discuss a Related Opportunity',
      href: '/contact',
    },
  },
];

export const newsListingIntro = 'Company perspectives and practical insights on responsible gold trading, mining operations, safety, sustainability and technical services.';

export const newsCategories: NewsCategory[] = [
  'All',
  'Company Insight',
  'Industry Insight',
  'HSE Insight',
  'Technical Insight',
  'Sustainability Insight',
  'Services Insight',
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: NewsCategory): NewsArticle[] {
  if (category === 'All') return newsArticles;
  return newsArticles.filter((article) => article.category === category);
}

export function getFeaturedArticle(): NewsArticle | undefined {
  return newsArticles.find((article) => article.featured);
}

export function getLatestArticles(limit: number = 3): NewsArticle[] {
  return newsArticles.slice(0, limit);
}
