const RESEND_ENDPOINT = 'https://api.resend.com/emails'

export async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    // Use Resend API
    try {
      await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'noreply@hookha-shop.com',
          to,
          subject,
          html,
        }),
      })
      return true
    } catch (err) {
      console.error('Resend send error', err)
      // fallthrough to nodemailer
    }
  }

  // Fallback to nodemailer
  try {
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: Number(process.env.SMTP_PORT || 1025),
      secure: false,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@hookha-shop.com',
      to,
      subject,
      html,
    })

    return true
  } catch (err) {
    console.error('Nodemailer send error', err)
    return false
  }
}
