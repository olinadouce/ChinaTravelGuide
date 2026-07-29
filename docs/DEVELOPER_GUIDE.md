# Developer Guide

This document explains how to configure, compile, and run China Travel Guide from a clean source checkout.

## 1. Technology stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Authentication**: Firebase Authentication (Email/Password + Google OAuth)
- **Database**: Cloud Firestore (user profiles, points ledger, posts, comments, notifications, knowledge metadata)
- **Object storage**: Vercel Blob (private bucket for paid guides and forum images)
- **AI**: OpenAI Responses API + Vector Store (file_search), model `gpt-4.1-mini`
- **Translation**: Google Cloud Translation API v2 (full-site translator component)
- **Deployment**: Vercel (Production + Preview)
- **Testing**: Vitest
- **Linting**: ESLint with `eslint-config-next`

## 2. Prerequisites

Install the following software:

- Node.js 22 or newer (enforced by `engines.node` in `package.json`)
- npm 10 or newer
- Git, if the project is obtained from a Git repository
- Firebase CLI (optional, only if you need to deploy Firestore rules): `npm install -g firebase-tools`

Check the installed versions:

```bash
node --version
npm --version
```

## 3. Install dependencies

Open a terminal in the project directory, where `package.json` is located.

For a reproducible installation using `package-lock.json`:

```bash
npm ci
```

Use `npm install` only when dependencies need to be added or updated.

## 4. Configure environment variables

Copy the provided template:

```bash
cp .env.example .env.local
```

Windows PowerShell equivalent:

```powershell
Copy-Item .env.example .env.local
```

Edit `.env.local` and provide the appropriate values.

The project can be compiled without credentials. In that case, public and
static pages remain available, while authentication and protected features
show a configuration error. This allows the source to be assessed without
including private credentials.

Environment variables are grouped by responsibility below.

### 4.1 Firebase browser configuration

These variables are required for email/password and Google sign-in:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID     # Optional, enables Firebase Analytics
```

They can be found in Firebase Console under Project settings → General → Your apps → SDK setup and configuration.

### 4.2 Firebase Admin configuration

Server-side profile synchronisation, points, guide unlocking, and the dynamic forum require Firebase Admin credentials.

The recommended variable is:

```text
FIREBASE_ADMIN_SERVICE_ACCOUNT
```

Its value is the service-account JSON stored as one environment variable. Alternatively, use the split variables documented in `.env.example` (`FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY`).

### 4.3 Vercel Blob

Private paid guides and uploaded forum images require:

```text
BLOB_READ_WRITE_TOKEN
VERCEL_OIDC_TOKEN                      # Production-only: Vercel-provided OIDC for Blob access
```

`BLOB_READ_WRITE_TOKEN` is normally supplied automatically after connecting a Blob store on Vercel. `VERCEL_OIDC_TOKEN` is auto-injected by Vercel in production deployments.

### 4.4 AI Assistant (OpenAI)

Required for the `/tools/ai-assistant` route and the answer-with-sources feature:

```text
OPENAI_API_KEY
OPENAI_VECTOR_STORE_ID                 # ID of the Vector Store containing knowledge files
OPENAI_RESPONSE_MODEL                  # Defaults to gpt-4.1-mini
OPENAI_MAX_SEARCH_RESULTS              # Defaults to 8
OPENAI_MIN_RELEVANCE_SCORE             # Defaults to 0.35 (below this, the assistant refuses)
```

The AI assistant's behaviour knobs:

```text
AI_ASSISTANT_MAX_INPUT_LENGTH          # Defaults to 1000 characters
AI_ASSISTANT_REQUEST_TIMEOUT_MS        # Defaults to 45000 (45s)
AI_ASSISTANT_RATE_LIMIT_PER_10_MINUTES # Logged-in users, default 20
AI_ASSISTANT_ANON_RATE_LIMIT_PER_10_MINUTES # Anonymous users, default 8
```

Admin access to `/admin/unanswered-questions` is granted by listing Firebase UIDs or emails:

```text
AI_ADMIN_UIDS                          # Comma-separated Firebase UIDs
AI_ADMIN_EMAILS                        # Comma-separated emails (lowercased)
```

### 4.5 Google Translate (optional)

The site-wide translator component falls back to a stub if this is missing:

```text
GOOGLE_TRANSLATE_API_KEY
```

Never commit `.env.local` or service-account credentials.

## 5. Run in development mode

Start the Next.js development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The development server reloads the page when source files change.

## 6. Compile and run the production build

Compile the application:

```bash
npm run build
```

The `prebuild` script first regenerates the Tailwind styles used by embedded guide pages (`scripts/build-guide-css.mjs`). Next.js then performs TypeScript validation, bundles the application, and prerenders static pages.

After a successful build, start the production server:

```bash
npm run start
```

Open <http://localhost:3000>.

To use another port:

```bash
npm run start -- --port 3002
```

## 7. Code-quality checks

### 7.1 TypeScript

```bash
npm run typecheck       # tsc --noEmit
```

### 7.2 ESLint

```bash
npm run lint            # eslint src
```

### 7.3 Unit tests (Vitest)

```bash
npm run test             # vitest run (single pass, CI-friendly)
npm run test:watch       # vitest (interactive watch mode)
```

Tests live next to the files they cover (for example, `src/lib/forum-features.test.ts`). They cover the points service, forum features, Guilin paid-guide materialiser, package guide identity, and other helpers.

### 7.4 Full production build

```bash
npm run build
```

This is the strongest single check because it runs the TypeScript validator, ESLint-respecting bundling, and the `prebuild` step together.

## 8. Knowledge base (AI) workflow

The AI assistant answers questions from Markdown files under `knowledge/`. The knowledge pipeline is fully script-driven.

### 8.1 Layout

```text
knowledge/{package-slug}/
├── free/                  # Open-access articles, English only
│   ├── overview.md
│   └── travel-tips.md
└── paid/                  # Premium guide content (frontmatter marks accessLevel: paid)
    ├── overview.md
    └── itinerary-day-N.md
