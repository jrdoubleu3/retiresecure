const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ✅

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  try {
    // Create a customer in Stripe
    const customer = await stripe.customers.create({ email });

    // Create a SetupIntent to store the card without charging it
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
    });

    res.status(200).json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
// touched to trigger git tracking
