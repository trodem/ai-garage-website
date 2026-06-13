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

Signup email confirmation uses `https://gariq.app/auth/callback` (`AUTH_SIGNUP_EMAIL_REDIRECT_TO` in the app; see **ADR-047**). **Protected surfaces:** `/auth/callback` (middleware + client gate in `lib/authCallbackAccess.ts`) and `/[locale]/welcome` (middleware redirect to locale home). No buttons/links on callback pages — informational copy only after a valid Supabase redirect.

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

If the welcome or auth pages look **blank** and the browser console shows **404** on `_next/static/chunks/…`, stop the dev server, run `npm run dev:clean` (deletes `.next` then starts dev), and hard-refresh the tab (Ctrl+Shift+R). Do not mix `next start` with an old `.next` folder while developing.

## Production

```bash
npm run build
npm run start
```

Deploy on Vercel; set env vars in the project dashboard.

## Garage invitation email (Resend)

Internal API for the mobile app Edge function **`garage-invite-notify`** (**ADR-057** in the app repo). Not for browser or public clients.

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend dashboard |
| `GARAGE_INVITE_EMAIL_FROM` | Verified sender (e.g. `GarIQ <notifications@gariq.app>`) |
| `GARAGE_INVITE_INTERNAL_SECRET` | Bearer token; same value as Supabase Edge secret |

Templates: `emails/GarageInvitationEmail.tsx` (German). Route: `POST /api/internal/send-garage-invitation`.

Local test (replace secret and recipient):

```bash
curl -s -X POST http://localhost:3000/api/internal/send-garage-invitation \
  -H "Authorization: Bearer YOUR_GARAGE_INVITE_INTERNAL_SECRET" \
  -H "Content-Type: application/json" \
  -d "{\"to\":\"you@example.com\",\"garageName\":\"Test Garage\",\"inviterDisplayName\":\"Alex\",\"roleLabel\":\"Protokollführer\"}"
```

## Content

All marketing strings live in `messages/en.json`, `messages/de.json`, `messages/it.json`. Keep claims aligned with the mobile app (`docs/functional-requirements.md` in the app repo): no push notifications in v1, AI proposes / user confirms, no store subscription checkout on this page.

## UI conventions

See [`docs/coding-rules.md`](./docs/coding-rules.md): **one screen component per route/flow**, shared brand atoms only, **responsive** typography and spacing for phone through desktop (standalone pages like welcome and auth callback).
