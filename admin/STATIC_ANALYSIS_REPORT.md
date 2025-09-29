# Static Analysis Report — Admin (React)

Date: 2025-09-29
Scope: prescripto_full-stack_doctor_appointment_app-2918/admin

Summary
- ESLint executed successfully using the existing configuration.
- Reported 0 errors and 0 warnings for analyzed files.
- However, most core React source files under `src/` did not appear in the ESLint JSON output, indicating coverage gaps in analysis.

What was run
- Node: v18.20.8, npm: 10.8.2
- Lint command: `npx eslint -f json . > eslint-report.json`
- ESLint config: `.eslintrc.cjs` with:
  - extends: eslint:recommended, plugin:react/recommended, plugin:react/jsx-runtime, plugin:react-hooks/recommended
  - plugins: react-refresh
  - rules: react/jsx-no-target-blank off; react-refresh/only-export-components warn
  - settings: react version 18.2
  - ignorePatterns: dist, .eslintrc.cjs

Observed output files covered
- postcss.config.js
- tailwind.config.js
- vite.config.js
- src/assets/assets.js

Potential configuration gap
- The majority of JSX files under `src/` (e.g., App.jsx, main.jsx, components, context, pages) were not included in the ESLint output. This suggests a coverage gap due to ESLint invocation/globs or an ignore behavior.

Findings (from current run)
- No code issues (0 errors, 0 warnings) on the limited set of analyzed files.
- ESLint metadata indicated “usedDeprecatedRules”: no-extra-semi, no-mixed-spaces-and-tabs (not violations in code, just deprecation metadata in the engine context).

Actionable Recommendations

1) Ensure ESLint scans all source files
- Update lint scripts to explicitly include src:
  - package.json scripts:
    - "lint": "eslint \"src/**/*.{js,jsx}\" --report-unused-disable-directives --max-warnings 0"
    - "lint:ci": "eslint \"src/**/*.{js,jsx}\" --format json -o eslint-report.json --max-warnings 0"
- Optionally keep a root lint: "eslint . --ext js,jsx --ignore-pattern dist --ignore-pattern node_modules"

2) Strengthen ESLint rules with recommended plugins
- Add devDependencies:
  - eslint-plugin-import
  - eslint-plugin-jsx-a11y
  - eslint-plugin-unused-imports
- Update .eslintrc.cjs:
  - extends: add 'plugin:jsx-a11y/recommended'
  - rules (suggested):
    - "unused-imports/no-unused-imports": "warn"
    - "import/order": ["warn", { "groups": ["builtin", "external", "internal", "parent", "sibling", "index"], "newlines-between": "always" }]
    - "react/prop-types": "off" (if not using PropTypes), or "warn" if desired.

3) Optional: Prettier integration
- Add:
  - prettier
  - eslint-plugin-prettier
  - eslint-config-prettier
- Extend: "plugin:prettier/recommended"
- Add scripts:
  - "format": "prettier --write ."
  - "lint:fix": "eslint \"src/**/*.{js,jsx}\" --fix"
- Create .prettierrc with desired formatting rules.

4) Vite environment variables best practices
- Vite exposes only variables prefixed with VITE_ in client builds.
- Current .env variable names (container_env): REACT_APP_VITE_API_URL, REACT_APP_MONGO_URI, REACT_APP_JWT_SECRET, REACT_APP_STRIPE_API_KEY, REACT_APP_RAZORPAY_API_KEY
- Recommendation: rename to:
  - VITE_API_URL
  - VITE_MONGO_URI
  - VITE_JWT_SECRET
  - VITE_STRIPE_API_KEY
  - VITE_RAZORPAY_API_KEY
- Ensure code uses `import.meta.env.VITE_*` and not `process.env.REACT_APP_*`.

5) Anticipated issues once full scan is enabled
- Unused imports/variables across pages and contexts.
- Missing dependencies in useEffect hooks (react-hooks/exhaustive-deps).
- Missing key props in list renders.
- Accessibility issues (jsx-a11y).
- Router usage compliance with react-router-dom v6.
- PropType validations if not using TypeScript.

6) CI integration
- Add a CI step to run `npm run lint:ci` and store eslint-report.json as artifact.
- Consider failing CI on warnings for stricter quality gates.

Next steps for the team
- Update lint script globs as suggested and re-run ESLint to produce a complete report of the src directory.
- Decide on plugin adoption (import, jsx-a11y, unused-imports) and, optionally, Prettier integration.
- Adjust environment variable naming for Vite and revise code references accordingly.

Note: This step intentionally does not modify code or configuration files. It documents the analysis results and actionable improvements.
