import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // ── Placeholder for email service integration ──
    // In production, integrate with services like:
    // - Mailchimp API
    // - ConvertKit API
    // - Brevo (Sendinblue) API
    // - Resend Audiences
    //
    // Example with Mailchimp:
    // const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    // const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    // const MAILCHIMP_DC = MAILCHIMP_API_KEY?.split('-').pop();
    //
    // await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `apikey ${MAILCHIMP_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email_address: email,
    //     status: 'subscribed',
    //   }),
    // });

    console.log('═══════════════════════════════════════════');
    console.log('NEWSLETTER SUBSCRIPTION');
    console.log('Email:', email);
    console.log('Timestamp:', new Date().toISOString());
    console.log('═══════════════════════════════════════════');

    return NextResponse.json({
      success: true,
      message: 'Welcome to the Harmonic newsletter! Check your inbox for a confirmation.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
