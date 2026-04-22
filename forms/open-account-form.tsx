"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type AccountValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: string;
  employmentStatus: string;
  city: string;
  country: string;
  agree: boolean;
};

const initialValues: AccountValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  accountType: "Prestige Everyday Checking",
  employmentStatus: "Employed",
  city: "",
  country: "",
  agree: false,
};

export function OpenAccountForm() {
  const [values, setValues] = useState<AccountValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof AccountValues, string>>>({});
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function validate() {
    const nextErrors: Partial<Record<keyof AccountValues, string>> = {};

    if (!values.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!values.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!values.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      nextErrors.email = "Provide a valid email address.";
    }
    if (!values.phone.trim()) nextErrors.phone = "Enter your phone number.";
    if (!values.city.trim()) nextErrors.city = "Enter your city.";
    if (!values.country.trim()) nextErrors.country = "Enter your country.";
    if (!values.agree) nextErrors.agree = "Please confirm the information provided is accurate.";

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFeedback("Please complete the required fields before submitting.");
      return;
    }

    setErrors({});
    setStatus("success");
    setFeedback(
      `Your application for ${values.accountType} has been received. A banker will contact you shortly.`
    );
    setValues(initialValues);
  }

  function update<K extends keyof AccountValues>(field: K, value: AccountValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className="panel rounded-[2.25rem] p-7 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
        New Account
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-navy-950)]">
        Open an account
      </h1>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
        Complete the form below.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <InputField
          label="First name"
          error={errors.firstName}
          value={values.firstName}
          onChange={(value) => update("firstName", value)}
          placeholder="Jordan"
        />
        <InputField
          label="Last name"
          error={errors.lastName}
          value={values.lastName}
          onChange={(value) => update("lastName", value)}
          placeholder="Whitmore"
        />
        <InputField
          label="Email"
          error={errors.email}
          value={values.email}
          onChange={(value) => update("email", value)}
          placeholder="jordan@example.com"
          type="email"
        />
        <InputField
          label="Phone"
          error={errors.phone}
          value={values.phone}
          onChange={(value) => update("phone", value)}
          placeholder="+1 (555) 010-2480"
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Account type"
          value={values.accountType}
          onChange={(value) => update("accountType", value)}
          options={[
            "Prestige Everyday Checking",
            "Prestige Savings Plus",
            "Prestige Business Checking",
            "Prestige Student Banking",
          ]}
        />
        <SelectField
          label="Employment status"
          value={values.employmentStatus}
          onChange={(value) => update("employmentStatus", value)}
          options={["Employed", "Self-employed", "Student", "Retired"]}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <InputField
          label="City"
          error={errors.city}
          value={values.city}
          onChange={(value) => update("city", value)}
          placeholder="Boston"
        />
        <InputField
          label="Country"
          error={errors.country}
          value={values.country}
          onChange={(value) => update("country", value)}
          placeholder="United States"
        />
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-[1.5rem] bg-[var(--color-surface-soft)] p-4 text-sm text-[var(--color-slate-700)]">
        <input
          type="checkbox"
          checked={values.agree}
          onChange={(event) => update("agree", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[var(--color-line)]"
        />
        <span>
          I confirm the information provided is accurate and I would like a Prestige Trust representative to follow up.
          {errors.agree ? <span className="mt-2 block text-[var(--color-danger)]">{errors.agree}</span> : null}
        </span>
      </label>

      {feedback ? (
        <p
          className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
            status === "success"
              ? "bg-emerald-50 text-[var(--color-success)]"
              : "bg-rose-50 text-[var(--color-danger)]"
          }`}
        >
          {feedback}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 inline-flex rounded-full bg-[var(--color-navy-950)] px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[var(--color-navy-900)]"
      >
        Submit Application
      </button>
    </form>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
};

function InputField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: InputFieldProps) {
  return (
    <label className="block text-sm font-medium text-[var(--color-slate-950)]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 outline-none focus:border-[var(--color-gold)] focus:bg-white"
        placeholder={placeholder}
        type={type}
      />
      {error ? <span className="mt-2 block text-sm text-[var(--color-danger)]">{error}</span> : null}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="block text-sm font-medium text-[var(--color-slate-950)]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 outline-none focus:border-[var(--color-gold)] focus:bg-white"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
