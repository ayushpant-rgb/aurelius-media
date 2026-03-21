import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { buildConfirmationEmail, buildNotificationEmail } from '@/lib/emails';
import { Resend } from 'resend';
import type { CreateLeadPayload } from '@/types/lead';

const resend = new Resend(process.env.RESEND_API_KEY);

const VALID_SOURCES = ['service_hero', 'service_cta', 'contact', 'popup', 'ebook'] as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    // Popup leads require phone; all others require email
    if (body.source === 'popup') {
      if (!body.phone?.trim()) {
        return NextResponse.json(
          { error: 'Phone number is required.' },
          { status: 400 }
        );
      }
    } else {
      if (!body.email?.trim() || !isValidEmail(body.email)) {
        return NextResponse.json(
          { error: 'Please provide a valid email address.' },
          { status: 400 }
        );
      }
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('leads').insert({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      industry: body.industry?.trim() || null,
      budget: body.budget?.trim() || null,
      service_interest: body.service_interest?.trim() || null,
      message: body.message?.trim() || null,
      source: body.source,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    // Send emails (non-blocking — don't fail the response if emails fail)
    const emailData = {
      name: body.name.trim(),
      email: body.email.trim(),
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
    const emailPromises: Promise<unknown>[] = [];

    // Only send confirmation if we have an email address
    if (body.email?.trim()) {
      emailPromises.push(
        resend.emails.send({
          from: `Aurelius Media <${fromAddress}>`,
          to: body.email.trim(),
          subject: confirmation.subject,
          html: confirmation.html,
        }).catch((err) => console.error('Confirmation email failed:', err))
      );
    }

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
