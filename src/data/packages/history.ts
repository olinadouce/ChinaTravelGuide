import type { TravelPackage } from '@/types';

const ROOT = 'packet/历史文化-西安/鍘嗗彶鏂囧寲-瑗垮畨';

export const historyPackages: TravelPackage[] = [
  {
    id: 'pkg-xian-history',
    slug: 'xian-history',
    themeId: 'history',
    name: "Xi'an: Imperial Capitals & Terracotta Warriors",
    destination: "Xi'an · Shaanxi",
    duration: '4-5 days',
    description:
      "The complete Xi'an experience — Terracotta Army, ancient City Walls, Muslim Quarter food tour, Tang Dynasty show, and a Mt. Hua day trip.",
    shortDescription:
      'From the Terracotta Warriors to the City Walls, the Muslim Quarter to the Tang Dynasty show — a complete Xi\'an playbook.',
    coverImage:
      'https://loremflickr.com/1400/1000/xian,terracotta,china?random=31',
    badge: 'Heritage',
    popular: true,
    highlights: [
      'Terracotta Warriors Museum',
      'Ming City Wall cycling',
      'Muslim Quarter & Bell/Drum Towers',
      'Grand Tang Dynasty mall at night',
      'Mt. Hua day-trip (optional)',
    ],
    tags: ['History', 'UNESCO', 'Food', 'Day Trip'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/Xian free.html`,
    paidHtmlPath: `${ROOT}/Xian浠樿垂.html`,
  },
];