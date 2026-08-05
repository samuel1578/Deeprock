// DeepRock Mining Ltd - Site Configuration
// Global company and contact information

export const siteConfig = {
  name: 'Deep Rock Co. Ltd',
  shortName: 'Deep Rock',
  description: 'Deep Rock Mining Ltd is a wholly Ghanaian precious minerals trading and mining company focused on responsible gold buying, aggregation, mining and technical services.',
  tagline: 'Responsible Gold Trading. Sustainable Mining. Lasting Value.',
  alternateTagline: 'Ghanaian-owned. Responsibility-led.',
} as const;

export const companyContact = {
  phone: '+233 54 170 3325',
  phoneLink: 'tel:+233541703325',
  email: 'Deeprockmining.gh@gmail.com',
  emailLink: 'mailto:Deeprockmining.gh@gmail.com',
  address: 'The Emporium, 3rd Floor, M&ouml;venpick Ambassador Hotel, Independence Avenue, Ridge, Accra, Ghana',
  postalAddress: 'P.O. Box CT 3621, Cantonments, Accra',
  location: 'The Emporium, 3rd Floor, M&ouml;venpick Ambassador Hotel, Independence Avenue, Ridge, Accra, Ghana',
  locationLink: '/contact',
} as const;

export const companyInfo = {
  ownership: 'Wholly Ghanaian company',
  businessFocus: 'Precious minerals trading, particularly buying and selling gold, together with responsible mining operations under a self-financing Aggregator Licence.',
  vision: 'To become a leading and trusted precious minerals trading and mining company in Ghana and across Africa.',
  mission: 'To responsibly buy, aggregate, trade, and produce precious minerals while creating sustainable value for our customers, partners, communities, and shareholders.',
} as const;

export const coreValues = [
  'Integrity',
  'Transparency',
  'Safety',
  'Excellence',
  'Sustainability',
  'Accountability',
  'Customer Focus',
] as const;

export const footerStatement = 'Deep Rock Co. Ltd is a wholly Ghanaian company focused on responsible precious minerals trading, gold aggregation, mining operations and technical support services.';
