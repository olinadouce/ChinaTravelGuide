# Developer Guide

This document explains how to configure, compile, and run China Travel Guide from a clean source checkout.

## 1. Technology stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Cloud Firestore
- Vercel Blob

## 2. Prerequisites

Install the following software:

- Node.js 22 or newer
- npm 10 or newer
- Git, if the project is obtained from a Git repository

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

### Firebase browser configuration

These variables are required for email/password and Google sign-in:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

They can be found in Firebase Console under Project settings, General, Your apps, SDK setup and configuration.

### Firebase Admin configuration

Server-side profile synchronisation, points, guide unlocking, and the dynamic forum require Firebase Admin credentials.

The recommended variable is:

```text
FIREBASE_ADMIN_SERVICE_ACCOUNT
```

Its value is the service-account JSON stored as one environment variable. Alternatively, use the split variables documented in `.env.example`.

### Vercel Blob

Private paid guides and uploaded forum images require:

```text
BLOB_READ_WRITE_TOKEN
```

This variable is normally supplied automatically after connecting a Blob store on Vercel.

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

The `prebuild` script first regenerates the Tailwind styles used by embedded guide pages. Next.js then performs TypeScript validation, bundles the application, and prerenders static pages.

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

Run the TypeScript compiler without producing output:

```bash
npm run typecheck
```

Run ESLint:

```bash
npm run lint
```

Run the complete production compilation:

```bash
npm run build
```

## 8. Firebase setup

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

## 9. Important project directories

```text
src/app/             Pages and API route handlers
src/components/      Reusable React components
src/data/            Typed website and package content
src/lib/             Shared browser and domain utilities
src/lib/server/      Server-only Firebase and business services
public/              Images, downloads, and public guide HTML
scripts/             Build and data-maintenance scripts
docs/                Developer and architecture documentation
```

Generated directories such as `node_modules` and `.next` are intentionally excluded. Recreate them with `npm ci` and `npm run build`.

## 10. Main routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/book` | Booking cities and affiliate products |
| `/packages` | Travel-guide catalogue |
| `/packages/[slug]` | Free and unlockable guide content |
| `/forum` | Community posts |
| `/account/points` | Points balance and ledger |
| `/account/posts` | User posts and notifications |
| `/practical-info` | Practical travel guides |
| `/tools` | Travel tools |
| `/login` | Authentication |

## 11. Troubleshooting

### Authentication does not work

Check the `NEXT_PUBLIC_FIREBASE_*` values and confirm the selected sign-in provider is enabled in Firebase Console.

### Points or forum APIs return 503

Check the Firebase Admin variables and verify that the service account can access Firestore.

### Private guides or image uploads fail

Check `BLOB_READ_WRITE_TOKEN` and the connected Vercel Blob store.

### A clean build behaves unexpectedly

Remove generated output, reinstall dependencies, and rebuild:

```bash
npm ci
npm run build
```

`npm ci` recreates `node_modules`; Next.js recreates `.next`.
