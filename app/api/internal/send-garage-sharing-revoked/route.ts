import {
  GarageSharingRevokedEmail,
  type GarageSharingRevokedKind,
} from '@/emails/GarageSharingRevokedEmail';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const bodySchema = z.object({
  to: z.string().email(),
  kind: z.enum(['pending_invitation', 'member_access']),
  garageName: z.string().min(1).max(200),
  actorDisplayName: z.string().min(1).max(200),
  roleLabel: z.string().min(1).max(80).optional(),
  ctaUrl: z.string().url().optional(),
});

function readBearerSecret(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    return null;
  }
  return header.slice('Bearer '.length).trim() || null;
}

function subjectFor(kind: GarageSharingRevokedKind, garageName: string): string {
  if (kind === 'pending_invitation') {
    return `Einladung zu „${garageName}“ zurückgezogen`;
  }
  return `Zugriff auf „${garageName}“ entfernt`;
}

export async function POST(request: Request) {
  const expectedSecret = process.env.GARAGE_INVITE_INTERNAL_SECRET;
  if (!expectedSecret || expectedSecret.length < 16) {
    return NextResponse.json(
      { error: 'Server misconfigured: missing invite email secret.' },
      { status: 500 },
    );
  }

  const token = readBearerSecret(request);
  if (token !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.GARAGE_INVITE_EMAIL_FROM;
  if (!resendKey || !from) {
    return NextResponse.json(
      { error: 'Server misconfigured: missing Resend configuration.' },
      { status: 500 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { to, kind, garageName, actorDisplayName, roleLabel, ctaUrl } = parsed.data;

  const html = await render(
    GarageSharingRevokedEmail({
      kind,
      recipientEmail: to,
      garageName,
      actorDisplayName,
      roleLabel,
      ctaUrl,
    }),
  );

  const resend = new Resend(resendKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: subjectFor(kind, garageName),
    html,
  });

  if (error) {
    console.error('resend_send_garage_sharing_revoked_failed', {
      message: error.message,
      name: error.name,
      kind,
    });
    return NextResponse.json(
      { error: 'Failed to send email', detail: error.message },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
