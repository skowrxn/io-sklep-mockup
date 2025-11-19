import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

app.use(cors());
app.use(express.json());

// Endpoint do tworzenia sesji Stripe Checkout
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { productName, price, quantity = 1, items } = req.body;

    // Obsługa pojedynczego produktu lub wielu produktów (koszyk)
    let lineItems;

    if (items && Array.isArray(items)) {
      // Wiele produktów z koszyka
      lineItems = items.map(item => ({
        price_data: {
          currency: 'pln',
          product_data: {
            name: item.name || item.productName,
            description: item.description || undefined,
          },
          unit_amount: Math.round(item.price * 100), // Stripe wymaga kwoty w groszach
        },
        quantity: item.quantity || 1,
      }));
    } else {
      // Pojedynczy produkt
      lineItems = [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(price * 100), // Stripe wymaga kwoty w groszach
          },
          quantity: quantity,
        },
      ];
    }

    // Tworzenie sesji Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['PL'],
      },
      locale: 'pl',
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({
      error: error.message || 'Błąd podczas tworzenia sesji płatności'
    });
  }
});

// Endpoint do weryfikacji sesji płatności
app.get('/session-status/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    res.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Błąd podczas weryfikacji sesji płatności' });
  }
});

// Webhook do obsługi zdarzeń Stripe (opcjonalny, ale zalecany)
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn('⚠️  Webhook secret not configured - webhooks disabled');
    return res.json({ received: false, message: 'Webhook secret not configured' });
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    // Obsługa różnych zdarzeń
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment successful:', session.id);
        // Tutaj możesz dodać logikę np. wysyłanie emaila, zapisywanie zamówienia do bazy danych
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent successful:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serwer uruchomiony na porcie ${PORT}`);
  console.log(`📍 Endpoint: http://localhost:${PORT}/create-checkout-session`);

  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️  OSTRZEŻENIE: STRIPE_SECRET_KEY nie jest ustawiony w pliku .env');
  }
});
