import { NextResponse } from 'next/server'
import { buffer } from 'stream/consumers'

export async function POST(req: Request) {
  // Webhook handling — basic guarded implementation
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ ok: true })
  }

  // For simplicity, just accept the webhook and log it. Implement signature verification in production.
  try {
    const body = await req.text()
    console.log('Stripe webhook received:', body)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook error', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
