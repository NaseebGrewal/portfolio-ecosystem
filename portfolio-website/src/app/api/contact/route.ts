import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

// RFC 5322 Compliant Email Regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

interface EmailPayload {
  referenceId: string;
  senderEmail: string;
  senderName?: string;
  organization?: string;
  recipientEmail: string;
  topic: string;
  message: string;
  timestamp: string;
}

function generateExecutiveHtmlTemplate({
  referenceId,
  senderEmail,
  senderName,
  organization,
  topic,
  message,
  timestamp,
}: EmailPayload): string {
  const formattedDate = new Date(timestamp).toUTCString();
  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  const senderDisplay = senderName
    ? organization
      ? `${senderName} &bull; <span style="color: #94a3b8; font-weight: normal;">${organization}</span>`
      : senderName
    : organization
    ? organization
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Executive Portfolio Inquiry: ${topic}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c1220; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 28px 32px; border-bottom: 1px solid #1e293b; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 9999px; color: #38bdf8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .title { color: #ffffff; font-size: 20px; font-weight: 800; margin: 0; line-height: 1.3; }
    .body-content { padding: 32px; }
    .meta-grid { background: #0b0f19; border: 1px solid #1f2937; border-radius: 12px; padding: 18px; margin-bottom: 24px; }
    .meta-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
    .meta-row:last-child { margin-bottom: 0; }
    .meta-label { color: #94a3b8; font-weight: 500; }
    .meta-value { color: #f8fafc; font-weight: 600; }
    .meta-value a { color: #60a5fa; text-decoration: none; font-family: monospace; }
    .message-box { background: #172033; border-left: 4px solid #3b82f6; border-radius: 0 12px 12px 0; padding: 20px; color: #f1f5f9; font-size: 14px; line-height: 1.7; margin-bottom: 24px; }
    .footer { padding: 20px 32px; background: #0b0f19; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }
    .reply-hint { display: inline-block; margin-top: 8px; color: #38bdf8; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Direct Executive Portal</div>
      <h1 class="title">New Direct Inquiry: ${topic}</h1>
    </div>
    <div class="body-content">
      <div class="meta-grid">
        ${
          senderDisplay
            ? `<div class="meta-row">
          <span class="meta-label">Sender Identity:</span>
          <span class="meta-value">${senderDisplay}</span>
        </div>`
            : ""
        }
        <div class="meta-row">
          <span class="meta-label">Sender Email:</span>
          <span class="meta-value"><a href="mailto:${senderEmail}">${senderEmail}</a></span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Discussion Topic:</span>
          <span class="meta-value" style="color: #38bdf8;">${topic}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Reference ID:</span>
          <span class="meta-value" style="font-family: monospace;">${referenceId}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Transmitted At:</span>
          <span class="meta-value" style="font-size: 11px; font-family: monospace;">${formattedDate}</span>
        </div>
      </div>

      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 8px;">Inquiry Content:</div>
      <div class="message-box">
        ${escapedMessage}
      </div>

      <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 12px; font-size: 12px; color: #86efac; text-align: center;">
        ⚡ <strong>1-Click Direct Reply Enabled:</strong> Simply click "Reply" in your email client to respond directly to <strong>${senderEmail}</strong>.
      </div>
    </div>
    <div class="footer">
      <div>Executive AI Portfolio Ecosystem • Enterprise Contact Gateway</div>
      <div class="reply-hint">Reply-To header configured to: ${senderEmail}</div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload. JSON body expected." },
        { status: 400 }
      );
    }

    const { email, senderName, organization, topic, customTopic, message } = body;

    // Validate email
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 422 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanSenderName = typeof senderName === "string" ? senderName.trim() : undefined;
    const cleanOrg = typeof organization === "string" ? organization.trim() : undefined;

    // Validate topic
    const finalTopic = (topic === "Other / Custom Topic" && customTopic ? customTopic : topic) || "General Inquiry";
    if (!finalTopic || typeof finalTopic !== "string" || finalTopic.trim().length === 0) {
      return NextResponse.json(
        { error: "Please select or provide a discussion topic." },
        { status: 422 }
      );
    }

    // Validate message
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 422 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message exceeds 5,000 character limit." },
        { status: 422 }
      );
    }

    const cleanMessage = message.trim();
    const cleanTopic = finalTopic.trim();

    // Target recipient from environment
    const recipientEmail =
      process.env.NEXT_PUBLIC_CANDIDATE_EMAIL ||
      process.env.CANDIDATE_EMAIL ||
      "naseebgrewal44@gmail.com";

    // Structured audit reference
    const referenceId = `INQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const senderIdentifier = cleanSenderName && cleanOrg
      ? `${cleanSenderName} (${cleanOrg})`
      : cleanSenderName
      ? `${cleanSenderName} <${cleanEmail}>`
      : cleanOrg
      ? `${cleanOrg} <${cleanEmail}>`
      : cleanEmail;

    const subject = `[Executive Inquiry] ${cleanTopic} from ${senderIdentifier}`;
    const htmlBody = generateExecutiveHtmlTemplate({
      referenceId,
      senderEmail: cleanEmail,
      senderName: cleanSenderName,
      organization: cleanOrg,
      recipientEmail,
      topic: cleanTopic,
      message: cleanMessage,
      timestamp,
    });

    const plainTextBody = `New Executive Portfolio Inquiry:
Reference ID: ${referenceId}
${cleanSenderName ? `Sender Name: ${cleanSenderName}\n` : ""}${cleanOrg ? `Organization: ${cleanOrg}\n` : ""}Sender Email: ${cleanEmail}
Topic: ${cleanTopic}
Timestamp: ${timestamp}

Message:
${cleanMessage}

---
Reply directly to this email to contact ${cleanEmail}.`;

    let deliveryProvider = "none";
    let deliverySuccess = false;
    let providerDetails = "";

    // 1. PRIMARY DISPATCHER: Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && resendApiKey.trim().length > 0) {
      try {
        console.log(`[CONTACT_API] Initiating Resend dispatch with key: ${resendApiKey.slice(0, 7)}...`);
        const resend = new Resend(resendApiKey.trim());
        
        // Determine from address based on verified domain or default fallback
        const customFrom = process.env.RESEND_FROM_EMAIL?.trim();
        const fromAddress = customFrom && customFrom.length > 0
          ? customFrom
          : "Executive AI Portfolio <onboarding@resend.dev>";

        console.log(`[CONTACT_API] Resend sending from: "${fromAddress}" to: "${recipientEmail}" (replyTo: "${cleanEmail}")`);

        const resendResponse = await resend.emails.send({
          from: fromAddress,
          to: [recipientEmail],
          replyTo: cleanEmail,
          subject: subject,
          text: plainTextBody,
          html: htmlBody,
        });

        console.log(`[CONTACT_API] Resend response received:`, JSON.stringify(resendResponse));

        if (resendResponse.error) {
          console.error("[CONTACT_API] Resend API error:", resendResponse.error);
          throw new Error(resendResponse.error.message);
        }

        deliveryProvider = "resend";
        deliverySuccess = true;
        providerDetails = `Resend Message ID: ${resendResponse.data?.id || "ok"}`;
        console.log(`[CONTACT_API] Email successfully dispatched via Resend (${providerDetails})`);
      } catch (resendErr: unknown) {
        const errStr = resendErr instanceof Error ? resendErr.message : String(resendErr);
        console.warn("[CONTACT_API] Resend delivery attempt error:", errStr);
      }
    }

    // 2. SECONDARY DISPATCHER: Google / Custom TLS SMTP (Nodemailer)
    if (!deliverySuccess && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Boolean(Number(process.env.SMTP_PORT) === 465 || !process.env.SMTP_PORT),
          auth: {
            user: process.env.SMTP_USER || recipientEmail,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `Executive Portfolio <${process.env.SMTP_USER || recipientEmail}>`,
          to: recipientEmail,
          replyTo: cleanEmail,
          subject: subject,
          text: plainTextBody,
          html: htmlBody,
        });

        deliveryProvider = "smtp";
        deliverySuccess = true;
        console.log("[CONTACT_API] Email successfully dispatched via direct TLS SMTP");
      } catch (smtpErr: unknown) {
        const errStr = smtpErr instanceof Error ? smtpErr.message : String(smtpErr);
        console.error("[CONTACT_API] SMTP dispatch failed:", errStr);
      }
    }

    // Structured Audit Logging
    console.log(`[CONTACT_SUBMISSION] Reference: ${referenceId} | Provider: ${deliveryProvider} | To: ${recipientEmail} | From: ${cleanEmail} | Topic: ${cleanTopic}`);

    return NextResponse.json(
      {
        success: true,
        referenceId,
        topic: cleanTopic,
        timestamp,
        provider: deliveryProvider,
        message: "Your inquiry has been successfully transmitted. You will receive a direct executive response shortly.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[CONTACT_API_ERROR]", errorMsg);
    return NextResponse.json(
      { error: "An unexpected error occurred while transmitting your message. Please try again." },
      { status: 500 }
    );
  }
}
