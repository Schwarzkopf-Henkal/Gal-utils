const electron=require('electron');
const path=require('path');
const indexPath=path.join('file://',__dirname,'./index.html');
var win;
function createWindow(){
    // console.log(electron.Menu.getApplicationMenu());
    // electron.Menu.setApplicationMenu(null);
    win=new electron.BrowserWindow({
        width:1024,
        height:640,
        webPreferences:{
            nodeIntegration:true,
            webSecurity:false
        }
    });
    win.on('close',()=>win=null);
    win.loadURL(indexPath);
    win.webContents.openDevTools();
    win.show();
}
electron.app.whenReady().then(createWindow);
electron.app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        electron.app.quit();
    }
})