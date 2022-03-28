import * as path from "path";
import core from "dstash-core";
import { app, BrowserWindow } from "electron";

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: { preload: path.join(__dirname, "preload.js") },
    height: 720,
    width: 1280,
  });
  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  mainWindow.webContents.openDevTools();
}

Promise.all([app.whenReady(), core.bootstrap()]).then(createWindow);

app.on("window-all-closed", () => {
  // MacOS - require explicit quit rather than all windows closed
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", function () {
  // MacOS - counterpart to requiring explicit quit
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
