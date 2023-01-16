const { app, BrowserWindow } = require('electron')
const path = require('path')
const db = require('./db/classydb.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true,
  })

  win.loadFile('./pages/index.html'),
  win.maximize()
}

// test database connection and add test user
function dbTest() {
  const client = new db.ClassyDB();
  client.insertUser("admin", "admin", "admin", "2020-01-01", "admin", "admin", "admin");
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
