import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import globals from "globals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },

  // JS recommended
  js.configs.recommended,

  // TypeScript recommended
  ...tseslint.configs.recommended,

  // @eslint-react recommended (replaces eslint-plugin-react; ESLint 10 native)
  reactPlugin.configs["recommended-typescript"],

  // React Hooks recommended (ESLint 10 compatible, flat config)
  reactHooks.configs.flat.recommended,

  // Next.js core-web-vitals as flat config
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // TSX/TS global settings — browser + node globals
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Project rules
  {
    rules: {
      // Disallow console.log — only warn/error allowed for server-side logging
      "no-console": ["error", { allow: ["warn", "error"] }],

      // TypeScript strict rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Correctness
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",

      // Why: @eslint-react introduces stricter rules than the old eslint-plugin-react.
      // These flag legitimate but pre-existing patterns; fixing them is out of scope
      // for a dependency bump. Revisit in a dedicated refactor phase.
      "@eslint-react/no-array-index-key": "off",
      "@eslint-react/set-state-in-effect": "off",
    },
  },

  // Config files use require() for plugin loading — allowed
  {
    files: ["tailwind.config.ts", "*.config.ts", "*.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default config;
