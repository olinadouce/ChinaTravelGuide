export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: 'north' | 'south' | 'east' | 'west' | 'central';
  country: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  bestTime: string;
  avgTemperature: string;
  images: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  coordinates: { lat: number; lng: number };
  mustSee: string[];
  practicalInfo: { transport: string; language: string; currency: string; idealStay: string; airport: string };
}

export interface Journey {
  id: string;
  title: string;
  slug: string;
  duration: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  theme: string;
  description: string;
  image: string;
  highlights: string[];
  includedDestinations: string[];
  price: string;
  itinerary: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface InlineRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export type RichBlock =
  | { kind: 'heading'; level: 2 | 3; text: string }
  | { kind: 'paragraph'; runs: InlineRun[] }
  | { kind: 'list'; ordered: boolean; items: InlineRun[][] }
  | { kind: 'table'; headers: InlineRun[]; rows: InlineRun[][][] }
  | { kind: 'callout'; tone: 'info' | 'warning' | 'tip'; runs: InlineRun[] }
  | { kind: 'code'; language?: string; text: string }
  | { kind: 'divider' }
  | {
      kind: 'steps';
      steps: Array<{
        label: string;
        caption?: string;
        tone?: 'primary' | 'accent' | 'jade' | 'secondary' | 'warning';
      }>;
    };

export interface PracticalGuide {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  accent: 'primary' | 'accent' | 'jade' | 'secondary';
  readMinutes: number;
  preview: string[];
  body: RichBlock[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface SiteTool {
  slug: string;
  title: string;
  description: string;
  href: string;
  status: 'live' | 'guide';
}

export interface ForumAuthor {
  id: string;
  name: string;
  avatar: string;
  isMember: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  slug: string;
  author: ForumAuthor;
  createdAt: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  tags: string[];
  featuredImage?: string;
}

export interface ForumComment {
  id: string;
  postId: string;
  author: ForumAuthor;
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  price: string;
  originalPrice?: string;
  duration: string;
  destination: string;
  image: string;
  badge?: string;
  popular?: boolean;
  includes: string[];
  exclude: string[];
  // New fields for detailed travel guide
  itinerary: Array<{
    day: number;
    title: string;
    highlights: string[];
    tips: string[];
    accommodation?: string;
    meals?: string;
  }>;
  hotelRecommendations?: string[];
  importantNotes?: string[];
}

// New: Travel Packages 鈥?four themes

export type ThemeId = 'landscape' | 'history' | 'themed' | 'ishowspeed';

export type ThemeAccent = 'primary' | 'accent' | 'jade' | 'secondary';

export type ThemeIconName = 'Mountain' | 'Landmark' | 'Compass' | 'Sparkles';

export interface PackageTheme {
  id: ThemeId;
  /** Primary display name */
  name: string;
  /** Localised name (English by default) */
  nameEn: string;
  tagline: string;
  description: string;
  /** lucide-react icon name (string, dynamically imported) */
  icon: ThemeIconName;
  accent: ThemeAccent;
  coverImage: string;
  /** CSS gradient for the theme cover card */
  gradient: string;
}

export interface TravelPackage {
  id: string;
  slug: string;
  themeId: ThemeId;
  name: string;
  destination: string;
  duration: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  badge?: string;
  popular?: boolean;
  highlights: string[];
  tags: string[];
  /** Points required to unlock */
  pointsCost: number;
  /** Path to free-version HTML on disk (relative to cwd) */
  freeHtmlPath: string;
  /** Path to paid-version HTML; falls back to free path if missing */
  paidHtmlPath: string;
}
