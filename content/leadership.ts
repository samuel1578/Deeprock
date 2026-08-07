// DeepRock Leadership Content

export interface LeadershipMember {
  name: string;
  role: string;
  image: string;
  biography?: string;
}

export const leadershipTeam: LeadershipMember[] = [
  {
    name: 'Maxwell Boakye (Campbell)',
    role: 'Managing Director & Chief Executive Officer',
    image: '/images/home/team/md.jpg',
    biography: 'Biography to be supplied and approved by the client. Do not invent credentials or career history.',
  },
  {
    name: 'Raymond Edem Tameklo',
    role: 'Director of Operations',
    image: '/images/home/team/kelvin-siriboe.jpg',
    biography: 'Biography to be supplied and approved by the client. Do not invent credentials or career history.',
  },
  {
    name: 'Kelvin Siriboe',
    role: 'Trading & Aggregation Manager',
    image: '/images/home/team/kelvin-siri.jpg',
    biography: 'Biography to be supplied and approved by the client. Do not invent credentials or career history.',
  },
  {
    name: 'Alidu Issah',
    role: 'Exploration Manager',
    image: '/images/home/team/alidu-issah.jpg',
    biography: 'Biography to be supplied and approved by the client. Do not invent credentials or career history.',
  },
  {
    name: 'Lawrence Kokuvi Afodoanyi, CA',
    role: 'Finance & Administration Manager',
    image: '/images/home/team/lawrence-afodoanyi.jpg',
    biography: 'Biography to be supplied and approved by the client. Do not invent credentials or career history.',
  },
  {
    name: 'Ishmael Seidu Mumuni',
    role: 'Health, Safety & Environment (HSE) Manager',
    image: '/images/home/team/ishmael-mumuni.jpg',
    biography: 'Biography to be supplied and approved by the client. Do not invent credentials or career history.',
  },
  {
    name: 'Elizabeth Boakye',
    role: 'Business Development Manager',
    image: '/images/home/team/elizabeth-boakye.jpg',
    biography: 'Biography to be supplied and approved by the client. Do not invent credentials or career history.',
  },
];

export const leadershipIntroduction = 'Deep Rock Mining Co. Ltd is led by professionals responsible for trading, operations, exploration, finance, health and safety, environmental management and business development. The current profile supplies names and roles only; biographies and personal statements remain client dependencies.';

export const leadershipFeatureHeading = 'Experienced Leadership Across Trading, Operations and Technical Services.';

export const leadershipFeatureBody = 'Deep Rock Mining Co. Ltd is led by professionals with responsibilities spanning precious minerals trading, mining operations, exploration, finance, health and safety, environmental management and business development.';

export const leadershipFeaturedPerson = leadershipTeam[0];

export const leadershipCompanyDirectionStatement = 'Experienced professionals guide Deep Rock\'s commercial strategy, operational execution, and commitment to responsible trading and mining. The company aims to build long-term value for partners, communities, and stakeholders through disciplined execution and transparent engagement.';
