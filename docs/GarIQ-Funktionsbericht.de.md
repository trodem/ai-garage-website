# GarIQ — Vollständiger Funktionsbericht (Stand: Juni 2026)

> Detaillierter Bericht über die GarIQ-App (`031_ai_garage_app`): alle Funktionen,
> Features, Ereignistypen, Eingabe- und Frage-Modi sowie die technische Architektur.
> Quelle: `docs/functional-requirements.md`, `docs/flows.md`, `docs/data-models.md`,
> `docs/api.md`, `docs/decisions.md` im App-Repository.

---

## 1. Was ist GarIQ?

GarIQ (App-intern: **GarageApp**) ist ein **mobiles, KI-gestütztes Fahrzeug-Logbuch**.
Es ist **mehr als ein Ausgaben-Tracker**: Es verbindet Ausgaben, Historie, Dokumente
und KI-Antworten — über mehrere Fahrzeuge, Garagen und Währungen hinweg.

**Kernprinzip:** Die KI **schlägt vor**, der Nutzer **bestätigt** — es gibt **kein
automatisches Speichern**. Jeder Eintrag durchläuft denselben Prüfschritt.

**Plattformen:** Android und iOS (Expo / React Native).

---

## 2. Nicht verhandelbare Grundprinzipien (v1)

1. **Nur Fahrzeuge** — keine weiteren Module in v1.
2. **Mehrbenutzerfähig ab Tag 1** — jeder sieht nur eigene Daten (Supabase RLS).
3. **Kein KI-Autospeichern** — die KI erzeugt einen Vorschlag, der Nutzer bestätigt.
4. **Keine automatischen Updates** — Duplikate sind erlaubt, manuelle Bereinigung.
5. **Soft Delete** — niemals physisches Löschen; nur `deleted_at` setzen.
6. **Statistik-fähiges Datenmodell** — Timeline, Analysen, Vergleiche, historische Abfragen.
7. **Zeitachse nach Jahren gruppiert** — Abschnitte standardmäßig eingeklappt.
8. **Keine Push-Benachrichtigungen in v1.**
9. **Sprach-agnostische KI-Leitplanken** — keine hartkodierten sprachspezifischen Schlüsselwörter.

---

## 3. Authentifizierung (FR-AUTH)

| Funktion | Beschreibung |
|---|---|
| Registrierung | Konto mit E-Mail, Passwort und vollständigem Namen anlegen |
| Anmeldung | Login per E-Mail und Passwort |
| Abmeldung | Sofortige Abmeldung über die Einstellungen |
| Sitzungspersistenz | Sitzung bleibt über App-Neustarts hinweg erhalten (Token-Auto-Refresh via AsyncStorage) |
| E-Mail-Bestätigung | Pflicht vor dem Zugriff auf den Hauptbereich; Browser-Landing auf `https://gariq.app/auth/callback` (ADR-047) |
| Passwort vergessen | Reset-E-Mail anfordern; nicht-aufzählende Erfolgsmeldung (ADR-053) |
| Passwort zurücksetzen | Recovery-Link öffnet die App per Deep-Link `ai-garage://auth/callback`; neues Passwort setzen, dann erneut anmelden |
| Onboarding | 3-Bildschirm-Onboarding beim ersten Login (aktuell **Stub** — Platzhalter) |
| Fehleranzeige | Auth-Fehler erscheinen inline am Feld, nicht als generische Toasts |

---

## 4. Fahrzeugverwaltung (FR-VEHICLES)

- **Anlegen:** Marke und Modell (Pflicht), Kraftstofftyp (Pflicht), Kilometerstand-Einheit
  (km/mi); optional Jahr, Kennzeichen, VIN, Notizen, Foto.
- **Bearbeiten / Foto ändern / Soft-Delete** jederzeit möglich.
- **Aktiv / Inaktiv (ADR-029):** Fahrzeuge können auf „inaktiv" gesetzt werden — sie
  bleiben in der Garage sichtbar (mit Kennzeichnung), werden aber aus Home, Timeline
  und Statistik ausgeblendet. Die **vollständige Historie bleibt erhalten**.
- **Home:** zeigt nur **aktive** Fahrzeuge als horizontales Karussell (Foto + Marke/Modell);
  außerdem bis zu **3 (bzw. 5)** letzte Ereignisse als kompakte Karten.
