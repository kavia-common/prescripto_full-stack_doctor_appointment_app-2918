Admin Testing Guide

Overview
- Frameworks: Jest + React Testing Library
- Environment: jsdom
- Setup: src/tests/setup/jest.setup.js
- Helpers: src/tests/utils/test-utils.jsx

Commands
- Install deps: npm install
- Run tests: npm test
- Watch: npm run test:watch
- Coverage: npm run test:coverage

Structure
- Unit tests: src/**/__tests__/*.unit.test.jsx
- Integration tests: src/**/__tests__/*.integration.test.jsx

Notes
- Use renderWithProviders to include Router and Admin/Doctor/App contexts.
- Mock network via global.fetch or axios mocks in tests.
- Env vars are polyfilled with safe defaults in setup.
