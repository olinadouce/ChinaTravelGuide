import { describe, expect, it } from 'vitest';

import {
  REFERRAL_CODE_LENGTH,
  isValidReferralCode,
  normalizeReferralCode,
} from './referrals';
import { createReferralCode } from './server/points-service';

describe('referral codes', () => {
  it('normalizes pasted codes consistently', () => {
    expect(normalizeReferralCode(' abcd-2345 efgh ')).toBe('ABCD2345EFGH');
  });

  it('rejects partial or ambiguous codes', () => {
    expect(isValidReferralCode('ABC234')).toBe(false);
    expect(isValidReferralCode('ABCD2345EFG0')).toBe(false);
    expect(isValidReferralCode('ABCD2345EFG1')).toBe(false);
  });

  it('creates stable, valid, user-specific codes', () => {
    const first = createReferralCode('firebase-user-one');
    const again = createReferralCode('firebase-user-one');
    const second = createReferralCode('firebase-user-two');

    expect(first).toHaveLength(REFERRAL_CODE_LENGTH);
    expect(isValidReferralCode(first)).toBe(true);
    expect(first).toBe(again);
    expect(first).not.toBe(second);
  });
});
