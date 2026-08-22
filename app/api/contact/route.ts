import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

interface ContactBody {
  name?: string
  email?: string
  subject?: string
  body?: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: Request) {
  let body: ContactBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, subject, body: message } = body

  if (!email || !subject || !message) {
    return NextResponse.json(
      { error: 'Email, subject, and message are required.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const contactEmail = process.env.CONTACT_EMAIL || smtpUser

  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later.' },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const senderName = name?.trim() || 'Anonymous'

  try {
    await transporter.sendMail({
      from: `"TechSkillHub Contact" <${smtpUser}>`,
      to: contactEmail,
      replyTo: senderName !== 'Anonymous' ? `"${senderName}" <${email}>` : email,
      subject: `[Contact Form] ${subject} - ${senderName}`,
      text: `New contact form submission\n\nFrom: ${senderName}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; background: #ffffff;">
          <div style="background: #0f172a; padding: 20px 24px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">TechSkillHub Contact Form</h2>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 90px; vertical-align: top;">From:</td>
                <td style="padding: 8px 0; color: #1e293b;">${escapeHtml(senderName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${escapeHtml(email)}" style="color: #0d9488; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">Subject:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${escapeHtml(subject)}</td>
              </tr>
            </table>
            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px;">
              <p style="font-weight: 600; color: #64748b; margin-top: 0; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message:</p>
              <div style="line-height: 1.6; color: #334155; background: #f8fafc; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(message)}</div>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
