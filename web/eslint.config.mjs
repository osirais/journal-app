import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
});

export default defineConfig([
  { ignores: [".next/**", "**/*.config.*", "components/ui/**"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    plugins: { js },
    extends: ["js/recommended"]
  },
  tseslint.configs.recommended,
  ...compat.config({
    extends: ["next/core-web-vitals"]
  }),
  prettier,
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off"
    }
  }
]);
