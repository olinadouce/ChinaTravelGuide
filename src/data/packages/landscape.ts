import type { TravelPackage } from '@/types';

const ROOT = 'packet/鑷劧涔嬫梾/鑷劧涔嬫梾涓撻6鏉＄嚎璺痺ord+html';

export const landscapePackages: TravelPackage[] = [
  {
    id: 'pkg-east-china-mountains',
    slug: 'east-china-mountains',
    themeId: 'landscape',
    name: 'East China Mountains: Granite Peaks & Danxia Rivers',
    destination: 'Huangshan 路 Sanqingshan 路 Wuyishan',
    duration: '12-14 days',
    description:
      'A first-time-friendly nature route connecting Huangshan granite peaks and sea of clouds, Sanqingshan cliff walkways, and Wuyishan Danxia cliffs with the Nine-Bend Stream.',
    shortDescription:
      'Sea of clouds on Huangshan 路 cliff walkways of Sanqingshan 路 bamboo rafts on the Nine-Bend Stream 鈥?a three-icon East China loop.',
    coverImage:
      '/packages/covers/east-china-mountains.png',
    badge: 'Classic Mountains',
    popular: true,
    highlights: [
      'Huangshan sunrise sea-of-clouds',
      'Sanqingshan cliff walkways',
      'Wuyishan Nine-Bend Stream bamboo rafting',
      'Hongcun & Huangling Huizhou villages',
    ],
    tags: ['Mountains', 'UNESCO', 'Photography', 'Hiking'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/East_China_Mountains_Web_Guides/East_China_Mountains_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/East_China_Mountains_Web_Guides/East_China_Mountains_Full_Guide.html`,
  },
  {
    id: 'pkg-gansu-qinghai',
    slug: 'gansu-qinghai',
    themeId: 'landscape',
    name: 'Gansu & Qinghai: Plateau Mirror & Desert Stars',
    destination: 'Lanzhou 路 Qinghai Lake 路 Chaka 路 Dunhuang',
    duration: '8-10 days',
    description:
      'Cross the Qinghai-Tibet plateau edge: mirror-salt lakes, rainbow Danxia, singing sand dunes and starry desert camps.',
    shortDescription:
      "From Qinghai Lake to Crescent Lake 鈥?a panoramic sweep of plateau, yardang, salt lake and Gobi.",
    coverImage:
      '/packages/covers/gansu-qinghai.png',
    badge: 'Plateau Secrets',
    popular: true,
    highlights: [
      'Qinghai Lake sunrise',
      'Chaka Salt Lake mirror reflection',
      'Zhangye Rainbow Danxia',
      'Mogao Caves & Mingsha Mountain',
    ],
    tags: ['Plateau', 'Desert', 'Photography', 'Stargazing'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/Gansu_Qinghai_Web_Guides/Gansu_Qinghai_Nature_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Gansu_Qinghai_Web_Guides/Gansu_Qinghai_Nature_Full_Guide.html`,
  },
  {
    id: 'pkg-northwest-yunnan',
    slug: 'northwest-yunnan',
    themeId: 'landscape',
    name: 'Northwest Yunnan: Shangri-La & Snow Mountains',
    destination: 'Lijiang 路 Shangri-La 路 Meili Snow Mountain',
    duration: '7-9 days',
    description:
      'Tiger Leaping Gorge trek, Meili Snow Mountain sunrise, Shangri-La monastery and old-town Lijiang.',
    shortDescription:
      'Tiger Leaping Gorge trek + Meili sunrise + Old Town of Dukezong 鈥?a deep dive into Yunnan-Tibet culture.',
    coverImage:
      '/packages/covers/northwest-yunnan.jpg',
    badge: 'Snow Trek',
    highlights: [
      'Tiger Leaping Gorge high trail',
      'Meili Snow Mountain sunrise',
      'Songzanlin Monastery',
      'Old Town of Lijiang at night',
    ],
    tags: ['Trekking', 'Snow Mountain', 'Tibetan Culture'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/Northwest_Yunnan_Web_Guides/Northwest_Yunnan_Nature_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Northwest_Yunnan_Web_Guides/Northwest_Yunnan_Nature_Full_Guide.html`,
  },
  {
    id: 'pkg-south-china-karst',
    slug: 'south-china-karst',
    themeId: 'landscape',
    name: 'South China Karst: Caves & Rice Terraces',
    destination: 'Libo 路 Xingyi 路 Luoping',
    duration: '6-7 days',
    description:
      'UNESCO karst landscapes: the cone peaks of Libo, Maling River canyon and Luoping rapeseed terraces in spring.',
    shortDescription:
      'Karst cone peaks, underground rivers and a sea of rapeseed flowers across the southern Yunnan-Guizhou plateau.',
    coverImage:
      '/packages/covers/south-china-karst.png',
    badge: 'Karst',
    highlights: [
      'Libo Xiaoqikong',
      'Maling River Canyon',
      'Wanfenglin forest of peaks',
      'Luoping rapeseed flower sea (Feb-Mar)',
    ],
    tags: ['Karst', 'Caves', 'Spring Flowers'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/South_China_Karst_Web_Guides/South_China_Karst_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/South_China_Karst_Web_Guides/South_China_Karst_Full_Guide.html`,
  },
  {
    id: 'pkg-western-sichuan',
    slug: 'western-sichuan',
    themeId: 'landscape',
    name: 'Western Sichuan: Sacred Mountains & Lakes',
    destination: 'Chengdu 路 Mt. Siguniang 路 Daocheng Yading',
    duration: '8-10 days',
    description:
      'Daocheng Yading sacred lakes, Siguniang mountain and the Sichuan-Tibet highway panorama loop.',
    shortDescription:
      'From the Chengdu Plain westward to Daocheng Yading 鈥?"the last pure land on the blue planet".',
    coverImage:
      '/packages/covers/western-sichuan.png',
    badge: 'Western Sichuan Loop',
    popular: true,
    highlights: [
      'Mt. Siguniang Shuangqiao Valley',
      'Daocheng Yading three sacred mountains',
      'Xinduqiao photographer corridor',
      'Sichuan-Tibet Highway 318 scenery',
    ],
    tags: ['Plateau', 'Sacred Lakes', 'Road Trip'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/Western_Sichuan_Web_Guides/Western_Sichuan_Nature_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Western_Sichuan_Web_Guides/Western_Sichuan_Nature_Full_Guide.html`,
  },
  {
    id: 'pkg-zhangjiajie-enshi',
    slug: 'zhangjiajie-enshi',
    themeId: 'landscape',
    name: 'Zhangjiajie & Enshi Canyon',
    destination: 'Zhangjiajie 路 Enshi',
    duration: '6-7 days',
    description:
      'Avatar-inspired pillar peaks plus the deepest slot canyons of Enshi: a vertical landscape adventure.',
    shortDescription:
      'The real-life Avatar mountains paired with Enshi\'s deep slot canyons and Pingshan 鈥?a vertical landscape double-bill.',
    coverImage:
      '/packages/covers/zhangjiajie-enshi.png',
    badge: 'Floating Peaks',
    highlights: [
      'Zhangjiajie National Forest Park',
      'Tianmen Mountain glass skywalk',
      'Enshi Grand Canyon',
      'Pingshan Canyon (China鈥檚 Semporna)',
    ],
    tags: ['Avatar Mountains', 'Glass Bridge', 'Canyon'],
    pointsCost: 120,
    freeHtmlPath: `${ROOT}/Zhangjiajie_Enshi_Web_Guides/Zhangjiajie_Enshi_Canyon_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Zhangjiajie_Enshi_Web_Guides/Zhangjiajie_Enshi_Canyon_Full_Guide.html`,
  },
];
