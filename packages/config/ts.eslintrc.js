module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: { ecmaVersion: 2021 },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: { node: true },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
  },
};
