import { FeedbackFormNotification } from "../../../components/email/feedback-form-notification";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Helps with debugging because you can filter by API key in the Resend dashboard.
const resend = new Resend(process.env.RESEND_API_KEY);
// const resend = new Resend(process.env.RESEND_API_KEY_DEV);

export async function POST(request) {
  const json = await request.json();

  try {
    const data = await resend.emails.send({
      from: "The Mold Guide <notifications@themoldguide.com>",
      // You can send to delivered@resend.dev to test delivery w/o compromsing your domain reputation
      // to: ["delivered@resend.dev"],
      to: ["hello@themoldguide.com"],
      subject: "Mold Guide: Visitor Feedback Submitted",
      react: FeedbackFormNotification({
        email: json.email,
        feedbackMessage: json.feedbackMessage,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
