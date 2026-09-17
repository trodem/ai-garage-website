# Website — Privacy Policy, Terms, and Contact pages

## Goal

Ship three real public pages on gariq.app (`/{locale}/privacy`, `/{locale}/terms`, `/{locale}/contact`) in **en / de / it**, replace the `href="#"` footer placeholders, and make the URLs usable as the Privacy Policy / Support URLs required by Google Play Console and App Store Connect. Copy must describe the product that actually ships today (in-app subscriptions, AI proposes / user confirms, soft delete, multi-tenant RLS).

## Contract

- `docs/coding-rules.md` + `.cursor/rules/page-components-and-responsive.mdc` — one screen component per route, thin `page.tsx`, shared layer = atoms only, responsive type/spacing, dark-mode pairs, no horizontal scroll at 320px.
- `README.md` § Locales / § Content — all strings live in `messages/{en,de,it}.json`; claims must stay aligned with the mobile app.
- `031_ai_garage_app/docs/gariq-website.md` § Marketing parity — this repo owns public marketing truth; caps SSOT is `plan_catalog` / **ADR-046**, checkout is in-app only (**ADR-079**).
- `031_ai_garage_app/docs/monetization.md` — what paid plans are and where they are charged.
- Peers to open before coding: `components/Faq.tsx` (long-form copy from `t.raw`), `components/shared/StandalonePageShell.tsx` (standalone page shell), `app/[locale]/page.tsx` (route composition + `generateStaticParams`), `app/[locale]/layout.tsx` (`generateMetadata` canonical + hreflang shape).

**UI catalog:** N/A — marketing site Next.js pages; this repo has no canonical UI catalog. Peer files are named per step instead.

**Website:** this **is** the website work, implemented in `031_GarIQ_Website`. No separate marketing follow-up. No `031_ai_garage_app/` code in this brief (one optional docs cross-link, Step 11).

---

## Product facts (SSOT for the copy — do not invent beyond this)

| Topic | Truth to state | Source (mobile repo unless noted) |
| --- | --- | --- |
| Account data | Email, password (Supabase Auth), full name / nickname, optional social sign-in via Apple or Google | `src/hooks/useSocialSignIn.ts`, `src/services/authService.ts` |
| Vehicle & log data | Garages + members, vehicles (photo, plate, specs, odometer), events (refuel, charge, maintenance, insurance, tax, inspection, expense, trip, note — workshop = maintenance only; **ADR-036** removed `repair`) with date, cost, odometer, notes | `docs/data-models.md`, `docs/db-schema.md`, **ADR-036** |
| Files | Vehicle photos, event attachments (max 1 per event, paid plans), vault documents — private Supabase Storage buckets | **ADR-028**, **ADR-041** |
| AI processing | User text, photos/PDFs, and vehicle/event context are sent to LLM providers to produce a **draft**; nothing is saved without explicit user confirmation | **ADR-035**, `CLAUDE.md` principle 3 |
| LLM providers | Anthropic (Claude) and OpenAI (incl. embeddings for document search) | `supabase/functions/_shared/llm/`, `document-process/llm.ts` |
| Other processors | Supabase (database, auth, storage, Edge Functions), RevenueCat + Apple App Store / Google Play (subscriptions), Resend (transactional email), Sentry (crash reports, `sendDefaultPii: false`, no replay/perf), logo.dev (brand-name logo lookup), Frankfurter (FX rates, no personal data), Vercel (this website) | `src/lib/sentry.ts`, `supabase/functions/vehicle-brand-logo/`, `_shared/fx/frankfurter.ts`, website `package.json` |
| Voice input | Dictation uses the device/OS speech recognition service (Apple / Google), not a GarIQ server | `src/hooks/useSpeechToText.ts` |
| Billing | Paid plans are purchased and refunded **only** through the App Store / Google Play; gariq.app takes no payment and has no checkout | **ADR-079**, `docs/monetization.md` |
| Deletion & retention | Records are **soft-deleted** (`deleted_at`); in-app account deletion preserves shared-garage history, soft-deletes personal data, and deletes the Auth user | **ADR-080**, `supabase/functions/delete-account/` |
| Data sharing between users | Garage sharing by invite; vehicle cession copies an allowlisted subset of history to the buyer | **ADR-057**, **ADR-087** |
| No duplicate cleanup | The app does not auto-merge or auto-update rows; users manage duplicates manually | **ADR-022** |
| Tracking | No ads, no third-party advertising or product-analytics SDK (crash reporting only) | `031_ai_garage_app/package.json` |
| Website storage | `gariq-theme` in `localStorage`; any `next-intl` locale cookie. **State only what you observe** in DevTools on a fresh visit — do not guess | `components/Header.tsx`, `middleware.ts` |

