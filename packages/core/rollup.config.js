import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: "src/main.ts",
    output: {
      dir: "dist",
      format: "cjs",
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [
      commonjs(),
      typescript(),
      replace({
        preventAssignment: true,
        values: {
          "process.env.BUILD_TARGET": `"${process.env.BUILD_TARGET}"`,
          "module.hot": "(undefined)", // Webpack development server
        },
      }),
    ],
  },
];
