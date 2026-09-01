export async function sendSms(to: string, text: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_PHONE_NUMBER

  if (accountSid && authToken && from) {
    try {
      const twilio = await import('twilio')
      const client = twilio(accountSid, authToken)
      await client.messages.create({ body: text, from, to })
      return true
    } catch (err) {
      console.error('Twilio send error', err)
      return false
    }
  }

  // Fallback: log the SMS (development)
  console.warn(`SMS to ${to}: ${text}`)
  return true
}
