"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { FiAlertCircle, FiCheckCircle, FiLoader, FiSend } from "react-icons/fi";
import { LIMITS, validateContact, type FieldErrors } from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const empty = { name: "", email: "", subject: "", message: "", website: "" };

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (field: keyof typeof empty) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { errors?: FieldErrors; error?: string };

      if (res.ok) {
        setStatus({ kind: "sent" });
        setValues(empty);
        setErrors({});
      } else if (json.errors) {
        setErrors(json.errors);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="contact-form contact-sent" role="status">
        <FiCheckCircle className="contact-sent-icon" aria-hidden="true" />
        <h3>Message received. Thank you!</h3>
        <p className="muted">I’ll get back to you at the email you shared, usually within a day or two.</p>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus({ kind: "idle" })}>
          Send another
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <Field label="Name" error={errors.name}>
          <input
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name.max}
            value={values.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email.max}
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field label="Subject" optional error={errors.subject}>
        <input
          name="subject"
          maxLength={LIMITS.subject.max}
          value={values.subject}
          onChange={set("subject")}
          aria-invalid={!!errors.subject}
        />
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          name="message"
          rows={5}
          maxLength={LIMITS.message.max}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
        />
      </Field>

      {/* Honeypot — hidden from people, tempting for bots */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </label>
      </div>

      {status.kind === "error" && (
        <p className="form-error" role="alert">
          <FiAlertCircle aria-hidden="true" /> {status.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? (
          <>
            <FiLoader className="spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send Message <FiSend aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className={`field ${error ? "has-error" : ""}`}>
      <span className="field-label">
        {label} {optional && <span className="muted small">(optional)</span>}
      </span>
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}
