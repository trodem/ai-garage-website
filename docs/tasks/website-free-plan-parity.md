# Website — Free plan parity with live app entitlements

## Goal

Align the **Free** tier copy on gariq.app (`#plans`) with what the mobile app and Supabase enforce today (**ADR-046** in `031_ai_garage_app`). The marketing site currently advertises **3 vehicles per garage** on Free; production caps Free at **1 vehicle per garage** and ties the **100k/month server AI quota** to the **first vehicle** (with a pre-vehicle onboarding exception).

## Contract (read-only SSOT — mobile repo)

Do **not** change mobile or Supabase in this brief. Use these as source of truth when writing EN/IT/DE copy:

| Topic | Mobile reference |
| --- | --- |
| Free caps | `supabase/migrations/20260620130000_plan_free_one_vehicle_per_garage.sql` → `max_vehicles_per_garage = 1` |
| LLM quota from first vehicle | `docs/decisions.md` **ADR-046**; `supabase/migrations/20260620140000_free_llm_quota_from_first_vehicle.sql` |
| In-app bullet wording | `src/utils/planCatalogDisplay.ts` → `planFeatureBullets` (free), `formatPlanAiQuotaLine` |
| Other tier numbers (spot-check only) | `supabase/migrations/20260604100000_plan_catalog_and_profiles.sql` `plan_catalog` seed (basic/advanced caps already match website) |

Website implementation: `components/PlansExplainer.tsx` reads **`plans.tiers[]`** from `messages/{en,it,de}.json` only — **copy-only** unless card layout breaks at 320px with longer bullets.

## Non-goals

- No payment/checkout, no new routes, no new dependencies.
- No BYOK / API-key messaging (keep **marketing-uplift** rule: zero BYOK in public copy).
- Paid tiers (Basic/Advanced/Enterprise): **spot-check only** in Step 3; change copy only if a mismatch is found (expected: none except Free).
- No edits under `031_ai_garage_app/` except optional living-doc cross-link in Step 4 (see below).

---

## Steps

### [x] Step 1 — Free tier highlights (`messages/*.json`)

Update **`plans.tiers`** entry with `"id": "free"` in **`messages/en.json`**, **`messages/it.json`**, **`messages/de.json`** in the **same** change.

**Must fix (regression):**

- Replace “Up to 3 vehicles / Fino a 3 / Bis zu 3 Fahrzeuge” with **1 vehicle per garage** (localized).

**Must add (parity with app):**

- Monthly **~100K server AI tokens** tied to **after first vehicle** / period starts at first vehicle (same idea as `formatPlanAiQuotaLine`: “from first vehicle”).
- **Registration scan** before the first vehicle **does not consume** the monthly AI allowance (`extract-registration` path — keep wording simple for marketing).
- **Manual event forms** still available if the user hits the AI cap (trust + accurate).

**Suggested EN highlight set (5–6 bullets max; adjust length for card layout):**

1. `1 owned garage`
2. `1 vehicle per garage`
3. `Full event logbook & statistics`
4. `~100K server AI tokens / month from your first vehicle`
5. `Registration scan before your first vehicle doesn't use the monthly cap`
6. `Garage sharing not included`

Optional 7th if it fits without clutter: manual forms when limit reached — otherwise fold into **`plans.footnote`** or Free **`description`**.

Refresh Free **`description`** one line so it mentions server AI allowance **after onboarding the first vehicle**, not a vague “small allowance” only.

**Verify:** same number of tiers; same JSON shape `{ id, name, description, featured, highlights[] }`; `grep -i "3 veicoli\|3 vehicles\|3 Fahrzeuge"` under `messages/` returns **no** Free-tier false cap (Advanced “30 vehicles” is OK).

**Checkpoint:** stop for user approval on EN wording before treating IT/DE as final (IT/DE ship in the same step once EN is approved).

---

### [x] Step 2 — Plans section intro + footnote + FAQ

In the same three locale files:

- **`plans.copy`**: one sentence that Free (and server AI caps generally) follow **in-app entitlements** and that **Free’s monthly AI period starts when the owner adds their first vehicle** (short, no legal wall of text).
- **`plans.footnote`**: extend if needed so Free’s **pre-first-vehicle registration scan** and **confirm-before-save** behavior stay accurate (keep existing “completion tokens for OCR, chat insert, Ask” scope; do not mention embeddings).
- **FAQ** item **“How do plans and AI work?”** / IT / DE equivalents (`faq.items` — find by question key or matching `q` string): add **one sentence** on Free — quota from first vehicle, unlimited registration scan until then, manual logging if capped.

No component changes if keys already exist.

**Verify:** `npx tsc --noEmit` at website repo root.

**Checkpoint:** stop.

---

### [x] Step 3 — Repo grep + paid-tier spot-check

- Grep website repo for stale Free vehicle cap: `3 vehicles`, `3 veicoli`, `3 Fahrzeuge` in `messages/` (exclude Advanced tier “30” strings).
- Compare **basic / advanced / enterprise** highlights to `plan_catalog` seed (2/10, 5/30, 20/100 garages/vehicles; sharing member counts 3/10/unlimited; token quotas 500k/2M/enterprise unlimited). Fix **only** if something diverges.

**Verify:** `npm run build` at website repo root.

**Checkpoint:** stop.

---

### [x] Step 4 — Cross-repo pointer (mobile docs, optional but recommended)

In **`031_ai_garage_app`**, add **one bullet** under **`docs/gariq-website.md`** § *Why the mobile app cares* or a short **“Marketing copy SSOT”** note: public plan limits on gariq.app must track **`plan_catalog` + ADR-046** and `planCatalogDisplay.ts`; website briefs live in **`031_GarIQ_Website/docs/tasks/`**.

Single commit in **website** repo for Steps 1–3; Step 4 may be a **separate** commit in mobile repo or same PR policy as user prefers — default: **website-only commit** for marketing copy; Step 4 as tiny follow-up in mobile if user wants docs sync.

**Checkpoint:** stop.

---

## Files touched

- `messages/en.json` (mod)
- `messages/it.json` (mod)
- `messages/de.json` (mod)
- `031_ai_garage_app/docs/gariq-website.md` (mod)

---

## Pause point

**Last action:** Steps 1–4 complete. EN/IT/DE Free tier, plans copy/footnote, FAQ updated; paid tiers unchanged (spot-check OK); `npx tsc --noEmit` and `npm run build` green on website repo; mobile `gariq-website.md` cross-link added.

**Next action:** User commit(s) in website repo (and optionally mobile for Step 4), then delete this brief file.

---

## Verification

- Website repo root: `npx tsc --noEmit` — passed (via build)
- Website repo root: `npm run build` — passed
- Manual: open `/en`, `/de`, `/it` → `#plans` → Free card shows **1 vehicle**, first-vehicle AI wording, no “3 vehicles” on Free
- Grep: no Free-tier “3 vehicles” strings in `messages/` — passed

---

## Commit message

```
fix(marketing): align Free plan copy with app entitlements

Update it/en/de plans and FAQ so Free shows one vehicle per garage and server AI quota from first vehicle, matching ADR-046.
```

Trigger coder: _"Act as coder agent for `docs/tasks/website-free-plan-parity.md`."_ (run from **`031_GarIQ_Website`** root).
