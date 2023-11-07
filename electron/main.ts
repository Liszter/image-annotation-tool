/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-08-29 10:48:37
 * @LastEditTime: 2023-11-07 14:30:35
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\electron\main.ts
 */
import { app, BrowserWindow, dialog, ipcMain, screen, Menu } from 'electron'
import path from 'node:path'

import fs from 'fs';


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


function showConfirmationDialog() {
  const options = {
    type: 'question',
    buttons: ['取消', '重启'],
    defaultId: 1,
    title: '重启提醒',
    message: '确定要重启应用吗?',
    cancelId: 0
  };

  dialog.showMessageBox(win, options).then((response) => {
    if (response.response === 1) {
      reloadPage();
    }
  });
}

function reloadPage() {
  win.reload();
}


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


  const menuTemp = [
    { 
      label: '重置',
      accelerator: 'CmdOrCtrl+R',
      click() {
        // 在这里触发前置方法
        showConfirmationDialog();
      }
    },
    {
      label: '关于',
      role: 'about'
    },
  ]
  const menu =  Menu.buildFromTemplate(menuTemp)

  Menu.setApplicationMenu(menu)

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

    // 导出文件
    const handleSaveFile = (event, { filePath, buffer }) => {
      dialog.showSaveDialog({ defaultPath: filePath })
        .then(result => {
          if (!result.canceled) {
            const fileToSave = result.filePath;
            fs.writeFile(fileToSave, buffer, (err) => {
              if (err) {
                event.reply('saveFileResponse', { success: false, error: err.message });
              } else {
                event.reply('saveFileResponse', { success: true });
              }
            });
          }
        })
        .catch(err => {
          event.reply('saveFileResponse', { success: false, error: err.message });
        });
    }
    ipcMain.removeListener('saveFile', handleSaveFile);
    ipcMain.on('saveFile', handleSaveFile);


  })
}

app.on('window-all-closed', () => {
  console.log('退出')
  win = null
})

app.whenReady().then(createWindow)