- **RLS:** Nutzer sehen ausschließlich eigene Fahrzeuge.

**Erweiterte Fahrzeugfelder (aus Zulassungsscan / Bearbeitung):**
Fahrzeugtyp, Hubraum (cc), Farbe, Leistung (kW), Erstzulassungsdatum,
Zulassungs-Bemerkungen, Tankvolumen (L), Batteriekapazität (kWh).

**Fahrzeugtypen:** `car`, `suv`, `van`, `truck`, `motorcycle`, `scooter`, `camper`,
`trailer`, `other`.

**Kraftstofftypen:** Benzin, Diesel, Elektro, Hybrid-Benzin, Hybrid-Diesel, LPG.

---

## 5. Ereignisse (FR-EVENTS) — alle Ereignistypen

GarIQ unterstützt **9 Ereignistypen**:

| Typ (DB) | UI-Label | Zweck |
|---|---|---|
| `refuel` | Tanken | Tankvorgang: Liter, Preis/Liter, Ort, Volltank |
| `charge` | Laden | E-Laden: kWh, Preis/kWh, Ladetyp (zu Hause/öffentlich/Schnell), Ort |
| `maintenance` | **Werkstatt** | Werkstattbesuch: Service-Art, Werkstattname, Teile-/Arbeitskosten |
| `insurance` | Versicherung | Anbieter, Policennummer, Deckungsart, Gültigkeit |
| `tax` | Steuer | Steuerart, Gültig-bis-Datum |
| `inspection` | Inspektion | Prüfstelle, Ergebnis (bestanden/durchgefallen/bedingt), nächster Termin |
| `expense` | Ausgabe | Kategorie (Waschen, Zubehör, Reifen, Parken, Maut, Bußgeld, Sonstiges), Ort, Anbieter |
| `note` | **Notiz** | Tagebucheintrag **ohne Kosten** (ADR-026); Pflichttext `body`, optionales Folgedatum |
| `trip` | **Fahrt** | Routenlog (ADR-062): Fahrer, Start, Abfahrts-Kilometerstand; optionaler Ankunftsblock; **keine Kostenzeile** |

**Gemeinsame Felder:** Ereignisdatum (Pflicht), Kilometerstand, Kosten, Notizen (alle
optional, mit typspezifischen Ausnahmen).

**Besonderheiten:**
- **Notiz (`note`):** kein `cost`, kein Top-Level-`notes`; der kanonische Text liegt in
  `details.body`. Optionales Folgedatum (nur Anzeige, kein Push in v1).
- **Fahrt (`trip`):** `cost` ist immer `null`; abgeleitete `distance_km` und `duration_days`,
  sobald End-Kilometerstand / Ankunftsdatum gesetzt sind. Speichern auch bei unvollständigem
  Ankunftsblock erlaubt (Warnhinweis auf Timeline/Home bis vollständig).

**Anzeige:** Ereignisliste pro Fahrzeug nach `event_date` absteigend; Detailansicht öffnet
**schreibgeschützt**; Bearbeiten/Löschen über Überlauf-Menü je nach Rollenrecht.

---

## 6. Eingabe-Modus / Ereignis erfassen (FR-INSERT, ADR-038)

Der zentrale **Insert-Hub** ist die wichtigste Logging-Funktion. Jede Erfassung beginnt
auf einer **Fahrzeugkarte** (Home oder Garage):

1. **Ereignistyp wählen** → 2. **Methoden-Sheet** (Foto, PDF, Chat, Formular).
Der gewählte Ereignistyp wird im Entwurf **gesperrt**.

### Die vier Eingabemethoden

| Methode | Ablauf | Edge Function |
|---|---|---|
| **Formular** | Öffnet sofort `/main/insert/draft` (leerer/Standard-Entwurf) | — (kein LLM) |
| **Foto** | Bild → OCR-Analyse → vorausgefüllter Entwurf | `ocr-parse` |
| **PDF** | Dokument → OCR-Analyse → Entwurf | `ocr-parse` |
| **Chat** | Konversationelle Feldsammlung; listet alle Pflichtlücken in **einer** Nachricht | `chat-collect` |

### Wichtige Regeln des Insert-Flows

