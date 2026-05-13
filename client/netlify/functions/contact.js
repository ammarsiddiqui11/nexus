// netlify/functions/contact.js
// Receives contact form data and emails it to you. No database, no dependencies except nodemailer.

import nodemailer from 'nodemailer'

// Joi-style validation without the library
const validate = (body) => {
  const errors = []
  const { name, email, message } = body

  if (!name?.trim() || name.trim().length < 1)   errors.push({ field: 'name', message: 'Name is required' })
  if (!email?.trim())                             errors.push({ field: 'email', message: 'Email is required' })
  else if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.push({ field: 'email', message: 'Invalid email address' })
  if (!message?.trim() || message.trim().length < 10)
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' })

  return errors
}

// In-memory rate limiter (per function instance — good enough for a landing page)
const rateStore = new Map()
const isRateLimited = (ip, windowMs = 60 * 1000, max = 3) => {
  const now = Date.now()
  const record = rateStore.get(ip)

  if (!record || now - record.start > windowMs) {
    rateStore.set(ip, { count: 1, start: now })
    return false
  }
  if (record.count >= max) return true
  record.count++
  return false
}

export const handler = async (event) => {
  // Only POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, message: 'Method not allowed' }) }
  }

  // Rate limit by IP
  const ip = event.headers['x-forwarded-for']?.split(',')[0] || 'unknown'
  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      body: JSON.stringify({ success: false, message: 'Too many requests. Please wait before submitting again.' }),
    }
  }

  // Parse body
  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid request body' }) }
  }

  // Validate
  const errors = validate(body)
  if (errors.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Validation failed', errors }),
    }
  }

  const { name, email, company, service, budget, message } = body

  // Send email
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    })

    await transporter.sendMail({
      from: `"Your Agency Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,  // hitting Reply in Gmail goes directly to the client
      subject: `New Inquiry — ${name.trim()}${company ? ` @ ${company}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#020408;color:#f0f6ff;padding:40px;border:1px solid #00d4ff22;">
          <h1 style="font-size:22px;color:#00d4ff;margin-bottom:4px;">New Project Inquiry</h1>
          <p style="color:#8ba3c0;font-size:13px;margin-bottom:28px;">Submitted from your website contact form</p>

          <table style="width:100%;border-collapse:collapse;">
            ${[
              ['Name',    name.trim()],
              ['Email',   email.trim()],
              ['Company', company?.trim() || '—'],
              ['Service', service?.trim() || '—'],
              ['Budget',  budget?.trim()  || '—'],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:8px 0;color:#4a6480;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:90px;vertical-align:top;">${label}</td>
                <td style="padding:8px 0;color:#f0f6ff;font-size:13px;">${value}</td>
              </tr>
            `).join('')}
          </table>

          <div style="margin-top:20px;padding:16px;background:#081522;border-left:2px solid #00d4ff;">
            <p style="color:#8ba3c0;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</p>
            <p style="color:#f0f6ff;font-size:13px;line-height:1.6;white-space:pre-wrap;">${message.trim()}</p>
          </div>

          <p style="color:#4a6480;font-size:11px;margin-top:24px;">
            Hit Reply to respond directly to ${name.trim()} at ${email.trim()}
          </p>
        </div>
      `,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Message received. We'll be in touch within 24 hours.",
      }),
    }
  } catch (err) {
    console.error('[Email] Failed to send:', err.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to send message. Please try again or email us directly.' }),
    }
  }
}