// Navigation structure and links

export interface NavLink {
  label: string;
  href: string;
}

export interface NavMenu extends NavLink {
  children?: NavLink[];
}

export const primaryNavigation: NavMenu[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about',
    children: [
      {
        label: 'Our Company',
        href: '/about',
      },
      {
        label: 'Mission, Vision & Values',
        href: '/about/mission-vision-values',
      },
      {
        label: 'Leadership',
        href: '/about/leadership',
      },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Gold Buying & Precious Minerals Trading',
        href: '/services/gold-buying-trading',
      },
      {
        label: 'Gold Aggregation',
        href: '/services/gold-aggregation',
      },
      {
        label: 'Mining Operations',
        href: '/services/mining-operations',
      },
      {
        label: 'Mineral Exploration',
        href: '/services/mineral-exploration',
      },
      {
        label: 'Mining Equipment Supply',
        href: '/services/mining-equipment-supply',
      },
      {
        label: 'Geological & Technical Consulting',
        href: '/services/geological-consulting',
      },
      {
        label: 'Environmental & Sustainability Services',
        href: '/services/environmental-sustainability',
      },
      {
        label: 'Mining Support Services',
        href: '/services/mining-support',
      },
    ],
  },
  {
    label: 'Sustainability',
    href: '/sustainability',
    children: [
      {
        label: 'Responsible Sourcing',
        href: '/sustainability/responsible-sourcing',
      },
      {
        label: 'Health, Safety & Environment',
        href: '/sustainability/health-safety-environment',
      },
      {
        label: 'Community Impact',
        href: '/sustainability/community-impact',
      },
    ],
  },
  {
    label: 'News & Insights',
    href: '/news',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
];

export const ctaPrimary = {
  label: 'Partner With Us',
  href: '/contact?enquiry=partnership',
};

// Footer navigation
export const footerSections = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Leadership', href: '/about/leadership' },
      { label: 'Our Values', href: '/about/mission-vision-values' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Gold Buying & Trading', href: '/services/gold-buying-trading' },
      { label: 'Gold Aggregation', href: '/services/gold-aggregation' },
      { label: 'Mining Operations', href: '/services/mining-operations' },
      { label: 'Exploration & Consulting', href: '/services/mineral-exploration' },
      { label: 'Equipment & Support', href: '/services/mining-equipment-supply' },
    ],
  },
  {
    title: 'Sustainability',
    links: [
      { label: 'Responsible Sourcing', href: '/sustainability/responsible-sourcing' },
      { label: 'Health & Safety', href: '/sustainability/health-safety-environment' },
      { label: 'Community Impact', href: '/sustainability/community-impact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'News & Insights', href: '/news' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms-of-use' },
    ],
  },
];