- **Ohne KI-Schlüssel/Server-KI:** nur **Formular** ist aktiv; Foto/PDF/Chat zeigen einen Toast.
- **Alle KI-Pfade enden auf demselben Entwurfsformular** (`DynamicVehicleEventForm`) —
  bearbeitbar, mit Pflichtfeld-Gates.
- **Vertrauenssignale (ADR-048):** Banner für „weiches Duplikat", wenn ein ähnlicher Eintrag
  existiert (gleiches Fahrzeug/Typ, Datum ±1 Tag, Kosten ±5 %) — Speichern bleibt möglich.
- **Konfidenzhinweise (`field_confidence`):** KI-gefüllte Felder mit geringer Sicherheit
  erhalten einen Warnrahmen.
- **Nichts wird gespeichert, bevor der Nutzer auf „Speichern" tippt** (ADR-011).
- Speichern ruft `confirm-event` auf; danach Rückkehr zu Home oder Garage je nach Herkunft.
- **„Erneut erfassen"** aus den letzten Ereignissen springt direkt in die Methodenphase.
- LLM-Antworten folgen der **bevorzugten Sprache** aus den Einstellungen.

---

## 7. Frage-Modus / Ask AI (FR-ASK, ADR-006 / ADR-039)

Ein **konversationelles Q&A-Interface** über die eigenen Daten und Dokumente.

- **Einstieg:** Home-Button „Ask AI", „Fragen" auf einer Fahrzeugkarte oder die
  Fahrzeugauswahl → Chat. Ein Fahrzeug muss vor dem Chat gewählt werden.
- **Tool-Registry (chat-ask v2):** Das LLM erstellt einen Plan → ruft erlaubte,
  deterministische Tools auf (SQL/RPC: `find_events`, Aggregate, `search_vehicle_documents`,
  `search_attachments`) → das LLM formuliert die Antwort **nur** aus den Tool-Ergebnissen.
- **Das LLM schreibt niemals selbst SQL.** Datenzugriff ist immer RLS-gesichert.
- **Klärung:** Bei mehrdeutigen Fragen fragt das LLM zuerst nach.
- **Antwortformat:** natürliche Sprache + optional eine **Tabelle** mit Datenzeilen;
  `tools_used` zur Beobachtbarkeit. **Max. zwei Tools pro Nutzernachricht.**
- **Dokument-Antworten mit Zitaten:** Fragen zu hochgeladenen Handbüchern/Policen werden
  mit Quellenangabe (Dokumenttitel + Seitenzahl) beantwortet.
- **Folgefragen** im selben Gespräch ohne Kontextwiederholung möglich.
- **Spracheingabe (Voice, ADR-030):** Mikrofon im Chat-Composer → On-Device-Spracherkennung
  diktiert in das Textfeld; der Nutzer tippt dann auf Senden. (Nur im Ask-Modus, **nicht**
  im Insert-Chat.) Erfordert einen Development-Build.
- Verfügbar für jedes nicht gelöschte Fahrzeug, auch inaktive.

---

## 8. Timeline (FR-TIMELINE)

- Zeigt **alle aktiven Ereignisse** über alle aktiven Fahrzeuge, nach Datum absteigend.
- **Nach Jahren gruppiert** in einklappbaren Abschnitten; das aktuelle Jahr ist
  standardmäßig aufgeklappt.
- Jede Zeile: Fahrzeugname, Ereignistyp-Badge, Kosten, Datum.
- **Volltextsuche:** Freitextsuche über Ereignisse, gefiltert nach **Zeitraum**
  (Gesamtzeit oder ein Jahr) und optionalem **Fahrzeug**-Chip — derselbe Suchmechanismus
  wie bei Ask (`find_events` / `ask_event_text_matches`).
- Tippen auf eine Zeile öffnet die Ereignisdetails.

---

## 9. Statistik (FR-STATS)

- **Gesamtausgaben pro Kategorie** für den gewählten Zeitraum.
- **Monatlicher Ausgabentrend** über das Jahr (12-Monats-Ansicht).
- **Aufschlüsselung pro Fahrzeug.**
- Filter nach Jahr und Fahrzeug (nur aktive Fahrzeuge).
- Beträge in der **Währung der aktiven Garage**; pro Ereignis ggf. Zahlungswährung als
  Zweitzeile (bei Fremdwährung mit FX).

---

