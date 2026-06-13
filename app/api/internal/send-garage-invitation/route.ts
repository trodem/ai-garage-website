import { GarageInvitationEmail } from '@/emails/GarageInvitationEmail';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const bodySchema = z.object({
  to: z.string().email(),
  garageName: z.string().min(1).max(200),
  inviterDisplayName: z.string().min(1).max(200),
  roleLabel: z.string().min(1).max(80),
  ctaUrl: z.string().url().optional(),
});

function readBearerSecret(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    return null;
  }
  return header.slice('Bearer '.length).trim() || null;
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

  const { to, garageName, inviterDisplayName, roleLabel, ctaUrl } = parsed.data;

  const html = await render(
    GarageInvitationEmail({
      inviteeEmail: to,
      garageName,
      inviterDisplayName,
      roleLabel,
      ctaUrl,
    }),
  );

  const subject = `Einladung zum Garagen-Workspace „${garageName}“`;

  const resend = new Resend(resendKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('resend_send_garage_invitation_failed', {
      message: error.message,
      name: error.name,
    });
    return NextResponse.json(
      { error: 'Failed to send email', detail: error.message },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
