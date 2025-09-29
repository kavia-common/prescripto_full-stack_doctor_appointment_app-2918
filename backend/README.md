# Backend

## Testing
We use Jest + Supertest for unit and integration tests.

- Install dependencies:
  npm install

- Run tests:
  npm test

See TESTING.md for more details. (Express) - Environment and Payments Configuration

This backend powers the Prescripto doctor appointment application.

## Setup

1) Install dependencies:
   npm install

2) Create your environment file:
   - Copy .env.example to .env
   - Fill all required values

3) Run the server:
   - Development: npm run dev
   - Production:  npm start

## Required Environment Variables

- Server
  - PORT=3001
  - CORS_ORIGIN=http://localhost:5173,http://localhost:5174

- Database
  - MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
  - DB_NAME=prescripto

- JWT
  - JWT_SECRET=your_jwt_secret_here

- Cloudinary
  - CLOUDINARY_NAME=your_cloudinary_cloud_name
  - CLOUDINARY_API_KEY=your_cloudinary_api_key
  - CLOUDINARY_API_SECRET=your_cloudinary_api_secret

- Payments
  - CURRENCY=INR (or USD, etc.)

- Stripe (required to enable Stripe checkout)
  - STRIPE_SECRET_KEY=sk_test_xxx (or sk_live_xxx in production)

- Razorpay (required to enable Razorpay checkout)
  - RAZORPAY_KEY_ID=rzp_test_xxx
  - RAZORPAY_KEY_SECRET=your_razorpay_secret

- Admin Login
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=change_this_password

## Stripe Configuration Notes

- The backend initializes Stripe with STRIPE_SECRET_KEY at startup. If the variable is missing or invalid:
  - A warning is logged at startup.
  - The /api/user/payment-stripe endpoint will respond with 500 and clear text:
    "Stripe is not configured on the server. Please set STRIPE_SECRET_KEY."
- Ensure CURRENCY is set to a valid ISO currency (e.g., INR, USD). It is normalized to lowercase at runtime.

## Health Check

- GET /healthz
  - Returns service status and database status. If DB is not connected yet, returns 503.

```json
{
  "service": "ok",
  "db": "connected|connecting|disconnected",
  "time": "2024-01-01T00:00:00.000Z"
}
```

## CORS

- Controlled by CORS_ORIGIN as a comma-separated list.
- Credentials are enabled.

