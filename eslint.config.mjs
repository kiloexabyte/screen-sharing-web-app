import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import functional from "eslint-plugin-functional";
import prettier from "eslint-config-prettier";
import vueParser from "vue-eslint-parser";

export default [
	// Global ignores
	{
		ignores: [
			".nuxt/",
			".output/",
			"node_modules/",
			"dist/",
			".ops/",
			"tests/.nuxt/",
		],
	},

	// Base configs
	js.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/recommended"],

	// Vue + TypeScript parser integration
	{
		files: ["**/*.vue"],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				sourceType: "module",
			},
		},
	},

	// Go-like rules for all files
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"],
		plugins: {
			functional,
		},
		rules: {
			// TypeScript handles undefined variable checks; disable ESLint's
			// version which doesn't understand TS types or Nuxt auto-imports
			"no-undef": "off",

			// Nuxt file-based routing uses single-word page/component names
			"vue/multi-word-component-names": "off",

			// No classes or this
			"functional/no-classes": "error",
			"functional/no-this-expressions": "error",

			// Return errors instead of throwing (warn for now)
			"functional/no-throw-statements": "warn",
			"functional/no-try-statements": "warn",

			// No ternaries
			"no-ternary": "error",

			// No nullish coalescing (??)
			"no-restricted-syntax": [
				"error",
				{
					selector: "LogicalExpression[operator='??']",
					message: "Nullish coalescing (??) is not allowed.",
				},
			],

			// Always use braces
			curly: ["error", "all"],

			// Early returns
			"no-else-return": "error",

			// Immutable variables
			"prefer-const": "error",
			"no-var": "error",

			// No parameter reassignment
			"no-param-reassign": "error",

			// Allow underscore-prefixed unused args (Go convention for _ params)
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],

			// Downgrade to warn (many existing any types in codebase)
			"@typescript-eslint/no-explicit-any": "warn",
		},
	},

	// Server-side override: relax throw rules (Nitro's throw createError() is idiomatic)
	{
		files: ["server/**/*.ts"],
		rules: {
			"functional/no-throw-statements": "off",
		},
	},

	// Test override: relax throw/try/immutable rules
	{
		files: ["tests/**/*.{ts,tsx}", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
		rules: {
			"functional/no-throw-statements": "off",
			"functional/no-try-statements": "off",
		},
	},

	// Prettier last to avoid formatting conflicts
	prettier,
];
