const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

app.get('/', (req, res) => {
    res.send('API running on Vercel 🚀');
});

app.post('/api/payment', async (req, res) => {
    try {
        const { amount, currency = 'usd', order_description } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        const response = await axios.post(
            `${NOWPAYMENTS_API_URL}/payment`,
            {
                price_amount: amount,
                price_currency: currency,
                pay_currency: 'btc',
                order_description: order_description || 'Donation to Gaza',
                ipn_callback_url: 'https://your-callback-url.com/ipn',
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

// ✅ IMPORTANT: export app instead of listen
module.exports = app;
