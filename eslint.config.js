const prettierPlugin = require("eslint-plugin-prettier")
const prettierConfig = require("eslint-config-prettier")
const reactAppConfig = require("eslint-config-react-app")

module.exports = [
  {
    // ...reactAppConfig,
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Include JS, JSX, TS, TSX files
    languageOptions: {
      ecmaVersion: "latest", // Supports modern JavaScript syntax
      sourceType: "module",  // For ES modules
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules, // Ensure Prettier rules don't conflict with ESLint
      "prettier/prettier": "error", // Enforce Prettier formatting as ESLint errors
    },
  },
];