knowledge/_ai-disclaimer-rule.md      # Injected into every AI system prompt
knowledge/_pending-{slug}/           # Work-in-progress drafts not yet uploaded
```

Each file starts with a YAML frontmatter (knowledgeId, packageId, city, guideType, accessLevel, language, section, title, sourceLabel, version, updatedAt).

### 8.2 Commands

```bash
npm run knowledge:validate   # Check all markdown against the schema
npm run knowledge:sync       # Upload changed files to OpenAI Vector Store
npm run knowledge:status     # Show the diff between local and remote Vector Store
```

All three commands require `OPENAI_API_KEY` and `OPENAI_VECTOR_STORE_ID`. They run `scripts/sync-knowledge.ts` locally or in CI — never from the Vercel request runtime.

## 9. Affiliate product generation

Bookable products on the `/book` pages come from `src/data/affiliate-products.generated.json`. Regenerate it whenever affiliate metadata changes:

```bash
node scripts/fetch-affiliate-images.mjs
```

The script refreshes images and writes the JSON used by `src/data/bookings.ts` lookups.

## 10. Build helpers

```bash
npm run build:guide-css    # Regenerate Tailwind output used by embedded guide HTML
```

This is invoked automatically by `prebuild` before `npm run build`. Run it manually after editing `public/{theme}/{slug}/tailwind.css` so embedded guides pick up style changes without a full Next.js build.

## 11. Firebase setup

The project expects these Firebase services:

1. Authentication with Email/Password enabled.
2. Google Authentication enabled if Google sign-in is required.
3. A Cloud Firestore database.
4. The Firestore rules in `firestore.rules`.

If Firebase CLI is installed and the correct project is selected, deploy the rules with:

```bash
firebase deploy --only firestore:rules
```

The Firebase project alias is stored in `.firebaserc`.

### 11.1 Firestore collections (high-level)

| Collection | Purpose |
| --- | --- |
| `users/{uid}` | Profile, points balance, `unlockedPackages`, referral code, daily-login marker |
| `users/{uid}/ledger/{docId}` | Immutable points transactions, doc id encodes the action type and any city/date key |
| `forumPosts/{postId}` | Community posts |
| `forumPosts/{postId}/comments/{commentId}` | Threaded comments |
| `forumPosts/{postId}/likes/{uid}` | One document per like (presence-based dedup) |
| `forumImages/{imageId}` | Vercel Blob path metadata |
| `unansweredQuestions/{questionId}` | AI refusal log reviewed by admins |
| `knowledgeFiles/{knowledgeId}` | Audit trail for files uploaded to the OpenAI Vector Store |
| `referralCodes/{code}` | Reverse index from 8-character referral code to owner uid |

## 12. Important project directories

```text
src/app/                Pages and API route handlers
  app/api/              JSON API endpoints (25 total)
  app/tools/            Travel tools (currency, timezone, phrases, ai-assistant)
  app/admin/            Admin UI (unanswered-questions)
