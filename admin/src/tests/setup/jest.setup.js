import '@testing-library/jest-dom';

// Polyfill fetch for tests that may call API endpoints
import 'whatwg-fetch';

// Ensure environment variables can be referenced in tests if components read them
process.env = {
  ...process.env,
  REACT_APP_VITE_API_URL: process.env.REACT_APP_VITE_API_URL || 'http://localhost:4000',
  REACT_APP_MONGO_URI: process.env.REACT_APP_MONGO_URI || 'mongodb://localhost:27017/test',
  REACT_APP_JWT_SECRET: process.env.REACT_APP_JWT_SECRET || 'testsecret',
  REACT_APP_STRIPE_API_KEY: process.env.REACT_APP_STRIPE_API_KEY || 'sk_test_123',
  REACT_APP_RAZORPAY_API_KEY: process.env.REACT_APP_RAZORPAY_API_KEY || 'rzp_test_123',
};
