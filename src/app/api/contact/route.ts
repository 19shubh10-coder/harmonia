import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // Configure transporter using environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL || 'divyanshu@harmoniclearningstudio.com';

    // If SMTP is not configured, log and return success (development fallback)
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log('═══════════════════════════════════════════');
      console.log('CONTACT FORM SUBMISSION (SMTP not configured)');
      console.log('═══════════════════════════════════════════');
      console.log('Name:', body.name);
      console.log('Email:', body.email);
      console.log('Phone:', body.phone || 'Not provided');
      console.log('Subject:', body.subject);
      console.log('Message:', body.message);
      console.log('═══════════════════════════════════════════');

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We will get back to you shortly.',
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Harmonic Learning Studio" <${smtpUser}>`,
      to: contactEmail,
      replyTo: body.email,
      subject: `[Contact Form] ${body.subject} — from ${body.name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0A1628, #1E3A5F); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">Harmonic Learning Studio</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 5px 0 0 0; font-size: 14px;">New Contact Form Submission</p>
          </div>
          <div style="padding: 30px; background: #ffffff; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #0A1628; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #4A5568;">${body.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #0A1628;">Email:</td>
                <td style="padding: 8px 0; color: #4A5568;"><a href="mailto:${body.email}" style="color: #1E3A5F;">${body.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #0A1628;">Phone:</td>
                <td style="padding: 8px 0; color: #4A5568;">${body.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #0A1628;">Subject:</td>
                <td style="padding: 8px 0; color: #4A5568;">${body.subject}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 16px 0;" />
            <h3 style="color: #0A1628; margin: 0 0 8px 0;">Message:</h3>
            <p style="color: #4A5568; line-height: 1.6; white-space: pre-wrap;">${body.message}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending your message. Please try again later.' },
      { status: 500 }
    );
  }
}
