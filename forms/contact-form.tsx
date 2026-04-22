"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

type FormValues = {
  fullName: string;
  email: string;
  topic: string;
  message: string;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  topic: "Relationship banking",
  message: "",
};

const topics = [
  "Relationship banking",
  "Personal banking",
  "Business banking",
  "Lending",
  "Cards and payments",
  "Digital banking support",
];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function validate() {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      nextErrors.email = "Please provide a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Please enter a message.";
    if (values.message.trim().length > 0 && values.message.trim().length < 12) {
      nextErrors.message = "Please include a bit more detail in your message.";
    }

    return nextErrors;
  }

  function handleChange<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFeedback("Please review the highlighted fields and try again.");
      return;
    }

    setStatus("success");
    setFeedback(
      "Thank you. Your message has been received and a relationship manager will follow up shortly."
    );
    setValues(initialValues);
    setErrors({});
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="panel overflow-hidden rounded-[2.25rem] border border-[rgba(15,23,42,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,246,241,0.92))]"
    >
      <div className="border-b border-[var(--color-line)] px-7 py-7 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
          Contact
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-[var(--color-navy-950)]">
          Send a Message
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-slate-700)]">
          A banker will contact you shortly.
        </p>
      </div>

      <div className="px-7 py-7 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full name"
            error={errors.fullName}
            input={
              <input
                value={values.fullName}
                onChange={(event) => handleChange("fullName", event.target.value)}
                className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 text-[var(--color-slate-950)] outline-none placeholder:text-[var(--color-slate-500)] focus:border-[var(--color-gold)] focus:bg-white"
                placeholder="Jordan Whitmore"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
              />
            }
          />
          <Field
            label="Email address"
            error={errors.email}
            input={
              <input
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 text-[var(--color-slate-950)] outline-none placeholder:text-[var(--color-slate-500)] focus:border-[var(--color-gold)] focus:bg-white"
                placeholder="jordan.whitmore@example.com"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
            }
          />
        </div>

        <Field
          label="Area of interest"
          error={errors.topic}
          className="mt-5"
          input={
            <select
              value={values.topic}
              onChange={(event) => handleChange("topic", event.target.value)}
              className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 text-[var(--color-slate-950)] outline-none focus:border-[var(--color-gold)] focus:bg-white"
            >
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          }
        />

        <Field
          label="Message"
          error={errors.message}
          className="mt-5"
          input={
            <textarea
              value={values.message}
              onChange={(event) => handleChange("message", event.target.value)}
              className="mt-2 min-h-40 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 text-[var(--color-slate-950)] outline-none placeholder:text-[var(--color-slate-500)] focus:border-[var(--color-gold)] focus:bg-white"
              placeholder="Tell us about the support, banking services, or guidance you need."
              aria-invalid={Boolean(errors.message)}
            />
          }
        />

        {feedback ? (
          <p
            className={`mt-5 rounded-[1.25rem] border px-4 py-3 text-sm ${
              status === "success"
                ? "border-emerald-200 bg-emerald-50 text-[var(--color-success)]"
                : "border-rose-200 bg-rose-50 text-[var(--color-danger)]"
            }`}
          >
            {feedback}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-7 text-[var(--color-slate-700)]">
            Personal banking, business banking, lending, cards, and digital banking.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[var(--color-navy-900)]"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  input: ReactNode;
  className?: string;
};

function Field({ label, error, input, className }: FieldProps) {
  return (
    <label className={`block text-sm font-medium text-[var(--color-slate-950)] ${className ?? ""}`}>
      {label}
      {input}
      {error ? <span className="mt-2 block text-sm text-[var(--color-danger)]">{error}</span> : null}
    </label>
  );
}
