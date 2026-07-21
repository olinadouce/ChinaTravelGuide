import { FieldValue, Timestamp } from 'firebase-admin/firestore';

import { forumComments, forumPosts } from '@/data/forum';
import type { ForumAuthor, ForumComment, ForumNotification, ForumPost } from '@/types';

import { adminDb } from './firebase-admin';

const POST_COOLDOWN_MS = 30_000;
const COMMENT_COOLDOWN_MS = 10_000;
const MAX_POSTS = 100;
const MAX_COMMENTS = 200;

export class ForumInputError extends Error {
  constructor(message: string, public readonly status = 400) {
    super(message);
  }
}

type ForumIdentity = {
  uid: string;
  name?: string;
  email?: string;
};

type CreatePostInput = {
  title?: unknown;
  content?: unknown;
  tags?: unknown;
  featuredImage?: unknown;
};

function authorFromIdentity(identity: ForumIdentity): ForumAuthor {
  return {
    id: identity.uid,
    name: cleanSingleLine(identity.name || identity.email?.split('@')[0] || 'Traveler', 60),
    avatar: '/see-china-route-logo.svg',
    isMember: true,
  };
}

function cleanSingleLine(value: string, max: number): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function cleanContent(value: string, max: number): string {
  return value.replace(/\u0000/g, '').replace(/\r\n/g, '\n').trim().slice(0, max);
}

function validateLinks(value: string) {
  const links = value.match(/https?:\/\/\S+/gi) || [];
  if (links.length > 3) throw new ForumInputError('Please include no more than 3 links.');
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .filter((tag): tag is string => typeof tag === 'string')
        .map((tag) => cleanSingleLine(tag.replace(/^#/, ''), 24))
        .filter(Boolean)
    )
  ).slice(0, 5);
}

function makeSlug(title: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 56) || 'travel-story';
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

function millis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return new Date(value).getTime();
  return Date.now();
}

function serializePost(id: string, data: Record<string, any>): ForumPost {
  return {
    id,
    slug: String(data.slug || id),
    title: String(data.title || 'Untitled'),
    content: String(data.content || ''),
    author: data.author as ForumAuthor,
    createdAt: new Date(millis(data.createdAt)).toISOString(),
    likesCount: Number(data.likesCount || 0),
    commentsCount: Number(data.commentsCount || 0),
    tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown) => typeof tag === 'string') : [],
    ...(typeof data.featuredImage === 'string' && data.featuredImage
      ? { featuredImage: data.featuredImage }
      : {}),
  };
}

function serializeComment(id: string, data: Record<string, any>): ForumComment {
  return {
    id,
    postId: String(data.postId || ''),
    author: data.author as ForumAuthor,
    content: String(data.content || ''),
    createdAt: new Date(millis(data.createdAt)).toISOString(),
    likesCount: Number(data.likesCount || 0),
  };
}

