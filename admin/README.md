# Admin - Prescripto

React + Vite based admin dashboard for managing doctors, appointments and analytics.

## Getting started
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Testing (Jest + React Testing Library)
We use Jest and React Testing Library (RTL) for unit and integration tests.

- Config: package.json -> `jest` section
- Setup file: `src/tests/setup/jest.setup.js`
- Test utilities: `src/tests/utils/test-utils.jsx` (wraps components with Router and Context providers)

Scripts:
- Run all tests: `npm test`
- Watch mode: `npm run test:watch`
- Coverage: `npm run test:coverage`

Test locations:
- Unit tests: `src/**/__tests__/*.unit.test.jsx`
- Integration tests: `src/**/__tests__/*.integration.test.jsx`

Notes:
- Tests mock network calls and localStorage where necessary.
- Environment variables used in the app are given safe defaults in the setup file.
