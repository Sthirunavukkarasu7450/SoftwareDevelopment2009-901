// display a supervisor's information in html form

function displaySupervisor(user) {
  return `
    <p>Name: ${user.first_name} ${user.last_name}</p>
    <p>Email: ${user.email}</p>
    <br>
    `;
}
