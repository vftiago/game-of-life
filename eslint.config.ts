import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          ignoreCase: true,
          newlinesBetween: 0,
          order: "asc",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-jsx-props": [
        "warn",
        {
          customGroups: [
            { groupName: "shorthand", modifiers: ["shorthand"] },
            { elementNamePattern: "^on.+", groupName: "callback" },
          ],
          groups: ["shorthand", "unknown", "callback"],
          ignoreCase: true,
          order: "asc",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-objects": [
        "warn",
        {
          ignoreCase: true,
          order: "asc",
          type: "alphabetical",
        },
      ],
    },
  },
]);
