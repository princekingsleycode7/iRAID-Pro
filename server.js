const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from root


const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY   // Fallback for testing if env not set
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

app.post('/api/payment', async (req, res) => {
    try {
        const { amount, currency = 'usd', order_description } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        // Create payment
        const response = await axios.post(
            `${NOWPAYMENTS_API_URL}/payment`,
            {
                price_amount: amount,
                price_currency: currency,
                pay_currency: 'btc', // Default to BTC for now, can be dynamic
                order_description: order_description || 'Donation to Gaza',
                ipn_callback_url: 'https://your-callback-url.com/ipn', // Replace with actual callback
            },
            {
                headers: {
                    'x-api-key': NOWPAYMENTS_API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Payment Error:', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: 'Failed to create payment',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
