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
      '/packages/covers/xian-history.png',
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
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/Xian free.html`,
    paidHtmlPath: `${ROOT}/Xian浠樿垂.html`,
  },
  {
    id: 'pkg-henan-history',
    slug: 'henan-history',
    themeId: 'history',
    name: 'Henan: Shaolin Kung Fu & Longmen Grottoes',
    destination: 'Zhengzhou · Luoyang · Dengfeng · Kaifeng',
    duration: '4-5 days',
    description:
      'Walk in the footsteps of IShowSpeed through Central China — the birthplace of Chinese civilization. Shaolin kung fu, the Longmen Vairocana Buddha, Kaifeng night market and Yellow River scenery.',
    shortDescription:
      'From Shaolin kung fu to the Longmen Buddha, from Kaifeng Drum Tower night market to the Yellow River — a Central Plains deep dive into 3,000 years of Chinese history.',
    coverImage:
      '/packages/covers/henan-history.jpg',
    badge: 'Central Plains Heritage',
    popular: true,
    highlights: [
      'Shaolin kung fu live performance',
      'Longmen Grottoes (UNESCO)',
      'Kaifeng Drum Tower night market',
      'Yellow River scenic area',
    ],
    tags: ['History', 'UNESCO', 'Martial Arts', 'Heritage'],
    pointsCost: 120,
    // Files are served from /public/history/henan-history/
    freeHtmlPath: 'public/history/henan-history/free.html',
    paidHtmlPath: 'public/history/henan-history/paid.html',
  },
];
