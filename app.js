// const electron = require("electron");

const { app, BrowserWindow } = require("electron");

let application;

function createWindow() {
  application = new BrowserWindow({
    width: 960,
    height: 660,
  });
  application.loadFile("index.html");
}
// Create the app when ready.
app.whenReady().then(() => {
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
