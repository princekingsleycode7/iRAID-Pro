const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();
<<<<<<< HEAD
=======
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { message: 'Too many requests. Please try again later.' }
});

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { message: 'Too many subscription attempts. Please try again later.' }
});
>>>>>>> 8a6789a (Initial commit of optimized IRAID platform)

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
<<<<<<< HEAD
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, number, message } = req.body;

=======
const allowedOrigins = [
  'https://iraid.com.ng', 'https://iraidng.vercel.app',// replace with actual production domain
  'http://localhost:3000'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, number, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }
  if (name.length > 100 || message.length > 2000) {
    return res.status(400).json({ message: 'Input exceeds allowed length.' });
  }

>>>>>>> 8a6789a (Initial commit of optimized IRAID platform)
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

// Newsletter subscription endpoint
<<<<<<< HEAD
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;

=======
app.post('/api/newsletter', newsletterLimiter, async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'A valid email address is required.' });
  }

>>>>>>> 8a6789a (Initial commit of optimized IRAID platform)
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
      `
    });

    res.status(200).json({ message: 'Newsletter subscription successful!' });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    res.status(500).json({ message: 'Failed to subscribe to newsletter.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});