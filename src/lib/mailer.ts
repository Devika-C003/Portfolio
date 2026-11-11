import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

export class MailerConfigError extends Error {}

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    throw new MailerConfigError("SMTP_USER and SMTP_PASS must be set (see .env.example).");
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strip CR/LF so user input can never inject extra mail headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

export async function sendContactEmail(msg: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const tx = getTransporter();
  const from = process.env.SMTP_USER!;
  const to = process.env.CONTACT_TO || from;
  const subject = oneLine(`Portfolio contact: ${msg.subject || `message from ${msg.name}`}`);

  await tx.sendMail({
    // Gmail only lets you send as yourself; the visitor goes in Reply-To
    from: { name: "Portfolio Contact Form", address: from },
    to,
    replyTo: { name: oneLine(msg.name), address: msg.email },
    subject,
    text: `Name: ${msg.name}\nEmail: ${msg.email}\nSubject: ${msg.subject || "-"}\n\n${msg.message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#1a2433">
        <h2 style="margin:0 0 12px">New message from your portfolio</h2>
        <p style="margin:0"><strong>Name:</strong> ${escapeHtml(msg.name)}</p>
        <p style="margin:0"><strong>Email:</strong> <a href="mailto:${escapeHtml(msg.email)}">${escapeHtml(msg.email)}</a></p>
        <p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(msg.subject || "-")}</p>
        <div style="white-space:pre-wrap;padding:14px 16px;border-left:4px solid #1f4e79;background:#f6f7f9">${escapeHtml(msg.message)}</div>
        <p style="margin-top:16px;color:#5f6b7a;font-size:13px">Hit “Reply” to answer ${escapeHtml(msg.name)} directly.</p>
      </div>`,
  });
}