Forbidden in copy: Stripe, web checkout, push notifications, "we sell your data", any plan cap number (caps belong to `plans.*` / **ADR-046**), any invented company name, address, or supervisory authority.

---

## Acceptance criteria

- `/en/privacy`, `/de/privacy`, `/it/privacy`, `/en/terms`, `/de/terms`, `/it/terms`, `/en/contact`, `/de/contact`, `/it/contact` all return **200** with rendered content (local `npm run build && npm run start`).
- `/privacy`, `/terms`, `/contact` without a locale prefix **redirect** to the locale-prefixed equivalents instead of 404.
- `components/Footer.tsx` contains **no** `href="#"`; privacy / terms / contact are locale-aware links, and switching locale with `LocaleSwitcher` on `/de/privacy` lands on `/it/privacy` (not the home page).
- Each of the six legal pages emits a `<link rel="canonical">` pointing at its own URL plus `en` / `de` / `it` hreflang alternates (verify in view-source, not in code review).
- `messages/en.json`, `de.json`, `it.json` have an **identical** `legal.*` key tree (compared programmatically, see Verification).
- Privacy page text names: data categories, the processor list from the facts table, AI confirm-before-save, soft delete + in-app account deletion, and user rights contact route. It contains none of the forbidden terms above.
- Terms page text states that subscriptions, renewals, and refunds run through Apple App Store / Google Play, that AI output is a proposal the user confirms, and that duplicate entries are user-managed.
- The support address `gariq.app@gmail.com` appears in exactly **one** source module (`lib/legalContact.ts`): `rg "gariq.app@gmail.com" messages/ app/ components/` returns no hits.
- `npx tsc --noEmit` and `npm run build` are green at the website repo root.
- `git status` in `031_ai_garage_app` shows no modified files except the optional docs cross-link from Step 11.

---

## Steps

### [x] 1. Extract long-form copy renderer — `components/shared/RichParagraphs.tsx` (new), `components/Faq.tsx` (mod)

`Faq.tsx` already renders `\n\n` paragraphs with `**bold**` spans (`FaqAnswerBody`). The legal pages need the identical renderer, so extract it **before** building pages: move that logic verbatim into `RichParagraphs.tsx` (props: `{ text: string }`, same `<p>` / `<strong>` output, no new classes) and have `Faq.tsx` import it.
**Verify:** `npx tsc --noEmit`; `npm run dev` → `/en#faq` expands and looks unchanged (no markup or spacing diff).
**Checkpoint:** stop.

### [x] 2. Contact + controller SSOT — `lib/legalContact.ts` (new)

Export `SUPPORT_EMAIL = "gariq.app@gmail.com"`, `getSupportMailto(subject: string)`, and a `LEGAL_ENTITY` block used by both legal pages.

**Owner input — locked 2026-09-17 (interim until public launch):**

| Field | Value |
| --- | --- |
| Kind | Natural person (may become a company later — copy is editable) |
| Name | Demis Troisi |
| Country | Switzerland |
| Postal street address | **Not published yet** — do **not** invent a street. In Privacy/Terms controller section: name + country + contact via `{email}` only. When the owner supplies a real postal address later, add `addressLines` and update copy. |
| Governing law | Swiss law / Switzerland |
| Support email | `gariq.app@gmail.com` |

Point the existing `getWaitlistMailto()` fallback in `lib/storeLinks.ts` at `SUPPORT_EMAIL` (declare the consumer: `components/DownloadSection.tsx`, currently not mounted on the home page).
**Verify:** `npx tsc --noEmit`.
**Checkpoint:** stop.

