# GarIQ — Marketing site (Next.js)

Landing page for **GarIQ** / GarageApp: product-accurate copy, **EN / DE / IT** via [next-intl](https://next-intl.dev/), and store download CTAs.

Separate git repo from the mobile app (`031_ai_garage_app`).

## Stack

- Next.js 15 (App Router, React 19)
- TypeScript
- Tailwind CSS v4
- next-intl 4.x

## Locales

| Path | Language |
|------|----------|
| `/en` | English (default) |
| `/de` | German |
| `/it` | Italian |

Signup email confirmation lands on `https://gariq.app/{en|de|it}/welcome` when the app sets `emailRedirectTo` via `getSignupEmailRedirectTo()` (see app repo **ADR-047**).

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — production origin for Open Graph and canonical URLs
- `NEXT_PUBLIC_PLAY_STORE_URL` / `NEXT_PUBLIC_APP_STORE_URL` — when empty, the download section shows **Coming soon**

## Develop

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (middleware redirects to `/en`).

## Production

```bash
npm run build
npm run start
```

Deploy on Vercel; set env vars in the project dashboard.

## Content

All marketing strings live in `messages/en.json`, `messages/de.json`, `messages/it.json`. Keep claims aligned with the mobile app (`docs/functional-requirements.md` in the app repo): no push notifications in v1, AI proposes / user confirms, no store subscription checkout on this page.
