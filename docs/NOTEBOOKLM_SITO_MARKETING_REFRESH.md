# GarIQ — Brief NotebookLM / design: refresh marketing gariq.app

> **A chi serve:** caricare **questo file** in NotebookLM (o passarlo a designer / Cursor sul repo `031_GarIQ_Website`) per **riscrivere e rendere più attrattiva** la landing [gariq.app](https://gariq.app).  
> **Implementazione:** solo nel repo sibling `D:\031_GarIQ\031_GarIQ_Website` (Next.js, locali `messages/{en,it,de}.json`) — **non** dentro `031_ai_garage_app`.  
> **Data truth:** agosto 2026. Prezzi e caps da policy live (`docs/monetization.md`, ADR-046/079).  
> **Brand line ufficiale (da mettere in hero):** *Snap it. Scan it. Ask GarIQ.*

---

## Prompt da incollare in NotebookLM

```
Sei un growth designer + copywriter CRO per gariq.app (sito marketing GarIQ).

Usando SOLO questo documento, genera:

1) Audit di attrattività: cosa funziona sul sito attuale vs cosa frena la conversione.
2) Nuova architettura di pagina (sezioni ordinate) ottimizzata per desiderio + fiducia + download.
3) Copy completa Hero + Problem + How it works + Exclusive + Audiences + Plans + FAQ + Final CTA in IT, DE, EN (stessa verità prodotto).
4) Specifiche UI/motion: layout first viewport, palette brand, cosa NON fare (no purple SaaS, no card spam, no fake social proof).
5) Checklist di implementazione Wave A / B / C per il team del repo 031_GarIQ_Website.
6) 10 microcopy CTA alternative e 8 Ask sample questions (mix costi + memoria lavori).

Vincoli:
- Checkout solo in-app; prezzi CHF indicativi (§ Piani).
- Smart Scan / Smart Insert = Basic+, etichettare onestamente.
- Dual value: costi E memoria operativa (quando / km).
- Linguaggio veicolo/garage, non auto-only.
- Se store URL mancanti: CTA waitlist/TestFlight onesti, mai “Disponibile” falso.
```

---

## 1. Obiettivo emotivo della pagina

In 5 secondi: *“Capisco cos’è.”*  
In 30 secondi: *“È esattamente il caos dei miei veicoli.”*  
Prima del download: *“Mi fido — e posso agire adesso.”*

**Job della landing:** far scaricare / richiedere accesso all’app GarIQ.  
**Non è:** documentazione tecnica, blog, checkout Stripe, confronto feature-table infinito.

---

## 2. Snapshot sito live (base da migliorare)

Stato osservato su [gariq.app](https://gariq.app) (EN):

| Già buono | Debole / da alzare |
| --- | --- |
| Storia Scan → Confirm → Ask chiara | Hero **senza** brand line ufficiale |
| Trust “you confirm every save” | Download = **Coming soon** (kill conversion) |
| Piani Free/Basic/Advanced + crediti allineati | Smart Scan raccontato come gesto centrale **senza** label Basic+ |
| Dual Ask (logbook + documents) | Memoria lavori / km sottopesata vs “spese” |
| Audiences famiglie / multi-veicolo / EV | Manca trial Basic ~30 gg in copy |
| FAQ solide su polizza vs pagamento | Manca sticky CTA mobile; poco social proof onesto |
| Multi-valuta, lingue IT/DE/EN | Meta / keywords a rischio “auto-only” |

**Headline live tipica:** “Much more than an expense tracker — the brain of your garage.”  
**Da sostituire in hero con:** brand line + sottotitolo dual-value (l’attuale headline può scendere in sezione Why).

---

## 3. Brand & design (obbligatori)

| Token | Hex |
| --- | --- |
| Primary Gar | `#211EE5` |
| Secondary cyan | `#08A7DE` |
| Tertiary IQ | `#ED177B` |
| Background | `#FAF9FC` |
| Navy text | `#0B1F4A` |

### Principi di attrattività (non generici)

1. **Brand first** — wordmark GarIQ hero-level (Gar blue + IQ fuchsia).  
2. **One composition** nel first viewport: brand + 1 headline + 1 sub + dual CTA + 1 mockup in motion. Niente griglia piani/stats in hero.  
3. **Cards solo se interattive** — preferire composizione aperta tipo Linear/Apple.  
4. **Proof = UI reale** — frame telefono di Home / Draft / Ask, non dashboard inventate.  
5. **No purple AI cliché**, no glow spam, no dark-default.  
6. **Motion con scopo:** loop Scan → Draft → Confirm → Ask (2–3 motion intenzionali).  
7. **Mobile-first** + sticky download dopo ~40% scroll.  
8. **Localize meaning** — IT/DE/EN dicono la stessa verità.

---

## 4. Funnel sezioni (ordine consigliato)

| # | Sezione | Job | Attrattività |
| ---: | --- | --- | --- |
| 1 | **Hero** | Capire in 5s | Brand line + mock Scan/Ask + dual CTA |
| 2 | **Problem** | “È il mio caos” | 4–5 pain bilanciati (non solo soldi) |
| 3 | **Solution strip** | Desiderio | Scan · Confirm · Ask in tre verb |
| 4 | **How it works** | Credibilità | 4 step con UI |
| 5 | **Only with GarIQ** | Differenziazione | Confirm-before-save · Dual Ask · Smart Scan (Basic+) · Vault · Sharing |
| 6 | **Capabilities tabs** | Esplorazione | Capture / Ask / Docs / Timeline / Sharing / Plans |
| 7 | **Audiences** | Identity | Famiglia · multi-veicolo · EV & trip |
| 8 | **Imagine…** | Desiderio situazionale | Pompa sotto pioggia · uscita officina · viaggio · polizza |
| 9 | **Plans** | Chiarezza freemium | Free onesto · Basic desire · Advanced power |
| 10 | **Download** | Azione | Store vivi **oppure** waitlist calda |
| 11 | **FAQ** | Risk reversal | Free / Smart Scan / trial / freeze / checkout |
| 12 | **Final CTA** | Chiusura | Ripeti brand line + micro-trust |

---

## 5. Copy hero (sostituire subito)

### EN

| Element | Copy |
| --- | --- |
| Eyebrow | The intelligent vehicle logbook |
| **Headline** | Snap it. Scan it. Ask GarIQ. |
| Sub | Capture costs *and* work history — when a job was done, at which km. AI drafts; you confirm. Then ask your own logbook. |
| CTA primary | Download GarIQ |
| CTA secondary | See how it works |
| Micro-trust | Free on your first vehicle · AI never saves without you · IT / DE / EN |

### IT

| Element | Copy |
| --- | --- |
| Eyebrow | Il logbook intelligente del tuo veicolo |
| **Headline** | Scatta. Scannerizza. Chiedi a GarIQ. |
| Sub | Costi *e* memoria dei lavori: quando l’hai fatto, a che km. L’AI prepara la bozza — confermi tu, sempre. Poi chiedi alla tua storia. |
| CTA primary | Scarica GarIQ |
| CTA secondary | Scopri come funziona |
| Micro-trust | Gratis sul primo veicolo · Nessun autosave IA · IT / DE / EN |

### DE

| Element | Copy |
| --- | --- |
| Eyebrow | Das intelligente Fahrzeug-Logbuch |
| **Headline** | Fotografieren. Scannen. GarIQ fragen. |
| Sub | Kosten *und* Arbeitsgedächtnis — wann war der letzte Service, bei welchem Km. KI entwirft; du bestätigst. Dann fragst du dein Logbuch. |
| CTA primary | GarIQ laden |
| CTA secondary | So funktioniert’s |
| Micro-trust | Kostenlos mit dem ersten Fahrzeug · Kein KI-Autosave · IT / DE / EN |

**Truth line sotto hero (obbligatoria se mostri Smart Scan):**  
*Smart Scan & shared garage from Basic — Free starts with forms, fuel/charge scan, and Ask.*

---

## 6. Problem cards (pari peso)

1. Camera roll ≠ logbook (scontrini/PDF).  
2. “Quanto ho speso davvero?”  
3. “Quand’è l’ultimo servizio / a che km?”  
4. Documenti che non rispondono (polizza, manuale).  
5. Veicolo condiviso senza una verità unica.

---

## 7. Blocco “Only with GarIQ” (desiderio)

| Pillar | Messaggio |
| --- | --- |
| Confirm-before-save | L’AI non scrive senza di te — fiducia, non hype |
| Dual Ask | Libretto *e* Documenti (citazioni), stesso pool crediti |
| Smart Scan + Smart Insert | Senza scegliere il tipo — **Basic+** |
| Vault guidato | Libretto, polizza, contratto, manuale… |
| Garage con ruoli | Co-owner / admin / logger (no Viewer in v1) |
| Form sempre | Anche a crediti zero continui a loggare |

---

## 8. Piani & prezzi (allineare il sito a questa tabella)

**SSOT addebiti:** App Store / Play. Sito = listini indicativi CHF (CH primario).

| Piano | Garage | Veicoli | Sharing | Crediti/mese | Listino CHF |
| --- | ---: | ---: | --- | ---: | --- |
| Free | 1 | 1 | no | 10 | Free forever |
| Basic | 1 | 5 | max 5 | 100 | **4.90**/mo · **49**/yr |
| Advanced | 3 | 10 | max 10 | 500 | **14.90**/mo · **149**/yr |

**Free onesto (bullet chiave):**

- OCR: fuel & charge · Chat: notes, fuel, charge  
- Document AI off (salvo scan libretto / registrazione)  
- **No** Smart Scan / Smart Insert / sharing  
- Form sempre · Ask entro crediti  

**Basic desire:** tutti i tipi OCR/chat · Document AI · sharing · Smart Scan/Insert · trial ~30 gg (se offerta store attiva).  

**Advanced:** multi-garage · 500 crediti · export timeline CSV/PDF · keep photo/PDF sull’evento.

**Disclaimer obbligatorio:** *Subscribe in the GarIQ app. This website does not process payments.*

> Se il sito mostra ancora prezzi più alti (es. 9.90 / 19.90), **aggiornare** a questa tabella.

---

## 9. FAQ da aggiungere / rafforzare

1. Cosa posso fare **gratis**?  
2. Cos’è Smart Scan — e da quale piano?  
3. Cos’è Smart Insert?  
4. C’è una **prova Basic**? (~30 giorni via store, quando attiva)  
5. L’AI salva da sola? → No.  
6. Ask cerca sul web? → No, solo eventi/file tuoi.  
7. Posso comprare sul sito? → No, solo in-app.  
8. Se scendo di piano perdo i dati? → No: risorse fuori piano possono essere **congelate** (freeze), non cancellate.  
9. Polizza vs pagamento assicurazione?  
10. Lingue? → IT / DE / EN only.

---

## 10. Download section — regola conversione

| Situazione | Copy / UX |
| --- | --- |
| Store URL pubblici | Badge Play + App Store **vivi**; rimuovi “Coming soon” |
| Soft launch / TestFlight / Play internal | CTA calda: *Richiedi accesso* / *Join waitlist* + email form; QR opzionale |
| Env vuote | **Mai** “Available on Android and iOS” + badge morti |

Ogni CTA “Scarica” in pagina deve arrivare a una destinazione **utile**, non a un vicolo cieco.

---

## 11. Ask samples da mettere in UI (cliccabili → mock Ask)

1. Quanto ho speso di officina nel 2025?  
2. Quand’è stato l’ultimo tagliando e a che km?  
3. Quanti km dall’ultimo controllo olio?  
4. Quanti litri il mese scorso?  
5. Cosa dice il manuale sulla pressione pneumatici?  
6. Qual è la mia copertura RCA? (Documents Ask)  
7. Quanto ho speso di ricariche quest’anno?  
8. Chi ha loggato l’ultimo rifornimento nel garage condiviso?

---

## 12. Wave di implementazione (per il repo website)

### Wave A — attrattività + conversione (priorità assoluta)

1. Hero → brand line + dual value + truth line Smart Scan.  
2. Download vivo **o** waitlist onesta; sticky CTA mobile.  
3. Label **Basic+** su Smart Scan / Smart Insert.  
4. FAQ Free / trial / freeze.  
5. Allineare prezzi CHF a §8.  
6. Meta SEO: linguaggio **veicolo**, non solo auto; no e-bike.

### Wave B — desiderio

7. Sezione Only with GarIQ.  
8. Confronto per **categorie** (fotocamera, fogli, chat famiglia, app solo-fuel, chatbot generici) — senza nomi competitor inventati.  
9. Blocco “Immagina di…”.  
10. Nominare Smart Insert accanto a Smart Scan.  
11. Embed / loop video 60–90s (da brief video pubblicitario).

### Wave C — retention & polish

12. Ricapitolazioni periodiche (“l’app ti racconta il mese”).  
13. Strip trust privacy (RLS, confirm, no autosave) — umano, corto.  
14. Quando ci sono review store: social proof **reale**.  
15. Motion/polish tipografia e spacing (senza cambiare claim).

---

## 13. Matrice claim → verità (non rompere)

| Claim | Verità | Note copy |
| --- | --- | --- |
| Confermi ogni salvataggio | Sì | Spingere |
| Ask libretto + documenti | Sì | Spingere |
| Free 1/1/10 crediti | Sì | Onesto |
| Basic 5 veicoli / 5 membri / 100 | Sì | |
| Advanced 3 garage / 10 / 500 + export + keep attach | Sì | |
| Smart Scan per tutti | **No** — Basic+ | Etichettare |
| Scarica sugli store | Solo se URL vivi | Altrimenti waitlist |
| Checkout sul sito | **No** | Disclaimer |
| Offline | **No** | Mai |
| To-do / push scadenze | **No** in v1 | Mai |
| FR/ES UI | **No** | Solo IT/DE/EN |

---

## 14. Cosa NON chiedere a NotebookLM di inventare

- Prezzi diversi da §8  
- Enterprise / BYOK come piano consumer in landing  
- Offline, Stripe web checkout, push notifications  
- Recensioni / stelle false  
- Funzioni “AI agent che prenota l’officina”  
- Framing calendario scadenze / to-do  

---

## 15. File correlati (opzionali, stesso ecosistema)

| File | Uso |
| --- | --- |
| `WEBSITE_MASTER_BLUEPRINT.md` | Blueprint lungo sezioni 1–N |
| `MARKETING_GOLDMINE.md` | Slogan / headline arsenal |
| `NOTEBOOKLM_VIDEO_PUBBLICITARIO.md` | Spot da embeddare in hero |
| `docs/reports/website-app-parity-marketing-2026-08-02.md` | Gap analysis storica |
| `docs/gariq-website.md` | Scope repo + parity gate |

**Questo file** è il brief operativo “rendi gariq.app più attrattiva” da dare a NotebookLM o al team website.