### [x] 3. Privacy copy — EN (`messages/en.json` → `legal.privacy`)

Shape: `{ metaTitle, metaDescription, title, updated: "<ISO date>", intro, sections: [{ title, body }] }`, `body` using the `\n\n` + `**bold**` convention from Step 1. Sections: who the controller is · what data we process (categories from the facts table) · why / legal basis · AI processing and confirm-before-save · sub-processors (name each one and what it sees) · sharing between users (garage sharing, cession) · storage location and retention (soft delete) · account deletion and export · your rights and how to contact us (`{email}` placeholder — the address is interpolated from `lib/legalContact.ts`, never stored in JSON) · website cookies/local storage (only what Step 11 verifies) · children · changes to this policy.
**Verify:** `node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))"`; grep the new block for the forbidden terms list.
**Checkpoint:** stop for owner approval of the EN substance before translating.

### [x] 4. Privacy copy — DE + IT (`messages/de.json`, `messages/it.json`)

Mirror the approved EN structure key-for-key (same section count and order). German formal *Sie*, Italian formal *Lei*; keep provider names untranslated.
**Verify:** key-tree comparison command from § Verification returns `identical`.
**Checkpoint:** stop.

### [x] 5. Legal page component + privacy route — `components/legal/LegalArticleScreen.tsx` (new), `app/[locale]/privacy/page.tsx` (new)

`LegalArticleScreen` props: `{ title, updatedIso, intro, sections }`; renders a slim top bar (brand `LogoIcon` + wordmark linking to the locale home via `Link` from `@/i18n/navigation`, plus `LocaleSwitcher`), an article body (`max-w-prose`, `text-base sm:text-lg leading-relaxed`, `clamp`-scaled title per the responsive rule, dark-mode pairs), the "last updated" date formatted with next-intl's formatter, and the shared `Footer`. It is used by **two** routes (privacy, terms) — that is why it is a component, not inline JSX.
`page.tsx` stays thin: `setRequestLocale`, `getTranslations("legal.privacy")`, `generateStaticParams` over `routing.locales`, and `generateMetadata` with `title` / `description` / `alternates.canonical = ${siteUrl}/${locale}/privacy` / `alternates.languages` for en, de, it (indexable — no `robots: noindex`).
**Verify:** `npm run build`; `npm run start` → `/en/privacy`, `/de/privacy`, `/it/privacy` at 320 / 390 / 768 / 1280 px in light and dark; view-source shows the canonical + hreflang tags.
**Checkpoint:** stop.

### [x] 6. Terms copy — EN (`messages/en.json` → `legal.terms`)

Same shape as `legal.privacy`. Sections: who provides the service · account and eligibility · what GarIQ is (a logbook; **not** professional, legal, tax, or safety advice) · your content and your responsibility for its accuracy · AI features are drafts the user confirms; no autosave; duplicates are user-managed · plans and billing — purchased, renewed, and refunded **only** via Apple App Store / Google Play, cancellation happens in the store account, gariq.app takes no payment · fair use and prohibited use (abuse of AI quotas, scraping, uploading third-party data without a basis) · shared garages and vehicle cession are irreversible where the app says so · availability, changes, and termination · liability limits · governing law (from `LEGAL_ENTITY`) · how to contact us.
**Verify:** JSON parse + forbidden-term grep as in Step 3.
**Checkpoint:** stop for owner approval.

### [x] 7. Terms copy — DE + IT (`messages/de.json`, `messages/it.json`)

Mirror Step 6 exactly, same tone rules as Step 4.
**Verify:** key-tree comparison returns `identical`.
**Checkpoint:** stop.

### [x] 8. Terms route — `app/[locale]/terms/page.tsx` (new)

Same pattern as Step 5, reusing `LegalArticleScreen` with `legal.terms` and canonical `${siteUrl}/${locale}/terms`. No new component.
**Verify:** `npm run build`; `/en/terms`, `/de/terms`, `/it/terms` render at 320 and 1280 px.
**Checkpoint:** stop.