export async function listForumPosts(): Promise<ForumPost[]> {
  const db = adminDb();
  const [dynamicSnapshot, statsSnapshot] = await Promise.all([
    db.collection('forumPosts').orderBy('createdAt', 'desc').limit(MAX_POSTS).get(),
    db.collection('forumPostStats').limit(100).get(),
  ]);
  const stats = new Map(statsSnapshot.docs.map((entry) => [entry.id, {
    comments: Number(entry.data().additionalCommentsCount || 0),
    likes: Number(entry.data().additionalLikesCount || 0),
  }]));
  const seeded = forumPosts.map((post) => ({
    ...post,
    commentsCount: post.commentsCount + (stats.get(post.slug)?.comments || 0),
    likesCount: post.likesCount + (stats.get(post.slug)?.likes || 0),
  }));
  const dynamic = dynamicSnapshot.docs.map((entry) => serializePost(entry.id, entry.data()));
  return [...dynamic, ...seeded].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getForumThread(slug: string): Promise<{
  post: ForumPost;
  comments: ForumComment[];
} | null> {
  const db = adminDb();
  const seededPost = forumPosts.find((post) => post.slug === slug);
  const dynamicPostSnapshot = seededPost ? null : await db.collection('forumPosts').doc(slug).get();
  if (!seededPost && !dynamicPostSnapshot?.exists) return null;

  const [commentSnapshot, statsSnapshot] = await Promise.all([
    db.collection('forumComments').doc(slug).collection('entries').orderBy('createdAt', 'asc').limit(MAX_COMMENTS).get(),
    seededPost ? db.collection('forumPostStats').doc(slug).get() : Promise.resolve(null),
  ]);
  const storedComments = commentSnapshot.docs.map((entry) => serializeComment(entry.id, entry.data()));
  const seededComments = seededPost
    ? forumComments.filter((comment) => comment.postId === seededPost.id)
    : [];
  const post = seededPost
    ? {
        ...seededPost,
        commentsCount: seededPost.commentsCount + Number(statsSnapshot?.data()?.additionalCommentsCount || 0),
        likesCount: seededPost.likesCount + Number(statsSnapshot?.data()?.additionalLikesCount || 0),
      }
    : serializePost(dynamicPostSnapshot!.id, dynamicPostSnapshot!.data() || {});
  return { post, comments: [...seededComments, ...storedComments] };
}

export async function createForumPost(
  identity: ForumIdentity,
  input: CreatePostInput
): Promise<ForumPost> {
  const title = cleanSingleLine(typeof input.title === 'string' ? input.title : '', 120);
  const content = cleanContent(typeof input.content === 'string' ? input.content : '', 5000);
  const tags = normalizeTags(input.tags);
  const featuredImage = typeof input.featuredImage === 'string' && input.featuredImage.startsWith('/api/forum/images/forum-images/')
    ? input.featuredImage
    : undefined;
  if (title.length < 5) throw new ForumInputError('Title must be at least 5 characters.');
  if (content.length < 20) throw new ForumInputError('Post content must be at least 20 characters.');
  validateLinks(`${title}\n${content}`);

  const db = adminDb();
  const slug = makeSlug(title);
  const postRef = db.collection('forumPosts').doc(slug);
  const rateRef = db.collection('forumRateLimits').doc(identity.uid);
  const now = Timestamp.now();
  const post: ForumPost = {
    id: slug,
    slug,
    title,
    content,
    tags,
    author: authorFromIdentity(identity),
    createdAt: now.toDate().toISOString(),
    likesCount: 0,
    commentsCount: 0,
    ...(featuredImage ? { featuredImage } : {}),
  };

  await db.runTransaction(async (transaction) => {
    const rateSnapshot = await transaction.get(rateRef);
    const lastPostAt = millis(rateSnapshot.data()?.lastPostAt || 0);
    if (Date.now() - lastPostAt < POST_COOLDOWN_MS) {
      throw new ForumInputError('Please wait 30 seconds before creating another post.', 429);
    }
    transaction.create(postRef, { ...post, createdAt: now, authorId: identity.uid });
    transaction.set(rateRef, { lastPostAt: now, updatedAt: now }, { merge: true });
  });
  return post;
}

export async function createForumComment(
  identity: ForumIdentity,
  slug: string,
  input: { content?: unknown }
): Promise<ForumComment> {
  const content = cleanContent(typeof input.content === 'string' ? input.content : '', 1500);
  if (content.length < 2) throw new ForumInputError('Comment must be at least 2 characters.');
  validateLinks(content);

  const db = adminDb();
  const seededPost = forumPosts.find((post) => post.slug === slug);
  const postRef = db.collection('forumPosts').doc(slug);
  let dynamicPostData: Record<string, any> | null = null;
  if (!seededPost) {
    const postSnapshot = await postRef.get();
    if (!postSnapshot.exists) throw new ForumInputError('Post not found.', 404);
    dynamicPostData = postSnapshot.data() || {};
  }

  const commentRef = db.collection('forumComments').doc(slug).collection('entries').doc();
  const rateRef = db.collection('forumRateLimits').doc(identity.uid);
  const statsRef = db.collection('forumPostStats').doc(slug);
  const now = Timestamp.now();
  const postAuthorId = typeof dynamicPostData?.authorId === 'string' ? dynamicPostData.authorId : null;
  const notificationRef = postAuthorId && postAuthorId !== identity.uid
    ? db.collection('forumNotifications').doc(`comment_${commentRef.id}`)
    : null;
  const comment: ForumComment = {
    id: commentRef.id,
    postId: seededPost?.id || slug,
    author: authorFromIdentity(identity),
    content,
    createdAt: now.toDate().toISOString(),
    likesCount: 0,
  };

  await db.runTransaction(async (transaction) => {
    const rateSnapshot = await transaction.get(rateRef);
    const lastCommentAt = millis(rateSnapshot.data()?.lastCommentAt || 0);
    if (Date.now() - lastCommentAt < COMMENT_COOLDOWN_MS) {
      throw new ForumInputError('Please wait 10 seconds before commenting again.', 429);
    }
    transaction.create(commentRef, { ...comment, createdAt: now, authorId: identity.uid });
    transaction.set(rateRef, { lastCommentAt: now, updatedAt: now }, { merge: true });
    if (seededPost) {
      transaction.set(
        statsRef,
        { additionalCommentsCount: FieldValue.increment(1), updatedAt: now },
        { merge: true }
      );
    } else {
      transaction.update(postRef, { commentsCount: FieldValue.increment(1), updatedAt: now });
    }
    if (notificationRef && postAuthorId) {
      transaction.create(notificationRef, {
        recipientId: postAuthorId,
        type: 'comment',
        actorName: comment.author.name,
        actorId: identity.uid,
        postSlug: slug,
        postTitle: String(dynamicPostData?.title || 'Your post'),
        message: content.slice(0, 180),
        createdAt: now,
        read: false,
      });
    }
  });
  return comment;
}

export async function getForumLikeState(uid: string, slug: string) {
  const snapshot = await adminDb().collection('forumLikes').doc(`${slug}_${uid}`).get();
  return snapshot.exists;
}

export async function toggleForumLike(identity: ForumIdentity, slug: string) {
  const db = adminDb();
  const seededPost = forumPosts.find((post) => post.slug === slug);
  const postRef = db.collection('forumPosts').doc(slug);
  const statsRef = db.collection('forumPostStats').doc(slug);
  const likeRef = db.collection('forumLikes').doc(`${slug}_${identity.uid}`);
  const now = Timestamp.now();

  return db.runTransaction(async (transaction) => {
    const [likeSnapshot, targetSnapshot] = await Promise.all([
      transaction.get(likeRef),
      seededPost ? transaction.get(statsRef) : transaction.get(postRef),
    ]);
    if (!seededPost && !targetSnapshot.exists) throw new ForumInputError('Post not found.', 404);

    const liked = !likeSnapshot.exists;
    const targetData = targetSnapshot.data() || {};
    const currentLikes = seededPost
      ? seededPost.likesCount + Number(targetData.additionalLikesCount || 0)
      : Number(targetData.likesCount || 0);
    const nextLikes = Math.max(0, currentLikes + (liked ? 1 : -1));
    const postAuthorId = seededPost ? null : String(targetData.authorId || '');
    const notificationRef = postAuthorId && postAuthorId !== identity.uid
      ? db.collection('forumNotifications').doc(`like_${slug}_${identity.uid}`)
      : null;

    if (liked) {
      transaction.create(likeRef, { postSlug: slug, userId: identity.uid, createdAt: now });
    } else {
      transaction.delete(likeRef);
    }
    if (seededPost) {
      transaction.set(statsRef, {
        additionalLikesCount: Math.max(0, nextLikes - seededPost.likesCount),
        updatedAt: now,
      }, { merge: true });
    } else {
      transaction.update(postRef, { likesCount: nextLikes, updatedAt: now });
    }
    if (notificationRef) {
      if (liked) {
        transaction.set(notificationRef, {
          recipientId: postAuthorId,
          type: 'like',
          actorName: authorFromIdentity(identity).name,
          actorId: identity.uid,
          postSlug: slug,
          postTitle: String(targetData.title || 'Your post'),
          message: 'liked your post',
          createdAt: now,
          read: false,
        });
      } else {
        transaction.delete(notificationRef);
      }
    }
    return { liked, likesCount: nextLikes };
  });
}

export async function listMyForumActivity(uid: string): Promise<{
  posts: ForumPost[];
  notifications: ForumNotification[];
  unreadCount: number;
}> {
  const db = adminDb();
  const [postsSnapshot, notificationsSnapshot] = await Promise.all([
    db.collection('forumPosts').where('authorId', '==', uid).limit(MAX_POSTS).get(),
    db.collection('forumNotifications').where('recipientId', '==', uid).limit(100).get(),
  ]);
  const posts = postsSnapshot.docs
    .map((entry) => serializePost(entry.id, entry.data()))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const notifications = notificationsSnapshot.docs
    .map((entry) => {
      const data = entry.data();
      return {
        id: entry.id,
        type: data.type === 'comment' ? 'comment' : 'like',
        actorName: String(data.actorName || 'A member'),
        postSlug: String(data.postSlug || ''),
        postTitle: String(data.postTitle || 'Your post'),
        message: String(data.message || ''),
        createdAt: new Date(millis(data.createdAt)).toISOString(),
        read: data.read === true,
      } as ForumNotification;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return { posts, notifications, unreadCount: notifications.filter((entry) => !entry.read).length };
}

export async function markForumNotificationsRead(uid: string) {
  const db = adminDb();
  const snapshot = await db.collection('forumNotifications')
    .where('recipientId', '==', uid)
    .limit(100)
    .get();
  const unread = snapshot.docs.filter((entry) => entry.data().read !== true);
  if (unread.length === 0) return 0;
  const batch = db.batch();
  unread.forEach((entry) => batch.update(entry.ref, { read: true, readAt: Timestamp.now() }));
  await batch.commit();
  return unread.length;
}

export async function deleteForumPost(uid: string, slug: string) {
  const db = adminDb();
  const postRef = db.collection('forumPosts').doc(slug);
  const postSnapshot = await postRef.get();
  if (!postSnapshot.exists) throw new ForumInputError('Post not found.', 404);
  const data = postSnapshot.data() || {};
  if (data.authorId !== uid) throw new ForumInputError('You can only delete your own posts.', 403);

  const [likesSnapshot, notificationsSnapshot] = await Promise.all([
    db.collection('forumLikes').where('postSlug', '==', slug).get(),
    db.collection('forumNotifications').where('postSlug', '==', slug).get(),
    db.recursiveDelete(db.collection('forumComments').doc(slug)),
  ]);
  const writer = db.bulkWriter();
  likesSnapshot.docs.forEach((entry) => writer.delete(entry.ref));
  notificationsSnapshot.docs.forEach((entry) => writer.delete(entry.ref));
  writer.delete(postRef);
  await writer.close();
  return { featuredImage: typeof data.featuredImage === 'string' ? data.featuredImage : undefined };
}
