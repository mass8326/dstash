import { defineConfig } from "rollup";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import esbuild from "rollup-plugin-esbuild";

export default defineConfig([
  {
    input: "src/index.ts",
    output: { dir: "dist/esm", format: "es", preserveModules: true },
    plugins: [esbuild(), optimizeLodashImports({ useLodashEs: true })],
  },
  {
    input: "src/index.ts",
    output: { dir: "dist/cjs", format: "cjs", preserveModules: true },
    plugins: [esbuild(), optimizeLodashImports()],
  },
]);
