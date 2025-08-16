import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 你的价格 ID（你提供的）
const PRICES = {
  monthly: 'price_1RwrLRGuF6ZMRZhlkshKAGbM', // $9.9 / month
  yearly:  'price_1RwrSuGuF6ZMRZhl1SZZqHSM', // $79 / year
};

export default async function handler(req, res) {
  try {
    // 支持 GET ?plan=monthly 或 POST { plan }
    const plan = (req.method === 'POST'
      ? (req.body?.plan || 'monthly')
      : (req.query?.plan || 'monthly'));

    const priceId = PRICES[plan] || PRICES.monthly;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'http://localhost:3000/noise-pro?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/'
    });

    // GET：直接 302 跳转；POST：返回 JSON
    if (req.method === 'GET') {
      res.writeHead(302, { Location: session.url });
      res.end();
    } else {
      res.status(200).json({ url: session.url });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
}
