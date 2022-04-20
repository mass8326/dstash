import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.mjs", format: "esm" },
      { file: "dist/index.cjs", format: "cjs" },
    ],
    plugins: [commonjs(), esbuild()],
  },
]);
