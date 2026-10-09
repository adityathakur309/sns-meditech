"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { interestOptions } from "@/data/company";
import { products } from "@/data/products";
import type { ContactPayload } from "@/lib/validation";
import {
  validateContact,
  validateEmailAddress,
  validateIndianPhoneField,
} from "@/lib/validation";
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

type DialogState = {
  kind: "success" | "warning";
  title: string;
  body: string;
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

function ContactFormDialog({
  dialog,
  onClose,
  reduce,
}: {
  dialog: DialogState;
  onClose: () => void;
  reduce: boolean | null;
}) {
  const isSuccess = dialog.kind === "success";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.button
        type="button"
        className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
        aria-label="Close dialog"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-body"
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          "relative z-10 w-full max-w-md border bg-paper p-6 shadow-2xl sm:p-8",
          isSuccess ? "border-brand/35" : "border-amber-600/35",
        )}
      >
        <motion.div
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 22, delay: 0.05 }}
          className={cx(
            "flex h-14 w-14 items-center justify-center rounded-full text-2xl",
            isSuccess ? "bg-brand/15 text-brand" : "bg-amber-100 text-amber-800",
          )}
          aria-hidden
        >
          {isSuccess ? "✓" : "!"}
        </motion.div>
        <p
          className={cx(
            "mt-5 text-xs font-semibold uppercase tracking-[0.2em]",
            isSuccess ? "text-brand" : "text-amber-800",
          )}
        >
          {isSuccess ? "Success" : "Please check"}
        </p>
        <h2 id="contact-dialog-title" className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
          {dialog.title}
        </h2>
        <p id="contact-dialog-body" className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {dialog.body}
        </p>
        <div className="mt-8">
          <Button type="button" onClick={onClose} className="min-w-36" showArrow={isSuccess}>
            {isSuccess ? "Done" : "Try again"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const defaultInterest = useMemo(() => {
    const slug = searchParams.get("product")?.trim();
    if (slug) {
      const bySlug = products.find((item) => item.slug === slug);
      if (bySlug) return bySlug.name;
    }
    const interest = searchParams.get("interest")?.trim() ?? "";
    const byName = products.find((item) => item.name === interest);
    if (byName) return byName.name;
    return (interestOptions as readonly string[]).includes(interest) ? interest : "";
  }, [searchParams]);

  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogState | null>(null);

  useEffect(() => {
    if (!defaultInterest) return;
    setValues((current) => {
      const prefix = `I would like information about ${defaultInterest}.`;
      const hasCustomMessage = current.message.trim().length > 0 && !current.message.startsWith(prefix);
      return {
        ...current,
        interestedIn: defaultInterest,
        message: hasCustomMessage ? current.message : prefix,
      };
    });
  }, [defaultInterest]);

  const closeDialog = useCallback(() => {
    setDialog((current) => {
      if (current?.kind === "success") setStatus("success");
      return null;
    });
  }, []);

  function update(name: keyof ContactPayload, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function updatePhoneDigits(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    update("phone", digits);
  }

  function blurValidateEmail() {
    const emailError = validateEmailAddress(values.email);
    if (emailError) setErrors((current) => ({ ...current, email: emailError }));
  }

  function blurValidatePhone() {
    const phoneError = validateIndianPhoneField(values.phone);
    if (phoneError) setErrors((current) => ({ ...current, phone: phoneError }));
  }

  function openWarning(title: string, body: string) {
    setDialog({ kind: "warning", title, body });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading" || status === "success") return;

    const clientResult = validateContact(values);
    if (!clientResult.ok) {
      setErrors(clientResult.errors);
      openWarning(
        "Could not send enquiry",
        "Please correct the highlighted fields and try again.",
      );
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientResult.data),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
        message?: string;
      };

      if (!response.ok) {
        setErrors(payload.errors ?? {});
        setStatus("idle");
        openWarning(
          "Enquiry not sent",
          payload.message ?? "Please check the form and try again.",
        );
        return;
      }

      setStatus("idle");
      setMessage("Thank you. Your enquiry has been sent to SNS Meditech. We will reply shortly.");
      setDialog({
        kind: "success",
        title: "Enquiry received",
        body: "Thank you. Your enquiry has been sent to SNS Meditech. We will reply shortly.",
      });
    } catch {
      setStatus("idle");
      setMessage("The enquiry could not be sent. Please email snsmeditech@gmail.com or call +91 77176 66788.");
      openWarning(
        "Something went wrong",
        "The enquiry could not be sent. Please try again, or call +91 77176 66788.",
      );
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
    <>
      <form onSubmit={onSubmit} className="border border-line bg-paper p-5 sm:p-8" noValidate>
        {defaultInterest ? (
          <p className="mb-5 rounded-sm border border-brand/25 bg-brand/8 px-3 py-2.5 text-sm text-ink">
            <span className="font-semibold">Enquiring about:</span> {defaultInterest}
          </p>
        ) : null}
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
              inputMode="email"
              required
              value={values.email}
              onFocus={() => setFocused("email")}
              onBlur={() => {
                setFocused(null);
                blurValidateEmail();
              }}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cx(inputClass, focused === "email" && "border-brand")}
            />
          </Field>
          <Field id="phone" label="Mobile (India)" required error={errors.phone}>
            <div
              className={cx(
                "flex overflow-hidden rounded-sm border bg-white transition-[border-color,box-shadow] duration-200",
                focused === "phone" || errors.phone
                  ? errors.phone
                    ? "border-red-600"
                    : "border-brand shadow-[0_0_0_3px_rgba(240,124,0,0.12)]"
                  : "border-line",
              )}
            >
              <span className="inline-flex min-h-11 shrink-0 items-center border-r border-line bg-mist px-3 text-sm font-semibold text-ink">
                +91
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                inputMode="numeric"
                required
                maxLength={10}
                placeholder="98765 43210"
                value={values.phone}
                onFocus={() => setFocused("phone")}
                onBlur={() => {
                  setFocused(null);
                  blurValidatePhone();
                }}
                onChange={(event) => updatePhoneDigits(event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="min-h-11 w-full border-0 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-muted/70"
              />
            </div>
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
        <div className="mt-6">
          <Button type="submit" disabled={status === "loading"} className="min-w-44" showArrow>
            {status === "loading" ? "Sending…" : "Send enquiry"}
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {dialog ? (
          <ContactFormDialog dialog={dialog} onClose={closeDialog} reduce={reduce} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
