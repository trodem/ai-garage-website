# Website conversion — Wave A + B

## Goal

Ship the conversion fixes and desire/differentiation content identified in the app-repo report `031_ai_garage_app/docs/reports/website-app-parity-marketing-2026-08-02.md` (Waves A + B only) on gariq.app: make the download CTA look and behave like a live store button (placeholder URLs, swappable later), lead the hero with the shipped brand line and dual value (costs **and** work memory), label Smart Scan / Smart Insert honestly as Basic+, close the Free/trial FAQ gaps, add a mobile sticky download CTA, and add the three desire/differentiation sections from the blueprint (Exclusive band, category comparison, "Imagine…" use cases) that do not exist on the site yet.

Waves C (recap, deep freeze FAQ, hero video, social proof) and D (governance) are explicitly out of scope, except one tiny optional FAQ line about plan-freeze/no-delete (folded into Step 4 because it is one sentence).

## Contract

- **Caps / trial / pricing SSOT stays the app repo**: `plan_catalog` + **ADR-046** (caps), **ADR-079** (in-app-only checkout), `031_ai_garage_app/docs/monetization.md` (Basic store intro trial target **~30 days**, CHF list prices `9.90` / `89` / `19.90` / `179`). This brief only aligns website copy to those — it never invents a new number.
- `031_ai_garage_app/docs/gariq-website.md` § Marketing parity — this **is** the website follow-up; no `Website: N/A` needed.
- `031_ai_garage_app/docs/report/WEBSITE_MASTER_BLUEPRINT.md` §1 (hero), §6 (exclusive), §8 (use cases), §10 (comparison), §11 (FAQ) — content source for the three new sections and copy tone. Section **order** in this brief follows the blueprint's funnel stages (Exclusive after "why/solution", Imagine after "features", Comparison after "who it's for") mapped onto the site's **existing** section names — no existing section is reordered or removed.
- `D:\031_GarIQ\031_GarIQ_Website\.cursor\rules\page-components-and-responsive.mdc` — **binding for this repo, overrides the app's generic duplication-scan default**: "if two screens need the same block and it is **identical** (not 'similar'), extract then — not upfront." `WhyGarIqSection.tsx` and `AudiencesSection.tsx` already share a similar-but-not-identical card-grid shape without a forced extraction; the new `ImagineSection.tsx` (Step 7) follows that same established repo convention directly — **no shared-component extraction step in this brief**. Every new/edited surface still needs `dark:` variants and must survive 320/390/768/1280px per that rule file.
- Locked product constraints (from orchestrator, do not relitigate): placeholder store links must look live (no dashed "Coming soon" badge); no e-bike; no web checkout; no BYOK/Enterprise consumer; en/it/de only; Smart Scan **and** Smart Insert are Basic+ (Free has neither); dual value (costs + work memory) equal weight.

**Pre-flight note (read before Step 1):** `git status` in this repo currently shows uncommitted 1-line changes in `messages/{en,it,de}.json` and `docs/GarIQ-Funktionsbericht.de.md` (removing "E-bikes & trailers" → "Trailers" from `vehicleTypes.items`) plus an untracked `supabase/` directory. The e-bike edit is pre-existing and consistent with this brief's "no e-bike" constraint — leave it in place; it will ride along in this brief's final commit. Do not touch the untracked `supabase/` directory (out of scope). `docs/tasks/marketing-uplift.md` is also still on disk marked all-steps-done-pending-commit, but its deliverables (`StatsSection`, `WalkthroughSection`, `NotJustTracker`) are **not** imported by the current `app/[locale]/page.tsx` — that brief is stale/superseded by the later "slim landing" commits and is unrelated to this one; do not resurrect it here (mention to the user once, do not fix in this brief).

## Steps

### Wave A — conversion

