// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { contextBridge, ipcRenderer } from "electron";

// MainWorld in this context is the main renderer process, not the main process
contextBridge.exposeInMainWorld("stash", {
  node: () => ipcRenderer.invoke("node.get"),
  stash: () => ipcRenderer.invoke("stash.get"),
} as Window["stash"]);

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(
      `${type}-version`,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.versions[type as keyof NodeJS.ProcessVersions]!
    );
  }
});
