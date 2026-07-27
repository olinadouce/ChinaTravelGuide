import { describe, expect, it } from 'vitest';

import { POINTS_ACTION_LABELS, POINTS_RULES } from './points-rules';
import {
  isOwnedForumImagePath,
  MAX_FORUM_IMAGES,
} from './server/forum-image-storage';

describe('forum rewards and image limits', () => {
  it('awards 20 points for a published post', () => {
    expect(POINTS_RULES.CREATE_FORUM_POST).toBe(20);
    expect(POINTS_ACTION_LABELS.forum_post).toBe('Published a forum post');
  });

  it('limits a post to nine images', () => {
    expect(MAX_FORUM_IMAGES).toBe(9);
  });

  it('accepts only image paths owned by the signed-in user', () => {
    expect(isOwnedForumImagePath('user-1', 'forum-images/user-1/photo.jpg')).toBe(true);
    expect(isOwnedForumImagePath('user-1', 'forum-images/user-2/photo.jpg')).toBe(false);
    expect(isOwnedForumImagePath('user-1', 'forum-images/user-1/../photo.jpg')).toBe(false);
  });
});
