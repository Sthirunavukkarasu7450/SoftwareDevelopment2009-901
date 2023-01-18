// display a user's information in html form

function displayUser(user) {
  return `
    <p>Name: ${user.first_name} ${user.last_name}</p>
    <p>Role: ${user.account_type}</p>
    <p>Birthday: ${user.birthday}</p>
    <p>Address: ${user.address}</p>
    <p>Email: ${user.email}</p>
    <p>Password: ${user.password}</p>
    <br>
    `;
}
