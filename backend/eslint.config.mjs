export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      // Recognize Node.js global-like names to avoid false 'no-undef'
      globals: {
        // Mark as read-only globals available in Node
        process: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      // General quality rules
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'eqeqeq': ['warn', 'always'],
      'no-var': 'error',
      'prefer-const': 'warn',
      // Console warnings (allow warn/error)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    // Note: No plugins added here; recommendations provided in report.
  },
];
