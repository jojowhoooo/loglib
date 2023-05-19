/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      "./examples/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  "overrides": [
    {
      "files": ["**/tsup.config.ts"],
      "parserOptions": {
        "project": [
          "./tsconfig.json",
          "./packages/tracker/tsconfig.json"
        ]
      }
    }
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off"
  },
  ignorePatterns: [
    "**/dist/**",
    "**/node_modules/**",
    ".eslintrc.cjs",
    "**/config.*",
  ],
};

module.exports = config;