## 10. Mehrere Garagen / Workspaces (FR-GARAGE, ADR-044)

- Ein Nutzer kann zu **mehreren Garagen** gehören (Eigentum oder akzeptierte Mitgliedschaft).
- Genau **eine aktive Garage** filtert Home, Garage, Timeline, Statistik, Insert und Ask.
- **Pro Garage eine Währung;** keine garagenübergreifenden Geldsummen in der Statistik.
- **Rollen:** Co-Owner, Admin, Logger (kein Viewer). Rechte-Gates spiegeln
  `garagePermissions` (z. B. Logger darf keine Ereignisse/Fahrzeuge löschen).
- **E-Mail-Einladungen** mit Annehmen/Ablehnen; Einladung löst eine **deutsche
  Transaktions-E-Mail** aus (Resend via GarIQ-Website-API, ADR-057). Annahme erfolgt in der App.
- **Widerruf / Entfernen** von Mitgliedern löst ebenfalls eine deutsche E-Mail aus (ADR-058);
  Zugriffsänderung sofort wirksam.
- **Autorenanzeige** auf geteilten Garagen (wer das Ereignis erstellt hat).

---

## 11. Mehrwährungsfähigkeit (ADR-060)

- Ereigniskosten können in einer **Zahlungswährung ≠ Garagenwährung** erfasst werden.
- Die App ruft **online den Tageskurs** ab, speichert einen Snapshot und persistiert die
  Garagenkosten — **keine manuelle Kursüberschreibung**.
- FX-Quellen: Provider, lokaler Cache oder vorheriges Ereignis.
- Anzeige: primär Garagenwährung (statistikkonform), sekundär „Bezahlt {Betrag}" in der
  Zahlungswährung.

---

## 12. Dokumente / Document Vault (FR §14, ADR-041 / ADR-042 / ADR-049–052)

Ein **Dokumententresor pro Fahrzeug** für Referenzdateien.

- **Kategorien:** Zulassung, Versicherungspolice, Bedienungsanleitung, Serviceheft,
  Garantie, Kaufvertrag, technisches Datenblatt, Sonstiges.
- **Upload:** Foto aufnehmen oder Datei wählen → Titel + Kategorie → privater Bucket.
- **Verarbeitung (Phase 2):** automatische Textextraktion, Chunking und pgvector-Embedding;
  Status-Badge (Verarbeitung → bereit → fehlgeschlagen). PDFs bis **2000 Seiten** serverseitig.
- **Vorschau:** signierte URL im System-Viewer.
- **Ask AI über Dokumente:** semantische Suche (`search_vehicle_documents`) liefert Antworten
  mit **Zitat** (Titel + Seite).
- **Strukturierte Extraktion (Phase 3):** Bei `registration`-Dokumenten extrahiert ein
  zweiter LLM-Aufruf VIN, Kennzeichen, Marke, Modell, Jahr, Erstzulassung; ein Banner schlägt
  vor, das Fahrzeugprofil zu aktualisieren.
- **Geführte Slots (ADR-049):** Karten für **Zulassung**, **aktuelle Versicherungspolice** und
  **Kaufvertrag**.
  - **Versicherung (ADR-050/051):** eigener Hub mit Scan, Verarbeitung, bearbeitbarem Formular;
    Speichern → `vehicle_insurance_policies`; `vehicles.insurance_expiry` wird per DB-Trigger
    gesetzt.
  - **Kaufvertrag (ADR-052):** gleicher Hub; Speichern erfordert bestätigtes Kaufdatum →
    `vehicle_purchase_contracts`.
- **Limits:** max. 4 aktive Dokumente/Fahrzeug, 100 MB/Datei; nur PDF und Bilder.

---

## 13. Fahrzeug aus Zulassungsdokument anlegen (ADR-043)

- Beim Hinzufügen eines Fahrzeugs: Banner **„Zulassungsdokument scannen"**.
- Foto/Datei → `extract-registration` (KI extrahiert Text + Struktur: VIN, Kennzeichen,
  Marke, Modell, Jahr, Erstzulassung, Typ, Hubraum, Farbe, Leistung).
- Formular wird vorausgefüllt; Nutzer prüft, korrigiert, ergänzt und speichert.
- Das gescannte Dokument wird als `registration`-Dokument in den Vault übernommen (für RAG/Ask).

