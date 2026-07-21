import { adminDb, verifyRequestUser } from './firebase-admin';

export type VerifiedPaidGuideUser = {
  uid: string;
  unlockedPackages: string[];
};

export async function verifyPaidGuideUser(
  authorizationHeader: string | null
): Promise<VerifiedPaidGuideUser | null> {
  const identity = await verifyRequestUser(authorizationHeader);
  if (!identity) return null;

  const profile = await adminDb().collection('users').doc(identity.uid).get();
  if (!profile.exists) return null;
  const unlockedPackages = profile.data()?.unlockedPackages;
  return {
    uid: identity.uid,
    unlockedPackages: Array.isArray(unlockedPackages)
      ? unlockedPackages.filter((value): value is string => typeof value === 'string')
      : [],
  };
}
