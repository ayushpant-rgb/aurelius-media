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
  const serviceText = data.service_interest
    ? ` about <strong>${data.service_interest}</strong>`
    : '';

  return {
    subject: 'Thanks for reaching out — Aurelius Media',
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
      Thanks for reaching out, ${data.name}!
    </h1>
    <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.7;margin:0 0 16px;">
      We received your inquiry${serviceText} and our team will review it shortly.
      Expect to hear from us within 24 hours.
    </p>
    <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.7;margin:0 0 24px;">
      Want to skip the wait? Book a free 15-minute strategy call right now:
    </p>
    <a href="https://cal.com/aureliusmedia/15min"
       style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#FF6B2B,#E8550F);color:#FFFFFF;text-decoration:none;border-radius:20px;font-weight:600;font-size:14px;">
      Book a Strategy Call →
    </a>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;" />
    <p style="color:rgba(255,255,255,0.38);font-size:12px;margin:0;">
      Aurelius Media · AI-Powered Performance Marketing
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
