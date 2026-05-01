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

export interface PracticalGuide {
  slug: string;
  title: string;
  summary: string;
  points: string[];
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
