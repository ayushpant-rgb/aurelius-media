import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { buildConfirmationEmail, buildNotificationEmail } from '@/lib/emails';
import { assessSubmission, normalizeEmail } from '@/lib/spam';
import { Resend } from 'resend';
import type { CreateLeadPayload } from '@/types/lead';

const resend = new Resend(process.env.RESEND_API_KEY);

const VALID_SOURCES = ['service_hero', 'service_cta', 'contact', 'popup', 'ebook'] as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip');
}

/** Pre-spam-migration rows/columns may not exist yet; detect and fall back. */
function isMissingColumnError(error: { code?: string; message?: string }): boolean {
  return error.code === 'PGRST204' || error.code === '42703' || /column/i.test(error.message || '');
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateLeadPayload = await request.json();

    // Validate required fields
    if (!body.name?.trim() || !body.source) {
      return NextResponse.json(
        { error: 'Name and source are required.' },
        { status: 400 }
      );
    }

    if (!VALID_SOURCES.includes(body.source)) {
      return NextResponse.json(
        { error: 'Invalid source.' },
        { status: 400 }
      );
    }

    // All sources require a valid email
    if (!body.email?.trim() || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const email = body.email.trim();
    const emailNormalized = normalizeEmail(email);
    const ip = getClientIp(request);

    // Recent-activity lookups for velocity scoring and duplicate suppression.
    // Both queries tolerate a pre-migration database (missing columns → empty).
    const dayAgo = new Date(Date.now() - 24 * 3600_000).toISOString();
    const hourAgo = new Date(Date.now() - 3600_000).toISOString();

    const [emailHistory, ipHistory] = await Promise.all([
      supabase
        .from('leads')
        .select('source')
        .eq('email_normalized', emailNormalized)
        .gte('created_at', dayAgo)
        .then((res) => (res.error ? [] : res.data ?? [])),
      ip
        ? supabase
            .from('leads')
            .select('id', { count: 'exact', head: true })
            .eq('ip', ip)
            .gte('created_at', hourAgo)
            .then((res) => (res.error ? 0 : res.count ?? 0))
        : Promise.resolve(0),
    ]);

    const assessment = assessSubmission(
      {
        name: body.name,
        email,
        message: body.message,
        website: body.website,
        formTs: body.form_ts,
      },
      {
        sameEmailRecently: emailHistory.length,
        sameIpRecently: ipHistory,
      }
    );

    // Same person re-submitting the same form within 24h: store it, but don't
    // email again — bots burst 3-6 identical submissions per minute.
    const isDuplicate = emailHistory.some((row) => row.source === body.source);

    // Insert into Supabase — always, spam included (quarantine, never drop)
    const leadRow = {
      name: body.name.trim(),
      email,
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      industry: body.industry?.trim() || null,
      budget: body.budget?.trim() || null,
      service_interest: body.service_interest?.trim() || null,
      message: body.message?.trim() || null,
      source: body.source,
    };

    let { error: dbError } = await supabase.from('leads').insert({
      ...leadRow,
      is_spam: assessment.isSpam,
      spam_score: assessment.score,
      spam_reasons: assessment.reasons,
      ip,
      email_normalized: emailNormalized,
    });

    // If the spam-filter migration hasn't run yet, retry without the new columns
    if (dbError && isMissingColumnError(dbError)) {
      console.warn('Spam columns missing — run scripts/supabase-migration-spam-filter.sql. Falling back to legacy insert.');
      ({ error: dbError } = await supabase.from('leads').insert(leadRow));
    }

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    // Spam: quarantined in the DB, no emails, and a normal success response so
    // bots can't tell they were caught. Duplicates: stored but not re-emailed.
    if (assessment.isSpam || isDuplicate) {
      if (assessment.isSpam) {
        console.warn(`Lead quarantined as spam (score ${assessment.score}): ${assessment.reasons.join(', ')}`);
      }
      return NextResponse.json({ success: true });
    }

    // Send emails (non-blocking — don't fail the response if emails fail)
    const emailData = {
      name: body.name.trim(),
      email,
      phone: body.phone?.trim(),
      company: body.company?.trim(),
      industry: body.industry?.trim(),
      budget: body.budget?.trim(),
      service_interest: body.service_interest?.trim(),
      message: body.message?.trim(),
      source: body.source,
    };

    const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    const confirmation = buildConfirmationEmail(emailData);
    const notification = buildNotificationEmail(emailData);

    // Fire emails concurrently, catch errors individually
    const emailPromises: Promise<unknown>[] = [
      resend.emails.send({
        from: `Aurelius Media <${fromAddress}>`,
        to: email,
        subject: confirmation.subject,
        html: confirmation.html,
      }).catch((err) => console.error('Confirmation email failed:', err)),
    ];

    if (notificationEmail) {
      emailPromises.push(
        resend.emails.send({
          from: `Aurelius Media <${fromAddress}>`,
          to: notificationEmail,
          subject: notification.subject,
          html: notification.html,
        }).catch((err) => console.error('Notification email failed:', err))
      );
    }

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
