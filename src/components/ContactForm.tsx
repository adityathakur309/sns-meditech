"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { products } from "@/data/products";
import type { ContactPayload } from "@/lib/validation";
import { cx } from "@/lib/utils";

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
  "min-h-11 w-full border border-line bg-white px-3 text-sm text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-brand focus:shadow-[0_0_0_3px_rgba(240,124,0,0.12)]";

export function ContactForm() {
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const defaultInterest = useMemo(() => {
    const interest = searchParams.get("interest") ?? "";
    const product = products.find((item) => item.name === interest);
    return product ? interest : "";
  }, [searchParams]);

  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (defaultInterest) {
      setValues((current) => {
        const prefix = `I would like information about ${defaultInterest}.`;
        const message =
          current.message && !current.message.startsWith(prefix)
            ? current.message
            : current.message || prefix;
        return {
          ...current,
          interestedIn: defaultInterest,
          message: current.message ? current.message : message,
        };
      });
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
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-line bg-paper px-6 py-10 sm:px-8"
        role="status"
      >
        <motion.div
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.05 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand"
          aria-hidden
        >
          ✓
        </motion.div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand">Sent</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">Enquiry received</h2>
        <p className="mt-3 max-w-lg text-muted">{message}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-paper p-5 sm:p-8" noValidate>
      <div className="grid gap-5">
        <Field id="fullName" label="Name" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            value={values.fullName}
            onFocus={() => setFocused("fullName")}
            onBlur={() => setFocused(null)}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={cx(inputClass, focused === "fullName" && "border-brand")}
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
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cx(inputClass, focused === "email" && "border-brand")}
          />
        </Field>
        <Field id="phone" label="Phone" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className={cx(inputClass, focused === "phone" && "border-brand")}
          />
        </Field>
        <Field id="company" label="Company / Hospital" error={errors.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onFocus={() => setFocused("company")}
            onBlur={() => setFocused(null)}
            onChange={(event) => update("company", event.target.value)}
            className={cx(inputClass, focused === "company" && "border-brand")}
          />
        </Field>
        <Field id="message" label="Message" required error={errors.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={values.message}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cx(inputClass, "min-h-32 py-3", focused === "message" && "border-brand")}
          />
        </Field>
      </div>
      <AnimatePresence>
        {status === "error" && message ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm text-red-700"
            role="alert"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
      <div className="mt-6">
        <Button type="submit" disabled={status === "loading"} className="min-w-44" showArrow>
          {status === "loading" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}
