const { default: plugin } = require("eslint-plugin-react");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
    "unused-imports/no-unused-imports": [
      "warn",
      { vars: "all", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  plugins: ["unused-imports", "@typescript-eslint"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
