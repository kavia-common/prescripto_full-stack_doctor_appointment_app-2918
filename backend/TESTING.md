Backend Testing Guide (Jest + Supertest)

Overview
- Test Runner: Jest (Node environment)
- HTTP Testing: Supertest
- Scope: Unit tests for middleware/controllers and integration tests for Express routes.

Environment Variables
The backend relies on these environment variables (from the project):
- REACT_APP_VITE_API_URL
- REACT_APP_STRIPE_API_KEY
- REACT_APP_MONGO_URI
- REACT_APP_JWT_SECRET
- REACT_APP_RAZORPAY_API_KEY

For tests, defaults are provided via tests/setup/setEnv.js. If you need custom values, set them before running tests:
REACT_APP_JWT_SECRET=your_secret npm test

How to Run
- Install dependencies (from backend folder):
  npm install

- Run all tests once:
  npm test

- Watch mode:
  npm run test:watch

- Coverage report:
  npm run test:coverage
  The report will be written to backend/coverage/

Test Structure
- tests/setup/setEnv.js -> Sets test env and mocks external services setup (Mongo, Cloudinary).
- tests/integration/*.int.test.js -> Integration tests using Supertest against an in-memory Express app (app.js).
- tests/unit/**/*.unit.test.js -> Unit tests for middleware and controllers.

Important Notes
- app.js exports a createApp() function to compose the Express app without starting the HTTP server. This avoids binding to ports in tests and allows fast integration tests.
- server.js is unchanged for runtime behavior but now uses createApp() internally.
- External services (Mongo, Cloudinary) are mocked during tests to prevent real connections. If your code strictly requires DB calls for certain routes, consider mocking models or using an in-memory DB for richer integration tests.