src/components/         Reusable React components
  components/auth/      Auth state and profile UI
  components/layout/    Navigation, footer, full-site translator
  components/packages/  Guide cards, iframe, points panel, unlock UI
  components/book/      Cities and affiliate products
  components/sections/  Homepage sections
  components/analytics/ Firebase Analytics and per-package tracking
  components/ai/        AI assistant floating widget
  components/ui/        Cross-feature small components
src/data/               Typed website and package content
  data/packages/        Per-theme guide data (landscape, themed, history, ishowspeed)
src/lib/                Shared browser and domain utilities
  lib/ai/               AI assistant (config, generate, search, scope, entitlements, rate-limit, system-prompt)
  lib/server/           Server-only Firebase and business services (firebase-admin, points-service, forum-service, api-route, firebase-access, forum-image-storage)
public/                 Images, downloads, and public guide HTML
  public/{theme}/{slug}/free.html          Public preview per guide (landscape, themed, history, ishowspeed)
  public/{theme}/{slug}/free-guide.docx    Downloadable Word version
  public/{theme}-assets/{slug}/           Image assets per guide
  public/images/         Site-wide images (logo, QR codes)
  public/packages/paid-guide-css/         Precompiled CSS for legacy paid guides (e.g. henan-history.css)
  public/history/...   Subdirectories per theme and per guide
  public/nature/...
  public/themed/...
  public/ishowspeed/...
scripts/                Build and data-maintenance scripts
  scripts/build-guide-css.mjs             Regenerates Tailwind for embedded guides
  scripts/fetch-affiliate-images.mjs      Refreshes affiliate product images
  scripts/sync-knowledge.ts               Knowledge base validation and OpenAI Vector Store sync
  scripts/knowledge-lib.ts               Knowledge markdown schema and loader
  scripts/fetch-page.ps1                 PowerShell helper for fetching pages
