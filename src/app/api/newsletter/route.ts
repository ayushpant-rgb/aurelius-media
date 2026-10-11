import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { buildNewsletterNotificationEmail, buildNewsletterWelcomeEmail } from '@/lib/emails';
import { scoreSignals, SPAM_THRESHOLD } from '@/lib/spam';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOT_SAVED_NOTE = 'NOT saved to Supabase (insert failed): this email is the only record of the sign-up.';

/** Resend reports API errors in the result rather than throwing; returns whether it was accepted. */
async function sendEmail(label: string, payload: Parameters<typeof resend.emails.send>[0]): Promise<boolean> {
  try {
    const { error } = await resend.emails.send(payload);
    if (error) {
      console.error(`${label} email failed:`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`${label} email failed:`, err);
    return false;
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { email, source, website, form_ts: formTs } = await request.json();

    // Honeypot filled → bot. Fake success, store nothing, send nothing.
    if (typeof website === 'string' && website.trim()) {
      return NextResponse.json({ success: true });
    }

    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const spam = scoreSignals({ email, website, formTs });
    const normalizedEmail = email.trim().toLowerCase();

    // Check if already subscribed (skip welcome email for returning subscribers)
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', normalizedEmail)
      .limit(1);

    const isNew = !existing || existing.length === 0;

    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        { email: normalizedEmail, source: source || 'unknown' },
        { onConflict: 'email' }
      );

    // A database outage must not lose the sign-up: it goes to NOTIFICATION_EMAIL instead.
    const savedToDb = !dbError;
    if (dbError) {
      console.error('Newsletter subscribe error (sign-up goes by email only):', dbError);
    }

    // Suspicious sign-ups are stored but never emailed (welcome or notification)
    if (spam.score >= SPAM_THRESHOLD) {
      if (!savedToDb) console.warn(`Newsletter sign-up NOT saved (DB down), dropped as spam (score ${spam.score})`);
      return NextResponse.json({ success: true });
    }

    const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    // Welcome only new subscribers (unknown when the DB is down, so they get it)
    const welcome = buildNewsletterWelcomeEmail();
    const alert = buildNewsletterNotificationEmail(
      { email: normalizedEmail, source: source || 'unknown' },
      NOT_SAVED_NOTE
    );
    const [, notified] = await Promise.all([
      isNew
        ? sendEmail('Newsletter welcome', {
            from: `Aurelius Media <${fromAddress}>`,
            to: normalizedEmail,
            subject: welcome.subject,
            html: welcome.html,
          })
        : Promise.resolve(false),
      !savedToDb && notificationEmail
        ? sendEmail('Newsletter notification', {
            from: `Aurelius Media <${fromAddress}>`,
            to: notificationEmail,
            subject: alert.subject,
            html: alert.html,
          })
        : Promise.resolve(false),
    ]);

    if (!savedToDb && !notified) {
      console.error('NEWSLETTER SIGN-UP LOST (not saved, notification not sent):', normalizedEmail, source || 'unknown');
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
