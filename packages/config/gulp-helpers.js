module.exports.cmd =
  process.platform === "win32"
    ? { pnpm: "pnpm.cmd", pnpx: "pnpx.cmd" }
    : { pnpm: "pnpm", pnpx: "pnpx" };