docs/                   Developer and architecture documentation
```

Generated directories such as `node_modules` and `.next` are intentionally excluded. Recreate them with `npm ci` and `npm run build`.

## 13. Root configuration files

| File | Purpose |
| --- | --- |
| `package.json` | Dependencies, npm scripts, engines (Node ≥ 22) |
| `package-lock.json` | Pinned dependency versions for reproducible installs |
| `tsconfig.json` | TypeScript compiler options |
| `next.config.mjs` | Next.js configuration, image domains, redirects (e.g. `/destinations` → `/book`) |
| `tailwind.config.js` | Tailwind theme tokens and content paths |
| `postcss.config.js` | PostCSS pipeline |
| `eslint.config.mjs` | ESLint flat config with `eslint-config-next` |
| `vitest.config.ts` | Vitest test runner configuration |
| `firestore.rules` | Firestore security rules (deploy with `firebase deploy --only firestore:rules`) |
| `.firebaserc` | Firebase project alias |
| `.env.example` | Template for `.env.local` |
| `.vercelignore` | Paths excluded from Vercel deployments |

## 14. Routes

### 14.1 Public pages

| Route | Purpose |
| --- | --- |
| `/` | Home page (Hero, Featured Book, Featured Packages, Travel Info, Newsletter) |
| `/book` | Booking cities and affiliate products |
| `/book/[city]` | City booking detail (e.g. `/book/guangzhou`) |
| `/destinations`, `/destinations/[slug]` | Legacy alias for `/book` |
| `/journeys`, `/journeys/[slug]` | Legacy alias for `/packages` |
| `/packages` | Travel-guide catalogue grouped by theme |
| `/packages/[slug]` | Free preview + unlockable paid content |
| `/forum` | Community posts list |
| `/forum/[slug]` | Thread detail with comments and likes |
| `/practical-info` | Practical guides index |
| `/practical-info/[slug]` | Single practical guide (accommodation, payment, medical, etc.) |
| `/tools` | Travel tools index |
| `/tools/currency` | Currency conversion tool |
| `/tools/timezone` | World time clocks |
| `/tools/phrases` | Universal translator (auto-detect + 17 source/target languages) |
| `/tools/ai-assistant` | AI travel assistant with knowledge-base grounding |
| `/login` | Firebase Authentication sign-in |
| `/contact`, `/privacy` | Static information pages |

### 14.2 Authenticated routes

| Route | Purpose |
| --- | --- |
| `/account` | Account layout (requires sign-in) |
| `/account/points` | Points balance, ledger, current tier |
| `/account/packages` | Unlocked guide list |
| `/account/posts` | User's own forum posts |
| `/admin/unanswered-questions` | Review AI refusal log (requires `AI_ADMIN_UIDS` or `AI_ADMIN_EMAILS`) |

### 14.3 Rendering mode

Some pages export `dynamic = 'force-dynamic'` (e.g. `/packages/[slug]`, `/forum`, `/account/*`) because they read session cookies. Others are pre-rendered at build time (e.g. `/`, `/book`, `/tools`). Add `force-dynamic` to any page that reads cookies, request headers, or Firestore data that must be fresh.

## 15. API endpoints

All endpoints live under `src/app/api/` and run on Vercel Functions (Node.js runtime). Authenticated endpoints require a Firebase ID Token in the `Authorization: Bearer <token>` header; `src/lib/server/api-route.ts` provides a `withAuthenticatedUser` wrapper.

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/account/sync` | Required | Sync user profile, award signup/daily bonuses |
| POST | `/api/account/profile` | Required | Update display name, photo, bio, location |
| GET | `/api/account/posts` | Required | List current user's forum posts |
| POST | `/api/account/notifications/read` | Required | Mark notifications as read |
| POST | `/api/ai-assistant/chat` | Optional | AI assistant answer with knowledge-base sources |
| POST | `/api/ai-assistant/unanswered` | Admin | Submit admin answer to an AI-refused question |
| GET | `/api/destinations`, `/api/destinations/[slug]` | Public | City booking metadata |
| GET | `/api/home` | Public | Home page data |
| GET | `/api/journeys`, `/api/journeys/[slug]` | Public | Journey metadata |
| GET | `/api/forum/posts`, `/api/forum/posts/[slug]` | Public | Forum post list and detail |
| POST | `/api/forum/posts` | Required | Create a forum post (awards daily points) |
| PATCH/DELETE | `/api/forum/posts/[slug]` | Author | Edit or delete own post |
| POST/DELETE | `/api/forum/posts/[slug]/like` | Required | Toggle like |
| POST/GET/DELETE | `/api/forum/posts/[slug]/comments` | Required | Comment thread |
| POST | `/api/forum/images/upload-url` | Required | Get a signed Blob upload URL for forum images |
| GET | `/api/forum/images/[...path]` | Public | Serve a forum image (proxies Blob) |
| GET | `/api/packages/[slug]/paid` | Required + unlocked | Signed URL for the paid guide HTML |
| POST | `/api/packages/unlock` | Required | Spend points to unlock a guide |
| POST | `/api/points/claim` | Required | Claim points for an action (with anti-fraud evidence) |
| POST | `/api/referrals/redeem` | Required | Redeem an invite code (24-hour window) |
| GET | `/api/practical-info`, `/api/practical-info/[slug]` | Public | Practical travel guides |
| GET | `/api/tools` | Public | Tools metadata |
| POST | `/api/translate` | Public | Site-wide translation via Google Translate |

## 16. Troubleshooting

### Authentication does not work

Check the `NEXT_PUBLIC_FIREBASE_*` values and confirm the selected sign-in provider is enabled in Firebase Console.

### Points or forum APIs return 503

Check the Firebase Admin variables and verify that the service account can access Firestore.

### Private guides or image uploads fail

Check `BLOB_READ_WRITE_TOKEN` and the connected Vercel Blob store.

### AI assistant refuses every question

Lower `OPENAI_MIN_RELEVANCE_SCORE` temporarily or run `npm run knowledge:sync` to upload missing content. Check `OPENAI_VECTOR_STORE_ID` is the correct store.

### AI assistant rate-limited

Adjust `AI_ASSISTANT_RATE_LIMIT_PER_10_MINUTES` and `AI_ASSISTANT_ANON_RATE_LIMIT_PER_10_MINUTES`.

### Embedded guide styling looks wrong after editing CSS

Run `npm run build:guide-css` to regenerate Tailwind output, then `npm run build` for a fresh full build.

### A clean build behaves unexpectedly

Remove generated output, reinstall dependencies, and rebuild:

```bash
npm ci
npm run build
```

`npm ci` recreates `node_modules`; Next.js recreates `.next`.

## 17. Deployment on Vercel

1. Push the repository to GitHub.
2. In Vercel, import the project. Vercel auto-detects Next.js.
3. Add every environment variable from Section 4 to the Vercel project settings, **per environment**:
   - **Production**: full set of credentials.
   - **Preview**: same set if you want full feature parity, otherwise mirror the variables you need (for example, omit OpenAI keys for short-lived preview testing).
4. Push to `main` → automatic Production deploy to `cchinaroute.com`.
5. Every pull request gets an automatic Preview URL.

Once deployed, the `/robots.txt` and `/sitemap.xml` endpoints are populated automatically from the route handlers, so no extra SEO configuration is needed.