// pages/api/verify.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.json({ active: false });

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription']
    });
    const sub = session.subscription;

    const active =
      sub &&
      ['active', 'trialing', 'past_due'].includes(sub.status); // 视需求放宽或收紧

    res.json({ active, status: sub?.status || 'none', price: sub?.items?.data?.[0]?.price?.id });
  } catch (e) {
    console.error(e);
    res.json({ active: false, error: e.message });
  }
}
