'use client';

import { motion } from 'framer-motion';
import { AlertCircle, ImagePlus, Loader2, PenLine, Send, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useMemo, useState } from 'react';

import { useAuth } from '@/components/auth/FirebaseAuthProvider';
import { ForumCard } from '@/components/ui/ForumCard';
import { Pagination } from '@/components/ui/Pagination';
import { forumPosts as seededPosts } from '@/data/forum';
import { authenticatedPostForm } from '@/lib/authenticated-api';
import type { ForumPost } from '@/types';

const POSTS_PER_PAGE = 6;

export default function ForumPage() {
  return (
    <Suspense fallback={<ForumPageFallback />}>
      <ForumPageContent />
    </Suspense>
  );
}

function ForumPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>(seededPosts);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedPosts = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, safePage]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch('/api/forum/posts', { cache: 'no-store' })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'Forum posts could not be loaded.');
        if (active) {
          setPosts(payload.posts);
          setLoadError(null);
        }
      })
      .catch((error) => active && setLoadError(error.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const selectImage = (file: File | null) => {
    setSubmitError(null);
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setSubmitError('Use a JPEG, PNG, WebP, or GIF image.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setSubmitError('Image must be smaller than 4 MB.');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCreatePost = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const form = new FormData();
      form.set('title', title);
      form.set('content', content);
      form.set('tags', JSON.stringify(tags.split(',').map((tag) => tag.trim()).filter(Boolean)));
      if (imageFile) form.set('image', imageFile);
      const result = await authenticatedPostForm<{ post: ForumPost }>('/api/forum/posts', form);
      setPosts((current) => [result.post, ...current]);
      setShowCreateModal(false);
      setTitle('');
      setContent('');
      setTags('');
      setImageFile(null);
      setImagePreview(null);
      router.push(`/forum/${result.post.slug}`);
    } catch (error: any) {
      setSubmitError(error?.message || 'Your post could not be published.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8] dark:bg-[#0b1220] pt-20">
      <section className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-accent py-20 text-white">
        <div className="container-main">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-white/55">Member community</p>
          <h1 className="text-5xl font-bold">Travel Stories & Tips</h1>
          <p className="mt-6 text-lg text-white/75">
            Share your experiences, learn from fellow travelers, and connect with like-minded adventurers.
          </p>
        </div>
      </section>

      <section className="container-main py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm text-secondary-700 dark:text-secondary-300">
            {posts.length} posts
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </p>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2">
            <PenLine className="h-4 w-4" />
            Create Post
          </button>
        </div>

        {loadError && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="h-4 w-4" />
            Live community posts could not be loaded. Showing featured discussions.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post, index) => (
            <ForumCard key={post.id} post={post} index={index} />
          ))}
        </div>
        <Pagination currentPage={safePage} totalPages={totalPages} baseUrl="/forum" />
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-xl dark:bg-secondary-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-secondary-900 dark:text-white">Create New Post</h2>
                <p className="mt-1 text-sm text-secondary-600 dark:text-secondary-300">
                  Share a useful question, route, experience, or practical travel tip.
                </p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="rounded-full p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="mt-6 rounded-2xl bg-secondary-50 p-6 text-center dark:bg-secondary-800">
                <p className="text-secondary-700 dark:text-secondary-200">Sign in to publish posts and join discussions.</p>
                <div className="mt-4 flex justify-center gap-3">
                  <button onClick={() => setShowCreateModal(false)} className="btn-ghost">Close</button>
                  <Link href="/login" className="btn-primary">Log In</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="mt-6 space-y-5">
                <label className="block">
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">Title</span>
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="input-field mt-1 w-full"
                    placeholder="What would you like travelers to know?"
                    minLength={5}
                    maxLength={120}
                    required
                  />
                  <span className="mt-1 block text-right text-xs text-secondary-400">{title.length}/120</span>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">Content</span>
                  <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="input-field mt-1 min-h-[220px] w-full resize-y"
                    placeholder="Include enough detail for other travelers to understand and respond."
                    minLength={20}
                    maxLength={5000}
                    required
                  />
                  <span className="mt-1 block text-right text-xs text-secondary-400">{content.length}/5000</span>
                </label>
                <div>
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">Cover image <span className="font-normal text-secondary-400">(optional)</span></span>
                  {imagePreview ? (
                    <div className="relative mt-2 overflow-hidden rounded-2xl border border-secondary-200 dark:border-secondary-700">
                      <img src={imagePreview} alt="Selected cover preview" className="h-56 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => selectImage(null)}
                        className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white hover:bg-black"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  ) : (
                    <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-secondary-200 px-5 py-8 text-center transition hover:border-primary/60 hover:bg-primary/5 dark:border-secondary-700">
                      <ImagePlus className="h-7 w-7 text-primary" />
                      <span className="mt-2 text-sm font-semibold text-secondary-700 dark:text-secondary-200">Choose an image</span>
                      <span className="mt-1 text-xs text-secondary-400">JPEG, PNG, WebP or GIF · max 4 MB</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="sr-only"
                        onChange={(event) => selectImage(event.target.files?.[0] || null)}
                      />
                    </label>
                  )}
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-secondary-700 dark:text-secondary-200">Tags</span>
                  <input
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                    className="input-field mt-1 w-full"
                    placeholder="Beijing, Transport, Food (up to 5)"
                    maxLength={140}
                  />
                  <span className="mt-1 block text-xs text-secondary-400">Separate tags with commas.</span>
                </label>
                {submitError && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4" /> {submitError}
                  </p>
                )}
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn-ghost">Cancel</button>
                  <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {submitting ? 'Publishing...' : 'Publish Post'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

function ForumPageFallback() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20 dark:bg-[#0b1220]">
      <div className="container-main flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    </div>
  );
}
