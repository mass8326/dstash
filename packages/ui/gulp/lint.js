import gulp from "gulp";
import { spawn } from "child_process";
import { cmd } from "dstash-config/gulp-helpers.js";

const svelte = () =>
  spawn(
    cmd.pnpx,
    ["svelte-check", "--tsconfig", "./tsconfig.json", "--threshold", "error"],
    { stdio: "inherit" }
  );
const eslint = () =>
  spawn(
    cmd.pnpx,
    ["eslint", "--ignore-path", "../../.gitignore", "--fix", "."],
    { stdio: "inherit" }
  );

export const lint = gulp.parallel(svelte, eslint);
