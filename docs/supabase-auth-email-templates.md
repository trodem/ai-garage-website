# Supabase Auth email templates (operator)

Auth emails (**Confirm signup**, **Reset password**, …) are sent by **Supabase Auth**, not by the Resend garage-invite pipeline.

**Local preview:** open [`emails/preview-brand.html`](../emails/preview-brand.html) in a browser (all templates, relative logo path). Do not paste that file into the Dashboard.

Shared chrome: [`GarIqEmailLayout.tsx`](../emails/GarIqEmailLayout.tsx) + [`emailBrand.ts`](../emails/emailBrand.ts) (logo lockup, slogan *Snap it. Scan it. Ask GarIQ.*, indigo/cyan/pink bar, solid cyan CTA `#08A7DE`). Same layout is used by garage-invite and vehicle-cession Resend mail.

## Confirm signup (styled)

1. Source component: [`AuthConfirmSignupEmail.tsx`](../emails/AuthConfirmSignupEmail.tsx).
2. Paste HTML from [`emails/auth-confirm-signup.dashboard.html`](../emails/auth-confirm-signup.dashboard.html) into Dashboard → **Authentication → Email Templates → Confirm signup**.
3. Confirm the button href is exactly `{{ .ConfirmationURL }}`.

## Reset password (styled)

1. Source component: [`AuthPasswordRecoveryEmail.tsx`](../emails/AuthPasswordRecoveryEmail.tsx).
2. Paste HTML from [`emails/auth-password-recovery.dashboard.html`](../emails/auth-password-recovery.dashboard.html) into Dashboard → **Authentication → Email Templates → Reset password**.
3. Confirm the button href is exactly `{{ .ConfirmationURL }}`.

## After both templates

4. **URL Configuration**: Redirect URLs must include `https://gariq.app/auth/callback`. Site URL may remain `https://gariq.app`.
5. Set Vercel env `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same values as the mobile app `EXPO_PUBLIC_*`).
6. After deploying app + website, request a **new** confirm-signup email and a **new** reset email. Verify each verify URL contains `redirect_to=https://gariq.app/auth/callback` and that the logo loads (not a broken image).
