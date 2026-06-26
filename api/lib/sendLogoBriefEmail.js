import { Resend } from "resend";

import { buildPdfFilename } from "./logoBriefPdf.js";

export async function sendLogoBriefEmail({ data, pdfBytes }) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LOGO_BRIEF_RECIPIENT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "Travis Crawford Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!recipient) {
    throw new Error("LOGO_BRIEF_RECIPIENT_EMAIL is not configured.");
  }

  const resend = new Resend(apiKey);
  const filename = buildPdfFilename(data);
  const clientName = data.fullName?.trim() || "A client";
  const company = data.company?.trim() || "Unknown company";

  const { error } = await resend.emails.send({
    from,
    to: [recipient],
    replyTo: data.email,
    subject: `New Logo Brief — ${company} (${clientName})`,
    html: `
      <div style="font-family:Helvetica,Arial,sans-serif;color:#111111;line-height:1.5;">
        <p><strong>New logo questionnaire submission</strong></p>
        <p><strong>Client:</strong> ${clientName}<br/>
        <strong>Company:</strong> ${company}<br/>
        <strong>Email:</strong> ${data.email}</p>
        <p>The branded PDF summary is attached.</p>
      </div>
    `,
    attachments: [
      {
        filename,
        content: Buffer.from(pdfBytes),
      },
    ],
  });

  if (error) {
    throw new Error(error.message || "Failed to send logo brief email.");
  }

  return { filename };
}
