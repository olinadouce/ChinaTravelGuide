import { describe, expect, it } from 'vitest';

import { POINTS_ACTION_LABELS, POINTS_RULES } from './points-rules';
import {
  isOwnedForumImagePath,
  MAX_FORUM_IMAGES,
} from './server/forum-image-storage';
import {
  forumAuthorFromProfile,
  forumPostRewardAvailable,
  forumRewardDay,
} from './server/forum-service';

describe('forum rewards and image limits', () => {
  it('awards 20 points for a published post', () => {
    expect(POINTS_RULES.CREATE_FORUM_POST).toBe(20);
    expect(POINTS_RULES.LIMITS.FORUM_POST_REWARD_ONCE_PER_DAY).toBe(true);
    expect(POINTS_ACTION_LABELS.forum_post).toBe('Published a forum post');
  });

  it('uses a UTC calendar day for the daily post cap', () => {
    expect(forumRewardDay(new Date('2026-07-27T23:59:59Z'))).toBe('2026-07-27');
    expect(forumRewardDay(new Date('2026-07-28T00:00:00Z'))).toBe('2026-07-28');
  });

  it('blocks repeat and legacy same-day post rewards without blocking a new day', () => {
    const now = Date.parse('2026-07-28T12:00:00Z');
    expect(forumPostRewardAvailable({
      lastRewardDate: '2026-07-28',
      lastPostAt: 0,
      now,
    })).toBe(false);
    expect(forumPostRewardAvailable({
      lastPostAt: Date.parse('2026-07-28T08:00:00Z'),
      now,
    })).toBe(false);
    expect(forumPostRewardAvailable({
      lastRewardDate: '2026-07-27',
      lastPostAt: Date.parse('2026-07-27T23:59:59Z'),
      now,
    })).toBe(true);
  });

  it('limits a post to nine images', () => {
    expect(MAX_FORUM_IMAGES).toBe(9);
  });

  it('accepts only image paths owned by the signed-in user', () => {
    expect(isOwnedForumImagePath('user-1', 'forum-images/user-1/photo.jpg')).toBe(true);
    expect(isOwnedForumImagePath('user-1', 'forum-images/user-2/photo.jpg')).toBe(false);
    expect(isOwnedForumImagePath('user-1', 'forum-images/user-1/../photo.jpg')).toBe(false);
  });

  it('uses the server-side profile nickname and avatar for forum activity', () => {
    expect(forumAuthorFromProfile(
      { uid: 'user-1', name: 'Token name', picture: 'https://example.com/token.jpg' },
      {
        displayName: 'Custom nickname',
        photoURL: '/api/forum/images/forum-images/user-1/avatar.jpg',
      }
    )).toMatchObject({
      id: 'user-1',
      name: 'Custom nickname',
      avatar: '/api/forum/images/forum-images/user-1/avatar.jpg',
    });
  });
});
