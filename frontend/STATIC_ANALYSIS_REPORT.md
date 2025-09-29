# Frontend Static Analysis Report (ESLint)

Date: 2025-09-29
Container: frontend
Framework: React (Vite)
Command: `npm run lint`
Config: `.eslintrc.cjs` (extends `eslint:recommended`, `plugin:react/recommended`, `plugin:react/jsx-runtime`, `plugin:react-hooks/recommended`)

Summary:
- Total problems: 33
  - Errors: 25
  - Warnings: 8

Detailed Findings:
1) no-unused-vars (Errors)
- Many components import `React` or hooks but do not use them (new JSX runtime does not require `import React`):
  - src/App.jsx: 'React' unused
  - src/components/Banner.jsx: 'React' unused
  - src/components/Footer.jsx: 'React' unused
  - src/components/Header.jsx: 'React' unused
  - src/components/Navbar.jsx: 'React' unused
  - src/components/RelatedDoctors.jsx: 'React' unused
  - src/components/SpecialityMenu.jsx: 'React' unused
  - src/components/TopDoctors.jsx: 'React' unused
  - src/main.jsx: 'React' unused
  - src/pages/About.jsx: 'React' unused
  - src/pages/Appointment.jsx: 'React' unused
  - src/pages/Contact.jsx: 'React' unused
  - src/pages/Doctors.jsx: 'React' unused
  - src/pages/Home.jsx: 'React' unused
  - src/pages/Login.jsx: 'React' unused
  - src/pages/MyAppointments.jsx: 'React' unused
  - src/pages/MyProfile.jsx: 'React' and 'useEffect' unused
  - src/pages/Verify.jsx: 'React' unused; 'setSearchParams' assigned but unused

2) react/no-unescaped-entities (Errors)
- Unescaped apostrophes in JSX text:
  - src/components/Footer.jsx (line ~11)
  - src/pages/About.jsx (line ~16)

3) react/prop-types (Errors)
- Missing prop validation:
  - src/components/RelatedDoctors.jsx: 'speciality', 'docId'
  - src/context/AppContext.jsx: 'children'

4) react-hooks/exhaustive-deps (Warnings)
- Missing dependencies in useEffect arrays:
  - src/context/AppContext.jsx: getDoctosData, loadUserProfileData
  - src/pages/Appointment.jsx: fetchDocInfo, getAvailableSolts
  - src/pages/Doctors.jsx: applyFilter
  - src/pages/Login.jsx: navigate
  - src/pages/MyAppointments.jsx: getUserAppointments
  - src/pages/Verify.jsx: appointmentId, success, verifyStripe

Recommendations:
- Remove unused React imports and unused variables/hooks.
- Escape apostrophes in JSX using `&apos;` or alternative wording.
- Add PropTypes to affected components (or switch to TypeScript if desired):
  - RelatedDoctors.jsx: define propTypes for `speciality` (string) and `docId` (string or number per usage).
  - AppContext.jsx: define propTypes for `children` (node).
- For exhaustive-deps warnings:
  - Wrap functions in `useCallback` and include in dependency arrays, or
  - Add an ESLint disable comment with justification at specific lines if re-renders would cause issues.

Next Steps (if fixing issues is in scope):
- Remove `import React from 'react'` from all affected files.
- Update text literals to escape apostrophes.
- Add PropTypes to `RelatedDoctors.jsx` and `AppContext.jsx`.
- Evaluate and fix useEffect dependency arrays or document intentional omissions.

Notes:
- ESLint version: ^8.57.0
- React 18 JSX runtime enabled via `plugin:react/jsx-runtime`
