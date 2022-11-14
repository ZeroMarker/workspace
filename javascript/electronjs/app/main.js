const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron')
const path = require('path')

const menuItems = [
    {
        label: "Menu",
        submenu: [
            {
                label: "About"
            }
        ]
    },

    {
        label: "File",
        submenu: [
            {
                label: "Open Camera",
                click: async () => {
                    const win2 = new BrowserWindow({
                        width: 1200,
                        height: 800,
                        webPreferences: {
                            preload: path.join(__dirname, 'cameraPreload.js')
                        }
                    });
                    
                    ipcMain.on('close-window-2', () => win2.close())
                    // win2.webContents.openDevTools();
                    win2.loadFile('camera.html');
                    win2.once('ready-to-show', () => win2.show());
                }
            },
            
            {
                label: "New Window",
                click: async () => {
                    const win2 = new BrowserWindow({
                        width: 300,
                        height: 400,
                    });
                    
                    win2.loadFile('theme.html');
                }
            },
            {
                label: "Help",
                click: async () => {
                    const win3 = new BrowserWindow({
                        width: 1000,
                        height: 800,
                        show: false,
                    });
                    
                    win3.loadURL('https://github.com');
                    win3.once("ready-to-show", () => win3.show());
                }
            },
            
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal('https://baidu.com')
                }
            },
            {
                type: "separator"
            },
            {
                label: "Exit",
                click: () => app.quit()
            }
        ]
    },

    {
        label: 'Window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            },
            {
                role: 'reload'
            }
        ],
    },
]

const menu = Menu.buildFromTemplate(menuItems)

Menu.setApplicationMenu(menu)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // win.webContents.openDevTools();

    ipcMain.on('set-image', (event, data) => {
        // console.log(data);
        win.webContents.send('get-image', data);
    })

    win.loadFile('index.html')
}

app.whenReady().then(()=>{
    createWindow()
    
    

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})