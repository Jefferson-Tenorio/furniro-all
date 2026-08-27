import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": "error",
    },
  },
  {
    // Arquivos cujo trabalho é escrever no terminal: startup, request logging,
    // saída de erros e o script de seed (CLI, fora da API).
    files: [
      "src/index.ts",
      "src/middlewares/loggerMiddleware.ts",
      "src/middlewares/errorHandler.ts",
      "prisma/seed.ts",
    ],
    rules: {
      "no-console": "off",
    },
  },
]);
