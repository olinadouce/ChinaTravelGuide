import rawProducts from './affiliate-products.generated.json';

export const bookingCategoryIds = [
  'all',
  'attractions',
  'day-tours',
  'hotels',
  'food',
  'shows',
  'transfers',
] as const;

export type BookingCategory = Exclude<(typeof bookingCategoryIds)[number], 'all'>;
export type BookingProvider = 'Klook' | 'Trip.com' | 'KKday';

export interface AffiliateProduct {
  id: string;
  city: string;
  citySlug: string;
  title: string;
  image: string | null;
  currency: string;
  price: string;
  provider: BookingProvider;
  affiliateUrl: string;
  category: BookingCategory;
}

export interface BookingCity {
  slug: string;
  name: string;
  chineseName: string;
  region: string;
  description: string;
  image: string | null;
  productCount: number;
  categoryCounts: Partial<Record<BookingCategory, number>>;
}

export const bookingCategories: Array<{
  id: (typeof bookingCategoryIds)[number];
  label: string;
  shortLabel: string;
}> = [
  { id: 'all', label: 'All', shortLabel: 'All' },
  { id: 'attractions', label: 'Attractions', shortLabel: 'See' },
  { id: 'day-tours', label: 'Day Tours', shortLabel: 'Explore' },
  { id: 'hotels', label: 'Hotels', shortLabel: 'Stay' },
  { id: 'food', label: 'Food & Dining', shortLabel: 'Eat' },
  { id: 'shows', label: 'Shows & Experiences', shortLabel: 'Enjoy' },
  { id: 'transfers', label: 'Transfers', shortLabel: 'Move' },
];

const cityDefinitions: Record<
  string,
  { slug: string; name: string; chineseName: string; region: string; description: string }
> = {
  北京: { slug: 'beijing', name: 'Beijing', chineseName: '北京', region: 'North China', description: 'Imperial landmarks, Great Wall experiences and easy city arrivals.' },
  上海: { slug: 'shanghai', name: 'Shanghai', chineseName: '上海', region: 'East China', description: 'Skyline views, river cruises, museums, hotels and day trips.' },
  西安: { slug: 'xian', name: "Xi'an", chineseName: '西安', region: 'Northwest China', description: 'Terracotta Warriors, ancient walls and Tang-era cultural experiences.' },
  成都: { slug: 'chengdu', name: 'Chengdu', chineseName: '成都', region: 'Southwest China', description: 'Pandas, Sichuan flavors, mountain escapes and relaxed city stays.' },
  重庆: { slug: 'chongqing', name: 'Chongqing', chineseName: '重庆', region: 'Southwest China', description: 'A dramatic river city of hotpot, night views and mountain excursions.' },
  广州: { slug: 'guangzhou', name: 'Guangzhou', chineseName: '广州', region: 'South China', description: 'Cantonese dining, Pearl River cruises, theme parks and urban stays.' },
  深圳: { slug: 'shenzhen', name: 'Shenzhen', chineseName: '深圳', region: 'South China', description: 'Modern attractions, family entertainment and convenient Greater Bay access.' },
  佛山: { slug: 'foshan', name: 'Foshan', chineseName: '佛山', region: 'South China', description: 'Lingnan heritage, martial arts culture and hotels near Guangzhou.' },
  佛山市: { slug: 'foshan', name: 'Foshan', chineseName: '佛山', region: 'South China', description: 'Lingnan heritage, martial arts culture and hotels near Guangzhou.' },
  桂林: { slug: 'guilin', name: 'Guilin & Yangshuo', chineseName: '桂林', region: 'South China', description: 'Li River scenery, karst peaks, cruises and Longji rice terraces.' },
  杭州: { slug: 'hangzhou', name: 'Hangzhou', chineseName: '杭州', region: 'East China', description: 'West Lake, elegant hotels, performances and tea-country escapes.' },
  张家界: { slug: 'zhangjiajie', name: 'Zhangjiajie', chineseName: '张家界', region: 'Central China', description: 'National parks, glass bridges, cable cars and scenic multi-day tours.' },
  厦门: { slug: 'xiamen', name: 'Xiamen', chineseName: '厦门', region: 'Southeast China', description: 'Coastal walks, island culture and relaxed Fujian experiences.' },
  福州: { slug: 'fuzhou', name: 'Fuzhou', chineseName: '福州', region: 'Southeast China', description: 'Historic lanes, Fujian culture and practical city stays.' },
  昆明: { slug: 'kunming', name: 'Kunming', chineseName: '昆明', region: 'Southwest China', description: 'Stone Forest day trips, Yunnan culture and year-round mild weather.' },
  丽江: { slug: 'lijiang', name: 'Lijiang', chineseName: '丽江', region: 'Southwest China', description: 'Old-town atmosphere, Jade Dragon Snow Mountain and Yunnan circuits.' },
  云南: { slug: 'yunnan', name: 'Yunnan', chineseName: '云南', region: 'Southwest China', description: 'Multi-city journeys through Kunming, Dali, Lijiang and Shangri-La.' },
  大理白族自治州: { slug: 'dali', name: 'Dali', chineseName: '大理', region: 'Southwest China', description: 'Erhai Lake, Bai culture and scenic Yunnan touring.' },
  贵阳: { slug: 'guiyang', name: 'Guiyang & Guizhou', chineseName: '贵阳', region: 'Southwest China', description: 'Waterfalls, karst landscapes, local food and Guizhou touring.' },
  贵阳市: { slug: 'guiyang', name: 'Guiyang & Guizhou', chineseName: '贵阳', region: 'Southwest China', description: 'Waterfalls, karst landscapes, local food and Guizhou touring.' },
  贵州: { slug: 'guiyang', name: 'Guiyang & Guizhou', chineseName: '贵阳', region: 'Southwest China', description: 'Waterfalls, karst landscapes, local food and Guizhou touring.' },
  拉萨: { slug: 'tibet', name: 'Lhasa & Tibet', chineseName: '拉萨 / 西藏', region: 'Southwest China', description: 'High-altitude cultural journeys, sacred lakes and plateau landscapes.' },
  西藏: { slug: 'tibet', name: 'Lhasa & Tibet', chineseName: '拉萨 / 西藏', region: 'Southwest China', description: 'High-altitude cultural journeys, sacred lakes and plateau landscapes.' },
  西宁: { slug: 'xining', name: 'Xining & Qinghai', chineseName: '西宁', region: 'Northwest China', description: 'Qinghai Lake, plateau circuits and Silk Road connections.' },
  兰州: { slug: 'lanzhou', name: 'Lanzhou', chineseName: '兰州', region: 'Northwest China', description: 'Yellow River culture and a gateway to Gansu and Qinghai.' },
  酒泉市: { slug: 'jiuquan-dunhuang', name: 'Jiuquan & Dunhuang', chineseName: '酒泉 / 敦煌', region: 'Northwest China', description: 'Desert landscapes, Silk Road heritage and western China touring.' },
  黄山: { slug: 'huangshan', name: 'Huangshan', chineseName: '黄山', region: 'East China', description: 'Mountain scenery, ancient villages and nature-focused stays.' },
  上饶市: { slug: 'shangrao', name: 'Shangrao', chineseName: '上饶', region: 'East China', description: 'Wuyuan villages, mountain scenery and rural Jiangxi escapes.' },
  郑州: { slug: 'zhengzhou', name: 'Zhengzhou & Henan', chineseName: '郑州', region: 'Central China', description: 'A practical base for Longmen Grottoes and central China heritage.' },
  恩施土家族苗族自治州: { slug: 'enshi', name: 'Enshi', chineseName: '恩施', region: 'Central China', description: 'Canyons, stone forests and minority-culture landscapes.' },
  湖南: { slug: 'hunan', name: 'Hunan', chineseName: '湖南', region: 'Central China', description: 'Changsha, Zhangjiajie and Fenghuang in one scenic circuit.' },
  内地: { slug: 'china-wide', name: 'China-wide', chineseName: '中国', region: 'Across China', description: 'Offers and booking options that work across multiple destinations.' },
};

