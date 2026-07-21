'use client';

import { AlertCircle, Bell, CheckCheck, Heart, Loader2, LockKeyhole, MessageSquare, PenLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { authenticatedDelete, authenticatedGet, authenticatedPost } from '@/lib/authenticated-api';
import type { ForumNotification, ForumPost } from '@/types';

type ActivityResponse = {
  posts: ForumPost[];
  notifications: ForumNotification[];
  unreadCount: number;
};

export default function MyPostsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [activity, setActivity] = useState<ActivityResponse>({ posts: [], notifications: [], unreadCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [markingRead, setMarkingRead] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    let active = true;
    authenticatedGet<ActivityResponse>('/api/account/posts')
      .then((result) => {
        if (active) {
          setActivity(result);
          setError(null);
        }
      })
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [isAuthenticated]);

  const markAllRead = async () => {
    setMarkingRead(true);
    try {
      await authenticatedPost('/api/account/notifications/read');
      setActivity((current) => ({
        ...current,
        unreadCount: 0,
        notifications: current.notifications.map((entry) => ({ ...entry, read: true })),
      }));
      window.dispatchEvent(new CustomEvent('forum-notifications-read'));
    } catch (requestError: any) {
      setError(requestError.message);
    } finally {
      setMarkingRead(false);
    }
  };

  const deletePost = async (post: ForumPost) => {
    if (!window.confirm(`Delete “${post.title}”? This also removes its comments, likes, notifications, and image.`)) return;
    setDeletingSlug(post.slug);
    setError(null);
    try {
      await authenticatedDelete(`/api/forum/posts/${encodeURIComponent(post.slug)}`);
      setActivity((current) => ({
        ...current,
        posts: current.posts.filter((item) => item.slug !== post.slug),
        notifications: current.notifications.filter((entry) => entry.postSlug !== post.slug),
      }));
    } catch (requestError: any) {
      setError(requestError.message);
    } finally {
      setDeletingSlug(null);
    }
  };

  if (authLoading || loading) {
    return <AccountLoading />;
  }
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] pt-24 dark:bg-[#0b1220]">
        <div className="container-main py-16">
          <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-secondary-900">
            <LockKeyhole className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-4 text-2xl font-bold text-secondary-900 dark:text-white">Sign in to manage your posts</h1>
            <Link href="/login?returnTo=/account/posts" className="btn-primary mt-6 inline-flex">Sign in</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] pt-24 dark:bg-[#0b1220]">
      <section className="container-main py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Member account</p>
            <h1 className="mt-1 text-3xl font-bold text-secondary-900 dark:text-white">My Posts</h1>
            <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">Manage your discussions and see how other travelers interact with them.</p>
          </div>
          <Link href="/forum" className="btn-primary inline-flex items-center gap-2"><PenLine className="h-4 w-4" />Create a post</Link>
        </div>

        <div className="mt-6 flex gap-2 border-b border-secondary-200 dark:border-secondary-700">
          <Link href="/account/points" className="px-4 py-3 text-sm font-semibold text-secondary-500 hover:text-primary">Points</Link>
          <span className="border-b-2 border-primary px-4 py-3 text-sm font-bold text-primary">My Posts</span>
        </div>

        {error && <p className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4" />{error}</p>}

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-secondary-900">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Published posts</h2>
              <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold text-secondary-600 dark:bg-secondary-800 dark:text-secondary-300">{activity.posts.length}</span>
            </div>
            {activity.posts.length === 0 ? (
              <div className="py-14 text-center">
                <PenLine className="mx-auto h-8 w-8 text-secondary-300" />
                <p className="mt-3 text-secondary-500">You have not published a post yet.</p>
                <Link href="/forum" className="btn-primary mt-5 inline-flex">Start a discussion</Link>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {activity.posts.map((post) => (
                  <article key={post.id} className="overflow-hidden rounded-2xl border border-secondary-100 dark:border-secondary-700">
                    {post.featuredImage && <img src={post.featuredImage} alt="" className="h-44 w-full object-cover" />}
                    <div className="p-5">
                      <p className="text-xs text-secondary-400">{formatDate(post.createdAt)}</p>
                      <Link href={`/forum/${post.slug}`} className="mt-1 block text-lg font-bold text-secondary-900 hover:text-primary dark:text-white">{post.title}</Link>
                      <p className="mt-2 line-clamp-2 text-sm text-secondary-600 dark:text-secondary-300">{post.content}</p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex gap-4 text-sm text-secondary-500">
                          <span className="inline-flex items-center gap-1"><Heart className="h-4 w-4" />{post.likesCount}</span>
                          <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" />{post.commentsCount}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/forum/${post.slug}`} className="btn-ghost px-3 py-2 text-xs">View</Link>
                          <button onClick={() => void deletePost(post)} disabled={deletingSlug === post.slug} className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-60">
                            {deletingSlug === post.slug ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm dark:bg-secondary-900">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-xl font-bold text-secondary-900 dark:text-white"><Bell className="h-5 w-5 text-primary" />Notifications</h2>
              {activity.unreadCount > 0 && <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">{activity.unreadCount} new</span>}
            </div>
            {activity.unreadCount > 0 && (
              <button onClick={() => void markAllRead()} disabled={markingRead} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline disabled:opacity-60">
                {markingRead ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCheck className="h-3.5 w-3.5" />}Mark all as read
              </button>
            )}
            <div className="mt-4 space-y-2">
              {activity.notifications.length === 0 ? (
                <p className="rounded-xl bg-secondary-50 px-4 py-8 text-center text-sm text-secondary-500 dark:bg-secondary-800">No interactions yet.</p>
              ) : activity.notifications.map((entry) => (
                <Link key={entry.id} href={`/forum/${entry.postSlug}`} className={`block rounded-xl p-4 transition hover:bg-secondary-50 dark:hover:bg-secondary-800 ${entry.read ? '' : 'bg-primary/5 ring-1 ring-primary/15'}`}>
                  <div className="flex items-start gap-3">
                    {entry.type === 'like' ? <Heart className="mt-0.5 h-4 w-4 fill-primary text-primary" /> : <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />}
                    <div className="min-w-0">
                      <p className="text-sm text-secondary-700 dark:text-secondary-200"><strong>{entry.actorName}</strong> {entry.type === 'like' ? 'liked' : 'commented on'} “{entry.postTitle}”</p>
                      {entry.type === 'comment' && <p className="mt-1 line-clamp-2 text-xs text-secondary-500">{entry.message}</p>}
                      <p className="mt-2 text-[11px] text-secondary-400">{formatDate(entry.createdAt)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function AccountLoading() {
  return <main className="min-h-screen bg-[#f7f1e8] pt-24 dark:bg-[#0b1220]"><div className="container-main flex min-h-[420px] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></main>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}
