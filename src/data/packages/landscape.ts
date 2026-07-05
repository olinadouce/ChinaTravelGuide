import type { TravelPackage } from '@/types';

const ROOT = 'packet/自然之旅/自然之旅专题6条线路word+html';

export const landscapePackages: TravelPackage[] = [
  {
    id: 'pkg-east-china-mountains',
    slug: 'east-china-mountains',
    themeId: 'landscape',
    name: 'East China Mountains: Granite Peaks & Danxia Rivers',
    destination: 'Huangshan · Sanqingshan · Wuyishan',
    duration: '12-14 days',
    description:
      'A first-time-friendly nature route connecting Huangshan granite peaks and sea of clouds, Sanqingshan cliff walkways, and Wuyishan Danxia cliffs with the Nine-Bend Stream.',
    shortDescription:
      'Sea of clouds on Huangshan · cliff walkways of Sanqingshan · bamboo rafts on the Nine-Bend Stream — a three-icon East China loop.',
    coverImage:
      'https://loremflickr.com/1400/1000/huangshan,china,mountains?random=21',
    badge: 'Classic Mountains',
    popular: true,
    highlights: [
      'Huangshan sunrise sea-of-clouds',
      'Sanqingshan cliff walkways',
      'Wuyishan Nine-Bend Stream bamboo rafting',
      'Hongcun & Huangling Huizhou villages',
    ],
    tags: ['Mountains', 'UNESCO', 'Photography', 'Hiking'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/East_China_Mountains_Web_Guides/East_China_Mountains_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/East_China_Mountains_Web_Guides/East_China_Mountains_Full_Guide.html`,
  },
  {
    id: 'pkg-gansu-qinghai',
    slug: 'gansu-qinghai',
    themeId: 'landscape',
    name: 'Gansu & Qinghai: Plateau Mirror & Desert Stars',
    destination: 'Lanzhou · Qinghai Lake · Chaka · Dunhuang',
    duration: '8-10 days',
    description:
      'Cross the Qinghai-Tibet plateau edge: mirror-salt lakes, rainbow Danxia, singing sand dunes and starry desert camps.',
    shortDescription:
      "From Qinghai Lake to Crescent Lake — a panoramic sweep of plateau, yardang, salt lake and Gobi.",
    coverImage:
      'https://loremflickr.com/1400/1000/qinghai,china,lake?random=22',
    badge: 'Plateau Secrets',
    popular: true,
    highlights: [
      'Qinghai Lake sunrise',
      'Chaka Salt Lake mirror reflection',
      'Zhangye Rainbow Danxia',
      'Mogao Caves & Mingsha Mountain',
    ],
    tags: ['Plateau', 'Desert', 'Photography', 'Stargazing'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/Gansu_Qinghai_Web_Guides/Gansu_Qinghai_Nature_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Gansu_Qinghai_Web_Guides/Gansu_Qinghai_Nature_Full_Guide.html`,
  },
  {
    id: 'pkg-northwest-yunnan',
    slug: 'northwest-yunnan',
    themeId: 'landscape',
    name: 'Northwest Yunnan: Shangri-La & Snow Mountains',
    destination: 'Lijiang · Shangri-La · Meili Snow Mountain',
    duration: '7-9 days',
    description:
      'Tiger Leaping Gorge trek, Meili Snow Mountain sunrise, Shangri-La monastery and old-town Lijiang.',
    shortDescription:
      'Tiger Leaping Gorge trek + Meili sunrise + Old Town of Dukezong — a deep dive into Yunnan-Tibet culture.',
    coverImage:
      'https://loremflickr.com/1400/1000/yunnan,china,mountains?random=23',
    badge: 'Snow Trek',
    highlights: [
      'Tiger Leaping Gorge high trail',
      'Meili Snow Mountain sunrise',
      'Songzanlin Monastery',
      'Old Town of Lijiang at night',
    ],
    tags: ['Trekking', 'Snow Mountain', 'Tibetan Culture'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/Northwest_Yunnan_Web_Guides/Northwest_Yunnan_Nature_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Northwest_Yunnan_Web_Guides/Northwest_Yunnan_Nature_Full_Guide.html`,
  },
  {
    id: 'pkg-south-china-karst',
    slug: 'south-china-karst',
    themeId: 'landscape',
    name: 'South China Karst: Caves & Rice Terraces',
    destination: 'Libo · Xingyi · Luoping',
    duration: '6-7 days',
    description:
      'UNESCO karst landscapes: the cone peaks of Libo, Maling River canyon and Luoping rapeseed terraces in spring.',
    shortDescription:
      'Karst cone peaks, underground rivers and a sea of rapeseed flowers across the southern Yunnan-Guizhou plateau.',
    coverImage:
      'https://loremflickr.com/1400/1000/guizhou,karst,china?random=24',
    badge: 'Karst',
    highlights: [
      'Libo Xiaoqikong',
      'Maling River Canyon',
      'Wanfenglin forest of peaks',
      'Luoping rapeseed flower sea (Feb-Mar)',
    ],
    tags: ['Karst', 'Caves', 'Spring Flowers'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/South_China_Karst_Web_Guides/South_China_Karst_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/South_China_Karst_Web_Guides/South_China_Karst_Full_Guide.html`,
  },
  {
    id: 'pkg-western-sichuan',
    slug: 'western-sichuan',
    themeId: 'landscape',
    name: 'Western Sichuan: Sacred Mountains & Lakes',
    destination: 'Chengdu · Mt. Siguniang · Daocheng Yading',
    duration: '8-10 days',
    description:
      'Daocheng Yading sacred lakes, Siguniang mountain and the Sichuan-Tibet highway panorama loop.',
    shortDescription:
      'From the Chengdu Plain westward to Daocheng Yading — "the last pure land on the blue planet".',
    coverImage:
      'https://loremflickr.com/1400/1000/sichuan,china,mountains?random=25',
    badge: 'Western Sichuan Loop',
    popular: true,
    highlights: [
      'Mt. Siguniang Shuangqiao Valley',
      'Daocheng Yading three sacred mountains',
      'Xinduqiao photographer corridor',
      'Sichuan-Tibet Highway 318 scenery',
    ],
    tags: ['Plateau', 'Sacred Lakes', 'Road Trip'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/Western_Sichuan_Web_Guides/Western_Sichuan_Nature_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Western_Sichuan_Web_Guides/Western_Sichuan_Nature_Full_Guide.html`,
  },
  {
    id: 'pkg-zhangjiajie-enshi',
    slug: 'zhangjiajie-enshi',
    themeId: 'landscape',
    name: 'Zhangjiajie & Enshi Canyon',
    destination: 'Zhangjiajie · Enshi',
    duration: '6-7 days',
    description:
      'Avatar-inspired pillar peaks plus the deepest slot canyons of Enshi: a vertical landscape adventure.',
    shortDescription:
      'The real-life Avatar mountains paired with Enshi\'s deep slot canyons and Pingshan — a vertical landscape double-bill.',
    coverImage:
      'https://loremflickr.com/1400/1000/zhangjiajie,china,mountains?random=26',
    badge: 'Floating Peaks',
    highlights: [
      'Zhangjiajie National Forest Park',
      'Tianmen Mountain glass skywalk',
      'Enshi Grand Canyon',
      'Pingshan Canyon (China’s Semporna)',
    ],
    tags: ['Avatar Mountains', 'Glass Bridge', 'Canyon'],
    pointsCost: 80,
    freeHtmlPath: `${ROOT}/Zhangjiajie_Enshi_Web_Guides/Zhangjiajie_Enshi_Canyon_Free_Guide.html`,
    paidHtmlPath: `${ROOT}/Zhangjiajie_Enshi_Web_Guides/Zhangjiajie_Enshi_Canyon_Full_Guide.html`,
  },
];