- [ ] 1. **Live-looking download CTA with placeholder store URLs** — `lib/storeLinks.ts` (new), `components/DownloadSection.tsx` (mod), `messages/{en,it,de}.json` (mod)
  - New `lib/storeLinks.ts` exports `getStoreUrls()`:
    ```ts
    const DEFAULT_APP_STORE_URL = "https://apps.apple.com/app/gariq/id0000000000";
    const DEFAULT_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.trodem.garlq";
    ```
    Read `NEXT_PUBLIC_APP_STORE_URL` / `NEXT_PUBLIC_PLAY_STORE_URL`, trim, fall back to the defaults above when empty. One code comment explaining these are pre-publication placeholders swapped via env once the stores are live (bundle id `com.trodem.garlq` from `monetization.md`; the Play URL above will likely become the real one, the App Store numeric id will not).
  - In `DownloadSection.tsx`: use `getStoreUrls()` instead of reading `process.env` directly; delete the disabled/dashed branch of `StoreButton` entirely (`available`, `comingSoonLabel` props) and the trailing `{playUrl.length === 0 && ...}` hint block — `StoreButton` always renders the live `<a target="_blank">` variant now.
  - Remove the now-unused `download.comingSoon` and `download.comingSoonHint` keys from `messages/en.json`, `messages/it.json`, `messages/de.json`.
  - **Verify:** `npx tsc --noEmit`; visually the two store buttons look identical to the "available" state today (solid border, not dashed) with no "Coming soon" text anywhere on the page.

- [ ] 2. **Hero: brand line + dual value + micro-trust** — `messages/{en,it,de}.json` (mod), `components/Hero.tsx` (mod)
  - Edit `hero.title` and `hero.subtitleShort`; add new key `hero.microTrust`. Keep `hero.badge`, `ctaPrimary`, `ctaSecondary` unchanged.
    - EN — `title`: "Snap it. Scan it. Ask GarIQ." · `subtitleShort`: "Costs and work history — when a job was done, at which km. Photo, PDF, chat, or Smart Scan; AI drafts, you always confirm." · `microTrust`: "Free to start on your first vehicle · AI never saves without you · IT · DE · EN"
    - IT — `title`: "Scatta. Scannerizza. Chiedi a GarIQ." · `subtitleShort`: "Costi e memoria dei lavori: quando li hai fatti, a che km. Foto, PDF, chat o Smart Scan; l'IA prepara la bozza, tu confermi sempre." · `microTrust`: "Gratis sul primo veicolo · L'IA non salva mai da sola · IT · DE · EN"
    - DE — `title`: "Fotografieren. Scannen. GarIQ fragen." · `subtitleShort`: "Kosten und Arbeitsverlauf: wann ein Job erledigt wurde, bei welchem Kilometerstand. Foto, PDF, Chat oder Smart Scan; die KI erstellt den Entwurf, du bestätigst immer." · `microTrust`: "Kostenlos starten mit deinem ersten Fahrzeug · Die KI speichert nie ohne dich · IT · DE · EN"
  - In `Hero.tsx`, render `{t("microTrust")}` as a small centered `<p>` (e.g. `mt-6 text-sm text-slate-500 dark:text-slate-400`) directly under the CTA button row, inside the existing `mx-auto max-w-5xl text-center` wrapper. `hero.title`/`hero.subtitleShort` keep the same JSX bindings — no other structural change.
  - **Verify:** `npx tsc --noEmit`; check 320px width — new DE title/subtitle strings must not overflow (`text-5xl`…`lg:text-7xl` is already fluid; shorten wording further if it wraps ugly at 320px).

- [ ] 3. **Truth-label Smart Scan / name Smart Insert in Capture tab** — `messages/{en,it,de}.json` (mod)
  - In `capabilities.tabs` (id `"capture"`) `bullets`, edit the Smart Scan bullet to add "(Basic+)" and add one new bullet right after it naming Smart Insert. No component change (`CapabilitiesSection.tsx` renders the array generically).
    - EN: `"Smart Scan (Basic+): photo or PDF without picking the type first — OCR infers it, then the same draft"` + new `"Smart Insert (Basic+): describe what happened in chat without picking the type first — same review draft"`
    - IT: `"Smart Scan (Basic+): foto o PDF senza scegliere prima il tipo — l'OCR lo deduce, poi la stessa bozza"` + new `"Smart Insert (Basic+): racconta cosa è successo in chat senza scegliere prima il tipo — stessa bozza di revisione"`
    - DE: `"Smart Scan (Basic+): Foto oder PDF ohne Typwahl — OCR erkennt den Typ, dann derselbe Entwurf"` + new `"Smart Insert (Basic+): beschreibe das Ereignis im Chat ohne Typwahl — derselbe Prüf-Entwurf"`
  - **Verify:** `npx tsc --noEmit`; capture tab still renders 7 bullets without layout break at 320px.