### [x] 9. Contact page — `components/legal/ContactScreen.tsx` (new), `app/[locale]/contact/page.tsx` (new), `legal.contact` copy in all three locales

`ContactScreen` is its own screen (different layout from the article pages): heading, one short lead, a primary `mailto:` CTA built from `getSupportMailto()` (`min-h-11`, `w-full sm:w-auto`), a short "what to include" list (app version, device, vehicle/event affected — no passwords), a line routing **billing and refund** requests to the App Store / Google Play account, and links to privacy + terms. Copy in `messages/{en,de,it}.json` → `legal.contact` with an `{email}` placeholder; no address literal in JSON.
**Verify:** `npm run build`; clicking the CTA opens a prefilled mail draft to `gariq.app@gmail.com`; page renders at 320 / 768 / 1280 px, light and dark.
**Checkpoint:** stop.

### [x] 10. Wire entry points — `components/Footer.tsx` (mod), `middleware.ts` (mod)

Footer: replace the three `href="#"` anchors with `Link` from `@/i18n/navigation` to `/privacy`, `/terms`, `/contact` (keep the logo.dev attribution anchor as-is). Middleware: add `"/privacy"`, `"/terms"`, `"/contact"` to `config.matcher` so unprefixed URLs reach the next-intl middleware and get redirected to the default locale. **Do not** touch the `/auth/callback` branch or the `/[locale]/welcome` redirect — both must keep behaving exactly as today.
**Verify:** `npm run build`; `/privacy` → redirects to `/en/privacy`; `/auth/callback` with an invalid query still redirects to `/en`; `/en/welcome` still redirects to `/en`; footer links work from the home page and from `/de/terms`; `LocaleSwitcher` on `/de/privacy` → `/it/privacy`.
**Checkpoint:** stop.

### [x] 11. Docs, full verification, deploy, store listings

1. `README.md`: add the three routes to the § Locales table area and one line that legal copy lives in `messages/*.json` → `legal.*` with the support address in `lib/legalContact.ts`.
2. Run the whole § Verification block and record the results in `Pause point`.
3. Owner action (not code): commit + push, let Vercel deploy, then confirm `https://gariq.app/en/privacy`, `/de/privacy`, `/it/privacy`, `/{locale}/terms`, `/{locale}/contact` and the unprefixed redirects all answer 200 from the public internet.
4. Owner action (not code): paste `https://gariq.app/en/privacy` into Google Play Console → *App content → Privacy policy* and App Store Connect → *App Privacy → Privacy Policy URL*; use `https://gariq.app/en/contact` as the App Store *Support URL*.
5. Optional cross-repo docs line in `031_ai_garage_app/docs/gariq-website.md` § *Why the mobile app cares*: legal pages live at `gariq.app/{locale}/{privacy,terms,contact}` (mobile `auth.signIn.privacyPolicy` / `termsOfService` strings can be linked in a separate mobile brief).
6. Tell the owner to delete `docs/tasks/website-legal-pages.md`.
**Checkpoint:** stop.

---

## Team

- **Coder:** owner of every step below unless named otherwise.
- **During:**
  - Step 3 and Step 6 — `@website-parity` (Auto) — read-only check that the billing / plan / AI claims in the EN privacy and terms copy match **ADR-079** (in-app purchase only) and **ADR-046** before the copy is translated three ways.
- **Close-out:**
  - `@gatekeeper` — **N/A**: this brief touches no `031_ai_garage_app/src` or `supabase/` code; the website gates (`npx tsc --noEmit`, `npm run build`) run inside Step 11.
  - `@website-parity` (Auto) — final parity verdict on the shipped public claims.
  - `@judge` (Auto) — close-out ritual and verdict before the single commit.
  - J-space writers: none — j-space (`031_ai_garage_app/docs/tasks/j-space.md`) does not track gariq.app drift; that is `@website-parity`'s lane.
- **Website:** this brief **is** the website work — no separate follow-up.
- **Do not launch:** `@release`, `@schema`, `@harness`, `@i18n` (that agent owns the mobile `src/i18n/locales` layer, not next-intl `messages/*.json`).

