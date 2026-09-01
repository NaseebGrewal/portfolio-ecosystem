import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

// RFC 5322 Compliant Email Regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Escape arbitrary user input before HTML interpolation (XSS / markup-injection guard)
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Server-side allowlists for qualifier selects (client constraints are not a security boundary)
const ALLOWED_ROLES = new Set([
  "Recruiter / Talent Partner",
  "Hiring Manager / CTO",
  "Founder / Executive",
  "Engineering Peer",
  "Other",
]);
const ALLOWED_BUDGETS = new Set([
  "Full-time role (N/A)",
  "Under €10k",
  "€10k – €50k",
  "€50k – €150k",
  "€150k+",
  "To be scoped",
]);
const ALLOWED_TIMELINES = new Set([
  "Immediate",
  "This quarter",
  "Next 6 months",
  "Exploring / no fixed date",
]);

// Lightweight per-IP sliding-window rate limiter (per serverless instance; best-effort).
// Guards Resend quota spend & prevents the confirmation email from being used as an open relay.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max submissions per IP per window
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (rateLimitStore.get(ip) ?? []).filter((t) => t > windowStart);
  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateLimitStore.set(ip, hits);
  // Prevent unbounded memory growth across long-lived instances
  if (rateLimitStore.size > 5000) {
    for (const [key, timestamps] of rateLimitStore) {
      if (timestamps.every((t) => t <= windowStart)) rateLimitStore.delete(key);
    }
  }
  return false;
}

