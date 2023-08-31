import { EmailTemplate } from '../../../components/email/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'The Mold Guide <info@themoldguide.com>',
      // You can send to delivered@resend.dev to test delivery w/o compromsing your domain reputation
      to: ['delivered@resend.dev'], 
      subject: 'Hello from The Mold Guide',
      react: EmailTemplate({ firstName: 'Robert' }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