## Non-goals

- No Impressum / legal-notice page, no cookie banner, no consent manager, no `sitemap.ts` / `robots.ts`, no new dependency (no MDX).
- No changes to the auth-callback gate, the welcome redirect, `plans.*` copy, or any existing marketing section besides the `FaqAnswerBody` extraction in Step 1.
- Email footer placeholders (`emails/GarIqEmailLayout.tsx` links `Impressum` / `Datenschutz` / `Hilfe` to `#`) stay untouched: repointing them also means re-pasting HTML into the Supabase Dashboard templates (`docs/supabase-auth-email-templates.md`). Separate brief.
- No mobile app links to the new URLs (mobile `auth.json` already holds unused `privacyPolicy` / `termsOfService` labels) — separate mobile brief.

## Files touched

- `components/shared/RichParagraphs.tsx` (new) — Step 1
- `components/Faq.tsx` (mod) — Step 1
- `lib/legalContact.ts` (new) — Step 2
- `lib/storeLinks.ts` (mod) — Step 2 waitlist fallback → `SUPPORT_EMAIL`
- `messages/en.json` (mod) — Steps 3–4, 6–7, 9 (`legal.privacy` / `legal.terms` / `legal.contact`)
- `messages/de.json` (mod) — Steps 4, 7, 9
- `messages/it.json` (mod) — Steps 4, 7, 9
- `components/legal/LegalArticleScreen.tsx` (new) — Step 5
- `app/[locale]/privacy/page.tsx` (new) — Step 5
- `app/[locale]/terms/page.tsx` (new) — Step 8
- `components/legal/ContactScreen.tsx` (new) — Step 9
- `app/[locale]/contact/page.tsx` (new) — Step 9
- `components/Footer.tsx` (mod) — Step 10 locale Links
- `middleware.ts` (mod) — Step 10 unprefixed matcher
- `README.md` (mod) — Step 11 locales + legal SSOT note
- `031_ai_garage_app/docs/gariq-website.md` (mod) — Step 11 optional cross-link

## Pause point

Last action: Steps 6–11 complete. Local verification green. Final `@website-parity` on `legal.privacy` / `legal.terms` / `legal.contact` (en/de/it): **PASS**.
Next action: **owner** — commit + push website repo (and optional mobile docs commit for `gariq-website.md`), confirm live URLs on gariq.app, paste Privacy/Support URLs into Play / ASC. Then delete `docs/tasks/website-legal-pages.md`.

## Verification

- `npx tsc --noEmit` (website repo root).
- `npm run build` (website repo root).
- Key-tree parity: `node -e "const k=o=>Object.keys(o).flatMap(x=>typeof o[x]==='object'&&o[x]?[x,...k(o[x]).map(y=>x+'.'+y)]:[x]);const f=l=>k(require('./messages/'+l+'.json').legal).sort().join('|');console.log(f('en')===f('de')&&f('en')===f('it')?'identical':'MISMATCH')"` → `identical`.
- Address SSOT: `rg "gariq.app@gmail.com" messages/ app/ components/` → no matches.
- Forbidden claims: `rg -i "stripe|checkout|credit card|push notification" messages/` → no matches inside `legal.*`.
- Manual matrix (`npm run start`): nine legal URLs × 320 / 390 / 768 / 1280 px × light and dark; unprefixed `/privacy`, `/terms`, `/contact` redirect; `/auth/callback` invalid query still redirects to `/en`; `/en/welcome` still redirects to `/en`.
- View-source on `/de/privacy`: canonical is `https://gariq.app/de/privacy`, hreflang alternates present for en / de / it.
- Post-deploy: the nine live URLs on `https://gariq.app` return 200.

## Commit message

```
feat(legal): add privacy, terms, and contact pages in en/de/it

Ship locale-aware /privacy, /terms, and /contact routes with product-accurate
copy, wire the footer placeholders and unprefixed redirects, and centralize the
support address so the URLs can back the Play and App Store listings.
```

Trigger coder: _"Act as coder agent for `docs/tasks/website-legal-pages.md`."_ (run from the **`031_GarIQ_Website`** repo root).
