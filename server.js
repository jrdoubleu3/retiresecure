require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/process-payment', async (req, res) => {
    const { paymentMethodId, name, email } = req.body;

    try {
        // Validate required fields
        if (!paymentMethodId || !email) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Check for existing customer
        const existingCustomers = await stripe.customers.list({
            email: email,
            limit: 1
        });

        let customer;

        if (existingCustomers.data.length > 0) {
            // Update existing customer
            customer = existingCustomers.data[0];

            // Update customer details if name changed
            if (name && name !== customer.name) {
                customer = await stripe.customers.update(customer.id, {
                    name: name
                });
            }

            // Attach new payment method - using paymentMethodId directly
            await stripe.paymentMethods.attach(paymentMethodId, {
                customer: customer.id
            });

            // Set as default payment method - using paymentMethodId directly
            await stripe.customers.update(customer.id, {
                invoice_settings: {
                    default_payment_method: paymentMethodId
                }
            });
        } else {
            // Create new customer - using paymentMethodId directly
            customer = await stripe.customers.create({
                email: email,
                name: name,
                payment_method: paymentMethodId,
                invoice_settings: {
                    default_payment_method: paymentMethodId
                }
            });
        }

        // Return success response
        res.json({
            success: true,
            customerId: customer.id
        });

    } catch (error) {
        console.error('Error processing payment details:', error);

        // Format user-friendly error message
        let errorMessage = 'An unexpected error occurred';
        
        if (error.type === 'StripeCardError') {
            errorMessage = error.message;
        } else if (error.type === 'StripeInvalidRequestError') {
            errorMessage = 'Invalid payment information';
        }

        res.status(400).json({
            success: false,
            error: errorMessage
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 