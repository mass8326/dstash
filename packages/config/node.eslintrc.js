module.exports = {
  extends: [
    "./ts.eslintrc.js",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["import", "unicorn"],
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "object",
          "unknown",
        ],
      },
    ],
    "import/no-unresolved": ["off"]
  },
};
