Frontend testing (Jest + React Testing Library)

Overview
- This app uses Jest and React Testing Library (RTL) for unit and integration tests.
- Tests live under src/**/__tests__ and src/pages/**/__tests__.
- We provide:
  - Unit test: Navbar.unit.test.jsx
  - Integration test: Login.integration.test.jsx

Install dependencies
- From the frontend folder:
  - npm install

Run tests
- All tests: npm test
- Watch mode: npm run test:watch
- Coverage: npm run test:coverage

Notes
- Vite env vars (import.meta.env) are mocked in src/tests/setup/jest.setup.js.
- React-Toastify ToastContainer is mocked to avoid noisy DOM output during tests.
- For network calls, axios is mocked in tests. You can also use MSW to mock backend if you add handlers.
