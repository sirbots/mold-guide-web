import { EmailFormNotificationTemplate } from "../../../components/email/email-form-notification-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const json = await request.json();

  try {
    const data = await resend.emails.send({
      from: "The Mold Guide <notifications@themoldguide.com>",
      // You can send to delivered@resend.dev to test delivery w/o compromsing your domain reputation
      to: ["hello@themoldguide.com"],
      subject: "Mold Guide: New " + json.formSubmitted + " Submitted",
      react: EmailFormNotificationTemplate({
        // firstName: "Robert",
        emailMessage: json.formSubmitted,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
