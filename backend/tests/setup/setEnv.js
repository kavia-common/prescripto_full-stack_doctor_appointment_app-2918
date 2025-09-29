process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// For backend, these environment variables are required in runtime.
// In tests, provide safe defaults; CI/maintainers should override through .env if needed.
process.env.REACT_APP_VITE_API_URL = process.env.REACT_APP_VITE_API_URL || 'http://localhost:4000';
process.env.REACT_APP_STRIPE_API_KEY = process.env.REACT_APP_STRIPE_API_KEY || 'sk_test_xxx';
process.env.REACT_APP_MONGO_URI = process.env.REACT_APP_MONGO_URI || 'mongodb://mock-uri';
process.env.REACT_APP_JWT_SECRET = process.env.REACT_APP_JWT_SECRET || 'testsecret';
process.env.REACT_APP_RAZORPAY_API_KEY = process.env.REACT_APP_RAZORPAY_API_KEY || 'rzp_test_xxx';

// Prevent accidental network calls by default in test runs by stubbing out service initializers when imported
jest.mock('../../config/mongodb.js', () => ({
  __esModule: true,
  default: () => {
    // no-op mock for Mongo connection in tests
    return Promise.resolve();
  }
}));

jest.mock('../../config/cloudinary.js', () => ({
  __esModule: true,
  default: () => {
    // no-op mock for Cloudinary setup
  }
}));
