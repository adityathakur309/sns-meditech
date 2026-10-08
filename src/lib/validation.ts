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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9()\s-]{7,20}$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please add a short message (at least 10 characters).";
  if (data.message.length > 4000) errors.message = "Message is too long.";
  if (!data.phone) errors.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(data.phone)) errors.phone = "Please enter a valid phone number.";
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
