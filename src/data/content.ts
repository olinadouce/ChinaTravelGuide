import { Destination, HeroStat, Journey, PracticalGuide, SiteTool } from '@/types';

export const siteNavigation = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/journeys', label: 'Journeys' },
  { href: '/practical-info', label: 'Practical Info' },
  { href: '/tools', label: 'Travel Tools' },
  { href: '/forum', label: 'Forum' },
  { href: '/packages', label: 'Packages' },
];

export const heroImages = [
  'https://loremflickr.com/1600/900/china,travel?random=1',
  'https://loremflickr.com/1600/900/beijing,china?random=2',
  'https://loremflickr.com/1600/900/shanghai,skyline?random=3',
];

export const heroStats: HeroStat[] = [
  { value: '10+', label: 'Featured gateways' },
  { value: '6', label: 'Sample itineraries' },
  { value: '24/7', label: 'Planning mindset' },
  { value: '1', label: 'Unified travel hub' },
];

export const destinations: Destination[] = [
  {
    id: 'beijing',
    name: 'Beijing',
    slug: 'beijing',
    region: 'north',
    country: 'China',
    description:
      'China’s capital layers imperial landmarks, hutong neighborhoods, futuristic business districts, and some of the country’s most famous museums into one deep, high-impact first stop.',
    shortDescription: 'Imperial history, iconic walls, palaces, and a fast-moving capital city.',
    highlights: ['Forbidden City', 'Mutianyu Great Wall', 'Temple of Heaven', '798 Art Zone'],
    bestTime: 'September to November',
    avgTemperature: '12°C to 26°C',
    images: [
      'https://loremflickr.com/1400/1000/beijing,palace,china',
      'https://loremflickr.com/1400/1000/beijing,forbiddencity',
      'https://loremflickr.com/1400/1000/beijing,temple,china',
    ],
    rating: 4.8,
    reviewCount: 12543,
    tags: ['History', 'Architecture', 'Museums', 'First-time China'],
    coordinates: { lat: 39.9042, lng: 116.4074 },
    mustSee: [
      'Watch the city wake up around Jingshan Park before entering the palace core.',
      'Choose a restored Great Wall section like Mutianyu for easier logistics.',
      'Pair hutong walks with contemporary galleries for a fuller city contrast.',
    ],
    practicalInfo: {
      transport: 'Subway, taxi, airport express',
      language: 'Mandarin',
      currency: 'CNY (RMB)',
      idealStay: '3 to 4 days',
      airport: 'Beijing Capital or Beijing Daxing',
    },
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    slug: 'shanghai',
    region: 'east',
    country: 'China',
    description:
      'Shanghai is China’s most polished urban arrival point: skyline views, riverfront promenades, design hotels, historic concessions, and easy transport make it ideal for premium city breaks.',
    shortDescription: 'A global waterfront metropolis with Art Deco heritage and sleek modern energy.',
    highlights: ['The Bund', 'Shanghai Tower', 'Yu Garden', 'Former French Concession'],
    bestTime: 'March to May and September to November',
    avgTemperature: '15°C to 28°C',
    images: [
      'https://loremflickr.com/1400/1000/shanghai,china,skyline',
      'https://loremflickr.com/1400/1000/shanghai,bund,china',
      'https://loremflickr.com/1400/1000/shanghai,night,china',
    ],
    rating: 4.7,
    reviewCount: 18792,
    tags: ['City break', 'Night view', 'Shopping', 'Food'],
    coordinates: { lat: 31.2304, lng: 121.4737 },
    mustSee: [
      'Walk the Bund at blue hour and cross the river for skyline observation decks.',
      'Build one day around cafes, boutiques, and lanes in the French Concession.',
      'Use Shanghai as an easy entry or departure city for longer China itineraries.',
    ],
    practicalInfo: {
      transport: 'Metro, taxi, airport transfer',
      language: 'Mandarin and Shanghainese',
      currency: 'CNY (RMB)',
      idealStay: '2 to 4 days',
      airport: 'Pudong or Hongqiao',
    },
  },
  {
    id: 'xian',
    name: "Xi'an",
    slug: 'xian',
    region: 'west',
    country: 'China',
    description:
      'One of China’s great historic capitals, Xi’an combines the Terracotta Warriors, city walls, Muslim Quarter food culture, and Silk Road storytelling into a concentrated cultural stop.',
    shortDescription: 'An ancient capital that anchors classic China heritage itineraries.',
    highlights: ['Terracotta Warriors', 'Ancient City Wall', 'Muslim Quarter', 'Big Wild Goose Pagoda'],
    bestTime: 'March to May and September to November',
    avgTemperature: '10°C to 25°C',
    images: [
      'https://loremflickr.com/1400/1000/xian,terracotta,china',
      'https://loremflickr.com/1400/1000/xian,terracotta',
      'https://loremflickr.com/1400/1000/xian,ancient,wall',
    ],
    rating: 4.9,
    reviewCount: 9824,
    tags: ['Ancient capital', 'Silk Road', 'Archaeology', 'Street food'],
    coordinates: { lat: 34.3416, lng: 108.9398 },
    mustSee: [
      'Visit the Terracotta Warriors early to avoid the biggest crowds.',
      'Cycle or walk the city wall around sunset for a memorable city overview.',
      'Reserve time for local Muslim Quarter snacks beyond the main tourist strip.',
    ],
    practicalInfo: {
      transport: 'Metro, taxi, airport shuttle',
      language: 'Mandarin',
      currency: 'CNY (RMB)',
      idealStay: '2 to 3 days',
      airport: 'Xi’an Xianyang',
    },
  },
  {
    id: 'chengdu',
    name: 'Chengdu',
    slug: 'chengdu',
    region: 'west',
    country: 'China',
    description:
      'Chengdu balances panda experiences, Sichuan cuisine, tea houses, and slower rhythms, making it one of the easiest Chinese cities for international leisure travelers to settle into.',
    shortDescription: 'Pandas, hotpot, tea houses, and a softer pace in western China.',
    highlights: ['Panda Base', 'People’s Park', 'Jinli', 'Sichuan hotpot'],
    bestTime: 'March to June and September to November',
    avgTemperature: '16°C to 28°C',
    images: [
      'https://loremflickr.com/1400/1000/chengdu,panda,china',
      'https://loremflickr.com/1400/1000/chengdu,hotpot,china',
      'https://loremflickr.com/1400/1000/chengdu,tea,house',
    ],
    rating: 4.6,
    reviewCount: 8234,
    tags: ['Pandas', 'Cuisine', 'Leisure', 'Culture'],
    coordinates: { lat: 30.5728, lng: 104.0668 },
    mustSee: [
      'Go to the panda base early, when pandas are most active.',
      'Try both classic hotpot and lighter local small eats for balance.',
      'Use Chengdu as the relaxed anchor before moving deeper into Sichuan.',
    ],
    practicalInfo: {
      transport: 'Metro, taxi, airport transfer',
      language: 'Mandarin',
      currency: 'CNY (RMB)',
      idealStay: '2 to 4 days',
      airport: 'Chengdu Tianfu or Shuangliu',
    },
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    slug: 'hangzhou',
    region: 'east',
    country: 'China',
    description:
      'Hangzhou offers an elegant mix of West Lake scenery, tea culture, temple visits, and polished boutique hospitality, perfect for travelers looking for a more romantic, scenic pace.',
    shortDescription: 'West Lake beauty, tea culture, and a refined escape from major city intensity.',
    highlights: ['West Lake', 'Lingyin Temple', 'Longjing tea village', 'Hefang Street'],
    bestTime: 'March to May and September to November',
    avgTemperature: '15°C to 28°C',
    images: [
      'https://loremflickr.com/1400/1000/hangzhou,westlake,china',
      'https://loremflickr.com/1400/1000/silkroad,desert,travel',
    ],
    rating: 4.7,
    reviewCount: 7654,
    tags: ['Lake', 'Tea', 'Romance', 'Slow travel'],
    coordinates: { lat: 30.2741, lng: 120.1551 },
    mustSee: [
      'Stay near West Lake to enjoy sunrise and evening walks without transfers.',
      'Visit a tea village with a guided tasting to make the landscape more meaningful.',
      'Combine Hangzhou with Shanghai for a balanced urban-plus-scenic route.',
    ],
    practicalInfo: {
      transport: 'Metro, taxi, high-speed rail',
      language: 'Mandarin',
      currency: 'CNY (RMB)',
      idealStay: '2 days',
      airport: 'Hangzhou Xiaoshan',
    },
  },
  {
    id: 'guilin',
    name: 'Guilin and Yangshuo',
    slug: 'guilin-yangshuo',
    region: 'south',
    country: 'China',
    description:
      'For travelers drawn to landscapes first, Guilin and Yangshuo deliver karst peaks, river cruises, cycling routes, and rural-style scenery that feels very different from big-city China.',
    shortDescription: 'China’s signature karst scenery and river landscapes.',
    highlights: ['Li River cruise', 'Yangshuo countryside', 'Reed Flute Cave', 'Sunrise viewpoints'],
    bestTime: 'April to October',
    avgTemperature: '18°C to 28°C',
    images: [
      'https://loremflickr.com/1400/1000/shanghai,china,skyline',
      'https://loremflickr.com/1400/1000/hangzhou,westlake,china',
    ],
    rating: 4.8,
    reviewCount: 6543,
    tags: ['Nature', 'Photography', 'Cycling', 'Cruise'],
    coordinates: { lat: 25.2742, lng: 110.29 },
    mustSee: [
      'Take a Li River journey in one direction and road transfer in the other for variety.',
      'Stay overnight in Yangshuo rather than visiting as a rushed day trip.',
      'Leave room for weather changes since the scenery looks best with flexible pacing.',
    ],
    practicalInfo: {
      transport: 'Train, private transfer, taxi',
      language: 'Mandarin',
      currency: 'CNY (RMB)',
      idealStay: '2 to 3 days',
      airport: 'Guilin Liangjiang',
    },
  },
];

export const journeys: Journey[] = [
  {
    id: 'golden-triangle',
    title: 'Classic China Golden Triangle',
    slug: 'classic-china-golden-triangle',
    duration: 8,
    difficulty: 'easy',
    theme: 'History and culture',
    description:
      'A first-timer route linking Beijing, Xi’an, and Shanghai, designed to balance iconic landmarks with manageable transfers.',
    image: 'https://loremflickr.com/1400/1000/beijing,palace,china',
    highlights: ['Great Wall', 'Forbidden City', 'Terracotta Warriors', 'The Bund'],
    includedDestinations: ['beijing', 'xian', 'shanghai'],
    price: '$2,500 to $3,500',
    itinerary: [
      'Days 1-3: Beijing for imperial landmarks and Great Wall.',
      'Days 4-5: Xi’an for archaeology, old city texture, and local food.',
      'Days 6-8: Shanghai for skyline, shopping, and departure convenience.',
    ],
  },
  {
    id: 'city-and-lake',
    title: 'Shanghai and Hangzhou Soft Luxury Escape',
    slug: 'shanghai-hangzhou-soft-luxury',
    duration: 5,
    difficulty: 'easy',
    theme: 'City and scenery',
    description:
      'An elegant pairing of a world city and a poetic lake destination, ideal for shorter premium leisure trips.',
    image: 'https://loremflickr.com/1400/1000/hangzhou,westlake,china',
    highlights: ['The Bund', 'Design hotels', 'West Lake', 'Longjing tea'],
    includedDestinations: ['shanghai', 'hangzhou'],
    price: '$1,800 to $2,600',
    itinerary: [
      'Days 1-2: Arrival and city discovery in Shanghai.',
      'Days 3-4: High-speed rail to Hangzhou for lake views and tea culture.',
      'Day 5: Return to Shanghai for departure or extension.',
    ],
  },
  {
    id: 'silk-road-sampler',
    title: 'Silk Road Starter Route',
    slug: 'silk-road-starter-route',
    duration: 7,
    difficulty: 'moderate',
    theme: 'Heritage and landscapes',
    description:
      'A compact introduction to Silk Road storytelling through Xi’an and Dunhuang-inspired desert atmosphere.',
    image: 'https://loremflickr.com/1400/1000/silkroad,desert,china',
    highlights: ['Ancient capital', 'Cave art', 'Desert views', 'Trade route history'],
    includedDestinations: ['xian'],
    price: '$2,200 to $3,000',
    itinerary: [
      'Days 1-3: Xi’an for Silk Road context and archaeology.',
      'Days 4-6: Western China desert heritage extension planning block.',
      'Day 7: Return via a major gateway city.',
    ],
  },
  {
    id: 'pandas-and-peaks',
    title: 'Pandas, Spice, and Sichuan Comfort',
    slug: 'pandas-spice-sichuan-comfort',
    duration: 5,
    difficulty: 'easy',
    theme: 'Food and wildlife',
    description:
      'Built for travelers who want softer pacing, strong food identity, and meaningful wildlife moments without intense logistics.',
    image: 'https://loremflickr.com/1400/1000/chengdu,panda,china',
    highlights: ['Panda base', 'Tea houses', 'Sichuan flavors', 'Relaxed rhythm'],
    includedDestinations: ['chengdu'],
    price: '$1,200 to $1,900',
    itinerary: [
      'Day 1: Arrival and evening food walk.',
      'Days 2-3: Panda visit, parks, and culture stops.',
      'Days 4-5: Flexible slow-travel days with optional nearby excursion.',
    ],
  },
  {
    id: 'karst-postcard',
    title: 'Guilin and Yangshuo Landscape Route',
    slug: 'guilin-yangshuo-landscape-route',
    duration: 4,
    difficulty: 'easy',
    theme: 'Nature and photography',
    description:
      'A short scenic journey for travelers prioritizing river scenery, countryside movement, and highly photogenic experiences.',
    image: 'https://loremflickr.com/1400/1000/guilin,karst,river',
    highlights: ['Li River', 'Karst peaks', 'Biking', 'Rural views'],
    includedDestinations: ['guilin'],
    price: '$1,100 to $1,700',
    itinerary: [
      'Day 1: Guilin arrival and cave or hill viewpoint.',
      'Day 2: River cruise or private scenic transfer.',
      'Days 3-4: Yangshuo countryside and departure.',
    ],
  },
  {
    id: 'north-to-west',
    title: 'Imperial Capitals to Sichuan Flavors',
    slug: 'imperial-capitals-to-sichuan-flavors',
    duration: 9,
    difficulty: 'moderate',
    theme: 'Culture and cuisine',
    description:
      'A richer multi-stop route for travelers who want iconic northern history and a warmer, food-led western finish.',
    image: 'https://loremflickr.com/1400/1000/china,greatwall,travel',
    highlights: ['Great Wall', 'Terracotta Warriors', 'Pandas', 'Hotpot'],
    includedDestinations: ['beijing', 'xian', 'chengdu'],
    price: '$2,900 to $3,900',
    itinerary: [
      'Days 1-3: Beijing for headline landmarks.',
      'Days 4-5: Xi’an for old capital depth.',
      'Days 6-9: Chengdu for food, pandas, and decompression.',
    ],
  },
];

