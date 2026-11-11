/**
 * Contact form schema + validation, shared by the browser form and the API route
 * so both enforce exactly the same rules.
 */

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { max: 120 },
  message: { min: 10, max: 5000 },
} as const;

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot: hidden field real people leave empty; bots fill it in. */
  website?: string;
}

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactResult =
  | { ok: true; data: Omit<ContactInput, "website"> }
  | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
/** Single-line fields: collapse any newlines / runs of whitespace. */
const line = (v: unknown) => str(v).replace(/\s+/g, " ");

export function validateContact(raw: unknown): ContactResult {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const data = {
    name: line(body.name),
    email: str(body.email).toLowerCase(),
    subject: line(body.subject),
    message: str(body.message),
  };
  const errors: FieldErrors = {};

  if (data.name.length < LIMITS.name.min) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name.max) errors.name = `Name must be under ${LIMITS.name.max} characters.`;

  if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email.max)
    errors.email = "Please enter a valid email address.";

  if (data.subject.length > LIMITS.subject.max)
    errors.subject = `Subject must be under ${LIMITS.subject.max} characters.`;

  if (data.message.length < LIMITS.message.min)
    errors.message = `Message should be at least ${LIMITS.message.min} characters.`;
  else if (data.message.length > LIMITS.message.max)
    errors.message = `Message must be under ${LIMITS.message.max} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
