import { destinations, heroImages, heroStats, journeys, practicalGuides, popularSearches, travelTools } from '@/data/content';
import { forumPosts, forumComments } from '@/data/forum';

export function getHomePayload() {
  return {
    heroImages,
    heroStats,
    featuredDestinations: destinations.slice(0, 6),
    featuredJourneys: journeys.slice(0, 3),
    practicalGuides,
    popularSearches,
    travelTools,
  };
}

export function getDestinations(query?: string, region?: string) {
  return destinations.filter((destination) => {
    const matchesQuery =
      !query ||
      destination.name.toLowerCase().includes(query.toLowerCase()) ||
      destination.description.toLowerCase().includes(query.toLowerCase()) ||
      destination.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

    const matchesRegion = !region || region === 'all' || destination.region === region;
    return matchesQuery && matchesRegion;
  });
}

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getJourneys(theme?: string, difficulty?: string) {
  return journeys.filter((journey) => {
    const matchesTheme = !theme || theme === 'all' || journey.theme.toLowerCase().includes(theme.toLowerCase());
    const matchesDifficulty = !difficulty || difficulty === 'all' || journey.difficulty === difficulty;
    return matchesTheme && matchesDifficulty;
  });
}

export function getJourneyBySlug(slug: string) {
  return journeys.find((journey) => journey.slug === slug);
}

export function getGuideBySlug(slug: string) {
  return practicalGuides.find((guide) => guide.slug === slug);
}

export function getToolBySlug(slug: string) {
  return travelTools.find((tool) => tool.slug === slug);
}

export function getForumPosts(page: number = 1, limit: number = 6) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    items: forumPosts.slice(start, end),
    totalPages: Math.ceil(forumPosts.length / limit),
    total: forumPosts.length,
  };
}

export function getForumPostBySlug(slug: string) {
  return forumPosts.find((post) => post.slug === slug);
}

export function getForumCommentsByPostId(postId: string) {
  return forumComments.filter((comment) => comment.postId === postId);
}
