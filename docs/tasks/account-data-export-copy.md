# Account data export — site copy

Linked app brief: `D:\031_GarIQ\031_ai_garage_app\docs\tasks\account-data-export.md`

## Goal
Say on gariq.app what the app download does after that brief. Do not invent a second download.

## First line of work
Fresh-read `plan_catalog.timeline_export_enabled` and report VERIFICATO per `plan_key` before editing copy. On 2026-10-05 the app brief read production `inkbjwavlxiiptvhnelc` as true for `basic`, `advanced`, and `development`, and false for `free`. If the new read differs, the site names the public keys only. The internal `development` plan is never named on gariq.app. Year export is called Basic and Advanced when those keys are enabled.

## What the app shipped
Settings → Data, on every plan. Confirm, then a wait, then the system share sheet. The file is a zip of the logbook: JSON plus the live files. A cut download is not shared. Three completed zips per UTC day, and at least 15 minutes between them. The Timeline year CSV/PDF stays the separate `timeline_export_enabled` gate.

## Do not
Do not describe a JSON-only download. Do not name the internal `development` plan on the public site. Public year-export copy names Basic and Advanced only.

## Read
VERIFICATO 2026-10-05 on production `inkbjwavlxiiptvhnelc` (`gariq-production`): `timeline_export_enabled` is true for `basic`, `advanced`, and `development`, and false for `free`. Same keys as the app brief.

## Copy
`messages/{en,it,de}.json` now say the Settings → Data download is one zip (JSON plus the files still stored) on every plan: confirm, wait, share sheet; a cut download is not shared; three completed zips per UTC day and at least 15 minutes between them. Timeline year CSV/PDF stays the separate gate and names Basic and Advanced, not Free. The internal `development` plan is not named on the public site. The Basic plan bullet “PDF or CSV” is that year export, not a second download.
