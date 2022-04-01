module.exports = {
  extends: ["./ts.eslintrc.js"],
  plugins: ["svelte3"],
  ignorePatterns: ["*.cjs"],
  overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
  settings: { "svelte3/typescript": () => require("typescript") },
  parserOptions: { sourceType: "module" },
  env: {
    browser: true,
    es2017: true,
  },
};
