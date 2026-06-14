# Marketing uplift — riposizionamento e copertura funzionalità complete

> Brief per **031_GarIQ_Website** (Next.js + next-intl, IT/EN/DE).
> Ruolo: planning agent ha scritto il brief; coder agent implementa **uno step alla volta**, si ferma a ogni checkpoint per approvazione utente.
> Trigger coder: _"Act as coder agent for `docs/tasks/marketing-uplift.md`."_

---

## Goal

Far percepire GarIQ come **molto più di un tracker spese veicoli**: un libretto strutturato multi-veicolo/multi-garage + assistente AI sui propri dati (OCR, chat, Ask con citazioni) + cruscotto finanziario (statistiche, multi-valuta con cambio automatico). Riscrivere l'Hero, colmare i buchi di funzionalità, aggiungere un walkthrough passo-passo con **immagini mockup generate**, e mostrare esempi d'uso reali.

## Non-goals / vincoli (LEGGERE PRIMA)

- **BYOK ("usa la tua chiave LLM") NON va citato da nessuna parte.** Decisione utente: feature non confermata commercialmente. Rimuovere/evitare ogni riferimento (anche nel piano Enterprise: riformulare senza "chiavi API proprie / workspace BYOK").
- **Screenshot reali NON disponibili.** Usare **immagini mockup generate** (placeholder ad alta qualità) salvate in `public/images/mockups/`. Sostituibili in futuro con foto reali senza cambiare il layout.
- **Niente nuove dipendenze** senza approvazione utente.
- **Tre lingue sempre in parallelo:** ogni chiave nuova/modificata va in `messages/it.json`, `messages/en.json`, `messages/de.json` nello stesso step. L'app mobile in v1 ha UI in inglese (vedi FAQ); il sito resta IT/EN/DE.
- **Design system esistente:** usare classi/utility già presenti (`section-label`, `section-title`, `section-copy`, `feature-card`, `ai-card`, `step-card`, `use-case-card`) e token brand: primary `#1F1BE8`, cyan `#00A7E5`, pink `#F2137B`. Niente nuovi colori arbitrari. Rispettare `.cursor/rules/page-components-and-responsive.mdc` (un componente schermo per sezione, responsive 320/768/1280, dark mode).
- **No autosave AI** resta un messaggio centrale di fiducia ("l'AI propone, tu confermi").

## Funzionalità reali da coprire (fonte: app `docs/functional-requirements.md`)

Già coperte sul sito: registro eventi (8 tipi), 4 metodi insert (form/foto/PDF/chat), OCR, Ask, archivio documenti + ricerca semantica, multi-garage, scadenza assicurazione, privacy/RLS, 4 piani, scenari, use case.

**Da aggiungere / potenziare (gap):**
1. **Multi-valuta con cambio automatico datato** (paghi in valuta estera → FX del giorno → convertito nella valuta del garage; nessun override manuale). *Assente.*
2. **Assistente AI multilingua** (risponde in IT/DE/EN/FR/ES a scelta). *Quasi assente.*
3. **Export CSV di tutti i dati** (portabilità/fiducia). *Assente.*
4. **Ask con citazioni dai documenti** (es. "pressione gomme?" → risposta dal proprio manuale). *Da promuovere a feature di punta.*
5. **Statistiche** (spesa per categoria, trend 12 mesi, per-veicolo, filtri anno/veicolo). *Da rendere sezione dedicata con grafici.*
6. **Ruoli granulari** (Co-owner/Admin/Logger) + **autore evento** su timeline condivisa. *Da rafforzare nel caso "famiglia/flotta".*
7. **Ricarica EV** come pari ai rifornimenti. *Da rendere esplicito.*

---

## Files touched

- `messages/it.json`, `messages/en.json`, `messages/de.json` (hero, notJustTracker, features, ai, stats, walkthrough, scenarios, plans, faq, metadata, header.navStats)
- `components/NotJustTracker.tsx` (nuovo)
- `components/StatsSection.tsx`, `components/StatsPreview.tsx` (nuovi)
- `components/WalkthroughSection.tsx` (nuovo)
- `components/WalkthroughMockups.tsx` (nuovo — 6 mockup flat in CSS, stile coerente con AiPreview/FeaturesPreview/StatsPreview; sostituiscono i PNG generati per coerenza visiva su richiesta utente)
- `components/Header.tsx` (voce nav Statistiche)
- `app/[locale]/page.tsx` (registrazione NotJustTracker / StatsSection / WalkthroughSection)

