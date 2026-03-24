interface LeadEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  budget?: string;
  service_interest?: string;
  message?: string;
  source: string;
}

export function buildConfirmationEmail(data: LeadEmailData): { subject: string; html: string } {
  const isPopup = data.source === 'popup';

  const subject = isPopup
    ? `${data.name}, your application is under review — Aurelius Media`
    : 'Thanks for reaching out — Aurelius Media';

  const serviceText = data.service_interest
    ? ` about <strong>${data.service_interest}</strong>`
    : '';

  const headlineText = isPopup
    ? `Your application is under review.`
    : `Thanks for reaching out, ${data.name}!`;

  const bodyText = isPopup
    ? `We take on a limited number of clients each quarter to ensure every partnership gets the attention it deserves. Our team is reviewing your details now &mdash; if there&rsquo;s a fit, you&rsquo;ll hear from us within 24 hours.`
    : `We received your inquiry${serviceText} and our team will review it shortly. Expect to hear from us within 24 hours.`;

  return {
    subject,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0B0B0D;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:560px;margin:0 auto;padding:48px 24px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:36px;">
      <img src="https://www.aureliusmedia.co/logo.png" alt="Aurelius Media" width="56" height="56" style="display:inline-block;border-radius:12px;" />
    </div>

    <!-- Card -->
    <div style="background:#131316;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:36px 32px;">

      <!-- Greeting -->
      <p style="color:rgba(255,255,255,0.5);font-size:13px;letter-spacing:0.05em;text-transform:uppercase;margin:0 0 8px;font-weight:600;">
        Hi ${data.name},
      </p>

      <!-- Headline -->
      <h1 style="color:#FFFFFF;font-size:22px;font-weight:700;margin:0 0 20px;line-height:1.3;">
        ${headlineText}
      </h1>

      <!-- Body -->
      <p style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.75;margin:0 0 28px;">
        ${bodyText}
      </p>

      <!-- Divider -->
      <div style="border-top:1px solid rgba(255,255,255,0.06);margin:0 0 28px;"></div>

      <!-- CTA Section -->
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0 0 16px;font-weight:600;letter-spacing:0.03em;">
        WANT TO SKIP THE WAIT?
      </p>
      <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;margin:0 0 20px;">
        Book a free 15-minute strategy call and let&rsquo;s talk about what growth looks like for your business.
      </p>
      <a href="https://cal.com/aureliusmedia/15min"
         style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#FF6B2B 0%,#E8550F 100%);color:#FFFFFF;text-decoration:none;border-radius:12px;font-weight:600;font-size:14px;letter-spacing:0.02em;">
        Book a Strategy Call &rarr;
      </a>

    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;">
      <p style="color:rgba(255,255,255,0.25);font-size:12px;line-height:1.6;margin:0;">
        Aurelius Media &middot; AI-Powered Performance Marketing<br/>
        $15M+ in ad spend managed across 25+ countries
      </p>
    </div>

  </div>
</body>
</html>`.trim(),
  };
}

export function buildNewsletterWelcomeEmail(): { subject: string; html: string } {
  return {
    subject: 'Welcome to the Aurelius newsletter',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0B0B0D;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="margin-bottom:32px;">
      <strong style="color:#FFFFFF;font-size:18px;">AURELIUS MEDIA</strong>
    </div>
    <h1 style="color:#FFFFFF;font-size:24px;margin:0 0 16px;">
      You&rsquo;re in. Welcome aboard.
    </h1>
    <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.7;margin:0 0 16px;">
      Thanks for subscribing to the Aurelius newsletter. Every week, you&rsquo;ll get
      actionable insights on performance marketing, AI-powered growth strategies,
      and the tactics we use to scale brands across 25+ countries.
    </p>
    <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.7;margin:0 0 24px;">
      While you&rsquo;re here &mdash; want a free audit of your current marketing setup?
    </p>
    <a href="https://cal.com/aureliusmedia/15min"
       style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#FF6B2B,#E8550F);color:#FFFFFF;text-decoration:none;border-radius:20px;font-weight:600;font-size:14px;">
      Book a Free Strategy Call &rarr;
    </a>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;" />
    <p style="color:rgba(255,255,255,0.38);font-size:12px;margin:0;">
      Aurelius Media &middot; AI-Powered Performance Marketing<br/>
      You&rsquo;re receiving this because you subscribed at aureliusmedia.co
    </p>
  </div>
</body>
</html>`.trim(),
  };
}

export function buildNotificationEmail(data: LeadEmailData): { subject: string; html: string } {
  const title = data.service_interest || data.source;

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Company', data.company],
    ['Industry', data.industry],
    ['Budget', data.budget],
    ['Service Interest', data.service_interest],
    ['Source', data.source],
    ['Message', data.message],
  ]
    .filter(([, val]) => val)
    .map(
      ([label, val]) =>
        `<tr><td style="padding:8px 12px;color:rgba(255,255,255,0.5);font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:8px 12px;color:#FFFFFF;font-size:14px;">${val}</td></tr>`
    )
    .join('');

  return {
    subject: `New Lead: ${data.name} — ${title}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0B0B0D;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <h1 style="color:#FF7A3D;font-size:20px;margin:0 0 24px;">New Lead Received</h1>
    <table style="width:100%;border-collapse:collapse;background:#131316;border-radius:12px;overflow:hidden;">
      ${rows}
    </table>
    <p style="color:rgba(255,255,255,0.38);font-size:12px;margin:24px 0 0;">
      ${new Date().toISOString()}
    </p>
  </div>
</body>
</html>`.trim(),
  };
}
