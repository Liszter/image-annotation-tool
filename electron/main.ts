/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-08-29 10:48:37
 * @LastEditTime: 2023-10-23 09:12:45
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\electron\main.ts
 */
import { app, BrowserWindow, dialog, ipcMain, screen } from 'electron'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {

const { width, height } = screen.getPrimaryDisplay().bounds; 


  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // 开启node
      nodeIntegration: true, // node 集成环境
      contextIsolation: false,
      webSecurity: false
      // enableRemoteModule: true,//开启remote模块
    },
    width: width,
    height: height,
    show: false, // 默认不显示
    // 永远置顶
    alwaysOnTop: false,
  })



  // 去掉菜单栏
  // win.setMenu(null)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  // 避免白屏的问题
  win.on('ready-to-show', () => {
    win?.show()

    // 监听dialog

    // ipcMain.on('chooseFile', (event) => {
    //   dialog.showOpenDialog({
    //     properties: ['openFile', 'multiSelections']
    //     // properties: ['openDirectory', 'multiSelections']
    //   }).then(res => {
    //     console.log(res)
    //     event.reply('chooseResult', res)
    //   }).catch(err => {
    //     console.log(err)
    //     event.reply('chooseResult', err)
    //   })
    // })
  })
}

app.on('window-all-closed', () => {
  console.log('退出')
  win = null
})

app.whenReady().then(createWindow)