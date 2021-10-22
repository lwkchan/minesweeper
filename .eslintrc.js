module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['src/rust/**', 'src/wasm/**'],
  extends: [
    "react-app",
    "react-app/jest"
  ],
  root: true,
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
};