---

## 14. Ereignis-Anhänge (ADR-028 / ADR-035)

- Dateien im privaten Bucket `event-attachments`; Kategorien: Tankbeleg, Werkstattrechnung,
  Bußgeld-Ticket, Versicherungspolice, KFZ-Steuer, Sonstiges.
- **OCR-Quelldatei** wird nach Bestätigung aus dem Temp-Bereich übernommen.
- **Anhang-Extraktion (ADR, `attachment-extract`):** nach Upload schreibt eine
  multimodale Extraktion `extracted_text`; aktualisiert das Suchdokument für Ask.
- Limits: max. 1 aktiver Anhang pro Ereignis-OCR-Pfad bzw. max. 3 Dateien, je 5 MB.

---

## 15. Einstellungen (FR-SETTINGS)

- **Name** ändern.
- **Bevorzugte Währung** (ISO 4217).
- **Assistenzsprache:** Italienisch, Deutsch, Englisch, Französisch, Spanisch.
- **CSV-Export:** alle Ereignisse über alle Fahrzeuge exportieren.
- **Abmelden.**
- **Assistent (KI):** Anbieter, Modell und Geräte-API-Schlüssel (BYOK) — sichtbar nur für
  Enterprise-Tier; bei Server-KI-Tiers ist der Abschnitt „KI im Plan enthalten".

---

## 16. Konto-Tarife & KI-Richtlinie (FR-SYSTEM, ADR-046 / ADR-025)

Tarif ist **kontobezogen** (`profiles.plan_key` → `plan_catalog`). Werte aus der
Produktionsmigration:

| Tarif | Eigene Garagen | Fahrzeuge/Garage | Teilen (Mitglieder) | Monatliches Server-KI-Kontingent |
|---|---|---|---|---|
| **Free** | 1 | 1 | nein | ~100.000 Completion-Tokens |
| **Basic** | 2 | 10 | bis 3 | ~500.000 Tokens |
| **Advanced** | 5 | 30 | bis 10 | ~2.000.000 Tokens |
| **Enterprise** | 20 | 100 | unbegrenzt | unbegrenzt (BYOK Workspace) |

**KI-Bereitstellung (ADR-025, revidiert):**
- **Free / Basic / Advanced:** **Server-KI** (Operator stellt Anthropic-Schlüssel bereit,
  Standardmodell `claude-sonnet-4-6`); der Client sendet **keinen** API-Schlüssel.
- **Enterprise:** `byok_workspace` — eigene Schlüssel/Workspace-Schlüssel.
- **Embeddings** sind immer serverseitig (OpenAI, nur für Vault-Suche).
- **Kontingent** zählt **Completion-Tokens** (Plan, Antwort, Vision, strukturierte Extraktion,
  Prompt-Vorschläge) — **nicht** Embeddings.
- **Free Vor-Fahrzeug-Phase:** Der Zulassungsscan beim **ersten** Fahrzeug zählt **nicht**
  zum Kontingent; das Monatsfenster startet beim ersten Fahrzeug.
- **Bei Erschöpfung:** Edge gibt `QUOTA_EXCEEDED` zurück; KI-Einstiege deaktiviert,
  aber **manuelle Formulareingabe bleibt** verfügbar.
- Nutzung wird im Workspace-Drawer angezeigt (verbraucht/Kontingent + Periodenende).
- **Keine In-App-Käufe / kein Stripe** in dieser Phase.

---

## 17. Systemregeln (FR-SYSTEM)

- **Datenisolierung** über Supabase RLS — kein Zugriff auf fremde Daten.
- **Soft Delete** überall — kein physisches `DELETE`.
- **Kein KI-getriggertes Speichern** — immer explizite Bestätigung.
- **Eine Garagenwährung** für Aggregate; Fremdwährung pro Ereignis mit Auto-FX.
- **Keine Push-Benachrichtigungen / Erinnerungen** in v1 (Fristen nur in der App sichtbar).
- **Keine In-App-Käufe / Premium-Stufen** in v1 (Tarife kontoseitig zugewiesen).
- **Internetverbindung erforderlich** — keine Offline-Produkt-UI (ADR-059).

---

## 18. KI-Schicht — Edge Functions (technisch)

Im Supabase-Backend implementierte serverseitige Funktionen:

