module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'next/core-web-vitals',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
