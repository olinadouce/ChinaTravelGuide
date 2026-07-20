/**
 * Compass Points rules (v2)
 *
 * See data/绉垎瑙勫垯.docx for the full design doc.
 *
 * Pricing philosophy:
 *   - Free Guide: always free, builds trust
 *   - Full Guide: priced to make first unlock feel earned (sign-up + light tasks),
 *     but not so high that it blocks real users
 *   - Subsequent unlocks require genuine engagement (share, invite, feedback)
 */

export const POINTS_RULES = {
  // === EARNING ===

  /** One-time bonus when a user signs up. */
  SIGNUP_BONUS: 80,

  /** Reward for reading a Free Guide (3+ min, scrolled 60%+). Per city, once. */
  BROWSE_FREE_GUIDE: 20,

  /** Reward for saving / downloading a Free Guide. Per city, once. */
  SAVE_FREE_GUIDE: 20,

  /** Reward for sharing a link that produces a real external click. */
  SHARE_VALID_CLICK: 20,

  /** Reward when an invited user signs up (new device/email). */
  INVITE_SIGNUP: 80,

  /** Reward when an invited user unlocks a Full Guide. */
  INVITE_FULL_GUIDE_UNLOCK: 120,

  /** Reward for submitting valid feedback / review. */
  SUBMIT_FEEDBACK: 40,

  /** Daily login bonus. */
  DAILY_LOGIN: 5,

  // === SPENDING ===

  /** Cost to unlock a Full Guide. */
  FULL_GUIDE_COST: 120,

  /** Cost per AI deep-route adjustment. */
  AI_DEEP_ADJUSTMENT: 20,

  /** Cost per AI normal Q&A after the free daily quota. */
  AI_NORMAL_QA: 10,

  // === TIERS (read-only) ===

  TIERS: {
    EXPLORER: { min: 0, max: 199, name: 'Explorer' },
    NAVIGATOR: { min: 200, max: 499, name: 'Navigator' },
    COMPASS_PRO: { min: 500, max: Infinity, name: 'Compass Pro' },
  },

  // === ANTI-ABUSE LIMITS ===

  LIMITS: {
    /** Sign-up bonus is one-time per account. */
    SIGNUP_ONCE_PER_ACCOUNT: true,
    /** Browse/save bonus is once per city per user. */
    BROWSE_SAVE_ONCE_PER_CITY: true,
    /** Daily login bonus is once per calendar day. */
    DAILY_LOGIN_ONCE_PER_DAY: true,
    /** Share reward requires external click verification (mock = manual). */
    SHARE_REQUIRES_EXTERNAL_CLICK: true,
  },
} as const;

/** Action types tracked in the points ledger. */
export type PointsActionType =
  | 'signup_bonus'
  | 'browse_free_guide'
  | 'save_free_guide'
  | 'share_valid_click'
  | 'invite_signup'
  | 'invite_full_guide_unlock'
  | 'submit_feedback'
  | 'daily_login'
  | 'redeem_full_guide'
  | 'admin_adjust';

export interface PointsLedgerEntry {
  id: string;
  userId: string;
  actionType: PointsActionType;
  pointsChange: number;
  relatedCity?: string;       // e.g. 'beijing'
  relatedProductId?: string;  // e.g. 'pkg-ishowspeed-beijing'
  createdAt: number;          // epoch ms
  status: 'pending' | 'confirmed' | 'rejected';
  note?: string;
}

/** Human-readable label for each action. */
export const POINTS_ACTION_LABELS: Record<PointsActionType, string> = {
  signup_bonus: 'Welcome bonus',
  browse_free_guide: 'Read Free Guide',
  save_free_guide: 'Save Free Guide',
  share_valid_click: 'Share link clicked',
  invite_signup: 'Friend signed up',
  invite_full_guide_unlock: 'Friend unlocked Full Guide',
  submit_feedback: 'Feedback submitted',
  daily_login: 'Daily login',
  redeem_full_guide: 'Unlock Full Guide',
  admin_adjust: 'Admin adjustment',
};

/** Get user's tier from their current points balance. */
export function getUserTier(points: number): keyof typeof POINTS_RULES.TIERS {
  if (points >= POINTS_RULES.TIERS.COMPASS_PRO.min) return 'COMPASS_PRO';
  if (points >= POINTS_RULES.TIERS.NAVIGATOR.min) return 'NAVIGATOR';
  return 'EXPLORER';
}

/** Get the next tier info for a user (used in progress UI). */
export function getNextTier(currentPoints: number) {
  if (currentPoints < POINTS_RULES.TIERS.NAVIGATOR.min) {
    return { name: 'Navigator', min: POINTS_RULES.TIERS.NAVIGATOR.min, remaining: POINTS_RULES.TIERS.NAVIGATOR.min - currentPoints };
  }
  if (currentPoints < POINTS_RULES.TIERS.COMPASS_PRO.min) {
    return { name: 'Compass Pro', min: POINTS_RULES.TIERS.COMPASS_PRO.min, remaining: POINTS_RULES.TIERS.COMPASS_PRO.min - currentPoints };
  }
  return null;
}