interface EmailPayload {
  referenceId: string;
  senderEmail: string;
  senderName?: string;
  organization?: string;
  senderRole?: string;
  budgetRange?: string;
  timeline?: string;
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
  senderRole,
  budgetRange,
  timeline,
  topic,
  message,
  timestamp,
}: EmailPayload): string {
  const formattedDate = new Date(timestamp).toUTCString();
  const safeTopic = escapeHtml(topic);
  const safeSenderEmail = escapeHtml(senderEmail);
  const safeReferenceId = escapeHtml(referenceId);
  const safeSenderName = senderName ? escapeHtml(senderName) : undefined;
  const safeOrganization = organization ? escapeHtml(organization) : undefined;
  const contextValues = [senderRole, budgetRange, timeline].filter(
    (value): value is string => typeof value === "string" && value.length > 0
  );
  const safeContext = contextValues.map(escapeHtml).join(" &bull; ");
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  const senderDisplay = safeSenderName
    ? safeOrganization
      ? `${safeSenderName} &bull; <span style="color: #94a3b8; font-weight: normal;">${safeOrganization}</span>`
      : safeSenderName
    : safeOrganization
    ? safeOrganization
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Portfolio Message: ${safeTopic}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1f2937; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
    .header { background: #ffffff; padding: 24px 32px; border-bottom: 1px solid #e5e7eb; }
    .badge { display: inline-block; padding: 3px 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 9999px; color: #1d4ed8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px; }
    .title { color: #111827; font-size: 19px; font-weight: 700; margin: 0; line-height: 1.35; }
    .body-content { padding: 28px 32px; }
    .meta-grid { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px; }
    .meta-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
    .meta-row:last-child { margin-bottom: 0; }
    .meta-label { color: #6b7280; font-weight: 500; }
    .meta-value { color: #111827; font-weight: 600; }
    .meta-value a { color: #1d4ed8; text-decoration: none; }
    .message-box { background: #f9fafb; border: 1px solid #e5e7eb; border-left: 3px solid #1d4ed8; border-radius: 6px; padding: 18px 20px; color: #1f2937; font-size: 14px; line-height: 1.7; margin-bottom: 24px; }
    .footer { padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }
    .reply-hint { display: inline-block; margin-top: 6px; color: #1d4ed8; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Direct Message</div>
      <h1 class="title">New Message: ${safeTopic}</h1>
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
          <span class="meta-value"><a href="mailto:${safeSenderEmail}">${safeSenderEmail}</a></span>
        </div>
        ${
          safeContext
            ? `<div class="meta-row">
          <span class="meta-label">Context:</span>
          <span class="meta-value" style="font-size:12px;">${safeContext}</span>
        </div>`
            : ""
        }
        <div class="meta-row">
          <span class="meta-label">Discussion Topic:</span>
          <span class="meta-value" style="color: #1d4ed8;">${safeTopic}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Reference ID:</span>
          <span class="meta-value" style="font-family: monospace;">${safeReferenceId}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Sent At:</span>
          <span class="meta-value" style="font-size: 11px; font-family: monospace;">${formattedDate}</span>
        </div>
      </div>

      <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: #6b7280; margin-bottom: 8px;">Message Content:</div>
      <div class="message-box">
        ${escapedMessage}
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; font-size: 12px; color: #166534; text-align: center;">
        <strong>Quick reply:</strong> Hit "Reply" in your email client to respond directly to <strong>${safeSenderEmail}</strong>.
      </div>
    </div>
    <div class="footer">
      <div>AI Solutions Portfolio • Contact Channel</div>
      <div class="reply-hint">Reply-To: ${safeSenderEmail}</div>
    </div>
  </div>
</body>
</html>`;
}

interface ConfirmationPayload {
  referenceId: string;
  senderName?: string;
  topic: string;
  message: string;
  timestamp: string;
}

function generateConfirmationHtmlTemplate({
  referenceId,
  senderName,
  topic,
  message,
  timestamp,
}: ConfirmationPayload): string {
  const formattedDate = new Date(timestamp).toUTCString();
  const safeTopic = escapeHtml(topic);
  const safeReferenceId = escapeHtml(referenceId);
  const safeGreeting = senderName ? escapeHtml(senderName) : "there";
  const messagePreview = escapeHtml(message.trim().slice(0, 280)) + (message.trim().length > 280 ? "…" : "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Message Received: ${safeTopic}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #1f2937; margin: 0; padding: 24px;">
  <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
    <div style="padding: 24px 32px; border-bottom: 1px solid #e5e7eb;">
      <div style="display: inline-block; padding: 3px 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 9999px; color: #166534; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px;">Delivery Confirmed</div>
      <h1 style="color: #111827; font-size: 19px; font-weight: 700; margin: 0; line-height: 1.35;">Thank you. Your message has been received</h1>
    </div>
    <div style="padding: 28px 32px;">
      <p style="font-size: 14px; line-height: 1.7; color: #374151; margin: 0 0 20px;">
        Hi ${safeGreeting},<br/><br/>
        This confirms that your message has been delivered to my inbox. I personally review every inquiry and will get back to you within <strong style="color: #111827;">24 hours</strong>.
      </p>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px; font-size: 13px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #6b7280;">Reference ID:</span>
          <span style="color: #166534; font-weight: 600; font-family: monospace;">${safeReferenceId}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #6b7280;">Topic:</span>
          <span style="color: #111827; font-weight: 600;">${safeTopic}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #6b7280;">Sent At:</span>
          <span style="color: #111827; font-size: 11px; font-family: monospace;">${formattedDate}</span>
        </div>
      </div>
      <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: #6b7280; margin-bottom: 8px;">Your Message Preview:</div>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-left: 3px solid #166534; border-radius: 6px; padding: 16px; color: #374151; font-size: 13px; line-height: 1.7; margin-bottom: 24px;">
        ${messagePreview}
      </div>
      <p style="font-size: 12px; line-height: 1.7; color: #6b7280; margin: 0;">
        Please keep your Reference ID handy if you follow up. No action is needed from your side.
      </p>
    </div>
    <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center;">
      <div>Naseeb Grewal • Senior AI Solutions Architect</div>
      <div style="margin-top: 6px;">This is an automated confirmation from a no-reply address. Please do not reply to this email.</div>
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

    const { email, senderName, organization, topic, customTopic, message, senderRole, budgetRange, timeline, website } = body;

    // Honeypot: legitimate users never fill the hidden "website" field.
    // Silently accept (200) without sending anything so bots get no failure signal.
    if (typeof website === "string" && website.trim().length > 0) {
      console.warn("[CONTACT_API] Honeypot triggered — silently discarding bot submission.");
      return NextResponse.json(
        {
          success: true,
          referenceId: `INQ-${Date.now().toString(36).toUpperCase()}`,
          message: "Your inquiry has been successfully transmitted.",
        },
        { status: 200 }
      );
    }

    // Per-IP rate limiting (protects Resend quota & prevents open-relay abuse of the confirmation email)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = (forwardedFor?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many submissions from this network. Please try again in about an hour." },
        { status: 429 }
      );
    }

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
    // Qualifier selects: server-side allowlist enforcement (arbitrary JSON can bypass the UI)
    const cleanSenderRole = typeof senderRole === "string" && ALLOWED_ROLES.has(senderRole.trim()) ? senderRole.trim() : undefined;
    const cleanBudgetRange = typeof budgetRange === "string" && ALLOWED_BUDGETS.has(budgetRange.trim()) ? budgetRange.trim() : undefined;
    const cleanTimeline = typeof timeline === "string" && ALLOWED_TIMELINES.has(timeline.trim()) ? timeline.trim() : undefined;

    // Validate topic & custom subject combination
    let finalTopic = typeof topic === "string" && topic.trim().length > 0 ? topic.trim() : "General Inquiry";
    if (topic === "Other / Custom Topic" || topic === "custom") {
      finalTopic = typeof customTopic === "string" && customTopic.trim().length > 0 ? customTopic.trim() : "Custom Inquiry";
    } else if (typeof customTopic === "string" && customTopic.trim().length > 0) {
      const trimmedCustom = customTopic.trim();
      if (!finalTopic.includes(trimmedCustom)) {
        finalTopic = `${finalTopic}: ${trimmedCustom}`;
      }
    }

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

    // Target recipient: server-only env var (no NEXT_PUBLIC_ exposure, no hardcoded fallback).
    const recipientEmail = process.env.CANDIDATE_EMAIL?.trim();
    if (!recipientEmail) {
      console.error("[CONTACT_API] CANDIDATE_EMAIL env var is not configured.");
      return NextResponse.json(
        { error: "Contact service is temporarily unavailable. Please reach out via LinkedIn." },
        { status: 503 }
      );
    }

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

    const subject = `[Portfolio Contact] ${cleanTopic} from ${senderIdentifier}`;
    const htmlBody = generateExecutiveHtmlTemplate({
      referenceId,
      senderEmail: cleanEmail,
      senderName: cleanSenderName,
      organization: cleanOrg,
      senderRole: cleanSenderRole,
      budgetRange: cleanBudgetRange,
      timeline: cleanTimeline,
      recipientEmail,
      topic: cleanTopic,
      message: cleanMessage,
      timestamp,
    });

    const contextLine = [cleanSenderRole, cleanBudgetRange, cleanTimeline].filter(Boolean).join(" | ");
    const plainTextBody = `New Portfolio Contact Message:
Reference ID: ${referenceId}
${cleanSenderName ? `Sender Name: ${cleanSenderName}\n` : ""}${cleanOrg ? `Organization: ${cleanOrg}\n` : ""}${contextLine ? `Context: ${contextLine}\n` : ""}Sender Email: ${cleanEmail}
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
    // Single source of truth: RESEND_EMAIL_DOMAIN (verified in Resend).
    // Notification From: <Candidate Name> <contact@domain> | Confirmation From: Portfolio <no-reply@domain>
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendDomain = process.env.RESEND_EMAIL_DOMAIN?.trim();
    if (resendApiKey && resendApiKey.trim().length > 0 && resendDomain && resendDomain.length > 0) {
      try {
        console.log(`[CONTACT_API] Initiating Resend dispatch with key: ${resendApiKey.slice(0, 7)}...`);
        const resend = new Resend(resendApiKey.trim());

        const displayName = (process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Portfolio Contact").trim();
        const fromAddress = `${displayName} <contact@${resendDomain}>`;
        const confirmationFrom = `Portfolio <no-reply@${resendDomain}>`;

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
          from: `Portfolio Contact <${process.env.SMTP_USER || recipientEmail}>`,
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

    // 3. SENDER CONFIRMATION EMAIL (Resend only, verified domain, no-reply address).
    // Sent strictly after primary delivery succeeds; failure here must never fail the request.
    if (deliverySuccess && deliveryProvider === "resend" && resendApiKey && resendApiKey.trim().length > 0 && resendDomain && resendDomain.length > 0) {
      try {
        // Confirmation sender is derived from the verified Resend domain: Portfolio <no-reply@domain>
        const confirmationFrom = `Portfolio <no-reply@${resendDomain}>`;
        {
          const resend = new Resend(resendApiKey.trim());
          const confirmationHtml = generateConfirmationHtmlTemplate({
            referenceId,
            senderName: cleanSenderName,
            topic: cleanTopic,
            message: cleanMessage,
            timestamp,
          });
          const confirmationText = `Thank you${cleanSenderName ? `, ${cleanSenderName}` : ""}. Your message has been received.\n\nReference ID: ${referenceId}\nTopic: ${cleanTopic}\nSent At: ${timestamp}\n\nI personally review every inquiry and will get back to you within 24 hours.\n\nThis is an automated confirmation from a no-reply address. Please do not reply.`;

          const confirmationResponse = await resend.emails.send({
            from: confirmationFrom,
            to: [cleanEmail],
            subject: `Message received: ${cleanTopic} [${referenceId}]`,
            text: confirmationText,
            html: confirmationHtml,
          });

          if (confirmationResponse.error) {
            console.warn("[CONTACT_API] Confirmation email API error (non-blocking):", confirmationResponse.error.message);
          } else {
            console.log(`[CONTACT_API] Confirmation email dispatched to sender (${confirmationResponse.data?.id || "ok"})`);
          }
        }
      } catch (confirmErr: unknown) {
        const errStr = confirmErr instanceof Error ? confirmErr.message : String(confirmErr);
        console.warn("[CONTACT_API] Confirmation email failed (non-blocking):", errStr);
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
        message: "Your inquiry has been successfully transmitted. A confirmation email has been sent to your inbox.",
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
