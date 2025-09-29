/// ESLint Flat Config for Frontend (React + Vite)
// Aligns with Admin container config to support ESLint v9+ flat config.

// PUBLIC_INTERFACE
module.exports = [
  {
    ignores: ['dist', '.eslintrc.cjs', 'node_modules'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        import: 'readonly', // Vite import.meta
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-refresh': require('eslint-plugin-react-refresh'),
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    rules: {
      // Base/Recommended
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error',

      // React
      'react/jsx-uses-react': 'off', // Not needed for new JSX transform
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'react/jsx-no-target-blank': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
