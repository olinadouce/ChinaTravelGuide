'use client';

import { AlertCircle, ArrowLeft, Calendar, Heart, Loader2, MessageSquare, Send, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { forumComments, forumPosts } from '@/data/forum';
import { authenticatedDelete, authenticatedGet, authenticatedPost } from '@/lib/authenticated-api';
import { cn } from '@/lib/utils';
import type { ForumComment, ForumPost } from '@/types';

export default function ForumPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { isAuthenticated, user } = useAuth();
  const seededPost = forumPosts.find((item) => item.slug === slug) || null;
  const [post, setPost] = useState<ForumPost | null>(seededPost);
  const [comments, setComments] = useState<ForumComment[]>(
    seededPost ? forumComments.filter((comment) => comment.postId === seededPost.id) : []
  );
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/forum/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'Discussion could not be loaded.');
        if (active) {
          setPost(payload.post);
          setComments(payload.comments);
          setLoadError(null);
        }
      })
      .catch((error) => active && setLoadError(error.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLiked(false);
      return;
    }
    authenticatedGet<{ liked: boolean }>(`/api/forum/posts/${encodeURIComponent(slug)}/like`)
      .then((result) => setLiked(result.liked))
      .catch(() => undefined);
  }, [isAuthenticated, slug]);

  const toggleLike = async () => {
    if (!isAuthenticated) {
      router.push(`/login?returnTo=/forum/${encodeURIComponent(slug)}`);
      return;
    }
    setLikeLoading(true);
    try {
      const result = await authenticatedPost<{ liked: boolean; likesCount: number }>(`/api/forum/posts/${encodeURIComponent(slug)}/like`);
      setLiked(result.liked);
      setPost((current) => current ? { ...current, likesCount: result.likesCount } : current);
    } catch (error: any) {
      setLoadError(error.message || 'Like could not be updated.');
    } finally {
      setLikeLoading(false);
    }
  };

  const deletePost = async () => {
    if (!post || !window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setDeleteLoading(true);
    try {
      await authenticatedDelete(`/api/forum/posts/${encodeURIComponent(slug)}`);
      router.push('/account/posts');
      router.refresh();
    } catch (error: any) {
      setLoadError(error.message || 'The post could not be deleted.');
      setDeleteLoading(false);
    }
  };

  const submitComment = async (event: FormEvent) => {
    event.preventDefault();
    setCommentError(null);
    setSubmitting(true);
    try {
      const result = await authenticatedPost<{ comment: ForumComment }>(
        `/api/forum/posts/${encodeURIComponent(slug)}/comments`,
        { content: commentText }
      );
      setComments((current) => [...current, result.comment]);
      setPost((current) => current ? { ...current, commentsCount: current.commentsCount + 1 } : current);
      setCommentText('');
    } catch (error: any) {
      setCommentError(error?.message || 'Your comment could not be published.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!post && loading) {
    return <ForumMessage icon={<Loader2 className="h-6 w-6 animate-spin" />} text="Loading discussion..." />;
  }
  if (!post) {
    return <ForumMessage icon={<AlertCircle className="h-6 w-6" />} text={loadError || 'Post not found'} />;
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20 dark:bg-[#0b1220]">
      <section className="container-main py-12">
        <Link href="/forum" className="mb-6 inline-flex items-center gap-2 text-sm text-secondary-700 hover:text-primary dark:text-secondary-300">
          <ArrowLeft className="h-4 w-4" /> Back to Forum
        </Link>

        {loadError && (
          <p className="mb-5 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="h-4 w-4" /> Live comments could not be refreshed. Showing available content.
          </p>
        )}

        <article className="overflow-hidden rounded-[28px] bg-white shadow-sm dark:bg-secondary-900">
          {post.featuredImage && (
            <div className="relative h-80 w-full">
              {/* User uploads are validated and streamed through our image proxy. */}
              <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400">
              <Calendar className="h-4 w-4" /> <span>{formatDate(post.createdAt)}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-secondary-900 dark:text-white">{post.title}</h1>
            <div className="mt-6 flex items-center gap-3">
              <Image src={post.author.avatar} alt={post.author.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">{post.author.name}</p>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Member</p>
              </div>
            </div>
            <div className="mt-8 whitespace-pre-wrap text-secondary-800 dark:text-secondary-200">{post.content.replace(/[*_#]/g, '')}</div>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => <span key={tag} className="rounded-full bg-secondary-100 px-3 py-1 text-sm text-secondary-700 dark:bg-secondary-800 dark:text-secondary-200">{tag}</span>)}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-secondary-100 pt-6 dark:border-secondary-700">
              <button onClick={() => void toggleLike()} disabled={likeLoading} className={cn('flex items-center gap-2 text-secondary-700 hover:text-primary disabled:opacity-60 dark:text-secondary-300', liked && 'text-primary')}>
                {likeLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Heart className={cn('h-5 w-5', liked && 'fill-primary')} />} {post.likesCount}
              </button>
              <span className="flex items-center gap-2 text-secondary-500 dark:text-secondary-400">
                <MessageSquare className="h-5 w-5" /> {post.commentsCount}
              </span>
              {user?.uid === post.author.id && (
                <button onClick={() => void deletePost()} disabled={deleteLoading} className="ml-auto inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 disabled:opacity-60">
                  {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}Delete post
                </button>
              )}
            </div>
          </div>
        </article>

        <div className="mt-8 rounded-[28px] bg-white p-6 shadow-sm dark:bg-secondary-900 sm:p-8">
          <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Comments</h2>
          <div className="mt-6 space-y-6">
            {comments.length === 0 ? (
              <p className="rounded-xl bg-secondary-50 px-4 py-8 text-center text-secondary-500 dark:bg-secondary-800 dark:text-secondary-400">No comments yet. Be the first to share your thoughts!</p>
            ) : comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 border-b border-secondary-100 pb-6 last:border-0 dark:border-secondary-800">
                <Image src={comment.author.avatar} alt={comment.author.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span className="font-medium text-secondary-900 dark:text-white">{comment.author.name}</span>
                    <span className="text-xs text-secondary-500 dark:text-secondary-400">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap break-words text-secondary-800 dark:text-secondary-200">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {isAuthenticated ? (
            <form onSubmit={submitComment} className="mt-8">
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-200">Add a comment</label>
              <textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                className="input-field mt-2 min-h-[120px] w-full resize-y"
                placeholder="Share a helpful response..."
                minLength={2}
                maxLength={1500}
                required
              />
              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-secondary-400">{commentText.length}/1500</span>
                <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
              {commentError && <p className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4" />{commentError}</p>}
            </form>
          ) : (
            <div className="mt-8 rounded-xl bg-secondary-50 p-5 text-center dark:bg-secondary-800">
              <p className="text-sm text-secondary-600 dark:text-secondary-300">Sign in to join this discussion.</p>
              <Link href="/login" className="btn-primary mt-3 inline-flex items-center gap-2"><Send className="h-4 w-4" />Log In to Comment</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ForumMessage({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20 dark:bg-[#0b1220]">
      <div className="container-main py-20 text-center">
        <div className="mx-auto flex w-fit items-center gap-3 text-secondary-700 dark:text-secondary-200">{icon}<span>{text}</span></div>
        <Link href="/forum" className="btn-primary mt-6 inline-block">Back to Forum</Link>
      </div>
    </div>
  );
}
