'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageSquare, Calendar, User } from 'lucide-react';
import { ForumPost } from '@/types';
import { cn } from '@/lib/utils';

interface ForumCardProps {
  post: ForumPost;
  index: number;
}

export function ForumCard({ post, index }: ForumCardProps) {
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
      className="group relative overflow-hidden rounded-[28px] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <Link href={`/forum/${post.slug}`} className="block">
        {post.featuredImage && (
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-black/60">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <h3 className="mt-2 text-xl font-bold text-black transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-black/70">
          {post.content.replace(/[#*_]/g, '').slice(0, 150)}...
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-secondary-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              {post.author.isMember && (
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary">
                  <User className="h-2.5 w-2.5 p-0.5 text-white" />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-black">{post.author.name}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-black/60">
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