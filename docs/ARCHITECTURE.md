# ChinaTravelGuide Architecture

This document is written for developers who are new to the project. It explains what the site does, where the code lives, and how a single request flows through the system.

## 1. What the Project Does

This is a China inbound travel website aimed at overseas visitors. Its main capabilities are:

- **Travel guides**: browse free guides by theme and city; the original HTML guide is loaded inside an iframe.
- **Full guides**: signed-in users can spend points to unlock; paid content is streamed from a private Vercel Blob bucket.
- **Booking referrals**: hotels, activities, and other affiliate products are listed per city with outbound links to the booking platform.
- **Travel community**: users can post, upload images, comment, like, receive notifications, and manage their own posts.
- **Membership and points**: Firebase Authentication handles sign-in; Firestore stores user profiles, points ledgers, unlock records, and community data.
- **Travel utilities**: practical info, common phrases, currency conversion, and translation.
- **Core UX**: responsive navigation, light/dark theme, and in-page translation.

## 2. Overall Layers

```text
Browser
  │
  ├─ src/app/**/page.tsx              Pages and routes
  ├─ src/components                   Reusable UI and interactions
  └─ src/lib/authenticated-api.ts     Requests carrying the Firebase ID Token
          │
          ▼
Next.js Route Handlers
  ├─ src/app/api/**/route.ts          HTTP parameters, status codes, and responses
  └─ src/lib/server/api-route.ts      Common auth boundary
          │
          ▼
Service layer
  ├─ forum-service.ts                 Community rules and transactions
  ├─ points-service.ts                Points and unlock rules and transactions
  ├─ forum-image-storage.ts           Image storage
  └─ firebase-admin.ts                Server-side Firebase authentication
          │
          ├─ Firestore                Users, points, posts, comments, notifications
          └─ Vercel Blob              Community images and private full guides

Static content
  ├─ src/data                         Typed site content and product configuration
  └─ public                           Images, free HTML guides, and downloadable files
```

The guiding principle behind the layers is: pages handle presentation, APIs handle HTTP, the service layer handles business rules, and the data layer handles content. As a result, restyling a page never touches the points logic, and changing the storage implementation never requires rewriting pages.

## 3. Directory Responsibilities

### `src/app`

Uses the Next.js App Router. Folder names are URLs; `page.tsx` is a page and `route.ts` is an API endpoint. Examples:

- `app/packages/[slug]/page.tsx` corresponds to a single guide page.
- `app/forum/[slug]/page.tsx` corresponds to a discussion thread detail.
- `app/api/packages/unlock/route.ts` is the POST API for unlocking a guide.

`layout.tsx` is the shell that wraps every page. It mounts, in order, the theme Provider, the authentication Provider, the navigation, the page body, and the footer.

### `src/components`

- `auth`: authentication state and user profile.
- `layout`: navigation, footer, and translation.
- `packages`: guide cards, the iframe, points earning panel, and unlock UI.
- `book`: cities and affiliate products.
- `sections`: homepage sections.
- `ui`: small components reused across multiple features.

### `src/data`

This is static, version-controlled content. `data/packages/index.ts` is the single entry point for guide data; pages and services read guides from here to avoid duplicating lists.

### `src/lib`

`lib` holds capabilities that are independent of pages. Any directory named `server` is server-only, because it contains the Admin SDK, transactions, and access to private storage.

## 4. How Sign-in and Profile Sync Work

1. `FirebaseAuthProvider` listens to Firebase Authentication.
2. As soon as the auth state is confirmed, the UI receives a minimal user object, so the navigation does not have to wait for Firestore.
3. The browser obtains the Firebase ID Token and calls `/api/account/sync` to fetch the points profile.
4. The API verifies the Token again on the server; the user id sent by the browser is never trusted.
5. `syncPointsProfile` creates the profile in a Firestore transaction and handles the sign-up bonus and daily login bonus.
6. The full profile flows back into the Provider, and every component using `useAuth()` updates automatically.

Authentication and points profile use separate loading states on purpose: even when Firestore is slow or temporarily unavailable, the user can still sign in and browse normally.

## 5. Earning Points and Unlocking Guides

When claiming points, the client first checks reading time, scroll percentage, or download status so it can give the user immediate feedback; this is purely a UX optimization. The server re-validates the rule and writes, in a single Firestore transaction:

- the new points balance;
- an action marker that prevents repeat claims;
- an auditable points ledger entry.

When unlocking, the server looks up the real price by `packageId` and never accepts the price displayed by the client. Balance deduction, the unlocked list, and the negative ledger entry are committed in a single transaction, so two concurrent requests cannot double-spend the same balance.

When opening a full guide, the API re-checks the authenticated identity and `unlockedPackages`; only users who have already unlocked can receive the HTML from the private Blob.

## 6. How the Community Works

Editorial featured posts live in the codebase; member posts live in Firestore. The service layer merges both kinds of data when listing. Featured posts themselves are not duplicated into the database; an independent stats document tracks new likes and comments.

Posting, commenting, and liking all use transactions:

- The post transaction writes the post and the cool-down timestamp together, preventing concurrent bypass of rate limits.
- The comment transaction creates the comment, updates counters, and creates the notification together.
- The like transaction toggles the user's like document, updates the total, and creates the notification together.

When uploading images for a post, the file is written to Blob first; if the post creation later fails, the API deletes the orphaned upload.

## 7. Why This Style

- **Server Components first**: pages without interactivity are rendered on the server, reducing client-side JavaScript.
- **Client Components on demand**: `'use client'` is used only for sign-in, popups, timers, scroll tracking, and forms.
- **Double validation**: client-side validation improves UX; server-side validation guarantees security.
- **Transactions for consistency**: points, counters, and notifications touch multiple documents and must commit atomically.
- **Static content separated from dynamic data**: editorial content is easy to review and deploy, user data fits a database.
- **Unified auth and API boundary**: tokens, error responses, and caching policies are implemented once to reduce omissions.
- **Private content never enters the client bundle**: full guides are streamed from authenticated APIs rather than placed at a public URL.

## 8. Local Run and Verification

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

The example environment file is `.env.example`. Browser-side Firebase configuration uses `NEXT_PUBLIC_*`; Firebase Admin and Blob credentials must only be kept in server-side environment variables, never in source code or `public`.