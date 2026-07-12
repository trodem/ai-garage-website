# Supabase Auth email templates (operator)

Auth emails (**Confirm signup**, **Reset password**, …) are sent by **Supabase Auth**, not by the Resend garage-invite pipeline.

## Reset password (styled)

1. Source component: [`AuthPasswordRecoveryEmail.tsx`](../emails/AuthPasswordRecoveryEmail.tsx) (uses `GarIqEmailLayout`).
2. Paste HTML from [`emails/auth-password-recovery.dashboard.html`](../emails/auth-password-recovery.dashboard.html) into Dashboard → **Authentication → Email Templates → Reset password** (or re-render from `AuthPasswordRecoveryEmail.tsx` if you change styling).
3. Confirm the button href is exactly `{{ .ConfirmationURL }}`.
4. **URL Configuration**: Redirect URLs must include `https://gariq.app/auth/callback`. Site URL may remain `https://gariq.app`.
5. Set Vercel env `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same values as the mobile app `EXPO_PUBLIC_*`).
6. After deploying app + website, request a **new** reset email and verify the verify URL contains `redirect_to=https://gariq.app/auth/callback`.
