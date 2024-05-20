import { fileURLToPath } from "url";
import { app, BrowserWindow } from "electron";
import path from "path";
import { ipcMain } from "electron";
import fetch from "node-fetch"; // Ensure node-fetch is installed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// // Define whether the app is in development mode
// const isDev = !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true, // This should be true for security reasons
    },
  });

  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, "../build/index.html")}`
    : "http://localhost:5174"; // Assuming Vite runs on 5174
  mainWindow.loadURL(startUrl);

  // Open the DevTools automatically if in development
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("fetch-movies", async () => {
  try {
    const response = await fetch("http://localhost:5000/movies");
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
