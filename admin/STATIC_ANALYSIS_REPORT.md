# Admin Frontend Static Analysis Report

Date: 2025-09-29
Scope: prescripto_full-stack_doctor_appointment_app-2918/admin (React + Vite)

Tooling:
- ESLint v9 (flat config)
- Plugins: eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh

Configuration:
- Migrated from legacy .eslintrc.cjs to eslint.config.cjs (flat config) to be compatible with ESLint v9+.
- Rules enabled:
  - Core: no-unused-vars (warn), no-undef (error)
  - React: react/jsx-no-target-blank (off), JSX runtime assumptions (no react/react-in-jsx-scope)
  - React Hooks: rules-of-hooks (error), exhaustive-deps (warn)
  - Vite React Refresh: react-refresh/only-export-components (warn)

Summary of Findings:
- No build-blocking issues detected in a quick review of representative files (App.jsx, components/Navbar.jsx, components/Sidebar.jsx, context/*, pages/Login.jsx).
- Potential warnings expected:
  - react-hooks/exhaustive-deps warnings in context providers where side-effect functions (e.g., getAllDoctors, getDashData, getAppointments) are defined but not wrapped or memoized. These functions are called directly by UI components and not within effects in the scanned code, so risk is low.
  - no-unused-vars may appear in some files if imports are added later and not used. Current representative files appear clean.
- No PropTypes usage (not required for this codebase). If PropTypes enforcement is desired, consider adding eslint-plugin-react settings or TypeScript for types.

Notable Observations:
- Environment variables used via import.meta.env (Vite) in contexts and login page. Ensure .env contains:
  - VITE_BACKEND_URL
  - VITE_CURRENCY (used in AppContext)
- Token management uses localStorage; logout clears tokens consistently in Navbar.
- Some console.log statements in contexts (e.g., getProfileData, error cases). These are acceptable for development; consider adding a rule to warn on console usage for production readiness.

Recommendations:
1. If exhaustive-deps warnings become noisy, consider wrapping context API-call functions with useCallback or disabling the rule per-line with a rationale comment.
2. Optionally enable additional rules for code style consistency:
   - eqeqeq: 'warn'
   - no-console: 'warn' (except for errors)
3. Optionally add PropTypes or migrate to TypeScript for component props validation in larger components.

How to Reproduce Locally:
- npm run lint (from admin directory)

This report will be updated if future lint runs reveal new issues as the codebase evolves.
