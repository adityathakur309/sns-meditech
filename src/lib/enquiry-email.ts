import { company } from "@/data/company";
import type { ContactPayload } from "@/lib/validation";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const LOGO_URL = `${company.contact.website}/icon.png`;
const BRAND = "#f07c00";
const INK = "#101820";
const MUTED = "#5c6774";

function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function detailRow(label: string, value: string) {
  const safe = escapeHtml(value || "—");
  return `
    <tr>
      <td style="padding:10px 16px 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTED};vertical-align:top;width:38%;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${INK};vertical-align:top;">${safe}</td>
    </tr>`;
}

export function buildEnquiryEmail(data: ContactPayload, sentAt = new Date()) {
  const timestamp = formatTimestamp(sentAt);
  const productLine = data.interestedIn
    ? `Product / interest: ${data.interestedIn}`
    : "General website enquiry";

  const text = [
    "New enquiry — SNS Meditech website",
    "",
    productLine,
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Company / Hospital: ${data.company || "—"}`,
    `Designation: ${data.designation || "—"}`,
    `City: ${data.city || "—"}`,
    "",
    "Message:",
    data.message,
    "",
    `Submitted: ${timestamp} (IST)`,
    `Reply to: ${data.email}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New website enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f1ec;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f1ec;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;background-color:#ffffff;border:1px solid #ddd6cb;border-radius:4px;overflow:hidden;">
          <tr>
            <td style="background-color:${INK};padding:24px 28px;text-align:center;">
              <img src="${LOGO_URL}" width="120" height="120" alt="${escapeHtml(company.name)}" style="display:block;margin:0 auto 12px;height:auto;max-width:120px;border:0;" />
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#ffffff;">${escapeHtml(company.name)}</p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND};">Website enquiry</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${INK};">New enquiry received</h1>
              <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${MUTED};">${escapeHtml(productLine)}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #ddd6cb;">
                ${detailRow("Name", data.fullName)}
                ${detailRow("Email", data.email)}
                ${detailRow("Phone", data.phone)}
                ${detailRow("Company / Hospital", data.company)}
                ${detailRow("Designation", data.designation)}
                ${detailRow("City", data.city)}
                ${data.interestedIn ? detailRow("Product / interest", data.interestedIn) : ""}
              </table>
              <p style="margin:24px 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND};">Message</p>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${INK};white-space:pre-wrap;background-color:#fffcf7;border:1px solid #ddd6cb;padding:16px;border-radius:2px;">${escapeHtml(data.message)}</div>
              <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${MUTED};">Submitted ${escapeHtml(timestamp)} (IST). Reply directly to this email to reach ${escapeHtml(data.fullName)} at ${escapeHtml(data.email)}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}
