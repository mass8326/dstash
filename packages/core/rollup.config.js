import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

// Rollup takes care of all files except for migrations
// Transpile and emit migrations with tsc afterward

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
    },
    plugins: [
      commonjs(),
      typescript(),
      replace({
        preventAssignment: true,
        values: {
          "module.hot": "(undefined)", // Webpack development server
        },
      }),
    ],
  },
];