export const practicalGuides: PracticalGuide[] = [
  {
    slug: 'accommodation',
    title: 'Accommodation',
    summary:
      'A complete guide to lodging in China — international chains, domestic luxury, budget hotels, boutique inns, and youth hostels, with brand lists, booking channels, city-area recommendations, and practical tips.',
    icon: 'bed-double',
    accent: 'primary',
    readMinutes: 12,
    preview: [
      'Five main lodging types: international chains, domestic luxury, budget chains, homestays, and youth hostels.',
      'Use Trip.com or Fliggy Global to filter hotels licensed to host foreign guests.',
      'Save the hotel name and address in Chinese for taxi and ride-hailing use.',
    ],
    body: [
      {
        kind: 'paragraph',
        runs: [
          { text: 'China offers an incredibly diverse range of lodging options, from luxurious international brands to locally flavored boutique homestays. Below is a detailed breakdown of all mainstream accommodation types, including complete brand lists, to help you find the perfect fit.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'I. Accommodation types in China: a complete overview',
      },
      {
        kind: 'heading',
        level: 3,
        text: '1. International chain hotels',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Characteristics: ', bold: true },
          { text: 'Globally standardized service, fluent English-speaking staff, 100% licensed to host foreign guests, acceptance of all international credit cards, and comprehensive facilities (gym, swimming pool, business center, executive lounge, etc.). The top choice for business travelers and those seeking a consistent, reliable experience.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Price range: ', bold: true },
          { text: '¥800 – ¥3,000+ per night (luxury brands can reach ¥5,000+).' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'Business travelers, families, comfort-seekers, first-time visitors.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Advantages: ', bold: true },
          { text: 'Barrier-free facilities, international breakfast, 24-hour multilingual service, global loyalty programs with redeemable points.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Complete brand list (by group)',
      },
      {
        kind: 'table',
        headers: [{ text: 'Hotel group' }, { text: 'Tier' }, { text: 'Full brand list' }],
        rows: [
          [
            [{ text: 'Marriott International' }],
            [{ text: 'Luxury' }],
            [{ text: 'The Ritz-Carlton, St. Regis, Bulgari, JW Marriott' }],
          ],
          [
            [{ text: 'Marriott International' }],
            [{ text: 'Upper Upscale' }],
            [{ text: 'Marriott Hotels, Renaissance, Sheraton, Westin, Edition, Autograph Collection' }],
          ],
          [
            [{ text: 'Marriott International' }],
            [{ text: 'Midscale' }],
            [{ text: 'Courtyard, Fairfield, Four Points by Sheraton, Aloft, AC Hotels' }],
          ],
          [
            [{ text: 'Hilton' }],
            [{ text: 'Luxury' }],
            [{ text: 'Waldorf Astoria, Conrad' }],
          ],
          [
            [{ text: 'Hilton' }],
            [{ text: 'Upper Upscale' }],
            [{ text: 'Hilton Hotels, DoubleTree' }],
          ],
          [
            [{ text: 'Hilton' }],
            [{ text: 'Midscale' }],
            [{ text: 'Hampton by Hilton, Canopy, Curio Collection' }],
          ],
          [
            [{ text: 'IHG (InterContinental Hotels Group)' }],
            [{ text: 'Luxury' }],
            [{ text: 'InterContinental, Kimpton' }],
          ],
          [
            [{ text: 'IHG (InterContinental Hotels Group)' }],
            [{ text: 'Upper Upscale' }],
            [{ text: 'Crowne Plaza, Hotel Indigo' }],
          ],
          [
            [{ text: 'IHG (InterContinental Hotels Group)' }],
            [{ text: 'Midscale' }],
            [{ text: 'Holiday Inn, Even, Holiday Inn Express' }],
          ],
          [
            [{ text: 'Hyatt Hotels Group' }],
            [{ text: 'Luxury' }],
            [{ text: 'Park Hyatt, Grand Hyatt, Alila' }],
          ],
          [
            [{ text: 'Hyatt Hotels Group' }],
            [{ text: 'Upper Upscale' }],
            [{ text: 'Andaz, Hyatt Regency, The Unbound Collection' }],
          ],
          [
            [{ text: 'Hyatt Hotels Group' }],
            [{ text: 'Midscale' }],
            [{ text: 'Hyatt Place, Hyatt House' }],
          ],
          [
            [{ text: 'Accor Group' }],
            [{ text: 'Luxury' }],
            [{ text: 'Raffles, Fairmont, Sofitel' }],
          ],
          [
            [{ text: 'Accor Group' }],
            [{ text: 'Upper Upscale' }],
            [{ text: 'Novotel' }],
          ],
          [
            [{ text: 'Accor Group' }],
            [{ text: 'Midscale' }],
            [{ text: 'Mercure' }],
          ],
          [
            [{ text: 'Accor Group' }],
            [{ text: 'Economy' }],
            [{ text: 'Ibis, Ibis Styles' }],
          ],
          [
            [{ text: 'Shangri-La Group' }],
            [{ text: 'Upper Upscale' }],
            [{ text: 'Shangri-La Hotels, Kerry Hotels' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '2. Domestic luxury hotels',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Characteristics: ', bold: true },
          { text: 'A blend of Chinese cultural elements with meticulous service. Significantly better value than international chains. Many are located in historic buildings or scenic destinations, offering deep cultural immersion.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Price range: ', bold: true },
          { text: '¥500 – ¥1,500 per night (boutique resorts may reach ¥2,000+).' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'Culture enthusiasts, mid-to-high budget travelers, vacationers.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Highlights: ', bold: true },
          { text: 'Many are situated in ancient towns, villages, or natural scenic areas. Offer Chinese breakfast, tea ceremonies, Hanfu costume experiences, local guides, and hands-on cultural workshops.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Hotel group' }, { text: 'Full brand list' }],
        rows: [
          [
            [{ text: 'Jinjiang International (China’s largest)' }],
            [{ text: 'Jinjiang Metropolo, Golden Tulip, Radisson, Kunlun Hotel' }],
          ],
          [
            [{ text: 'Huazhu Group (China’s second largest)' }],
            [{ text: 'Joya, Blossom Hill, Crystal Orange, Manxin, Steigenberger, Steigenberger Icon, Song' }],
          ],
          [
            [{ text: 'BTG Homeinns Group' }],
            [{ text: 'NUO, UrCove' }],
          ],
          [
            [{ text: 'New Century Hotels Group' }],
            [{ text: 'New Century Grand, New Century Resorts' }],
          ],
          [
            [{ text: 'Narada Hotel Group' }],
            [{ text: 'Narada Hotel, Narada Resort' }],
          ],
          [
            [{ text: 'Atour Group' }],
            [{ text: 'Atour, Atour S' }],
          ],
          [
            [{ text: 'Other local premium brands' }],
            [{ text: 'Songtsam (Tibetan resorts), Ahn Luh (heritage resorts), Wanda Vista, Wanda Realm' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3. Budget chain hotels',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Characteristics: ', bold: true },
          { text: 'Clean, tidy, conveniently located (usually near subway stations), affordable, and standardized. A high-value choice for budget-conscious travelers.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Price range: ', bold: true },
          { text: '¥150 – ¥400 per night.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'Backpackers, students, short-term travelers.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Note: ', bold: true },
          { text: 'English proficiency at some remote locations may be limited — prepare a translation app. Some properties no longer provide disposable toiletries; bring your own.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Hotel group' }, { text: 'Full brand list' }],
        rows: [
          [[{ text: 'Jinjiang Group' }], [{ text: 'Jinjiang Inn, 7 Days Inn, 7 Days Premium, Magnotel' }]],
          [[{ text: 'Huazhu Group' }], [{ text: 'Hanting, Hi Inn, Nihao, Ibis' }]],
          [[{ text: 'BTG Homeinns Group' }], [{ text: 'Home Inn, Home Inn Neo, Pai Hotel' }]],
          [[{ text: 'Other budget brands' }], [{ text: 'GreenTree Inn, Thank Inn, B&B Inn' }]],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '4. Homestays & boutique inns',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Characteristics: ', bold: true },
          { text: 'Experience authentic local life, uniquely personalized decor, and hospitable hosts. Many are located inside scenic areas or old city districts.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Popular destinations: ', bold: true },
          { text: 'Lijiang, Dali, Yangshuo, Xiamen, Hangzhou, Chengdu, Huizhou ancient villages.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Price range: ', bold: true },
          { text: '¥200 – ¥800 per night (designer boutique inns may reach ¥1,500+).' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'Deep-travel lovers, couples seeking unique experiences.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Advantages: ', bold: true },
          { text: 'Free pick-up/drop-off, local travel advice, home-cooked meals, and access to off-the-beaten-path spots known only to locals.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        runs: [
          { text: 'Foreign guest permit: ', bold: true },
          { text: 'Always confirm whether the property is licensed to host foreign guests. Some small family-run inns lack the required permit and cannot process your temporary residence registration.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '5. Youth hostels',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Characteristics: ', bold: true },
          { text: 'Low prices, strong social atmosphere, mostly dormitory-style rooms. Ideal for solo travelers looking to meet friends.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Price range: ', bold: true },
          { text: '¥50 – ¥150 per bed.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'Solo travelers, young backpackers, ultra-budget tourists.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Note: ', bold: true },
          { text: 'Bring your own toiletries. Some hostels have curfews (usually doors close after 11 PM). Keep noise down in common areas. Some hostels do not accept guests under 18 traveling alone.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'II. Booking channels & payment methods',
      },
      {
        kind: 'heading',
        level: 3,
        text: '1. Recommended booking platforms',
      },
      {
        kind: 'table',
        headers: [{ text: 'Platform' }, { text: 'Type' }, { text: 'Full advantages' }, { text: 'Notes' }],
        rows: [
          [
            [{ text: 'Booking.com' }],
            [{ text: 'International' }],
            [{ text: 'Supports 20+ languages, accepts all international credit cards, 90%+ hotels offer free cancellation, Genius members get extra discounts, clear order management, global customer support.' }],
            [{ text: 'Some small local hotels do not accept foreign guests, prices are slightly higher than local platforms, some promo rates are non-refundable.' }],
          ],
          [
            [{ text: 'Agoda' }],
            [{ text: 'International' }],
            [{ text: 'Frequent flash sales, supports PayPal payment, great coverage for Southeast Asian and Chinese hotels, early bird discounts available.' }],
            [{ text: 'Strict cancellation policy for some hotels, long refund cycle, some low rates don’t include breakfast.' }],
          ],
          [
            [{ text: 'Trip.com (Ctrip International)' }],
            [{ text: 'Local international version' }],
            [{ text: 'Most recommended for foreign travelers! Full English interface, accepts international credit cards, covers all hotels eligible for foreign guests, prices are 10–20% lower than international platforms, flight + hotel package deals, 24/7 English customer service.' }],
            [{ text: 'Ultra-low price small local hotels are automatically filtered (because they don’t accept foreign guests), no risk of booking an unlicensed hotel.' }],
          ],
          [
            [{ text: 'Fliggy Global' }],
            [{ text: 'Local international version' }],
            [{ text: 'Alibaba’s platform, supports international payment, extremely rich homestay resources, frequent billion-subsidy promo deals, some hotels support Huabei installment.' }],
            [{ text: 'Some homestays need foreign guest eligibility confirmation, English customer support response is slower.' }],
          ],
          [
            [{ text: 'Hotel official website / phone' }],
            [{ text: 'Direct booking' }],
            [{ text: 'Some hotels have official website exclusive discounts, member room upgrades, you can directly note special requests (allergies, anniversaries), long-stay discounts available.' }],
            [{ text: 'Some small hotels don’t have English websites, phone communication may have language barriers.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '2. Payment methods guide',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Visa / Mastercard credit card: ', bold: true }, { text: 'Almost all mid-to-high-end hotels accept it. It is the safest payment method.' }],
          [{ text: 'Alipay Tour Pass (for foreign tourists): ', bold: true }, { text: 'Foreign tourists can register with their passports. No need for a Chinese mobile phone number. Just bind your international credit card. It can be used in most hotels and businesses, and can also be used for taking the subway, hailing a taxi, and shopping. It is very convenient.' }],
          [{ text: 'WeChat Pay Tourist Mode: ', bold: true }, { text: 'Similar to Alipay, but some functions require verification by friends. It is not as convenient as Alipay. It can be used as a backup.' }],
          [{ text: 'RMB cash: ', bold: true }, { text: 'It is recommended to prepare 1,000 – 2,000 yuan in cash. Use it to pay for the room fees and deposits of small hotels, or for some small stores that only accept cash. Don’t bring too much. Most places can accept card payments or mobile payments.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3. Reservation instructions',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Confirmation of guest qualifications: ', bold: true },
          { text: 'If the hotel the tourist wishes to book is not an international chain, it is advisable to send an email or message in advance to inquire: "Do you accept foreign guests? Can you do the temporary residence registration for foreigners?" Confirm before making the payment.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Cancellation policy: ', bold: true },
          { text: 'Carefully read this. During peak seasons (such as Chinese Spring Festival, National Day, May Day, student winter and summer vacations, etc.), many hotels have strict cancellation policies. For example, a 7-day advance cancellation is free, otherwise the full payment will be deducted. Make sure to read it carefully before booking to avoid losses.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: '24-hour accommodation registration: ', bold: true },
          { text: 'According to Chinese law, foreigners must register with the police within 24 hours after checking in. If you stay in a hotel, the hotel will automatically scan your passport to complete the registration for you, and you don’t need to go to the police station yourself; but if you stay at a friend’s house, you must go to the local police station with your friend within 24 hours to complete the registration, otherwise you will be fined.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Keep the confirmation slip: ', bold: true },
          { text: 'Save the booking confirmation slip on your phone and show it to the front desk when you arrive at the hotel. At the same time, make sure to bring your passport with you as the identification document for check-in.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'III. Recommended accommodation areas by city',
      },
      {
        kind: 'table',
        headers: [{ text: 'City' }, { text: 'Recommended area' }, { text: 'Area introduction' }],
        rows: [
          [
            [{ text: 'Beijing' }],
            [{ text: 'Wangfujing / Dongdan' }],
            [{ text: 'City center, close to Tiananmen Square and the Forbidden City, convenient shopping and dining, wide range of hotel options.' }],
          ],
          [
            [{ text: 'Beijing' }],
            [{ text: 'Sanlitun / Guomao' }],
            [{ text: 'Fashion business district, strong international atmosphere, rich nightlife.' }],
          ],
          [
            [{ text: 'Beijing' }],
            [{ text: 'Xizhimen / Zhongguancun' }],
            [{ text: 'Transport hub, close to the Summer Palace and Old Summer Palace, perfect for academic exchange travelers.' }],
          ],
          [
            [{ text: 'Shanghai' }],
            [{ text: 'The Bund / Nanjing Road' }],
            [{ text: 'Shanghai’s landmark area, enjoy the Huangpu River night view, full of high-end hotels.' }],
          ],
          [
            [{ text: 'Shanghai' }],
            [{ text: "Jing'an Temple / Nanjing West Road" }],
            [{ text: 'Business center, convenient transport, lots of shopping and dining options.' }],
          ],
          [
            [{ text: 'Shanghai' }],
            [{ text: 'Xuhui District / Hengshan Road' }],
            [{ text: 'Old Shanghai style, lots of characteristic old houses and cafes.' }],
          ],
          [
            [{ text: "Xi'an" }],
            [{ text: 'Bell Tower / Drum Tower' }],
            [{ text: 'City center, close to the Muslim Quarter, convenient transport, perfect for experiencing Xi’an food.' }],
          ],
          [
            [{ text: "Xi'an" }],
            [{ text: 'Giant Wild Goose Pagoda / Qujiang New District' }],
            [{ text: 'Close to the Giant Wild Goose Pagoda and Datang Everbright City, beautiful environment.' }],
          ],
          [
            [{ text: 'Chengdu' }],
            [{ text: 'Chunxi Road / Taikoo Li' }],
            [{ text: 'City center, convenient shopping and dining, close to Kuanzhai Alleys.' }],
          ],
          [
            [{ text: 'Chengdu' }],
            [{ text: 'Jinjiang District / Jiuyan Bridge' }],
            [{ text: 'Rich nightlife, lots of bars and restaurants.' }],
          ],
          [
            [{ text: 'Chengdu' }],
            [{ text: 'Wuhou Temple / Jinli' }],
            [{ text: 'Close to Wuhou Temple and Jinli Ancient Street, strong cultural atmosphere.' }],
          ],
          [
            [{ text: 'Guilin / Yangshuo' }],
            [{ text: 'Guilin City Center' }],
            [{ text: 'Along the Two Rivers and Four Lakes, convenient transport, perfect as a transit stop.' }],
          ],
          [
            [{ text: 'Guilin / Yangshuo' }],
            [{ text: 'Yangshuo West Street' }],
            [{ text: 'Yangshuo’s core area, lots of bars and restaurants, lively atmosphere.' }],
          ],
          [
            [{ text: 'Guilin / Yangshuo' }],
            [{ text: 'Yulong River Coast' }],
            [{ text: 'Beautiful scenery, lots of boutique homestays, perfect for vacation and relaxation.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'IV. Practical accommodation tips',
      },
      {
        kind: 'heading',
        level: 3,
        text: '1. Language communication',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The English proficiency of the staff in hotels and guesthouses varies. It is recommended that tourists make preparations in advance:' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Download Google Translate and download the offline Chinese package in advance. Even when there is no internet connection, it can still be used. The photo translation function can directly translate menus and signs.' }],
          [{ text: 'Take screenshots of the hotel’s name, address, and reservation number in Chinese and save them. When taking a taxi, show them to the driver directly. Most drivers do not know English, but they will understand if they see Chinese.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '2. Accommodation facilities',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'WiFi: ', bold: true }, { text: 'All hotels provide free WiFi. The login and password are usually on the room card kit.' }],
          [{ text: 'Drinking water: ', bold: true }, { text: 'The tap water in China cannot be drunk directly. Whether it’s cold or hot water, it must be boiled before drinking. Each room is equipped with an electric kettle, which is used to boil water. Do not drink the water from the tap directly. Most hotels also provide bottled drinking water, which can be drunk directly.' }],
          [{ text: 'Bathing supplies: ', bold: true }, { text: 'Many hotels in China now, in order to be environmentally friendly, do not provide disposable toothbrushes, toothpaste, combs, or slippers. Especially for budget hotels, it is recommended that you bring your own set, or you can buy them at the front desk, which is very cheap, only a few dollars.' }],
          [{ text: 'Power sockets: ', bold: true }, { text: 'The voltage in China is 220V, and the plugs are Type A (two flat pins) and Type I (eight-sided three-pin). Most mobile phones, computers, and cameras are wide voltage (100–240V), so there is no need for a transformer, and they can be used directly, but you need to prepare a conversion plug yourself.' }],
          [{ text: 'Air conditioning: ', bold: true }, { text: 'All hotels have air conditioning. It can cool in summer and heat in winter. The temperature can be adjusted by yourself. It is very convenient and you don’t have to worry about the problem of cold or hot.' }],
          [{ text: 'Laundry service: ', bold: true }, { text: 'Mid-to-high-end hotels all have laundry services. They charge by the item and deliver it the same day. You can pick it up the next day. Some hotels also have self-service laundry rooms, which require scanning for payment. It is very convenient for long-stay guests and you don’t need to bring a lot of clothes.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3. Cultural differences',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Check-in and check-out time: ', bold: true }, { text: 'The standard time for check-in in Chinese hotels is 2 p.m., and check-out is at 12 noon. This is a uniform rule. If you arrive early, for example, at 8 a.m., and the room hasn’t been cleaned yet, tourists can leave their luggage at the front desk, go out to have fun, and come back for check-in after 2 p.m. If you want to extend your check-out time, by 2 p.m., most hotels can extend it for free; if it’s 6 p.m., generally, half-day room rate will be charged; if it’s after 6 p.m., full-day room rate will be charged. Just inform the front desk in advance.' }],
          [{ text: 'Tip culture: ', bold: true }, { text: 'There is no tip culture in China. No tip is required for all services, whether it’s the bellboy helping you with luggage, the cleaning lady in the room, or the front desk staff. If you give them a tip, they won’t accept it because the hotel stipulates that guests cannot be tipped. So you don’t need to prepare a tip, and you won’t feel embarrassed.' }],
          [{ text: 'Quiet rest: ', bold: true }, { text: 'Chinese people usually rest earlier. After 10 p.m., be careful not to speak loudly in the corridor. Don’t turn up the volume of the TV in the room too high, as it may disturb other guests’ rest.' }],
          [{ text: 'Indoor smoking prohibition: ', bold: true }, { text: 'In most cities in China, smoking is prohibited in indoor public places. Hotel rooms, corridors, restaurants, and elevators are all no-smoking areas. If you want to smoke, you must go to the smoking area outside the hotel, which is the place with an ashtray. If caught smoking in the room, you will be fined.' }],
          [{ text: 'Don’t waste food: ', bold: true }, { text: 'The hotel breakfast is usually from 7 a.m. to 10 a.m. Don’t go too late, otherwise many dishes will be gone. Take only what you need and don’t waste. This is a Chinese habit and also a requirement of the hotel.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '4. Special requirements',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Accessibility facilities: ', bold: true }, { text: 'If you need a wheelchair, be sure to select "Accessibility Facilities" when making a reservation. Mid-range and high-end hotels usually have complete accessibility facilities, such as wheelchair access routes, accessible elevators, and accessible bathrooms. However, small hotels may not have these facilities. Make sure to confirm this in advance.' }],
          [{ text: 'Pet-friendly: ', bold: true }, { text: 'Most hotels do not allow pets, especially large dogs. However, some homestays and a few hotels are pet-friendly. When making a reservation, be sure to ask about this in advance. Some hotels may charge a pet cleaning fee, approximately 100–200 yuan.' }],
          [{ text: 'Long-stay discounts: ', bold: true }, { text: 'If you plan to stay for more than one month, do not book by the day. Instead, contact the hotel’s sales department and negotiate the long-stay price with them. Many hotels will also offer free cleaning and laundry services for long-stay guests.' }],
        ],
      },
    ],
    faqs: [
      {
        question: 'What documents do foreigners need to stay in a Chinese hotel?',
        answer: 'You must present a valid passport and visa. The hotel will scan your passport and automatically process your temporary residence registration — you do not need to visit the police station yourself. If you are staying with a friend or at a non-hotel residence, you must visit the local police station with your host within 24 hours to complete the registration, or you may be fined.',
      },
      {
        question: 'Can I check in early or check out late?',
        answer: 'Early check-in and late check-out are subject to room availability. Notify the front desk 2 hours in advance. Most hotels allow free late check-out until 2:00 PM; later extensions may incur additional charges — typically half-day rate up to 6:00 PM, and full-day rate after that.',
      },
      {
        question: 'Is breakfast included?',
        answer: 'Most hotels include breakfast in the room rate. Some budget hotels charge separately. Breakfast usually offers both Chinese and Western options — you can choose according to your taste. Note that breakfast hours are usually 7:00 to 10:00 AM, and many dishes run out toward the end of service.',
      },
      {
        question: 'Can I cook in my hotel room?',
        answer: 'Most hotels prohibit in-room cooking due to safety hazards. However, some serviced apartments and homestays provide kitchen facilities — confirm in advance. If you need to prepare food for a child, special diet, or medical reason, contact the front desk; some hotels can arrange a shared kitchen or microwave access.',
      },
      {
        question: 'What should I do if I encounter a problem?',
        answer: 'First, contact the hotel front desk — they will do their best to assist. For emergencies, dial China’s emergency numbers (free of charge, with English-speaking operators available): 110 for police, 120 for medical emergency, 119 for fire department.',
      },
    ],
  },
  {
    slug: 'medical',
    title: 'Medical Care',
    summary:
      'A clear pre-arrival and on-the-ground guide to clinics, hospitals, emergencies, insurance, and medical records for foreign visitors in China.',
    icon: 'briefcase-medical',
    accent: 'secondary',
    readMinutes: 12,
    preview: [
      'Buy travel medical insurance before departure and save the emergency assistance number offline.',
      'Match the care option to urgency — public hospital, international department, private clinic, or pharmacy.',
      'Call 120 for medical emergencies; bring passport, medication list, and payment backup.',
    ],
    body: [
      {
        kind: 'paragraph',
        runs: [
          { text: 'This guide is designed to help foreign visitors prepare for medical needs before and during a trip to China. It explains the main care options, what to prepare before departure, how to choose where to go, how to seek treatment, what to do in an emergency, and how to keep records for insurance and follow-up.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Disclaimer: ' },
          { text: 'This guide is not a substitute for professional medical advice. If symptoms are severe, worsening, unusual, or related to a known serious condition, seek professional medical care as soon as possible.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'Recommended default setup',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'PREPARE: ', bold: true }, { text: 'Insurance + medical info' }],
          [{ text: 'CHOOSE CARE: ', bold: true }, { text: 'Clinic or hospital' }],
          [{ text: 'EMERGENCY: ', bold: true }, { text: 'Call 120' }],
          [{ text: 'RECORDS: ', bold: true }, { text: 'Keep invoices + reports' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Before departure, buy travel medical insurance if possible, save one major hospital and one international clinic for each destination city, carry your passport and medication list, know the emergency number 120, and keep all medical invoices, prescriptions and reports after treatment.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '1. Medical care options in China',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Foreign visitors in China usually have several choices: large public hospitals, international departments in public hospitals, private international clinics or hospitals, pharmacies, and emergency medical services. The best choice depends on symptom severity, communication needs, location, cost, insurance coverage, and how quickly care is needed.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.1 Large public hospitals',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Overview: ', bold: true },
          { text: 'Large public hospitals, especially tertiary hospitals in major cities, usually provide the widest range of medical services.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'They are often the better choice for serious symptoms, unclear conditions, injuries, imaging, lab tests, specialist review, or possible admission.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Main limitation: ', bold: true },
          { text: 'The process can be busy and complex. English support may vary by hospital and department, so a written symptom note and translation app are useful.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.2 International departments in public hospitals',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Overview: ', bold: true },
          { text: 'Some major public hospitals have international departments, VIP outpatient centers, or foreigner service counters.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'These can provide easier appointment support, more foreign-language assistance, and a clearer process while still being connected to a large hospital system.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Main limitation: ', bold: true },
          { text: 'Costs are often higher than ordinary public outpatient services, and not every city or hospital has this type of department.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.3 Private international clinics and hospitals',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Overview: ', bold: true },
          { text: 'Private international clinics and hospitals are often easier for foreign travelers to navigate.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'They may provide English-speaking staff, appointment-based visits, international insurance support, familiar service flow, and easier communication.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Main limitation: ', bold: true },
          { text: 'Costs are usually higher, and some private clinics may refer severe or complex cases to a large hospital or emergency department.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.4 Pharmacies',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Overview: ', bold: true },
          { text: 'Pharmacies can help with simple over-the-counter purchases such as basic cold medicine, bandages, oral rehydration salts, or simple first-aid items.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Main limitation: ', bold: true },
          { text: 'They should not replace medical care when symptoms are severe, persistent, unclear, or related to a chronic condition.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.5 Emergency medical services',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Overview: ', bold: true },
          { text: 'For medical emergencies in China, call 120 for ambulance and pre-hospital emergency medical services.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Tip: ', bold: true },
          { text: 'If language is difficult, ask hotel staff, a local helper, a shop assistant, or a nearby person to call 120 and explain the location in Chinese.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Simple comparison',
      },
      {
        kind: 'table',
        headers: [{ text: 'Option' }, { text: 'Use first when…' }, { text: 'Main limitation' }],
        rows: [
          [
            [{ text: 'Large public hospital' }],
            [{ text: 'Symptoms are serious, unclear, require tests, specialist review, emergency care, or possible admission.' }],
            [{ text: 'Busy process; English support varies.' }],
          ],
          [
            [{ text: 'International department' }],
            [{ text: 'You need hospital-level care with easier communication and clearer navigation.' }],
            [{ text: 'Not available everywhere; often more expensive.' }],
          ],
          [
            [{ text: 'Private international clinic' }],
            [{ text: 'Symptoms are mild to moderate and communication, appointments, and comfort matter most.' }],
            [{ text: 'More expensive; may refer severe cases to a hospital.' }],
          ],
          [
            [{ text: 'Pharmacy' }],
            [{ text: 'You need simple over-the-counter items or basic first-aid supplies.' }],
            [{ text: 'Not suitable for serious, persistent, or unclear symptoms.' }],
          ],
          [
            [{ text: 'Emergency services 120' }],
            [{ text: 'There is a life-threatening or urgent situation.' }],
            [{ text: 'Location and language support may be challenging; ask locals or hotel staff to help.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '2. Recommended preparation for different travelers',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Different travelers need different levels of preparation. Use the table below as a practical starting point.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Traveler type' }, { text: 'Typical situation' }, { text: 'Recommended preparation' }],
        rows: [
          [
            [{ text: 'Short city trip' }],
            [{ text: 'Major cities with good access to hospitals and clinics.' }],
            [{ text: 'Travel insurance, passport, medication list, one saved hospital and clinic, emergency number 120.' }],
          ],
          [
            [{ text: 'Multi-city independent trip' }],
            [{ text: 'Several cities, trains, flights, and different hotels.' }],
            [{ text: 'Save providers in each city, keep insurance hotline offline, carry medication in hand luggage, keep hotel addresses in Chinese.' }],
          ],
          [
            [{ text: 'Rural, small-town, or scenic-area trip' }],
            [{ text: 'Remote scenic routes, mountains, ancient towns, or smaller destinations.' }],
            [{ text: 'Carry extra medicine, first-aid supplies, more cash/payment backup, hotel contact, and know the nearest larger hospital before leaving the city.' }],
          ],
          [
            [{ text: 'Family trip with children' }],
            [{ text: 'Children may need pediatric care quickly if fever, dehydration, or injury occurs.' }],
            [{ text: 'Save pediatric-capable hospitals, carry child medication records, emergency contacts, and insurance documents.' }],
          ],
          [
            [{ text: 'Pregnant traveler or chronic illness' }],
            [{ text: 'Higher risk of needing planned or urgent medical support.' }],
            [{ text: 'Consult your doctor before travel, carry medical summary, prescriptions, extra medicine, and identify suitable hospitals before departure.' }],
          ],
          [
            [{ text: 'Adventure or sports traveler' }],
            [{ text: 'Skiing, trekking, diving, cycling, motorbike travel, or remote outdoor activities.' }],
            [{ text: 'Check whether insurance covers sports injuries and evacuation; save emergency and hospital contacts near activity areas.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '3. Before departure preparation',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Most medical problems become easier to handle if you prepare before departure. The goal is not to expect illness, but to reduce uncertainty if something happens.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.1 Insurance and emergency support',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Buy travel medical insurance or international health insurance that covers treatment in China if possible.' }],
          [{ text: 'Check whether emergency medical evacuation is covered, especially for remote travel or higher-risk activities.' }],
          [{ text: 'Ask your insurer whether any hospitals or clinics in your destination cities support direct billing.' }],
          [{ text: 'Save the insurer emergency assistance number offline and in printed form.' }],
          [{ text: 'Do not assume direct billing will work automatically. Be prepared to pay first and claim reimbursement later.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.2 Phone, internet and useful apps',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Keep a working phone number and internet connection during your trip.' }],
          [{ text: 'Enable roaming or prepare a China-compatible SIM / eSIM for mobile data.' }],
          [{ text: 'Install a translation app and download offline Chinese if possible.' }],
          [{ text: 'Install a map app and save your hotel address in Chinese.' }],
          [{ text: 'Install your insurance app and bank app, because hospitals or clinics may require payment before tests or treatment.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        runs: [
          { text: 'Power bank reminder: ' },
          { text: 'Keep a power bank with you. No phone battery can mean no map, no translation, no payment, and no emergency call.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.3 Personal medical kit',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Bring essential health items from home, especially if you use prescription medication or have allergies.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Keep important medicine in carry-on luggage, not only in checked baggage.' }],
          [{ text: 'Bring prescription medicine for the whole trip plus extra days in case of travel delays.' }],
          [{ text: 'Use original labeled containers showing your name, medicine name, and dosage where possible.' }],
          [{ text: 'Keep copies of prescriptions, including generic names if available.' }],
          [{ text: 'Carry a doctor letter for important chronic conditions or controlled medicines if applicable.' }],
          [{ text: 'Include basic first-aid items such as plasters, antiseptic wipes, oral rehydration salts, and personal allergy medication if prescribed.' }],
          [{ text: 'Do not bring medicines for other people, and check restrictions if a medicine may be controlled or heavily regulated.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.4 Medical information to save',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Prepare a one-page medical information card. Save it on your phone and keep a paper copy in your bag.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Full name and passport number.' }],
          [{ text: 'Nationality and date of birth.' }],
          [{ text: 'Emergency contact and hotel contact.' }],
          [{ text: 'Allergies, especially medicine or food allergies.' }],
          [{ text: 'Chronic conditions, such as diabetes, asthma, heart disease, epilepsy, or severe allergies.' }],
          [{ text: 'Current medications, including dose and frequency.' }],
          [{ text: 'Insurance policy number and emergency assistance phone number.' }],
          [{ text: 'Hotel name and address in Chinese.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '4. How to choose where to go',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'If you feel unwell in China, choose the care option based on urgency, not only convenience. When in doubt, choose a higher level of care or ask hotel staff to help you contact a medical provider.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Situation' }, { text: 'Best first action' }, { text: 'Reason' }],
        rows: [
          [
            [{ text: 'Life-threatening or urgent symptoms' }],
            [{ text: 'Call 120 or go to the nearest emergency department.' }],
            [{ text: 'Ambulance and emergency care are needed quickly.' }],
          ],
          [
            [{ text: 'Severe pain, injury, high fever, breathing difficulty, or unclear serious symptoms' }],
            [{ text: 'Go to a large public hospital or emergency department.' }],
            [{ text: 'Hospital-level tests and specialists may be needed.' }],
          ],
          [
            [{ text: 'Mild to moderate symptoms and communication is important' }],
            [{ text: 'Use an international clinic or international department if available.' }],
            [{ text: 'Easier language support and appointment flow.' }],
          ],
          [
            [{ text: 'Simple issue such as minor cold supplies or first-aid items' }],
            [{ text: 'Use a licensed pharmacy or clinic.' }],
            [{ text: 'A pharmacy may be enough for basic supplies, but not for diagnosis.' }],
          ],
          [
            [{ text: 'Not sure which department to choose' }],
            [{ text: 'Show a symptom note to front desk or nurse and ask for direction.' }],
            [{ text: 'This is safer than guessing the wrong department.' }],
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        runs: [
          { text: 'Red-flag principle: ' },
          { text: 'Call 120 or seek emergency care immediately for chest pain, severe breathing difficulty, loss of consciousness, seizure, suspected stroke symptoms, severe allergic reaction, major bleeding, serious head injury, major trauma, or rapidly worsening symptoms.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '5. Step-by-step: seeing a doctor in China',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The exact process differs by city and facility, but the following sequence is common and useful for foreign visitors.' },
        ],
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          [{ text: 'Choose the provider. ', bold: true }, { text: 'Decide between a public hospital, international department, private clinic, pharmacy, or emergency department based on urgency.' }],
          [{ text: 'Bring documents. ', bold: true }, { text: 'Carry your passport, insurance details, medication list, symptom note, and payment method.' }],
          [{ text: 'Register or check in. ', bold: true }, { text: 'First-time patients may need to create a patient record using passport information.' }],
          [{ text: 'Choose the department. ', bold: true }, { text: 'If you are not sure, show your symptoms to the front desk, nurse, or information counter.' }],
          [{ text: 'See the doctor. ', bold: true }, { text: 'Explain what happened, when symptoms started, whether they are worsening, and any allergies or chronic conditions.' }],
          [{ text: 'Complete tests if ordered. ', bold: true }, { text: 'You may need to pay first, go to a lab or imaging area, and return to the doctor after results are ready.' }],
          [{ text: 'Collect medicine or treatment instructions. ', bold: true }, { text: 'Check medicine name, dosage, timing, food restrictions, and side effects before leaving.' }],
          [{ text: 'Keep records. ', bold: true }, { text: 'Save diagnosis notes, prescriptions, test reports, imaging reports, discharge summaries, invoices, and itemized bills.' }],
          [{ text: 'Arrange follow-up. ', bold: true }, { text: 'Ask when to return, what symptoms require urgent reassessment, and whether you should avoid travel or certain activities.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'What to bring to a hospital or clinic',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Original passport and any entry/visa document if relevant.' }],
          [{ text: 'Insurance card, policy number, and emergency assistance phone number.' }],
          [{ text: 'Phone with translation app, map, payment app, and enough battery.' }],
          [{ text: 'Written symptom note, ideally with Chinese translation.' }],
          [{ text: 'Medication list and allergy list.' }],
          [{ text: 'Old medical records, test results, or imaging if relevant.' }],
          [{ text: 'Hotel address in Chinese and emergency contact details.' }],
          [{ text: 'Payment backup: Alipay / WeChat Pay, card, and some RMB cash.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '6. Emergencies and ambulance use',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'In China, call 120 for medical emergencies. Police can be reached at 110, fire at 119, and traffic accident reporting at 122 in many cities. For medical emergencies, 120 is the most important number to remember.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '6.1 When to call 120',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Chest pain or pressure.' }],
          [{ text: 'Severe difficulty breathing.' }],
          [{ text: 'Loss of consciousness or seizure.' }],
          [{ text: 'Suspected stroke symptoms, such as facial drooping, arm weakness, or speech difficulty.' }],
          [{ text: 'Severe allergic reaction, especially swelling, breathing difficulty, or collapse.' }],
          [{ text: 'Major bleeding, serious injury, head injury, or traffic accident.' }],
          [{ text: 'Severe abdominal pain, severe dehydration, confusion, or rapidly worsening condition.' }],
          [{ text: 'Any situation where moving the patient without help may be unsafe.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '6.2 How to call or ask for help',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'If you do not speak Chinese, ask hotel staff, a shop assistant, a local friend, a driver, or a nearby person to call 120 for you. Show the Chinese phrase card in Section 11 if needed.' }],
          [{ text: 'Give the exact location. A Chinese address or map location is very helpful.' }],
          [{ text: 'Describe the main problem: chest pain, breathing difficulty, bleeding, injury, allergic reaction, unconsciousness, etc.' }],
          [{ text: 'Give the patient age, gender, and whether the patient is awake or breathing normally if you know.' }],
          [{ text: 'Keep your phone reachable and send someone to meet the ambulance if possible.' }],
          [{ text: 'Bring passport, insurance information, medication list, and allergy information to the hospital if possible.' }],
          [{ text: 'Contact your insurer emergency line as soon as practical, especially if admission, surgery, or evacuation may be needed.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '7. Insurance, payment and medical records',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Medical care in China is generally not free for visitors. Some international clinics or hospital departments may support insurance direct billing, but this depends on the insurer, the policy, and the provider network. Always be ready for the possibility that you need to pay first and claim later.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '7.1 Payment methods at medical providers',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Payment options vary by provider. Large international departments and international clinics are more likely to accept international cards.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Some hospitals may also accept RMB cash, UnionPay, Alipay, or WeChat Pay.' }],
          [{ text: 'At some facilities, payment may be needed before tests, medicine, or admission steps continue.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '7.2 Direct billing is not guaranteed',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Before travel, ask your insurer for a list of network hospitals or clinics in your destination cities.' }],
          [{ text: 'Before treatment, ask the clinic or hospital whether your insurance can be billed directly.' }],
          [{ text: 'Even if direct billing is possible, some services may still require pre-authorization.' }],
          [{ text: 'Keep a payment backup in case direct billing is not accepted.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '7.3 Records to keep for reimbursement and follow-up',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Official invoice or fapiao if provided.' }],
          [{ text: 'Itemized expense list.' }],
          [{ text: 'Diagnosis note or outpatient record.' }],
          [{ text: 'Prescription and medicine list.' }],
          [{ text: 'Lab reports, imaging reports, and ECG reports if performed.' }],
          [{ text: 'Discharge summary if admitted.' }],
          [{ text: 'Payment receipts and card statements.' }],
          [{ text: 'Doctor instructions for follow-up or travel restrictions.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        runs: [
          { text: 'Backup tip: ' },
          { text: 'Photograph or scan every document before leaving the hospital or clinic. Paper records can be difficult to replace later.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '8. Medication, pharmacies and prescriptions',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Medication names, packaging, and availability may differ from your home country. The safest approach is to bring important medicine from home in original labeled containers and carry prescriptions or a doctor letter when appropriate.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.1 Bringing medicine into China',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Bring enough medicine for the full trip plus extra days in case of travel delays.' }],
          [{ text: 'Keep medicine in original labeled containers when possible.' }],
          [{ text: 'Carry medicine in hand luggage, especially essential daily medicine or emergency allergy medicine.' }],
          [{ text: 'Bring copies of prescriptions, including generic names.' }],
          [{ text: 'Check destination rules before bringing controlled or restricted medication.' }],
          [{ text: 'Do not carry prescription medicine for people other than yourself or close family unless properly documented.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.2 Using pharmacies in China',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Use licensed pharmacies rather than informal sellers.' }],
          [{ text: 'Show the generic name, active ingredient, or a photo of your medicine if you need a similar item.' }],
          [{ text: 'Do not assume a medicine with a similar-looking package is the same.' }],
          [{ text: 'If symptoms are serious, persistent, or unclear, go to a clinic or hospital instead of only buying medicine.' }],
          [{ text: 'Ask a doctor before combining herbal medicine, traditional remedies, or new medicine with your regular prescriptions.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '9. Common medical scenarios',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The table below does not diagnose or treat illness. It helps visitors decide what level of help to seek.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Scenario' }, { text: 'Practical first step' }, { text: 'Seek urgent care if…' }],
        rows: [
          [
            [{ text: 'Stomach upset or diarrhea' }],
            [{ text: 'Rest, hydrate, consider oral rehydration salts, and seek clinic advice if symptoms persist.' }],
            [{ text: 'There is blood, severe dehydration, high fever, severe pain, pregnancy, or symptoms in a child / elderly person.' }],
          ],
          [
            [{ text: 'Fever or flu-like symptoms' }],
            [{ text: 'Monitor temperature, rest, and contact a clinic if symptoms are significant or persistent.' }],
            [{ text: 'Breathing difficulty, confusion, chest pain, stiff neck, severe weakness, or high fever occurs.' }],
          ],
          [
            [{ text: 'Minor cuts or sprains' }],
            [{ text: 'Clean the wound, use basic first aid, and visit a clinic if pain, swelling, or wound concerns continue.' }],
            [{ text: 'There is heavy bleeding, deep wound, head injury, inability to walk, numbness, or severe swelling.' }],
          ],
          [
            [{ text: 'Allergic reaction' }],
            [{ text: 'Use prescribed allergy medicine if you have it and seek help if symptoms do not improve.' }],
            [{ text: 'There is breathing difficulty, swelling of face / throat, dizziness, collapse, or severe rash. Call 120.' }],
          ],
          [
            [{ text: 'Lost or finished prescription medicine' }],
            [{ text: 'Contact your insurer, a clinic, or a hospital with your prescription and generic name.' }],
            [{ text: 'The medicine is essential for diabetes, heart disease, epilepsy, asthma, severe allergy, or mental health stability.' }],
          ],
          [
            [{ text: 'Dental problem' }],
            [{ text: 'Ask hotel staff or insurer for a dental clinic; save receipts and records.' }],
            [{ text: 'There is facial swelling, fever, severe trauma, or uncontrolled bleeding.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '10. Common problems and practical solutions',
      },
      {
        kind: 'heading',
        level: 3,
        text: '10.1 I do not know which hospital to choose',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'If the situation is urgent, call 120 or go to the nearest emergency department.' }],
          [{ text: "If it is not urgent, ask your hotel, insurer, or embassy / consulate information page for international clinics or major hospitals in the city." }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '10.2 I do not know which department to register for',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Prepare a short symptom note and show it at the front desk or nurse station.' }],
          [{ text: 'It is better to ask staff to direct you than to choose a department only by guessing.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '10.3 English support is limited',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Use a translation app, write symptoms clearly, show your medication / allergy list, and ask whether an international department or English-speaking staff member is available.' }],
          [{ text: 'Hotel staff may also help call ahead.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '10.4 I forgot my passport',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Return to get it if the situation is not urgent.' }],
          [{ text: 'For emergency care, seek help first and explain that the passport is at the hotel.' }],
          [{ text: 'Carrying your passport when seeking treatment can reduce registration delays.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '10.5 My insurance is not accepted for direct billing',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Ask for all invoices, itemized bills, and medical records. Pay using available methods if necessary and contact your insurer about reimbursement.' }],
          [{ text: 'Keep digital copies of every paper document.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '10.6 I need medicine but cannot find the same brand',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Use the generic name or active ingredient, not only the brand name.' }],
          [{ text: 'If the medicine is important or prescription-only, consult a doctor rather than substituting it yourself.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '10.7 I feel worse after leaving the clinic',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Return for reassessment or go to emergency care if symptoms worsen, new severe symptoms appear, or the doctor told you to return if there is no improvement.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '11. Useful Chinese phrases for medical situations',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Save this section as screenshots and show it directly to hotel staff, drivers, clinic staff, or hospital staff when needed.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'English' }, { text: 'Chinese to show' }],
        rows: [
          [[{ text: 'I need to see a doctor.' }], [{ text: '我需要看医生。' }]],
          [[{ text: 'Please help me call 120.' }], [{ text: '请帮我拨打120。' }]],
          [[{ text: 'Please take me to the nearest hospital.' }], [{ text: '请带我去最近的医院。' }]],
          [[{ text: 'I do not speak Chinese.' }], [{ text: '我不会说中文。' }]],
          [[{ text: 'I need an English-speaking doctor or staff member.' }], [{ text: '我需要会英语的医生或工作人员。' }]],
          [[{ text: 'I have a fever.' }], [{ text: '我发烧了。' }]],
          [[{ text: 'I have chest pain.' }], [{ text: '我胸口疼。' }]],
          [[{ text: 'I have difficulty breathing.' }], [{ text: '我呼吸困难。' }]],
          [[{ text: 'I feel pain here.' }], [{ text: '我这里疼。' }]],
          [[{ text: 'I am allergic to this medicine / food.' }], [{ text: '我对这种药/食物过敏。' }]],
          [[{ text: 'I have diabetes / asthma / heart disease.' }], [{ text: '我有糖尿病/哮喘/心脏病。' }]],
          [[{ text: 'I am pregnant.' }], [{ text: '我怀孕了。' }]],
          [[{ text: 'I take this medicine every day.' }], [{ text: '我每天服用这种药。' }]],
          [[{ text: 'I lost my medicine.' }], [{ text: '我的药丢了。' }]],
          [[{ text: 'Please help me contact my hotel.' }], [{ text: '请帮我联系我的酒店。' }]],
          [[{ text: 'Can I have the invoice and medical records?' }], [{ text: '可以给我发票和病历吗？' }]],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '12. Final checklist',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: '[ ] Buy travel medical insurance that covers China if possible.' }],
          [{ text: '[ ] Check whether emergency medical evacuation is included.' }],
          [{ text: '[ ] Save your insurer emergency assistance number offline.' }],
          [{ text: '[ ] Prepare a medical information card with allergies, medications, chronic conditions, and emergency contacts.' }],
          [{ text: '[ ] Bring enough prescription medicine for the whole trip plus extra days.' }],
          [{ text: '[ ] Keep medicine in original labeled containers when possible.' }],
          [{ text: '[ ] Carry copies of prescriptions and generic medicine names.' }],
          [{ text: '[ ] Save at least one large hospital and one international clinic in each destination city.' }],
          [{ text: '[ ] Save your hotel name and address in Chinese.' }],
          [{ text: '[ ] Install translation, map, insurance, and bank apps before departure.' }],
          [{ text: '[ ] Carry your passport when seeking treatment.' }],
          [{ text: '[ ] Know the emergency number: 120.' }],
          [{ text: '[ ] Keep payment backup: Alipay / WeChat Pay, card, and some RMB cash.' }],
          [{ text: '[ ] Save useful Chinese medical phrases as screenshots.' }],
          [{ text: '[ ] Keep every invoice, prescription, test report, and medical record after treatment.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '13. Verification notes and sources',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Medical procedures, hospital lists, insurance rules, and app interfaces may change. Before publishing this guide to users, the team should re-check local hospital pages, insurer requirements, and current official guidance. This version was prepared using the following factual reference points:' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [
            { text: 'U.S. Embassy & Consulates in China medical assistance guidance: ' },
            { text: 'travelers are encouraged to buy foreign medical care and medical evacuation insurance before arrival.' },
          ],
          [
            { text: 'Travel.State.gov China guidance and international travel insurance guidance: ' },
            { text: 'medical care is not free in China, and travelers should check medical insurance and evacuation coverage.' },
          ],
          [
            { text: 'CDC Travelers Health guidance: ' },
            { text: 'travelers should carry medicines in original labeled containers, bring prescription copies, and prepare extra supply for travel delays.' },
          ],
          [
            { text: 'Beijing Municipal Government Medical Guide for Foreigners: ' },
            { text: '120 is the emergency medical number; emergency departments are widely available; international patients may use payment options such as RMB cash, credit cards, UnionPay, Alipay, and WeChat Pay depending on the provider.' },
          ],
          [
            { text: 'Payment and insurance practice note: ' },
            { text: 'direct billing depends on insurer, policy terms, and provider network; travelers should keep invoices, itemized bills, and medical records.' },
          ],
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I buy travel medical insurance before going to China?',
        answer: 'Yes. Travel medical insurance that covers treatment in China — ideally including emergency medical evacuation — is one of the most effective ways to reduce uncertainty. Save your insurer emergency assistance number offline, and ask the insurer for a list of network hospitals or clinics in each destination city before departure.',
      },
      {
        question: 'When should I call 120 versus going to a clinic or hospital?',
        answer: 'Call 120 or go straight to the emergency department for chest pain, severe breathing difficulty, loss of consciousness, seizure, suspected stroke symptoms, severe allergic reaction, major bleeding, serious head injury, major trauma, or rapidly worsening symptoms. For mild to moderate symptoms, an international clinic or the international department of a public hospital is usually the easier first stop.',
      },
      {
        question: 'What if my passport is not with me and I need urgent care?',
        answer: 'Seek care first and explain to the staff that your passport is at the hotel. For non-urgent situations, go back to get the passport, since carrying it speeds up registration. Either way, keep digital photos of your passport and visa in your phone so you can show identification quickly.',
      },
    ],
  },
  {
    slug: 'food-culture',
    title: 'Culture & Cuisine',
    summary:
      'A 5,000-year-old civilization meets modern China — cultural etiquette, social principles, regional cuisines, dietary accommodations, and hands-on cultural experiences for foreign travelers.',
    icon: 'utensils-crossed',
    accent: 'accent',
    readMinutes: 14,
    preview: [
      'Mianzi (face) and Guanxi (connections) are the two social concepts to understand first.',
      'Eight iconic regional cuisines — Sichuan, Cantonese, Jiangsu, Shandong are the most influential.',
      'Special diets (vegetarian, halal, gluten-free) are accommodated in major cities with some preparation.',
    ],
    body: [
      {
        kind: 'paragraph',
        runs: [
          { text: 'Welcome to China! Home to a 5,000-year-old civilization, this country blends bustling modern cities with quaint rural landscapes, featuring fiery Sichuan specialties and mild delicate Jiangnan pastries alike. This guide covers cultural etiquette, food customs and immersive local experiences to help foreign travelers fit into daily life, steer clear of cultural faux pas and make memorable travel memories.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'I. Explore China: cultural etiquette & social principles',
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.1 Core cultural concepts',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Mianzi (Face): ', bold: true },
          { text: 'A foundational social norm in China referring to personal dignity, social prestige and public image.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Giving face: ', bold: true }, { text: 'Complimenting others publicly, respecting their status and gladly accepting their hospitality.' }],
          [{ text: 'Saving face: ', bold: true }, { text: 'Never criticize or correct someone in public; discuss faults privately to prevent embarrassment.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Note: ', bold: true },
          { text: 'Straightforward arguments common in Western culture may cause others to lose face and harm interpersonal bonds.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Guanxi (Personal Connections): ', bold: true },
          { text: 'China’s unique way of building social networks, comparable to Western connections yet centered on favors and mutual reciprocity. If local residents offer you a helping hand, show sincere thanks or pay a return visit later to acknowledge their kindness.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.2 Daily social etiquette: greetings & address rules',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Handshake: ', bold: true }, { text: 'The standard greeting. Chinese handshakes are usually gentler and longer with subtle head nods compared to Western ones.' }],
          [{ text: 'Hugs or cheek kisses: ', bold: true }, { text: 'Reserved exclusively for close friends; skip such physical contact for first-time meetings to avoid discomfort.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.3 Common cultural taboos',
      },
      {
        kind: 'table',
        headers: [{ text: 'Improper behavior' }, { text: 'Taboo cause' }, { text: 'Correct approach' }],
        rows: [
          [
            [{ text: 'Stand chopsticks vertically in rice' }],
            [{ text: 'Resembles funeral incense placement, considered unlucky.' }],
            [{ text: 'Lay chopsticks on a rest or horizontally across the bowl.' }],
          ],
          [
            [{ text: 'Point at people with chopsticks' }],
            [{ text: 'Extremely impolite.' }],
            [{ text: 'Put down chopsticks and gesture with your palm.' }],
          ],
          [
            [{ text: 'Pick room / date with digit 4' }],
            [{ text: 'Pronunciation matches the Chinese word for "death"; most hotels omit the 4th floor.' }],
            [{ text: 'Avoid accommodations or travel dates containing number four.' }],
          ],
          [
            [{ text: 'Wear full white / black for festivals' }],
            [{ text: 'These hues are worn for funerals.' }],
            [{ text: 'Wear bright colors like red or gold during celebrations.' }],
          ],
          [
            [{ text: 'Publicly reprimand others' }],
            [{ text: 'Results in loss of face.' }],
            [{ text: 'Raise concerns and talk things through in private.' }],
          ],
          [
            [{ text: 'Leave cash tips' }],
            [{ text: 'Tipping is not mainstream in China and embarrasses service staff.' }],
            [{ text: 'Skip tipping unless service charges are pre-included at luxury hotels.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.4 Distinct etiquette for ethnic minority regions',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'China has 55 ethnic minorities with diverse indigenous customs; learn local rules before visiting these destinations.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Xizang (Tibet) region', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Remove hats before entering temples and avoid stepping over door thresholds (regarded as Buddha’s shoulders).' }],
          [{ text: 'Turn prayer wheels only in a clockwise direction.' }],
          [{ text: 'Ask permission before photographing locals, especially pilgrims; unauthorized photography may trigger disputes.' }],
          [{ text: 'Fold and preserve gifted khata scarves instead of discarding; alternatively present them while crossing mountain passes.' }],
          [{ text: 'Wine toast ritual: ', bold: true }, { text: 'Dip your ring finger in wine and flick liquid three times to honor heaven, earth and gods before drinking.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Xinjiang region', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Do not carry pork food into halal restaurants or ask for pork dishes.' }],
          [{ text: 'Use "soup spoon" instead of the local offensive dialect term for spoon.' }],
          [{ text: 'Alcohol consumption is banned inside halal eateries unless the restaurant explicitly permits it.' }],
          [{ text: 'Avoid shaking dripping hands after washing, a disrespectful local custom.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Dai villages in Yunnan', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Take off shoes when entering traditional Dai stilt houses.' }],
          [{ text: 'Never peer into hosts’ private bedrooms or step across domestic hearths.' }],
          [{ text: 'Do not splash water onto elders, pregnant women or young kids during the Water-Splashing Festival.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'II. A taste of China: cuisine culture & food guide',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'An ancient Chinese proverb states: Food is mankind’s foremost necessity. In China, dining is more than sustenance, but a core social activity to build personal ties.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '2.1 Eight iconic Chinese regional cuisines',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'China’s vast territory creates stark regional food differences, best represented by eight renowned cooking styles.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1. Sichuan cuisine (Sichuan & Chongqing): numbing spicy delicacies',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Features: ', bold: true },
          { text: 'Spicy, aromatic and tingling; Sichuan peppercorn delivers a signature mouth-numbing sensation.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Representative dishes: ', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Mapo Tofu: ', bold: true }, { text: 'Silky tofu cooked with minced beef in spicy numbing sauce.' }],
          [{ text: 'Chongqing Hot Pot: ', bold: true }, { text: 'Famous spicy red-oil broth for customizable meat and vegetable dips.' }],
          [{ text: 'Dan Dan Noodles: ', bold: true }, { text: 'Spicy tossed noodles with strong appetizing flavor.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        runs: [
          { text: 'Tip: ', bold: true },
          { text: 'Sichuan chili differs from Western hot pepper; say bú yào là (no chili) upfront for non-spicy orders.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '2. Cantonese cuisine (Guangdong): fresh original flavors',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Features: ', bold: true },
          { text: 'Light seasoning prioritizing natural ingredient freshness, the most widespread Chinese food globally.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Representative dishes: ', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Cantonese Dim Sum: ', bold: true }, { text: 'Classic brunch with shrimp dumplings, siu mai and barbecued pork buns paired with tea.' }],
          [{ text: 'White Cut Chicken: ', bold: true }, { text: 'Simply poached chicken preserving natural juiciness.' }],
          [{ text: 'Roast Goose: ', bold: true }, { text: 'Crispy skin, tender meat served with sour plum sauce.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3. Jiangsu cuisine (Jiangsu & Shanghai): elegant Jiangnan cooking',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Features: ', bold: true },
          { text: 'Mild sweet taste, refined knife cuts and artful food presentation.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Representative dishes: ', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Soup Dumplings (Xiao Long Bao): ', bold: true }, { text: 'Thin wrappers filled with hot broth; sip soup via a small bite to avoid scalds.' }],
          [{ text: 'Lion’s Head Meatballs: ', bold: true }, { text: 'Slowly braised oversized tender pork balls.' }],
          [{ text: 'Dongpo Pork: ', bold: true }, { text: 'Fatty pork stewed until melt-in-your-mouth softness.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '4. Shandong cuisine (Shandong): the foundation of northern Chinese food',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Features: ', bold: true },
          { text: 'Savory umami taste with strict heat control; the origin of ancient imperial court recipes.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Representative dishes: ', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Peking Duck: ', bold: true }, { text: 'Derived from Shandong culinary craft; crispy duck wrapped in pancakes with sweet bean paste and green scallions, a top tourist pick.' }],
          [{ text: 'Braised Sea Cucumber with Green Onion: ', bold: true }, { text: 'Premium classic seafood specialty.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'The remaining four cuisines',
      },
      {
        kind: 'table',
        headers: [{ text: 'Cuisine' }, { text: 'Flavor profile' }, { text: 'Signature dish' }],
        rows: [
          [
            [{ text: 'Hunan' }],
            [{ text: 'Pure fiery heat without peppercorn numbness' }],
            [{ text: 'Steamed Chili Fish Head' }],
          ],
          [
            [{ text: 'Zhejiang' }],
            [{ text: 'Light fresh seafood' }],
            [{ text: 'West Lake Vinegar Fish, Longjing Tea Shrimp' }],
          ],
          [
            [{ text: 'Fujian' }],
            [{ text: 'Rich seafood and hearty broths' }],
            [{ text: 'Buddha Jumps Over the Wall' }],
          ],
          [
            [{ text: 'Anhui' }],
            [{ text: 'Heavy oil and dark sauce' }],
            [{ text: 'Stinky Mandarin Fish (pungent aroma, delicious flesh)' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '2.2 Round-table dining manners',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Chinese family-style meals are served on shared round tables, unlike Western individual plated dining.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Serving chopsticks / spoons: ', bold: true }, { text: 'Use designated shared utensils to grab food from communal plates instead of personal chopsticks.' }],
          [{ text: 'Do not rummage through dishes: ', bold: true }, { text: 'Eat whatever your chopsticks pick rather than digging for preferred ingredients.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '2.3 Catering for special dietary restrictions',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Modern China readily accommodates varied international dietary requirements.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Vegetarian & vegan travelers', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Search for sùshí cāntīng (vegetarian restaurant); affordable temple diners and upscale vegetarian fine-dining spots populate major cities.' }],
          [{ text: 'Say wǒ chī sù (I am vegetarian) for easy communication.' }],
          [{ text: 'Safe menu picks: Vegetarian Mapo Tofu, seasonal stir-fried greens and steamed rice.' }],
          [{ text: 'Recommended restaurants: ', bold: true }, { text: 'Jingzhaoyin (Beijing), Gongdelin (Shanghai).' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Halal diners', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Dine at restaurants marked with official Chinese halal signage; no pork or alcohol inside unless restaurant approval is granted.' }],
          [{ text: 'Xinjiang food and Lanzhou Beef Noodles are reliable halal choices.' }],
          [{ text: 'Must-tries: Lamb pilaf, grilled mutton skewers and beef noodle soup.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Gluten-free diet', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Challenging in China as wheat-based soy sauce is widely used across local recipes.' }],
          [{ text: 'Recommended foods: Plain steamed rice, steamed dishes and grilled meat; avoid noodles, regular soy sauce and fermented bean curd.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        runs: [
          { text: 'Tip: ', bold: true },
          { text: 'Prepare a printed allergy translation card to show restaurant attendants.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'III. In-depth Chinese cultural experiences',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Beyond landmark sightseeing, hands-on cultural activities unlock authentic local culture.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.1 Traditional Chinese festivals',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Join seasonal celebrations to experience core Chinese cultural traditions.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Spring Festival (Chinese Lunar New Year)', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Overview: ', bold: true }, { text: 'China’s biggest annual holiday, equivalent to Western Christmas for family reunions nationwide.' }],
          [{ text: 'Activities: ', bold: true }, { text: 'Pasting festive couplets, fireworks, family reunion feasts, temple fairs (Beijing Ditan Fair, Shanghai Yu Garden Lantern Show).' }],
          [{ text: 'Travel note: ', bold: true }, { text: 'Small local shops close temporarily while large shopping malls stay open; book transport tickets early amid holiday travel rushes.' }],
          [{ text: 'Clothing tip: ', bold: true }, { text: 'Skip pure black / white outfits; red symbolizes luck and prosperity.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Dragon Boat Festival', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Overview: ', bold: true }, { text: 'Held to honor ancient poet Qu Yuan; core customs include dragon boat races and glutinous rice zongzi dumpling making.' }],
          [{ text: 'Top experience: ', bold: true }, { text: 'Watch competitive boat races in Hangzhou or Guangzhou and learn homemade zongzi wrapping.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Mid-Autumn Festival', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Overview: ', bold: true }, { text: 'A reunion-centric holiday centered on moon appreciation and mooncake sharing.' }],
          [{ text: 'Iconic spot: ', bold: true }, { text: 'Hangzhou West Lake for moon viewing and casual tea with local residents.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.2 Hands-on traditional cultural activities',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Chinese tea ceremony', bold: true },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Tea is an indispensable part of Chinese heritage; sign up for professional tea courses to learn tea history and brewing techniques.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Booking: ', bold: true }, { text: 'English-led sessions bookable via GetYourGuide or Trip.com in Beijing and Hangzhou (premium tea hubs).' }],
          [{ text: 'Price: ', bold: true }, { text: '200 – 500 RMB including tea servings and complimentary snacks.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Hanfu traditional costume experience', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Hanfu (ancient Chinese garments) is a popular cultural trend; rent costumes for sightseeing photos in ancient towns.' }],
          [{ text: 'Booking: ', bold: true }, { text: 'Search "Hanfu rental" on Dianping; passport required for registration with a 300 – 1000 RMB security deposit.' }],
          [{ text: 'Best locations: ', bold: true }, { text: 'Luoyang Luoyi Ancient City, Xi’an Datang Everbright City, Lijiang Ancient Town.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Peking Opera experience', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'China’s national treasure opera; watch live performances or try costume fitting and traditional facial makeup painting.' }],
          [{ text: 'Recommended venues: ', bold: true }, { text: 'Beijing Jixiang Grand Theatre and Fenglei Peking Opera Troupe offer backstage visits and beginner acting lessons for tourists.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Calligraphy & kung fu lessons', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Take beginner short courses for traditional Chinese calligraphy or basic kung fu; take home your handwritten calligraphy as a unique travel souvenir.' }],
        ],
      },
    ],
    faqs: [
      {
        question: 'Is it rude to leave food on my plate in China?',
        answer: 'In most home and banquet settings, leaving a small amount of food signals that the host has provided enough. Finishing everything can imply they underfed you. At restaurants, eat what you ordered. Across all settings, avoid wasting food — taking only what you can finish is a widely appreciated norm.',
      },
      {
        question: 'How do I politely refuse a drink or toast at a Chinese banquet?',
        answer: 'You do not need to refuse outright. Use these softeners: gesture a small cup and say "随意" (suí yì, "as you wish"), keep pace by sipping slowly, or use a non-alcoholic substitute such as juice or water. Health or religious reasons are universally accepted. If you are hosting, never refill your own glass before your elders’ or hosts’ are filled.',
      },
      {
        question: 'Can I find vegetarian, halal, or gluten-free food easily in China?',
        answer: 'Major cities accommodate most diets: vegetarian restaurants (素食餐厅 sùshí cāntīng) are widespread, halal eateries (清真 qīngzhēn) with signage are common in Muslim quarters and Xinjiang, and gluten-free eating is possible but requires extra care because regular soy sauce contains wheat. Carry a printed allergy or diet card in Chinese for best results.',
      },
    ],
  },
  {
    slug: 'transportation',
    title: 'Transportation',
    summary:
      'A practical China-specific transport toolkit — apps, ride-hailing, high-speed rail, airport/station transfers, metro exits, scenic-area returns, and disruption handling.',
    icon: 'train',
    accent: 'secondary',
    readMinutes: 14,
    preview: [
      'Set up WeChat Pay / Alipay, AMap / Gaode, DiDi, and 12306 before arrival.',
      'Save Chinese address cards for hotels, stations, airports, and attractions — drivers and local staff rely on Chinese names.',
      'Confirm the exact railway station, metro exit, and scenic-area return method before each transfer.',
    ],
    body: [
      {
        kind: 'paragraph',
        runs: [
          { text: 'This toolkit supports foreign visitors with China-specific transport operations before and during their trip. It focuses on practical tasks that are easy to overlook: choosing the right mobility app, preparing Chinese location information, confirming ride-hailing pickup points, identifying exact railway stations, using high-speed rail, choosing airport or railway-station transfers, checking metro exits, arranging scenic-area return transport, and handling transport disruptions.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'I. Quick start: transport setup before arrival',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Complete the following setup before entering China to reduce the most common China-specific transport friction.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Preparation item' }, { text: 'Why it matters in China' }, { text: 'Ready-to-use output' }],
        rows: [
          [
            [{ text: 'Set up WeChat Pay / Alipay' }],
            [{ text: 'These are the main everyday payment tools in China, often needed for ride-hailing, local transport QR codes, and service counters.' }],
            [{ text: 'Payment method tested or backup payment prepared.' }],
          ],
          [
            [{ text: 'Install AMap / Gaode (or other local maps)' }],
            [{ text: 'Chinese place names, entrances, metro exits, and live route options are often easier to identify through local map data.' }],
            [{ text: 'Saved map app with key destinations searchable.' }],
          ],
          [
            [{ text: 'Install DiDi / ride-hailing entries' }],
            [{ text: 'Useful for point-to-point rides when the exact destination is known.' }],
            [{ text: 'Account registration and payment setup checked.' }],
          ],
          [
            [{ text: 'Prepare 12306 / Trip.com' }],
            [{ text: 'High-speed rail requires exact station names and passport-based booking information.' }],
            [{ text: 'Passport information and target station names prepared.' }],
          ],
          [
            [{ text: 'Create Chinese location cards' }],
            [{ text: 'Drivers, local staff, and apps recognize Chinese names more reliably than English names.' }],
            [{ text: 'Hotel, station, airport, and attraction cards saved offline.' }],
          ],
          [
            [{ text: 'Save offline screenshots' }],
            [{ text: 'Network, app login, or translation may fail at the moment of travel.' }],
            [{ text: 'Screenshots of addresses, tickets, pickup points, and station names saved.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'II. Transport app selection tool',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Match each transport decision with the most useful tool depending on your task.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Compare whether metro, taxi, walking, or bus is better', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Recommended tool: ', bold: true }, { text: 'AMap / Gaode.' }],
          [{ text: 'How to use it well: ', bold: true }, { text: 'Search the destination by Chinese name when possible; compare time, transfers, walking distance, and exits before choosing.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Call a car when the destination is already clear', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Recommended tool: ', bold: true }, { text: 'DiDi or ride-hailing entry inside a local app.' }],
          [{ text: 'How to use it well: ', bold: true }, { text: 'Use the Chinese destination name; confirm pickup point carefully before requesting a ride.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Book or check high-speed rail', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Recommended tool: ', bold: true }, { text: '12306 / Trip.com.' }],
          [{ text: 'How to use it well: ', bold: true }, { text: 'Check the exact departure and arrival station, not only the city name. Use the same passport information for booking and travel.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Move inside large cities', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Recommended tool: ', bold: true }, { text: 'AMap / Gaode + metro app or transit QR in payment app.' }],
          [{ text: 'How to use it well: ', bold: true }, { text: 'Identify the closest station and the correct exit. The exit often matters more than the station name.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Travel between scenic areas, ancient towns, or mountain areas', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Recommended tool: ', bold: true }, { text: 'AMap / hotel assistance / route-page transport card.' }],
          [{ text: 'How to use it well: ', bold: true }, { text: 'Confirm the return method before departure. App ride-hailing may be less stable outside city centers.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'III. Chinese location card tool',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'A Chinese location card turns key destinations into a copyable and screenshot-friendly card for maps, ride-hailing, and taxis.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Template A: general location card',
      },
      {
        kind: 'table',
        headers: [{ text: 'Field' }, { text: 'Content' }],
        rows: [
          [[{ text: 'English name' }], [{ text: 'Name used by foreign visitors or shown on the website.' }]],
          [[{ text: 'Chinese name' }], [{ text: 'Official Chinese name used by local maps, drivers, and service staff.' }]],
          [[{ text: 'Chinese address' }], [{ text: 'Full address in Chinese, verified before publication.' }]],
          [[{ text: 'Nearest metro / station' }], [{ text: 'Nearest station and line, if relevant.' }]],
          [[{ text: 'Recommended entrance' }], [{ text: 'Main gate, hotel lobby, station exit, scenic entrance, or pickup area.' }]],
          [[{ text: 'Use this card for' }], [{ text: 'AMap search / DiDi destination / taxi / asking staff / offline backup.' }]],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Template B: railway station card',
      },
      {
        kind: 'table',
        headers: [{ text: 'Field' }, { text: 'Content' }],
        rows: [
          [[{ text: 'City' }], [{ text: 'Beijing / Shanghai / Xi’an / Hangzhou / Suzhou / Guangzhou / Shenzhen, etc.' }]],
          [[{ text: 'Exact station name' }], [{ text: 'Example: 北京南站, 北京西站, 上海虹桥站, 西安北站.' }]],
          [[{ text: 'English display name' }], [{ text: 'Example: Beijing South Railway Station / Shanghai Hongqiao Railway Station.' }]],
          [[{ text: 'Used for' }], [{ text: 'High-speed rail booking, taxi destination, metro transfer, or route package transfer.' }]],
          [[{ text: 'Check before departure' }], [{ text: 'Same station name on ticket, map, and route page; travel time from hotel to station; terminal or entrance if available.' }]],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Route-page use: ', bold: true },
          { text: 'For classic routes such as Beijing–Xi’an–Shanghai or Shanghai–Hangzhou–Suzhou, the route page can embed station cards so users do not confuse city names with specific departure stations.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'IV. Ride-hailing toolkit: DiDi and AMap / Gaode',
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Use scenarios & starting points',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Scenario: you already know the exact destination', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Better starting point: ', bold: true }, { text: 'DiDi.' }],
          [{ text: 'Operational focus: ', bold: true }, { text: 'Enter the Chinese destination, confirm pickup point, check plate number, and pay in app.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Scenario: you are not sure whether to take metro or taxi', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Better starting point: ', bold: true }, { text: 'AMap / Gaode.' }],
          [{ text: 'Operational focus: ', bold: true }, { text: 'Compare route time, transfers, traffic, walking distance, and estimated ride option.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Scenario: you are leaving a mall, station, airport, or scenic area', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Better starting point: ', bold: true }, { text: 'AMap + DiDi.' }],
          [{ text: 'Operational focus: ', bold: true }, { text: 'Use the map to identify the correct gate, exit, or pickup area before requesting the ride.' }],
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Scenario: you only have an English place name', bold: true },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Better starting point: ', bold: true }, { text: 'AMap / website location card.' }],
          [{ text: 'Operational focus: ', bold: true }, { text: 'Find or copy the Chinese name first; then use it in ride-hailing or show it to local staff.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Ride-hailing operation card',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Prepare destination: ', bold: true }, { text: 'Copy the Chinese name or address from the website location card.' }],
          [{ text: 'Set pickup point: ', bold: true }, { text: 'Use the map pin. At stations, airports, and malls, choose the designated pickup area or a clear gate / exit.' }],
          [{ text: 'Choose ride type: ', bold: true }, { text: 'Select a standard ride unless a larger car is needed for luggage.' }],
          [{ text: 'Check car information: ', bold: true }, { text: 'Match the plate number, car color / model, and driver information shown in the app before boarding.' }],
          [{ text: 'Handle driver contact: ', bold: true }, { text: 'Use in-app messages or translation rather than relying on phone calls.' }],
          [{ text: 'Complete payment: ', bold: true }, { text: 'Use WeChat Pay / Alipay or the payment method supported in the app. Keep a screenshot of the trip record.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Pickup point recognition card',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Airport: ', bold: true }, { text: 'Follow signs for ride-hailing / online car-hailing / taxi pickup. Do not request the car before reaching a workable pickup zone.' }],
          [{ text: 'Railway station: ', bold: true }, { text: 'Use the exit number, floor, and pickup area. Station complexes may have multiple ride-hailing zones.' }],
          [{ text: 'Shopping mall: ', bold: true }, { text: 'Use a gate, entrance name, or visible landmark. A mall name alone may be too broad.' }],
          [{ text: 'Hotel: ', bold: true }, { text: 'Use the main lobby entrance unless the hotel has multiple buildings or entrances.' }],
          [{ text: 'Scenic area: ', bold: true }, { text: 'Use visitor center, parking lot, shuttle bus station, or main entrance as the pickup point.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Problem solving during ride-hailing',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Driver calls but communication is difficult: ', bold: true }, { text: 'Send a short in-app text and location screenshot. Ask hotel front desk, station staff, or nearby service staff to help explain the pickup point.' }],
          [{ text: 'App cannot find the destination: ', bold: true }, { text: 'Search by Chinese name or paste the Chinese address. Use the website location card or AMap to confirm the correct Chinese place name.' }],
          [{ text: 'Pickup point is unclear: ', bold: true }, { text: 'Move to a marked gate, exit, hotel lobby, or ride-hailing pickup zone. Cancel and request again only after standing at a clearer location.' }],
          [{ text: 'Payment is not ready: ', bold: true }, { text: 'Do not rely on app ride-hailing as the only option. Use official taxi queue, hotel-arranged car, or ask local staff for assistance.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'V. High-speed rail and station identification toolkit',
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Station patterns & traveler checks',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'North / South / East / West station: ', bold: true }, { text: 'Means a separate railway station, often not the same as the central station. Always confirm the Chinese name and travel time from hotel to station.' }],
          [{ text: 'Hongqiao / airport-area hubs: ', bold: true }, { text: 'Large integrated transport hubs including railway, airport, metro, and road pickup zones. Confirm whether the destination is the railway station, airport terminal, or pickup point.' }],
          [{ text: 'City name only: ', bold: true }, { text: 'Not enough for transport planning. Add the exact station name before booking or requesting a ride.' }],
          [{ text: 'Scenic-area station names: ', bold: true }, { text: 'May be outside the old town, mountain entrance, or tourist area. Check onward transfers to the hotel or scenic entrance.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Rail ticket & station check card',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Departure city: ', bold: true }, { text: 'e.g., Beijing.' }],
          [{ text: 'Departure station: ', bold: true }, { text: 'e.g., 北京南站 / Beijing South Railway Station.' }],
          [{ text: 'Arrival city: ', bold: true }, { text: 'e.g., Xi’an or Shanghai.' }],
          [{ text: 'Arrival station: ', bold: true }, { text: 'e.g., 西安北站 / Xi’an North Railway Station; 上海虹桥站 / Shanghai Hongqiao Railway Station.' }],
          [{ text: 'Passport info: ', bold: true }, { text: 'Same passport used for booking and boarding.' }],
          [{ text: 'Time buffer: ', bold: true }, { text: 'Leave enough time for transport to station, security check, ticket / ID verification, and walking inside the station.' }],
          [{ text: 'Screenshots: ', bold: true }, { text: 'Ticket, train number, station name in Chinese, carriage / seat, and route from hotel to station.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Inside the railway station card',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Security check: ', bold: true }, { text: 'Prepare passport and luggage for station security.' }],
          [{ text: 'Ticket / ID verification: ', bold: true }, { text: 'Use passport or designated manual / assisted channel when required.' }],
          [{ text: 'Waiting room / gate: ', bold: true }, { text: 'Find the gate shown for the train number. Gate info may appear closer to departure time.' }],
          [{ text: 'Platform: ', bold: true }, { text: 'Follow gate instructions after ticket check.' }],
          [{ text: 'Carriage & seat: ', bold: true }, { text: 'Match carriage number first, then seat number.' }],
          [{ text: 'Exit / transfer: ', bold: true }, { text: 'On arrival, check exit signs before calling a ride; pickup areas may be far from platforms.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'VI. Airport and railway station transfer cards',
      },
      {
        kind: 'table',
        headers: [{ text: 'Arrival situation' }, { text: 'Recommended first choice' }, { text: 'Reason' }],
        rows: [
          [
            [{ text: 'Payment and app are ready; hotel address is saved in Chinese' }],
            [{ text: 'Ride-hailing or official taxi' }],
            [{ text: 'Fast point-to-point transfer with clear destination information.' }],
          ],
          [
            [{ text: 'Daytime arrival; hotel is close to a metro / airport express station' }],
            [{ text: 'Metro / airport express' }],
            [{ text: 'Predictable travel time and less exposure to road traffic.' }],
          ],
          [
            [{ text: 'Late-night arrival or heavy luggage' }],
            [{ text: 'Official taxi / hotel-arranged transfer / ride-hailing (if set up)' }],
            [{ text: 'Reduces transfer uncertainty after a long trip.' }],
          ],
          [
            [{ text: 'App login or payment not working' }],
            [{ text: 'Official taxi queue or hotel assistance' }],
            [{ text: 'Avoid depending on a ride-hailing app that cannot be completed.' }],
          ],
          [
            [{ text: 'Large railway station or mixed airport-rail hub' }],
            [{ text: 'Reach the correct exit / pickup area first, then request ride' }],
            [{ text: 'Pickup point accuracy is more important than simply entering the destination.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Arrival transfer card for website pages',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Arrival point: ', bold: true }, { text: 'Airport terminal / railway station / coach station.' }],
          [{ text: 'Destination card: ', bold: true }, { text: 'Hotel Chinese name, address, phone, and nearest gate or entrance.' }],
          [{ text: 'Primary transfer option: ', bold: true }, { text: 'Metro / airport express / ride-hailing / official taxi / hotel pickup.' }],
          [{ text: 'Pickup or exit detail: ', bold: true }, { text: 'Terminal, floor, gate, exit number, or ride-hailing zone.' }],
          [{ text: 'Backup option: ', bold: true }, { text: 'Official taxi queue, hotel front desk, service counter, or metro alternative.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'VII. Metro and city transit toolkit',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The China-specific detail that matters most is the station exit. A visitor can reach the right station and still lose time if the wrong exit leads to the opposite side of a road or hub.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Metro exit card',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Destination: ', bold: true }, { text: 'Attraction / hotel / restaurant / station.' }],
          [{ text: 'Metro station: ', bold: true }, { text: 'Chinese and English station name.' }],
          [{ text: 'Line: ', bold: true }, { text: 'Metro line number or color.' }],
          [{ text: 'Exit: ', bold: true }, { text: 'Exact exit number or letter.' }],
          [{ text: 'Walking direction: ', bold: true }, { text: 'Landmark, road name, or gate after exiting.' }],
          [{ text: 'Last train reminder: ', bold: true }, { text: 'Verify if returning late.' }],
          [{ text: 'Alternative: ', bold: true }, { text: 'Ride-hailing pickup point nearby.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'City mobility scenarios',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Destination is near a metro station and travel is during normal operating hours: ', bold: true }, { text: 'Use metro route with exit card.' }],
          [{ text: 'Destination requires several transfers and traveler has large luggage: ', bold: true }, { text: 'Ride-hailing or taxi after checking route time.' }],
          [{ text: 'Destination is inside an old town, pedestrian area, or park zone: ', bold: true }, { text: 'Metro or ride-hailing to nearest gate, then walk.' }],
          [{ text: 'Traveler is unsure whether taxi or metro is faster: ', bold: true }, { text: 'AMap route comparison before departure.' }],
          [{ text: 'Late return after dinner or event: ', bold: true }, { text: 'Check last metro time and keep ride-hailing pickup point as backup.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'VIII. Scenic area and non-central transport toolkit',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'For scenic areas, ancient towns, mountains, and rural destinations, the most important task is confirming both arrival and return transport.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Route type' }, { text: 'Transport detail to confirm' }, { text: 'Card output' }],
        rows: [
          [
            [{ text: 'Guilin–Yangshuo style (river / town)' }],
            [{ text: 'Pier, coach station, hotel pickup point, and return timing.' }],
            [{ text: 'Pier / transfer card + return option card.' }],
          ],
          [
            [{ text: 'Zhangjiajie–Phoenix style (scenic + ancient town)' }],
            [{ text: 'Scenic entrance, city transfer, luggage storage, and late return availability.' }],
            [{ text: 'Entrance card + intercity transfer card.' }],
          ],
          [
            [{ text: 'Chengdu–Jiuzhaigou–Huanglong style (mountain route)' }],
            [{ text: 'Long-distance transfer, altitude / weather disruption, and scheduled return option.' }],
            [{ text: 'Long-distance transfer card + risk note.' }],
          ],
          [
            [{ text: 'Huangshan–Hongcun style (mountain + village)' }],
            [{ text: 'Mountain transfer center, cableway area, village transfer, and last shuttle.' }],
            [{ text: 'Transfer center card + last-return reminder.' }],
          ],
          [
            [{ text: 'Lijiang–Shangri-La–Yulong Snow Mountain style' }],
            [{ text: 'Distance between old town, scenic entrance, and return pickup point.' }],
            [{ text: 'Scenic entrance card + driver / hotel contact note.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Scenic area return card',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Outbound transport: ', bold: true }, { text: 'How to reach the scenic entrance or transfer center.' }],
          [{ text: 'Exact drop-off point: ', bold: true }, { text: 'Visitor center, gate, pier, coach station, or shuttle station.' }],
          [{ text: 'Return method: ', bold: true }, { text: 'Bus, shuttle, ride-hailing, taxi, hotel-arranged car, or booked transfer.' }],
          [{ text: 'Latest safe return time: ', bold: true }, { text: 'Time by which traveler should start returning (verify before publication).' }],
          [{ text: 'If return transport fails: ', bold: true }, { text: 'Contact hotel, service center, route provider, or use pre-saved backup transport option.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'IX. Transport problem-solving cards',
      },
      {
        kind: 'table',
        headers: [{ text: 'Problem' }, { text: 'Action card' }],
        rows: [
          [
            [{ text: 'Destination cannot be found in the app' }],
            [{ text: 'Use the Chinese location card. Search by Chinese name first; if results are unclear, paste the full Chinese address.' }],
          ],
          [
            [{ text: 'Ride-hailing pickup point is unclear' }],
            [{ text: 'Move to a visible gate, exit, lobby, visitor center, or official pickup zone. Update the pickup pin before requesting again.' }],
          ],
          [
            [{ text: 'Driver calls but the traveler cannot communicate' }],
            [{ text: 'Use in-app text or translation. Send the Chinese address or pickup-point screenshot. Ask nearby staff to help only if necessary.' }],
          ],
          [
            [{ text: 'Wrong railway station selected' }],
            [{ text: 'Compare the ticket station name, Chinese station name, and map destination before leaving. If already wrong, ask station staff about fastest transfer.' }],
          ],
          [
            [{ text: 'Missed train' }],
            [{ text: 'Go to the service counter or ticket office with passport and ticket screenshot; ask about change / refund options.' }],
          ],
          [
            [{ text: 'Metro exit is confusing' }],
            [{ text: 'Check the exit number on the map. If already outside, use the road name or landmark to reorient.' }],
          ],
          [
            [{ text: 'Scenic return transport is uncertain' }],
            [{ text: 'Confirm return method before entering the scenic area. Save hotel or local service contact for backup.' }],
          ],
          [
            [{ text: 'Payment setup fails' }],
            [{ text: 'Use official taxi, hotel assistance, or service counter support instead of depending only on ride-hailing.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'X. Transport toolkit FAQ',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Q: Do I need both DiDi and AMap / Gaode?', bold: true },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'A: ', bold: true },
          { text: 'AMap is useful for route comparison and location recognition. DiDi is useful when the destination is clear and the traveler wants a point-to-point ride. Using both gives better coverage.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Q: Is an English place name enough for transport apps?', bold: true },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'A: ', bold: true },
          { text: 'Not always. Save Chinese names and addresses for hotels, stations, and attractions. Chinese information is more reliable for drivers, staff, and local map searches.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Q: Why is the exact railway station so important?', bold: true },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'A: ', bold: true },
          { text: 'Many cities have multiple railway stations. A ticket to Beijing South, Beijing West, Shanghai Hongqiao, or Xi’an North refers to a specific station, not only the city.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Q: When is the metro the better option?', bold: true },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'A: ', bold: true },
          { text: 'In major cities, the metro is usually suitable when the destination is close to a station and the correct exit is known. For heavy luggage, late-night travel, or multiple transfers, ride-hailing may be easier.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Q: What is the most important preparation for scenic-area transport?', bold: true },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'A: ', bold: true },
          { text: 'Confirm the return method before going. In scenic or mountain areas, getting there may be easier than getting back at the desired time.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Q: What payment setup matters most for transport?', bold: true },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'A: ', bold: true },
          { text: 'Prepare WeChat Pay and / or Alipay. Transport users need payment readiness before relying on apps.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'XI. Website integration and maintenance',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The transportation toolkit can be converted into reusable website components.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'City guide: ', bold: true }, { text: 'Reusable elements include Chinese address cards, metro exit cards, and local ride-hailing notes.' }],
          [{ text: 'Route package: ', bold: true }, { text: 'Reusable elements include exact station cards, intercity transfer cards, and scenic-area return cards.' }],
          [{ text: 'Practical information: ', bold: true }, { text: 'Hosts the full transport toolkit, app selection tool, payment reminder, and FAQ.' }],
          [{ text: 'Landing page / checklist: ', bold: true }, { text: 'Hosts the short pre-arrival transport setup checklist.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        runs: [
          { text: 'Publication verification notes: ', bold: true },
          { text: 'Before website publication, verify app interfaces, payment availability, railway station names, airport pickup rules, metro exits, scenic-area transfer schedules, and city-specific transport policies. App and transport rules may change by version, city, season, and service provider.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need both DiDi and AMap / Gaode?',
        answer: 'AMap is useful for route comparison and location recognition. DiDi is useful when the destination is clear and the traveler wants a point-to-point ride. Using both gives better coverage.',
      },
      {
        question: 'Is an English place name enough for transport apps?',
        answer: 'Not always. Save Chinese names and addresses for hotels, stations, and attractions. Chinese information is more reliable for drivers, staff, and local map searches.',
      },
      {
        question: 'Why is the exact railway station so important?',
        answer: 'Many cities have multiple railway stations. A ticket to Beijing South, Beijing West, Shanghai Hongqiao, or Xi’an North refers to a specific station, not only the city. Confirm the Chinese station name on the ticket before booking transfers or ride-hailing.',
      },
      {
        question: 'When is the metro the better option?',
        answer: 'In major cities, the metro is usually suitable when the destination is close to a station and the correct exit is known. For heavy luggage, late-night travel, or multiple transfers, ride-hailing may be easier. Check last-train times before relying on a metro return.',
      },
      {
        question: 'What is the most important preparation for scenic-area transport?',
        answer: 'Confirm the return method before going. In scenic or mountain areas, getting there may be easier than getting back at the desired time. Save the hotel or local service contact as a backup, and identify the scenic entrance pickup point in advance.',
      },
      {
        question: 'What payment setup matters most for transport?',
        answer: 'Prepare WeChat Pay and / or Alipay with an international card linked. Transport users need payment readiness before relying on apps. If ride-hailing payment fails, fall back to official taxi queues, hotel-arranged cars, or service-counter support.',
      },
    ],
  },
  {
    slug: 'payment',
    title: 'Payment',
    summary:
      'A clear pre-arrival and on-the-ground guide to mobile payment, bank cards, and cash for independent travelers preparing to visit China.',
    icon: 'wallet',
    accent: 'jade',
    readMinutes: 16,
    preview: [
      'Use Alipay as the main payment tool, WeChat Pay as a backup, plus at least one physical international bank card and some RMB cash.',
      'Link a foreign card to Alipay or WeChat Pay — direct QR payment is the core function, not balance top-up.',
      'For payment failures, follow a 9-step backup sequence ending in RMB cash or staff assistance.',
    ],
    body: [
      {
        kind: 'paragraph',
        runs: [
          { text: 'China is highly mobile-payment oriented. Many restaurants, convenience stores, taxis, attractions, shopping malls, local shops, and mini-programs use QR-code payment. Foreign visitors should understand all available methods, as no single method works perfectly in every situation.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Recommended default setup: ', bold: true },
          { text: 'Use Alipay as the main payment tool, WeChat Pay as a backup, keep at least one physical international bank card, and carry a small amount of RMB cash for emergencies.' },
        ],
      },
      {
        kind: 'steps',
        steps: [
          {
            label: 'Alipay',
            caption: 'Primary daily payment',
            tone: 'primary',
          },
          {
            label: 'WeChat Pay',
            caption: 'Backup for QR & mini-programs',
            tone: 'accent',
          },
          {
            label: 'Bank Card',
            caption: 'Hotels, deposits, large buys',
            tone: 'jade',
          },
          {
            label: 'RMB Cash',
            caption: 'Emergency fallback',
            tone: 'warning',
          },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '1. Payment methods in China',
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.1 Alipay',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Alipay is usually the best first choice for short-term foreign visitors. Overseas users can download the official Alipay app, choose the International Version after signing up if prompted, and link an eligible international bank card. Once the card is linked, visitors can usually pay by scanning a merchant QR code or showing their own payment code.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'Restaurants, shops, convenience stores, attractions, taxis, public transport services, hotel payments, and some travel bookings.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        runs: [
          { text: 'Watch out: ', bold: true },
          { text: 'International-card accounts are mainly for daily purchases. Person-to-person transfers, red packets, wealth management, insurance, and some other financial services may not be supported.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.2 WeChat Pay / Weixin Pay',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'WeChat Pay is inside the WeChat app. It is very useful in daily local situations, especially restaurants, mini-programs, local services, stores, and some transport or ticketing flows. Even if Alipay is the main tool, WeChat Pay should be prepared as a backup.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Best for: ', bold: true },
          { text: 'Restaurant QR ordering, mini-programs, convenience stores, malls, local services, and daily purchases.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        runs: [
          { text: 'Watch out: ', bold: true },
          { text: 'International cards linked to WeChat Pay are usually for everyday merchant purchases. Transfers, red packets, balance top-ups, receiving money, and withdrawals may be restricted or unavailable.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.3 International bank cards',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Physical international bank cards are useful at large hotels, airports, major malls, international chains, high-end restaurants, and some attraction counters. However, small local merchants may not have POS terminals or may not accept foreign cards.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.4 RMB cash',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Cash is not the most convenient daily method, but it is an essential emergency backup. It is useful when your phone has no battery, the network fails, a payment app is under risk control, or a small merchant cannot accept foreign-card-linked mobile payments.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '1.5 Other options',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Some Alipay+ partner e-wallets, UnionPay-related services, Tour Card, and e-CNY may work in selected situations. They can be useful supplements, but most short-term visitors should first prepare Alipay, WeChat Pay, at least one international bank card, and a small amount of cash.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Simple comparison',
      },
      {
        kind: 'table',
        headers: [{ text: 'Method' }, { text: 'Use first when…' }, { text: 'Main limitation' }],
        rows: [
          [
            [{ text: 'Alipay' }],
            [{ text: 'You need a broad, tourist-friendly mobile payment tool.' }],
            [{ text: 'Some financial functions are not available with international cards.' }],
          ],
          [
            [{ text: 'WeChat Pay' }],
            [{ text: 'You need to use restaurants, mini-programs, or local services.' }],
            [{ text: 'Some mini-programs and transfer functions may not work for foreign-card users.' }],
          ],
          [
            [{ text: 'International card' }],
            [{ text: 'You are at a hotel, airport, mall, or larger merchant.' }],
            [{ text: 'Acceptance is weaker at small local merchants.' }],
          ],
          [
            [{ text: 'RMB cash' }],
            [{ text: 'Apps, cards, internet, or phone battery fail.' }],
            [{ text: 'Not always convenient; small change may be needed.' }],
          ],
          [
            [{ text: 'Alipay+ / other tools' }],
            [{ text: 'You already use a supported home wallet or need extra backup.' }],
            [{ text: 'Coverage depends on wallet, city, and merchant.' }],
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Important note: card linking is different from wallet top-up. ', bold: true },
          { text: 'Many visitors think they must top up an Alipay or WeChat wallet balance before paying. For short-term visitors, this is usually not necessary. The practical method is to link an eligible international card and pay merchants directly. If a foreign card cannot top up the wallet balance, it may still work for direct merchant payments.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '2. Recommended setup for different travelers',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Choose a setup based on where you travel and how much risk you want to reduce.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Traveler type' }, { text: 'Typical situation' }, { text: 'Recommended setup' }],
        rows: [
          [
            [{ text: 'Short city trip' }],
            [{ text: 'Major cities such as Beijing, Shanghai, Guangzhou, Shenzhen, Hangzhou, Chengdu, or Xi’an.' }],
            [{ text: 'Alipay + WeChat Pay + 1 international card + RMB 500–1,000 cash.' }],
          ],
          [
            [{ text: 'Multi-city independent trip' }],
            [{ text: 'High-speed rail, several hotels, and multiple cities.' }],
            [{ text: 'Alipay + WeChat Pay + 2 cards from different banks + around RMB 1,000 cash.' }],
          ],
          [
            [{ text: 'Rural, small-town, or scenic-area trip' }],
            [{ text: 'Ancient towns, mountain areas, smaller cities, or remote scenic routes.' }],
            [{ text: 'Alipay + WeChat Pay + physical card + RMB 1,000–2,000 cash in small notes.' }],
          ],
          [
            [{ text: 'Family or higher-budget trip' }],
            [{ text: 'Hotel deposits, private transfers, expensive tickets, or shopping.' }],
            [{ text: 'Prepay key bookings where possible + Alipay + WeChat Pay + 2 cards + cash backup.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '3. Before departure preparation',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Most payment problems can be prevented before departure. Complete the following steps before you fly, especially if it is your first trip to China.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.1 Prepare phone number and internet access',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Keep your original phone number active if your bank or payment app sends SMS verification codes to that number.' }],
          [{ text: 'Enable international roaming or confirm that you can receive SMS while abroad.' }],
          [{ text: 'Consider buying a China-compatible travel SIM or eSIM for mobile data. A data-only eSIM is useful for internet access, but it may not receive SMS codes.' }],
          [{ text: 'A Chinese mainland +86 number is not strictly required for Alipay setup, but it can help with ride-hailing, food delivery, local mini-programs, and hotel communication.' }],
          [{ text: 'If you want a Chinese SIM card, buy it from an airport counter, official mobile-carrier store, or verified provider (passport required).' }],
          [{ text: 'Download the payment apps before arriving in China. Do not rely on airport Wi-Fi or post-arrival app downloads.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        runs: [
          { text: 'Power bank reminder: ', bold: true },
          { text: 'Carry a power bank, because no phone battery can mean no mobile payment.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.2 Download the right apps',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Alipay: ', bold: true }, { text: 'Download the official app. After sign-up, choose International Version if the app offers it.' }],
          [{ text: 'WeChat: ', bold: true }, { text: 'Download the official app. WeChat Pay is inside WeChat; there is no separate WeChat Pay app for ordinary visitors.' }],
          [{ text: 'Your bank app: ', bold: true }, { text: 'Use it to approve security checks, adjust limits, and check blocked transactions.' }],
          [{ text: 'Trip.com: ', bold: true }, { text: 'Or another reliable international booking app, useful when local mini-programs or payment flows are difficult.' }],
          [{ text: 'Map and translation apps: ', bold: true }, { text: 'Save hotel addresses, station names, and payment phrases in Chinese.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.3 Prepare identity information',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'When filling in app information, use your passport spelling. Avoid nicknames, abbreviations, Chinese names, or different name orders unless the app specifically asks for them.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Valid passport and a clear photo of the passport information page.' }],
          [{ text: 'Visa page or entry record if applicable.' }],
          [{ text: 'Hotel booking and itinerary screenshots.' }],
          [{ text: 'Cardholder name that matches your passport as closely as possible.' }],
          [{ text: 'Emergency contact and hotel front desk contact.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.4 Prepare cards and cash',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Bring at least one physical international bank card. Two cards from different banks are better.' }],
          [{ text: 'Ask your bank to enable overseas and online transactions in China.' }],
          [{ text: 'Check single-transaction and daily limits, and confirm that you can receive bank SMS or app approvals while traveling.' }],
          [{ text: 'Prepare RMB 500–1,000 cash for a short city trip, or RMB 1,000–2,000 for multi-city or rural travel. Carry small notes such as RMB 10, 20, 50, and 100.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '4. Alipay setup and use',
      },
      {
        kind: 'heading',
        level: 3,
        text: '4.1 Download and register',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          [{ text: 'Open the App Store or Google Play before departure.' }],
          [{ text: 'Search for "Alipay" and download the official app.' }],
          [{ text: 'Open Alipay and choose your country or region code.' }],
          [{ text: 'Enter your mobile number and complete SMS verification.' }],
          [{ text: 'After signing up, choose "International Version" if prompted.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Do not confuse Alipay, AlipayHK, and Alipay+: ', bold: true },
          { text: 'Alipay is the main app most overseas visitors use for payment in the Chinese mainland. AlipayHK is mainly for Hong Kong users. Alipay+ is a cross-border payment network that supports some home e-wallets at participating merchants — it is not the main app most tourists need to download.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '4.2 Add an international bank card',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          [{ text: 'Open Alipay and go to Me / Account / Bank Cards.' }],
          [{ text: 'Tap Add Card or Add Now.' }],
          [{ text: 'Enter your card number, expiry date, security code, and billing information if requested.' }],
          [{ text: 'Complete bank verification (SMS, app approval, or 3D Secure).' }],
          [{ text: 'Wait for confirmation that the card has been added.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        runs: [
          { text: 'Test-payment tip: ', bold: true },
          { text: 'After the card is linked, do a small test payment after arrival, such as buying water at a convenience store. Avoid making a large first transaction because it may trigger card issuer or platform risk control.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '4.3 Complete identity verification',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'For a smoother experience, complete identity verification when the app asks for it. Use your passport and make sure the photo is clear. The name, document number, and birth date should match your passport. Repeatedly changing identity information may increase the chance of risk control.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '4.4 Pay with Alipay',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Method A — scan the merchant’s QR code: ', bold: true },
          { text: 'Open Alipay → Tap Scan → Scan the merchant QR code → Enter the amount if needed → Choose the linked international card as the funding source → Check the merchant name and amount → Confirm payment.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Method B — show your payment code: ', bold: true },
          { text: 'Open Alipay → Tap Pay / Collect or Pay Code → Show your QR code to the cashier → Wait while the cashier scans it → Leave only after the payment-success screen appears.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '4.5 If Alipay cannot top up balance',
      },
      {
        kind: 'callout',
        tone: 'warning',
        runs: [
          { text: 'Stay calm: ', bold: true },
          { text: 'For tourists, top-up is usually not the core function. A foreign card may fail to top up the wallet balance but still work for merchant payments. Try direct QR payment with the linked card. If that fails, switch to WeChat Pay, another card, a physical card, or cash.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '5. WeChat Pay setup and use',
      },
      {
        kind: 'heading',
        level: 3,
        text: '5.1 Download WeChat and find Wallet',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Download or update the official WeChat app before departure.' }],
          [{ text: 'Register or sign in with your mobile number.' }],
          [{ text: 'Open WeChat and go to Me.' }],
          [{ text: 'Tap Services, then Wallet. (If Wallet is not visible, try Me → Settings → General → Tools → Weixin Pay, then enable it.)' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '5.2 Add a card and identity information',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Open Wallet and tap Add a Card.' }],
          [{ text: 'Read and accept the service agreement and privacy notice.' }],
          [{ text: 'Enter card information.' }],
          [{ text: 'Fill in identity information, using your passport, and upload a passport copy if requested.' }],
          [{ text: 'Complete bank verification and wait for confirmation.' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'SMS note: ', bold: true },
          { text: 'An international phone number can generally be used if it can receive SMS verification codes. If it cannot receive SMS while you are in China, setup or verification may fail.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '5.3 Pay with WeChat Pay',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'For in-store payment, either show your payment code in WeChat or use Scan to scan the merchant QR code. For restaurants and local services, you may be asked to pay inside a WeChat mini-program. If the mini-program is Chinese-only, requires a Chinese phone number, or does not accept your linked card, ask staff for help or switch to Alipay, a counter payment, a travel booking app, a physical card, or cash.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '5.4 Limitations to expect',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'International cards are mainly for everyday merchant purchases in the Chinese mainland.' }],
          [{ text: 'Transfers, red packets, receiving money, balance top-ups, and withdrawals may be restricted or unavailable.' }],
          [{ text: 'Fees and limits may apply. The final app payment page and your bank statement are the best places to confirm the actual charge.' }],
          [{ text: 'A mini-program may fail even if ordinary QR payment works. Try another payment route before assuming your whole account is unusable.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '6. Bank cards, cash and other payment options',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Physical bank cards work best in more international settings, such as hotels, airports, major malls, and international chain stores. They are less reliable in taxis, night markets, small local restaurants, rural areas, and small shops. Always ask before paying with a card.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Cash should be treated as an emergency backup. Use it when the phone has no battery, the network fails, payment apps are under review, or a small merchant cannot accept foreign-card-linked QR payments. Get cash from official exchange counters, banks, or ATMs that display your card network logo.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Alipay+ partner wallets, UnionPay, Tour Card, and e-CNY can be useful in selected cases, but setup and coverage vary. For most short-term visitors, they should be treated as optional extras rather than the main payment plan.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '7. How to pay in common travel scenarios',
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Restaurants and cafes',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Use Alipay or WeChat Pay first. Many restaurants use QR ordering, often through WeChat or Alipay mini-programs. If the menu is Chinese-only or payment fails inside a mini-program, ask a staff member to help with manual ordering or counter payment. Keep cash as a backup for small restaurants or night markets.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Convenience stores and supermarkets',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Show your Alipay or WeChat payment code. These places are good for your first small test payment after arrival. If mobile payment fails, try another app, another card inside the app, a physical card, or cash.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Taxis and ride-hailing',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'For taxis, Alipay and WeChat Pay are common, but cash is a very useful backup. For ride-hailing, payment is usually handled inside the app. Make sure you have internet access, a reachable phone number if needed, and the destination saved in Chinese.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Metro and buses',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Many cities support transport codes in Alipay or WeChat, but the setup may be city-specific. Do not assume one city’s transport code works everywhere. If transport code setup is difficult, use a ticket machine, service counter, or single-journey ticket where available.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'High-speed rail and long-distance transport',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Book through 12306, Trip.com, or another reliable platform that supports passport-based booking. Payment options depend on the platform. Always carry the passport used for booking, and check the exact station name, date, and passenger information.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Hotels',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Prepay through reliable booking platforms when possible. At check-in, hotels may ask for a deposit, so keep a physical international card and some cash available. For small hotels or guesthouses, confirm in advance whether they accept foreign guests and which payment methods they accept.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Attractions, museums and scenic areas',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Popular attractions may require online reservations with passport information. Use official websites, Trip.com, Alipay, WeChat, or on-site counters depending on the attraction. If a mini-program does not accept your payment, look for a staffed ticket counter or use a travel platform.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Night markets, local shops and rural areas',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Use Alipay or WeChat Pay first, but keep cash ready. These are the situations where small notes matter most. Physical international cards may not be accepted.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '8. Common problems and practical solutions',
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.1 Identity verification fails',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'The name order does not match the passport, the passport photo is unclear, the cardholder name differs from the passport name, or the app needs manual review.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Enter the name exactly as shown in your passport, upload a clearer passport photo, use your own card, avoid repeated edits, and contact in-app support if the review does not pass.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.2 Bank card cannot be linked',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'The card issuer blocks overseas or online transactions, the card type is not supported, SMS verification fails, or the card details are entered incorrectly.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Try another card, contact the card issuer, enable overseas and online payments, check SMS access, and keep cash or a physical card ready while solving the issue.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.3 Wallet balance cannot be topped up',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'Foreign cards may not support balance top-ups even if they can be linked for merchant payments.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Stop trying to top up. Test direct merchant QR payments with the linked card. If it fails, switch apps, switch cards, use a physical card, or use cash.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.4 QR payment fails',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'The network is weak, the merchant QR code is not compatible with foreign-card payments, the bank blocks the transaction, the amount is high, or the app triggers risk control.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Check the internet connection, confirm the selected funding card, try a small payment, switch between scanning and payment-code methods, use the other app, try another card, or use cash.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.5 Mini-program payment fails',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'Some mini-programs are Chinese-only, require a Chinese phone number, require higher verification, or do not support international-card payments.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Ask staff for manual help, use a counter service, switch to Alipay or ordinary WeChat QR payments, or use a travel booking platform.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.6 Transfers, red packets or receiving money do not work',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'International-card accounts are mainly designed for merchant purchases, not full local-wallet functions.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Do not rely on person-to-person transfers or red packets. Split costs using cash, card reimbursement, or an international transfer method that both travelers can use.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.7 SMS verification code cannot be received',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'Roaming is not active, the SIM is data-only, the signal is weak, or the bank blocks overseas SMS.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Keep the original SIM active, enable roaming, request the code again, contact the bank or payment app, and consider a local SIM for local service access.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.8 Account is frozen or under risk control',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'There are repeated failed payments, frequent card changes, unusual login activity, large first transactions, or incomplete identity information.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Stop repeated attempts, prepare passport and travel proof, contact in-app support, and use another app, a physical card, or cash while waiting.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '8.9 Refund does not appear',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Likely reasons: ', bold: true }, { text: 'The refund may return to the original card rather than the app balance, the bank may take several business days, or the merchant has not completed the refund.' }],
          [{ text: 'What to do: ', bold: true }, { text: 'Save the order number, payment screenshot, and refund proof. Check the original card statement and contact the merchant, payment app, or bank if it does not arrive after the expected processing time.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '9. Backup sequence when payment fails',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'If your payment fails on the ground, follow this troubleshooting flow:' },
        ],
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          [{ text: 'Check internet connection, amount, merchant name, and selected payment method.' }],
          [{ text: 'Try the other QR method (if scanning fails, show your code; and vice versa).' }],
          [{ text: 'Switch app (Alipay to WeChat Pay, or WeChat Pay to Alipay).' }],
          [{ text: 'Switch to another card inside the app.' }],
          [{ text: 'For large payments, ask if a lower amount or another official route is possible.' }],
          [{ text: 'Use a physical international card if the merchant has a POS terminal.' }],
          [{ text: 'Use RMB cash (especially for taxis, small shops, night markets, and rural areas).' }],
          [{ text: 'Ask hotel staff, a mall service desk, or the merchant for manual help.' }],
          [{ text: 'Contact Alipay, WeChat Pay, or your card issuer if the account / card is blocked.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '10. Useful Chinese phrases for payment problems',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Save this section as screenshots and show it directly to staff when needed.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'English' }, { text: 'Chinese to show' }],
        rows: [
          [[{ text: 'Can I pay with Alipay?' }], [{ text: '可以用支付宝吗？' }]],
          [[{ text: 'Can I pay with WeChat Pay?' }], [{ text: '可以用微信支付吗？' }]],
          [[{ text: 'Can I pay with an international bank card?' }], [{ text: '可以刷国际银行卡吗？' }]],
          [[{ text: 'Can I pay in cash?' }], [{ text: '可以用现金支付吗？' }]],
          [[{ text: 'Can I use another payment method?' }], [{ text: '可以换一种支付方式吗？' }]],
          [[{ text: 'My payment failed.' }], [{ text: '我的支付失败了。' }]],
          [[{ text: 'Can I try again?' }], [{ text: '我可以再试一次吗？' }]],
          [[{ text: 'I would like to try another bank card.' }], [{ text: '我想换一张银行卡支付。' }]],
          [[{ text: 'Please help me confirm the amount.' }], [{ text: '请帮我确认金额。' }]],
          [[{ text: 'Can I have a receipt?' }], [{ text: '可以给我收据吗？' }]],
          [[{ text: 'I cannot receive the verification code.' }], [{ text: '我收不到验证码。' }]],
          [[{ text: 'Could you help me contact my hotel front desk?' }], [{ text: '可以请你帮我联系酒店前台吗？' }]],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '11. Final checklist',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: '[ ] Download the official Alipay app.' }],
          [{ text: '[ ] Register Alipay and choose International Version if prompted.' }],
          [{ text: '[ ] Download or update WeChat.' }],
          [{ text: '[ ] Find WeChat Pay / Wallet inside WeChat.' }],
          [{ text: '[ ] Link at least one international card to Alipay.' }],
          [{ text: '[ ] Link at least one international card to WeChat Pay if possible.' }],
          [{ text: '[ ] Prepare a second card from another bank.' }],
          [{ text: '[ ] Ask your bank to enable overseas and online transactions in China.' }],
          [{ text: '[ ] Confirm that you can receive SMS codes on the phone number used by your bank and payment apps.' }],
          [{ text: '[ ] Prepare a travel SIM / eSIM or roaming plan for mobile data.' }],
          [{ text: '[ ] Prepare RMB 500–1,000 cash for a city trip, or RMB 1,000–2,000 for rural or multi-city travel.' }],
          [{ text: '[ ] Carry small RMB notes.' }],
          [{ text: '[ ] Save passport, hotel booking, and itinerary screenshots.' }],
          [{ text: '[ ] Save Chinese hotel address and emergency contact information.' }],
          [{ text: '[ ] Save payment phrases from this guide as screenshots.' }],
          [{ text: '[ ] Bring a power bank.' }],
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to top up my Alipay or WeChat Pay balance before paying?',
        answer: 'No. For short-term foreign visitors, top-up is usually not the core function. The practical method is to link an eligible international card and pay merchants directly. A foreign card that fails to top up the wallet balance may still work for direct merchant payments.',
      },
      {
        question: 'What should I do if my QR payment fails at a merchant?',
        answer: 'Follow the 9-step backup sequence: check the connection and amount, switch between scanning and showing your code, switch apps, switch cards, split a large payment, use a physical card, use cash, ask staff for help, and finally contact your card issuer or the payment app. The first four steps resolve most issues.',
      },
      {
        question: 'Can I rely on transfers, red packets, or receiving money from friends?',
        answer: 'Not with an international-card-linked account. International-card accounts are mainly designed for merchant purchases. To split costs with travel companions, use cash, reimburse through a shared international card, or use an international transfer service that works for everyone.',
      },
    ],
  },
  {
    slug: 'language',
    title: 'Language',
    summary:
      'A practical communication toolkit for foreign travelers — ready-to-show Chinese phrase cards covering survival, transport, service counters, payment, and emergencies.',
    icon: 'languages',
    accent: 'secondary',
    readMinutes: 8,
    preview: [
      'Pre-departure prep: download an offline translation pack, save Chinese address cards, and screenshot key phrases.',
      'Five scenario cards: basic survival, transportation, service counters, payment, and emergency safety.',
      'Quality-controlled: every phrase is reviewed, scenario-relevant, and designed to be shown directly to local staff.',
    ],
    body: [
      {
        kind: 'paragraph',
        runs: [
          { text: 'The China Travel Language Toolkit is designed to reduce communication uncertainty in common travel situations, especially for users with low or intermediate Chinese proficiency. Instead of teaching Chinese as an academic course, it provides ready-to-use communication support that can be prepared before departure and used directly during the trip.' },
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        runs: [
          { text: 'Core positioning: ', bold: true },
          { text: 'A practical communication support module that helps foreign travelers complete essential travel interactions in China with lower language-related friction.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '1. Module overview & value',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Target audience: ', bold: true },
          { text: 'Foreign travelers living outside Mainland China who plan short-term independent trips and may have limited Chinese ability.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The real problem: ', bold: true },
          { text: 'Language difficulty is a practical access barrier. Even with booked accommodation and downloaded routes, trips become stressful if a traveler cannot show an address, explain a dietary restriction, confirm a payment issue, or ask for help.' },
        ],
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Platform placement: ', bold: true },
          { text: 'Found under Practical Information > Language Access Toolkit, and embedded as lightweight support cards within city pages, route pages, and downloadable travel preparation materials.' },
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: 'Core design principles',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: '🎯 Scenario-based: ', bold: true }, { text: 'Organized around actual travel tasks instead of grammar categories.' }],
          [{ text: '📱 Ready to show: ', bold: true }, { text: 'Written clearly enough to be shown directly to local staff, drivers, or shop assistants.' }],
          [{ text: '💾 Pre-departure friendly: ', bold: true }, { text: 'Can be downloaded, saved, or screenshotted to work offline when internet access is limited.' }],
          [{ text: '⚠️ Risk-aware: ', bold: true }, { text: 'Prioritizes situations where misunderstanding may cause inconvenience, cost loss, safety risks, or failed service access.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '2. Pre-departure language preparation guide',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Complete these steps before entering China to reduce dependence on mobile data and improve communication when translation apps are slow or inaccurate.' },
        ],
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: '[ ] Download a reliable translation app and save the Chinese offline language pack.' }],
          [{ text: '[ ] Save the Chinese name and address of your hotel, key destinations, railway stations, and airports.' }],
          [{ text: '[ ] Prepare a personal emergency card including your name, hotel address, emergency contact, and embassy / consulate contact.' }],
          [{ text: '[ ] Prepare a dietary or allergy card if you have food restrictions.' }],
          [{ text: '[ ] Save screenshots of the most important cards so they can be used entirely without internet access.' }],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '3. Essential scenario communication cards',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The emphasis here is on communication success rather than linguistic completeness. These phrases can be recognized, pronounced, or shown directly to others.' },
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.1 Basic survival phrases',
      },
      {
        kind: 'table',
        headers: [{ text: 'Traveler need' }, { text: 'Chinese to show' }, { text: 'Use context' }],
        rows: [
          [
            [{ text: 'I do not speak Chinese.' }],
            [{ text: '我不会说中文。' }],
            [{ text: 'Useful when opening a conversation.' }],
          ],
          [
            [{ text: 'Can you help me?' }],
            [{ text: '可以帮我吗？' }],
            [{ text: 'General help-seeking.' }],
          ],
          [
            [{ text: 'I want to go here.' }],
            [{ text: '我要去这里。' }],
            [{ text: 'Transportation and navigation.' }],
          ],
          [
            [{ text: 'How much is it?' }],
            [{ text: '多少钱？' }],
            [{ text: 'Shopping, taxis, small services.' }],
          ],
          [
            [{ text: 'Please write it down.' }],
            [{ text: '请写下来。' }],
            [{ text: 'When spoken communication fails.' }],
          ],
          [
            [{ text: 'Please speak more slowly.' }],
            [{ text: '请说慢一点。' }],
            [{ text: 'When using basic Chinese or translation apps.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.2 Transportation and direction support',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Use these large and direct text options to move quickly across cities and reduce confusion in taxis, stations, and entrance areas.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Traveler need' }, { text: 'Chinese to show' }, { text: 'Use context' }],
        rows: [
          [
            [{ text: 'Take me to this address.' }],
            [{ text: '请带我去这个地址。' }],
            [{ text: 'Taxi or ride-hailing.' }],
          ],
          [
            [{ text: 'Please stop here.' }],
            [{ text: '请在这里停车。' }],
            [{ text: 'Arriving at a destination.' }],
          ],
          [
            [{ text: 'Where is the nearest subway station?' }],
            [{ text: '最近的地铁站在哪里？' }],
            [{ text: 'Asking local staff or passers-by.' }],
          ],
          [
            [{ text: 'Which entrance should I use?' }],
            [{ text: '我应该从哪个入口进去？' }],
            [{ text: 'Station or attraction entrance.' }],
          ],
          [
            [{ text: 'Is this the right platform?' }],
            [{ text: '这是正确的站台吗？' }],
            [{ text: 'Train or subway transfer.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.3 Service counter and on-site assistance',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'These short phrases help users complete common service requests at counters and information desks without needing a long conversation.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Traveler need' }, { text: 'Chinese to show' }, { text: 'Use context' }],
        rows: [
          [
            [{ text: 'I have a reservation.' }],
            [{ text: '我有预订。' }],
            [{ text: 'Hotels, activities, restaurants.' }],
          ],
          [
            [{ text: 'Here is my booking confirmation.' }],
            [{ text: '这是我的预订确认单。' }],
            [{ text: 'Showing an order or voucher.' }],
          ],
          [
            [{ text: 'Can I store my luggage here?' }],
            [{ text: '我可以把行李寄存在这里吗？' }],
            [{ text: 'Hotel or station storage.' }],
          ],
          [
            [{ text: 'What time does it close?' }],
            [{ text: '这里几点关门？' }],
            [{ text: 'Attractions, museums, shops.' }],
          ],
          [
            [{ text: 'Where is the ticket office?' }],
            [{ text: '售票处在哪里？' }],
            [{ text: 'Attractions or transport stations.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.4 Payment, shopping and problem-solving',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Support basic price asking, payment confirmation, and failed payment recovery to protect travel confidence.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Traveler need' }, { text: 'Chinese to show' }, { text: 'Use context' }],
        rows: [
          [
            [{ text: 'Can I pay by card?' }],
            [{ text: '可以刷卡吗？' }],
            [{ text: 'Shops, hotels, restaurants.' }],
          ],
          [
            [{ text: 'Can I use Alipay?' }],
            [{ text: '可以用支付宝吗？' }],
            [{ text: 'Mobile payment.' }],
          ],
          [
            [{ text: 'The payment failed.' }],
            [{ text: '支付失败了。' }],
            [{ text: 'When a transaction does not work.' }],
          ],
          [
            [{ text: 'Can I try again?' }],
            [{ text: '我可以再试一次吗？' }],
            [{ text: 'Payment retry.' }],
          ],
          [
            [{ text: 'Can I have a receipt?' }],
            [{ text: '可以给我收据吗？' }],
            [{ text: 'After a purchase.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: '3.5 Emergency and safety communication',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'Keep this section concise, visible, and saved offline. Use these high-priority statements to help local people understand your situation immediately.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Traveler need' }, { text: 'Chinese to show' }, { text: 'Use context' }],
        rows: [
          [
            [{ text: 'I need help.' }],
            [{ text: '我需要帮助。' }],
            [{ text: 'General emergency.' }],
          ],
          [
            [{ text: 'I am lost.' }],
            [{ text: '我迷路了。' }],
            [{ text: 'Navigation problem.' }],
          ],
          [
            [{ text: 'I lost my passport.' }],
            [{ text: '我的护照丢了。' }],
            [{ text: 'Document loss.' }],
          ],
          [
            [{ text: 'I need to go to the hospital.' }],
            [{ text: '我需要去医院。' }],
            [{ text: 'Medical situation.' }],
          ],
          [
            [{ text: 'Please call the police.' }],
            [{ text: '请帮我报警。' }],
            [{ text: 'Safety issue.' }],
          ],
          [
            [{ text: 'Please contact my hotel.' }],
            [{ text: '请联系我的酒店。' }],
            [{ text: 'When unable to communicate clearly.' }],
          ],
        ],
      },
      {
        kind: 'heading',
        level: 2,
        text: '4. Implementation, maintenance & quality control',
      },
      {
        kind: 'heading',
        level: 3,
        text: 'Quality control checklist',
      },
      {
        kind: 'list',
        ordered: false,
        items: [
          [{ text: 'Language accuracy: ', bold: true }, { text: 'All Chinese phrases must be reviewed by native speakers and tested for absolute clarity.' }],
          [{ text: 'Tone and politeness: ', bold: true }, { text: 'Phrases should remain natural, respectful, and easy for local staff to understand (avoiding overly formal textbook jargon).' }],
          [{ text: 'Scenario relevance: ', bold: true }, { text: 'Every single phrase must correspond directly to a high-frequency real travel task or problem.' }],
          [{ text: 'Update mechanism: ', bold: true }, { text: 'The production team must update these cards as local platform content, digital rules, or common user questions evolve.' }],
        ],
      },
      {
        kind: 'heading',
        level: 3,
        text: 'MVP validation metrics',
      },
      {
        kind: 'paragraph',
        runs: [
          { text: 'The language toolkit will be evaluated as part of the broader cross-border travel platform MVP using the following core indicators.' },
        ],
      },
      {
        kind: 'table',
        headers: [{ text: 'Validation question' }, { text: 'Suggested indicator' }, { text: 'Interpretation' }],
        rows: [
          [
            [{ text: 'Do users notice the toolkit?' }],
            [{ text: 'Page views, clicks from Practical Information page, total downloads.' }],
            [{ text: 'Indicates whether users consider language support relevant during planning.' }],
          ],
          [
            [{ text: 'Do users find the cards useful?' }],
            [{ text: 'Post-review rating, short feedback forms, qualitative comments.' }],
            [{ text: 'Shows whether the wording and scenarios match real on-the-ground needs.' }],
          ],
          [
            [{ text: 'Does it improve travel confidence?' }],
            [{ text: 'Before / after self-reported confidence scores.' }],
            [{ text: 'Measures whether users feel more prepared after reading or saving the cards.' }],
          ],
          [
            [{ text: 'Which scenarios matter most?' }],
            [{ text: 'Clicks or downloads broken down by card type.' }],
            [{ text: 'Helps prioritize future card expansion (e.g., expanding dining vs. transport).' }],
          ],
          [
            [{ text: 'Does it support the wider platform?' }],
            [{ text: 'Return visits, guide saves, route-page engagement.' }],
            [{ text: 'Shows whether practical support increases overall platform trust and usability.' }],
          ],
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to learn Chinese before traveling to China?',
        answer: 'No. The phrase cards in this toolkit cover the most common travel situations, and they are designed to be shown directly to local staff. Combined with a translation app, you can complete most interactions without speaking Chinese yourself.',
      },
      {
        question: 'What if my pronunciation of a Chinese phrase is wrong?',
        answer: 'That is exactly why the cards are designed to be shown. Point to the phrase on your phone or a printed card — drivers, hotel staff, and shop assistants will read the characters and respond. Pronunciation matters much less than showing the right written phrase.',
      },
      {
        question: 'Are these phrases enough for medical or police emergencies?',
        answer: 'The 3.5 emergency and safety communication card covers the most common needs (I need help, I am lost, I lost my passport, I need to go to the hospital, please call the police, please contact my hotel). For life-threatening situations, dial 120 (medical) or 110 (police) directly, or ask hotel / station staff to call for you.',
      },
      {
        question: 'How do I make sure the cards work without internet?',
        answer: 'After arriving at the hotel on a stable Wi-Fi connection, screenshot the phrase cards you expect to use most, especially emergency and transportation phrases. Save them to a dedicated photo album so they can be opened even if the translation app or browser is unavailable.',
      },
    ],
  },
];

export const travelTools: SiteTool[] = [
  {
    slug: 'currency',
    title: 'Currency Converter',
    description: 'Convert between CNY and common international currencies for quick budget framing.',
    href: '/tools/currency',
    status: 'live',
  },
  {
    slug: 'phrases',
    title: 'Essential Phrases',
    description: 'Practice useful Mandarin for greetings, dining, transport, and emergencies.',
    href: '/tools/phrases',
    status: 'live',
  },
  {
    slug: 'timezone',
    title: 'Jet Lag and Time Planning',
    description: 'Explain China Standard Time and how to pace arrival days across long-haul routes.',
    href: '/tools/timezone',
    status: 'guide',
  },
  {
    slug: 'distance',
    title: 'Travel Distance Planner',
    description: 'Compare sample intercity travel times when shaping a realistic route.',
    href: '/tools/distance',
    status: 'guide',
  },
];

export const popularSearches = ['Great Wall', 'Shanghai', 'Pandas', 'Xi’an', 'West Lake', 'Yangshuo'];
