import Stripe from 'stripe'

let stripe: Stripe | null = null

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })
}

export function getStripe() {
  if (!stripe) throw new Error('Stripe not configured. Set STRIPE_SECRET_KEY.')
  return stripe
}
