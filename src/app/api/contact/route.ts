import { NextResponse, type NextRequest } from "next/server";
import { validateContact } from "@/lib/contact";
import { MailerConfigError, sendContactEmail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs"; // nodemailer needs Node APIs
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Browsers always send Origin on cross-site POSTs; reject any that isn't us. */
function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin navigations / server-to-server tools
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

/**
 * POST /api/contact
 * Body (JSON): { name, email, subject?, message, website? }
 * 200 { ok: true } | 400 { ok:false, errors } | 413 | 415 | 429 | 500
 */
export async function POST(req: NextRequest) {
  // Only accept JSON from our own site
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Expected application/json." }, { status: 415 });
  }
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  const limit = rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60_000); // 5 per 10 min per IP
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  // Honeypot filled in → almost certainly a bot. Pretend success, send nothing.
  if (body && typeof body === "object" && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to send:", err);
    const msg =
      err instanceof MailerConfigError
        ? "The contact form isn't configured yet. Please email me directly."
        : "Couldn't send your message right now. Please try again or email me directly.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Use POST." }, { status: 405, headers: { Allow: "POST" } });
}
