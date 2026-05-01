import { PricingPackage } from '@/types';

export const pricingPackages: PricingPackage[] = [
  {
    id: 'pkg-1',
    name: 'Beijing Imperial Heritage Guide',
    slug: 'beijing-imperial-guide',
    tagline: '5 days of authentic Beijing experiences',
    description: 'A comprehensive travel guide covering the Forbidden City, Great Wall, Temple of Heaven, and more. Includes detailed daily itineraries, best photo spots, and local food recommendations.',
    features: ['Complete 5-day itinerary', 'Hidden courtyard cafes', 'Insider tips from locals', 'Photo spot guide', 'Transport shortcuts', 'Weather advice'],
    price: '$12',
    originalPrice: '$18',
    duration: '5 days',
    destination: 'Beijing',
    image: 'https://loremflickr.com/1400/1000/beijing,palace,china',
    badge: 'Best Seller',
    popular: true,
    includes: ['5 detailed day plans', 'Interactive map links', 'Restaurant list with prices', 'WeChat mini-program guide'],
    exclude: ['Physical guidebook', 'Accommodation booking', 'Visa support'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Temple of Heaven',
        highlights: ['Temple of Heaven park at sunrise', 'Local tai chi morning practice', 'Authentic Peking duck dinner'],
        tips: ['Visit Temple of Heaven before 7 AM to see locals exercising', 'Bring small bills for tips at traditional tea houses'],
        accommodation: 'Near Dongzhimen for metro convenience',
        meals: 'Lunch: Dawang Road snack street; Dinner: Quanjude Peking duck'
      },
      {
        day: 2,
        title: 'Forbidden City Deep Dive',
        highlights: ['Wumen Gate at opening', 'Imperial Garden exploration', 'Jingshan Park sunset view'],
        tips: ['Book tickets online 7 days in advance', 'Enter through Wumen Gate to avoid crowds'],
        accommodation: 'Wangfujing area',
        meals: 'Lunch: Inside palace courtyard tea house; Dinner: Magnolia Restaurant'
      },
      {
        day: 3,
        title: 'The Great Wall Experience',
        highlights: ['Mutianyu section with toboggan', 'Huangyaguan section sunrise', 'Local village lunch'],
        tips: ['Go to Mutianyu instead of Badaling - same experience, 1/3 the crowds', 'Bring hiking shoes for Jiankou section'],
        accommodation: 'Gubei Water Town nearby',
        meals: 'Breakfast: Hotel; Lunch: Wall village farmhouse; Dinner: Return to Beijing'
      },
      {
        day: 4,
        title: 'Hutong Exploration',
        highlights: ['Yonghe Temple', 'Drum Tower area', 'Shichahai evening walk'],
        tips: ['Rent a bike to explore hutongs like a local', 'Visit Lama Temple first thing in morning'],
        accommodation: 'Shichahai area boutique hotel',
        meals: 'Lunch: Hotpot lunch at Haidilao; Dinner: Courtyard cafe in Nanluoguxiang'
      },
      {
        day: 5,
        title: 'Summer Palace & Departure',
        highlights: ['Kunming Lake boat ride', 'Long Corridor stories', 'Fragrant Hills autumn colors'],
        tips: ['Start at East Gate to avoid crowds', 'Take the boat across Kunming Lake'],
        accommodation: 'N/A - departure day',
        meals: 'Breakfast: Hotel; Lunch: Summer Palace grounds teahouse'
      }
    ],
    hotelRecommendations: [
      'Budget: Beijing Saga Youth Hostel (near Shichahai)',
      'Mid-range: The Orchid Hotel (boutique hutong experience)',
      'Luxury: The Peninsula Beijing (Wangfujing)'
    ],
    importantNotes: [
      'Book Forbidden City tickets online at least 7 days ahead',
      'Carry passport for all attraction entries',
      'October-November offers best weather for wall visits',
      'WeChat Pay is essential - bring some cash as backup'
    ]
  },
  {
    id: 'pkg-2',
    name: 'Shanghai Modern Explorer',
    slug: 'shanghai-modern-guide',
    tagline: 'Where tradition meets tomorrow',
    description: 'Discover Shanghai\'s contrasts - from the historic Bund to the futuristic skyline. This guide covers must-see landmarks, hidden speakeasies, and the best xiaolongbao spots.',
    features: ['4-day comprehensive guide', 'Best Bund photo spots', 'French Concession walking map', 'Local nightlife secrets', 'Food market deep dive', 'Metro navigation tips'],
    price: '$10',
    originalPrice: '$15',
    duration: '4 days',
    destination: 'Shanghai',
    image: 'https://loremflickr.com/1400/1000/shanghai,skyline,china',
    badge: 'Popular',
    popular: true,
    includes: ['4 detailed day plans', 'Restaurant reservation tips', 'Happy hour map', 'Instagram spots guide'],
    exclude: ['Physical maps', 'Accommodation booking', 'Flight arrangements'],
    itinerary: [
      {
        day: 1,
        title: 'The Bund & Nanjing Road',
        highlights: ['The Bund at golden hour', 'Peace Hotel historical tour', 'Nanjing Road shopping'],
        tips: ['The Bund is most beautiful at sunset - arrive 30 mins early', 'Walk east to west for best morning light photos'],
        accommodation: "The Bund or People's Square area",
        meals: 'Lunch: Xinjianggel正宗新疆; Dinner: Lost Heaven on Yunnan Road'
      },
      {
        day: 2,
        title: 'French Concession Art & Culture',
        highlights: ['Xintiandi old shikumen houses', 'Tianzifang artists lanes', 'Former residence areas'],
        tips: ['Explore before noon when streets are quiet', 'Visit the Propaganda Poster Art Museum for unique history'],
        accommodation: 'French Concession boutique hotel',
        meals: 'Lunch: Communal brunch at El Willy; Dinner: Sunset cocktail at Flair Rooftop'
      },
      {
        day: 3,
        title: 'Yu Garden & Old City',
        highlights: ['Yu Garden morning visit', 'City God Temple', 'Zhujiajiao water town day trip'],
        tips: ['Yu Garden opens at 9:30 AM - enter immediately for empty paths', 'Zhujiajiao is best visited on weekdays before 10 AM'],
        accommodation: 'Old City area',
        meals: 'Lunch: Nanxiang mantou in old city; Dinner: Din tai fung xiaolongbao'
      },
      {
        day: 4,
        title: 'Modern Shanghai & Pudong',
        highlights: ['Shanghai Tower observation deck', 'Luoxiu Market', 'French Concession evening jazz'],
        tips: ['Book Shanghai Tower tickets online - same-day rarely available', 'Visit Longhua Temple at dawn for authentic experience'],
        accommodation: 'Pudong luxury property',
        meals: 'Breakfast: Corner hot breakfast; Lunch: Din Tai Fung; Dinner: Lost Heaven'
      }
    ],
    hotelRecommendations: [
      "Budget: The Shuiqi Hotel (near People's Square)",
      'Mid-range: Fairmont Peace Hotel on the Bund',
      'Luxury: Waldorf Astoria Shanghai on the Bund'
    ],
    importantNotes: [
      'Download Metro Nowhere app for seamless subway travel',
      'Nanjing Road is pedestrian-only - no cars allowed',
      'WeChat Pay/Alipay required at most places',
      'Best time to visit: March-May or September-November'
    ]
  },
  {
    id: 'pkg-3',
    name: 'Xi\'an Ancient Warriors Trail',
    slug: 'xian-warriors-guide',
    tagline: 'Walk where emperors walked',
    description: 'The complete Xi\'an experience - from the Terracotta Army to the ancient city walls. Includes Muslim Quarter food tour, Tang Dynasty show secrets, and hiking routes on the wall.',
    features: ['4-day detailed itinerary', 'Warriors booking strategy', 'Wall bike route map', 'Night market food guide', 'Han服体验推荐', 'Photography timing guide'],
    price: '$9',
    originalPrice: '$14',
    duration: '4 days',
    destination: 'Xi\'an',
    image: 'https://loremflickr.com/1400/1000/xian,terracotta,china',
    badge: 'Cultural',
    popular: false,
    includes: ['Warrior tickets booking guide', 'Complete food map', 'Tang Dynasty show discount codes', 'Photo location map'],
    exclude: ['Ticket booking service', 'Private guide arrangement', 'Airport transfer'],
    itinerary: [
      {
        day: 1,
        title: 'City Walls & Downtown',
        highlights: ['Bike the ancient wall', 'Bell & Drum Towers', 'Muslim Quarter night market'],
        tips: ['Rent bikes at South Gate - bikes are in best condition', 'Start biking at sunrise to avoid crowds and heat'],
        accommodation: 'Near South Gate for wall access',
        meals: 'Lunch: De Fa Chang biangbiang noodles; Dinner: Muslim Quarter - paste dumplings and rou jia mo'
      },
      {
        day: 2,
        title: 'Terracotta Warriors Deep Experience',
        highlights: ['Pit 1, 2, 3 exploration', 'Loyalty to Emperor exhibition', 'Pottery village visit'],
        tips: ['Hire a guide at the entrance - they know which display cases are emptiest', 'Visit between 2-4 PM for smallest crowds'],
        accommodation: 'West Street area',
        meals: 'Breakfast: Hotel; Lunch: Warriors site cafe (expensive); Dinner: Spicy food at West Street'
      },
      {
        day: 3,
        title: 'Big Wild Goose Pagoda & Tang Dynasty',
        highlights: ['Daci\'en Temple at sunrise', 'Qujiang池 walking', 'Tang Dynasty music and dance show'],
        tips: ['Book show tickets 3 days ahead - often sells out', 'The light show at Big Wild Goose Pagoda is free and beautiful'],
        accommodation: 'Near Grand Tang Dynasty Mall',
        meals: 'Lunch: Shaanxi traditional cold noodles; Dinner: Tang Dynasty food experience at Old Macau restaurant'
      },
      {
        day: 4,
        title: 'Hua Shan Mountain Day Trip',
        highlights: ['North Peak sunrise hike', 'Plank walk experience', 'West Peak photography'],
        tips: ['Take cable car up, hike down for best experience', 'Start at 6 AM to reach peak by sunrise'],
        accommodation: 'N/A - departure or stay in city',
        meals: 'Breakfast: Early noodles near station; Lunch: Mountain top supplies; Dinner: Post-hike celebration hotpot'
      }
    ],
    hotelRecommendations: [
      'Budget: Ming House Hostel (near Bell Tower)',
      'Mid-range: Sofitel Xi\'an on People\'s Avenue',
      'Luxury: Wynnham Grand Xi\'an West Tower'
    ],
    importantNotes: [
      'Book Terracotta Army tickets online - daily limit of 65,000 visitors',
      'October to April is best weather - avoid Golden Week',
      'Hua Shan is physically demanding - assess fitness before attempting',
      'Muslim Quarter pork-free - respect local customs'
    ]
  },
  {
    id: 'pkg-4',
    name: 'Chengdu Panda & Culinary Adventure',
    slug: 'chengdu-panda-guide',
    tagline: 'Giant pandas and spicy Sichuan cuisine',
    description: 'The ultimate Chengdu guide featuring giant panda volunteer experience, Sichuan opera, and the best hotpot in China. Includes teahouse culture and Wenshu Monastery peaceful walks.',
    features: ['Panda Base volunteer booking', 'Hotpot restaurant ranking', 'Sichuan opera insider tips', 'Teahouse etiquette guide', 'Jiaming Sichuan face-changing secrets', 'Market shopping guide'],
    price: '$11',
    originalPrice: '$16',
    duration: '5 days',
    destination: 'Chengdu',
    image: 'https://loremflickr.com/1400/1000/chengdu,panda,china',
    badge: 'Wildlife',
    popular: true,
    includes: ['Panda volunteer guide', 'Complete hotpot map', 'Sichuan opera booking tips', 'Food allergy card template'],
    exclude: ['Panda volunteer fee', 'Accommodation', 'Internal transport'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & People\'s Park',
        highlights: ['People\'s Park morning tai chi', 'Matcha teahouse experience', 'Spring Onion ramen dinner'],
        tips: ['Stay near Tianfu Square for best metro access', 'Visit People\'s Park before 8 AM to see locals dancing'],
        accommodation: 'Tianfu Square area',
        meals: 'Lunch: Railway station dandan noodles; Dinner: Spicy crab at Jiaming Lu'
      },
      {
        day: 2,
        title: 'Panda Base Adventure',
        highlights: ['Morning feeding session', 'Baby panda nursery', 'Red Panda viewing'],
        tips: ['Arrive at 7:30 AM for 8:00 opening - pandas are most active', 'Book volunteer program 2 months ahead'],
        accommodation: 'Near Panda Base or return to city',
        meals: 'Breakfast: Hotel; Lunch: Inside park (limited options - bring snacks); Dinner: Haidilao hotpot'
      },
      {
        day: 3,
        title: 'Ancient Shu Culture',
        highlights: ['Wenshu Monastery peaceful walk', 'Jinli Street snacks', 'Sichuan Opera evening show'],
        tips: ['Wenshu Monastery has free tea and no crowds before 10 AM', 'Jinli Street is tourist trap - walk two blocks east for authentic food'],
        accommodation: 'Wenshu Monastery area',
        meals: 'Lunch: Buddhist vegetarian restaurant; Dinner: Mapo tofu at Shufeng Li',
      },
      {
        day: 4,
        title: 'Mt. Emei Spiritual Journey',
        highlights: ['Golden Summit sunrise', 'Baqian Bridge ancient path', 'Hot spring evening soak'],
        tips: ['Take morning high-speed train - 1.5 hours to Emei station', 'Stay overnight at Baoguo Temple for sunrise access'],
        accommodation: 'Baoguo Temple guesthouse',
        meals: 'Breakfast: City; Lunch: Temple vegetarian; Dinner: Local bamboo shoots specialty'
      },
      {
        day: 5,
        title: 'Return & Chengdu Discovery',
        highlights: ['Du Fu Thatched Cottage', 'Sichuan Museum', 'Hongkou Live Panda Street'],
        tips: ['Du Fu Thatched Cottage is free and beautiful in early morning', 'Hongkou has baby pandas and no crowds'],
        accommodation: 'N/A - departure',
        meals: 'Breakfast: Temple; Lunch: Sun具体的 lunch at Sichuan Museum cafe; Dinner: Farewell hotpot at Huang Cheng Lao'
      }
    ],
    hotelRecommendations: [
      'Budget: Skypark Hotel (near Panda Base)',
      'Mid-range: The Ritz-Carlton Chengdu',
      'Luxury: The Temple House (Wenshu Monastery area)'
    ],
    importantNotes: [
      'Panda Base volunteer program requires booking 2-3 months in advance',
      'Best panda viewing: July-August for cubs, cooler months for active adults',
      'Sichuan pepper makes lips tingle - it\'s not an allergy!',
      'Summer is hot and humid - bring fans and water'
    ]
  },
  {
    id: 'pkg-5',
    name: 'Zhangjiajie Avatar Expedition',
    slug: 'zhangjiajie-avatar-guide',
    tagline: 'Floating mountains and glass bridges',
    description: 'Navigate Zhangjiajie\'s otherworldly landscapes inspired by Avatar. Complete hiking guides, the famous glass bridge, and tips for avoiding crowds at Yuanjiajie.',
    features: ['Complete hiking routes', 'Glass bridge booking', 'Avatar Mountain photography spots', 'Local guide recommendations', 'Weather timing advice', 'Transport logistics'],
    price: '$8',
    originalPrice: '$12',
    duration: '4 days',
    destination: 'Zhangjiajie',
    image: 'https://loremflickr.com/1400/1000/zhangjiajie,avatar,mountain',
    badge: 'Adventure',
    popular: false,
    includes: ['4 detailed hiking plans', 'Glass bridge fast-pass guide', 'Crowd-avoiding route map', 'Local bus timetables'],
    exclude: ['Park tickets', 'Accommodation', 'Internal flights'],
    itinerary: [
      {
        day: 1,
        title: 'Wulingyuan & Golden Whip Stream',
        highlights: ['Easy riverside hike', 'Waterfall spray zone', 'Local Tujia village evening'],
        tips: ['Golden Whip Stream is flat and beautiful - perfect first day after travel', 'The spray from waterfalls can soak cameras'],
        accommodation: 'Wulingyuan area hotel',
        meals: 'Lunch: Stream-side restaurant; Dinner: Tujia-style sour fish hotpot'
      },
      {
        day: 2,
        title: 'Yuanjiajie Avatar Mountains',
        highlights: ['First Avatar Peak viewing', 'Hallelujah Hiking', 'Valley of the Pillars'],
        tips: ['Arrive at 6 AM for the first cable car - you\'ll have Yuanjiajie almost to yourself', 'The Bailong Elevator is faster but the cable car shows better views'],
        accommodation: 'Mountain top if possible',
        meals: 'Breakfast: Hotel; Lunch: Mountain top restaurant (expensive); Dinner: Back to town'
      },
      {
        day: 3,
        title: 'Tianzi Mountain & Glass Bridge',
        highlights: ['Sunrise over peaks', 'Glass Bridge the world\'s highest', 'West Canyon walk'],
        tips: ['Glass Bridge requires separate ticket - book morning for afternoon', 'The bridge is 430 meters long and not for those afraid of heights'],
        accommodation: 'Zhangjiajie city',
        meals: 'Breakfast: Mountain; Lunch: Bridge area; Dinner: Three-Mu Steam Pot'
      },
      {
        day: 4,
        title: 'Grand Canyon & Yellow Dragon',
        highlights: ['Underground river boat ride', 'Ancient Tujia villages', 'Huaxian Bridge sunset'],
        tips: ['The cave boat ride is magical - go early before tour groups', 'Combine with Huanglong Cave for underground adventure'],
        accommodation: 'N/A - departure',
        meals: 'Breakfast: Hotel; Lunch: Cave area local restaurant; Dinner: Farewell Tujia spicy chicken'
      }
    ],
    hotelRecommendations: [
      'Budget: Wulingyuan Youth Hotel (near park entrance)',
      'Mid-range: Qinghe Jinjiang International Hotel',
      'Luxury: Zhangjiajie Grand Park Hotel'
    ],
    importantNotes: [
      'Park tickets are valid for 4 days - buy multi-day pass',
      'Weather changes quickly - bring rain jacket even in summer',
      'English signs limited - download offline map',
      'Best visibility after rain - fog creates mysterious atmosphere'
    ]
  },
  {
    id: 'pkg-6',
    name: 'Silk Road Heritage Trail',
    slug: 'silk-road-guide',
    tagline: 'Ancient trade routes & desert oases',
    description: 'Follow the legendary Silk Road through Xi\'an, Dunhuang, and Ürümqi. From the Terracotta Warriors to the singing sand dunes of Mingsha Shan. A journey through 2,000 years of history.',
    features: ['10-day comprehensive guide', 'Desert camping tips', 'Cave photography rules', 'Uygur food guide', 'Camel trek routes', 'History timeline cards'],
    price: '$15',
    originalPrice: '$22',
    duration: '10 days',
    destination: 'Xi\'an → Dunhuang → Ürümqi',
    image: 'https://loremflickr.com/1400/1000/dunhuang,silk,road,china',
    badge: 'Heritage',
    popular: false,
    includes: ['10 detailed day plans', 'Cave booking guide', 'Desert camping checklist', 'History context e-book'],
    exclude: ['Internal flights', 'Cave photography tickets', 'Camel rental'],
    itinerary: [
      {
        day: 1,
        title: 'Xi\'an Ancient Origins',
        highlights: ['Terracotta Warriors', 'City Wall bike', 'Great Mosque visit'],
        tips: ['Hire a local guide at Terracotta - stories bring warriors to life', 'Bike the wall south to east section for best Ming architecture'],
        accommodation: 'West Street area',
        meals: 'Lunch: Warriors site; Dinner: Muslim Quarter rou jia mo'
      },
      {
        day: 2,
        title: 'Flight to Dunhuang',
        highlights: ['Flight views of Gobi Desert', 'Echoing Sand Mountain sunset', 'Star appreciation from desert'],
        tips: ['Take evening flight for Gobi Desert views from window', 'Mingsha Mountain sunset is unforgettable - climb high for silence'],
        accommodation: 'Dunhuang city',
        meals: 'Breakfast: Xi\'an; Lunch: Airport; Dinner: Noodles with camel meat'
      },
      {
        day: 3,
        title: 'Mogao Caves Sacred Art',
        highlights: ['Cave 96 Buddha', 'Cave 17 Library Cave', 'Cultural museum'],
        tips: ['Book the 8 AM slot for emptiest caves', 'No photography inside caves - absorb with eyes only'],
        accommodation: 'Dunhuang Oasis Hotel',
        meals: 'Breakfast: Hotel; Lunch: Crescent Lake restaurant; Dinner: Uygur lamb skewers'
      },
      {
        day: 4,
        title: 'Yulin Grottoes Remote Art',
        highlights: ['Untouched wall paintings', 'River canyon views', 'Ancient cliff tombs'],
        tips: ['Yulin is 3 hours from Dunhuang - leave early for full day', 'The remote caves have better preserved art than Mogao'],
        accommodation: 'Yulin town or return to Dunhuang',
        meals: 'Breakfast: Early noodles; Lunch: Yulin local; Dinner: Return late - bring snacks'
      },
      {
        day: 5,
        title: 'Turpan Vine Valley & Flaming Mountains',
        highlights: ['Jiaohe Ancient City ruins', 'Flaming Mountains viewpoint', 'Grape valley wine tasting'],
        tips: ['Turpan is boiling hot in summer - visit May or October', 'Stay overnight to experience Uygur family homestay'],
        accommodation: 'Turpan family homestay',
        meals: 'Breakfast: Hotel; Lunch: Grape valley; Dinner: Uygur family dinner with naan'
      },
      {
        day: 6,
        title: 'Kashgar Sunday Market',
        highlights: ['Livestock market chaos', 'Old Town craftsmanship', 'Id Kah Mosque exterior'],
        tips: ['Sunday market starts at dawn - arrive before 8 AM', 'The Old Town craftsmen are disappearing - watch while you can'],
        accommodation: 'Kashgar Old Town guesthouse',
        meals: 'Breakfast: Homestay; Lunch: Market street; Dinner: Polo pilaf at Id Kah'
      },
      {
        day: 7,
        title: 'Karakul Lake & Pamir Views',
        highlights: ['Mirror-like lake reflections', 'Mountains at 7000m', ' Kyrgyz yurt camping'],
        tips: ['The road to Karakul is rough but views are stunning', 'Stay in yurt - freezing but magical experience'],
        accommodation: 'Kyrgyz yurt camp',
        meals: 'Breakfast: Karakul; Lunch: Yurt supply food; Dinner: Yurt dinner with locals'
      },
      {
        day: 8,
        title: 'Ürümqi Heavenly Lake',
        highlights: ['Pine forest hike', 'Lake boat ride', 'Kazakh cultural show'],
        tips: ['Take first bus up to beat tour groups', 'Walk the 3 km loop around lake for best perspectives'],
        accommodation: 'Ürümqi city',
        meals: 'Breakfast: Yurt; Lunch: Mountain restaurant; Dinner: Hand-pulled noodles'
      },
      {
        day: 9,
        title: 'Southern Silk Road Museum',
        highlights: ['Xinjiang history artifacts', 'Mummified mummies', 'Silk Road trade maps'],
        tips: ['Museum opens 10 AM - perfect for late morning activity', 'Allow 3 hours to see all exhibits'],
        accommodation: 'Ürümqi',
        meals: 'Breakfast: Hotel; Lunch: Museum cafe; Dinner: Uygur full lamb banquet'
      },
      {
        day: 10,
        title: 'Departure & Reflections',
        highlights: ['Red Mountain vistas', 'Airport goodbyes', 'Silk Road memories'],
        tips: ['Book morning flight - afternoon dust storms possible', 'Take home some dried apricots and walnut cake'],
        accommodation: 'N/A',
        meals: 'Breakfast: Hotel; Lunch: Airport snacks; Dinner: N/A'
      }
    ],
    hotelRecommendations: [
      'Budget: Dunhuang Yichun Hotel (near desert)',
      'Mid-range: Kashgar Hua Guo Hotel (Old Town)',
      'Luxury: Sheraton Ürümqi Hotel (city center)'
    ],
    importantNotes: [
      'Silk Road requires significant travel time - allow 10+ days',
      'Desert sun is intense - bring sunscreen, hat, and water at all times',
      'Uygur food is Muslim - no pork, respect local customs',
      'Cave photography prohibited - enjoy present experience'
    ]
  }
];
