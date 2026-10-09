import { interestOptions } from "@/data/company";
import { products } from "@/data/products";

export type ContactPayload = {
  fullName: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  city: string;
  interestedIn: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Record<string, string> };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const INDIAN_MOBILE_RE = /^[6-9]\d{9}$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/** Normalises user input to +91XXXXXXXXXX or null if not a valid Indian mobile. */
export function parseIndianMobile(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  let mobile = digits;
  if (mobile.length === 12 && mobile.startsWith("91")) mobile = mobile.slice(2);
  if (mobile.length === 11 && mobile.startsWith("0")) mobile = mobile.slice(1);
  if (!INDIAN_MOBILE_RE.test(mobile)) return null;
  return `+91${mobile}`;
}

export function validateEmailAddress(email: string): string | undefined {
  const value = email.trim();
  if (!value) return "Please enter your email address.";
  if (!EMAIL_RE.test(value)) return "Please enter a valid email address.";
  if (value.length > 254) return "Email address is too long.";
  return undefined;
}

export function validateIndianPhoneField(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "Please enter your mobile number.";
  if (digits.length < 10) return "Enter all 10 digits of your Indian mobile number.";
  if (!parseIndianMobile(phone)) {
    return "Please enter a valid 10-digit Indian mobile number (starts with 6–9).";
  }
  return undefined;
}

export function validateContact(input: unknown): ValidationResult {
  const body = (input ?? {}) as Record<string, unknown>;
  const data: ContactPayload = {
    fullName: clean(body.fullName),
    company: clean(body.company),
    designation: clean(body.designation),
    email: clean(body.email),
    phone: clean(body.phone),
    city: clean(body.city),
    interestedIn: clean(body.interestedIn),
    message: clean(body.message),
  };

  const errors: Record<string, string> = {};

  if (data.fullName.length < 2) errors.fullName = "Please enter your full name.";
  if (data.fullName.length > 120) errors.fullName = "Name is too long.";
  const emailError = validateEmailAddress(data.email);
  if (emailError) errors.email = emailError;
  if (data.message.length < 10) errors.message = "Please add a short message (at least 10 characters).";
  if (data.message.length > 4000) errors.message = "Message is too long.";
  const phoneError = validateIndianPhoneField(data.phone);
  if (phoneError) errors.phone = phoneError;
  else {
    const normalized = parseIndianMobile(data.phone);
    if (normalized) data.phone = normalized;
  }
  const allowedInterest = new Set<string>([...interestOptions, ...products.map((product) => product.name)]);
  if (data.interestedIn && !allowedInterest.has(data.interestedIn)) {
    errors.interestedIn = "Please choose a valid interest.";
  }
  if (data.company.length > 160) errors.company = "Company name is too long.";
  if (data.designation.length > 120) errors.designation = "Designation is too long.";
  if (data.city.length > 80) errors.city = "City name is too long.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data };
}
