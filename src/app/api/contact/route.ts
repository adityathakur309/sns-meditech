import { Resend } from "resend";
import { validateContact } from "@/lib/validation";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const result = validateContact(json);
  if (!result.ok) {
    return Response.json(
      { ok: false, errors: result.errors, message: "Please correct the highlighted fields." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.RESEND_FROM?.trim();

  if (!apiKey || !to || !from || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return Response.json(
      { ok: false, message: "Email delivery is not configured. Please call or email SNS Meditech directly." },
      { status: 500 },
    );
  }

  const { data } = result;
  const resend = new Resend(apiKey);

  const rows = [
    ["Full name", data.fullName],
    ["Company / Hospital", data.company || "—"],
    ["Designation", data.designation || "—"],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["City", data.city || "—"],
    ["Interested in", data.interestedIn || "—"],
  ];

  const html = `
    <h1 style="font-family:Georgia,serif;font-size:20px;">New website enquiry</h1>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#5c6774;">${label}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;margin-top:20px;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Website enquiry from ${data.fullName}${data.interestedIn ? ` — ${data.interestedIn}` : ""}`,
      html,
    });

    if (error) {
      return Response.json(
        { ok: false, message: "The enquiry could not be delivered. Please try again or email directly." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, message: "The enquiry could not be delivered. Please try again or email directly." },
      { status: 502 },
    );
  }
}