- [ ] 4. **FAQ: Free truth, Smart Insert, Basic trial, tiny freeze line** — `messages/{en,it,de}.json` (mod)
  - Edit the existing item whose `q` is "How do Free plan limits work?" (it/de equivalents): change `q` only to a more prominent phrasing, keep its `a` unchanged, and move it from its current last position to index 1 (right after "What can I track?").
    - EN `q` → "What's included in the Free plan?" · IT `q` → "Cosa include il piano Free?" · DE `q` → "Was ist im Free-Tarif enthalten?"
  - Edit the "What is Smart Scan?" item's `a` to state the Basic+ gate:
    - EN: "A Home hub action: take a photo or pick a PDF without choosing the event type first — available from the Basic plan. OCR infers the type among document-like events, then you review the same draft and confirm. On Free, log with the form or typed OCR/chat for fuel and charge."
    - IT: "Azione dalla Home: foto o PDF senza scegliere prima il tipo di evento — disponibile da Basic. L'OCR deduce il tipo tra gli eventi document-like, poi revisioni la stessa bozza e confermi. Sul Free registri con il form o con OCR/chat tipizzati per carburante e ricarica."
    - DE: "Eine Home-Aktion: Foto oder PDF ohne vorherige Eventtyp-Wahl — verfügbar ab Basic. OCR erkennt den Typ unter dokumentähnlichen Events; danach prüfst du denselben Entwurf und bestätigst. Auf Free loggst du mit dem Formular oder mit typisiertem OCR/Chat für Tanken und Laden."
  - Add a new item right after "What is Smart Scan?" — "What is Smart Insert?":
    - EN a: "The chat twin of Smart Scan (Basic+): describe what happened without picking the event type first — GarIQ infers it and prepares the same review draft you confirm."
    - IT q/a: "Cos'è Smart Insert?" / "Il gemello chat di Smart Scan (Basic+): racconti cosa è successo senza scegliere prima il tipo — GarIQ lo deduce e prepara la stessa bozza da confermare."
    - DE q/a: "Was ist Smart Insert?" / "Das Chat-Gegenstück zu Smart Scan (Basic+): beschreibe, was passiert ist, ohne vorher den Eventtyp zu wählen — GarIQ erkennt ihn und erstellt denselben Entwurf zur Bestätigung."
  - Add a new item — "Is there a free trial for Basic?":
    - EN q/a: "Is there a free trial for Basic?" / "Basic can include a free trial (target ~30 days) as a store intro offer on iOS and Android — check the current offer in the app before you subscribe. The website does not run the trial or the checkout."
    - IT: "C'è una prova gratuita di Basic?" / "Basic può includere una prova gratuita (obiettivo ~30 giorni) come offerta introduttiva dello store su iOS e Android — verifica l'offerta attuale in app prima di abbonarti. Il sito non gestisce la prova né il pagamento."
    - DE: "Gibt es eine Gratis-Testphase für Basic?" / "Basic kann eine kostenlose Testphase (Ziel: ~30 Tage) als Store-Einführungsangebot auf iOS und Android enthalten — prüfe das aktuelle Angebot in der App vor dem Abo. Die Website übernimmt weder die Testphase noch die Bezahlung."
  - Add one tiny trust line (Wave C item folded in because it is one sentence) — "What happens to my data if I downgrade or cancel?":
    - EN q/a: "What happens to my data if I downgrade or cancel?" / "Nothing is deleted. Resources over your new plan's limits are marked frozen — visible with an upgrade path — until you upgrade or remove them yourself."
    - IT: "Cosa succede ai miei dati se scendo di piano o annullo?" / "Nulla viene cancellato. Le risorse fuori dai limiti del nuovo piano restano congelate — visibili con percorso di upgrade — finché non fai upgrade o le rimuovi tu."
    - DE: "Was passiert mit meinen Daten bei Downgrade oder Kündigung?" / "Nichts wird gelöscht. Ressourcen über den Grenzen des neuen Tarifs werden eingefroren — sichtbar mit Upgrade-Pfad — bis du upgradest oder sie selbst entfernst."
  - **Verify:** `npx tsc --noEmit`; `Faq.tsx` needs no change (renders `t.raw("items")` generically); confirm all 3 locale files keep the same array length/order after the edit.

