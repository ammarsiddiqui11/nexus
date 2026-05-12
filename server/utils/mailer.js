import nodemailer from 'nodemailer'

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,      
    tls: {
      rejectUnauthorized: false
    },     
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 5000,  // fail fast instead of hanging
    greetingTimeout: 5000,
    socketTimeout: 5000,
  })
}

/**
 * @param {Object} data - Contact form data
 */
export const sendContactEmail = async (data) => {
  const transporter = createTransporter()
  const { name, email, company, service, budget, message } = data

  const mailOptions = {
    from: `"NEXUS" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New Inquiry — ${name}${company ? ` @ ${company}` : ''}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #020408; color: #f0f6ff; padding: 40px; border: 1px solid #00d4ff22;">
        <h1 style="font-size: 24px; margin-bottom: 8px; color: #00d4ff;">New Project Inquiry</h1>
        <p style="color: #8ba3c0; margin-bottom: 32px;">Received from your website contact form</p>

        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ['Name', name],
            ['Email', email],
            ['Company', company || '—'],
            ['Service', service || '—'],
            ['Budget', budget || '—'],
          ].map(([label, value]) => `
            <tr>
              <td style="padding: 10px 0; color: #4a6480; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 100px;">${label}</td>
              <td style="padding: 10px 0; color: #f0f6ff; font-size: 14px;">${value}</td>
            </tr>
          `).join('')}
        </table>

        <div style="margin-top: 24px; padding: 20px; background: #081522; border-left: 2px solid #00d4ff;">
          <p style="color: #8ba3c0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Message</p>
          <p style="color: #f0f6ff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}