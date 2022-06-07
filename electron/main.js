const {
    app,
    BrowserWindow,
    ipcMain,
    Tray,
    Menu, 
  } = require("electron");
const path = require("path");

let winMain
let winSec
let tray

const startSecundaryWindow = (url) => {
    winSec = require("./windowSecundary.js")
    winSec.loadFile(path.join(__dirname, url))
    winSec.show()
}

app.on('ready', () => {
    winMain = require("./mainWindow.js")
    const loading = new BrowserWindow({
        show: false, 
        frame: false, 
        width: 250,
        height: 250, 
        show: false,
        icon: __dirname+'/../Gui/Imagens/FireFile.png',
        resizable: false,
        fullscreenable: false,
    })
    loading.loadFile(path.join(__dirname, "../Gui/components/loadingScreen/index.html"))
    loading.on('ready-to-show', () => {
        loading.show()
        winMain.loadFile(path.join(__dirname, "../Gui/index.html"));
        setTimeout(function(){ 
            loading.destroy();
            winMain.show()
            if(tray){
                tray.destroy()
            }else{
                let tray = new Tray(path.join(__dirname,"../Gui/Imagens/FireFile.png"))
                const contextMenu = Menu.buildFromTemplate([
                    { label: 'Abrir', click: function(){
                        winMain.show();
                    } },
                    { label: 'Fechar', click: function(){
                        app.isQuiting = true;
                        app.quit(); 
                    } }
                    ])  
                tray.setContextMenu(contextMenu)
                tray.setToolTip('FireFile 1.0')
                tray.setTitle('Opções:')
            }
        }, 3000);
    });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin'){
      app.quit()
    }
    winMain = null
    winSec = null
});

ipcMain.on('app/converterPage', () => {
    startSecundaryWindow('../Gui/components/convertPage/index.html')
})

ipcMain.on('app/organizarPage', () => {
    startSecundaryWindow('../Gui/components/organizePage/index.html')
})

ipcMain.on('app/convertImages', () => {
    startSecundaryWindow('../Gui/components/convertImages/index.html')
})

ipcMain.on('app/multipleFiles', () => {
    startSecundaryWindow('../Gui/components/multipleFiles/index.html')
})

ipcMain.on('app/multipleImages', () => {
    startSecundaryWindow('../Gui/components/convertMultipleImages/index.html')
})

ipcMain.on('app/editarPDFs', () => {
    startSecundaryWindow('../Gui/components/editarPDF/index.html')
})

ipcMain.on('app/closeBackIndex', evt => {
    evt.preventDefault();
    winSec.hide();
});

ipcMain.on('app/close', () => {
    app.quit()
});

ipcMain.on('app/closeIndex', () => {
    winMain.hide()
});

ipcMain.on('app/minimize', () => {
    BrowserWindow.getFocusedWindow().minimize();
});




