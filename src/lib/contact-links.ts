export function contactEnquiryHref(interest: string) {
  return `/contact?interest=${encodeURIComponent(interest)}`;
}

export function contactEmailSectionHref(interest?: string) {
  const base = interest ? contactEnquiryHref(interest) : "/contact";
  return `${base}#contact-email`;
}
