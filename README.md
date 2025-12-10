# Donation Project

## Deployment

This project is ready for deployment.

### Prerequisites
- Node.js installed
- NOWPayments API Key (in .env)

### Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your API key:
   ```
   NOWPAYMENTS_API_KEY=your_api_key_here
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

### Deployment (e.g., Render, Heroku)
1. Push this repository to GitHub.
2. Connect your repository to your hosting provider.
3. Set the `Build Command` to `npm install`.
4. Set the `Start Command` to `npm start`.
5. Add your `NOWPAYMENTS_API_KEY` in the environment variables settings of your hosting provider.

### Structure
- `index.html`: Main landing page.
- `donate-gaza.html`: Donation campaign page.
- `onboarding.html`: Payment flow.
- `server.js`: Backend for payment processing.
