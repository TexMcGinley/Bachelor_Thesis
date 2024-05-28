const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  fetchMovies: () => ipcRenderer.invoke("fetch-movies"),
});
