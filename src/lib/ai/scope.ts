import { getAllPackages } from '@/data/packages';
import { resolvePackageId, resolvePackageSlug } from './entitlements';

const CITY_ALIASES: Array<{ city: string; patterns: RegExp[] }> = [
  { city: 'beijing', patterns: [/beijing/i, /北京/, /forbidden city/i, /故宫/, /长城/] },
  { city: 'shanghai', patterns: [/shanghai/i, /上海/, /the bund/i, /外滩/, /yu garden/i] },
  { city: 'chengdu', patterns: [/chengdu/i, /成都/, /panda/i, /大熊猫/, /hotpot/i] },
  { city: 'chongqing', patterns: [/chongqing/i, /重庆/, /hongya/i, /洪崖洞/] },
  { city: 'hong-kong', patterns: [/hong\s*kong/i, /香港/, /victoria peak/i, /维多利亚港/] },
  { city: 'shenzhen', patterns: [/shenzhen/i, /深圳/, /huaqiangbei/i] },
  { city: 'henan', patterns: [/henan/i, /河南/, /shaolin/i, /少林/, /longmen/i, /龙门/] },
  { city: 'xian', patterns: [/xi['’]?an/i, /西安/, /terracotta/i, /兵马俑/, /chang'?an/i] },
  { city: 'guangzhou', patterns: [/guangzhou/i, /广州/, /cantonese/i, /foshan/i, /佛山/] },
  { city: 'guilin', patterns: [/guilin/i, /桂林/, /yangshuo/i, /阳朔/, /longji/i, /龙脊/] },
  { city: 'tibet', patterns: [/tibet/i, /西藏/, /lhasa/i, /拉萨/, /everest/i] },
  { city: 'huangshan', patterns: [/huangshan/i, /黄山/, /sanqingshan/i] },
  { city: 'zhangjiajie', patterns: [/zhangjiajie/i, /张家界/, /enshi/i] },
  { city: 'yunnan', patterns: [/yunnan/i, /云南/, /lijiang/i, /shangri-?la/i, /梅里/] },
  { city: 'sichuan', patterns: [/sichuan/i, /四川/, /yading/i, /亚丁/, /siguniang/i] },
  { city: 'gansu-qinghai', patterns: [/gansu/i, /qinghai/i, /甘肃/, /青海/, /dunhuang/i] },
  { city: 'karst', patterns: [/karst/i, /libo/i, /荔波/, /xingyi/i] },
];

export type QueryScope = {
  packageId: string | null;
  city: string | null;
  needsClarification: boolean;
};

function cityFromPackageId(packageId: string | null): string | null {
  if (!packageId) return null;
  const pkg = getAllPackages().find((p) => p.id === packageId);
  if (!pkg) return null;
  // Prefer slug-derived city for ishowspeed-*
  if (pkg.slug.startsWith('ishowspeed-')) {
    return pkg.slug.replace(/^ishowspeed-/, '');
  }
  return pkg.slug;
}

function detectCityFromText(text: string): string | null {
  for (const entry of CITY_ALIASES) {
    if (entry.patterns.some((re) => re.test(text))) return entry.city;
  }
  return null;
}

function detectPackageFromText(text: string): string | null {
  const packages = getAllPackages();
  for (const pkg of packages) {
    const slugBits = pkg.slug.replace(/-/g, '[\\s-]*');
    const re = new RegExp(slugBits, 'i');
    if (re.test(text) || text.includes(pkg.name)) {
      return pkg.id;
    }
  }
  // IShowSpeed + city
  if (/ishowspeed|speed/i.test(text) || /直播|艾秀/.test(text)) {
    const city = detectCityFromText(text);
    if (city) {
      const slug = `ishowspeed-${city}`;
      return resolvePackageId(slug);
    }
  }
  return null;
}

/**
 * Infer query scope from question, page context, and short history.
 * Vague pronouns without city/package context => clarification.
 */
export function resolveQueryScope(params: {
  message: string;
  history: Array<{ role: string; content: string }>;
  currentPackageId?: string | null;
  currentCity?: string | null;
  pageUrl?: string | null;
}): QueryScope {
  const text = [
    params.message,
    ...params.history.slice(-4).map((h) => h.content),
    params.pageUrl || '',
  ].join('\n');

  const fromMessagePackage = detectPackageFromText(params.message);
  const fromMessageCity = detectCityFromText(params.message);

  let packageId =
    fromMessagePackage ||
    resolvePackageId(params.currentPackageId) ||
    detectPackageFromText(text);

  // URL /packages/{slug}
  if (!packageId && params.pageUrl) {
    const m = params.pageUrl.match(/\/packages\/([a-z0-9-]+)/i);
    if (m) packageId = resolvePackageId(m[1]);
  }

  let city =
    fromMessageCity ||
    (params.currentCity ? params.currentCity.trim().toLowerCase() : null) ||
    detectCityFromText(text) ||
    cityFromPackageId(packageId);

  // If user clearly named another city, do not force page package filter alone
  // (search still uses package/city filters only when confident).
  const vague =
    /(它|那边|那里|这个|那个|几点|开门|门票|多少钱|how much|what time|when does|opening)/i.test(
      params.message
    ) &&
    !fromMessageCity &&
    !fromMessagePackage;

  const hasContext = Boolean(packageId || city || detectCityFromText(text));
  if (vague && !hasContext) {
    return { packageId: null, city: null, needsClarification: true };
  }

  // Prefer not over-filtering when the question names a different city than the page.
  if (fromMessageCity && packageId) {
    const slug = resolvePackageSlug(packageId);
    const packageCity = cityFromPackageId(packageId);
    if (packageCity && packageCity !== fromMessageCity && !fromMessagePackage) {
      packageId = null;
      city = fromMessageCity;
    } else if (slug && fromMessageCity && !slug.includes(fromMessageCity) && !fromMessagePackage) {
      packageId = null;
      city = fromMessageCity;
    }
  }

  return {
    packageId,
    city,
    needsClarification: false,
  };
}

export function detectLanguage(message: string): 'zh' | 'en' {
  const cjk = (message.match(/[\u4e00-\u9fff]/g) || []).length;
  return cjk >= 2 ? 'zh' : 'en';
}
