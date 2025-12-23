const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, number, message } = req.body;

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
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;

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