import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { buildNewsletterWelcomeEmail } from '@/lib/emails';
import { scoreSignals, SPAM_THRESHOLD } from '@/lib/spam';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (dbError) {
      console.error('Newsletter subscribe error:', dbError);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    // Send welcome email only for new subscribers that don't look like bots
    // (suspicious ones are still stored — just not emailed)
    if (isNew && spam.score < SPAM_THRESHOLD) {
      const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const welcome = buildNewsletterWelcomeEmail();

      resend.emails
        .send({
          from: `Aurelius Media <${fromAddress}>`,
          to: normalizedEmail,
          subject: welcome.subject,
          html: welcome.html,
        })
        .catch((err) => console.error('Newsletter welcome email failed:', err));
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
