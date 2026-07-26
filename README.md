# China Travel Guide

China Travel Guide is a full-stack travel information website for international visitors to China. It provides destination guides, booking links, practical travel tools, a community forum, Firebase authentication, and a points-based guide-unlocking system.

## Documentation

- [Developer guide](docs/DEVELOPER_GUIDE.md): installation, configuration, compilation, and run instructions
- [Architecture guide](docs/ARCHITECTURE.zh-CN.md): system structure and request flows (Chinese)

## Quick start

Requirements:

- Node.js 22 or newer
- npm 10 or newer

Install dependencies:

```bash
npm ci
```

Create the local environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Firebase settings are required for login, points, and forum write operations.
Static pages can still be compiled and viewed without them.

Start the development server:

```bash
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm run start
```

The application will run at <http://localhost:3000> by default.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

Do not submit or commit `.env.local`, Firebase Admin credentials, Vercel tokens, `node_modules`, or `.next`.

## AI Travel Assistant

The project includes an incremental RAG assistant for published guide
knowledge, with separate free and paid entitlements.

Useful commands:

```bash
npm run knowledge:validate
npm run knowledge:sync
npm run knowledge:status
npm run test
```

See `docs/AI_ASSISTANT_HANDOFF.md` for the assistant architecture,
environment variables, Firestore collections, and rollout steps.
