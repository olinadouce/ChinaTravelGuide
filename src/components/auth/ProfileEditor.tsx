'use client';

import { Camera, CheckCircle2, Loader2, Save, Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

import { authenticatedPostForm } from '@/lib/authenticated-api';

import { useAuth } from './FirebaseAuthProvider';

const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function ProfileEditor() {
  const { user, refreshUser } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
  }, [avatarPreview]);

  if (!user) return null;

  const selectAvatar = (file: File | null) => {
    setError(null);
    setSaved(false);
    if (!file) {
      setAvatarFile(null);
      setAvatarPreview(null);
      return;
    }
    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      setError('Use a JPEG, PNG, WebP, or GIF avatar.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('Avatar must be smaller than 4 MB.');
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      const form = new FormData();
      form.set('displayName', displayName);
      if (avatarFile) form.set('avatar', avatarFile);
      await authenticatedPostForm('/api/account/profile', form);
      await refreshUser();
      setAvatarFile(null);
      setAvatarPreview(null);
      setSaved(true);
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'Your profile could not be updated.');
    } finally {
      setSaving(false);
    }
  };

  const avatar = avatarPreview || user.photoURL || '/see-china-route-logo.svg';

  return (
    <form
      onSubmit={save}
      className="mt-6 rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-secondary-900"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <img
            src={avatar}
            alt={`${user.displayName} profile`}
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md dark:border-secondary-800"
          />
          <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-primary p-2.5 text-white shadow-lg transition hover:bg-primary/90" aria-label="Choose a new profile photo">
            <Camera className="h-4 w-4" />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              onChange={(event) => selectAvatar(event.target.files?.[0] || null)}
            />
          </label>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Forum profile</h2>
          <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
            This nickname and profile photo appear on new posts and comments.
          </p>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-200">Display name</span>
            <input
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
                setSaved(false);
              }}
              className="input-field mt-1 w-full"
              minLength={2}
              maxLength={40}
              required
            />
          </label>
          {avatarFile && (
            <div className="mt-2 flex items-center justify-between gap-3 text-xs text-secondary-500">
              <span className="truncate">{avatarFile.name}</span>
              <button
                type="button"
                onClick={() => selectAvatar(null)}
                className="inline-flex shrink-0 items-center gap-1 font-bold text-red-600 hover:underline"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Cancel photo
              </button>
            </div>
          )}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {saved && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-jade">
              <CheckCircle2 className="h-4 w-4" />
              Profile updated
            </p>
          )}
        </div>

        <button type="submit" disabled={saving} className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </div>
    </form>
  );
}
