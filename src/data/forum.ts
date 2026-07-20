import { ForumPost, ForumComment } from '@/types';

export const forumPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: "My 8-Day Beijing-Xi'an-Shanghai Journey - First Timer Experience",
    slug: 'beijing-xian-shanghai-8-days',
    author: {
      id: 'user-1',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      isMember: true,
    },
    createdAt: '2026-03-15T10:30:00Z',
    content: `Just completed the classic Golden Triangle route and I have to say, China exceeded every expectation I had! Here's my detailed breakdown:

**Beijing** was absolutely mind-blowing. The Great Wall at Mutianyu was a surreal experience - I went on a clear morning and had sections almost to myself. The Forbidden City is vast; allocate at least 3-4 hours. Don't miss Jingshan Park for that iconic view of the entire complex.

**Xi'an** hit different with its ancient energy. The Terracotta Warriors were worth every minute of the crowds. I spent an evening exploring the Muslim Quarter - the food scene there is incredible! Try the biang biang noodles.

**Shanghai** was the perfect finale - modern yet rooted in tradition. The Bund at night is magical. I loved wandering through the French Concession and discovering hidden cafes.

Tip: Book a private guide for Beijing and Xi'an, but Shanghai is very easy to navigate solo using the Metro.`,
    likesCount: 42,
    commentsCount: 8,
    tags: ['first-timer', 'golden-triangle', 'budget-friendly'],
    featuredImage: 'https://loremflickr.com/1400/1000/beijing,greatwall,travel',
  },
  {
    id: 'post-2',
    title: 'Hidden Gems of Yunnan - Off the Beaten Path',
    slug: 'yunnans-hidden-gems',
    author: {
      id: 'user-2',
      name: 'Michael Wu',
      avatar: 'https://i.pravatar.cc/150?u=michael',
      isMember: true,
    },
    createdAt: '2026-03-10T08:15:00Z',
    content: `Yunnan is unlike anywhere else in China - the diversity of landscapes, ethnic minorities, and food is incredible. Skip the tour bus hotspots and head to these places instead:

**Shaxi Ancient Town** - A forgotten tea horse road town that time capsules you back centuries. The guesthouse owners here still make their own baijiu.

**Shangri-La (Zhongdian)** - Yes it's touristy now, but hike the Nixi lakes and you'll find solitude. The Songzanlin Monastery at dawn is transcendent.

**Yuanyang Rice Terraces** - These Hakka terraces are agricultural art. Go during planting season (May-June) when they're flooded and mirror-like.

Pro tip: Rent a scooter in Dali and explore the Three Pagodas area. Best mode of transport for independent travelers here.`,
    likesCount: 38,
    commentsCount: 5,
    tags: ['off-beaten-path', 'yunnan', 'adventure'],
    featuredImage: 'https://loremflickr.com/1400/1000/yunnan,nature,travel',
  },
  {
    id: 'post-3',
    title: 'Hong Kong Food Guide - 30+ Michelin Spots Under $50',
    slug: 'hong-kong-food-guide',
    author: {
      id: 'user-3',
      name: 'Jennifer Liu',
      avatar: 'https://i.pravatar.cc/150?u=jennifer',
      isMember: true,
    },
    createdAt: '2026-03-05T14:20:00Z',
    content: `Hong Kong is a food paradise and I've spent 3 months cataloging the best spots that won't break the bank:

**Tim Ho Wan's** - The original Sham Shui Po location is chaos but the har gow and char siu are perfection. Under $20 for two.

**Sing Heung Kei** - Offal lovers paradise in Central. Their beef offal noodles will change your life.

**Kau Kee Beef Brisket** - The iconic beef brisket soup in Causeway Bay. Cash only, no signage, just crowds.

**Yong Hu Tau Fish Congee** - This Sham Shui Po institution has been making congee since 1953.

Pro tip: Download OpenRice app - it's like Yelp but actually useful in Hong Kong. Most spots close between 3-6pm so plan accordingly.`,
    likesCount: 89,
    commentsCount: 12,
    tags: ['foodie', 'hong-kong', 'budget', 'michelin'],
    featuredImage: 'https://loremflickr.com/1400/1000/hongkong,food,travel',
  },
  {
    id: 'post-4',
    title: 'Zhangjiajie Avatar Mountains - Complete Hiking Guide',
    slug: 'zhangjiajie-complete-guide',
    author: {
      id: 'user-4',
      name: 'David Park',
      avatar: 'https://i.pravatar.cc/150?u=david',
      isMember: true,
    },
    createdAt: '2026-02-28T09:45:00Z',
    content: `The pillar-like sandstone formations of Zhangjiajie literally look like floating mountains from Avatar. Here's how to do it right:

**Day 1**: Enter through the Wulingyuan scenic area. Take the Bailong Elevator (world's tallest outdoor lift) up, then hike the Golden Whip Stream - it's surreal walking through these narrow canyons.

**Day 2**: Hallelujah Mountains (Avatar formation) - take the shuttle to Yuanjiajie. The hike from there to Mount Tianzi takes 4-5 hours but the views are uninterrupted.

**Day 3**: Go early to Yellow Dragon Village before tour groups arrive. Afternoon visit Baofeng Lake for a boat ride through mist.

Budget accommodation: Zhangjiajie city has plenty of mid-range hotels. Avoid the tourist restaurants near the park entrance - venture 1km out for authentic Hunan food.`,
    likesCount: 56,
    commentsCount: 7,
    tags: ['hiking', 'zhangjiajie', 'nature', 'adventure'],
    featuredImage: 'https://loremflickr.com/1400/1000/hongkong,travel',
  },
  {
    id: 'post-5',
    title: 'Solo Female Travel in China - Safety Tips & Advice',
    slug: 'solo-female-travel-china',
    author: {
      id: 'user-5',
      name: 'Amanda Zhang',
      avatar: 'https://i.pravatar.cc/150?u=amanda',
      isMember: true,
    },
    createdAt: '2026-02-20T16:00:00Z',
    content: `As someone who's traveled China solo 4 times, here's my honest advice:

**Safety**: China is incredibly safe. Violent crime is rare. The main concerns are petty theft and scams targeted at tourists. Use a money belt, keep phone secure on Metro, and book trains through official apps.

**Navigation**: Baidu Maps works better than Google Maps. Get a local SIM at the airport (Alibaba Cloud has eSIM for most phones). WeChat Pay is essential - many places are cashless.

**Solo-Friendly Cities**: Shanghai, Chengdu, and Hangzhou are easiest for solo travelers. English is more prevalent and public transport is intuitive.

**Where to Stay**: Major international chains have consistent standards. Avoid hostels outside city centers if you're sensitive to noise.

**Transport**: High-speed rail is world-class. Book via 12306 app (English available) or Ctrip. Planes are often cheaper for long distances.

Trust your instincts and you'll have an incredible time.`,
    likesCount: 124,
    commentsCount: 18,
    tags: ['solo-travel', 'safety', 'tips', 'female-travel'],
    featuredImage: 'https://loremflickr.com/1400/1000/china,solo,travel',
  },
  {
    id: 'post-6',
    title: 'Chengdu Panda Base - Behind the Scenes Experience',
    slug: 'chengdu-panda-base',
    author: {
      id: 'user-6',
      name: 'Kevin Yang',
      avatar: 'https://i.pravatar.cc/150?u=kevin',
      isMember: true,
    },
    createdAt: '2026-02-15T11:30:00Z',
    content: `The Chengdu Research Base of Giant Panda Breeding is hands down the best panda experience in the world. Here's my review:

**What makes it special**: Unlike zoos elsewhere, these pandas live in environments simulating their natural habitat with real bamboo forest. The breeding center has produced 30+ cubs through conservation efforts.

**Timing is everything**: Arrive at 7:30am (opening) to catch the pandas when they're most active. By noon they sleep. The red pandas are active all day!

**Volunteer program**: Worth every yuan - you get to feed and care for pandas for 2 hours. Requires booking weeks in advance via their website. Around $400 USD.

**Nearby**: The base is in the Panda Valley area. Combine with a day trip to the nearby Leshan Giant Buddha (reachable by Metro).

Budget tip: Stay at the Panda Hotel attached to the base. Wake up to panda views!`,
    likesCount: 67,
    commentsCount: 9,
    tags: ['chengdu', 'panda', 'wildlife', 'conservation'],
    featuredImage: 'https://loremflickr.com/1400/1000/panda,chengdu,china',
  },
  {
    id: 'post-7',
    title: 'The Ultimate Yangtze River Cruise Review',
    slug: 'yangtze-river-cruise',
    author: {
      id: 'user-7',
      name: 'Linda Wang',
      avatar: 'https://i.pravatar.cc/150?u=linda',
      isMember: true,
    },
    createdAt: '2026-02-10T13:15:00Z',
    content: `Did the 4-day downstream cruise from Chongqing to Yichang. Here's the unfiltered truth:

**The Ship**: We were on a 5-star vessel - cabin was spacious with balcony, food was all-you-can-eat buffet with international and Chinese options. Entertainment nightly included traditional performances.

**Scenery**: The Three Gorges section is spectacular. The Qutang, Wu, and Xiling gorges have been flooded partially due to the dam, but the remaining canyon walls are still awe-inspiring.

**Shore Excursions**: The Shennong Stream tributary was magical - bamboo rafts through narrow gorges. The Fengdu "Ghost City" is hokey but interesting.

**What to expect**: Disembarkation stops can be touristy. Negotiate with rickshaw drivers before getting in. English is limited outside major cities.

Not cheap ($800-1500 per person) but a unique way to see rural China.`,
    likesCount: 34,
    commentsCount: 4,
    tags: ['yangtze', 'river-cruise', 'chongqing', 'luxury'],
    featuredImage: 'https://loremflickr.com/1400/1000/beijing,greatwall,travel',
  },
  {
    id: 'post-8',
    title: 'Harbin Ice Festival - Complete Winter Guide',
    slug: 'harbin-ice-festival',
    author: {
      id: 'user-8',
      name: 'Robert Chen',
      avatar: 'https://i.pravatar.cc/150?u=robert',
      isMember: true,
    },
    createdAt: '2026-01-25T08:00:00Z',
    content: `The Harbin International Ice and Snow Sculpture Festival is unlike anything you've seen. January temperatures drop to -25掳C but the spectacle is worth every shiver:

**Sun Island**: Located across the Songhua River, features massive snow sculptures. Take the ferry over or walk on the frozen river itself.

**Central Avenue**: The Russian-influenced architecture is beautiful day or night. The historic buildings have a fairytale quality when lit up at night.

**What to wear**: Thermal underwear, down jacket, snow boots, hand warmers. The cold bites differently here. Don't forget a balaclava.

**Budget tip**: Book accommodations 3+ months ahead. December-January fills up fast. Local hotels near Central Avenue are cheaper than resort options.

**Other activities**: Try the indoor鍐伴洩涓栫晫 if you can't handle the real cold. Snow skiing at nearby resorts is excellent.`,
    likesCount: 45,
    commentsCount: 6,
    tags: ['harbin', 'winter', 'ice-festival', 'photography'],
    featuredImage: 'https://loremflickr.com/1400/1000/harbin,winter,travel',
  },
  {
    id: 'post-9',
    title: 'Chinese Visa Guide 2026 - Everything You Need to Know',
    slug: 'china-visa-guide-2026',
    author: {
      id: 'user-9',
      name: 'Michelle Zhang',
      avatar: 'https://i.pravatar.cc/150?u=michelle',
      isMember: true,
    },
    createdAt: '2026-01-18T10:00:00Z',
    content: `Navigating Chinese visa requirements is confusing. Here's the current 2026 breakdown:

**Tourist Visa (L)**: Most common. Requires invitation letter (can be from travel agency), flight bookings, hotel reservations, bank statements showing $100/day minimum. 30-60 day single/double entry.

**144-Hour Transit Visa-Free**: Available at 20+ cities for passport holders from 50+ countries. No invitation needed. Must have proof of onward travel.

**Regional Variations**: Some provinces offer 30-day visa-free for certain nationalities. Hainan island has dedicated tourist visa-free entry.

**Tips**:
- Apply at least 6 weeks before travel
- Consul directly - agents markup 2x
- Documents must be in Chinese or with certified translation
- Visa runners: don't!

**Current Restrictions**: Due to current situation, expect longer processing times. Some visa categories still restricted. Check your country's specific requirements.`,
    likesCount: 203,
    commentsCount: 24,
    tags: ['visa', 'tips', 'travel-planning', 'essential'],
    featuredImage: 'https://loremflickr.com/1400/1000/harbin,winter,travel',
  },
  {
    id: 'post-10',
    title: 'Hangzhou West Lake - Beyond the Basic Tour',
    slug: 'hangzhou-west-lake-secrets',
    author: {
      id: 'user-10',
      name: 'Thomas Wang',
      avatar: 'https://i.pravatar.cc/150?u=thomas',
      isMember: true,
    },
    createdAt: '2026-01-12T15:45:00Z',
    content: `West Lake is Hangzhou's crown jewel but tour groups only scratch the surface. Here's how to experience it properly:

**Sunrise at Leifeng Pagoda**: Avoid the crowds - go at 6am. The pagoda silhouetted against the pink sky is iconic. Free to visit before tour buses arrive.

**Xianghu Gengguang Temple**: A temple complex most tourists miss. The monks do evening prayers at 5pm with chanting you can observe quietly.

**Tea plantations of Longjing**: A short bus ride to the Dragon Well tea village. Walk through the terraced plantations, sample fresh tea at family-run stalls. Spring harvest season (April) is magical.

**Evening cruise**: The programmed fountain show at Nightless Pearl Bay is impressive but the peaceful lake cruise at sunset with traditional music is the real experience.

**Hidden walk**: The Bi Sheng memorial trail around the lake perimeter is 3km of stone paths through weeping willows and lotus ponds.`,
    likesCount: 51,
    commentsCount: 7,
    tags: ['hangzhou', 'west-lake', 'culture', 'tea'],
    featuredImage: 'https://loremflickr.com/1400/1000/hongkong,travel',
  },
  {
    id: 'post-11',
    title: 'Sichuan Cuisine Deep Dive - Beyond Mapo Tofu',
    slug: 'sichuan-cuisine-deep-dive',
    author: {
      id: 'user-11',
      name: 'Emily Zhang',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      isMember: true,
    },
    createdAt: '2026-01-08T12:00:00Z',
    content: `Sichuan food is China's most famous cuisine and for good reason. The numbing-spicy flavor profile (m谩l脿) using Sichuan peppercorns is addictive:

**Chengdu's Cuisine Highlights**:
- Huang Cheng La Ma (鐐欑伀) - iconic beef offal and tripe noodles
- Kuan Zhai Alley - food stall row with late night dan dan noodles
- Sichuanese hotpot at 椹﹩ - not the touristy chain ones

**Must-try Dishes**:
- Mapo doufu (mapo tofu) - theauthentic version has real m谩l脿 flavor
- Bangbang chicken (妫掓楦? - poached chicken with spicy sesame sauce
- Spicy crispy beef tripe
- Dan dan noodles (鎷呮媴闈?

**Cooking Class**: I took a morning class at the Sichuan Cooking School in Chengdu. Made mapo tofu, dumplings, and la zi ji (spicy chicken). Best experience of my trip!

**Vegetarians**: Sichuan has excellent vegetable dishes - there's a whole category called "cold meat" that's actually tofu shaped to look like meat.`,
    likesCount: 78,
    commentsCount: 11,
    tags: ['foodie', 'sichuan', 'chengdu', 'cooking-class'],
    featuredImage: 'https://loremflickr.com/1400/1000/panda,chengdu,china',
  },
  {
    id: 'post-12',
    title: "The Silk Road Journey - Xi'an to Kashgar by Train",
    slug: 'silk-road-train-journey',
    author: {
      id: 'user-12',
      name: 'Alexander Kim',
      avatar: 'https://i.pravatar.cc/150?u=alexander',
      isMember: true,
    },
    createdAt: '2026-01-05T09:30:00Z',
    content: `The Trans-Xinjiang Railway from Xi'an to Kashgar (via Urumqi) is one of the world's greatest train journeys. 48 hours through changing landscapes:

**The Route**: Starting from ancient Xi'an, the train climbs onto the Loess Plateau, crosses the Hexi Corridor, then enters the vast Taklamakan Desert. The desert at sunset is mesmerizing.

**Hard-sleeper vs Soft-sleeper**: Hard-sleeper (6 berths) is fine if you have a sheet. Soft-sleeper (4 berths) is worth the upgrade for the extra space and less noise.

**Stopovers Worth It**:
- Dunhuang: Mogao Caves are 30km from station, hire a taxi
- Turpan: Grape vineyards and the Flaming Mountains
- Urumqi: Take a day to see Tianchi (Heavenly Lake)

**Kashgar**: The Sunday market (鑹炬彁灏曞皵娓呯湡瀵? is chaos incarnate. Everything from livestock to electronics. The old town is being renovated so see it soon.

**Tip**: Book your beds immediately at ticket opening (15 days before). Popular route!`,
    likesCount: 62,
    commentsCount: 8,
    tags: ['silk-road', 'train', 'xinjiang', 'adventure'],
    featuredImage: 'https://loremflickr.com/1400/1000/beijing,greatwall,travel',
  },
  {
    id: 'post-13',
    title: 'Shanghai in 72 Hours - Modern China Experience',
    slug: 'shanghai-72-hours',
    author: {
      id: 'user-13',
      name: 'Rachel Chen',
      avatar: 'https://i.pravatar.cc/150?u=rachel',
      isMember: true,
    },
    createdAt: '2025-12-28T14:00:00Z',
    content: `Shanghai is China's showcase to the world - a city where the ancient and ultra-modern coexist:

**Day 1**: Start at The Bund (澶栨哗) at sunrise for empty photos. Walk the colonial arcade. Cross to Pudong via the Feneng Ferry ($1.50). Afternoon at Shanghai Tower's observation deck (632m - world's highest!).

**Day 2**: Yuyuan Gardens in the morning (avoid weekends). Lunch at the linked food hall. Afternoon at the French Concession - explore hidden lane stores. Evening at Xintiandi for drinks in restored shikumen houses.

**Day 3**: Morning at Jade Buddha Temple. Afternoon at Tianzifang artisans district. Night walk through Nanjing Road pedestrian shopping street.

**Best Night View**: The bar at the top of the Ritz-Carlton on the 58th floor. Dress code but worth it.

**Metro Tip**: Get a transportation card at any Metro station. Works on buses too. English signage is excellent.`,
    likesCount: 95,
    commentsCount: 13,
    tags: ['shanghai', 'city', 'modern', '72-hours'],
    featuredImage: 'https://loremflickr.com/1400/1000/beijing,greatwall,travel',
  },
  {
    id: 'post-14',
    title: 'Huangshan (Yellow Mountain) Photography Guide',
    slug: 'huangshan-photography-guide',
    author: {
      id: 'user-14',
      name: 'Frank Liu',
      avatar: 'https://i.pravatar.cc/150?u=frank',
      isMember: true,
    },
    createdAt: '2025-12-20T07:00:00Z',
    content: `Huangshan (Yellow Mountain) is called "the most beautiful mountain in China" and photographers from around the world flock here:

**Best Times**:
- November-December: Peak autumn foliage, crisp air
- January-February: Sea of clouds visible more often
- March-April: Spring blossoms
- Avoid Golden Week (October 1-7) - crowds unbearable

**Iconic Shots**:
- The impossibly tall pine trees - the famous Guest-Greeting Pine
- Sunrise at Dawn Pavilion (鏇欏厜浜?
- Sea of clouds from Paiding (鎺掍簯浜?
- The Bright Summit (鍏夋槑椤? - highest point

**Hiking Routes**: Don't attempt in one day. The western route is less crowded with steeper steps. Eastern route (鑾茶姳宄? is more accessible but busier.

**Accommodation**: Stay at the mountaintop hotels (鍖楁捣瀹鹃, 鐧介箙灞卞簞). Book 6+ months ahead. 4am wake-up for sunrise is mandatory.

**Physical Fitness**: Over 60% of steps are at 45+ degree angles. If you have knee issues, bring hiking poles and consider the cable car.`,
    likesCount: 87,
    commentsCount: 10,
    tags: ['huangshan', 'photography', 'hiking', 'nature'],
    featuredImage: 'https://loremflickr.com/1400/1000/yunnan,nature,travel',
  },
  {
    id: 'post-15',
    title: 'Best Photo Spots in China - 20 Locations',
    slug: 'best-photo-spots-china',
    author: {
      id: 'user-15',
      name: 'Samantha Zhang',
      avatar: 'https://i.pravatar.cc/150?u=samantha',
      isMember: true,
    },
    createdAt: '2025-12-15T11:00:00Z',
    content: `After 2 years traveling China with my camera, here's my curated list of the most photogenic spots:

**Iconic Landmarks**:
1. Great Wall (Mutianyu section for dramatic shots)
2. Zhangjiajie National Forest Park
3. Jiuzhaigou Valley, Sichuan
4. Huangshan summit at sunrise
5. Yangtze River Three Gorges

**Urban Perspectives**:
6. Shanghai skyline from The Bund
7. Hong Kong skyline from Victoria Peak
8. Beijing CBD from Jingshan Park
9. Macau's Guia Lighthouse view

**Hidden Gems**:
10. Wuyuan, Jiangxi - Morning mist in ancient villages
11. Kefei, Guizhou - Lakeside town at dawn
12. Fenghuang, Hunan - Riverside stilt houses at night
13. Yuanyang rice terraces at harvest
14. Huizhou, Anhui - Scholar gardens in rain

**Photography Tips**:
- Blue hour is brief - scout locations day before
- Most temples restrict tripods
- Spring and autumn have best light quality
- Consider pollution index - affects visibility`,
    likesCount: 156,
    commentsCount: 19,
    tags: ['photography', 'china', 'bucket-list', 'landscapes'],
    featuredImage: 'https://loremflickr.com/1400/1000/harbin,winter,travel',
  },
];

