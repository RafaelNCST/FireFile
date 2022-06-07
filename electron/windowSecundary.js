const { BrowserWindow, app, Tray } = require("electron")
const path = require("path");

function windowSecundary(){
    let windowsecundary = new BrowserWindow({
        width: 620,
        height: 250,
        x: 400,
        y: 200,
        show: false,
        fullscreenable: false,
        resizable: false,
        fullscreen: false,
        icon: __dirname+'/../Gui/Imagens/Firefile.png',
        frame: false,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            devTools: false,
            preload: path.join(__dirname, "preload.js") //carrega o arquivo de preload
        }
    })

    return windowsecundary;
}

module.exports = windowSecundary();