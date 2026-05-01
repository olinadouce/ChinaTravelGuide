'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, MessageSquare, ArrowLeft, Calendar, Send } from 'lucide-react';
import { forumPosts, forumComments } from '@/data/forum';
import { cn } from '@/lib/utils';

export default function ForumPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = forumPosts.find((p) => p.slug === slug);
  const postComments = forumComments.filter((c) => c.postId === post?.id);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f7f1e8] pt-20">
        <div className="container-main py-20 text-center">
          <h1 className="text-2xl font-bold text-black">Post not found</h1>
          <Link href="/forum" className="btn-primary mt-6 inline-block">
            Back to Forum
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="container-main py-12">
        <Link href="/forum" className="mb-6 inline-flex items-center gap-2 text-sm text-black hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Forum
        </Link>

        <article className="overflow-hidden rounded-[28px] bg-white shadow-sm">
          {post.featuredImage && (
            <div className="relative h-80 w-full">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center gap-2 text-sm text-black/60">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-black">{post.title}</h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image src={post.author.avatar} alt={post.author.name} width={48} height={48} className="rounded-full" />
                <div>
                  <p className="font-medium text-black">{post.author.name}</p>
                  <p className="text-sm text-black/60">Member</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-black">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph.replace(/[*_#]/g, '')}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary-100 px-3 py-1 text-sm text-black">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-6 border-t border-secondary-100 pt-6">
              <button
                onClick={() => setLiked(!liked)}
                className={cn('flex items-center gap-2 text-black', liked ? 'text-primary' : 'hover:text-primary')}
              >
                <Heart className={cn('h-5 w-5', liked && 'fill-primary')} />
                <span>{post.likesCount + (liked ? 1 : 0)}</span>
              </button>
              <span className="flex items-center gap-2 text-black/60">
                <MessageSquare className="h-5 w-5" />
                <span>{post.commentsCount}</span>
              </span>
            </div>
          </div>
        </article>

        <div className="mt-8 rounded-[28px] bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-black">Comments</h3>

          <div className="mt-6 space-y-6">
            {postComments.length === 0 ? (
              <p className="text-center text-black/60">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              postComments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Image src={comment.author.avatar} alt={comment.author.name} width={40} height={40} className="rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-black">{comment.author.name}</span>
                      <span className="text-sm text-black/60">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-black">{comment.content}</p>
                    <button className="mt-2 flex items-center gap-1 text-sm text-black/60 hover:text-primary">
                      <Heart className="h-4 w-4" />
                      {comment.likesCount}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <Link href="/login" className="btn-primary flex items-center gap-2">
              <Send className="h-4 w-4" />
              Log in to Comment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}