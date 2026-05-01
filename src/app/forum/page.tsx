'use client';
import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { ForumCard } from '@/components/ui/ForumCard';
import { Pagination } from '@/components/ui/Pagination';
import { forumPosts } from '@/data/forum';

const POSTS_PER_PAGE = 6;

export default function ForumPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams?.page ?? '1', 10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = forumPosts.slice(start, end);
  const totalPages = Math.ceil(forumPosts.length / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-black">{forumPosts.length} posts</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PenLine className="h-4 w-4" />
            Create Post
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post, index) => (
            <ForumCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} baseUrl="/forum" />
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-xl"
          >
            <h2 className="text-xl font-bold text-black">Create New Post</h2>
            <p className="mt-2 text-sm text-black/70">
              Please <Link href="/login" className="text-primary hover:underline">log in</Link> to create a post.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">Title</label>
                <input type="text" className="input-field mt-1 w-full" placeholder="Your post title..." disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Content</label>
                <textarea className="input-field mt-1 w-full min-h-[120px] resize-none" placeholder="Share your travel experience..." disabled />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="btn-ghost flex-1">Close</button>
                <Link href="/login" className="btn-primary flex-1 text-center">Log In to Post</Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}