const types = [
  "BUILD",
  "CHORE",
  "CI",
  "DEPS",
  "DOCS",
  "FEAT",
  "FIX",
  "PERF",
  "REFAC",
  "REV",
  "STYLE",
  "TEST",
];
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 72],
    "type-enum": [2, "always", types],
    "type-case": [2, "always", "upper-case"],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "always", "sentence-case"],
    "body-max-line-length": [2, "always", 72],
    "footer-max-line-length": [2, "always", 72],
  },
};
