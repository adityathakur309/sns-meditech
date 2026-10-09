import { Resend } from "resend";
import { buildEnquiryEmail } from "@/lib/enquiry-email";
import { validateContact } from "@/lib/validation";

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
  const { html, text } = buildEnquiryEmail(data);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Website enquiry from ${data.fullName}${data.interestedIn ? ` — ${data.interestedIn}` : ""}`,
      html,
      text,
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
