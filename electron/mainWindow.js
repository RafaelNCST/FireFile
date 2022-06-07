const { BrowserWindow, Tray } = require("electron")
const path = require("path");

function mainWindow() {
    let mainwindow = new BrowserWindow({
        width: 402,
        height: 47,
        x: 500,
        y: 0,
        show: false,
        resizable: false,
        alwaysOnTop: true,
        fullscreenable: false,
        fullscreen: false,
        frame: false,
        transparent: true, 
        icon: __dirname+'/../Gui/Imagens/Firefile.png',
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            devTools: false,
            preload: path.join(__dirname, "preload.js") //carrega o arquivo de preload
        }
    })

    return mainwindow;
}


module.exports = mainWindow();