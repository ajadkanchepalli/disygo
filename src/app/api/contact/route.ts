import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Try Resend if API key is available
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Disygo Contact Form <onboarding@resend.dev>',
            to: ['disygo.work@gmail.com'],
            subject: `New Inquiry from ${name} — Disygo Digital Solutions`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #ffffff; padding: 40px; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <h1 style="color: #50e5ea; font-size: 24px; margin: 0;">Disygo Digital Solutions</h1>
                  <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 8px;">New Contact Form Submission</p>
                </div>
                
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
                  <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 20px;">Contact Details</h2>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #2a2a2a;">
                      <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px; width: 120px;">Name</td>
                      <td style="padding: 12px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #2a2a2a;">
                      <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Email</td>
                      <td style="padding: 12px 0; color: #50e5ea; font-size: 14px;">${email}</td>
                    </tr>
                    ${phone ? `<tr style="border-bottom: 1px solid #2a2a2a;"><td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Phone</td><td style="padding: 12px 0; color: #ffffff; font-size: 14px;">${phone}</td></tr>` : ''}
                    ${service ? `<tr style="border-bottom: 1px solid #2a2a2a;"><td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 13px;">Service</td><td style="padding: 12px 0; color: #50e5ea; font-size: 14px;">${service}</td></tr>` : ''}
                  </table>
                </div>
                
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 12px; padding: 24px;">
                  <h3 style="color: rgba(255,255,255,0.6); font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px;">Message</h3>
                  <p style="color: #ffffff; font-size: 15px; line-height: 1.7; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
                </div>
                
                <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #2a2a2a;">
                  <p style="color: rgba(255,255,255,0.3); font-size: 12px;">This email was sent from the Disygo Digital Solutions website contact form.</p>
                  <p style="color: #50e5ea; font-size: 12px; margin-top: 4px;">Make Your Vision Grow 🚀</p>
                </div>
              </div>
            `,
          }),
        });

        if (!resendRes.ok) {
          const errData = await resendRes.json();
          console.error('Resend error:', errData);
          // Fall through to success anyway for UX
        }
      } catch (resendErr) {
        console.error('Resend fetch error:', resendErr);
      }
    } else {
      // Log the submission when no API key (development)
      console.log('Contact form submission (no RESEND_API_KEY):', {
        name,
        email,
        phone,
        service,
        message,
        to: 'disygo.work@gmail.com',
      });
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been received. We will get back to you soon!' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
