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
    slug: 'visa',
    title: 'Visa and Entry Planning',
    summary: 'Explain entry pathways clearly for leisure travelers, business visitors, and transit passengers.',
    points: [
      'Confirm visa-free or visa-required status based on passport and route.',
      'Keep printed hotel bookings, onward transport, and an arrival address ready.',
      'Build a small buffer before major domestic connections after landing.',
    ],
    faqs: [
      { question: 'What should travelers prepare before departure?', answer: 'Passport validity, hotel confirmations, return or onward transport, and destination addresses in English and Chinese.' },
      { question: 'Should travelers rely only on screenshots?', answer: 'No. Keep both printed and offline digital copies for border checks and transport counters.' },
    ],
  },
  {
    slug: 'transportation',
    title: 'Getting Around China',
    summary: 'Show how flights, high-speed rail, and local ride-hailing can work together in one trip.',
    points: [
      'High-speed rail is excellent for short and mid-range city pairs.',
      'Use domestic flights for long cross-country jumps to protect vacation time.',
      'Save Chinese hotel names and addresses for taxi and ride-hailing use.',
    ],
    faqs: [
      { question: 'When is rail better than flying?', answer: 'For many city pairs within a few hours by high-speed rail, train travel is often easier door to door.' },
      { question: 'How should travelers handle station timing?', answer: 'Arrive early, especially with luggage, because stations are large and security lines can take time.' },
    ],
  },
  {
    slug: 'budget',
    title: 'Money, Payments, and Budgeting',
    summary: 'Help international visitors understand how to pay comfortably in a mobile-first environment.',
    points: [
      'Prepare at least two payment methods before arrival.',
      'Mobile wallets are widely used, but cash still helps in edge cases.',
      'Large cities support premium travel; regional routes can offer better value.',
    ],
    faqs: [
      { question: 'How much cash should travelers carry?', answer: 'Only a modest backup amount for transport, smaller merchants, or emergencies.' },
      { question: 'What affects trip budget most?', answer: 'Hotel category, transport class, and whether the itinerary involves private transfers or guided touring.' },
    ],
  },
  {
    slug: 'apps',
    title: 'Apps to Install Before Arrival',
    summary: 'Make arrival smoother with a core digital toolkit for communication, payment, navigation, and translation.',
    points: [
      'Download and log into essential apps before departure.',
      'Keep offline maps, screenshots, and translated addresses ready.',
      'Test payment setup and card linking ahead of travel day.',
    ],
    faqs: [
      { question: 'Why prepare apps before flying?', answer: 'Account setup, card verification, and SMS steps are usually easier before crossing borders.' },
      { question: 'Which app category matters most?', answer: 'Payments and messaging usually create the biggest day-one impact.' },
    ],
  },
  {
    slug: 'best-time',
    title: 'Best Time to Visit',
    summary: 'Guide visitors toward seasonally smart itineraries by pairing weather, scenery, and crowd patterns.',
    points: [
      'Spring and autumn are easiest for multi-city first trips.',
      'Summer is powerful for scenery but can bring heat, rain, and holiday pressure.',
      'Winter works well for cities, festivals, and lower hotel rates in some markets.',
    ],
    faqs: [
      { question: 'What is the safest season for a first China trip?', answer: 'Autumn is often the easiest blend of comfortable weather and reliable touring conditions.' },
      { question: 'Should scenery trips avoid summer?', answer: 'Not always, but travelers should plan around weather swings and larger domestic travel peaks.' },
    ],
  },
  {
    slug: 'safety',
    title: 'Health, Safety, and Local Etiquette',
    summary: 'Build confidence with practical habits for navigation, emergency prep, and respectful travel.',
    points: [
      'Carry hotel cards and destination names in both English and Chinese.',
      'Use bottled or filtered water when needed and pace food experimentation.',
      'Respect local rules around heritage sites, religious spaces, and photography.',
    ],
    faqs: [
      { question: 'What is the simplest safety habit?', answer: 'Make sure every traveler can show their hotel address and emergency contact offline.' },
      { question: 'How should travelers approach etiquette?', answer: 'Observe the environment, follow posted rules, and keep behavior calm in cultural and religious sites.' },
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
