const checker = require("license-checker");
const pkg = require("./package.json");
const { parallel } = require("gulp");
const { spawn } = require("child_process");
const { cmd } = require("dstash-config/gulp-helpers.js");
const findWorkspacePackages = require("@pnpm/find-workspace-packages").default;

const whitelist = [
  "0BSD",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "CC-BY-3.0",
  "CC-BY-4.0",
  "CC0-1.0",
  "ISC",
  "MIT",
  "MPL-2.0",
  "Public Domain",
  "Python-2.0",
];
const deps = async () => {
  const workspace = await findWorkspacePackages(".");
  const pkgs = [
    `${pkg.name}@${pkg.version}`,
    ...workspace.map(({ manifest }) => `${manifest.name}@${manifest.version}`),
  ].join(";");
  return new Promise((resolve, reject) =>
    checker.init(
      {
        start: process.cwd(),
        onlyAllow: whitelist.join(";"),
        excludePackages: pkgs,
      },
      (err) => (err ? reject(err) : resolve())
    )
  );
};
const turbo = () =>
  spawn(cmd.pnpx, ["turbo", "run", "lint", "--since=HEAD", "--concurrency=1"], {
    stdio: "inherit",
  });

exports.lint = parallel(deps, turbo);