- [ ] 5. **Sticky mobile download CTA (~40% scroll)** — `components/StickyDownloadCta.tsx` (new), `app/[locale]/page.tsx` (mod)
  - New client component, scroll-listener styled like the existing pattern in `Header.tsx` (`useState` + passive `scroll` listener), no new translation key — reuse `header.ctaDownload` ("Get the app" / "Scarica l'app" / "App holen").
  - Fixed bottom bar, `md:hidden` (mobile only, matches `Header.tsx`'s own mobile/desktop breakpoint), `min-h-11` touch target, becomes visible once `window.scrollY / (document.body.scrollHeight - window.innerHeight) >= 0.4`; single CTA is an anchor to `#download` (not a direct store link — avoids guessing iOS vs Android, matches every other "Download" CTA already on the page). Respect `prefers-reduced-motion` for the show/hide transition. Pair with `dark:` classes.
  - Register `<StickyDownloadCta />` once in `app/[locale]/page.tsx` (e.g. right after `<Header />`, position is irrelevant since it is `fixed`).
  - **Verify:** `npx tsc --noEmit`; `npm run build`; manual check at 390px viewport — bar appears only after scrolling ~40% down, absent on desktop (≥768px).

### Wave B — desire and differentiation

- [ ] 6. **"Only with GarIQ" exclusive band** — `components/ExclusiveSection.tsx` (new), `messages/{en,it,de}.json` (mod: new `exclusive` namespace), `app/[locale]/page.tsx` (mod)
  - Mirror the existing spotlight-card band pattern already used once in `AiSection.tsx` (`rounded-4xl border bg-slate-50 dark:bg-slate-900 p-8 lg:p-12` wrapper, `SpotlightGroup` + `Reveal as="article" data-spotlight` cards) — no new CSS classes, reuse `.ai-card`.
  - `exclusive` namespace: `label`, `title`, `copy`, `items: {title, copy}[5]` — confirm-before-save · dual Ask (Logbook + Documents) · Smart Scan & Smart Insert (Basic+) · guided document vault · shared garage with real roles.
    - EN — label "Only with GarIQ"; title "Five things most vehicle apps don't do together."; copy "Speed without losing control — the reason people actually keep using GarIQ."; items: ("Confirm before every save", "AI never writes your ownership history on its own. Every draft — from a photo, a chat, or Smart Scan — waits for your tap on Save."), ("Dual Ask: Logbook + Documents", "One assistant answers both \"how many liters this month?\" and \"what oil does the manual recommend?\" — grounded in your own events and files."), ("Smart Scan & Smart Insert (Basic+)", "Capture first, choose the type later. Photo, PDF, or a quick chat message — GarIQ infers the event and hands you the same review draft."), ("Guided document vault", "Registration, policy, purchase contract, and owner's manual live in structured slots — not a dump folder you'll never search again."), ("Shared garage with real roles", "Invite co-owners, admins, or loggers. Everyone sees who logged what — one truth for a vehicle you share.")
    - IT — label "Solo con GarIQ"; title "Cinque cose che la maggior parte delle app veicolo non fa insieme."; copy "Velocità senza perdere il controllo — il motivo per cui le persone continuano a usare GarIQ."; items: ("Confermi tu, ogni volta", "L'IA non scrive mai da sola la storia del tuo veicolo. Ogni bozza — da foto, chat o Smart Scan — aspetta il tuo tocco su Salva."), ("Ask doppio: Libretto + Documenti", "Un solo assistente risponde sia a \"quanti litri questo mese?\" sia a \"che olio consiglia il manuale?\" — sui tuoi eventi e file."), ("Smart Scan e Smart Insert (Basic+)", "Catturi prima, scegli il tipo dopo. Foto, PDF o un messaggio in chat — GarIQ deduce l'evento e ti presenta la stessa bozza da confermare."), ("Vault documenti guidato", "Libretto, polizza, contratto d'acquisto e manuale stanno in slot strutturati — non in una cartella che non cercherai mai più."), ("Garage condiviso con ruoli veri", "Invita co-owner, admin o logger. Tutti vedono chi ha registrato cosa — una sola verità per un veicolo condiviso.")
    - DE — label "Nur bei GarIQ"; title "Fünf Dinge, die kaum eine Fahrzeug-App zusammen kann."; copy "Tempo ohne Kontrollverlust — der Grund, warum GarIQ im Alltag bleibt."; items: ("Du bestätigst jedes Mal", "Die KI schreibt nie allein an der Geschichte deines Fahrzeugs. Jeder Entwurf — aus Foto, Chat oder Smart Scan — wartet auf deinen Tipp auf Speichern."), ("Doppeltes Ask: Logbuch + Dokumente", "Ein Assistent beantwortet \"wie viele Liter diesen Monat?\" genauso wie \"welches Öl empfiehlt das Handbuch?\" — auf Basis deiner Events und Dateien."), ("Smart Scan & Smart Insert (Basic+)", "Erst erfassen, den Typ später wählen. Foto, PDF oder eine kurze Chat-Nachricht — GarIQ erkennt das Event und zeigt denselben Prüf-Entwurf."), ("Geführte Dokumentenablage", "Schein, Police, Kaufvertrag und Handbuch liegen in strukturierten Slots — kein Ordner, den du nie wieder findest."), ("Geteilte Garage mit echten Rollen", "Lade Co-Owner, Admins oder Logger ein. Alle sehen, wer was geloggt hat — eine Wahrheit für ein gemeinsames Fahrzeug.")
  - Register `<ExclusiveSection />` in `page.tsx` between `<WhyGarIqSection />` and `<ProductStorySection />` (blueprint funnel: right after "why/solution", before "how it works").
  - **Verify:** `npx tsc --noEmit`; dark mode; 320/768/1280px; spotlight hover effect works (mouse move sets `--mx`/`--my` on `[data-spotlight]`).

- [ ] 7. **"Imagine…" use-case section** — `components/ImagineSection.tsx` (new), `messages/{en,it,de}.json` (mod: new `imagine` namespace), `app/[locale]/page.tsx` (mod)
  - Same `{label, title, items: {title, copy}[]}` card-grid shape already used by `AudiencesSection.tsx` (`section-label`/`section-title` header block + `mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3` of `Reveal as="article"` cards). Per this repo's own extraction rule (Contract above), build it directly on this established shape — do not add a shared abstraction.
  - `imagine` namespace, 5 items ("Imagine…" continuations):
    - EN — label "Imagine…"; title "Everyday moments GarIQ was built for."; items: ("…at the pump in the rain.", "You don't want to type. Snap the receipt, check the draft, save — and drive off knowing it's done."), ("…leaving the workshop.", "Dictate a sentence with the numbers in your head. Months later, ask when that service was and at which km."), ("…before a long trip.", "Ask \"When was my last oil check?\" and see the date and the km — peace of mind from your logbook, not your memory."), ("…needing a policy detail.", "It's in the vault. Ask the document instead of digging through email."), ("…sharing the keys.", "You and your partner drive the same vehicle. One garage, one timeline — fewer \"I thought you did it.\"")
    - IT — label "Immagina…"; title "Momenti di tutti i giorni per cui GarIQ è pensato."; items: ("…alla pompa sotto la pioggia.", "Non vuoi digitare. Scatti la foto, controlli la bozza, salvi — e riparti sapendo che è fatto."), ("…uscendo dall'officina.", "Detti una frase con i numeri a mente. Mesi dopo chiedi quand'è stato quel servizio e a che km."), ("…prima di un viaggio lungo.", "Chiedi \"Quand'è stato l'ultimo controllo olio?\" e vedi data e km — tranquillità dal tuo libretto, non dalla memoria."), ("…quando ti serve un dettaglio di polizza.", "È nel vault. Chiedi al documento invece di scavare nell'email."), ("…condividendo le chiavi.", "Tu e il tuo partner guidate lo stesso veicolo. Un garage, una timeline — meno \"pensavo l'avessi fatto tu\".")
    - DE — label "Stell dir vor…"; title "Alltägliche Momente, für die GarIQ gebaut ist."; items: ("…an der Tankstelle im Regen.", "Du willst nicht tippen. Beleg fotografieren, Entwurf prüfen, speichern — und weiterfahren, weil es erledigt ist."), ("…beim Verlassen der Werkstatt.", "Diktiere einen Satz mit den Zahlen im Kopf. Monate später fragst du, wann dieser Service war und bei welchem Kilometerstand."), ("…vor einer langen Fahrt.", "Frag \"Wann war meine letzte Ölkontrolle?\" und sieh Datum und Kilometerstand — Sicherheit aus deinem Logbuch, nicht aus dem Gedächtnis."), ("…wenn du ein Policendetail brauchst.", "Es liegt im Vault. Frag das Dokument, statt in E-Mails zu suchen."), ("…wenn ihr euch die Schlüssel teilt.", "Du und dein Partner fahrt dasselbe Fahrzeug. Eine Garage, eine Timeline — weniger \"ich dachte, du hättest es gemacht\".")
  - Register `<ImagineSection />` in `page.tsx` between `<AiSection />` and `<AudiencesSection />` (blueprint funnel: right after "features", before "who it's for").
  - **Verify:** `npx tsc --noEmit`; dark mode; 320/768/1280px.

- [ ] 8. **Category comparison section** — `components/ComparisonSection.tsx` (new), `messages/{en,it,de}.json` (mod: new `comparison` namespace), `app/[locale]/page.tsx` (mod)
  - New responsive comparison grid (no `<table>`; a 3-column CSS grid that collapses to stacked rows with inline labels below `sm`), header block (`section-label`/`section-title`/`section-copy`) + rows of (Approach / What usually breaks / Why GarIQ), each row wrapped in `Reveal`. No invented competitor names — categories only.
  - `comparison` namespace: `label`, `title`, `copy`, `colApproach`, `colBreaks`, `colWhy`, `rows: {approach, breaks, why}[5]`.
    - EN — label "Compared to what you use today"; title "No invented competitors — just the categories people actually try first."; copy "GarIQ isn't a feature more than a spreadsheet. It's a different category: capture, confirm, and ask — on your own vehicle history."; colApproach "Approach"; colBreaks "What usually breaks"; colWhy "Why GarIQ"; rows: ("Camera roll & folders", "Unsearchable, no totals, no shared truth", "Structured events, Ask, and a shared garage"), ("Spreadsheets", "Abandoned after a few weeks; painful to update at the pump", "Seconds to capture, review, and ask later"), ("Family chat threads", "Noise, not a system of record", "One garage, real roles, visible who logged what"), ("Fuel-only apps", "Ignore EV charging, tax, inspections, and documents", "The full ownership story plus a document vault"), ("Generic AI chatbots", "Don't know your garage; can invent facts", "Answers grounded in your own events and files")
    - IT — label "Rispetto a cosa usi oggi"; title "Nessun competitor inventato — solo le categorie che si provano davvero prima."; copy "GarIQ non è \"una funzione in più\" di un foglio di calcolo. È un'altra categoria: catturi, confermi, chiedi — sulla storia del tuo veicolo."; colApproach "Approccio"; colBreaks "Dove si rompe"; colWhy "Perché GarIQ"; rows: ("Fotocamera e cartelle", "Non ricercabile, nessun totale, nessuna verità condivisa", "Eventi strutturati, Ask e garage condiviso"), ("Fogli di calcolo", "Abbandonati dopo poche settimane; scomodi alla pompa", "Catturi in secondi, revisioni, chiedi dopo"), ("Chat di famiglia", "Rumore, non un sistema di registro", "Un garage, ruoli veri, visibile chi ha registrato cosa"), ("App solo carburante", "Ignorano ricarica EV, tasse, revisioni e documenti", "Tutta la storia del veicolo più un vault documenti"), ("Chatbot IA generici", "Non conoscono il tuo garage; possono inventare fatti", "Risposte fondate sui tuoi eventi e file")
    - DE — label "Im Vergleich zu dem, was du heute nutzt"; title "Keine erfundenen Konkurrenten — nur die Kategorien, die man wirklich zuerst probiert."; copy "GarIQ ist nicht \"eine Funktion mehr\" als eine Tabelle. Es ist eine andere Kategorie: erfassen, bestätigen, fragen — über die eigene Fahrzeughistorie."; colApproach "Ansatz"; colBreaks "Was meist scheitert"; colWhy "Warum GarIQ"; rows: ("Fotos & Ordner", "Nicht durchsuchbar, keine Summen, keine geteilte Wahrheit", "Strukturierte Events, Ask und geteilte Garage"), ("Tabellen", "Nach wenigen Wochen aufgegeben; mühsam an der Tankstelle", "Sekunden zum Erfassen, prüfen, später fragen"), ("Familien-Chats", "Lärm, kein Aufzeichnungssystem", "Eine Garage, echte Rollen, sichtbar wer was geloggt hat"), ("Reine Tank-Apps", "Ignorieren E-Laden, Steuern, Prüfungen und Dokumente", "Die volle Ownership-Story plus Dokumentenablage"), ("Generische KI-Chatbots", "Kennen deine Garage nicht; können Fakten erfinden", "Antworten auf Basis deiner eigenen Events und Dateien")
  - Register `<ComparisonSection />` in `page.tsx` between `<AudiencesSection />` and `<PlansExplainer />` (blueprint funnel: right after "who it's for", before plans).
  - **Verify:** `npx tsc --noEmit`; dark mode; no horizontal scroll at 320px (rows stack, labels visible).

- [ ] 9. **Smart Insert consistency pass** — no new files expected
  - Grep `messages/en.json` for "Smart Scan" and confirm every surface that names it (Capabilities capture tab, FAQ, Exclusive band) also names **Smart Insert** nearby, per Steps 3/4/6. If any surface still mentions Smart Scan alone, add the Smart Insert counterpart in that same file/locale before closing this step.
  - **Verify:** grep `messages/{en,it,de}.json` for `"Smart Insert"` returns ≥3 hits per locale (capture tab, FAQ, exclusive band).

- [ ] 10. **Trial Basic in Plans copy** — `messages/{en,it,de}.json` (mod)
  - Edit `plans.tiers` (id `"basic"`) `description` to mention the store intro trial, keep everything else in the tier unchanged.
    - EN: "More vehicles and invite family to share one garage. Try Basic free via the store intro offer (~30 days) — annual CHF 89 in-app. DE/AT stores show local EUR."
    - IT: "Più veicoli e invita la famiglia in un garage. Prova Basic gratis con l'offerta introduttiva dello store (~30 giorni) — annuale CHF 89 in-app. Su store DE/AT vedi l'EUR locale."
    - DE: "Mehr Fahrzeuge und Familie in einer Garage einladen. Basic kostenlos testen mit dem Store-Einführungsangebot (~30 Tage) — jährlich CHF 89 in-App. In DE/AT zeigt der Store lokales EUR."
  - **Verify:** `npx tsc --noEmit`; `PlansExplainer.tsx` needs no change (renders `description` generically).

- [ ] 11. **Full verification pass**
  - `npm run build` (root) — must pass clean.
  - `npx tsc --noEmit` — must pass clean.
  - Grep `messages/*.json` for `"e-bike"`, `"ebike"`, `"BYOK"`, `"Enterprise"` (case-insensitive) → 0 results.
  - Grep `messages/*.json` for `"comingSoon"` / `"Coming soon"` / `"In arrivo"` / `"Demnächst"` → 0 results.
  - Manual resize check: 320 / 390 / 768 / 1280px, light + dark mode, on `Hero`, `ExclusiveSection`, `ImagineSection`, `ComparisonSection`, `StickyDownloadCta`, `DownloadSection`, `Faq`.
  - Manual scroll check on a mobile viewport (390px): sticky bar hidden at top, appears after ~40% scroll, absent at ≥768px.
  - Confirm `en.json` / `it.json` / `de.json` have identical key structure (same namespaces, same array lengths) after all edits.

## Files touched

(coder updates this list as steps complete; new = newly created, mod = modified)

- `lib/storeLinks.ts` (new)
- `components/DownloadSection.tsx` (mod)
- `components/Hero.tsx` (mod)
- `components/StickyDownloadCta.tsx` (new)
- `components/ExclusiveSection.tsx` (new)
- `components/ImagineSection.tsx` (new)
- `components/ComparisonSection.tsx` (new)
- `app/[locale]/page.tsx` (mod)
- `messages/en.json`, `messages/it.json`, `messages/de.json` (mod)

## Pause point

Last action: brief written by planning agent; no code changes made.
Next action: start Step 1 (`lib/storeLinks.ts` + `DownloadSection.tsx` rewrite + remove `comingSoon`/`comingSoonHint` keys in all 3 locale files).

## Verification

- `npx tsc --noEmit` (repository root) after every step.
- `npm run build` (repository root) — required before the final commit (Step 11).
- Manual resize 320/390/768/1280px + dark mode on every new/edited surface.
- Grep checks listed in Step 11.

## Commit message

```
feat(marketing): live-looking download CTA, honest Smart Scan/Insert labeling, and desire sections

- placeholder store URLs make Download always look live; swap via NEXT_PUBLIC_*_STORE_URL later
- hero leads with the shipped brand line and dual value (costs + work memory)
- label Smart Scan and Smart Insert as Basic+ across capture tab, FAQ, and exclusive band
- add Free/trial/plan-freeze FAQ answers and a mobile sticky download CTA
- add Exclusive band, category comparison, and "Imagine…" use-case sections (en/it/de)
```
