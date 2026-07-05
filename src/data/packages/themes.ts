import type { PackageTheme } from '@/types';

export const themes: PackageTheme[] = [
  {
    id: 'landscape',
    name: 'Landscape & Nature',
    nameEn: 'Landscape & Nature',
    tagline: 'Mountains, rivers and untouched wilderness',
    description:
      "Hand-crafted nature routes across China's most iconic geological wonders — Huangshan's sea of clouds, Zhangjiajie's pillar peaks, the Qinghai plateau mirror lakes, Western Sichuan sacred lakes, Northwest Yunnan glaciers, and South China karst.",
    icon: 'Mountain',
    accent: 'jade',
    coverImage:
      'https://loremflickr.com/1600/900/china,mountains,landscape?random=11',
    gradient:
      'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(14,116,144,0.18) 100%)',
  },
  {
    id: 'history',
    name: 'History & Heritage',
    nameEn: 'History & Heritage',
    tagline: 'Walk where dynasties once ruled',
    description:
      'Heritage-themed deep dives anchored by the 13-dynasty capital Xi\'an — Terracotta Warriors, the Ming city walls, the Muslim Quarter, and Tang Dynasty performance culture.',
    icon: 'Landmark',
    accent: 'primary',
    coverImage:
      'https://loremflickr.com/1600/900/xian,terracotta,china?random=12',
    gradient:
      'linear-gradient(135deg, rgba(220,38,38,0.18) 0%, rgba(245,158,11,0.18) 100%)',
  },
  {
    id: 'themed',
    name: 'Themed Routes',
    nameEn: 'Themed Routes',
    tagline: 'Cantonese dim sum · karst rivers · Tibetan plateau',
    description:
      "Three distinctive themed journeys — the food culture of Guangzhou, the karst landscapes of Guilin & Longji rice terraces, and the high-altitude pilgrimage route of Tibet.",
    icon: 'Compass',
    accent: 'accent',
    coverImage:
      'https://loremflickr.com/1600/900/guilin,karst,china?random=13',
    gradient:
      'linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(217,119,6,0.18) 100%)',
  },
  {
    id: 'ishowspeed',
    name: 'IShowSpeed China Highlights',
    nameEn: 'IShowSpeed China Highlights',
    tagline: 'Follow the livestream across 7 cities',
    description:
      'Relive the IShowSpeed China tour across seven cities — Beijing, Shanghai, Chengdu, Chongqing, Henan, Shenzhen and Hong Kong — with the exact stops, food spots and transit moves from the livestream.',
    icon: 'Sparkles',
    accent: 'secondary',
    coverImage:
      'https://loremflickr.com/1600/900/beijing,shanghai,china?random=14',
    gradient:
      'linear-gradient(135deg, rgba(31,41,55,0.20) 0%, rgba(220,38,38,0.16) 100%)',
  },
];