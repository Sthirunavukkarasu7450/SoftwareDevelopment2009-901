const { ipcRenderer } = require("electron");
const { ClassyDB } = require("../db/classydb.js");

const client = new ClassyDB();

// Authenticate user and create a new session
const login = document.getElementById("login");

login.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let user = await client.login(email, password);

  if (user == null) {
    ipcRenderer.invoke("showDialog", "Invalid credentials");
  } else {
    ipcRenderer.send("authenticated", user);
  }
});
