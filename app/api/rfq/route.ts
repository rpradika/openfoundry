import { Resend } from "resend";
import { rfqSchema } from "@/lib/rfq-schema";

export const runtime = "nodejs";

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = rfqSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RFQ_TO_EMAIL;
  const from = process.env.RFQ_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("RFQ: missing RESEND_API_KEY, RFQ_TO_EMAIL, or RFQ_FROM_EMAIL");
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const { name, email, company, phone, project } = parsed.data;
  const subject = `RFQ — ${company}`;
  const html = `
    <p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
    <p><strong>Company:</strong> ${escape(company)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escape(phone)}</p>` : ""}
    <p><strong>Project:</strong></p>
    <p style="white-space:pre-wrap">${escape(project)}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
    });
    if (error) {
      console.error("RFQ: Resend error", error);
      return Response.json({ error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("RFQ: send threw", err);
    return Response.json({ error: "Send failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
