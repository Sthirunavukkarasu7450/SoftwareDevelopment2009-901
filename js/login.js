// not working

const db = require('./db/classydb.js');

// called from index.html when user logs in with email and password
function login() {
  const client = new db.ClassyDB();
  
  // get email and password from form
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // check if email and password are valid
  client.login(email, password, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result) {
      // if email and password are valid, redirect to home page
      window.location.href = "pages/" + result;
    } else {
      // if email and password are invalid, show error message
      document.getElementById('error-message').innerHTML = 'Invalid email or password';
    }
  });
}
