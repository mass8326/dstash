import gulp from "gulp";
import { spawn } from "child_process";
import { cmd } from "dstash-config/gulp-helpers.js";

const svelte = () =>
  spawn(cmd.pnpx, ["svelte-kit", "dev"], { stdio: "inherit" });
const watch = () =>
  spawn(
    cmd.pnpx,
    ["svelte-check", "--tsconfig", "./tsconfig.json", "--watch"],
    { stdio: "inherit" }
  );

export const dev = gulp.parallel(svelte, watch);
