import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default [
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules (these are arrays, spread works)
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,

  // Next.js plugin configuration (flat config)
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Main custom rules
  {
    plugins: {
      "react-hooks": reactHooks,
      react,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },

    files: ["eslint.config.mjs"],
    languageOptions: {
      parserOptions: { project: null },
    },

    rules: {
      // -----------------------
      // General Production Rules
      // -----------------------
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "warn",

      // -----------------------
      // TypeScript
      // -----------------------
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",

      // -----------------------
      // React
      // -----------------------
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",

      // Hooks correctness
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // -----------------------
      // Accessibility
      // -----------------------
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      // -----------------------
      // Imports
      // -----------------------
      "import/no-duplicates": "error",
      "import/no-cycle": "warn",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // -----------------------
      // Code Quality
      // -----------------------
      "max-depth": ["warn", 4],
      "max-lines": ["warn", 300],
      complexity: ["warn", 10],

      // -----------------------
      // Next.js (already included above, but override if needed)
      // -----------------------
      "@next/next/no-img-element": "warn",
    },
  },

  // Test files overrides
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
    },
  },

  // Ignore patterns
  {
    ignores: ["node_modules", ".next", "dist", "build", "coverage"],
  },
];