export const forumComments: ForumComment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    author: {
      id: 'user-2',
      name: 'Michael Wu',
      avatar: 'https://i.pravatar.cc/150?u=michael',
      isMember: true,
    },
    content: 'Great tips! Did you visit Mutianyu or Juyongguan? I heard Mutianyu is better restored but also more crowded.',
    createdAt: '2026-03-15T14:22:00Z',
    likesCount: 5,
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    author: {
      id: 'user-1',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      isMember: true,
    },
    content: 'I went to Mutianyu - the restored sections are great for photos and the drop slides are fun. But agree, go early morning to beat tour groups.',
    createdAt: '2026-03-15T16:30:00Z',
    likesCount: 3,
  },
  {
    id: 'comment-3',
    postId: 'post-5',
    author: {
      id: 'user-6',
      name: 'Kevin Yang',
      avatar: 'https://i.pravatar.cc/150?u=kevin',
      isMember: true,
    },
    content: 'Totally agree on the safety point. I traveled solo for 3 months and the biggest issue was actually people being too helpful - random strangers buying me lunch, offering to take photos, etc. Very overwhelming sometimes!',
    createdAt: '2026-02-21T09:15:00Z',
    likesCount: 12,
  },
  {
    id: 'comment-4',
    postId: 'post-3',
    author: {
      id: 'user-9',
      name: 'Michelle Zhang',
      avatar: 'https://i.pravatar.cc/150?u=michelle',
      isMember: true,
    },
    content: 'The Yong Hu Tau Fish Congee changed my life. Is it true they only take cash? I almost skipped it because I had no yuan on me.',
    createdAt: '2026-03-06T11:00:00Z',
    likesCount: 8,
  },
  {
    id: 'comment-5',
    postId: 'post-14',
    author: {
      id: 'user-10',
      name: 'Thomas Wang',
      avatar: 'https://i.pravatar.cc/150?u=thomas',
      isMember: true,
    },
    content: 'Important note about the knee health - I had knee surgery 5 years ago and the cable car was absolutely necessary. But the views from the top make it worth every penny.',
    createdAt: '2025-12-21T14:30:00Z',
    likesCount: 15,
  },
  {
    id: 'comment-6',
    postId: 'post-9',
    author: {
      id: 'user-7',
      name: 'Linda Wang',
      avatar: 'https://i.pravatar.cc/150?u=linda',
      isMember: true,
    },
    content: 'The 144-hour transit visa has been a lifesaver for my multiple trips through China. Works great from Shanghai, Hangzhou, and Beijing now. Just remember you need to show exit tickets!',
    createdAt: '2026-01-19T08:45:00Z',
    likesCount: 22,
  },
  {
    id: 'comment-7',
    postId: 'post-12',
    author: {
      id: 'user-4',
      name: 'David Park',
      avatar: 'https://i.pravatar.cc/150?u=david',
      isMember: true,
    },
    content: 'Did this route last summer. The Turpan grape trellises are incredible - the entire town smells like wine during harvest season. Also the Urumqi Heavenly Lake is a perfect rest day.',
    createdAt: '2026-01-06T15:20:00Z',
    likesCount: 7,
  },
  {
    id: 'comment-8',
    postId: 'post-8',
    author: {
      id: 'user-11',
      name: 'Emily Zhang',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      isMember: true,
    },
    content: 'For thermal gear - Uniqlo Heattech works surprisingly well. Layer it under any jacket. Also the hand warmers last about 8 hours, get the longer-burning ones.',
    createdAt: '2026-01-26T07:30:00Z',
    likesCount: 18,
  },
];