function inferCategory(title: string, affiliateUrl: string): BookingCategory {
  const value = `${title} ${affiliateUrl}`.toLowerCase();

  if (/酒店|飯店|宾馆|賓館|住宿|公寓|客栈|旅馆|hotel|resort/.test(value)) return 'hotels';
  if (/接送|机场|機場|车站|車站|包车|包車|租车|租車|transfer|private car|shuttle/.test(value)) return 'transfers';
  if (/一日游|一日遊|半日游|半日遊|[2-9]日游|[2-9]日遊|小团|小團|私家团|私人团|拼团|旅行|行程|tour/.test(value)) return 'day-tours';
  if (/餐|美食|火锅|火鍋|早茶|晚餐|午餐|宴|料理|烤全羊|牛肉面|food|dining|restaurant/.test(value)) return 'food';
  if (/演出|表演|秀|show|spa|按摩|足疗|足療|汤泉|湯泉|乐园|樂園|迪士尼|欢乐谷|歡樂谷|冰雪世界|主题公园|主題公園/.test(value)) return 'shows';
  return 'attractions';
}

export const affiliateProducts: AffiliateProduct[] = rawProducts.flatMap((product) => {
  const city = cityDefinitions[product.city];
  if (!city) return [];

  return [{
    ...product,
    provider: product.provider as BookingProvider,
    citySlug: city.slug,
    category: inferCategory(product.title, product.affiliateUrl),
  }];
});

export const bookingCities: BookingCity[] = Array.from(
  affiliateProducts.reduce((cities, product) => {
    const definition = cityDefinitions[product.city];
    const existing = cities.get(product.citySlug) ?? {
      slug: definition.slug,
      name: definition.name,
      chineseName: definition.chineseName,
      region: definition.region,
      description: definition.description,
      image: null,
      productCount: 0,
      categoryCounts: {},
    };

    existing.productCount += 1;
    existing.categoryCounts[product.category] = (existing.categoryCounts[product.category] ?? 0) + 1;
    if (!existing.image && product.image) existing.image = product.image;
    cities.set(product.citySlug, existing);
    return cities;
  }, new Map<string, BookingCity>()).values()
).sort((a, b) => b.productCount - a.productCount || a.name.localeCompare(b.name));

export function getBookingCity(slug: string) {
  return bookingCities.find((city) => city.slug === slug);
}

export function getProductsForCity(slug: string) {
  return affiliateProducts.filter((product) => product.citySlug === slug);
}

export function formatAffiliatePrice(product: AffiliateProduct) {
  if (!product.price || product.price === '/') return 'See latest price';
  const numeric = product.price.replace(/起|from/gi, '').trim();
  const symbol = product.currency === 'USD' ? 'US$' : `${product.currency} `;
  return `${product.price.includes('起') ? 'From ' : ''}${symbol}${numeric}`;
}