File previsti:
- `messages/it.json`, `messages/en.json`, `messages/de.json`
- `components/Hero.tsx`
- `components/SolutionSection.tsx` (o nuova `NotJustTracker` se più pulito)
- `components/FeaturesSection.tsx`
- `components/AiSection.tsx`
- `components/ScenarioStories.tsx`
- `components/HowItWorks.tsx` (+ immagini per step)
- nuovo `components/StatsSection.tsx` + registrazione in `app/[locale]/page.tsx`
- nuovo `components/WalkthroughSection.tsx` (o estensione HowItWorks) con immagini
- `public/images/mockups/*.png` (immagini generate)
- eventuale `components/Header.tsx` + `Footer.tsx` (voci nav nuove sezioni)

---

## Steps

### [x] Step 1 — Hero: nuovo copy di posizionamento

Riscrivere `hero.title` / `hero.subtitle` / `hero.badge` in `messages/{it,en,de}.json` per comunicare "più di un tracker". **Solo copy**, nessun cambio strutturale a `Hero.tsx` (a meno che il titolo nuovo richieda aggiustare la lunghezza max).

Copy IT proposto (recommended — Opzione B; confermare con utente all'inizio dello step):
- `badge`: "Libretto + AI sotto il tuo controllo"
- `title`: "Molto più di un registro spese: il cervello del tuo garage."
- `subtitle`: "Foto, PDF o chat → l'AI prepara la voce e tu confermi, sempre. Poi chiedi qualsiasi cosa ai tuoi veicoli e ai tuoi documenti — nella tua lingua. Rifornimenti, tagliandi, assicurazioni, tasse, revisioni, ricariche EV e spese: tutto in timeline e statistiche, anche in più valute."

Alternative (se l'utente preferisce):
- A: "Il copilota intelligente per ogni tuo veicolo."
- C: "Tutto sui tuoi veicoli, finalmente in un posto solo — e con un'AI che risponde."

EN/DE: tradurre coerentemente nello stesso step.

**Verifica:** `npx tsc --noEmit`; controllo che il titolo non rompa il layout a 320px (Hero usa `text-4xl…lg:text-6xl`).
**Checkpoint:** stop, approvazione utente sulla variante hero.

### [x] Step 2 — Sezione "Non è solo un tracker" (posizionamento esplicito)

Aggiungere un blocco che contrappone "vecchio modo" (Excel / app benzina) a GarIQ (libretto + AI + cruscotto). Implementare estendendo `SolutionSection` con una riga di 3 colonne "Tracker vs GarIQ", oppure nuovo `components/NotJustTracker.tsx` registrato in `page.tsx` subito dopo `ProblemSection`. Preferire estensione se ≥40% del layout esiste già (regola anti-duplicazione).

Copy (3 confronti): "Solo numeri di spesa" → "Spese + cronologia + documenti + risposte"; "Una valuta, un'auto" → "Più garage, più veicoli, multi-valuta"; "Cerchi a mano" → "Chiedi e l'AI risponde dai tuoi dati".

**Verifica:** `npx tsc --noEmit`; responsive 320/768/1280; dark mode.
**Checkpoint:** stop.

### [x] Step 3 — Colmare i gap funzionali nelle sezioni esistenti (solo copy)

In `messages/{it,en,de}.json`, aggiornare/aggiungere item a:
- `features.items`: aggiungere **"Multi-valuta automatica"** (cambio del giorno, nessun override), **"Export CSV"**, **"Assistente nella tua lingua"** (IT/DE/EN/FR/ES). Rimuovere "riparazione" come tipo separato (l'app usa Workshop; refuso refusi minori ok).
- `ai.cards`: rafforzare **"Ask con citazioni"** (risposte da manuali/polizze con citazione) e aggiungere **"Risponde nella tua lingua"**.
- `scenarios.items`: aggiungere **"Rifornimento all'estero"** (paghi in CHF/USD → convertito in € col cambio del giorno) e **"Ricarica EV"**.
- Piani: riformulare il tier Enterprise **senza BYOK** (es. "Quota IA massima" invece di "workspace BYOK / chiavi API proprie"). Verificare anche `plans.footnote` e FAQ "Come funzionano piani e IA?": **rimuovere "enterprise BYOK"**.
- FAQ: aggiungere "In che valute posso registrare le spese?" e "In che lingua risponde l'AI?".

**Nota anti-regressione:** i componenti leggono gli array via `t.raw("items"/"cards"/"steps")` — mantenere la stessa forma `{title, copy}` (o `{q,a}` per FAQ). Nessun cambio ai componenti se si aggiungono solo elementi agli array esistenti.

**Verifica:** `npx tsc --noEmit`; grep dell'intero repo per "BYOK" / "chiave" / "API key" → zero risultati nelle 3 lingue.
**Checkpoint:** stop.

### [x] Step 4 — Nuova sezione Statistiche con grafici

Nuovo `components/StatsSection.tsx` (server component + sottocomponente client per i grafici animati, sullo stile di `AppPreview.tsx`), registrato in `page.tsx` tra `AiSection` e `UseCases` (o accanto a Solution). Mostrare: spesa per categoria, trend annuale, ripartizione per veicolo, accenno ai filtri anno/veicolo. Riusare lo stile card (`surface`/token brand). Aggiungere chiavi `stats.*` nelle 3 lingue. Aggiungere voce nav "Statistiche" in `Header.tsx` se coerente con le altre.

**Verifica:** `npx tsc --noEmit`; responsive; dark mode; `prefers-reduced-motion` rispettato (come nelle utility esistenti).
**Checkpoint:** stop.

### [x] Step 5 — Generazione immagini mockup

Generare immagini mockup illustrative (PNG) in `public/images/mockups/` per i momenti chiave, stile coerente col brand (sfondo scuro slate, accenti `#1F1BE8`/`#00A7E5`/`#F2137B`, mockup telefono):
1. `ask-citation.png` — chat Ask con risposta + citazione da un manuale.
2. `insert-photo-draft.png` — scontrino fotografato → bozza AI con campi (litri, prezzo) → bottone Conferma.
3. `stats-overview.png` — schermata statistiche (categorie + trend).
4. `timeline-year.png` — timeline raggruppata per anno.
5. `multi-garage.png` — selettore garage attivo + più veicoli.
6. `multi-currency.png` — evento pagato in valuta estera con cambio convertito.

Ogni immagine: generata col tool immagini, nominata come sopra. Verificare peso ragionevole (preferire larghezza ~1000–1400px).

**Verifica:** file presenti in `public/images/mockups/`; aprono correttamente.
**Checkpoint:** stop (rivedere insieme le immagini prima di integrarle).

### [x] Step 6 — Walkthrough passo-passo visivo

Estendere `HowItWorks` (o nuovo `components/WalkthroughSection.tsx`) per affiancare a ogni passo un'immagine dallo Step 5 (`next/image`), con micro-didascalia. Coprire il flusso "magico": (1) scegli tipo evento, (2) foto/chat, (3) l'AI propone la bozza, (4) tu confermi, (5) timeline/statistiche. Aggiungere chiavi copy nelle 3 lingue. Usare `alt` descrittivi (accessibilità + SEO).

**Verifica:** `npx tsc --noEmit`; `next/image` con width/height o `sizes`; responsive; dark mode; nessun layout shift evidente.
**Checkpoint:** stop.

### [x] Step 7 — Integrazione immagini nelle sezioni di punta + rifinitura SEO

Inserire le immagini mockup pertinenti in Hero/AI/Stats/Scenari dove rafforzano il messaggio. Aggiornare `metadata` (title/description/keywords) in `messages/*` per includere i nuovi temi (multi-valuta, assistente AI, documenti). Verificare `og-gariq.svg` ancora coerente col nuovo claim.

**Verifica:** `npm run build` passa; `npx tsc --noEmit`; controllo a 320/390/768/1280px.
**Checkpoint:** stop.

---

## Verification (blocco finale, prima del commit)

- `npx tsc --noEmit` pulito.
- `npm run build` passa.
- Grep repo: nessuna occorrenza di "BYOK", "chiave API/API key", riferimenti a chiavi LLM proprie in `messages/*`.
- Tutte le nuove chiavi presenti e coerenti in `it.json`, `en.json`, `de.json` (stesse chiavi, stessa forma array).
- Responsive verificato a 320 / 390 / 768 / 1280 px; dark mode su ogni nuova superficie.
- Immagini in `public/images/mockups/` referenziate via `next/image` con `alt` significativi.

## Commit message

```
feat(marketing): reposition GarIQ beyond expense tracking with full-feature coverage and visual walkthrough

- rewrite hero copy to convey assistant + multi-garage + finance value
- add positioning section (not just a tracker) and dedicated stats section
- surface multi-currency FX, multilingual AI, CSV export, document-cited Ask
- add generated mockup imagery and step-by-step visual walkthrough
- remove BYOK references from plans/FAQ copy (it/en/de)
```

## Pause point

- **Ultima azione (coder):** completati tutti gli step 1–7. Hero variante B applicata; sezioni NotJustTracker, Stats e Walkthrough create e registrate; 6 mockup generati e integrati; BYOK rimosso; metadata SEO aggiornati. `npm run build` e `npx tsc --noEmit` verdi; grep BYOK = 0.
- **Prossima azione concreta:** revisione visiva dell'utente (320/768/1280px, dark mode). Poi commit unico col messaggio in `## Commit message`. Nessun commit eseguito dal coder (in attesa di conferma utente).
