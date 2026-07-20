import type { TravelPackage } from '@/types';

const ROOT = 'public/ishowspeed';

export const ishowspeedPackages: TravelPackage[] = [
  {
    id: 'pkg-ishowspeed-beijing',
    slug: 'ishowspeed-beijing',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Beijing: Forbidden City & Great Wall',
    destination: 'Beijing',
    duration: '4 days',
    description:
      'Follow the IShowSpeed livestream through the capital: Forbidden City deep dive, Great Wall Mutianyu, hutong nights and Peking duck.',
    shortDescription:
      'Replay the Beijing livestream route: Forbidden City / Great Wall / hutongs / Peking duck in one playbook.',
    coverImage: '/packages/covers/ishowspeed-beijing.jpg',
    badge: 'IShowSpeed Edition',
    popular: true,
    highlights: [
      'Forbidden City & Jingshan Park',
      'Mutianyu Great Wall',
      'Nanluoguxiang / Shichahai hutongs',
      'Quanjude Peking duck',
    ],
    tags: ['IShowSpeed', 'Beijing', 'Heritage'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/beijing/free.html`,
    paidHtmlPath: `${ROOT}/beijing/paid.html`,
  },
  {
    id: 'pkg-ishowspeed-shanghai',
    slug: 'ishowspeed-shanghai',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Shanghai: The Bund & French Concession',
    destination: 'Shanghai',
    duration: '3 days',
    description:
      'Bund nights, Yu Garden morning, Nanjing Road buzz and xiaolongbao pilgrimages in the French Concession.',
    shortDescription:
      'From the Bund to the French Concession: a neon-lit xiaolongbao crawl.',
    coverImage: '/packages/covers/ishowspeed-shanghai.jpg',
    badge: 'IShowSpeed Edition',
    highlights: [
      'The Bund at night',
      'Yu Garden & Old City',
      'Wukang Road / French Concession',
      'Nanxiang xiaolongbao',
    ],
    tags: ['IShowSpeed', 'Shanghai', 'Food'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/shanghai/free.html`,
    paidHtmlPath: `${ROOT}/shanghai/paid.html`,
  },
  {
    id: 'pkg-ishowspeed-chengdu',
    slug: 'ishowspeed-chengdu',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Chengdu: Pandas & Hotpot',
    destination: 'Chengdu - Sichuan',
    duration: '4 days',
    description:
      'Panda Base, Jinli street, Sichuan opera face-changing, and the spiciest hotpot Chengdu has to offer.',
    shortDescription:
      'Watch pandas, dip hotpot, listen to Sichuan opera: the most authentic Chengdu life.',
    coverImage: '/packages/covers/ishowspeed-chengdu.jpg',
    badge: 'IShowSpeed Edition',
    popular: true,
    highlights: [
      'Giant Panda Breeding Base',
      'Kuanzhai Alley',
      'Sichuan opera face-changing show',
      'Xiaolongkan / Diantai Lane hotpot',
    ],
    tags: ['IShowSpeed', 'Panda', 'Hotpot'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/chengdu/free.html`,
    paidHtmlPath: `${ROOT}/chengdu/paid.html`,
  },
  {
    id: 'pkg-ishowspeed-chongqing',
    slug: 'ishowspeed-chongqing',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Chongqing: Mountain City & Spicy Hotpot',
    destination: 'Chongqing',
    duration: '3-4 days',
    description:
      'Hongya Cave night, the Yangtze cable car crossing, the through-building light rail, and the original Chongqing hotpot.',
    shortDescription:
      '8D mountain-city, the through-building light rail and original nine-grid hotpot: a sensory overload.',
    coverImage: '/packages/covers/ishowspeed-chongqing.jpg',
    badge: 'IShowSpeed Edition',
    highlights: [
      'Hongya Cave night view',
      'Yangtze River cable car',
      'Liziba through-building light rail',
      'Peijie old hotpot',
    ],
    tags: ['IShowSpeed', 'Hotpot', 'Cyberpunk'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/chongqing/free.html`,
    paidHtmlPath: `${ROOT}/chongqing/paid.html`,
  },
  {
    id: 'pkg-ishowspeed-hong-kong',
    slug: 'ishowspeed-hong-kong',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Hong Kong: Harbour & Street Markets',
    destination: 'Hong Kong SAR',
    duration: '3 days',
    description:
      'Victoria Peak, Star Ferry, Temple Street night market, dim sum classics and the Symphony of Lights show.',
    shortDescription:
      'Victoria Harbour nights, Star Ferry rides, Temple Street market and dim sum classics: the essential Hong Kong trio.',
    coverImage: '/packages/covers/ishowspeed-hong-kong.jpg',
    badge: 'IShowSpeed Edition',
    highlights: [
      'Victoria Peak',
      'Star Ferry',
      'Temple Street / Ladies Market',
      'Dim sum & pineapple bun',
    ],
    tags: ['IShowSpeed', 'Hong Kong', 'Food'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/hong-kong/free.html`,
    paidHtmlPath: `${ROOT}/hong-kong/paid.html`,
  },
  {
    id: 'pkg-ishowspeed-shenzhen',
    slug: 'ishowspeed-shenzhen',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Shenzhen: Tech & Coastal City',
    destination: 'Shenzhen - Guangdong',
    duration: '2-3 days',
    description:
      'Window of the World, Splendid China, OCT-LOFT creative park and the tech flagship stores of Huaqiangbei.',
    shortDescription:
      "From Window of the World to Huaqiangbei: feel Shenzhen's speed and coastline.",
    coverImage: '/packages/covers/ishowspeed-shenzhen.jpg',
    badge: 'IShowSpeed Edition',
    highlights: [
      'Window of the World / Splendid China',
      'OCT-LOFT Creative Culture Park',
      'Huaqiangbei electronics street',
      'Shenzhen Bay Park sunset',
    ],
    tags: ['IShowSpeed', 'Shenzhen', 'Tech'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/shenzhen/free.html`,
    paidHtmlPath: `${ROOT}/shenzhen/free.html`,
  },
];
