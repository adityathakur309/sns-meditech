"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { interestOptions } from "@/data/company";
import { products } from "@/data/products";
import type { ContactPayload } from "@/lib/validation";
import { cx } from "@/lib/utils";

const interestChoices = Array.from(new Set([...interestOptions, ...products.map((product) => product.name)]));

const empty: ContactPayload = {
  fullName: "",
  company: "",
  designation: "",
  email: "",
  phone: "",
  city: "",
  interestedIn: "",
  message: "",
};

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "min-h-11 w-full border border-line bg-white px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand";

export function ContactForm() {
  const searchParams = useSearchParams();
  const defaultInterest = useMemo(() => {
    const interest = searchParams.get("interest") ?? "";
    const allowed = new Set<string>([...interestChoices]);
    return allowed.has(interest) ? interest : "";
  }, [searchParams]);

  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (defaultInterest) {
      setValues((current) =>
        current.interestedIn ? current : { ...current, interestedIn: defaultInterest },
      );
    }
  }, [defaultInterest]);

  function update(name: keyof ContactPayload, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
        message?: string;
      };

      if (!response.ok) {
        setErrors(payload.errors ?? {});
        setStatus("error");
        setMessage(payload.message ?? "Please check the form and try again.");
        return;
      }

      setStatus("success");
      setMessage("Thank you. Your enquiry has been sent to SNS Meditech. We will reply shortly.");
    } catch {
      setStatus("error");
      setMessage("The enquiry could not be sent. Please email snsmeditech@gmail.com or call +91 77176 66788.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-paper px-6 py-10 sm:px-8" role="status">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Sent</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">Enquiry received</h2>
        <p className="mt-3 max-w-lg text-muted">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-paper p-5 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="company" label="Company / Hospital" error={errors.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="designation" label="Designation" error={errors.designation}>
          <input
            id="designation"
            name="designation"
            autoComplete="organization-title"
            value={values.designation}
            onChange={(event) => update("designation", event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="city" label="City" error={errors.city}>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => update("city", event.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id="interestedIn" label="Interested In" error={errors.interestedIn}>
            <select
              id="interestedIn"
              name="interestedIn"
              value={values.interestedIn}
              onChange={(event) => update("interestedIn", event.target.value)}
              className={cx(inputClass, "appearance-none")}
            >
              <option value="">Select a topic</option>
              {interestChoices.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="message" label="Message" required error={errors.message}>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cx(inputClass, "min-h-32 py-3")}
            />
          </Field>
        </div>
      </div>
      {status === "error" && message ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {message}
        </p>
      ) : null}
      <div className="mt-6">
        <Button type="submit" disabled={status === "loading"} className="min-w-44">
          {status === "loading" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
