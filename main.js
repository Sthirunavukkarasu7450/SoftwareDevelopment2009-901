const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const db = require("./db/classydb.js");

// test database connection and add test user
function dbTest() {
  const client = new db.ClassyDB();
  client.insertUser("admin", "admin", "admin", "2020-01-01", "admin", "admin", "admin");
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    icon: __dirname + '/img/logo.ico'
  });
  win.maximize();

  // Load the login page by default.
  win.loadFile("pages/index.html");

  // Load the login page when user is unauthenticated.
  ipcMain.on("unauthenticated", async (event) => {
    win.loadFile("pages/index.html");
  });

  // Load our app when user is authenticated.
  ipcMain.on("authenticated", async (event, user) => {
    // store user in local storage
    win.webContents.executeJavaScript(`localStorage.setItem("user", JSON.stringify(${JSON.stringify(user)}));`);

    if (user.account_type == "student") {
      win.loadFile("pages/studentPage.html");
    } else if (user.account_type == "teacher") {
      win.loadFile("pages/teacherPage.html");
    } else if (user.account_type == "parent") {
      win.loadFile("pages/parentPage.html");
    } else {
      win.loadFile("pages/adminPage.html");
    }
  });

  ipcMain.handle("showDialog", (e, message) => {
    dialog.showMessageBox(win, { message });
  });

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
