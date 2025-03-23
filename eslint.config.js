import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";

export default tseslint.config(
  {
    ignores: [
      "dist",
      ".storybook",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.story.{ts|tsx}",
      "**/*.stories.{ts|tsx}",
      "**/*.config.{ts|tsx}",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.cjs",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true },
      ],
    },
  }
);
