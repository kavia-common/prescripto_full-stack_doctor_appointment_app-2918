module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    // Allow target _blank without rel, handled by app constraints
    'react/jsx-no-target-blank': 'off',
    // Prefer consistent React 18 patterns
    'react/prop-types': 'off',
    // Keep Vite fast-refresh rule
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Reduce no-unused-vars noise for underscore-prefixed
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
  }
}
