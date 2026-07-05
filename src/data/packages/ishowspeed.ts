import type { TravelPackage } from '@/types';

const ROOT = 'packet/甲亢哥中国行7个城市word方案包+html/甲亢哥中国行7个城市word方案包+html';

export const ishowspeedPackages: TravelPackage[] = [
  {
    id: 'pkg-ishowspeed-beijing',
    slug: 'ishowspeed-beijing',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Beijing: Forbidden City & Great Wall',
    destination: 'Beijing',
    duration: '4 days',
    description:
      'Follow the IShowSpeed livestream through the capital — Forbidden City deep dive, Great Wall Mutianyu, hutong nights and Peking duck.',
    shortDescription:
      'Replay the Beijing livestream route — Forbidden City / Great Wall / hutongs / Peking duck in one playbook.',
    coverImage:
      'https://loremflickr.com/1400/1000/beijing,forbidden,china?random=51',
    badge: 'IShowSpeed Edition',
    popular: true,
    highlights: [
      'Forbidden City & Jingshan Park',
      'Mutianyu Great Wall',
      'Nanluoguxiang / Shichahai hutongs',
      'Quanjude Peking duck',
    ],
    tags: ['IShowSpeed', 'Beijing', 'Heritage'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/IShowSpeed_Beijing_Free_Guide_Final.html`,
    paidHtmlPath: `${ROOT}/IShowSpeed_Beijing_Paid_Guide_Final.html`,
  },
  {
    id: 'pkg-ishowspeed-shanghai',
    slug: 'ishowspeed-shanghai',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Shanghai: The Bund & French Concession',
    destination: 'Shanghai',
    duration: '3 days',
    description:
      'Bund nights, Yu Garden morning, Nanjing Road buzz and Xiaolongbao pilgrimages in the French Concession.',
    shortDescription:
      'From the Bund to the French Concession — a neon-lit xiaolongbao crawl.',
    coverImage:
      'https://loremflickr.com/1400/1000/shanghai,bund,china?random=52',
    badge: 'IShowSpeed Edition',
    highlights: [
      'The Bund at night',
      'Yu Garden & Old City',
      'Wukang Road / French Concession',
      'Nanxiang xiaolongbao',
    ],
    tags: ['IShowSpeed', 'Shanghai', 'Food'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/IShowSpeed_Shanghai_Free_Guide_Final.html`,
    paidHtmlPath: `${ROOT}/IShowSpeed_Shanghai_Paid_Guide_Final.html`,
  },
  {
    id: 'pkg-ishowspeed-chengdu',
    slug: 'ishowspeed-chengdu',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Chengdu: Pandas & Hotpot',
    destination: 'Chengdu · Sichuan',
    duration: '4 days',
    description:
      'Panda Base, Jinli street, Sichuan opera face-changing, and the spiciest hotpot Chengdu has to offer.',
    shortDescription:
      'Watch pandas, dip hotpot, listen to Sichuan opera — the most authentic Chengdu life.',
    coverImage:
      'https://loremflickr.com/1400/1000/chengdu,panda,china?random=53',
    badge: 'IShowSpeed Edition',
    popular: true,
    highlights: [
      'Giant Panda Breeding Base',
      'Kuanzhai Alley',
      'Sichuan opera face-changing show',
      'Xiaolongkan / Diantai Lane hotpot',
    ],
    tags: ['IShowSpeed', 'Panda', 'Hotpot'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/IShowSpeed_Chengdu_Free_Guide_Final.html`,
    paidHtmlPath: `${ROOT}/IShowSpeed_Chengdu_Paid_Guide_Final.html`,
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
      '8D mountain-city, the through-building light rail and original nine-grid hotpot — a sensory overload.',
    coverImage:
      'https://loremflickr.com/1400/1000/chongqing,china,night?random=54',
    badge: 'IShowSpeed Edition',
    highlights: [
      'Hongya Cave night view',
      'Yangtze River cable car',
      'Liziba through-building light rail',
      'Peijie old hotpot',
    ],
    tags: ['IShowSpeed', 'Hotpot', 'Cyberpunk'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/IShowSpeed_Chongqing_Free_Guide_Final.html`,
    paidHtmlPath: `${ROOT}/IShowSpeed_Chongqing_Paid_Guide_Final.html`,
  },
  {
    id: 'pkg-ishowspeed-henan',
    slug: 'ishowspeed-henan',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Henan: Shaolin & Longmen Grottoes',
    destination: 'Zhengzhou · Luoyang · Dengfeng',
    duration: '4 days',
    description:
      'Shaolin kung fu shows, the Longmen Grottoes Buddha, Kaifeng night market and the Yellow River scenic area.',
    shortDescription:
      'Shaolin kung fu, the Longmen Vairocana Buddha and Kaifeng night market — a Central Plains deep dive.',
    coverImage:
      'https://loremflickr.com/1400/1000/luoyang,grottoes,china?random=55',
    badge: 'IShowSpeed Edition',
    highlights: [
      'Shaolin kung fu performance',
      'Longmen Grottoes',
      'Kaifeng Drum Tower night market',
      'Yellow River scenic area',
    ],
    tags: ['IShowSpeed', 'History', 'Martial Arts'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/IShowSpeed_Henan_Free_Guide_Final.html`,
    paidHtmlPath: `${ROOT}/IShowSpeed_Henan_Paid_Guide_Final.html`,
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
      'Victoria Harbour nights, Star Ferry rides, Temple Street market and dim sum classics — the essential Hong Kong trio.',
    coverImage:
      'https://loremflickr.com/1400/1000/hongkong,harbour,china?random=56',
    badge: 'IShowSpeed Edition',
    highlights: [
      'Victoria Peak',
      'Star Ferry',
      'Temple Street / Ladies Market',
      'Dim sum & pineapple bun',
    ],
    tags: ['IShowSpeed', 'Hong Kong', 'Food'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/IShowSpeed_Hong_Kong_Free_Guide_Final.html`,
    paidHtmlPath: `${ROOT}/IShowSpeed_Hong_Kong_Paid_Guide_Final.html`,
  },
  {
    id: 'pkg-ishowspeed-shenzhen',
    slug: 'ishowspeed-shenzhen',
    themeId: 'ishowspeed',
    name: 'IShowSpeed Shenzhen: Tech & Coastal City',
    destination: 'Shenzhen · Guangdong',
    duration: '2-3 days',
    description:
      'Window of the World, Splendid China, OCT-LOFT creative park and the tech flagship stores of Huaqiangbei.',
    shortDescription:
      'From Window of the World to Huaqiangbei — feel Shenzhen\'s speed and coastline.',
    coverImage:
      'https://loremflickr.com/1400/1000/shenzhen,china,skyline?random=57',
    badge: 'IShowSpeed Edition',
    highlights: [
      'Window of the World / Splendid China',
      'OCT-LOFT Creative Culture Park',
      'Huaqiangbei electronics street',
      'Shenzhen Bay Park sunset',
    ],
    tags: ['IShowSpeed', 'Shenzhen', 'Tech'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/IShowSpeed_Shenzhen_Free_Guide_Final.html`,
    // Shenzhen currently only has a free version; paid version falls back to the free HTML.
    paidHtmlPath: `${ROOT}/IShowSpeed_Shenzhen_Free_Guide_Final.html`,
  },
];