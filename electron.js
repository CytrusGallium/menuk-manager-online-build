const { app, BrowserWindow } = require('electron');
const path = require('path');

// No longer need electron-is-dev
// const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Use app.isPackaged to determine if in production or development
  if (app.isPackaged) {
    // In production, load the built index.html file
    win.loadFile(path.join(__dirname, 'index.html'));
  } else {
    // In development, load from the local React dev server
    win.loadURL('http://localhost:3000');
    // And open the DevTools
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});