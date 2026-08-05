'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, MessageSquare, Calendar, User, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { ForumPost } from '@/types';

interface ForumCardProps {
  post: ForumPost;
  index: number;
}

export function ForumCard({ post, index }: ForumCardProps) {
  const [imageBroken, setImageBroken] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[28px] bg-white dark:bg-secondary-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <Link href={`/forum/${post.slug}`} className="block">
        {post.featuredImage && !imageBroken && (
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-secondary-100 dark:bg-secondary-800">
            {/* User uploads are already validated and streamed through our image proxy. */}
            <img
              src={post.featuredImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageBroken(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        {post.featuredImage && imageBroken && (
          <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-secondary-100 dark:bg-secondary-800" role="img" aria-label="Image unavailable">
            <ImageIcon className="h-12 w-12 text-secondary-400" aria-hidden="true" />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <h3 className="mt-2 text-xl font-bold text-secondary-900 dark:text-white transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-secondary-600 dark:text-secondary-300">
          {post.content.replace(/[#*_]/g, '').slice(0, 150)}...
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary-100 dark:bg-secondary-800 px-3 py-1 text-xs font-medium text-secondary-700 dark:text-secondary-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-secondary-100 dark:border-secondary-700 pt-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              {post.author.isMember && (
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary">
                  <User className="h-2.5 w-2.5 p-0.5 text-white" />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-secondary-900 dark:text-white">{post.author.name}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {post.likesCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {post.commentsCount}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
