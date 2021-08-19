// const electron = require("electron");

const { app, BrowserWindow, globalShortcut } = require("electron");

let application;

function createWindow() {
  application = new BrowserWindow({
    width: 800,
    height: 600,
  });
  application.loadFile("index.html");
}
// Create the app when ready.
app.whenReady().then(() => {
  globalShortcut.register("Space", () => {});

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Handling app's lifecycle
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