| Edge Function | Zweck |
|---|---|
| `ocr-parse` | OCR aus Foto/PDF → Ereignisentwurf (multimodal, Vision) |
| `chat-collect` | Konversationelle Feldsammlung für den Insert-Chat |
| `chat-ask` | Ask-Q&A v2: Plan → Tools → Antwort |
| `ask-suggest-prompts` | Vorgeschlagene Fragen für den Ask-Einstieg |
| `confirm-event` | Speichert Ereignis + Satellitentabellen (Lese-/Analysemodell) |
| `document-process` | Vault-Verarbeitung: Textextraktion, Chunking, Embedding, Struktur-Extraktion |
| `extract-registration` | Strukturierte Extraktion aus dem Zulassungsdokument |
| `attachment-extract` | Textextraktion aus Ereignis-Anhängen |
| `fx-rate` | Wechselkursabruf für Mehrwährung |
| `garage-invite-notify` | Löst die deutsche Einladungs-E-Mail aus (Resend) |
| `garage-sharing-revoke-notify` | Löst die deutsche Widerrufs-E-Mail aus (Resend) |
| `insert-parse` | Legacy/Regression — **nicht** in der Produkt-UI (nur Smoke-Test) |

**Sicherheit:** Alle LLM-Funktionen prüfen die Nutzer-Sitzung; API-Schlüssel werden in Logs
redigiert; Nutzung wird in `llm_usage` protokolliert (ohne Prompts/Ausgaben/Schlüssel).

---

## 19. Technischer Stack

| Schicht | Technologie |
|---|---|
| Mobile Framework | **Expo SDK 54** + **React Native 0.81** |
| Sprache | **TypeScript** (strikt) |
| Navigation | **Expo Router v6** (dateibasiert, Auth-Guards, typisierte Routen) |
| Server-State | **TanStack Query v5** |
| Client-State | **Zustand v5** (mit Logger/Devtools-Middleware) |
| Validierung | **Zod v4** (Schema-first, `discriminatedUnion`, `safeParse`) |
| Backend | **Supabase** — PostgreSQL, Auth, **Row Level Security**, Edge Functions (Deno), Storage |
| Datenbank | **110 Migrationen** als maßgebliche Schema-Quelle |
| Sicherer Speicher | `expo-secure-store` (BYOK-Schlüssel pro Nutzer) |
| Spracherkennung | `expo-speech-recognition` (On-Device, nur Ask) |
| Kamera/Dateien | `expo-camera`, `expo-document-picker`, `expo-image-picker`, `expo-image-manipulator` |
| Embeddings/Vektor | OpenAI `text-embedding-3-small` (1536-dim) + **pgvector** |

---

## 20. Was ausdrücklich NICHT enthalten ist (v1)

- Social Login (Google, Apple)
- Beliebige Multi-Währungs-Wallets / nutzerdefinierte FX-Überschreibung
- Fahrzeug-Teilen zwischen einzelnen Nutzern (außerhalb von Garagen-Mitgliedschaften)
- Push-Benachrichtigungen / Service-Erinnerungen
- Import aus CSV / aus anderen Apps
- Inventarverwaltung (Nicht-Fahrzeug-Objekte)
- In-App-Premium-Käufe

---

## 21. Zusammenfassung der Alleinstellungsmerkmale

1. **Vier Eingabemethoden** (Formular, Foto, PDF, Chat) — immer mit menschlicher Bestätigung.
2. **Frag deine Daten** (Ask AI) — Antworten mit Zitaten aus Ereignissen **und** Dokumenten.
3. **Spracheingabe** im Ask-Modus.
4. **Document Vault mit RAG** — semantische Suche über Handbücher und Policen.
5. **Zulassungsscan** legt Fahrzeuge an; Versicherungs-/Kaufvertrags-Hubs extrahieren Daten.
6. **Mehrere Garagen mit Rollen** — ideal für Familien und Enthusiasten.
7. **Automatische Mehrwährung** mit Tageskurs.
8. **9 Ereignistypen** inkl. kostenfreier Notizen und Fahrtenbuch.
9. **Datenschutz durch Design** (RLS) und **CSV-Export** der eigenen Daten.
10. **Tarifabhängige Server-KI** mit transparentem Monatskontingent; manuelle Eingabe bleibt
    immer verfügbar.
```

