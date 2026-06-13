# GarIQ website — coding rules (summary)

Full agent rules for UI work: **`.cursor/rules/page-components-and-responsive.mdc`**.

## Page-owned components

Each route or auth flow gets its **own screen component** under `components/<area>/`. Route files compose translations + metadata only. Shared code is limited to **brand atoms** (wordmark, logo) and small client helpers (deep link button, store hint).

Avoid a single mega-component with optional props for every page.

## Responsive

Standalone flows (welcome, auth callback) must scale typography and spacing for phone → desktop: `clamp()` or `text-* sm:text-* md:text-*`, safe padding, 44px tap targets, no overflow at 320px.

**Auth / post-signup surfaces:** only **`/auth/callback`**, gated in **middleware** (invalid query → redirect home) and **client** (hash/query must match `lib/authCallbackAccess.ts`). **`/[locale]/welcome` → redirect** to locale home. All callback outcome views are **informational only** (no buttons or links). Logic lives in `middleware.ts` + `AuthCallbackPageClient.tsx` — keep in sync when adding flows.
