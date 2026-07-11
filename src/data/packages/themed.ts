import type { TravelPackage } from '@/types';

const ROOT = 'packet/广州、桂林、西藏/广州、桂林、西藏';

export const themedPackages: TravelPackage[] = [
  {
    id: 'pkg-guangzhou',
    slug: 'guangzhou',
    themeId: 'themed',
    name: 'Guangzhou: Cantonese Food & Lingnan Culture',
    destination: 'Guangzhou · Guangdong',
    duration: '3-4 days',
    description:
      "Cantonese dim sum pilgrimages, the historic Pearl River waterfront, Shamian Island's European architecture, and modern Canton Tower nights.",
    shortDescription:
      'From morning dim sum to late-night snacks, from arcade lanes to the Pearl River night cruise — an authentic Guangzhou playbook.',
    coverImage:
      '/packages/covers/guangzhou.png',
    badge: 'Food Theme',
    popular: true,
    highlights: [
      'Dim sum at Dim Dou De / Tao Tao Ju',
      'Shamian Island European architecture',
      'Chen Clan Ancestral Hall Lingnan style',
      'Pearl River night cruise & Canton Tower',
    ],
    tags: ['Cantonese Food', 'Heritage', 'City'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/广州/guangzhou_free.html`,
    paidHtmlPath: `${ROOT}/广州/guangzhou_paid.html`,
  },
  {
    id: 'pkg-guilin-yangshuo-longji',
    slug: 'guilin-yangshuo-longji',
    themeId: 'themed',
    name: 'Guilin · Yangshuo · Longji Rice Terraces',
    destination: 'Guilin · Yangshuo · Longsheng',
    duration: '5-6 days',
    description:
      'Li River cruise to Yangshuo, countryside cycling, the Longji terraced rice paddies, and the Reed Flute Cave.',
    shortDescription:
      'Li River bamboo rafting + Yangshuo countryside cycling + Longji rice terraces — the classic northern-Guangxi triangle.',
    coverImage:
      '/packages/covers/guilin-yangshuo-longji.jpg',
    badge: 'Landscape Theme',
    popular: true,
    highlights: [
      'Li River bamboo raft (Yangti to Xingping)',
      'Yangshuo Ten-Mile Gallery cycling',
      'Longji terraced rice paddies',
      'Silver Cave / Reed Flute Cave',
    ],
    tags: ['Li River', 'Karst', 'Rice Terraces', 'Cycling'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/桂林/guilin_yangshuo_longji_free.html`,
    paidHtmlPath: `${ROOT}/桂林/guilin_yangshuo_longji_paid.html`,
  },
  {
    id: 'pkg-tibet',
    slug: 'tibet',
    themeId: 'themed',
    name: 'Tibet: Lhasa, Shigatse & Everest Base Camp',
    destination: 'Lhasa · Shigatse · Everest BC',
    duration: '7-9 days',
    description:
      'The Potala Palace, Jokhang Temple, Barkhor kora, the Karola glacier viewpoint, and Rongbuk monastery at Everest base camp.',
    shortDescription:
      'A high-plateau pilgrimage from the Potala Palace to the Everest Base Camp.',
    coverImage:
      '/packages/covers/tibet.webp',
    badge: 'Plateau Pilgrimage',
    highlights: [
      'Potala Palace',
      'Jokhang Temple & Barkhor Street',
      'Yamdrok Lake',
      'Mount Everest Base Camp',
    ],
    tags: ['Tibet', 'Plateau', 'Pilgrimage', 'Everest'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/西藏/xizang_free.html`,
    paidHtmlPath: `${ROOT}/西藏/xizang_paid.html`,
  },
];