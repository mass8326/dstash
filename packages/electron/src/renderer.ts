document
  .getElementById("node")
  ?.addEventListener("click", async () =>
    console.log(await window.stash.node())
  );
document
  .getElementById("stash")
  ?.addEventListener("click", async () =>
    console.log(await window.stash.stash())
  );
