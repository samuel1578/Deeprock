// DeepRock Leadership Content

export interface LeadershipMember {
  name: string;
  role: string;
  image: string;
}

export const leadershipTeam: LeadershipMember[] = [
  {
    name: 'Maxwell Boakye (Campbell)',
    role: 'Managing Director & Chief Executive Officer',
    image: '/images/home/team/md.jpg',
  },
  {
    name: 'Raymond Edem Tameklo',
    role: 'Director of Operations',
    image: '/images/home/team/kelvin-siriboe.jpg',
  },
  {
    name: 'Kelvin Siriboe',
    role: 'Trading & Aggregation Manager',
    image: '/images/home/team/kelvin-siri.jpg',
  },
  {
    name: 'Alidu Issah',
    role: 'Exploration Manager',
    image: '/images/home/team/alidu-issah.jpg',
  },
  {
    name: 'Lawrence Kokuvi Afodoanyi, CA',
    role: 'Finance & Administration Manager',
    image: '/images/home/team/lawrence-afodoanyi.jpg',
  },
  {
    name: 'Ishmael Seidu Mumuni',
    role: 'Health, Safety & Environment (HSE) Manager',
    image: '/images/home/team/ishmael-mumuni.jpg',
  },
  {
    name: 'Elizabeth Boakye',
    role: 'Business Development Manager',
    image: '/images/home/team/elizabeth-boakye.jpg',
  },
];

export const leadershipIntroduction = 'Deep Rock Mining Co. Ltd is led by professionals responsible for trading, operations, exploration, finance, health and safety, environmental management and business development.';

export const leadershipFeatureHeading = 'Experienced Leadership Across Trading, Operations and Technical Services.';

export const leadershipFeatureBody = 'Deep Rock Mining Co. Ltd is led by professionals with responsibilities spanning precious minerals trading, mining operations, exploration, finance, health and safety, environmental management and business development.';

export const leadershipFeaturedPerson = leadershipTeam[0];

export const leadershipCompanyDirectionStatement = 'Experienced professionals guide Deep Rock\'s commercial strategy, operational execution, and commitment to responsible trading and mining. The company aims to build long-term value for partners, communities, and stakeholders through disciplined execution and transparent engagement.';
