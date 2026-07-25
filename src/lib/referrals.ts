export const REFERRAL_CODE_LENGTH = 12;
export const REFERRAL_CODE_PATTERN = /^[A-Z2-9]{12}$/;

export function normalizeReferralCode(value: string | null | undefined): string {
  return (value ?? '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z2-9]/g, '')
    .slice(0, REFERRAL_CODE_LENGTH);
}

export function isValidReferralCode(value: string | null | undefined): boolean {
  return REFERRAL_CODE_PATTERN.test(normalizeReferralCode(value));
}
