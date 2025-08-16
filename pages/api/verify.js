// pages/api/verify-session.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;
  if (!session_id) return res.json({ active: false });

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['subscription']
  });

  const active = session.subscription?.status === 'active';
  res.json({ active });
}
