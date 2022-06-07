//preload recebe os dados e os gerencia
const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs")
const path = require("path");
const { PythonShell } = require("python-shell");

const API = {
    window: { 
        close: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize"),
        closeBackIndex: () => ipcRenderer.send("app/closeBackIndex"),
        converterPage: () => ipcRenderer.send("app/converterPage"),
        organizarPage: () => ipcRenderer.send("app/organizarPage"),
        multipleFiles: () => ipcRenderer.send("app/multipleFiles"),
        convertImages: () => ipcRenderer.send("app/convertImages"),
        multipleImages: () => ipcRenderer.send("app/multipleImages"),
        editarPDFs: () => ipcRenderer.send("app/editarPDFs"),
        closeIndex: () => ipcRenderer.send("app/closeIndex")
    }
}

contextBridge.exposeInMainWorld("app",API);

contextBridge.exposeInMainWorld("efs", {
    statSync: fs.statSync,
})
contextBridge.exposeInMainWorld("epath", {
    basename: path.basename,
    extname: path.extname,
    join: path.join,
})

contextBridge.exposeInMainWorld("pythonRunScript", {
    run: PythonShell.run,
})

contextBridge.exposeInMainWorld("direBaseName", {
    dirname: __dirname,
})


